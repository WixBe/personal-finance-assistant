package com.ust.goals.controller;

import com.ust.goals.dto.GoalDto;
import com.ust.goals.exceptions.GoalNotFoundException;
import com.ust.goals.model.Goal;
import com.ust.goals.service.GoalService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goals")
@CrossOrigin(origins = "http://localhost:4200")
public class GoalController {

    private final GoalService goalService;
    private static final Logger logger = LoggerFactory.getLogger(GoalController.class);

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @PostMapping("/create")
    public ResponseEntity<Goal> createGoal(@RequestBody GoalDto goalDto) {
        Goal goal = goalService.createGoal(goalDto);
        return ResponseEntity.ok(goal);
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<String>> getGoalNotifications() {
        List<String> notifications = goalService.getGoalNotifications();
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Goal>> getAllGoals() {
        try {
            List<Goal> goals = goalService.getAllGoals();
            return ResponseEntity.ok(goals);
        } catch (Exception e) {
            // Log the exception and return a 500 response if an error occurs
            logger.error("An unexpected error occurred", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


//    @GetMapping("/all")
//    public ResponseEntity<List<Goal>> getAllGoals() {
//        List<Goal> goals = goalService.getAllGoals();
//        return ResponseEntity.ok(goals);
//    }


    @GetMapping("/{Id}")
    public ResponseEntity<Goal> getGoalById(@PathVariable Long Id) {
        Goal goal = goalService.getGoalById(Id);
        return ResponseEntity.ok(goal);
    }

    @DeleteMapping("/{Id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long Id) {
        goalService.deleteGoal(Id);
        return ResponseEntity.noContent().build();
    }
}
