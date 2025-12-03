# Installation Guide

This guide will help you set up the development environment for Karkhung's Website.

## Prerequisites

- Ruby (with Bundler)
- Node.js (v14+)
- npm or Yarn
- Git

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/karkhung/karkhung.github.io.git
   cd karkhung.github.io
   ```

2. **Install Ruby dependencies**
   ```bash
   bundle install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Configure environment variables**
   Create a `.env` file in the root directory with the following content:
   ```env
   TINA_CLIENT_ID=your-tina-client-id
   TINA_TOKEN=your-tina-token
   ```

5. **Start the development server**
   ```bash
   npx tinacms dev -c "bundle exec jekyll serve"
   ```

6. **Access the site**
   - Main site: http://localhost:4000
   - TinaCMS admin: http://localhost:4000/admin/

## Troubleshooting

- If you encounter Ruby version issues, make sure you have the correct version installed and try:
  ```bash
  rbenv install 3.1.2  # or your required Ruby version
  rbenv local 3.1.2
  ```

- If you get permission errors, try running commands with `sudo` or fix permissions:
  ```bash
  sudo chown -R $(whoami) /path/to/project
  ```

## Next Steps

- [Configuration Guide](/docs/configuration.md)
- [Content Management](/docs/guides/content-management.md)
- [Deployment Guide](/docs/deployment.md)
