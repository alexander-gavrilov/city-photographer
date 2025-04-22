# Task: Position Clue Object

**Story:** [Interactive Clue](../s009_interactive_clue.md)

**Description:** Position the clue object in an accessible location within the initial area.

**Requirements:** Place the clue where it's visible and reachable by the player.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Clue is positioned within the walkable area
- [ ] Clue is visible from the starting position
- [ ] Clue is positioned at a reasonable height for viewing
- [ ] Location makes sense in the context of buildings

**Implementation Details:**
```javascript
// Position the clue at eye level near one of the buildings
clueObject.position.set(10, 2, -5);

// Add to scene
scene.add(clueObject);

// Optional: Add subtle animation to make it more noticeable
function animateClue() {
    clueObject.position.y = 2 + Math.sin(Date.now() * 0.001) * 0.2; // Gentle floating motion
}

// Add to animation loop:
function animate() {
    requestAnimationFrame(animate);
    
    updateCameraPosition();
    updateCameraRotation();
    animateClue();
    
    renderer.render(scene, camera);
}
```

**Location:** This code should be added to main.js, after clue object creation and before the animation loop
