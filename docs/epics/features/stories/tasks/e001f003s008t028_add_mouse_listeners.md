# Task: Add Mouse Event Listeners

**Story:** [Mouse Look](../s008_mouse_look.md)

**Description:** Set up listeners to detect mouse movement for camera rotation.

**Requirements:** Add mousemove event listener and optionally implement pointer lock.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] mousemove event listener is added to document/canvas
- [ ] Optional: Pointer lock is implemented for better control
- [ ] Event handler function is properly bound

**Implementation Details:**
```javascript
// Initialize mouse state
const mouse = {
    x: 0,
    y: 0
};

// Add mouse move listener
document.addEventListener('mousemove', handleMouseMove);

function handleMouseMove(event) {
    // Will be implemented in next task
}

// Optional: Add pointer lock
canvas.addEventListener('click', () => {
    canvas.requestPointerLock();
});
```

**Location:** This code should be added to main.js, after keyboard input setup but before the animation loop
