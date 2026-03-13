import React, { useState } from 'react';
import { 
  Receipt, BarChart3, Search, Plus, 
  ArrowUpRight, ArrowDownLeft,
  Calendar, FileText, CheckCircle,
  MoreVertical, Filter, Download,
  Printer, Mail, Send, ExternalLink
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const data = [
  { name: 'Gelir', value: 852000, color: '#10b981' },
  { name: 'Gider', value: 423000, color: '#ef4444' },
  { name: 'Vergi', value: 125000, color: '#f59e0b' },
  { name: 'Net', value: 304000, color: '#3b82f6' },
];

const invoices = [
  { id: 'FAT-2026-0012', guest: 'Mehmet Yılmaz', date: '24.04.2026', total: '₺ 4,250', status: 'sent' },
  { id: 'FAT-2026-0013', guest: 'Ayşe Kaya', date: '24.04.2026', total: '₺ 8,900', status: 'pending' },
  { id: 'FAT-2026-0014', guest: 'Direct Booking', date: '23.04.2026', total: '₺ 1,200', status: 'sent' },
];

const Finance = () => {
  return (
    <div className="fin-container">
      <div className="fin-header-top">
         <div className="fin-tabs">
            <button className="btn-fin active">E-FATURA / E-ARŞİV</button>
            <button className="btn-fin">FİNANSAL ANALİZ</button>
            <button className="btn-fin">GİDER YÖNETİMİ</button>
            <button className="btn-fin">BANKA EKSTRELERİ</button>
         </div>
         <div className="actions">
            <button className="btn-action primary"><Plus size={18}/> MANUEL FATURA OLUŞTUR</button>
         </div>
      </div>

      <div className="fin-grid">
         {/* Summary Charts */}
         <section className="card chart-section">
            <div className="section-header">
               <h3>FİNANSAL ÖZET (BU AY)</h3>
               <span className="date-range">Nisan 2026</span>
            </div>
            <div style={{ height: 250 }}>
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                     <Tooltip cursor={{fill: '#f8fafc'}} />
                     <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {data.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </section>

         {/* Invoices List */}
         <section className="card table-section">
            <div className="section-header">
               <h3>SON FATURALAR</h3>
               <div className="search-box">
                  <Search size={16} />
                  <input type="text" placeholder="Fatura No veya İsim..." />
               </div>
            </div>
            <table className="fin-table">
               <thead>
                  <tr>
                     <th>Fatura No</th>
                     <th>Misafir / Firma</th>
                     <th>Tarih</th>
                     <th>Tutar</th>
                     <th>GİB Durumu</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {invoices.map((inv, idx) => (
                    <tr key={idx}>
                       <td><strong>{inv.id}</strong></td>
                       <td>{inv.guest}</td>
                       <td>{inv.date}</td>
                       <td><strong>{inv.total}</strong></td>
                       <td>
                          <span className={`status-pill ${inv.status}`}>
                             {inv.status === 'sent' ? 'Resmileşti' : 'Beklemede'}
                          </span>
                       </td>
                       <td>
                          <div className="row-actions">
                             <button className="icon-btn"><Printer size={14}/></button>
                             <button className="icon-btn"><Mail size={14}/></button>
                             <button className="icon-btn"><MoreVertical size={14}/></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </section>

         {/* Right Sidebar - Integrations */}
         <aside className="fin-sidebar">
            <div className="card integration-card">
               <div className="head">
                  <ExternalLink size={24} className="blue"/>
                  <h3>GİB ENTEGRASYONU</h3>
               </div>
               <div className="status online">AKTİF • BAĞLI</div>
               <div className="stats">
                  <div className="s-item">
                     <span>Kalan Kontör</span>
                     <strong>14,250</strong>
                  </div>
                  <div className="s-item">
                     <span>Son Gönderim</span>
                     <strong>1 dk önce</strong>
                  </div>
               </div>
            </div>

            <section className="card mt-20 warning-card">
               <h3>ONAY BEKLEYENLER</h3>
               <div className="warn-list">
                  <div className="w-item">
                     <span>5 Konaklama</span>
                     <button className="btn-warn">Fatura Kes</button>
                  </div>
                  <div className="w-item">
                     <span>2 İade Talebi</span>
                     <button className="btn-warn outline">İncele</button>
                  </div>
               </div>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .fin-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .fin-header-top { display: flex; justify-content: space-between; align-items: center; }
        .fin-tabs { display: flex; gap: 10px; }
        .btn-fin {
           background: white; border: 1px solid #e2e8f0; padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; color: #64748b; cursor: pointer;
        }
        .btn-fin.active { background: #3b82f6; color: white; border-color: #3b82f6; }

        .btn-action.primary { background: #1e293b; color: white; padding: 12px 24px; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; display: flex; align-items: center; gap: 10px; }

        .fin-grid { display: grid; grid-template-columns: 1fr 300px; gap: 30px; }

        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .chart-section { grid-column: 1 / 2; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .section-header h3 { font-size: 15px; font-weight: 800; color: #1e293b; }
        .date-range { font-size: 12px; color: #94a3b8; }

        .search-box {
           display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 10px;
        }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 220px; }

        .fin-table { width: 100%; border-collapse: collapse; }
        .fin-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; }
        .fin-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; }

        .status-pill { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        .status-pill.sent { background: #ecfdf5; color: #10b981; }
        .status-pill.pending { background: #fef2f2; color: #ef4444; }

        .row-actions { display: flex; gap: 8px; }
        .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #f1f5f9; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #94a3b8; }

        .integration-card .head { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; }
        .head h3 { font-size: 15px; font-weight: 800; }
        .status.online { font-size: 11px; font-weight: 800; color: #10b981; background: #ecfdf5; padding: 6px; border-radius: 6px; text-align: center; margin-bottom: 20px; }
        .stats { display: flex; flex-direction: column; gap: 12px; }
        .s-item { display: flex; justify-content: space-between; font-size: 13px; }
        .s-item span { color: #94a3b8; }
        .s-item strong { color: #1e293b; }

        .warn-list { display: flex; flex-direction: column; gap: 15px; }
        .w-item { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #475569; }
        .btn-warn { background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer; }
        .btn-warn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .blue { color: #3b82f6; }
      `}</style>
    </div>
  );
};

export default Finance;
