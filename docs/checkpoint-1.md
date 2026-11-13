# Checkpoint 1 — flight path only

Ready for local review; not approved, committed, pushed, or deployed.

Inspection found full circular SVG arcs attached to interpolated connectors and the full-width footer treated as a content stop. The new geometry uses two tangent-matched cubic curves per teardrop loop, plus vertical approaches and departures. Crossings happen in the gaps between measured section bounds (including rotated photo bounds). Desktop loops occupy the empty side of each section; narrow screens keep small loops in the left gutter. The route ends outside contact copy, above the contact section on desktop and in its left gutter on mobile. Scroll milestones allocate a short interval to each loop, with no pause or scroll interception. Reverse scrolling maps to identical path positions.

Content, section order, colors, photos, video, opening animation, introduction, detail transitions, and typography are unchanged. Reduced-motion CSS continues to hide the decorative route and plane. Existing links, buttons, and dialog keyboard behavior are unchanged. Graduation remains June, 2028; the user was asked to verify it.

Actually checked: production build; JavaScript syntax; 12 Node tests. New geometry tests sample curves at 320, 375, 650, 651, 768, 1024, 1440, and 1920 px using synthetic layouts, checking tangent continuity, plane clearance, viewport bounds, increasing scroll milestones, landing bounds, and deterministic forward/reverse mapping. Synthetic geometry checks do not establish browser layout correctness.

Browser limitation: installed Chrome headless exited with code 134 before rendering. The live website was unavailable through the browsing tool. Actual scroll in both directions, narrow layout, resizing, refresh, focus/keyboard access, links, and reduced-motion rendering still need browser review.

Open ../preview.html and scroll from projects through Contact. Inspect loops in both directions and the final resting position. Resize to a narrow window and repeat. Enable reduced motion to confirm the route disappears while all content stays available. Do not begin checkpoint 2 until the user gives feedback.
