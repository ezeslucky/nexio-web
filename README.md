# Nexio Web

<div align="center">
  <img src="public/logo.png" alt="Nexio Logo" width="80" height="80" />
  <h1>Nexio</h1>
  <p><strong>Your Knowledge. Your Canvas. Your Intelligence.</strong></p>
  <p>
    The next-generation all-in-one workspace, knowledge operating system, and AI automation engine.
  </p>
  <p>
    <a href="https://github.com/ezeslucky/nexio"><img src="https://img.shields.io/github/stars/ezeslucky/nexio?style=social" alt="GitHub Stars" /></a>
    <a href="https://app.technexio.me"><img src="https://img.shields.io/badge/launch-app.technexio.me-purple" alt="Launch App" /></a>
    <a href="https://hub.docker.com/r/ezeslucky441/nexio"><img src="https://img.shields.io/badge/docker-ezeslucky441%2Fnexio-blue?logo=docker" alt="Docker Image" /></a>
    <a href="https://x.com/ezeslucky"><img src="https://img.shields.io/badge/follow-%40ezeslucky-black?logo=x" alt="X Follow" /></a>
    <img src="https://img.shields.io/badge/license-Apache--2.0-indigo" alt="License" />
  </p>
</div>

---

## ✨ Overview

Nexio unifies wikis, knowledge management, presentation canvases, and visual AI workflows into a single cohesive platform.

- **Infinite Canvas:** Edgeless 2D thinking surface with docs, sticky notes, connectors, and slides.
- **Visual AI Workflow Studio:** Node-based automation connecting triggers, LLMs (GPT-4o, Claude 3.5 Sonnet, Fal AI), logic, and canvas actions.
- **AI Logging Sentinel:** Developer tool analyzing repositories for swallowed errors, unmonitored database transactions, and blind APIs, with before/after AST patch reviews.
- **Local-First & Private:** Embedded SQLite storage with instant local latency and air-gapped AI capabilities.
- **Self-Hostable:** Run anywhere in seconds with Docker.

---

## 🚀 Quick Start (Docker)

```bash
docker pull ezeslucky441/nexio
docker run -d -p 8080:8080 -v ~/.nexio:/data ezeslucky441/nexio:latest
```

---

## 💻 Web Development

This repository contains the official Nexio landing page and web interface built with:
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide Icons**

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🌐 Community & Links

- **Web App:** [app.technexio.me](https://app.technexio.me)
- **Main Repository:** [ezeslucky/nexio](https://github.com/ezeslucky/nexio)
- **X (Twitter):** [@ezeslucky](https://x.com/ezeslucky)
- **LinkedIn:** [ezeslucky](https://www.linkedin.com/in/ezeslucky)
- **Docker Hub:** [ezeslucky441/nexio](https://hub.docker.com/r/ezeslucky441/nexio)

---

## 📄 License

Licensed under the [Apache 2.0 License](LICENSE).
