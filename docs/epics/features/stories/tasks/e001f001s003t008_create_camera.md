# Task: Create PerspectiveCamera

**Story:** [Initialize Three.js Components](../s003_initialize_threejs.md)

**Description:** Create the camera that defines the player's viewpoint.

**Requirements:** Create a new THREE.PerspectiveCamera with appropriate FOV, aspect ratio, and initial position.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [x] Camera is created with correct FOV (75 degrees)
- [x] Aspect ratio matches window dimensions
- [x] Near and far clipping planes are set
- [x] Camera is positioned at eye level (y=1.6)

**Implementation Details:**
```javascript
const camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
);
camera.position.set(0, 1.6, 5);
camera.lookAt(0, 1.6, 0);
```

**Location:** This code should be in main.js, after the scene creation
