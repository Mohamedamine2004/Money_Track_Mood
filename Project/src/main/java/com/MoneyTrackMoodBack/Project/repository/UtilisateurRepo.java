
package com.MoneyTrackMoodBack.Project.repository;

import com.MoneyTrackMoodBack.Project.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtilisateurRepo extends JpaRepository<Utilisateur, Long> {
    @Query("SELECT u FROM Utilisateur u WHERE u.nom = :nom")
    Utilisateur findByNom(@Param("nom") String nom);


}