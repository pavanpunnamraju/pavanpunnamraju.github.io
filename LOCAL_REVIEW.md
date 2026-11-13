# Pavan Punnamraju portfolio — local review

Intended repository: https://github.com/pavanpunnamraju/pavanpunnamraju.github.io.git

The user cloned the intended repository into pavanpunnamraju.github.io. Its original README.md is preserved. The implementation now lives in that actual checkout, with origin set to the requested repository. No implementation commits, pushes, visibility changes, Pages configuration, or publication were performed.

## Preview

Open `preview.html` directly in a browser. It bundles the same CSS, content, and JavaScript as the production source and needs no server. Rebuild it after editing:

```sh
cd /Users/pavanpunnamraju/Documents/Personal_Website/pavanpunnamraju.github.io
npm run build
```

For a normal local HTTP preview, run in your Terminal:

```sh
cd /Users/pavanpunnamraju/Documents/Personal_Website/pavanpunnamraju.github.io
npm run dev
```

Visit http://127.0.0.1:5173. Stop with Ctrl-C. No npm install is required. Node 22 and Python 3 were available during development. The agent sandbox blocked binding the preview port; the server has not been verified running here.

`npm run build` creates GitHub Pages-compatible static files in `dist/`. `npm test` runs local source/resource/contrast checks. No hosting workflow is configured.

## Update content

Edit `content.js` for approved summaries, project URLs, photo references, captions, and video reference. Education and contact are in `index.html`. Layout and colors are in `style.css`. Interaction logic is in `app.js`.

Missing images (all labeled placeholders):
- Chemo Education project image
- PDAC TME Navigator project image
- PDAC RiskScope project image
- Neuramod project image

First-year ZOR photo is intentionally excluded. Longer project details are deferred and explicitly marked as placeholders.

Chemo_Clearly was confirmed public with the connected GitHub API and included. TME Navigator and NRTR website were publicly accessible. RiskScope returned public 404 and is omitted. No Neuramod GitHub repository was supplied, so its independent link says Website. Contact links use the provided destinations; LinkedIn and email delivery were not tested.

## Personal media integrated

All four supplied personal photos are installed in assets/ with the approved captions and their full aspect ratios. Originals in Downloads are untouched.

The supplied 35,765,864-byte MOV is preserved as originals/dance-original.mov; its SHA-256 matches the source. A silent H.264 MP4 (894 × 674, 30 fps, 17.33 seconds, 3,005,991 bytes) is connected in content.js. FFmpeg fully decoded the MP4 without errors. Browser playback remains unverified because browser execution is blocked in this environment.

The component assigns its source only when visible, attempts muted inline playback, pauses offscreen, and has native controls and a manual-play fallback. Reduced motion disables autoplay. The original folder is excluded from builds and ignored by Git. Conversion used:

```sh
ffmpeg -i originals/dance-original.mov -vf fps=30 -c:v libx264 -crf 24 -preset medium -pix_fmt yuv420p -an -movflags +faststart assets/dance.mp4
```

## Verification actually performed

Passed: JavaScript syntax check; static production build; three Node tests for project order/link omission, production local references, and WCAG AA normal-text contrast for the four text/accent colors on both blue surfaces.

Blocked/unverified: desktop and narrow mobile rendering, scroll/reverse route, overlay repeat open/close and scroll restoration, Escape/focus containment and restoration, reduced motion, actual video playback, browser console, refresh and resize behavior. The sandbox denied the server socket; installed Chrome headless exited with code 134. Browser QA must be completed before publication. No screenshots were produced.

## Animation choices and review checklist

The opening uses a quick CSS perspective/clip-path stylized fold, not a physically simulated origami fold. Overlay unfold/close uses the airplane's viewport position as its origin. The page uses normal scrolling; the SVG path recomputes from section bounds on resize. Desktop paths alternate sides; mobile uses a narrow left gutter with small loops to protect content. This mobile simplification is deliberate. Reduced motion hides the route/plane and removes fold transitions. System handwriting fonts are used without third-party font requests; exact handwritten appearance varies by device.

Before approving publication, check in Chrome and Safari at desktop and 375px widths:
1. Scroll forward/backward through the quote and every stop; check route clearance and loop speed.
2. Open each project from image/title/details, press Tab and Shift-Tab, close with Escape and Close; repeat and confirm focus/scroll restoration.
3. Resize at the middle and bottom; refresh while scrolled; check no horizontal overflow.
4. Enable reduced motion; confirm readable quote, all content, overlays, and manual video controls.
5. After adding media, test video fade/autoplay, blocked autoplay, manual pause, leaving/re-entering view, and network errors.
6. Inspect console and network requests; verify all external destinations manually.
