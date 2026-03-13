import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion } from 'framer-motion';
import {
  Receipt, Plus, Search, Download, Filter,
  CheckCircle, Clock, AlertCircle, Building, X
} from 'lucide-react';

const INVOICE_TYPES = ['Satış','Gider','İade'];
const CATS = ['Konaklama','Restoran','SPA','Teknik','Tedarikçi','Diğer'];

const Finance = () => {
  const { cashTransactions, addNotification } = useHotel();
  const [invoices, setInvoices] = useState([
    { id:'INV-2026-001', type:'Satış', cat:'Konaklama', customer:'Johnson & Co', amount:18500, date:'2026-03-13', status:'ödendi', vkn:'1234567890' },
    { id:'INV-2026-002', type:'Satış', cat:'Restoran',  customer:'Müller GmbH',  amount:4200,  date:'2026-03-14', status:'bekliyor', vkn:'9876543210' },
    { id:'INV-2026-003', type:'Gider', cat:'Tedarikçi', customer:'Tekstil San.', amount:6500,  date:'2026-03-13', status:'ödendi', vkn:'5554443333' },
    { id:'INV-2026-004', type:'Satış', cat:'SPA',       customer:'Bireysel',     amount:2800,  date:'2026-03-14', status:'bekliyor', vkn:'—' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [typeFilter, setTypeFilter] = useState('Tümü');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ type:'Satış', cat:'Konaklama', customer:'', amount:'', date:'2026-03-14', vkn:'' });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const submit = (e) => {
    e.preventDefault();
    const id = `INV-2026-${String(invoices.length+1).padStart(3,'0')}`;
    setInvoices(p=>[...p,{ ...form, id, amount:Number(form.amount), status:'bekliyor' }]);
    addNotification({ type:'info', msg:`Fatura oluşturuldu: ${id} (₺${form.amount})` });
    setForm({ type:'Satış', cat:'Konaklama', customer:'', amount:'', date:'2026-03-14', vkn:'' });
    setShowForm(false);
  };

  const markPaid = (id) => {
    setInvoices(p=>p.map(i=>i.id===id?{...i,status:'ödendi'}:i));
    addNotification({ type:'success', msg:`Fatura ödendi: ${id}` });
  };

  const filtered = invoices.filter(inv => {
    const q = search.toLowerCase();
    return (typeFilter==='Tümü'||inv.type===typeFilter) && (!q||inv.customer.toLowerCase().includes(q)||inv.id.toLowerCase().includes(q));
  });

  const totals = {
    satis:    invoices.filter(i=>i.type==='Satış').reduce((s,i)=>s+i.amount,0),
    gider:    invoices.filter(i=>i.type==='Gider').reduce((s,i)=>s+i.amount,0),
    bekleyen: invoices.filter(i=>i.status==='bekliyor').reduce((s,i)=>s+i.amount,0),
  };

  return (
    <div className="fin-page">
      <div className="fin-head">
        <div><h2><Receipt size={20}/> E-Fatura & Finans</h2><span>Satış/gider faturaları, ödeme takibi ve muhasebe entegrasyonu</span></div>
        <button className="btn-primary" onClick={()=>setShowForm(!showForm)}><Plus size={15}/> Yeni Fatura</button>
      </div>

      <div className="fin-kpi">
        {[
          { label:'Toplam Satış', val:`₺${totals.satis.toLocaleString()}`, color:'#10b981' },
          { label:'Toplam Gider', val:`₺${totals.gider.toLocaleString()}`, color:'#ef4444' },
          { label:'Net Kâr', val:`₺${(totals.satis-totals.gider).toLocaleString()}`, color:'#3b82f6' },
          { label:'Tahsil Bekleyen', val:`₺${totals.bekleyen.toLocaleString()}`, color:'#f59e0b' },
        ].map((k,i)=>(
          <div key={i} className="fk"><strong style={{color:k.color}}>{k.val}</strong><span>{k.label}</span></div>
        ))}
      </div>

      {showForm && (
        <motion.form className="form-card" onSubmit={submit} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}>
          <h3>Yeni Fatura Oluştur</h3>
          <div className="fg-grid">
            <div className="fg"><label>Fatura Tipi</label><select value={form.type} onChange={e=>set('type',e.target.value)}>{INVOICE_TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
            <div className="fg"><label>Kategori</label><select value={form.cat} onChange={e=>set('cat',e.target.value)}>{CATS.map(c=><option key={c}>{c}</option>)}</select></div>
            <div className="fg full"><label>Alıcı / Tedarikçi *</label><input value={form.customer} onChange={e=>set('customer',e.target.value)} placeholder="Firma veya kişi adı" required/></div>
            <div className="fg"><label>VKN / TCKN</label><input value={form.vkn} onChange={e=>set('vkn',e.target.value)} placeholder="Vergi kimlik no"/></div>
            <div className="fg"><label>Tarih</label><input type="date" value={form.date} onChange={e=>set('date',e.target.value)}/></div>
            <div className="fg"><label>Tutar (₺) *</label><input type="number" value={form.amount} onChange={e=>set('amount',e.target.value)} placeholder="0" required/></div>
          </div>
          <div className="form-foot">
            <button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>İptal</button>
            <button type="submit" className="btn-primary">Fatura Oluştur</button>
          </div>
        </motion.form>
      )}

      <div className="fin-controls">
        <div className="search-box"><Search size={14}/><input placeholder="Fatura no, müşteri..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
        <div className="type-tabs">
          {['Tümü','Satış','Gider','İade'].map(t=>(
            <button key={t} className={`tt ${typeFilter===t?'active':''}`} onClick={()=>setTypeFilter(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className="fin-table-wrap">
        <table className="fin-table">
          <thead><tr><th>Fatura No</th><th>Tip</th><th>Kategori</th><th>Alıcı</th><th>VKN</th><th>Tarih</th><th>Tutar</th><th>Durum</th><th>İşlem</th></tr></thead>
          <tbody>
            {filtered.map((inv,i)=>(
              <motion.tr key={inv.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.04}}>
                <td><span className="inv-id">{inv.id}</span></td>
                <td><span className={`type-tag ${inv.type==='Satış'?'green':inv.type==='Gider'?'red':'blue'}`}>{inv.type}</span></td>
                <td>{inv.cat}</td>
                <td><strong>{inv.customer}</strong></td>
                <td><span className="vkn">{inv.vkn}</span></td>
                <td>{inv.date}</td>
                <td><strong style={{color:inv.type==='Gider'?'#ef4444':'#1e293b'}}>₺{inv.amount.toLocaleString()}</strong></td>
                <td>
                  {inv.status==='ödendi'
                    ? <span className="st-tag green"><CheckCircle size={12}/> Ödendi</span>
                    : <span className="st-tag yellow"><Clock size={12}/> Bekliyor</span>
                  }
                </td>
                <td>
                  <div className="act-btns">
                    {inv.status==='bekliyor' && <button className="mb blue" onClick={()=>markPaid(inv.id)}>Ödendi İşaretle</button>}
                    <button className="mb grey"><Download size={12}/> PDF</button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .fin-page{padding:28px;display:flex;flex-direction:column;gap:18px;}
        .fin-head{display:flex;justify-content:space-between;align-items:flex-start;}
        .fin-head h2{font-size:22px;font-weight:800;color:#1e293b;display:flex;align-items:center;gap:10px;}
        .fin-head span{font-size:13px;color:#94a3b8;}
        .btn-primary{padding:10px 18px;border-radius:12px;border:none;background:#3b82f6;color:white;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .fin-kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .fk{background:white;border-radius:14px;border:1px solid #e2e8f0;padding:18px;text-align:center;}
        .fk strong{display:block;font-size:22px;font-weight:900;margin-bottom:4px;}
        .fk span{font-size:12px;color:#94a3b8;font-weight:700;}
        .form-card{background:white;border-radius:16px;border:1px solid #e2e8f0;padding:22px;}
        .form-card h3{font-size:15px;font-weight:800;color:#1e293b;margin-bottom:16px;}
        .fg-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .fg{display:flex;flex-direction:column;gap:6px;}
        .fg.full{grid-column:1/-1;}
        .fg label{font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;}
        .fg input,.fg select{padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;outline:none;}
        .form-foot{display:flex;justify-content:flex-end;gap:10px;margin-top:14px;}
        .btn-cancel{padding:10px 18px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-weight:700;cursor:pointer;}
        .fin-controls{display:flex;gap:14px;align-items:center;}
        .search-box{display:flex;align-items:center;gap:8px;background:white;border:1.5px solid #e2e8f0;padding:9px 14px;border-radius:10px;min-width:260px;}
        .search-box input{border:none;background:transparent;outline:none;font-size:13px;width:100%;}
        .type-tabs{display:flex;gap:8px;}
        .tt{padding:8px 16px;border-radius:10px;border:1.5px solid #e2e8f0;background:white;font-size:12px;font-weight:700;color:#64748b;cursor:pointer;}
        .tt.active{background:#1e293b;color:white;border-color:#1e293b;}
        .fin-table-wrap{background:white;border-radius:18px;border:1px solid #e2e8f0;overflow:hidden;}
        .fin-table{width:100%;border-collapse:collapse;}
        .fin-table thead{background:#f8fafc;}
        .fin-table th{text-align:left;padding:12px 14px;font-size:10px;color:#94a3b8;text-transform:uppercase;font-weight:800;}
        .fin-table td{padding:13px 14px;font-size:13px;color:#475569;border-bottom:1px solid #f8fafc;vertical-align:middle;}
        .fin-table tr:last-child td{border-bottom:none;}
        .inv-id{font-family:monospace;font-size:11px;background:#f1f5f9;padding:3px 8px;border-radius:6px;font-weight:700;color:#64748b;}
        .type-tag{padding:3px 10px;border-radius:20px;font-size:10px;font-weight:800;}
        .type-tag.green{background:#f0fdf4;color:#10b981;}
        .type-tag.red{background:#fef2f2;color:#ef4444;}
        .type-tag.blue{background:#eff6ff;color:#3b82f6;}
        .vkn{font-family:monospace;font-size:11px;color:#94a3b8;}
        .st-tag{display:flex;align-items:center;gap:4px;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;}
        .st-tag.green{background:#f0fdf4;color:#10b981;}
        .st-tag.yellow{background:#fffbeb;color:#b45309;}
        .act-btns{display:flex;gap:6px;}
        .mb{padding:5px 10px;border-radius:8px;border:none;font-size:11px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:4px;}
        .mb.blue{background:#eff6ff;color:#3b82f6;}
        .mb.grey{background:#f8fafc;color:#64748b;border:1px solid #e2e8f0;}
      `}</style>
    </div>
  );
};

export default Finance;
