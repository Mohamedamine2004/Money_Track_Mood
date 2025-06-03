package com.MoneyTrackMoodBack.Project.repository;

import com.MoneyTrackMoodBack.Project.model.Depense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepenseRepo extends JpaRepository<Depense, Long> {
    List<Depense> findByUtilisateurId(Long utilisateurId);
}