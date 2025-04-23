# Task: Add Street Guidance

**Story:** [Street Layout](../s014_street_layout.md)

**Description:** Implement navigation aids to help players find their way around the city.

**Requirements:** Create visual cues such as signs, landmarks, and lighting to guide players through the street network.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Street signs at major intersections
- [ ] Direction indicators pointing to districts
- [ ] Visual landmarks visible from a distance
- [ ] Lighting to guide paths and highlight points of interest

**Implementation Details:**
```javascript
// Implement street guidance elements
function createStreetGuidance() {
    const guidanceGroup = new THREE.Group();
    guidanceGroup.name = 'street_guidance';
    
    // Create street signs at intersections
    createStreetSigns(guidanceGroup);
    
    // Create direction indicators pointing to districts
    createDistrictPointers(guidanceGroup);
    
    // Add lighting to guide paths
    createPathLighting(guidanceGroup);
    
    scene.add(guidanceGroup);
    return guidanceGroup;
}

// Create street signs at intersections
function createStreetSigns(parentGroup) {
    // Loop through all intersections
    streetNetwork.intersections.forEach(intersection => {
        // Get all streets that connect at this intersection
        const connections = getStreetConnectionsAt({x: intersection.x, z: intersection.z});
        
        if (connections.length > 0) {
            // Create a sign post at the intersection
            const signPost = createSignPost(intersection, connections);
            parentGroup.add(signPost);
        }
    });
    
    // Also add signs at some street corners
    ['mainRoads', 'secondaryRoads'].forEach(roadType => {
        streetNetwork[roadType].forEach(road => {
            // Check if this road doesn't already have signs at both ends
            const startConnections = getStreetConnectionsAt(road.start);
            const endConnections = getStreetConnectionsAt(road.end);
            
            if (startConnections.length <= 1) {
                // Create a smaller sign at the start
                const startSign = createStreetNameSign(road.name);
                startSign.position.set(road.start.x, 0, road.start.z);
                parentGroup.add(startSign);
            }
            
            if (endConnections.length <= 1) {
                // Create a smaller sign at the end
                const endSign = createStreetNameSign(road.name);
                endSign.position.set(road.end.x, 0, road.end.z);
                parentGroup.add(endSign);
            }
        });
    });
}

// Create a sign post with multiple directional signs
function createSignPost(intersection, connections) {
    const group = new THREE.Group();
    group.position.set(intersection.x, 0, intersection.z);
    
    // Add the post
    const postMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const postGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3.5, 8);
    const post = new THREE.Mesh(postGeometry, postMaterial);
    post.position.y = 1.75;
    group.add(post);
    
    // Get unique street names
    const streetNames = new Set();
    connections.forEach(conn => {
        streetNames.add(conn.road.name);
    });
    
    // Create one sign for each street
    let signIndex = 0;
    streetNames.forEach(streetName => {
        // Determine direction
        const direction = getStreetDirection(streetName, intersection);
        
        // Create the sign
        const signMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
        const signGeometry = new THREE.BoxGeometry(1.5, 0.3, 0.05);
        const sign = new THREE.Mesh(signGeometry, signMaterial);
        
        // Position the sign in the right direction and height
        const angle = Math.atan2(direction.x, direction.z);
        sign.position.y = 2.5 + signIndex * 0.4;
        sign.rotation.y = angle;
        
        // Add text (this is just a placeholder - text rendering would require canvas or sprites)
        // In a real implementation, you would add text textures to the signs
        
        group.add(sign);
        
        signIndex++;
    });
    
    // Add the intersection name sign at the top
    const nameMaterial = new THREE.MeshStandardMaterial({ color: 0x0000AA });
    const nameGeometry = new THREE.BoxGeometry(1.2, 0.6, 0.05);
    const nameSign = new THREE.Mesh(nameGeometry, nameMaterial);
    nameSign.position.y = 3.5;
    group.add(nameSign);
    
    return group;
}

// Create a single street name sign
function createStreetNameSign(streetName) {
    const group = new THREE.Group();
    
    // Add the post
    const postMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const postGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2.2, 8);
    const post = new THREE.Mesh(postGeometry, postMaterial);
    post.position.y = 1.1;
    group.add(post);
    
    // Create the sign
    const signMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const signGeometry = new THREE.BoxGeometry(1, 0.25, 0.03);
    const sign = new THREE.Mesh(signGeometry, signMaterial);
    sign.position.y = 2.1;
    
    // Random rotation
    sign.rotation.y = Math.random() * Math.PI * 2;
    
    group.add(sign);
    
    return group;
}

// Determine the general direction of a street from an intersection
function getStreetDirection(streetName, intersection) {
    let direction = new THREE.Vector3(0, 0, 0);
    
    // Find the road by name
    ['mainRoads', 'secondaryRoads', 'alleys'].forEach(roadType => {
        streetNetwork[roadType].forEach(road => {
            if (road.name === streetName) {
                // Calculate direction from the intersection
                const intersectionPoint = new THREE.Vector3(intersection.x, 0, intersection.z);
                const startPoint = new THREE.Vector3(road.start.x, 0, road.start.z);
                const endPoint = new THREE.Vector3(road.end.x, 0, road.end.z);
                
                const distToStart = intersectionPoint.distanceTo(startPoint);
                const distToEnd = intersectionPoint.distanceTo(endPoint);
                
                if (distToStart < distToEnd) {
                    // Direction away from start (toward end)
                    direction = new THREE.Vector3().subVectors(endPoint, startPoint).normalize();
                } else {
                    // Direction away from end (toward start)
                    direction = new THREE.Vector3().subVectors(startPoint, endPoint).normalize();
                }
            }
        });
    });
    
    return direction;
}

// Create district pointers - signage pointing to districts
function createDistrictPointers(parentGroup) {
    // Add district pointers at strategic locations
    // These are large signs or markers indicating directions to districts
    
    // Define locations for the district pointers
    const pointerLocations = [
        // Downtown pointers
        {
            position: { x: -10, z: -5 },
            pointTo: 'Downtown',
            color: 0x0066CC
        },
        // Industrial pointers
        {
            position: { x: -25, z: 0 },
            pointTo: 'Industrial',
            color: 0xCC6600
        },
        // Residential pointers
        {
            position: { x: 15, z: 15 },
            pointTo: 'Residential',
            color: 0x66CC00
        }
    ];
    
    // Create each pointer
    pointerLocations.forEach(location => {
        const pointer = createDistrictPointer(location);
        parentGroup.add(pointer);
    });
}

// Create a single district pointer
function createDistrictPointer(locationInfo) {
    const group = new THREE.Group();
    group.position.set(locationInfo.position.x, 0, locationInfo.position.z);
    
    // Find the district center
    let districtCenter = null;
    districtBoundaries.forEach(district => {
        if (district.name === locationInfo.pointTo) {
            districtCenter = district.center;
        }
    });
    
    if (!districtCenter) return group; // Skip if district not found
    
    // Calculate direction to the district
    const direction = new THREE.Vector3(
        districtCenter.x - locationInfo.position.x,
        0,
        districtCenter.z - locationInfo.position.z
    ).normalize();
    
    // Create the pointer base
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const baseGeometry = new THREE.CylinderGeometry(0.5, 0.6, 0.3, 8);
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    group.add(base);
    
    // Create the pointer column
    const columnGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 8);
    const column = new THREE.Mesh(columnGeometry, baseMaterial);
    column.position.y = 1.5;
    group.add(column);
    
    // Create the pointer sign
    const signMaterial = new THREE.MeshStandardMaterial({ color: locationInfo.color });
    const signGeometry = new THREE.BoxGeometry(2, 1, 0.1);
    const sign = new THREE.Mesh(signGeometry, signMaterial);
    sign.position.y = 2.5;
    
    // Orient sign to face the district
    const angle = Math.atan2(direction.x, direction.z);
    sign.rotation.y = angle;
    
    group.add(sign);
    
    // Add arrow on the sign
    const arrowMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const arrowGeometry = new THREE.ConeGeometry(0.2, 0.5, 8);
    const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
    
    // Position arrow on the sign pointing in the right direction
    arrow.rotation.x = Math.PI / 2;
    arrow.position.set(0, 2.5, -0.06);
    arrow.rotation.z = angle;
    
    group.add(arrow);
    
    return group;
}

// Create lighting along paths to guide players
function createPathLighting(parentGroup) {
    // Add street lights along main roads and at key locations
    
    // Add lights at district entrances
    districtBoundaries.forEach(district => {
        // Find where main roads enter the district
        streetNetwork.mainRoads.forEach(road => {
            const startPoint = new THREE.Vector3(road.start.x, 0, road.start.z);
            const endPoint = new THREE.Vector3(road.end.x, 0, road.end.z);
            
            const districtCenter = new THREE.Vector3(
                district.center.x,
                0,
                district.center.z
            );
            
            const startDist = districtCenter.distanceTo(startPoint);
            const endDist = districtCenter.distanceTo(endPoint);
            
            // If one point is inside and one is outside, this is a district entrance
            if ((startDist <= district.radius && endDist > district.radius) ||
                (endDist <= district.radius && startDist > district.radius)) {
                
                // Calculate the intersection point (approximate)
                const roadDirection = new THREE.Vector3().subVectors(endPoint, startPoint).normalize();
                const centerToStart = new THREE.Vector3().subVectors(startPoint, districtCenter);
                
                const a = roadDirection.dot(roadDirection);
                const b = 2 * roadDirection.dot(centerToStart);
                const c = centerToStart.dot(centerToStart) - district.radius * district.radius;
                
                const discriminant = b * b - 4 * a * c;
                
                if (discriminant >= 0) {
                    // Calculate intersection point
                    const t = (-b + Math.sqrt(discriminant)) / (2 * a);
                    const intersectionPoint = new THREE.Vector3(
                        startPoint.x + roadDirection.x * t,
                        0,
                        startPoint.z + roadDirection.z * t
                    );
                    
                    // Add a gateway or entrance marker here
                    const entranceMarker = createDistrictEntrance(district);
                    entranceMarker.position.copy(intersectionPoint);
                    
                    // Orient toward district center
                    const lookDirection = new THREE.Vector3().subVectors(
                        districtCenter,
                        intersectionPoint
                    ).normalize();
                    const angle = Math.atan2(lookDirection.x, lookDirection.z);
                    entranceMarker.rotation.y = angle;
                    
                    parentGroup.add(entranceMarker);
                }
            }
        });
    });
    
    // Add highlight lighting to landmarks
    districtBoundaries.forEach(district => {
        // Add spotlight pointing at the district landmark
        
        // Calculate a position for the light
        const lightPosition = new THREE.Vector3(
            district.center.x + district.radius * 0.5,
            25, // Height
            district.center.z + district.radius * 0.5
        );
        
        const spotlight = new THREE.SpotLight(0xFFFFFF, 1, 100, Math.PI / 8, 0.5, 2);
        spotlight.position.copy(lightPosition);
        spotlight.target.position.copy(district.center);
        
        parentGroup.add(spotlight);
        parentGroup.add(spotlight.target);
    });
}

// Create a district entrance marker
function createDistrictEntrance(district) {
    const group = new THREE.Group();
    
    // Determine color based on district
    let color;
    switch (district.name) {
        case 'Downtown':
            color = 0x0066CC; // Blue
            break;
        case 'Industrial':
            color = 0xCC6600; // Orange
            break;
        case 'Residential':
            color = 0x66CC00; // Green
            break;
        default:
            color = 0xCCCCCC; // Gray
    }
    
    // Create gateway pillars
    const pillarMaterial = new THREE.MeshStandardMaterial({ 
        color: color,
        metalness: 0.3,
        roughness: 0.7
    });
    
    for (let side of [-1, 1]) {
        const pillarGeometry = new THREE.BoxGeometry(1, 6, 1);
        const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
        pillar.position.set(side * 5, 3, 0);
        group.add(pillar);
        
        // Add decorative top
        const topGeometry = new THREE.BoxGeometry(1.5, 0.5, 1.5);
        const top = new THREE.Mesh(topGeometry, pillarMaterial);
        top.position.set(side * 5, 6.25, 0);
        group.add(top);
    }
    
    // Add district name sign
    const signMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const signGeometry = new THREE.BoxGeometry(9, 1, 0.2);
    const sign = new THREE.Mesh(signGeometry, signMaterial);
    sign.position.set(0, 5, 0);
    group.add(sign);
    
    return group;
}
```

**Note:** This implementation provides the visual structure for navigation aids but does not include actual text rendering. In a real implementation, you would need to use sprite-based text, canvas textures, or another method to render text on the signs.

**Location:** Add this code to `js/streets.js` after all other street-related functions
