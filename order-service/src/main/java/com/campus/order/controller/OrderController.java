package com.campus.order.controller;

import com.campus.order.model.Order;
import com.campus.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        order.setStatus("OPEN");
        order.setCreatedAt(Instant.now());
        return orderRepository.save(order);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable String id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable String userId) {
        return orderRepository.findByUserId(userId);
    }
    
    // Endpoint to update status (generic)
    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable String id, @RequestParam String status) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    // Specific endpoint for DELIVERED as requested
    @PutMapping("/{id}/status/DELIVERED")
    public Order markOrderDelivered(@PathVariable String id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus("DELIVERED");
        return orderRepository.save(order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable String id, @RequestParam String userId) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        
        // Validate Owner
        if (!order.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized: You can only delete your own orders.");
        }

        // Validate Status
        if ("DELIVERED".equals(order.getStatus())) {
            throw new RuntimeException("Cannot cancel a specific delivered order.");
        }

        // Logical Delete
        order.setStatus("CANCELLED");
        orderRepository.save(order);
    }
}
