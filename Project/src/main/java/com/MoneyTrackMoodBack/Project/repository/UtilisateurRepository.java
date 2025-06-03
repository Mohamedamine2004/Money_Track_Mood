    package com.MoneyTrackMoodBack.Project.repository;

    import com.MoneyTrackMoodBack.Project.model.Utilisateur;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Query;

    import java.util.Optional;

    public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
        Optional<Utilisateur> findByNomAndMotDePasse(String nom, String motDePasse);
        @Query("SELECT u FROM Utilisateur u WHERE u.nom = :nom")
        Optional<Utilisateur> findByNom(String nom);
    }