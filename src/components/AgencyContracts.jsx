import React, { useState } from 'react';
import { 
  Handshake, Search, Plus, 
  FileText, Copy, Zap, 
  ChevronRight, ArrowRight, Filter,
  DollarSign, Calendar, Globe,
  ShieldCheck, LayoutGrid, MoreVertical,
  CheckCircle, ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const contracts = [
  { start: '01 Haziran 2024', end: '30 Haziran 2024', type: 'Standard Oda', rate: '€ 95 EUR', para: 'EUR / USD' },
  { start: '01 Temmuz 2024', end: '31 Ağustos 2024', type: 'Deluxe Oda', rate: '€ 123 USD', para: '$528 / USD' },
  { start: '01 Ocak 2024', end: '30 Eylül 2024', type: 'Suite Oda', rate: '€ 123 USD', para: '$178 / USD' },
];

const promos = [
  { name: '7-6 Stay Pay', status: 'AKTİF' },
  { name: 'EB %20 Discount', status: 'AKTİF' },
  { name: 'Child Free', status: 'AKTİF' },
];

const AgencyContracts = () => {
  return (
    <div className="agency-container">
      <header className="header">
         <div className="title-section">
            <Handshake size={32} className="icon-blue"/>
            <div>
               <h2>Agency Contract & Rate Management</h2>
               <span>Acente sözleşmeleri, sezonluk fiyat tanımları ve promosyon yönetimi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline">YENİ KONTRAT EKLE</button>
            <button className="btn outline">FİYAT KOPYALA</button>
            <button className="btn primary green">AKSİYON TANIMLA</button>
         </div>
      </header>

      <div className="agency-grid">
         {/* Left: Agency Search */}
         <aside className="left-panel">
            <section className="card search-card">
               <div className="search-box">
                  <Search size={16} className="gray"/>
                  <input type="text" placeholder="Global Arama..." />
               </div>
               <h3>ACENTELER</h3>
               <div className="a-list">
                  <div className="a-item active">ETS TUR</div>
                  <div className="a-item">Pegast</div>
                  <div className="a-item">Coral</div>
                  <div className="a-item">Touristica <span className="new-tag">YENİ</span></div>
                  <div className="a-item">TUI</div>
                  <div className="a-item">Anex Tour</div>
               </div>
            </section>
         </aside>

         {/* Center: Rates Table */}
         <section className="main-content">
            <div className="card rates-card">
               <div className="r-head">
                  <h3>SEZONLUK FİYATLAR - ETS TUR</h3>
                  <div className="nav-arrows">
                     <button className="nav-btn">{'<'}</button>
                     <button className="nav-btn">{'>'}</button>
                  </div>
               </div>
               <table className="rates-table">
                  <thead>
                     <tr>
                        <th>Başlangıç Tarihi</th>
                        <th>Bitiş Tarihi</th>
                        <th>Oda Tipi</th>
                        <th>Kontrat Fiyatı</th>
                        <th>Para Birimi</th>
                     </tr>
                  </thead>
                  <tbody>
                     {contracts.map((c, i) => (
                       <tr key={i}>
                          <td>{c.start}</td>
                          <td>{c.end}</td>
                          <td>{c.type}</td>
                          <td><strong>{c.rate}</strong></td>
                          <td>{c.para}</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
               <div className="pagination mt-20">
                  <span>1 - 12 of 20</span>
               </div>
            </div>

            <section className="card mt-20 stats-card">
               <div className="s-row">
                  <span>YTD REVENUE: <strong className="green">+12%</strong></span>
               </div>
            </section>
         </section>

         {/* Right: Promos */}
         <aside className="right-panel">
            <section className="card promo-card">
               <h3>PROMOSYONLAR & AKSİYONLAR</h3>
               <div className="p-list">
                  {promos.map((p, i) => (
                    <div key={i} className="p-item">
                       <span>{p.name}</span>
                       <div className="p-actions">
                          <span className="p-status">{p.status}</span>
                          <ChevronRight size={14}/>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
            
            <section className="card mt-20 alert-card">
               <div className="head">
                  <AlertCircle size={14} className="gold"/>
                  <strong>ADVANCE PURCHASE: %15 Off</strong>
               </div>
               <p>Geçerlilik: 31.05.2024</p>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .agency-container {
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
        .btn.primary.green { background: #10b981; color: white; }

        .agency-grid { display: grid; grid-template-columns: 240px 1fr 280px; gap: 30px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; margin-bottom: 20px; letter-spacing: 0.5px; }

        .search-box { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 12px; border-radius: 8px; margin-bottom: 20px; }
        .search-box input { border: none; background: transparent; outline: none; font-size: 12px; width: 100%; }

        .a-list { display: flex; flex-direction: column; gap: 5px; }
        .a-item { padding: 10px; border-radius: 8px; font-size: 13px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; display: flex; justify-content: space-between; align-items: center; }
        .a-item:hover { background: #f8fafc; }
        .a-item.active { background: #eff6ff; color: #3b82f6; border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0; }
        .new-tag { font-size: 9px; background: #f59e0b; color: white; padding: 2px 6px; border-radius: 4px; }

        .r-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .nav-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; cursor: pointer; color: #64748b; }

        .rates-table { width: 100%; border-collapse: collapse; }
        .rates-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; text-transform: uppercase; }
        .rates-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; }
        .rates-table td strong { color: #1e293b; }

        .p-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #f8fafc; }
        .p-status { font-size: 10px; font-weight: 900; background: #ecfdf5; color: #10b981; padding: 2px 8px; border-radius: 4px; margin-right: 10px; }
        .p-actions { display: flex; align-items: center; }

        .alert-card { background: #fffbeb; border-color: #fef3c7; }
        .alert-card .head { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
        .alert-card p { font-size: 11px; color: #64748b; padding-left: 22px; }

        .green { color: #10b981; }
        .gold { color: #f59e0b; }
        .gray { color: #94a3b8; }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
};

const AlertCircle = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

export default AgencyContracts;
