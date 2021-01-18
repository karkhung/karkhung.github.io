---
layout: post
---
{% include header.html %}
<div class="container">
	<section class="half-width">
			<article>
			<h1 class="page-title">{{page.title}}</h1>
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