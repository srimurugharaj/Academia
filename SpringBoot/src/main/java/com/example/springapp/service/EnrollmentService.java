package com.example.springapp.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Course;
import com.example.springapp.model.Enrollment;
import com.example.springapp.model.UserInfo;
import com.example.springapp.repository.CourseRepository;
import com.example.springapp.repository.EnrollmentRepository;
import com.example.springapp.repository.UserInfoRepository;

@Service
public class EnrollmentService {
	
	@Autowired
	private EnrollmentRepository enrollmentRepo;
	@Autowired
	private UserInfoRepository userInfoRepo;
	@Autowired 
	private CourseRepository courseRepo;
	
	public Enrollment createEnrollment(int user_id, int course_id, Enrollment enrollment)
	{
		Optional<UserInfo> userinfo= userInfoRepo.findById(user_id);
		Optional<Course> courseinfo=courseRepo.findById(course_id);
		
		if(userinfo.isPresent() && courseinfo.isPresent())
		{
			enrollment.setUser(userinfo.get());
		    enrollment.setCourse(courseinfo.get());
			return enrollmentRepo.save(enrollment);
		}
		else
		{
	        throw new IllegalArgumentException("Not found");
	    }
	}
	
//	public Enrollment getEnrollment(int user_id) {
//	    List<Enrollment> enrollment = enrollmentRepo.findById(user_id);
//	    
//	    if (enrollment.isPresent()) {
//	        return enrollment.get(); // Return the enrollment if found
//	    } else {
//	        throw new EntityNotFoundException("Enrollment not found for user with ID " + user_id);
//	    }
//	}

	public List<Enrollment> getEnrollment(int userId)
	{
		List<Enrollment> enrollment= enrollmentRepo.findByUserId(userId);
		 if (enrollment != null) {
			 return enrollment;
		 }
		 else {
			 throw new EntityNotFoundException("Enrollment not found for user with ID " + userId);
		 }
	}
	
	public String deleteEnrollmentById(int id)
	{
		enrollmentRepo.deleteById(id);
		return (id+" deleted Successfully");
	}
	
	public List<Enrollment> findAllEnrollment()
	{
		return enrollmentRepo.findAll();
	}
}
