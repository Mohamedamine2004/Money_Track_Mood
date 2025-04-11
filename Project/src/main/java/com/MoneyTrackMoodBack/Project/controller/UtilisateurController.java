package com.MoneyTrackMoodBack.Project.controller;

import com.MoneyTrackMoodBack.Project.model.Utilisateur;
import com.MoneyTrackMoodBack.Project.service.AuthResponse;
import com.MoneyTrackMoodBack.Project.service.ErrorResponse;
import com.MoneyTrackMoodBack.Project.service.JWTService;
import com.MoneyTrackMoodBack.Project.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Adjust this based on your frontend URL
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private JWTService jwtService;  // Inject JWTService here

    @PostMapping("/register")
    public Utilisateur enregistre(@RequestBody Utilisateur utilisateur) {
        return utilisateurService.enregistre(utilisateur);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Utilisateur utilisateur) {
        String username = utilisateur.getNom(); // Assuming 'nom' is the username
        String password = utilisateur.getMotDePasse();  // Assuming 'motDePasse' is the password

        if (utilisateurService.verify(utilisateur)) {
            // If credentials are valid, generate JWT token
            String token = jwtService.generateToken(username);

            // Return the token in the response
            return ResponseEntity.ok(new AuthResponse(token));  // Return a ResponseEntity with JWT
        } else {
            // If credentials are invalid, return a structured error response
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Invalid credentials"));
        }
    }

    @GetMapping("/DashboardPage")
    public String hello() {
        return "hello";
    }
}
