
package com.MoneyTrackMoodBack.Project.service;

import com.MoneyTrackMoodBack.Project.model.Utilisateur;
import com.MoneyTrackMoodBack.Project.repository.UtilisateurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UtilisateurService {
    @Autowired
    private JWTService jwtService;
    @Autowired
    private UtilisateurRepo utilisateurRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    public Utilisateur enregistre(Utilisateur utilisateur) {
        utilisateur.setMotDePasse(bCryptPasswordEncoder.encode(utilisateur.getMotDePasse()));
        return utilisateurRepo.save(utilisateur);
    }

    public boolean verify(Utilisateur utilisateur) {

        Utilisateur existingUser = utilisateurRepo.findByNom(utilisateur.getNom());
        if (existingUser != null && bCryptPasswordEncoder.matches(utilisateur.getMotDePasse(), existingUser.getMotDePasse())) {

            return true ;
        }
        return false;
    }
}
