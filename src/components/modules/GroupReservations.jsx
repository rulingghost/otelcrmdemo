import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Plus, Search, Calendar, 
  Bed, FileText, ChevronRight, 
  MoreHorizontal, Download, UserPlus,
  ArrowRight, ShieldCheck, Tag
} from 'lucide-react';

const GroupReservations = () => {
  const [filter, setFilter] = useState('tümü');

  const groups = [
    { id: 'GRP-001', name: 'Almanya Tur Grubu', leader: 'Hans Müller', pax: 45, rooms: 22, date: '15-22 Mart 2026', status: 'aktif', price: '₺145,000' },
    { id: 'GRP-002', name: 'Düğün: Yılmaz & Demir', leader: 'Mehmet Yılmaz', pax: 80, rooms: 40, date: '20-22 Mart 2026', status: 'beklemede', price: '₺320,000' },
    { id: 'GRP-003', name: 'Ziraat Bankası Toplantı', leader: 'Deniz Gök', pax: 15, rooms: 15, date: '25-27 Mart 2026', status: 'konfirm', price: '₺62,500' },
  ];

  return (
    <div className="grp-page">
      <div className="grp-head">
        <div>
          <h2><Users size={20}/> Grup Rezervasyon & Blokaj Yönetimi</h2>
          <span>Grup bazlı konaklama, toplu oda atama ve grup foliosu takibi</span>
        </div>
        <button className="btn-primary"><Plus size={15}/> Yeni Grup Rezervasyonu</button>
      </div>

      <div className="grp-stats">
        {[
          { label: 'Aktif Gruplar', val: '8', icon: <Users size={18}/> },
          { label: 'Bloke Odalar', val: '142', icon: <Bed size={18}/> },
          { label: 'Toplam Hacim', val: '₺840K', icon: <Tag size={18}/> },
        ].map(s => (
          <div key={s.label} className="s-card">
            <div className="sc-icon">{s.icon}</div>
            <div className="sc-info">
              <span>{s.label}</span>
              <strong>{s.val}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="grp-main">
        <div className="filters-bar">
          <div className="search-wrap">
            <Search size={16} color="#94a3b8"/>
            <input placeholder="Grup adı veya kod ara..." />
          </div>
          <div className="tabs">
            {['tümü', 'aktif', 'beklemede', 'konfirm'].map(t => (
              <button key={t} className={`t-btn ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="group-list">
          {groups.map((g, i) => (
            <motion.div 
              key={g.id} 
              className="group-card"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="gc-main">
                <div className="gc-info">
                  <div className="gc-id">#{g.id}</div>
                  <strong>{g.name}</strong>
                  <span><Calendar size={11}/> {g.date}</span>
                </div>
                <div className="gc-stats-row">
                  <div className="gcs">
                    <span>Oda/Pax</span>
                    <strong>{g.rooms} R / {g.pax} P</strong>
                  </div>
                  <div className="gcs">
                    <span>Lider</span>
                    <strong>{g.leader}</strong>
                  </div>
                </div>
              </div>
              
              <div className="gc-foot">
                <div className={`status-tag ${g.status}`}>
                  {g.status === 'aktif' ? 'Check-in Yapıldı' : g.status === 'beklemede' ? 'Teklif' : 'Onaylandı'}
                </div>
                <div className="gc-price">{g.price}</div>
                <div className="gc-actions">
                  <button className="a-btn"><UserPlus size={16}/></button>
                  <button className="a-btn primary">Grup Folio <ArrowRight size={14}/></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .grp-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .grp-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .grp-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .grp-head span { font-size: 13px; color: #94a3b8; }
        
        .btn-primary { padding: 12px 20px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .grp-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .s-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; display: flex; align-items: center; gap: 16px; }
        .sc-icon { width: 44px; height: 44px; background: #f8fafc; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #3b82f6; }
        .sc-info span { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .sc-info strong { display: block; font-size: 20px; font-weight: 900; color: #1e293b; }

        .grp-main { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
        .filters-bar { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
        .search-wrap { flex: 1; display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1.5px solid #f1f5f9; border-radius: 12px; padding: 10px 16px; }
        .search-wrap input { border: none; background: transparent; outline: none; font-size: 13px; color: #475569; width: 100%; }
        
        .tabs { display: flex; background: #f1f5f9; padding: 4px; border-radius: 10px; gap: 4px; }
        .t-btn { padding: 6px 14px; border-radius: 8px; border: none; font-size: 11px; font-weight: 700; color: #64748b; cursor: pointer; }
        .t-btn.active { background: white; color: #1e293b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

        .group-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 16px; }
        .group-card { background: white; border: 1.5px solid #f1f5f9; border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 16px; transition: 0.2s; }
        .group-card:hover { border-color: #3b82f6; background: #f8fafc; transform: translateY(-3px); }
        
        .gc-main { display: flex; justify-content: space-between; align-items: flex-start; }
        .gc-info .gc-id { font-size: 10px; font-weight: 800; color: #3b82f6; background: #eff6ff; padding: 2px 8px; border-radius: 6px; width: fit-content; margin-bottom: 6px; }
        .gc-info strong { display: block; font-size: 16px; color: #1e293b; }
        .gc-info span { font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 4px; margin-top: 4px; }
        
        .gc-stats-row { text-align: right; display: flex; flex-direction: column; gap: 8px; }
        .gcs span { display: block; font-size: 10px; color: #94a3b8; }
        .gcs strong { font-size: 13px; color: #475569; }

        .gc-foot { border-top: 1px solid #f1f5f9; padding-top: 16px; display: flex; align-items: center; gap: 12px; }
        .status-tag { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; }
        .status-tag.aktif { background: #f0fdf4; color: #10b981; }
        .status-tag.beklemede { background: #fffbeb; color: #f59e0b; }
        .status-tag.konfirm { background: #eff6ff; color: #3b82f6; }
        
        .gc-price { flex: 1; font-size: 16px; font-weight: 900; color: #1e293b; text-align: right; margin-right: 8px; }
        .gc-actions { display: flex; gap: 8px; }
        .a-btn { padding: 8px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .a-btn.primary { background: #1e293b; color: white; border: none; padding: 8px 14px; font-size: 11px; font-weight: 700; gap: 6px; }
        .a-btn:hover { border-color: #3b82f6; color: #3b82f6; }
      `}</style>
    </div>
  );
};

export default GroupReservations;
