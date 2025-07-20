#!/usr/bin/env node

const { exec, spawn } = require('child_process');
const os = require('os');

const PORT = 3000;

function killProcessOnPort(port) {
  return new Promise((resolve) => {
    const isWindows = os.platform() === 'win32';
    
    let command;
    if (isWindows) {
      command = `netstat -ano | findstr :${port}`;
    } else {
      command = `lsof -ti:${port}`;
    }

    exec(command, (error, stdout) => {
      if (error || !stdout.trim()) {
        console.log(`✅ Port ${port} is available`);
        resolve();
        return;
      }

      console.log(`🔄 Found process using port ${port}. Stopping it...`);
      
      if (isWindows) {
        // Extract PID from netstat output
        const lines = stdout.trim().split('\n');
        const pids = lines
          .map(line => line.trim().split(/\s+/).pop())
          .filter(pid => pid && pid !== '0');
        
        if (pids.length > 0) {
          const killCmd = `taskkill /F /PID ${pids.join(' /PID ')}`;
          exec(killCmd, (killError) => {
            if (killError) {
              console.log(`❌ Failed to kill process: ${killError.message}`);
            } else {
              console.log(`✅ Successfully stopped process on port ${port}`);
            }
            setTimeout(resolve, 1000); // Wait 1 second for port to be released
          });
        } else {
          resolve();
        }
      } else {
        // Unix/Linux/macOS
        const killCmd = `kill -9 ${stdout.trim().split('\n').join(' ')}`;
        exec(killCmd, (killError) => {
          if (killError) {
            console.log(`❌ Failed to kill process: ${killError.message}`);
          } else {
            console.log(`✅ Successfully stopped process on port ${port}`);
          }
          setTimeout(resolve, 1000);
        });
      }
    });
  });
}

async function startDevServer() {
  console.log(`🚀 Starting development server on port ${PORT}...`);
  
  // Kill any existing process on the port
  await killProcessOnPort(PORT);
  
  // Start the Next.js dev server
  console.log(`🌐 Starting Next.js development server...`);
  const devProcess = spawn('pnpm', ['exec', 'next', 'dev', '-p', PORT.toString()], {
    stdio: 'inherit',
    shell: true
  });

  devProcess.on('error', (error) => {
    console.error(`❌ Failed to start dev server: ${error.message}`);
  });
}

startDevServer();
