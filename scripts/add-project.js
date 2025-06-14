#!/usr/bin/env node

/**
 * Project Generator Script
 * 
 * This script helps you quickly create a new project with the proper structure.
 * Usage: node scripts/add-project.js "Project Name" "project-folder-name"
 */

const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
const projectTitle = args[0];
const folderName = args[1];

if (!projectTitle || !folderName) {
  console.log('Usage: node scripts/add-project.js "Project Name" "project-folder-name"');
  console.log('Example: node scripts/add-project.js "My Todo App" "todo-app"');
  process.exit(1);
}

// Create project folder
const projectPath = path.join(process.cwd(), 'public', 'projects', folderName);

if (!fs.existsSync(projectPath)) {
  fs.mkdirSync(projectPath, { recursive: true });
  console.log(`✅ Created project folder: ${projectPath}`);
} else {
  console.log(`⚠️  Project folder already exists: ${projectPath}`);
}

// Generate project configuration template
const projectConfig = {
  id: folderName,
  title: projectTitle,
  description: "Brief description of your project",
  longDescription: "Detailed description with features, technologies, and objectives. Explain what problem it solves and how it benefits users.",
  repoUrl: `https://github.com/Bilal-XQ/${folderName}`,
  demoUrl: "", // Optional: Add demo URL
  techStack: ["Technology1", "Technology2", "Technology3"], // Update with actual tech stack
  featured: false, // Set to true for featured projects
  status: "In Development", // "Live" | "In Development" | "Completed"
  metrics: {
    // Optional metrics - remove if not applicable
    users: "100+",
    performance: "95+ Lighthouse",
    commits: "50+"
  },
  year: new Date().getFullYear().toString(),
  folderName: folderName
};

// Generate image mapping template
const imageMapping = `    '${folderName}': [
      '/projects/${folderName}/main-screenshot.png',
      '/projects/${folderName}/feature-1.png',
      '/projects/${folderName}/feature-2.png',
      // Add more screenshots as needed
    ],`;

console.log('\n📋 Project Configuration Template:');
console.log('=====================================');
console.log('Add this to the projectConfigs array in lib/project-images.ts:');
console.log('\n' + JSON.stringify(projectConfig, null, 2) + ',');

console.log('\n🖼️  Image Mapping Template:');
console.log('============================');
console.log('Add this to the projectImageMap in lib/project-images.ts:');
console.log('\n' + imageMapping);

console.log('\n📝 Next Steps:');
console.log('=============');
console.log(`1. Add your project screenshots to: public/projects/${folderName}/`);
console.log('2. Update the project configuration in lib/project-images.ts');
console.log('3. Update the image mapping with your actual screenshot filenames');
console.log('4. Update the project details (description, tech stack, URLs, etc.)');
console.log('5. Your project will automatically appear in the portfolio!');

console.log('\n💡 Tips:');
console.log('========');
console.log('- Use descriptive filenames for your screenshots');
console.log('- Keep images under 500KB for fast loading');
console.log('- Use PNG for screenshots, JPG for photos');
console.log('- The first image in the array becomes the main project image');
console.log('- Recommended image size: 1920x1080 or similar 16:9 ratio');

// Create a sample README for the project
const readmePath = path.join(projectPath, 'README.md');
const readmeContent = `# ${projectTitle}

Add your project screenshots to this folder.

## Recommended image names:
- \`main-screenshot.png\` - Main project view
- \`dashboard.png\` - Dashboard or main interface
- \`mobile-view.png\` - Mobile responsive view
- \`features.png\` - Feature showcase
- \`settings.png\` - Settings or configuration screens

## Image guidelines:
- Format: PNG for screenshots, JPG for photos
- Size: Keep under 500KB per image
- Resolution: 1920x1080 or higher recommended
- Aspect ratio: 16:9 works best

After adding images, update the image mapping in \`lib/project-images.ts\`.
`;

fs.writeFileSync(readmePath, readmeContent);
console.log(`\n📄 Created README.md in the project folder with guidelines.`);
