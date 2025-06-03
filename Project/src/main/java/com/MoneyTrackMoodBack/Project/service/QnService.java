package com.MoneyTrackMoodBack.Project.service;

import com.MoneyTrackMoodBack.Project.model.Categorie;
import com.MoneyTrackMoodBack.Project.model.Depense;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QnService {
    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    private final DepenseService depenseService;

    public QnService(WebClient.Builder webClientBuilder, DepenseService depenseService) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = new ObjectMapper();
        this.depenseService = depenseService;
    }

    public String getAnswer(String question, Long userId) {
        // Fetch user's expenses
        List<Depense> expenses = depenseService.findDepensesByUtilisateurId(userId);
        double totalExpenses = expenses.stream()
                .mapToDouble(Depense::getMontant)
                .sum();
        Map<Categorie, Double> categoryTotals = expenses.stream()
                .collect(Collectors.groupingBy(
                        Depense::getCategorie,
                        Collectors.summingDouble(Depense::getMontant)
                ));

        // Build financial context prompt
        StringBuilder context = new StringBuilder();
        context.append("ansere all my q         uestion only You are a professional financial advisor. The user has the following expense data: \n");
        context.append("Total Expenses: $").append(String.format("%.2f", totalExpenses)).append("\n");
        context.append("Expenses by Category:\n");
        categoryTotals.forEach((category, amount) ->
                context.append(category).append(": $").append(String.format("%.2f", amount)).append("\n"));
        context.append("Provide concise, professional financial advice based on the user's question and their expense data. ");
        context.append("Respond in plain text suitable for a JSON response. Do not use Markdown formatting (e.g., *, **, #). ");
        context.append("Keep the response under 200 words.\n\n");
        context.append("User's Question: ").append(question);

        // Prepare Gemini API request
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{
                                Map.of("text", context.toString())
                        })
                }
        );

        try {
            String response = webClient.post()
                    .uri(geminiApiUrl)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            System.out.println("Gemini API Response: " + response);

            Map<String, Object> jsonResponse = objectMapper.readValue(response, Map.class);
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) jsonResponse.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> candidate = candidates.get(0);
                Map<String, Object> content = (Map<String, Object>) candidate.get("content");
                List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                if (parts != null && !parts.isEmpty()) {
                    return (String) parts.get(0).get("text");
                }
            }

            return "No response from AI.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: Unable to get AI response.";
        }
    }
}