# Feature: Core Scene Setup

**Epic:** [Phase 1: MVP](../e001_phase1.md)

**Description:** This feature covers setting up the essential components required to render anything in 3D using Three.js and creating the basic HTML page to display it.

**Requirements:** A functional HTML page displaying a Three.js canvas, with a running render loop, a scene, a camera, and a renderer correctly initialized and connected.

**Constraints:** Use a standard CDN link for Three.js. Ensure the canvas is responsive to window resizing initially (or set a fixed size for simplicity in the MVP).

**Acceptance Criteria:**
*   [x] A blank canvas is visible in the browser window.
*   [x] Basic Three.js objects (scene, camera, renderer) are successfully instantiated in the JavaScript console.
*   [x] The animate loop is running.

**Stories:**
- [HTML Page Setup](stories/s001_html_page.md)
- [Include Three.js Library](stories/s002_include_threejs.md)
- [Initialize Three.js Components](stories/s003_initialize_threejs.md)
- [Render Loop Setup](stories/s004_render_loop.md)
