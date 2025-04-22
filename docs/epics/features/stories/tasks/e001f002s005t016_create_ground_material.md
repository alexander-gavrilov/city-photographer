# Task: Create Ground Material

**Story:** [Ground Surface Setup](../s005_ground_surface.md)

**Description:** Define the appearance of the ground surface.

**Requirements:** Create a material for the ground with an appropriate color.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] A material instance is created (MeshBasicMaterial or MeshLambertMaterial)
- [ ] The material has an appropriate color (e.g., #808080 for gray)

**Implementation Details:**
```javascript
const groundMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x808080 
});
```

**Location:** This code should be added to main.js, after the ground geometry creation
