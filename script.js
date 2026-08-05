/* ============================================================
   jswinney.com — interactions
   particle network · terminal typing · project rendering ·
   nav · reveals · Formspree handler
   ============================================================ */
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------------- particle network background ---------------- */
    function initParticles() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h, particles = [];
        const COLORS = ['34,224,255', '61,255,168', '139,123,255'];
        const DENSITY = 9000; // px^2 per particle

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            const count = Math.min(110, Math.max(28, Math.round((w * h) / DENSITY)));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.6 + 0.6,
                c: COLORS[Math.floor(Math.random() * COLORS.length)]
            }));
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < -20) p.x = w + 20;
                if (p.x > w + 20) p.x = -20;
                if (p.y < -20) p.y = h + 20;
                if (p.y > h + 20) p.y = -20;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(' + p.c + ',0.55)';
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const dx = p.x - q.x, dy = p.y - q.y;
                    const dist = dx * dx + dy * dy;
                    if (dist < 12100) { // 110px
                        const alpha = (1 - dist / 12100) * 0.16;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = 'rgba(' + p.c + ',' + alpha + ')';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            if (!prefersReducedMotion) requestAnimationFrame(draw);
        }

        resize();
        window.addEventListener('resize', resize);
        draw(); // draws once; animates only when motion is allowed
    }

    /* ---------------- terminal typing ---------------- */
    function initTerminal() {
        const body = document.querySelector('.term-body');
        if (!body) return;

        const lines = [
            { type: 'cmd', text: '$ whoami' },
            { type: 'out', text: 'justin.swinney — security engineer · AI builder', cls: 't-acc' },
            { type: 'cmd', text: '$ cat focus.txt' },
            { type: 'out', text: 'threat detection & incident response', cls: 't-out' },
            { type: 'out', text: 'AI-driven security tooling', cls: 't-out' },
            { type: 'out', text: 'LLM agents with guardrails', cls: 't-out' },
            { type: 'cmd', text: '$ ./deploy --target=production' },
            { type: 'out', text: '▸ clearance status ............. [ACTIVE]', cls: 't-ok' },
            { type: 'out', text: '▸ threat hunts ................. [RUNNING]', cls: 't-ok' },
            { type: 'out', text: '▸ building AI agents ........... [READY]', cls: 't-ok' },
            { type: 'out', text: 'status: online', cls: 't-acc' }
        ];

        let li = 0, ci = 0, current = '';
        const cursor = document.createElement('span');
        cursor.className = 'term-cursor';

        function typeLine() {
            if (li >= lines.length) {
                body.appendChild(cursor);
                return;
            }
            const line = lines[li];

            if (line.type === 'cmd') {
                // type out command char by char
                if (ci === 0) current = document.createElement('span');
                if (ci === 0) {
                    current.className = 't-line t-cmd';
                    body.appendChild(current);
                }
                current.textContent = line.text.slice(0, ci + 1);
                body.appendChild(cursor);
                ci++;
                if (ci < line.text.length) {
                    setTimeout(typeLine, prefersReducedMotion ? 0 : 34);
                } else {
                    ci = 0; li++;
                    setTimeout(typeLine, prefersReducedMotion ? 0 : 240);
                }
            } else {
                const el = document.createElement('span');
                el.className = 't-line ' + (line.cls || 't-out');
                el.textContent = line.text;
                body.appendChild(el);
                li++;
                setTimeout(typeLine, prefersReducedMotion ? 0 : 150);
            }
            // keep cursor as last child
            const c = body.querySelector('.term-cursor');
            if (c) c.remove();
        }

        if (prefersReducedMotion) {
            lines.forEach(l => {
                const el = document.createElement('span');
                el.className = 't-line ' + (l.type === 'cmd' ? 't-cmd' : l.cls || 't-out');
                el.textContent = l.text;
                body.appendChild(el);
            });
            body.appendChild(cursor);
        } else {
            setTimeout(typeLine, 500);
        }
    }

    /* ---------------- project rendering ---------------- */
    function initProjects() {
        const grid = document.getElementById('projects-grid');
        if (!grid || typeof PROJECTS === 'undefined') return;

        const BADGE_LABEL = { ai: 'AI', security: 'Security', work: 'Work', cert: 'Certification' };

        PROJECTS.slice().reverse().forEach(function (p) {
            const card = document.createElement('article');
            card.className = 'project-card reveal';
            card.id = 'project-' + p.id;

            const badge = document.createElement('span');
            badge.className = 'p-badge ' + p.category;
            badge.textContent = BADGE_LABEL[p.category] || p.category;

            const date = document.createElement('span');
            date.className = 'p-date';
            date.textContent = p.date || '';

            const top = document.createElement('div');
            top.className = 'p-card-top';
            top.appendChild(badge);
            top.appendChild(date);

            const h3 = document.createElement('h3');
            h3.textContent = p.title;

            const summary = document.createElement('p');
            summary.className = 'p-summary';
            summary.textContent = p.summary;

            card.appendChild(top);
            card.appendChild(h3);
            card.appendChild(summary);

            if (p.tags && p.tags.length) {
                const tags = document.createElement('div');
                tags.className = 'tags';
                p.tags.forEach(function (t) {
                    const s = document.createElement('span');
                    s.className = 'tag';
                    s.textContent = t;
                    tags.appendChild(s);
                });
                card.appendChild(tags);
            }

            if (p.links && Object.keys(p.links).length) {
                const links = document.createElement('div');
                links.className = 'p-links';
                const LABELS = { repo: 'repo ▸', demo: 'demo ▸', verify: 'verify ▸' };
                Object.keys(p.links).forEach(function (k) {
                    const a = document.createElement('a');
                    a.className = 'p-link';
                    a.href = p.links[k];
                    a.target = '_blank';
                    a.rel = 'noopener';
                    a.textContent = LABELS[k] || k;
                    links.appendChild(a);
                });
                card.appendChild(links);
            }

            grid.appendChild(card);
        });
    }

    /* ---------------- nav ---------------- */
    function initNav() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        window.addEventListener('scroll', function () {
            if (window.scrollY > 40) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }, { passive: true });

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', function () {
                const open = navLinks.classList.toggle('open');
                hamburger.classList.toggle('open', open);
                hamburger.setAttribute('aria-expanded', open);
            });
            navLinks.querySelectorAll('a').forEach(function (a) {
                a.addEventListener('click', function () {
                    navLinks.classList.remove('open');
                    hamburger.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                });
            });
        }
    }

    /* ---------------- reveal on scroll ---------------- */
    function initReveals() {
        const els = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.classList.add('visible'); });
            return;
        }
        const obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        els.forEach(function (el) { obs.observe(el); });
    }

    /* ---------------- Formspree handler ---------------- */
    function initForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        const status = document.getElementById('formStatus');

        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.textContent;

            try {
                btn.disabled = true;
                btn.textContent = 'Sending...';
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                if (!res.ok) throw new Error('submit failed');
                status.className = 'form-status success';
                status.textContent = '✓ Message sent — I\'ll get back to you soon.';
                form.reset();
                btn.textContent = '✓ Sent!';
                setTimeout(function () {
                    btn.disabled = false;
                    btn.textContent = original;
                    status.textContent = '';
                    status.className = 'form-status';
                }, 4000);
            } catch (err) {
                status.className = 'form-status error';
                status.textContent = '✗ Error sending — try again or email me directly.';
                btn.disabled = false;
                btn.textContent = original;
            }
        });
    }

    /* ---------------- boot ---------------- */
    document.addEventListener('DOMContentLoaded', function () {
        initParticles();
        initTerminal();
        initProjects();
        initNav();
        initReveals();
        initForm();

        const yr = document.getElementById('year');
        if (yr) yr.textContent = new Date().getFullYear();

        console.log('%c🛡️ jswinney.com online — AI × Security', 'color:#22e0ff;font-weight:bold');
    });
})();
