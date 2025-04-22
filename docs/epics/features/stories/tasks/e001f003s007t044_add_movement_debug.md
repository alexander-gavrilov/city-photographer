# Task: Add Movement Debug Visualization

**Story:** [Keyboard Movement](../s007_keyboard_movement.md)

**Description:** Add visual indicators and console logging to debug movement system functionality.

**Requirements:** Add comprehensive debugging tools without affecting the core movement implementation.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Add visual direction indicators for movement axes
- [ ] Add console logging for key events
- [ ] Add console logging for movement calculations
- [ ] Add visual feedback when keys are pressed

**Implementation Details:**
```javascript
// Add visual debug helpers
const debugHelpers = {
    axes: new THREE.AxesHelper(5),
    directionArrow: new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 0),
        3,
        0xffff00
    )
};

// Add debug logging
const debugLog = {
    keyEvent: (type, key, state) => console.log(`[Key ${type}] ${key}: ${state}`),
    movement: (direction, velocity) => console.log(`[Movement] ${direction}:`, velocity.toArray()),
    position: (pos) => console.log('[Position]', pos.toArray())
};
```
