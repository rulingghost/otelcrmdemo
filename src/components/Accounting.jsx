import React, { useState } from 'react';
import { 
  FileText, Search, Plus, 
  Calculator, Landmark, Receipt,
  ChevronRight, MoreVertical, LayoutGrid,
  FileSpreadsheet, Send, ShieldCheck,
  ChevronDown, Filter, Printer, Download,
  ArrowUpRight, ArrowDownRight,
  Database, RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';

const journalEntries = [
  { date: '24.04.2026', id: '00679', code: 'Otel Gelirleri', debit: '$1210.00', credit: '$1210.00', desc: 'Oda ve Konaklama Gel.' },
  { date: '24.04.2026', id: '00691', code: 'Hesaplanan KDV', debit: '$20.00', credit: '$121.00', desc: '' },
  { date: '24.04.2026', id: '391.01', code: 'Hesaplanan KDV (%10)', debit: '$121.00', credit: '$121.00', desc: 'Genel Yönetim Gid.' },
  { date: '24.04.2026', id: '00642', code: 'Kasa Hesabı', debit: '$1,331.00', credit: '$1,331.00', desc: '' },
  { date: '24.04.2026', id: '00643', code: 'Kasa Hesabı', debit: '$290.00', credit: '$0.00', desc: 'Kampanya Iskontolari' },
  { date: '24.04.2026', id: '00640', code: 'Kampanya Iskontolari', debit: '$1,210.00', credit: '$1,210.00', desc: 'Kasa Hesabı - Nakit İşlem' },
];

const chartOfAccounts = [
  { code: '01', name: 'DÖNEN VARLIKLAR', children: [
    { code: '10', name: 'Hazır Değerler' },
    { code: '101', name: 'Alınan Çekler' },
    { code: '102', name: 'Bankalar' },
  ]},
  { code: '99', name: 'MALİYET HESAPLARI' },
];

const Accounting = () => {
  return (
    <div className="accounting-container">
      <header className="header">
         <div className="title-section">
            <Landmark size={32} className="icon-blue"/>
            <div>
               <h2>General Ledger & E-Accounting</h2>
               <span>Tek düzen hesap planı, yevmiye kayıtları ve e-defter yönetimi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><Calculator size={18}/> MİZAN AL</button>
            <button className="btn outline"><Plus size={18}/> YENİ FİŞ EKLE</button>
            <button className="btn primary blue">E-DEFTER OLUŞTUR</button>
         </div>
      </header>

      <div className="acc-grid">
         {/* Left: Chart of Accounts */}
         <aside className="left-panel">
            <section className="card coa-card">
               <div className="search-box">
                  <Search size={16} className="gray"/>
                  <input type="text" placeholder="Hesap Ara..." />
               </div>
               <div className="coa-tree mt-20">
                  <h3>TEK DÜZEN HESAP PLANI</h3>
                  {chartOfAccounts.map((cat, i) => (
                    <div key={i} className="coa-node">
                       <div className="node-head">
                          <ChevronDown size={14}/>
                          <strong>{cat.code}. {cat.name}</strong>
                       </div>
                       {cat.children && (
                         <div className="node-children">
                            {cat.children.map((child, ci) => (
                              <div key={ci} className="child-item">
                                 {child.code}. {child.name}
                              </div>
                            ))}
                         </div>
                       )}
                    </div>
                  ))}
               </div>
            </section>
         </aside>

         {/* Center: Journal Entries */}
         <section className="main-content">
            <div className="card journal-card">
               <div className="j-head">
                  <h3>YEVMİYE KAYITLARI</h3>
                  <div className="pagination">
                     <button className="page-btn active">1</button>
                     <button className="page-btn">2</button>
                     <button className="page-btn">3</button>
                  </div>
               </div>
               <table className="acc-table">
                  <thead>
                     <tr>
                        <th>Fiş Tarihi</th>
                        <th>Fiş No.</th>
                        <th>Hesap Kodu</th>
                        <th>Borç</th>
                        <th>Alacak</th>
                        <th>Açıklama</th>
                     </tr>
                  </thead>
                  <tbody>
                     {journalEntries.map((e, i) => (
                       <tr key={i}>
                          <td>{e.date}</td>
                          <td><strong>{e.id}</strong></td>
                          <td><span className="code-pill">{e.code}</span></td>
                          <td>{e.debit}</td>
                          <td className="credit">{e.credit}</td>
                          <td className="desc">{e.desc}</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            
            <div className="acc-footer mt-20">
               <div className="db-info">
                  <Database size={14}/>
                  <span>Son Yedekleme: 10 dk önce</span>
               </div>
               <div className="time-info">
                  <RefreshCw size={14}/>
                  <span>24.04.2025 | 09:42</span>
               </div>
            </div>
         </section>

         {/* Right: E-Invoice & Tax Status */}
         <aside className="right-panel">
            <section className="card e-invoice-card">
               <div className="e-head">
                  <h3>E-FATURA DURUMU</h3>
                  <div className="gib-badge">GİB</div>
               </div>
               <div className="e-stats mt-20">
                  <div className="e-item">
                     <div className="e-info">
                        <Send size={16} className="blue"/>
                        <span>Gelen Faturalar</span>
                     </div>
                     <strong className="green">SENT</strong>
                  </div>
                  <div className="e-item mt-15">
                     <div className="e-info">
                        <Download size={16} className="orange"/>
                        <span>Giden Faturalar</span>
                     </div>
                     <strong className="orange">-3</strong>
                  </div>
               </div>

               <div className="e-summary mt-30">
                  <div className="s-row">
                     <div className="dot green"></div>
                     <span>SENT</span>
                     <strong>16</strong>
                  </div>
               </div>
            </section>

            <section className="card mt-20 stats-card">
               <h3>FİNANSAL ÖZET</h3>
               <div className="f-stat">
                  <span>Toplam Borç</span>
                  <strong>$1,210.00</strong>
               </div>
               <div className="f-stat mt-10">
                  <span>Toplam Alacak</span>
                  <strong className="red">$1,210.00</strong>
               </div>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .accounting-container {
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
        .btn { padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; display: flex; align-items: center; gap: 8px; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #1e293b; }
        .btn.primary.blue { background: #1e293b; color: white; }

        .acc-grid { display: grid; grid-template-columns: 260px 1fr 280px; gap: 30px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; margin-bottom: 25px; letter-spacing: 0.5px; }

        .coa-tree { display: flex; flex-direction: column; gap: 15px; }
        .node-head { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #1e293b; cursor: pointer; }
        .node-children { padding-left: 22px; display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
        .child-item { font-size: 12px; color: #64748b; font-weight: 700; cursor: pointer; }
        .child-item:hover { color: #3b82f6; }

        .j-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .page-btn { width: 28px; height: 28px; border-radius: 6px; border: 1px solid #e2e8f0; background: white; font-size: 11px; font-weight: 800; color: #64748b; cursor: pointer; }
        .page-btn.active { background: #3b82f6; color: white; border-color: #3b82f6; }

        .acc-table { width: 100%; border-collapse: collapse; }
        .acc-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; text-transform: uppercase; }
        .acc-table td { padding: 15px 12px; font-size: 12px; border-bottom: 1px solid #f8fafc; color: #475569; }
        .code-pill { font-size: 10px; font-weight: 800; color: #1e293b; }
        .credit { color: #1e293b; font-weight: 700; }
        .desc { font-size: 11px; font-style: italic; }

        .e-item { display: flex; justify-content: space-between; align-items: center; }
        .e-info { display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 700; color: #64748b; }
        .gib-badge { padding: 2px 8px; background: #eff6ff; color: #3b82f6; border-radius: 4px; font-size: 10px; font-weight: 900; }
        
        .f-stat { display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
        .f-stat strong { color: #1e293b; }

        .search-box { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 15px; border-radius: 12px; }
        .search-box input { border: none; background: transparent; outline: none; font-size: 13px; width: 100%; }

        .acc-footer { display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; font-weight: 700; }
        .db-info, .time-info { display: flex; align-items: center; gap: 8px; }

        .green { color: #10b981; }
        .red { color: #ef4444; }
        .blue { color: #3b82f6; }
        .orange { color: #f59e0b; }
        .mt-20 { margin-top: 20px; }
        .mt-30 { margin-top: 30px; }
        .mt-15 { margin-top: 15px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default Accounting;
