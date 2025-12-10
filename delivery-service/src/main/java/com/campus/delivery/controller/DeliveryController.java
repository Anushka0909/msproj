package com.campus.delivery.controller;

import com.campus.delivery.model.Delivery;
import com.campus.delivery.repository.DeliveryRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/deliveries")
@RequiredArgsConstructor
public class DeliveryController {

    private final DeliveryRepository deliveryRepository;
    private final RestTemplate restTemplate;

    @PostMapping("/accept")
    public Delivery acceptOrder(@RequestBody AcceptOrderRequest request) {
        // Create delivery
        Delivery delivery = new Delivery();
        delivery.setOrderId(request.getOrderId());
        delivery.setDelivererId(request.getDelivererId());
        delivery.setAcceptedAt(Instant.now());
        delivery.setStatus("ASSIGNED");
        
        Delivery saved = deliveryRepository.save(delivery);
        
        // Update order status in order-service
        try {
            // Using service name "order-service" via Eureka load balancer
            restTemplate.put("http://order-service/orders/" + request.getOrderId() + "/status?status=ASSIGNED", null);
        } catch (Exception e) {
            System.err.println("Failed to update status in order-service: " + e.getMessage());
            // In a real system, you might want to rollback or handle this better
        }
        
        return saved;
    }

    @PutMapping("/{id}/complete")
    public Delivery completeDelivery(@PathVariable String id) {
        Delivery delivery = deliveryRepository.findById(id).orElseThrow(() -> new RuntimeException("Delivery not found"));
        delivery.setStatus("DELIVERED");
        Delivery saved = deliveryRepository.save(delivery);

        // Update order status
        try {
            restTemplate.put("http://order-service/orders/" + delivery.getOrderId() + "/status/DELIVERED", null);
        } catch (Exception e) {
            System.err.println("Failed to update status in order-service: " + e.getMessage());
        }
        return saved;
    }

    @GetMapping("/{id}")
    public Delivery getDelivery(@PathVariable String id) {
        return deliveryRepository.findById(id).orElseThrow(() -> new RuntimeException("Delivery not found"));
    }

    @GetMapping("/order/{orderId}")
    public List<Delivery> getDeliveriesByOrder(@PathVariable String orderId) {
        return deliveryRepository.findByOrderId(orderId);
    }
    
    @GetMapping("/deliverer/{delivererId}")
    public List<Delivery> getDeliveriesByDeliverer(@PathVariable String delivererId) {
        return deliveryRepository.findByDelivererId(delivererId);
    }

    @Data
    public static class AcceptOrderRequest {
        private String orderId;
        private String delivererId;
    }
}
