package com.ust.banking.repository;

import com.ust.banking.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, String> {

    Account findByAccountNumber(String accountNumber);
}
