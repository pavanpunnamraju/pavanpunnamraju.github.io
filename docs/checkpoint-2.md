# Checkpoint 2 — one sheet folding into the airplane

Local prototype awaiting user review. No push or deployment.

The original paper DOM element now remains the animated object throughout the opening and flight. Its SVG panels interpolate through a rectangle, folded-in corners, narrowed wings, and the final dart silhouette. Cream gradually changes into the existing dark/light blue palette. Only the quote copy fades as the fold covers it; the sheet itself stays opaque. The quote and signature each remain once in the DOM in the opening, with their exact text unchanged.

The final folded sheet meets the path's first point with matching size, position, and tangent angle. The same element then follows the existing path. Scroll position drives everything, including reversal; no timed pause, wheel interception, or scroll snapping. Reduced motion retains the static readable notebook and removes flight. Layout changes remeasure the sheet and route. The fold is a stylized SVG panel prototype, not a physical origami simulation.

Removed the separate “Building things. Currently, in healthcare.” introduction. The name and section navigation remain. Project overlays and typography have not been redesigned in this checkpoint.

Passed: static production build, JavaScript syntax, bundled preview syntax, and 25 automated tests. New tests verify starting sheet bounds, exact route join at three viewport sizes, continuous panel coordinates at stage boundaries, endpoint colors, deterministic reverse-scroll calculations, and only one quote with no separate airplane element or old introduction.

Unverified in browser: perceived fold pacing, refresh/resize rendering, actual touch/keyboard navigation, reduced-motion switching, and overlay regression. Chrome could not launch in this environment during prior checks. Refresh preview.html, return to the very top, then slowly scroll forward and backward through the fold. Review before checkpoint 3.
