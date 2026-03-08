package com.enrollment.service;

public interface TokenBlacklistService {
    void blacklist(String token, long expirationMillis);

    boolean isBlacklisted(String token);
}
