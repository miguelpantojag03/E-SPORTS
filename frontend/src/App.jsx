import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Users, Sword, Settings, Bell, 
  Search, Shield, Zap, Target, Star,
  TrendingUp, Award, PlayCircle, Activity,
  Cpu, Layout, BarChart3, ChevronRight,
  Database, Coins, Map as MapIcon, UserPlus, BookOpen, 
  Plus, Globe, Terminal, BrainCircuit, Signal,
  History, Eye, AlertTriangle, MessageSquare, Flame
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import Sidebar from './components/Sidebar';
import { useData } from './hooks/useData';

function App() {
  const { players, tournaments, auditLogs, logEvent } = useData();
  const [activeTab, setActiveTab] = useState('brackets');
  const [activeMatch, setActiveMatch] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simEvents, setSimEvents] = useState([]);
  const [comparePlayers, setComparePlayers] = useState([players[0], players[1]]);

  // --- Infinity Feature: Social Pulse (Chat Sim) ---
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Coach_X', text: 'T1 looks strong today.', time: '21:00' }
  ]);

  useEffect(() => {
    if (isSimulating) {
      const msgs = ["WOW! WHAT A SHOT!", "Economy is broken for G2", "Clutch moment incoming...", "GG EASY"];
      const interval = setInterval(() => {
        setChatMessages(prev => [{ id: Date.now(), user: 'Fan_'+Math.floor(Math.random()*99), text: msgs[Math.floor(Math.random()*msgs.length)], time: new Date().toLocaleTimeString() }, ...prev].slice(0, 10));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isSimulating]);

  return (
    <div className="dashboard-titan">
      <div className="scanline" />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} pings={[{city:'MADRID',ping:12},{city:'NYC',ping:85}]} />

      <main className="main-titan">
        <header className="header-titan">
          <div className="search-titan"><Search size={18} /> <span>SEARCH_GLOBAL_OS...</span></div>
          <div className="header-widgets">
            <div className="pulse-item"><Globe size={18} /> <span>LIVE_TRAFFIC: 14.2k</span></div>
            <div className="pulse-item"><Flame size={18} color="var(--primary)" /> <span>HOT_TREND: VALORANT</span></div>
          </div>
        </header>

        <div className="viewport-titan">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="view-wrapper">
              {activeTab === 'brackets' && <BracketView tournaments={tournaments} onSelect={setActiveMatch} />}
              {activeTab === 'players' && <ComparisonView players={players} compare={comparePlayers} onSelect={setComparePlayers} />}
              {activeTab === 'sim' && <SimulatorView events={simEvents} match={activeMatch} isSimulating={isSimulating} chat={chatMessages} />}
              {activeTab === 'strategies' && <GlobalMapView />}
              {activeTab === 'audit' && <AchievementRoom />}
            </motion.div>
          </AnimatePresence>
        </div>

        {activeMatch && activeTab === 'brackets' && (
          <MatchIntelligence match={activeMatch} onClose={() => setActiveMatch(null)} />
        )}
      </main>
    </div>
  );
}

// --- Infinity Views ---

function ComparisonView({ players, compare, onSelect }) {
  return (
    <div className="view-card-titan">
      <h2>Elite Player Comparison</h2>
      <div className="compare-grid">
        <div className="p-selector">
          <h3>Roster Selection</h3>
          {players.map(p => (
            <div key={p.id} className={`sel-item ${compare.find(c => c.id === p.id) ? 'active' : ''}`} onClick={() => {
              const newC = [...compare];
              newC[0] = p; // Simple toggle for demo
              onSelect(newC);
            }}>
              {p.name} <ChevronRight size={14} />
            </div>
          ))}
        </div>
        <div className="compare-chart">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={compare[0].stats}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#70748b', fontSize: 12 }} />
              <Radar name={compare[0].name} dataKey="A" stroke={INITIAL_THEMES.blue} fill={INITIAL_THEMES.blue} fillOpacity={0.4} />
              <Radar name={compare[1].name} dataKey="A" stroke={INITIAL_THEMES.pink} fill={INITIAL_THEMES.pink} fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            <span style={{ color: INITIAL_THEMES.blue }}>● {compare[0].name}</span>
            <span style={{ color: INITIAL_THEMES.pink }}>● {compare[1].name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const INITIAL_THEMES = { blue: '#00f2ff', pink: '#ff007a' };

function GlobalMapView() {
  return (
    <div className="view-card-titan">
      <h2>Live Infrastructure Traffic</h2>
      <div className="map-container-sim">
        <div className="map-point" style={{ top: '40%', left: '20%' }}><div className="m-ping" /><span>NA_EAST</span></div>
        <div className="map-point" style={{ top: '35%', left: '48%' }}><div className="m-ping" /><span>EU_WEST</span></div>
        <div className="map-point" style={{ top: '50%', left: '80%' }}><div className="m-ping" /><span>ASIA_PACIFIC</span></div>
        <div className="map-svg-sim">MAP_VIRTUALIZATION_ACTIVE</div>
      </div>
    </div>
  );
}

function AchievementRoom() {
  const ach = [
    { name: 'ARCHITECT', desc: 'System kernel initialized', icon: <Cpu /> },
    { name: 'WARLORD', desc: '10 Match simulations run', icon: <Sword /> },
    { name: 'TYCOON', desc: 'Tournament prize > $1M', icon: <Trophy /> }
  ];
  return (
    <div className="view-card-titan">
      <h2>Achievement Vault</h2>
      <div className="ach-grid">
        {ach.map(a => (
          <div key={a.name} className="ach-card">
            <div className="ach-icon">{a.icon}</div>
            <h3>{a.name}</h3>
            <p>{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reuse & Refine other components...
function BracketView({ tournaments, onSelect }) {
  return (
    <div className="view-card-titan">
      <h2>Tournament War Room</h2>
      <div className="b-grid-titan">
        {tournaments.map(t => (
          <div key={t.id} className="m-card-titan" onClick={() => onSelect({ t1: 'T1', t2: 'G2', prob: '85%' })}>
            <div className="m-info">LIVE_MATCH // {t.game}</div>
            <div className="m-teams"><span>T1</span> <span>VS</span> <span>G2</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimulatorView({ events, match, isSimulating, chat }) {
  return (
    <div className="sim-layout">
      <div className="sim-main">
        <h2>{match ? `SIM: ${match.t1} vs ${match.t2}` : 'AWAITING_INTEL'}</h2>
        <div className="sim-console">
          {events.map(e => <div key={e.id} className="c-line"><span className="c-time">[{e.time}]</span> {e.msg}</div>)}
        </div>
      </div>
      <div className="sim-social">
        <h3>SOCIAL_PULSE</h3>
        <div className="chat-box">
          {chat.map(m => (
            <div key={m.id} className="chat-msg">
              <span className="c-user">{m.user}:</span> {m.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MatchIntelligence({ match, onClose }) {
  return (
    <motion.div initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }} className="intel-panel">
      <div className="intel-header"><Shield /> <h3>INTEL_REPORT</h3> <button onClick={onClose}>×</button></div>
      <div className="vs-header"><div>{match.t1}</div> <span>VS</span> <div>{match.t2}</div></div>
      <div className="win-meter"><div className="w-fill" style={{ width: match.prob }} /></div>
      <p>WIN_PROBABILITY: {match.prob}</p>
      <button className="watch-btn">DEPLOY_DRONES</button>
    </motion.div>
  );
}

export default App;
