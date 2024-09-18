package com.ust.user_service.controller;

import com.ust.user_service.dto.UserDto;
import com.ust.user_service.entity.User;
import com.ust.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok().body(userService.getAllUser());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable("id") long id) {

        return ResponseEntity.ok().body(userService.getUserById(id));
    }

    @GetMapping("/email")
    public ResponseEntity<Optional<User>> getUserByUsername(@RequestParam("EMAIL") String email) {

        return ResponseEntity.ok().body(userService.getUserByEmail(email));
    }

    @GetMapping("/accountNumber")
    public ResponseEntity<Optional<User>> getUserByAccountNumber(@RequestParam("ACCOUNT-NUMBER") String accountNumber) {

        return ResponseEntity.ok().body(userService.getUserByAccountNumber(accountNumber));
    }

    @PostMapping("/")
    public ResponseEntity<UserDto> registerUser(@RequestBody UserDto dto) {

        User user = dto.fromDto(dto);
        user = userService.addUser(user);
        dto = dto.toDto(user);
        return ResponseEntity.ok().body(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable long id, @RequestBody UserDto dto) {

        User user = dto.fromDto(dto);
        user = userService.updateUser(id, user);
        dto = dto.toDto(user);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id ) {

        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
