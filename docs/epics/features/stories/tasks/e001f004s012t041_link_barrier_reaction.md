# Task: Link Barrier to Clue Reaction

**Story:** [Area Access](../s012_area_access.md)

**Description:** Link the barrier's state to the clue reaction, causing it to be removed or altered when the clue is photographed.

**Requirements:** Modify the clue reaction to affect the barrier's state.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Barrier state is updated when clue is photographed
- [ ] Barrier is visibly altered (moved, transparent, etc.)
- [ ] Player collision with barrier is disabled when inactive
- [ ] Visual or audio feedback indicates the barrier change

**Implementation Details:**
```javascript
// Modify the triggerClueReaction function to include barrier removal
function triggerClueReaction() {
    // Previous clue reaction code...
    
    // Add barrier removal after delay
    setTimeout(() => {
        // Deactivate the barrier
        deactivateBarrier();
    }, 2000); // 2 seconds after clue reaction
}

// Function to deactivate barrier
function deactivateBarrier() {
    if (!barrierState.active) return; // Already deactivated
    
    barrierState.active = false;
    
    // Animate barrier removal
    const duration = 1500; // ms
    const startTime = Date.now();
    const startY = barrier.position.y;
    const targetY = -5; // Move below ground
    
    function animateBarrier() {
        const elapsed = Date.now() - startTime;
        
        if (elapsed < duration) {
            const progress = elapsed / duration;
            
            // Move barrier downward
            barrier.position.y = startY - (startY - targetY) * progress;
            
            // Make it fade out
            barrierMaterial.opacity = 0.7 * (1 - progress);
            
            requestAnimationFrame(animateBarrier);
        } else {
            // Animation complete
            barrier.position.y = targetY;
            barrierMaterial.opacity = 0;
            
            // Show message about new area
            showMessage('New area unlocked!');
        }
    }
    
    animateBarrier();
}
```

**Location:** Add the deactivateBarrier function to main.js and modify the existing triggerClueReaction function
