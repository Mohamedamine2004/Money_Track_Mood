package com.MoneyTrackMoodBack.Project.controller;


import com.MoneyTrackMoodBack.Project.model.Depense;
import com.MoneyTrackMoodBack.Project.service.DepenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/depense ")
public class DepenseController {

    @Autowired
    private DepenseService depenseService;

    @GetMapping("/depense/all")
    public List<Depense> getAllDdepenses() {
        return depenseService.getAllDepense();
    }

    @PostMapping("/depense/add")
    public Depense addExpense(@RequestBody Depense depense) {
        return depenseService.addDepense(depense);
    }
}