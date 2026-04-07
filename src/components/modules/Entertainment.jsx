import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, Camera, Users, Star, X,
  Calendar, Clock, MapPin, Smile, 
  ChevronRight, Plus, PartyPopper, Heart, Tag, Trash2, Check, Eye
} from 'lucide-react';

const CATEGORIES = ['Spor','Eğlence','Çocuk','Show','Müzik','Kültür','Spa'];
const LOCATIONS = ['Sahil Bahçesi','Kids Club','Ana Havuz','Plaj Sahası','Amfi Tiyatro','Lobü Sahne','Fitness Salonu','Teras','Restoran'];

const Entertainment = () => {
  const { addNotification } = useHotel();
  const [activeDay, setActiveDay] = useState('Bugün');
  const [showForm, setShowForm] = useState(false);
  const [showShowForm, setShowShowForm] = useState(false);

  const [activities, setActivities] = useState([
    { id: 'ACT-001', name: 'Sabah Yogası', time: '09:00', endTime: '10:00', loc: 'Sahil Bahçesi', cat: 'Spor', status: 'aktif', participants: 12, day: 'Bugün' },
    { id: 'ACT-002', name: 'Çocuk Kulübü: Boyama', time: '10:30', endTime: '12:00', loc: 'Kids Club', cat: 'Çocuk', status: 'aktif', participants: 8, day: 'Bugün' },
    { id: 'ACT-003', name: 'Su Topu Turnuvası', time: '14:30', endTime: '15:30', loc: 'Ana Havuz', cat: 'Eğlence', status: 'aktif', participants: 24, day: 'Bugün' },
    { id: 'ACT-004', name: 'Voleybol Maçı', time: '16:00', endTime: '17:00', loc: 'Plaj Sahası', cat: 'Spor', status: 'bekliyor', participants: 0, day: 'Bugün' },
    { id: 'ACT-005', name: 'Sihirbazlık Gösterisi', time: '21:00', endTime: '22:00', loc: 'Amfi Tiyatro', cat: 'Show', status: 'bekliyor', participants: 0, day: 'Bugün' },
    { id: 'ACT-006', name: 'Aqua Aerobik', time: '10:00', endTime: '10:45', loc: 'Ana Havuz', cat: 'Spor', status: 'bekliyor', participants: 0, day: 'Yarın' },
    { id: 'ACT-007', name: 'Mini Disco', time: '20:00', endTime: '21:00', loc: 'Kids Club', cat: 'Çocuk', status: 'bekliyor', participants: 0, day: 'Yarın' },
  ]);

  const [shows, setShows] = useState([
    { id: 'SH-001', title: 'Türk Gecesi', date: 'Yarın', icon: '💃', time: '21:00' },
    { id: 'SH-002', title: 'Canlı Müzik (Jazz)', date: 'Cuma', icon: '🎷', time: '21:00' },
    { id: 'SH-003', title: 'Açık Hava Sineması', date: 'Cumartesi', icon: '📽️', time: '21:30' },
  ]);

  const [form, setForm] = useState({ name:'', time:'', endTime:'', loc:LOCATIONS[0], cat:CATEGORIES[0], day:'Bugün' });
  const [showFormData, setShowFormData] = useState({ title:'', date:'', icon:'🎪', time:'21:00' });
  const idCounters = React.useRef({ act:7, show:3 });

  const submitActivity = (e) => {
    e.preventDefault();
    idCounters.current.act++;
    const id = `ACT-${String(idCounters.current.act).padStart(3,'0')}`;
    setActivities(p => [...p, { ...form, id, status:'bekliyor', participants:0 }]);
    addNotification({ type:'info', msg:`Yeni aktivite eklendi: ${form.name}` });
    setForm({ name:'', time:'', endTime:'', loc:LOCATIONS[0], cat:CATEGORIES[0], day:'Bugün' });
    setShowForm(false);
  };

  const submitShow = (e) => {
    e.preventDefault();
    idCounters.current.show++;
    const id = `SH-${String(idCounters.current.show).padStart(3,'0')}`;
    setShows(p => [...p, { ...showFormData, id }]);
    addNotification({ type:'success', msg:`Yeni şov eklendi: ${showFormData.title}` });
    setShowFormData({ title:'', date:'', icon:'🎪', time:'21:00' });
    setShowShowForm(false);
  };

  const startActivity = (id) => {
    setActivities(p => p.map(a => a.id === id ? { ...a, status: 'aktif' } : a));
    addNotification({ type:'success', msg:'Aktivite başlatıldı' });
  };

  const completeActivity = (id) => {
    setActivities(p => p.map(a => a.id === id ? { ...a, status: 'tamamlandı' } : a));
    addNotification({ type:'info', msg:'Aktivite tamamlandı' });
  };

  const addParticipant = (id) => {
    setActivities(p => p.map(a => a.id === id ? { ...a, participants: a.participants + 1 } : a));
  };

  const deleteActivity = (id) => { setActivities(p => p.filter(a => a.id !== id)); };
  const deleteShow = (id) => { setShows(p => p.filter(s => s.id !== id)); };

  const filteredActivities = activities.filter(a => activeDay === 'Tümü' || a.day === activeDay);
  const activeCount = filteredActivities.filter(a => a.status === 'aktif').length;
  const totalParticipants = filteredActivities.reduce((s,a) => s + a.participants, 0);

  return (
    <div className="ent-page">
      <div className="ent-head">
        <div>
          <h2><PartyPopper size={20}/> Eğlence & Aktivite Yönetimi</h2>
          <span>Günlük animasyon programı, özel şovlar ve misafir katılım takibi</span>
        </div>
        <button className="btn-primary" onClick={()=>setShowForm(true)}><Plus size={14}/> Yeni Etkinlik Ekle</button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form className="act-form" onSubmit={submitActivity} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div className="af-head"><h3>Yeni Aktivite</h3><button type="button" onClick={()=>setShowForm(false)}><X size={18}/></button></div>
            <div className="af-grid">
              <input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Aktivite adı *" required/>
              <input type="time" value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))} required/>
              <input type="time" value={form.endTime} onChange={e=>setForm(p=>({...p,endTime:e.target.value}))} required/>
              <select value={form.loc} onChange={e=>setForm(p=>({...p,loc:e.target.value}))}>{LOCATIONS.map(l=><option key={l}>{l}</option>)}</select>
              <select value={form.cat} onChange={e=>setForm(p=>({...p,cat:e.target.value}))}>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select>
              <select value={form.day} onChange={e=>setForm(p=>({...p,day:e.target.value}))}><option>Bugün</option><option>Yarın</option></select>
            </div>
            <div className="af-foot"><button type="submit" className="btn-primary">Ekle</button></div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="ent-grid">
        {/* Sol: Program Listesi */}
        <div className="program-section">
          <div className="ps-head">
            <div className="day-tabs">
              {['Bugün', 'Yarın', 'Tümü'].map(d => (
                <button key={d} className={`d-tab ${activeDay === d ? 'active' : ''}`} onClick={() => setActiveDay(d)}>{d}</button>
              ))}
            </div>
            <div className="ps-stats">
              <strong>{activeCount}</strong> Aktif · <strong>{totalParticipants}</strong> Katılımcı
            </div>
          </div>

          <div className="activity-list">
            {filteredActivities.length === 0 && <div style={{textAlign:'center',padding:30,color:'#94a3b8',fontSize:13}}>Bu gün için aktivite yok</div>}
            {filteredActivities.map((a, i) => (
              <motion.div 
                key={a.id} 
                className={`act-card ${a.status}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="act-time"><Clock size={14}/> {a.time} - {a.endTime}</div>
                <div className="act-info">
                  <strong>{a.name}</strong>
                  <span><MapPin size={11}/> {a.loc} · <Tag size={11}/> {a.cat}</span>
                </div>
                <div className="act-right">
                  <div className="act-users" onClick={()=>addParticipant(a.id)} style={{cursor:'pointer'}} title="Katılımcı ekle"><Users size={12}/> {a.participants} Katılımcı</div>
                  <div className="act-btns">
                    {a.status === 'bekliyor' && <button className="ab green" onClick={()=>startActivity(a.id)}>Başlat</button>}
                    {a.status === 'aktif' && <button className="ab purple" onClick={()=>completeActivity(a.id)}>Bitir</button>}
                    {a.status === 'tamamlandı' && <span className="ab done">✓</span>}
                    <button className="ab del" onClick={()=>deleteActivity(a.id)}><Trash2 size={12}/></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sağ: Sidebar */}
        <div className="ent-sidebar">
          <div className="featured-shows">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <h3 style={{marginBottom:0}}>Haftalık Özel Şovlar</h3>
              <button className="add-show-btn" onClick={()=>setShowShowForm(true)}><Plus size={14}/></button>
            </div>

            <AnimatePresence>
              {showShowForm && (
                <motion.form className="show-form" onSubmit={submitShow} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  <input value={showFormData.title} onChange={e=>setShowFormData(p=>({...p,title:e.target.value}))} placeholder="Şov adı *" required/>
                  <input value={showFormData.date} onChange={e=>setShowFormData(p=>({...p,date:e.target.value}))} placeholder="Gün (Cuma, Pazar)" required/>
                  <select value={showFormData.icon} onChange={e=>setShowFormData(p=>({...p,icon:e.target.value}))}>
                    {['🎪','💃','🎷','📽️','🎸','🎭','🎤','🎵'].map(i=><option key={i}>{i}</option>)}
                  </select>
                  <button type="submit" className="btn-primary sm">Ekle</button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="show-list">
              {shows.map(s => (
                <div key={s.id} className="show-card">
                  <div className="sc-icon">{s.icon}</div>
                  <div className="sc-info">
                    <strong>{s.title}</strong>
                    <span>{s.date} @ {s.time}</span>
                  </div>
                  <button className="sc-rsvp" onClick={()=>{addNotification({type:'success',msg:`Şov duyuruldu: ${s.title}`});}}>Duyur</button>
                  <button className="sc-del" onClick={()=>deleteShow(s.id)}><X size={12}/></button>
                </div>
              ))}
            </div>
          </div>

          <div className="kids-club-box">
            <div className="kc-head">
              <Smile size={24} color="#8b5cf6"/>
              <h3>Kids Club Durumu</h3>
            </div>
            <div className="kc-stats">
              <div className="ks-i"><span>Aktif Çocuk</span><strong>{activities.filter(a=>a.cat==='Çocuk'&&a.status==='aktif').reduce((s,a)=>s+a.participants,0)}</strong></div>
              <div className="ks-i"><span>Aktivite</span><strong>{activities.filter(a=>a.cat==='Çocuk').length}</strong></div>
            </div>
          </div>

          <div className="staff-box">
            <h4>Ekip Durumu (Animasyon)</h4>
            <div className="st-list">
              {[
                { name: 'Ricardo', role: 'DJ / Teknik' },
                { name: 'Elena', role: 'Yoga Eğitmeni' },
                { name: 'Mert', role: 'Çocuk Şefi' },
              ].map(st => (
                <div key={st.name} className="st-row">
                  <div className="st-av">{st.name[0]}</div>
                  <div className="st-info"><strong>{st.name}</strong><span>{st.role}</span></div>
                  <div className="st-dot" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ent-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .ent-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .ent-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .ent-head span { font-size: 13px; color: #94a3b8; }
        
        .btn-primary { padding: 10px 18px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .btn-primary.sm { padding: 8px 12px; font-size: 11px; }

        /* Activity Form */
        .act-form { background: white; border-radius: 18px; border: 1.5px solid #e2e8f0; padding: 20px; }
        .af-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .af-head h3 { font-size: 15px; font-weight: 800; color: #1e293b; }
        .af-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .af-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        .af-grid input, .af-grid select { padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; outline: none; }
        .af-grid input:focus, .af-grid select:focus { border-color: #3b82f6; }
        .af-foot { display: flex; justify-content: flex-end; margin-top: 12px; }

        .ent-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        
        .program-section { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .ps-head { display: flex; justify-content: space-between; align-items: center; }
        .day-tabs { display: flex; background: #f1f5f9; padding: 4px; border-radius: 10px; gap: 4px; }
        .d-tab { padding: 6px 14px; border-radius: 8px; border: none; font-size: 11px; font-weight: 700; color: #64748b; cursor: pointer; }
        .d-tab.active { background: white; color: #1e293b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .ps-stats { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .ps-stats strong { color: #3b82f6; }

        .activity-list { display: flex; flex-direction: column; gap: 12px; }
        .act-card { display: flex; align-items: center; gap: 16px; padding: 16px; background: #f8fafc; border-radius: 18px; border: 1.5px solid #f1f5f9; transition: 0.2s; }
        .act-card:hover { border-color: #3b82f6; background: white; }
        .act-card.aktif { border-left: 4px solid #10b981; }
        .act-card.tamamlandı { opacity: 0.6; }
        
        .act-time { width: 110px; font-size: 12px; font-weight: 800; color: #3b82f6; display: flex; align-items: center; gap: 6px; white-space: nowrap; }
        .act-info { flex: 1; }
        .act-info strong { display: block; font-size: 14px; color: #1e293b; }
        .act-info span { font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 4px; margin-top: 2px; }
        
        .act-right { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
        .act-users { font-size: 10px; font-weight: 700; color: #64748b; display: flex; align-items: center; gap: 4px; }
        .act-btns { display: flex; gap: 5px; }
        .ab { padding: 4px 10px; border-radius: 6px; border: none; font-size: 10px; font-weight: 700; cursor: pointer; }
        .ab.green { background: #f0fdf4; color: #10b981; }
        .ab.purple { background: #f5f3ff; color: #8b5cf6; }
        .ab.done { background: #f1f5f9; color: #64748b; cursor: default; }
        .ab.del { background: transparent; color: #cbd5e1; padding: 4px; }
        .ab.del:hover { color: #ef4444; }

        .ent-sidebar { display: flex; flex-direction: column; gap: 20px; }
        .featured-shows { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; }
        .featured-shows h3 { font-size: 14px; font-weight: 800; color: #1e293b; }
        .add-show-btn { width: 28px; height: 28px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: white; color: #3b82f6; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        
        .show-form { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
        .show-form input, .show-form select { padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 12px; outline: none; }
        
        .show-list { display: flex; flex-direction: column; gap: 12px; }
        .show-card { display: flex; align-items: center; gap: 12px; padding: 12px; background: #f8fafc; border-radius: 12px; }
        .sc-icon { font-size: 20px; width: 36px; height: 36px; background: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .sc-info { flex: 1; }
        .sc-info strong { display: block; font-size: 12px; color: #1e293b; }
        .sc-info span { font-size: 10px; color: #94a3b8; }
        .sc-rsvp { padding: 4px 10px; background: #1e293b; color: white; border-radius: 6px; font-size: 9px; font-weight: 700; border: none; cursor: pointer; }
        .sc-del { background: none; border: none; color: #cbd5e1; cursor: pointer; }
        .sc-del:hover { color: #ef4444; }

        .kids-club-box { background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 20px; padding: 20px; }
        .kc-head { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .kc-head h3 { font-size: 14px; font-weight: 800; color: #8b5cf6; }
        .kc-stats { display: flex; gap: 20px; }
        .ks-i span { display: block; font-size: 10px; color: #7c3aed; font-weight: 600; }
        .ks-i strong { font-size: 18px; color: #5b21b6; }

        .staff-box h4 { font-size: 12px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 10px; padding-left: 8px; }
        .st-list { display: flex; flex-direction: column; gap: 8px; }
        .st-row { background: white; padding: 10px; border-radius: 12px; border: 1px solid #f1f5f9; display: flex; align-items: center; gap: 10px; }
        .st-av { width: 32px; height: 32px; background: #f8fafc; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; color: #3b82f6; }
        .st-info { flex: 1; }
        .st-info strong { display: block; font-size: 12px; color: #1e293b; }
        .st-info span { font-size: 10px; color: #94a3b8; }
        .st-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; }
      `}</style>
    </div>
  );
};

export default Entertainment;
