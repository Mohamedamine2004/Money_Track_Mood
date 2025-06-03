package com.MoneyTrackMoodBack.Project.controller;

import com.MoneyTrackMoodBack.Project.service.QnService;
import com.MoneyTrackMoodBack.Project.service.JWTService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/api/ai")
public class AiController {
    private final QnService qnService;
    private final JWTService jwtService;

    @PostMapping("/ask")
    public ResponseEntity<Map<String, String>> askQuestion(@RequestBody Map<String, Object> payload) {
        try {
            String question = (String) payload.get("question");
            if (question == null || question.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("answer", "Question cannot be empty"));
            }

            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            Long userId = jwtService.getUserIdFromUsername(username);
            String answer = qnService.getAnswer(question, userId);
            return ResponseEntity.ok(Map.of("answer", answer));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("answer", "Error processing request: " + e.getMessage()));
        }
    }
}