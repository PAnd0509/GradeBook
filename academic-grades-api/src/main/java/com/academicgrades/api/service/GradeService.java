package com.academicgrades.api.service;

import com.academicgrades.api.dto.GradeRequest;
import com.academicgrades.api.model.Grade;
import com.academicgrades.api.model.Student;
import com.academicgrades.api.model.Subject;
import com.academicgrades.api.repository.GradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GradeService {

    private final GradeRepository gradeRepository;
    private final StudentService studentService;
    private final SubjectService subjectService;

    public Grade create(GradeRequest request) {
        Student student = studentService.findById(request.getStudentId());
        Subject subject = subjectService.findById(request.getSubjectId());

        Grade grade = new Grade();
        grade.setValue(request.getValue());
        grade.setRegistrationDate(LocalDate.now());
        grade.setStudent(student);
        grade.setSubject(subject);

        return gradeRepository.save(grade);
    }

    public List<Grade> findAll() {
        return gradeRepository.findAll();
    }

    public List<Grade> findByStudent(Long studentId) {
        return gradeRepository.findByStudentId(studentId);
    }

    public List<Grade> findBySubject(Long subjectId) {
        return gradeRepository.findBySubjectId(subjectId);
    }

    public List<Grade> findByStudentAndSubject(Long studentId, Long subjectId) {
        return gradeRepository.findByStudentIdAndSubjectId(studentId, subjectId);
    }
}