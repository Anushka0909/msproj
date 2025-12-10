package com.campus.order.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private String userId;
    private String itemId;
    private String pickupLocation;
    private String dropLocation;
    private double priceOffered;
    private String status; // OPEN, ASSIGNED, COMPLETED, CANCELLED
    private Instant createdAt = Instant.now();
    
    // For updating status
    public void setStatus(String status) {
        this.status = status;
    }
}
