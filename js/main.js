// Initialize core Three.js components
const scene = new THREE.Scene();

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
// Create an array of different building materials
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
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
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
    switch(event.key.toLowerCase()) {
        case 'w': keysPressed.w = true; break;
        case 's': keysPressed.s = true; break;
        case 'a': keysPressed.a = true; break;
        case 'd': keysPressed.d = true; break;
    }
}

function handleKeyUp(event) {
    switch(event.key.toLowerCase()) {
        case 'w': keysPressed.w = false; break;
        case 's': keysPressed.s = false; break;
        case 'a': keysPressed.a = false; break;
        case 'd': keysPressed.d = false; break;
    }
}

function updateCameraPosition() {
    // Get forward direction from camera's rotation
    direction.set(0, 0, -1).applyQuaternion(camera.quaternion);
    // Get side direction for strafing
    sideVector.set(1, 0, 0).applyQuaternion(camera.quaternion);
    
    // Reset movement velocity
    const velocity = new THREE.Vector3(0, 0, 0);
    
    // Add movement based on pressed keys
    if (keysPressed.w) velocity.add(direction.clone().multiplyScalar(moveSpeed));
    if (keysPressed.s) velocity.sub(direction.clone().multiplyScalar(moveSpeed));
    if (keysPressed.a) velocity.sub(sideVector.clone().multiplyScalar(moveSpeed));
    if (keysPressed.d) velocity.add(sideVector.clone().multiplyScalar(moveSpeed));
    
    // Apply movement
    camera.position.add(velocity);
}

// Add keyboard listeners
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    updateCameraPosition();
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
