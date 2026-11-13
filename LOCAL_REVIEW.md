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

All project media placeholders have now been replaced with supplied assets:

First-year ZOR photo is intentionally excluded. Longer project details are deferred and explicitly marked as placeholders.

Chemo_Clearly was confirmed public with the connected GitHub API and included. TME Navigator and NRTR website were publicly accessible. RiskScope is now confirmed public through connected GitHub repository metadata and its title includes the GitHub link. No Neuramod GitHub repository was supplied, so its independent link says Website. Contact links use the provided destinations; LinkedIn and email delivery were not tested.

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

## Chemo Clearly demo

The provided 22.83-second, 1280 × 720 H.264 MP4 is copied unchanged to assets/chemo-clearly-demo.mp4 (1,202,209 bytes). A poster frame is extracted at one second. It replaces this project's image placeholder, loops muted while visible, pauses offscreen or while a detail overlay is open, and keeps native playback controls. Reduced motion disables autoplay. The project title and Explore project still open the detail view; GitHub remains independent. The source file is unchanged. FFmpeg decoded the entire local copy successfully; actual browser autoplay/loop playback remains unverified here.

The Chemo Clearly preview now uses assets/chemo-clearly-loop.mp4: the first 13.7 seconds of the original, removing the final 40%. The original MP4 remains unchanged. The shorter copy has no audio track and loops with native playback chrome disabled. A compact Play/Pause demo button below the image supports manual pause, reduced motion, and blocked autoplay. This is a repeating clip; the source was not edited into a seamless last-frame/first-frame match.

## Club experience

Added Triton Neurotech: EMG Piano directly after Neuramod and before Education, using the supplied Delsys_8_web.jpg image unchanged and the user's exact summary. No role, dates, links, or additional performance claims were added. This is a normal content stop on the existing flight route. The image reference and prose are in index.html. Graduation June 2028 has been reconfirmed by the user.

## PDAC TME Navigator video

Added the supplied eight-second 1280 × 720 video as assets/tme-navigator-loop.mp4, with a one-second poster frame. Preserved the complete video stream without re-encoding, removed audio from the local copy, and moved MP4 metadata to the beginning for browser playback. The source in Downloads is untouched. Uses the existing muted looping project preview with controls below the image, offscreen pause, and manual playback for reduced motion. Summary and GitHub link are unchanged. FFmpeg decoded the complete copy successfully; browser playback remains to be reviewed.

## PDAC RiskScope image

Added the supplied histology image unchanged as assets/riskscope-histology.png, shown in full without cropping. Its source filename identifies a schwannoma WHO G1 slide, so the visible caption says “Illustrative histology image”; it is not presented as pancreatic tissue or a slide from the project dataset. The approved project summary remains unchanged.

## Introduction

Added the user's three-paragraph introduction beneath the name/navigation and before projects, preserving their exact wording. The closing “let's talk.” links to Contact. The introduction is an unnumbered flight-path stop with the shared cutout heading and clean body text. The existing section numbers and relative order are unchanged.

## Chemo Clearly project details

The Explore Project view now contains the supplied subtitle and six compact sections: The problem, What I’m building, How it works, My role, Current stage, and Technologies. The process is a four-item list and Technologies links to the existing GitHub repository. The supplied prototype/R-CHOP wording is preserved. Main-page summary is unchanged; other project detail views retain their placeholders. Editable content is in the first project's details object in content.js.

## PDAC TME Navigator project details

Added the supplied research-focused subtitle and five sections using the shared compact detail layout. Results explicitly identify a held-out cell-level reference split and state that the metrics are not clinical or patient-level validation. Main-page summary, preview video, and repository link are unchanged.

## PDAC RiskScope project details

Added the supplied question, approach, evaluation, and technologies sections with the GitHub link. Approach and evaluation retain separate paragraphs for readability. The audit findings, pending full corrected run, and warning that historical estimates are not final results are preserved. The main-page short summary and illustrative histology image remain unchanged. These statements are user-supplied project content, not independent verification of the research.

## Neuramod / NRTR Health project details

Added the supplied detail title, subtitle, product description, role, six contribution bullets, technologies, and website link. The role explicitly includes coordinating developers and technical contributors; no sole-authorship or clinical-validation claims were added. Main-page title and short summary remain unchanged.
