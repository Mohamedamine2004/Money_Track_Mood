package com.MoneyTrackMoodBack.Project.model;

import jakarta.persistence.*;

import java.util.List;



@Entity
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String motDePasse;
    private String prenom;
    private String nom;


    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Depense> depenses;
    // Constructeur
    public Utilisateur() {}

    public Utilisateur(Long id, String email, String motDePasse, String prenom, String nom) {
        this.id = id;
        this.email = email;
        this.motDePasse = motDePasse;
        this.prenom = prenom;
        this.nom = nom;
    }


    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMotDePasse() { return motDePasse; }
    public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public List<Depense> getDepenses() {
        return depenses;
    }
    public void setDepenses(List<Depense> depenses) {
        this.depenses = depenses;
    }



}
