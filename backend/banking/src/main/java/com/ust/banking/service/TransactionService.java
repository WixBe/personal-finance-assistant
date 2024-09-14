package com.ust.banking.service;

import com.ust.banking.model.Account;
import com.ust.banking.model.Transaction;
import com.ust.banking.model.TransactionType;
import com.ust.banking.repository.AccountRepository;
import com.ust.banking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    public List<Transaction> getTransactions(String accountNo) {
        return transactionRepository.findByAccountNo(accountNo);
    }

    public Transaction addTransaction(Transaction transaction) {
        if (transaction.getTransactionType() == TransactionType.WITHDRAW) {
            Account account = accountRepository.findByAccountNumber(transaction.getAccountNo());
            account.setAccountBalance(account.getAccountBalance() - transaction.getAmount());
            accountRepository.saveAndFlush(account);
            transaction.setBalanceAmt(account.getAccountBalance());
            transaction.setTransactionDate(new Date());
            transactionRepository.saveAndFlush(transaction);
        } else {
            Account account = accountRepository.findByAccountNumber(transaction.getAccountNo());
            account.setAccountBalance(account.getAccountBalance() + transaction.getAmount());
            accountRepository.saveAndFlush(account);
            transaction.setBalanceAmt(account.getAccountBalance());
            transaction.setTransactionDate(new Date());
            transactionRepository.saveAndFlush(transaction);
        }
        return transactionRepository.save(transaction);
    }
}
