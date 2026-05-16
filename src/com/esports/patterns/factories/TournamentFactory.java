package com.esports.patterns.factories;

import com.esports.core.models.Tournament;
import com.esports.core.models.KnockoutTournament;
import com.esports.core.enums.GameType;

/**
 * Responsabilidad: Centralizar la creación de objetos complejos (Torneos).
 * Patrón: Factory Method.
 */
public class TournamentFactory {
    
    public static Tournament createTournament(String name, String type) {
        if (type.equalsIgnoreCase("KNOCKOUT")) {
            return new KnockoutTournament(name);
        } else if (type.equalsIgnoreCase("LEAGUE")) {
            // Podríamos retornar un LeagueTournament (implementación pendiente)
            return new KnockoutTournament(name + " (League Sim)");
        }
        throw new IllegalArgumentException("Unknown tournament type");
    }
}
