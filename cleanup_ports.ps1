# Force kill any process listening on these ports
$ports = @(8761, 8080, 9001, 9002, 9003, 9004, 9005, 5173)

foreach ($port in $ports) {
    echo "Checking port $port..."
    $processes = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($processes) {
        foreach ($proc in $processes) {
            try {
                echo "Killing PID $($proc.OwningProcess) on port $port"
                Stop-Process -Id $proc.OwningProcess -Force -ErrorAction SilentlyContinue
            } catch {
                echo "Could not kill PID $($proc.OwningProcess)"
            }
        }
    } else {
        echo "Port $port is free."
    }
}

# Also cleanup any java or node processes generally to be safe
echo "Cleaning up general Java/Node processes..."
Get-Process -Name java -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

echo "Cleanup complete."
