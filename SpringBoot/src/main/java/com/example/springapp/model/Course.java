package com.example.springapp.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Course {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String image;
	private String category;
	private String title;
	private String createdAt;
	private String language;
	private String enrolledCount;
	private String price;
	
	@OneToMany(cascade= CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
//	@JoinColumn(name="lesson_id")
	@JsonManagedReference
	private List<Lesson> lesson;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getEnrolledCount() {
		return enrolledCount;
	}
	public void setEnrolledCount(String enrolledCount) {
		this.enrolledCount = enrolledCount;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	
	public List<Lesson> getLesson() {
		return lesson;
	}
	public void setLesson(List<Lesson> lesson) {
		this.lesson = lesson;
	}
	
	public Course(int id, String image, String category, String title, String createdAt, String language,
			String enrolledCount, String price) {
		super();
		this.id = id;
		this.image = image;
		this.category = category;
		this.title = title;
		this.createdAt = createdAt;
		this.language = language;
		this.enrolledCount = enrolledCount;
		this.price = price;
	}
	public Course() {
		super();
	}
	 
}
