---
layout: podcast
---

{% include header.html %}
<script type="">

/*--- ref --https://codesource.io/getting-started-with-the-media-session-api/ */
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: '{{page.title}}',
      episode: '{{page.episode}}',
      artwork: [
        { src: '{{site.baseurl}}/assets/images/{{page.cover}}', sizes: '96x96',   type: 'image/png' },
        { src: '{{site.baseurl}}/assets/images/{{page.cover}}', sizes: '128x128', type: 'image/png' },
        { src: '{{site.baseurl}}/assets/images/{{page.cover}}', sizes: '192x192', type: 'image/png' },
        { src: '{{site.baseurl}}/assets/images/{{page.cover}}', sizes: '256x256', type: 'image/png' },
        { src: '{{site.baseurl}}/assets/images/{{page.cover}}', sizes: '384x384', type: 'image/png' },
        { src: '{{site.baseurl}}/assets/images/{{page.cover}}', sizes: '512x512', type: 'image/png' },
      ]
    }); 
}
 navigator.mediaSession.setActionHandler("play", function() { 
        audio.play();
     });
navigator.mediaSession.setActionHandler("pause", function() { 
        audio.pause();
      });

/*player.addEventListener('click', function(e) {

alert("player clicked")

});
*/

</script>
<div class="container">
	<div class="section-title">
	</div>
	<section class="half-width">
		<article>
			<div class="playbox">
				<div class="playbox-container">
					<h1>
						<span>ལས་རིམ་  {{page.episode}} :</span> {{page.title}} &nbsp;&nbsp; 
					</h1>
					<p>
						<i class="fa fa-calendar"></i> {{ page.time | date: "%A, %B %e, %Y" }} |
						<i class="fa fa-clock"></i>  {{page.length}}| 
						<a class="playbox-dl" style="color:white" href="{{page.file}}" download> 
							<i class="fas fa-cloud-download-alt"></i>
						</a>
					</p>
					<audio id="player" controls>
				  		<source src="{{page.file}}" type="audio/mp3" />
				  		Your browser does not support the audio element.
					</audio>
				</div>
				<div class="social">
					<img class="img-md" src="{{site.baseurl}}{{page.cover}}">
					<center>{% include share-bar.html %}</center>
				</div>
			</div>
			{{content}}
			{% include pagination.html %}
		</article>
		<!-- {% include sidebar.html %} -->
{% include sidebar.html %}
	</section>
</div>

{% include footer.html %}
