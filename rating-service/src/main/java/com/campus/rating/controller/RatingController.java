package com.campus.rating.controller;

import com.campus.rating.model.Rating;
import com.campus.rating.repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final RatingRepository ratingRepository;

    @PostMapping
    public Rating createRating(@RequestBody Rating rating) {
        rating.setCreatedAt(Instant.now());
        return ratingRepository.save(rating);
    }

    @GetMapping("/runner/{runnerId}")
    public Map<String, Object> getRunnerStats(@PathVariable String runnerId) {
        List<Rating> ratings = ratingRepository.findByRunnerId(runnerId);
        double avg = ratings.stream().mapToInt(Rating::getRatingValue).average().orElse(0.0);
        return Map.of(
            "runnerId", runnerId,
            "averageRating", avg,
            "count", ratings.size()
        );
    }
    
    @GetMapping("/order/{orderId}")
    public Rating getRatingByOrder(@PathVariable String orderId) {
        return ratingRepository.findByOrderId(orderId).orElse(null);
    }
}
