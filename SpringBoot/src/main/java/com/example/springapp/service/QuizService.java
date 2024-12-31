package com.example.springapp.service;

import java.util.*;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Question;
import com.example.springapp.model.QuestionWrapper;
import com.example.springapp.model.Quiz;
import com.example.springapp.model.Response;
import com.example.springapp.repository.QuestionRepository;
import com.example.springapp.repository.QuizRepository;

@Service
public class QuizService {
	
	@Autowired
	QuizRepository quizRepository;
	@Autowired
	QuestionRepository questionRepository;

	public ResponseEntity<Quiz> createQuiz(String category, int num, String title)
	{
		List<Question> ques= questionRepository.findRandomQuesByCategory(category,num);
		
		Quiz quiz=new Quiz();
		quiz.setTitle(title);
		quiz.setQuestions(ques);
		quizRepository.save(quiz);
		return new ResponseEntity<>(quiz,HttpStatus.CREATED);
	}
	
	 public List<Quiz> getAllQuizzes() {
	        return quizRepository.findAll();
	    }
	
	public ResponseEntity<List<QuestionWrapper>> getQuiz(int id)
	{
		Optional<Quiz> quiz=quizRepository.findById(id);
		List<Question> quesFromDb= quiz.get().getQuestions();
		List<QuestionWrapper> quesForUser=new ArrayList<>();
		for(Question q: quesFromDb)
		{
			QuestionWrapper qw=new QuestionWrapper(q.getId(),q.getCategory(),q.getQuestion(),q.getOption1(),q.getOption2(),q.getOption3(),q.getOption4());
			quesForUser.add(qw);
		}
		
		return new ResponseEntity<>(quesForUser,HttpStatus.OK);
	}
	
	public ResponseEntity<Integer> calculateRes(int id, List<Response> responses)
	{
		Quiz quiz=quizRepository.findById(id).get();
		List<Question> questions=quiz.getQuestions();
		
		int rightAns=0;
		int i=0;
		for( Response response :responses)
		{
			if(response.getResponse().equals(questions.get(i).getAnswer()))
			{
				rightAns++;
			}
			i++;
		}
		return new ResponseEntity<>(rightAns,HttpStatus.OK);
	}
	
}
