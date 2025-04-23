# Task: Create District 2 Buildings

**Story:** [District Creation](../s013_district_creation.md)

**Description:** Create buildings with a unique architectural style for the Industrial district.

**Requirements:** Implement industrial-style buildings with distinct visual characteristics different from other districts.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] At least 8 buildings created for the Industrial district
- [ ] Buildings follow an industrial architectural style (factories, warehouses)
- [ ] Building heights, sizes, and placements vary for visual interest
- [ ] Buildings have appropriate materials and colors for Industrial theme

**Implementation Details:**
```javascript
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
```

**Location:** Add this code to `js/districts.js` after the Downtown district building functions
