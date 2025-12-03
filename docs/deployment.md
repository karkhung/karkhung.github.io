# Deployment Guide

This guide explains how to deploy your website to various hosting platforms.

## Table of Contents
- [Deployment Options](#deployment-options)
- [GitHub Pages](#github-pages)
- [Cloudflare Pages](#cloudflare-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Custom Server](#custom-server)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## Deployment Options

### GitHub Pages

1. **Automatic Deployment**
   - Push your code to the `main` branch of your GitHub repository
   - GitHub Pages will automatically build and deploy your site
   - Your site will be available at `https://<username>.github.io`

2. **Manual Deployment**
   ```bash
   # Build the site
   bundle exec jekyll build

   # Add, commit, and push the `_site` directory to the `gh-pages` branch
   # (You can use the `gh-pages` gem to automate this)
   ```

## Cloudflare Pages

1. **Prerequisites**
   - Cloudflare account
   - GitHub/GitLab repository with your code

2. **Deployment Steps**
   1. Go to Cloudflare Dashboard > Pages
   2. Click "Create a project"
   3. Connect your Git provider and select your repository
   4. Configure build settings:
      - **Build command**: `npm run build`
      - **Build output directory**: `_site`
      - **Environment variables**: Add your environment variables
   5. Click "Save and Deploy"

## Netlify

1. **Prerequisites**
   - Netlify account
   - GitHub/GitLab repository with your code

2. **Deployment Steps**
   1. Go to Netlify Dashboard > Add new site > Import an existing project
   2. Connect your Git provider and select your repository
   3. Configure build settings:
      - **Build command**: `npm run build`
      - **Publish directory**: `_site`
      - **Environment variables**: Add your environment variables
   4. Click "Deploy site"

## Vercel

1. **Prerequisites**
   - Vercel account
   - GitHub/GitLab repository with your code

2. **Deployment Steps**
   1. Go to Vercel Dashboard > Add New Project
   2. Import your Git repository
   3. Configure build settings:
      - **Framework Preset**: Jekyll
      - **Build Command**: `bundle exec jekyll build`
      - **Output Directory**: `_site`
      - **Environment Variables**: Add your environment variables
   4. Click "Deploy"

## Custom Server

1. **Build the Site**
   ```bash
   bundle install
   npm install
   bundle exec jekyll build
   ```

2. **Deploy the `_site` Directory**
   - Copy the contents of the `_site` directory to your web server
   - Configure your web server (Nginx/Apache) to serve the files

## Environment Variables

For all deployment methods, make sure to set these environment variables:

```
TINA_CLIENT_ID=your-tina-client-id
TINA_TOKEN=your-tina-token
# Add any other required environment variables
```

## Troubleshooting

### Build Failures
- Check the build logs for specific error messages
- Ensure all dependencies are installed
- Verify that all required environment variables are set

### Missing Content
- Check if the content is in the correct directory
- Verify that the front matter is properly formatted
- Ensure the build process completed successfully

### Performance Issues
- Optimize images before uploading
- Enable caching where possible
- Consider using a CDN for static assets

## Next Steps
- [Configuration Guide](/docs/configuration.md)
- [Content Management](/docs/guides/content-management.md)