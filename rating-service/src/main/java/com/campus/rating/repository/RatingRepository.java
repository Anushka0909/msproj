package com.campus.rating.repository;

import com.campus.rating.model.Rating;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface RatingRepository extends MongoRepository<Rating, String> {
    List<Rating> findByRunnerId(String runnerId);
    Optional<Rating> findByOrderId(String orderId);
}
