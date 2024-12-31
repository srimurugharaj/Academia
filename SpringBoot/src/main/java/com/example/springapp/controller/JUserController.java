package com.example.springapp.controller;



import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.Dto.AuthRequest;
import com.example.springapp.Dto.Token;
import com.example.springapp.Dto.Token;
import com.example.springapp.model.UserInfo;
import com.example.springapp.service.JwtService;
import com.example.springapp.service.JUserService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class JUserController {

	@Autowired
	private JUserService service;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/new")
	public String addNewUser(@RequestBody UserInfo userInfo) {
		userInfo.setRoles("ROLE_USER"); 
		return service.addUser(userInfo);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/login")
	public Map<Object,Object> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
		if (authentication.isAuthenticated()) {
			return jwtService.generateToken(authRequest.getEmail());
		} else {
			throw new UsernameNotFoundException("invalid user request !");
		}

	}
	
	@GetMapping("userDetails/{id}")
	public Optional<UserInfo> getUser(@PathVariable int id)
	{
		return service.getUserById(id);
	}
	
}