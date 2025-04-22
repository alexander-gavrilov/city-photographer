# Task: Fix Keyboard Movement Implementation

**Story:** [Keyboard Movement](../s007_keyboard_movement.md)

**Description:** Fix keyboard movement implementation to ensure keys properly control camera movement.

**Requirements:** Ensure all components of keyboard movement system work together correctly.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Fix canvas focus handling
- [ ] Fix event listeners and event propagation
- [ ] Fix movement vector calculation
- [ ] Verify key state tracking

**Implementation Details:**
```javascript
// Ensure canvas has focus for keyboard events
canvas.focus();

// Make sure keyboard events are captured
window.addEventListener('keydown', handleKeyDown, false);
window.addEventListener('keyup', handleKeyUp, false);

// Add keydown debug logging
function handleKeyDown(event) {
  const key = event.key.toLowerCase();
  if (keysPressed.hasOwnProperty(key)) {
    event.preventDefault();
    keysPressed[key] = true;
    console.log('Key pressed:', key);
  }
}
```
