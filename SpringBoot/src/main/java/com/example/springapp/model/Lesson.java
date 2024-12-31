package com.example.springapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Lesson {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String image;
	private String title;
	private String description;
	
	 @Column(length = 1000)
	private String content1;
	 
	 @Column(columnDefinition = "TEXT")
	private String content2;
	 
	private String keyFeature1;
	private String keyFeature2;
	private String keyFeature3;
	private String topic1;
	private String topic2;
	private String topic3;
	private String topic4;
	private String topic5;
	private String topic6;
	
	@ManyToOne
	@JoinColumn(name="course_id")
	@JsonBackReference
	private Course course;
	
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
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getContent1() {
		return content1;
	}
	public void setContent1(String content1) {
		this.content1 = content1;
	}
	public String getContent2() {
		return content2;
	}
	public void setContent2(String content2) {
		this.content2 = content2;
	}
	public String getKeyFeature1() {
		return keyFeature1;
	}
	public void setKeyFeature1(String keyFeature1) {
		this.keyFeature1 = keyFeature1;
	}
	public String getKeyFeature2() {
		return keyFeature2;
	}
	public void setKeyFeature2(String keyFeature2) {
		this.keyFeature2 = keyFeature2;
	}
	public String getKeyFeature3() {
		return keyFeature3;
	}
	public void setKeyFeature3(String keyFeature3) {
		this.keyFeature3 = keyFeature3;
	}
	public String getTopic1() {
		return topic1;
	}
	public void setTopic1(String topic1) {
		this.topic1 = topic1;
	}
	public String getTopic2() {
		return topic2;
	}
	public void setTopic2(String topic2) {
		this.topic2 = topic2;
	}
	public String getTopic3() {
		return topic3;
	}
	public void setTopic3(String topic3) {
		this.topic3 = topic3;
	}
	public String getTopic4() {
		return topic4;
	}
	public void setTopic4(String topic4) {
		this.topic4 = topic4;
	}
	public String getTopic5() {
		return topic5;
	}
	public void setTopic5(String topic5) {
		this.topic5 = topic5;
	}
	public String getTopic6() {
		return topic6;
	}
	public void setTopic6(String topic6) {
		this.topic6 = topic6;
	}
	
	public Course getCourse() {
		return course;
	}
	public void setCourse(Course course) {
		this.course = course;
	}
	
	public Lesson(int id, String image, String title, String description, String content1, String content2,
			String keyFeature1, String keyFeature2, String keyFeature3, String topic1, String topic2, String topic3,
			String topic4, String topic5, String topic6) {
		super();
		this.id = id;
		this.image = image;
		this.title = title;
		this.description = description;
		this.content1 = content1;
		this.content2 = content2;
		this.keyFeature1 = keyFeature1;
		this.keyFeature2 = keyFeature2;
		this.keyFeature3 = keyFeature3;
		this.topic1 = topic1;
		this.topic2 = topic2;
		this.topic3 = topic3;
		this.topic4 = topic4;
		this.topic5 = topic5;
		this.topic6 = topic6;
	}
	public Lesson() {
		super();
	}
	
}
