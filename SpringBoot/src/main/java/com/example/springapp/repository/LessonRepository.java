package com.example.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Course;
import com.example.springapp.model.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Integer>{

	List<Lesson> findByCourse(Course course);

}
