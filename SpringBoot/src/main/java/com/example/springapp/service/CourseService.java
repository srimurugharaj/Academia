package com.example.springapp.service;

//import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.springapp.model.Course;
import com.example.springapp.model.Lesson; // Import Lesson class
import com.example.springapp.repository.CourseRepository;
import com.example.springapp.repository.LessonRepository; // Import LessonRepository

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepo;
    
    @Autowired
    private LessonRepository lessonRepo; // Inject LessonRepository

    public Course addCourse(Course course) {
        try {
            return courseRepo.save(course);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Course> viewAllCourse() {
        try {
            return courseRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
    public Optional<Course> findByCourseId(int id)
    {
    	try {
    	return courseRepo.findById(id);
    	}
    	catch(Exception e){
    		e.printStackTrace();
    	}
    	return null;
    }

    public String deleteById(int id) {
        try {
            courseRepo.deleteById(id);
            return "Deleted Successfully";
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    public Course updateCourse(int id, Course updateCourse) {
        Course existingCourse = courseRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        existingCourse.setImage(updateCourse.getImage());
        existingCourse.setCategory(updateCourse.getCategory());
        existingCourse.setCreatedAt(updateCourse.getCreatedAt());
        existingCourse.setEnrolledCount(updateCourse.getEnrolledCount());
        existingCourse.setLanguage(updateCourse.getLanguage());
        existingCourse.setTitle(updateCourse.getTitle());
        existingCourse.setPrice(updateCourse.getPrice());

        return courseRepo.save(existingCourse);
    }

    // Get a course with its associated lessons
    public Course getCourseWithLessons(int courseId) {
        Optional<Course> optionalCourse = courseRepo.findById(courseId);
        if (optionalCourse.isPresent()) {
            Course course = optionalCourse.get();
            List<Lesson> lessons = lessonRepo.findByCourse(course); // Fetch associated lessons
            course.setLesson(lessons); // Set lessons in the course
            return course;
        } else {
            throw new EntityNotFoundException("Course with ID " + courseId + " not found");
        }
    }
}
