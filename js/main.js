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

// Create a test cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

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

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
