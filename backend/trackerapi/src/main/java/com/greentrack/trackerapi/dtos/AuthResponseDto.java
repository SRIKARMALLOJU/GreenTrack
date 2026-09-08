package com.greentrack.trackerapi.dtos;

public class AuthResponseDto {
    private String token;
    private String type = "Bearer";

    public AuthResponseDto(String token) {
        this.token = token;
    }

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getType() { return type; }
}
