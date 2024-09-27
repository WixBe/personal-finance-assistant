package com.ust.goals.model;


import com.ust.goals.model.Priority;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "goal")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String accountNumber;
    private String name;
    private Double value;
    private String description;
    @Enumerated(EnumType.STRING)
    private Priority priority; // Low, Medium, High

    private LocalDate startDate;
    private Integer durationInMonths;
}

