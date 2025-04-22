# Task: Fix Keyboard Event Capture

**Story:** [Keyboard Movement](../s007_keyboard_movement.md)

**Description:** Debug and fix keyboard event capture for movement controls

**Requirements:** Ensure keyboard events are properly captured and logged

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Verify keyboard events are captured by the browser
- [ ] Add visible keyboard state indicator
- [ ] Ensure event.preventDefault() is working
- [ ] Add debug overlay for movement state

**Implementation Details:**
```javascript
// Add debug overlay
const debugOverlay = document.createElement('div');
debugOverlay.style.position = 'fixed';
debugOverlay.style.top = '10px';
debugOverlay.style.left = '10px';
debugOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
debugOverlay.style.color = 'white';
debugOverlay.style.padding = '10px';
debugOverlay.style.fontFamily = 'monospace';
document.body.appendChild(debugOverlay);

function updateDebugOverlay() {
    debugOverlay.textContent = `
    W: ${keysPressed.w}
    A: ${keysPressed.a}
    S: ${keysPressed.s}
    D: ${keysPressed.d}
    Position: ${camera.position.toArray().map(n => n.toFixed(2))}
    `;
}
```
