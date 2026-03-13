import React, { useState } from 'react';
import { 
  Waves, Search, Plus, 
  Clock, Calendar, Star,
  User, CheckCircle, ArrowRight,
  MoreVertical, Bell, Filter,
  Smartphone, Package, Heart,
  Zap, LayoutGrid, Award
} from 'lucide-react';
import { motion } from 'framer-motion';

const treatments = [
  { name: 'Massajjer Oil', size: '250 ml', status: 'ready' },
  { name: 'Aromaterapi', size: '1100 ml', status: 'ready' },
  { name: 'Eukaljptus Yağ', size: '1130 ml', status: 'ready' },
  { name: 'Dolunay Salonu', size: '6 ürün', status: 'ready' },
];

const therapists = ['Aylin', 'Murat', 'Linda'];

const spaAppointments = [
  { therapist: 'Aylin', guest: 'Deniz K.', type: 'Aroma Terapi', start: '09:00', end: '11:00' },
  { therapist: 'Murat', guest: 'Gülcen S.', type: 'Sauna Ritueli', start: '11:00', end: '13:00' },
  { therapist: 'Linda', guest: 'Canan L.', type: 'Hot Güne Massaj', start: '13:00', end: '16:00' },
  { therapist: 'Murat', guest: 'Merve E.', type: 'Classik Masaj', start: '16:00', end: '18:00' },
];

const SpaManagement = () => {
  return (
    <div className="spa-container">
      <header className="header">
         <div className="title-section">
            <Waves size={32} className="icon-blue"/>
            <div>
               <h2>SPA & Wellness Management</h2>
               <span>Randevu takvimi, terapist planlama ve paket satış takibi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline">YENİ RANDEVU</button>
            <button className="btn outline">PAKET SATIŞI</button>
            <button className="btn primary red"><Calendar size={18}/> TERAPİST ÇİZELGESİ</button>
         </div>
      </header>

      <div className="spa-grid">
         {/* Left: Quick Sales */}
         <aside className="left-panel">
            <section className="card product-card">
               <h3>HIZLI SATIŞ</h3>
               <div className="prod-list">
                  {treatments.map((t, i) => (
                    <div key={i} className="prod-item">
                       <div className="p-icon"><Package size={16}/></div>
                       <div className="p-info">
                          <strong>{t.name}</strong>
                          <span>{t.size} • ₺22</span>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
            
            <section className="card stats-mini mt-20">
               <div className="stat"><span>Toplam Randevu</span> <strong>17</strong></div>
               <div className="stat"><span>Üye Müşteri</span> <strong>9</strong></div>
            </section>
         </aside>

         {/* Center: Appointment Timeline */}
         <section className="main-content">
            <div className="card timeline-card">
               <div className="c-head">
                  <h3>SPA RANDEVU TAKVİMİ</h3>
                  <div className="date">24 Nisan Pazartesi</div>
               </div>
               
               <div className="spa-timeline">
                  <div className="t-header">
                     <div className="therapist-col">Terapist</div>
                     {['09:00', '10:00', '11:00', '12:00', '13:00', '16:00', '19:00', '22:00'].map(t => (
                       <div key={t} className="time-col">{t}</div>
                     ))}
                  </div>
                  <div className="t-body">
                     {therapists.map((th, i) => (
                       <div key={i} className="t-row">
                          <div className="therapist-col"><strong>{th}</strong></div>
                          <div className="slots">
                             {spaAppointments.filter(a => a.therapist === th).map((a, ai) => (
                               <div 
                                 key={ai} 
                                 className="app-block"
                                 style={{ 
                                   left: `${(parseInt(a.start) - 9) * 12}%`,
                                   width: `${(parseInt(a.end) - parseInt(a.start)) * 12}%` 
                                 }}
                               >
                                  <strong>{a.guest}</strong>
                                  <span>{a.type}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
            
            <div className="footer-stats mt-20">
               <span>BUGÜNKÜ CİRO: <strong>₺85K</strong></span>
               <span>RANDEVU DOLULUK: <strong>%92</strong></span>
            </div>
         </section>

         {/* Right: Member Profile */}
         <aside className="right-panel">
            <section className="card profile-card">
               <h3>ÜYE PROFİLİ & PAKET</h3>
               <div className="u-info">
                  <div className="u-avatar">Z</div>
                  <div className="u-text">
                     <strong>Zeynep Yildiz</strong>
                     <span className="gold">Platinum</span>
                  </div>
               </div>
               <div className="u-stats mt-20">
                  <div className="u-stat"><span>Üyelik Tipi</span> <strong>Platinum</strong></div>
                  <div className="u-stat"><span>Kalan Masaj Hakkı</span> <strong className="blue">4</strong></div>
               </div>
               
               <div className="usage mt-20">
                  <div className="usage-item">
                     <Star size={14} className="gold"/>
                     <span>Aroma Terapi</span>
                     <strong>5/7</strong>
                  </div>
               </div>
               <button className="btn-full mt-20">Tümünü Gör...</button>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .spa-container {
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

        .actions { display: flex; gap: 10px; }
        .btn { padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }
        .btn.primary.red { background: #ef4444; color: white; display: flex; align-items: center; gap: 10px; }

        .spa-grid { display: grid; grid-template-columns: 260px 1fr 300px; gap: 30px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 12px; font-weight: 900; color: #1e293b; margin-bottom: 20px; letter-spacing: 0.5px; }

        .prod-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f8fafc; }
        .p-icon { width: 32px; height: 32px; background: #f8fafc; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #94a3b8; }
        .p-info { display: flex; flex-direction: column; }
        .p-info strong { font-size: 12px; color: #1e293b; }
        .p-info span { font-size: 10px; color: #94a3b8; }

        .stat { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 12px; }
        .stat strong { color: #1e293b; }

        .c-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .date { font-size: 12px; font-weight: 700; color: #64748b; }

        .spa-timeline { width: 100%; border: 1px solid #f1f5f9; border-radius: 12px; overflow: hidden; }
        .t-header { display: flex; background: #f8fafc; border-bottom: 1px solid #f1f5f9; }
        .therapist-col { width: 120px; padding: 12px; font-size: 11px; font-weight: 800; color: #94a3b8; border-right: 1px solid #f1f5f9; }
        .time-col { flex: 1; text-align: center; font-size: 11px; color: #94a3b8; padding: 12px; border-right: 1px solid #f1f5f9; }

        .t-row { display: flex; height: 70px; border-bottom: 1px solid #f1f5f9; }
        .slots { flex: 1; position: relative; height: 100%; }
        .app-block { position: absolute; top: 10px; height: 50px; background: #3b82f6; border-radius: 8px; padding: 10px; color: white; display: flex; flex-direction: column; justify-content: center; }
        .app-block strong { font-size: 11px; }
        .app-block span { font-size: 9px; opacity: 0.8; }

        .footer-stats { display: flex; gap: 30px; font-size: 13px; color: #64748b; }
        .footer-stats strong { color: #1e293b; }

        .u-info { display: flex; align-items: center; gap: 15px; }
        .u-avatar { width: 44px; height: 44px; background: #eff6ff; color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; }
        .u-text strong { display: block; font-size: 14px; color: #1e293b; }
        .gold { color: #f59e0b; font-size: 11px; font-weight: 800; }
        
        .u-stat { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 12px; color: #64748b; }
        .u-stat strong { color: #1e293b; }

        .usage-item { display: flex; align-items: center; gap: 10px; font-size: 12px; color: #475569; padding: 10px; background: #f8fafc; border-radius: 8px; }
        .btn-full { width: 100%; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 11px; font-weight: 700; color: #64748b; cursor: pointer; }

        .blue { color: #3b82f6; }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
};

export default SpaManagement;
