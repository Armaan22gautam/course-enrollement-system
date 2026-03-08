package com.enrollment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentResponse {
    private Long id;
    private String studentName;
    private String studentEmail;
    private String courseTitle;
    private Long courseId;
    private LocalDateTime enrollmentDate;
}
