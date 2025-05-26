package com.example.hmcts;

import com.example.hmcts.entity.Task;
import com.example.hmcts.service.TaskService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
public class TaskServiceTests {

    @Autowired
    private TaskService service;

    @Test
    public void testCreateAndGetTask() {
        Task task = new Task();
        task.setTitle("Test Task");
        task.setStatus("Pending");
        task.setDueDate(LocalDateTime.now().plusDays(1));

        Task saved = service.create(task);
        Assertions.assertNotNull(service.get(saved.getId()));
    }
}

