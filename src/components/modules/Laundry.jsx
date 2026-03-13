import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, Plus, CheckCircle, Clock, X, Search, Truck } from 'lucide-react';

const STATUS_MAP = {
  bekliyor: { label:'Bekliyor', color:'#f59e0b', bg:'#fffbeb' },
  yikama:   { label:'Yıkamada', color:'#3b82f6', bg:'#eff6ff' },
  hazir:    { label:'Hazır', color:'#10b981', bg:'#f0fdf4' },
  teslim:   { label:'Teslim', color:'#64748b', bg:'#f1f5f9' },
};

const Laundry = () => {
  const { reservations, addFolioLine, addNotification } = useHotel();
  const inHouse = reservations.filter(r=>r.status==='check-in');

  const [orders, setOrders] = useState([
    { id:'L-001', room:'101', guest:'Ahmet Yılmaz', items:'3 Gömlek, 2 Pantolon', status:'hazir', date:'2026-03-14', total:450, urgent:false },
    { id:'L-002', room:'205', guest:'Sarah Johnson',  items:'5 Parça Karma',       status:'yikama', date:'2026-03-14', total:275, urgent:true },
    { id:'L-003', room:'304', guest:'Klaus Weber',    items:'2 Takım Elbise',      status:'bekliyor',date:'2026-03-14', total:600, urgent:false },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ room:'', guest:'', items:'', urgent:false, total:'' });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const submit = (e) => {
    e.preventDefault();
    const id = `L-${String(orders.length+1).padStart(3,'0')}`;
    setOrders(p=>[...p,{...form, id, status:'bekliyor', date:'2026-03-14', total:Number(form.total)}]);
    addNotification({ type:'info', msg:`Çamaşır siparişi alındı: Oda ${form.room}` });
    setForm({ room:'', guest:'', items:'', urgent:false, total:'' });
    setShowForm(false);
  };

  const updateStatus = (id, status) => {
    setOrders(p=>p.map(o=>o.id===id?{...o,status}:o));
    if (status==='teslim') {
      const o = orders.find(x=>x.id===id);
      if (o) {
        const res = inHouse.find(r=>r.room===o.room);
        if (res) addFolioLine(res.id, { desc:`Çamaşırhane — ${o.items}`, amount:o.total, type:'extra' });
      }
      addNotification({ type:'success', msg:`Çamaşır teslim edildi: Oda ${orders.find(o=>o.id===id)?.room}` });
    }
  };

  const kpi = [
    { label:'Bekliyor', val:orders.filter(o=>o.status==='bekliyor').length, color:'#f59e0b' },
    { label:'Yıkamada', val:orders.filter(o=>o.status==='yikama').length, color:'#3b82f6' },
    { label:'Hazır',    val:orders.filter(o=>o.status==='hazir').length, color:'#10b981' },
    { label:'Bugün Gelir',val:`₺${orders.filter(o=>o.status==='teslim').reduce((s,o)=>s+o.total,0).toLocaleString()}`, color:'#8b5cf6' },
  ];

  return (
    <div className="lnd-page">
      <div className="lnd-head">
        <div><h2><Shirt size={20}/> Çamaşırhane Yönetimi</h2><span>Çamaşır siparişleri, iade ve faturalama</span></div>
        <button className="btn-primary" onClick={()=>setShowForm(!showForm)}><Plus size={15}/> Yeni Sipariş</button>
      </div>

      <div className="lnd-kpi">
        {kpi.map((k,i)=>(
          <div key={i} className="lk"><strong style={{color:k.color}}>{k.val}</strong><span>{k.label}</span></div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form className="form-card" onSubmit={submit} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <h3>Yeni Çamaşır Siparişi</h3>
            <div className="fg-grid">
              <div className="fg">
                <label>Oda *</label>
                <select value={form.room} onChange={e=>{
                  const r = inHouse.find(r=>r.room===e.target.value);
                  set('room',e.target.value);
                  if(r) set('guest',r.guest);
                }}>
                  <option value="">Oda seçin</option>
                  {inHouse.map(r=><option key={r.id} value={r.room}>{r.room} — {r.guest}</option>)}
                </select>
              </div>
              <div className="fg"><label>Toplam Tutar (₺)</label><input type="number" value={form.total} onChange={e=>set('total',e.target.value)} placeholder="0" required/></div>
              <div className="fg full"><label>Parçalar</label><input value={form.items} onChange={e=>set('items',e.target.value)} placeholder="3 Gömlek, 2 Pantolon..." required/></div>
              <div className="fg"><label>Acele / Ekspres</label>
                <button type="button" className={`toggle-btn ${form.urgent?'on':''}`} onClick={()=>set('urgent',!form.urgent)}>
                  {form.urgent ? '⚡ Acele Sipariş' : 'Normal Sipariş'}
                </button>
              </div>
            </div>
            <div className="form-foot">
              <button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>İptal</button>
              <button type="submit" className="btn-primary">Sipariş Oluştur</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="lnd-table-wrap">
        <table className="lnd-table">
          <thead><tr><th>Sipariş</th><th>Oda / Misafir</th><th>Parçalar</th><th>Tutar</th><th>Durum</th><th>İşlem</th></tr></thead>
          <tbody>
            {orders.map((o,i)=>{
              const st = STATUS_MAP[o.status];
              return (
                <motion.tr key={o.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.05}}>
                  <td>
                    <div><span className="oid">{o.id}</span>{o.urgent&&<span className="urgent-tag">⚡ Acele</span>}</div>
                  </td>
                  <td><div><strong>{o.room}</strong><span>{o.guest}</span></div></td>
                  <td>{o.items}</td>
                  <td><strong>₺{o.total.toLocaleString()}</strong></td>
                  <td><span className="status-tag" style={{background:st.bg,color:st.color}}>{st.label}</span></td>
                  <td>
                    <div className="act-btns">
                      {o.status==='bekliyor' && <button className="mb blue" onClick={()=>updateStatus(o.id,'yikama')}>Yıkamaya Al</button>}
                      {o.status==='yikama'   && <button className="mb green" onClick={()=>updateStatus(o.id,'hazir')}>Hazır İşaretle</button>}
                      {o.status==='hazir'    && <button className="mb purple" onClick={()=>updateStatus(o.id,'teslim')}><Truck size={12}/> Teslim Et + Faturalandır</button>}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style>{`
        .lnd-page{padding:28px;display:flex;flex-direction:column;gap:18px;}
        .lnd-head{display:flex;justify-content:space-between;align-items:flex-start;}
        .lnd-head h2{font-size:22px;font-weight:800;color:#1e293b;display:flex;align-items:center;gap:10px;}
        .lnd-head span{font-size:13px;color:#94a3b8;}
        .btn-primary{padding:10px 18px;border-radius:12px;border:none;background:#3b82f6;color:white;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .lnd-kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .lk{background:white;border-radius:14px;border:1px solid #e2e8f0;padding:18px;text-align:center;}
        .lk strong{display:block;font-size:26px;font-weight:900;margin-bottom:4px;}
        .lk span{font-size:12px;color:#94a3b8;font-weight:700;}
        .form-card{background:white;border-radius:16px;border:1px solid #e2e8f0;padding:22px;}
        .form-card h3{font-size:15px;font-weight:800;color:#1e293b;margin-bottom:16px;}
        .fg-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .fg{display:flex;flex-direction:column;gap:6px;}
        .fg.full{grid-column:1/-1;}
        .fg label{font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;}
        .fg input,.fg select{padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;outline:none;}
        .toggle-btn{padding:10px 14px;border-radius:10px;border:1.5px solid #e2e8f0;background:white;font-size:13px;font-weight:700;cursor:pointer;text-align:left;}
        .toggle-btn.on{background:#fffbeb;border-color:#f59e0b;color:#b45309;}
        .form-foot{display:flex;justify-content:flex-end;gap:10px;margin-top:14px;}
        .btn-cancel{padding:10px 18px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-weight:700;cursor:pointer;}
        .lnd-table-wrap{background:white;border-radius:18px;border:1px solid #e2e8f0;overflow:hidden;}
        .lnd-table{width:100%;border-collapse:collapse;}
        .lnd-table thead{background:#f8fafc;}
        .lnd-table th{text-align:left;padding:12px 16px;font-size:11px;color:#94a3b8;text-transform:uppercase;font-weight:800;}
        .lnd-table td{padding:14px 16px;font-size:13px;color:#475569;border-bottom:1px solid #f8fafc;vertical-align:middle;}
        .lnd-table td strong{display:block;color:#1e293b;font-weight:700;}
        .lnd-table td span{font-size:11px;color:#94a3b8;}
        .lnd-table tr:last-child td{border-bottom:none;}
        .oid{font-family:monospace;font-size:11px;background:#f1f5f9;padding:3px 8px;border-radius:6px;font-weight:700;color:#64748b;margin-right:8px;}
        .urgent-tag{font-size:10px;font-weight:800;color:#b45309;background:#fffbeb;padding:2px 8px;border-radius:20px;}
        .status-tag{padding:4px 12px;border-radius:20px;font-size:11px;font-weight:800;}
        .act-btns{display:flex;gap:6px;}
        .mb{padding:6px 12px;border-radius:8px;border:none;font-size:11px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:4px;}
        .mb.blue{background:#eff6ff;color:#3b82f6;}
        .mb.green{background:#ecfdf5;color:#10b981;}
        .mb.purple{background:#f5f3ff;color:#8b5cf6;}
      `}</style>
    </div>
  );
};

export default Laundry;
