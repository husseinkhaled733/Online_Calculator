package com.example.calc.controller;

import com.example.calc.service.Solver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class Clac_control {
    @Autowired
    private Solver solver;


    @PostMapping("/solve")
    public String get(@RequestBody String expression){
        return solver.solve(expression);
    }
}
