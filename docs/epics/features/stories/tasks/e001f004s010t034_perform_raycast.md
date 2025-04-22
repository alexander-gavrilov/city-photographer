# Task: Perform Raycast

**Story:** [Clue Targeting](../s010_clue_targeting.md)

**Description:** Implement the logic to perform raycasting and get intersected objects.

**Requirements:** Perform raycasting in the animation loop and store the results.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Raycast is performed in each animation frame
- [ ] Intersections are stored for later processing
- [ ] Performance optimization is considered (e.g., array reuse)

**Implementation Details:**
```javascript
// Array to store intersections
const intersects = [];

// Function to perform raycast
function performRaycast() {
    // Clear previous results
    intersects.length = 0;
    
    // Perform raycast
    raycaster.intersectObjects(scene.children, true, intersects);
}
```

**Location:** Add this function to main.js and call it from the animation loop
