import React, { useState } from 'react';
import { 
  FileText, Search, Plus, 
  Printer, Mail, Download,
  CreditCard, Wallet, Banknote,
  MoreVertical, ChevronDown, CheckCircle,
  AlertCircle, ArrowRight, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

const activeFolios = [
  { room: '102', guest: 'Mehmet Yılmaz', total: '₺ 4,250', balance: '₺ 1,150', status: 'partial' },
  { room: '205', guest: 'Ayşe Kaya', total: '₺ 8,900', balance: '₺ 8,900', status: 'unpaid' },
  { room: '301', guest: 'John Smith', total: '₺ 2,400', balance: '₺ 0', status: 'paid' },
];

const folioItems = [
  { id: 1, date: '24.04', desc: 'Oda Konaklama', amount: '₺ 1,500', dept: 'Ön Büro' },
  { id: 2, date: '24.04', desc: 'Mini Bar Kullanımı', amount: '₺ 150', dept: 'HK' },
  { id: 3, date: '24.04', desc: 'Akşam Yemeği', amount: '₺ 450', dept: 'Restaurant' },
  { id: 4, date: '24.04', desc: 'SPA Masajı', amount: '₺ 300', dept: 'SPA' },
];

const Folio = () => {
  return (
    <div className="folio-container">
      <div className="folio-header-top">
         <div className="folio-tabs">
            <button className="btn-folio active">AKTİF FOLİOLAR</button>
            <button className="btn-folio">MASTER FOLİOLAR</button>
            <button className="btn-folio">KAPALI FOLİOLAR</button>
         </div>
      </div>

      <div className="folio-grid">
         {/* Left Sidebar - Active Folios */}
         <aside className="folio-left card">
            <div className="section-header">
               <h3>MİSAFİR LİSTESİ</h3>
               <Search size={16} />
            </div>
            <div className="folio-list">
               {activeFolios.map((f, idx) => (
                 <div key={idx} className={`folio-item ${idx === 0 ? 'active' : ''}`}>
                    <div className="room-box">{f.room}</div>
                    <div className="f-info">
                       <span className="guest">{f.guest}</span>
                       <span className="balance">{f.balance} Kalan</span>
                    </div>
                    {f.status === 'paid' && <CheckCircle size={14} className="green"/>}
                 </div>
               ))}
            </div>
         </aside>

         {/* Center - Folio Details */}
         <main className="folio-main">
            <section className="card">
               <div className="folio-details-header">
                  <div className="guest-header">
                     <span className="room">ODA 102</span>
                     <h2>Mehmet Yılmaz</h2>
                     <span className="agency">ETSTUR • Standard Oda</span>
                  </div>
                  <div className="folio-actions">
                     <button className="btn-action-icon"><Printer size={18}/></button>
                     <button className="btn-action-icon"><Mail size={18}/></button>
                     <button className="btn-action-icon"><Download size={18}/></button>
                  </div>
               </div>

               <div className="folio-table-container">
                  <table className="folio-table">
                     <thead>
                        <tr>
                           <th>Tarih</th>
                           <th>Açıklama</th>
                           <th>Departman</th>
                           <th className="right">Tutar</th>
                           <th></th>
                        </tr>
                     </thead>
                     <tbody>
                        {folioItems.map((item, idx) => (
                           <tr key={idx}>
                              <td>{item.date}</td>
                              <td>{item.desc}</td>
                              <td>{item.dept}</td>
                              <td className="right"><strong>{item.amount}</strong></td>
                              <td className="center"><MoreVertical size={14}/></td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               <div className="folio-summary-row">
                  <div className="sum-item">Toplam: <strong>₺ 2,400</strong></div>
                  <div className="sum-item">Tahsil Edilen: <strong className="green">₺ 1,250</strong></div>
                  <div className="sum-item total">Kalan: <strong className="red">₺ 1,150</strong></div>
               </div>

               <div className="folio-footer-actions">
                  <button className="btn-folio-act primary"><CreditCard size={18}/> TAHSİLAT YAP</button>
                  <button className="btn-folio-act secondary"><Plus size={18}/> HARCAMA EKLE</button>
                  <button className="btn-folio-act outline"><Layers size={18}/> FOLİO TRANSFER</button>
                  <button className="btn-folio-act red"><ArrowRight size={18}/> CHECK-OUT</button>
               </div>
            </section>
         </main>

         {/* Right Sidebar - Stats */}
         <aside className="folio-right">
            <section className="card">
               <h3>KASA DURUMU</h3>
               <div className="cash-stat">
                  <div className="cs-item">
                     <span>Nakit</span>
                     <strong>₺ 12,450</strong>
                  </div>
                  <div className="cs-item">
                     <span>Kredi Kartı</span>
                     <strong>₺ 45,200</strong>
                  </div>
                  <div className="cs-item">
                     <span>Banka Transfer</span>
                     <strong>₺ 8,100</strong>
                  </div>
               </div>
               <button className="btn-all-cash">Kasadaki Tüm Hareketler</button>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .folio-container {
          padding: 20px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .folio-header-top { display: flex; justify-content: flex-start; }
        .folio-tabs { display: flex; gap: 10px; }
        .btn-folio {
           background: white;
           border: 1px solid #e2e8f0;
           padding: 10px 20px;
           border-radius: 8px;
           font-size: 13px;
           font-weight: 700;
           color: #64748b;
        }
        .btn-folio.active { background: #f59e0b; color: white; border-color: #f59e0b; }

        .folio-grid {
           display: grid;
           grid-template-columns: 280px 1fr 280px;
           gap: 20px;
           flex: 1;
        }

        .card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          padding: 20px;
        }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .section-header h3 { font-size: 13px; font-weight: 800; color: #1e293b; }

        .folio-list { display: flex; flex-direction: column; gap: 10px; }
        .folio-item {
           display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; border: 1px solid #f1f5f9; cursor: pointer;
        }
        .folio-item.active { background: #fffbeb; border-color: #fef3c7; }
        .room-box {
           width: 40px; height: 40px; background: #f8fafc; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #1e293b; font-size: 13px; border: 1px solid #e2e8f0;
        }
        .f-info { flex: 1; display: flex; flex-direction: column; }
        .f-info .guest { font-size: 13px; font-weight: 700; color: #1e293b; }
        .f-info .balance { font-size: 11px; color: #f59e0b; font-weight: 600; }
        .green { color: #10b981; }

        .folio-details-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
        .guest-header h2 { font-size: 24px; font-weight: 800; color: #1e293b; margin: 5px 0; }
        .guest-header .room { font-size: 12px; font-weight: 800; color: #f59e0b; background: #fffbeb; padding: 4px 10px; border-radius: 4px; }
        .guest-header .agency { font-size: 13px; color: #94a3b8; }

        .folio-actions { display: flex; gap: 10px; }
        .btn-action-icon {
           width: 40px; height: 40px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; color: #64748b; display: flex; align-items: center; justify-content: center; cursor: pointer;
        }

        .folio-table { width: 100%; border-collapse: collapse; }
        .folio-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; background: #f8fafc; }
        .folio-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f1f5f9; color: #475569; }
        .folio-table .right { text-align: right; }
        .folio-table .center { text-align: center; }

        .folio-summary-row {
           display: flex; justify-content: flex-end; gap: 40px; margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 12px;
        }
        .sum-item { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #64748b; }
        .sum-item strong { font-size: 18px; color: #1e293b; }
        .sum-item .green { color: #10b981; }
        .sum-item .red { color: #ef4444; }

        .folio-footer-actions { display: flex; gap: 15px; margin-top: 30px; }
        .btn-folio-act {
           flex: 1; padding: 12px; border-radius: 8px; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; border: none;
        }
        .btn-folio-act.primary { background: #10b981; color: white; }
        .btn-folio-act.secondary { background: #3b82f6; color: white; }
        .btn-folio-act.outline { background: white; border: 1px solid #e2e8f0; color: #475569; }
        .btn-folio-act.red { background: #ef4444; color: white; }

        .cash-stat { display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px; }
        .cs-item { display: flex; justify-content: space-between; font-size: 13px; }
        .cs-item span { color: #64748b; }
        .cs-item strong { color: #1e293b; font-weight: 800; }

        .btn-all-cash {
           width: 100%; padding: 12px; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Folio;
