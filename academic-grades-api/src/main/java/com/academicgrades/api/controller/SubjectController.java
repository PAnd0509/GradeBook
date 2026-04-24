package com.academicgrades.api.controller;

import com.academicgrades.api.model.Subject;
import com.academicgrades.api.service.SubjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Subjects", description = "Endpoints for managing subjects")
public class SubjectController {

    private final SubjectService subjectService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Create a subject",
            description = "Creates a new subject in the system."
    )
    public Subject create(@RequestBody Subject subject) {
        return subjectService.create(subject);
    }

    @GetMapping
    @Operation(
            summary = "List all subjects",
            description = "Returns all registered subjects."
    )
    public List<Subject> findAll() {
        return subjectService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Get subject by ID",
            description = "Returns a single subject using its ID."
    )
    public Subject findById(@PathVariable Long id) {
        return subjectService.findById(id);
    }

    @PutMapping("/{id}")
    @Operation(
            summary = "Update subject",
            description = "Updates an existing subject using its ID."
    )
    public Subject update(@PathVariable Long id, @RequestBody Subject subject) {
        return subjectService.update(id, subject);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
            summary = "Delete subject",
            description = "Deletes an existing subject using its ID."
    )
    public void delete(@PathVariable Long id) {
        subjectService.delete(id);
    }
}