import React, { useState } from 'react';
import { 
  Wallet, Search, Plus, 
  ArrowUpRight, ArrowDownLeft,
  Calendar, Filter, MoreVertical,
  CheckCircle, AlertCircle, TrendingUp,
  Download, Printer, Banknote,
  CreditCard, RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';

const transactions = [
  { id: '1024', type: 'income', desc: 'Folio Tahsilatı - Oda 102', method: 'Kredi Kartı', amount: '₺ 2,450', time: '14:22' },
  { id: '1025', type: 'expense', desc: 'Hırdavat Alımı', method: 'Nakit', amount: '₺ 120', time: '15:10' },
  { id: '1026', type: 'income', desc: 'SPA Satışı - Oda 305', method: 'Nakit', amount: '₺ 450', time: '16:05' },
];

const CashDesk = () => {
  return (
    <div className="cd-container">
      <div className="cd-header-top">
         <div className="cd-tabs">
            <button className="btn-cd active">GÜNLÜK KASA HAREKETLERİ</button>
            <button className="btn-cd">KASA DEVİR/KAPANIŞ</button>
            <button className="btn-cd">BÖLÜM KASALARI</button>
         </div>
      </div>

      <div className="cd-grid">
         {/* Summaries Row */}
         <div className="cd-summary-row">
            <div className="card summary-card">
               <div className="card-inner">
                  <div className="icon income"><ArrowUpRight size={24}/></div>
                  <div className="val-box">
                     <span className="label">Bugünkü Giriş</span>
                     <strong>₺ 85,420</strong>
                  </div>
               </div>
            </div>
            <div className="card summary-card">
               <div className="card-inner">
                  <div className="icon expense"><ArrowDownLeft size={24}/></div>
                  <div className="val-box">
                     <span className="label">Bugünkü Çıkış</span>
                     <strong>₺ 12,180</strong>
                  </div>
               </div>
            </div>
            <div className="card summary-card">
               <div className="card-inner">
                  <div className="icon net"><TrendingUp size={24}/></div>
                  <div className="val-box">
                     <span className="label">Net Kasa</span>
                     <strong>₺ 73,240</strong>
                  </div>
               </div>
            </div>
         </div>

         {/* Transactions List */}
         <main className="cd-main">
            <section className="card">
               <div className="section-header">
                  <h3>TÜM HAREKETLER</h3>
                  <div className="search-box">
                     <Search size={16} />
                     <input type="text" placeholder="İşlem No veya Açıklama..." />
                  </div>
               </div>
               <table className="cd-table">
                  <thead>
                     <tr>
                        <th>Tarih/Saat</th>
                        <th>İşlem Detayı</th>
                        <th>Ödeme Yöntemi</th>
                        <th className="right">Tutar</th>
                        <th>Durum</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {transactions.map((t, idx) => (
                       <tr key={idx}>
                          <td>{t.time}</td>
                          <td>
                             <div className="desc-box">
                                <span className={t.type === 'income' ? 'income-icon' : 'expense-icon'}>
                                   {t.type === 'income' ? <ArrowUpRight size={14}/> : <ArrowDownLeft size={14}/>}
                                </span>
                                {t.desc}
                             </div>
                          </td>
                          <td>{t.method}</td>
                          <td className={`right font-bold ${t.type === 'income' ? 'green' : 'red'}`}>
                             {t.type === 'income' ? '+' : '-'} {t.amount}
                          </td>
                          <td><span className="status-pill">Onaylandı</span></td>
                          <td className="center"><MoreVertical size={14}/></td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </section>
         </main>

         {/* Right Sidebar - Methods */}
         <aside className="cd-sidebar">
            <section className="card">
               <h3>ÖDEME YÖNTEMLERİ (Bugün)</h3>
               <div className="method-list">
                  <div className="m-item">
                     <div className="m-icon"><Banknote size={18}/></div>
                     <div className="m-info">
                        <span>Nakit (TL)</span>
                        <strong>₺ 12,450</strong>
                     </div>
                  </div>
                  <div className="m-item">
                     <div className="m-icon blue"><CreditCard size={18}/></div>
                     <div className="m-info">
                        <span>Kredi Kartı</span>
                        <strong>₺ 45,200</strong>
                     </div>
                  </div>
                  <div className="m-item">
                     <div className="m-icon green"><RefreshCw size={18}/></div>
                     <div className="m-info">
                        <span>Banka Transfer</span>
                        <strong>₺ 8,100</strong>
                     </div>
                  </div>
               </div>
               <button className="btn-action primary mt-20"><Plus size={18}/> Yeni Tahsilat/Ödeme</button>
            </section>

            <section className="card mt-20">
               <div className="quick-actions">
                  <button className="btn-quick"><Printer size={16}/> Günlük Rapor Al</button>
                  <button className="btn-quick"><Download size={16}/> Excel'e Aktar</button>
               </div>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .cd-container {
          padding: 20px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cd-header-top { display: flex; justify-content: flex-start; }
        .cd-tabs { display: flex; gap: 10px; }
        .btn-cd {
           background: white;
           border: 1px solid #e2e8f0;
           padding: 10px 20px;
           border-radius: 8px;
           font-size: 13px;
           font-weight: 700;
           color: #64748b;
        }
        .btn-cd.active { background: #10b981; color: white; border-color: #10b981; }

        .cd-grid {
           display: grid;
           grid-template-columns: 1fr 300px;
           gap: 20px;
        }

        .cd-summary-row {
           grid-column: 1 / -1;
           display: grid;
           grid-template-columns: repeat(3, 1fr);
           gap: 20px;
        }

        .summary-card { padding: 25px; }
        .card-inner { display: flex; align-items: center; gap: 20px; }
        .icon {
           width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center;
        }
        .icon.income { background: #ecfdf5; color: #10b981; }
        .icon.expense { background: #fef2f2; color: #ef4444; }
        .icon.net { background: #eff6ff; color: #3b82f6; }
        .val-box { display: flex; flex-direction: column; }
        .val-box .label { font-size: 13px; color: #94a3b8; }
        .val-box strong { font-size: 24px; font-weight: 800; color: #1e293b; }

        .card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          padding: 20px;
        }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .section-header h3 { font-size: 15px; font-weight: 800; color: #1e293b; }

        .search-box {
           display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 8px; width: 300px;
        }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 100%; }

        .cd-table { width: 100%; border-collapse: collapse; }
        .cd-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; }
        .cd-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; }
        .cd-table .right { text-align: right; }
        .cd-table .center { text-align: center; }

        .desc-box { display: flex; align-items: center; gap: 12px; }
        .income-icon { color: #10b981; }
        .expense-icon { color: #ef4444; }

        .green { color: #10b981; }
        .red { color: #ef4444; }
        .font-bold { font-weight: 700; }

        .status-pill { background: #f1f5f9; color: #64748b; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }

        .method-list { display: flex; flex-direction: column; gap: 15px; }
        .m-item { display: flex; align-items: center; gap: 15px; }
        .m-icon { width: 40px; height: 40px; background: #f8fafc; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #64748b; }
        .m-icon.blue { color: #3b82f6; }
        .m-icon.green { color: #10b981; }
        .m-info { display: flex; flex-direction: column; }
        .m-info span { font-size: 12px; color: #94a3b8; }
        .m-info strong { font-size: 14px; font-weight: 800; color: #1e293b; }

        .btn-action.primary {
           width: 100%; padding: 12px; background: #10b981; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
        }

        .quick-actions { display: flex; flex-direction: column; gap: 10px; }
        .btn-quick {
           display: flex; align-items: center; gap: 10px; padding: 10px; background: transparent; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer;
        }
        .btn-quick:hover { background: #f8fafc; }
      `}</style>
    </div>
  );
};

export default CashDesk;
