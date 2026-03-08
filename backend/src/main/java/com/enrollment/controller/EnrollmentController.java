package com.enrollment.controller;

import com.enrollment.dto.EnrollmentResponse;
import com.enrollment.service.EnrollmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Enrollments", description = "Enrollment management")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping("/api/enroll/{courseId}")
    @Operation(summary = "Enroll in a course (Student only)")
    public ResponseEntity<EnrollmentResponse> enroll(@PathVariable Long courseId,
            Authentication authentication) {
        return ResponseEntity.ok(enrollmentService.enroll(authentication.getName(), courseId));
    }

    @GetMapping("/api/enrollments/my")
    @Operation(summary = "Get my enrollments (Student only)")
    public ResponseEntity<List<EnrollmentResponse>> getMyEnrollments(Authentication authentication) {
        return ResponseEntity.ok(enrollmentService.getMyEnrollments(authentication.getName()));
    }

    @GetMapping("/api/enrollments")
    @Operation(summary = "Get all enrollments (Admin only)")
    public ResponseEntity<List<EnrollmentResponse>> getAllEnrollments() {
        return ResponseEntity.ok(enrollmentService.getAllEnrollments());
    }
}
