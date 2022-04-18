---
layout: blog
---
{% include header.html %}
<div class="container">
	<section class="half-width">
			<article>
				{% if page.category == "སྐད་འཕྲིན་གླེང་མོལ།" %}
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
			{% include pagination.html %}
				{% else %}
			<h1 class="page-title">{{page.title}}</h1>
				<p class="meta">
					<span>
						<i class="fa fa-calendar">
				</i>  {{ page.time | date_to_string  }} / <i class="fa fa-flag"></i>{{page.category}} | {% include share-bar.html %}
					</span>
				</p>
			{{content}}
			{% include pagination.html %}
			{% endif %}
			</article>
			{% include sidebar.html %}

	</section>

</div>

{% include footer.html %}