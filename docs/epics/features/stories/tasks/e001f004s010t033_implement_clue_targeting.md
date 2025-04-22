# Task: Implement Clue Targeting

**Story:** [Clue Targeting](../s010_clue_targeting.md)

**Description:** Implement raycasting to detect when the player is looking at the clue object.

**Requirements:** Use Three.js Raycaster to detect intersection with clue object.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Raycaster is created and configured
- [ ] Ray is cast from camera center
- [ ] Intersection with clue object is detected
- [ ] Visual feedback when targeting the clue

**Implementation Details:**
```javascript
// Create raycaster
const raycaster = new THREE.Raycaster();
const center = new THREE.Vector2(0, 0);

// Track if clue is targeted
let isClueTargeted = false;

function checkClueTargeting() {
    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(center, camera);
    
    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObject(clueObject);
    
    // Update targeting state
    const wasTargeted = isClueTargeted;
    isClueTargeted = intersects.length > 0;
    
    // Visual feedback when targeted
    if (isClueTargeted !== wasTargeted) {
        clueObject.material.opacity = isClueTargeted ? 1.0 : 0.8;
    }
}

// Add to animation loop:
function animate() {
    requestAnimationFrame(animate);
    
    updateCameraPosition();
    updateCameraRotation();
    animateClue();
    checkClueTargeting();
    
    renderer.render(scene, camera);
}
```

**Location:** This code should be added to main.js, after clue object setup but before the animation loop
