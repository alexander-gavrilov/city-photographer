# Task: Fix Canvas Focus for Keyboard Events

**Story:** [Keyboard Movement](../s007_keyboard_movement.md)

**Description:** Ensure canvas element properly receives keyboard events

**Requirements:** Canvas element must be focusable and receive keyboard events

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Make canvas focusable
- [ ] Auto-focus canvas on page load
- [ ] Handle focus/blur events
- [ ] Show visual focus indicator

**Implementation Details:**
```javascript
// Make canvas focusable
canvas.setAttribute('tabindex', '0');
// Focus canvas on load
canvas.focus();
```
