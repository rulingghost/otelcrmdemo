import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Calculator, FileText, Download, 
  ChevronRight, ArrowUpCircle, ArrowDownCircle,
  Hash, DollarSign, PieChart, Briefcase, Filter
} from 'lucide-react';

const Accounting = () => {
  const { cashTransactions } = useHotel();
  const [activeTab, setActiveTab] = useState('summary');

  const accounts = [
    { name: 'Kasa (TL)', code: '100.01', balance: 45000, type: 'asset' },
    { name: 'Ziraat Bankası', code: '102.01', balance: 1250000, type: 'asset' },
    { name: 'Satıcılar (Cari)', code: '320.01', balance: -82000, type: 'liability' },
    { name: 'KDV Ödenecek', code: '360.01', balance: -14500, type: 'liability' },
    { name: 'Konaklama Geliri', code: '600.01', balance: 2450000, type: 'revenue' },
  ];

  const journalEntries = [
    { id: 'JV-001', date: '2026-03-14', desc: 'Resepsiyon Günlük Tahsilat', debit: 12500, credit: 0, account: '100.01' },
    { id: 'JV-002', date: '2026-03-14', desc: 'Personel Maaş Ödemeleri', debit: 0, credit: 154000, account: '102.01' },
    { id: 'JV-003', date: '2026-03-13', desc: 'Elektrik Faturası Ödemesi', debit: 0, credit: 14200, account: '102.01' },
    { id: 'JV-004', date: '2026-03-13', desc: 'Misafir İade İşlemi', debit: 2500, credit: 0, account: '320.01' },
  ];

  return (
    <div className="acc-page">
      <div className="acc-head">
        <div>
          <h2><BookOpen size={20}/> Genel Muhasebe & Defter-i Kebir</h2>
          <span>VUK ve IFRS standartlarında mali kayıt ve raporlama</span>
        </div>
        <div className="tab-switcher">
          <button className={activeTab === 'summary' ? 'active' : ''} onClick={() => setActiveTab('summary')}>Genel Durum</button>
          <button className={activeTab === 'ledger' ? 'active' : ''} onClick={() => setActiveTab('ledger')}>Hesap Planı</button>
          <button className={activeTab === 'journal' ? 'active' : ''} onClick={() => setActiveTab('journal')}>Yevmiye Kayıtları</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'summary' ? (
          <motion.div key="summary" className="acc-summary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {/* Top Cards */}
            <div className="summary-cards">
              <div className="s-card green">
                <div className="sc-icon"><ArrowUpCircle size={24}/></div>
                <div className="sc-info">
                  <span>Toplam Varlıklar</span>
                  <strong>₺2,420,000</strong>
                </div>
              </div>
              <div className="s-card red">
                <div className="sc-icon"><ArrowDownCircle size={24}/></div>
                <div className="sc-info">
                  <span>Toplam Borçlar</span>
                  <strong>₺480,000</strong>
                </div>
              </div>
              <div className="s-card blue">
                <div className="sc-icon"><PieChart size={24}/></div>
                <div className="sc-info">
                  <span>Özkaynaklar</span>
                  <strong>₺1,940,000</strong>
                </div>
              </div>
            </div>

            {/* Profits Table */}
            <div className="profit-table">
              <div className="pt-head">
                <h3>Gelir / Gider Tablosu (Özet)</h3>
                <button className="download-btn"><Download size={14}/> Excel İndir</button>
              </div>
              <div className="p-table-wrap">
                <table className="p-table">
                  <thead><tr><th>Kalem Adı</th><th>Bütçe</th><th>Gerçekleşen</th><th>Fark (%)</th></tr></thead>
                  <tbody>
                    {[
                      { name: 'Oda Satış Gelirleri', budget: 2200000, actual: 2450000, diff: 11.3 },
                      { name: 'F&B Gelirleri', budget: 450000, actual: 420000, diff: -6.6 },
                      { name: 'Personel Giderleri', budget: 550000, actual: 562000, diff: 2.1 },
                      { name: 'Enerji & Genel Gider', budget: 120000, actual: 135000, diff: 12.5 },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td>{row.name}</td>
                        <td>₺{row.budget.toLocaleString()}</td>
                        <td>₺{row.actual.toLocaleString()}</td>
                        <td className={row.diff > 0 ? 'pos' : 'neg'}>
                          {row.diff > 0 ? '+' : ''}{row.diff}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'ledger' ? (
          <motion.div key="ledger" className="acc-ledger" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="ledger-grid">
              {accounts.map((acc, i) => (
                <div key={acc.code} className="acc-row">
                  <div className="acc-code">#{acc.code}</div>
                  <div className="acc-name"><strong>{acc.name}</strong></div>
                  <div className={`acc-type ${acc.type}`}>{acc.type}</div>
                  <div className={`acc-bal ${acc.balance >= 0 ? 'pos' : 'neg'}`}>
                    ₺{Math.abs(acc.balance).toLocaleString()}
                  </div>
                  <button className="acc-action"><ChevronRight size={16}/></button>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="journal" className="acc-journal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="journal-table-wrap">
              <table className="j-table">
                <thead><tr><th>Tarih</th><th>Fiş No</th><th>Hesap Kodu</th><th>Açıklama</th><th>Borç (Debit)</th><th>Alacak (Credit)</th></tr></thead>
                <tbody>
                  {journalEntries.map((j, i) => (
                    <tr key={j.id}>
                      <td>{j.date}</td>
                      <td><span className="fis-no">{j.id}</span></td>
                      <td>{j.account}</td>
                      <td>{j.desc}</td>
                      <td className="debit">{j.debit > 0 ? `₺${j.debit.toLocaleString()}` : '—'}</td>
                      <td className="credit">{j.credit > 0 ? `₺${j.credit.toLocaleString()}` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .acc-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .acc-head { display: flex; justify-content: space-between; align-items: center; }
        .acc-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .acc-head span { font-size: 13px; color: #94a3b8; }
        
        .tab-switcher { background: #f1f5f9; padding: 4px; border-radius: 12px; display: flex; gap: 4px; }
        .tab-switcher button { padding: 8px 16px; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; }
        .tab-switcher button.active { background: white; color: #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }

        .acc-summary { display: flex; flex-direction: column; gap: 24px; }
        .summary-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .s-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; display: flex; align-items: center; gap: 16px; }
        .s-card .sc-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .s-card.green .sc-icon { background: #f0fdf4; color: #10b981; }
        .s-card.red .sc-icon { background: #fef2f2; color: #ef4444; }
        .s-card.blue .sc-icon { background: #eff6ff; color: #3b82f6; }
        .sc-info span { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .sc-info strong { display: block; font-size: 22px; font-weight: 900; color: #1e293b; }

        .profit-table { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .pt-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .pt-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .download-btn { background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 14px; border-radius: 10px; font-size: 12px; font-weight: 700; color: #64748b; display: flex; align-items: center; gap: 8px; cursor: pointer; }

        .p-table { width: 100%; border-collapse: collapse; }
        .p-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; }
        .p-table td { padding: 14px 12px; font-size: 13px; color: #475569; border-bottom: 1px solid #f8fafc; }
        .p-table td.pos { color: #10b981; font-weight: 700; }
        .p-table td.neg { color: #ef4444; font-weight: 700; }

        .ledger-grid { display: flex; flex-direction: column; gap: 10px; }
        .acc-row { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 16px 24px; display: flex; align-items: center; gap: 20px; }
        .acc-code { font-family: monospace; font-weight: 800; color: #94a3b8; width: 80px; }
        .acc-name { flex: 1; font-size: 14px; color: #1e293b; }
        .acc-type { font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; }
        .acc-type.asset { background: #eff6ff; color: #3b82f6; }
        .acc-type.liability { background: #fff7ed; color: #f59e0b; }
        .acc-type.revenue { background: #f0fdf4; color: #10b981; }
        .acc-bal { font-size: 15px; font-weight: 900; width: 120px; text-align: right; }
        .acc-bal.pos { color: #1e293b; }
        .acc-bal.neg { color: #ef4444; }
        .acc-action { background: transparent; border: none; color: #cbd5e1; cursor: pointer; }

        .journal-table-wrap { background: white; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; }
        .j-table { width: 100%; border-collapse: collapse; }
        .j-table th { background: #f8fafc; text-align: left; padding: 12px 16px; font-size: 11px; color: #94a3b8; text-transform: uppercase; }
        .j-table td { padding: 14px 16px; font-size: 12px; color: #475569; border-bottom: 1px solid #f1f5f9; }
        .fis-no { font-family: monospace; font-size: 11px; font-weight: 800; background: #f1f5f9; padding: 4px 8px; border-radius: 6px; color: #64748b; }
        .debit { color: #1e293b; font-weight: 700; }
        .credit { color: #ef4444; font-weight: 700; }
      `}</style>
    </div>
  );
};

export default Accounting;
