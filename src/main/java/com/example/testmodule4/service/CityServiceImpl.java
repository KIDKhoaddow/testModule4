package com.example.testmodule4.service;

import com.example.testmodule4.model.City;
import com.example.testmodule4.repository.ICityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CityServiceImpl implements ICityService{

    @Autowired
    private ICityRepo cityRepo;

    @Override
    public List<City> findAll() {
        return cityRepo.findAll();
    }

    @Override
    public City save(City city) {
        return cityRepo.save(city);
    }

    @Override
    public void removeById(Long id) {
        cityRepo.deleteById(id);
    }

    @Override
    public Optional<City> findById(Long id) {
        return cityRepo.findById(id);
    }
}
