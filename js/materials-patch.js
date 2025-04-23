/**
 * Patch for districts.js - Fixes any instances of MeshBasicMaterial with emissive properties
 * This script runs immediately when loaded and fixes any material issues
 */

// Backup the original MeshBasicMaterial constructor
if (typeof THREE !== 'undefined') {
    console.log("Applying districts.js patch to fix material issues...");
    
    // Store the original constructor
    const OriginalMeshBasicMaterial = THREE.MeshBasicMaterial;
    
    // Override the constructor to intercept any attempts to use emissive properties with MeshBasicMaterial
    THREE.MeshBasicMaterial = function(parameters) {
        // Check if the parameters contain emissive or emissiveIntensity
        if (parameters && (parameters.emissive !== undefined || parameters.emissiveIntensity !== undefined)) {
            console.log("Converting MeshBasicMaterial to MeshStandardMaterial to support emissive properties");
            
            // Create a MeshStandardMaterial instead
            return new THREE.MeshStandardMaterial(parameters);
        }
        
        // Otherwise use the original constructor
        return new OriginalMeshBasicMaterial(parameters);
    };
}
