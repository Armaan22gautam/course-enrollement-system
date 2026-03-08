package com.enrollment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseResponse implements Serializable {
    private Long id;
    private String title;
    private String description;
    private String instructor;
    private Integer capacity;
    private Long enrolledCount;
}
