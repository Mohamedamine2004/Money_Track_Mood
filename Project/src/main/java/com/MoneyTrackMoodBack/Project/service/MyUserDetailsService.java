package com.MoneyTrackMoodBack.Project.service;

import com.MoneyTrackMoodBack.Project.model.Utilisateur;
import com.MoneyTrackMoodBack.Project.model.UtilisateurPrincipal;
import com.MoneyTrackMoodBack.Project.repository.UtilisateurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UtilisateurRepo utilisateurRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Utilisateur utilisateur = utilisateurRepo.findByNom(username);
        if (utilisateur==null) {
            throw new UsernameNotFoundException("Utilisateur non trouvé avec nom: " + username);
        }
        return new UtilisateurPrincipal(utilisateur);
    }
}
