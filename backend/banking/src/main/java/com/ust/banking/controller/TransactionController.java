package com.ust.banking.controller;

import com.ust.banking.model.Transaction;
import com.ust.banking.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/{accountNo}")
    public List<Transaction> getTransactions(@PathVariable String accountNo) {
        return transactionService.getTransactions(accountNo);
    }

    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return transactionService.addTransaction(transaction);
    }
}
