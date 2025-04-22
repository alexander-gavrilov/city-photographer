# Task: Position Buildings

**Story:** [Building Structures](../s006_building_structures.md)

**Description:** Set the position property for each building mesh to create a street-like layout.

**Requirements:** Position buildings above the ground plane to create a navigable space.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] Buildings are positioned at different x and z coordinates
- [ ] Buildings' y position accounts for their height (half the height)
- [ ] Positions create a street-like layout
- [ ] No buildings overlap

**Implementation Details:**
```javascript
// Example positions for 5 buildings creating a street
buildings[0].position.set(-15, 5, -10);  // Left side of street
buildings[1].position.set(-15, 5, 10);   // Left side of street
buildings[2].position.set(15, 5, -10);   // Right side of street
buildings[3].position.set(15, 5, 10);    // Right side of street
buildings[4].position.set(0, 5, -20);    // End of street
```

**Location:** This code should be added to main.js, after building mesh creation
