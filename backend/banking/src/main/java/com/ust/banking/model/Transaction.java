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
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "AccountNo")
    private String accountNo;

    @Column(name = "TransactionDate")
    @Temporal(TemporalType.DATE)
    private Date transactionDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "TransactionType")
    private TransactionType transactionType;

    @Column(name = "TransactionDetails")
    private String transactionDetails;

    @Column(name = "Amount")
    private Double amount;

    @Column(name = "BalanceAmount")
    private Double balanceAmt;

    public Transaction(String accountNo,TransactionType transactionType, String transactionDetails, Double amount) {
        this.accountNo = accountNo;
        this.transactionType = transactionType;
        this.transactionDetails = transactionDetails;
        this.amount = amount;
    }
}
