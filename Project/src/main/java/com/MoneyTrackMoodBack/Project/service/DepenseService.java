package com.MoneyTrackMoodBack.Project.service;

import com.MoneyTrackMoodBack.Project.model.Depense;
import com.MoneyTrackMoodBack.Project.repository.DepenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepenseService {

    @Autowired
    private DepenseRepo depenseRepository;

    public List<Depense> getAllDepense() {
        return depenseRepository.findAll();
    }

    public Depense addDepense(Depense depense) {
        return depenseRepository.save(depense);
    }}