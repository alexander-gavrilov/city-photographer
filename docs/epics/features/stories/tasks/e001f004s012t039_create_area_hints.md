# Task: Create Area Hints

**Story:** [Area Access](../s012_area_access.md)

**Description:** Add visual elements to hint at the importance of the newly accessible area.

**Requirements:** Create subtle visual cues that draw attention to the area behind the barrier.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Visual hints are created and positioned
- [ ] Hints are visible once barrier is removed
- [ ] Hints guide player toward the new area
- [ ] Hints match the game's aesthetic

**Implementation Details:**
```javascript
// Create hint lights or particles
const hintGeometry = new THREE.SphereGeometry(0.2, 16, 16);
const hintMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.6
});

const hints = [];
const hintPositions = [
    [-2, 1, -16],
    [0, 1, -17],
    [2, 1, -16],
    [0, 1, -18]
];

// Create and position hint objects
hintPositions.forEach(pos => {
    const hint = new THREE.Mesh(hintGeometry, hintMaterial.clone());
    hint.position.set(...pos);
    hints.push(hint);
});

// Function to reveal hints after barrier removal
function revealHints() {
    hints.forEach((hint, index) => {
        // Start invisible
        hint.material.opacity = 0;
        scene.add(hint);
        
        // Fade in with delay based on index
        setTimeout(() => {
            const startTime = Date.now();
            const duration = 1000;
            
            function animateHintReveal() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                hint.material.opacity = 0.6 * progress;
                hint.position.y = pos[1] + Math.sin(Date.now() * 0.002) * 0.2; // Gentle float
                
                if (progress < 1) {
                    requestAnimationFrame(animateHintReveal);
                }
            }
            
            animateHintReveal();
        }, index * 200);
    });
}

// Update removeBarrier function to include hint reveal
function removeBarrier() {
    // ... existing barrier removal code ...
    
    // Add hint reveal after barrier starts fading
    setTimeout(revealHints, 500);
}
```

**Location:** This code should be added to main.js, after barrier creation code
