package com.ust.banking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accountNo;

    @Temporal(TemporalType.DATE)
    private Date transactionDate;

    private String transactionDetails;

    private TransactionType transactionType;
    private Double amount;
    private Double balanceAmt;

    public Transaction(Long id, String accountNo, String transactionDetails, TransactionType transactionType, Double amount) {
        this.id = id;
        this.accountNo = accountNo;
        this.transactionDetails = transactionDetails;
        this.transactionType = transactionType;
        this.amount = amount;
    }
}
