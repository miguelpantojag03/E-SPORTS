import { useState, useEffect, useCallback } from 'react';
import { DataService } from '../services/DataService';

export const useData = () => {
  const [players, setPlayers] = useState(() => DataService.getPlayers());
  const [tournaments, setTournaments] = useState(() => DataService.getTournaments());
  const [auditLogs, setAuditLogs] = useState([]);

  const addPlayer = useCallback((player) => {
    const updated = DataService.savePlayer(player);
    setPlayers(updated);
    logEvent(`PLAYER_CREATED: ${player.name}`);
  }, []);

  const logEvent = useCallback((action) => {
    const newLog = DataService.logEvent(action);
    setAuditLogs(prev => [newLog, ...prev].slice(0, 50));
  }, []);

  return { players, tournaments, auditLogs, addPlayer, logEvent };
};
