# Story: Initialize Three.js Components

**Feature:** [Core Scene Setup](../f001_core_scene_setup.md)

**Description:** Write the JavaScript code to create the fundamental objects that Three.js needs to render a 3D scene.

**Requirements:** Must instantiate THREE.Scene, THREE.PerspectiveCamera, and THREE.WebGLRenderer. The renderer must be configured to use the HTML canvas.

**Constraints:** Initial camera position should be suitable for a first-person view near the ground. Renderer size should match the canvas size.

**Acceptance Criteria:**
*   [x] scene, camera, and renderer variables are successfully created
*   [x] The renderer is linked to the canvas element
*   [x] The renderer's size is set to the current window dimensions

**Tasks:**
- [Create Scene](tasks/e001f001s003t007_create_scene.md)
- [Create Camera](tasks/e001f001s003t008_create_camera.md)
- [Create Renderer](tasks/e001f001s003t009_create_renderer.md)
- [Set Renderer Size](tasks/e001f001s003t010_set_renderer_size.md)
- [Add Renderer to DOM](tasks/e001f001s003t011_add_renderer_to_dom.md)
