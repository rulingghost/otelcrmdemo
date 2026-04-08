import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import {
  Home, LayoutGrid, Settings, HelpCircle, ChevronRight, ChevronDown,
  Calendar, CreditCard, Users, LogIn, LogOut, FileText,
  ShoppingCart, Wrench, Bed, Search, X, Star
} from 'lucide-react';
import Fuse from 'fuse.js';

const GROUP_ORDER = [
  { key: 'front', label: 'ÖN BÜRO & OPER.', icon: '🏨', color:'#3b82f6' },
  { key: 'revenue', label: 'GELİR & FİNANS', icon: '💰', color:'#10b981' },
  { key: 'fb', label: 'YİYECEK & İÇECEK', icon: '🍽️', color:'#f59e0b' },
  { key: 'guest', label: 'MİSAFİR İLİŞK.', icon: '👥', color:'#8b5cf6' },
  { key: 'operations', label: 'OPERASYON', icon: '⚙️', color:'#ef4444' },
  { key: 'analytics', label: 'ANALİZ & RAP.', icon: '📊', color:'#64748b' },
  { key: 'system', label: 'SİSTEM (IT)', icon: '🔧', color:'#475569' },
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

const PINNED = ['dashboard','front-office','new-reservation','folio','cash-desk','room-rack','housekeeping','checkout'];

const Sidebar = ({ activeModule, onSelectModule, modules }) => {
  const { stats, reservations, tasks } = useHotel();
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  // Default all groups to collapsed as per image
  const [collapsedGroups, setCollapsedGroups] = useState({
    pinned: true, front: true, revenue: true, fb: true, guest: true, operations: true, analytics: true, system: true
  });

  const toggleGroup = (key) => {
    setCollapsedGroups(prev => ({...prev, [key]: !prev[key]}));
  };

  const pendingCI = reservations.filter(r=>r.status==='gelecek').length;
  const pendingCO = reservations.filter(r=>r.status==='check-in').length;
  const openTasks = tasks.filter(t=>t.status!=='bitti').length;
  const openBalance = reservations.filter(r=>r.status==='check-in'&&r.balance>0).length;

  const BADGES = {
    'front-office':   pendingCI > 0 ? pendingCI : null,
    'checkout':       pendingCO > 0 ? pendingCO : null,
    'housekeeping':   openTasks > 0 ? openTasks : null,
    'folio':          openBalance > 0 ? openBalance : null,
    'kbs':            2, // static demo
  };

  const fuse = React.useMemo(() => new Fuse(modules, {
    keys: ['name', 'id'],
    threshold: 0.4,
  }), [modules]);

  const filteredModules = search
    ? fuse.search(search).map(result => result.item)
    : modules;

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

      {/* Live Stats strip */}
      <div className="live-strip">
        <div className="ls-item">
          <span>Doluluk</span>
          <strong style={{color:'#3b82f6'}}>%{stats.occupancyRate}</strong>
        </div>
        <div className="ls-div"/>
        <div className="ls-item">
          <span>İçeride</span>
          <strong style={{color:'#10b981'}}>{stats.inHouse}</strong>
        </div>
        <div className="ls-div"/>
        <div className="ls-item">
          <span>Görev</span>
          <strong style={{color: openTasks > 0 ? '#f59e0b' : '#10b981'}}>{openTasks}</strong>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group mt-16" style={{ marginTop: 0 }}>
          <div className="all-mod-head">
            <label>TÜM MODÜLLER</label>
            <button className="search-toggle" onClick={()=>{ setSearchOpen(!searchOpen); setSearch(''); }}>
              {searchOpen ? <X size={15}/> : <Search size={15}/>}
            </button>
          </div>
          {searchOpen && (
            <input
              className="mod-search"
              placeholder="Modül ara..."
              value={search}
              onChange={e=>setSearch(e.target.value)}
              autoFocus
            />
          )}
          <div className="scroll-area">
            {search ? (
              filteredModules.map(module => (
                <button
                  key={module.id}
                  className={`nav-item ${activeModule === module.id ? 'active' : ''}`}
                  onClick={() => onSelectModule(module.id)}
                >
                  <div className="ni-icon" style={{ color: activeModule === module.id ? 'white' : module.color }}>
                    {React.cloneElement(module.icon, { size: 18 })}
                  </div>
                  <span>{module.name}</span>
                  {BADGES[module.id] && (
                    <span className={`nav-badge ${BADGES[module.id] > 0 ? 'red' : ''}`}>{BADGES[module.id]}</span>
                  )}
                </button>
              ))
            ) : (
              <>
                {(() => {
                  const pinnedMods = PINNED.map(id => filteredModules.find(m => m.id === id)).filter(Boolean);
                  if (pinnedMods.length === 0) return null;
                  return (
                    <div className="sidebar-group">
                      <div 
                        className="sg-title interactive" 
                        onClick={() => toggleGroup('pinned')}
                        style={{color: '#f59e0b'}}
                      >
                        <div className="sg-t-left">
                          <span className="sg-icon">⭐</span>
                          <span className="sg-label">SABİTLENMİŞ MODÜLLER</span>
                        </div>
                        <ChevronRight size={14} className={`sg-chevron ${collapsedGroups['pinned'] ? '' : 'open'}`}/>
                      </div>
                      {!collapsedGroups['pinned'] && (
                        <div className="sg-content">
                          {pinnedMods.map(module => (
                            <button
                              key={module.id}
                              className={`nav-item ${activeModule === module.id ? 'active' : ''}`}
                              onClick={() => onSelectModule(module.id)}
                            >
                              <div className="ni-icon" style={{ color: activeModule === module.id ? 'white' : module.color }}>
                                {React.cloneElement(module.icon, { size: 18 })}
                              </div>
                              <span>{module.name}</span>
                              {BADGES[module.id] && (
                                <span className={`nav-badge ${BADGES[module.id] > 0 ? 'red' : ''}`}>{BADGES[module.id]}</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {GROUP_ORDER.map(grp => {
                  const ids = MODULE_GROUPS[grp.key] || [];
                  const grpMods = ids.map(id => filteredModules.find(m => m.id === id)).filter(Boolean);
                  if (grpMods.length === 0) return null;
                  
                  return (
                    <div key={grp.key} className="sidebar-group">
                      <div 
                        className="sg-title interactive" 
                        onClick={() => toggleGroup(grp.key)}
                        style={{color: grp.color}}
                      >
                        <div className="sg-t-left">
                          <span className="sg-icon">{grp.icon}</span>
                          <span className="sg-label">{grp.label}</span>
                        </div>
                        <ChevronRight size={14} className={`sg-chevron ${collapsedGroups[grp.key] ? '' : 'open'}`}/>
                      </div>
                      {!collapsedGroups[grp.key] && (
                        <div className="sg-content">
                          {grpMods.map(module => (
                            <button
                              key={module.id}
                              className={`nav-item ${activeModule === module.id ? 'active' : ''}`}
                              onClick={() => onSelectModule(module.id)}
                            >
                              <div className="ni-icon" style={{ color: activeModule === module.id ? 'white' : module.color }}>
                                {React.cloneElement(module.icon, { size: 18 })}
                              </div>
                              <span>{module.name}</span>
                              {BADGES[module.id] && (
                                <span className={`nav-badge ${BADGES[module.id] > 0 ? 'red' : ''}`}>{BADGES[module.id]}</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
            {filteredModules.length === 0 && (
              <div className="no-mod">Modül bulunamadı.</div>
            )}
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item" onClick={()=>onSelectModule('system-admin')}><Settings size={16}/><span>Sistem Ayarları</span></button>
      </div>

      <style>{`
        .hub-sidebar {
          width: 250px;
          background: #0f172a;
          height: 100vh;
          display: flex;
          flex-direction: column;
          color: white;
          position: sticky;
          top: 0;
          flex-shrink: 0;
        }

        .sidebar-logo { padding: 20px 20px 16px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .logo-box { width: 38px; height: 38px; background: linear-gradient(135deg,#3b82f6,#8b5cf6); border-radius: 11px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 18px; flex-shrink: 0; }
        .sidebar-logo strong { font-size: 14px; font-weight: 900; letter-spacing: 1.5px; display: block; }
        .logo-sub { font-size: 10px; color: #64748b; font-weight: 700; margin-top: 2px; }

        .live-strip { display: flex; align-items: center; justify-content: space-around; padding: 10px 16px; background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .ls-item { display: flex; flex-direction: column; align-items: center; gap: 1px; }
        .ls-item span { font-size: 9px; color: #64748b; font-weight: 700; text-transform: uppercase; }
        .ls-item strong { font-size: 16px; font-weight: 900; }
        .ls-div { width: 1px; height: 24px; background: rgba(255,255,255,0.08); }

        .sidebar-nav { flex: 1; padding: 14px 12px; overflow: hidden; display: flex; flex-direction: column; gap: 0; }
        .nav-group { display: flex; flex-direction: column; }
        .nav-group label { display: block; font-size: 9px; font-weight: 800; color: #475569; margin-bottom: 8px; letter-spacing: 1.5px; padding: 0 6px; }
        .all-mod-head { display: flex; justify-content: space-between; align-items: center; padding: 0 6px; margin-bottom: 8px; }
        .all-mod-head label { margin: 0; }
        .search-toggle { background: transparent; border: none; color: #64748b; cursor: pointer; padding: 4px; display: flex; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); border-radius: 8px; }
        .search-toggle:hover { color: white; transform: scale(1.4); background: rgba(255,255,255,0.1); }
        .mod-search { width: 100%; padding: 8px 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.07); border-radius: 8px; color: white; font-size: 12px; outline: none; margin-bottom: 8px; }
        .mod-search::placeholder { color: #64748b; }

        .nav-item {
          width: 100%; display: flex; align-items: center; gap: 10px; padding: 9px 10px;
          background: transparent; border: none; color: #94a3b8; border-radius: 10px;
          cursor: pointer; transition: 0.15s; font-size: 13px; font-weight: 600; margin-bottom: 2px;
          text-align: left; position: relative;
        }
        .nav-item:hover { background: rgba(255,255,255,0.06); color: white; }
        .nav-item.active { background: #3b82f6; color: white; }

        .ni-icon { width: 20px; display: flex; justify-content: center; flex-shrink: 0; }
        .nav-item span { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .nav-badge { background: #ef4444; color: white; font-size: 10px; font-weight: 900; padding: 1px 6px; border-radius: 10px; min-width: 18px; text-align: center; flex-shrink: 0; }
        .nav-badge:not(.red) { background: #3b82f6; }

        .nav-item.mini { padding: 7px 10px; font-size: 12px; margin-bottom: 1px; }
        .mini-icon { width: 18px; display: flex; justify-content: center; flex-shrink: 0; }

        .scroll-area { flex: 1; overflow-y: auto; padding-right: 2px; }
        .scroll-area::-webkit-scrollbar { width: 3px; }
        .scroll-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }

        .sidebar-group { margin-bottom: 8px; }
        .sg-title { font-size: 11px; font-weight: 800; color: #64748b; padding: 12px 10px; text-transform: uppercase; letter-spacing: 0.8px; opacity: 0.9; margin-bottom: 2px; }
        .sg-title.interactive { display: flex; justify-content: space-between; align-items: center; cursor: pointer; border-radius: 10px; transition: 0.2s; }
        .sg-title.interactive:hover { background: rgba(255,255,255,0.06); color: white !important; }
        .sg-t-left { display: flex; align-items: center; gap: 12px; }
        .sg-icon { font-size: 14px; width: 20px; display: flex; justify-content: center; }
        .sg-label { margin-top: 1px; }
        .sg-chevron { transition: transform 0.3s; color: #475569; }
        .sg-chevron.open { transform: rotate(90deg); color: white; }
        .sg-content { display: flex; flex-direction: column; gap: 2px; padding-top: 4px; }

        .no-mod { text-align: center; padding: 20px 0; color: #475569; font-size: 12px; }

        .mt-16 { margin-top: 12px; flex: 1; overflow: hidden; }

        .sidebar-footer { padding: 12px; border-top: 1px solid rgba(255,255,255,0.06); }
      `}</style>
    </aside>
  );
};

export default Sidebar;
