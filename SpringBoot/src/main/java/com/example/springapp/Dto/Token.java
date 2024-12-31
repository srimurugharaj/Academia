package com.example.springapp.Dto;

import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.OneToOne;

import org.springframework.security.core.GrantedAuthority;

//import com.example.springapp.model.UserInfo;

public class Token {
	
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;

//	    @OneToOne
//	    @JoinColumn(name = "user_id")
//	    private UserInfo userInfo;
	    
	    
	public String token;
	public int user_id;
	public List<GrantedAuthority> role;
	
	
	
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public List<GrantedAuthority> getRole() {
		return role;
	}
	public void setRole(List<GrantedAuthority> role) {
		this.role = role;
	}
	
	public class TokenResponse {
	    private Token token;

	    public TokenResponse(Token token) {
	        this.token = token;
	    }

	    public Token getToken() {
	        return token;
	    }
	}


}
