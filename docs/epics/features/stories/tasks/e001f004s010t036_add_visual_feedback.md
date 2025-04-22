# Task: Add Visual Feedback

**Story:** [Clue Targeting](../s010_clue_targeting.md)

**Description:** Add visual feedback when the clue is targeted by the player.

**Requirements:** Change the clue's appearance or add an effect when targeted.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Clue visually changes when targeted
- [ ] Clue returns to normal appearance when not targeted
- [ ] Transition is smooth and noticeable

**Implementation Details:**
```javascript
// Function to update clue appearance based on targeting
function updateClueAppearance() {
    if (isClueTargeted) {
        // Make the clue more noticeable when targeted
        clueMaterial.color.set(0xff0000); // Bright red
        clueMaterial.opacity = 0.9;
    } else {
        // Return to normal appearance
        clueMaterial.color.set(0x00ff00); // Green
        clueMaterial.opacity = 0.8;
    }
}
```

**Location:** Add this function to main.js and call it after checking clue intersection in the animation loop
