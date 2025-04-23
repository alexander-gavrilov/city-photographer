# Task: Add Vegetation

**Story:** [Environment Props](../s015_environment_props.md)

**Description:** Create and place vegetation elements like trees, bushes, flowers, and grass in appropriate areas to enhance the environment's visual appeal.

**Requirements:** Implement different vegetation types that suit each district's aesthetic while maintaining good performance.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Different tree types created for different districts
- [ ] Bushes and shrubs placed in appropriate locations
- [ ] Flower beds added in residential and park areas
- [ ] Grass and ground cover implemented where appropriate
- [ ] Vegetation is properly distributed based on district character

**Implementation Details:**
```javascript
// Implement vegetation
function createVegetation() {
    const vegetationGroup = new THREE.Group();
    vegetationGroup.name = 'vegetation';
    
    // Add trees throughout the environment
    addTrees(vegetationGroup);
    
    // Add bushes and shrubs
    addBushes(vegetationGroup);
    
    // Add flower beds in residential areas
    addFlowerBeds(vegetationGroup);
    
    // Add grass and ground cover
    addGroundCover(vegetationGroup);
    
    scene.add(vegetationGroup);
    return vegetationGroup;
}

// Add trees throughout the environment
function addTrees(parentGroup) {
    // Define tree placement areas
    const treeAreas = [
        // Downtown trees - fewer, more ornamental
        {
            center: { x: 0, z: -20 },
            radius: 30,
            count: 10,
            types: ['ornamental', 'tall_thin'],
            minDistance: 8 // Minimum distance between trees
        },
        // Industrial trees - very few, sparse
        {
            center: { x: -40, z: 10 },
            radius: 25,
            count: 5,
            types: ['conifer', 'dead'],
            minDistance: 15
        },
        // Residential trees - many, varied
        {
            center: { x: 35, z: 30 },
            radius: 20,
            count: 25,
            types: ['deciduous', 'flowering', 'fruit'],
            minDistance: 6
        }
    ];
    
    // Place trees in each area
    treeAreas.forEach(area => {
        const trees = [];
        
        // Try to place the specified number of trees
        for (let i = 0; i < area.count; i++) {
            let attempts = 0;
            let validPosition = false;
            let x, z;
            
            // Try to find a valid position (not too close to other trees)
            while (!validPosition && attempts < 30) {
                // Random position within the area
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * area.radius * 0.9; // Avoid exact edge
                x = area.center.x + Math.cos(angle) * distance;
                z = area.center.z + Math.sin(angle) * distance;
                
                // Check distance from other trees
                validPosition = true;
                for (const tree of trees) {
                    const dx = x - tree.x;
                    const dz = z - tree.z;
                    const distSquared = dx * dx + dz * dz;
                    
                    if (distSquared < area.minDistance * area.minDistance) {
                        validPosition = false;
                        break;
                    }
                }
                
                attempts++;
            }
            
            if (validPosition) {
                // Add tree at valid position
                trees.push({ x, z });
                
                // Random tree type from area's allowed types
                const treeType = area.types[Math.floor(Math.random() * area.types.length)];
                
                // Create the tree
                const tree = createTree(treeType);
                tree.position.set(x, 0, z);
                parentGroup.add(tree);
            }
        }
    });
}

// Create a tree of the specified type
function createTree(type) {
    const treeGroup = new THREE.Group();
    
    let trunkHeight, trunkRadius, trunkColor, foliageColor, foliageShape, foliageSize;
    
    // Set parameters based on tree type
    switch (type) {
        case 'ornamental':
            // Ornamental tree for downtown areas
            trunkHeight = 3 + Math.random() * 1;
            trunkRadius = 0.2;
            trunkColor = 0x8B4513; // Brown
            foliageColor = 0x98FB98; // Pale green
            foliageShape = 'sphere';
            foliageSize = 2 + Math.random() * 0.5;
            break;
            
        case 'tall_thin':
            // Tall thin trees like poplars
            trunkHeight = 6 + Math.random() * 3;
            trunkRadius = 0.15;
            trunkColor = 0x8B4513; // Brown
            foliageColor = 0x228B22; // Forest green
            foliageShape = 'cylinder';
            foliageSize = 1.2 + Math.random() * 0.3;
            break;
            
        case 'conifer':
            // Coniferous tree for industrial areas
            trunkHeight = 5 + Math.random() * 2;
            trunkRadius = 0.3;
            trunkColor = 0x654321; // Dark brown
            foliageColor = 0x006400; // Dark green
            foliageShape = 'cone';
            foliageSize = 3 + Math.random() * 1;
            break;
            
        case 'dead':
            // Dead tree for industrial areas
            trunkHeight = 4 + Math.random() * 2;
            trunkRadius = 0.25;
            trunkColor = 0x5C4033; // Dark gray-brown
            foliageColor = null; // No foliage
            break;
            
        case 'flowering':
            // Flowering tree for residential areas
            trunkHeight = 3 + Math.random() * 1;
            trunkRadius = 0.2;
            trunkColor = 0x8B4513; // Brown
            // Random flower colors
            const flowerColors = [0xFFC0CB, 0xFFB6C1, 0xFFF0F5, 0xFFDEAD];
            foliageColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
            foliageShape = 'sphere';
            foliageSize = 2.5 + Math.random() * 0.5;
            break;
            
        case 'fruit':
            // Fruit tree for residential areas
            trunkHeight = 3 + Math.random() * 1.5;
            trunkRadius = 0.25;
            trunkColor = 0x8B4513; // Brown
            foliageColor = 0x32CD32; // Lime green
            foliageShape = 'sphere';
            foliageSize = 2.2 + Math.random() * 0.8;
            break;
            
        case 'deciduous':
        default:
            // Standard deciduous tree
            trunkHeight = 4 + Math.random() * 2;
            trunkRadius = 0.3;
            trunkColor = 0x8B4513; // Brown
            foliageColor = 0x228B22; // Forest green
            foliageShape = 'sphere';
            foliageSize = 3 + Math.random() * 1;
    }
    
    // Create trunk
    const trunkGeometry = new THREE.CylinderGeometry(trunkRadius, trunkRadius * 1.2, trunkHeight, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: trunkColor });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = trunkHeight / 2;
    treeGroup.add(trunk);
    
    // Create foliage (unless it's a dead tree)
    if (foliageColor !== null) {
        const foliageMaterial = new THREE.MeshStandardMaterial({ color: foliageColor });
        let foliageGeometry;
        
        switch (foliageShape) {
            case 'sphere':
                foliageGeometry = new THREE.SphereGeometry(foliageSize, 8, 8);
                break;
            case 'cylinder':
                foliageGeometry = new THREE.CylinderGeometry(foliageSize / 3, foliageSize, trunkHeight * 0.6, 8);
                break;
            case 'cone':
                foliageGeometry = new THREE.ConeGeometry(foliageSize, trunkHeight * 0.8, 8);
                break;
            default:
                foliageGeometry = new THREE.SphereGeometry(foliageSize, 8, 8);
        }
        
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.y = trunkHeight + (foliageShape === 'cone' ? trunkHeight * 0.4 : foliageSize / 2);
        
        // Add slight randomization to foliage position
        foliage.position.x += (Math.random() - 0.5) * 0.3;
        foliage.position.z += (Math.random() - 0.5) * 0.3;
        
        treeGroup.add(foliage);
        
        // For fruit trees, add some fruit
        if (type === 'fruit') {
            const fruitCount = Math.floor(3 + Math.random() * 5);
            const fruitColors = [0xFF0000, 0xFFFF00, 0xFFA500]; // Red, yellow, orange
            const fruitColor = fruitColors[Math.floor(Math.random() * fruitColors.length)];
            const fruitMaterial = new THREE.MeshStandardMaterial({ color: fruitColor });
            
            for (let i = 0; i < fruitCount; i++) {
                const fruitGeometry = new THREE.SphereGeometry(0.1, 6, 6);
                const fruit = new THREE.Mesh(fruitGeometry, fruitMaterial);
                
                // Random position within the foliage
                const angle = Math.random() * Math.PI * 2;
                const height = Math.random() * foliageSize * 1.5;
                const radius = foliageSize * 0.7 * Math.random();
                
                fruit.position.set(
                    Math.cos(angle) * radius,
                    trunkHeight + height,
                    Math.sin(angle) * radius
                );
                
                treeGroup.add(fruit);
            }
        }
    } else {
        // For dead trees, add some branches
        const branchCount = 3 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < branchCount; i++) {
            const branchHeight = trunkHeight * (0.3 + Math.random() * 0.6);
            const branchLength = 1 + Math.random() * 2;
            const branchRadius = trunkRadius * 0.3;
            
            const branchGeometry = new THREE.CylinderGeometry(branchRadius, branchRadius, branchLength, 5);
            const branch = new THREE.Mesh(branchGeometry, trunkMaterial);
            
            // Position at random height on the trunk
            branch.position.y = branchHeight;
            
            // Random angle
            const angle = Math.random() * Math.PI * 2;
            branch.rotation.z = Math.PI / 4 + Math.random() * (Math.PI / 4);
            branch.rotation.y = angle;
            
            // Translate to edge of trunk
            branch.position.x = Math.cos(angle) * trunkRadius;
            branch.position.z = Math.sin(angle) * trunkRadius;
            
            // Move to center of branch
            branch.translateY(branchLength / 2);
            
            treeGroup.add(branch);
        }
    }
    
    return treeGroup;
}

// Add bushes and shrubs throughout the environment
function addBushes(parentGroup) {
    // Define areas for bush placement
    const bushAreas = [
        // Downtown bushes - ornamental, well-maintained
        {
            center: { x: 0, z: -20 },
            radius: 30,
            count: 25,
            types: ['ornamental', 'trimmed'],
            minDistance: 5
        },
        // Industrial bushes - sparse, wild
        {
            center: { x: -40, z: 10 },
            radius: 25,
            count: 10,
            types: ['wild', 'thorny'],
            minDistance: 8
        },
        // Residential bushes - decorative, varied
        {
            center: { x: 35, z: 30 },
            radius: 20,
            count: 40,
            types: ['decorative', 'flowering', 'trimmed'],
            minDistance: 4
        }
    ];
    
    // Place bushes in each area
    bushAreas.forEach(area => {
        const bushes = [];
        
        // Try to place the specified number of bushes
        for (let i = 0; i < area.count; i++) {
            let attempts = 0;
            let validPosition = false;
            let x, z;
            
            // Try to find a valid position (not too close to other bushes)
            while (!validPosition && attempts < 30) {
                // Random position within the area
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * area.radius * 0.9;
                x = area.center.x + Math.cos(angle) * distance;
                z = area.center.z + Math.sin(angle) * distance;
                
                // Check distance from other bushes
                validPosition = true;
                for (const bush of bushes) {
                    const dx = x - bush.x;
                    const dz = z - bush.z;
                    const distSquared = dx * dx + dz * dz;
                    
                    if (distSquared < area.minDistance * area.minDistance) {
                        validPosition = false;
                        break;
                    }
                }
                
                attempts++;
            }
            
            if (validPosition) {
                // Add bush at valid position
                bushes.push({ x, z });
                
                // Random bush type from area's allowed types
                const bushType = area.types[Math.floor(Math.random() * area.types.length)];
                
                // Create the bush
                const bush = createBush(bushType);
                bush.position.set(x, 0, z);
                parentGroup.add(bush);
            }
        }
    });
}

// Create a bush of the specified type
function createBush(type) {
    const bushGroup = new THREE.Group();
    
    let bushColor, bushSize, bushShape;
    
    // Set parameters based on bush type
    switch (type) {
        case 'ornamental':
            // Ornamental bush for downtown areas
            bushColor = 0x32CD32; // Lime green
            bushSize = 0.8 + Math.random() * 0.4;
            bushShape = 'sphere';
            break;
            
        case 'trimmed':
            // Trimmed hedge-like bush
            bushColor = 0x228B22; // Forest green
            bushSize = 1 + Math.random() * 0.3;
            bushShape = 'box';
            break;
            
        case 'wild':
            // Wild, untrimmed bush
            bushColor = 0x556B2F; // Dark olive green
            bushSize = 1 + Math.random() * 0.8;
            bushShape = 'irregular';
            break;
            
        case 'thorny':
            // Thorny bush for industrial areas
            bushColor = 0x6B8E23; // Olive drab
            bushSize = 0.7 + Math.random() * 0.5;
            bushShape = 'irregular';
            break;
            
        case 'flowering':
            // Flowering bush for residential areas
            bushColor = 0x228B22; // Base green
            bushSize = 0.9 + Math.random() * 0.4;
            bushShape = 'sphere';
            break;
            
        case 'decorative':
        default:
            // Decorative residential bush
            bushColor = 0x2E8B57; // Sea green
            bushSize = 0.8 + Math.random() * 0.5;
            bushShape = 'sphere';
    }
    
    const bushMaterial = new THREE.MeshStandardMaterial({ color: bushColor });
    let bushGeometry;
    
    switch (bushShape) {
        case 'box':
            bushGeometry = new THREE.BoxGeometry(bushSize * 1.2, bushSize, bushSize * 1.2);
            break;
        case 'irregular':
            bushGeometry = new THREE.SphereGeometry(bushSize, 8, 8);
            // Make irregular by moving vertices
            for (let i = 0; i < bushGeometry.vertices.length; i++) {
                bushGeometry.vertices[i].x += (Math.random() - 0.5) * 0.3;
                bushGeometry.vertices[i].y += (Math.random() - 0.5) * 0.3;
                bushGeometry.vertices[i].z += (Math.random() - 0.5) * 0.3;
            }
            break;
        case 'sphere':
        default:
            bushGeometry = new THREE.SphereGeometry(bushSize, 8, 8);
    }
    
    const bush = new THREE.Mesh(bushGeometry, bushMaterial);
    bush.position.y = bushSize / 2;
    bushGroup.add(bush);
    
    // For flowering bushes, add flowers
    if (type === 'flowering') {
        const flowerCount = Math.floor(5 + Math.random() * 10);
        const flowerColors = [0xFF1493, 0xFFFFFF, 0xFFA500, 0xFF0000]; // Pink, white, orange, red
        const flowerColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
        const flowerMaterial = new THREE.MeshStandardMaterial({ color: flowerColor });
        
        for (let i = 0; i < flowerCount; i++) {
            const flowerGeometry = new THREE.SphereGeometry(0.08, 6, 6);
            const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
            
            // Random position on the surface of the bush
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = bushSize * 0.9;
            
            flower.position.set(
                Math.sin(phi) * Math.cos(theta) * radius,
                Math.cos(phi) * radius + bushSize / 2,
                Math.sin(phi) * Math.sin(theta) * radius
            );
            
            bushGroup.add(flower);
        }
    }
    
    // For thorny bushes, add thorns
    if (type === 'thorny') {
        const thornCount = Math.floor(10 + Math.random() * 8);
        const thornMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown
        
        for (let i = 0; i < thornCount; i++) {
            const thornGeometry = new THREE.ConeGeometry(0.03, 0.1, 4);
            const thorn = new THREE.Mesh(thornGeometry, thornMaterial);
            
            // Random position on the surface of the bush
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = bushSize * 0.9;
            
            thorn.position.set(
                Math.sin(phi) * Math.cos(theta) * radius,
                Math.cos(phi) * radius + bushSize / 2,
                Math.sin(phi) * Math.sin(theta) * radius
            );
            
            // Orient thorn outward
            thorn.lookAt(
                thorn.position.x * 2,
                thorn.position.y * 2,
                thorn.position.z * 2
            );
            
            bushGroup.add(thorn);
        }
    }
    
    return bushGroup;
}

// Add flower beds in residential and park areas
function addFlowerBeds(parentGroup) {
    // Define areas for flower beds
    const flowerBedAreas = [
        // Downtown flower beds - formal, arranged
        {
            center: { x: 0, z: -20 },
            radius: 30,
            count: 8,
            types: ['formal'],
            minDistance: 10
        },
        // No flower beds in industrial areas
        
        // Residential flower beds - varied, colorful
        {
            center: { x: 35, z: 30 },
            radius: 20,
            count: 15,
            types: ['mixed', 'colorful', 'decorative'],
            minDistance: 5
        }
    ];
    
    // Create flower beds in each area
    flowerBedAreas.forEach(area => {
        const flowerBeds = [];
        
        for (let i = 0; i < area.count; i++) {
            let attempts = 0;
            let validPosition = false;
            let x, z;
            
            while (!validPosition && attempts < 30) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * area.radius * 0.8;
                x = area.center.x + Math.cos(angle) * distance;
                z = area.center.z + Math.sin(angle) * distance;
                
                validPosition = true;
                for (const bed of flowerBeds) {
                    const dx = x - bed.x;
                    const dz = z - bed.z;
                    const distSquared = dx * dx + dz * dz;
                    
                    if (distSquared < area.minDistance * area.minDistance) {
                        validPosition = false;
                        break;
                    }
                }
                
                attempts++;
            }
            
            if (validPosition) {
                flowerBeds.push({ x, z });
                
                const bedType = area.types[Math.floor(Math.random() * area.types.length)];
                const flowerBed = createFlowerBed(bedType);
                flowerBed.position.set(x, 0, z);
                flowerBed.rotation.y = Math.random() * Math.PI * 2;
                parentGroup.add(flowerBed);
            }
        }
    });
}

// Create a flower bed of the specified type
function createFlowerBed(type) {
    const bedGroup = new THREE.Group();
    
    let bedShape, bedSize, flowerColors, arrangement;
    
    switch (type) {
        case 'formal':
            // Formal flower bed for downtown areas
            bedShape = 'circle';
            bedSize = 2 + Math.random() * 1;
            flowerColors = [0xFF0000, 0xFFFFFF, 0xFF69B4]; // Red, white, pink
            arrangement = 'orderly';
            break;
            
        case 'mixed':
            // Mixed flower bed for residential areas
            bedShape = Math.random() > 0.5 ? 'circle' : 'rectangle';
            bedSize = 1.5 + Math.random() * 1;
            flowerColors = [0xFF1493, 0xFFA500, 0xFFFF00, 0xFF4500]; // Pink, orange, yellow, orangered
            arrangement = 'mixed';
            break;
            
        case 'colorful':
            // Very colorful flower bed
            bedShape = 'circle';
            bedSize = 1.2 + Math.random() * 0.8;
            flowerColors = [0xFF0000, 0xFFA500, 0xFFFF00, 0x0000FF, 0xFF00FF]; // Rainbow colors
            arrangement = 'clustered';
            break;
            
        case 'decorative':
        default:
            // Decorative flower bed
            bedShape = 'rectangle';
            bedSize = 1.8 + Math.random() * 1;
            flowerColors = [0xFFB6C1, 0xFFFACD, 0xE6E6FA]; // Light pink, light yellow, light purple
            arrangement = 'orderly';
    }
    
    // Create bed base (soil)
    let bedGeometry;
    if (bedShape === 'circle') {
        bedGeometry = new THREE.CircleGeometry(bedSize, 16);
        bedGeometry.rotateX(-Math.PI / 2);
    } else {
        // Rectangle
        const width = bedSize * (1 + Math.random() * 0.5);
        const depth = bedSize * (0.5 + Math.random() * 0.5);
        bedGeometry = new THREE.PlaneGeometry(width, depth);
        bedGeometry.rotateX(-Math.PI / 2);
    }
    
    const soilMaterial = new THREE.MeshStandardMaterial({ color: 0x3A2A0A }); // Dark brown
    const soil = new THREE.Mesh(bedGeometry, soilMaterial);
    soil.position.y = 0.05; // Slightly above ground
    bedGroup.add(soil);
    
    // Add border
    if (Math.random() > 0.4) {
        let borderGeometry;
        
        if (bedShape === 'circle') {
            const innerRadius = bedSize;
            const outerRadius = bedSize + 0.2;
            borderGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);
            borderGeometry.rotateX(-Math.PI / 2);
        } else {
            // More complex for rectangle - would need edges
            const width = bedSize * (1 + Math.random() * 0.5);
            const depth = bedSize * (0.5 + Math.random() * 0.5);
            
            // Using a slightly larger plane with a hole would be complex
            // Instead, we'll create four edge pieces
            const borderWidth = 0.2;
            
            const edge1 = new THREE.BoxGeometry(width + borderWidth * 2, borderWidth, 0.1);
            const edge2 = new THREE.BoxGeometry(width + borderWidth * 2, borderWidth, 0.1);
            const edge3 = new THREE.BoxGeometry(borderWidth, depth, 0.1);
            const edge4 = new THREE.BoxGeometry(borderWidth, depth, 0.1);
            
            const borderMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown
            
            const border1 = new THREE.Mesh(edge1, borderMaterial);
            border1.position.set(0, 0.05, -depth / 2 - borderWidth / 2);
            border1.rotateX(-Math.PI / 2);
            bedGroup.add(border1);
            
            const border2 = new THREE.Mesh(edge2, borderMaterial);
            border2.position.set(0, 0.05, depth / 2 + borderWidth / 2);
            border2.rotateX(-Math.PI / 2);
            bedGroup.add(border2);
            
            const border3 = new THREE.Mesh(edge3, borderMaterial);
            border3.position.set(-width / 2 - borderWidth / 2, 0.05, 0);
            border3.rotateX(-Math.PI / 2);
            bedGroup.add(border3);
            
            const border4 = new THREE.Mesh(edge4, borderMaterial);
            border4.position.set(width / 2 + borderWidth / 2, 0.05, 0);
            border4.rotateX(-Math.PI / 2);
            bedGroup.add(border4);
        }
        
        if (bedShape === 'circle') {
            const borderMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown
            const border = new THREE.Mesh(borderGeometry, borderMaterial);
            border.position.y = 0.05;
            bedGroup.add(border);
        }
    }
    
    // Add flowers
    const flowerCount = Math.floor(bedSize * bedSize * 5); // Density based on bed size
    
    for (let i = 0; i < flowerCount; i++) {
        // Select color based on arrangement type
        let flowerColor;
        
        if (arrangement === 'orderly') {
            // Orderly arrangement uses colors in sequence
            flowerColor = flowerColors[Math.floor(i / (flowerCount / flowerColors.length)) % flowerColors.length];
        } else if (arrangement === 'clustered') {
            // Clustered arrangement uses position-based colors
            const section = Math.floor(i / (flowerCount / flowerColors.length));
            flowerColor = flowerColors[section % flowerColors.length];
        } else {
            // Mixed arrangement uses random colors
            flowerColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
        }
        
        const flowerMaterial = new THREE.MeshStandardMaterial({ color: flowerColor });
        
        // Create flower
        const flowerHeight = 0.1 + Math.random() * 0.2;
        
        // Stem
        const stemGeometry = new THREE.CylinderGeometry(0.01, 0.01, flowerHeight, 4);
        const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        
        // Flower head
        const headGeometry = new THREE.SphereGeometry(0.05 + Math.random() * 0.03, 6, 6);
        const head = new THREE.Mesh(headGeometry, flowerMaterial);
        
        // Position within the bed
        let x, z;
        
        if (bedShape === 'circle') {
            // Random position within circle
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * bedSize * 0.9; // Keep within border
            x = Math.cos(angle) * radius;
            z = Math.sin(angle) * radius;
        } else {
            // Random position within rectangle
            const width = bedSize * (1 + Math.random() * 0.5);
            const depth = bedSize * (0.5 + Math.random() * 0.5);
            x = (Math.random() - 0.5) * width * 0.9;
            z = (Math.random() - 0.5) * depth * 0.9;
        }
        
        // Position stem and flower
        stem.position.set(x, flowerHeight / 2, z);
        head.position.set(x, flowerHeight, z);
        
        // Add slight random tilt
        stem.rotation.x = (Math.random() - 0.5) * 0.2;
        stem.rotation.z = (Math.random() - 0.5) * 0.2;
        
        bedGroup.add(stem);
        bedGroup.add(head);
    }
    
    return bedGroup;
}

// Add grass and ground cover
function addGroundCover(parentGroup) {
    // Define areas for ground cover
    const groundCoverAreas = [
        // Downtown - minimal ground cover
        {
            center: { x: 0, z: -20 },
            radius: 30,
            density: 0.1, // Sparse
            types: ['short_grass']
        },
        // Industrial - patchy, dead grass
        {
            center: { x: -40, z: 10 },
            radius: 25,
            density: 0.2, // Sparse
            types: ['patchy_grass', 'dirt']
        },
        // Residential - lush ground cover
        {
            center: { x: 35, z: 30 },
            radius: 20,
            density: 0.7, // Dense
            types: ['lush_grass', 'clover']
        }
    ];
    
    // Create ground cover for each area
    groundCoverAreas.forEach(area => {
        // Divide area into grid cells
        const cellSize = 2; // Size of each ground cover cell
        const gridRadius = Math.ceil(area.radius / cellSize);
        
        // Create cells within circular area
        for (let gx = -gridRadius; gx <= gridRadius; gx++) {
            for (let gz = -gridRadius; gz <= gridRadius; gz++) {
                const cellX = area.center.x + gx * cellSize;
                const cellZ = area.center.z + gz * cellSize;
                
                // Check if cell is within area radius
                const distanceToCenter = Math.sqrt(
                    Math.pow(cellX - area.center.x, 2) +
                    Math.pow(cellZ - area.center.z, 2)
                );
                
                if (distanceToCenter <= area.radius) {
                    // Random chance based on density
                    if (Math.random() < area.density) {
                        // Select random ground cover type
                        const coverType = area.types[Math.floor(Math.random() * area.types.length)];
                        
                        // Create ground cover
                        const groundCover = createGroundCover(coverType, cellSize);
                        groundCover.position.set(cellX, 0.01, cellZ); // Slightly above ground
                        parentGroup.add(groundCover);
                    }
                }
            }
        }
    });
}

// Create ground cover of specified type
function createGroundCover(type, size) {
    const coverGroup = new THREE.Group();
    
    let coverGeometry, coverMaterial;
    
    switch (type) {
        case 'short_grass':
            // Create a plane with grass texture
            coverGeometry = new THREE.PlaneGeometry(size, size);
            coverMaterial = new THREE.MeshBasicMaterial({
                color: 0x98FB98, // Pale green
                transparent: true,
                opacity: 0.7
            });
            break;
            
        case 'patchy_grass':
            // Create a plane with patchy grass texture
            coverGeometry = new THREE.PlaneGeometry(size, size);
            coverMaterial = new THREE.MeshBasicMaterial({
                color: 0x9ACD32, // Yellow green
                transparent: true,
                opacity: 0.5
            });
            break;
            
        case 'lush_grass':
            // Create a plane with lush grass texture
            coverGeometry = new THREE.PlaneGeometry(size, size);
            coverMaterial = new THREE.MeshBasicMaterial({
                color: 0x32CD32, // Lime green
                transparent: true,
                opacity: 0.8
            });
            break;
            
        case 'clover':
            // Create a plane with clover texture
            coverGeometry = new THREE.PlaneGeometry(size, size);
            coverMaterial = new THREE.MeshBasicMaterial({
                color: 0x228B22, // Forest green
                transparent: true,
                opacity: 0.7
            });
            break;
            
        case 'dirt':
        default:
            // Create a plane with dirt texture
            coverGeometry = new THREE.PlaneGeometry(size, size);
            coverMaterial = new THREE.MeshBasicMaterial({
                color: 0x8B4513, // Brown
                transparent: true,
                opacity: 0.3
            });
    }
    
    const cover = new THREE.Mesh(coverGeometry, coverMaterial);
    cover.rotation.x = -Math.PI / 2; // Flat on ground
    coverGroup.add(cover);
    
    // For grass types, add some individual grass blades (performance intensive, use sparingly)
    if (type.includes('grass') && Math.random() < 0.3) {
        const bladeCount = Math.floor(type === 'lush_grass' ? 20 : 10);
        
        for (let i = 0; i < bladeCount; i++) {
            const bladeHeight = 0.05 + Math.random() * 0.1;
            const bladeGeometry = new THREE.BoxGeometry(0.01, bladeHeight, 0.01);
            
            let bladeColor;
            if (type === 'patchy_grass') {
                bladeColor = 0x9ACD32; // Yellow green
            } else if (type === 'lush_grass') {
                bladeColor = 0x32CD32; // Lime green
            } else {
                bladeColor = 0x98FB98; // Pale green
            }
            
            const bladeMaterial = new THREE.MeshBasicMaterial({ color: bladeColor });
            const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
            
            // Random position within cell
            const x = (Math.random() - 0.5) * size;
            const z = (Math.random() - 0.5) * size;
            
            blade.position.set(x, bladeHeight / 2, z);
            
            // Random slight tilt
            blade.rotation.x = (Math.random() - 0.5) * 0.3;
            blade.rotation.z = (Math.random() - 0.5) * 0.3;
            
            coverGroup.add(blade);
        }
    }
    
    return coverGroup;
}
```

**Note:** This implementation creates diverse vegetation across different districts. For further optimization in a production environment, you may want to use instanced meshes for repeated elements like grass blades and consider using textured planes for distant vegetation.

**Location:** Add this code to `js/props.js` after the ambient objects functions
