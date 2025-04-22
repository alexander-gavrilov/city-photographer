# Task: Create Building Geometries

**Story:** [Building Structures](../s006_building_structures.md)

**Description:** Define the basic cube shapes for buildings.

**Requirements:** Create BoxGeometry instances for building shapes.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] BoxGeometry instance(s) created with appropriate dimensions
- [ ] Dimensions are set to create building-like proportions (e.g., 5x10x5)

**Implementation Details:**
```javascript
const buildingGeometry = new THREE.BoxGeometry(5, 10, 5);
// This geometry can be reused for multiple buildings
```

**Location:** This code should be added to main.js, after ground setup but before the animation loop
