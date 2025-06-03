package com.MoneyTrackMoodBack.Project.service;

import com.MoneyTrackMoodBack.Project.model.Utilisateur;
import com.MoneyTrackMoodBack.Project.model.UtilisateurPrincipal;
import com.MoneyTrackMoodBack.Project.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UtilisateurRepository utilisateurRepo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return utilisateurRepo.findByNom(username)
                .map(UtilisateurPrincipal::new)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec nom: " + username));
    }

}
