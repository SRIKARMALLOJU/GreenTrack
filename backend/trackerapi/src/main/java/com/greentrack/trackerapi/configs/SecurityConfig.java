package com.greentrack.trackerapi.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailsService userDetailsService;

    // Constructor injection guarantees your CustomUserDetailsService is wired correctly
    public SecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    // 1. Core Password Hashing Encryption Strategy
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 2. Data Access Object Authentication Strategy (Fixes the password validation match)
    @Bean
    public AuthenticationProvider authenticationProvider() {
        // Pass 'this.userDetailsService' straight into the constructor parameter!
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(this.userDetailsService); 
        
        // The password encoder setter method remains active and unchanged
        authProvider.setPasswordEncoder(passwordEncoder());    
        
        return authProvider;
    }

    // 3. Global AuthenticationManager Exposition Block
    // 🌟 UPDATE THIS METHOD INSIDE YOUR SECURITYCONFIG.JAVA FILE 🌟
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        // Force the central manager to use our custom BCrypt-wired authentication provider
        return new org.springframework.security.authentication.ProviderManager(authenticationProvider());
    }


    // 4. Structural Interceptor Network Security Rule Map
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Enable global CORS engine verification rules
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // Disable default CSRF layers for stateless REST design patterns
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Explicitly allow all browser/axios preflight pre-checks to bypass blocks
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // Permit public unauthenticated entry to everything under /api/auth/
                .requestMatchers("/api/auth/**").permitAll()
                // Require verified secure JWT tokens on all core feature routes
                .anyRequest().authenticated()
            )
            // Enforce stateless tracking patterns inside memory space
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        return http.build();
    }

    // 5. Cross-Origin Control Logic (React Integration Authorization Portals)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // Point to React Vite
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cache-Control"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Globally apply cross rules
        return source;
    }
}
