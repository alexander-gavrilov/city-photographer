# Task: Add Photo Sound Effects

**Story:** [Photo Action](../s011_photo_action.md)

**Description:** Add sound effects for taking photos and successful clue capture.

**Requirements:** Play appropriate sound effects for photo actions.

**Status:** □ TODO

**Acceptance Criteria:**
- [ ] Camera shutter sound effect when taking a photo
- [ ] Success sound when capturing a clue
- [ ] Sounds are loaded efficiently
- [ ] Volume levels are appropriate

**Implementation Details:**
```javascript
// Create audio elements
const shutterSound = new Audio();
shutterSound.src = 'sounds/shutter.mp3';
shutterSound.volume = 0.3;

const successSound = new Audio();
successSound.src = 'sounds/success.mp3';
successSound.volume = 0.4;

// Update takePhoto function to include sound
function takePhoto() {
    if (!isClueTargeted || !canTakePhoto) return;
    
    // Play shutter sound
    shutterSound.currentTime = 0;
    shutterSound.play();
    
    // ... existing flash effect code ...
    
    // If clue was successfully captured
    if (isClueTargeted) {
        setTimeout(() => {
            successSound.currentTime = 0;
            successSound.play();
        }, 200); // Play after shutter sound
    }
}
```

**Notes:**
- Create a 'sounds' directory in the project
- Add appropriate sound files (shutter.mp3, success.mp3)
- Consider user preferences for audio (optional mute functionality)
