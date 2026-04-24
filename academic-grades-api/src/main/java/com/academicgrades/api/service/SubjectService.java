package com.academicgrades.api.service;

import com.academicgrades.api.exception.ResourceNotFoundException;
import com.academicgrades.api.model.Subject;
import com.academicgrades.api.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;

    public Subject create(Subject subject) {
        return subjectRepository.save(subject);
    }

    public List<Subject> findAll() {
        return subjectRepository.findAll();
    }

    public Subject findById(Long id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + id));
    }

    public Subject update(Long id, Subject subjectData) {
        Subject subject = findById(id);

        subject.setName(subjectData.getName());
        subject.setCode(subjectData.getCode());
        subject.setCredits(subjectData.getCredits());

        return subjectRepository.save(subject);
    }

    public void delete(Long id) {
        Subject subject = findById(id);
        subjectRepository.delete(subject);
    }
}