# Task: Add Decorative Elements

**Story:** [Environment Props](../s015_environment_props.md)

**Description:** Add decorative elements such as posters, graffiti, signs, and other visual details to enhance the city's atmosphere.

**Requirements:** Create various decorative elements that add visual interest and a lived-in feel to the environment.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Store signs and advertisements added to buildings
- [ ] Posters placed in appropriate locations
- [ ] Graffiti added to selected walls and surfaces
- [ ] Decorative banners/flags added where appropriate
- [ ] Elements are appropriate for each district's theme

**Implementation Details:**
```javascript
// Implement decorative elements
function createDecorativeElements() {
    const decorGroup = new THREE.Group();
    decorGroup.name = 'decorative_elements';
    
    // Add store signs to buildings
    addStoreSigns(decorGroup);
    
    // Add posters to walls
    addPosters(decorGroup);
    
    // Add graffiti to selected surfaces
    addGraffiti(decorGroup);
    
    // Add banners and flags
    addBannersAndFlags(decorGroup);
    
    scene.add(decorGroup);
    return decorGroup;
}

// Add store signs and advertisements to buildings
function addStoreSigns(parentGroup) {
    // Define signs for Downtown buildings
    const downtownSigns = [
        { 
            position: { x: -8, y: 5, z: -20 },
            size: { width: 3, height: 1.5 },
            rotation: { x: 0, y: 0, z: 0 },
            color: 0x00AAFF,
            text: "CITY BANK"
        },
        { 
            position: { x: 5, y: 4, z: -15 },
            size: { width: 2.5, height: 1 },
            rotation: { x: 0, y: Math.PI / 2, z: 0 },
            color: 0xFFAA00,
            text: "CAFE"
        },
        { 
            position: { x: -12, y: 6, z: -12 },
            size: { width: 4, height: 2 },
            rotation: { x: 0, y: Math.PI / 4, z: 0 },
            color: 0x00CC88,
            text: "DEPARTMENT STORE"
        },
        { 
            position: { x: 0, y: 8, z: -25 },
            size: { width: 5, height: 3 },
            rotation: { x: 0, y: 0, z: 0 },
            color: 0xFF5500,
            text: "CITY TOWER"
        }
    ];
    
    // Define signs for Industrial buildings
    const industrialSigns = [
        { 
            position: { x: -35, y: 4, z: 8 },
            size: { width: 4, height: 1.5 },
            rotation: { x: 0, y: 0, z: 0 },
            color: 0xFFFF00,
            text: "FACTORY"
        },
        { 
            position: { x: -45, y: 5, z: 15 },
            size: { width: 5, height: 2 },
            rotation: { x: 0, y: Math.PI / 2, z: 0 },
            color: 0xCCCCCC,
            text: "INDUSTRIAL SUPPLIES"
        },
        { 
            position: { x: -30, y: 3, z: 0 },
            size: { width: 3.5, height: 1.2 },
            rotation: { x: 0, y: -Math.PI / 4, z: 0 },
            color: 0xFF3300,
            text: "WAREHOUSE"
        }
    ];
    
    // Define signs for Residential buildings
    const residentialSigns = [
        { 
            position: { x: 25, y: 3, z: 25 },
            size: { width: 2, height: 1 },
            rotation: { x: 0, y: 0, z: 0 },
            color: 0x33AA33,
            text: "GROCERY"
        },
        { 
            position: { x: 35, y: 2.5, z: 35 },
            size: { width: 2.5, height: 0.8 },
            rotation: { x: 0, y: Math.PI / 2, z: 0 },
            color: 0x3366CC,
            text: "LAUNDRY"
        },
        { 
            position: { x: 30, y: 4, z: 28 },
            size: { width: 3, height: 1.2 },
            rotation: { x: 0, y: Math.PI / 4, z: 0 },
            color: 0xCC6633,
            text: "COMMUNITY CENTER"
        }
    ];
    
    // Create all signs
    const allSigns = [...downtownSigns, ...industrialSigns, ...residentialSigns];
    
    allSigns.forEach(signData => {
        const sign = createStoreSign(signData);
        parentGroup.add(sign);
    });
}

// Create a store sign with the given parameters
function createStoreSign(signData) {
    const group = new THREE.Group();
    
    // Create sign backing
    const signGeometry = new THREE.BoxGeometry(signData.size.width, signData.size.height, 0.2);
    const signMaterial = new THREE.MeshStandardMaterial({ color: signData.color });
    const sign = new THREE.Mesh(signGeometry, signMaterial);
    
    // Position and rotate the sign
    sign.position.set(
        signData.position.x,
        signData.position.y,
        signData.position.z
    );
    sign.rotation.set(
        signData.rotation.x,
        signData.rotation.y,
        signData.rotation.z
    );
    
    group.add(sign);
    
    // Create a light to illuminate the sign (for important signs)
    if (Math.random() > 0.5) {
        const signLight = new THREE.PointLight(signData.color, 0.5, 5);
        signLight.position.set(
            signData.position.x,
            signData.position.y,
            signData.position.z + 1
        );
        group.add(signLight);
    }
    
    return group;
}

// Add posters to walls
function addPosters(parentGroup) {
    // Define poster locations and details
    const posters = [
        // Downtown posters
        { 
            position: { x: -10, y: 1.5, z: -18 },
            size: { width: 1, height: 1.5 },
            rotation: { x: 0, y: 0, z: 0 },
            color: 0xEEDD00
        },
        { 
            position: { x: 5, y: 1.2, z: -12 },
            size: { width: 0.8, height: 1.2 },
            rotation: { x: 0, y: Math.PI / 2, z: 0 },
            color: 0x00EEFF
        },
        { 
            position: { x: -4, y: 1.3, z: -22 },
            size: { width: 1.2, height: 1.8 },
            rotation: { x: 0, y: Math.PI / 4, z: 0 },
            color: 0xFF00FF
        },
        
        // Industrial posters/notices
        { 
            position: { x: -32, y: 1.5, z: 10 },
            size: { width: 1, height: 1.2 },
            rotation: { x: 0, y: 0, z: 0 },
            color: 0xFFCC00
        },
        { 
            position: { x: -42, y: 1.7, z: 5 },
            size: { width: 1.2, height: 0.8 },
            rotation: { x: 0, y: Math.PI / 2, z: 0 },
            color: 0xFFFFFF
        },
        
        // Residential posters
        { 
            position: { x: 28, y: 1.2, z: 30 },
            size: { width: 0.8, height: 1 },
            rotation: { x: 0, y: 0, z: 0 },
            color: 0xAAFFAA
        },
        { 
            position: { x: 35, y: 1.5, z: 25 },
            size: { width: 1, height: 1.2 },
            rotation: { x: 0, y: Math.PI / 2, z: 0 },
            color: 0xFFAAFF
        }
    ];
    
    // Create all posters
    posters.forEach(posterData => {
        const poster = createPoster(posterData);
        parentGroup.add(poster);
    });
}

// Create a poster with the given parameters
function createPoster(posterData) {
    // Create poster plane
    const posterGeometry = new THREE.PlaneGeometry(posterData.size.width, posterData.size.height);
    const posterMaterial = new THREE.MeshStandardMaterial({ 
        color: posterData.color,
        roughness: 0.6
    });
    const poster = new THREE.Mesh(posterGeometry, posterMaterial);
    
    // Position and rotate the poster
    poster.position.set(
        posterData.position.x,
        posterData.position.y,
        posterData.position.z
    );
    poster.rotation.set(
        posterData.rotation.x,
        posterData.rotation.y,
        posterData.rotation.z
    );
    
    return poster;
}

// Add graffiti to selected surfaces
function addGraffiti(parentGroup) {
    // Define graffiti locations and details
    const graffitiLocations = [
        // Industrial area graffiti (more common)
        { 
            position: { x: -38, y: 1.2, z: 12 },
            size: { width: 2, height: 1.5 },
            rotation: { x: 0, y: 0, z: 0 },
            style: 'tag'
        },
        { 
            position: { x: -28, y: 0.8, z: 8 },
            size: { width: 3, height: 2 },
            rotation: { x: 0, y: Math.PI / 2, z: 0 },
            style: 'mural'
        },
        { 
            position: { x: -45, y: 1, z: 0 },
            size: { width: 1.5, height: 1 },
            rotation: { x: 0, y: Math.PI / 4, z: 0 },
            style: 'tag'
        },
        
        // Downtown graffiti (less common)
        { 
            position: { x: -18, y: 0.9, z: -15 },
            size: { width: 1, height: 0.7 },
            rotation: { x: 0, y: 0, z: 0 },
            style: 'tag'
        },
        
        // Alleyway graffiti
        { 
            position: { x: -5, y: 1.1, z: -20 },
            size: { width: 1.2, height: 0.8 },
            rotation: { x: 0, y: Math.PI / 4, z: 0 },
            style: 'tag'
        }
    ];
    
    // Create all graffiti
    graffitiLocations.forEach(graffitiData => {
        const graffiti = createGraffiti(graffitiData);
        parentGroup.add(graffiti);
    });
}

// Create graffiti with the given parameters
function createGraffiti(graffitiData) {
    // Determine color based on style
    let color;
    if (graffitiData.style === 'tag') {
        // Random tag colors
        const tagColors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF];
        color = tagColors[Math.floor(Math.random() * tagColors.length)];
    } else {
        // Mural is multicolored, use a base color
        color = 0xFFFFFF;
    }
    
    // Create graffiti plane
    const graffitiGeometry = new THREE.PlaneGeometry(graffitiData.size.width, graffitiData.size.height);
    const graffitiMaterial = new THREE.MeshStandardMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.9,
        roughness: 0.7
    });
    const graffiti = new THREE.Mesh(graffitiGeometry, graffitiMaterial);
    
    // Position and rotate the graffiti
    graffiti.position.set(
        graffitiData.position.x,
        graffitiData.position.y,
        graffitiData.position.z + 0.01 // Slightly in front of walls
    );
    graffiti.rotation.set(
        graffitiData.rotation.x,
        graffitiData.rotation.y,
        graffitiData.rotation.z
    );
    
    return graffiti;
}

// Add banners and flags
function addBannersAndFlags(parentGroup) {
    // Define banner locations and details
    const bannerLocations = [
        // Downtown banners (most common)
        { 
            position: { x: -5, y: 5, z: -15 },
            size: { width: 1, height: 3 },
            rotation: { x: 0, y: 0, z: 0 },
            color: 0x3366CC,
            type: 'banner'
        },
        { 
            position: { x: 8, y: 6, z: -12 },
            size: { width: 1, height: 2.5 },
            rotation: { x: 0, y: Math.PI / 2, z: 0 },
            color: 0xCC3366,
            type: 'banner'
        },
        { 
            position: { x: 0, y: 10, z: -25 },
            size: { width: 1.5, height: 4 },
            rotation: { x: 0, y: 0, z: 0 },
            color: 0xFFDD00,
            type: 'banner'
        },
        
        // Flag locations
        { 
            position: { x: -10, y: 5, z: -18 },
            size: { width: 1, height: 0.6 },
            rotation: { x: 0, y: 0, z: 0 },
            color: 0xFF0000,
            type: 'flag'
        },
        { 
            position: { x: -40, y: 6, z: 10 },
            size: { width: 1.2, height: 0.8 },
            rotation: { x: 0, y: Math.PI / 4, z: 0 },
            color: 0x333333,
            type: 'flag'
        },
        { 
            position: { x: 30, y: 4, z: 30 },
            size: { width: 1, height: 0.6 },
            rotation: { x: 0, y: Math.PI / 2, z: 0 },
            color: 0x00AA33,
            type: 'flag'
        }
    ];
    
    // Create all banners and flags
    bannerLocations.forEach(bannerData => {
        const banner = createBannerOrFlag(bannerData);
        parentGroup.add(banner);
    });
}

// Create a banner or flag with the given parameters
function createBannerOrFlag(bannerData) {
    const group = new THREE.Group();
    
    if (bannerData.type === 'banner') {
        // Create banner cloth
        const bannerGeometry = new THREE.PlaneGeometry(bannerData.size.width, bannerData.size.height);
        const bannerMaterial = new THREE.MeshStandardMaterial({ 
            color: bannerData.color,
            side: THREE.DoubleSide,
            roughness: 0.5
        });
        const banner = new THREE.Mesh(bannerGeometry, bannerMaterial);
        
        // Position the banner
        banner.position.set(
            bannerData.position.x,
            bannerData.position.y,
            bannerData.position.z
        );
        banner.rotation.set(
            bannerData.rotation.x,
            bannerData.rotation.y,
            bannerData.rotation.z
        );
        
        // Add mounting hardware
        const poleGeometry = new THREE.CylinderGeometry(0.03, 0.03, bannerData.size.width + 0.2, 8);
        const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
        const pole = new THREE.Mesh(poleGeometry, poleMaterial);
        
        // Position the pole at the top of the banner
        pole.position.set(
            bannerData.position.x,
            bannerData.position.y + bannerData.size.height / 2,
            bannerData.position.z
        );
        pole.rotation.set(
            0,
            0,
            Math.PI / 2
        );
        
        group.add(banner);
        group.add(pole);
        
    } else if (bannerData.type === 'flag') {
        // Create flag cloth
        const flagGeometry = new THREE.PlaneGeometry(bannerData.size.width, bannerData.size.height);
        const flagMaterial = new THREE.MeshStandardMaterial({ 
            color: bannerData.color,
            side: THREE.DoubleSide,
            roughness: 0.5
        });
        const flag = new THREE.Mesh(flagGeometry, flagMaterial);
        
        // Position the flag
        flag.position.set(
            bannerData.position.x + bannerData.size.width / 2,
            bannerData.position.y,
            bannerData.position.z
        );
        flag.rotation.set(
            bannerData.rotation.x,
            bannerData.rotation.y,
            bannerData.rotation.z
        );
        
        // Add flagpole
        const poleGeometry = new THREE.CylinderGeometry(0.03, 0.03, bannerData.size.height * 3, 8);
        const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
        const pole = new THREE.Mesh(poleGeometry, poleMaterial);
        
        // Position the pole
        pole.position.set(
            bannerData.position.x,
            bannerData.position.y - bannerData.size.height,
            bannerData.position.z
        );
        
        group.add(flag);
        group.add(pole);
    }
    
    return group;
}
```

**Location:** Add this code to `js/props.js` after the street furniture functions
