---
layout: podcast
---

{% include header.html %}
<div class="container">
	<div class="section-title">
	</div>
	<section class="half-width">
		<article>
			<div class="playbox">
				<div class="playbox-container">
					<h1><span>སྒྲ་མཛོད།  {{page.episode}} :</span> {{page.title}} &nbsp;&nbsp; 
						<a class="playbox-dl" style="color:white" href="{{page.file}}" download> 
							<i class="fas fa-cloud-download-alt"></i>
						</a>
					</h1>
					<p><i class="fa fa-clock"></i>  {{page.length}}</p>
					<p><i class="fa fa-calendar"></i> {{ site.time | date: "%A, %B %e, %Y" }}</p>
					<audio id="player" controls>
				  		<source src="{{page.file}}" type="audio/mp3" />
					</audio>
				</div>
				<div class="social">
					<img class="img-md" src="{{site.baseurl}}/assets/images/{{page.cover}}">
					<center>{% include share-bar.html %}</center>
				</div>
			</div>
			{{content}}
			{% include pagination.html %}
		</article>
		<!-- {% include sidebar.html %} -->
	</section>
</div>

{% include footer.html %}
