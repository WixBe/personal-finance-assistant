package com.ust.user_service.controller;

import com.ust.user_service.dto.LoginDto;
import com.ust.user_service.dto.UserDto;
import com.ust.user_service.entity.Role;
import com.ust.user_service.entity.User;
import com.ust.user_service.response.LoginResponse;
import com.ust.user_service.service.AuthenticationService;
import com.ust.user_service.service.JwtService;
import com.ust.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = {"http://localhost:4200"})
public class AuthenticationController {

    @Autowired
    JwtService jwtService;

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody UserDto dto) {

        User user = dto.fromDto(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        user = userService.addUser(user);
        dto = dto.toDto(user);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginDto dto) {
        User registeredUser = authenticationService.authenticate(dto);

        String jwtToken = jwtService.generateToken(registeredUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok().body(loginResponse);
    }
}
