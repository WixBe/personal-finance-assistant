package com.ust.user_service.dto;

import com.ust.user_service.entity.Role;
import com.ust.user_service.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import org.springframework.security.core.parameters.P;

import java.sql.Timestamp;
import java.util.List;

public record UserDto(
        long id,

        String email,
        String password,
        String firstName,
        String lastName,
        String phone,
        Role role,
        Timestamp createdAt,
        Timestamp updatedAt,
        List<String> accountNumbers
) {

    public UserDto toDto(User user) {

        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhone(),
                user.getRole(),
                user.getCreatedAt(),
                user.getUpdatedAt(),
                user.getAccountNumbers()
        );
    }

    public User fromDto(UserDto dto) {
        return new User(
                dto.email,
                dto.password,
                dto.firstName,
                dto.lastName,
                dto.phone,
                dto.role,
                dto.accountNumbers
        );
    }
}
