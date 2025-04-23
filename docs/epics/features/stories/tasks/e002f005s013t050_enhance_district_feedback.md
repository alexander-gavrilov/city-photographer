# Task: Enhance District Feedback

**Story:** [District Creation](../s013_district_creation.md)

**Description:** Add user interface elements to provide feedback about which district the player is currently in.

**Requirements:** Create a district indicator that updates in real-time as the player moves between districts.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [x] District indicator UI element created
- [x] UI updates as player moves between districts
- [x] Distinct visual styling for each district type
- [x] Smooth transitions between district indicators
- [x] Works well with existing UI elements

**Implementation Details:**
```javascript
// Initialize district tracking variables
let currentDistrict = null;
const districtIndicator = document.getElementById('districtIndicator');

// Update district indicator based on player position
function updateDistrictIndicator() {
    const playerPosition = camera.position.clone();
    const district = getDistrictAtPosition(playerPosition);
    
    // Only update if district changed
    if (district !== currentDistrict) {
        currentDistrict = district;
        
        // Update UI element
        if (district) {
            districtIndicator.textContent = `District: ${district.name}`;
            
            // Remove previous class
            districtIndicator.classList.remove('district-downtown', 'district-industrial', 'district-residential');
            
            // Add appropriate class based on district
            const districtClass = `district-${district.name.toLowerCase()}`;
            districtIndicator.classList.add(districtClass);
            
            // Show district indicator
            districtIndicator.style.display = 'block';
        } else {
            districtIndicator.textContent = 'District: Unknown';
            districtIndicator.classList.remove('district-downtown', 'district-industrial', 'district-residential');
        }
    }
}

// Add CSS for district indicator
/*
#districtIndicator {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    background-color: rgba(0,0,0,0.7);
    padding: 10px 15px;
    border-radius: 5px;
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    z-index: 100;
    transition: background-color 0.5s ease;
    border-left: 5px solid #ffcc00;
}
.district-downtown {
    border-left-color: #3498db;
}
.district-industrial {
    border-left-color: #e74c3c;
}
.district-residential {
    border-left-color: #2ecc71;
}
*/
```

**Location:** Add the district indicator element to index.html and the update function to main.js
