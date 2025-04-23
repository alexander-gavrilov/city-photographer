# Task: Add District Descriptions

**Story:** [District Creation](../s013_district_creation.md)

**Description:** Add contextual descriptions that appear when players enter different districts, providing information about each area's character and photographic opportunities.

**Requirements:** Create a description system that shows district information when players first enter an area.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [x] Description UI element created with appropriate styling
- [x] Unique descriptive text for each district
- [x] Descriptions appear when entering a new district
- [x] Descriptions automatically fade out after viewing
- [x] Smooth fade-in and fade-out animations

**Implementation Details:**
```javascript
// District boundaries updated with descriptions
const districtBoundaries = [
    {
        name: 'Downtown',
        center: new THREE.Vector3(0, 0, -20),
        radius: 30,
        buildingStyle: 'modern',
        description: 'The bustling heart of the city with modern skyscrapers and sleek architecture. Look for opportunities to capture the contrast between light and shadow created by these towering structures.'
    },
    // ...other districts with descriptions...
];

// Show district entrance notification with description
function showDistrictEntrance(district) {
    // Clear any existing timeout
    if (descriptionTimeout) {
        clearTimeout(descriptionTimeout);
    }
    
    // Update description content
    const titleElement = districtDescription.querySelector('h3');
    const descriptionElement = districtDescription.querySelector('p');
    
    titleElement.textContent = district.name + " District";
    descriptionElement.textContent = district.description;
    
    // Show description with animation
    districtDescription.classList.add('visible');
    
    // Hide after 8 seconds
    descriptionTimeout = setTimeout(() => {
        hideDistrictDescription();
    }, 8000);
}

// Hide district description
function hideDistrictDescription() {
    districtDescription.classList.remove('visible');
}
```

**Location:** Add district descriptions to districts.js and update main.js with the showDistrictEntrance function
