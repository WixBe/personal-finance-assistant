package com.ust.user_service.service;

import com.ust.user_service.entity.User;
import com.ust.user_service.exception.UserNotFoundException;
import com.ust.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user;
        } else {
            throw new UserNotFoundException("User with id: "+id+" not found");
        }
    }

    @Override
    public Optional<User> getUserByName(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return user;
        } else {
            throw new UserNotFoundException("User with name: "+username+" not found");
        }
    }

    @Override
    public Optional<User> getUserByAccountNumber(String accountNumber) {
        Optional<User> user = userRepository.findByAccountNumber(accountNumber);
        if (user.isPresent()) {
            return user;
        } else {
            throw new UserNotFoundException("User with id: "+accountNumber+" not found");
        }
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(long id, User user) {
        if (userRepository.findById(id).isPresent()) {
            user.setId(id);
            return userRepository.save(user);
        } else {
            throw new UserNotFoundException("User with id: "+id+" not found");
        }
    }

    @Override
    public void deleteUser(long id) {
        if (userRepository.findById(id).isPresent()) {
            userRepository.deleteById(id);
        } else {
            throw new UserNotFoundException("User with id: "+id+" not found");
        }
    }
}
