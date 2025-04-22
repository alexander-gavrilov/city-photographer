# Task: Create Barrier Object

**Story:** [Area Access](../s012_area_access.md)

**Description:** Create a physical barrier that initially blocks access to a new area.

**Requirements:** Create a visible barrier mesh that can be removed later.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Barrier mesh is created and visible
- [ ] Barrier effectively blocks player movement
- [ ] Barrier position creates an obvious blocked path
- [ ] Barrier has appropriate visual style

**Implementation Details:**
```javascript
// Create barrier geometry and material
const barrierGeometry = new THREE.BoxGeometry(10, 4, 1);
const barrierMaterial = new THREE.MeshBasicMaterial({
    color: 0xff4444,
    transparent: true,
    opacity: 0.7
});

// Create barrier mesh
const barrier = new THREE.Mesh(barrierGeometry, barrierMaterial);
barrier.name = 'accessBarrier';

// Position barrier to block an interesting path
barrier.position.set(0, 2, -15);

// Add to scene
scene.add(barrier);

// Function to remove barrier (called by photo reaction)
function removeBarrier() {
    const duration = 1500; // ms
    const startTime = Date.now();
    const startOpacity = barrier.material.opacity;
    
    function animateBarrierRemoval() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Fade out barrier
        barrier.material.opacity = startOpacity * (1 - progress);
        
        if (progress < 1) {
            requestAnimationFrame(animateBarrierRemoval);
        } else {
            // Remove barrier from scene
            scene.remove(barrier);
        }
    }
    
    animateBarrierRemoval();
}
```

**Location:** This code should be added to main.js, after clue object creation but before animation loop
