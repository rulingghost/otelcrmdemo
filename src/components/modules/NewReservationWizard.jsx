import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, User, Calendar, Bed, CreditCard, BookOpen, X } from 'lucide-react';

const STEPS = ['Misafir Bilgileri', 'Oda & Tarih', 'Fiyatlandırma', 'Onay'];

const BOARDS = [
  { code:'BB', label:'Oda Kahvaltı', desc:'Sadece kahvaltı dahil' },
  { code:'HB', label:'Yarım Pansiyon', desc:'Kahvaltı + akşam yemeği' },
  { code:'FB', label:'Tam Pansiyon', desc:'3 öğün dahil' },
  { code:'AI', label:'Her Şey Dahil', desc:'Sınırsız yiyecek-içecek' },
];

const CHANNELS = ['Direkt','Booking.com','Expedia','HotelRunner','TUI','Acente'];

const NewReservationWizard = () => {
  const { rooms, addReservation, guests } = useHotel();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    guest:'', phone:'', email:'', nationality:'TR', pax:2,
    room:'', checkIn:'2026-03-14', checkOut:'2026-03-17', board:'HB',
    channel:'Direkt', paid:0, payMethod:'Kredi Kartı', notes:''
  });

  const sel = (k,v) => setForm(p=>({...p,[k]:v}));
  const selRoom = rooms.find(r=>r.id===form.room);
  const nights = form.checkIn&&form.checkOut ? Math.max(1,Math.round((new Date(form.checkOut)-new Date(form.checkIn))/(86400000))) : 0;
  const total = selRoom && nights ? selRoom.rate * nights : 0;
  const freeRooms = rooms.filter(r=>r.status==='boş'&&r.clean==='temiz');

  const canNext = [
    form.guest.length > 1,
    form.room && form.checkIn && form.checkOut && nights > 0,
    form.board && form.channel,
    true
  ][step];

  const handleSubmit = () => {
    addReservation({
      guest: form.guest, room: form.room, type: selRoom?.type,
      channel: form.channel, checkIn: form.checkIn, checkOut: form.checkOut,
      nights, pax: Number(form.pax), status: 'gelecek',
      total, paid: Number(form.paid), balance: total - Number(form.paid),
      board: form.board, notes: form.notes,
    });
    setDone(true);
  };

  const reset = () => { setDone(false); setStep(0); setForm({ guest:'',phone:'',email:'',nationality:'TR',pax:2,room:'',checkIn:'2026-03-14',checkOut:'2026-03-17',board:'HB',channel:'Direkt',paid:0,payMethod:'Kredi Kartı',notes:'' }); };

  if (done) return (
    <div className="wizard-done">
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',bounce:.5}}>
        <CheckCircle size={80} color="#10b981"/>
      </motion.div>
      <h2>Rezervasyon Oluşturuldu!</h2>
      <p>{form.guest} — {nights} gece · Oda {form.room} · ₺{total.toLocaleString()}</p>
      <div className="done-actions">
        <button className="btn-outline" onClick={reset}><BookOpen size={16}/> Yeni Rezervasyon</button>
      </div>
    </div>
  );

  return (
    <div className="wizard-page">
      <div className="wizard-header">
        <h2>Yeni Rezervasyon Sihirbazı</h2>
        <p>Adım {step+1}/{STEPS.length} — {STEPS[step]}</p>
      </div>

      {/* Progress */}
      <div className="wizard-progress">
        {STEPS.map((s,i) => (
          <React.Fragment key={i}>
            <div className={`wp-step ${i<step?'done':''} ${i===step?'active':''}`}>
              <div className="wp-dot">{i<step?<CheckCircle size={14}/>:i+1}</div>
              <span>{s}</span>
            </div>
            {i<STEPS.length-1 && <div className={`wp-line ${i<step?'done':''}`}/>}
          </React.Fragment>
        ))}
      </div>

      {/* Body */}
      <div className="wizard-body">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} className="wizard-panel">

            {/* Step 0: Guest */}
            {step===0 && (
              <div className="wstep">
                <h3><User size={18}/> Misafir Bilgileri</h3>
                <div className="form-grid">
                  <div className="fg full"><label>Ad Soyad *</label>
                    <input value={form.guest} onChange={e=>sel('guest',e.target.value)} placeholder="Misafir adı soyadı"/>
                    {guests.length>0 && form.guest.length>1 && (
                      <div className="guest-suggest">
                        {guests.filter(g=>g.name.toLowerCase().includes(form.guest.toLowerCase())).slice(0,4).map(g=>(
                          <button key={g.id} className="sug-item" onClick={()=>sel('guest',g.name)}>
                            <strong>{g.name}</strong><span>{g.loyalty} · {g.visits} konaklama</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="fg"><label>Telefon</label><input value={form.phone} onChange={e=>sel('phone',e.target.value)} placeholder="+90 5xx xxx xx xx"/></div>
                  <div className="fg"><label>E-posta</label><input value={form.email} onChange={e=>sel('email',e.target.value)} placeholder="email@example.com"/></div>
                  <div className="fg"><label>Uyruk</label>
                    <select value={form.nationality} onChange={e=>sel('nationality',e.target.value)}>
                      {['TR','DE','US','UK','FR','RU','AE','NL','BE'].map(c=><option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="fg"><label>Kişi Sayısı</label><input type="number" value={form.pax} onChange={e=>sel('pax',e.target.value)} min={1} max={8}/></div>
                  <div className="fg full"><label>Notlar</label><textarea value={form.notes} onChange={e=>sel('notes',e.target.value)} placeholder="VIP, özel istek, vb." rows={2}/></div>
                </div>
              </div>
            )}

            {/* Step 1: Room & Date */}
            {step===1 && (
              <div className="wstep">
                <h3><Bed size={18}/> Oda & Tarih Seçimi</h3>
                <div className="date-grid">
                  <div className="fg"><label>Giriş Tarihi *</label><input type="date" value={form.checkIn} onChange={e=>sel('checkIn',e.target.value)}/></div>
                  <div className="fg"><label>Çıkış Tarihi *</label><input type="date" value={form.checkOut} onChange={e=>sel('checkOut',e.target.value)}/></div>
                  {nights>0 && <div className="nights-badge">{nights} Gece</div>}
                </div>
                <label className="sec-label">Müsait Odalar ({freeRooms.length} oda)</label>
                <div className="room-grid">
                  {freeRooms.map(r=>(
                    <button key={r.id} className={`room-card ${form.room===r.id?'active':''}`} onClick={()=>sel('room',r.id)}>
                      <div className="rc-num">{r.id}</div>
                      <div className="rc-type">{r.type}</div>
                      <div className="rc-rate">₺{r.rate}<small>/gece</small></div>
                      {nights>0 && <div className="rc-total">₺{(r.rate*nights).toLocaleString()} toplam</div>}
                      {form.room===r.id && <div className="rc-check"><CheckCircle size={16} color="#10b981"/></div>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Pricing */}
            {step===2 && (
              <div className="wstep">
                <h3><CreditCard size={18}/> Fiyatlandırma & Kanal</h3>
                <div className="form-grid">
                  <div className="fg full">
                    <label>Pansiyon Tipi</label>
                    <div className="board-grid">
                      {BOARDS.map(b=>(
                        <button key={b.code} className={`board-btn ${form.board===b.code?'active':''}`} onClick={()=>sel('board',b.code)}>
                          <strong>{b.code}</strong><span>{b.label}</span><small>{b.desc}</small>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="fg full">
                    <label>Rezervasyon Kanalı</label>
                    <div className="channel-grid">
                      {CHANNELS.map(c=>(
                        <button key={c} className={`channel-btn ${form.channel===c?'active':''}`} onClick={()=>sel('channel',c)}>{c}</button>
                      ))}
                    </div>
                  </div>
                  <div className="fg"><label>Ön Ödeme (₺)</label>
                    <input type="number" value={form.paid} onChange={e=>sel('paid',e.target.value)} min={0} max={total}/>
                  </div>
                  <div className="fg"><label>Ödeme Yöntemi</label>
                    <select value={form.payMethod} onChange={e=>sel('payMethod',e.target.value)}>
                      {['Nakit','Kredi Kartı','EFT/Havale','Açık Hesap'].map(m=><option key={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step===3 && (
              <div className="wstep">
                <h3><CheckCircle size={18}/> Rezervasyon Özeti</h3>
                <div className="confirm-grid">
                  <div className="cg-row"><span>Misafir</span><strong>{form.guest}</strong></div>
                  <div className="cg-row"><span>Oda</span><strong>{form.room} — {selRoom?.type}</strong></div>
                  <div className="cg-row"><span>Giriş / Çıkış</span><strong>{form.checkIn} → {form.checkOut} ({nights} gece)</strong></div>
                  <div className="cg-row"><span>Kişi Sayısı</span><strong>{form.pax}</strong></div>
                  <div className="cg-row"><span>Pansiyon</span><strong>{BOARDS.find(b=>b.code===form.board)?.label}</strong></div>
                  <div className="cg-row"><span>Kanal</span><strong>{form.channel}</strong></div>
                  <div className="cg-row price"><span>Toplam Tutar</span><strong>₺{total.toLocaleString()}</strong></div>
                  <div className="cg-row"><span>Ön Ödeme</span><strong className="green">₺{Number(form.paid).toLocaleString()}</strong></div>
                  <div className="cg-row"><span>Kalan Bakiye</span><strong className="red">₺{Math.max(0,total-Number(form.paid)).toLocaleString()}</strong></div>
                  {form.notes && <div className="cg-row"><span>Notlar</span><strong>{form.notes}</strong></div>}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="wizard-nav">
        <button className="btn-back" onClick={()=>setStep(s=>s-1)} disabled={step===0}>← Geri</button>
        <div className="dots">{STEPS.map((_,i)=><div key={i} className={`dot ${i===step?'active':''}`}/>)}</div>
        {step < STEPS.length-1
          ? <button className="btn-next-w" onClick={()=>setStep(s=>s+1)} disabled={!canNext}>İleri <ArrowRight size={15}/></button>
          : <button className="btn-finish" onClick={handleSubmit}>✓ Rezervasyonu Oluştur</button>
        }
      </div>

      <style>{`
        .wizard-page { max-width:720px; margin:0 auto; padding:30px; display:flex; flex-direction:column; gap:24px; }
        .wizard-header h2 { font-size:24px; font-weight:800; color:#1e293b; }
        .wizard-header p { font-size:14px; color:#94a3b8; font-weight:600; }
        .wizard-done { padding:60px; display:flex; flex-direction:column; align-items:center; gap:20px; text-align:center; }
        .wizard-done h2 { font-size:28px; font-weight:900; color:#1e293b; }
        .wizard-done p { font-size:16px; color:#64748b; }
        .done-actions { display:flex; gap:12px; }
        .btn-outline { padding:12px 24px; border-radius:12px; border:1.5px solid #e2e8f0; background:white; font-size:14px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; }

        .wizard-progress { display:flex; align-items:center; background:white; border-radius:16px; border:1px solid #e2e8f0; padding:20px 24px; }
        .wp-step { display:flex; align-items:center; gap:8px; }
        .wp-dot { width:28px; height:28px; border-radius:50%; background:#e2e8f0; color:#94a3b8; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:900; flex-shrink:0; }
        .wp-step.active .wp-dot { background:#3b82f6; color:white; }
        .wp-step.done .wp-dot { background:#10b981; color:white; }
        .wp-step span { font-size:12px; font-weight:700; color:#94a3b8; white-space:nowrap; }
        .wp-step.active span { color:#3b82f6; }
        .wp-step.done span { color:#10b981; }
        .wp-line { flex:1; height:2px; background:#e2e8f0; margin:0 10px; }
        .wp-line.done { background:#10b981; }

        .wizard-body { background:white; border-radius:20px; border:1px solid #e2e8f0; overflow:hidden; }
        .wizard-panel { padding:28px; }
        .wstep h3 { font-size:17px; font-weight:800; color:#1e293b; margin-bottom:20px; display:flex; align-items:center; gap:8px; }

        .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .fg { display:flex; flex-direction:column; gap:6px; }
        .fg.full { grid-column:1/-1; }
        .fg label { font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; }
        .fg input, .fg select, .fg textarea { padding:11px 14px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:13px; outline:none; }
        .fg textarea { resize:none; }
        .fg input:focus, .fg select:focus { border-color:#3b82f6; }
        .guest-suggest { background:white; border:1.5px solid #e2e8f0; border-radius:10px; overflow:hidden; margin-top:4px; }
        .sug-item { width:100%; display:flex; flex-direction:column; padding:10px 14px; background:white; border:none; cursor:pointer; text-align:left; border-bottom:1px solid #f1f5f9; }
        .sug-item:hover { background:#f8fafc; }
        .sug-item strong { font-size:13px; color:#1e293b; }
        .sug-item span { font-size:11px; color:#94a3b8; }

        .date-grid { display:grid; grid-template-columns:1fr 1fr auto; gap:14px; align-items:end; margin-bottom:20px; }
        .nights-badge { padding:11px 18px; background:#eff6ff; color:#3b82f6; border-radius:10px; font-weight:800; font-size:14px; white-space:nowrap; }
        .sec-label { font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; display:block; margin-bottom:12px; }
        .room-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
        .room-card { border:1.5px solid #e2e8f0; background:white; border-radius:16px; padding:16px 10px; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:4px; position:relative; transition:0.2s; }
        .room-card:hover { border-color:#3b82f6; background:#eff6ff; }
        .room-card.active { border-color:#3b82f6; background:#eff6ff; }
        .rc-num { font-size:20px; font-weight:900; color:#1e293b; }
        .rc-type { font-size:10px; color:#94a3b8; font-weight:700; text-transform:uppercase; }
        .rc-rate { font-size:14px; font-weight:800; color:#3b82f6; }
        .rc-rate small { font-size:10px; font-weight:600; color:#94a3b8; }
        .rc-total { font-size:11px; color:#10b981; font-weight:700; }
        .rc-check { position:absolute; top:6px; right:6px; }

        .board-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
        .board-btn { border:1.5px solid #e2e8f0; background:white; border-radius:12px; padding:14px 10px; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:2px; transition:0.2s; }
        .board-btn:hover, .board-btn.active { border-color:#3b82f6; background:#eff6ff; }
        .board-btn strong { font-size:16px; color:#1e293b; font-weight:900; }
        .board-btn span { font-size:11px; color:#3b82f6; font-weight:700; }
        .board-btn small { font-size:10px; color:#94a3b8; }
        .channel-grid { display:flex; flex-wrap:wrap; gap:8px; }
        .channel-btn { padding:9px 16px; border-radius:10px; border:1.5px solid #e2e8f0; background:white; font-size:12px; font-weight:700; cursor:pointer; }
        .channel-btn.active { background:#1e293b; color:white; border-color:#1e293b; }

        .confirm-grid { background:#f8fafc; border-radius:16px; padding:20px; display:flex; flex-direction:column; gap:0; }
        .cg-row { display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #e2e8f0; font-size:13px; }
        .cg-row span { color:#64748b; }
        .cg-row strong { color:#1e293b; }
        .cg-row:last-child { border-bottom:none; }
        .cg-row.price { background:#eff6ff; margin:-1px -0px; padding:14px 0; }
        .cg-row.price span, .cg-row.price strong { font-weight:900; font-size:16px; color:#3b82f6; }
        .green { color:#10b981 !important; }
        .red { color:#ef4444 !important; }

        .wizard-nav { background:white; border-radius:16px; border:1px solid #e2e8f0; padding:16px 24px; display:flex; align-items:center; justify-content:space-between; }
        .btn-back { padding:12px 20px; border-radius:12px; border:1.5px solid #e2e8f0; background:white; font-size:14px; font-weight:700; cursor:pointer; color:#64748b; }
        .btn-back:disabled { opacity:.3; cursor:not-allowed; }
        .dots { display:flex; gap:8px; }
        .dot { width:8px; height:8px; border-radius:50%; background:#e2e8f0; }
        .dot.active { background:#3b82f6; width:24px; border-radius:10px; }
        .btn-next-w { padding:12px 24px; border-radius:12px; border:none; background:#3b82f6; color:white; font-size:14px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; }
        .btn-next-w:disabled { opacity:.4; cursor:not-allowed; }
        .btn-finish { padding:12px 24px; border-radius:12px; border:none; background:#10b981; color:white; font-size:14px; font-weight:800; cursor:pointer; }
      `}</style>
    </div>
  );
};

export default NewReservationWizard;
