# Task: Track Pressed Keys

**Story:** [Keyboard Movement](../s007_keyboard_movement.md)

**Description:** Implement a mechanism to track which movement keys are currently pressed.

**Requirements:** Use a data structure to track the state of W, S, A, D keys.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Data structure exists to track key states
- [ ] Key states are updated in keydown handler
- [ ] Key states are updated in keyup handler
- [ ] Only movement keys (W, S, A, D) are tracked

**Implementation Details:**
```javascript
const keysPressed = {
    w: false,
    s: false,
    a: false,
    d: false
};

function handleKeyDown(event) {
    switch(event.key.toLowerCase()) {
        case 'w': keysPressed.w = true; break;
        case 's': keysPressed.s = true; break;
        case 'a': keysPressed.a = true; break;
        case 'd': keysPressed.d = true; break;
    }
}

function handleKeyUp(event) {
    switch(event.key.toLowerCase()) {
        case 'w': keysPressed.w = false; break;
        case 's': keysPressed.s = false; break;
        case 'a': keysPressed.a = false; break;
        case 'd': keysPressed.d = false; break;
    }
}
```

**Location:** This code should update the previously created keyboard handler functions in main.js
