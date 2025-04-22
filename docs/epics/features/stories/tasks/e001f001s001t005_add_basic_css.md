# Task: Add basic CSS

**Story:** [HTML Page Setup](../s001_html_page.md)

**Description:** Add CSS rules to make the canvas fill the browser window.

**Requirements:** CSS rules for canvas and body elements to ensure full-window coverage.

**Status:** ✓ DONE

**Acceptance Criteria:**
- [x] Body has margin and overflow settings
- [x] Canvas has display, width, and height settings
- [x] Canvas fills the entire viewport

**Implementation Details:**
```css
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}
canvas {
    display: block;
    width: 100vw;
    height: 100vh;
}
```

**Location:** These styles should be placed in a `<style>` tag in the `<head>` section of index.html
