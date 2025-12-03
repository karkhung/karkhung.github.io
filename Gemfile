source "https://rubygems.org"
# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
# gem "jekyll", "~> 4.2.0"
# gem "jekyll", "~> 4.4.0"
# This is the default theme for new Jekyll sites. You may change this to anything you like.
# gem "minima", "~> 2.5"
# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
gem "github-pages", "~> 228", group: :jekyll_plugins

# If you want to use Jekyll locally without GitHub Pages, uncomment the following line
# and comment the github-pages gem above
# gem "jekyll", "~> 4.3.2"

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-avatar"
  gem "jekyll-github-metadata"
  gem "jekyll-remote-theme"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
# platforms :mingw, :x64_mingw, :mswin, :jruby do
#   gem "tzinfo", "~> 1.2"
#   gem "tzinfo-data"
# end
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem 'wdm', '~> 0.1.0', :install_if => Gem.win_platform?

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since later versions no longer support 2.x builds
# See: https://github.com/tmm1/http_parser.rb/issues/51
platforms :jruby do
  gem "http_parser.rb", "~> 0.6.0"
end
gem 'webrick', '~> 1.3', '>= 1.3.1'
