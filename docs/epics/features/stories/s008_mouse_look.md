# Story: Mouse Look

**Feature:** [Player Movement](../f003_player_movement.md)

**Description:** Implement event listeners to capture mouse movement and update the camera's rotation based on the mouse's change in position.

**Requirements:** Mouse movement should control the camera's pitch (up/down) and yaw (left/right). Look sensitivity should be adjustable.

**Constraints:** Vertical look (pitch) should be clamped to prevent the camera from flipping upside down.

**Acceptance Criteria:**
*   [x] Moving the mouse horizontally rotates the camera around the Y-axis
*   [x] Moving the mouse vertically rotates the camera around its local X-axis
*   [x] Vertical rotation is limited to a reasonable range (e.g., -90 to +90 degrees)
*   [x] (Optional) Mouse cursor is hidden and captured by the browser window

**Tasks:**
- [Add Mouse Listeners](tasks/e001f003s008t028_add_mouse_listeners.md)
- [Calculate Mouse Delta](tasks/e001f003s008t029_calculate_mouse_delta.md)
- [Update Camera Rotation](tasks/e001f003s008t030_update_camera_rotation.md)
