# Task: Create Clue Object Geometry and Material

**Story:** [Interactive Clue](../s009_interactive_clue.md)

**Description:** Create a visually distinct object to serve as the first interactive clue.

**Requirements:** Create a unique geometry and material that stands out from buildings.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] A distinctive geometry is created (e.g., sphere, torus)
- [ ] Material has a bright, noticeable color
- [ ] Object is easily distinguishable from buildings and ground

**Implementation Details:**
```javascript
// Create a glowing sphere for the clue
const clueGeometry = new THREE.SphereGeometry(1, 32, 32);
const clueMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00, // Bright green
    transparent: true,
    opacity: 0.8
});

// Create the clue mesh
const clueObject = new THREE.Mesh(clueGeometry, clueMaterial);
clueObject.name = 'firstClue';
```

**Location:** This code should be added to main.js, after building creation but before the animation loop
