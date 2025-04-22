// Initialize core Three.js components
const scene = new THREE.Scene();

// Add debug helpers
const gridHelper = new THREE.GridHelper(100, 20);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Create ground plane
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Gray color
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.name = 'ground';

// Rotate to be horizontal (by default PlaneGeometry is vertical)
ground.rotation.x = -Math.PI / 2;

// Add ground to scene
scene.add(ground);

// Create buildings
const buildingMaterials = [
    new THREE.MeshBasicMaterial({ color: 0x808080 }), // Gray
    new THREE.MeshBasicMaterial({ color: 0xa52a2a }), // Brown
    new THREE.MeshBasicMaterial({ color: 0x696969 }), // Dim Gray
    new THREE.MeshBasicMaterial({ color: 0x556b2f }), // Dark Olive Green
    new THREE.MeshBasicMaterial({ color: 0x2f4f4f })  // Dark Slate Gray
];

function createBuilding(width, height, depth, x, z, materialIndex) {
    const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
    const material = buildingMaterials[materialIndex % buildingMaterials.length];
    const building = new THREE.Mesh(buildingGeometry, material);
    building.position.set(x, height/2, z);  // y position is half height to sit on ground
    building.name = `building_${x}_${z}`;
    return building;
}

// Add multiple buildings of different sizes with different materials
const buildings = [
    createBuilding(10, 20, 10, -20, -15, 0),  // Tall building on the left
    createBuilding(15, 15, 15, 20, -20, 1),   // Medium building on the right
    createBuilding(8, 25, 8, -10, 10, 2),     // Skyscraper
    createBuilding(12, 10, 12, 15, 15, 3),    // Shorter building
    createBuilding(20, 30, 20, 0, -30, 4)     // Large central building
];

// Add all buildings to the scene
buildings.forEach(building => scene.add(building));

// Create interactive clue object
const clueGeometry = new THREE.SphereGeometry(1, 32, 32);
const clueMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00, // Bright green
    transparent: true,
    opacity: 0.8
});

// Create the clue mesh
const clueObject = new THREE.Mesh(clueGeometry, clueMaterial);
clueObject.name = 'firstClue';

// Position the clue at eye level near one of the buildings
clueObject.position.set(10, 2, -5);

// Add clue to scene
scene.add(clueObject);

// Create camera with perspective projection
const camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Set initial camera position (eye level, slightly back)
camera.position.set(0, 1.6, 5);
camera.lookAt(0, 1.6, 0);

// Create WebGL renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('gameCanvas'),
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Make canvas focusable for keyboard events
const canvas = renderer.domElement;
canvas.setAttribute('tabindex', '0');
canvas.focus();
canvas.addEventListener('blur', () => {
    // Reset key states when canvas loses focus
    Object.keys(keysPressed).forEach(key => keysPressed[key] = false);
    updateDebugOverlay();
});

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Debug overlay
const debugOverlay = document.createElement('div');
debugOverlay.style.position = 'fixed';
debugOverlay.style.top = '10px';
debugOverlay.style.left = '10px';
debugOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
debugOverlay.style.color = 'white';
debugOverlay.style.padding = '10px';
debugOverlay.style.fontFamily = 'monospace';
document.body.appendChild(debugOverlay);

function updateDebugOverlay() {
    debugOverlay.textContent = `
    Keys Pressed:
    W: ${keysPressed.w}
    A: ${keysPressed.a}
    S: ${keysPressed.s}
    D: ${keysPressed.d}
    Position: ${camera.position.toArray().map(n => n.toFixed(2))}
    `;
}

// Keyboard movement controls
const movementSettings = {
    speed: 0.1,
    enabled: true
};

const keysPressed = {
    w: false,
    s: false,
    a: false,
    d: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// Movement vectors
const direction = new THREE.Vector3();
const sideVector = new THREE.Vector3();

function handleKeyDown(event) {
    const key = event.key;
    // Check if this key is one we're tracking
    if (keysPressed.hasOwnProperty(key.toLowerCase()) || keysPressed.hasOwnProperty(key)) {
        event.preventDefault();
        
        // Update key state
        if (key.toLowerCase() in keysPressed) {
            keysPressed[key.toLowerCase()] = true;
        } else {
            keysPressed[key] = true;
        }
        
        // Log the key press
        console.log('Key down:', key);
        debugOverlay.textContent = `Last key pressed: ${key}\n${debugOverlay.textContent}`;
    }
}

function handleKeyUp(event) {
    const key = event.key;
    // Check if this key is one we're tracking
    if (keysPressed.hasOwnProperty(key.toLowerCase()) || keysPressed.hasOwnProperty(key)) {
        event.preventDefault();
        
        // Update key state
        if (key.toLowerCase() in keysPressed) {
            keysPressed[key.toLowerCase()] = false;
        } else {
            keysPressed[key] = false;
        }
        
        // Log the key release
        console.log('Key up:', key);
    }
}

function updateMovement() {
    // Skip if movement is disabled
    if (!movementSettings.enabled) return;
    
    // Skip if no movement keys are pressed
    if (!Object.values(keysPressed).some(Boolean)) return;
    
    // Compute forward direction vector (based on camera orientation)
    direction.set(0, 0, -1);
    direction.applyQuaternion(camera.quaternion);
    direction.y = 0; // Keep movement on ground plane
    direction.normalize();
    
    // Compute side direction vector for strafing
    sideVector.set(1, 0, 0);
    sideVector.applyQuaternion(camera.quaternion);
    sideVector.normalize();
    
    // Create movement vector
    const movement = new THREE.Vector3();
    
    // Add forward/backward movement
    if (keysPressed.w || keysPressed.ArrowUp) {
        const forwardMove = direction.clone().multiplyScalar(movementSettings.speed);
        movement.add(forwardMove);
        console.log('Moving forward', forwardMove.toArray());
    }
    
    if (keysPressed.s || keysPressed.ArrowDown) {
        const backwardMove = direction.clone().multiplyScalar(movementSettings.speed);
        movement.sub(backwardMove);
        console.log('Moving backward', backwardMove.toArray());
    }
    
    // Add left/right movement
    if (keysPressed.a || keysPressed.ArrowLeft) {
        const leftMove = sideVector.clone().multiplyScalar(movementSettings.speed);
        movement.sub(leftMove);
        console.log('Moving left', leftMove.toArray());
    }
    
    if (keysPressed.d || keysPressed.ArrowRight) {
        const rightMove = sideVector.clone().multiplyScalar(movementSettings.speed);
        movement.add(rightMove);
        console.log('Moving right', rightMove.toArray());
    }
    
    // Apply movement to camera
    if (movement.length() > 0) {
        camera.position.add(movement);
        console.log('New camera position:', camera.position.toArray());
    }
}

// Add keyboard listeners
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Initialize mouse state
const mouse = {
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0
};

// Add mouse move listener
document.addEventListener('mousemove', handleMouseMove);

function handleMouseMove(event) {
    // Calculate mouse movement delta based on pointer lock API
    if (document.pointerLockElement === canvas) {
        // Get movement from pointer lock API (cross-browser compatible)
        mouse.deltaX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        mouse.deltaY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    } else {
        // Fallback to manual calculation
        const newX = event.clientX;
        const newY = event.clientY;
        
        // Calculate deltas
        mouse.deltaX = newX - mouse.x;
        mouse.deltaY = newY - mouse.y;
        
        // Store current position for next frame
        mouse.x = newX;
        mouse.y = newY;
    }
}

// Add pointer lock for better control
canvas.addEventListener('click', () => {
    canvas.requestPointerLock();
});

// Handle pointer lock change
document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === canvas) {
        console.log('Pointer locked');
        document.getElementById('instructions').style.display = 'none';
    } else {
        console.log('Pointer unlocked');
        document.getElementById('instructions').style.display = 'block';
    }
});

// Mouse look sensitivity
const mouseSensitivity = 0.002;

// Create raycaster for clue targeting
const raycaster = new THREE.Raycaster();
const rayDirection = new THREE.Vector3();

// Track camera rotation state
const rotation = {
    x: 0, // pitch (up/down)
    y: 0  // yaw (left/right)
};

// Update camera rotation based on mouse movement
function updateCameraRotation() {
    if (document.pointerLockElement === canvas) {
        // Apply mouse movement to rotation with sensitivity
        rotation.y -= mouse.deltaX * mouseSensitivity;
        rotation.x -= mouse.deltaY * mouseSensitivity;
        
        // Clamp vertical rotation to prevent camera flipping
        rotation.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, rotation.x));
        
        // Apply rotation to camera
        camera.rotation.order = 'YXZ'; // This order prevents gimbal lock
        camera.rotation.x = rotation.x;
        camera.rotation.y = rotation.y;
        
        // Reset deltas
        mouse.deltaX = 0;
        mouse.deltaY = 0;
    }
}

// Array to store intersections
const intersects = [];

// Function to update raycaster and perform raycast
function updateRaycaster() {
    // Get camera direction
    camera.getWorldDirection(rayDirection);
    
    // Set raycaster origin and direction
    raycaster.set(camera.position, rayDirection);
    
    // Clear previous results
    intersects.length = 0;
    
    // Perform raycast
    raycaster.intersectObjects(scene.children, true, intersects);
}

// Track clue targeting state
let isClueTargeted = false;

// Function to check clue intersection
function checkClueIntersection() {
    // Previous targeting state
    const wasTargeted = isClueTargeted;
    
    // Reset targeting state
    isClueTargeted = false;
    
    // Check each intersection
    for (const intersection of intersects) {
        // Check if the intersected object is our clue
        if (intersection.object === clueObject || 
            (intersection.object.parent && intersection.object.parent.name === 'firstClue')) {
            isClueTargeted = true;
            break;
        }
    }
    
    // Log when targeting state changes
    if (isClueTargeted !== wasTargeted) {
        console.log(isClueTargeted ? 'Clue targeted!' : 'Clue no longer targeted');
        
        // Update visual feedback
        updateClueAppearance();
    }
}

// Function to update clue appearance based on targeting
function updateClueAppearance() {
    if (isClueTargeted) {
        // Make the clue more noticeable when targeted
        clueMaterial.color.set(0xff0000); // Bright red
        clueMaterial.opacity = 0.9;
    } else {
        // Return to normal appearance
        clueMaterial.color.set(0x00ff00); // Green
        clueMaterial.opacity = 0.8;
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    updateMovement();
    updateCameraRotation();
    
    // Animate clue with gentle floating motion
    clueObject.position.y = 2 + Math.sin(Date.now() * 0.001) * 0.2;
    
    updateDebugOverlay();
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
