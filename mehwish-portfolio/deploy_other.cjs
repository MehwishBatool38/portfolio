const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const srcDir = __dirname;
const destDir = 'c:\\Users\\Home-PC\\Documents\\GitHub\\personal\\mehwish';

if (fs.existsSync(destDir)) {
  console.log("Found other repo, copying files...");
  
  // Copy AdminPage.jsx
  fs.copyFileSync(
    path.join(srcDir, 'src/pages/AdminPage.jsx'),
    path.join(destDir, 'src/pages/AdminPage.jsx')
  );
  
  // Copy projectsService.js
  fs.copyFileSync(
    path.join(srcDir, 'src/services/projectsService.js'),
    path.join(destDir, 'src/services/projectsService.js')
  );
  
  // Copy supabase.js
  fs.copyFileSync(
    path.join(srcDir, 'src/services/supabase.js'),
    path.join(destDir, 'src/services/supabase.js')
  );
  
  console.log("Files copied. Committing and pushing...");
  try {
    execSync('git add .', { cwd: destDir, stdio: 'inherit' });
    execSync('git commit -m "Fix admin panel for mishidev"', { cwd: destDir, stdio: 'inherit' });
    execSync('git push', { cwd: destDir, stdio: 'inherit' });
    console.log("Push successful!");
  } catch (e) {
    console.log("Error pushing:", e.message);
  }
} else {
  console.log("Dest repo not found.");
}
