# Task: Rotate Ground Plane

**Story:** [Ground Surface Setup](../s005_ground_surface.md)

**Description:** Rotate the plane to be horizontal in the XZ plane.

**Requirements:** Rotate the ground mesh around the X-axis by -90 degrees (in radians).

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] The ground mesh is rotated to lie flat in the XZ plane
- [ ] Rotation value is set to -Math.PI / 2 (radians)

**Implementation Details:**
```javascript
ground.rotation.x = -Math.PI / 2;
```

**Location:** This code should be added to main.js, after ground mesh creation but before adding to scene
