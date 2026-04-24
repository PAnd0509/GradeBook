package com.academicgrades.api.repository;

import com.academicgrades.api.model.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {

    List<Grade> findByStudentId(Long studentId);

    List<Grade> findBySubjectId(Long subjectId);

    List<Grade> findByStudentIdAndSubjectId(Long studentId, Long subjectId);
}