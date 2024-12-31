package com.example.springapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.springapp.model.UserInfo;
import com.example.springapp.repository.UserInfoRepository;

@Service
public class JUserService {

	@Autowired
	private UserInfoRepository repository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	    public String addUser(UserInfo userInfo) {
	    	  String email = userInfo.getEmail();
	          // Check if the email is already registered
	          if (repository.findByEmail(email) != null) {
	        	  return "Email already Registered ";
	          }
	        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
	        repository.save(userInfo);
	        return "User added to system. User name: " + userInfo.getName();
	     
	    }
	    
	    public Optional<UserInfo> getUserById(int id)
	    {
	    	return repository.findById(id);
	    }
	}
	   