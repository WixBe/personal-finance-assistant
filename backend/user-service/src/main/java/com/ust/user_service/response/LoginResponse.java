package com.ust.user_service.response;

import lombok.Data;

@Data
public class LoginResponse {

    private String token;
    private long expiresIn;
}
