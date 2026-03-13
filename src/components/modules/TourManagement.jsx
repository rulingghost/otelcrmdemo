import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bus, Map, Plane, Compass, 
  Search, Plus, Calendar, Clock, 
  MapPin, CheckCircle, Navigation,
  ChevronRight, Car
} from 'lucide-react';

const TourManagement = () => {
  const [activeTab, setActiveTab] = useState('turlar');

  const tours = [
    { id: 'TR-101', name: 'Kapadokya Balon Turu', guest: 'Sarah Johnson', date: '15 Mart', pax: 2, status: 'onaylı', price: '₺4,200' },
    { id: 'TR-102', name: 'Alanya Tekne Turu', guest: 'Müller Family', date: '16 Mart', pax: 4, status: 'bekliyor', price: '₺2,800' },
  ];

  const transfers = [
    { id: 'T-201', type: 'Geliş', guest: 'Ahmet Yılmaz', loc: 'Antalya Havalimanı', flight: 'TK2410', time: '14:30', vehicle: 'Vito VIP' },
    { id: 'T-202', type: 'Gidiş', guest: 'Klaus Weber', loc: 'Dalaman Havalimanı', flight: 'LH1120', time: '10:00', vehicle: 'Mercedes S' },
  ];

  return (
    <div className="tm-page">
      <div className="tm-head">
        <div>
          <h2><Bus size={20}/> Tur & Transfer Yönetimi</h2>
          <span>Dış geziler, VIP transferler ve araç filosu yönetimi</span>
        </div>
        <div className="tab-switcher">
          <button className={activeTab === 'turlar' ? 'active' : ''} onClick={() => setActiveTab('turlar')}>Turlar & Geziler</button>
          <button className={activeTab === 'transferler' ? 'active' : ''} onClick={() => setActiveTab('transferler')}>Transferler</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'turlar' ? (
          <motion.div key="turlar" className="tm-content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="tm-grid">
              <div className="tm-main">
                <div className="tm-list-head">
                  <h3>Aktif Tur Rezervasyonları</h3>
                  <button className="btn-primary sm"><Plus size={14}/> Yeni Tur Kaydı</button>
                </div>
                <div className="tm-list">
                  {tours.map((t, i) => (
                    <motion.div key={t.id} className="tm-card" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                      <div className="tm-c-left">
                        <div className="tm-icon"><Compass size={20}/></div>
                        <div className="tm-info">
                          <strong>{t.name}</strong>
                          <span><User size={10}/> {t.guest} · {t.pax} Kişi</span>
                        </div>
                      </div>
                      <div className="tm-c-mid">
                        <div className="tm-date"><Calendar size={12}/> {t.date}</div>
                        <div className={`tm-status ${t.status}`}>{t.status === 'onaylı' ? 'Onaylandı' : 'Bekliyor'}</div>
                      </div>
                      <div className="tm-price">{t.price}</div>
                      <button className="tm-btn"><ChevronRight size={16}/></button>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="tm-sidebar">
                <div className="dest-card">
                  <h3>Popüler Destinasyonlar</h3>
                  <div className="dest-list">
                    {['Kapadokya', 'Pamukkale', 'Efes Antik Kent', 'Düden Şelalesi'].map(d => (
                      <div key={d} className="dest-i">
                        <span>{d}</span>
                        <ArrowUpRight size={14} color="#3b82f6"/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="transfer" className="tm-content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="transfer-list">
              <div className="tm-list-head">
                <h3>VIP Transfer Takvimi (Bugün/Yarın)</h3>
                <button className="btn-primary sm"><Plus size={14}/> Yeni Transfer</button>
              </div>
              <div className="t-cards">
                {transfers.map((t, i) => (
                  <motion.div key={t.id} className="t-card" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                    <div className="t-top">
                      <div className={`t-type ${t.type.toLowerCase()}`}>{t.type === 'Geliş' ? '🛬 Geliş' : '🛫 Gidiş'}</div>
                      <div className="t-time"><Clock size={14}/> {t.time}</div>
                    </div>
                    <div className="t-main">
                      <strong>{t.guest}</strong>
                      <div className="t-loc"><MapPin size={12}/> {t.loc}</div>
                      <div className="t-flight"><Plane size={12}/> {t.flight}</div>
                    </div>
                    <div className="t-foot">
                      <div className="t-vehicle"><Car size={14}/> {t.vehicle}</div>
                      <button className="t-nav-btn"><Navigation size={14}/> Takip Et</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .tm-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .tm-head { display: flex; justify-content: space-between; align-items: center; }
        .tm-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .tm-head span { font-size: 13px; color: #94a3b8; }
        
        .tab-switcher { background: #f1f5f9; padding: 4px; border-radius: 12px; display: flex; gap: 4px; }
        .tab-switcher button { padding: 8px 16px; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; }
        .tab-switcher button.active { background: white; color: #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }

        .tm-grid { display: grid; grid-template-columns: 1fr 300px; gap: 24px; }
        .tm-main { display: flex; flex-direction: column; gap: 20px; }
        .tm-list-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .tm-list-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        
        .btn-primary.sm { padding: 8px 14px; border-radius: 10px; font-size: 12px; }
        .tm-list { display: flex; flex-direction: column; gap: 12px; }
        .tm-card { background: white; border: 1.5px solid #e2e8f0; border-radius: 18px; padding: 16px; display: grid; grid-template-columns: 1fr 180px 100px 40px; align-items: center; gap: 20px; transition: 0.2s; }
        .tm-card:hover { border-color: #3b82f6; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .tm-icon { width: 40px; height: 40px; background: #eff6ff; color: #3b82f6; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .tm-info strong { display: block; font-size: 14px; color: #1e293b; }
        .tm-info span { font-size: 11px; color: #94a3b8; }
        .tm-date { font-size: 12px; font-weight: 700; color: #475569; display: flex; align-items: center; gap: 6px; }
        .tm-status { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-align: center; width: fit-content; }
        .tm-status.onaylı { background: #f0fdf4; color: #10b981; }
        .tm-status.bekliyor { background: #fff7ed; color: #f59e0b; }
        .tm-price { font-size: 15px; font-weight: 900; color: #1e293b; text-align: right; }
        .tm-btn { background: transparent; border: none; color: #cbd5e1; cursor: pointer; }

        .dest-card { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 20px; }
        .dest-card h3 { font-size: 14px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }
        .dest-list { display: flex; flex-direction: column; gap: 10px; }
        .dest-i { display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8fafc; border-radius: 10px; font-size: 13px; font-weight: 700; color: #475569; }

        .t-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
        .t-card { background: white; border: 1.5px solid #e2e8f0; border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 16px; }
        .t-top { display: flex; justify-content: space-between; align-items: center; }
        .t-type { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; }
        .t-type.geliş { background: #f0fdf4; color: #10b981; }
        .t-type.gidiş { background: #eff6ff; color: #3b82f6; }
        .t-time { font-size: 13px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 6px; }
        .t-main strong { font-size: 16px; font-weight: 900; color: #1e293b; display: block; margin-bottom: 8px; }
        .t-loc, .t-flight { font-size: 12px; color: #64748b; display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
        .t-foot { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid #f1f5f9; }
        .t-vehicle { font-size: 12px; font-weight: 700; color: #3b82f6; display: flex; align-items: center; gap: 6px; }
        .t-nav-btn { background: #1e293b; color: white; border: none; padding: 6px 12px; border-radius: 8px; font-size: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; }
      `}</style>
    </div>
  );
};

const User = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const ArrowUpRight = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);

export default TourManagement;
