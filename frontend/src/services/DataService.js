/**
 * SERVICIO DE DATOS (SERVICE LAYER)
 * Responsabilidad: Centralizar el acceso a la información del sistema.
 * Esto permite que el componente de UI (App.jsx) no sepa si los datos vienen
 * de LocalStorage, de una base de datos real o de una API.
 */

const STORAGE_KEYS = {
  PLAYERS: 'esports_players_v5',
  TOURNAMENTS: 'esports_tournaments_v5',
  LOGS: 'esports_audit_logs'
};

const INITIAL_DATA = {
  players: [
    { id: 1, name: 'S1mple', rank: 'Radiant', mmr: 2850, stats: [{subject:'Aim',A:98},{subject:'IQ',A:95},{subject:'Team',A:80},{subject:'Clutch',A:99},{subject:'Utility',A:85}] },
    { id: 2, name: 'Faker', rank: 'Challenger', mmr: 3100, stats: [{subject:'Aim',A:85},{subject:'IQ',A:99},{subject:'Team',A:95},{subject:'Clutch',A:92},{subject:'Utility',A:98}] }
  ],
  tournaments: [
    { id: 1, name: 'Valorant Masters Madrid', game: 'Valorant', status: 'Live', prize: '$1M', prob: '85%' }
  ]
};

export const DataService = {
  // Obtener todos los jugadores
  getPlayers: () => {
    const saved = localStorage.getItem(STORAGE_KEYS.PLAYERS);
    return saved ? JSON.parse(saved) : INITIAL_DATA.players;
  },

  // Guardar un nuevo jugador
  savePlayer: (player) => {
    const players = DataService.getPlayers();
    const updated = [...players, { ...player, id: Date.now() }];
    localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(updated));
    return updated;
  },

  // Obtener torneos
  getTournaments: () => {
    const saved = localStorage.getItem(STORAGE_KEYS.TOURNAMENTS);
    return saved ? JSON.parse(saved) : INITIAL_DATA.tournaments;
  },

  // Auditoría: Guardar log
  logEvent: (action) => {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '[]');
    const newLog = { id: Date.now(), action, time: new Date().toLocaleTimeString(), user: 'MASTER_ADMIN' };
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify([newLog, ...logs].slice(0, 50)));
    return newLog;
  }
};
