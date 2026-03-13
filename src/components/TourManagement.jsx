import React, { useState } from 'react';
import { 
  Globe, Search, Plus, 
  MapPin, Clock, Users,
  Bus, Navigation, Flag,
  CheckCircle, AlertTriangle, ChevronRight,
  MoreVertical, FileText, LayoutGrid,
  Calendar, User, DollarSign, ArrowRight,
  Filter, Compass, Ticket, Anchor
} from 'lucide-react';
import { motion } from 'framer-motion';

const activeTours = [
  { id: 'T-102', name: 'Pamukkale Daily Tour', guide: 'Mehmet Aydın', pickup: '08:30', pax: 14, status: 'on-way', vehicle: '07 ABC 123' },
  { id: 'T-105', name: 'Antalya City & Waterfall', guide: 'Ayşe Yılmaz', pickup: '09:15', pax: 8, status: 'pickup', vehicle: '07 XYZ 789' },
  { id: 'T-108', name: 'Boats & Bays Excursion', guide: 'Caner Demir', pickup: '10:00', pax: 22, status: 'waiting', vehicle: '07 TTR 456' },
];

const transferLogs = [
  { time: '14:20', type: 'Arrival', guest: 'John Smith', flight: 'TK2411', vehicle: 'VIP VITO', status: 'Completed' },
  { time: '15:45', type: 'Departure', guest: 'Hans Müller', flight: 'LH1204', vehicle: 'Sprinter', status: 'In Progress' },
  { time: '16:10', type: 'Arrival', guest: 'Anna Karenina', flight: 'SU2102', vehicle: 'VIP VITO', status: 'Scheduled' },
];

const TourManagement = () => {
  return (
    <div className="tour-container">
      <header className="header">
         <div className="title-section">
            <Compass size={32} className="icon-blue"/>
            <div>
               <h2>Sedna Tour & Agency Operations</h2>
               <span>Tur planlama, rehber yönetimi ve transfer operasyonları</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><Ticket size={18}/> BİLET KESTİR</button>
            <button className="btn primary"><Plus size={18}/> YENİ TUR / TRANSFER</button>
         </div>
      </header>

      <div className="tour-grid">
         {/* Left Side: Guide & Vehicle Status */}
         <aside className="left-panel">
            <section className="card stats-card">
               <div className="s-header"><h3>OPERASYONEL DURUM</h3></div>
               <div className="s-grid mt-20">
                  <div className="s-item">
                     <Users size={18} className="blue"/>
                     <div className="si-data"><span>Aktif Rehber</span><strong>12 / 15</strong></div>
                  </div>
                  <div className="s-item mt-15">
                     <Bus size={18} className="orange"/>
                     <div className="si-data"><span>Araç Parkı</span><strong>8 / 10</strong></div>
                  </div>
                  <div className="s-item mt-15">
                     <Flag size={18} className="green"/>
                     <div className="si-data"><span>Bugünkü Tur</span><strong>24</strong></div>
                  </div>
               </div>
            </section>

            <section className="card guide-card mt-20">
               <h3>REHBER LİSTESİ</h3>
               <div className="g-list mt-15">
                  <div className="g-item">
                     <div className="avatar">MA</div>
                     <div className="g-info"><strong>Mehmet Aydın</strong><span>Rusça / İngilizce</span></div>
                     <div className="g-status dot green"></div>
                  </div>
                  <div className="g-item mt-10">
                     <div className="avatar">AY</div>
                     <div className="g-info"><strong>Ayşe Yılmaz</strong><span>Almanca / İngilizce</span></div>
                     <div className="g-status dot green"></div>
                  </div>
                  <div className="g-item mt-10">
                     <div className="avatar gray">CD</div>
                     <div className="g-info"><strong>Caner Demir</strong><span>Fransızca</span></div>
                     <div className="g-status dot orange"></div>
                  </div>
               </div>
            </section>
         </aside>

         {/* Center: Live Tour Monitoring */}
         <section className="main-content">
            <div className="card live-tours">
               <div className="l-header">
                  <h3>CANLI TUR TAKİBİ</h3>
                  <div className="l-filters">
                     <span className="pill active">Tümü</span>
                     <span className="pill">Devam Eden</span>
                  </div>
               </div>
               <div className="tour-list mt-20">
                  {activeTours.map((tour, i) => (
                    <motion.div 
                      key={i} 
                      className="tour-card"
                      whileHover={{ scale: 1.01 }}
                    >
                       <div className="t-head">
                          <div className="t-main">
                             <Navigation size={18} className="blue"/>
                             <strong>{tour.name}</strong>
                          </div>
                          <span className={`t-status-pill ${tour.status}`}>{tour.status.toUpperCase()}</span>
                       </div>
                       <div className="t-details">
                          <div className="td-item"><User size={14}/> {tour.guide}</div>
                          <div className="td-item"><Clock size={14}/> {tour.pickup} Pickup</div>
                          <div className="td-item"><Users size={14}/> {tour.pax} Pax</div>
                          <div className="td-item"><Bus size={14}/> {tour.vehicle}</div>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            <div className="card mt-20 transfer-card">
               <h3>VİP & TRANSFER LOG</h3>
               <table className="tr-table mt-15">
                  <thead>
                     <tr>
                        <th>Zaman</th>
                        <th>Misafir</th>
                        <th>Tip</th>
                        <th>Uçuş</th>
                        <th>Araç</th>
                        <th>Durum</th>
                     </tr>
                  </thead>
                  <tbody>
                     {transferLogs.map((log, i) => (
                       <tr key={i}>
                          <td>{log.time}</td>
                          <td><strong>{log.guest}</strong></td>
                          <td><span className={`tip ${log.type.toLowerCase()}`}>{log.type}</span></td>
                          <td>{log.flight}</td>
                          <td>{log.vehicle}</td>
                          <td><span className="status-dot-text"><div className="dot green"></div> {log.status}</span></td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </section>

         {/* Right Sidebar: Revenue & Excursions */}
         <aside className="right-panel">
            <section className="card revenue-card">
               <h3>GÜNLÜK TUR HASILATI</h3>
               <div className="rev-data mt-20">
                  <span className="label">KOMİSYON DAHİL NET</span>
                  <strong>₺ 128,450</strong>
                  <div className="rev-trend pos">+12% vs Dün</div>
               </div>
               <div className="p-bar mt-20">
                  <div className="p-fill blue" style={{ width: '70%' }}></div>
               </div>
               <span className="p-label">Hedef Gerçekleşme: %70</span>
            </section>

            <section className="card excursions-card mt-20">
               <h3>POPÜLER GEZİLER</h3>
               <div className="ex-list mt-15">
                  <div className="ex-item">
                     <div className="ex-img"><Anchor size={16}/></div>
                     <div className="ex-info">
                        <strong>Mavi Tur (Tekne)</strong>
                        <span>Rezervasyon: 42</span>
                     </div>
                  </div>
                  <div className="ex-item mt-10">
                     <div className="ex-img"><MapPin size={16}/></div>
                     <div className="ex-info">
                        <strong>Kapadokya (Uçaklı)</strong>
                        <span>Rezervasyon: 12</span>
                     </div>
                  </div>
               </div>
               <button className="btn-full primary mt-20">KATALOG GÖNDER</button>
            </section>

            <div className="card mt-20 help-card">
               <AlertTriangle size={24} className="orange"/>
               <p><strong>Transfer Uyarısı:</strong> TK2411 sefer sayılı uçuşta 40 dk rötar var. Şoföre bilgi iletildi.</p>
            </div>
         </aside>
      </div>

      <style jsx>{`
        .tour-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-blue { color: #3b82f6; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { font-size: 14px; color: #64748b; }

        .btn { padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; border: none; font-size: 13px; display: flex; align-items: center; gap: 10px; }
        .btn.primary { background: #3b82f6; color: white; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .tour-grid { display: grid; grid-template-columns: 260px 1fr 300px; gap: 30px; }

        .card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; letter-spacing: 1px; }

        .s-item { display: flex; align-items: center; gap: 15px; }
        .si-data span { display: block; font-size: 10px; color: #94a3b8; font-weight: 700; }
        .si-data strong { font-size: 15px; color: #1e293b; }

        .g-list { display: flex; flex-direction: column; gap: 12px; }
        .g-item { display: flex; align-items: center; gap: 12px; }
        .avatar { width: 36px; height: 36px; background: #eff6ff; color: #3b82f6; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; }
        .avatar.gray { background: #f1f5f9; color: #94a3b8; }
        .g-info { flex: 1; }
        .g-info strong { display: block; font-size: 13px; color: #1e293b; }
        .g-info span { font-size: 10px; color: #94a3b8; font-weight: 700; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.green { background: #10b981; }
        .dot.orange { background: #f59e0b; }

        .l-header { display: flex; justify-content: space-between; align-items: center; }
        .pill { font-size: 11px; font-weight: 800; padding: 6px 15px; border-radius: 20px; background: #f1f5f9; color: #64748b; cursor: pointer; }
        .pill.active { background: #3b82f6; color: white; }

        .tour-list { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .tour-card { padding: 20px; border: 1px solid #f1f5f9; border-radius: 18px; background: #f8fafc; }
        .t-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
        .t-main { display: flex; align-items: center; gap: 10px; }
        .t-main strong { font-size: 14px; color: #1e293b; }
        .t-status-pill { font-size: 9px; font-weight: 900; padding: 4px 10px; border-radius: 20px; }
        .t-status-pill.on-way { background: #eff6ff; color: #3b82f6; }
        .t-status-pill.pickup { background: #ecfdf5; color: #10b981; }
        .t-status-pill.waiting { background: #fffcf0; color: #f59e0b; }

        .t-details { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .td-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #64748b; font-weight: 600; }

        .tr-table { width: 100%; border-collapse: collapse; }
        .tr-table th { text-align: left; padding: 10px; font-size: 10px; color: #94a3b8; text-transform: uppercase; border-bottom: 2px solid #f1f5f9; }
        .tr-table td { padding: 12px 10px; font-size: 12px; border-bottom: 1px solid #f8fafc; }
        .tip { font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 4px; }
        .tip.arrival { background: #ecfdf5; color: #10b981; }
        .tip.departure { background: #fef2f2; color: #ef4444; }

        .rev-data { text-align: center; }
        .rev-data .label { font-size: 10px; font-weight: 800; color: #94a3b8; }
        .rev-data strong { display: block; font-size: 24px; font-weight: 900; color: #1e293b; margin: 8px 0; }
        .rev-trend { font-size: 11px; font-weight: 800; color: #10b981; }

        .p-bar { height: 8px; background: #f1f5f9; border-radius: 10px; overflow: hidden; }
        .p-fill { height: 100%; border-radius: 10px; }
        .p-fill.blue { background: #3b82f6; }
        .p-label { font-size: 10px; font-weight: 700; color: #94a3b8; margin-top: 5px; display: block; }

        .ex-item { display: flex; align-items: center; gap: 12px; }
        .ex-img { width: 32px; height: 32px; background: #f8fafc; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #3b82f6; border: 1px solid #e2e8f0; }
        .ex-info strong { display: block; font-size: 13px; color: #1e293b; }
        .ex-info span { font-size: 10px; color: #94a3b8; font-weight: 700; }

        .btn-full { width: 100%; padding: 12px; border-radius: 12px; border: none; font-size: 13px; font-weight: 700; cursor: pointer; }
        .btn-full.primary { background: #1e293b; color: white; }

        .help-card { background: #fffcf0; border-color: #fef3c7; }
        .help-card p { font-size: 12px; color: #92400e; line-height: 1.5; margin-top: 10px; }

        .blue { color: #3b82f6; }
        .green { color: #10b981; }
        .orange { color: #f59e0b; }
        .mt-20 { margin-top: 20px; }
        .mt-15 { margin-top: 15px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default TourManagement;
