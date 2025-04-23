# Task: Create District 3 Buildings

**Story:** [District Creation](../s013_district_creation.md)

**Description:** Create buildings with a unique architectural style for the Residential district.

**Requirements:** Implement residential-style buildings with distinct visual characteristics different from other districts.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] At least 8 buildings created for the Residential district
- [ ] Buildings follow a residential architectural style (houses, apartments)
- [ ] Building heights, sizes, and placements vary for visual interest
- [ ] Buildings have appropriate materials and colors for Residential theme

**Implementation Details:**
```javascript
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
```

**Location:** Add this code to `js/districts.js` after the Industrial district building functions
