package com.ust.goals.dto;

import com.ust.goals.model.Priority;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GoalDto {

    private String accountNumber;

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @NotNull(message = "Value cannot be null")
    private Double value;

    private String description;

    @NotNull(message = "Priority cannot be null")
    private Priority priority; // Changed to Priority enum

    private Integer durationInMonths;
}