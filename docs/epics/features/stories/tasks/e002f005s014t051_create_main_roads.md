# Task: Create Main Roads

**Story:** [Street Layout](../s014_street_layout.md)

**Description:** Implement the main roads that connect the different districts in the city.

**Requirements:** Create 3D models of the main roads with appropriate textures and collision boundaries.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Main roads connecting all districts are implemented in 3D
- [ ] Roads have appropriate textures (asphalt, markings)
- [ ] Roads blend naturally with the ground and district boundaries
- [ ] Roads have collision properties to prevent walking through barriers

**Implementation Details:**
```javascript
// Create main roads connecting districts
function createMainRoads() {
    const roadGroup = new THREE.Group();
    roadGroup.name = 'main_roads';
    
    // Road texture
    const textureLoader = new THREE.TextureLoader();
    
    const roadTexture = textureLoader.load('textures/road_asphalt.jpg');
    roadTexture.wrapS = THREE.RepeatWrapping;
    roadTexture.wrapT = THREE.RepeatWrapping;
    roadTexture.repeat.set(1, 5); // Repeat along road length
    
    // Line texture for road markings
    const lineTexture = textureLoader.load('textures/road_line.jpg');
    lineTexture.wrapS = THREE.RepeatWrapping;
    lineTexture.wrapT = THREE.RepeatWrapping;
    
    // Basic road material
    const roadMaterial = new THREE.MeshStandardMaterial({
        map: roadTexture,
        roughness: 0.9,
        metalness: 0.1
    });
    
    // Road line material
    const lineMaterial = new THREE.MeshStandardMaterial({
        map: lineTexture,
        color: 0xFFFFFF,
        roughness: 0.5,
        metalness: 0.1
    });
    
    // Create each main road
    streetNetwork.mainRoads.forEach(road => {
        // Extract road data
        const start = new THREE.Vector3(road.start.x, 0, road.start.z);
        const end = new THREE.Vector3(road.end.x, 0, road.end.z);
        const width = road.width;
        
        // Calculate direction vector and length
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();
        direction.normalize();
        
        // Road surface
        const roadGeometry = new THREE.PlaneGeometry(width, length);
        const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
        
        // Center point of the road
        const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        roadMesh.position.set(center.x, 0.05, center.z); // Slightly above ground
        
        // Orient the road correctly
        roadMesh.lookAt(new THREE.Vector3(end.x, 0.05, end.z));
        roadMesh.rotation.x = -Math.PI / 2; // Rotate to lie flat
        
        // Adjust texture repeat based on road length
        roadMaterial.map.repeat.set(width / 10, length / 10);
        
        roadGroup.add(roadMesh);
        
        // Add center line
        const lineGeometry = new THREE.PlaneGeometry(0.3, length);
        const lineMesh = new THREE.Mesh(lineGeometry, lineMaterial);
        lineMesh.position.set(center.x, 0.06, center.z); // Slightly above road
        lineMesh.lookAt(new THREE.Vector3(end.x, 0.06, end.z));
        lineMesh.rotation.x = -Math.PI / 2; // Rotate to lie flat
        
        roadGroup.add(lineMesh);
        
        // Add edge barriers if needed (curbs)
        createRoadCurbs(start, end, width, length, direction, roadGroup);
        
        // Add intersection decorations where applicable
        streetNetwork.intersections.forEach(intersection => {
            // Check if this intersection is close to the start or end of this road
            const intersectionPoint = new THREE.Vector3(intersection.x, 0, intersection.z);
            const distanceToStart = intersectionPoint.distanceTo(start);
            const distanceToEnd = intersectionPoint.distanceTo(end);
            
            if (distanceToStart < 5 || distanceToEnd < 5) {
                createIntersectionDecoration(intersection, roadGroup);
            }
        });
    });
    
    scene.add(roadGroup);
    return roadGroup;
}

// Create curbs for roads
function createRoadCurbs(start, end, width, length, direction, parentGroup) {
    // Calculate perpendicular vector for curb placement
    const perpendicular = new THREE.Vector3(-direction.z, 0, direction.x);
    
    // Curb material
    const curbMaterial = new THREE.MeshStandardMaterial({
        color: 0x999999,
        roughness: 0.8
    });
    
    // Create left and right curbs
    [-1, 1].forEach(side => {
        const curbGeometry = new THREE.BoxGeometry(length, 0.3, 0.3);
        const curb = new THREE.Mesh(curbGeometry, curbMaterial);
        
        // Position curb along road edge
        const offset = perpendicular.clone().multiplyScalar(side * width / 2);
        const curbCenter = new THREE.Vector3().addVectors(
            start.clone().add(end).multiplyScalar(0.5),
            offset
        );
        
        curb.position.set(curbCenter.x, 0.15, curbCenter.z);
        
        // Orient curb along road
        const rotationAxis = new THREE.Vector3(0, 1, 0);
        const angle = Math.atan2(direction.x, direction.z);
        curb.setRotationFromAxisAngle(rotationAxis, angle);
        
        parentGroup.add(curb);
    });
}

// Create decorations for intersections
function createIntersectionDecoration(intersection, parentGroup) {
    // Create circular pavement pattern for intersection
    const intersectionGeometry = new THREE.CircleGeometry(5, 24);
    
    const textureLoader = new THREE.TextureLoader();
    const intersectionTexture = textureLoader.load('textures/intersection_pavement.jpg');
    
    const intersectionMaterial = new THREE.MeshStandardMaterial({
        map: intersectionTexture,
        roughness: 0.8
    });
    
    const intersectionMesh = new THREE.Mesh(intersectionGeometry, intersectionMaterial);
    intersectionMesh.position.set(intersection.x, 0.04, intersection.z);
    intersectionMesh.rotation.x = -Math.PI / 2; // Rotate to lie flat
    
    parentGroup.add(intersectionMesh);
    
    // Add intersection name marker (could be replaced with proper text/signage)
    const markerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const markerMaterial = new THREE.MeshStandardMaterial({
        color: 0x0000FF,
        transparent: true,
        opacity: 0.5
    });
    
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.position.set(intersection.x, 0.5, intersection.z);
    marker.userData.isIntersectionMarker = true;
    marker.userData.intersectionName = intersection.name;
    
    parentGroup.add(marker);
}
```

**Note:** This implementation assumes you have or will create textures for the roads. If you don't have these textures yet, you can use basic colors until the textures are available.

**Location:** Add this code to `js/streets.js` after the street network design functions
