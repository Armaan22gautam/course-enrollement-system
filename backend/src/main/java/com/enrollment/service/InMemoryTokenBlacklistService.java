package com.enrollment.service;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@ConditionalOnProperty(name = "app.redis.enabled", havingValue = "false", matchIfMissing = true)
public class InMemoryTokenBlacklistService implements TokenBlacklistService {

    private final ConcurrentHashMap<String, Long> blacklist = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    @Override
    public void blacklist(String token, long expirationMillis) {
        if (expirationMillis > 0) {
            long expireAt = System.currentTimeMillis() + expirationMillis;
            blacklist.put(token, expireAt);
            // Schedule removal after expiry
            scheduler.schedule(() -> blacklist.remove(token), expirationMillis, TimeUnit.MILLISECONDS);
        }
    }

    @Override
    public boolean isBlacklisted(String token) {
        Long expireAt = blacklist.get(token);
        if (expireAt == null)
            return false;
        if (System.currentTimeMillis() > expireAt) {
            blacklist.remove(token);
            return false;
        }
        return true;
    }
}
