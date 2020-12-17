---
layout: post
---
{% include header.html %}
<div class="container">
	<div class="section-title">
		<h1>{{page.title}}</h1>
			<div class="social">
				{% include share-bar.html %}
			</div>
	</div>
	<section class="half-width">
			<article>
				<h1>{{page.title}}</h1>
				<p class="meta">
					<span>
						<i class="fa fa-calendar">
				</i>  {{ site.time | date_to_string  }} / <i class="fa fa-flag"></i>{{page.category}} | {% include share-bar.html %}
					</span>
				</p>
				{{content}}
				{% include pagination.html %}
			</article>
			{% include sidebar.html %}
	</section>
</div>

{% include footer.html %}