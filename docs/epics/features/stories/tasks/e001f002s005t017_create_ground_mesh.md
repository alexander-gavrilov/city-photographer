# Task: Create Ground Mesh

**Story:** [Ground Surface Setup](../s005_ground_surface.md)

**Description:** Combine the ground geometry and material into a renderable mesh.

**Requirements:** Create a THREE.Mesh instance using the ground geometry and material.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] A mesh instance is created using the ground geometry and material
- [ ] The mesh is named appropriately (e.g., 'ground')

**Implementation Details:**
```javascript
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.name = 'ground';
```

**Location:** This code should be added to main.js, after both geometry and material creation
