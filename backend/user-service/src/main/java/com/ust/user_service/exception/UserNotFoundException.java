package com.ust.user_service.exception;

public class UserNotFoundException extends RuntimeException  {
    public UserNotFoundException(String s) {
        super(s);
    }
}
