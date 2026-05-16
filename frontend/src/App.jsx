import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, PlayCircle, Terminal, Shield, Trophy } from 'lucide-react';
import Sidebar from './components/Sidebar';
import { useData } from './hooks/useData';

function App() {
  const { players, tournaments, auditLogs, logEvent } = useData();
  const [activeTab, setActiveTab] = useState('brackets');
  const [activeMatch, setActiveMatch] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simEvents, setSimEvents] = useState([]);
  const [pings, setPings] = useState([
    { city: 'MADRID', ping: 12 },
    { city: 'NYC', ping: 85 }
  ]);

  // Real-time ping simulation logic
  useEffect(() => {
    const t = setInterval(() => {
      setPings(p => p.map(s => ({ ...s, ping: s.ping + (Math.random() > 0.5 ? 1 : -1) })));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const runSimulation = (match) => {
    logEvent(`MATCH_SIM_STARTED: ${match.t1} vs ${match.t2}`);
    setIsSimulating(true);
    setSimEvents([]);
    const sequence = ["INITIATING_KERNEL", "LOADING_MAP_DATA", "PLAYER_S1MPLE_CONNECT", "MATCH_LIVE", "ROUND_WIN: T1"];
    sequence.forEach((msg, i) => {
      setTimeout(() => {
        setSimEvents(prev => [...prev, { id: i, msg, time: new Date().toLocaleTimeString() }]);
        if (i === sequence.length - 1) setIsSimulating(false);
      }, i * 1000);
    });
  };

  return (
    <div className="dashboard-titan">
      <div className="scanline" />
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        pings={pings}
        onCommandClick={() => alert("Command Center Active")} 
      />

      <main className="main-titan">
        <header className="header-titan">
          <div className="search-titan"><Search size={18} /> <span>TITAN_SEARCH...</span></div>
          <div className="status-titan">KERNEL_STABLE // SYNC_OK</div>
        </header>

        <div className="viewport-titan">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="view-wrapper">
              {activeTab === 'brackets' && <BracketView tournaments={tournaments} onSelect={setActiveMatch} />}
              {activeTab === 'sim' && <SimulatorView isSimulating={isSimulating} events={simEvents} match={activeMatch} onStart={() => runSimulation(activeMatch)} />}
              {activeTab === 'players' && <RosterView players={players} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {activeMatch && activeTab === 'brackets' && (
            <MatchIntelligence match={activeMatch} onClose={() => setActiveMatch(null)} onWatch={() => { setActiveTab('sim'); runSimulation(activeMatch); }} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Internal Components (Optimized) ---

const BracketView = ({ tournaments, onSelect }) => (
  <div className="view-card-titan">
    <h2>Combat Brackets</h2>
    <div className="b-grid-titan">
      {tournaments.map(t => (
        <div key={t.id} className="m-card-titan" onClick={() => onSelect({ t1: 'T1', t2: 'G2', prob: '85%' })}>
          <div className="m-info">AI: 85% // {t.game}</div>
          <div className="m-teams"><span>T1</span> <span>VS</span> <span>G2</span></div>
          <div className="m-action">DEPLOY_INTEL <ChevronRight size={14} /></div>
        </div>
      ))}
    </div>
  </div>
);

const RosterView = ({ players }) => (
  <div className="view-card-titan">
    <h2>Elite Personnel</h2>
    <div className="roster-list-titan">
      {players.map(p => (
        <div key={p.id} className="p-item-titan">
          <span>{p.name}</span>
          <span className="p-rank">{p.rank}</span>
        </div>
      ))}
    </div>
  </div>
);

const SimulatorView = ({ isSimulating, events, match, onStart }) => (
  <div className="sim-view">
    <h2>{match ? `SIMULATING: ${match.t1} vs ${match.t2}` : 'AWAITING_MATCH_SELECTION'}</h2>
    <div className="sim-console">
      <div className="c-header"><Terminal size={14} /> SYSTEM_OUTPUT</div>
      <div className="c-content">
        {events.map(e => <div key={e.id} className="c-line"><span className="c-time">[{e.time}]</span> {e.msg}</div>)}
        {isSimulating && <div className="c-line pulse">PROCESSING...</div>}
      </div>
    </div>
    {match && !isSimulating && <button className="watch-btn" onClick={onStart}>RE-INITIATE</button>}
  </div>
);

const MatchIntelligence = ({ match, onClose, onWatch }) => (
  <motion.div initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }} className="intel-panel">
    <div className="intel-header">
      <Shield size={20} /> <h3>INTEL_REPORT</h3>
      <button onClick={onClose}>×</button>
    </div>
    <div className="vs-header"><div>{match.t1}</div> <span>VS</span> <div>{match.t2}</div></div>
    <div className="win-meter"><div className="w-fill" style={{ width: match.prob }} /></div>
    <button className="watch-btn" onClick={onWatch}><PlayCircle size={16} /> WATCH_LIVE</button>
  </motion.div>
);

export default App;
