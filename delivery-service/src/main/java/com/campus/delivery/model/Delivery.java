package com.campus.delivery.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "deliveries")
public class Delivery {
    @Id
    private String id;
    private String orderId;
    private String delivererId;
    private Instant acceptedAt = Instant.now();
    private String status; // ASSIGNED, IN_PROGRESS, DELIVERED, CANCELLED
}
