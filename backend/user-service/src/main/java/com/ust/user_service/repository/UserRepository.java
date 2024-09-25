package com.ust.user_service.repository;

import com.ust.user_service.entity.Role;
import com.ust.user_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByRoleAndEmail(Role role, String email);

//    @Query(
//            "SELECT u FROM User u JOIN u.accountNumbers a WHERE a = :accountNumber"
//    )
    Optional<User> findByAccountNumber(String accountNumber);
}
