# Task: Create Animate Function

**Story:** [Render Loop Setup](../s004_render_loop.md)

**Description:** Define the main loop function that will handle animation frames.

**Requirements:** Create a function that uses requestAnimationFrame.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [x] The animate function is defined
- [x] The function calls requestAnimationFrame on itself

**Implementation Details:**
```javascript
function animate() {
    requestAnimationFrame(animate);
    // Render calls and updates will be added here
}
```

**Location:** This function should be defined in main.js, after all Three.js object initialization
