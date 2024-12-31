package com.example.springapp.service;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Course;
import com.example.springapp.model.Lesson;
import com.example.springapp.repository.CourseRepository;
import com.example.springapp.repository.LessonRepository;

@Service
public class LessonService {

	@Autowired
	private CourseRepository courseRepo;
	@Autowired
	private LessonRepository lessonRepo;
	
	public Lesson addLesson(int course_id, Lesson lesson)
	{
		Optional<Course> optionalCourse=courseRepo.findById(course_id);
		if(optionalCourse.isPresent())
		{
			Course course=optionalCourse.get();
			lesson.setCourse(course);
			return lessonRepo.save(lesson);
		}
		else {
            throw new IllegalArgumentException("Course with ID " + course_id + " not found");
        }
	}
	
	public Lesson updateLesson(int id, Lesson updateLesson) {
	    Lesson existingLesson = lessonRepo.findById(id)
	            .orElseThrow(() -> new EntityNotFoundException("Lesson not found"));

	    existingLesson.setImage(updateLesson.getImage());
	    existingLesson.setTitle(updateLesson.getTitle());
	    existingLesson.setDescription(updateLesson.getDescription());
	    existingLesson.setContent1(updateLesson.getContent1());
	    existingLesson.setContent2(updateLesson.getContent2());
	    existingLesson.setKeyFeature1(updateLesson.getKeyFeature1());
	    existingLesson.setKeyFeature2(updateLesson.getKeyFeature2());
	    existingLesson.setKeyFeature3(updateLesson.getKeyFeature3());
	    existingLesson.setTopic1(updateLesson.getTopic1());
	    existingLesson.setTopic2(updateLesson.getTopic2());
	    existingLesson.setTopic3(updateLesson.getTopic3());
	    existingLesson.setTopic4(updateLesson.getTopic4());
	    existingLesson.setTopic5(updateLesson.getTopic5());
	    existingLesson.setTopic6(updateLesson.getTopic6());

	    return lessonRepo.save(existingLesson);
	}
	
	public String deleteLessonById(int id)
	{
		lessonRepo.deleteById(id);
		return "Lesson Deleted Successfully";
	}

	
}
