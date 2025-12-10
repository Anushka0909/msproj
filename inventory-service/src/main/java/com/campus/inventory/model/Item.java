package com.campus.inventory.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "items")
public class Item {
    @Id
    private String id;
    private String name;
    private String category;
    private String storeName;
    private double price;
    private boolean available;
}
