    package com.MoneyTrackMoodBack.Project.model;

    import com.fasterxml.jackson.annotation.JsonBackReference;
    import jakarta.persistence.*;
    import jakarta.validation.constraints.NotNull;

    import java.time.LocalDate;

    @Entity
    @Table(name = "depense")
    public class Depense {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotNull
        @Column(nullable = false)
        private LocalDate date;

        @NotNull
        @Column(nullable = false)
        private Double montant;

        @NotNull
        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private Categorie categorie;

        private String description;

        @Enumerated(EnumType.STRING)
        private Humeur humeur;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "utilisateur_id", nullable = false)
        @JsonBackReference
        private Utilisateur utilisateur;

        // Constructors
        public Depense() {}

        public Depense(LocalDate date, Double montant, Categorie categorie, String description, Humeur humeur, Utilisateur utilisateur) {
            this.date = date;
            this.montant = montant;
            this.categorie = categorie;
            this.description = description;
            this.humeur = humeur;
            this.utilisateur = utilisateur;
        }

        // Getters and Setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public LocalDate getDate() {
            return date;
        }

        public void setDate(LocalDate date) {
            this.date = date;
        }

        public Double getMontant() {
            return montant;
        }

        public void setMontant(Double montant) {
            this.montant = montant;
        }

        public Categorie getCategorie() {
            return categorie;
        }

        public void setCategorie(Categorie categorie) {
            this.categorie = categorie;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Humeur getHumeur() {
            return humeur;
        }

        public void setHumeur(Humeur humeur) {
            this.humeur = humeur;
        }

        public Utilisateur getUtilisateur() {
            return utilisateur;
        }

        public void setUtilisateur(Utilisateur utilisateur) {
            this.utilisateur = utilisateur;
        }
    }