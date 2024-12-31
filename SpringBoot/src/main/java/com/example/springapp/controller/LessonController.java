package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.model.Lesson;
import com.example.springapp.service.LessonService;

@RestController
@RequestMapping("/lesson")
public class LessonController {
	
	@Autowired
	private LessonService lessonService;
	
	@PostMapping("/addLesson/{course_id}")
	public ResponseEntity<Lesson> createLesson(@PathVariable int course_id, @RequestBody Lesson lesson)
	{
		Lesson createdLesson=lessonService.addLesson(course_id, lesson);
		return new ResponseEntity<>(createdLesson,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/deleteLesson/{course_id}/{id}")
	public ResponseEntity<String> deleteLessonById(@PathVariable int id)
	{
		lessonService.deleteLessonById(id);
		return new ResponseEntity<>("Lesson Deleted Successfully",HttpStatus.OK);
	}
	
	@PutMapping("/updateLesson/{course-id}/{id}")
	public ResponseEntity<Lesson> updateLessonById(@PathVariable int id, @RequestBody Lesson lesson)
	{
		Lesson updatedLesson=lessonService.updateLesson(id, lesson);
		return new ResponseEntity<>(updatedLesson,HttpStatus.OK);
	}

}
