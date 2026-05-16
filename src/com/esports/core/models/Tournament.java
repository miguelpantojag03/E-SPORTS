package com.esports.core.models;

import com.esports.core.enums.TournamentStatus;
import java.util.ArrayList;
import java.util.List;

/**
 * Responsabilidad: Definir la estructura base de un torneo.
 * SOLID: Open/Closed Principle (OCP). Se pueden añadir tipos de torneos sin cambiar esta clase.
 */
public abstract class Tournament {
    protected String name;
    protected TournamentStatus status;
    protected List<Team> participatingTeams;
    protected List<Match> matches;

    protected Tournament(String name) {
        this.name = name;
        this.status = TournamentStatus.CREATED;
        this.participatingTeams = new ArrayList<>();
        this.matches = new ArrayList<>();
    }

    public void addTeam(Team team) {
        participatingTeams.add(team);
    }

    /**
     * Método polimórfico que cada tipo de torneo implementará de forma distinta.
     */
    public abstract void scheduleMatches();

    public String getName() { return name; }
    public TournamentStatus getStatus() { return status; }
    public void setStatus(TournamentStatus status) { this.status = status; }
}

/**
 * Torneo de Eliminación Directa.
 */
public class KnockoutTournament extends Tournament {
    public KnockoutTournament(String name) {
        super(name);
    }

    @Override
    public void scheduleMatches() {
        System.out.println("[Tournament] Generating Brackets for Knockout: " + name);
        // Lógica de emparejamiento 1 vs 8, 2 vs 7, etc.
    }
}
