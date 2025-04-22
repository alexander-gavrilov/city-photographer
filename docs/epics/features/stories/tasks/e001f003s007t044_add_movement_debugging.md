# Task: Add Movement Debugging

**Story:** [Keyboard Movement](../s007_keyboard_movement.md)

**Description:** Add comprehensive debug logging to verify keyboard movement system functionality.

**Requirements:** Add console logging to track movement system state and execution flow.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Add logging for key press events
- [ ] Add logging for movement vector calculations
- [ ] Add logging for camera position updates
- [ ] Add visual debug helper for movement direction

**Implementation Details:**
```javascript
// Add debug state object
const debugState = {
    showLogs: true,
    logMovement: true
};

// Add debug logging to movement functions
function debugLog(message, data) {
    if (debugState.showLogs) {
        console.log(`[DEBUG] ${message}`, data || '');
    }
}
```
