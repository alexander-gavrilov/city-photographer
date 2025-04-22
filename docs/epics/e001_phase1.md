# Epic: Phase 1: Minimal Viable Product (MVP)

**Description:** This Epic focuses on building the absolute core of the game. It includes setting up the 3D environment, implementing basic player movement, and creating the fundamental interaction loop where the player uses the camera on a specific object to trigger a simple environmental change, allowing access to a new small area.

**Goal:** Establish the core technical foundation and the most basic gameplay loop (Move -> Find Clue -> Photograph -> Trigger Reaction) to prove the concept.

**Requirements:** The MVP must demonstrate that a player can navigate a 3D space, identify an interactive object, use a camera-like mechanic on it, and see a direct result in the environment that facilitates minimal progress.

**Constraints:** Keep geometry and materials simple. Focus on functionality over aesthetics. Avoid complex systems like UI, inventory, or advanced physics at this stage.

**Acceptance Criteria (Epic Level):**

*   [x] The application launches and displays a 3D scene.
*   [ ] The player can move and look around the 3D environment.
*   [ ] At least one interactive 'clue' object is present and visually distinct.
*   [ ] The player can target the 'clue' object with the camera mechanic.
*   [ ] 'Photographing' the targeted 'clue' triggers a visible, predefined environmental change.
*   [ ] The environmental change allows the player to access a small, previously blocked area.

**Features:**
- [Core Scene Setup](../features/f001_core_scene_setup.md)
- [Basic Environment Creation](../features/f002_basic_environment_creation.md)
- [Player Movement](../features/f003_player_movement.md)
- [Interactive Clue Setup](../features/f004_interactive_clue_setup.md)
