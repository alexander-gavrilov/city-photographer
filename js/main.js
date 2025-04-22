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
const keysPressed = {
    w: false,
    s: false,
    a: false,
    d: false
};

const moveSpeed = 0.1;
const direction = new THREE.Vector3();
const sideVector = new THREE.Vector3();

function handleKeyDown(event) {
    const key = event.key.toLowerCase();
    if (keysPressed.hasOwnProperty(key)) {
        event.preventDefault();
        keysPressed[key] = true;
        debugOverlay.textContent = `Last key pressed: ${key}\n${debugOverlay.textContent}`;
    }
}

function handleKeyUp(event) {
    const key = event.key.toLowerCase();
    if (keysPressed.hasOwnProperty(key)) {
        event.preventDefault();
        keysPressed[key] = false;
        console.log('Key released:', key, keysPressed);
    }
}

function updateMovement() {
    if (!Object.values(keysPressed).some(Boolean)) return;
    
    // Get forward direction from camera's rotation
    direction.set(0, 0, -1).applyQuaternion(camera.quaternion);
    direction.y = 0; // Keep movement horizontal
    direction.normalize();
    
    // Get side direction for strafing
    sideVector.set(1, 0, 0).applyQuaternion(camera.quaternion);
    sideVector.normalize();
    
    // Calculate movement
    const movement = new THREE.Vector3(0, 0, 0);
    
    if (keysPressed.w) {
        movement.add(direction.clone().multiplyScalar(moveSpeed));
        console.log('Moving forward', movement.toArray());
    }
    if (keysPressed.s) {
        movement.sub(direction.clone().multiplyScalar(moveSpeed));
        console.log('Moving backward', movement.toArray());
    }
    if (keysPressed.a) {
        movement.sub(sideVector.clone().multiplyScalar(moveSpeed));
        console.log('Moving left', movement.toArray());
    }
    if (keysPressed.d) {
        movement.add(sideVector.clone().multiplyScalar(moveSpeed));
        console.log('Moving right', movement.toArray());
    }
    
    // Apply movement
    camera.position.add(movement);
    console.log('Camera position:', camera.position.toArray());
}

// Add keyboard listeners
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    updateMovement();
    updateDebugOverlay();
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
