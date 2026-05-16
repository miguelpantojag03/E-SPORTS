import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Users, Sword, Settings, Bell, 
  Search, Shield, Zap, Target, Star,
  TrendingUp, Award, PlayCircle, Activity,
  Cpu, Layout, BarChart3, ChevronRight,
  Database, Coins, Map, UserPlus, BookOpen, Plus
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  LineChart, Line, CartesianGrid
} from 'recharts';

// --- Global Constants ---
const INITIAL_PLAYERS = [
  { id: 1, name: 'S1mple', rank: 'Radiant', mmr: 2850, stats: [{subject:'Aim',A:98},{subject:'IQ',A:95},{subject:'Team',A:80},{subject:'Clutch',A:99},{subject:'Utility',A:85}] },
  { id: 2, name: 'Faker', rank: 'Challenger', mmr: 3100, stats: [{subject:'Aim',A:85},{subject:'IQ',A:99},{subject:'Team',A:95},{subject:'Clutch',A:92},{subject:'Utility',A:98}] }
];

const MMR_HISTORY = [
  { day: 'Mon', mmr: 2400 }, { day: 'Tue', mmr: 2450 }, { day: 'Wed', mmr: 2420 },
  { day: 'Thu', mmr: 2500 }, { day: 'Fri', mmr: 2580 }, { day: 'Sat', mmr: 2600 }, { day: 'Sun', mmr: 2650 }
];

function App() {
  // --- PERSISTENCE LOGIC (Senior Level) ---
  const [activeTab, setActiveTab] = useState('brackets');
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('esports_players');
    return saved ? JSON.parse(saved) : INITIAL_PLAYERS;
  });
  const [tournaments, setTournaments] = useState(() => {
    const saved = localStorage.getItem('esports_tournaments');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Valorant Masters Madrid', game: 'Valorant', status: 'Live', prize: '$1M' }
    ];
  });
  
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const [showWizard, setShowWizard] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('esports_players', JSON.stringify(players));
    localStorage.setItem('esports_tournaments', JSON.stringify(tournaments));
  }, [players, tournaments]);

  const notify = (msg) => {
    setNotifications(prev => [{ id: Date.now(), msg }, ...prev].slice(0, 3));
  };

  // --- Admin Logic ---
  const [newPlayer, setNewPlayer] = useState({ name: '', email: '', mmr: 1000 });
  const handleAddPlayer = () => {
    if (!newPlayer.name || !newPlayer.email) return notify("ERROR: Fields Mandatory");
    const player = { ...newPlayer, id: Date.now(), rank: 'Bronze', stats: INITIAL_PLAYERS[0].stats };
    setPlayers([...players, player]);
    setNewPlayer({ name: '', email: '', mmr: 1000 });
    notify("System: Entity persistent in LocalStorage");
  };

  return (
    <div className="dashboard-enterprise">
      <div className="scanline" />
      
      {/* Sidebar */}
      <aside className="sidebar-pro">
        <div className="brand-pro">
          <div className="brand-icon"><Database size={24} /></div>
          <div>
            <span>ESPORTS_CORE</span>
            <small>ENTERPRISE v3.1</small>
          </div>
        </div>

        <nav className="nav-pro">
          <SectionLabel label="MANAGEMENT" />
          <NavItem icon={<Layout />} label="Brackets" active={activeTab === 'brackets'} onClick={() => setActiveTab('brackets')} />
          <NavItem icon={<Users />} label="Rosters" active={activeTab === 'players'} onClick={() => setActiveTab('players')} />
          <NavItem icon={<Map />} label="Strategies" active={activeTab === 'strategies'} onClick={() => setActiveTab('strategies')} />
          
          <SectionLabel label="ADMIN" />
          <NavItem icon={<UserPlus />} label="Builder" active={activeTab === 'admin'} onClick={() => setActiveTab('admin')} />
          <NavItem icon={<Activity />} label="Live Ops" active={activeTab === 'live'} onClick={() => setActiveTab('live')} />
        </nav>
      </aside>

      {/* Main */}
      <main className="content-pro">
        <header className="header-pro">
          <div className="search-pro">
            <Search size={18} />
            <input placeholder="Search entities..." />
          </div>
          <button className="create-btn" onClick={() => setShowWizard(true)}>
            <Plus size={18} /> Create Tournament
          </button>
        </header>

        <div className="viewport">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="view-wrapper">
              {activeTab === 'brackets' && <BracketView tournaments={tournaments} />}
              {activeTab === 'players' && <PlayerRosterView players={players} selected={selectedPlayer} onSelect={setSelectedPlayer} />}
              {activeTab === 'admin' && <AdminBuilderView data={newPlayer} setData={setNewPlayer} onAdd={handleAddPlayer} />}
              {activeTab === 'live' && <LiveFeedView notifications={notifications} />}
              {activeTab === 'strategies' && <StrategyView />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Tournament Wizard Modal --- */}
        <AnimatePresence>
          {showWizard && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="modal-content">
                <h2>Tournament Wizard v1.0</h2>
                <div className="wizard-form">
                  <input placeholder="Tournament Name" id="t-name" />
                  <select id="t-game">
                    <option>Valorant</option>
                    <option>League of Legends</option>
                    <option>CS2</option>
                  </select>
                  <div className="modal-actions">
                    <button onClick={() => setShowWizard(false)}>Cancel</button>
                    <button className="btn-pro" onClick={() => {
                      const name = document.getElementById('t-name').value;
                      const game = document.getElementById('t-game').value;
                      setTournaments([...tournaments, { id: Date.now(), name, game, status: 'Upcoming', prize: '$10k' }]);
                      setShowWizard(false);
                      notify("New Tournament PERSISTED");
                    }}>Deploy Tournament</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Views (Sub-Components) ---

function BracketView({ tournaments }) {
  return (
    <div className="view-card">
      <div className="v-header">
        <h2>Active Competitions</h2>
      </div>
      <div className="t-list-pro">
        {tournaments.map(t => (
          <div key={t.id} className="t-item-pro">
            <div>
              <p className="t-name">{t.name}</p>
              <span className="t-game">{t.game}</span>
            </div>
            <span className={`t-status ${t.status.toLowerCase()}`}>{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlayerRosterView({ players, selected, onSelect }) {
  return (
    <div className="roster-grid">
      <div className="p-list">
        {players.map(p => (
          <div key={p.id} className={`p-item ${selected.id === p.id ? 'active' : ''}`} onClick={() => onSelect(p)}>
            <span>{p.name}</span>
            <ChevronRight size={16} />
          </div>
        ))}
      </div>
      <div className="p-detail-pro">
        <h3>{selected.name}</h3>
        <div className="radar-pro">
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={selected.stats}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#7a7e9d', fontSize: 10 }} />
              <Radar dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function AdminBuilderView({ data, setData, onAdd }) {
  return (
    <div className="admin-view">
      <div className="builder-form">
        <h2>Entity Builder</h2>
        <input value={data.name} onChange={e => setData({...data, name: e.target.value})} placeholder="Username" />
        <input value={data.email} onChange={e => setData({...data, email: e.target.value})} placeholder="Email" />
        <button className="btn-pro" onClick={onAdd}>Add to LocalStorage</button>
      </div>
    </div>
  );
}

function LiveFeedView({ notifications }) {
  return (
    <div className="feed-view">
      <h2>Real-time Event Bus</h2>
      <div className="feed-list">
        {notifications.map(n => (
          <div key={n.id} className="feed-item-pro">
            <Zap size={14} color="var(--primary)" /> <span>{n.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StrategyView() {
  return <div className="view-card"><h2>Tactical Strategy Builder</h2><p>Module active and operational.</p></div>;
}

// --- Helpers ---
function NavItem({ icon, label, active, onClick }) {
  return <div className={`nav-item-pro ${active ? 'active' : ''}`} onClick={onClick}>{icon} <span>{label}</span></div>;
}
function SectionLabel({ label }) { return <div className="section-label">{label}</div>; }

export default App;
