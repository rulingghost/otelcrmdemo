import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Calculator, FileText, Download, Plus,
  ChevronRight, ArrowUpCircle, ArrowDownCircle,
  Hash, DollarSign, PieChart, Briefcase, Filter, X,
  Search, TrendingUp, TrendingDown, Edit2, Trash2, Save,
  CheckCircle
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const ACCOUNT_TYPES = [
  { value: 'asset', label: 'Varlık', color: '#3b82f6' },
  { value: 'liability', label: 'Borç', color: '#f59e0b' },
  { value: 'revenue', label: 'Gelir', color: '#10b981' },
  { value: 'expense', label: 'Gider', color: '#ef4444' },
  { value: 'equity', label: 'Özkaynak', color: '#8b5cf6' },
];

const Accounting = () => {
  const { cashTransactions, addNotification, TODAY } = useHotel();
  const [activeTab, setActiveTab] = useState('summary');
  const [search, setSearch] = useState('');
  const [showNewJournal, setShowNewJournal] = useState(false);
  const [showNewAccount, setShowNewAccount] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [jForm, setJForm] = useState({ date: TODAY, desc: '', account: '100.01', debit: '', credit: '' });
  const [accForm, setAccForm] = useState({ name: '', code: '', type: 'asset', balance: '' });

  const [accounts, setAccounts] = useState([
    { name: 'Kasa (TL)', code: '100.01', balance: 45000, type: 'asset' },
    { name: 'Ziraat Bankası', code: '102.01', balance: 1250000, type: 'asset' },
    { name: 'Satıcılar (Cari)', code: '320.01', balance: -82000, type: 'liability' },
    { name: 'KDV Ödenecek', code: '360.01', balance: -14500, type: 'liability' },
    { name: 'Konaklama Geliri', code: '600.01', balance: 2450000, type: 'revenue' },
    { name: 'F&B Geliri', code: '600.02', balance: 420000, type: 'revenue' },
    { name: 'Personel Gideri', code: '770.01', balance: 562000, type: 'expense' },
    { name: 'Enerji Gideri', code: '780.01', balance: 135000, type: 'expense' },
    { name: 'Sermaye', code: '500.01', balance: 5000000, type: 'equity' },
  ]);

  const [journalEntries, setJournalEntries] = useState([
    { id: 'JV-001', date: '2026-03-14', desc: 'Resepsiyon Günlük Tahsilat', debit: 12500, credit: 0, account: '100.01' },
    { id: 'JV-002', date: '2026-03-14', desc: 'Personel Maaş Ödemeleri', debit: 0, credit: 154000, account: '102.01' },
    { id: 'JV-003', date: '2026-03-13', desc: 'Elektrik Faturası Ödemesi', debit: 0, credit: 14200, account: '102.01' },
    { id: 'JV-004', date: '2026-03-13', desc: 'Misafir İade İşlemi', debit: 2500, credit: 0, account: '320.01' },
    { id: 'JV-005', date: '2026-03-12', desc: 'Akşam Yemeği Gelirleri', debit: 8500, credit: 0, account: '100.01' },
    { id: 'JV-006', date: '2026-03-12', desc: 'Market Alışverişi', debit: 0, credit: 4500, account: '102.01' },
  ]);

  // Dinamik hesaplamalar
  const totals = useMemo(() => {
    const assets = accounts.filter(a => a.type === 'asset').reduce((s, a) => s + Math.abs(a.balance), 0);
    const liabilities = accounts.filter(a => a.type === 'liability').reduce((s, a) => s + Math.abs(a.balance), 0);
    const revenue = accounts.filter(a => a.type === 'revenue').reduce((s, a) => s + Math.abs(a.balance), 0);
    const expense = accounts.filter(a => a.type === 'expense').reduce((s, a) => s + Math.abs(a.balance), 0);
    const equity = accounts.filter(a => a.type === 'equity').reduce((s, a) => s + Math.abs(a.balance), 0);
    const netProfit = revenue - expense;
    return { assets, liabilities, revenue, expense, equity, netProfit };
  }, [accounts]);

  // cashTransactions'tan son işlemleri hesapla 
  const recentCash = useMemo(() => {
    const byDate = {};
    cashTransactions.forEach(t => {
      if (!byDate[t.date]) byDate[t.date] = { date: t.date, gelir: 0, gider: 0 };
      if (t.type === 'gelir') byDate[t.date].gelir += t.amount;
      else byDate[t.date].gider += t.amount;
    });
    return Object.values(byDate).slice(-7);
  }, [cashTransactions]);

  const profitRows = useMemo(() => [
    { name: 'Oda Satış Gelirleri', budget: 2200000, actual: accounts.find(a => a.code === '600.01')?.balance || 0 },
    { name: 'F&B Gelirleri', budget: 450000, actual: accounts.find(a => a.code === '600.02')?.balance || 0 },
    { name: 'Personel Giderleri', budget: 550000, actual: accounts.find(a => a.code === '770.01')?.balance || 0 },
    { name: 'Enerji & Genel Gider', budget: 120000, actual: accounts.find(a => a.code === '780.01')?.balance || 0 },
  ].map(r => ({ ...r, diff: r.budget > 0 ? Math.round((r.actual - r.budget) / r.budget * 100 * 10) / 10 : 0 })), [accounts]);

  const filteredAccounts = accounts.filter(a => {
    const q = search.toLowerCase();
    return !q || a.name.toLowerCase().includes(q) || a.code.includes(q);
  });

  const filteredJournal = journalEntries.filter(j => {
    const q = search.toLowerCase();
    return !q || j.desc.toLowerCase().includes(q) || j.id.toLowerCase().includes(q) || j.account.includes(q);
  });

  // Yevmiye ekleme
  const submitJournal = (e) => {
    e.preventDefault();
    const id = `JV-${String(journalEntries.length + 1).padStart(3, '0')}`;
    const entry = { ...jForm, id, debit: Number(jForm.debit) || 0, credit: Number(jForm.credit) || 0 };
    setJournalEntries(p => [entry, ...p]);
    // Hesap bakiyesini güncelle
    setAccounts(p => p.map(a => {
      if (a.code === jForm.account) {
        return { ...a, balance: a.balance + (entry.debit - entry.credit) };
      }
      return a;
    }));
    addNotification({ type: 'success', msg: `Yevmiye kaydı oluşturuldu: ${id}` });
    setJForm({ date: TODAY, desc: '', account: '100.01', debit: '', credit: '' });
    setShowNewJournal(false);
  };

  // Hesap ekleme
  const submitAccount = (e) => {
    e.preventDefault();
    setAccounts(p => [...p, { ...accForm, balance: Number(accForm.balance) || 0 }]);
    addNotification({ type: 'success', msg: `Yeni hesap oluşturuldu: ${accForm.code} — ${accForm.name}` });
    setAccForm({ name: '', code: '', type: 'asset', balance: '' });
    setShowNewAccount(false);
  };

  // Hesap silme
  const deleteAccount = (code) => {
    setAccounts(p => p.filter(a => a.code !== code));
    addNotification({ type: 'info', msg: `Hesap silindi: ${code}` });
    setSelectedAccount(null);
  };

  // Yevmiye silme
  const deleteJournal = (id) => {
    const entry = journalEntries.find(j => j.id === id);
    if (entry) {
      setAccounts(p => p.map(a => a.code === entry.account ? { ...a, balance: a.balance - (entry.debit - entry.credit) } : a));
    }
    setJournalEntries(p => p.filter(j => j.id !== id));
    addNotification({ type: 'info', msg: `Yevmiye silindi: ${id}` });
  };

  // Excel dışa aktarım simülasyonu
  const exportExcel = () => {
    const data = activeTab === 'journal' ? journalEntries : accounts;
    const text = JSON.stringify(data, null, 2);
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `muhasebe_${activeTab}_${TODAY}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification({ type: 'success', msg: `${activeTab === 'journal' ? 'Yevmiye' : 'Hesap planı'} dışa aktarıldı` });
  };

  const typeInfo = ACCOUNT_TYPES.reduce((m, t) => { m[t.value] = t; return m; }, {});

  return (
    <div className="acc-page">
      <div className="acc-head">
        <div>
          <h2><BookOpen size={20}/> Genel Muhasebe & Defter-i Kebir</h2>
          <span>VUK ve IFRS standartlarında mali kayıt ve raporlama — Canlı Veri</span>
        </div>
        <div className="acc-head-r">
          <div className="tab-switcher">
            {[{k:'summary',l:'Genel Durum'},{k:'ledger',l:'Hesap Planı'},{k:'journal',l:'Yevmiye Kayıtları'}].map(t=>(
              <button key={t.k} className={activeTab===t.k?'active':''} onClick={()=>setActiveTab(t.k)}>{t.l}</button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'summary' ? (
          <motion.div key="summary" className="acc-summary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="summary-cards">
              {[
                { label: 'Toplam Varlıklar', val: totals.assets, icon: <ArrowUpCircle size={22}/>, cls: 'green' },
                { label: 'Toplam Borçlar', val: totals.liabilities, icon: <ArrowDownCircle size={22}/>, cls: 'red' },
                { label: 'Net Kâr/Zarar', val: totals.netProfit, icon: <TrendingUp size={22}/>, cls: totals.netProfit >= 0 ? 'green' : 'red' },
                { label: 'Toplam Gelir', val: totals.revenue, icon: <DollarSign size={22}/>, cls: 'blue' },
                { label: 'Toplam Gider', val: totals.expense, icon: <TrendingDown size={22}/>, cls: 'orange' },
              ].map((c,i)=>(
                <motion.div key={i} className={`s-card ${c.cls}`} whileHover={{y:-3}}>
                  <div className="sc-icon">{c.icon}</div>
                  <div className="sc-info">
                    <span>{c.label}</span>
                    <strong>₺{c.val.toLocaleString()}</strong>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Gelir/Gider Grafiği */}
            {recentCash.length > 0 && (
              <div className="chart-box">
                <div className="cb-head">
                  <h3>Günlük Gelir vs Gider (Kasa Hareketleri)</h3>
                  <button className="download-btn" onClick={exportExcel}><Download size={14}/> Dışa Aktar</button>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={recentCash}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill:'#94a3b8',fontSize:10}} tickFormatter={v=>v?.slice(5)}/>
                    <YAxis axisLine={false} tickLine={false} tick={{fill:'#94a3b8',fontSize:10}} tickFormatter={v=>`₺${(v/1000).toFixed(0)}K`}/>
                    <Tooltip formatter={v=>[`₺${v.toLocaleString()}`]}/>
                    <Bar dataKey="gelir" fill="#10b981" radius={[4,4,0,0]} name="Gelir" barSize={18}/>
                    <Bar dataKey="gider" fill="#ef4444" radius={[4,4,0,0]} name="Gider" barSize={18}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Bütçe Karşılaştırma */}
            <div className="profit-table">
              <div className="pt-head">
                <h3>Gelir / Gider Tablosu (Bütçe vs Gerçekleşen)</h3>
                <button className="download-btn" onClick={exportExcel}><Download size={14}/> Excel İndir</button>
              </div>
              <div className="p-table-wrap">
                <table className="p-table">
                  <thead><tr><th>Kalem Adı</th><th>Bütçe</th><th>Gerçekleşen</th><th>Fark (%)</th></tr></thead>
                  <tbody>
                    {profitRows.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row.name}</strong></td>
                        <td>₺{row.budget.toLocaleString()}</td>
                        <td>₺{row.actual.toLocaleString()}</td>
                        <td className={row.diff > 0 ? 'pos' : 'neg'}>{row.diff > 0 ? '+' : ''}{row.diff}%</td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td><strong>NET KÂR</strong></td>
                      <td>₺{(profitRows[0].budget + profitRows[1].budget - profitRows[2].budget - profitRows[3].budget).toLocaleString()}</td>
                      <td><strong style={{color:'#10b981'}}>₺{totals.netProfit.toLocaleString()}</strong></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

        ) : activeTab === 'ledger' ? (
          <motion.div key="ledger" className="acc-ledger" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="ledger-toolbar">
              <div className="search-box"><Search size={14}/><input placeholder="Hesap ara..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
              <button className="btn-primary" onClick={()=>setShowNewAccount(true)}><Plus size={14}/> Yeni Hesap</button>
            </div>
            <div className="ledger-grid">
              {filteredAccounts.map((acc, i) => {
                const ti = typeInfo[acc.type] || typeInfo.asset;
                return (
                  <motion.div key={acc.code} className="acc-row" whileHover={{x:3}} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.03}}>
                    <div className="acc-code">#{acc.code}</div>
                    <div className="acc-name"><strong>{acc.name}</strong></div>
                    <div className="acc-type" style={{background:`${ti.color}15`,color:ti.color}}>{ti.label}</div>
                    <div className={`acc-bal ${acc.balance >= 0 ? 'pos' : 'neg'}`}>
                      ₺{Math.abs(acc.balance).toLocaleString()}
                    </div>
                    <button className="acc-action" title="Hesap Detayı" onClick={()=>setSelectedAccount(acc)}>
                      <ChevronRight size={16}/>
                    </button>
                    <button className="del-btn-sm" title="Sil" onClick={()=>deleteAccount(acc.code)}>
                      <Trash2 size={13}/>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Mizan Özeti */}
            <div className="mizan-box">
              <h4>Mizan Özeti (Genel Toplam)</h4>
              <div className="mizan-grid">
                {ACCOUNT_TYPES.map(t => {
                  const total = accounts.filter(a=>a.type===t.value).reduce((s,a)=>s+Math.abs(a.balance),0);
                  return (
                    <div key={t.value} className="mizan-item">
                      <div className="mi-dot" style={{background:t.color}}/>
                      <span>{t.label}</span>
                      <strong style={{color:t.color}}>₺{total.toLocaleString()}</strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

        ) : (
          <motion.div key="journal" className="acc-journal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="ledger-toolbar">
              <div className="search-box"><Search size={14}/><input placeholder="Fiş no, açıklama ara..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
              <div className="toolbar-r">
                <button className="download-btn" onClick={exportExcel}><Download size={14}/> Dışa Aktar</button>
                <button className="btn-primary" onClick={()=>setShowNewJournal(true)}><Plus size={14}/> Yeni Yevmiye</button>
              </div>
            </div>
            <div className="journal-table-wrap">
              <table className="j-table">
                <thead><tr><th>Tarih</th><th>Fiş No</th><th>Hesap Kodu</th><th>Açıklama</th><th>Borç (Debit)</th><th>Alacak (Credit)</th><th>İşlem</th></tr></thead>
                <tbody>
                  {filteredJournal.map((j, i) => (
                    <motion.tr key={j.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.03}}>
                      <td>{j.date}</td>
                      <td><span className="fis-no">{j.id}</span></td>
                      <td><span className="acc-code-sm">{j.account}</span></td>
                      <td>{j.desc}</td>
                      <td className="debit">{j.debit > 0 ? `₺${j.debit.toLocaleString()}` : '—'}</td>
                      <td className="credit">{j.credit > 0 ? `₺${j.credit.toLocaleString()}` : '—'}</td>
                      <td><button className="del-btn-sm" onClick={()=>deleteJournal(j.id)}><Trash2 size={13}/></button></td>
                    </motion.tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4}><strong>TOPLAM</strong></td>
                    <td className="debit"><strong>₺{filteredJournal.reduce((s,j)=>s+j.debit,0).toLocaleString()}</strong></td>
                    <td className="credit"><strong>₺{filteredJournal.reduce((s,j)=>s+j.credit,0).toLocaleString()}</strong></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Yeni Yevmiye Modal */}
      <AnimatePresence>
        {showNewJournal && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowNewJournal(false)}>
            <motion.form className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()} onSubmit={submitJournal}>
              <div className="mb-head"><h3>Yeni Yevmiye Kaydı</h3><button type="button" onClick={()=>setShowNewJournal(false)}><X size={18}/></button></div>
              <div className="mf-grid">
                <div className="mf"><label>Tarih *</label><input type="date" value={jForm.date} onChange={e=>setJForm(p=>({...p,date:e.target.value}))} required/></div>
                <div className="mf"><label>Hesap Kodu *</label>
                  <select value={jForm.account} onChange={e=>setJForm(p=>({...p,account:e.target.value}))}>
                    {accounts.map(a=><option key={a.code} value={a.code}>{a.code} — {a.name}</option>)}
                  </select>
                </div>
                <div className="mf full"><label>Açıklama *</label><input value={jForm.desc} onChange={e=>setJForm(p=>({...p,desc:e.target.value}))} required placeholder="İşlem açıklaması"/></div>
                <div className="mf"><label>Borç (Debit) ₺</label><input type="number" value={jForm.debit} onChange={e=>setJForm(p=>({...p,debit:e.target.value}))} placeholder="0"/></div>
                <div className="mf"><label>Alacak (Credit) ₺</label><input type="number" value={jForm.credit} onChange={e=>setJForm(p=>({...p,credit:e.target.value}))} placeholder="0"/></div>
              </div>
              <div className="mf-foot">
                <button type="button" className="btn-cancel" onClick={()=>setShowNewJournal(false)}>İptal</button>
                <button type="submit" className="btn-primary"><Save size={14}/> Kaydet</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Yeni Hesap Modal */}
      <AnimatePresence>
        {showNewAccount && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowNewAccount(false)}>
            <motion.form className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()} onSubmit={submitAccount}>
              <div className="mb-head"><h3>Yeni Hesap Oluştur</h3><button type="button" onClick={()=>setShowNewAccount(false)}><X size={18}/></button></div>
              <div className="mf-grid">
                <div className="mf"><label>Hesap Kodu *</label><input value={accForm.code} onChange={e=>setAccForm(p=>({...p,code:e.target.value}))} required placeholder="Ör: 100.02"/></div>
                <div className="mf"><label>Hesap Türü</label>
                  <select value={accForm.type} onChange={e=>setAccForm(p=>({...p,type:e.target.value}))}>
                    {ACCOUNT_TYPES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div className="mf full"><label>Hesap Adı *</label><input value={accForm.name} onChange={e=>setAccForm(p=>({...p,name:e.target.value}))} required placeholder="Hesap adı"/></div>
                <div className="mf"><label>Açılış Bakiyesi ₺</label><input type="number" value={accForm.balance} onChange={e=>setAccForm(p=>({...p,balance:e.target.value}))} placeholder="0"/></div>
              </div>
              <div className="mf-foot">
                <button type="button" className="btn-cancel" onClick={()=>setShowNewAccount(false)}>İptal</button>
                <button type="submit" className="btn-primary"><Plus size={14}/> Hesap Oluştur</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hesap Detay Modal */}
      <AnimatePresence>
        {selectedAccount && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelectedAccount(null)}>
            <motion.div className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()}>
              <div className="mb-head"><h3>#{selectedAccount.code} — {selectedAccount.name}</h3><button onClick={()=>setSelectedAccount(null)}><X size={18}/></button></div>
              <div className="detail-grid">
                <div className="d-item"><span>Hesap Türü</span><strong style={{color:typeInfo[selectedAccount.type]?.color}}>{typeInfo[selectedAccount.type]?.label}</strong></div>
                <div className="d-item"><span>Bakiye</span><strong>₺{Math.abs(selectedAccount.balance).toLocaleString()}</strong></div>
                <div className="d-item"><span>İlgili Yevmiyeler</span><strong>{journalEntries.filter(j=>j.account===selectedAccount.code).length} kayıt</strong></div>
              </div>
              <h4 style={{margin:'16px 0 10px',fontSize:13,fontWeight:800,color:'#64748b'}}>Son Hareketler</h4>
              <div className="detail-entries">
                {journalEntries.filter(j=>j.account===selectedAccount.code).slice(0,5).map(j=>(
                  <div key={j.id} className="de-row">
                    <span className="de-date">{j.date}</span>
                    <span className="de-desc">{j.desc}</span>
                    <span className={j.debit>0?'de-debit':'de-credit'}>
                      {j.debit>0?`+₺${j.debit.toLocaleString()}`:`-₺${j.credit.toLocaleString()}`}
                    </span>
                  </div>
                ))}
                {journalEntries.filter(j=>j.account===selectedAccount.code).length===0 && <p style={{color:'#94a3b8',fontSize:12}}>Hareket bulunamadı</p>}
              </div>
              <div className="mf-foot">
                <button className="btn-cancel" style={{color:'#ef4444',borderColor:'#fecaca'}} onClick={()=>deleteAccount(selectedAccount.code)}>Hesabı Sil</button>
                <button className="btn-primary" onClick={()=>setSelectedAccount(null)}>Kapat</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .acc-page { padding: 28px; display: flex; flex-direction: column; gap: 20px; }
        .acc-head { display: flex; justify-content: space-between; align-items: center; flex-wrap:wrap; gap:12px; }
        .acc-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .acc-head span { font-size: 13px; color: #94a3b8; }
        .tab-switcher { background: #f1f5f9; padding: 4px; border-radius: 12px; display: flex; gap: 4px; }
        .tab-switcher button { padding: 8px 16px; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; background:transparent; }
        .tab-switcher button.active { background: white; color: #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .acc-summary { display: flex; flex-direction: column; gap: 20px; }
        .summary-cards { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
        .s-card { background: white; border-radius: 18px; border: 1px solid #e2e8f0; padding: 18px; display: flex; align-items: center; gap: 14px; cursor:default; }
        .s-card .sc-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .s-card.green .sc-icon { background: #f0fdf4; color: #10b981; }
        .s-card.red .sc-icon { background: #fef2f2; color: #ef4444; }
        .s-card.blue .sc-icon { background: #eff6ff; color: #3b82f6; }
        .s-card.orange .sc-icon { background: #fff7ed; color: #f59e0b; }
        .sc-info span { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing:0.5px; }
        .sc-info strong { display: block; font-size: 18px; font-weight: 900; color: #1e293b; }
        .chart-box { background:white; border-radius:20px; border:1px solid #e2e8f0; padding:22px; }
        .cb-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
        .cb-head h3 { font-size:14px; font-weight:800; color:#1e293b; }
        .profit-table { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 22px; }
        .pt-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .pt-head h3 { font-size: 14px; font-weight: 800; color: #1e293b; }
        .download-btn { background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 14px; border-radius: 10px; font-size: 12px; font-weight: 700; color: #64748b; display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .download-btn:hover { border-color:#3b82f6; color:#3b82f6; }
        .p-table { width: 100%; border-collapse: collapse; }
        .p-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; }
        .p-table td { padding: 14px 12px; font-size: 13px; color: #475569; border-bottom: 1px solid #f8fafc; }
        .p-table td.pos { color: #10b981; font-weight: 700; }
        .p-table td.neg { color: #ef4444; font-weight: 700; }
        .total-row td { background:#f8fafc; font-weight:800; }
        .ledger-toolbar { display:flex; justify-content:space-between; align-items:center; gap:14px; }
        .toolbar-r { display:flex; gap:10px; }
        .search-box { display:flex; align-items:center; gap:8px; background:white; border:1.5px solid #e2e8f0; padding:9px 14px; border-radius:10px; min-width:280px; }
        .search-box input { border:none; background:transparent; outline:none; font-size:13px; width:100%; }
        .btn-primary { padding:10px 18px; border-radius:12px; border:none; background:#3b82f6; color:white; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; }
        .btn-primary:hover { background:#2563eb; }
        .ledger-grid { display: flex; flex-direction: column; gap: 8px; }
        .acc-row { background: white; border-radius: 14px; border: 1px solid #e2e8f0; padding: 14px 20px; display: flex; align-items: center; gap: 16px; transition:0.2s; }
        .acc-row:hover { border-color:#3b82f6; box-shadow:0 4px 12px rgba(0,0,0,0.04); }
        .acc-code { font-family: monospace; font-weight: 800; color: #94a3b8; width: 75px; font-size:12px; }
        .acc-name { flex: 1; font-size: 14px; color: #1e293b; }
        .acc-type { font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; }
        .acc-bal { font-size: 15px; font-weight: 900; width: 130px; text-align: right; }
        .acc-bal.pos { color: #1e293b; }
        .acc-bal.neg { color: #ef4444; }
        .acc-action { background: transparent; border: 1px solid #e2e8f0; color: #94a3b8; cursor: pointer; padding:6px; border-radius:8px; }
        .acc-action:hover { color:#3b82f6; border-color:#3b82f6; }
        .del-btn-sm { background:transparent; border:none; color:#cbd5e1; cursor:pointer; padding:4px; }
        .del-btn-sm:hover { color:#ef4444; }
        .mizan-box { background:white; border-radius:18px; border:1px solid #e2e8f0; padding:20px; }
        .mizan-box h4 { font-size:13px; font-weight:800; color:#1e293b; margin-bottom:14px; }
        .mizan-grid { display:flex; gap:20px; flex-wrap:wrap; }
        .mizan-item { display:flex; align-items:center; gap:8px; font-size:13px; color:#64748b; }
        .mi-dot { width:10px; height:10px; border-radius:3px; }
        .mizan-item strong { font-size:14px; }
        .journal-table-wrap { background: white; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; }
        .j-table { width: 100%; border-collapse: collapse; }
        .j-table th { background: #f8fafc; text-align: left; padding: 12px 14px; font-size: 11px; color: #94a3b8; text-transform: uppercase; }
        .j-table td { padding: 13px 14px; font-size: 12px; color: #475569; border-bottom: 1px solid #f1f5f9; }
        .j-table tfoot td { background:#f8fafc; border-bottom:none; }
        .fis-no { font-family: monospace; font-size: 11px; font-weight: 800; background: #f1f5f9; padding: 4px 8px; border-radius: 6px; color: #64748b; }
        .acc-code-sm { font-family:monospace; font-size:11px; color:#94a3b8; }
        .debit { color: #1e293b; font-weight: 700; }
        .credit { color: #ef4444; font-weight: 700; }
        .modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,0.75); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; z-index:1000; }
        .modal-box { background:white; border-radius:22px; overflow:hidden; box-shadow:0 25px 50px rgba(0,0,0,0.4); width:500px; max-height:85vh; overflow-y:auto; padding:24px; }
        .mb-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; }
        .mb-head h3 { font-size:17px; font-weight:800; color:#1e293b; }
        .mb-head button { background:transparent; border:none; color:#94a3b8; cursor:pointer; }
        .mf-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .mf { display:flex; flex-direction:column; gap:6px; }
        .mf.full { grid-column:1/-1; }
        .mf label { font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; }
        .mf input,.mf select { padding:10px 14px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:13px; outline:none; }
        .mf input:focus,.mf select:focus { border-color:#3b82f6; }
        .mf-foot { display:flex; justify-content:flex-end; gap:10px; margin-top:16px; }
        .btn-cancel { padding:10px 18px; border-radius:10px; border:1px solid #e2e8f0; background:white; font-weight:700; cursor:pointer; }
        .detail-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
        .d-item { background:#f8fafc; border-radius:12px; padding:14px; }
        .d-item span { font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase; display:block; margin-bottom:4px; }
        .d-item strong { font-size:16px; font-weight:900; color:#1e293b; }
        .detail-entries { display:flex; flex-direction:column; gap:6px; }
        .de-row { display:flex; align-items:center; gap:10px; padding:10px 12px; background:#f8fafc; border-radius:10px; font-size:12px; }
        .de-date { color:#94a3b8; font-weight:700; width:70px; }
        .de-desc { flex:1; color:#475569; }
        .de-debit { color:#10b981; font-weight:800; }
        .de-credit { color:#ef4444; font-weight:800; }
      `}</style>
    </div>
  );
};

export default Accounting;
