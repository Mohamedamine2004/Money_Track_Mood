package com.MoneyTrackMoodBack.Project.controller;

import com.MoneyTrackMoodBack.Project.model.Depense;
import com.MoneyTrackMoodBack.Project.model.Utilisateur;
import com.MoneyTrackMoodBack.Project.service.DepenseService;
import com.MoneyTrackMoodBack.Project.service.JWTService;
import com.MoneyTrackMoodBack.Project.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/depense")
@CrossOrigin(origins = "http://localhost:5173")
public class DepenseController {

    @Autowired
    private DepenseService depenseService;

    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping("/all")
    public List<Depense> getAllDepenses() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Utilisateur utilisateur = utilisateurService.findByNom(username);
        return depenseService.findDepensesByUtilisateurId(utilisateur.getId());
    }

    @PostMapping("/add")
    public ResponseEntity<Depense> addExpense(@RequestBody Depense depense) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Utilisateur utilisateur = utilisateurService.findByNom(username);
        depense.setUtilisateur(utilisateur);
        System.out.println(ResponseEntity.ok(depenseService.addDepense(depense)));
        return ResponseEntity.ok(depenseService.addDepense(depense));
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Depense>> getDepensesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(depenseService.findDepensesByUtilisateurId(userId));
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Depense> updateDepense(@PathVariable Long id, @RequestBody Depense depenseDetails) {
        Optional<Depense> optionalDepense = depenseService.findDepenseById(id);

        if (optionalDepense.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Depense depense = optionalDepense.get();
        depense.setDate(depenseDetails.getDate());
        depense.setMontant(depenseDetails.getMontant());
        depense.setCategorie(depenseDetails.getCategorie());
        depense.setDescription(depenseDetails.getDescription());
        depense.setHumeur(depenseDetails.getHumeur());
        // Ensure the utilisateur is not overwritten unless necessary
        if (depenseDetails.getUtilisateur() != null) {
            depense.setUtilisateur(depenseDetails.getUtilisateur());
        }

        Depense updatedDepense = depenseService.updateDepense(depense);
        return ResponseEntity.ok(updatedDepense);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDepense(@PathVariable Long id) {
        Optional<Depense> optionalDepense = depenseService.findDepenseById(id);

        if (optionalDepense.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        depenseService.deleteDepense(id);
        return ResponseEntity.noContent().build();
    }
}