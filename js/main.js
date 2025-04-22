// Initialize core Three.js components
const scene = new THREE.Scene();

// Debug settings
const debugControls = {
    moveSpeed: 0.1,
    showHelpers: true,
    logMovement: true
};

// Debug GUI
const gui = new dat.GUI();
const movementFolder = gui.addFolder('Movement Controls');
movementFolder.add(debugControls, 'moveSpeed', 0.01, 1.0).name('Move Speed');
movementFolder.add(debugControls, 'showHelpers').name('Show Debug Helpers');
movementFolder.add(debugControls, 'logMovement').name('Log Movement');

const positionFolder = gui.addFolder('Camera Position');
positionFolder.add(camera.position, 'x').listen();
positionFolder.add(camera.position, 'y').listen();
positionFolder.add(camera.position, 'z').listen();

// Debug helpers
const debugHelpers = {
    axes: new THREE.AxesHelper(5),
    directionArrow: new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 0),
        3,
        0xffff00
    )
};
scene.add(debugHelpers.axes);
scene.add(debugHelpers.directionArrow);

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
    building.position.set(x, height/2, z);
    building.name = `building_${x}_${z}`;
    return building;
}

const buildings = [
    createBuilding(10, 20, 10, -20, -15, 0),  // Tall building on the left
    createBuilding(15, 15, 15, 20, -20, 1),   // Medium building on the right
    createBuilding(8, 25, 8, -10, 10, 2),     // Skyscraper
    createBuilding(12, 10, 12, 15, 15, 3),    // Shorter building
    createBuilding(20, 30, 20, 0, -30, 4)     // Large central building
];

buildings.forEach(building => scene.add(building));

// Create camera
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

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Debug logging
const debugLog = {
    keyEvent: (type, key, state) => console.log(`[Key ${type}] ${key}:`, state),
    movement: (direction, velocity) => console.log(`[Movement] ${direction}:`, velocity.toArray()),
    position: (pos) => console.log('[Position]', pos.toArray())
};

// Keyboard movement controls
const keysPressed = {
    w: false,
    s: false,
    a: false,
    d: false
};

const direction = new THREE.Vector3();
const sideVector = new THREE.Vector3();

function handleKeyDown(event) {
    const key = event.key.toLowerCase();
    if (keysPressed.hasOwnProperty(key)) {
        event.preventDefault();
        keysPressed[key] = true;
        debugLog.keyEvent('pressed', key, keysPressed);
        
        // Update direction arrow color to indicate movement
        debugHelpers.directionArrow.setColor(0xff0000);
    }
}

function handleKeyUp(event) {
    const key = event.key.toLowerCase();
    if (keysPressed.hasOwnProperty(key)) {
        event.preventDefault();
        keysPressed[key] = false;
        debugLog.keyEvent('released', key, keysPressed);
        
        // Reset direction arrow color
        debugHelpers.directionArrow.setColor(0xffff00);
    }
}

function updateMovement() {
    if (!Object.values(keysPressed).some(Boolean)) return;
    
    // Update movement vectors
    direction.set(0, 0, -1).applyQuaternion(camera.quaternion);
    direction.y = 0;
    direction.normalize();
    
    sideVector.set(1, 0, 0).applyQuaternion(camera.quaternion);
    sideVector.normalize();
    
    // Calculate velocity
    const velocity = new THREE.Vector3(0, 0, 0);
    
    if (keysPressed.w) {
        velocity.add(direction.clone().multiplyScalar(debugControls.moveSpeed));
        debugLog.movement('forward', velocity);
    }
    if (keysPressed.s) {
        velocity.sub(direction.clone().multiplyScalar(debugControls.moveSpeed));
        debugLog.movement('backward', velocity);
    }
    if (keysPressed.a) {
        velocity.sub(sideVector.clone().multiplyScalar(debugControls.moveSpeed));
        debugLog.movement('left', velocity);
    }
    if (keysPressed.d) {
        velocity.add(sideVector.clone().multiplyScalar(debugControls.moveSpeed));
        debugLog.movement('right', velocity);
    }
    
    // Apply movement
    camera.position.add(velocity);
    debugLog.position(camera.position);
    
    // Update debug direction arrow
    debugHelpers.directionArrow.position.copy(camera.position);
    debugHelpers.directionArrow.setDirection(direction);
}

// Add keyboard listeners
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Animation loop
let lastTime = 0;
function animate(time) {
    requestAnimationFrame(animate);
    
    const deltaTime = time - lastTime;
    lastTime = time;
    
    updateMovement();
    renderer.render(scene, camera);
}

// Start the animation loop
animate(0);
