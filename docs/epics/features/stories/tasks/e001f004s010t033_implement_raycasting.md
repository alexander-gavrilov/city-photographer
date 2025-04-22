# Task: Implement Raycasting

**Story:** [Clue Targeting](../s010_clue_targeting.md)

**Description:** Create a raycaster object to detect objects in the player's line of sight.

**Requirements:** Set up a THREE.Raycaster instance and configure it for the scene.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] A THREE.Raycaster instance is created
- [ ] Ray direction is set to camera's viewing direction
- [ ] Ray origin is set to camera's position

**Implementation Details:**
```javascript
// Create raycaster
const raycaster = new THREE.Raycaster();
const rayDirection = new THREE.Vector3();

// Function to update raycaster
function updateRaycaster() {
    // Get camera direction
    camera.getWorldDirection(rayDirection);
    
    // Set raycaster origin and direction
    raycaster.set(camera.position, rayDirection);
}
```

**Location:** Add this code to main.js, after camera setup but before the animation loop
