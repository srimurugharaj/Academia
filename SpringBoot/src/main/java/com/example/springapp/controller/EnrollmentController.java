package com.example.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.model.Enrollment;
import com.example.springapp.service.EnrollmentService;

@RestController
@RequestMapping("/enrollment")
public class EnrollmentController {

	@Autowired
	private EnrollmentService enrollmentService;
	
	@PostMapping("/addEnroll/{user_id}/{course_id}")
	public Enrollment enroll(@PathVariable int user_id,@PathVariable int course_id, @RequestBody Enrollment enrollment)
	{
		return enrollmentService.createEnrollment(user_id, course_id, enrollment);
	}
	
	@GetMapping("/getEnrolled/{user_id}")
	public List<Enrollment> enrolled(@PathVariable int user_id)
	{
		return enrollmentService.getEnrollment(user_id);
	}
	
	@DeleteMapping("/deleteEnroll/{id}")
	public String unEnroll(@PathVariable int id)
	{
		return enrollmentService.deleteEnrollmentById(id);
	}
	
	@GetMapping("/allEnrollments")
	public List<Enrollment> findAll()
	{
		return enrollmentService.findAllEnrollment();
	}

}
