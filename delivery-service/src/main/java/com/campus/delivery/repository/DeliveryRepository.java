package com.campus.delivery.repository;

import com.campus.delivery.model.Delivery;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DeliveryRepository extends MongoRepository<Delivery, String> {
    List<Delivery> findByDelivererId(String delivererId);
    List<Delivery> findByOrderId(String orderId);
}
