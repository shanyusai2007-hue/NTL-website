# NTL — Next Tech Lab

*Design is an act of Artism.*

This is the official codebase for the Next Tech Lab (NTL) portfolio website. We built this from the ground up to be a completely cinematic, high-end digital experience. Forget standard templates—this site was made to feel like a premium interactive showpiece using raw CSS, vanilla JS, and a lot of caffeine.

## What's under the hood?
We didn't just throw a bunch of bloated libraries together. The tech stack is intentionally lean to keep performance absolutely buttery:

- **No heavy frameworks:** Just ultra-optimized HTML/CSS/JS.
- **Custom Scroll & Physics:** We're running custom cursor tracking with body-zoom compensation (so it doesn't glitch on weird scaling).
- **Cinematic Mode Toggle:** The dark/light theme doesn't just switch colors—it physically triggers a "camera shutter" animation across the DOM.
- **GSAP-style Reveal:** Custom `IntersectionObserver` logic handles all the timeline reveals, typography scrambling (like the footer logo glitch effect), and the parallax on the split imagery.
- **100% Local Assets:** We stripped out all the Unsplash and Framer CDN links. Every image is living locally in `assets/images/` so the site never breaks or hangs.

## The Vibe
The typography is heavily editorial. We rely on **Bebas Neue** for the brutalist, edge-to-edge headlines and **DM Serif Display** when we need that sophisticated magazine feel. 

## Local Dev
If you want to spin this up on your own machine, just run standard Vite or BrowserSync.
```bash
npm run dev
```

## Deployment Notes 🚀

This repo is completely primed for Vercel. 
There's a `vercel.json` already baked in that enforces clean URLs (no ugly `.html` extensions) and strips trailing slashes to keep the routing looking professional.

If you're pushing this live:
1. Throw it on GitHub.
2. Hook the repo to Vercel.
3. Don't touch the build commands—Vercel will natively serve the root directory perfectly.

---
*Built by the team that turned late nights into bright ideas.*
