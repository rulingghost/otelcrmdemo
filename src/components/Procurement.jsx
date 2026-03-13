import React, { useState } from 'react';
import { 
  ShoppingCart, Search, Plus, 
  FileText, Truck, ShieldCheck,
  ChevronDown, Filter, MoreVertical,
  CheckCircle, AlertTriangle, ArrowRight,
  Package, DollarSign, List as ListIcon,
  User, Send, RefreshCw, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

const deptRequests = [
  { dept: 'Mutfak', user: 'Asli B.', date: '24.04', items: '6 ürün', status: 'beklemede', avatar: 'AB' },
  { dept: 'HK', user: 'Melek D.', date: '23.04', items: '4 ürün', status: 'onaylandı', avatar: 'MD' },
  { dept: 'Teknik Servis', user: 'Volkan T.', date: '22.04', items: '9 ürün', status: 'beklemede', avatar: 'VT' },
];

const quotes = [
  { item: 'Et', a: '40.50/kg', b: '37.90/kg', c: '38.90/kg', totalA: '₺ 10,100', totalB: '₺ 9,800', totalC: '₺ 9,350' },
  { item: 'Süt', a: '10.75/l', b: '37.90/l', c: '10.20/l', totalA: '', totalB: '', totalC: '' },
  { item: 'Temizlik Malz.', a: '52.00/adet', b: '49.50/adet', c: '47.50/adet', totalA: '', totalB: '', totalC: '' },
];

const Procurement = () => {
  return (
    <div className="proc-container">
      <header className="header">
         <div className="title-section">
            <ShoppingCart size={32} className="icon-blue"/>
            <div>
               <h2>Procurement & Purchasing</h2>
               <span>Satın alma talepleri, teklif karşılaştırma ve onay süreçleri</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline">YENİ TALEP OLUŞTUR</button>
            <button className="btn outline">TEDARİKÇİ PUANLAMA</button>
            <button className="btn primary red"><AlertTriangle size={18}/> ACİL SİPARİŞ</button>
         </div>
      </header>

      <div className="proc-grid">
         {/* Left: Department Requests */}
         <aside className="left-panel">
            <section className="card requests-card">
               <h3>DEPARTMAN TALEPLERİ</h3>
               <div className="req-list mt-20">
                  {deptRequests.map((r, i) => (
                    <div key={i} className="req-item">
                       <div className="req-header">
                          <div className="avatar-small">{r.avatar}</div>
                          <div className="req-info">
                             <strong>{r.dept}</strong>
                             <span>{r.user} • {r.date}</span>
                          </div>
                          <button className="btn-s blue">İZLE</button>
                       </div>
                       <div className="req-meta mt-10">
                          <span>{r.items}</span>
                          <span className={`status ${r.status}`}>{r.status.toUpperCase()}</span>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="pending-stats mt-30">
                  <h3>BEKLEYEN TALEPLER</h3>
                  <div className="ps-item mt-15">
                     <span>Mutfak</span>
                     <strong>6 ürün - 2 tutar</strong>
                  </div>
                  <div className="ps-item mt-10">
                     <span>Teknik Servis</span>
                     <strong>9 ürün - 2 tutar</strong>
                  </div>
               </div>
            </section>
         </aside>

         {/* Center: Quote Comparison */}
         <section className="main-content">
            <div className="card comparison-card">
               <div className="comp-head">
                  <h3>TEKLİF KARŞILAŞTIRMA</h3>
                  <div className="comp-tabs">
                     <span>Tedarikçiler</span>
                  </div>
               </div>
               <table className="proc-table">
                  <thead>
                     <tr>
                        <th>Ürünler</th>
                        <th>Tedarikçi A</th>
                        <th>Tedarikçi B</th>
                        <th>Tedarikçi C</th>
                     </tr>
                  </thead>
                  <tbody>
                     {quotes.map((q, i) => (
                       <tr key={i}>
                          <td><strong>{q.item}</strong></td>
                          <td>{q.a}</td>
                          <td className="best-price">{q.b}</td>
                          <td>{q.c}</td>
                       </tr>
                     ))}
                     <tr className="total-row">
                        <td><strong>Total</strong></td>
                        <td><strong>{quotes[0].totalA}</strong></td>
                        <td><strong>{quotes[0].totalB}</strong></td>
                        <td className="winner"><strong>{quotes[0].totalC}</strong></td>
                     </tr>
                  </tbody>
               </table>
               <button className="link-btn mt-20">Detayları Göster... <ChevronDown size={14}/></button>
            </div>

            <div className="summary-bar mt-20">
               <div className="sb-item">AÇIK SİPARİŞLER: <strong>14</strong></div>
               <div className="sb-item">ONAY BEKLEYEN: <strong>5</strong></div>
               <div className="sb-item">TOPLAM ALIM (AYLIK): <strong>₺ 2.4M</strong></div>
            </div>
         </section>

         {/* Right: Approval Centers */}
         <aside className="right-panel">
            <section className="card approval-card">
               <h3>GENEL MÜDÜR ONAYI</h3>
               <div className="app-list mt-20">
                  {['Mutfak', 'Melek D.', 'Sait U.', 'Ismail B.'].map((name, i) => (
                    <div key={i} className="app-item">
                       <User size={16} className="gray"/>
                       <div className="app-info">
                          <strong>{name}</strong>
                          <small>Sipariş No: 423{i}</small>
                       </div>
                       <span className="time-tag">+{i+2}:45</span>
                    </div>
                  ))}
               </div>
            </section>

            <section className="card approval-card mt-20">
               <h3>ONAY MERKEZİ</h3>
               <div className="om-list mt-15">
                  <div className="om-item">
                     <span>Finans Onayı</span>
                     <strong>₺ 5,200</strong>
                  </div>
                  <div className="om-item mt-10">
                     <span>Satın Alma</span>
                     <strong>₺ 3,200</strong>
                  </div>
               </div>
               <button className="btn-full mt-20">Tümünü Gör...</button>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .proc-container {
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

        .proc-grid { display: grid; grid-template-columns: 260px 1fr 280px; gap: 30px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; margin-bottom: 25px; letter-spacing: 0.5px; }

        .req-item { padding: 15px; background: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9; margin-bottom: 12px; }
        .req-header { display: flex; align-items: center; gap: 10px; }
        .avatar-small { width: 32px; height: 32px; background: #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 900; }
        .req-info { flex: 1; display: flex; flex-direction: column; }
        .req-info strong { font-size: 12px; color: #1e293b; }
        .req-info span { font-size: 10px; color: #94a3b8; }
        .btn-s { padding: 2px 8px; border-radius: 4px; border: none; font-size: 10px; font-weight: 900; cursor: pointer; }
        .btn-s.blue { background: #eff6ff; color: #3b82f6; }
        .req-meta { display: flex; justify-content: space-between; font-size: 10px; font-weight: 800; color: #64748b; }
        .status.onaylandı { color: #10b981; }

        .proc-table { width: 100%; border-collapse: collapse; }
        .proc-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; text-transform: uppercase; }
        .proc-table td { padding: 15px 12px; font-size: 12px; border-bottom: 1px solid #f8fafc; color: #475569; }
        .total-row { background: #f8fafc; }
        .best-price { background: #ecfdf5; color: #10b981; font-weight: 700; }
        .winner { background: #eff6ff; color: #3b82f6; font-weight: 900; }

        .summary-bar { display: flex; gap: 30px; font-size: 11px; font-weight: 800; color: #94a3b8; padding: 0 10px; }
        .summary-bar strong { color: #1e293b; margin-left: 5px; }

        .app-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
        .app-info { flex: 1; display: flex; flex-direction: column; }
        .app-info strong { font-size: 12px; color: #1e293b; }
        .app-info small { font-size: 10px; color: #94a3b8; }
        .time-tag { font-size: 10px; background: #ecfdf5; color: #10b981; padding: 2px 6px; border-radius: 4px; font-weight: 800; }

        .om-item { display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: #64748b; }
        .om-item strong { color: #1e293b; }

        .btn-full { width: 100%; padding: 12px; background: #f1f5f9; color: #64748b; border-radius: 10px; font-size: 11px; font-weight: 800; cursor: pointer; border: 1px solid #e2e8f0; }

        .link-btn { border: none; background: transparent; color: #3b82f6; font-size: 12px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 5px; }
        .gray { color: #94a3b8; }
        .mt-20 { margin-top: 20px; }
        .mt-30 { margin-top: 30px; }
        .mt-15 { margin-top: 15px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default Procurement;
