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
@CrossOrigin(origins = "http://localhost:5173")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/register")
    public ResponseEntity<Utilisateur> enregistre(@RequestBody Utilisateur utilisateur) {
        return ResponseEntity.ok(utilisateurService.enregistre(utilisateur));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Utilisateur utilisateur) {
        String username = utilisateur.getNom();
        String password = utilisateur.getMotDePasse();

        if (utilisateurService.verify(utilisateur)) {
            String token = jwtService.generateToken(username);
            return ResponseEntity.ok(new AuthResponse(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Invalid credentials"));
    }


}