# Task: Set Renderer Size

**Story:** [Initialize Three.js Components](../s003_initialize_threejs.md)

**Description:** Configure the renderer's output resolution.

**Requirements:** Set renderer size to match window dimensions and handle window resizing.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [x] Renderer size matches window dimensions
- [x] Window resize events update the renderer size
- [x] Camera aspect ratio is updated on resize

**Implementation Details:**
```javascript
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
```

**Location:** This code should be in main.js, after the renderer creation
