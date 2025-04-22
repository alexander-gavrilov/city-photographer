# Task: Update Camera Rotation

**Story:** [Mouse Look](../s008_mouse_look.md)

**Description:** Update camera rotation based on mouse movement.

**Requirements:** Apply yaw and pitch rotations with vertical angle limits.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Horizontal mouse movement rotates camera left/right (yaw)
- [ ] Vertical mouse movement rotates camera up/down (pitch)
- [ ] Vertical rotation is clamped to prevent flipping
- [ ] Movement is smooth and responsive

**Implementation Details:**
```javascript
// Track rotation state
const rotation = {
    x: 0, // pitch
    y: 0  // yaw
};

function updateCameraRotation() {
    if (document.pointerLockElement === canvas) {
        // Update rotation based on mouse movement
        rotation.y -= mouse.x * mouseSensitivity;
        rotation.x -= mouse.y * mouseSensitivity;
        
        // Clamp vertical rotation to prevent flipping
        rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.x));
        
        // Apply rotation
        camera.rotation.order = 'YXZ'; // This order prevents gimbal lock
        camera.rotation.x = rotation.x;
        camera.rotation.y = rotation.y;
    }
}

// Update animate function to include rotation:
function animate() {
    requestAnimationFrame(animate);
    
    updateCameraPosition();
    updateCameraRotation();
    
    renderer.render(scene, camera);
}
```

**Location:** Add updateCameraRotation function to main.js and update the animate function to call it before rendering
