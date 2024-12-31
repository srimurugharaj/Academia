package com.example.springapp.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

//import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Enrollment {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
//	@JsonBackReference
	@JoinColumn(name="user_id")
	private UserInfo user;
	
	@ManyToOne
//	@JsonBackReference
	@JoinColumn(name="course_id")
	private Course course;
	
	private LocalDateTime EnrolledAt;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public UserInfo getUser() {
		return user;
	}

	public void setUser(UserInfo user) {
		this.user = user;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}
	
	

	public LocalDateTime getEnrolledAt() {
		return EnrolledAt;
	}

	public void setEnrolledAt(LocalDateTime enrolledAt) {
		EnrolledAt = enrolledAt;
	}

	public Enrollment(int id, UserInfo user, Course course, LocalDateTime enrolledAt) {
		super();
		this.id = id;
		this.user = user;
		this.course = course;
		EnrolledAt = enrolledAt;
	}

	public Enrollment() {
		super();
	}
}
