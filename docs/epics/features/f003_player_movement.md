# Feature: Player Movement

**Epic:** [Phase 1: MVP](../e001_phase1.md)

**Description:** This feature implements the controls that allow the player to move the camera through the 3D environment from a first-person perspective.

**Requirements:** The player must be able to move forward, backward, strafe left, and strafe right using keyboard input, and look around using mouse movement.

**Constraints:** Movement should be relatively simple (no jumping, crouching, etc. for MVP). Mouse look should feel intuitive for a first-person view.

**Acceptance Criteria:**
*   [ ] Pressing W, S, A, D keys moves the camera in respective directions
*   [ ] Moving the mouse horizontally rotates the camera left/right
*   [ ] Moving the mouse vertically rotates the camera up/down
*   [ ] Vertical camera rotation is clamped to prevent flipping

**Stories:**
- [Keyboard Movement](stories/s007_keyboard_movement.md)
- [Mouse Look](stories/s008_mouse_look.md)
