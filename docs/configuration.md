# Configuration Guide

This guide explains how to configure the website and its various components.

## Table of Contents
- [Environment Variables](#environment-variables)
- [Jekyll Configuration](#jekyll-configuration)
- [TinaCMS Configuration](#tinacms-configuration)
- [Theme Customization](#theme-customization)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# TinaCMS Configuration
TINA_CLIENT_ID=your-tina-client-id
TINA_TOKEN=your-tina-token

# Optional: Google Analytics
GOOGLE_ANALYTICS_ID=UA-XXXXX-X

# Optional: Disqus Comments
DISQUS_SHORTNAME=your-disqus-shortname
```

## Jekyll Configuration

The main Jekyll configuration is in `_config.yml`. Key settings include:

```yaml
# Site settings
title: Your Site Title
description: Your site description
baseurl: "" # the subpath of your site, e.g. /blog
url: "https://yourdomain.com" # the base hostname & protocol for your site

# Build settings
markdown: kramdown
plugins:
  - jekyll-feed
  - jekyll-seo-tag

# Collections
collections:
  audiobooks:
    output: true
    permalink: /audiobooks/:path/
```

## TinaCMS Configuration

The TinaCMS configuration is in `tina/config.js`. Key settings include:

```javascript
// Basic configuration
export default defineConfig({
  branch: process.env.HEAD || "main",
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "./",
  },
  media: {
    tina: {
      publicFolder: "./",
      mediaRoot: "/assets/images/",
    },
  },
  // ... rest of the configuration
});
```

## Theme Customization

### CSS Customization
Custom styles can be added to `assets/css/style.css`.

### Layouts
- Main layouts are in `_layouts/`
- Partials and components are in `_includes/`

### Navigation
Edit `_data/navigation.yml` to modify the site navigation.

## Next Steps
- [Content Management](/docs/guides/content-management.md)
- [Deployment Guide](/docs/deployment.md)
