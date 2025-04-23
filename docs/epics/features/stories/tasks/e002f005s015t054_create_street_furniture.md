# Task: Create Street Furniture

**Story:** [Environment Props](../s015_environment_props.md)

**Description:** Create and place street furniture elements such as benches, trash cans, bus stops, and other common urban objects.

**Requirements:** Implement reusable street furniture objects to make the environment feel more lived-in and realistic.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Multiple bench models created and placed throughout districts
- [ ] Trash cans placed at appropriate locations
- [ ] Bus stops/shelters added along main roads
- [ ] Light posts consistent with district styles
- [ ] Street furniture placement looks natural and purposeful

**Implementation Details:**
```javascript
// Street furniture implementation
function createStreetFurniture() {
    const furnitureGroup = new THREE.Group();
    furnitureGroup.name = 'street_furniture';
    
    // Create benches
    placeBenches(furnitureGroup);
    
    // Create trash cans
    placeTrashCans(furnitureGroup);
    
    // Create bus stops
    placeBusStops(furnitureGroup);
    
    // Create light posts (beyond the ones already added with streets)
    placeLightPosts(furnitureGroup);
    
    // Add additional furniture based on district
    placeDistrictSpecificFurniture(furnitureGroup);
    
    scene.add(furnitureGroup);
    return furnitureGroup;
}

// Place benches throughout the city
function placeBenches(parentGroup) {
    // Locations for benches - we'll place them near intersections, 
    // in residential areas, and in front of important buildings
    const benchLocations = [
        // Downtown benches
        { x: -5, z: -18, rotation: Math.PI / 4, style: 'modern' },
        { x: 8, z: -15, rotation: Math.PI / 2, style: 'modern' },
        { x: 0, z: -25, rotation: Math.PI, style: 'modern' },
        { x: -12, z: -10, rotation: 0, style: 'modern' },
        { x: 5, z: -10, rotation: Math.PI / 2, style: 'modern' },
        
        // Industrial area benches (fewer)
        { x: -35, z: 5, rotation: 0, style: 'industrial' },
        { x: -45, z: 15, rotation: Math.PI / 2, style: 'industrial' },
        
        // Residential area benches (many)
        { x: 25, z: 25, rotation: 0, style: 'residential' },
        { x: 30, z: 30, rotation: Math.PI / 4, style: 'residential' },
        { x: 40, z: 35, rotation: Math.PI / 2, style: 'residential' },
        { x: 45, z: 25, rotation: Math.PI, style: 'residential' },
        { x: 35, z: 40, rotation: Math.PI * 1.5, style: 'residential' },
        { x: 25, z: 40, rotation: 0, style: 'residential' },
        { x: 20, z: 30, rotation: Math.PI / 2, style: 'residential' }
    ];
    
    // Create each bench
    benchLocations.forEach(location => {
        const bench = createBench(location.style);
        bench.position.set(location.x, 0, location.z);
        bench.rotation.y = location.rotation;
        parentGroup.add(bench);
    });
}

// Create a bench with the given style
function createBench(style) {
    const group = new THREE.Group();
    
    // Different bench styles based on district
    let seatMaterial, legMaterial, backStyle;
    
    switch (style) {
        case 'modern':
            // Modern metal and wood bench
            seatMaterial = new THREE.MeshStandardMaterial({ color: 0xA0522D }); // Brown wood
            legMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x888888,
                metalness: 0.7,
                roughness: 0.3
            }); // Metal
            backStyle = 'slats';
            break;
            
        case 'industrial':
            // Simple metal bench
            seatMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x777777,
                metalness: 0.8,
                roughness: 0.2
            }); // Metal
            legMaterial = seatMaterial;
            backStyle = 'simple';
            break;
            
        case 'residential':
        default:
            // Traditional wood bench
            seatMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Dark wood
            legMaterial = new THREE.MeshStandardMaterial({ color: 0x3A3A3A }); // Dark metal
            backStyle = 'curved';
    }
    
    // Seat
    const seatGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.5);
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.y = 0.4;
    group.add(seat);
    
    // Legs
    for (let x of [-0.6, 0.6]) {
        const legGeometry = new THREE.BoxGeometry(0.1, 0.4, 0.5);
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(x, 0.2, 0);
        group.add(leg);
    }
    
    // Back
    if (backStyle === 'slats') {
        // Modern slat back
        for (let i = 0; i < 3; i++) {
            const slatGeometry = new THREE.BoxGeometry(1.5, 0.08, 0.05);
            const slat = new THREE.Mesh(slatGeometry, seatMaterial);
            slat.position.set(0, 0.6 + i * 0.15, -0.22);
            group.add(slat);
        }
    } else if (backStyle === 'curved') {
        // Curved back for traditional bench
        const backGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 8, 1, false, Math.PI/2, Math.PI);
        backGeometry.rotateZ(Math.PI / 2);
        const back = new THREE.Mesh(backGeometry, seatMaterial);
        back.position.set(0, 0.7, -0.2);
        back.rotation.x = Math.PI / 2;
        group.add(back);
    } else {
        // Simple back
        const backGeometry = new THREE.BoxGeometry(1.5, 0.3, 0.05);
        const back = new THREE.Mesh(backGeometry, seatMaterial);
        back.position.set(0, 0.65, -0.22);
        group.add(back);
    }
    
    return group;
}

// Place trash cans throughout the city
function placeTrashCans(parentGroup) {
    // Locations for trash cans - near benches, intersections, buildings
    const trashCanLocations = [
        // Downtown trash cans
        { x: -3, z: -18, style: 'modern' },
        { x: 10, z: -15, style: 'modern' },
        { x: 0, z: -23, style: 'modern' },
        { x: -14, z: -10, style: 'modern' },
        { x: 5, z: -8, style: 'modern' },
        { x: -8, z: -25, style: 'modern' },
        
        // Industrial area trash cans
        { x: -33, z: 5, style: 'industrial' },
        { x: -43, z: 15, style: 'industrial' },
        { x: -38, z: 8, style: 'industrial' },
        { x: -30, z: 12, style: 'industrial' },
        
        // Residential area trash cans
        { x: 27, z: 25, style: 'residential' },
        { x: 30, z: 32, style: 'residential' },
        { x: 38, z: 35, style: 'residential' },
        { x: 43, z: 25, style: 'residential' },
        { x: 35, z: 38, style: 'residential' },
        { x: 23, z: 40, style: 'residential' },
        { x: 22, z: 30, style: 'residential' }
    ];
    
    // Create each trash can
    trashCanLocations.forEach(location => {
        const trashCan = createTrashCan(location.style);
        trashCan.position.set(location.x, 0, location.z);
        // Random rotation for variety
        trashCan.rotation.y = Math.random() * Math.PI * 2;
        parentGroup.add(trashCan);
    });
}

// Create a trash can with the given style
function createTrashCan(style) {
    const group = new THREE.Group();
    
    let material;
    let shape;
    
    switch (style) {
        case 'modern':
            // Modern sleek trash can
            material = new THREE.MeshStandardMaterial({ 
                color: 0x444444,
                metalness: 0.7,
                roughness: 0.3
            });
            shape = 'cylinder';
            break;
            
        case 'industrial':
            // Rugged industrial trash can
            material = new THREE.MeshStandardMaterial({ 
                color: 0x777777,
                metalness: 0.4,
                roughness: 0.8
            });
            shape = 'box';
            break;
            
        case 'residential':
        default:
            // Traditional green trash can
            material = new THREE.MeshStandardMaterial({ color: 0x2E8B57 });
            shape = 'cylinder';
    }
    
    // Create trash can body based on shape
    if (shape === 'cylinder') {
        const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.25, 0.8, 12);
        const body = new THREE.Mesh(bodyGeometry, material);
        body.position.y = 0.4;
        group.add(body);
        
        // Add lid
        const lidGeometry = new THREE.CylinderGeometry(0.32, 0.3, 0.1, 12);
        const lid = new THREE.Mesh(lidGeometry, material);
        lid.position.y = 0.85;
        group.add(lid);
        
        // Add opening
        if (style === 'modern') {
            const openingGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.2);
            const opening = new THREE.Mesh(openingGeometry, new THREE.MeshStandardMaterial({ color: 0x111111 }));
            opening.position.set(0, 0.85, 0);
            group.add(opening);
        }
        
    } else if (shape === 'box') {
        const bodyGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.6);
        const body = new THREE.Mesh(bodyGeometry, material);
        body.position.y = 0.4;
        group.add(body);
        
        // Add lid
        const lidGeometry = new THREE.BoxGeometry(0.65, 0.1, 0.65);
        const lid = new THREE.Mesh(lidGeometry, material);
        lid.position.y = 0.85;
        group.add(lid);
    }
    
    return group;
}

// Place bus stops along main roads
function placeBusStops(parentGroup) {
    // Locations for bus stops - along main roads
    const busStopLocations = [
        // Downtown bus stops
        { x: -8, z: -12, rotation: Math.PI / 4, style: 'modern' },
        { x: 3, z: -8, rotation: 0, style: 'modern' },
        
        // Industrial area bus stops
        { x: -30, z: 2, rotation: Math.PI / 2, style: 'industrial' },
        
        // Residential area bus stops
        { x: 28, z: 28, rotation: Math.PI * 1.75, style: 'residential' }
    ];
    
    // Create each bus stop
    busStopLocations.forEach(location => {
        const busStop = createBusStop(location.style);
        busStop.position.set(location.x, 0, location.z);
        busStop.rotation.y = location.rotation;
        parentGroup.add(busStop);
    });
}

// Create a bus stop with the given style
function createBusStop(style) {
    const group = new THREE.Group();
    
    let roofMaterial, supportMaterial, benchMaterial;
    
    switch (style) {
        case 'modern':
            // Modern glass and metal bus stop
            roofMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x88CCFF,
                transparent: true,
                opacity: 0.6,
                metalness: 0.2,
                roughness: 0.1
            });
            supportMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x888888,
                metalness: 0.8,
                roughness: 0.2
            });
            benchMaterial = supportMaterial;
            break;
            
        case 'industrial':
            // Rugged metal bus stop
            roofMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x777777,
                metalness: 0.6,
                roughness: 0.4
            });
            supportMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
            benchMaterial = roofMaterial;
            break;
            
        case 'residential':
        default:
            // Traditional bus stop
            roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
            supportMaterial = new THREE.MeshStandardMaterial({ color: 0x3A3A3A });
            benchMaterial = roofMaterial;
    }
    
    // Supports
    for (let x of [-1.5, 1.5]) {
        const supportGeometry = new THREE.BoxGeometry(0.1, 2.5, 0.1);
        const support = new THREE.Mesh(supportGeometry, supportMaterial);
        support.position.set(x, 1.25, 0);
        group.add(support);
    }
    
    // Roof
    const roofGeometry = new THREE.BoxGeometry(3.5, 0.1, 1.2);
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 2.5;
    group.add(roof);
    
    // Back wall (except for modern glass style)
    if (style !== 'modern') {
        const wallGeometry = new THREE.BoxGeometry(3, 1.5, 0.05);
        const wall = new THREE.Mesh(wallGeometry, roofMaterial);
        wall.position.set(0, 1.75, -0.5);
        group.add(wall);
    } else {
        // Glass back for modern style
        const glassGeometry = new THREE.BoxGeometry(3, 1.5, 0.05);
        const glass = new THREE.Mesh(glassGeometry, new THREE.MeshStandardMaterial({ 
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.3,
            metalness: 0.2,
            roughness: 0.1
        }));
        glass.position.set(0, 1.75, -0.5);
        group.add(glass);
    }
    
    // Bench
    const benchGeometry = new THREE.BoxGeometry(2.5, 0.1, 0.4);
    const bench = new THREE.Mesh(benchGeometry, benchMaterial);
    bench.position.set(0, 0.4, -0.3);
    group.add(bench);
    
    return group;
}

// Place light posts throughout the city (beyond those already added with streets)
function placeLightPosts(parentGroup) {
    // Locations for additional light posts
    const lightPostLocations = [
        // Downtown light posts
        // (Place extra lights in areas that need more illumination)
        { x: -15, z: -20, style: 'modern', height: 4 },
        { x: 10, z: -25, style: 'modern', height: 4 },
        { x: -5, z: -28, style: 'modern', height: 4 },
        
        // Industrial light posts
        { x: -38, z: 15, style: 'industrial', height: 5 },
        { x: -45, z: 5, style: 'industrial', height: 5 },
        { x: -53, z: 12, style: 'industrial', height: 6 },
        
        // Residential light posts
        { x: 35, z: 35, style: 'residential', height: 3 },
        { x: 42, z: 28, style: 'residential', height: 3 },
        { x: 25, z: 42, style: 'residential', height: 3 }
    ];
    
    // Create each light post
    lightPostLocations.forEach(location => {
        const lightPost = createLightPost(location.style, location.height);
        lightPost.position.set(location.x, 0, location.z);
        // Random rotation for variety
        lightPost.rotation.y = Math.random() * Math.PI * 2;
        parentGroup.add(lightPost);
    });
}

// Create a light post with the given style and height
function createLightPost(style, height) {
    const group = new THREE.Group();
    
    let poleMaterial, fixtureMaterial, lightColor;
    
    switch (style) {
        case 'modern':
            // Modern sleek light post
            poleMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x444444,
                metalness: 0.7,
                roughness: 0.3
            });
            fixtureMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
            lightColor = 0xFFFFCC; // Warm white
            break;
            
        case 'industrial':
            // Rugged industrial light post
            poleMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x777777,
                metalness: 0.4,
                roughness: 0.8
            });
            fixtureMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
            lightColor = 0xDDDDFF; // Cool white/blue
            break;
            
        case 'residential':
        default:
            // Traditional decorative light post
            poleMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
            fixtureMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
            lightColor = 0xFFEECC; // Warm yellow
    }
    
    // Pole
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.12, height, 8);
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.y = height / 2;
    group.add(pole);
    
    // Different fixture designs based on style
    if (style === 'modern') {
        // Modern horizontal fixture
        const fixtureGeometry = new THREE.BoxGeometry(0.5, 0.2, 0.2);
        const fixture = new THREE.Mesh(fixtureGeometry, fixtureMaterial);
        fixture.position.set(0.3, height - 0.1, 0);
        group.add(fixture);
        
        // Light source
        const lightMaterial = new THREE.MeshBasicMaterial({ 
            color: lightColor,
            emissive: lightColor,
            emissiveIntensity: 1
        });
        const lightGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.15);
        const light = new THREE.Mesh(lightGeometry, lightMaterial);
        light.position.set(0.3, height - 0.15, 0);
        group.add(light);
        
        // Actual light source
        const pointLight = new THREE.PointLight(lightColor, 0.8, 10);
        pointLight.position.set(0.3, height - 0.2, 0);
        group.add(pointLight);
        
    } else if (style === 'industrial') {
        // Industrial cage light
        const fixtureGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        const fixture = new THREE.Mesh(fixtureGeometry, fixtureMaterial);
        fixture.position.y = height - 0.3;
        group.add(fixture);
        
        // Light source
        const lightMaterial = new THREE.MeshBasicMaterial({ 
            color: lightColor,
            emissive: lightColor,
            emissiveIntensity: 1
        });
        const lightGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const light = new THREE.Mesh(lightGeometry, lightMaterial);
        light.position.y = height - 0.3;
        group.add(light);
        
        // Actual light source
        const pointLight = new THREE.PointLight(lightColor, 1, 12);
        pointLight.position.y = height - 0.3;
        group.add(pointLight);
        
    } else {
        // Traditional lantern style
        const fixtureGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.4, 8);
        const fixture = new THREE.Mesh(fixtureGeometry, fixtureMaterial);
        fixture.position.y = height - 0.2;
        group.add(fixture);
        
        // Light source
        const lightMaterial = new THREE.MeshBasicMaterial({ 
            color: lightColor,
            emissive: lightColor,
            emissiveIntensity: 1,
            transparent: true,
            opacity: 0.8
        });
        const lightGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.36, 8);
        const light = new THREE.Mesh(lightGeometry, lightMaterial);
        light.position.y = height - 0.2;
        group.add(light);
        
        // Actual light source
        const pointLight = new THREE.PointLight(lightColor, 0.7, 8);
        pointLight.position.y = height - 0.2;
        group.add(pointLight);
    }
    
    return group;
}

// Place district-specific furniture
function placeDistrictSpecificFurniture(parentGroup) {
    // Downtown district specific furniture (news stands, planters)
    const downtownFurniture = [
        { type: 'newsStand', x: -8, z: -15, rotation: 0 },
        { type: 'newsStand', x: 5, z: -22, rotation: Math.PI / 2 },
        { type: 'planter', x: -5, z: -12, rotation: 0 },
        { type: 'planter', x: 2, z: -18, rotation: 0 },
        { type: 'planter', x: 10, z: -12, rotation: 0 }
    ];
    
    downtownFurniture.forEach(item => {
        let object;
        
        if (item.type === 'newsStand') {
            object = createNewsStand();
        } else if (item.type === 'planter') {
            object = createPlanter();
        }
        
        if (object) {
            object.position.set(item.x, 0, item.z);
            object.rotation.y = item.rotation;
            parentGroup.add(object);
        }
    });
    
    // Industrial district specific furniture (cargo containers, construction barriers)
    const industrialFurniture = [
        { type: 'container', x: -35, z: 12, rotation: 0 },
        { type: 'container', x: -48, z: 8, rotation: Math.PI / 4 },
        { type: 'barrier', x: -42, z: 6, rotation: 0 },
        { type: 'barrier', x: -39, z: 18, rotation: Math.PI / 2 },
        { type: 'barrel', x: -33, z: 15, rotation: 0 },
        { type: 'barrel', x: -34, z: 16, rotation: 0 },
        { type: 'barrel', x: -34.5, z: 15.5, rotation: 0 }
    ];
    
    industrialFurniture.forEach(item => {
        let object;
        
        if (item.type === 'container') {
            object = createContainer();
        } else if (item.type === 'barrier') {
            object = createBarrier();
        } else if (item.type === 'barrel') {
            object = createIndustrialBarrel();
        }
        
        if (object) {
            object.position.set(item.x, 0, item.z);
            object.rotation.y = item.rotation;
            parentGroup.add(object);
        }
    });
    
    // Residential district specific furniture (mailboxes, garden decorations)
    const residentialFurniture = [
        { type: 'mailbox', x: 28, z: 32, rotation: 0 },
        { type: 'mailbox', x: 42, z: 38, rotation: Math.PI / 2 },
        { type: 'gardenGnome', x: 37, z: 27, rotation: 0 },
        { type: 'gardenGnome', x: 25, z: 38, rotation: Math.PI / 4 },
        { type: 'birdbath', x: 32, z: 42, rotation: 0 },
        { type: 'birdbath', x: 22, z: 28, rotation: 0 }
    ];
    
    residentialFurniture.forEach(item => {
        let object;
        
        if (item.type === 'mailbox') {
            object = createMailbox();
        } else if (item.type === 'gardenGnome') {
            object = createGardenGnome();
        } else if (item.type === 'birdbath') {
            object = createBirdbath();
        }
        
        if (object) {
            object.position.set(item.x, 0, item.z);
            object.rotation.y = item.rotation;
            parentGroup.add(object);
        }
    });
}

// Helper functions to create district-specific furniture
function createNewsStand() {
    const group = new THREE.Group();
    
    // Base
    const baseGeometry = new THREE.BoxGeometry(1.5, 0.1, 1);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.05;
    group.add(base);
    
    // Stand body
    const bodyGeometry = new THREE.BoxGeometry(1.5, 1.5, 1);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x1E90FF }); // Blue
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.85;
    group.add(body);
    
    // Roof
    const roofGeometry = new THREE.BoxGeometry(1.7, 0.1, 1.2);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 1.7;
    group.add(roof);
    
    // Display shelf
    const shelfGeometry = new THREE.BoxGeometry(1.4, 0.6, 0.1);
    const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
    const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
    shelf.position.set(0, 1, 0.55);
    shelf.rotation.x = Math.PI / 6; // Angled shelf
    group.add(shelf);
    
    return group;
}

function createPlanter() {
    const group = new THREE.Group();
    
    // Planter box
    const boxGeometry = new THREE.BoxGeometry(1.2, 0.6, 1.2);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.y = 0.3;
    group.add(box);
    
    // Soil
    const soilGeometry = new THREE.BoxGeometry(1, 0.1, 1);
    const soilMaterial = new THREE.MeshStandardMaterial({ color: 0x3A2A0A });
    const soil = new THREE.Mesh(soilGeometry, soilMaterial);
    soil.position.y = 0.55;
    group.add(soil);
    
    // Plants/Flowers
    const flowerColors = [0xFF0000, 0xFFFF00, 0xFF00FF, 0xFFFFFF, 0xFFA500];
    
    for (let i = 0; i < 6; i++) {
        const stemGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8);
        const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        
        // Random position within planter
        const x = (Math.random() - 0.5) * 0.8;
        const z = (Math.random() - 0.5) * 0.8;
        
        stem.position.set(x, 0.75, z);
        group.add(stem);
        
        // Flower on top
        const flowerGeometry = new THREE.SphereGeometry(0.08, 8, 8);
        const flowerMaterial = new THREE.MeshStandardMaterial({ 
            color: flowerColors[Math.floor(Math.random() * flowerColors.length)] 
        });
        const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
        flower.position.set(x, 0.95, z);
        group.add(flower);
    }
    
    return group;
}

function createContainer() {
    const group = new THREE.Group();
    
    // Container body
    const bodyGeometry = new THREE.BoxGeometry(5, 2.5, 2.2);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xA52A2A }); // Brown
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1.25;
    group.add(body);
    
    // Container doors
    const doorGeometry = new THREE.BoxGeometry(0.1, 2.3, 1);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    
    const door1 = new THREE.Mesh(doorGeometry, doorMaterial);
    door1.position.set(2.5, 1.25, 0.5);
    group.add(door1);
    
    const door2 = new THREE.Mesh(doorGeometry, doorMaterial);
    door2.position.set(2.5, 1.25, -0.5);
    group.add(door2);
    
    return group;
}

function createBarrier() {
    const group = new THREE.Group();
    
    // Barrier base
    const baseGeometry = new THREE.BoxGeometry(1.5, 0.2, 0.2);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.1;
    group.add(base);
    
    // Barrier stripes
    const stripeGeometry = new THREE.BoxGeometry(1.5, 0.8, 0.05);
    const stripeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFF4500, // Orange-red
        emissive: 0xFF2000,
        emissiveIntensity: 0.2
    });
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.position.set(0, 0.5, 0);
    group.add(stripe);
    
    return group;
}

function createIndustrialBarrel() {
    const group = new THREE.Group();
    
    // Barrel body
    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.9, 12);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x2F4F4F });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.45;
    group.add(body);
    
    // Barrel rings
    const ringGeometry = new THREE.TorusGeometry(0.31, 0.05, 8, 16);
    const ringMaterial = new THREE.MeshStandardMaterial({ color: 0x696969 });
    
    const topRing = new THREE.Mesh(ringGeometry, ringMaterial);
    topRing.position.y = 0.8;
    topRing.rotation.x = Math.PI / 2;
    group.add(topRing);
    
    const bottomRing = new THREE.Mesh(ringGeometry, ringMaterial);
    bottomRing.position.y = 0.1;
    bottomRing.rotation.x = Math.PI / 2;
    group.add(bottomRing);
    
    return group;
}

function createMailbox() {
    const group = new THREE.Group();
    
    // Post
    const postGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 8);
    const postMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const post = new THREE.Mesh(postGeometry, postMaterial);
    post.position.y = 0.6;
    group.add(post);
    
    // Mailbox
    const boxGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.4);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x1E90FF });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.y = 1.2;
    group.add(box);
    
    // Flag
    const flagGeometry = new THREE.BoxGeometry(0.05, 0.2, 0.02);
    const flagMaterial = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
    const flag = new THREE.Mesh(flagGeometry, flagMaterial);
    flag.position.set(0.125, 1.25, -0.1);
    group.add(flag);
    
    return group;
}

function createGardenGnome() {
    const group = new THREE.Group();
    
    // Base
    const baseGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.05, 8);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.025;
    group.add(base);
    
    // Body
    const bodyGeometry = new THREE.ConeGeometry(0.1, 0.3, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.2;
    group.add(body);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xFFE4B5 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.4;
    group.add(head);
    
    // Hat
    const hatGeometry = new THREE.ConeGeometry(0.08, 0.15, 8);
    const hatMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const hat = new THREE.Mesh(hatGeometry, hatMaterial);
    hat.position.y = 0.5;
    group.add(hat);
    
    return group;
}

function createBirdbath() {
    const group = new THREE.Group();
    
    // Pedestal
    const pedestalGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.8, 8);
    const pedestalMaterial = new THREE.MeshStandardMaterial({ color: 0xCCCCCC });
    const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
    pedestal.position.y = 0.4;
    group.add(pedestal);
    
    // Bath
    const bathGeometry = new THREE.CylinderGeometry(0.3, 0.2, 0.1, 16);
    const bathMaterial = new THREE.MeshStandardMaterial({ color: 0xDDDDDD });
    const bath = new THREE.Mesh(bathGeometry, bathMaterial);
    bath.position.y = 0.85;
    group.add(bath);
    
    // Water
    const waterGeometry = new THREE.CylinderGeometry(0.28, 0.28, 0.03, 16);
    const waterMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4169E1,
        transparent: true,
        opacity: 0.7
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.position.y = 0.87;
    group.add(water);
    
    return group;
}
```

**Location:** Add this code to a new file `js/props.js` and import it in `main.js`
