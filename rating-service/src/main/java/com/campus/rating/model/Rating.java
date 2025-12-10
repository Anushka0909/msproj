package com.campus.rating.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "ratings")
public class Rating {
    @Id
    private String id;
    private String orderId;
    private String userId;      // The one giving the rating
    private String runnerId;    // The one being rated
    private int ratingValue;    // 1-5
    private String comments;
    private Instant createdAt = Instant.now();
}
