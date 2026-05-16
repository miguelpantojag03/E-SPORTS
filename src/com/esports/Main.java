package com.esports;

import com.esports.core.models.*;
import com.esports.infrastructure.repositories.*;
import com.esports.patterns.builders.PlayerBuilder;
import com.esports.patterns.factories.TournamentFactory;
import com.esports.patterns.observers.ConsoleNotificationService;
import com.esports.patterns.observers.EventManager;
import com.esports.patterns.strategies.EloRankingStrategy;
import com.esports.patterns.strategies.IRankingStrategy;
import com.esports.services.TournamentService;

import java.util.ArrayList;
import java.util.List;

/**
 * Responsabilidad: Punto de entrada del sistema (Composition Root).
 * Aquí se inyectan las dependencias manualmente para demostrar SOLID.
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== E-SPORTS TOURNAMENT MANAGEMENT SYSTEM 10/10 ===\n");

        // 1. Configuración de Infraestructura (Desacoplada)
        IRepository<Tournament> tournamentRepo = new MemoryRepository<Tournament>() {
            @Override
            public java.util.Optional<Tournament> findById(String id) { return java.util.Optional.empty(); }
            @Override
            public void delete(String id) {}
        };
        
        EventManager eventManager = new EventManager();
        eventManager.subscribe(new ConsoleNotificationService());

        // 2. Inyección de Dependencias Manual
        TournamentService tournamentService = new TournamentService(tournamentRepo, eventManager);

        // 3. Creación de Jugadores usando PATRÓN BUILDER
        Player player1 = new PlayerBuilder()
                .withUsername("S1mple_GOAT")
                .withEmail("s1mple@cs2.com")
                .withInitialMmr(2500.0)
                .build();

        Player player2 = new PlayerBuilder()
                .withUsername("Faker_Mid")
                .withEmail("faker@t1.com")
                .withInitialMmr(3000.0)
                .build();

        System.out.println("[Main] Jugadores creados con Builder: " + player1.getUsername() + " y " + player2.getUsername());

        // 4. Creación de Equipos (AGREGACIÓN)
        Team team1 = new Team("Natus Vincere", player1);
        Team team2 = new Team("T1 Entertainment", player2);

        // 5. Creación de Torneo usando PATRÓN FACTORY
        Tournament valorantMasters = TournamentFactory.createTournament("Valorant Masters Madrid", "KNOCKOUT");
        valorantMasters.addTeam(team1);
        valorantMasters.addTeam(team2);

        // 6. Ejecución de Lógica de Negocio (SERVICIO)
        tournamentService.startTournament(valorantMasters);

        // 7. Actualización de Rankings usando PATRÓN STRATEGY (POLIMORFISMO)
        IRankingStrategy rankingStrategy = new EloRankingStrategy();
        rankingStrategy.updateRanking(player1, 1.0); // Player 1 ganó

        System.out.println("\n=== SIMULACIÓN FINALIZADA CON ÉXITO ===");
    }
}
