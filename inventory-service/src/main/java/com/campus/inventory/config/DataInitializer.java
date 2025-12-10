package com.campus.inventory.config;

import com.campus.inventory.model.Item;
import com.campus.inventory.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ItemRepository itemRepository;

    @Override
    public void run(String... args) throws Exception {
        if (itemRepository.count() == 0) {
            itemRepository.save(new Item(null, "Veg Burger", "Food", "Campus Cafe", 50.0, true));
            itemRepository.save(new Item(null, "Cold Coffee", "Food", "Campus Cafe", 80.0, true));
            itemRepository.save(new Item(null, "A4 Notebook", "Stationery", "Xerox Shop", 40.0, true));
            itemRepository.save(new Item(null, "Ball Pen", "Stationery", "Xerox Shop", 10.0, true));
            System.out.println("Sample items initialized.");
        }
    }
}
