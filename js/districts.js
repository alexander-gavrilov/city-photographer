/**
 * Districts implementation for the City Photographer game
 * Handles creation and management of different city districts
 */

// Define district boundaries
const districtBoundaries = [
    {
        name: 'Downtown',
        center: new THREE.Vector3(0, 0, -20),
        radius: 30,
        buildingStyle: 'modern',
        description: 'The bustling heart of the city with modern skyscrapers and sleek architecture. Look for opportunities to capture the contrast between light and shadow created by these towering structures.'
    },
    {
        name: 'Industrial',
        center: new THREE.Vector3(-40, 0, 10),
        radius: 25,
        buildingStyle: 'industrial',
        description: 'A gritty district of factories, warehouses, and machinery. The weathered textures and imposing factory stacks create unique photographic opportunities with their stark industrial aesthetic.'
    },
    {
        name: 'Residential',
        center: new THREE.Vector3(35, 0, 30),
        radius: 20,
        buildingStyle: 'residential',
        description: 'A charming neighborhood with houses, apartment buildings, and community spaces. The vibrant colors and human scale make for intimate character studies and slice-of-life photography.'
    }
];

// Helper function to determine which district a position is in
function getDistrictAtPosition(position) {
    for (const district of districtBoundaries) {
        const distanceXZ = new THREE.Vector2(
            position.x - district.center.x,
            position.z - district.center.z
        ).length();
        
        if (distanceXZ < district.radius) {
            return district;
        }
    }
    
    return null; // Not in any specific district
}

// Add debug visualization of district boundaries
function addDistrictDebugVisuals() {
    districtBoundaries.forEach(district => {
        const geometry = new THREE.CircleGeometry(district.radius, 32);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0xffff00,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide
        });
        const circle = new THREE.Mesh(geometry, material);
        circle.rotation.x = -Math.PI / 2; // Rotate to be flat on ground
        circle.position.copy(district.center);
        circle.position.y = 0.1; // Slightly above ground
        scene.add(circle);
        
        // Add district name label (would require HTML/CSS or sprite-based text)
    });
}

// Downtown district building creation
function createDowntownBuildings() {
    // Define modern building materials
    const modernMaterials = [
        new THREE.MeshStandardMaterial({ color: 0x505050 }), // Dark gray
        new THREE.MeshStandardMaterial({ color: 0x707070 }), // Medium gray
        new THREE.MeshStandardMaterial({ color: 0x202060 }), // Dark blue
        new THREE.MeshStandardMaterial({ color: 0x336699 })  // Blue-gray
    ];
    
    // Array to track created buildings
    const downtownBuildings = [];
    
    // Create tall skyscrapers for downtown
    const buildingPositions = [
        { x: -5, z: -15, width: 8, height: 35, depth: 8 },
        { x: 8, z: -22, width: 6, height: 40, depth: 6 },
        { x: -10, z: -30, width: 10, height: 28, depth: 10 },
        { x: 15, z: -15, width: 7, height: 32, depth: 7 },
        { x: 0, z: -35, width: 12, height: 45, depth: 12 },
        { x: -20, z: -20, width: 9, height: 25, depth: 9 },
        { x: 20, z: -30, width: 8, height: 38, depth: 8 },
        { x: 5, z: -5, width: 5, height: 20, depth: 5 }
    ];
    
    // Create each building
    buildingPositions.forEach((pos, index) => {
        const building = createModernBuilding(
            pos.width, 
            pos.height, 
            pos.depth, 
            pos.x, 
            pos.z, 
            modernMaterials[index % modernMaterials.length]
        );
        
        building.name = `downtown_building_${index}`;
        scene.add(building);
        downtownBuildings.push(building);
    });
    
    return downtownBuildings;
}

// Helper function to create a modern-style building
function createModernBuilding(width, height, depth, x, z, material) {
    // Basic building
    const buildingGeo = new THREE.BoxGeometry(width, height, depth);
    const building = new THREE.Mesh(buildingGeo, material);
    building.position.set(x, height/2, z);
    
    // For more complex buildings, we could add additional features
    // like setbacks, spires, or decorative elements
    
    // Add random window pattern
    addWindowsToBuilding(building, width, height, depth);
    
    return building;
}

// Add window pattern to buildings
function addWindowsToBuilding(building, width, height, depth) {
    // Window material - emissive for night glow effect
    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffcc,
        emissive: 0x555533,
        emissiveIntensity: 0.2
    });
    
    // Create window pattern based on building size
    const windowSize = 0.8;
    const windowSpacing = 2.5;
    
    // Calculate how many windows can fit
    const windowsX = Math.floor(width / windowSpacing) - 1;
    const windowsY = Math.floor(height / windowSpacing) - 1;
    const windowsZ = Math.floor(depth / windowSpacing) - 1;
    
    // Add windows to each face of the building
    for (let y = 1; y < windowsY; y++) {
        const yPos = (y * windowSpacing) - (height / 2);
        
        // Windows on X faces
        for (let z = 0; z < windowsZ; z++) {
            const zPos = (z * windowSpacing) - (depth / 2) + windowSpacing/2;
            
            // Random window pattern - only add some windows
            if (Math.random() > 0.3) {
                const windowGeo = new THREE.PlaneGeometry(windowSize, windowSize);
                const window1 = new THREE.Mesh(windowGeo, windowMaterial);
                window1.position.set(width/2 + 0.05, yPos, zPos);
                window1.rotation.y = Math.PI / 2;
                building.add(window1);
                
                const window2 = new THREE.Mesh(windowGeo, windowMaterial);
                window2.position.set(-width/2 - 0.05, yPos, zPos);
                window2.rotation.y = -Math.PI / 2;
                building.add(window2);
            }
        }
        
        // Windows on Z faces
        for (let x = 0; x < windowsX; x++) {
            const xPos = (x * windowSpacing) - (width / 2) + windowSpacing/2;
            
            // Random window pattern
            if (Math.random() > 0.3) {
                const windowGeo = new THREE.PlaneGeometry(windowSize, windowSize);
                const window1 = new THREE.Mesh(windowGeo, windowMaterial);
                window1.position.set(xPos, yPos, depth/2 + 0.05);
                building.add(window1);
                
                const window2 = new THREE.Mesh(windowGeo, windowMaterial);
                window2.position.set(xPos, yPos, -depth/2 - 0.05);
                window2.rotation.y = Math.PI;
                building.add(window2);
            }
        }
    }
}

// Industrial district building creation
function createIndustrialBuildings() {
    // Define industrial building materials
    const industrialMaterials = [
        new THREE.MeshStandardMaterial({ color: 0x8B4513 }), // Brown (rust)
        new THREE.MeshStandardMaterial({ color: 0x6E6E6E }), // Dark metal
        new THREE.MeshStandardMaterial({ color: 0x8B8000 }), // Olive drab
        new THREE.MeshStandardMaterial({ color: 0x444444 })  // Dark gray
    ];
    
    // Array to track created buildings
    const industrialBuildings = [];
    
    // Create warehouses and factories for industrial district
    const buildingPositions = [
        { x: -30, z: 15, width: 15, height: 8, depth: 20 },  // Large warehouse
        { x: -50, z: 10, width: 12, height: 15, depth: 12 }, // Factory with chimney
        { x: -45, z: -5, width: 18, height: 6, depth: 8 },   // Low warehouse
        { x: -25, z: 0, width: 10, height: 12, depth: 10 },  // Processing plant
        { x: -60, z: 20, width: 14, height: 10, depth: 14 }, // Storage facility
        { x: -40, z: 25, width: 16, height: 7, depth: 10 },  // Distribution center
        { x: -20, z: 18, width: 8, height: 9, depth: 20 },   // Long factory
        { x: -55, z: 0, width: 10, height: 18, depth: 10 }   // Power plant
    ];
    
    // Create each building
    buildingPositions.forEach((pos, index) => {
        const building = createIndustrialBuilding(
            pos.width, 
            pos.height, 
            pos.depth, 
            pos.x, 
            pos.z, 
            industrialMaterials[index % industrialMaterials.length],
            index
        );
        
        building.name = `industrial_building_${index}`;
        scene.add(building);
        industrialBuildings.push(building);
    });
    
    return industrialBuildings;
}

// Helper function to create an industrial-style building
function createIndustrialBuilding(width, height, depth, x, z, material, type) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    
    // Main building structure
    const buildingGeo = new THREE.BoxGeometry(width, height, depth);
    const building = new THREE.Mesh(buildingGeo, material);
    building.position.y = height / 2;
    group.add(building);
    
    // Add industrial features based on building type
    switch (type % 4) {
        case 0: // Warehouse with sloped roof
            const roofGeo = new THREE.CylinderGeometry(0.1, width/2, height/4, 4, 1, false, Math.PI/4);
            const roof = new THREE.Mesh(roofGeo, material);
            roof.scale.z = depth / width;
            roof.rotation.x = Math.PI / 2;
            roof.position.set(0, height + height/8, 0);
            group.add(roof);
            break;
            
        case 1: // Factory with chimney
            const chimneyGeo = new THREE.CylinderGeometry(width/10, width/8, height*1.5, 8);
            const chimney = new THREE.Mesh(chimneyGeo, material);
            chimney.position.set(width/4, height + height*0.75, depth/4);
            group.add(chimney);
            break;
            
        case 2: // Building with loading bays
            for (let i = 0; i < 3; i++) {
                const bayGeo = new THREE.BoxGeometry(width/5, height/3, 0.5);
                const bay = new THREE.Mesh(bayGeo, new THREE.MeshStandardMaterial({ color: 0x333333 }));
                bay.position.set(-width/4 + i * width/4, height/6, depth/2 + 0.25);
                group.add(bay);
            }
            break;
            
        case 3: // Building with tanks/silos
            for (let i = 0; i < 2; i++) {
                const tankGeo = new THREE.CylinderGeometry(width/6, width/6, height*0.8, 12);
                const tank = new THREE.Mesh(tankGeo, new THREE.MeshStandardMaterial({ color: 0x888888 }));
                tank.position.set(-width/4 + i * width/2, height*0.4, depth/2 + width/6);
                group.add(tank);
            }
            break;
    }
    
    // Add pipes and additional details
    if (Math.random() > 0.5) {
        addPipesToBuilding(group, width, height, depth);
    }
    
    return group;
}

// Add industrial pipes and details
function addPipesToBuilding(building, width, height, depth) {
    const pipeMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    
    // Horizontal pipe along one side
    const pipeGeo1 = new THREE.CylinderGeometry(0.5, 0.5, width * 0.8, 8);
    pipeGeo1.rotateZ(Math.PI/2);
    const pipe1 = new THREE.Mesh(pipeGeo1, pipeMaterial);
    pipe1.position.set(0, height * 0.7, depth/2 + 0.5);
    building.add(pipe1);
    
    // Vertical pipe sections
    const pipeGeo2 = new THREE.CylinderGeometry(0.5, 0.5, height * 0.6, 8);
    const pipe2 = new THREE.Mesh(pipeGeo2, pipeMaterial);
    pipe2.position.set(width/4, height * 0.4, depth/2 + 0.5);
    building.add(pipe2);
    
    // Add a few valves or connection points
    const valveGeo = new THREE.SphereGeometry(0.8, 8, 8);
    const valve = new THREE.Mesh(valveGeo, new THREE.MeshStandardMaterial({ color: 0x993333 }));
    valve.position.set(width/4, height * 0.7, depth/2 + 0.5);
    building.add(valve);
}

// Residential district building creation
function createResidentialBuildings() {
    // Define residential building materials
    const residentialMaterials = [
        new THREE.MeshStandardMaterial({ color: 0xE8DACC }), // Light beige
        new THREE.MeshStandardMaterial({ color: 0xC19A6B }), // Tan
        new THREE.MeshStandardMaterial({ color: 0xA67B5B }), // Brick red/brown
        new THREE.MeshStandardMaterial({ color: 0xD4C4B7 })  // Pale gray/tan
    ];
    
    // Roof materials
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown
    
    // Array to track created buildings
    const residentialBuildings = [];
    
    // Create houses and apartment buildings for residential district
    const buildingPositions = [
        { x: 40, z: 25, width: 10, height: 6, depth: 12, type: 'house' }, // Single house
        { x: 25, z: 35, width: 14, height: 12, depth: 10, type: 'apartment' }, // Apartment
        { x: 50, z: 40, width: 8, height: 7, depth: 10, type: 'house' }, // House
        { x: 30, z: 15, width: 12, height: 15, depth: 12, type: 'apartment' }, // Apartment
        { x: 45, z: 20, width: 9, height: 6, depth: 14, type: 'house' }, // House
        { x: 20, z: 25, width: 16, height: 9, depth: 10, type: 'apartment' }, // Apartment
        { x: 55, z: 30, width: 10, height: 7, depth: 8, type: 'house' }, // House
        { x: 35, z: 45, width: 15, height: 12, depth: 15, type: 'apartment' } // Apartment
    ];
    
    // Create each building
    buildingPositions.forEach((pos, index) => {
        const building = createResidentialBuilding(
            pos.width, 
            pos.height, 
            pos.depth, 
            pos.x, 
            pos.z, 
            residentialMaterials[index % residentialMaterials.length],
            roofMaterial,
            pos.type
        );
        
        building.name = `residential_building_${index}`;
        scene.add(building);
        residentialBuildings.push(building);
    });
    
    return residentialBuildings;
}

// Helper function to create a residential-style building
function createResidentialBuilding(width, height, depth, x, z, material, roofMaterial, type) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    
    if (type === 'house') {
        // Main house structure
        const buildingGeo = new THREE.BoxGeometry(width, height, depth);
        const building = new THREE.Mesh(buildingGeo, material);
        building.position.y = height / 2;
        group.add(building);
        
        // Sloped roof
        const roofHeight = height * 0.4;
        const roofGeo = new THREE.ConeGeometry(width * 0.7, roofHeight, 4);
        roofGeo.rotateY(Math.PI / 4);
        const roof = new THREE.Mesh(roofGeo, roofMaterial);
        roof.scale.z = depth / width;
        roof.position.set(0, height + roofHeight/2, 0);
        group.add(roof);
        
        // Add some windows
        addWindowsToHouse(group, width, height, depth);
        
        // Add a door
        const doorGeo = new THREE.PlaneGeometry(width * 0.2, height * 0.4);
        const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x4d2926 }); // Dark brown
        const door = new THREE.Mesh(doorGeo, doorMaterial);
        door.position.set(0, height * 0.2, depth / 2 + 0.05);
        group.add(door);
        
    } else if (type === 'apartment') {
        // Apartment building - taller, with multiple floors
        const buildingGeo = new THREE.BoxGeometry(width, height, depth);
        const building = new THREE.Mesh(buildingGeo, material);
        building.position.y = height / 2;
        group.add(building);
        
        // Flat roof
        const roofGeo = new THREE.BoxGeometry(width, 0.5, depth);
        const roof = new THREE.Mesh(roofGeo, roofMaterial);
        roof.position.set(0, height + 0.25, 0);
        group.add(roof);
        
        // Add windows for multiple floors
        addWindowsToApartment(group, width, height, depth);
        
        // Add entrance
        const entranceGeo = new THREE.BoxGeometry(width * 0.3, height * 0.3, 0.5);
        const entranceMaterial = new THREE.MeshStandardMaterial({ color: 0x4d2926 }); // Dark brown
        const entrance = new THREE.Mesh(entranceGeo, entranceMaterial);
        entrance.position.set(0, height * 0.15, depth / 2 + 0.25);
        group.add(entrance);
        
        // Add some balconies
        addBalconiesToApartment(group, width, height, depth);
    }
    
    return group;
}

// Add windows to house
function addWindowsToHouse(house, width, height, depth) {
    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaccee,
        transparent: true,
        opacity: 0.6
    });
    
    // Front windows
    const frontWindowSize = width * 0.15;
    for (let i = 0; i < 2; i++) {
        const windowGeo = new THREE.PlaneGeometry(frontWindowSize, frontWindowSize);
        const window1 = new THREE.Mesh(windowGeo, windowMaterial);
        window1.position.set(width * 0.25 * (i === 0 ? -1 : 1), height * 0.6, depth / 2 + 0.02);
        house.add(window1);
    }
    
    // Side windows
    const sideWindowGeo = new THREE.PlaneGeometry(depth * 0.2, height * 0.2);
    
    for (let i = 0; i < 2; i++) {
        const sideWindow1 = new THREE.Mesh(sideWindowGeo, windowMaterial);
        sideWindow1.rotation.y = Math.PI / 2;
        sideWindow1.position.set(width / 2 + 0.02, height * 0.6, depth * 0.3 * (i === 0 ? -1 : 1));
        house.add(sideWindow1);
        
        const sideWindow2 = new THREE.Mesh(sideWindowGeo, windowMaterial);
        sideWindow2.rotation.y = -Math.PI / 2;
        sideWindow2.position.set(-width / 2 - 0.02, height * 0.6, depth * 0.3 * (i === 0 ? -1 : 1));
        house.add(sideWindow2);
    }
}

// Add windows to apartment building
function addWindowsToApartment(building, width, height, depth) {
    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaccee,
        transparent: true,
        opacity: 0.6
    });
    
    const floors = Math.floor(height / 3);
    const windowsPerFloor = Math.floor(width / 3);
    
    // Front windows
    for (let floor = 0; floor < floors; floor++) {
        const floorHeight = (floor + 0.5) * (height / floors);
        
        for (let w = 0; w < windowsPerFloor; w++) {
            const windowX = -width / 2 + width / (windowsPerFloor + 1) * (w + 1);
            
            const windowGeo = new THREE.PlaneGeometry(1.5, 1.8);
            const window1 = new THREE.Mesh(windowGeo, windowMaterial);
            window1.position.set(windowX, floorHeight, depth / 2 + 0.02);
            building.add(window1);
            
            const window2 = new THREE.Mesh(windowGeo, windowMaterial);
            window2.rotation.y = Math.PI;
            window2.position.set(windowX, floorHeight, -depth / 2 - 0.02);
            building.add(window2);
        }
    }
    
    // Side windows
    const sideWindowsPerFloor = Math.floor(depth / 3);
    
    for (let floor = 0; floor < floors; floor++) {
        const floorHeight = (floor + 0.5) * (height / floors);
        
        for (let w = 0; w < sideWindowsPerFloor; w++) {
            const windowZ = -depth / 2 + depth / (sideWindowsPerFloor + 1) * (w + 1);
            
            const windowGeo = new THREE.PlaneGeometry(1.5, 1.8);
            
            const window1 = new THREE.Mesh(windowGeo, windowMaterial);
            window1.rotation.y = -Math.PI / 2;
            window1.position.set(-width / 2 - 0.02, floorHeight, windowZ);
            building.add(window1);
            
            const window2 = new THREE.Mesh(windowGeo, windowMaterial);
            window2.rotation.y = Math.PI / 2;
            window2.position.set(width / 2 + 0.02, floorHeight, windowZ);
            building.add(window2);
        }
    }
}

// Add balconies to apartment building
function addBalconiesToApartment(building, width, height, depth) {
    const balconyMaterial = new THREE.MeshStandardMaterial({ color: 0xCCCCCC }); // Light gray
    const railingMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 }); // Dark gray
    
    const floors = Math.floor(height / 3);
    const balconiesPerFloor = Math.floor(width / 5);
    
    for (let floor = 1; floor < floors; floor++) {
        const floorHeight = floor * (height / floors);
        
        for (let b = 0; b < balconiesPerFloor; b++) {
            // Only add some balconies (not all windows have them)
            if (Math.random() > 0.4) {
                const balconyX = -width / 2 + width / (balconiesPerFloor + 1) * (b + 1);
                
                // Balcony floor
                const balconyGeo = new THREE.BoxGeometry(2.5, 0.2, 1.2);
                const balcony = new THREE.Mesh(balconyGeo, balconyMaterial);
                balcony.position.set(balconyX, floorHeight - 0.9, depth / 2 + 0.7);
                building.add(balcony);
                
                // Railings - front and sides
                const frontRailingGeo = new THREE.BoxGeometry(2.5, 0.8, 0.1);
                const frontRailing = new THREE.Mesh(frontRailingGeo, railingMaterial);
                frontRailing.position.set(balconyX, floorHeight - 0.5, depth / 2 + 1.25);
                building.add(frontRailing);
                
                const sideRailingGeo = new THREE.BoxGeometry(0.1, 0.8, 1.2);
                
                const leftRailing = new THREE.Mesh(sideRailingGeo, railingMaterial);
                leftRailing.position.set(balconyX - 1.2, floorHeight - 0.5, depth / 2 + 0.7);
                building.add(leftRailing);
                
                const rightRailing = new THREE.Mesh(sideRailingGeo, railingMaterial);
                rightRailing.position.set(balconyX + 1.2, floorHeight - 0.5, depth / 2 + 0.7);
                building.add(rightRailing);
            }
        }
    }
}

// Create landmarks for each district
function createDistrictLandmarks() {
    // Array to track landmarks
    const landmarks = [];
    
    // Downtown landmark - tall modern tower with observation deck
    landmarks.push(createDowntownLandmark());
    
    // Industrial landmark - large factory complex with smoke stacks
    landmarks.push(createIndustrialLandmark());
    
    // Residential landmark - park with gazebo and trees
    landmarks.push(createResidentialLandmark());
    
    return landmarks;
}

// Create landmark for Downtown district
function createDowntownLandmark() {
    // Downtown landmark - tall modern tower
    const landmarkGroup = new THREE.Group();
    landmarkGroup.position.set(0, 0, -20);
    
    // Base buildings
    const baseGeo = new THREE.BoxGeometry(15, 10, 15);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x303050 });
    const base = new THREE.Mesh(baseGeo, baseMaterial);
    base.position.y = 5;
    landmarkGroup.add(base);
    
    // Middle section
    const midGeo = new THREE.BoxGeometry(12, 30, 12);
    const midMaterial = new THREE.MeshStandardMaterial({ color: 0x505070 });
    const mid = new THREE.Mesh(midGeo, midMaterial);
    mid.position.y = 25;
    landmarkGroup.add(mid);
    
    // Tower spire
    const spireGeo = new THREE.CylinderGeometry(6, 1, 30, 8);
    const spireMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x7070A0,
        metalness: 0.7,
        roughness: 0.3
    });
    const spire = new THREE.Mesh(spireGeo, spireMaterial);
    spire.position.y = 55;
    landmarkGroup.add(spire);
    
    // Observation deck
    const deckGeo = new THREE.TorusGeometry(7, 1.5, 8, 24);
    const deckMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xA0A0C0,
        metalness: 0.6,
        roughness: 0.4
    });
    const deck = new THREE.Mesh(deckGeo, deckMaterial);
    deck.position.y = 45;
    deck.rotation.x = Math.PI / 2;
    landmarkGroup.add(deck);
    
    // Add light at the top
    const pointLight = new THREE.PointLight(0xFFFFAA, 1, 100);
    pointLight.position.y = 70;
    landmarkGroup.add(pointLight);
    
    // Add emissive sphere as the light source
    const lightGeo = new THREE.SphereGeometry(2, 16, 16);
    const lightMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xFFFFAA,
        emissive: 0xFFFF00,
        emissiveIntensity: 1
    });
    const lightSphere = new THREE.Mesh(lightGeo, lightMaterial);
    lightSphere.position.y = 70;
    landmarkGroup.add(lightSphere);
    
    landmarkGroup.name = 'downtown_landmark';
    scene.add(landmarkGroup);
    return landmarkGroup;
}

// Create landmark for Industrial district
function createIndustrialLandmark() {
    // Industrial landmark - factory complex with smoke stacks
    const landmarkGroup = new THREE.Group();
    landmarkGroup.position.set(-40, 0, 10);
    
    // Main factory building
    const factoryGeo = new THREE.BoxGeometry(20, 12, 25);
    const factoryMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 }); // Dark red
    const factory = new THREE.Mesh(factoryGeo, factoryMaterial);
    factory.position.y = 6;
    landmarkGroup.add(factory);
    
    // Factory roof - gabled
    const roofGeo = new THREE.CylinderGeometry(0.1, 14, 6, 4, 1, false, Math.PI/4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const roof = new THREE.Mesh(roofGeo, roofMaterial);
    roof.scale.z = 25 / 20;
    roof.rotation.x = Math.PI / 2;
    roof.position.set(0, 12 + 3, 0);
    landmarkGroup.add(roof);
    
    // Smoke stacks
    const stackPositions = [
        { x: -6, z: -8 },
        { x: 0, z: -8 },
        { x: 6, z: -8 }
    ];
    
    stackPositions.forEach((pos, index) => {
        // Height varies for visual interest
        const height = 18 + index * 3;
        
        const stackGeo = new THREE.CylinderGeometry(1.5, 2, height, 16);
        const stackMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const stack = new THREE.Mesh(stackGeo, stackMaterial);
        
        stack.position.set(pos.x, height/2, pos.z);
        landmarkGroup.add(stack);
        
        // Add smoke particle effect (placeholder)
        const smokeGeo = new THREE.SphereGeometry(2, 8, 8);
        const smokeMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x888888,
            transparent: true,
            opacity: 0.7
        });
        const smoke = new THREE.Mesh(smokeGeo, smokeMaterial);
        smoke.position.set(pos.x, height + 2, pos.z);
        landmarkGroup.add(smoke);
    });
    
    // Water tower
    const towerLegGeo = new THREE.CylinderGeometry(0.5, 0.5, 15, 8);
    const towerLegMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
    
    // Four legs
    const legPositions = [
        { x: 8, z: 8 },
        { x: 8, z: 12 },
        { x: 12, z: 8 },
        { x: 12, z: 12 }
    ];
    
    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(towerLegGeo, towerLegMaterial);
        leg.position.set(pos.x, 7.5, pos.z);
        landmarkGroup.add(leg);
    });
    
    // Water tank
    const tankGeo = new THREE.CylinderGeometry(5, 5, 7, 16);
    const tankMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const tank = new THREE.Mesh(tankGeo, tankMaterial);
    tank.position.set(10, 18, 10);
    landmarkGroup.add(tank);
    
    landmarkGroup.name = 'industrial_landmark';
    scene.add(landmarkGroup);
    return landmarkGroup;
}

// Create landmark for Residential district
function createResidentialLandmark() {
    // Residential landmark - park with gazebo and trees
    const landmarkGroup = new THREE.Group();
    landmarkGroup.position.set(35, 0, 30);
    
    // Park ground
    const parkGeo = new THREE.CircleGeometry(15, 32);
    const parkMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // Forest green
    const park = new THREE.Mesh(parkGeo, parkMaterial);
    park.rotation.x = -Math.PI / 2;
    park.position.y = 0.05; // Slightly above ground to avoid z-fighting
    landmarkGroup.add(park);
    
    // Gazebo
    const gazeboGroup = new THREE.Group();
    gazeboGroup.position.set(0, 0, 0);
    
    // Gazebo platform
    const platformGeo = new THREE.CylinderGeometry(5, 5, 0.5, 8);
    const platformMaterial = new THREE.MeshStandardMaterial({ color: 0xA0522D }); // Sienna
    const platform = new THREE.Mesh(platformGeo, platformMaterial);
    platform.position.y = 0.25;
    gazeboGroup.add(platform);
    
    // Gazebo posts
    const postGeo = new THREE.CylinderGeometry(0.3, 0.3, 4, 8);
    const postMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Saddle brown
    
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const postX = Math.cos(angle) * 4.5;
        const postZ = Math.sin(angle) * 4.5;
        
        const post = new THREE.Mesh(postGeo, postMaterial);
        post.position.set(postX, 2, postZ);
        gazeboGroup.add(post);
    }
    
    // Gazebo roof
    const roofGeo = new THREE.ConeGeometry(6, 3, 8);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Saddle brown
    const roof = new THREE.Mesh(roofGeo, roofMaterial);
    roof.position.y = 5.5;
    gazeboGroup.add(roof);
    
    landmarkGroup.add(gazeboGroup);
    
    // Add trees around the park
    const treePositions = [
        { x: -10, z: -5 },
        { x: -8, z: 8 },
        { x: 0, z: 12 },
        { x: 10, z: 5 },
        { x: 8, z: -8 },
        { x: 5, z: -12 },
    ];
    
    treePositions.forEach(pos => {
        const treeGroup = new THREE.Group();
        
        // Tree trunk
        const trunkGeo = new THREE.CylinderGeometry(0.5, 0.7, 5, 8);
        const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown
        const trunk = new THREE.Mesh(trunkGeo, trunkMaterial);
        trunk.position.y = 2.5;
        treeGroup.add(trunk);
        
        // Tree foliage
        const foliageGeo = new THREE.SphereGeometry(3, 8, 8);
        const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // Forest green
        const foliage = new THREE.Mesh(foliageGeo, foliageMaterial);
        foliage.position.y = 6;
        treeGroup.add(foliage);
        
        treeGroup.position.set(pos.x, 0, pos.z);
        landmarkGroup.add(treeGroup);
    });
    
    // Add benches
    const benchPositions = [
        { x: -5, z: 0, rotation: 0 },
        { x: 5, z: 0, rotation: Math.PI },
        { x: 0, z: -5, rotation: Math.PI / 2 },
        { x: 0, z: 5, rotation: -Math.PI / 2 }
    ];
    
    benchPositions.forEach(pos => {
        const benchGroup = new THREE.Group();
        
        // Bench seat
        const seatGeo = new THREE.BoxGeometry(3, 0.3, 1);
        const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown wood
        const seat = new THREE.Mesh(seatGeo, seatMaterial);
        seat.position.y = 1;
        benchGroup.add(seat);
        
        // Bench back
        const backGeo = new THREE.BoxGeometry(3, 1, 0.3);
        const back = new THREE.Mesh(backGeo, seatMaterial);
        back.position.set(0, 1.5, -0.35);
        benchGroup.add(back);
        
        // Bench legs
        const legGeo = new THREE.BoxGeometry(0.3, 1, 1);
        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 }); // Dark metal
        
        const leg1 = new THREE.Mesh(legGeo, legMaterial);
        leg1.position.set(-1.2, 0.5, 0);
        benchGroup.add(leg1);
        
        const leg2 = new THREE.Mesh(legGeo, legMaterial);
        leg2.position.set(1.2, 0.5, 0);
        benchGroup.add(leg2);
        
        benchGroup.position.set(pos.x, 0, pos.z);
        benchGroup.rotation.y = pos.rotation;
        landmarkGroup.add(benchGroup);
    });
    
    landmarkGroup.name = 'residential_landmark';
    scene.add(landmarkGroup);
    return landmarkGroup;
}

// Main function to initialize districts
function initializeDistricts() {
    // Create a group to hold all district elements
    const districtsGroup = new THREE.Group();
    districtsGroup.name = 'districts';
    
    // Create buildings for each district
    const downtownBuildings = createDowntownBuildings();
    const industrialBuildings = createIndustrialBuildings();
    const residentialBuildings = createResidentialBuildings();
    
    // Create landmarks for each district
    const landmarks = createDistrictLandmarks();
    
    // Optionally add debug visuals
    // Comment out in production
    addDistrictDebugVisuals();
    
    // Return all created elements
    return {
        districtsGroup,
        downtownBuildings,
        industrialBuildings,
        residentialBuildings,
        landmarks
    };
}
