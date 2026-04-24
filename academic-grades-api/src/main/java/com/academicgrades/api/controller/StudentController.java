package com.academicgrades.api.controller;

import com.academicgrades.api.model.Student;
import com.academicgrades.api.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Students", description = "Endpoints for managing students")
public class StudentController {

    private final StudentService studentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Create a student",
            description = "Creates a new student in the system."
    )
    public Student create(@Valid @RequestBody Student student) {
        return studentService.create(student);
    }

    @GetMapping
    @Operation(
            summary = "List all students",
            description = "Returns all registered students."
    )
    public List<Student> findAll() {
        return studentService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Get student by ID",
            description = "Returns a single student using its ID."
    )
    public Student findById(@PathVariable Long id) {
        return studentService.findById(id);
    }

    @PutMapping("/{id}")
    @Operation(
            summary = "Update student",
            description = "Updates an existing student using its ID."
    )
    public Student update(@PathVariable Long id, @Valid @RequestBody Student student) {
        return studentService.update(id, student);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
            summary = "Delete student",
            description = "Deletes an existing student using its ID."
    )
    public void delete(@PathVariable Long id) {
        studentService.delete(id);
    }
}