package com.esports.patterns.strategies;

import com.esports.core.models.Player;

/**
 * Responsabilidad: Definir el algoritmo para actualizar el ranking de un jugador.
 * Patrón: Strategy.
 * Beneficio: Permite cambiar la lógica de puntos sin modificar al Jugador.
 */
public interface IRankingStrategy {
    void updateRanking(Player player, double performanceScore);
}

/**
 * Implementación de Ranking ELO (típico de Chess/LoL).
 */
public class EloRankingStrategy implements IRankingStrategy {
    private static final int K_FACTOR = 32;

    @Override
    public void updateRanking(Player player, double performanceScore) {
        double currentMmr = player.getMmr();
        // Lógica simplificada de ELO
        double newMmr = currentMmr + (K_FACTOR * (performanceScore - 0.5));
        player.setMmr(newMmr);
        System.out.println("[Strategy] ELO Updated for " + player.getUsername() + ": " + newMmr);
    }
}

/**
 * Implementación de Ranking por Puntos (típico de torneos de liga).
 */
public class PointRankingStrategy implements IRankingStrategy {
    @Override
    public void updateRanking(Player player, double performanceScore) {
        // Cada victoria suma 10 puntos fijos
        player.setMmr(player.getMmr() + (performanceScore * 10));
        System.out.println("[Strategy] Points Updated for " + player.getUsername());
    }
}
