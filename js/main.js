// Initialize core Three.js components
const scene = new THREE.Scene();

// Create debug overlay early to avoid initialization errors
const debugOverlay = document.createElement('div');
debugOverlay.style.position = 'fixed';
debugOverlay.style.top = '10px';
debugOverlay.style.left = '10px';
debugOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
debugOverlay.style.color = 'white';
debugOverlay.style.padding = '10px';
debugOverlay.style.fontFamily = 'monospace';

// Add debug overlay to DOM when body is available
document.addEventListener('DOMContentLoaded', function() {
    document.body.appendChild(debugOverlay);
});

// Add ambient light to the scene
const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Soft white light
scene.add(ambientLight);

// Add directional light (simulates sun)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Set up error handling
const errorLog = [];
window.addEventListener('error', function(event) {
    console.error('Error caught:', event.error);
    
    // Add to error log (limit size to prevent overflow)
    if (errorLog.length > 5) errorLog.shift();
    errorLog.push(`${new Date().toLocaleTimeString()}: ${event.error.message}`);
    
    // Update debug overlay to show error
    if (typeof updateDebugOverlay === 'function') {
        updateDebugOverlay();
    }
});

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

// Initialize city districts with buildings and landmarks
console.log("Initializing city districts...");

// Create districts and add buildings and landmarks
const districts = initializeDistricts();

// Create the street system with error handling
console.log("Creating street network...");
try {
    // Log the type of createStreetSystem to diagnose access issues
    console.log("Type of createStreetSystem:", typeof createStreetSystem);
    console.log("Type of window.createStreetSystem:", typeof window.createStreetSystem);
    
    // Make sure we wait for streets.js to be loaded
    if (typeof createStreetSystem !== 'function') {
        console.warn("createStreetSystem function not found, waiting for it to load...");
        // Create a temporary placeholder to avoid errors
        const tempGroup = new THREE.Group();
        tempGroup.name = "street_system_placeholder";
        scene.add(tempGroup);
        
        // Set up a small delay to try again when the function might be available
        setTimeout(() => {
            if (typeof createStreetSystem === 'function') {
                console.log("createStreetSystem is now available, creating streets...");
                scene.remove(scene.getObjectByName("street_system_placeholder"));
                const streetSystem = createStreetSystem();
                scene.add(streetSystem);
            }
        }, 500); // 500ms delay to ensure streets.js is loaded
    } else {
        const streetSystem = createStreetSystem();
        scene.add(streetSystem);
    }
} catch (e) {
    console.error("Error creating street system:", e);
}

// Store references to all buildings for later use if needed
const buildings = [
    ...districts.downtownBuildings,
    ...districts.industrialBuildings,
    ...districts.residentialBuildings
];

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

// Create barrier object to block an area
const barrierGeometry = new THREE.BoxGeometry(10, 5, 1);
const barrierMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x3333ff,
    transparent: true,
    opacity: 0.7 
});
const barrier = new THREE.Mesh(barrierGeometry, barrierMaterial);

// Position barrier to block an area
barrier.position.set(15, 2.5, 15);
barrier.name = 'accessBarrier';

// Add barrier to scene
scene.add(barrier);

// Track barrier state
const barrierState = {
    active: true,
    originalPosition: barrier.position.clone()
};

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
    // Only call updateDebugOverlay if it exists
    if (typeof updateDebugOverlay === 'function' && debugOverlay) {
        updateDebugOverlay();
    }
});

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Debug overlay already created at the top of the file
// No need to create it again

function updateDebugOverlay() {
    // Make sure debugOverlay exists and variables are initialized before accessing them
    if (!debugOverlay) return;
    
    try {
        // Only access properties if they're defined
        const positionStr = camera && camera.position ? camera.position.toArray().map(n => n.toFixed(2)) : 'N/A';
        const clueTargetStr = typeof isClueTargeted !== 'undefined' ? isClueTargeted : 'N/A';
        const photoReadyStr = typeof photoActionReady !== 'undefined' ? photoActionReady : 'N/A';
        const clueCapturedStr = typeof cluePhotographed !== 'undefined' ? cluePhotographed : 'N/A';
        const barrierActiveStr = barrierState && typeof barrierState.active !== 'undefined' ? barrierState.active : 'N/A';
        const intersectsStr = typeof intersects !== 'undefined' ? intersects.length : 'N/A';
        const keysStr = keysPressed ? `W: ${keysPressed.w}\n    A: ${keysPressed.a}\n    S: ${keysPressed.s}\n    D: ${keysPressed.d}` : 'N/A';
        
        debugOverlay.textContent = `
        Keys Pressed:
        ${keysStr}
        Position: ${positionStr}
        Clue Targeted: ${clueTargetStr}
        Photo Ready: ${photoReadyStr}
        Clue Captured: ${clueCapturedStr}
        Barrier Active: ${barrierActiveStr}
        Intersections: ${intersectsStr}
        Errors: ${errorLog.join('\n')}
        `;
    } catch (e) {
        // If any errors occur during debug info generation, display a simplified version
        console.warn('Error updating debug overlay:', e);
        if (debugOverlay) {
            debugOverlay.textContent = 'Debug overlay error: ' + e.message;
        }
    }
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
        if (debugOverlay) {
            debugOverlay.textContent = `Last key pressed: ${key}\n${debugOverlay.textContent}`;
        }
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

// Track photo action state
let photoActionReady = true;
const photoActionCooldown = 500; // ms

// Function to handle photo action
function handlePhotoAction(event) {
    // Check if action is ready and it's a left mouse click
    if (photoActionReady && event.button === 0) {
        // Prevent rapid clicking
        photoActionReady = false;
        setTimeout(() => { photoActionReady = true; }, photoActionCooldown);
        
        // Perform the photo action
        takePhoto();
        
        console.log('Photo action triggered');
    }
}

// Add photo action event listener
document.addEventListener('mousedown', handlePhotoAction);

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

// Function to take a photo
function takePhoto() {
    // Check if the clue is currently targeted
    if (isClueTargeted) {
        // Photo capture was successful
        console.log('Successful photo of clue!');
        
        // Trigger the reaction
        triggerClueReaction();
    } else {
        // Nothing interesting in view
        console.log('Nothing interesting to photograph here');
    }
    
    // Add camera flash effect
    addFlashEffect();
}

// Add simple flash effect
function addFlashEffect() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = 0;
    flash.style.left = 0;
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'white';
    flash.style.opacity = '0.6';
    flash.style.zIndex = '1000';
    flash.style.pointerEvents = 'none';
    flash.style.transition = 'opacity 0.5s ease-out';
    
    document.body.appendChild(flash);
    
    // Fade out and remove
    setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(flash);
        }, 500);
    }, 50);
}

// Track clue capture state
let cluePhotographed = false;

// Function to trigger clue reaction
function triggerClueReaction() {
    // Prevent multiple triggers
    if (cluePhotographed) return;
    
    // Mark as photographed
    cluePhotographed = true;
    
    // Change clue appearance dramatically
    clueMaterial.color.set(0xffff00); // Bright yellow
    clueMaterial.opacity = 1.0;
    
    // Make clue glow (grow and shrink)
    const originalScale = clueObject.scale.clone();
    const expandedScale = originalScale.clone().multiplyScalar(1.5);
    
    // Use animation to grow then shrink
    const duration = 2000; // ms
    const startTime = Date.now();
    
    function animateClueReaction() {
        const elapsed = Date.now() - startTime;
        
        if (elapsed < duration) {
            const phase = elapsed / duration;
            
            // Grow and then shrink
            if (phase < 0.5) {
                const growFactor = phase * 2; // 0 to 1
                clueObject.scale.lerpVectors(
                    originalScale, 
                    expandedScale, 
                    growFactor
                );
            } else {
                const shrinkFactor = (phase - 0.5) * 2; // 0 to 1
                clueObject.scale.lerpVectors(
                    expandedScale, 
                    originalScale, 
                    shrinkFactor
                );
            }
            
            requestAnimationFrame(animateClueReaction);
        } else {
            // Animation complete
            clueObject.scale.copy(originalScale);
            
            // Display success message
            showCaptureMessage('Clue captured!');
            
            // Deactivate barrier after a delay
            setTimeout(() => {
                deactivateBarrier();
            }, 1000);
        }
    }
    
    animateClueReaction();
}

// Function to show capture success message
function showCaptureMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.style.position = 'fixed';
    messageElement.style.bottom = '50px';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translateX(-50%)';
    messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    messageElement.style.color = 'white';
    messageElement.style.padding = '15px 30px';
    messageElement.style.borderRadius = '10px';
    messageElement.style.fontFamily = 'Arial, sans-serif';
    messageElement.style.fontSize = '24px';
    messageElement.style.transition = 'opacity 1s';
    messageElement.textContent = message;
    
    document.body.appendChild(messageElement);
    
    // Fade and remove after delay
    setTimeout(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 1000);
    }, 3000);
}

// Function to deactivate barrier
function deactivateBarrier() {
    if (!barrierState.active) return; // Already deactivated
    
    barrierState.active = false;
    
    // Animate barrier removal
    const duration = 1500; // ms
    const startTime = Date.now();
    const startY = barrier.position.y;
    const targetY = -5; // Move below ground
    
    function animateBarrier() {
        const elapsed = Date.now() - startTime;
        
        if (elapsed < duration) {
            const progress = elapsed / duration;
            
            // Move barrier downward
            barrier.position.y = startY - (startY - targetY) * progress;
            
            // Make it fade out
            barrierMaterial.opacity = 0.7 * (1 - progress);
            
            requestAnimationFrame(animateBarrier);
        } else {
            // Animation complete
            barrier.position.y = targetY;
            barrierMaterial.opacity = 0;
            
            // Show message about new area
            showCaptureMessage('New area unlocked!');
        }
    }
    
    animateBarrier();
}

// Initialize district tracking variables
let currentDistrict = null;
const districtIndicator = document.getElementById('districtIndicator');
const districtDescription = document.getElementById('districtDescription');
let descriptionTimeout = null;

// Update district indicator based on player position
function updateDistrictIndicator() {
    const playerPosition = camera.position.clone();
    const district = getDistrictAtPosition(playerPosition);
    
    // Only update if district changed
    if (district !== currentDistrict) {
        // If we're entering a new district (not just leaving one)
        if (district) {
            // Show entrance notification
            showDistrictEntrance(district);
        }
        
        currentDistrict = district;
        
        // Update UI element
        if (district) {
            districtIndicator.textContent = `District: ${district.name}`;
            
            // Remove previous class
            districtIndicator.classList.remove('district-downtown', 'district-industrial', 'district-residential');
            
            // Add appropriate class based on district
            const districtClass = `district-${district.name.toLowerCase()}`;
            districtIndicator.classList.add(districtClass);
            
            // Show district indicator
            districtIndicator.style.display = 'block';
        } else {
            districtIndicator.textContent = 'District: Unknown';
            districtIndicator.classList.remove('district-downtown', 'district-industrial', 'district-residential');
            
            // Hide district description when leaving all districts
            hideDistrictDescription();
        }
    }
}

// Show district entrance notification with description
function showDistrictEntrance(district) {
    // Clear any existing timeout
    if (descriptionTimeout) {
        clearTimeout(descriptionTimeout);
    }
    
    // Update description content
    const titleElement = districtDescription.querySelector('h3');
    const descriptionElement = districtDescription.querySelector('p');
    
    titleElement.textContent = district.name + " District";
    descriptionElement.textContent = district.description;
    
    // Show description with animation
    districtDescription.classList.add('visible');
    
    // Hide after 8 seconds
    descriptionTimeout = setTimeout(() => {
        hideDistrictDescription();
    }, 8000);
}

// Hide district description
function hideDistrictDescription() {
    districtDescription.classList.remove('visible');
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    updateMovement();
    updateCameraRotation();
    
    // Animate clue with gentle floating motion
    clueObject.position.y = 2 + Math.sin(Date.now() * 0.001) * 0.2;
    
    // Update raycasting and clue targeting
    updateRaycaster();
    checkClueIntersection();
    
    // Update district indicator
    updateDistrictIndicator();
    
    // Update debug info
    updateDebugOverlay();
    
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
