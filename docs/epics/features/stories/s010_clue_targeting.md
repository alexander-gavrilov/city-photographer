# Story: Clue Targeting

**Feature:** [Interactive Clue Setup](../f004_interactive_clue_setup.md)

**Description:** Implement a system to determine which object in the 3D scene the center of the player's screen is pointing at.

**Requirements:** Use Three.js raycasting. The ray must originate from the camera's position and extend forward.

**Constraints:** Raycasting should be performed periodically or on specific events.

**Acceptance Criteria:**
*   [ ] A THREE.Raycaster instance is created
*   [ ] Raycasting is performed from the camera's position and direction
*   [ ] The code correctly identifies when the ray intersects the 'clue' object
*   [ ] (Optional) Visual feedback indicates when the clue is targeted

**Tasks:**
- [Implement Raycasting](tasks/e001f004s010t033_implement_raycasting.md)
- [Perform Raycast](tasks/e001f004s010t034_perform_raycast.md)
- [Check Clue Intersection](tasks/e001f004s010t035_check_intersection.md)
- [Add Visual Feedback](tasks/e001f004s010t036_add_visual_feedback.md)
