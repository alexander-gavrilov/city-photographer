# Task: Add Photo Action Listener

**Story:** [Photo Action](../s011_photo_action.md)

**Description:** Add an event listener for the photo action (left mouse click).

**Requirements:** Listen for mouse click event and trigger a function when pressed.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Event listener for mouse click is added
- [ ] Event listener works with pointer lock
- [ ] Click events trigger a specific function

**Implementation Details:**
```javascript
// Track photo action state
let photoActionReady = true;
const photoActionCooldown = 500; // ms

// Function to handle photo action
function handlePhotoAction(event) {
    // Check if action is ready and it's a left mouse click
    if (photoActionReady && event.button === 0) {
        // Prevent rapid clicking
        photoActionReady = false;
        setTimeout(() => { photoActionReady = true; }, photoActionCooldown);
        
        // Perform the photo action
        takePhoto();
        
        console.log('Photo action triggered');
    }
}

// Add photo action event listener
document.addEventListener('mousedown', handlePhotoAction);
```

**Location:** Add this code to main.js, after the mouse event listeners but before the animation loop
