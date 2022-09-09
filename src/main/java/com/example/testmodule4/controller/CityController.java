package com.example.testmodule4.controller;

import com.example.testmodule4.model.City;
import com.example.testmodule4.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class CityController {
    @Autowired
    private ICityService cityService;

    @GetMapping("/listCity")
    public ResponseEntity<?> getListCity() {
        return new ResponseEntity<>(cityService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{idCity}")
    public ResponseEntity<?> getCity(@PathVariable Long idCity) {
        Optional<City> city = cityService.findById(idCity);
        if (!city.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(city.get(), HttpStatus.OK);
        }
    }

    @PostMapping("/createCity")
    public ResponseEntity<?> createCity(@RequestBody City city) {
        cityService.save(city);
        return new ResponseEntity<>(city, HttpStatus.OK);
    }

    @PutMapping("/updateCity/{idCity}")
    public ResponseEntity<?> updateCity(@PathVariable Long idCity, @RequestBody City newCity) {
        Optional<City> city = cityService.findById(idCity);
        if (!city.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        newCity.setId(city.get().getId());
        cityService.save(newCity);
        return new ResponseEntity<>(newCity, HttpStatus.OK);
    }

    @DeleteMapping("/deleteCity/{idCity}")
    public ResponseEntity<?> deleteCity(@PathVariable Long idCity) {
        cityService.removeById(idCity);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
