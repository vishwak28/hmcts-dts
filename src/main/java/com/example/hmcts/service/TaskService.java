package com.example.hmcts.service;

import com.example.hmcts.entity.Task;
import com.example.hmcts.repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepo repository;

    public Task create(Task task) {
        return repository.save(task);
    }

    public Task get(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public List<Task> getAll() {
        return repository.findAll();
    }

    public Task updateStatus(Long id, String status) {
        Task task = get(id);
        task.setStatus(status);
        return repository.save(task);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

