package com.example.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.model.Course;
import com.example.springapp.service.CourseService;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping("/addCourse")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        try {
            Course createdCourse = courseService.addCourse(course);
            return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/viewCourse")
    public ResponseEntity<List<Course>> getAllCourse() {
        List<Course> courses = courseService.viewAllCourse();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }
    
    @GetMapping("/viewCourseById/{id}")
    public Optional<Course> getCourseById(@PathVariable int id)
    {
    	return courseService.findByCourseId(id);
    }

    @DeleteMapping("/deleteCourse/{id}")
    public ResponseEntity<String> deleteCourseById(@PathVariable int id) {
        courseService.deleteById(id);
        return new ResponseEntity<>("Course Deleted", HttpStatus.OK);
    }

    @PutMapping("/updateCourse/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable int id, @RequestBody Course updateCourse) {
        Course updated = courseService.updateCourse(id, updateCourse);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    // New endpoint to get a course with its associated lessons
    @GetMapping("/courseWithLessons/{id}")
    public ResponseEntity<Course> getCourseWithLessons(@PathVariable int id) {
        Course courseWithLessons = courseService.getCourseWithLessons(id);
        return new ResponseEntity<>(courseWithLessons, HttpStatus.OK);
    }
}
