# Task: Add Debug GUI

**Story:** [Keyboard Movement](../s007_keyboard_movement.md)

**Description:** Add dat.GUI interface for debugging movement controls and camera position.

**Requirements:** Add GUI controls to adjust and monitor movement parameters.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Add dat.GUI library
- [ ] Create movement controls folder
- [ ] Add moveSpeed control
- [ ] Add camera position monitors
- [ ] Add key state indicators

**Implementation Details:**
```javascript
// Add GUI controls for debugging
const gui = new dat.GUI();
const movementFolder = gui.addFolder('Movement');
movementFolder.add(controls, 'moveSpeed', 0.01, 1.0).name('Move Speed');
movementFolder.add(camera.position, 'x').listen();
movementFolder.add(camera.position, 'y').listen();
movementFolder.add(camera.position, 'z').listen();
```
