package com.ust.user_service.dto;

import com.ust.user_service.entity.LoginRequest;

public record LoginDto(
        String email,
        String password
) {

    LoginDto toDto(LoginRequest loginRequest) {
        return new LoginDto(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );
    }

    LoginRequest fromDto(LoginDto loginDto) {
        return new LoginRequest(
                loginDto.email,
                loginDto.password
        );
    }
}
