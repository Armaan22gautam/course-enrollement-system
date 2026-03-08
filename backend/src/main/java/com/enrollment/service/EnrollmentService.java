package com.enrollment.service;

import com.enrollment.dto.EnrollmentResponse;
import com.enrollment.entity.Course;
import com.enrollment.entity.Enrollment;
import com.enrollment.entity.User;
import com.enrollment.exception.BadRequestException;
import com.enrollment.exception.ResourceNotFoundException;
import com.enrollment.repository.CourseRepository;
import com.enrollment.repository.EnrollmentRepository;
import com.enrollment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @Transactional
    @CacheEvict(value = "courses", allEntries = true)
    public EnrollmentResponse enroll(String userEmail, Long courseId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        if (enrollmentRepository.existsByUserIdAndCourseId(user.getId(), courseId)) {
            throw new BadRequestException("You are already enrolled in this course");
        }

        long currentEnrollments = enrollmentRepository.countByCourseId(courseId);
        if (currentEnrollments >= course.getCapacity()) {
            throw new BadRequestException("Course is full. Capacity: " + course.getCapacity());
        }

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .build();

        enrollment = enrollmentRepository.save(enrollment);
        return mapToResponse(enrollment);
    }

    public List<EnrollmentResponse> getMyEnrollments(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return enrollmentRepository.findByUserId(user.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<EnrollmentResponse> getAllEnrollments() {
        return enrollmentRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private EnrollmentResponse mapToResponse(Enrollment enrollment) {
        return EnrollmentResponse.builder()
                .id(enrollment.getId())
                .studentName(enrollment.getUser().getName())
                .studentEmail(enrollment.getUser().getEmail())
                .courseTitle(enrollment.getCourse().getTitle())
                .courseId(enrollment.getCourse().getId())
                .enrollmentDate(enrollment.getEnrollmentDate())
                .build();
    }
}
