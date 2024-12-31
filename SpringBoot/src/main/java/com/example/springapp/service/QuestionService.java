package com.example.springapp.service;

//import java.util.ArrayList;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Question;
import com.example.springapp.repository.QuestionRepository;

@Service
public class QuestionService {

	@Autowired
	QuestionRepository questionRepository;
	
	
	public ResponseEntity<String> addQues(Question question) 
	{
		try
		{
	    questionRepository.save(question);
	    return new ResponseEntity<>( "success",HttpStatus.CREATED);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return new ResponseEntity<>("",HttpStatus.BAD_REQUEST);
	}
	
	public ResponseEntity<List<Question>> getAllQuestions()
	{
		try
		{
		return new ResponseEntity<>(questionRepository.findAll(),HttpStatus.OK);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<List<Question>> getQuestionByCategory(String category) 
	{
		try
		{
		return new ResponseEntity<>(questionRepository.findByCategory(category),HttpStatus.OK);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST); 
		
	}

	public ResponseEntity<String> deletebyId(int id)
	{
		questionRepository.deleteById(id);
		return new ResponseEntity<>("Deleted",HttpStatus.OK);
	}

	
}
