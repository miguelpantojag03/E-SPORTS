package com.esports.core.models;

import java.util.ArrayList;
import java.util.List;

/**
 * Responsabilidad: Gestionar un grupo de jugadores.
 * Relación: AGREGACIÓN de Player. Un equipo tiene jugadores, pero los jugadores existen sin el equipo.
 */
public class Team {
    private String id;
    private String name;
    private List<Player> members;
    private Player captain;

    public Team(String name, Player captain) {
        this.name = name;
        this.captain = captain;
        this.members = new ArrayList<>();
        this.members.add(captain);
    }

    public void addMember(Player player) {
        if (!members.contains(player)) {
            members.add(player);
        }
    }

    public List<Player> getMembers() { return new ArrayList<>(members); }
}

/**
 * Responsabilidad: Representar un enfrentamiento entre dos equipos.
 * Relación: COMPOSICIÓN con MatchStatistics. Si el Match desaparece, las estadísticas de ese match no tienen sentido solas.
 */
public class Match {
    private final String id;
    private Team teamA;
    private Team teamB;
    private MatchStatistics stats;

    public Match(Team teamA, Team teamB) {
        this.id = java.util.UUID.randomUUID().toString();
        this.teamA = teamA;
        this.teamB = teamB;
        this.stats = new MatchStatistics(); // Composición
    }

    public Team getTeamA() { return teamA; }
    public Team getTeamB() { return teamB; }
}
