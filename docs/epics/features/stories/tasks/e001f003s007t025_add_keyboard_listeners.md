# Task: Add Keyboard Event Listeners

**Story:** [Keyboard Movement](../s007_keyboard_movement.md)

**Description:** Set up listeners to detect when movement keys are pressed and released.

**Requirements:** Add event listeners for keydown and keyup events.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] keydown event listener is added to window
- [ ] keyup event listener is added to window
- [ ] Event handlers are properly bound to their functions

**Implementation Details:**
```javascript
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    // Will be implemented in next task
}

function handleKeyUp(event) {
    // Will be implemented in next task
}
```

**Location:** This code should be added to main.js, after scene setup but before the animation loop
