package com.ust.user_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String password;

    @ElementCollection
    @CollectionTable(name = "user_account_numbers", joinColumns = @JoinColumn(name = "user_id"))
    private List<String> accountNumbers;

    public User(String username, String password, List<String> accountNumbers) {
        this.username = username;
        this.password = password;
        this.accountNumbers = accountNumbers;
    }
}
