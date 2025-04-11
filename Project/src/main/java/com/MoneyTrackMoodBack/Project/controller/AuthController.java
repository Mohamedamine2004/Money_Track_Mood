package com.MoneyTrackMoodBack.Project.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @GetMapping("")
    public String hellow(HttpServletRequest request){
        return " hellow"+request.getSession().getId();

    }
}
