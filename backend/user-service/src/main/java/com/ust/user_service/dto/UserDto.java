package com.ust.user_service.dto;

import com.ust.user_service.entity.User;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

import java.util.List;

public record UserDto(
        long id,

        @NotEmpty(message = "Username cannot be empty")
        @Pattern(regexp = "^[A-Z] *[A-Za-z]*$", message = "Invalid character: Name can only have alphabets")
        String username,

        @NotEmpty(message = "Password cannot be empty")
        String password,

        @NotEmpty(message = "Account numbers cannot be empty")
        List<String> accountNumbers
) {

    public UserDto toDto(User user) {

        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getAccountNumbers()
        );
    }

    public User fromDto(UserDto dto) {
        return new User(
                dto.username,
                dto.password,
                dto.accountNumbers
        );
    }
}
