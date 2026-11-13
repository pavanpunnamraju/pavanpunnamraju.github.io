# Checkpoint 3 — project detail unfold/refold

Local prototype for review. No push or deployment. Typography remains deferred.

The 420 ms scale/clip animation is replaced by a 1.1-second SVG panel sequence: dart, wing release, corner release, flat sheet. The sheet starts at the route plane's measured translation, dimensions, and angle, then uses the same silhouette and blue palette. The final sheet retains the existing detail-view surface color. Content appears near the end of the unfold without being stretched. Close remains visible and usable throughout.

Closing reverses the sequence in 0.95 seconds and returns to the plane's position. Escape can interrupt an opening and reverse from its current progress. The animation owns one requestAnimationFrame loop, canceling it before reversal. Reduced motion skips the animation. Scroll position and the opener's focus are restored; scrollbar space is compensated during the body scroll lock. Resize remeasures the target plane and adapts the overlay to the viewport.

Content, summaries, placeholders, links, photos, and section order are unchanged.

Passed: production build, JavaScript syntax, bundled preview parsing, and 29 automated tests. New tests cover start/end geometry, fold continuity, reverse geometry at three viewport widths, and mocked-DOM controller checks for three repeated open/close cycles, Tab containment, scroll/focus restoration, Escape during an opening, and immediate reduced-motion behavior.

These controller checks do not replace browser testing. Actual browser rendering, animation performance, native-dialog focus behavior, mobile resizing, and perceived pacing still need review because browser execution has been unavailable in this environment.

Refresh preview.html or the local HTTP preview. Open any project, watch the wing/corner stages, then close. Also press Escape partway through an opening. Confirm the plane returns without moving the page. Await feedback before checkpoint 4.
