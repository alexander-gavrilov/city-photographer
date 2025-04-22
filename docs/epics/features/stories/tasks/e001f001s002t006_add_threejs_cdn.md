# Task: Add Three.js CDN script

**Story:** [Include Three.js Library](../s002_include_threejs.md)

**Description:** Add the Three.js library via CDN.

**Requirements:** Include Three.js from a reliable CDN source.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [x] Script tag with correct CDN URL is added
- [x] Script is loaded before the main game script

**Implementation Details:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

**Location:** This script tag should be placed in the `<body>` section of index.html, before the main game script
