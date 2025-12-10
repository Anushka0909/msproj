# Campus Delivery & Order System

A microservices-based application for campus delivery, built with Spring Boot, Spring Cloud, MongoDB, and React.

## Prequisites
- Java 17+ & Maven
- Node.js & npm
- MongoDB running locally at `mongodb://localhost:27017`

## Project Structure
- **eureka-server** (Port 8761): Service Discovery
- **api-gateway** (Port 8080): Unified Entry Point
- **user-service** (Port 9001): User Management
- **inventory-service** (Port 9002): Items & Stores
- **order-service** (Port 9003): Order Management
- **delivery-service** (Port 9004): Delivery Tracking
- **frontend** (React, Port 5173): User Interface

## How to Run

### 1. Start MongoDB
Ensure MongoDB is running locally.
```bash
mongod
# or start via service
```

### 2. Start Backend Services
Open separate terminals for each service and run the following command in each directory, **IN THIS ORDER**:

1. **Eureka Server**:
   ```bash
   cd eureka-server
   mvn spring-boot:run
   ```
   *Wait for it to start fully.*

2. **API Gateway**:
   ```bash
   cd api-gateway
   mvn spring-boot:run
   ```

3. **Microservices** (Order doesn't matter, but start them all):
   ```bash
   cd user-service
   mvn spring-boot:run
   ```
   ```bash
   cd inventory-service
   mvn spring-boot:run
   ```
   ```bash
   cd order-service
   mvn spring-boot:run
   ```
   ```bash
   cd delivery-service
   mvn spring-boot:run
   ```

Verify all services are up at [http://localhost:8761](http://localhost:8761).

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## Testing with Postman
Base URL: `http://localhost:8080` (API Gateway)

1. **Create User**
   - POST `/users`
   - Body: `{ "name": "Anushka", "email": "anu@example.com", "phone": "9999999999", "role": "ORDERER", "hostelOrBlock": "Block A" }`

2. **Create Item**
   - POST `/items`
   - Body: `{ "name": "Cold Coffee", "category": "Food", "storeName": "Campus Cafe", "price": 80, "available": true }`

3. **Create Order**
   - POST `/orders`
   - Body: `{ "userId": "<use-id-from-step-1>", "itemId": "Cold Coffee", "pickupLocation": "Campus Cafe", "dropLocation": "Block A", "priceOffered": 90 }`

4. **Accept Order (Delivery)**
   - POST `/deliveries/accept`
   - Body: `{ "orderId": "<order-id-from-step-3>", "delivererId": "runner_1" }`

5. **Verify Status**
   - GET `/orders/<order-id>` (Status should be ASSIGNED)

## Features
- **Discovery**: Services register themselves with Eureka.
- **Routing**: API Gateway routes traffic to services.
- **Microservices**: Independent databases and logic.
- **Frontend**: Modern, chic UI with Tailwind CSS.
