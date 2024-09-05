package com.ust.user_service.service;

import com.ust.user_service.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> getAllUser();

    Optional<User> getUserById(long id);

    Optional<User> getUserByName(String username);

    Optional<User> getUserByAccountNumber(String accountNumber);

    User addUser(User user);

    User updateUser(long id, User user);

    void deleteUser(long id);
}
