package com.enrollment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CourseEnrollmentApplication {

    public static void main(String[] args) {
        SpringApplication.run(CourseEnrollmentApplication.class, args);
    }
}
