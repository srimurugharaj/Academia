package com.example.springapp.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.model.QuestionWrapper;
import com.example.springapp.model.Quiz;
import com.example.springapp.model.Response;
import com.example.springapp.service.QuizService;

@RestController
@RequestMapping("/quiz")
public class QuizController {

	@Autowired
	QuizService quizService;
	
	@CrossOrigin("http://localhost:3000/")
	@PostMapping("create")
	public ResponseEntity<Quiz> createQuiz(@RequestParam String category, @RequestParam int num, @RequestParam String title)
	{
		return quizService.createQuiz(category, num, title);
	}
	
	@CrossOrigin("http://localhost:3000/")
	@GetMapping("getQuiz/{id}")
	public ResponseEntity<List<QuestionWrapper>> getQues(@PathVariable int id)
	{
		return quizService.getQuiz(id);
	}
	
	@CrossOrigin("http://localhost:3000/")
	@GetMapping("getallQuiz")
	public List<Quiz> getall(){
		return quizService.getAllQuizzes();
	}
	@CrossOrigin("http://localhost:3000/")
	@PostMapping("submit/{id}")
	public ResponseEntity<Integer> calculateRes(@PathVariable int id,@RequestBody List<Response> responses  )
	{
		return quizService.calculateRes(id, responses);
	}
}
