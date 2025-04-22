# Task: Create Reward Area Content

**Story:** [Area Access](../s012_area_access.md)

**Description:** Create interesting content in the newly accessible area to reward player exploration.

**Requirements:** Add visually distinct elements in the area behind the barrier.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] New area has unique visual elements
- [ ] Content is visible once barrier is removed
- [ ] Area feels rewarding to discover
- [ ] Content hints at future game mechanics or story

**Implementation Details:**
```javascript
// Create a unique structure in the reward area
const rewardGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
const rewardMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd700,
    transparent: true,
    opacity: 0.8
});

const rewardObject = new THREE.Mesh(rewardGeometry, rewardMaterial);
rewardObject.position.set(0, 2, -20);
rewardObject.name = 'mysteriousArtifact';

// Add subtle rotation animation
function animateRewardObject() {
    if (rewardObject.parent) { // Only if it's in the scene
        rewardObject.rotation.x += 0.001;
        rewardObject.rotation.y += 0.002;
        rewardObject.position.y = 2 + Math.sin(Date.now() * 0.001) * 0.3;
    }
}

// Add to animation loop after barrier is removed
function updateAnimations() {
    if (!barrier.parent && !rewardObject.parent) {
        // Barrier is gone but reward isn't shown yet - add it
        scene.add(rewardObject);
    }
    
    animateClue();
    if (rewardObject.parent) {
        animateRewardObject();
    }
}

// Update animate function
function animate() {
    requestAnimationFrame(animate);
    
    updateCameraPosition();
    updateCameraRotation();
    updateAnimations();
    checkClueTargeting();
    
    renderer.render(scene, camera);
}
```

**Location:** This code should be added to main.js, after the barrier and hints code
