import React, { useState } from 'react';
import { 
  Globe, Search, Plus, 
  Zap, Clock, CheckCircle, 
  AlertCircle, ChevronRight, 
  ArrowUpRight, ArrowDownRight,
  Database, RefreshCw, Filter,
  ShieldCheck, LayoutGrid, MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';

const channels = [
  { name: 'Booking.com', status: 'ONLINE', rooms: 12 },
  { name: 'Expedia', status: 'ONLINE', rooms: 8 },
  { name: 'HotelRunner', status: 'ONLINE', rooms: 15 },
  { name: 'Web Site', status: 'ONLINE', rooms: 20 },
];

const matrixData = [
  { type: 'Standard Oda', dates: ['100 USD', '105 €', '105 €', '105 €', '105 €', '105 €', '105 €'] },
  { type: 'Deluxe Oda', dates: ['108 USD', '105 €', '105 €', '105 €', '105 €', '105 €', '105 €'] },
  { type: 'Suite Oda', dates: ['108 USD', '102 €', '102 €', '102 €', '102 €', '102 €', '102 €'] },
];

const feed = [
  { channel: 'Booking.com', guest: 'John Doe', time: '+2dk' },
  { channel: 'Expedia', guest: 'Emma R.', time: '+4dk' },
  { channel: 'Web Sitesi', guest: 'Tim S.', time: '+6dk' },
  { channel: 'HotelRunner', guest: 'David M.', time: '+8dk' },
];

const ChannelManager = () => {
  return (
    <div className="cm-container">
      <header className="header">
         <div className="title-section">
            <Globe size={32} className="icon-blue"/>
            <div>
               <h2>Channel Manager & Online Distribution</h2>
               <span>Envanter senkronizasyonu, fiyat matrisi ve kanal yönetimi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline">TEK TIKLA STOP SALE</button>
            <button className="btn outline">FİYAT GÜNCELLE</button>
            <button className="btn primary red"><AlertCircle size={18}/> KRİTİK HATA BİLDİRİMİ</button>
         </div>
      </header>

      <div className="cm-grid">
         {/* Left: Channels */}
         <aside className="left-panel">
            <section className="card channels-card">
               <h3>BAĞLI KANALLAR</h3>
               <div className="chan-list">
                  {channels.map((c, i) => (
                    <div key={i} className="chan-item">
                       <div className="c-head">
                          <strong>{c.name}</strong>
                          <span className="online-badge">ONLINE</span>
                       </div>
                       <div className="dots">
                          {[1,2,3,4].map(d => <div key={d} className="dot"></div>)}
                       </div>
                    </div>
                  ))}
               </div>
               <button className="link-btn mt-20">Kategori Yönetimi <ChevronRight size={14}/></button>
            </section>
         </aside>

         {/* Center: Inventory Matrix */}
         <section className="main-content">
            <div className="card matrix-card">
               <div className="m-head">
                  <h3>ENVANTER & FİYAT MATRİSİ</h3>
                  <div className="status-sync">SON SENKRONİZASYON: 12 saniye önce</div>
               </div>
               <table className="matrix-table">
                  <thead>
                     <tr>
                        <th>Kat Tür</th>
                        <th>24 Nisan</th>
                        <th>25 Pd</th>
                        <th>26 Sul</th>
                        <th>1 Pd</th>
                        <th>4 Brs</th>
                        <th>5 Cd</th>
                        <th>6 Cd</th>
                     </tr>
                  </thead>
                  <tbody>
                     {matrixData.map((row, i) => (
                       <tr key={i}>
                          <td><strong>{row.type}</strong></td>
                          {row.dates.map((d, di) => (
                            <td key={di} className="price-cell">
                               {d}
                               <span className="trend pos">+5</span>
                            </td>
                          ))}
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            
            <div className="cm-footer mt-20">
               <span>GÜNLÜK ONLINE CİRO: <strong>$12,400</strong></span>
            </div>
         </section>

         {/* Right: Booking Feed */}
         <aside className="right-panel">
            <section className="card feed-card">
               <h3>ANLIK REZERVASYON AKIŞI</h3>
               <div className="f-list">
                  {feed.map((f, i) => (
                    <div key={i} className="f-item">
                       <div className="f-info">
                          <div className="f-chan">{f.channel}</div>
                          <strong>{f.guest}</strong>
                       </div>
                       <span className="f-time">{f.time}</span>
                    </div>
                  ))}
               </div>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .cm-container {
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

        .cm-grid { display: grid; grid-template-columns: 240px 1fr 280px; gap: 30px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 13px; font-weight: 900; color: #1e293b; margin-bottom: 20px; letter-spacing: 0.5px; }

        .chan-item { padding: 15px; border-bottom: 1px solid #f1f5f9; }
        .online-badge { font-size: 9px; font-weight: 900; color: #10b981; margin-left: 10px; }
        .dots { display: flex; gap: 4px; margin-top: 8px; }
        .dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; opacity: 0.5; }

        .m-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .status-sync { font-size: 11px; color: #94a3b8; font-weight: 700; }

        .matrix-table { width: 100%; border-collapse: collapse; }
        .matrix-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; }
        .matrix-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; position: relative; }
        .price-cell { font-family: monospace; font-weight: 700; }
        .trend { font-size: 10px; position: absolute; top: 5px; right: 5px; }
        .trend.pos { color: #10b981; }

        .f-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f8fafc; }
        .f-info { display: flex; flex-direction: column; }
        .f-chan { font-size: 10px; font-weight: 900; color: #3b82f6; text-transform: uppercase; }
        .f-info strong { font-size: 12px; color: #1e293b; }
        .f-time { font-size: 11px; color: #94a3b8; font-weight: 700; }

        .link-btn { border: none; background: transparent; color: #64748b; font-size: 12px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 5px; }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
};

export default ChannelManager;
