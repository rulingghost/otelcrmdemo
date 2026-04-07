import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Plus, Calendar, Clock, MapPin, CheckCircle, X,
  Search, Filter, Edit2, Trash2, DollarSign, BarChart3,
  Phone, Mail, Eye, Download
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

const HALLS = ['Büyük Salon (A)', 'Küçük Salon (B)', 'Havuz Başı', 'Teras', 'Toplantı Odası 1', 'Toplantı Odası 2'];
const TYPES = ['Düğün','Nişan','Doğum Günü','Toplantı','Seminer','Gala','Özel Kutlama'];
const STATUS_MAP = {
  bekliyor:   { label:'Bekliyor', color:'#f59e0b', bg:'#fffbeb' },
  onaylı:     { label:'Onaylı', color:'#10b981', bg:'#f0fdf4' },
  devam:      { label:'Devam Ediyor', color:'#3b82f6', bg:'#eff6ff' },
  tamamlandı: { label:'Tamamlandı', color:'#64748b', bg:'#f1f5f9' },
  iptal:      { label:'İptal', color:'#ef4444', bg:'#fef2f2' },
};

const BanquetEvents = () => {
  const { addCashTransaction, addNotification, TODAY } = useHotel();
  const [events, setEvents] = useState([
    { id:'EV-001', name:'Yılmaz Düğünü', type:'Düğün', hall:'Büyük Salon (A)', date:'2026-03-16', time:'18:00', pax:180, status:'onaylı', total:85000, paid:30000, contact:'Ahmet Yılmaz', phone:'0532 111 2233', email:'ahmet@email.com', notes:'Canlı müzik + DJ' },
    { id:'EV-002', name:'Tech Summit 2026', type:'Seminer', hall:'Toplantı Odası 1', date:'2026-03-15', time:'09:00', pax:45, status:'bekliyor', total:22000, paid:0, contact:'HR Müdürü', phone:'0212 555 4466', email:'hr@techcorp.com', notes:'Projeksiyon + mikrofon lazım' },
    { id:'EV-003', name:'Selin Doğum Günü', type:'Doğum Günü', hall:'Küçük Salon (B)', date:'2026-03-14', time:'20:00', pax:35, status:'devam', total:12500, paid:12500, contact:'Selin Demir', phone:'0533 222 3344', email:'selin@email.com', notes:'Pasta siparişi verildi' },
    { id:'EV-004', name:'Medical Congress', type:'Seminer', hall:'Büyük Salon (A)', date:'2026-03-20', time:'10:00', pax:120, status:'onaylı', total:45000, paid:15000, contact:'Dr. Kaya', phone:'0541 999 0011', email:'drkaya@hospital.com', notes:'3 gün sürecek' },
    { id:'EV-005', name:'Öztürk Nişanı', type:'Nişan', hall:'Teras', date:'2026-03-22', time:'19:00', pax:80, status:'bekliyor', total:28000, paid:5000, contact:'Ayşe Öztürk', phone:'0535 444 5566', email:'ayse@email.com', notes:'Açık havada' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [detailEvent, setDetailEvent] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('tümü');
  const [form, setForm] = useState({ name:'', type:TYPES[0], hall:HALLS[0], date:'', time:'18:00', pax:'', total:'', paid:'', contact:'', phone:'', email:'', notes:'' });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const idCounter = React.useRef(5);

  const openNew = () => {
    setEditEvent(null);
    setForm({ name:'', type:TYPES[0], hall:HALLS[0], date:'', time:'18:00', pax:'', total:'', paid:'', contact:'', phone:'', email:'', notes:'' });
    setShowForm(true);
  };

  const openEdit = (ev) => {
    setEditEvent(ev);
    setForm({ ...ev, pax: String(ev.pax), total: String(ev.total), paid: String(ev.paid || 0) });
    setShowForm(true);
  };

  const submit = (e) => {
    e.preventDefault();
    if (editEvent) {
      setEvents(p => p.map(ev => ev.id === editEvent.id ? { ...ev, ...form, pax: Number(form.pax), total: Number(form.total), paid: Number(form.paid) || 0 } : ev));
      addNotification({ type:'success', msg:`Etkinlik güncellendi: ${form.name}` });
    } else {
      idCounter.current++;
      const id = `EV-${String(idCounter.current).padStart(3,'0')}`;
      setEvents(p => [...p, { ...form, id, status:'bekliyor', pax:Number(form.pax), total:Number(form.total), paid:Number(form.paid)||0 }]);
      addNotification({ type:'info', msg:`Yeni etkinlik: ${form.name} — ${form.date}` });
    }
    setForm({ name:'', type:TYPES[0], hall:HALLS[0], date:'', time:'18:00', pax:'', total:'', paid:'', contact:'', phone:'', email:'', notes:'' });
    setShowForm(false);
    setEditEvent(null);
  };

  const updateStatus = (id, status) => {
    setEvents(p => p.map(e => e.id === id ? { ...e, status } : e));
    if (status === 'tamamlandı') {
      const ev = events.find(e => e.id === id);
      if (ev) addCashTransaction({ type:'gelir', desc:`Etkinlik Geliri — ${ev.name}`, amount: ev.total, method:'EFT/Havale' });
      addNotification({ type:'success', msg:`Etkinlik tamamlandı ve ₺${ev?.total.toLocaleString()} gelir kaydedildi` });
    } else {
      addNotification({ type:'info', msg:`Etkinlik durumu güncellendi: ${STATUS_MAP[status]?.label}` });
    }
  };

  const deleteEvent = (id) => {
    const ev = events.find(e => e.id === id);
    setEvents(p => p.filter(e => e.id !== id));
    addNotification({ type:'info', msg:`Etkinlik silindi: ${ev?.name}` });
    setDetailEvent(null);
  };

  const collectPayment = (id, amount) => {
    setEvents(p => p.map(e => e.id === id ? { ...e, paid: (e.paid || 0) + amount } : e));
    addCashTransaction({ type:'gelir', desc:`Etkinlik Ön Ödeme — ${events.find(e=>e.id===id)?.name}`, amount, method:'Nakit' });
    addNotification({ type:'success', msg:`₺${amount.toLocaleString()} tahsilat alındı` });
    setDetailEvent(prev => prev ? { ...prev, paid: (prev.paid||0) + amount } : null);
  };

  // Filtreleme
  const filtered = useMemo(() => events.filter(ev => {
    const q = search.toLowerCase();
    const matchSearch = !q || ev.name.toLowerCase().includes(q) || ev.contact.toLowerCase().includes(q) || ev.hall.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'tümü' || ev.status === statusFilter;
    return matchSearch && matchStatus;
  }), [events, search, statusFilter]);

  // KPI hesaplamaları
  const kpis = useMemo(() => {
    const active = events.filter(e => e.status !== 'iptal');
    const todayCount = events.filter(e => e.date === TODAY).length;
    const totalRevenue = active.reduce((s,e) => s + e.total, 0);
    const totalPaid = active.reduce((s,e) => s + (e.paid||0), 0);
    const totalPax = active.reduce((s,e) => s + e.pax, 0);
    return { todayCount, totalRevenue, totalPaid, totalPax, pending: totalRevenue - totalPaid };
  }, [events, TODAY]);

  // Grafik verileri
  const typeChartData = useMemo(() => {
    const map = {};
    events.filter(e=>e.status!=='iptal').forEach(e => { map[e.type] = (map[e.type]||0) + 1; });
    return Object.entries(map).map(([name,value]) => ({name,value}));
  }, [events]);

  const hallRevenueData = useMemo(() => {
    const map = {};
    events.filter(e=>e.status!=='iptal').forEach(e => { map[e.hall] = (map[e.hall]||0) + e.total; });
    return Object.entries(map).map(([name,val]) => ({name: name.split(' ')[0] + (name.includes('(') ? ' ' + name.match(/\((.)\)/)?.[1] || '' : ''), gelir: val}));
  }, [events]);

  const COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899','#06b6d4'];

  return (
    <div className="bq-page">
      <div className="bq-head">
        <div>
          <h2><Users size={20}/> Ziyafet & Etkinlik Yönetimi</h2>
          <span>Salon rezervasyonları, organizasyon, tahsilat ve faturalama</span>
        </div>
        <button className="btn-primary" onClick={openNew}><Plus size={15}/> Yeni Etkinlik</button>
      </div>

      {/* KPI Kartları */}
      <div className="bq-kpi">
        {[
          { label:'Toplam Etkinlik', val: events.filter(e=>e.status!=='iptal').length, color:'#3b82f6', icon:<Calendar size={18}/> },
          { label:'Bugün', val: kpis.todayCount, color:'#f59e0b', icon:<Clock size={18}/> },
          { label:'Toplam Kişi', val: kpis.totalPax, color:'#8b5cf6', icon:<Users size={18}/> },
          { label:'Tahmini Gelir', val:`₺${kpis.totalRevenue.toLocaleString()}`, color:'#10b981', icon:<DollarSign size={18}/> },
          { label:'Tahsil Edilen', val:`₺${kpis.totalPaid.toLocaleString()}`, color:'#3b82f6', icon:<CheckCircle size={18}/> },
          { label:'Kalan Alacak', val:`₺${kpis.pending.toLocaleString()}`, color: kpis.pending > 0 ? '#ef4444' : '#10b981', icon:<BarChart3 size={18}/> },
        ].map((k,i)=>(
          <motion.div key={i} className="bk" whileHover={{y:-2}}>
            <div className="bk-icon" style={{color:k.color}}>{k.icon}</div>
            <div><strong style={{color:k.color}}>{k.val}</strong><span>{k.label}</span></div>
          </motion.div>
        ))}
      </div>

      {/* Arama ve Filtre */}
      <div className="bq-filters">
        <div className="bq-search"><Search size={14}/><input placeholder="Etkinlik, salon veya iletişim ara..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
        <div className="status-pills">
          {['tümü',...Object.keys(STATUS_MAP)].map(s=>(
            <button key={s} className={`sp ${statusFilter===s?'active':''}`} onClick={()=>setStatusFilter(s)}>
              {s==='tümü'?'Tümü':STATUS_MAP[s]?.label}
              {s!=='tümü' && <span className="sp-count">{events.filter(e=>e.status===s).length}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Grafikler */}
      <div className="bq-charts">
        <div className="chart-box">
          <h4>Etkinlik Türü Dağılımı</h4>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={typeChartData} dataKey="value" cx="50%" cy="50%" innerRadius={30} outerRadius={55} paddingAngle={3}>
                {typeChartData.map((e,i) => <Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            {typeChartData.map((d,i)=>(
              <div key={d.name} className="cl-item"><div className="cl-dot" style={{background:COLORS[i%COLORS.length]}}/>{d.name}: {d.value}</div>
            ))}
          </div>
        </div>
        <div className="chart-box flex1">
          <h4>Salon Bazlı Gelir</h4>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={hallRevenueData} barSize={16}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#94a3b8',fontSize:10}}/>
              <YAxis hide/>
              <Tooltip formatter={v=>[`₺${v.toLocaleString()}`,'Gelir']}/>
              <Bar dataKey="gelir" fill="#3b82f6" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>{setShowForm(false);setEditEvent(null);}}>
            <motion.form className="modal-box" initial={{scale:0.9,y:20}} animate={{scale:1,y:0}} onClick={e=>e.stopPropagation()} onSubmit={submit}>
              <div className="mb-head"><h3>{editEvent ? 'Etkinlik Düzenle' : 'Yeni Etkinlik / Salon Rezervasyonu'}</h3><button type="button" onClick={()=>{setShowForm(false);setEditEvent(null);}}><X size={18}/></button></div>
              <div className="fg-grid">
                <div className="fg full"><label>Etkinlik Adı *</label><input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Etkinlik adı" required/></div>
                <div className="fg"><label>Tür</label><select value={form.type} onChange={e=>set('type',e.target.value)}>{TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
                <div className="fg"><label>Salon</label><select value={form.hall} onChange={e=>set('hall',e.target.value)}>{HALLS.map(h=><option key={h}>{h}</option>)}</select></div>
                <div className="fg"><label>Tarih *</label><input type="date" value={form.date} onChange={e=>set('date',e.target.value)} required/></div>
                <div className="fg"><label>Saat</label><input type="time" value={form.time} onChange={e=>set('time',e.target.value)}/></div>
                <div className="fg"><label>Kişi Sayısı</label><input type="number" value={form.pax} onChange={e=>set('pax',e.target.value)} placeholder="0"/></div>
                <div className="fg"><label>Toplam Tutar (₺)</label><input type="number" value={form.total} onChange={e=>set('total',e.target.value)} placeholder="0"/></div>
                <div className="fg"><label>Ön Ödeme (₺)</label><input type="number" value={form.paid} onChange={e=>set('paid',e.target.value)} placeholder="0"/></div>
                <div className="fg"><label>İletişim Kişisi</label><input value={form.contact} onChange={e=>set('contact',e.target.value)} placeholder="Ad Soyad"/></div>
                <div className="fg"><label>Telefon</label><input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+90 5xx..."/></div>
                <div className="fg"><label>E-posta</label><input value={form.email} onChange={e=>set('email',e.target.value)} placeholder="email@..."/></div>
                <div className="fg full"><label>Notlar</label><input value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Özel istekler, detaylar..."/></div>
              </div>
              <div className="form-foot">
                <button type="button" className="btn-cancel" onClick={()=>{setShowForm(false);setEditEvent(null);}}>İptal</button>
                <button type="submit" className="btn-primary">{editEvent ? 'Güncelle' : 'Etkinlik Oluştur'}</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Etkinlik Kartları */}
      <div className="ev-cards">
        {filtered.map((ev,i)=>{
          const st = STATUS_MAP[ev.status];
          const remaining = ev.total - (ev.paid||0);
          return (
            <motion.div key={ev.id} className={`ev-card ${ev.status==='iptal'?'cancelled':''}`} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}>
              <div className="ec-top">
                <div>
                  <div className="ev-type">{ev.type}</div>
                  <h3>{ev.name}</h3>
                </div>
                <span className="ev-status" style={{background:st.bg,color:st.color}}>{st.label}</span>
              </div>
              <div className="ev-details">
                <div><MapPin size={13}/> {ev.hall}</div>
                <div><Calendar size={13}/> {ev.date} {ev.time && `— ${ev.time}`}</div>
                <div><Users size={13}/> {ev.pax} kişi</div>
                {ev.notes && <div className="ev-notes">💡 {ev.notes}</div>}
              </div>
              <div className="ev-contact-row">
                <span><Phone size={11}/> {ev.contact} · {ev.phone}</span>
              </div>
              {/* Ödeme Durumu Bar */}
              <div className="ev-payment">
                <div className="ep-info">
                  <span>Ödeme: ₺{(ev.paid||0).toLocaleString()} / ₺{ev.total.toLocaleString()}</span>
                  <strong className={remaining>0?'ep-remaining':'ep-paid'}>{remaining>0?`₺${remaining.toLocaleString()} kalan`:'Tam ödendi ✓'}</strong>
                </div>
                <div className="ep-bar-bg"><div className="ep-bar" style={{width:`${Math.min(100,(ev.paid||0)/ev.total*100)}%`}}/></div>
              </div>
              <div className="ec-foot">
                <strong className="ev-total">₺{ev.total.toLocaleString()}</strong>
                <div className="act-btns">
                  <button className="mb grey" onClick={()=>setDetailEvent(ev)} title="Detay"><Eye size={12}/></button>
                  <button className="mb grey" onClick={()=>openEdit(ev)} title="Düzenle"><Edit2 size={12}/></button>
                  {ev.status==='bekliyor' && <button className="mb green" onClick={()=>updateStatus(ev.id,'onaylı')}>Onayla</button>}
                  {ev.status==='onaylı' && <button className="mb blue" onClick={()=>updateStatus(ev.id,'devam')}>Başlat</button>}
                  {ev.status==='devam' && <button className="mb purple" onClick={()=>updateStatus(ev.id,'tamamlandı')}>Tamamla</button>}
                  {ev.status!=='tamamlandı'&&ev.status!=='iptal' && <button className="mb red" onClick={()=>updateStatus(ev.id,'iptal')}>İptal</button>}
                </div>
              </div>
            </motion.div>
          );
        })}
        {filtered.length===0 && <div className="no-data"><Calendar size={48} color="#e2e8f0"/><p>Eşleşen etkinlik bulunamadı</p></div>}
      </div>

      {/* Detay Modal */}
      <AnimatePresence>
        {detailEvent && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setDetailEvent(null)}>
            <motion.div className="modal-box lg" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()}>
              <div className="mb-head">
                <h3>{detailEvent.name}</h3>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <span className="ev-status" style={{background:STATUS_MAP[detailEvent.status]?.bg,color:STATUS_MAP[detailEvent.status]?.color}}>{STATUS_MAP[detailEvent.status]?.label}</span>
                  <button onClick={()=>setDetailEvent(null)}><X size={18}/></button>
                </div>
              </div>
              <div className="detail-grid">
                <div className="d-item"><span>Etkinlik Türü</span><strong>{detailEvent.type}</strong></div>
                <div className="d-item"><span>Salon</span><strong>{detailEvent.hall}</strong></div>
                <div className="d-item"><span>Tarih & Saat</span><strong>{detailEvent.date} {detailEvent.time}</strong></div>
                <div className="d-item"><span>Kişi Sayısı</span><strong>{detailEvent.pax} kişi</strong></div>
                <div className="d-item"><span>Toplam Tutar</span><strong style={{color:'#10b981'}}>₺{detailEvent.total.toLocaleString()}</strong></div>
                <div className="d-item"><span>Tahsil Edilen</span><strong>₺{(detailEvent.paid||0).toLocaleString()}</strong></div>
              </div>
              <div className="detail-contact">
                <h4>İletişim Bilgileri</h4>
                <div className="dc-row"><Phone size={14}/> {detailEvent.contact} — {detailEvent.phone}</div>
                {detailEvent.email && <div className="dc-row"><Mail size={14}/> {detailEvent.email}</div>}
                {detailEvent.notes && <div className="dc-notes">📝 {detailEvent.notes}</div>}
              </div>
              {/* Tahsilat Butonu */}
              {detailEvent.status !== 'iptal' && detailEvent.status !== 'tamamlandı' && (detailEvent.total - (detailEvent.paid||0)) > 0 && (
                <div className="pay-section">
                  <h4>Hızlı Tahsilat</h4>
                  <div className="pay-btns">
                    {[5000,10000,25000].filter(a=>a<=(detailEvent.total-(detailEvent.paid||0))).map(amount=>(
                      <button key={amount} className="pay-btn" onClick={()=>collectPayment(detailEvent.id,amount)}>₺{amount.toLocaleString()}</button>
                    ))}
                    <button className="pay-btn full" onClick={()=>collectPayment(detailEvent.id,detailEvent.total-(detailEvent.paid||0))}>
                      Tamamını Tahsil: ₺{(detailEvent.total-(detailEvent.paid||0)).toLocaleString()}
                    </button>
                  </div>
                </div>
              )}
              <div className="mf-foot">
                <button className="btn-cancel" style={{color:'#ef4444',borderColor:'#fecaca'}} onClick={()=>deleteEvent(detailEvent.id)}>Etkinliği Sil</button>
                <button className="mb blue" onClick={()=>{openEdit(detailEvent);setDetailEvent(null);}}>Düzenle</button>
                <button className="btn-primary" onClick={()=>setDetailEvent(null)}>Kapat</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .bq-page{padding:28px;display:flex;flex-direction:column;gap:18px;}
        .bq-head{display:flex;justify-content:space-between;align-items:flex-start;}
        .bq-head h2{font-size:22px;font-weight:800;color:#1e293b;display:flex;align-items:center;gap:10px;}
        .bq-head span{font-size:13px;color:#94a3b8;}
        .btn-primary{padding:10px 18px;border-radius:12px;border:none;background:#3b82f6;color:white;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .btn-primary:hover{background:#2563eb;}
        .bq-kpi{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;}
        .bk{background:white;border-radius:14px;border:1px solid #e2e8f0;padding:14px;display:flex;align-items:center;gap:12px;}
        .bk-icon{width:36px;height:36px;border-radius:10px;background:#f8fafc;display:flex;align-items:center;justify-content:center;}
        .bk strong{display:block;font-size:18px;font-weight:900;margin-bottom:2px;}
        .bk span{font-size:10px;color:#94a3b8;font-weight:700;text-transform:uppercase;}
        .bq-filters{display:flex;gap:14px;align-items:center;flex-wrap:wrap;}
        .bq-search{display:flex;align-items:center;gap:8px;background:white;border:1.5px solid #e2e8f0;padding:9px 14px;border-radius:10px;min-width:300px;}
        .bq-search input{border:none;background:transparent;outline:none;font-size:13px;width:100%;}
        .status-pills{display:flex;gap:6px;flex-wrap:wrap;}
        .sp{padding:6px 14px;border-radius:20px;border:1.5px solid #e2e8f0;background:white;font-size:11px;font-weight:700;color:#64748b;cursor:pointer;display:flex;align-items:center;gap:6px;}
        .sp.active{background:#1e293b;color:white;border-color:#1e293b;}
        .sp-count{font-size:9px;background:rgba(255,255,255,0.2);padding:1px 6px;border-radius:10px;}
        .sp.active .sp-count{background:rgba(255,255,255,0.2);}
        .bq-charts{display:grid;grid-template-columns:280px 1fr;gap:14px;}
        .chart-box{background:white;border-radius:18px;border:1px solid #e2e8f0;padding:18px;}
        .chart-box.flex1{flex:1;}
        .chart-box h4{font-size:12px;font-weight:800;color:#64748b;margin-bottom:10px;text-transform:uppercase;}
        .chart-legend{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;}
        .cl-item{display:flex;align-items:center;gap:5px;font-size:11px;color:#64748b;font-weight:600;}
        .cl-dot{width:8px;height:8px;border-radius:2px;}
        .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.75);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:1000;}
        .modal-box{background:white;border-radius:22px;box-shadow:0 25px 50px rgba(0,0,0,0.4);width:540px;max-height:85vh;overflow-y:auto;padding:24px;}
        .modal-box.lg{width:600px;}
        .mb-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;}
        .mb-head h3{font-size:17px;font-weight:800;color:#1e293b;}
        .mb-head button{background:transparent;border:none;color:#94a3b8;cursor:pointer;}
        .fg-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .fg{display:flex;flex-direction:column;gap:6px;}
        .fg.full{grid-column:1/-1;}
        .fg label{font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;}
        .fg input,.fg select{padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;outline:none;}
        .fg input:focus,.fg select:focus{border-color:#3b82f6;}
        .form-foot{display:flex;justify-content:flex-end;gap:10px;margin-top:14px;}
        .btn-cancel{padding:10px 18px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-weight:700;cursor:pointer;}
        .ev-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px;}
        .ev-card{background:white;border:1.5px solid #e2e8f0;border-radius:18px;padding:20px;display:flex;flex-direction:column;gap:10px;transition:0.2s;}
        .ev-card:hover{border-color:#3b82f6;box-shadow:0 8px 20px rgba(0,0,0,0.04);}
        .ev-card.cancelled{opacity:0.6;}
        .ec-top{display:flex;justify-content:space-between;align-items:flex-start;}
        .ev-type{font-size:11px;font-weight:700;color:#94a3b8;margin-bottom:4px;}
        .ev-card h3{font-size:16px;font-weight:800;color:#1e293b;}
        .ev-status{font-size:11px;font-weight:800;padding:4px 12px;border-radius:20px;white-space:nowrap;}
        .ev-details{display:flex;flex-direction:column;gap:4px;font-size:12px;color:#64748b;}
        .ev-details>div{display:flex;align-items:center;gap:6px;}
        .ev-notes{font-style:italic;color:#94a3b8;font-size:11px;}
        .ev-contact-row{font-size:11px;color:#94a3b8;display:flex;align-items:center;gap:4px;}
        .ev-contact-row span{display:flex;align-items:center;gap:4px;}
        .ev-payment{display:flex;flex-direction:column;gap:4px;}
        .ep-info{display:flex;justify-content:space-between;font-size:11px;color:#64748b;}
        .ep-remaining{color:#ef4444;font-weight:800;font-size:11px;}
        .ep-paid{color:#10b981;font-weight:800;font-size:11px;}
        .ep-bar-bg{height:4px;background:#e2e8f0;border-radius:10px;overflow:hidden;}
        .ep-bar{height:100%;background:linear-gradient(90deg,#3b82f6,#10b981);border-radius:10px;transition:width 0.5s;}
        .ec-foot{display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid #f1f5f9;}
        .ev-total{font-size:18px;font-weight:900;color:#1e293b;}
        .act-btns{display:flex;gap:5px;flex-wrap:wrap;}
        .mb{padding:5px 10px;border-radius:8px;border:none;font-size:11px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:4px;}
        .mb.green{background:#ecfdf5;color:#10b981;}
        .mb.blue{background:#eff6ff;color:#3b82f6;}
        .mb.purple{background:#f5f3ff;color:#8b5cf6;}
        .mb.red{background:#fef2f2;color:#ef4444;}
        .mb.grey{background:#f8fafc;color:#64748b;border:1px solid #e2e8f0;}
        .mb:hover{opacity:0.85;}
        .no-data{grid-column:1/-1;text-align:center;padding:60px 20px;color:#94a3b8;display:flex;flex-direction:column;align-items:center;gap:12px;}
        .no-data p{font-size:14px;font-weight:600;}
        .detail-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;}
        .d-item{background:#f8fafc;border-radius:12px;padding:12px;}
        .d-item span{font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;display:block;margin-bottom:4px;}
        .d-item strong{font-size:14px;font-weight:900;color:#1e293b;}
        .detail-contact{background:#f8fafc;border-radius:14px;padding:14px;margin-bottom:14px;}
        .detail-contact h4{font-size:12px;font-weight:800;color:#1e293b;margin-bottom:8px;}
        .dc-row{display:flex;align-items:center;gap:8px;font-size:12px;color:#64748b;margin-bottom:4px;}
        .dc-notes{font-size:12px;color:#94a3b8;font-style:italic;margin-top:8px;}
        .pay-section{background:#eff6ff;border-radius:14px;padding:16px;margin-bottom:14px;}
        .pay-section h4{font-size:12px;font-weight:800;color:#3b82f6;margin-bottom:10px;}
        .pay-btns{display:flex;gap:8px;flex-wrap:wrap;}
        .pay-btn{padding:8px 16px;border-radius:10px;border:1.5px solid #3b82f6;background:white;color:#3b82f6;font-size:12px;font-weight:800;cursor:pointer;}
        .pay-btn:hover{background:#3b82f6;color:white;}
        .pay-btn.full{border-color:#10b981;color:#10b981;}
        .pay-btn.full:hover{background:#10b981;color:white;}
        .mf-foot{display:flex;justify-content:flex-end;gap:10px;margin-top:14px;}
      `}</style>
    </div>
  );
};

export default BanquetEvents;
