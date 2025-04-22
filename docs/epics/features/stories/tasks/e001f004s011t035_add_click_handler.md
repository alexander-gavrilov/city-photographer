# Task: Add Click Event Handler

**Story:** [Photo Action](../s011_photo_action.md)

**Description:** Implement click event handling for taking photos.

**Requirements:** Detect mouse clicks and trigger photo action when clue is targeted.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Click event listener is added
- [ ] Only left mouse button triggers the action
- [ ] Click only registers when clue is targeted
- [ ] Visual feedback when photo is taken

**Implementation Details:**
```javascript
// Track if photo action is available
let canTakePhoto = true;

// Add click handler
canvas.addEventListener('click', (event) => {
    // Only handle left clicks
    if (event.button !== 0) return;
    
    // Only take photo if clue is targeted and action is available
    if (isClueTargeted && canTakePhoto) {
        takePhoto();
    }
});

function takePhoto() {
    // Prevent rapid-fire clicking
    canTakePhoto = false;
    
    // Flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.1s;
    `;
    document.body.appendChild(flash);
    
    // Flash animation
    requestAnimationFrame(() => {
        flash.style.opacity = '0.6';
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => {
                flash.remove();
                canTakePhoto = true;
            }, 100);
        }, 50);
    });
    
    // Trigger photo reaction
    triggerPhotoReaction();
}
```

**Location:** This code should be added to main.js, after clue targeting implementation
