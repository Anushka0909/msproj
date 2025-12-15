package com.campus.user.controller;

import com.campus.user.dto.UserResponse;
import com.campus.user.model.User;
import com.campus.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @PostMapping
    public UserResponse createUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return UserResponse.fromUser(savedUser);
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable String id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return UserResponse.fromUser(user);
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
            .map(UserResponse::fromUser)
            .collect(Collectors.toList());
    }

    @GetMapping("/role/{role}")
    public List<UserResponse> getUsersByRole(@PathVariable String role) {
        return userRepository.findByRole(role).stream()
            .map(UserResponse::fromUser)
            .collect(Collectors.toList());
    }
}
