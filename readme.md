# Karkhung's Personal Website & Audiobook Platform

## 🌐 Live Sites
- [karkhung.cn](https://karkhung.cn) - Main website
- [tingthak.info](https://tingthak.info) - Audiobook platform

## 🚀 Features
- **Content Management**: Powered by TinaCMS for easy content updates
- **Audiobook Hosting**: Dedicated section for audiobooks
- **Responsive Design**: Works on all devices
- **Fast & Secure**: Hosted on Cloudflare Pages

## 🛠️ Project Structure

```
.
├── _audiobooks/         # Audiobook content
├── _includes/          # Reusable HTML components
├── _layouts/           # Page templates
├── _posts/             # Blog posts
├── assets/             # Static assets (CSS, JS, images)
├── tina/               # TinaCMS configuration
└── _config.yml         # Jekyll configuration
```

## 🏗️ Local Development

### Prerequisites
- Ruby (with Bundler)
- Node.js (v14+)
- npm or Yarn

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   bundle install
   npm install
   ```
3. Start the development server:
   ```bash
   
   ```
4. Access the site at `http://localhost:4000`
5. Access TinaCMS admin at `http://localhost:4000/admin/`

## 🚀 Deployment

### Cloudflare Pages Settings
```
Build Framework: Jekyll
Build Command: npm run build
Build output: _site
Root directory: /

Build System Version: Version 2
Go: 1.21.0
Node.js: 18.17.1
Bun: 11.33
Python: 3.11.5

## Runtime
Compatibility Date: Nov 8, 2023
```

## 📚 Content Management with TinaCMS

### Adding New Content
1. Navigate to `/admin`
2. Log in with your credentials
3. Use the interface to create and manage:
   - Blog posts
   - Audiobook chapters
   - Site pages

### Content Types
- **Blog Posts**: Regular blog content
- **Audiobooks**: Structured audiobook content with chapters
- **Pages**: Static pages (About, Contact, etc.)

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing
Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📧 Contact
For questions or feedback, please open an issue or contact the maintainer.
