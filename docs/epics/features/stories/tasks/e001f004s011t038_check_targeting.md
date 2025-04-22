# Task: Check Targeting on Action

**Story:** [Photo Action](../s011_photo_action.md)

**Description:** Check if the clue is currently targeted when the photo action is triggered.

**Requirements:** Use the clue targeting state to determine if the photo was successful.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Photo action checks if clue is targeted
- [ ] Different responses for targeted vs. non-targeted actions
- [ ] Debug feedback for successful targeting

**Implementation Details:**
```javascript
// Function to take a photo
function takePhoto() {
    // Check if the clue is currently targeted
    if (isClueTargeted) {
        // Photo capture was successful
        console.log('Successful photo of clue!');
        
        // Trigger the reaction
        triggerClueReaction();
    } else {
        // Nothing interesting in view
        console.log('Nothing interesting to photograph here');
    }
    
    // Optional: Add camera flash effect
    addFlashEffect();
}

// Add simple flash effect
function addFlashEffect() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = 0;
    flash.style.left = 0;
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'white';
    flash.style.opacity = '0.6';
    flash.style.zIndex = '1000';
    flash.style.pointerEvents = 'none';
    flash.style.transition = 'opacity 0.5s ease-out';
    
    document.body.appendChild(flash);
    
    // Fade out and remove
    setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(flash);
        }, 500);
    }, 50);
}
```

**Location:** Add these functions to main.js, after the clue targeting functions but before the animation loop
