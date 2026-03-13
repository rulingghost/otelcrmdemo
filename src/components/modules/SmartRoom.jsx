import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Termometer, Lightbulb, Lock, Unlock, 
  Wind, Power, PowerOff, Battery, ShieldAlert,
  Search, Filter, Settings
} from 'lucide-react';

const SmartRoom = () => {
  const { rooms } = useHotel();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('tümü');

  // Örnek akıllı oda verisi
  const smartStatus = rooms.map(r => ({
    ...r,
    temp: 22 + Math.floor(Math.random() * 5),
    power: Math.random() > 0.3 ? 'on' : 'off',
    light: Math.random() > 0.4 ? 'on' : 'off',
    lock: Math.random() > 0.2 ? 'locked' : 'unlocked',
    occupancy: r.status === 'dolu' ? 'occupied' : 'empty'
  }));

  const filtered = smartStatus.filter(r => {
    const matchesSearch = r.id.includes(search);
    if (filter === 'dolu') return matchesSearch && r.status === 'dolu';
    if (filter === 'boş') return matchesSearch && r.status === 'boş';
    if (filter === 'açık') return matchesSearch && r.power === 'on';
    return matchesSearch;
  });

  return (
    <div className="smart-page">
      <div className="smart-head">
        <div>
          <h2><Zap size={20}/> Akıllı Oda & Enerji Yönetimi</h2>
          <span>IoT entegrasyonu, enerji tasarrufu ve merkezi kontrol</span>
        </div>
        <div className="head-stats">
          <div className="hs-i"><Power size={14}/> <strong>24</strong> Oda Açık</div>
          <div className="hs-i"><Battery size={14}/> <strong>%12</strong> Tasarruf</div>
        </div>
      </div>

      <div className="smart-controls">
        <div className="search-bar">
          <Search size={16} color="#94a3b8"/>
          <input 
            placeholder="Oda no ara..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filters">
          {['tümü', 'dolu', 'boş', 'açık'].map(f => (
            <button 
              key={f} 
              className={`f-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <button className="settings-btn"><Settings size={14} /></button>
        </div>
      </div>

      <div className="room-grid">
        {filtered.map((r, i) => (
          <motion.div 
            key={r.id} 
            className={`s-room-card ${r.power}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
          >
            <div className="src-top">
              <div className="src-id">Oda {r.id}</div>
              <div className={`src-occ ${r.occupancy}`}>{r.occupancy === 'occupied' ? 'İçeride' : 'Boş'}</div>
            </div>

            <div className="src-main">
              <div className="src-metric">
                <Termometer size={16} color="#ef4444"/>
                <strong>{r.temp}°C</strong>
              </div>
              <div className="src-actions">
                <button className={`src-a-btn ${r.light === 'on' ? 'active' : ''}`} title="Aydınlatma">
                  <Lightbulb size={16}/>
                </button>
                <button className={`src-a-btn ${r.lock === 'locked' ? 'active' : ''}`} title="Kilit">
                  {r.lock === 'locked' ? <Lock size={16}/> : <Unlock size={16}/>}
                </button>
                <button className={`src-a-btn active`} title="Klima">
                  <Wind size={16}/>
                </button>
              </div>
            </div>

            <div className="src-foot">
              <div className="power-toggle">
                {r.power === 'on' ? <Power size={14}/> : <PowerOff size={14}/>}
                <span>Enerji: {r.power === 'on' ? 'Aktif' : 'Kapalı'}</span>
              </div>
              <div className="src-more"><MoreHorizontal size={14}/></div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .smart-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .smart-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .smart-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .smart-head span { font-size: 13px; color: #94a3b8; }
        
        .head-stats { display: flex; gap: 12px; }
        .hs-i { background: #1e293b; color: white; padding: 8px 16px; border-radius: 12px; font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
        .hs-i strong { color: #f1c40f; }

        .smart-controls { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
        .search-bar { flex: 1; max-width: 400px; display: flex; align-items: center; gap: 10px; background: white; border: 1.5px solid #e2e8f0; padding: 10px 16px; border-radius: 12px; }
        .search-bar input { border: none; background: transparent; outline: none; font-size: 13px; color: #475569; width: 100%; }
        
        .filters { display: flex; gap: 8px; align-items: center; }
        .f-pill { padding: 8px 16px; border-radius: 20px; border: 1.5px solid #e2e8f0; background: white; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; }
        .f-pill.active { background: #1e293b; color: white; border-color: #1e293b; }
        .settings-btn { width: 36px; height: 36px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; }

        .room-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
        .s-room-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 16px; display: flex; flex-direction: column; gap: 16px; transition: 0.3s; }
        .s-room-card.off { opacity: 0.6; grayscale: 1; }
        .s-room-card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }

        .src-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .src-id { font-size: 15px; font-weight: 900; color: #1e293b; }
        .src-occ { font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 6px; }
        .src-occ.occupied { background: #fef2f2; color: #ef4444; }
        .src-occ.empty { background: #f0fdf4; color: #10b981; }

        .src-main { display: flex; align-items: center; justify-content: space-between; }
        .src-metric { display: flex; align-items: center; gap: 6px; }
        .src-metric strong { font-size: 20px; font-weight: 900; color: #1e293b; }
        
        .src-actions { display: flex; gap: 6px; }
        .src-a-btn { width: 34px; height: 34px; border-radius: 8px; border: 1.5px solid #f1f5f9; background: white; color: #cbd5e1; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .src-a-btn.active { color: #3b82f6; border-color: #3b82f6; background: #eff6ff; }
        
        .src-foot { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid #f1f5f9; }
        .power-toggle { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: #64748b; }
        .src-room-card.on .power-toggle { color: #10b981; }
        .src-more { color: #cbd5e1; cursor: pointer; }
      `}</style>
    </div>
  );
};

const MoreHorizontal = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
);

export default SmartRoom;
