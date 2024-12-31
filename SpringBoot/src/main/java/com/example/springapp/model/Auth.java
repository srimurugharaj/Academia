package com.example.springapp.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Auth {
	
	@Id
	private int userId;
	
	private String auth_token;
	
	private Timestamp expire;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getAuth_token() {
		return auth_token;
	}

	public void setAuth_token(String auth_token) {
		this.auth_token = auth_token;
	}

	public Timestamp getExpire() {
		return expire;
	}

	public void setExpire(Timestamp expire) {
		this.expire = expire;
	}

	public Auth(int userId, String auth_token, Timestamp expire) {
		this.userId = userId;
		this.auth_token = auth_token;
		this.expire = expire;
	}

	public Auth() {
	}
	
	
	
}
