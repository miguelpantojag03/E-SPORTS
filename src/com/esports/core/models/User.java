package com.esports.core.models;

import java.util.UUID;

/**
 * Responsabilidad: Definir la identidad base de cualquier usuario del sistema.
 * SOLID: Cumple con el Principio de Responsabilidad Única (SRP).
 * Diseño: Clase abstracta para evitar instanciación directa (Abstracción).
 */
public abstract class User {
    private final String id;
    private String username;
    private String email;

    protected User(String username, String email) {
        this.id = UUID.randomUUID().toString();
        this.username = username;
        this.email = email;
    }

    // Getters y Setters con encapsulamiento
    public String getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
}

/**
 * Responsabilidad: Representar a un competidor con estadísticas y MMR.
 * Relación: Herencia de User.
 */
public class Player extends User {
    private double mmr;
    private PlayerStatistics stats;

    public Player(String username, String email, double initialMmr) {
        super(username, email);
        this.mmr = initialMmr;
        this.stats = new PlayerStatistics();
    }

    public double getMmr() { return mmr; }
    public void setMmr(double mmr) { this.mmr = mmr; }
    public PlayerStatistics getStats() { return stats; }
}
