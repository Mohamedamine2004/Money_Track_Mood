package com.MoneyTrackMoodBack.Project.model;

import jakarta.persistence.*;

@Entity
public class Depense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String date;
    private Double montant;
    private String categorie;
    private String humeur;
    private String description;

    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;

    // Constructeurs
    public Depense() {}

    public Depense(Long id, String date, Double montant, String categorie, String humeur, String description, Utilisateur utilisateur) {
        this.id = id;
        this.date = date;
        this.montant = montant;
        this.categorie = categorie;
        this.humeur = humeur;
        this.description = description;
        this.utilisateur = utilisateur;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public Double getMontant() { return montant; }
    public void setMontant(Double montant) { this.montant = montant; }

    public String getCategorie() { return categorie; }
    public void setCategorie(String categorie) { this.categorie = categorie; }

    public String getHumeur() { return humeur; }
    public void setHumeur(String humeur) { this.humeur = humeur; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Utilisateur getUtilisateur() { return utilisateur; }
    public void setUtilisateur(Utilisateur utilisateur) { this.utilisateur = utilisateur; }
}
