# Task: Create District 1 Buildings

**Story:** [District Creation](../s013_district_creation.md)

**Description:** Create buildings with a unique architectural style for the Downtown district.

**Requirements:** Implement modern-style buildings with distinct visual characteristics for the Downtown area.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] At least 8 buildings created for the Downtown district
- [ ] Buildings follow a modern/skyscraper architectural style
- [ ] Building heights, sizes, and placements vary for visual interest
- [ ] Buildings have appropriate materials and colors for Downtown theme

**Implementation Details:**
```javascript
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
```

**Location:** Add this code to `js/districts.js` after the district boundary definitions
