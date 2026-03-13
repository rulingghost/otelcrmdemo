import React, { useState } from 'react';
import { 
  Users, Search, Plus, 
  FileText, Clock, AlertTriangle,
  ChevronDown, Filter, MoreVertical,
  CheckCircle, User, Briefcase, 
  ArrowRight, ShieldCheck, RefreshCw,
  LayoutGrid, BarChart3, TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const personnelSummary = [
  { name: 'Ahmet Y.', dept: 'Ön Büro', status: 'çalışıyor', avatar: 'AY' },
  { name: 'Derya A.', dept: 'Rezervasyon', status: 'toplantıda', avatar: 'DA' },
  { name: 'Ferhat K.', dept: 'Ön Büro', status: 'dışarıda', avatar: 'FK' },
  { name: 'Ismail B.', dept: 'Teknik Servis', status: 'çalışıyor', avatar: 'IB' },
  { name: 'Burak K.', dept: 'Ön Büro', status: 'izinli', avatar: 'BK' },
  { name: 'Melek D.', dept: 'Kat Hizmetleri', status: 'çalışıyor', avatar: 'MD' },
  { name: 'Volkan T.', dept: 'Teknik Servis', status: 'çalışıyor', avatar: 'VT' },
];

const shiftSchedule = [
  { day: '22 Nisan Pazartesi', shifts: ['Sabah Şift', 'Akşam Şift'] },
  { day: '23 Nisan Salı', shifts: ['Sabah Şift', 'Akşam Şift'] },
  { day: '24 Nisan Çarşamba', shifts: ['Sabah Şift'] },
];

const pdksFeed = [
  { name: 'Ahmet Y.', type: 'Giriş', time: '08:00', val: '4+2s' },
  { name: 'Melek D.', type: 'Giriş', time: '07:56', val: '' },
  { name: 'Sait U.', type: 'Giriş', time: '07:45', val: '' },
  { name: 'Ismail B.', type: 'Giriş', time: '01:17', val: '+ 10n' },
];

const HumanResources = () => {
  return (
    <div className="hr-container">
      <header className="header">
         <div className="title-section">
            <Users size={32} className="icon-blue"/>
            <div>
               <h2>İnsan Kaynakları & Bordro</h2>
               <span>Personel yönetimi, vardiya planlama ve PDKS takibi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline">BORDRO HESAPLA</button>
            <button className="btn outline">YENİ PERSONEL EKLE</button>
            <button className="btn primary red"><AlertTriangle size={18}/> EKSİK MESAI UYARISI</button>
         </div>
      </header>

      <div className="hr-grid">
         {/* Left: Personnel List */}
         <aside className="left-panel">
            <section className="card personnel-card">
               <h3>PERSONEL</h3>
               <div className="p-list mt-20">
                  {personnelSummary.map((p, i) => (
                    <div key={i} className="p-item">
                       <div className="avatar-small">{p.avatar}</div>
                       <div className="p-info">
                          <strong>{p.name}</strong>
                          <span>{p.dept}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
         </aside>

         {/* Center: Personnel Profiles & Shifts */}
         <section className="main-content">
            <div className="card profiles-card">
               <div className="cp-head">
                  <h3>PERSONEL PROFİLİ</h3>
               </div>
               <div className="profile-grid mt-20">
                  {personnelSummary.map((p, i) => (
                    <div key={i} className="profile-box">
                       <div className="pb-top">
                          <div className="avatar-square">{p.avatar}</div>
                          <div className="pb-info">
                             <strong>{p.name}</strong>
                             <span>{p.dept}</span>
                          </div>
                       </div>
                       <div className={`status-pill ${p.status}`}>
                          {p.status === 'çalışıyor' && <CheckCircle size={12}/>}
                          {p.status.toUpperCase()}
                       </div>
                    </div>
                  ))}
               </div>

               <div className="section-title mt-30">
                  <h3>VARDİYA ÇİZELGESİ</h3>
                  <div className="date-range">22 Nisan Pazartesi | 25 Nisan Perşembe</div>
               </div>
               <div className="shift-grid mt-15">
                  {shiftSchedule.map((s, i) => (
                    <div key={i} className="shift-day">
                       <div className="sd-label">{s.day}</div>
                       <div className="sd-slots">
                          {s.shifts.map((sh, si) => (
                            <div key={si} className={`shift-pill ${sh.includes('Sabah') ? 'morning' : 'evening'}`}>
                               {sh}
                            </div>
                          ))}
                          <div className="empty-slot"></div>
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className="profiles-footer mt-30">
                  <div className="pf-item">TOPLAM PERSONEL: <strong>240</strong></div>
                  <div className="pf-item">ŞU AN TESİSTE: <strong className="blue">85</strong></div>
                  <div className="pf-item">YILLIK İZİNLİ: <strong className="green">12</strong></div>
               </div>
            </div>
         </section>

         {/* Right: PDKS Feed */}
         <aside className="right-panel">
            <section className="card pdks-card">
               <div className="pdks-head">
                  <h3>ANLIK PDKS AKIŞI</h3>
                  <div className="p-filter">Tümü <ChevronDown size={14}/></div>
               </div>
               <div className="pdks-list mt-20">
                  {pdksFeed.map((f, i) => (
                    <div key={i} className="pdks-item">
                       <div className="pi-left">
                          <Clock size={14} className="gray"/>
                          <div className="pi-info">
                             <strong>{f.name}</strong>
                             <span>Giriş: {f.time}</span>
                          </div>
                       </div>
                       <div className="pi-right">
                          <strong className="green">{f.type === 'Giriş' ? '●' : '○'} {f.time}</strong>
                          <span className="val">{f.val}</span>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="btn-full mt-20">Tümünü Gör...</button>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .hr-container {
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
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #1e293b; }
        .btn.primary.red { background: #ef4444; color: white; display: flex; align-items: center; gap: 8px; }

        .hr-grid { display: grid; grid-template-columns: 220px 1fr 280px; gap: 30px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; margin-bottom: 25px; letter-spacing: 0.5px; }

        .p-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
        .avatar-small { width: 32px; height: 32px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 900; }
        .p-info strong { display: block; font-size: 12px; color: #1e293b; }
        .p-info span { font-size: 10px; color: #94a3b8; }

        .profile-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
        .profile-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px; }
        .pb-top { display: flex; gap: 12px; align-items: center; margin-bottom: 15px; }
        .avatar-square { width: 40px; height: 40px; background: #e2e8f0; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #64748b; }
        .pb-info strong { display: block; font-size: 13px; color: #1e293b; }
        .pb-info span { font-size: 11px; color: #94a3b8; }
        
        .status-pill { font-size: 10px; font-weight: 900; padding: 6px; border-radius: 6px; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .status-pill.çalışıyor { background: #ecfdf5; color: #10b981; }
        .status-pill.toplantıda { background: #fffbeb; color: #f59e0b; }
        .status-pill.dışarıda { background: #f1f5f9; color: #64748b; }
        .status-pill.izinli { background: #eff6ff; color: #3b82f6; }

        .section-title { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }
        .date-range { font-size: 11px; color: #94a3b8; font-weight: 800; }

        .shift-grid { display: flex; flex-direction: column; gap: 10px; }
        .shift-day { display: grid; grid-template-columns: 140px 1fr; align-items: center; }
        .sd-label { font-size: 11px; font-weight: 800; color: #64748b; }
        .sd-slots { display: flex; gap: 10px; }
        .shift-pill { padding: 8px 15px; border-radius: 8px; font-size: 11px; font-weight: 800; }
        .shift-pill.morning { background: #fef3c7; color: #d97706; }
        .shift-pill.evening { background: #e0f2fe; color: #0369a1; }
        .empty-slot { width: 60px; height: 32px; background: #f8fafc; border: 1px dashed #e2e8f0; border-radius: 8px; }

        .profiles-footer { display: flex; gap: 30px; padding-top: 20px; border-top: 1px solid #f1f5f9; }
        .pf-item { font-size: 11px; font-weight: 900; color: #94a3b8; }
        .pf-item strong { color: #1e293b; margin-left: 5px; }

        .pdks-head { display: flex; justify-content: space-between; align-items: center; }
        .p-filter { font-size: 11px; font-weight: 800; color: #94a3b8; border: 1px solid #e2e8f0; border-radius: 6px; padding: 4px 8px; display: flex; align-items: center; gap: 8px; }
        
        .pdks-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
        .pi-left { display: flex; align-items: center; gap: 10px; }
        .pi-info strong { display: block; font-size: 12px; color: #1e293b; }
        .pi-info span { font-size: 10px; color: #94a3b8; }
        .pi-right { text-align: right; }
        .pi-right strong { display: block; font-size: 12px; color: #10b981; }
        .pi-right .val { font-size: 10px; color: #94a3b8; font-weight: 800; }

        .btn-full { width: 100%; padding: 12px; background: #f1f5f9; color: #64748b; border-radius: 10px; font-size: 11px; font-weight: 800; cursor: pointer; border: 1px solid #e2e8f0; }

        .blue { color: #3b82f6; }
        .green { color: #10b981; }
        .gray { color: #94a3b8; }
        .mt-20 { margin-top: 20px; }
        .mt-30 { margin-top: 30px; }
        .mt-15 { margin-top: 15px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default HumanResources;
