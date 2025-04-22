# Task: Create Building Materials

**Story:** [Building Structures](../s006_building_structures.md)

**Description:** Define the appearance of the buildings.

**Requirements:** Create materials with different colors for visual variety.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Multiple material instances are created with different colors
- [ ] Colors are visually distinct from the ground

**Implementation Details:**
```javascript
const buildingMaterials = [
    new THREE.MeshBasicMaterial({ color: 0x808080 }), // Gray
    new THREE.MeshBasicMaterial({ color: 0xa52a2a }), // Brown
    new THREE.MeshBasicMaterial({ color: 0x696969 })  // Dim Gray
];
```

**Location:** This code should be added to main.js, after building geometry creation
