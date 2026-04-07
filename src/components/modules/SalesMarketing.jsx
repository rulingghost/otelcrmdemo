import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart2, Target, Users, Megaphone, X,
  Search, Plus, MapPin, Mail, Phone, 
  ChevronRight, Calendar, Tag, Star, ArrowUpRight, Trash2, Eye,
  TrendingUp
} from 'lucide-react';

const STAGES = {
  aday:     { label: 'Aday', color: '#94a3b8', bg: '#f1f5f9' },
  görüşme:  { label: 'Görüşme', color: '#3b82f6', bg: '#eff6ff' },
  teklif:   { label: 'Teklif Verildi', color: '#f59e0b', bg: '#fffbeb' },
  sözleşme: { label: 'Sözleşme', color: '#10b981', bg: '#f0fdf4' },
  kaybedildi:{ label: 'Kaybedildi', color: '#ef4444', bg: '#fef2f2' },
};

const SalesMarketing = () => {
  const { addNotification } = useHotel();
  const [showForm, setShowForm] = useState(false);
  const [showCampForm, setShowCampForm] = useState(false);
  const [detail, setDetail] = useState(null);

  const [leads, setLeads] = useState([
    { id:'L-001', name: 'Teknoloji A.Ş.', contact: 'Ali Vural', phone: '+90 532 111 0001', value: 85000, probability: 80, stage: 'teklif', date: '2026-03-14', notes: '200 kişilik seminer talebi' },
    { id:'L-002', name: 'Global Turizm', contact: 'Zeynep Gök', phone: '+90 533 222 0002', value: 142000, probability: 40, stage: 'görüşme', date: '2026-03-12', notes: 'Yaz sezonu grubu' },
    { id:'L-003', name: 'Gıda Sanayi Ltd.', contact: 'Mehmet Öz', phone: '+90 534 333 0003', value: 22500, probability: 95, stage: 'sözleşme', date: '2026-03-15', notes: 'Çalışan motivasyon etkinliği' },
    { id:'L-004', name: 'Eğitim Koçu', contact: 'Merve Hanım', phone: '+90 535 444 0004', value: 12000, probability: 10, stage: 'aday', date: '2026-03-10', notes: 'Eğitim kampı düşünüyor' },
  ]);

  const [campaigns, setCampaigns] = useState([
    { id:'C-001', title: 'Bayram Özel %20', target: 'Bireysel', color: '#8b5cf6', status: 'aktif', reservations: 124 },
    { id:'C-002', title: 'Şirket İndirimi 2026', target: 'Kurumsal', color: '#3b82f6', status: 'aktif', reservations: 87 },
    { id:'C-003', title: 'Erken Rezervasyon', target: 'Global', color: '#10b981', status: 'aktif', reservations: 203 },
  ]);

  const [form, setForm] = useState({ name:'', contact:'', phone:'', value:'', probability:'', stage:'aday', notes:'' });
  const [campForm, setCampForm] = useState({ title:'', target:'Bireysel', color:'#3b82f6' });
  const idCounters = React.useRef({ lead:4, camp:3 });

  const submitLead = (e) => {
    e.preventDefault();
    idCounters.current.lead++;
    const id = `L-${String(idCounters.current.lead).padStart(3,'0')}`;
    setLeads(p => [{ ...form, id, value:Number(form.value), probability:Number(form.probability), date: new Date().toISOString().slice(0,10) }, ...p]);
    addNotification({ type:'info', msg:`Yeni satış fırsatı: ${form.name} — ₺${Number(form.value).toLocaleString()}` });
    setForm({ name:'', contact:'', phone:'', value:'', probability:'', stage:'aday', notes:'' });
    setShowForm(false);
  };

  const submitCampaign = (e) => {
    e.preventDefault();
    idCounters.current.camp++;
    const id = `C-${String(idCounters.current.camp).padStart(3,'0')}`;
    setCampaigns(p => [...p, { ...campForm, id, status:'aktif', reservations:0 }]);
    addNotification({ type:'success', msg:`Yeni kampanya oluşturuldu: ${campForm.title}` });
    setCampForm({ title:'', target:'Bireysel', color:'#3b82f6' });
    setShowCampForm(false);
  };

  const updateLeadStage = (id, stage) => {
    setLeads(p => p.map(l => l.id === id ? { ...l, stage } : l));
    addNotification({ type: stage==='sözleşme'?'success':'info', msg:`Fırsat durumu güncellendi → ${STAGES[stage]?.label}` });
  };

  const deleteLead = (id) => { setLeads(p => p.filter(l => l.id !== id)); };
  const deleteCampaign = (id) => { setCampaigns(p => p.filter(c => c.id !== id)); };

  const totalPipeline = leads.filter(l=>l.stage!=='kaybedildi').reduce((s,l)=>s+l.value,0);

  return (
    <div className="sm-page">
      <div className="sm-head">
        <div>
          <h2><Megaphone size={20}/> Satış & Pazarlama Yönetimi</h2>
          <span>Kurumsal satış süreçleri, kampanya takibi ve lead yönetimi</span>
        </div>
        <button className="btn-primary" onClick={()=>setShowForm(true)}><Plus size={15}/> Yeni Satış Fırsatı</button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form className="lead-form" onSubmit={submitLead} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div className="lf-head"><h3>Yeni Satış Fırsatı</h3><button type="button" onClick={()=>setShowForm(false)}><X size={18}/></button></div>
            <div className="lf-grid">
              <div className="lf"><label>Firma Adı *</label><input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Şirket adı" required/></div>
              <div className="lf"><label>Yetkili Kişi *</label><input value={form.contact} onChange={e=>setForm(p=>({...p,contact:e.target.value}))} placeholder="Ad Soyad" required/></div>
              <div className="lf"><label>Telefon</label><input value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} placeholder="+90 5xx..."/></div>
              <div className="lf"><label>Tahmini Değer (₺) *</label><input type="number" value={form.value} onChange={e=>setForm(p=>({...p,value:e.target.value}))} required/></div>
              <div className="lf"><label>Olasılık %</label><input type="number" value={form.probability} onChange={e=>setForm(p=>({...p,probability:e.target.value}))} max={100}/></div>
              <div className="lf"><label>Aşama</label><select value={form.stage} onChange={e=>setForm(p=>({...p,stage:e.target.value}))}>{Object.entries(STAGES).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}</select></div>
              <div className="lf full"><label>Notlar</label><input value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder="Detaylar..."/></div>
            </div>
            <div className="lf-foot"><button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>İptal</button><button type="submit" className="btn-primary">Fırsat Kaydet</button></div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="sm-grid">
        {/* Sol: Sales Pipeline */}
        <div className="pipeline-section">
          <div className="ps-head">
            <h3>Satış Hattı (Pipeline)</h3>
            <div className="ps-stats">
              <div className="ps-i"><strong>{leads.length}</strong> Fırsat</div>
              <div className="ps-i"><strong>₺{(totalPipeline/1000).toFixed(0)}K</strong> Hacim</div>
            </div>
          </div>
          
          <div className="lead-list">
            {leads.map((l, i) => {
              const st = STAGES[l.stage] || STAGES.aday;
              return (
                <motion.div 
                  key={l.id} 
                  className="lead-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="lc-top">
                    <div className="lc-info">
                      <strong>{l.name}</strong>
                      <span><Users size={11}/> {l.contact} {l.phone && `· ${l.phone}`}</span>
                    </div>
                    <span className="lc-value">₺{l.value.toLocaleString()}</span>
                  </div>
                  
                  <div className="lc-mid">
                    <div className="lc-stage" style={{ background: st.bg, color: st.color }}>{st.label}</div>
                    <div className="lc-prob">
                      <span>Olasılık: %{l.probability}</span>
                      <div className="prob-bar-bg"><div className="prob-bar" style={{ width: `${l.probability}%`, background: st.color }}/></div>
                    </div>
                  </div>

                  <div className="lc-foot">
                    <span><Calendar size={11}/> {l.date}</span>
                    <div className="lc-actions">
                      {l.stage === 'aday' && <button className="la blue" onClick={()=>updateLeadStage(l.id,'görüşme')}>Görüşme</button>}
                      {l.stage === 'görüşme' && <button className="la amber" onClick={()=>updateLeadStage(l.id,'teklif')}>Teklif Ver</button>}
                      {l.stage === 'teklif' && <button className="la green" onClick={()=>updateLeadStage(l.id,'sözleşme')}>Sözleşme</button>}
                      {l.stage !== 'sözleşme' && l.stage !== 'kaybedildi' && <button className="la red" onClick={()=>updateLeadStage(l.id,'kaybedildi')}>Kaybet</button>}
                      <button className="la detail" onClick={()=>setDetail(l)}><Eye size={14}/></button>
                      <button className="la del" onClick={()=>deleteLead(l.id)}><Trash2 size={14}/></button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sağ: Campaigns + Stats */}
        <div className="sm-sidebar">
          <div className="camp-card-main">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <h3 style={{marginBottom:0}}>Aktif Kampanyalar</h3>
              <button className="add-camp-btn" onClick={()=>setShowCampForm(true)}><Plus size={14}/></button>
            </div>

            <AnimatePresence>
              {showCampForm && (
                <motion.form className="camp-form" onSubmit={submitCampaign} initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}>
                  <input value={campForm.title} onChange={e=>setCampForm(p=>({...p,title:e.target.value}))} placeholder="Kampanya adı *" required/>
                  <select value={campForm.target} onChange={e=>setCampForm(p=>({...p,target:e.target.value}))}><option>Bireysel</option><option>Kurumsal</option><option>Global</option></select>
                  <button type="submit" className="btn-primary sm">Ekle</button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="cl">
              {campaigns.map(c => (
                <div key={c.id} className="ci">
                  <div className="ci-dot" style={{ background: c.color }}/>
                  <div className="ci-info">
                    <strong>{c.title}</strong>
                    <span>Hedef: {c.target}</span>
                  </div>
                  <div className="ci-stat">{c.reservations} Rez.</div>
                  <button className="ci-del" onClick={()=>deleteCampaign(c.id)}><X size={12}/></button>
                </div>
              ))}
            </div>
          </div>

          <div className="sales-stats-c">
            <div className="ssc-head">Satış Performansı</div>
            <div className="ssc-metrics">
              <div className="sscm">
                <span className="sscm-l">Dönüşüm Oranı</span>
                <div className="sscm-v">{leads.length > 0 ? ((leads.filter(l=>l.stage==='sözleşme').length/leads.length)*100).toFixed(1) : 0}% <ArrowUpRight size={12} color="#10b981"/></div>
              </div>
              <div className="sscm">
                <span className="sscm-l">Pipeline Hacmi</span>
                <div className="sscm-v">₺{(totalPipeline/1000).toFixed(0)}K</div>
              </div>
              <div className="sscm">
                <span className="sscm-l">Aktif Fırsatlar</span>
                <div className="sscm-v">{leads.filter(l=>l.stage!=='kaybedildi'&&l.stage!=='sözleşme').length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detail && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setDetail(null)}>
            <motion.div className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()}>
              <div className="mb-head"><h3>{detail.name}</h3><button onClick={()=>setDetail(null)}><X size={18}/></button></div>
              <div className="detail-grid">
                <div className="dg"><span>Yetkili</span><strong>{detail.contact}</strong></div>
                <div className="dg"><span>Telefon</span><strong>{detail.phone || '—'}</strong></div>
                <div className="dg"><span>Değer</span><strong style={{color:'#10b981'}}>₺{detail.value.toLocaleString()}</strong></div>
                <div className="dg"><span>Olasılık</span><strong>%{detail.probability}</strong></div>
                <div className="dg"><span>Aşama</span><strong style={{color:STAGES[detail.stage]?.color}}>{STAGES[detail.stage]?.label}</strong></div>
                <div className="dg"><span>Tarih</span><strong>{detail.date}</strong></div>
              </div>
              {detail.notes && <div className="detail-notes">📝 {detail.notes}</div>}
              <div className="mb-foot"><button className="btn-cancel" onClick={()=>setDetail(null)}>Kapat</button></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .sm-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .sm-head { display: flex; justify-content: space-between; align-items: center; }
        .sm-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .sm-head span { font-size: 13px; color: #94a3b8; }
        
        .btn-primary { padding: 12px 20px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 10px; }
        .btn-primary.sm { padding: 8px 14px; font-size: 12px; }
        .btn-cancel { padding: 10px 18px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; font-weight: 700; cursor: pointer; font-size: 13px; }

        /* Lead Form */
        .lead-form { background: white; border-radius: 20px; border: 1.5px solid #e2e8f0; padding: 24px; }
        .lf-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .lf-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .lf-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .lf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .lf { display: flex; flex-direction: column; gap: 6px; }
        .lf.full { grid-column: 1 / -1; }
        .lf label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
        .lf input, .lf select { padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; outline: none; }
        .lf input:focus, .lf select:focus { border-color: #3b82f6; }
        .lf-foot { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }

        .sm-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        
        .pipeline-section { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .ps-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .ps-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .ps-stats { display: flex; gap: 12px; }
        .ps-i { font-size: 11px; font-weight: 800; color: #1e293b; padding: 4px 10px; background: #f1f5f9; border-radius: 20px; }
        .ps-i strong { color: #3b82f6; }

        .lead-list { display: flex; flex-direction: column; gap: 14px; }
        .lead-card { background: #f8fafc; border-radius: 18px; border: 1.5px solid #f1f5f9; padding: 18px; display: flex; flex-direction: column; gap: 14px; transition: 0.2s; }
        .lead-card:hover { border-color: #3b82f6; background: white; }
        
        .lc-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .lc-info strong { display: block; font-size: 14px; color: #1e293b; }
        .lc-info span { font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 4px; margin-top: 2px; }
        .lc-value { font-size: 15px; font-weight: 900; color: #1e293b; }

        .lc-mid { display: grid; grid-template-columns: 100px 1fr; gap: 16px; align-items: center; }
        .lc-stage { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-align: center; }
        .lc-prob { display: flex; flex-direction: column; gap: 4px; }
        .lc-prob span { font-size: 9px; font-weight: 700; color: #94a3b8; }
        .prob-bar-bg { background: #e2e8f0; height: 5px; border-radius: 10px; overflow: hidden; }
        .prob-bar { height: 100%; border-radius: 10px; }

        .lc-foot { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid #f1f5f9; }
        .lc-foot span { font-size: 10px; color: #cbd5e1; display: flex; align-items: center; gap: 4px; }
        .lc-actions { display: flex; gap: 5px; }
        .la { padding: 4px 10px; border-radius: 6px; border: none; font-size: 10px; font-weight: 700; cursor: pointer; }
        .la.blue { background: #eff6ff; color: #3b82f6; }
        .la.amber { background: #fffbeb; color: #f59e0b; }
        .la.green { background: #f0fdf4; color: #10b981; }
        .la.red { background: #fef2f2; color: #ef4444; }
        .la.detail, .la.del { background: transparent; color: #94a3b8; padding: 4px; }
        .la.del:hover { color: #ef4444; }
        .la.detail:hover { color: #3b82f6; }

        .sm-sidebar { display: flex; flex-direction: column; gap: 20px; }
        .camp-card-main { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .camp-card-main h3 { font-size: 15px; font-weight: 800; color: #1e293b; }
        .add-camp-btn { width: 30px; height: 30px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: white; color: #3b82f6; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .camp-form { display: flex; gap: 8px; margin-bottom: 14px; overflow: hidden; }
        .camp-form input, .camp-form select { padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 12px; outline: none; flex: 1; }
        .cl { display: flex; flex-direction: column; gap: 14px; }
        .ci { display: flex; align-items: center; gap: 12px; }
        .ci-dot { width: 8px; height: 8px; border-radius: 50%; }
        .ci-info { flex: 1; }
        .ci-info strong { display: block; font-size: 13px; color: #1e293b; }
        .ci-info span { font-size: 11px; color: #94a3b8; }
        .ci-stat { font-size: 11px; font-weight: 800; color: #10b981; }
        .ci-del { background: none; border: none; color: #cbd5e1; cursor: pointer; }
        .ci-del:hover { color: #ef4444; }

        .sales-stats-c { background: #1e293b; border-radius: 24px; padding: 24px; color: white; }
        .ssc-head { font-size: 13px; font-weight: 700; color: #94a3b8; margin-bottom: 16px; text-transform: uppercase; }
        .ssc-metrics { display: flex; flex-direction: column; gap: 16px; }
        .sscm-l { font-size: 11px; color: #94a3b8; }
        .sscm-v { font-size: 20px; font-weight: 900; display: flex; align-items: center; gap: 8px; }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-box { background: white; border-radius: 20px; width: 480px; max-height: 80vh; overflow-y: auto; padding: 24px; }
        .mb-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .mb-head h3 { font-size: 17px; font-weight: 800; color: #1e293b; }
        .mb-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .dg { padding: 10px; background: #f8fafc; border-radius: 10px; }
        .dg span { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 3px; }
        .dg strong { font-size: 13px; color: #1e293b; }
        .detail-notes { padding: 10px; background: #fffbeb; border-radius: 10px; font-size: 12px; color: #92400e; margin-top: 10px; }
        .mb-foot { display: flex; justify-content: flex-end; margin-top: 14px; }
      `}</style>
    </div>
  );
};

export default SalesMarketing;
