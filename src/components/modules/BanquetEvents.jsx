import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Calendar, Clock, MapPin, CheckCircle, X } from 'lucide-react';

const HALLS = ['Büyük Salon (A)', 'Küçük Salon (B)', 'Havuz Başı', 'Teras', 'Toplantı Odası 1', 'Toplantı Odası 2'];
const TYPES = ['Düğün','Nişan','Doğum Günü','Toplantı','Seminer','Galası','Özel Kutlama'];

const BanquetEvents = () => {
  const { addCashTransaction, addNotification } = useHotel();
  const [events, setEvents] = useState([
    { id:'EV-001', name:'Yılmaz Düğünü', type:'Düğün', hall:'Büyük Salon (A)', date:'2026-03-16', pax:180, status:'onaylı', total:85000, contact:'Ahmet Yılmaz', phone:'0532 111 2233' },
    { id:'EV-002', name:'Tech Summit 2026', type:'Seminer', hall:'Toplantı Odası 1', date:'2026-03-15', pax:45, status:'bekliyor', total:22000, contact:'HR Müdürü', phone:'0212 555 4466' },
    { id:'EV-003', name:'Doğum Günü',     type:'Doğum Günü', hall:'Küçük Salon (B)', date:'2026-03-14', pax:35, status:'devam', total:12500, contact:'Selin Demir', phone:'0533 222 3344' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name:'', type:TYPES[0], hall:HALLS[0], date:'', pax:'', total:'', contact:'', phone:'' });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const submit = (e) => {
    e.preventDefault();
    const id = `EV-${String(events.length+1).padStart(3,'0')}`;
    setEvents(p=>[...p,{ ...form, id, status:'bekliyor', pax:Number(form.pax), total:Number(form.total) }]);
    addNotification({ type:'info', msg:`Yeni etkinlik: ${form.name} — ${form.date}` });
    setForm({ name:'', type:TYPES[0], hall:HALLS[0], date:'', pax:'', total:'', contact:'', phone:'' });
    setShowForm(false);
  };

  const updateStatus = (id, status) => {
    setEvents(p=>p.map(e=>e.id===id?{...e,status}:e));
    if (status==='tamamlandı') {
      const ev = events.find(e=>e.id===id);
      if (ev) addCashTransaction({ type:'gelir', desc:`Etkinlik Geliri — ${ev.name}`, amount:ev.total, method:'EFT/Havale' });
      addNotification({ type:'success', msg:`Etkinlik tamamlandı ve gelir kaydedildi: ${events.find(e=>e.id===id)?.name}` });
    }
  };

  const STATUS_MAP = {
    bekliyor: { label:'Bekliyor', color:'#f59e0b', bg:'#fffbeb' },
    onaylı:   { label:'Onaylı', color:'#10b981', bg:'#f0fdf4' },
    devam:    { label:'Devam Ediyor', color:'#3b82f6', bg:'#eff6ff' },
    tamamlandı: { label:'Tamamlandı', color:'#64748b', bg:'#f1f5f9' },
    iptal:    { label:'İptal', color:'#ef4444', bg:'#fef2f2' },
  };

  const total = events.filter(e=>e.status!=='iptal').reduce((s,e)=>s+e.total,0);

  return (
    <div className="bq-page">
      <div className="bq-head">
        <div><h2><Users size={20}/> Ziyafet & Etkinlik Yönetimi</h2><span>Salon rezervasyonları, organizasyon ve faturalama</span></div>
        <button className="btn-primary" onClick={()=>setShowForm(!showForm)}><Plus size={15}/> Yeni Etkinlik</button>
      </div>

      <div className="bq-kpi">
        {[
          { label:'Toplam Etkinlik', val:events.length, color:'#3b82f6' },
          { label:'Bugün', val:events.filter(e=>e.date==='2026-03-14').length, color:'#f59e0b' },
          { label:'Onaylı', val:events.filter(e=>e.status==='onaylı').length, color:'#10b981' },
          { label:'Tahmini Gelir', val:`₺${total.toLocaleString()}`, color:'#8b5cf6' },
        ].map((k,i)=>(
          <div key={i} className="bk"><strong style={{color:k.color}}>{k.val}</strong><span>{k.label}</span></div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form className="form-card" onSubmit={submit} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <h3>Yeni Etkinlik / Salon Rezervasyonu</h3>
            <div className="fg-grid">
              <div className="fg full"><label>Etkinlik Adı *</label><input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Etkinlik adı" required/></div>
              <div className="fg"><label>Tür</label><select value={form.type} onChange={e=>set('type',e.target.value)}>{TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
              <div className="fg"><label>Salon</label><select value={form.hall} onChange={e=>set('hall',e.target.value)}>{HALLS.map(h=><option key={h}>{h}</option>)}</select></div>
              <div className="fg"><label>Tarih *</label><input type="date" value={form.date} onChange={e=>set('date',e.target.value)} required/></div>
              <div className="fg"><label>Kişi Sayısı</label><input type="number" value={form.pax} onChange={e=>set('pax',e.target.value)} placeholder="0"/></div>
              <div className="fg"><label>Toplam Tutar (₺)</label><input type="number" value={form.total} onChange={e=>set('total',e.target.value)} placeholder="0"/></div>
              <div className="fg"><label>İletişim Kişisi</label><input value={form.contact} onChange={e=>set('contact',e.target.value)} placeholder="Ad Soyad"/></div>
              <div className="fg"><label>Telefon</label><input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+90 5xx..."/></div>
            </div>
            <div className="form-foot"><button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>İptal</button><button type="submit" className="btn-primary">Etkinlik Oluştur</button></div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="ev-cards">
        {events.map((ev,i)=>{
          const st = STATUS_MAP[ev.status];
          return (
            <motion.div key={ev.id} className="ev-card" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}>
              <div className="ec-top">
                <div>
                  <div className="ev-type">{ev.type}</div>
                  <h3>{ev.name}</h3>
                </div>
                <span className="ev-status" style={{background:st.bg,color:st.color}}>{st.label}</span>
              </div>
              <div className="ev-details">
                <div><MapPin size={13}/> {ev.hall}</div>
                <div><Calendar size={13}/> {ev.date}</div>
                <div><Users size={13}/> {ev.pax} kişi</div>
              </div>
              <div className="ev-contact">{ev.contact} · {ev.phone}</div>
              <div className="ec-foot">
                <strong className="ev-total">₺{ev.total.toLocaleString()}</strong>
                <div className="act-btns">
                  {ev.status==='bekliyor'    && <button className="mb green" onClick={()=>updateStatus(ev.id,'onaylı')}>Onayla</button>}
                  {ev.status==='onaylı'      && <button className="mb blue" onClick={()=>updateStatus(ev.id,'devam')}>Başlatıldı</button>}
                  {ev.status==='devam'       && <button className="mb purple" onClick={()=>updateStatus(ev.id,'tamamlandı')}>Tamamla & Faturalandır</button>}
                  {ev.status!=='tamamlandı'&&ev.status!=='iptal' && <button className="mb red" onClick={()=>updateStatus(ev.id,'iptal')}>İptal</button>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .bq-page{padding:28px;display:flex;flex-direction:column;gap:18px;}
        .bq-head{display:flex;justify-content:space-between;align-items:flex-start;}
        .bq-head h2{font-size:22px;font-weight:800;color:#1e293b;display:flex;align-items:center;gap:10px;}
        .bq-head span{font-size:13px;color:#94a3b8;}
        .btn-primary{padding:10px 18px;border-radius:12px;border:none;background:#3b82f6;color:white;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .bq-kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .bk{background:white;border-radius:14px;border:1px solid #e2e8f0;padding:18px;text-align:center;}
        .bk strong{display:block;font-size:26px;font-weight:900;margin-bottom:4px;}
        .bk span{font-size:12px;color:#94a3b8;font-weight:700;}
        .form-card{background:white;border-radius:16px;border:1px solid #e2e8f0;padding:22px;}
        .form-card h3{font-size:15px;font-weight:800;color:#1e293b;margin-bottom:16px;}
        .fg-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .fg{display:flex;flex-direction:column;gap:6px;}
        .fg.full{grid-column:1/-1;}
        .fg label{font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;}
        .fg input,.fg select{padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;outline:none;}
        .form-foot{display:flex;justify-content:flex-end;gap:10px;margin-top:14px;}
        .btn-cancel{padding:10px 18px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-weight:700;cursor:pointer;}
        .ev-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;}
        .ev-card{background:white;border:1.5px solid #e2e8f0;border-radius:18px;padding:20px;display:flex;flex-direction:column;gap:12px;}
        .ec-top{display:flex;justify-content:space-between;align-items:flex-start;}
        .ev-type{font-size:11px;font-weight:700;color:#94a3b8;margin-bottom:4px;}
        .ev-card h3{font-size:16px;font-weight:800;color:#1e293b;}
        .ev-status{font-size:11px;font-weight:800;padding:4px 12px;border-radius:20px;white-space:nowrap;}
        .ev-details{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#64748b;}
        .ev-details>div{display:flex;align-items:center;gap:6px;}
        .ev-contact{font-size:12px;color:#94a3b8;font-style:italic;}
        .ec-foot{display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid #f1f5f9;}
        .ev-total{font-size:18px;font-weight:900;color:#1e293b;}
        .act-btns{display:flex;gap:6px;flex-wrap:wrap;}
        .mb{padding:6px 12px;border-radius:8px;border:none;font-size:11px;font-weight:700;cursor:pointer;}
        .mb.green{background:#ecfdf5;color:#10b981;}
        .mb.blue{background:#eff6ff;color:#3b82f6;}
        .mb.purple{background:#f5f3ff;color:#8b5cf6;}
        .mb.red{background:#fef2f2;color:#ef4444;}
      `}</style>
    </div>
  );
};

export default BanquetEvents;
