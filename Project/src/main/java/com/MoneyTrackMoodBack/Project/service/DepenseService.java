package com.MoneyTrackMoodBack.Project.service;

import com.MoneyTrackMoodBack.Project.model.Depense;
import com.MoneyTrackMoodBack.Project.repository.DepenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepenseService {

    @Autowired
    private DepenseRepo depenseRepo;

    public List<Depense> getAllDepense() {
        return depenseRepo.findAll();
    }

    public Depense addDepense(Depense depense) {
        return depenseRepo.save(depense);
    }

    // New method to find a Depense by ID
    public Optional<Depense> findDepenseById(Long id) {
        return depenseRepo.findById(id);
    }

    // New method to update a Depense
    public Depense updateDepense(Depense depense) {
        return depenseRepo.save(depense);
    }

    // New method to delete a Depense by ID
    public void deleteDepense(Long id) {
        depenseRepo.deleteById(id);
    }
    public List<Depense> findDepensesByUtilisateurId(Long utilisateurId) {
        return depenseRepo.findByUtilisateurId(utilisateurId);
    }
}