package com.campus.inventory.controller;

import com.campus.inventory.model.Item;
import com.campus.inventory.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemRepository itemRepository;

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/{id}")
    public Item getItem(@PathVariable String id) {
        return itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
    }

    @GetMapping("/category/{category}")
    public List<Item> getItemsByCategory(@PathVariable String category) {
        return itemRepository.findByCategory(category);
    }
}
