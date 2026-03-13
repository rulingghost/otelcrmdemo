import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Plus, Calendar, Clock, User, CheckCircle, X, Star } from 'lucide-react';

const SERVICES = [
  { id:'SP-01', name:'Klasik Masaj (60dk)',    price:850,  duration:60, category:'Masaj' },
  { id:'SP-02', name:'Aromaterapi (90dk)',      price:1200, duration:90, category:'Masaj' },
  { id:'SP-03', name:'Hamam & Kese',           price:600,  duration:75, category:'Hamam' },
  { id:'SP-04', name:'Yüz Bakımı',             price:950,  duration:60, category:'Bakım' },
  { id:'SP-05', name:'Manikür & Pedikür',      price:550,  duration:90, category:'Güzellik' },
  { id:'SP-06', name:'VIP Paket (180dk)',       price:2800, duration:180,category:'Paket' },
  { id:'SP-07', name:'Çift Masajı (60dk)',      price:1600, duration:60, category:'Masaj' },
  { id:'SP-08', name:'Saç Bakımı & Stil',      price:700,  duration:60, category:'Güzellik' },
];

const SLOTS = ['09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00'];

const SpaManagement = () => {
  const { reservations, addFolioLine, addCashTransaction, addNotification } = useHotel();
  const inHouse = reservations.filter(r=>r.status==='check-in');

  const [appointments, setAppointments] = useState([
    { id:'A-001', service:'Klasik Masaj (60dk)', guest:'Ahmet Yılmaz', room:'101', time:'10:00', date:'2026-03-14', status:'tamamlandı', price:850 },
    { id:'A-002', service:'Aromaterapi (90dk)',   guest:'Sarah Johnson', room:'205', time:'14:00', date:'2026-03-14', status:'bekliyor', price:1200 },
    { id:'A-003', service:'VIP Paket (180dk)',    guest:'Klaus Weber',   room:'304', time:'16:00', date:'2026-03-14', status:'bekliyor', price:2800 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ service:'SP-01', guestRes:'', date:'2026-03-14', time:'10:00', billing:'folio' });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const selService = SERVICES.find(s=>s.id===form.service);
  const selRes     = inHouse.find(r=>r.id===form.guestRes);

  const submit = (e) => {
    e.preventDefault();
    const id = `A-${String(appointments.length+1).padStart(3,'0')}`;
    setAppointments(p=>[...p,{
      id, service:selService.name, guest:selRes?.guest||'Walk-in',
      room:selRes?.room||'—', time:form.time, date:form.date, status:'bekliyor', price:selService.price
    }]);
    addNotification({ type:'info', msg:`SPA randevusu oluşturuldu: ${selService.name} — ${form.time}` });
    setForm({ service:'SP-01', guestRes:'', date:'2026-03-14', time:'10:00', billing:'folio' });
    setShowForm(false);
  };

  const complete = (appt) => {
    setAppointments(p=>p.map(a=>a.id===appt.id?{...a,status:'tamamlandı'}:a));
    const res = inHouse.find(r=>r.guest===appt.guest);
    if (res) {
      addFolioLine(res.id, { desc:`SPA — ${appt.service}`, amount:appt.price, type:'extra' });
      addNotification({ type:'success', msg:`SPA hizmeti faturaya eklendi: ${appt.guest}` });
    } else {
      addCashTransaction({ type:'gelir', desc:`SPA — ${appt.service} (${appt.guest})`, amount:appt.price, method:'Nakit' });
      addNotification({ type:'success', msg:`SPA hizmeti kasaya eklendi: ₺${appt.price}` });
    }
  };

  const cats = ['Tümü',...new Set(SERVICES.map(s=>s.category))];
  const [cat, setCat] = useState('Tümü');
  const filteredSvc = cat==='Tümü' ? SERVICES : SERVICES.filter(s=>s.category===cat);

  const todayTotal = appointments.filter(a=>a.status==='tamamlandı').reduce((s,a)=>s+a.price,0);

  return (
    <div className="spa-page">
      <div className="spa-head">
        <div><h2><Waves size={20}/> SPA & Wellness Merkezi</h2><span>Randevu, hizmet ve gelir yönetimi</span></div>
        <button className="btn-primary" onClick={()=>setShowForm(!showForm)}><Plus size={15}/> Randevu Al</button>
      </div>

      <div className="spa-kpi">
        {[
          { label:'Bugün Randevu', val:appointments.filter(a=>a.date==='2026-03-14').length, color:'#8b5cf6' },
          { label:'Bekliyor', val:appointments.filter(a=>a.status==='bekliyor').length, color:'#f59e0b' },
          { label:'Tamamlanan', val:appointments.filter(a=>a.status==='tamamlandı').length, color:'#10b981' },
          { label:'Günlük Gelir', val:`₺${todayTotal.toLocaleString()}`, color:'#3b82f6' },
        ].map((k,i)=>(
          <div key={i} className="spk"><strong style={{color:k.color}}>{k.val}</strong><span>{k.label}</span></div>
        ))}
      </div>

      <div className="spa-layout">
        {/* Services Panel */}
        <div className="svc-panel">
          <div className="sp-head">
            <h3>Hizmetler & Fiyatlar</h3>
            <div className="cat-tabs">
              {cats.map(c=><button key={c} className={`ct ${cat===c?'active':''}`} onClick={()=>setCat(c)}>{c}</button>)}
            </div>
          </div>
          <div className="svc-list">
            {filteredSvc.map(svc=>(
              <div key={svc.id} className="svc-card">
                <div className="sc-left">
                  <strong>{svc.name}</strong>
                  <span><Clock size={11}/> {svc.duration} dk · <Star size={11}/> {svc.category}</span>
                </div>
                <div className="sc-price">₺{svc.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointments */}
        <div className="appt-panel">
          <h3>Bugünkü Randevular ({appointments.filter(a=>a.date==='2026-03-14').length})</h3>
          <div className="appt-list">
            {appointments.map((a,i)=>(
              <motion.div key={a.id} className={`appt-card ${a.status}`} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.05}}>
                <div className="ac-time"><Clock size={14}/>{a.time}</div>
                <div className="ac-info">
                  <strong>{a.service}</strong>
                  <span><User size={11}/> {a.guest} · Oda {a.room}</span>
                </div>
                <div className="ac-right">
                  <div className="ac-price">₺{a.price.toLocaleString()}</div>
                  {a.status==='bekliyor' ? (
                    <button className="complete-btn" onClick={()=>complete(a)}>
                      <CheckCircle size={14}/> Tamamla
                    </button>
                  ) : (
                    <span className="done-tag"><CheckCircle size={13} color="#10b981"/> Tamamlandı</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointment Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="modal-overlay" onClick={()=>setShowForm(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <motion.form className="spa-modal" onClick={e=>e.stopPropagation()} onSubmit={submit} initial={{scale:.9}} animate={{scale:1}}>
              <div className="modal-head"><h3>Yeni SPA Randevusu</h3><button type="button" onClick={()=>setShowForm(false)}><X size={18}/></button></div>
              <div style={{padding:'22px',display:'flex',flexDirection:'column',gap:'14px'}}>
                <div className="fg"><label>Hizmet *</label>
                  <select value={form.service} onChange={e=>set('service',e.target.value)}>
                    {SERVICES.map(s=><option key={s.id} value={s.id}>{s.name} — ₺{s.price} ({s.duration}dk)</option>)}
                  </select>
                </div>
                <div className="fg"><label>Misafir (Oda Faturalama)</label>
                  <select value={form.guestRes} onChange={e=>set('guestRes',e.target.value)}>
                    <option value="">Walk-in (Nakit)</option>
                    {inHouse.map(r=><option key={r.id} value={r.id}>Oda {r.room} — {r.guest}</option>)}
                  </select>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                  <div className="fg"><label>Tarih</label><input type="date" value={form.date} onChange={e=>set('date',e.target.value)}/></div>
                  <div className="fg"><label>Saat</label>
                    <select value={form.time} onChange={e=>set('time',e.target.value)}>
                      {SLOTS.map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                {selService && (
                  <div className="price-box">
                    <span>Seçilen: {selService.name}</span>
                    <strong>₺{selService.price.toLocaleString()}</strong>
                  </div>
                )}
              </div>
              <div className="modal-foot">
                <button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>İptal</button>
                <button type="submit" className="btn-primary">Randevu Oluştur</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .spa-page{padding:28px;display:flex;flex-direction:column;gap:20px;}
        .spa-head{display:flex;justify-content:space-between;align-items:flex-start;}
        .spa-head h2{font-size:22px;font-weight:800;color:#1e293b;display:flex;align-items:center;gap:10px;}
        .spa-head span{font-size:13px;color:#94a3b8;}
        .btn-primary{padding:10px 18px;border-radius:12px;border:none;background:#8b5cf6;color:white;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .spa-kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .spk{background:white;border-radius:14px;border:1px solid #e2e8f0;padding:18px;text-align:center;}
        .spk strong{display:block;font-size:24px;font-weight:900;margin-bottom:4px;}
        .spk span{font-size:12px;color:#94a3b8;font-weight:700;}
        .spa-layout{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
        .svc-panel,.appt-panel{background:white;border-radius:20px;border:1px solid #e2e8f0;padding:20px;}
        .sp-head{margin-bottom:14px;}
        .sp-head h3,.appt-panel h3{font-size:15px;font-weight:800;color:#1e293b;margin-bottom:10px;}
        .cat-tabs{display:flex;gap:6px;flex-wrap:wrap;}
        .ct{padding:5px 12px;border-radius:20px;border:1.5px solid #e2e8f0;background:white;font-size:11px;font-weight:700;cursor:pointer;color:#64748b;}
        .ct.active{background:#8b5cf6;color:white;border-color:#8b5cf6;}
        .svc-list{display:flex;flex-direction:column;gap:8px;}
        .svc-card{display:flex;justify-content:space-between;align-items:center;padding:12px;background:#f8fafc;border-radius:10px;}
        .sc-left strong{font-size:13px;color:#1e293b;font-weight:700;display:block;}
        .sc-left span{font-size:11px;color:#94a3b8;display:flex;align-items:center;gap:4px;margin-top:3px;}
        .sc-price{font-size:16px;font-weight:900;color:#8b5cf6;}
        .appt-list{display:flex;flex-direction:column;gap:10px;}
        .appt-card{display:flex;align-items:center;gap:14px;padding:14px;border-radius:14px;border:1.5px solid #e2e8f0;background:white;}
        .appt-card.tamamlandı{opacity:.7;background:#f8fafc;}
        .ac-time{display:flex;align-items:center;gap:5px;font-size:14px;font-weight:900;color:#8b5cf6;flex-shrink:0;}
        .ac-info{flex:1;}
        .ac-info strong{display:block;font-size:13px;color:#1e293b;font-weight:700;}
        .ac-info span{font-size:11px;color:#94a3b8;display:flex;align-items:center;gap:4px;}
        .ac-right{display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0;}
        .ac-price{font-size:15px;font-weight:900;color:#1e293b;}
        .complete-btn{padding:6px 14px;border-radius:8px;border:none;background:#8b5cf6;color:white;font-size:11px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:5px;}
        .done-tag{display:flex;align-items:center;gap:4px;font-size:11px;font-weight:700;color:#10b981;}
        .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.75);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:1000;}
        .spa-modal{background:white;border-radius:22px;overflow:hidden;box-shadow:0 25px 50px rgba(0,0,0,0.4);width:480px;}
        .modal-head{padding:20px 24px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;}
        .modal-head h3{font-size:16px;font-weight:800;color:#1e293b;}
        .modal-head button{background:transparent;border:none;color:#94a3b8;cursor:pointer;}
        .modal-foot{padding:16px 24px;border-top:1px solid #f1f5f9;display:flex;justify-content:flex-end;gap:10px;}
        .btn-cancel{padding:10px 18px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-weight:700;cursor:pointer;}
        .fg{display:flex;flex-direction:column;gap:6px;}
        .fg label{font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;}
        .fg input,.fg select{padding:11px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;outline:none;}
        .price-box{display:flex;justify-content:space-between;background:#f5f3ff;padding:14px 16px;border-radius:12px;}
        .price-box span{font-size:13px;color:#64748b;}
        .price-box strong{font-size:16px;font-weight:900;color:#8b5cf6;}
      `}</style>
    </div>
  );
};

export default SpaManagement;
