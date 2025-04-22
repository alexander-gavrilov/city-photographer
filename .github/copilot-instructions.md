# Copilot Development Instructions

## Task Management and Implementation Guidelines

### Status Updates
After implementing any component, update its status in the corresponding documentation file:

1. Tasks (e001f001s001t001_*.md):
   - Update `**Status:**` field to `✓ DONE`
   - Example: `**Status:** ✓ DONE`

2. Stories (s001_*.md):
   - Mark acceptance criteria with checkmarks [x] when completed
   - Update all related task statuses

3. Features (f001_*.md):
   - Mark acceptance criteria with checkmarks [x] when completed
   - Update all related story statuses

4. Epics (e001_*.md):
   - Mark acceptance criteria with checkmarks [x] when completed
   - Update all related feature statuses

### Code Commits
After implementing a story:
1. Update all related task statuses
2. Stage changes:
   ```bash
   git add .
   ```
3. Create a descriptive commit message:
   ```bash
   git commit -m "Implement [Story Name] (ID: [Story ID])"
   ```
   Example: `git commit -m "Implement Ground Surface Setup (ID: s005)"`

### Scope Changes
If additional work is required beyond the original story:

1. Create a new task file in the appropriate story folder:
   ```markdown
   # Task: [Additional Task Name]

   **Story:** [Parent Story]

   **Description:** [What needs to be done]

   **Requirements:** [Specific requirements]

   **Status:** □ TODO

   **Acceptance Criteria:**
   - [ ] [Criterion 1]
   - [ ] [Criterion 2]
   ...

   **Implementation Details:**
   ```[language]
   // Code example or implementation guide
   ```
   ```

2. Link the new task in the parent story file
3. Implement the new task before proceeding with the original story
4. Update statuses and commit as usual

### Examples

#### Task Status Update
```markdown
// Before
**Status:** □ TODO

// After
**Status:** ✓ DONE
```

#### Story Implementation Commit
```bash
# Update task statuses
# Stage changes
git add .
# Commit with descriptive message
git commit -m "Implement HTML Page Setup (ID: s001)"
```

#### Additional Task Creation
```markdown
# Task: Add Light Source for Material Visibility

**Story:** [Building Structures](../s006_building_structures.md)

**Description:** Add a light source to make materials visible when using MeshPhongMaterial.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Light source is added to scene
- [ ] Buildings are properly illuminated
```
