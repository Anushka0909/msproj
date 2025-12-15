# 🚀 Campus Delivery System - Complete Postman API Guide

## Base URL
```
http://localhost:8080
```
All requests go through the API Gateway.

---

## 📋 Table of Contents
1. [Authentication Service](#1-authentication-service)
2. [User Service](#2-user-service)
3. [Inventory Service](#3-inventory-service)
4. [Order Service](#4-order-service)
5. [Delivery Service](#5-delivery-service)
6. [Rating Service](#6-rating-service)
7. [Testing Workflow](#testing-workflow)

---

## 1. Authentication Service

### 🔐 Register User
- **Method:** `POST`
- **URL:** `http://localhost:8080/auth/register`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER",
  "phone": "9876543210",
  "hostelOrBlock": "Hostel A"
}
```
**Note:** `phone` and `hostelOrBlock` are optional

### 🔐 Register Runner
- **Method:** `POST`
- **URL:** `http://localhost:8080/auth/register`
- **Body:**
```json
{
  "name": "Runner Mike",
  "email": "runner@example.com",
  "password": "password123",
  "role": "RUNNER",
  "phone": "9876543211"
}
```

### 🔐 Login
- **Method:** `POST`
- **URL:** `http://localhost:8080/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "userId": "675b1234567890abcdef1234",
  "name": "John Doe",
  "role": "USER"
}
```

---

## 2. User Service

### 📌 Create User (Alternative to Register)
- **Method:** `POST`
- **URL:** `http://localhost:8080/users`
- **Body:** Same as register

### 📌 Get User by ID
- **Method:** `GET`
- **URL:** `http://localhost:8080/users/{userId}`
- **Example:** `http://localhost:8080/users/675b1234567890abcdef1234`

### 📌 Get All Users
- **Method:** `GET`
- **URL:** `http://localhost:8080/users`

### 📌 Get Users by Role
- **Method:** `GET`
- **URL:** `http://localhost:8080/users/role/{role}`
- **Examples:**
  - `http://localhost:8080/users/role/USER`
  - `http://localhost:8080/users/role/RUNNER`

**Security Note:** All user endpoints return data WITHOUT passwords.

---

## 3. Inventory Service

### 🍔 Create Item
- **Method:** `POST`
- **URL:** `http://localhost:8080/inventory/items`
- **Body:**
```json
{
  "name": "Burger",
  "description": "Delicious beef burger",
  "price": 150.00,
  "available": true,
  "category": "Food"
}
```

### 🍔 Get All Items
- **Method:** `GET`
- **URL:** `http://localhost:8080/inventory/items`

### 🍔 Get Item by ID
- **Method:** `GET`
- **URL:** `http://localhost:8080/inventory/items/{itemId}`

### 🍔 Get Items by Category
- **Method:** `GET`
- **URL:** `http://localhost:8080/inventory/items/category/{category}`
- **Example:** `http://localhost:8080/inventory/items/category/Food`

**Note:** Update and Delete are not implemented in ItemController

---

## 4. Order Service

### 📦 Create Order
- **Method:** `POST`
- **URL:** `http://localhost:8080/orders`
- **Body:**
```json
{
  "userId": "675b1234567890abcdef1234",
  "items": [
    {
      "itemId": "675b9876543210fedcba9876",
      "quantity": 2
    },
    {
      "itemId": "675b9876543210fedcba9877",
      "quantity": 1
    }
  ],
  "deliveryAddress": "Room 305, Hostel A",
  "specialInstructions": "Extra spicy please"
}
```
**Note:** Order status is automatically set to "OPEN"

### 📦 Get All Orders
- **Method:** `GET`
- **URL:** `http://localhost:8080/orders`

### 📦 Get Order by ID
- **Method:** `GET`
- **URL:** `http://localhost:8080/orders/{orderId}`

### 📦 Get Orders by User ID
- **Method:** `GET`
- **URL:** `http://localhost:8080/orders/user/{userId}`

### 📦 Update Order Status (Generic)
- **Method:** `PUT`
- **URL:** `http://localhost:8080/orders/{orderId}/status?status={STATUS}`
- **Example:** `http://localhost:8080/orders/675c1234567890abcdef5678/status?status=ASSIGNED`
- **Valid Status Values:** `OPEN`, `ASSIGNED`, `DELIVERED`, `CANCELLED`

### 📦 Mark Order as Delivered (Specific)
- **Method:** `PUT`
- **URL:** `http://localhost:8080/orders/{orderId}/status/DELIVERED`
- **No body required**

### 📦 Delete/Cancel Order
- **Method:** `DELETE`
- **URL:** `http://localhost:8080/orders/{orderId}?userId={userId}`
- **Example:** `http://localhost:8080/orders/675c1234567890abcdef5678?userId=675b1234567890abcdef1234`
- **Rules:**
  - Only the order owner can delete their order
  - Cannot delete orders with status "DELIVERED"
  - Deletion is logical - status changes to "CANCELLED"

---

## 5. Delivery Service

### 🚚 Accept Order (Create Delivery)
- **Method:** `POST`
- **URL:** `http://localhost:8080/deliveries/accept`
- **Body:**
```json
{
  "orderId": "675c1234567890abcdef5678",
  "delivererId": "675b1234567890abcdef9999"
}
```
**Note:** 
- Status is automatically set to "ASSIGNED"
- Also updates the order status to "ASSIGNED"

### 🚚 Complete Delivery
- **Method:** `PUT`
- **URL:** `http://localhost:8080/deliveries/{deliveryId}/complete`
- **No body required**
- **Note:** 
  - Updates delivery status to "DELIVERED"
  - Also updates the order status to "DELIVERED"

### 🚚 Get Delivery by ID
- **Method:** `GET`
- **URL:** `http://localhost:8080/deliveries/{deliveryId}`

### 🚚 Get Deliveries by Order ID
- **Method:** `GET`
- **URL:** `http://localhost:8080/deliveries/order/{orderId}`

### 🚚 Get Deliveries by Deliverer/Runner ID
- **Method:** `GET`
- **URL:** `http://localhost:8080/deliveries/deliverer/{delivererId}`

---

## 6. Rating Service

### ⭐ Create Rating
- **Method:** `POST`
- **URL:** `http://localhost:8080/ratings`
- **Body:**
```json
{
  "orderId": "675c1234567890abcdef5678",
  "runnerId": "675b1234567890abcdef9999",
  "userId": "675b1234567890abcdef1234",
  "ratingValue": 5,
  "comment": "Excellent service, very fast!"
}
```
**Note:** `ratingValue` should be 1-5

### ⭐ Get Runner Statistics
- **Method:** `GET`
- **URL:** `http://localhost:8080/ratings/runner/{runnerId}`
- **Response:**
```json
{
  "runnerId": "675b1234567890abcdef9999",
  "averageRating": 4.5,
  "count": 15
}
```

### ⭐ Get Rating by Order ID
- **Method:** `GET`
- **URL:** `http://localhost:8080/ratings/order/{orderId}`

---

## 🧪 Testing Workflow

### Complete End-to-End Test Flow:

1. **Setup Users**
   ```
   POST /auth/register (role: USER) → Save userId
   POST /auth/register (role: RUNNER) → Save runnerId
   POST /auth/login (as USER)
   POST /auth/login (as RUNNER)
   ```

2. **Setup Inventory**
   ```
   POST /inventory/items (create 2-3 items) → Save itemIds
   GET /inventory/items (verify items created)
   GET /inventory/items/category/Food
   ```

3. **Create Order**
   ```
   POST /orders (with userId and itemIds) → Save orderId
   GET /orders/user/{userId} (verify order created)
   GET /orders/{orderId}
   ```

4. **Accept Delivery**
   ```
   POST /deliveries/accept (with orderId and delivererId) → Save deliveryId
   GET /deliveries/deliverer/{delivererId}
   GET /orders/{orderId} (verify status is "ASSIGNED")
   ```

5. **Complete Delivery**
   ```
   PUT /deliveries/{deliveryId}/complete
   GET /orders/{orderId} (verify status is "DELIVERED")
   ```

6. **Submit Rating**
   ```
   POST /ratings (with orderId, runnerId, userId)
   GET /ratings/runner/{runnerId} (check stats)
   GET /ratings/order/{orderId}
   ```

7. **Test Deletion (Optional)**
   ```
   POST /orders (create new order) → Save orderId2
   DELETE /orders/{orderId2}?userId={userId}
   GET /orders/{orderId2} (verify status is "CANCELLED")
   ```

---

## 💡 Postman Tips

### Environment Variables Setup
Create a Postman Environment with these variables:
```
baseUrl: http://localhost:8080
userId: (save from registration)
runnerId: (save from runner registration)
itemId: (save from item creation)
orderId: (save from order creation)
deliveryId: (save from delivery acceptance)
```

### Auto-Save Response IDs
Add this to the **Tests** tab of your requests:

**For Registration/Login:**
```javascript
pm.environment.set("userId", pm.response.json().id);
// or for login response:
pm.environment.set("userId", pm.response.json().userId);
```

**For Item Creation:**
```javascript
pm.environment.set("itemId", pm.response.json().id);
```

**For Order Creation:**
```javascript
pm.environment.set("orderId", pm.response.json().id);
```

**For Delivery Acceptance:**
```javascript
pm.environment.set("deliveryId", pm.response.json().id);
```

### Using Variables in Requests
- **URL:** `{{baseUrl}}/users/{{userId}}`
- **Body:** `"userId": "{{userId}}"`
- **Query Params:** `?userId={{userId}}`

---

## ✅ Pre-Flight Checklist

Before testing, ensure:
- [ ] All services are running (check http://localhost:8761)
- [ ] MongoDB is running on localhost:27017
- [ ] API Gateway is accessible at http://localhost:8080
- [ ] Content-Type header is set to `application/json`
- [ ] Body format is set to "raw" and "JSON" in Postman

---

## 🔒 Security & Data Notes

### Password Security
- ✅ Passwords are **NEVER** returned in API responses
- ✅ All user endpoints use `UserResponse` DTO
- ✅ Password is only used for authentication

### Null Fields
- `phone` and `hostelOrBlock` are **optional**
- If not provided during registration, they will be `null`
- This is **expected behavior**, not an error

### Order Deletion
- Deletion is **logical**, not physical
- Orders are marked as "CANCELLED", not removed from database
- Only order owners can delete their orders
- Delivered orders cannot be deleted

---

## 📊 HTTP Status Codes Reference

- **200 OK** - Successful GET/PUT request
- **201 Created** - Successful POST request
- **204 No Content** - Successful DELETE request
- **400 Bad Request** - Invalid request body/parameters
- **401 Unauthorized** - Authentication required
- **403 Forbidden** - Not authorized to perform action
- **404 Not Found** - Resource doesn't exist
- **500 Internal Server Error** - Server-side error

---

## 🐛 Troubleshooting

### Issue: 405 Method Not Allowed
- **Solution:** Check the endpoint URL (e.g., `/auth/register` not `/users/register`)

### Issue: Connection Refused
- **Solution:** Wait 30-60 seconds for services to start
- Check Eureka dashboard: http://localhost:8761

### Issue: 404 Not Found
- **Solution:** Verify the service is registered in Eureka
- Check the URL path matches controller mappings

### Issue: 500 Internal Server Error
- **Solution:** Check service console logs
- Verify MongoDB is running
- Ensure request body format is correct

### Issue: Unauthorized deletion
- **Solution:** Make sure `userId` query parameter matches order owner

---

## 📚 Quick Reference - All Endpoints

### Authentication
- `POST /auth/register` - Register user/runner
- `POST /auth/login` - Login

### Users
- `POST /users` - Create user
- `GET /users` - Get all users
- `GET /users/{id}` - Get user by ID
- `GET /users/role/{role}` - Get users by role

### Inventory
- `POST /inventory/items` - Create item
- `GET /inventory/items` - Get all items
- `GET /inventory/items/{id}` - Get item by ID
- `GET /inventory/items/category/{category}` - Get items by category

### Orders
- `POST /orders` - Create order
- `GET /orders` - Get all orders
- `GET /orders/{id}` - Get order by ID
- `GET /orders/user/{userId}` - Get orders by user
- `PUT /orders/{id}/status?status={status}` - Update order status
- `PUT /orders/{id}/status/DELIVERED` - Mark as delivered
- `DELETE /orders/{id}?userId={userId}` - Cancel order

### Deliveries
- `POST /deliveries/accept` - Accept order (create delivery)
- `PUT /deliveries/{id}/complete` - Complete delivery
- `GET /deliveries/{id}` - Get delivery by ID
- `GET /deliveries/order/{orderId}` - Get deliveries by order
- `GET /deliveries/deliverer/{delivererId}` - Get deliveries by runner

### Ratings
- `POST /ratings` - Create rating
- `GET /ratings/runner/{runnerId}` - Get runner stats
- `GET /ratings/order/{orderId}` - Get rating by order

---

**🎉 You're all set! Start testing your Campus Delivery System API!**
