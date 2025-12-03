// Simple custom audio player for series page
(() => {
  function formatTime(s) {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  // Keep only one player playing at a time
  let currentAudio = null;

  function createControlsFor(articleEl) {
    const audio = articleEl.querySelector('audio.chapter-audio');
    if (!audio) return;

    // Hide native controls once we create custom ones (but keep them if JS disabled)
    audio.controls = false;

    // create UI
    const container = document.createElement('div');
    container.className = 'custom-player';

    const left = document.createElement('div');
    left.className = 'cp-left';
    const play = document.createElement('button');
    play.className = 'cp-play';
    play.type = 'button';
    play.setAttribute('aria-label','Play');
    play.innerHTML = '►';
    left.appendChild(play);

    const times = document.createElement('div');
    times.className = 'cp-times';
    const elapsed = document.createElement('span'); elapsed.className = 'cp-elapsed'; elapsed.textContent = '0:00';
    const slash = document.createElement('span'); slash.className='cp-slash'; slash.textContent = ' / ';
    const total = document.createElement('span'); total.className = 'cp-total'; total.textContent = formatTime(audio.duration || 0);
    times.appendChild(elapsed); times.appendChild(slash); times.appendChild(total);
    left.appendChild(times);

    const right = document.createElement('div');
    right.className = 'cp-right';

    // waveform canvas — this is now the single progress control (no legacy rail/fill)

    // waveform canvas (we decode audio and draw an accurate waveform)
    const wave = document.createElement('div'); wave.className = 'cp-wave';
    const canvas = document.createElement('canvas'); canvas.className = 'cp-wave-canvas';
    wave.appendChild(canvas);

    // add a tooltip element for scrub timestamp preview
    const tooltip = document.createElement('div'); tooltip.className = 'cp-scrub-tooltip';
    wave.appendChild(tooltip);
    right.appendChild(wave);

    // no background decorative canvas — foreground waveform is the single visual

    container.appendChild(left); container.appendChild(right);

    // insert into audio-inline-player
    const wrapper = articleEl.querySelector('.audio-inline-player');
    if (wrapper) wrapper.innerHTML = ''; wrapper && wrapper.appendChild(container);

    // event wiring
    play.addEventListener('click', (ev) => {
      if (audio.paused) {
        if (currentAudio && currentAudio !== audio) { currentAudio.pause(); }
        audio.play();
      } else { audio.pause(); }
    });

    audio.addEventListener('play', () => {
      currentAudio = audio;
      play.classList.add('playing');
      play.innerHTML = '❚❚';
      articleEl.classList.add('playing');
    });
    audio.addEventListener('pause', () => {
      play.classList.remove('playing');
      play.innerHTML = '►';
      articleEl.classList.remove('playing');
      if (currentAudio === audio) currentAudio = null;
    });

    audio.addEventListener('loadedmetadata', () => {
      total.textContent = formatTime(audio.duration || 0);
      // update canvas aria max when metadata is available
      try { if (canvas) canvas.setAttribute('aria-valuemax', String(Math.round(audio.duration || 0))); } catch (e) {}
    });

    audio.addEventListener('timeupdate', () => {
      elapsed.textContent = formatTime(audio.currentTime || 0);
      const pct = (audio.currentTime / (audio.duration || 1)) * 100;
      // update waveform playhead overlay (canvas drawPlayhead) and aria on canvas
      // update waveform playhead overlay (canvas drawPlayhead) and aria on canvas
      try { if (canvas && canvas._drawPlayhead) canvas._drawPlayhead(pct / 100); } catch (e) {}
      try { if (canvas) canvas.setAttribute('aria-valuenow', String(Math.round(audio.currentTime || 0))); } catch (e) {}
    });

    // (legacy rail removed) — canvas is the interactive scrub surface and handles all seeking

    // Use the canvas as the interactive seek surface (pointer drag + keyboard support)
    // make canvas focusable and ARIA-friendly
    canvas.tabIndex = 0;
    canvas.setAttribute('role', 'slider');
    canvas.setAttribute('aria-valuemin', '0');
    canvas.setAttribute('aria-valuemax', Math.round(audio.duration || 0));
    canvas.setAttribute('aria-valuenow', '0');
    canvas.setAttribute('aria-label', 'Seek waveform');

    let dragging = false;
    function setFromPointerOnCanvas(clientX) {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      const newTime = (audio.duration || 0) * pct;
      audio.currentTime = newTime;
      elapsed.textContent = formatTime(newTime || 0);
      canvas.setAttribute('aria-valuenow', String(Math.round(newTime || 0)));
      if (canvas._drawPlayhead) canvas._drawPlayhead(pct);
      // update tooltip while scrubbing
      try { showScrubTooltip(pct, newTime); } catch (e) {}
    }

    canvas.addEventListener('pointerdown', (e) => {
      dragging = true;
      canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
      setFromPointerOnCanvas(e.clientX);
      // ensure tooltip visible during active pointer interaction
      try { tooltip.classList.add('visible'); } catch (er) {}
      e.preventDefault();
    });

    // Forward pointer events from the larger waveform container (bigger hit area) to canvas logic
    wave.addEventListener('pointerdown', (e) => {
      // If the event target is the canvas itself let the canvas handler run; otherwise treat as a pointerdown sequence
      if (e.target === canvas) return; // canvas already handled
      dragging = true;
      canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
      setFromPointerOnCanvas(e.clientX);
      try { tooltip.classList.add('visible'); } catch (er) {}
      e.preventDefault();
    });

    window.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      setFromPointerOnCanvas(e.clientX);
    });

    window.addEventListener('pointerup', (e) => {
      if (!dragging) return;
      dragging = false;
      try { canvas.releasePointerCapture && canvas.releasePointerCapture(e.pointerId); } catch (err) {}
      // hide tooltip once scrub ends
      try { tooltip.classList.remove('visible'); } catch (er) {}
    });

    // keyboard support on the canvas
    canvas.addEventListener('keydown', (e) => {
      if (!audio.duration || !isFinite(audio.duration)) return;
      const stepSeconds = Math.max(1, Math.floor((audio.duration || 1) / 100));
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        audio.currentTime = Math.max(0, (audio.currentTime || 0) - stepSeconds);
        e.preventDefault();
        // show tooltip briefly for keyboard adjustments
        try { showScrubTooltip((audio.currentTime || 0) / (audio.duration || 1), audio.currentTime); setTimeout(() => tooltip.classList.remove('visible'), 800); } catch (er) {}
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        audio.currentTime = Math.min(audio.duration, (audio.currentTime || 0) + stepSeconds);
        e.preventDefault();
        try { showScrubTooltip((audio.currentTime || 0) / (audio.duration || 1), audio.currentTime); setTimeout(() => tooltip.classList.remove('visible'), 800); } catch (er) {}
      } else if (e.key === 'Home') { audio.currentTime = 0; e.preventDefault(); }
      else if (e.key === 'End') { audio.currentTime = audio.duration; e.preventDefault(); }
    });

    // show a preview tooltip when hovering over waveform (non-drag)
    wave.addEventListener('pointermove', (e) => {
      if (dragging) return; // dragging already handled
      const rect = canvas.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right) return;
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const previewTime = (audio.duration || 0) * pct;
      try { showScrubTooltip(pct, previewTime); tooltip.classList.add('visible'); } catch (er) {}
    });

    wave.addEventListener('pointerleave', () => { try { if (!dragging) tooltip.classList.remove('visible'); } catch (er) {} });

    // helper: format & position tooltip
    function showScrubTooltip(pct, seconds){
      if (!tooltip) return;
      const rect = canvas.getBoundingClientRect();
      const waveRect = wave.getBoundingClientRect();
      const innerLeft = Math.max(8, Math.min(rect.width - 8, rect.width * pct));
      // compute left relative to wave container
      const left = (rect.left - waveRect.left) + innerLeft;
      tooltip.textContent = formatTime(seconds || 0);
      tooltip.style.left = left + 'px';
      tooltip.classList.add('visible');
    }

    // when playing add wave animation class
    audio.addEventListener('play', () => wave.classList.add('active'));
    audio.addEventListener('pause', () => wave.classList.remove('active'));

    // ensure single-play: pause others
    audio.addEventListener('play', () => {
      document.querySelectorAll('audio.chapter-audio').forEach(a => { if (a !== audio) a.pause(); });
    });

    // --- waveform decoding / drawing ---
    // Shared audio context and cache
    if (!window.__cap_audio_ctx) window.__cap_audio_ctx = { ctx: null, decodeCache: new Map(), raf: new Map() };

    function ensureAudioCtx() {
      try {
        if (!window.__cap_audio_ctx.ctx) window.__cap_audio_ctx.ctx = new (window.AudioContext || window.webkitAudioContext)();
        return window.__cap_audio_ctx.ctx;
      } catch (e) { return null; }
    }

    // store peaks for redraw on resize
    let currentPeaks = null;

    async function decodeAndDraw(src) {
      const ctx = ensureAudioCtx();
      if (!ctx) return false;
      try {
        // cache by src
        if (window.__cap_audio_ctx.decodeCache.has(src)) {
          const peaks = window.__cap_audio_ctx.decodeCache.get(src);
          drawWave(peaks, canvas);
          return true;
        }

        const res = await fetch(src, { cache: 'force-cache' });
        const ab = await res.arrayBuffer();
        const audioBuf = await ctx.decodeAudioData(ab.slice(0));
        const chan = audioBuf.getChannelData(0);
        const samples = 256; // resolution of waveform
        const blockSize = Math.floor(chan.length / samples) || 1;
        const peaks = new Float32Array(samples);
        for (let i = 0; i < samples; i++) {
          let start = i * blockSize;
          let max = 0;
          for (let j = 0; j < blockSize && start + j < chan.length; j++) {
            const val = Math.abs(chan[start + j]); if (val > max) max = val;
          }
          peaks[i] = max;
        }
        window.__cap_audio_ctx.decodeCache.set(src, peaks);
        currentPeaks = peaks;
        drawWave(peaks, canvas);
        return true;
      } catch (err) {
        // decoding failed (CORS or network) — fallback to analyser-based realtime waveform
        return false;
      }
    }

    function drawWave(peaks, canvasEl) {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const w = Math.max(180, Math.min(420, canvasEl.clientWidth || 260));
      const h = Math.max(32, canvasEl.clientHeight || 40);
      canvasEl.width = Math.floor(w * dpr);
      canvasEl.height = Math.floor(h * dpr);
      canvasEl.style.width = w + 'px';
      canvasEl.style.height = h + 'px';
      const ctx = canvasEl.getContext('2d');
      ctx.clearRect(0,0,canvasEl.width,canvasEl.height);

      // background
      ctx.fillStyle = 'rgba(255,255,255,0.02)';
      ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

      // draw symmetric waveform using peaks
      const mid = canvasEl.height / 2;
      const barW = canvasEl.width / peaks.length;
      ctx.fillStyle = 'rgba(139,92,246,0.9)';
      for (let i = 0; i < peaks.length; i++) {
        const amp = peaks[i];
        const hBar = Math.max(1, amp * (canvasEl.height * 0.9));
        const x = i * barW;
        ctx.fillRect(x, mid - hBar/2, Math.max(1, barW*0.75), hBar);
      }

      // clear any playhead overlay
      drawPlayhead(0);

      function drawPlayhead(pct) {
        // overlay a semi-transparent progress fill
        ctx.save();
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = 'rgba(236,72,153,0.12)';
        ctx.fillRect(0, 0, Math.max(1, canvasEl.width * pct), canvasEl.height);
        ctx.restore();
      }

      // attach to canvas element so animation can update progress
      canvasEl._drawPlayhead = drawPlayhead;
    }

    // background canvas removed — foreground waveform used for progress and visuals

    // if decode fails, create an analyser node and animate using time domain data
    function attachAnalyserFallback(audioEl, canvasEl) {
      const ctx = ensureAudioCtx(); if (!ctx) return;
      try {
        const srcNode = ctx.createMediaElementSource(audioEl);
        const analyser = ctx.createAnalyser(); analyser.fftSize = 256;
        srcNode.connect(analyser);
        analyser.connect(ctx.destination);
        const data = new Uint8Array(analyser.frequencyBinCount);

        // animate bars onto canvas
        function render() {
          if (!canvasEl || !canvasEl.getContext) return;
          const dpr = Math.max(1, window.devicePixelRatio || 1);
          const w = Math.max(180, Math.min(420, canvasEl.clientWidth || 260));
          const h = Math.max(32, canvasEl.clientHeight || 40);
          canvasEl.width = Math.floor(w * dpr);
          canvasEl.height = Math.floor(h * dpr);
          canvasEl.style.width = w + 'px';
          canvasEl.style.height = h + 'px';
          const ctx2 = canvasEl.getContext('2d');
          ctx2.clearRect(0,0,canvasEl.width,canvasEl.height);

          analyser.getByteTimeDomainData(data);
          const mid = canvasEl.height / 2;
          const sliceW = canvasEl.width / data.length;
          ctx2.fillStyle = 'rgba(139,92,246,0.9)';
          for (let i = 0; i < data.length; i+=4) {
            const v = Math.abs(data[i] - 128) / 128.0;
            const hBar = Math.max(1, v * (canvasEl.height * 0.9));
            const x = i * sliceW;
            ctx2.fillRect(x, mid - hBar/2, Math.max(1, sliceW*3), hBar);
          }

          requestAnimationFrame(render);
        }
        render();
      } catch (e) { /* can't connect because of CORS or cross-origin media */ }
    }

    // initialize waveform: try decode first, fallback to analyser
    (async () => {
      try {
        const src = audio.currentSrc || audio.src;
        if (!src) return;
        const ok = await decodeAndDraw(src);
        // draw foreground waveform when decode succeeded; otherwise fall back to analyser
        if (ok) {
          const peaks = currentPeaks || window.__cap_audio_ctx.decodeCache.get(src);
          try { drawWave(peaks, canvas); } catch (er) {}
        } else {
          // fallback: analyser mode for foreground canvas
          attachAnalyserFallback(audio, canvas);
        }

        // animate playhead while audio plays
        let rafId = null;
        function updateProgressLoop() {
          const pct = (audio.currentTime / (audio.duration || 1));
          if (canvas._drawPlayhead) canvas._drawPlayhead(pct);
          rafId = requestAnimationFrame(updateProgressLoop);
        }

        audio.addEventListener('play', () => {
          if (rafId) cancelAnimationFrame(rafId);
          updateProgressLoop();
        });
        audio.addEventListener('pause', () => { if (rafId) cancelAnimationFrame(rafId); rafId = null; });
        audio.addEventListener('ended', () => { if (rafId) cancelAnimationFrame(rafId); rafId = null; if (canvas._drawPlayhead) canvas._drawPlayhead(0); });

        // no decorative background animation — removed to simplify DOM

        // Redraw waveform & background when the container size changes
        try {
          const resizeTarget = wave; // parent container
          // safe guard the ResizeObserver for older browsers
          if (window.ResizeObserver) {
            const ro = new ResizeObserver(() => {
              // prefer the cached peaks; if not present the analyser fallback will handle dynamic drawing
              const peaks = currentPeaks || window.__cap_audio_ctx.decodeCache.get(audio.currentSrc || audio.src);
                if (peaks && canvas) drawWave(peaks, canvas);
            });
            ro.observe(resizeTarget);
            // also observe canvas itself (some layouts change canvas clientWidth without parent change)
            ro.observe(canvas);
          } else {
            // fallback: listen to window resize
            window.addEventListener('resize', () => {
              const peaks = currentPeaks || window.__cap_audio_ctx.decodeCache.get(audio.currentSrc || audio.src);
              if (peaks && canvas) drawWave(peaks, canvas);
            });
          }
        } catch (err) { /* non-fatal */ }

      } catch (e) {
        try { attachAnalyserFallback(audio, canvas); } catch (er) {}
      }
    })();
  }

  // initialize
  function init() {
    document.querySelectorAll('article.chapter-item').forEach(createControlsFor);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
