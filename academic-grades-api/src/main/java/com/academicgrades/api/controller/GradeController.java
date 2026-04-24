package com.academicgrades.api.controller;

import com.academicgrades.api.dto.GradeRequest;
import com.academicgrades.api.model.Grade;
import com.academicgrades.api.service.GradeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grades")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Grades", description = "Endpoints for managing grades")
public class GradeController {

    private final GradeService gradeService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Register a grade",
            description = "Registers a grade for a student in a subject."
    )
    public Grade create(@RequestBody GradeRequest request) {
        return gradeService.create(request);
    }

    @GetMapping
    @Operation(
            summary = "List all grades",
            description = "Returns all registered grades."
    )
    public List<Grade> findAll() {
        return gradeService.findAll();
    }

    @GetMapping("/student/{studentId}")
    @Operation(
            summary = "List grades by student",
            description = "Returns all grades associated with a specific student."
    )
    public List<Grade> findByStudent(@PathVariable Long studentId) {
        return gradeService.findByStudent(studentId);
    }

    @GetMapping("/subject/{subjectId}")
    @Operation(
            summary = "List grades by subject",
            description = "Returns all grades associated with a specific subject."
    )
    public List<Grade> findBySubject(@PathVariable Long subjectId) {
        return gradeService.findBySubject(subjectId);
    }

    @GetMapping("/student/{studentId}/subject/{subjectId}")
    @Operation(
            summary = "List grades by student and subject",
            description = "Returns all grades for a specific student in a specific subject."
    )
    public List<Grade> findByStudentAndSubject(
            @PathVariable Long studentId,
            @PathVariable Long subjectId
    ) {
        return gradeService.findByStudentAndSubject(studentId, subjectId);
    }
}