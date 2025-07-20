# Kill any process using port 3000
$port = 3000
$connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if ($connections) {
    Write-Host "Found process using port $port. Stopping it..." -ForegroundColor Yellow
    foreach ($connection in $connections) {
        $processId = $connection.OwningProcess
        try {
            Stop-Process -Id $processId -Force
            Write-Host "Stopped process $processId" -ForegroundColor Green
        }
        catch {
            Write-Host "Failed to stop process $processId" -ForegroundColor Red
        }
    }
    # Wait a moment for the port to be released
    Start-Sleep -Seconds 2
}

# Start the Next.js development server
Write-Host "Starting Next.js development server on port $port..." -ForegroundColor Cyan
pnpm exec next dev -p $port
