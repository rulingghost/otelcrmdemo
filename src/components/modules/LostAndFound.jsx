import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, MapPin, Camera, CheckCircle, Clock, X } from 'lucide-react';

const CATS = ['Elektronik','Kıyafet','Takı','Çanta','Belge','Oyuncak','Diğer'];

const LostAndFound = () => {
  const { addNotification } = useHotel();
  const [items, setItems] = useState([
    { id:'LF-001', name:'Siyah Laptop Şarjı', cat:'Elektronik', location:'Oda 205', desc:'Samsung marka', foundDate:'2026-03-13', status:'bekliyor', guest:'' },
    { id:'LF-002', name:'Altın Kolye',         cat:'Takı',       location:'Resepsiyon', desc:'Zarf içinde bulundu', foundDate:'2026-03-14', status:'bekliyor', guest:'' },
    { id:'LF-003', name:'Çocuk Oyuncağı',      cat:'Oyuncak',    location:'Oda 104', desc:'Küçük kırmızı araba', foundDate:'2026-03-12', status:'teslim', guest:'Müller' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name:'', cat:'Elektronik', location:'', desc:'', foundDate:'2026-03-14', guest:'' });
  const [deliverModal, setDeliverModal] = useState(null);
  const [deliverGuest, setDeliverGuest] = useState('');
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const submit = (e) => {
    e.preventDefault();
    const id = `LF-${String(items.length+1).padStart(3,'0')}`;
    setItems(p=>[...p,{ ...form, id, status:'bekliyor' }]);
    addNotification({ type:'info', msg:`Kayıp eşya kaydedildi: ${form.name}` });
    setForm({ name:'', cat:'Elektronik', location:'', desc:'', foundDate:'2026-03-14', guest:'' });
    setShowForm(false);
  };

  const deliver = () => {
    setItems(p=>p.map(i=>i.id===deliverModal?{...i,status:'teslim',guest:deliverGuest}:i));
    addNotification({ type:'success', msg:`Eşya sahibe teslim edildi: ${items.find(i=>i.id===deliverModal)?.name}` });
    setDeliverModal(null);
    setDeliverGuest('');
  };

  const kpi = [
    { label:'Kayıtlı', val:items.length, color:'#3b82f6' },
    { label:'Sahibi Bekleniyor', val:items.filter(i=>i.status==='bekliyor').length, color:'#f59e0b' },
    { label:'Teslim Edildi', val:items.filter(i=>i.status==='teslim').length, color:'#10b981' },
  ];

  return (
    <div className="lf-page">
      <div className="lf-head">
        <div><h2><Package size={20}/> Kayıp & Bulunan</h2><span>Misafir kayıp eşya takibi ve teslim yönetimi</span></div>
        <button className="btn-primary" onClick={()=>setShowForm(!showForm)}><Plus size={15}/> Eşya Kaydet</button>
      </div>

      <div className="lf-kpi">
        {kpi.map((k,i)=>(
          <div key={i} className="lk"><strong style={{color:k.color}}>{k.val}</strong><span>{k.label}</span></div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form className="form-card" onSubmit={submit} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <h3>Yeni Kayıp Eşya Kaydı</h3>
            <div className="fg-grid">
              <div className="fg full"><label>Eşya Adı *</label><input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Eşyayı tanımlayın" required/></div>
              <div className="fg"><label>Kategori</label><select value={form.cat} onChange={e=>set('cat',e.target.value)}>{CATS.map(c=><option key={c}>{c}</option>)}</select></div>
              <div className="fg"><label>Bulunduğu Yer</label><input value={form.location} onChange={e=>set('location',e.target.value)} placeholder="Oda 101, Restoran, vb."/></div>
              <div className="fg"><label>Bulunma Tarihi</label><input type="date" value={form.foundDate} onChange={e=>set('foundDate',e.target.value)}/></div>
              <div className="fg full"><label>Açıklama</label><input value={form.desc} onChange={e=>set('desc',e.target.value)} placeholder="Ek bilgi..."/></div>
            </div>
            <div className="form-foot"><button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>İptal</button><button type="submit" className="btn-primary">Kaydet</button></div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="lf-cards">
        {items.map((item,i)=>(
          <motion.div key={item.id} className={`lf-card ${item.status}`} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}>
            <div className="lfc-top">
              <div className="cat-icon">{item.cat==='Elektronik'?'💻':item.cat==='Takı'?'💍':item.cat==='Kıyafet'?'👕':item.cat==='Çanta'?'👜':item.cat==='Oyuncak'?'🧸':'📦'}</div>
              <span className={`lf-status ${item.status}`}>{item.status==='bekliyor'?'Sahibi Bekleniyor':'✓ Teslim Edildi'}</span>
            </div>
            <h4>{item.name}</h4>
            <div className="lf-details">
              <div><MapPin size={12}/> {item.location}</div>
              <div><Clock size={12}/> {item.foundDate}</div>
              {item.desc && <div className="lf-desc">{item.desc}</div>}
              {item.guest && <div className="lf-owner"><CheckCircle size={12} color="#10b981"/> Teslim: {item.guest}</div>}
            </div>
            <div className="lfc-foot">
              <span className="oid">{item.id}</span>
              {item.status==='bekliyor' && (
                <button className="del-btn" onClick={()=>setDeliverModal(item.id)}>Sahibine Teslim Et</button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deliver modal */}
      <AnimatePresence>
        {deliverModal && (
          <motion.div className="modal-overlay" onClick={()=>setDeliverModal(null)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <motion.div className="del-modal" onClick={e=>e.stopPropagation()} initial={{scale:.9}} animate={{scale:1}}>
              <div className="modal-head"><h3>Teslim Kaydı</h3><button onClick={()=>setDeliverModal(null)}><X size={18}/></button></div>
              <div style={{padding:'20px'}}>
                <p style={{fontSize:'13px',color:'#64748b',marginBottom:'14px'}}>Eşyayı teslim alan kişinin adını girin:</p>
                <input value={deliverGuest} onChange={e=>setDeliverGuest(e.target.value)} placeholder="Misafir adı veya kimlik bilgisi" style={{width:'100%',padding:'12px 14px',border:'1.5px solid #e2e8f0',borderRadius:'12px',fontSize:'13px',outline:'none'}}/>
                <div className="modal-foot" style={{marginTop:'14px'}}>
                  <button className="btn-cancel" onClick={()=>setDeliverModal(null)}>İptal</button>
                  <button className="btn-primary" onClick={deliver} disabled={!deliverGuest}>Teslim Et & Kapat</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .lf-page{padding:28px;display:flex;flex-direction:column;gap:18px;}
        .lf-head{display:flex;justify-content:space-between;align-items:flex-start;}
        .lf-head h2{font-size:22px;font-weight:800;color:#1e293b;display:flex;align-items:center;gap:10px;}
        .lf-head span{font-size:13px;color:#94a3b8;}
        .btn-primary{padding:10px 18px;border-radius:12px;border:none;background:#3b82f6;color:white;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .lf-kpi{display:flex;gap:14px;}
        .lk{background:white;border-radius:14px;border:1px solid #e2e8f0;padding:18px 28px;text-align:center;}
        .lk strong{display:block;font-size:26px;font-weight:900;margin-bottom:4px;}
        .lk span{font-size:12px;color:#94a3b8;font-weight:700;}
        .form-card{background:white;border-radius:16px;border:1px solid #e2e8f0;padding:22px;}
        .form-card h3{font-size:15px;font-weight:800;color:#1e293b;margin-bottom:16px;}
        .fg-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .fg{display:flex;flex-direction:column;gap:6px;}
        .fg.full{grid-column:1/-1;}
        .fg label{font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;}
        .fg input,.fg select{padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;outline:none;}
        .form-foot{display:flex;justify-content:flex-end;gap:10px;margin-top:14px;}
        .btn-cancel{padding:10px 18px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-weight:700;cursor:pointer;}
        .lf-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;}
        .lf-card{background:white;border:1.5px solid #e2e8f0;border-radius:18px;padding:20px;display:flex;flex-direction:column;gap:10px;}
        .lf-card.teslim{opacity:.8;background:#f8fafc;}
        .lfc-top{display:flex;justify-content:space-between;align-items:center;}
        .cat-icon{font-size:28px;}
        .lf-status{font-size:11px;font-weight:800;padding:4px 12px;border-radius:20px;}
        .lf-status.bekliyor{background:#fffbeb;color:#b45309;}
        .lf-status.teslim{background:#f0fdf4;color:#10b981;}
        .lf-card h4{font-size:15px;font-weight:800;color:#1e293b;}
        .lf-details{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#64748b;}
        .lf-details>div{display:flex;align-items:center;gap:5px;}
        .lf-desc{font-style:italic;color:#94a3b8;}
        .lf-owner{color:#10b981!important;font-weight:700;}
        .lfc-foot{display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid #f1f5f9;}
        .oid{font-family:monospace;font-size:11px;background:#f1f5f9;padding:3px 8px;border-radius:6px;font-weight:700;color:#64748b;}
        .del-btn{padding:7px 14px;border-radius:8px;border:none;background:#3b82f6;color:white;font-size:11px;font-weight:700;cursor:pointer;}
        .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.75);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:1000;}
        .del-modal{background:white;border-radius:20px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.4);width:380px;}
        .modal-head{padding:18px 22px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;}
        .modal-head h3{font-size:16px;font-weight:800;color:#1e293b;}
        .modal-head button{background:transparent;border:none;color:#94a3b8;cursor:pointer;}
        .modal-foot{display:flex;justify-content:flex-end;gap:10px;}
      `}</style>
    </div>
  );
};

export default LostAndFound;
