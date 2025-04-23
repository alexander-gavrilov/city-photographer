# Task: Design Street Network

**Story:** [Street Layout](../s014_street_layout.md)

**Description:** Design a network of streets that connect the different districts and allow for exploration.

**Requirements:** Create a street network plan that provides logical connections between districts with a mix of main roads and smaller paths.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Street network design/diagram created
- [ ] Main roads connecting all districts defined
- [ ] Secondary roads and paths identified
- [ ] Intersection points mapped

**Implementation Details:**
```javascript
// Street network configuration
const streetNetwork = {
    // Main district connection roads
    mainRoads: [
        // Downtown to Industrial (East-West road)
        {
            name: 'Main Street',
            start: { x: -15, z: -10 },
            end: { x: -25, z: 10 },
            width: 8,
            type: 'main'
        },
        // Downtown to Residential (Northwest-Southeast road)
        {
            name: 'Central Avenue',
            start: { x: 5, z: -5 },
            end: { x: 25, z: 20 },
            width: 8,
            type: 'main'
        },
        // Industrial to Residential (Southwest-Northeast road)
        {
            name: 'Perimeter Highway',
            start: { x: -30, z: 15 },
            end: { x: 25, z: 25 },
            width: 10,
            type: 'main'
        }
    ],
    
    // Secondary roads within districts
    secondaryRoads: [
        // Downtown District
        {
            name: 'Downtown Loop',
            start: { x: -10, z: -25 },
            end: { x: 10, z: -15 },
            width: 6,
            type: 'secondary'
        },
        {
            name: 'Commerce Street',
            start: { x: -5, z: -30 },
            end: { x: -5, z: -10 },
            width: 5,
            type: 'secondary'
        },
        {
            name: 'Market Street',
            start: { x: 5, z: -30 },
            end: { x: 5, z: -10 },
            width: 5,
            type: 'secondary'
        },
        
        // Industrial District
        {
            name: 'Factory Road',
            start: { x: -50, z: 5 },
            end: { x: -30, z: 5 },
            width: 6,
            type: 'secondary'
        },
        {
            name: 'Warehouse Way',
            start: { x: -45, z: 0 },
            end: { x: -45, z: 20 },
            width: 5,
            type: 'secondary'
        },
        
        // Residential District
        {
            name: 'Elm Street',
            start: { x: 25, z: 35 },
            end: { x: 45, z: 35 },
            width: 4,
            type: 'secondary'
        },
        {
            name: 'Oak Avenue',
            start: { x: 30, z: 25 },
            end: { x: 30, z: 45 },
            width: 4,
            type: 'secondary'
        },
        {
            name: 'Maple Drive',
            start: { x: 40, z: 20 },
            end: { x: 40, z: 40 },
            width: 4,
            type: 'secondary'
        }
    ],
    
    // Smaller alleyways and paths
    alleys: [
        // Downtown alleys
        {
            name: 'Downtown Alley 1',
            start: { x: -5, z: -25 },
            end: { x: 0, z: -20 },
            width: 3,
            type: 'alley'
        },
        {
            name: 'Downtown Alley 2',
            start: { x: 0, z: -15 },
            end: { x: 5, z: -20 },
            width: 3,
            type: 'alley'
        },
        
        // Industrial alleys
        {
            name: 'Service Alley 1',
            start: { x: -40, z: 10 },
            end: { x: -35, z: 15 },
            width: 3,
            type: 'alley'
        },
        {
            name: 'Service Alley 2',
            start: { x: -30, z: 0 },
            end: { x: -25, z: 5 },
            width: 3,
            type: 'alley'
        },
        
        // Residential paths
        {
            name: 'Garden Path 1',
            start: { x: 35, z: 30 },
            end: { x: 40, z: 35 },
            width: 2,
            type: 'path'
        },
        {
            name: 'Garden Path 2',
            start: { x: 25, z: 30 },
            end: { x: 30, z: 35 },
            width: 2,
            type: 'path'
        }
    ],
    
    // Notable Intersections
    intersections: [
        { x: -15, z: -10, name: 'Downtown Square' },
        { x: -25, z: 10, name: 'Industrial Junction' },
        { x: 25, z: 20, name: 'Residential Gateway' }
    ]
};

// Helper function to find all street connections at a point
function getStreetConnectionsAt(point, tolerance = 5) {
    const connections = [];
    
    // Check each street type
    ['mainRoads', 'secondaryRoads', 'alleys'].forEach(streetType => {
        streetNetwork[streetType].forEach(road => {
            // Check start point
            const startDist = Math.sqrt(
                Math.pow(road.start.x - point.x, 2) + 
                Math.pow(road.start.z - point.z, 2)
            );
            
            if (startDist <= tolerance) {
                connections.push({
                    road: road,
                    point: 'start'
                });
            }
            
            // Check end point
            const endDist = Math.sqrt(
                Math.pow(road.end.x - point.x, 2) + 
                Math.pow(road.end.z - point.z, 2)
            );
            
            if (endDist <= tolerance) {
                connections.push({
                    road: road,
                    point: 'end'
                });
            }
        });
    });
    
    return connections;
}

// Calculate the district containing a given point
function getDistrictAt(point) {
    for (const district of districtBoundaries) {
        const distanceXZ = Math.sqrt(
            Math.pow(point.x - district.center.x, 2) + 
            Math.pow(point.z - district.center.z, 2)
        );
        
        if (distanceXZ <= district.radius) {
            return district;
        }
    }
    
    return null; // Not in any district
}

// Add debug visualization for street design
function visualizeStreetNetwork() {
    const streetGroup = new THREE.Group();
    
    // Visualize each street type with different colors
    const streetColors = {
        main: 0x666666, // Dark gray for main roads
        secondary: 0x999999, // Medium gray for secondary roads
        alley: 0xCCCCCC, // Light gray for alleys
        path: 0xDDDDDD // Almost white for paths
    };
    
    // Helper to create a street segment
    function createStreetSegment(road) {
        const start = new THREE.Vector3(road.start.x, 0.1, road.start.z);
        const end = new THREE.Vector3(road.end.x, 0.1, road.end.z);
        
        // Calculate direction and length
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();
        
        // Create the geometry
        const streetGeo = new THREE.PlaneGeometry(length, road.width);
        const streetMat = new THREE.MeshBasicMaterial({ 
            color: streetColors[road.type],
            side: THREE.DoubleSide
        });
        
        // Create the mesh and position it
        const street = new THREE.Mesh(streetGeo, streetMat);
        
        // Position at the center point
        const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        street.position.copy(midpoint);
        
        // Orient it correctly
        street.lookAt(end.clone().setY(midpoint.y)); // Look at end point at same Y
        street.rotation.x = -Math.PI / 2; // Rotate to lie flat
        
        return street;
    }
    
    // Create visualization for each type of road
    ['mainRoads', 'secondaryRoads', 'alleys'].forEach(roadType => {
        streetNetwork[roadType].forEach(road => {
            const segment = createStreetSegment(road);
            segment.name = road.name;
            streetGroup.add(segment);
        });
    });
    
    // Visualize intersections
    streetNetwork.intersections.forEach(intersection => {
        const intersectionGeo = new THREE.CircleGeometry(3, 16);
        const intersectionMat = new THREE.MeshBasicMaterial({ 
            color: 0xFF0000,
            transparent: true,
            opacity: 0.5
        });
        
        const intersectionMarker = new THREE.Mesh(intersectionGeo, intersectionMat);
        intersectionMarker.position.set(intersection.x, 0.15, intersection.z);
        intersectionMarker.rotation.x = -Math.PI / 2;
        
        streetGroup.add(intersectionMarker);
    });
    
    streetGroup.name = 'street_network_debug';
    scene.add(streetGroup);
}
```

**Location:** Add this code to a new file `js/streets.js` and import it in `main.js`
