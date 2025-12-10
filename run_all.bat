@echo off
echo Starting Campus Delivery System...

echo Starting Eureka Server...
start "Eureka Server" cmd /k "cd eureka-server && mvn spring-boot:run"
timeout /t 15

echo Starting API Gateway...
start "API Gateway" cmd /k "cd api-gateway && mvn spring-boot:run"
timeout /t 10

echo Starting User Service...
start "User Service" cmd /k "cd user-service && mvn spring-boot:run"

echo Starting Inventory Service...
start "Inventory Service" cmd /k "cd inventory-service && mvn spring-boot:run"

echo Starting Order Service...
start "Order Service" cmd /k "cd order-service && mvn spring-boot:run"

echo Starting Delivery Service...
start "Delivery Service" cmd /k "cd delivery-service && mvn spring-boot:run"

echo Starting Frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo All services launched! Check the new windows.
echo Eureka Dashboard: http://localhost:8761
echo Frontend: http://localhost:5173
pause
