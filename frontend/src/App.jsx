import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Users, Sword, Settings, Bell, 
  Search, Shield, Zap, Target, Star,
  TrendingUp, Award, PlayCircle, Activity,
  Cpu, Layout, BarChart3, ChevronRight,
  Database, Coins, Map, UserPlus, BookOpen, 
  Plus, Globe, Terminal, BrainCircuit, Signal,
  History, Eye, AlertTriangle
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import { DataService } from './services/DataService';

function App() {
  const [activeTab, setActiveTab] = useState('brackets');
  const [players, setPlayers] = useState(() => DataService.getPlayers());
  const [tournaments, setTournaments] = useState(() => DataService.getTournaments());
  const [auditLogs, setAuditLogs] = useState([]);
  const [activeMatch, setActiveMatch] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simEvents, setSimEvents] = useState([]);

  // --- Audit Logger (Titan Feature) ---
  const logAction = useCallback((action) => {
    const newLog = DataService.logEvent(action);
    setAuditLogs(prev => [newLog, ...prev].slice(0, 50));
  }, []);

  // --- Match Simulator Engine ---
  const runSimulation = (match) => {
    logAction(`MATCH_SIM_STARTED: ${match.t1} vs ${match.t2}`);
    setIsSimulating(true);
    setSimEvents([]);
    const events = ["Kill by Player A", "Planting Spike...", "Utility deployed", "Round Secured", "Economy reset"];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i >= 5) {
        clearInterval(interval);
        setIsSimulating(false);
        logAction(`MATCH_SIM_COMPLETED: Winner TBD`);
        return;
      }
      setSimEvents(prev => [...prev, { id: i, msg: events[i], time: new Date().toLocaleTimeString() }]);
      i++;
    }, 1500);
  };

  return (
    <div className="dashboard-titan">
      <div className="scanline" />
      
      {/* Sidebar Titan */}
      <aside className="sidebar-titan">
        <div className="brand-titan"><BrainCircuit size={24} /> <span>TITAN_OS</span></div>
        <nav className="nav-titan">
          <SectionLabel label="OPERATIONS" />
          <NavItem icon={<Layout />} label="War Room" active={activeTab === 'brackets'} onClick={() => setActiveTab('brackets')} />
          <NavItem icon={<Users />} label="Elite Rosters" active={activeTab === 'players'} onClick={() => setActiveTab('players')} />
          <NavItem icon={<Map />} label="Tactical Map" active={activeTab === 'strategies'} onClick={() => setActiveTab('strategies')} />
          
          <SectionLabel label="SYSTEM AUDIT" />
          <NavItem icon={<History />} label="Audit Trail" active={activeTab === 'audit'} onClick={() => { setActiveTab('audit'); logAction('VIEW_AUDIT_LOGS'); }} />
          <NavItem icon={<Activity />} label="Match SIM" active={activeTab === 'sim'} onClick={() => setActiveTab('sim')} />
          
          <SectionLabel label="ADMIN" />
          <NavItem icon={<Settings />} label="Kernel Control" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>
      </aside>

      <main className="main-titan">
        <header className="header-titan">
          <div className="search-titan"><Search size={18} /> <span>TITAN_SEARCH...</span></div>
          <div className="status-titan">STABLE // SYNC: 100%</div>
        </header>

        <div className="viewport-titan">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} className="view-wrapper">
              {activeTab === 'brackets' && <BracketView onSelect={setActiveMatch} />}
              {activeTab === 'audit' && <AuditView logs={auditLogs} />}
              {activeTab === 'sim' && <SimulatorView isSimulating={isSimulating} events={simEvents} match={activeMatch} onStart={() => runSimulation(activeMatch)} />}
              {activeTab === 'players' && <div className="placeholder-god">Roster Module Operational</div>}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Match Detail Overlay --- */}
        <AnimatePresence>
          {activeMatch && activeTab === 'brackets' && (
            <MatchIntelligence match={activeMatch} onClose={() => setActiveMatch(null)} onWatch={() => { setActiveTab('sim'); runSimulation(activeMatch); }} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Sub-Views ---

function BracketView({ onSelect }) {
  const matches = [
    { id: 1, t1: 'T1', t2: 'G2', prob: '85%', color: 'var(--primary)' },
    { id: 2, t1: 'NAVI', t2: 'FNC', prob: '42%', color: 'var(--secondary)' }
  ];

  return (
    <div className="view-card-titan">
      <h2>Active Combat Brackets</h2>
      <div className="b-grid-titan">
        {matches.map(m => (
          <div key={m.id} className="m-card-titan" onClick={() => onSelect(m)}>
            <div className="m-info">AI WIN PROB: {m.prob}</div>
            <div className="m-teams"><span>{m.t1}</span> <span>vs</span> <span>{m.t2}</span></div>
            <div className="m-action">ANALYSIS_READY <ChevronRight size={14} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchIntelligence({ match, onClose, onWatch }) {
  return (
    <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} className="intel-panel">
      <div className="intel-header">
        <Shield size={24} color="var(--primary)" />
        <h3>INTELLIGENCE REPORT</h3>
        <button onClick={onClose} className="close-btn">×</button>
      </div>
      <div className="intel-content">
        <div className="vs-header">
          <div className="t-box">{match.t1}</div>
          <span>VS</span>
          <div className="t-box">{match.t2}</div>
        </div>
        <div className="win-meter">
          <div className="w-fill" style={{ width: match.prob }} />
        </div>
        <p className="intel-text">Our neural engine predicts a <strong>{match.prob}</strong> win probability for {match.t1} based on recent scrim results.</p>
        <button className="watch-btn" onClick={onWatch}><PlayCircle size={18} /> INITIATE SIMULATION</button>
      </div>
    </motion.div>
  );
}

function SimulatorView({ isSimulating, events, match, onStart }) {
  return (
    <div className="sim-view">
      <div className="sim-header">
        <h2>{match ? `SIMULATING: ${match.t1} vs ${match.t2}` : 'SELECT A MATCH FROM BRACKETS'}</h2>
        {match && !isSimulating && <button className="btn-titan" onClick={onStart}>RE-RUN SIMULATION</button>}
      </div>
      <div className="sim-grid">
        <div className="sim-console">
          <div className="c-header"><Terminal size={14} /> KERNEL_SIM_OUTPUT</div>
          <div className="c-content">
            {events.map(e => (
              <div key={e.id} className="c-line">
                <span className="c-time">[{e.time}]</span> {e.msg}
              </div>
            ))}
            {isSimulating && <div className="c-line pulse">EXECUTING_LOGIC...</div>}
            {!isSimulating && events.length > 0 && <div className="c-line success">SIMULATION_COMPLETE</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function AuditView({ logs }) {
  return (
    <div className="view-card-titan">
      <h2>System Audit Trail</h2>
      <div className="audit-list">
        <div className="audit-header">
          <span>TIME</span>
          <span>ACTION</span>
          <span>ACTOR</span>
        </div>
        {logs.map(log => (
          <div key={log.id} className="audit-item">
            <span className="a-time">{log.time}</span>
            <span className="a-action">{log.action}</span>
            <span className="a-user">{log.user}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Helpers ---
function NavItem({ icon, label, active, onClick }) {
  return <div className={`nav-item-titan ${active ? 'active' : ''}`} onClick={onClick}>{icon} <span>{label}</span></div>;
}
function SectionLabel({ label }) { return <div className="section-label-titan">{label}</div>; }

export default App;
