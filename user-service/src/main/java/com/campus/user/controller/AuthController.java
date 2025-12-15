package com.campus.user.controller;

import com.campus.user.dto.UserResponse;
import com.campus.user.model.User;
import com.campus.user.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    @PostMapping("/register")
    public UserResponse register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        User savedUser = userRepository.save(user);
        return UserResponse.fromUser(savedUser);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return Map.of(
            "userId", user.getId(),
            "role", user.getRole(),
            "name", user.getName()
        );
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }
}
