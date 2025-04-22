# Task: Fix GUI Module Import Error

**Story:** [Interactive Clue Setup](../s009_interactive_clue.md)

**Description:** Fix the error related to the dat.gui.module.js file that's using export statements but being loaded as a regular script.

**Requirements:** Replace the module version with a non-module version or update the script loading method.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [ ] No more "Uncaught SyntaxError: Unexpected token 'export'" errors in console
- [ ] GUI functionality works correctly if needed
- [ ] Page loads without JavaScript errors

**Implementation Details:**
```javascript
// Either:
// 1. Replace the module version with the non-module version (dat.gui.min.js)
// 2. Or add type="module" to the script tag that loads the module
// 3. Or remove the dat.gui dependency if not needed
```

**Location:** Make changes to index.html where script tags are defined
