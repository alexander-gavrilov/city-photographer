# Task: Calculate Mouse Movement Delta

**Story:** [Mouse Look](../s008_mouse_look.md)

**Description:** Calculate how much the mouse has moved since the last frame.

**Requirements:** Track mouse movement deltas using either movementX/Y or manual calculation.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Mouse movement delta is calculated correctly
- [ ] Works with both pointer lock API and traditional mouse movement
- [ ] Handles different browsers consistently

**Implementation Details:**
```javascript
const mouseSensitivity = 0.002;

function handleMouseMove(event) {
    // If using pointer lock (preferred)
    if (document.pointerLockElement === canvas) {
        mouse.x = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        mouse.y = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    } else {
        // Fallback to manual calculation
        const deltaX = event.clientX - (mouse.x || event.clientX);
        const deltaY = event.clientY - (mouse.y || event.clientY);
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        // Store deltas for rotation
        mouse.deltaX = deltaX;
        mouse.deltaY = deltaY;
    }
}
```

**Location:** This code should update the previously created handleMouseMove function in main.js
