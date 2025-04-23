# Task: Implement Ambient Objects

**Story:** [Environment Props](../s015_environment_props.md)

**Description:** Add small ambient objects like leaves, papers, litter, and other details that create a sense of a living environment.

**Requirements:** Create and place small objects throughout the environment to enhance realism and atmosphere.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Leaves/plant debris added in appropriate areas
- [ ] Paper litter implemented in select locations
- [ ] Small debris objects placed throughout the environment
- [ ] Objects are distributed appropriately based on district type

**Implementation Details:**
```javascript
// Implement ambient objects
function createAmbientObjects() {
    const ambientGroup = new THREE.Group();
    ambientGroup.name = 'ambient_objects';
    
    // Add leaves in residential and park areas
    addLeaves(ambientGroup);
    
    // Add papers and litter
    addLitter(ambientGroup);
    
    // Add misc small debris
    addDebris(ambientGroup);
    
    scene.add(ambientGroup);
    return ambientGroup;
}

// Add leaves and plant debris
function addLeaves(parentGroup) {
    // Define areas where leaves should appear (mostly residential and near trees)
    const leafAreas = [
        // Residential area - dense leaves
        {
            center: { x: 35, z: 30 },
            radius: 15,
            density: 20, // Number of leaf groups
            type: 'residential'
        },
        // Park area - very dense leaves
        {
            center: { x: 35, z: 30 },
            radius: 5,
            density: 15,
            type: 'park'
        },
        // Downtown area - sparse leaves
        {
            center: { x: 0, z: -15 },
            radius: 10,
            density: 5,
            type: 'downtown'
        }
    ];
    
    // Create leaves in each area
    leafAreas.forEach(area => {
        for (let i = 0; i < area.density; i++) {
            // Random position within the area
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * area.radius;
            const x = area.center.x + Math.cos(angle) * distance;
            const z = area.center.z + Math.sin(angle) * distance;
            
            // Create leaf cluster
            const leafCluster = createLeafCluster(area.type);
            leafCluster.position.set(x, 0.02, z); // Just above ground
            leafCluster.rotation.y = Math.random() * Math.PI * 2; // Random rotation
            
            parentGroup.add(leafCluster);
        }
    });
}

// Create a cluster of leaves
function createLeafCluster(type) {
    const group = new THREE.Group();
    
    // Define leaf colors based on area type
    let leafColors;
    let leafCount;
    
    switch (type) {
        case 'residential':
            leafColors = [0x228B22, 0x006400, 0x228B22, 0x8B4513]; // Green and brown
            leafCount = 8 + Math.floor(Math.random() * 8);
            break;
            
        case 'park':
            leafColors = [0x228B22, 0x32CD32, 0x006400, 0x8B4513]; // Various greens
            leafCount = 12 + Math.floor(Math.random() * 10);
            break;
            
        case 'downtown':
        default:
            leafColors = [0x8B4513, 0xA0522D, 0xCD853F]; // Browns (mostly dead leaves)
            leafCount = 4 + Math.floor(Math.random() * 4);
    }
    
    // Create individual leaves
    for (let i = 0; i < leafCount; i++) {
        // Random leaf shape (simple plane for performance)
        const leafGeometry = new THREE.PlaneGeometry(0.15, 0.15);
        const leafMaterial = new THREE.MeshBasicMaterial({ 
            color: leafColors[Math.floor(Math.random() * leafColors.length)],
            side: THREE.DoubleSide
        });
        
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        
        // Random position within cluster
        const offset = 0.3;
        leaf.position.set(
            (Math.random() - 0.5) * offset,
            0.01 + Math.random() * 0.02, // Slight variation in height
            (Math.random() - 0.5) * offset
        );
        
        // Random rotation
        leaf.rotation.x = -Math.PI / 2 + (Math.random() - 0.5) * 0.3; // Mostly flat but slight variation
        leaf.rotation.y = Math.random() * Math.PI * 2;
        leaf.rotation.z = Math.random() * Math.PI * 2;
        
        group.add(leaf);
    }
    
    return group;
}

// Add papers and litter
function addLitter(parentGroup) {
    // Define areas where litter should appear
    const litterAreas = [
        // Downtown area - moderate litter
        {
            center: { x: 0, z: -20 },
            radius: 20,
            density: 15,
            type: 'downtown'
        },
        // Industrial area - heavy litter
        {
            center: { x: -40, z: 10 },
            radius: 25,
            density: 25,
            type: 'industrial'
        },
        // Residential area - light litter
        {
            center: { x: 35, z: 30 },
            radius: 20,
            density: 8,
            type: 'residential'
        }
    ];
    
    // Create litter in each area
    litterAreas.forEach(area => {
        for (let i = 0; i < area.density; i++) {
            // Skip some litter based on area type (more consistent distribution)
            if (area.type === 'residential' && Math.random() < 0.3) continue;
            
            // Random position within the area
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * area.radius * 0.9; // Avoid exact edge
            const x = area.center.x + Math.cos(angle) * distance;
            const z = area.center.z + Math.sin(angle) * distance;
            
            // Create random litter object
            const litter = createLitterObject(area.type);
            litter.position.set(x, 0.02, z); // Just above ground
            litter.rotation.y = Math.random() * Math.PI * 2; // Random rotation
            
            parentGroup.add(litter);
        }
    });
}

// Create a single litter object
function createLitterObject(type) {
    // Random litter type
    const litterType = Math.random();
    const group = new THREE.Group();
    
    if (litterType < 0.5) {
        // Paper/newspaper
        const paperGeometry = new THREE.PlaneGeometry(0.3, 0.4);
        
        let paperMaterial;
        if (Math.random() < 0.7) {
            // Regular paper
            paperMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xFFFFFF,
                side: THREE.DoubleSide
            });
        } else {
            // Newspaper
            paperMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xEEEEEE,
                side: THREE.DoubleSide
            });
        }
        
        const paper = new THREE.Mesh(paperGeometry, paperMaterial);
        paper.rotation.x = -Math.PI / 2 + (Math.random() - 0.5) * 0.2;
        
        group.add(paper);
    } 
    else if (litterType < 0.8) {
        // Disposable cup/container
        const cupGeometry = new THREE.CylinderGeometry(0.1, 0.07, 0.15, 8);
        const cupMaterial = new THREE.MeshBasicMaterial({ 
            color: Math.random() < 0.5 ? 0xFFFFFF : 0xFFD700
        });
        
        const cup = new THREE.Mesh(cupGeometry, cupMaterial);
        // Random orientation (upright or fallen)
        if (Math.random() < 0.5) {
            cup.rotation.x = Math.PI / 2;
        }
        
        group.add(cup);
    }
    else {
        // Misc trash
        const trashGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.15);
        
        // Different colors based on area
        let trashColor;
        if (type === 'industrial') {
            trashColor = 0x777777; // Industrial metal/gray
        } else if (type === 'downtown') {
            trashColor = 0x1E90FF; // Blue packaging
        } else {
            trashColor = 0x32CD32; // Green
        }
        
        const trashMaterial = new THREE.MeshBasicMaterial({ color: trashColor });
        const trash = new THREE.Mesh(trashGeometry, trashMaterial);
        trash.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        group.add(trash);
    }
    
    return group;
}

// Add miscellaneous small debris
function addDebris(parentGroup) {
    // Define areas for debris
    const debrisAreas = [
        // Downtown area
        {
            center: { x: 0, z: -20 },
            radius: 20,
            density: 20,
            type: 'downtown'
        },
        // Industrial area - more debris
        {
            center: { x: -40, z: 10 },
            radius: 25,
            density: 35,
            type: 'industrial'
        },
        // Residential area - less debris
        {
            center: { x: 35, z: 30 },
            radius: 20,
            density: 15,
            type: 'residential'
        }
    ];
    
    // Create debris in each area
    debrisAreas.forEach(area => {
        for (let i = 0; i < area.density; i++) {
            // Random position within the area
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * area.radius * 0.9;
            const x = area.center.x + Math.cos(angle) * distance;
            const z = area.center.z + Math.sin(angle) * distance;
            
            // Create random debris
            const debris = createDebrisObject(area.type);
            debris.position.set(x, 0.01, z); // Just above ground
            debris.rotation.y = Math.random() * Math.PI * 2;
            
            parentGroup.add(debris);
        }
    });
}

// Create a single debris object
function createDebrisObject(type) {
    // Determine debris type based on area
    let debrisOptions;
    
    if (type === 'industrial') {
        debrisOptions = [
            'metal_scrap',
            'wood_scrap',
            'wire',
            'bolt',
            'dust_pile'
        ];
    } else if (type === 'downtown') {
        debrisOptions = [
            'cigarette',
            'bottle_cap',
            'dust_pile',
            'gum',
            'small_rock'
        ];
    } else {
        debrisOptions = [
            'twig',
            'small_rock',
            'bottle_cap',
            'dust_pile',
            'grass_clump'
        ];
    }
    
    // Pick a random debris type
    const debrisType = debrisOptions[Math.floor(Math.random() * debrisOptions.length)];
    
    // Create the debris
    switch (debrisType) {
        case 'metal_scrap':
            return createMetalScrap();
        case 'wood_scrap':
            return createWoodScrap();
        case 'wire':
            return createWire();
        case 'bolt':
            return createBolt();
        case 'dust_pile':
            return createDustPile();
        case 'cigarette':
            return createCigarette();
        case 'bottle_cap':
            return createBottleCap();
        case 'gum':
            return createGum();
        case 'small_rock':
            return createSmallRock();
        case 'twig':
            return createTwig();
        case 'grass_clump':
            return createGrassClump();
        default:
            return createSmallRock(); // Default
    }
}

// Debris creation functions
function createMetalScrap() {
    const group = new THREE.Group();
    
    const geometry = new THREE.BoxGeometry(0.1, 0.02, 0.15);
    const material = new THREE.MeshBasicMaterial({ color: 0x888888 });
    const scrap = new THREE.Mesh(geometry, material);
    
    scrap.rotation.set(
        (Math.random() - 0.5) * 0.3,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.3
    );
    
    group.add(scrap);
    return group;
}

function createWoodScrap() {
    const group = new THREE.Group();
    
    const geometry = new THREE.BoxGeometry(0.15, 0.03, 0.05);
    const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const scrap = new THREE.Mesh(geometry, material);
    
    scrap.rotation.set(
        (Math.random() - 0.5) * 0.3,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.3
    );
    
    group.add(scrap);
    return group;
}

function createWire() {
    const group = new THREE.Group();
    
    // Curved wire
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.05, 0.01, 0.05),
        new THREE.Vector3(0.1, 0.02, 0),
        new THREE.Vector3(0.15, 0.01, 0.05)
    ]);
    
    const geometry = new THREE.TubeGeometry(curve, 8, 0.01, 8, false);
    const material = new THREE.MeshBasicMaterial({ color: 0x222222 });
    const wire = new THREE.Mesh(geometry, material);
    
    group.add(wire);
    return group;
}

function createBolt() {
    const group = new THREE.Group();
    
    // Bolt head
    const headGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.01, 6);
    const material = new THREE.MeshBasicMaterial({ color: 0x777777 });
    const head = new THREE.Mesh(headGeometry, material);
    
    // Bolt body
    const bodyGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.04, 6);
    const body = new THREE.Mesh(bodyGeometry, material);
    body.position.y = -0.02;
    
    group.add(head);
    group.add(body);
    
    // Random orientation
    group.rotation.x = Math.PI / 2;
    group.rotation.z = Math.random() * Math.PI * 2;
    
    return group;
}

function createDustPile() {
    const group = new THREE.Group();
    
    // Create a few overlapping dust planes
    for (let i = 0; i < 3; i++) {
        const size = 0.1 + Math.random() * 0.1;
        const geometry = new THREE.CircleGeometry(size, 8);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0xCCCCCC,
            transparent: true,
            opacity: 0.7 - i * 0.15
        });
        const dust = new THREE.Mesh(geometry, material);
        
        dust.position.y = 0.001 * i;
        dust.rotation.x = -Math.PI / 2;
        
        group.add(dust);
    }
    
    return group;
}

function createCigarette() {
    const group = new THREE.Group();
    
    // Cigarette body
    const bodyGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.08, 8);
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.z = Math.PI / 2;
    
    // Filter
    const filterGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.02, 8);
    const filterMaterial = new THREE.MeshBasicMaterial({ color: 0xDEB887 });
    const filter = new THREE.Mesh(filterGeometry, filterMaterial);
    filter.position.x = -0.05;
    filter.rotation.z = Math.PI / 2;
    
    group.add(body);
    group.add(filter);
    
    return group;
}

function createBottleCap() {
    const group = new THREE.Group();
    
    const geometry = new THREE.CylinderGeometry(0.02, 0.02, 0.01, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xC0C0C0 });
    const cap = new THREE.Mesh(geometry, material);
    
    group.add(cap);
    
    // Random orientation
    if (Math.random() < 0.5) {
        cap.rotation.x = Math.PI / 2;
    }
    
    return group;
}

function createGum() {
    const group = new THREE.Group();
    
    const geometry = new THREE.SphereGeometry(0.015, 8, 8);
    geometry.scale(1, 0.3, 1); // Flatten it
    
    // Random color
    const gumColors = [0xFF69B4, 0x20B2AA, 0xFFFFFF, 0xFF6347];
    const material = new THREE.MeshBasicMaterial({ 
        color: gumColors[Math.floor(Math.random() * gumColors.length)] 
    });
    
    const gum = new THREE.Mesh(geometry, material);
    group.add(gum);
    
    return group;
}

function createSmallRock() {
    const group = new THREE.Group();
    
    const geometry = new THREE.SphereGeometry(0.02 + Math.random() * 0.02, 4, 4);
    // Make it less perfect
    for (let i = 0; i < geometry.vertices.length; i++) {
        geometry.vertices[i].x += (Math.random() - 0.5) * 0.01;
        geometry.vertices[i].y += (Math.random() - 0.5) * 0.01;
        geometry.vertices[i].z += (Math.random() - 0.5) * 0.01;
    }
    
    const rockColor = 0x808080 + Math.floor(Math.random() * 0x202020) - 0x101010;
    const material = new THREE.MeshBasicMaterial({ color: rockColor });
    
    const rock = new THREE.Mesh(geometry, material);
    group.add(rock);
    
    return group;
}

function createTwig() {
    const group = new THREE.Group();
    
    const geometry = new THREE.CylinderGeometry(0.005, 0.005, 0.1, 3);
    const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const twig = new THREE.Mesh(geometry, material);
    
    twig.rotation.x = Math.PI / 2;
    twig.rotation.z = Math.random() * Math.PI * 2;
    
    group.add(twig);
    
    return group;
}

function createGrassClump() {
    const group = new THREE.Group();
    
    // Create a few grass blades
    for (let i = 0; i < 5; i++) {
        const height = 0.05 + Math.random() * 0.05;
        const geometry = new THREE.BoxGeometry(0.005, height, 0.01);
        const material = new THREE.MeshBasicMaterial({ color: 0x228B22 });
        const blade = new THREE.Mesh(geometry, material);
        
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.01 * Math.random();
        
        blade.position.set(
            Math.cos(angle) * radius,
            height / 2,
            Math.sin(angle) * radius
        );
        
        blade.rotation.set(
            (Math.random() - 0.5) * 0.2,
            Math.random() * Math.PI * 2,
            (Math.random() - 0.5) * 0.2
        );
        
        group.add(blade);
    }
    
    return group;
}
```

**Location:** Add this code to `js/props.js` after the decorative elements functions
