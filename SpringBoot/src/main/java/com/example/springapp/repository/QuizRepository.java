package com.example.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springapp.model.Quiz;

public interface QuizRepository extends JpaRepository<Quiz,Integer> {


}
