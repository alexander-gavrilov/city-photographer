# Story: Photo Action

**Feature:** [Interactive Clue Setup](../f004_interactive_clue_setup.md)

**Description:** Implement an input action that, when performed while the camera is aimed at the clue, triggers a predefined event in the game world.

**Requirements:** Must listen for a specific input event. Must check if the clue is currently targeted when the event occurs.

**Constraints:** The trigger action should be distinct from movement (e.g., left mouse click).

**Acceptance Criteria:**
*   [x] Clicking the left mouse button triggers an event check
*   [x] If the clue is currently targeted when clicked, a specific function is called
*   [x] The reaction function modifies the environment in some way

**Tasks:**
- [Add Photo Action Listener](tasks/e001f004s011t037_add_photo_action.md)
- [Check Targeting on Action](tasks/e001f004s011t038_check_targeting.md)
- [Implement Reaction](tasks/e001f004s011t039_implement_reaction.md)
