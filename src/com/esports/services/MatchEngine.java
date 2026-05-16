package com.esports.services;

import com.esports.core.models.Match;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Responsabilidad: Ejecutar partidas de forma asíncrona.
 * Concepto Avanzado: Concurrencia y Multi-threading.
 * SOLID: Interface Segregation.
 */
public class MatchEngine {
    private final ExecutorService executor;

    public MatchEngine() {
        // Pool de hilos para simular el procesamiento paralelo de partidas
        this.executor = Executors.newFixedThreadPool(4);
    }

    public void runMatch(Match match) {
        executor.submit(() -> {
            try {
                System.out.println("[MatchEngine] Iniciando procesamiento de partida: " + match.getTeamA().getName() + " vs " + match.getTeamB().getName());
                Thread.sleep(2000); // Simulando carga de datos
                System.out.println("[MatchEngine] Partida Finalizada. Calculando resultados...");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
    }

    public void shutdown() {
        executor.shutdown();
    }
}

/**
 * Validador de Reglas de Negocio.
 */
class BusinessValidator {
    public static void validateTournamentState(String status) throws Exception {
        if (status.equals("CANCELLED")) {
            throw new Exception("ERROR_001: No se puede operar sobre un torneo cancelado.");
        }
    }
}
