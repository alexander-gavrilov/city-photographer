# Task: Add District Landmarks

**Story:** [District Creation](../s013_district_creation.md)

**Description:** Create unique landmarks for each district that serve as visual anchor points and navigation aids.

**Requirements:** Each district should have at least one distinctive landmark that helps players identify and navigate the area.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Downtown district has a unique landmark (skyscraper or monument)
- [ ] Industrial district has a unique landmark (factory complex or structure)
- [ ] Residential district has a unique landmark (park or community building)
- [ ] Landmarks are significantly different from regular buildings
- [ ] Landmarks are positioned for optimal visibility

**Implementation Details:**
```javascript
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
    const platformMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown
    const platform = new THREE.Mesh(platformGeo, platformMaterial);
    platform.position.y = 0.25;
    gazeboGroup.add(platform);
    
    // Gazebo columns
    const columnGeo = new THREE.CylinderGeometry(0.4, 0.4, 4, 8);
    const columnMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.sin(angle) * 4.5;
        const z = Math.cos(angle) * 4.5;
        
        const column = new THREE.Mesh(columnGeo, columnMaterial);
        column.position.set(x, 2, z);
        gazeboGroup.add(column);
    }
    
    // Gazebo roof
    const roofGeo = new THREE.ConeGeometry(6, 3, 8);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const roof = new THREE.Mesh(roofGeo, roofMaterial);
    roof.position.y = 5.5;
    gazeboGroup.add(roof);
    
    landmarkGroup.add(gazeboGroup);
    
    // Add trees around the park
    const treePositions = [
        { x: -10, z: 0 },
        { x: -7, z: -7 },
        { x: 0, z: -10 },
        { x: 7, z: -7 },
        { x: 10, z: 0 },
        { x: 7, z: 7 },
        { x: 0, z: 10 },
        { x: -7, z: 7 }
    ];
    
    treePositions.forEach(pos => {
        const treeGroup = createTree();
        treeGroup.position.set(pos.x, 0, pos.z);
        landmarkGroup.add(treeGroup);
    });
    
    // Add park bench
    const benchGeo = new THREE.BoxGeometry(3, 0.5, 1);
    const benchMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const bench = new THREE.Mesh(benchGeo, benchMaterial);
    bench.position.set(-3, 0.5, 8);
    landmarkGroup.add(bench);
    
    // Add another bench
    const bench2 = bench.clone();
    bench2.position.set(3, 0.5, -8);
    bench2.rotation.y = Math.PI;
    landmarkGroup.add(bench2);
    
    landmarkGroup.name = 'residential_landmark';
    scene.add(landmarkGroup);
    return landmarkGroup;
}

// Helper function to create a tree
function createTree() {
    const treeGroup = new THREE.Group();
    
    // Tree trunk
    const trunkGeo = new THREE.CylinderGeometry(0.5, 0.7, 4, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMaterial);
    trunk.position.y = 2;
    treeGroup.add(trunk);
    
    // Tree leaves - multiple layers
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 }); // Dark green
    
    for (let i = 0; i < 3; i++) {
        const size = 5 - i * 1.2;
        const height = 4 + i * 2;
        
        const leafGeo = new THREE.ConeGeometry(size, size, 8);
        const leaf = new THREE.Mesh(leafGeo, leafMaterial);
        leaf.position.y = height;
        treeGroup.add(leaf);
    }
    
    return treeGroup;
}
```

**Location:** Add this code to `js/districts.js` after all the district building functions
