# Task: Add Lighting System

**Story:** [Building Structures](../s006_building_structures.md)

**Description:** Add a lighting system to enhance the visual appearance of buildings and create a more realistic environment.

**Requirements:** Add ambient and directional lights to properly illuminate the scene.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Add ambient light for base illumination
- [ ] Add directional light for shadows and depth
- [ ] Update materials to MeshStandardMaterial to react to lighting
- [ ] Adjust light intensities for proper visibility

**Implementation Details:**
```javascript
// Add lighting system
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(1, 3, 1);
scene.add(directionalLight);

// Update materials to react to lighting
const buildingMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x808080 }), // Gray
    new THREE.MeshStandardMaterial({ color: 0xa52a2a }), // Brown
    // ...other materials...
];
```
