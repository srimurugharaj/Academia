package com.example.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

	List<Enrollment> findByUserId(int user_id);

}
