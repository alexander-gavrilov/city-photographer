# Task: Add Visual Targeting Indicator

**Story:** [Clue Targeting](../s010_clue_targeting.md)

**Description:** Create a visual indicator to show when the clue is being targeted.

**Requirements:** Add a crosshair or reticle at screen center and enhance clue feedback.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Centered crosshair/reticle is visible
- [ ] Clear visual feedback when targeting clue
- [ ] Indicator style matches game aesthetic

**Implementation Details:**
```javascript
// Add crosshair HTML element
const crosshairHTML = `
<div id="crosshair" style="
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    pointer-events: none;
">
    <div style="
        position: absolute;
        width: 2px;
        height: 20px;
        background: white;
        left: 50%;
        transform: translateX(-50%);
    "></div>
    <div style="
        position: absolute;
        width: 20px;
        height: 2px;
        background: white;
        top: 50%;
        transform: translateY(-50%);
    "></div>
</div>`;

// Add to document
document.body.insertAdjacentHTML('beforeend', crosshairHTML);

// Update targeting visual feedback
function updateTargetingVisuals() {
    const crosshair = document.getElementById('crosshair');
    if (isClueTargeted) {
        crosshair.style.borderColor = '#00ff00';
        clueObject.material.emissive = new THREE.Color(0x00ff00);
        clueObject.material.emissiveIntensity = 0.5;
    } else {
        crosshair.style.borderColor = 'white';
        clueObject.material.emissiveIntensity = 0;
    }
}
```

**Location:** Add HTML elements after the canvas element and update the checkClueTargeting function to call updateTargetingVisuals
