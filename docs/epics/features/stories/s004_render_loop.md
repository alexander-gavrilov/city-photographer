# Story: Render Loop Setup

**Feature:** [Core Scene Setup](../f001_core_scene_setup.md)

**Description:** Create a function that uses requestAnimationFrame to draw the scene repeatedly, creating the illusion of motion.

**Requirements:** Must use requestAnimationFrame for efficiency. Must call renderer.render inside the loop.

**Constraints:** The function should call itself via requestAnimationFrame.

**Acceptance Criteria:**
*   [x] The animate function is defined
*   [x] requestAnimationFrame(animate) is called within the animate function
*   [x] renderer.render(scene, camera) is called within the animate function
*   [x] The animate function is called once initially to start the loop

**Tasks:**
- [Create Animate Function](tasks/e001f001s004t012_create_animate_function.md)
- [Call Renderer Render](tasks/e001f001s004t013_call_renderer_render.md)
- [Call Animate](tasks/e001f001s004t014_call_animate.md)
