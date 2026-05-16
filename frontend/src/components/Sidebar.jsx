import React from 'react';
import { Layout, BarChart3, Users, Map, Coins, Terminal, Activity, Settings, BrainCircuit } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onCommandClick, pings }) => (
  <aside className="sidebar-titan">
    <div className="brand-titan"><BrainCircuit size={24} /> <span>TITAN_OS</span></div>
    <nav className="nav-titan">
      <SectionLabel label="OPERATIONS" />
      <NavItem icon={<Layout />} label="War Room" active={activeTab === 'brackets'} onClick={() => setActiveTab('brackets')} />
      <NavItem icon={<Users />} label="Elite Rosters" active={activeTab === 'players'} onClick={() => setActiveTab('players')} />
      
      <SectionLabel label="SYSTEM AUDIT" />
      <NavItem icon={<Terminal />} label="Command Center" onClick={onCommandClick} />
      <NavItem icon={<Activity />} label="Match SIM" active={activeTab === 'sim'} onClick={() => setActiveTab('sim')} />
    </nav>
    <div className="sidebar-footer">
      {pings.map(s => (
        <div key={s.city} className="ping-item">
          <span>{s.city}</span>
          <span className="ping-val">{s.ping}ms</span>
        </div>
      ))}
    </div>
  </aside>
);

const NavItem = ({ icon, label, active, onClick }) => (
  <div className={`nav-item-titan ${active ? 'active' : ''}`} onClick={onClick}>
    {icon} <span>{label}</span>
  </div>
);

const SectionLabel = ({ label }) => <div className="section-label-titan">{label}</div>;

export default Sidebar;
