import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Trash2, Edit, CheckCircle, X,
  Wrench, AlertCircle, Clock, DoorOpen, ThumbsUp
} from 'lucide-react';

const PRIORITY = { high:'#ef4444', normal:'#f59e0b', low:'#94a3b8' };
const PRIO_LABEL = { high:'Acil', normal:'Normal', low:'Düşük' };
const STATUS_COLOR = { bekliyor:'#f59e0b', devam:'#3b82f6', bitti:'#10b981' };

const TechService = () => {
  const { tasks, addTask, updateTask, rooms } = useHotel();
  const [filter, setFilter] = useState('tümü');
  const [showForm, setShowForm] = useState(false);
  const [noteModal, setNoteModal] = useState(null);  // task id
  const [noteText, setNoteText] = useState('');
  const [form, setForm] = useState({ room:'', desc:'', priority:'normal', assignee:'', status:'bekliyor', note:'' });

  const techTasks = tasks.filter(t => t.type === 'technical');
  const filtered = filter === 'tümü' ? techTasks : techTasks.filter(t => t.status === filter);
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const submit = (e) => {
    e.preventDefault();
    addTask({ ...form, type: 'technical' });
    setForm({ room:'', desc:'', priority:'normal', assignee:'', status:'bekliyor', note:'' });
    setShowForm(false);
  };

  const saveNote = () => {
    updateTask(noteModal, { note: noteText });
    setNoteModal(null);
  };

  const kpi = [
    { label:'Toplam İş Emri', count: techTasks.length, color:'#3b82f6' },
    { label:'Bekliyor', count: techTasks.filter(t=>t.status==='bekliyor').length, color:'#f59e0b' },
    { label:'Devam Ediyor', count: techTasks.filter(t=>t.status==='devam').length, color:'#3b82f6' },
    { label:'Tamamlanan', count: techTasks.filter(t=>t.status==='bitti').length, color:'#10b981' },
  ];

  return (
    <div className="ts-page">
      <div className="ts-head">
        <div><h2>Teknik Servis & İş Emirleri</h2><span>Tüm teknik arıza, bakım ve müdahale kayıtları</span></div>
        <button className="btn-primary" onClick={()=>setShowForm(!showForm)}><Plus size={15}/> Yeni İş Emri</button>
      </div>

      {/* KPI */}
      <div className="kpi-row">
        {kpi.map((k,i)=>(
          <div key={i} className="kpi-card"><div className="kpi-num" style={{color:k.color}}>{k.count}</div><div className="kpi-lbl">{k.label}</div></div>
        ))}
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form className="form-card" onSubmit={submit} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <h3>Yeni Teknik İş Emri</h3>
            <div className="fg-grid">
              <div className="fg"><label>Oda *</label>
                <select value={form.room} onChange={e=>set('room',e.target.value)} required>
                  <option value="">Oda seçin</option>
                  {rooms.map(r=><option key={r.id} value={r.id}>{r.id} — {r.type} ({r.status})</option>)}
                </select>
              </div>
              <div className="fg"><label>Öncelik</label>
                <select value={form.priority} onChange={e=>set('priority',e.target.value)}>
                  <option value="high">Acil</option>
                  <option value="normal">Normal</option>
                  <option value="low">Düşük</option>
                </select>
              </div>
              <div className="fg"><label>Sorumlu Teknisyen</label>
                <input value={form.assignee} onChange={e=>set('assignee',e.target.value)} placeholder="Teknisyen adı"/>
              </div>
              <div className="fg full"><label>Arıza / Görev Açıklaması *</label>
                <input value={form.desc} onChange={e=>set('desc',e.target.value)} placeholder="Detaylı açıklama..." required/>
              </div>
            </div>
            <div className="form-foot"><button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>İptal</button><button type="submit" className="btn-primary">İş Emri Oluştur</button></div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="filter-row">
        {['tümü','bekliyor','devam','bitti'].map(f=>(
          <button key={f} className={`filter-btn ${filter===f?'active':''}`} onClick={()=>setFilter(f)}>
            {f==='tümü'?'Tümü':f==='bekliyor'?'Bekliyor':f==='devam'?'Devam Ediyor':'Tamamlanan'}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="task-grid">
        {filtered.map((task,i)=>(
          <motion.div key={task.id} className="task-card" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}>
            <div className="tc-top">
              <div className="tc-icon"><Wrench size={18} color="#e67e22"/></div>
              <span className="prio-tag" style={{background:PRIORITY[task.priority]+'18',color:PRIORITY[task.priority]}}>{PRIO_LABEL[task.priority]}</span>
            </div>
            <div className="tc-room">Oda {task.room}</div>
            <p className="tc-desc">{task.desc}</p>
            {task.note && <div className="tc-note">📝 {task.note}</div>}
            <div className="tc-meta"><Clock size={12}/> {task.created} · {task.assignee||'Atanmadı'}</div>
            <div className="tc-actions">
              <div className="status-dot" style={{color:STATUS_COLOR[task.status]}}>
                {task.status==='bitti'?<CheckCircle size={14}/>:task.status==='devam'?<AlertCircle size={14}/>:<Clock size={14}/>}
                {task.status==='bekliyor'?'Bekliyor':task.status==='devam'?'Devam':' Tamamlandı'}
              </div>
              <div className="act-btns">
                {task.status==='bekliyor' && <button className="micro blue" onClick={()=>updateTask(task.id,{status:'devam'})}>Başlat</button>}
                {task.status==='devam' && <button className="micro green" onClick={()=>updateTask(task.id,{status:'bitti'})}>Tamamla</button>}
                <button className="micro grey" onClick={()=>{setNoteModal(task.id);setNoteText(task.note||'');}}>Not Ekle</button>
              </div>
            </div>
          </motion.div>
        ))}
        {filtered.length===0 && <div className="no-data">Bu durumda iş emri bulunmuyor.</div>}
      </div>

      {/* Note modal */}
      <AnimatePresence>
        {noteModal && (
          <motion.div className="modal-overlay" onClick={()=>setNoteModal(null)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <motion.div className="note-modal" onClick={e=>e.stopPropagation()} initial={{scale:.9}} animate={{scale:1}}>
              <div className="modal-head"><h3>Not Ekle / Güncelle</h3><button onClick={()=>setNoteModal(null)}><X size={18}/></button></div>
              <div style={{padding:'20px'}}>
                <textarea value={noteText} onChange={e=>setNoteText(e.target.value)} rows={4} placeholder="Yapılanları, değiştirilen parçaları, açıklama..." style={{width:'100%',padding:'12px',border:'1.5px solid #e2e8f0',borderRadius:'12px',fontSize:'13px',outline:'none',resize:'none'}}/>
                <div className="modal-foot" style={{marginTop:'12px'}}>
                  <button className="btn-cancel" onClick={()=>setNoteModal(null)}>İptal</button>
                  <button className="btn-primary" onClick={saveNote}>Kaydet</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .ts-page{padding:28px;display:flex;flex-direction:column;gap:20px;}
        .ts-head{display:flex;justify-content:space-between;align-items:flex-start;}
        .ts-head h2{font-size:22px;font-weight:800;color:#1e293b;}
        .ts-head span{font-size:13px;color:#94a3b8;}
        .btn-primary{padding:10px 18px;border-radius:12px;border:none;background:#3b82f6;color:white;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .kpi-card{background:white;border-radius:16px;border:1px solid #e2e8f0;padding:18px;text-align:center;}
        .kpi-num{font-size:32px;font-weight:900;}
        .kpi-lbl{font-size:12px;color:#94a3b8;font-weight:700;margin-top:4px;}
        .form-card{background:white;border-radius:16px;border:1px solid #e2e8f0;padding:22px;}
        .form-card h3{font-size:15px;font-weight:800;color:#1e293b;margin-bottom:16px;}
        .fg-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .fg{display:flex;flex-direction:column;gap:6px;}
        .fg.full{grid-column:1/-1;}
        .fg label{font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;}
        .fg input,.fg select{padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;outline:none;}
        .form-foot{display:flex;justify-content:flex-end;gap:10px;margin-top:14px;}
        .btn-cancel{padding:10px 18px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-weight:700;cursor:pointer;}
        .filter-row{display:flex;gap:8px;}
        .filter-btn{padding:8px 16px;border-radius:10px;border:1.5px solid #e2e8f0;background:white;font-size:12px;font-weight:700;color:#64748b;cursor:pointer;}
        .filter-btn.active{background:#1e293b;color:white;border-color:#1e293b;}
        .task-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;}
        .task-card{background:white;border-radius:16px;border:1px solid #e2e8f0;padding:20px;display:flex;flex-direction:column;gap:10px;}
        .tc-top{display:flex;justify-content:space-between;align-items:center;}
        .tc-icon{width:36px;height:36px;background:#fff7ed;border-radius:10px;display:flex;align-items:center;justify-content:center;}
        .prio-tag{font-size:10px;font-weight:800;padding:3px 10px;border-radius:20px;}
        .tc-room{font-size:18px;font-weight:900;color:#1e293b;}
        .tc-desc{font-size:13px;color:#64748b;line-height:1.4;flex:1;}
        .tc-note{font-size:11px;color:#64748b;background:#f8fafc;padding:8px 12px;border-radius:8px;}
        .tc-meta{display:flex;align-items:center;gap:6px;font-size:11px;color:#94a3b8;}
        .tc-actions{display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid #f1f5f9;}
        .status-dot{display:flex;align-items:center;gap:5px;font-size:11px;font-weight:700;}
        .act-btns{display:flex;gap:6px;}
        .micro{padding:5px 12px;border-radius:8px;border:none;font-size:11px;font-weight:700;cursor:pointer;}
        .micro.blue{background:#eff6ff;color:#3b82f6;}
        .micro.green{background:#ecfdf5;color:#10b981;}
        .micro.grey{background:#f8fafc;color:#64748b;border:1px solid #e2e8f0;}
        .no-data{text-align:center;padding:40px;color:#94a3b8;font-size:14px;font-weight:600;grid-column:1/-1;}
        .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.75);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:1000;}
        .note-modal{background:white;border-radius:20px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.4);width:400px;}
        .modal-head{padding:18px 22px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;}
        .modal-head h3{font-size:16px;font-weight:800;color:#1e293b;}
        .modal-head button{background:transparent;border:none;color:#94a3b8;cursor:pointer;}
        .modal-foot{display:flex;justify-content:flex-end;gap:10px;}
      `}</style>
    </div>
  );
};

export default TechService;
