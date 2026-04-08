import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import {
  Settings, ChevronRight, Search, X
} from 'lucide-react';
import Fuse from 'fuse.js';

const GROUP_ORDER = [
  { key: 'front',      label: 'Ön Büro & Operasyon', icon: '🏨', color: '#3b82f6' },
  { key: 'revenue',    label: 'Gelir & Finans',        icon: '💰', color: '#10b981' },
  { key: 'fb',         label: 'Yiyecek & İçecek',      icon: '🍽️', color: '#f59e0b' },
  { key: 'guest',      label: 'Misafir İlişkileri',     icon: '👥', color: '#8b5cf6' },
  { key: 'operations', label: 'Operasyon',              icon: '⚙️', color: '#ef4444' },
  { key: 'analytics',  label: 'Analiz & Raporlama',     icon: '📊', color: '#64748b' },
  { key: 'system',     label: 'Sistem (IT)',             icon: '🔧', color: '#475569' },
];

const MODULE_GROUPS = {
  front:      ['dashboard','front-office','new-reservation','res-list','res-card','reservations-tape','checkout','room-rack','tape-chart','kbs','night-audit','housekeeping'],
  revenue:    ['revenue','cash-desk','folio','finance','accounting','budget','cost-control','forecast'],
  fb:         ['pos','minibar','spa','entertainment','laundry','banquet'],
  guest:      ['crm','loyalty','surveys','group-res','lost-found'],
  operations: ['tech-service','stock','purchasing','hr','smart-room','contracts','tours'],
  analytics:  ['global-vision','ai-strategy','sales-marketing','kvkk'],
  system:     ['channel','crs','it-infra','integrations','system-admin'],
};

const findGroup = (moduleId) => {
  for (const [key, ids] of Object.entries(MODULE_GROUPS)) {
    if (ids.includes(moduleId)) return key;
  }
  return null;
};

const Sidebar = ({ activeModule, onSelectModule, modules }) => {
  const { stats, reservations, tasks } = useHotel();
  const [search, setSearch] = useState('');
  // All groups default to OPEN (false = not collapsed)
  const [collapsedGroups, setCollapsedGroups] = useState({
    front: false, revenue: false, fb: false, guest: false,
    operations: false, analytics: false, system: false,
  });

  const toggleGroup = (key) => {
    setCollapsedGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const pendingCI   = reservations.filter(r => r.status === 'gelecek').length;
  const pendingCO   = reservations.filter(r => r.status === 'check-in').length;
  const openTasks   = tasks.filter(t => t.status !== 'bitti').length;
  const openBalance = reservations.filter(r => r.status === 'check-in' && r.balance > 0).length;

  const BADGES = {
    'front-office': pendingCI   > 0 ? pendingCI   : null,
    'checkout':     pendingCO   > 0 ? pendingCO   : null,
    'housekeeping': openTasks   > 0 ? openTasks   : null,
    'folio':        openBalance > 0 ? openBalance : null,
    'kbs':          2,
  };

  const fuse = React.useMemo(() => new Fuse(modules, {
    keys: ['name', 'id'],
    threshold: 0.4,
  }), [modules]);

  const filteredModules = search
    ? fuse.search(search).map(r => r.item)
    : modules;

  const activeGroup = findGroup(activeModule);

  const renderModuleButton = (module) => (
    <button
      key={module.id}
      className={`nav-item ${activeModule === module.id ? 'active' : ''}`}
      onClick={() => onSelectModule(module.id)}
    >
      <div className="ni-icon" style={{ color: activeModule === module.id ? 'white' : module.color }}>
        {React.cloneElement(module.icon, { size: 16 })}
      </div>
      <span>{module.name}</span>
      {BADGES[module.id] && (
        <span className="nav-badge red">{BADGES[module.id]}</span>
      )}
    </button>
  );

  return (
    <aside className="hub-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-box">H</div>
        <div>
          <strong>HOTEL ERP</strong>
          <div className="logo-sub">v3.0 Premium</div>
        </div>
      </div>

      {/* Live Stats */}
      <div className="live-strip">
        <div className="ls-item">
          <span>Doluluk</span>
          <strong style={{ color: '#3b82f6' }}>%{stats.occupancyRate}</strong>
        </div>
        <div className="ls-div" />
        <div className="ls-item">
          <span>İçeride</span>
          <strong style={{ color: '#10b981' }}>{stats.inHouse}</strong>
        </div>
        <div className="ls-div" />
        <div className="ls-item">
          <span>Görev</span>
          <strong style={{ color: openTasks > 0 ? '#f59e0b' : '#10b981' }}>{openTasks}</strong>
        </div>
      </div>

      <nav className="sidebar-nav">
        {/* Search */}
        <div className="search-row">
          <div className="search-wrap">
            <Search size={13} className="search-icon-inner" />
            <input
              className="mod-search"
              placeholder="Modül ara..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')}>
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        <div className="scroll-area">
          {search ? (
            filteredModules.length === 0
              ? <div className="no-mod">Modül bulunamadı.</div>
              : filteredModules.map(renderModuleButton)
          ) : (
            GROUP_ORDER.map(grp => {
              const ids     = MODULE_GROUPS[grp.key] || [];
              const grpMods = ids.map(id => filteredModules.find(m => m.id === id)).filter(Boolean);
              if (grpMods.length === 0) return null;

              // Active module's group is always shown open
              const isOpen = (activeGroup === grp.key) || !collapsedGroups[grp.key];

              return (
                <div key={grp.key} className="sidebar-group">
                  <div
                    className="sg-title"
                    onClick={() => { if (activeGroup !== grp.key) toggleGroup(grp.key); }}
                    style={{ borderLeft: `3px solid ${grp.color}` }}
                  >
                    <div className="sg-t-left">
                      <span className="sg-icon">{grp.icon}</span>
                      <span className="sg-label" style={{ color: grp.color }}>{grp.label}</span>
                    </div>
                    <ChevronRight size={14} className={`sg-chevron ${isOpen ? 'open' : ''}`} />
                  </div>
                  {isOpen && (
                    <div className="sg-content">
                      {grpMods.map(renderModuleButton)}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item" onClick={() => onSelectModule('system-admin')}>
          <Settings size={16} /><span>Sistem Ayarları</span>
        </button>
      </div>

      <style>{`
        .hub-sidebar {
          width: 256px;
          background: #0f172a;
          height: 100vh;
          display: flex;
          flex-direction: column;
          color: white;
          position: sticky;
          top: 0;
          flex-shrink: 0;
        }
        .sidebar-logo { padding: 18px 18px 14px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .logo-box { width: 36px; height: 36px; background: linear-gradient(135deg,#3b82f6,#8b5cf6); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 17px; flex-shrink: 0; }
        .sidebar-logo strong { font-size: 13px; font-weight: 900; letter-spacing: 1.5px; display: block; }
        .logo-sub { font-size: 10px; color: #64748b; font-weight: 700; margin-top: 2px; }

        .live-strip { display: flex; align-items: center; justify-content: space-around; padding: 10px 16px; background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .ls-item { display: flex; flex-direction: column; align-items: center; gap: 1px; }
        .ls-item span { font-size: 9px; color: #64748b; font-weight: 700; text-transform: uppercase; }
        .ls-item strong { font-size: 15px; font-weight: 900; }
        .ls-div { width: 1px; height: 22px; background: rgba(255,255,255,0.08); }

        .sidebar-nav { flex: 1; padding: 10px 10px 0; overflow: hidden; display: flex; flex-direction: column; }

        .search-row { margin-bottom: 8px; }
        .search-wrap { position: relative; display: flex; align-items: center; }
        .search-icon-inner { position: absolute; left: 10px; color: #475569; flex-shrink: 0; }
        .mod-search { width: 100%; padding: 8px 32px 8px 30px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.06); border-radius: 8px; color: white; font-size: 12px; outline: none; box-sizing: border-box; }
        .mod-search::placeholder { color: #475569; }
        .mod-search:focus { border-color: rgba(59,130,246,0.5); background: rgba(255,255,255,0.09); }
        .search-clear { position: absolute; right: 8px; background: transparent; border: none; color: #64748b; cursor: pointer; padding: 2px; display: flex; }
        .search-clear:hover { color: white; }

        .scroll-area { flex: 1; overflow-y: auto; padding-right: 2px; }
        .scroll-area::-webkit-scrollbar { width: 3px; }
        .scroll-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }

        .sidebar-group { margin-bottom: 4px; }
        .sg-title {
          display: flex; justify-content: space-between; align-items: center;
          padding: 9px 10px 9px 12px;
          cursor: pointer;
          background: rgba(255,255,255,0.04);
          border-radius: 8px;
          margin-bottom: 2px;
          transition: background 0.2s;
          user-select: none;
        }
        .sg-title:hover { background: rgba(255,255,255,0.08); }
        .sg-t-left { display: flex; align-items: center; gap: 10px; }
        .sg-icon { font-size: 14px; line-height: 1; }
        .sg-label { font-size: 11px; font-weight: 800; letter-spacing: 0.5px; }
        .sg-chevron { transition: transform 0.25s; color: #475569; flex-shrink: 0; }
        .sg-chevron.open { transform: rotate(90deg); }

        .sg-content { display: flex; flex-direction: column; gap: 1px; padding: 2px 0 6px 8px; }

        .nav-item {
          width: 100%; display: flex; align-items: center; gap: 9px; padding: 8px 10px;
          background: transparent; border: none; color: #94a3b8; border-radius: 8px;
          cursor: pointer; transition: 0.15s; font-size: 12.5px; font-weight: 600;
          text-align: left; position: relative;
        }
        .nav-item:hover { background: rgba(255,255,255,0.06); color: white; }
        .nav-item.active { background: #3b82f6; color: white; box-shadow: 0 2px 12px rgba(59,130,246,0.35); }

        .ni-icon { width: 18px; display: flex; justify-content: center; flex-shrink: 0; }
        .nav-item span { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .nav-badge { background: #ef4444; color: white; font-size: 10px; font-weight: 900; padding: 1px 6px; border-radius: 10px; min-width: 18px; text-align: center; flex-shrink: 0; }

        .no-mod { text-align: center; padding: 24px 0; color: #475569; font-size: 12px; }

        .sidebar-footer { padding: 10px; border-top: 1px solid rgba(255,255,255,0.06); }
      `}</style>
    </aside>
  );
};

export default Sidebar;
