package com.ust.goals.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class PriorityTest {

    @Test
    public void testGetDescription() {
        assertEquals("Low Priority", Priority.LOW.getDescription());
        assertEquals("Medium Priority", Priority.MEDIUM.getDescription());
        assertEquals("High Priority", Priority.HIGH.getDescription());
    }
}
