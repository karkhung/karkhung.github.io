source "https://rubygems.org"
ruby RUBY_VERSION

gem "jekyll", "~> 4.2.0"

# This is the default theme for new Jekyll sites. You may change this to anything you like.
gem "minima", "~> 2.5"

group :jekyll_plugins do
	gem 'jekyll-paginate', '~> 1.1'
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem 'wdm', '>= 0.1.0' if Gem.win_platform?
gem 'webrick', '~> 1.3', '>= 1.3.1'


