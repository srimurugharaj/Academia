package com.example.springapp.config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.springapp.model.UserInfo;
import com.example.springapp.repository.UserInfoRepository;

@Service
public class UserInfoUserDetailsService implements UserDetailsService{

	@Autowired
    private UserInfoRepository repository;
	
	@Override
	public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
		
		 Optional<UserInfo> userInfo = repository.findByEmailIgnoreCase(mail);
	        return userInfo.map(UserInfoUserDetails::new)
	                .orElseThrow(() -> new UsernameNotFoundException("user not found " + mail));
	}
	
}
