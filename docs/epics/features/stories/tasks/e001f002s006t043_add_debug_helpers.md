# Task: Add Visual Debug Helpers

**Story:** [Building Structures](../s006_building_structures.md)

**Description:** Add temporary visual helpers to verify building positions, distances, and ground plane dimensions.

**Requirements:** Add grid and axis helpers to assist in development and debugging.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Add GridHelper aligned with ground plane
- [ ] Add AxesHelper for coordinate system reference
- [ ] Add visual indicators for building positions
- [ ] Make helpers toggleable for development purposes

**Implementation Details:**
```javascript
// Add grid helper
const gridHelper = new THREE.GridHelper(100, 20);
scene.add(gridHelper);

// Add axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Add position helpers for buildings
buildings.forEach(building => {
    const positionHelper = new THREE.AxesHelper(2);
    building.add(positionHelper);
});
```
