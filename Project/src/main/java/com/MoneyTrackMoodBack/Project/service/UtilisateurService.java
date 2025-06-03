package com.MoneyTrackMoodBack.Project.service;

import com.MoneyTrackMoodBack.Project.model.Utilisateur;
import com.MoneyTrackMoodBack.Project.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Utilisateur enregistre(Utilisateur utilisateur) {
        utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));
        return utilisateurRepository.save(utilisateur);
    }

    public boolean verify(Utilisateur utilisateur) {
        return utilisateurRepository.findByNom(utilisateur.getNom())
                .map(u -> passwordEncoder.matches(
                        utilisateur.getMotDePasse(),
                        u.getMotDePasse()))
                .orElse(false);
    }

    public Utilisateur findByNom(String nom) {
        return utilisateurRepository.findByNom(nom)
                .orElseThrow(() -> new RuntimeException("User not found for nom: " + nom));
    }
}