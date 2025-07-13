package com.meeapp.service;

import com.meeapp.entity.User;
import com.meeapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> searchUsers(String query) {
        return userRepository.searchUsers(query);
    }

    public User updateUser(Long userId, User userUpdate) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (userUpdate.getFirstName() != null) {
            user.setFirstName(userUpdate.getFirstName());
        }
        if (userUpdate.getLastName() != null) {
            user.setLastName(userUpdate.getLastName());
        }
        if (userUpdate.getBio() != null) {
            user.setBio(userUpdate.getBio());
        }
        if (userUpdate.getLocation() != null) {
            user.setLocation(userUpdate.getLocation());
        }
        if (userUpdate.getProfileImageUrl() != null) {
            user.setProfileImageUrl(userUpdate.getProfileImageUrl());
        }

        return userRepository.save(user);
    }
}