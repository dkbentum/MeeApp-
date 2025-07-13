package com.meeapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MeeAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(MeeAppApplication.class, args);
    }
}