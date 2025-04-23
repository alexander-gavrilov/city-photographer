/**
 * Streets implementation for the City Photographer game
 * Handles creation and management of the street layout connecting districts
 */

// Define the street network data structure first
const streetNetwork = {
    mainRoads: [
        // Downtown to Industrial
        {
            name: 'Main Street',
            start: { x: -15, z: -10 },
            end: { x: -25, z: 10 },
            width: 8
        },
        // Downtown to Residential
        {
            name: 'Central Avenue',
            start: { x: 5, z: -5 },
            end: { x: 25, z: 20 },
            width: 8
        },
        // Industrial to Residential
        {
            name: 'Perimeter Highway',
            start: { x: -30, z: 15 },
            end: { x: 25, z: 25 },
            width: 10
        }
    ],
    secondaryRoads: [
        // Downtown District
        {
            name: 'Downtown Loop',
            start: { x: -10, z: -25 },
            end: { x: 10, z: -15 },
            width: 6
        },
        {
            name: 'Commerce Street',
            start: { x: -5, z: -30 },
            end: { x: -5, z: -10 },
            width: 5
        }
    ],
    alleys: [
        // Downtown alleys
        {
            name: 'Downtown Alley 1',
            start: { x: -5, z: -25 },
            end: { x: 0, z: -20 },
            width: 3
        }
    ],
    intersections: [
        { x: -15, z: -10, name: 'Downtown Square' },
        { x: -25, z: 10, name: 'Industrial Junction' },
        { x: 25, z: 20, name: 'Residential Gateway' }
    ]
};

// Simple function to create roads
function createRoadMesh(start, end, width) {
    const startVec = new THREE.Vector3(start.x, 0, start.z);
    const endVec = new THREE.Vector3(end.x, 0, end.z);
    
    // Calculate direction and length
    const direction = new THREE.Vector3().subVectors(endVec, startVec);
    const length = direction.length();
    direction.normalize();
    
    // Create road material
    const roadMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.8
    });
    
    // Create road mesh
    const roadGeometry = new THREE.PlaneGeometry(width, length);
    const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
    
    // Position and orient the road
    const center = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    roadMesh.position.set(center.x, 0.05, center.z); // Slightly above ground
    
    roadMesh.lookAt(new THREE.Vector3(endVec.x, 0.05, endVec.z));
    roadMesh.rotation.x = -Math.PI / 2; // Rotate to lie flat
    
    return roadMesh;
}

// Create and export the createStreetSystem function
function createStreetSystem() {
    console.log("Creating street system...");
    const streetSystemGroup = new THREE.Group();
    streetSystemGroup.name = 'street_system';
    
    // Create main roads
    streetNetwork.mainRoads.forEach(road => {
        const roadMesh = createRoadMesh(road.start, road.end, road.width);
        streetSystemGroup.add(roadMesh);
    });
    
    // Create secondary roads
    streetNetwork.secondaryRoads.forEach(road => {
        const roadMesh = createRoadMesh(road.start, road.end, road.width);
        roadMesh.material.color.set(0x444444);
        streetSystemGroup.add(roadMesh);
    });
    
    // Create alleys
    streetNetwork.alleys.forEach(road => {
        const roadMesh = createRoadMesh(road.start, road.end, road.width);
        roadMesh.material.color.set(0x555555);
        streetSystemGroup.add(roadMesh);
    });
    
    console.log("Street system created successfully");
    return streetSystemGroup;
}

// Make the function available both as a global variable and as a module export
window.createStreetSystem = createStreetSystem;

// Log when the file is loaded
console.log("Streets.js loaded successfully - createStreetSystem function is available globally");
