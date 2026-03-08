package com.enrollment.service;

import com.enrollment.dto.CourseRequest;
import com.enrollment.dto.CourseResponse;
import com.enrollment.entity.Course;
import com.enrollment.exception.ResourceNotFoundException;
import com.enrollment.repository.CourseRepository;
import com.enrollment.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    @Cacheable(value = "courses")
    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        return mapToResponse(course);
    }

    @CacheEvict(value = "courses", allEntries = true)
    public CourseResponse createCourse(CourseRequest request) {
        Course course = Course.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .instructor(request.getInstructor())
                .capacity(request.getCapacity())
                .build();
        course = courseRepository.save(course);
        return mapToResponse(course);
    }

    @CacheEvict(value = "courses", allEntries = true)
    public CourseResponse updateCourse(Long id, CourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setInstructor(request.getInstructor());
        course.setCapacity(request.getCapacity());

        course = courseRepository.save(course);
        return mapToResponse(course);
    }

    @CacheEvict(value = "courses", allEntries = true)
    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Course not found with id: " + id);
        }
        courseRepository.deleteById(id);
    }

    private CourseResponse mapToResponse(Course course) {
        long enrolledCount = enrollmentRepository.countByCourseId(course.getId());
        return CourseResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .instructor(course.getInstructor())
                .capacity(course.getCapacity())
                .enrolledCount(enrolledCount)
                .build();
    }
}
