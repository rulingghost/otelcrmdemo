import React, { useState } from 'react';
import { 
  Music, Search, Plus, 
  Calendar, Mic2, Star,
  CheckCircle, MoreVertical, 
  MapPin, Clock, Users,
  Smartphone, Bell, Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const activityList = [
  { id: 1, name: 'Yoga Morning', time: '09:00', location: 'Zen Garden', guests: 24, status: 'active' },
  { id: 2, name: 'Kiddie Workshop', time: '11:00', location: 'Mini Club', guests: 15, status: 'upcoming' },
  { id: 3, name: 'Aqua Gym', time: '15:00', location: 'Main Pool', guests: 40, status: 'upcoming' },
  { id: 4, name: 'Gala Night Show', time: '21:30', location: 'Amphitheater', guests: 500, status: 'draft' },
];

const Entertainment = () => {
  return (
    <div className="ent-container">
      <header className="header">
         <div className="title-section">
            <Music size={32} className="icon-purple"/>
            <div>
               <h2>Entertainment & Animation Management</h2>
               <span>Günlük etkinlik takvimi, şov planlama ve aktivite yönetimi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><Calendar size={18}/> HAFTALIK PROGRAM</button>
            <button className="btn primary"><Plus size={18}/> ETKİNLİK OLUŞTUR</button>
         </div>
      </header>

      <div className="ent-grid">
         {/* Live Status Cards */}
         <section className="live-row">
            <div className="card live-card">
               <div className="l-head">
                  <div className="pulse-dot"></div>
                  <span>ŞU AN CANLI</span>
               </div>
               <h3>Yoga Morning</h3>
               <div className="l-meta">
                  <MapPin size={14}/> Zen Garden
                  <Users size={14}/> 24 Misafir
               </div>
            </div>
            <div className="card mini-stat">
               <span className="label">Toplam Etkinlik (Bugün)</span>
               <strong>12</strong>
            </div>
            <div className="card mini-stat">
               <span className="label">Popülerlik Skoru</span>
               <strong className="purple">9.4</strong>
            </div>
         </section>

         {/* Activity List */}
         <section className="card list-section">
            <div className="section-header">
               <h3>GÜNLÜK AKTİVİTE TAKVİMİ</h3>
               <div className="search-box">
                  <Search size={16} />
                  <input type="text" placeholder="Aktivite Ara..." />
               </div>
            </div>
            <div className="activity-grid">
               {activityList.map((act, idx) => (
                 <div key={idx} className={`activity-card ${act.status}`}>
                    <div className="a-time">{act.time}</div>
                    <div className="a-info">
                       <strong>{act.name}</strong>
                       <span>{act.location}</span>
                    </div>
                    <div className="a-guests">
                       <Users size={14}/> {act.guests}
                    </div>
                    <div className="a-status">
                       <span className={`status-badge ${act.status}`}>
                          {act.status === 'active' ? 'Devam Ediyor' : act.status === 'upcoming' ? 'Sırada' : 'Taslak'}
                       </span>
                    </div>
                    <button className="icon-btn"><MoreVertical size={14}/></button>
                 </div>
               ))}
            </div>
         </section>

         {/* Right Sidebar: Mobile & TV Sync */}
         <aside className="ent-sidebar">
            <div className="card sync-card">
               <Smartphone size={24} className="blue"/>
               <h3>MOBİL APP & TV SYNC</h3>
               <p>Etkinlikler misafir odalarındaki TV'lere ve mobil uygulamaya anında iletilir.</p>
               <button className="btn-full primary mt-15">YAYINLA</button>
            </div>

            <section className="card promo-card mt-20">
               <Mic2 size={24} className="purple"/>
               <h3>ANONS SİSTEMİ</h3>
               <p>Havuz başı ve genel alanlar için planlı sesli anonslar.</p>
               <button className="btn-full outline mt-15">ANONS PLANLA</button>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .ent-container {
          padding: 30px;
          background: #f8fafc;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-purple { color: #8b5cf6; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { font-size: 14px; color: #64748b; }

        .actions { display: flex; gap: 10px; }
        .btn { padding: 12px 24px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; border: none; font-size: 13px; }
        .btn.primary { background: #8b5cf6; color: white; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .ent-grid { display: grid; grid-template-columns: 1fr 300px; gap: 30px; }

        .live-row { grid-column: 1 / 2; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 20px; }
        .live-card { background: #1e293b; color: white; border: none; padding: 25px; border-radius: 20px; }
        .l-head { display: flex; align-items: center; gap: 10px; font-size: 10px; font-weight: 900; letter-spacing: 1px; color: #3b82f6; margin-bottom: 10px; }
        .pulse-dot { width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; animation: pulse 1.5s infinite; }
        .live-card h3 { font-size: 22px; font-weight: 800; margin-bottom: 15px; }
        .l-meta { display: flex; align-items: center; gap: 15px; font-size: 13px; color: #94a3b8; }

        .mini-stat { text-align: center; padding: 20px; }
        .mini-stat .label { font-size: 11px; color: #94a3b8; display: block; margin-bottom: 5px; font-weight: 700; }
        .mini-stat strong { font-size: 22px; font-weight: 800; color: #1e293b; }

        .card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .section-header h3 { font-size: 14px; font-weight: 900; color: #1e293b; }

        .search-box { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 10px; }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 180px; }

        .activity-grid { display: flex; flex-direction: column; gap: 15px; }
        .activity-card { display: flex; align-items: center; gap: 20px; padding: 15px 20px; background: #f8fafc; border-radius: 16px; border: 1px solid #f1f5f9; }
        .activity-card.active { border-left: 4px solid #3b82f6; background: #eff6ff; }
        
        .a-time { font-size: 14px; font-weight: 900; color: #1e293b; width: 60px; }
        .a-info { flex: 1; display: flex; flex-direction: column; }
        .a-info strong { font-size: 15px; color: #1e293b; }
        .a-info span { font-size: 12px; color: #64748b; }
        
        .a-guests { font-size: 13px; font-weight: 700; color: #64748b; display: flex; align-items: center; gap: 6px; width: 80px; }

        .status-badge { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 6px; }
        .status-badge.active { background: #3b82f6; color: white; }
        .status-badge.upcoming { background: #f1f5f9; color: #64748b; }
        .status-badge.draft { background: #e2e8f0; color: #94a3b8; }

        .icon-btn { background: transparent; border: none; cursor: pointer; color: #cbd5e1; }

        .sync-card h3, .promo-card h3 { font-size: 14px; font-weight: 900; margin: 10px 0; color: #1e293b; }
        .sync-card p, .promo-card p { font-size: 12px; color: #64748b; line-height: 1.5; }

        .btn-full { width: 100%; padding: 12px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; }
        .btn-full.primary { background: #3b82f6; color: white; }
        .btn-full.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .purple { color: #8b5cf6; }
        .blue { color: #3b82f6; }
        .mt-20 { margin-top: 20px; }

        @keyframes pulse {
           0% { transform: scale(1); opacity: 1; }
           50% { transform: scale(1.5); opacity: 0.5; }
           100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Entertainment;
