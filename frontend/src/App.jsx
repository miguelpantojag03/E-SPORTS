import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Users, Sword, Settings, Bell, 
  Search, Shield, Zap, Target, Star,
  TrendingUp, Award, PlayCircle, Activity,
  Cpu, Layout, BarChart3, ChevronRight,
  Database, Coins, Map, UserPlus, BookOpen
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  LineChart, Line, CartesianGrid
} from 'recharts';

// --- Global State & Mock Data ---
const INITIAL_PLAYERS = [
  { id: 1, name: 'S1mple', rank: 'Radiant', mmr: 2850, stats: [{subject:'Aim',A:98},{subject:'IQ',A:95},{subject:'Team',A:80},{subject:'Clutch',A:99},{subject:'Utility',A:85}] },
  { id: 2, name: 'Faker', rank: 'Challenger', mmr: 3100, stats: [{subject:'Aim',A:85},{subject:'IQ',A:99},{subject:'Team',A:95},{subject:'Clutch',A:92},{subject:'Utility',A:98}] }
];

const REWARDS = [
  { id: 1, name: 'Golden Trophy', type: 'Legacy', cost: '5000 pts', icon: <Trophy color="#ffd700" /> },
  { id: 2, name: 'Cyber Blade', type: 'Skin', cost: '1200 pts', icon: <Zap color="#00f2ff" /> },
  { id: 3, name: 'Shield of Valor', type: 'Badge', cost: '800 pts', icon: <Shield color="#ff007a" /> }
];

const MMR_HISTORY = [
  { day: 'Mon', mmr: 2400 }, { day: 'Tue', mmr: 2450 }, { day: 'Wed', mmr: 2420 },
  { day: 'Thu', mmr: 2500 }, { day: 'Fri', mmr: 2580 }, { day: 'Sat', mmr: 2600 }, { day: 'Sun', mmr: 2650 }
];

function App() {
  const [activeTab, setActiveTab] = useState('brackets');
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const [notifications, setNotifications] = useState([]);

  // --- Admin Logic (Simulating Builder Pattern) ---
  const [newPlayer, setNewPlayer] = useState({ name: '', email: '', mmr: 1000 });
  const handleAddPlayer = () => {
    const player = { ...newPlayer, id: Date.now(), rank: 'Bronze', stats: INITIAL_PLAYERS[0].stats };
    setPlayers([...players, player]);
    setNewPlayer({ name: '', email: '', mmr: 1000 });
    notify("System: NEW_ENTITY_CREATED (Builder Success)");
  };

  const notify = (msg) => {
    setNotifications(prev => [{ id: Date.now(), msg }, ...prev].slice(0, 3));
  };

  return (
    <div className="dashboard-enterprise">
      <div className="scanline" />
      
      {/* --- Sidebar Nav --- */}
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
          
          <SectionLabel label="ECONOMY" />
          <NavItem icon={<Coins />} label="Vault" active={activeTab === 'vault'} onClick={() => setActiveTab('vault')} />
          <NavItem icon={<Award />} label="Trophies" active={activeTab === 'rankings'} onClick={() => setActiveTab('rankings')} />
          
          <SectionLabel label="ADMIN" />
          <NavItem icon={<UserPlus />} label="Builder" active={activeTab === 'admin'} onClick={() => setActiveTab('admin')} />
          <NavItem icon={<Activity />} label="Live Ops" active={activeTab === 'live'} onClick={() => setActiveTab('live')} />
          
          <SectionLabel label="SYSTEM" />
          <NavItem icon={<Settings />} label="Control" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>
      </aside>

      {/* --- Content Area --- */}
      <main className="content-pro">
        <header className="header-pro">
          <div className="search-pro">
            <Search size={18} />
            <input placeholder="Search entities..." />
          </div>
          <div className="user-profile">
            <div className="online-status">ADMIN: AUTH_LEVEL_10</div>
            <div className="p-circle" />
          </div>
        </header>

        <div className="viewport">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="view-wrapper"
            >
              {activeTab === 'brackets' && <BracketView />}
              {activeTab === 'players' && <PlayerRosterView players={players} selected={selectedPlayer} onSelect={setSelectedPlayer} />}
              {activeTab === 'vault' && <VaultView items={REWARDS} />}
              {activeTab === 'admin' && <AdminBuilderView data={newPlayer} setData={setNewPlayer} onAdd={handleAddPlayer} />}
              {activeTab === 'strategies' && <StrategyView />}
              {activeTab === 'live' && <LiveFeedView notifications={notifications} />}
              {activeTab === 'rankings' && <AnalyticsView data={MMR_HISTORY} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- Views Components ---

function BracketView() {
  return (
    <div className="view-card">
      <div className="v-header">
        <h2>Tournament Brackets</h2>
        <span>Active: VALORANT MASTERS</span>
      </div>
      <div className="b-grid">
        <div className="b-col">
          <MatchCard t1="T1" t2="G2" s1="2" s2="0" />
          <MatchCard t1="NAVI" t2="FNC" s1="2" s2="1" />
        </div>
        <div className="b-col center">
          <MatchCard t1="T1" t2="NAVI" s1="TBD" s2="TBD" isLive />
        </div>
        <div className="b-col end">
          <div className="winner-circle"><Trophy size={40} color="var(--primary)" /></div>
        </div>
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
            <div className="p-id">#{p.id.toString().slice(-2)}</div>
            <span>{p.name}</span>
            <ChevronRight size={16} />
          </div>
        ))}
      </div>
      <div className="p-detail-pro">
        <div className="d-header">
          <div className="p-avatar-large" />
          <div>
            <h3>{selected.name}</h3>
            <p>{selected.rank} • MMR: {selected.mmr}</p>
          </div>
        </div>
        <div className="radar-pro">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={selected.stats}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#7a7e9d', fontSize: 11 }} />
              <Radar dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function VaultView({ items }) {
  return (
    <div className="vault-view">
      <h2>Global Vault & Rewards</h2>
      <div className="v-grid">
        {items.map(item => (
          <motion.div whileHover={{ scale: 1.02 }} key={item.id} className="v-card">
            <div className="v-icon">{item.icon}</div>
            <h4>{item.name}</h4>
            <p>{item.type}</p>
            <div className="v-price">{item.cost}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AdminBuilderView({ data, setData, onAdd }) {
  return (
    <div className="admin-view">
      <div className="builder-form">
        <h2>Entity Builder (Pattern Simulation)</h2>
        <div className="f-group">
          <label>Username</label>
          <input value={data.name} onChange={e => setData({...data, name: e.target.value})} placeholder="e.g. TenZ" />
        </div>
        <div className="f-group">
          <label>Email Address</label>
          <input value={data.email} onChange={e => setData({...data, email: e.target.value})} placeholder="player@esports.com" />
        </div>
        <div className="f-group">
          <label>Initial MMR</label>
          <input type="number" value={data.mmr} onChange={e => setData({...data, mmr: e.target.value})} />
        </div>
        <button className="btn-pro" onClick={onAdd}>BUILD PLAYER ENTITY</button>
      </div>
      <div className="builder-info">
        <BookOpen size={40} />
        <p>This module demonstrates the **Builder Pattern**. By defining attributes step-by-step, we ensure object integrity before persisting to the Repository.</p>
      </div>
    </div>
  );
}

function StrategyView() {
  return (
    <div className="strat-view">
      <h2>Tactical Strategy Builder</h2>
      <div className="strat-cards">
        <StratCard name="Aggressive" desc="High risk, high kill reward" icon={<Zap />} color="#ff007a" />
        <StratCard name="Defensive" desc="Slow pace, utility focus" icon={<Shield />} color="#00f2ff" />
        <StratCard name="Balanced" desc="Standard league playstyle" icon={<Sword />} color="#7000ff" />
      </div>
    </div>
  );
}

function AnalyticsView({ data }) {
  return (
    <div className="view-card">
      <h2>MMR Performance Analytics</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="day" stroke="#7a7e9d" />
          <YAxis stroke="#7a7e9d" />
          <Tooltip contentStyle={{ background: '#12142d', border: '1px solid var(--primary)' }} />
          <Line type="monotone" dataKey="mmr" stroke="var(--primary)" strokeWidth={3} dot={{ fill: 'var(--primary)', r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
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
            <div className="f-pulse" />
            <span>{n.msg}</span>
          </div>
        ))}
        <div className="feed-item-pro"><span>Waiting for system events...</span></div>
      </div>
    </div>
  );
}

// --- Helpers ---

function NavItem({ icon, label, active, onClick }) {
  return (
    <div className={`nav-item-pro ${active ? 'active' : ''}`} onClick={onClick}>
      {icon} <span>{label}</span>
    </div>
  );
}

function SectionLabel({ label }) {
  return <div className="section-label">{label}</div>;
}

function MatchCard({ t1, t2, s1, s2, isLive }) {
  return (
    <div className={`m-card-pro ${isLive ? 'live' : ''}`}>
      <div className="m-team"><span>{t1}</span> <span>{s1}</span></div>
      <div className="m-team"><span>{t2}</span> <span>{s2}</span></div>
    </div>
  );
}

function StratCard({ name, desc, icon, color }) {
  return (
    <div className="strat-card-pro" style={{ borderColor: color }}>
      <div style={{ color }}>{icon}</div>
      <h4>{name}</h4>
      <p>{desc}</p>
    </div>
  );
}

export default App;
