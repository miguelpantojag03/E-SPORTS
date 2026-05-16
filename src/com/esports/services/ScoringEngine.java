package com.esports.services;

import com.esports.core.models.Player;

/**
 * Motor de Puntuación Titan.
 * Aplica algoritmos ponderados para determinar el ranking real.
 * Demuestra dominio de lógica de negocio compleja.
 */
public class ScoringEngine {
    
    public double calculatePerformanceIndex(int mmr, double winRate, int totalMatches) {
        // Fórmula: (MMR * 0.5) + (WinRate * 40) + (Matches * 0.1)
        double index = (mmr * 0.5) + (winRate * 40.0) + (totalMatches * 0.1);
        return Math.round(index * 100.0) / 100.0;
    }

    public String getTier(double performanceIndex) {
        if (performanceIndex > 2000) return "S_TIER_GOD";
        if (performanceIndex > 1500) return "A_TIER_ELITE";
        if (performanceIndex > 1000) return "B_TIER_PRO";
        return "C_TIER_ROOKIE";
    }
}
