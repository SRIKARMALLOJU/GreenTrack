package com.greentrack.trackerapi.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.greentrack.trackerapi.dtos.AuthRequestDto;
import com.greentrack.trackerapi.dtos.AuthResponseDto;
import com.greentrack.trackerapi.utils.JwtUtils;

@RestController
@RequestMapping("/api/auth")
// @CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequestDto authRequest) {
        try {
            System.out.println("👉 TARGET CHECK: Request arrived at controller for email: " + authRequest.getEmail());
            System.out.println("👉 TARGET CHECK: Received password text: [" + authRequest.getPassword() + "]");

            // 🌟 GENERATE AND LOG A GUARANTEED CRYPTOGRAPHIC MATCH FOR TESTING 🌟
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String generatedTestHash = encoder.encode("1234567890");
            System.out.println("📋 COPY THIS EXACT HASH FOR MONGODB: " + generatedTestHash);


            // 1. Force credential verification
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );

            // 2. Fetch authenticated details if validation clears successfully
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwtToken = jwtUtils.generateToken(userDetails);
            
            return ResponseEntity.ok(new AuthResponseDto(jwtToken));

        } catch (BadCredentialsException e) {
            // 🌟 CATCHES THE MISMATCHING HASH SO IT RETURNS A CLEAN 401 INSTEAD OF A 403 FORBIDDEN!
            System.out.println("❌ BACKEND MATCH ERROR: The password strings do NOT match!"+ e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password string payload mismatch."));
        } catch (Exception e) {
            System.out.println("❌ OTHER RUNTIME ERROR: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }
    
}
