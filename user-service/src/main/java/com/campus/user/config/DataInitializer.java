package com.campus.user.config;

import com.campus.user.model.User;
import com.campus.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            userRepository.save(new User(null, "Anushka", "anu@example.com", "9999999999", "password123", "USER", "Block A"));
            userRepository.save(new User(null, "Rahul", "rahul@example.com", "8888888888", "password123", "RUNNER", "Block B"));
            userRepository.save(new User(null, "Priya", "priya@example.com", "7777777777", "password123", "USER", "Block C"));
            System.out.println("Sample users initialized.");
        }
    }
}
