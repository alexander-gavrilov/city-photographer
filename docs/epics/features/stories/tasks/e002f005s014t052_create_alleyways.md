# Task: Create Alleyways

**Story:** [Street Layout](../s014_street_layout.md)

**Description:** Implement alleyways and smaller paths throughout the city to enhance exploration.

**Requirements:** Create 3D models of alleyways and paths with appropriate textures and a more intimate scale.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Secondary roads and narrow alleyways implemented throughout districts
- [ ] Paths have appropriate textures (brick, concrete, dirt)
- [ ] Alleyways create interesting exploration opportunities
- [ ] Secondary paths integrate well with main roads

**Implementation Details:**
```javascript
// Create alleyways and secondary paths
function createAlleywaysAndPaths() {
    const alleywaysGroup = new THREE.Group();
    alleywaysGroup.name = 'alleyways_and_paths';
    
    // Load textures
    const textureLoader = new THREE.TextureLoader();
    
    const concreteTexture = textureLoader.load('textures/concrete.jpg');
    concreteTexture.wrapS = THREE.RepeatWrapping;
    concreteTexture.wrapT = THREE.RepeatWrapping;
    
    const brickTexture = textureLoader.load('textures/brick_pavement.jpg');
    brickTexture.wrapS = THREE.RepeatWrapping;
    brickTexture.wrapT = THREE.RepeatWrapping;
    
    const dirtTexture = textureLoader.load('textures/dirt_path.jpg');
    dirtTexture.wrapS = THREE.RepeatWrapping;
    dirtTexture.wrapT = THREE.RepeatWrapping;
    
    // Materials for different path types
    const pathMaterials = {
        'secondary': new THREE.MeshStandardMaterial({
            map: concreteTexture,
            roughness: 0.8,
            metalness: 0.1
        }),
        'alley': new THREE.MeshStandardMaterial({
            map: brickTexture,
            roughness: 0.9,
            metalness: 0.1
        }),
        'path': new THREE.MeshStandardMaterial({
            map: dirtTexture,
            roughness: 1.0,
            metalness: 0.0
        })
    };
    
    // Create secondary roads
    streetNetwork.secondaryRoads.forEach(road => {
        createPathMesh(road, pathMaterials.secondary, alleywaysGroup);
        
        // Optional: Add details specific to secondary roads
        addSecondaryRoadDetails(road, alleywaysGroup);
    });
    
    // Create alleys
    streetNetwork.alleys.forEach(alley => {
        // Determine alley type - brick or dirt path
        const material = alley.type === 'alley' ? 
            pathMaterials.alley : pathMaterials.path;
            
        createPathMesh(alley, material, alleywaysGroup);
        
        // Add alley-specific objects
        if (alley.type === 'alley') {
            addAlleyDetails(alley, alleywaysGroup);
        } else {
            addPathDetails(alley, alleywaysGroup);
        }
    });
    
    scene.add(alleywaysGroup);
    return alleywaysGroup;
}

// Helper to create path mesh
function createPathMesh(pathData, material, parentGroup) {
    const start = new THREE.Vector3(pathData.start.x, 0, pathData.start.z);
    const end = new THREE.Vector3(pathData.end.x, 0, pathData.end.z);
    const width = pathData.width;
    
    // Calculate direction and length
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    direction.normalize();
    
    // Create path geometry
    const pathGeometry = new THREE.PlaneGeometry(width, length);
    const pathMesh = new THREE.Mesh(pathGeometry, material);
    
    // Position path
    const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    pathMesh.position.set(center.x, 0.02, center.z); // Slightly above ground
    
    // Orient the path
    pathMesh.lookAt(new THREE.Vector3(end.x, 0.02, end.z));
    pathMesh.rotation.x = -Math.PI / 2; // Rotate to lie flat
    
    // Scale texture based on path dimensions
    const texScale = 1.5;  // Texture scaling factor
    material.map.repeat.set(width * texScale, length * texScale);
    
    pathMesh.name = pathData.name;
    parentGroup.add(pathMesh);
}

// Add details to secondary roads
function addSecondaryRoadDetails(road, parentGroup) {
    const start = new THREE.Vector3(road.start.x, 0, road.start.z);
    const end = new THREE.Vector3(road.end.x, 0, road.end.z);
    
    // Calculate direction and length
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    direction.normalize();
    
    // Calculate perpendicular direction for positioning objects along the sides
    const perpendicular = new THREE.Vector3(-direction.z, 0, direction.x);
    
    // Add streetlights along the road
    const lightSpacing = 15; // Space between lights
    const numLights = Math.floor(length / lightSpacing);
    
    for (let i = 0; i <= numLights; i++) {
        // Position along the road
        const t = i / numLights;
        const position = new THREE.Vector3(
            start.x + direction.x * length * t,
            0,
            start.z + direction.z * length * t
        );
        
        // Offset to the side of the road
        const sideOffset = perpendicular.clone().multiplyScalar(road.width / 2 * 0.8);
        position.add(sideOffset);
        
        // Create streetlight
        const streetlight = createStreetlight();
        streetlight.position.copy(position);
        
        // Orient streetlight perpendicular to road
        const lookAt = new THREE.Vector3(
            position.x - perpendicular.x,
            position.y,
            position.z - perpendicular.z
        );
        streetlight.lookAt(lookAt);
        
        parentGroup.add(streetlight);
    }
    
    // Add occasional bench or trash can
    if (road.width >= 5) { // Only on wider roads
        for (let i = 1; i < numLights; i += 2) {
            if (Math.random() > 0.5) {
                // Position along the road
                const t = i / numLights;
                const position = new THREE.Vector3(
                    start.x + direction.x * length * t,
                    0,
                    start.z + direction.z * length * t
                );
                
                // Offset to the side of the road
                const sideOffset = perpendicular.clone().multiplyScalar(-road.width / 2 * 0.8);
                position.add(sideOffset);
                
                // Create either a bench or trash can
                if (Math.random() > 0.5) {
                    const bench = createBench();
                    bench.position.copy(position);
                    
                    // Orient bench parallel to road
                    const angle = Math.atan2(direction.x, direction.z);
                    bench.rotation.y = angle;
                    
                    parentGroup.add(bench);
                } else {
                    const trashCan = createTrashCan();
                    trashCan.position.copy(position);
                    parentGroup.add(trashCan);
                }
            }
        }
    }
}

// Add details to alleys
function addAlleyDetails(alley, parentGroup) {
    const start = new THREE.Vector3(alley.start.x, 0, alley.start.z);
    const end = new THREE.Vector3(alley.end.x, 0, alley.end.z);
    
    // Calculate direction and length
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    direction.normalize();
    
    // Calculate perpendicular direction
    const perpendicular = new THREE.Vector3(-direction.z, 0, direction.x);
    
    // Add obstacles and details appropriate for alleys
    
    // Dumpsters
    if (Math.random() > 0.4) {
        // Position near end of alley
        const position = new THREE.Vector3(
            start.x + direction.x * length * 0.8,
            0,
            start.z + direction.z * length * 0.8
        );
        
        // Offset to the side
        const sideOffset = perpendicular.clone().multiplyScalar(alley.width / 2 * 0.6);
        position.add(sideOffset);
        
        const dumpster = createDumpster();
        dumpster.position.copy(position);
        
        // Orient dumpster
        const angle = Math.atan2(perpendicular.x, perpendicular.z);
        dumpster.rotation.y = angle;
        
        parentGroup.add(dumpster);
    }
    
    // Occasional crate or barrel
    for (let i = 0; i < 2; i++) {
        if (Math.random() > 0.5) {
            // Random position along alley
            const t = Math.random();
            const position = new THREE.Vector3(
                start.x + direction.x * length * t,
                0,
                start.z + direction.z * length * t
            );
            
            // Offset to the side
            const side = Math.random() > 0.5 ? 1 : -1;
            const sideOffset = perpendicular.clone().multiplyScalar(side * alley.width / 2 * 0.6);
            position.add(sideOffset);
            
            // Create either a crate or barrel
            if (Math.random() > 0.5) {
                const crate = createCrate();
                crate.position.copy(position);
                
                // Random rotation
                crate.rotation.y = Math.random() * Math.PI;
                
                parentGroup.add(crate);
            } else {
                const barrel = createBarrel();
                barrel.position.copy(position);
                parentGroup.add(barrel);
            }
        }
    }
}

// Add details to garden paths
function addPathDetails(path, parentGroup) {
    const start = new THREE.Vector3(path.start.x, 0, path.start.z);
    const end = new THREE.Vector3(path.end.x, 0, path.end.z);
    
    // Calculate direction and length
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    direction.normalize();
    
    // Calculate perpendicular direction
    const perpendicular = new THREE.Vector3(-direction.z, 0, direction.x);
    
    // Add plants along the path
    const plantSpacing = 5; // Space between plants
    const numPlants = Math.floor(length / plantSpacing);
    
    for (let i = 0; i <= numPlants; i++) {
        // Skip some plants randomly
        if (Math.random() < 0.3) continue;
        
        // Position along the path
        const t = i / numPlants;
        const position = new THREE.Vector3(
            start.x + direction.x * length * t,
            0,
            start.z + direction.z * length * t
        );
        
        // Offset to both sides of the path
        const side = Math.random() > 0.5 ? 1 : -1;
        const sideOffset = perpendicular.clone().multiplyScalar(side * (path.width / 2 + 0.5 + Math.random()));
        position.add(sideOffset);
        
        // Create either a bush or flowers
        if (Math.random() > 0.6) {
            const bush = createBush();
            bush.position.copy(position);
            parentGroup.add(bush);
        } else {
            const flowers = createFlowers();
            flowers.position.copy(position);
            parentGroup.add(flowers);
        }
    }
}

// Helper functions to create street objects
function createStreetlight() {
    const group = new THREE.Group();
    
    // Pole
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 8);
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.y = 1.5;
    group.add(pole);
    
    // Light fixture
    const fixtureMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const fixtureGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.4);
    const fixture = new THREE.Mesh(fixtureGeometry, fixtureMaterial);
    fixture.position.y = 2.9;
    group.add(fixture);
    
    // Light source
    const lightMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xFFFF99,
        emissive: 0xFFFF00,
        emissiveIntensity: 1
    });
    const lightGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.3);
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.y = 2.8;
    group.add(light);
    
    // Add actual light source
    const pointLight = new THREE.PointLight(0xFFFFAA, 0.8, 10);
    pointLight.position.y = 2.8;
    group.add(pointLight);
    
    return group;
}

function createBench() {
    const group = new THREE.Group();
    
    // Bench seat
    const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const seatGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.5);
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.y = 0.5;
    group.add(seat);
    
    // Bench legs
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    
    for (let x of [-0.6, 0.6]) {
        const legGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.5);
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(x, 0.25, 0);
        group.add(leg);
    }
    
    // Bench back
    const backGeometry = new THREE.BoxGeometry(1.5, 0.5, 0.1);
    const back = new THREE.Mesh(backGeometry, seatMaterial);
    back.position.set(0, 0.75, -0.2);
    group.add(back);
    
    return group;
}

function createTrashCan() {
    const group = new THREE.Group();
    
    // Trash can body
    const canMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const canGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 12);
    const can = new THREE.Mesh(canGeometry, canMaterial);
    can.position.y = 0.4;
    group.add(can);
    
    return group;
}

function createDumpster() {
    const group = new THREE.Group();
    
    // Dumpster body
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x2E8B57 });
    const bodyGeometry = new THREE.BoxGeometry(1.5, 1, 0.8);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    group.add(body);
    
    // Dumpster lid
    const lidMaterial = new THREE.MeshStandardMaterial({ color: 0x1E6B37 });
    const lidGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.8);
    const lid = new THREE.Mesh(lidGeometry, lidMaterial);
    lid.position.y = 1.05;
    group.add(lid);
    
    return group;
}

function createCrate() {
    const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const crate = new THREE.Mesh(geometry, material);
    crate.position.y = 0.35;
    return crate;
}

function createBarrel() {
    const material = new THREE.MeshStandardMaterial({ color: 0xAA3300 });
    const geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 12);
    const barrel = new THREE.Mesh(geometry, material);
    barrel.position.y = 0.4;
    return barrel;
}

function createBush() {
    const group = new THREE.Group();
    
    // Bush body
    const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });
    const bushGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    const bush = new THREE.Mesh(bushGeometry, bushMaterial);
    bush.position.y = 0.5;
    
    // Random scaling for variety
    const scale = 0.7 + Math.random() * 0.6;
    bush.scale.set(scale, scale * 0.8, scale);
    
    group.add(bush);
    return group;
}

function createFlowers() {
    const group = new THREE.Group();
    
    // Flower bed base
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x3A2A0A });
    const baseGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 8);
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.1;
    group.add(base);
    
    // Flowers
    const flowerColors = [0xFF0000, 0xFFFF00, 0xFF00FF, 0xFFFFFF];
    
    for (let i = 0; i < 5; i++) {
        const flowerMaterial = new THREE.MeshStandardMaterial({ 
            color: flowerColors[Math.floor(Math.random() * flowerColors.length)]
        });
        
        const flowerGeometry = new THREE.BoxGeometry(0.1, 0.2, 0.1);
        const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
        
        // Position within flower bed
        const angle = (i / 5) * Math.PI * 2;
        const radius = 0.25;
        flower.position.set(
            Math.cos(angle) * radius,
            0.3,
            Math.sin(angle) * radius
        );
        
        group.add(flower);
    }
    
    return group;
}
```

**Note:** This implementation assumes you have or will create textures for the different path types. If you don't have these textures yet, you can use basic colors until the textures are available.

**Location:** Add this code to `js/streets.js` after the main roads implementation functions
