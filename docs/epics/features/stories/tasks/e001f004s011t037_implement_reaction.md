# Task: Implement Photo Reaction

**Story:** [Photo Action](../s011_photo_action.md)

**Description:** Implement the reaction that occurs when a photo of the clue is taken.

**Requirements:** Define and trigger environmental changes when the clue is photographed.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Function is called when clue is photographed
- [ ] Clue object shows a visible reaction
- [ ] Environmental change is triggered
- [ ] State change is tracked (clue captured)

**Implementation Details:**
```javascript
// Track clue state
let isCluePhotographed = false;

function triggerPhotoReaction() {
    if (isCluePhotographed) return; // Prevent multiple triggers
    
    isCluePhotographed = true;
    
    // Animate clue disappearance
    const startScale = clueObject.scale.x;
    const startOpacity = clueObject.material.opacity;
    
    const duration = 1000; // ms
    const startTime = Date.now();
    
    function animateDisappearance() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Scale up and fade out
        const scale = startScale * (1 + progress);
        const opacity = startScale * (1 - progress);
        
        clueObject.scale.set(scale, scale, scale);
        clueObject.material.opacity = opacity;
        
        if (progress < 1) {
            requestAnimationFrame(animateDisappearance);
        } else {
            // Remove clue from scene
            scene.remove(clueObject);
            // Trigger barrier removal
            removeBarrier();
        }
    }
    
    animateDisappearance();
}
```

**Location:** This code should be added to main.js, after the photo action handlers
