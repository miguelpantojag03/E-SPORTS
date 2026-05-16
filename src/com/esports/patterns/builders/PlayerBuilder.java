package com.esports.patterns.builders;

import com.esports.core.models.Player;

/**
 * Responsabilidad: Construir objetos Player de forma legible y paso a paso.
 * Patrón: Builder.
 */
public class PlayerBuilder {
    private String username;
    private String email;
    private double mmr = 1000.0; // Valor por defecto

    public PlayerBuilder withUsername(String username) {
        this.username = username;
        return this;
    }

    public PlayerBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    public PlayerBuilder withInitialMmr(double mmr) {
        this.mmr = mmr;
        return this;
    }

    public Player build() {
        if (username == null || email == null) {
            throw new IllegalStateException("Username and Email are mandatory");
        }
        return new Player(username, email, mmr);
    }
}
