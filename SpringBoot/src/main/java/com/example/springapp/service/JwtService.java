package com.example.springapp.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.example.springapp.Dto.Token;
import com.example.springapp.config.UserInfoUserDetailsService;
import com.example.springapp.model.UserInfo;
import com.example.springapp.repository.UserInfoRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {


    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    @Autowired
    private UserInfoUserDetailsService userInfoUserDetailsService;
    
    @Autowired
    private UserInfoRepository userInfoRepository;
    
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String email = extractUsername(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }


    public Map<Object,Object> generateToken(String email){
        Map<String,Object> claims=new HashMap<>();
        return createToken(claims,email);
    }

    private Map<Object,Object> createToken(Map<String, Object> claims, String email) {
    	UserDetails userDetails=userInfoUserDetailsService.loadUserByUsername(email);
    	UserInfo ui = userInfoRepository.findByEmail(email);
    	Token tokenObject=new Token();
    	tokenObject.setToken( Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*30))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact());
    	 tokenObject.setRole((List<GrantedAuthority>) userDetails.getAuthorities());
    	 Map returnMap = new LinkedHashMap<>();
    	 returnMap.put("token", tokenObject);
    	 returnMap.put("userId", ui.getId());
    	 returnMap.put("userName", ui.getName());
    	 returnMap.put("userEmail", ui.getEmail());
    	 return returnMap;
    }
    private Key getSignKey() {
        byte[] keyBytes= Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}