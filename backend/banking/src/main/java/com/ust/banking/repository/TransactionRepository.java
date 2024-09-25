package com.ust.banking.repository;

import com.ust.banking.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

//    @Query("SELECT t FROM Transaction t WHERE t.accountNo = ?1")
    List<Transaction> findAllByAccountNo(String accountNo);
}
