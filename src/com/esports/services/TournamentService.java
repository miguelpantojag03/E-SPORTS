package com.esports.services;

import com.esports.core.models.Tournament;
import com.esports.core.enums.TournamentStatus;
import com.esports.infrastructure.repositories.IRepository;
import com.esports.patterns.observers.EventManager;

/**
 * Responsabilidad: Coordinar la lógica de negocio de los torneos.
 * SOLID: Dependency Inversion (DIP). Inyectamos el repo y el event manager.
 */
public class TournamentService {
    private final IRepository<Tournament> repository;
    private final EventManager eventManager;

    public TournamentService(IRepository<Tournament> repository, EventManager eventManager) {
        this.repository = repository;
        this.eventManager = eventManager;
    }

    public void startTournament(Tournament tournament) {
        if (tournament.getStatus() != TournamentStatus.CREATED) {
            throw new IllegalStateException("Tournament already started or invalid status");
        }
        
        tournament.setStatus(TournamentStatus.IN_PROGRESS);
        tournament.scheduleMatches();
        repository.save(tournament);
        
        eventManager.notify("El torneo " + tournament.getName() + " ha comenzado oficialmente!");
    }
}
