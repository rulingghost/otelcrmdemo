import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Plus, Search, Filter, 
  Download, Eye, Calendar, Clock,
  CheckCircle, AlertCircle, Building2, User
} from 'lucide-react';

const Contracts = () => {
  const [activeTab, setActiveTab] = useState('tümü');

  const contracts = [
    { id: 'CNT-2026-001', name: 'Booking.com Global', partner: 'Booking.com', type: 'OTA', date: '01 Jan 24 - 31 Dec 26', status: 'aktif', price: '%15 Komisyon' },
    { id: 'CNT-2026-002', name: 'Acenta X Tatil Paketi', partner: 'Acenta X', type: 'Acenta', date: '01 Mar 26 - 31 Aug 26', status: 'aktif', price: '₺1.450 Sabit' },
    { id: 'CNT-2026-003', name: 'Kurumsal Konaklama - Tech-A', partner: 'Tech-A Corp', type: 'Kurumsal', date: '01 Feb 26 - 01 Feb 27', status: 'incelemede', price: '₺2.100 Sabit' },
    { id: 'CNT-2026-004', name: 'Gıda Tedarik Sözleşmesi', partner: 'Metro Market', type: 'Tedarikçi', date: '01 Jan 26 - 01 Jan 28', status: 'süresi_doluyor', price: 'Lise Fiyatı -%10' },
  ];

  return (
    <div className="cnt-page">
      <div className="cnt-head">
        <div>
          <h2><FileText size={20}/> Sözleşme & Kontrat Yönetimi</h2>
          <span>Acenta, kurumsal ve tedarikçi kontratları, PDF arşiv ve fiyat anlaşmaları</span>
        </div>
        <button className="btn-primary"><Plus size={15}/> Yeni Sözleşme Ekle</button>
      </div>

      <div className="cnt-stats">
        {[
          { label: 'Aktif Sözleşme', val: 12, color: '#10b981' },
          { label: 'İnceleme Bekleyen', val: 3, color: '#f59e0b' },
          { label: 'Süresi Dolanlar', val: 2, color: '#ef4444' },
          { label: 'Yıllık Hacim', val: '₺4.2M', color: '#3b82f6' },
        ].map(s => (
          <div key={s.label} className="s-box">
            <span className="s-label">{s.label}</span>
            <strong style={{ color: s.color }}>{s.val}</strong>
          </div>
        ))}
      </div>

      <div className="cnt-main">
        <div className="filters-row">
          <div className="search-wrap">
            <Search size={16} color="#94a3b8"/>
            <input placeholder="Sözleşme veya iş ortağı ara..." />
          </div>
          <div className="tabs">
            {['tümü', 'aktif', 'incelemede', 'süresi_doluyor'].map(t => (
              <button key={t} className={`t-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1).replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="cnt-list">
          {contracts.map((cnt, i) => (
            <motion.div 
              key={cnt.id} 
              className="cnt-row"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="cnt-icon"><FileText size={20}/></div>
              <div className="cnt-info">
                <strong>{cnt.name}</strong>
                <span><Building2 size={12}/> {cnt.partner} · <User size={12}/> {cnt.type}</span>
              </div>
              <div className="cnt-period">
                <Calendar size={13}/>
                <span>{cnt.date}</span>
              </div>
              <div className="cnt-price"><strong>{cnt.price}</strong></div>
              <div className={`cnt-status ${cnt.status}`}>
                {cnt.status === 'aktif' ? 'Aktif' : cnt.status === 'incelemede' ? 'İncelemede' : 'Süresi Doluyor'}
              </div>
              <div className="cnt-actions">
                <button className="a-btn"><Eye size={16}/></button>
                <button className="a-btn"><Download size={16}/></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .cnt-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .cnt-head { display: flex; justify-content: space-between; align-items: center; }
        .cnt-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .cnt-head span { font-size: 13px; color: #94a3b8; }
        
        .btn-primary { padding: 12px 20px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .cnt-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .s-box { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; text-align: center; }
        .s-label { display: block; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px; }
        .s-box strong { font-size: 24px; font-weight: 900; }

        .cnt-main { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .filters-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; gap: 20px; }
        
        .search-wrap { flex: 1; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 10px 16px; display: flex; align-items: center; gap: 12px; }
        .search-wrap input { border: none; background: transparent; outline: none; font-size: 13px; color: #475569; width: 100%; }
        
        .tabs { display: flex; background: #f1f5f9; padding: 4px; border-radius: 10px; gap: 4px; }
        .t-btn { padding: 6px 14px; border-radius: 8px; border: none; font-size: 11px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; white-space: nowrap; }
        .t-btn.active { background: white; color: #1e293b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

        .cnt-list { display: flex; flex-direction: column; gap: 10px; }
        .cnt-row { display: grid; grid-template-columns: 44px 1fr 180px 150px 120px 80px; align-items: center; gap: 20px; padding: 16px; border-radius: 16px; border: 1.5px solid #f8fafc; transition: 0.2s; }
        .cnt-row:hover { background: #f8fafc; border-color: #3b82f6; }
        
        .cnt-icon { width: 44px; height: 44px; background: #eff6ff; color: #3b82f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .cnt-info strong { display: block; font-size: 14px; color: #1e293b; }
        .cnt-info span { font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 4px; }
        
        .cnt-period { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #64748b; font-weight: 600; }
        .cnt-price strong { font-size: 13px; color: #1e293b; font-weight: 800; }
        
        .cnt-status { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-align: center; }
        .cnt-status.aktif { background: #f0fdf4; color: #10b981; }
        .cnt-status.incelemede { background: #fffbeb; color: #f59e0b; }
        .cnt-status.süresi_doluyor { background: #fef2f2; color: #ef4444; }
        
        .cnt-actions { display: flex; gap: 8px; }
        .a-btn { width: 32px; height: 32px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .a-btn:hover { border-color: #3b82f6; color: #3b82f6; }
      `}</style>
    </div>
  );
};

export default Contracts;
