# Task: Create Building Meshes

**Story:** [Building Structures](../s006_building_structures.md)

**Description:** Create multiple building mesh instances by combining geometry and materials.

**Requirements:** Create 3-5 building meshes using the geometry and materials.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] At least 3-5 building mesh instances are created
- [ ] Each building uses the shared geometry but potentially different materials
- [ ] Buildings are named for easy identification (e.g., 'building1', 'building2', etc.)

**Implementation Details:**
```javascript
const buildings = [
    new THREE.Mesh(buildingGeometry, buildingMaterials[0]),
    new THREE.Mesh(buildingGeometry, buildingMaterials[1]),
    new THREE.Mesh(buildingGeometry, buildingMaterials[2]),
    new THREE.Mesh(buildingGeometry, buildingMaterials[0]),
    new THREE.Mesh(buildingGeometry, buildingMaterials[1])
];

buildings.forEach((building, index) => {
    building.name = `building${index + 1}`;
});
```

**Location:** This code should be added to main.js, after building materials creation
