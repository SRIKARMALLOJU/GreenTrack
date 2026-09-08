package com.greentrack.trackerapi.services;


import com.greentrack.trackerapi.models.User;
import com.greentrack.trackerapi.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    System.out.println("❌ ERROR: User was NOT found in MongoDB matching: " + email);
                    return new UsernameNotFoundException("User not found: " + email);
                });
        return user;
    }
}

