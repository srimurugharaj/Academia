package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Course;

public interface CourseRepository extends JpaRepository<Course,Integer> {

}
