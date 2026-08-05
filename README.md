# jswinney.com

Justin Swinney — Security Engineer & AI Builder. Dark, terminal-inspired portfolio with an **AI × Security** focus.

## Stack

Plain HTML/CSS/JS — no build step, no framework. Deploys anywhere static files can live (Vercel, Pages, S3).

- `index.html` — page structure + content
- `styles.css` — "AI × Security" dark theme
- `script.js` — particles, terminal typing, project rendering, form handler
- `projects.js` — **project data** (this is what the AI intake skill edits)
- `og.png` — social preview image (1200×630)

## Adding a project

Projects are data-driven. Append an object to the `PROJECTS` array in `projects.js`:

```js
{
  id: "my-project",
  title: "My Project",
  category: "ai",            // "ai" | "security" | "work" | "cert"
  date: "Aug 2026",
  summary: "One or two sentences describing it.",
  tags: ["Python", "OpenAI", "Guardrails"],
  links: { repo: "https://github.com/...", demo: "https://..." }
}
```

Newest-first rendering is automatic — the site renders newest at the top. Push to `main` and Vercel deploys automatically.

## Deploy

1. Import this repo in Vercel (framework preset: **Other** — it's static).
2. Add the `jswinney.com` domain in Vercel project settings.
3. Point DNS at Vercel (A record → `76.76.21.21`, or CNAME `cname.vercel-dns.com` for www).
4. Push to `main` → auto-deploy. HTTPS is automatic.

Contact form uses [Formspree](https://formspree.io) (`mzdkalag`).
