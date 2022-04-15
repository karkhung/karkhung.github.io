---
layout: audio-blog
---
{% include header.html %}
<div class="container">
<section class="half-width">
		<article>
			<div class="audio-blog-player">
				<div class="playbox-container">
					<h1>
						 {{page.title}}
					</h1>
					<audio id="player" controls>
				  		<source src="{{page.file}}" type="audio/mp3" />
				  		Your browser does not support the audio element.
					</audio>
				</div>
			</div>
			{{content}}
			<br>
			{% include pagination.html %}
		</article>
		<!-- {% include sidebar.html %} -->
{% include sidebar.html %}
	</section>

</div>

{% include footer.html %}