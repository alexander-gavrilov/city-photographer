# Task: Implement Reaction

**Story:** [Photo Action](../s011_photo_action.md)

**Description:** Implement a reaction that occurs when the clue is successfully photographed.

**Requirements:** Create a function that changes the environment/clue state when triggered.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Clear visual feedback of successful capture
- [ ] Clue state or appearance changes
- [ ] Event is logged or displayed to player

**Implementation Details:**
```javascript
// Track clue capture state
let cluePhotographed = false;

// Function to trigger clue reaction
function triggerClueReaction() {
    // Prevent multiple triggers
    if (cluePhotographed) return;
    
    // Mark as photographed
    cluePhotographed = true;
    
    // Change clue appearance dramatically
    clueMaterial.color.set(0xffff00); // Bright yellow
    clueMaterial.opacity = 1.0;
    
    // Make clue glow (grow and shrink)
    const originalScale = clueObject.scale.clone();
    const expandedScale = originalScale.clone().multiplyScalar(1.5);
    
    // Use animation to grow then shrink
    const duration = 2000; // ms
    const startTime = Date.now();
    
    function animateClueReaction() {
        const elapsed = Date.now() - startTime;
        
        if (elapsed < duration) {
            const phase = elapsed / duration;
            
            // Grow and then shrink
            if (phase < 0.5) {
                const growFactor = phase * 2; // 0 to 1
                clueObject.scale.lerpVectors(
                    originalScale, 
                    expandedScale, 
                    growFactor
                );
            } else {
                const shrinkFactor = (phase - 0.5) * 2; // 0 to 1
                clueObject.scale.lerpVectors(
                    expandedScale, 
                    originalScale, 
                    shrinkFactor
                );
            }
            
            requestAnimationFrame(animateClueReaction);
        } else {
            // Animation complete
            clueObject.scale.copy(originalScale);
            
            // Display success message
            showCaptureMessage('Clue captured!');
        }
    }
    
    animateClueReaction();
}

// Show capture success message
function showCaptureMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.style.position = 'fixed';
    messageElement.style.bottom = '50px';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translateX(-50%)';
    messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    messageElement.style.color = 'white';
    messageElement.style.padding = '15px 30px';
    messageElement.style.borderRadius = '10px';
    messageElement.style.fontFamily = 'Arial, sans-serif';
    messageElement.style.fontSize = '24px';
    messageElement.style.transition = 'opacity 1s';
    messageElement.textContent = message;
    
    document.body.appendChild(messageElement);
    
    // Fade and remove after delay
    setTimeout(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 1000);
    }, 3000);
}
```

**Location:** Add these functions to main.js, after the photo action functions but before the animation loop
