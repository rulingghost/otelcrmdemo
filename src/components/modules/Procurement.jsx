import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Search, X, CheckCircle, Package, Truck, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SUPPLIERS = ['Temizlik A.Ş.', 'Gıda Ltd.', 'Tekstil San.', 'Teknoloji A.Ş.', 'Ofis Malz. Ltd.'];
const CATS = ['Gıda & İçecek', 'Temizlik', 'Tekstil', 'Teknoloji', 'Ofis', 'Bakım & Onarım'];

const INITIAL = [
  { id:'PO-001', item:'Havlu (100 adet)', supplier:'Tekstil San.',  cat:'Tekstil',    amount:6500,  status:'teslim',  date:'2026-03-10' },
  { id:'PO-002', item:'Temizlik Seti',     supplier:'Temizlik A.Ş.',cat:'Temizlik', amount:2800,  status:'yolda',   date:'2026-03-13' },
  { id:'PO-003', item:'Minibar Malzemeleri',supplier:'Gıda Ltd.',   cat:'Gıda & İçecek', amount:4200, status:'bekliyor',date:'2026-03-14' },
  { id:'PO-004', item:'Laptop (2 adet)',   supplier:'Teknoloji A.Ş.',cat:'Teknoloji', amount:38000, status:'onay',    date:'2026-03-14' },
];

const STATUS_STYLE = {
  bekliyor: { label:'Sipariş Verildi', color:'#f59e0b', bg:'#fffbeb' },
  onay:     { label:'Onay Bekliyor',  color:'#3b82f6', bg:'#eff6ff' },
  yolda:    { label:'Yolda',          color:'#8b5cf6', bg:'#f5f3ff' },
  teslim:   { label:'Teslim Edildi',  color:'#10b981', bg:'#f0fdf4' },
  iptal:    { label:'İptal',          color:'#ef4444', bg:'#fef2f2' },
};

const Procurement = () => {
  const { addNotification } = useHotel();
  const [orders, setOrders] = useState(INITIAL);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ item:'', supplier: SUPPLIERS[0], cat: CATS[0], amount:'', date:'2026-03-14' });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('tümü');

  const submit = (e) => {
    e.preventDefault();
    const id = `PO-${String(orders.length+1).padStart(3,'0')}`;
    setOrders(p=>[{...form, id, status:'bekliyor', amount:Number(form.amount)}, ...p]);
    addNotification({ type:'info', msg:`Satın alma emri oluşturuldu: ${form.item}` });
    setForm({ item:'', supplier:SUPPLIERS[0], cat:CATS[0], amount:'', date:'2026-03-14' });
    setShowForm(false);
  };

  const updateStatus = (id, status) => {
    setOrders(p=>p.map(o=>o.id===id?{...o,status}:o));
    addNotification({ type:'success', msg:`Sipariş durumu güncellendi: ${id}` });
  };

  const total = orders.reduce((s,o)=>s+o.amount,0);
  const delivered = orders.filter(o=>o.status==='teslim').length;

  const filteredOrders = orders.filter(o => {
    const matchSearch = !search || o.item.toLowerCase().includes(search.toLowerCase()) || o.supplier.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'tümü' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const supplierData = SUPPLIERS.map(s => ({
    name: s.split(' ')[0],
    tutar: orders.filter(o => o.supplier === s).reduce((sum, o) => sum + o.amount, 0)
  })).filter(s => s.tutar > 0);

  return (
    <div className="proc-page">
      <div className="proc-head">
        <div><h2><ShoppingBag size={20}/> Satın Alma (Procurement)</h2><span>Sipariş, tedarikçi ve teslimat yönetimi</span></div>
        <button className="btn-primary" onClick={()=>setShowForm(!showForm)}><Plus size={15}/> Yeni Sipariş</button>
      </div>

      <div className="proc-kpi">
        {[
          { label:'Toplam Sipariş', val:orders.length, color:'#3b82f6' },
          { label:'Bekleyen', val:orders.filter(o=>o.status!=='teslim'&&o.status!=='iptal').length, color:'#f59e0b' },
          { label:'Teslim Edildi', val:delivered, color:'#10b981' },
          { label:'Toplam Tutar', val:`₺${total.toLocaleString()}`, color:'#8b5cf6' },
        ].map((k,i)=>(
          <div key={i} className="pk"><strong style={{color:k.color}}>{k.val}</strong><span>{k.label}</span></div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="proc-filters">
        <div className="proc-search"><Search size={14}/><input placeholder="Sipariş veya tedarikçi ara..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
        <div className="status-pills">
          {['tümü','bekliyor','onay','yolda','teslim','iptal'].map(s=>(
            <button key={s} className={`sp ${statusFilter===s?'active':''}`} onClick={()=>setStatusFilter(s)}>{s==='tümü'?'Tümü':STATUS_STYLE[s]?.label||s}</button>
          ))}
        </div>
      </div>

      {supplierData.length > 0 && (
        <div className="supplier-chart">
          <h4>Tedarikçi Bazlı Harcama</h4>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={supplierData} layout="vertical" barSize={12}>
              <XAxis type="number" hide/>
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#64748b',fontSize:11}} width={65}/>
              <Tooltip formatter={v=>[`₺${v.toLocaleString()}`,'Tutar']}/>
              <Bar dataKey="tutar" fill="#3b82f6" radius={[0,6,6,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.form className="form-card" onSubmit={submit} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <h3>Yeni Satın Alma Emri</h3>
            <div className="fg-grid">
              <div className="fg full"><label>Ürün / Hizmet Adı *</label><input value={form.item} onChange={e=>set('item',e.target.value)} placeholder="Ürün adı" required/></div>
              <div className="fg"><label>Tedarikçi</label><select value={form.supplier} onChange={e=>set('supplier',e.target.value)}>{SUPPLIERS.map(s=><option key={s}>{s}</option>)}</select></div>
              <div className="fg"><label>Kategori</label><select value={form.cat} onChange={e=>set('cat',e.target.value)}>{CATS.map(c=><option key={c}>{c}</option>)}</select></div>
              <div className="fg"><label>Tutar (₺)</label><input type="number" value={form.amount} onChange={e=>set('amount',e.target.value)} placeholder="0" required/></div>
              <div className="fg"><label>Tarih</label><input type="date" value={form.date} onChange={e=>set('date',e.target.value)}/></div>
            </div>
            <div className="form-foot"><button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>İptal</button><button type="submit" className="btn-primary">Sipariş Oluştur</button></div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="proc-table-wrap">
        <table className="proc-table">
          <thead><tr><th>Sipariş No</th><th>Ürün</th><th>Tedarikçi</th><th>Kategori</th><th>Tutar</th><th>Durum</th><th>İşlem</th></tr></thead>
          <tbody>
            {filteredOrders.map((o,i)=>{
              const st = STATUS_STYLE[o.status];
              return (
                <motion.tr key={o.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.04}}>
                  <td><span className="oid">{o.id}</span></td>
                  <td><strong>{o.item}</strong><div className="date-sub">{o.date}</div></td>
                  <td>{o.supplier}</td>
                  <td><span className="cat-tag">{o.cat}</span></td>
                  <td><strong>₺{o.amount.toLocaleString()}</strong></td>
                  <td><span className="status-tag" style={{background:st.bg,color:st.color}}>{st.label}</span></td>
                  <td>
                    <div className="act-btns">
                      {o.status==='bekliyor' && <button className="mb blue" onClick={()=>updateStatus(o.id,'onay')}>Onayla</button>}
                      {o.status==='onay'     && <button className="mb purple" onClick={()=>updateStatus(o.id,'yolda')}>Yolda İşaretle</button>}
                      {o.status==='yolda'    && <button className="mb green" onClick={()=>updateStatus(o.id,'teslim')}><Truck size={12}/> Teslim Alındı</button>}
                      {o.status!=='teslim'&&o.status!=='iptal' && <button className="mb red" onClick={()=>updateStatus(o.id,'iptal')}>İptal</button>}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style>{`
        .proc-page{padding:28px;display:flex;flex-direction:column;gap:18px;}
        .proc-head{display:flex;justify-content:space-between;align-items:flex-start;}
        .proc-head h2{font-size:22px;font-weight:800;color:#1e293b;display:flex;align-items:center;gap:10px;}
        .proc-head span{font-size:13px;color:#94a3b8;}
        .btn-primary{padding:10px 18px;border-radius:12px;border:none;background:#3b82f6;color:white;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .proc-kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .pk{background:white;border-radius:14px;border:1px solid #e2e8f0;padding:18px;text-align:center;}
        .pk strong{display:block;font-size:26px;font-weight:900;margin-bottom:4px;}
        .pk span{font-size:12px;color:#94a3b8;font-weight:700;}
        .form-card{background:white;border-radius:16px;border:1px solid #e2e8f0;padding:22px;}
        .form-card h3{font-size:15px;font-weight:800;color:#1e293b;margin-bottom:16px;}
        .fg-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .fg{display:flex;flex-direction:column;gap:6px;}
        .fg.full{grid-column:1/-1;}
        .fg label{font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;}
        .fg input,.fg select{padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;outline:none;}
        .form-foot{display:flex;justify-content:flex-end;gap:10px;margin-top:14px;}
        .btn-cancel{padding:10px 18px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-weight:700;cursor:pointer;}
        .proc-table-wrap{background:white;border-radius:18px;border:1px solid #e2e8f0;overflow:hidden;}
        .proc-table{width:100%;border-collapse:collapse;}
        .proc-table thead{background:#f8fafc;}
        .proc-table th{text-align:left;padding:12px 16px;font-size:11px;color:#94a3b8;text-transform:uppercase;font-weight:800;}
        .proc-table td{padding:14px 16px;font-size:13px;color:#475569;border-bottom:1px solid #f8fafc;vertical-align:middle;}
        .proc-table tr:last-child td{border-bottom:none;}
        .oid{font-family:monospace;font-size:11px;background:#f1f5f9;padding:3px 8px;border-radius:6px;font-weight:700;color:#64748b;}
        .date-sub{font-size:11px;color:#94a3b8;margin-top:2px;}
        .cat-tag{background:#f1f5f9;color:#64748b;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
        .status-tag{padding:4px 12px;border-radius:20px;font-size:11px;font-weight:800;}
        .act-btns{display:flex;gap:6px;flex-wrap:wrap;}
        .mb{padding:5px 12px;border-radius:8px;border:none;font-size:11px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:4px;}
        .mb.blue{background:#eff6ff;color:#3b82f6;}
        .mb.purple{background:#f5f3ff;color:#8b5cf6;}
        .mb.green{background:#ecfdf5;color:#10b981;}
        .mb.red{background:#fef2f2;color:#ef4444;}
        .proc-filters{display:flex;gap:14px;align-items:center;flex-wrap:wrap;}
        .proc-search{display:flex;align-items:center;gap:8px;background:white;border:1.5px solid #e2e8f0;padding:9px 14px;border-radius:10px;min-width:280px;}
        .proc-search input{border:none;background:transparent;outline:none;font-size:13px;width:100%;}
        .status-pills{display:flex;gap:6px;flex-wrap:wrap;}
        .sp{padding:6px 14px;border-radius:20px;border:1.5px solid #e2e8f0;background:white;font-size:11px;font-weight:700;color:#64748b;cursor:pointer;}
        .sp.active{background:#1e293b;color:white;border-color:#1e293b;}
        .supplier-chart{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:16px;}
        .supplier-chart h4{font-size:12px;font-weight:800;color:#64748b;margin-bottom:8px;}
      `}</style>
    </div>
  );
};

export default Procurement;
