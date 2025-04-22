# Task: Update Camera Position

**Story:** [Keyboard Movement](../s007_keyboard_movement.md)

**Description:** Update the camera's position based on pressed keys and movement speed.

**Requirements:** Move camera based on WASD input relative to its current rotation.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Camera moves forward when W is pressed
- [ ] Camera moves backward when S is pressed
- [ ] Camera strafes left when A is pressed
- [ ] Camera strafes right when D is pressed
- [ ] Movement speed is configurable
- [ ] Movement is smooth and frame-rate independent

**Implementation Details:**
```javascript
const moveSpeed = 0.1;
const direction = new THREE.Vector3();
const sideVector = new THREE.Vector3();

function updateCameraPosition() {
    // Get forward direction from camera's rotation
    direction.set(0, 0, -1).applyQuaternion(camera.quaternion);
    // Get side direction for strafing
    sideVector.set(1, 0, 0).applyQuaternion(camera.quaternion);
    
    // Reset movement velocity
    const velocity = new THREE.Vector3(0, 0, 0);
    
    // Add movement based on pressed keys
    if (keysPressed.w) velocity.add(direction.multiplyScalar(moveSpeed));
    if (keysPressed.s) velocity.sub(direction.multiplyScalar(moveSpeed));
    if (keysPressed.a) velocity.sub(sideVector.multiplyScalar(moveSpeed));
    if (keysPressed.d) velocity.add(sideVector.multiplyScalar(moveSpeed));
    
    // Apply movement
    camera.position.add(velocity);
}

// Add to animation loop:
function animate() {
    requestAnimationFrame(animate);
    
    updateCameraPosition();
    
    renderer.render(scene, camera);
}
```

**Location:** Add updateCameraPosition function to main.js and update the animate function to call it before rendering
