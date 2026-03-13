import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, Search, Star, TrendingUp, Clock,
  Zap, Bed, LogIn, LogOut, CreditCard, LayoutGrid
} from 'lucide-react';

const GROUP_ORDER = [
  { key: 'front', label: '🏨 Ön Büro & Operasyon', color:'#3b82f6' },
  { key: 'revenue', label: '💰 Gelir & Finans', color:'#10b981' },
  { key: 'fb', label: '🍽️ Yiyecek & İçecek', color:'#f59e0b' },
  { key: 'guest', label: '👥 Misafir İlişkileri', color:'#8b5cf6' },
  { key: 'operations', label: '⚙️ Operasyon & Destek', color:'#ef4444' },
  { key: 'analytics', label: '📊 Analiz & Raporlama', color:'#64748b' },
  { key: 'system', label: '🔧 Sistem & Entegrasyon', color:'#475569' },
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

const ModuleGrid = ({ modules, onSelectModule }) => {
  const { stats, reservations, tasks } = useHotel();
  const [search, setSearch]   = useState('');
  const [view, setView]       = useState('grouped'); // 'grouped' | 'grid'
  const [pinned, setPinned]   = useState(PINNED);

  const pendingCI   = reservations.filter(r=>r.status==='gelecek').length;
  const pendingCO   = reservations.filter(r=>r.status==='check-in').length;
  const openTasks   = tasks.filter(t=>t.status!=='bitti').length;
  const openBalance = reservations.filter(r=>r.status==='check-in'&&r.balance>0).length;

  const LIVE_BADGES = {
    'front-office': pendingCI, 'checkout': pendingCO,
    'housekeeping': openTasks, 'folio': openBalance,
    'kbs': 2, 'tech-service': tasks.filter(t=>t.type==='technical'&&t.status!=='bitti').length,
  };

  const getModule = (id) => modules.find(m => m.id === id) || modules.find(m => m.id === `${id}-`);
  const pinnedMods = pinned.map(id => modules.find(m=>m.id===id)).filter(Boolean);

  const togglePin = (e, id) => {
    e.stopPropagation();
    setPinned(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id]);
  };

  const filteredAll = search ? modules.filter(m => m.name.toLowerCase().includes(search.toLowerCase())) : [];

  const ModCard = ({ mod, compact=false }) => {
    if (!mod) return null;
    const badge = LIVE_BADGES[mod.id];
    return (
      <motion.div
        className={`mod-card ${compact?'compact':''}`}
        onClick={() => onSelectModule(mod.id)}
        whileHover={{ scale: 1.02, y: compact?-2:-4 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="mc-icon" style={{ background:`${mod.color}16`, color:mod.color }}>
          {React.cloneElement(mod.icon, { size: compact?18:22 })}
          {badge > 0 && <span className="mc-badge">{badge}</span>}
        </div>
        <div className="mc-info">
          <strong>{mod.name}</strong>
          {!compact && <span>Operasyonel Modül</span>}
        </div>
        <button className={`pin-btn ${pinned.includes(mod.id)?'pinned':''}`} onClick={e=>togglePin(e,mod.id)} title={pinned.includes(mod.id)?'Sabitlenmiş':'Sabitle'}>
          <Star size={12} fill={pinned.includes(mod.id)?'currentColor':'none'}/>
        </button>
        <ChevronRight size={14} className="arr"/>
      </motion.div>
    );
  };

  return (
    <div className="hub-page">
      {/* Top Hero */}
      <div className="hub-hero">
        <div className="hero-left">
          <h1>Hoş Geldiniz 👋</h1>
          <p>Tüm otel operasyonunuz tek ekranda. Bugün {pendingCI} giriş, {pendingCO} çıkış bekleniyor.</p>
        </div>
        <div className="hero-stats">
          <div className="hs-item" onClick={()=>onSelectModule('front-office')}>
            <LogIn size={18} color="#3b82f6"/>
            <div><strong>{pendingCI}</strong><span>Bekleyen Giriş</span></div>
          </div>
          <div className="hs-item" onClick={()=>onSelectModule('checkout')}>
            <LogOut size={18} color="#ef4444"/>
            <div><strong>{pendingCO}</strong><span>İçerideki</span></div>
          </div>
          <div className="hs-item">
            <Bed size={18} color="#8b5cf6"/>
            <div><strong>%{stats.occupancyRate}</strong><span>Doluluk</span></div>
          </div>
          <div className="hs-item" onClick={()=>onSelectModule('folio')}>
            <CreditCard size={18} color="#f59e0b"/>
            <div><strong>{openBalance}</strong><span>Açık Bakiye</span></div>
          </div>
        </div>
      </div>

      {/* Search + View Toggle */}
      <div className="hub-controls">
        <div className="hub-search">
          <Search size={16} color="#94a3b8"/>
          <input
            placeholder="Modül ara... (Restoran, KBS, Kasa...)"
            value={search}
            onChange={e=>setSearch(e.target.value)}
          />
        </div>
        <div className="view-toggle">
          <button className={view==='grouped'?'active':''} onClick={()=>setView('grouped')}>Kategorili</button>
          <button className={view==='grid'?'active':''} onClick={()=>setView('grid')}>Izgara</button>
        </div>
      </div>

      {/* Search Results */}
      {search && (
        <div className="search-results">
          <h3>"{search}" için {filteredAll.length} sonuç:</h3>
          <div className="compact-grid">
            {filteredAll.map(m => <ModCard key={m.id} mod={m} compact/>)}
          </div>
        </div>
      )}

      {/* Pinned */}
      {!search && pinned.length > 0 && (
        <div className="hub-section">
          <div className="section-head">
            <Star size={16} color="#f59e0b" fill="#f59e0b"/>
            <h2>Sabitlenmiş Modüller</h2>
          </div>
          <div className="pinned-grid">
            {pinnedMods.map(m => (
              <motion.div
                key={m.id}
                className="pinned-card"
                onClick={() => onSelectModule(m.id)}
                whileHover={{ scale:1.03, y:-4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="pc-icon" style={{ background:`${m.color}18`, color:m.color }}>
                  {React.cloneElement(m.icon, { size: 24 })}
                  {LIVE_BADGES[m.id] > 0 && <span className="mc-badge big">{LIVE_BADGES[m.id]}</span>}
                </div>
                <strong>{m.name}</strong>
                <button className="pin-btn pinned" onClick={e=>togglePin(e,m.id)}><Star size={12} fill="currentColor"/></button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Grouped or Grid View */}
      {!search && (
        view === 'grouped' ? (
          GROUP_ORDER.map(grp => {
            const ids = MODULE_GROUPS[grp.key] || [];
            const mods = ids.map(id => modules.find(m=>m.id===id)).filter(Boolean);
            if (mods.length === 0) return null;
            return (
              <div key={grp.key} className="hub-section">
                <div className="section-head">
                  <div className="sh-dot" style={{background:grp.color}}/>
                  <h2>{grp.label}</h2>
                  <span>{mods.length} modül</span>
                </div>
                <div className="mod-grid">
                  {mods.map((m,i) => (
                    <motion.div
                      key={m.id}
                      className="mod-card"
                      onClick={() => onSelectModule(m.id)}
                      whileHover={{ scale:1.02, y:-3 }}
                      whileTap={{ scale:0.98 }}
                      initial={{ opacity:0, y:10 }}
                      animate={{ opacity:1, y:0 }}
                      transition={{ delay:i*0.03 }}
                    >
                      <div className="mc-icon" style={{ background:`${m.color}16`, color:m.color }}>
                        {React.cloneElement(m.icon, { size:20 })}
                        {LIVE_BADGES[m.id] > 0 && <span className="mc-badge">{LIVE_BADGES[m.id]}</span>}
                      </div>
                      <div className="mc-info">
                        <strong>{m.name}</strong>
                      </div>
                      <button className={`pin-btn ${pinned.includes(m.id)?'pinned':''}`} onClick={e=>togglePin(e,m.id)}>
                        <Star size={11} fill={pinned.includes(m.id)?'currentColor':'none'}/>
                      </button>
                      <ChevronRight size={13} className="arr"/>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="hub-section">
            <div className="mod-grid">
              {modules.map((m,i) => (
                <motion.div
                  key={m.id}
                  className="mod-card"
                  onClick={() => onSelectModule(m.id)}
                  whileHover={{ scale:1.02, y:-3 }}
                  whileTap={{ scale:0.98 }}
                  initial={{ opacity:0 }}
                  animate={{ opacity:1 }}
                  transition={{ delay:i*0.02 }}
                >
                  <div className="mc-icon" style={{ background:`${m.color}16`, color:m.color }}>
                    {React.cloneElement(m.icon, { size:20 })}
                    {LIVE_BADGES[m.id] > 0 && <span className="mc-badge">{LIVE_BADGES[m.id]}</span>}
                  </div>
                  <div className="mc-info"><strong>{m.name}</strong></div>
                  <ChevronRight size={13} className="arr"/>
                </motion.div>
              ))}
            </div>
          </div>
        )
      )}

      <style>{`
        .hub-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; max-width: 1400px; }

        /* Hero */
        .hub-hero { background: linear-gradient(135deg, #1e293b 0%, #1e40af 100%); border-radius: 22px; padding: 28px 32px; display: flex; justify-content: space-between; align-items: center; gap: 24px; }
        .hero-left h1 { font-size: 24px; font-weight: 900; color: white; margin-bottom: 6px; }
        .hero-left p { font-size: 14px; color: #93c5fd; font-weight: 500; }
        .hero-stats { display: flex; gap: 0; background: rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; }
        .hs-item { display: flex; align-items: center; gap: 12px; padding: 16px 22px; cursor: pointer; border-right: 1px solid rgba(255,255,255,0.08); transition: 0.2s; }
        .hs-item:last-child { border-right: none; }
        .hs-item:hover { background: rgba(255,255,255,0.12); }
        .hs-item strong { display: block; font-size: 22px; font-weight: 900; color: white; line-height: 1; }
        .hs-item span { font-size: 11px; color: #93c5fd; font-weight: 700; }

        /* Controls */
        .hub-controls { display: flex; gap: 14px; align-items: center; }
        .hub-search { flex: 1; display: flex; align-items: center; gap: 10px; background: white; border: 1.5px solid #e2e8f0; padding: 12px 18px; border-radius: 14px; max-width: 480px; }
        .hub-search input { border: none; background: transparent; outline: none; font-size: 14px; color: #475569; width: 100%; }
        .view-toggle { display: flex; border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: white; }
        .view-toggle button { padding: 10px 18px; border: none; background: transparent; font-size: 13px; font-weight: 700; color: #64748b; cursor: pointer; }
        .view-toggle button.active { background: #1e293b; color: white; }

        /* Search results */
        .search-results h3 { font-size: 14px; font-weight: 700; color: #64748b; margin-bottom: 14px; }
        .compact-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 10px; }

        /* Section */
        .hub-section { display: flex; flex-direction: column; gap: 14px; }
        .section-head { display: flex; align-items: center; gap: 10px; }
        .section-head h2 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .section-head span { font-size: 12px; color: #94a3b8; font-weight: 700; }
        .sh-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

        /* Pinned */
        .pinned-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px,1fr)); gap: 12px; }
        .pinned-card { background: white; border: 1.5px solid #e2e8f0; border-radius: 18px; padding: 20px 16px; display: flex; flex-direction: column; align-items: center; gap: 10px; cursor: pointer; position: relative; text-align: center; }
        .pinned-card strong { font-size: 12px; font-weight: 700; color: #1e293b; }
        .pc-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; position: relative; }

        /* Module grid */
        .mod-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px,1fr)); gap: 10px; }
        .mod-card { background: white; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 14px 16px; display: flex; align-items: center; gap: 12px; cursor: pointer; position: relative; }
        .mod-card:hover { border-color: #3b82f6; }
        .mod-card.compact { border-radius: 10px; padding: 10px 12px; }
        .mc-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; }
        .mc-badge { position: absolute; top: -6px; right: -6px; background: #ef4444; color: white; font-size: 9px; font-weight: 900; padding: 2px 5px; border-radius: 10px; min-width: 16px; text-align: center; border: 2px solid white; }
        .mc-badge.big { font-size: 11px; padding: 3px 7px; }
        .mc-info { flex: 1; min-width: 0; }
        .mc-info strong { display: block; font-size: 13px; font-weight: 700; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .mc-info span { font-size: 11px; color: #94a3b8; }
        .pin-btn { background: transparent; border: none; color: #cbd5e1; cursor: pointer; padding: 4px; border-radius: 6px; flex-shrink: 0; display: flex; }
        .pin-btn:hover { color: #f59e0b; background: #fffbeb; }
        .pin-btn.pinned { color: #f59e0b; }
        .arr { color: #cbd5e1; flex-shrink: 0; transition: 0.2s; }
        .mod-card:hover .arr { color: #3b82f6; transform: translateX(3px); }
      `}</style>
    </div>
  );
};

export default ModuleGrid;
