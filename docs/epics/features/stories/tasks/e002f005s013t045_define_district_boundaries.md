# Task: Define District Boundaries

**Story:** [District Creation](../s013_district_creation.md)

**Description:** Define and implement the boundaries and transition areas between different city districts.

**Requirements:** Create clear but natural transitions between district areas while maintaining performance.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Map/plan of district layout created
- [ ] District boundaries defined in 3D space
- [ ] Transition areas (streets, landmarks) connecting districts
- [ ] Performance optimized for district rendering

**Implementation Details:**
```javascript
// Define district boundaries
const districtBoundaries = [
    {
        name: 'Downtown',
        center: new THREE.Vector3(0, 0, -20),
        radius: 30,
        buildingStyle: 'modern'
    },
    {
        name: 'Industrial',
        center: new THREE.Vector3(-40, 0, 10),
        radius: 25,
        buildingStyle: 'industrial'
    },
    {
        name: 'Residential',
        center: new THREE.Vector3(35, 0, 30),
        radius: 20,
        buildingStyle: 'residential'
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
```

**Location:** Add this code to a new file `js/districts.js` and import it in `main.js`
