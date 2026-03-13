import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, Search, Mail, Phone, Calendar,
  Star, TrendingUp, Clock, Edit, X, CheckCircle,
  Briefcase, Award
} from 'lucide-react';

const DEPARTMENTS = ['Resepsiyon','Kat Hizmetleri','Restoran','Teknik','Mutfak','Yönetim','Güvenlik','SPA'];
const POSITIONS   = ['Müdür','Şef','Uzman','Teknisyen','Garson','Resepsiyonist','Güvenlik Görevlisi'];

const INITIAL_STAFF = [
  { id:'HR-001', name:'Fatma Kara',    dept:'Resepsiyon',     pos:'Şef',         phone:'0532 100 1001', email:'fatma@hotel.com', salary:18000, start:'2022-03-01', status:'aktif', shift:'Sabah' },
  { id:'HR-002', name:'Mehmet Demir',  dept:'Teknik',         pos:'Teknisyen',   phone:'0533 200 2002', email:'mehmet@hotel.com', salary:16000, start:'2021-06-15', status:'aktif', shift:'Vardiya' },
  { id:'HR-003', name:'Ayşe Şahin',   dept:'Kat Hizmetleri', pos:'Uzman',       phone:'0534 300 3003', email:'ayse@hotel.com',   salary:14000, start:'2023-01-10', status:'aktif', shift:'Sabah' },
  { id:'HR-004', name:'Ali Çelik',     dept:'Restoran',       pos:'Garson',      phone:'0535 400 4004', email:'ali@hotel.com',    salary:13500, start:'2023-08-20', status:'aktif', shift:'Akşam' },
  { id:'HR-005', name:'Zeynep Kurt',  dept:'Yönetim',        pos:'Müdür',       phone:'0536 500 5005', email:'zeynep@hotel.com', salary:35000, start:'2019-04-01', status:'aktif', shift:'Tam Gün' },
  { id:'HR-006', name:'Emre Öztürk',  dept:'Güvenlik',       pos:'Güvenlik Görevlisi', phone:'0537 600 6006', email:'emre@hotel.com', salary:15000, start:'2022-11-01', status:'izin', shift:'Gece' },
];

const SHIFTS = ['Sabah (07:00-15:00)', 'Akşam (15:00-23:00)', 'Gece (23:00-07:00)', 'Tam Gün (09:00-18:00)', 'Vardiya'];

const HumanResources = () => {
  const { addNotification } = useHotel();
  const [staff, setStaff]     = useState(INITIAL_STAFF);
  const [search, setSearch]   = useState('');
  const [deptFilter, setDept] = useState('Tümü');
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name:'', dept:DEPARTMENTS[0], pos:POSITIONS[0], phone:'', email:'', salary:'', start:'2026-03-14', status:'aktif', shift:'Sabah (07:00-15:00)' });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const filtered = staff.filter(s => {
    const q = search.toLowerCase();
    return (deptFilter==='Tümü'||s.dept===deptFilter) && (!q||s.name.toLowerCase().includes(q)||s.dept.toLowerCase().includes(q));
  });

  const submit = (e) => {
    e.preventDefault();
    if (editMode && selected) {
      setStaff(p=>p.map(s=>s.id===selected.id?{...s,...form}:s));
      addNotification({ type:'success', msg:`Personel güncellendi: ${form.name}` });
    } else {
      const id = `HR-${String(staff.length+1).padStart(3,'0')}`;
      setStaff(p=>[...p,{ ...form, id, salary:Number(form.salary) }]);
      addNotification({ type:'success', msg:`Yeni personel eklendi: ${form.name}` });
    }
    setShowForm(false); setEditMode(false); setSelected(null);
  };

  const openEdit = (s) => {
    setForm({ name:s.name, dept:s.dept, pos:s.pos, phone:s.phone, email:s.email, salary:String(s.salary), start:s.start, status:s.status, shift:s.shift });
    setEditMode(true); setShowForm(true);
  };

  const toggleStatus = (id) => {
    setStaff(p=>p.map(s=>s.id===id?{...s,status:s.status==='aktif'?'izin':'aktif'}:s));
  };

  const totalSalary = staff.filter(s=>s.status==='aktif').reduce((sum,s)=>sum+s.salary,0);
  const byDept = DEPARTMENTS.reduce((acc,d)=>({...acc,[d]:staff.filter(s=>s.dept===d).length}),{});

  return (
    <div className="hr-layout">
      {/* Left: Staff List */}
      <div className="hr-left">
        <div className="hrl-head">
          <h2>Personel Yönetimi</h2>
          <button className="btn-primary sm" onClick={()=>{ setEditMode(false); setForm({ name:'',dept:DEPARTMENTS[0],pos:POSITIONS[0],phone:'',email:'',salary:'',start:'2026-03-14',status:'aktif',shift:'Sabah (07:00-15:00)' }); setShowForm(true); }}>
            <Plus size={14}/> Personel Ekle
          </button>
        </div>

        {/* KPI */}
        <div className="hr-kpi">
          <div className="hk"><strong>{staff.filter(s=>s.status==='aktif').length}</strong><span>Aktif</span></div>
          <div className="hk"><strong style={{color:'#f59e0b'}}>{staff.filter(s=>s.status==='izin').length}</strong><span>İzinde</span></div>
          <div className="hk"><strong style={{color:'#10b981'}}>₺{(totalSalary/1000).toFixed(0)}K</strong><span>Maaş/Ay</span></div>
        </div>

        {/* Search + Filter */}
        <div className="hr-filters">
          <div className="search-box"><Search size={14}/><input placeholder="İsim, departman..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
          <div className="dept-tabs">
            {['Tümü',...DEPARTMENTS].map(d=>(
              <button key={d} className={`dt ${deptFilter===d?'active':''}`} onClick={()=>setDept(d)}>{d}</button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="staff-list">
          {filtered.map((s,i)=>(
            <motion.button key={s.id} className={`staff-item ${selected?.id===s.id?'active':''}`} onClick={()=>setSelected(s)} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.04}}>
              <div className="si-av" style={{background:s.status==='izin'?'#f1f5f9':'#eff6ff',color:s.status==='izin'?'#94a3b8':'#3b82f6'}}>{s.name[0]}</div>
              <div className="si-info">
                <strong>{s.name}</strong>
                <span>{s.dept} · {s.pos}</span>
              </div>
              <span className={`si-status ${s.status}`}>{s.status==='aktif'?'●':'○'}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Right: Detail */}
      <div className="hr-right">
        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.form key="form" className="hr-form" onSubmit={submit} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}>
              <div className="form-head">
                <h3>{editMode?'Personel Düzenle':'Yeni Personel'}</h3>
                <button type="button" onClick={()=>{setShowForm(false);setEditMode(false);}}><X size={18}/></button>
              </div>
              <div className="fg-grid">
                <div className="fg full"><label>Ad Soyad *</label><input value={form.name} onChange={e=>set('name',e.target.value)} required placeholder="Ad Soyad"/></div>
                <div className="fg"><label>Departman</label><select value={form.dept} onChange={e=>set('dept',e.target.value)}>{DEPARTMENTS.map(d=><option key={d}>{d}</option>)}</select></div>
                <div className="fg"><label>Pozisyon</label><select value={form.pos} onChange={e=>set('pos',e.target.value)}>{POSITIONS.map(p=><option key={p}>{p}</option>)}</select></div>
                <div className="fg"><label>Telefon</label><input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="0532 xxx xxxx"/></div>
                <div className="fg"><label>E-posta</label><input value={form.email} onChange={e=>set('email',e.target.value)} placeholder="ad@hotel.com"/></div>
                <div className="fg"><label>Maaş (₺)</label><input type="number" value={form.salary} onChange={e=>set('salary',e.target.value)} placeholder="0"/></div>
                <div className="fg"><label>İşe Başlama</label><input type="date" value={form.start} onChange={e=>set('start',e.target.value)}/></div>
                <div className="fg full"><label>Vardiya</label><select value={form.shift} onChange={e=>set('shift',e.target.value)}>{SHIFTS.map(s=><option key={s}>{s}</option>)}</select></div>
              </div>
              <div className="form-foot">
                <button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>İptal</button>
                <button type="submit" className="btn-primary">{editMode?'Güncelle':'Ekle'}</button>
              </div>
            </motion.form>
          ) : selected ? (
            <motion.div key={selected.id} className="staff-detail" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}>
              <div className="sd-head">
                <div className="sd-av">{selected.name[0]}</div>
                <div>
                  <h3>{selected.name}</h3>
                  <span>{selected.pos} · {selected.dept}</span>
                  <span className={`sd-badge ${selected.status}`}>{selected.status==='aktif'?'Aktif':'İzinde'}</span>
                </div>
                <button className="edit-btn" onClick={()=>openEdit(selected)}><Edit size={16}/></button>
              </div>

              <div className="sd-grid">
                {[
                  ['Personel No', selected.id],
                  ['Telefon', selected.phone],
                  ['E-posta', selected.email],
                  ['Vardiya', selected.shift],
                  ['İşe Başlama', selected.start],
                  ['Maaş', `₺${Number(selected.salary).toLocaleString()}/ay`],
                ].map(([k,v])=>(
                  <div key={k} className="sdi"><label>{k}</label><strong>{v}</strong></div>
                ))}
              </div>

              {/* Dept distribution */}
              <div className="dept-chart">
                <h4>Departman Dağılımı</h4>
                {Object.entries(byDept).filter(([,v])=>v>0).map(([d,c])=>(
                  <div key={d} className="dc-row">
                    <span>{d}</span>
                    <div className="dc-bar-wrap"><div className="dc-bar" style={{width:`${(c/staff.length)*100}%`}}/></div>
                    <strong>{c}</strong>
                  </div>
                ))}
              </div>

              <button className={`toggle-status-btn ${selected.status}`} onClick={()=>{ toggleStatus(selected.id); setSelected(p=>({...p,status:p.status==='aktif'?'izin':'aktif'})); }}>
                {selected.status==='aktif' ? '📅 İzne Gönder' : '✅ Aktife Al'}
              </button>
            </motion.div>
          ) : (
            <motion.div key="empty" className="hr-empty" initial={{opacity:0}} animate={{opacity:1}}>
              <Users size={64} color="#e2e8f0"/>
              <p>Personel detayı için listeden birini seçin</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .hr-layout{display:flex;height:calc(100vh - 70px);}
        .hr-left{width:380px;border-right:1px solid #e2e8f0;background:white;display:flex;flex-direction:column;overflow:hidden;}
        .hrl-head{padding:20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #f1f5f9;}
        .hrl-head h2{font-size:18px;font-weight:800;color:#1e293b;}
        .btn-primary{padding:10px 18px;border-radius:12px;border:none;background:#3b82f6;color:white;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .btn-primary.sm{padding:8px 14px;font-size:12px;}
        .hr-kpi{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid #f1f5f9;}
        .hk{padding:14px;text-align:center;border-right:1px solid #f1f5f9;}
        .hk:last-child{border-right:none;}
        .hk strong{display:block;font-size:20px;font-weight:900;color:#1e293b;}
        .hk span{font-size:10px;color:#94a3b8;font-weight:700;}
        .hr-filters{padding:12px;display:flex;flex-direction:column;gap:8px;border-bottom:1px solid #f1f5f9;}
        .search-box{display:flex;align-items:center;gap:8px;background:#f8fafc;border:1.5px solid #e2e8f0;padding:9px 12px;border-radius:10px;}
        .search-box input{border:none;background:transparent;outline:none;font-size:13px;width:100%;}
        .dept-tabs{display:flex;gap:6px;flex-wrap:wrap;}
        .dt{padding:5px 10px;border-radius:20px;border:1.5px solid #e2e8f0;background:white;font-size:11px;font-weight:700;color:#64748b;cursor:pointer;}
        .dt.active{background:#1e293b;color:white;border-color:#1e293b;}
        .staff-list{flex:1;overflow-y:auto;padding:8px;}
        .staff-item{width:100%;display:flex;align-items:center;gap:10px;padding:12px;border-radius:12px;border:none;background:transparent;cursor:pointer;text-align:left;margin-bottom:4px;}
        .staff-item:hover{background:#f8fafc;}
        .staff-item.active{background:#eff6ff;border:1.5px solid #3b82f6;}
        .si-av{width:38px;height:38px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:15px;flex-shrink:0;}
        .si-info{flex:1;}
        .si-info strong{display:block;font-size:13px;color:#1e293b;font-weight:700;}
        .si-info span{font-size:11px;color:#94a3b8;}
        .si-status.aktif{color:#10b981;font-size:16px;}
        .si-status.izin{color:#94a3b8;font-size:16px;}

        .hr-right{flex:1;overflow-y:auto;background:#f8fafc;}
        .hr-empty{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:#94a3b8;font-size:14px;}

        .hr-form{background:white;border-radius:0;min-height:100%;padding:28px;display:flex;flex-direction:column;gap:20px;}
        .form-head{display:flex;justify-content:space-between;align-items:center;}
        .form-head h3{font-size:18px;font-weight:800;color:#1e293b;}
        .form-head button{background:transparent;border:none;color:#94a3b8;cursor:pointer;}
        .fg-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .fg{display:flex;flex-direction:column;gap:6px;}
        .fg.full{grid-column:1/-1;}
        .fg label{font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;}
        .fg input,.fg select{padding:11px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;outline:none;}
        .form-foot{display:flex;justify-content:flex-end;gap:10px;padding-top:8px;}
        .btn-cancel{padding:10px 18px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-weight:700;cursor:pointer;}

        .staff-detail{padding:28px;display:flex;flex-direction:column;gap:22px;}
        .sd-head{display:flex;align-items:center;gap:16px;background:white;padding:22px;border-radius:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);}
        .sd-av{width:56px;height:56px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:16px;display:flex;align-items:center;justify-content:center;color:white;font-size:24px;font-weight:900;flex-shrink:0;}
        .sd-head h3{font-size:20px;font-weight:800;color:#1e293b;}
        .sd-head span{display:block;font-size:13px;color:#94a3b8;margin-top:3px;}
        .sd-badge{display:inline-block;font-size:11px;font-weight:800;padding:3px 10px;border-radius:20px;margin-top:6px;}
        .sd-badge.aktif{background:#f0fdf4;color:#10b981;}
        .sd-badge.izin{background:#f8fafc;color:#94a3b8;}
        .edit-btn{margin-left:auto;background:white;border:1.5px solid #e2e8f0;color:#64748b;border-radius:10px;padding:9px;cursor:pointer;display:flex;}
        .sd-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;background:white;padding:20px;border-radius:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);}
        .sdi label{font-size:10px;font-weight:800;color:#94a3b8;text-transform:uppercase;display:block;margin-bottom:4px;}
        .sdi strong{font-size:14px;color:#1e293b;font-weight:700;}
        .dept-chart{background:white;padding:20px;border-radius:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);}
        .dept-chart h4{font-size:14px;font-weight:800;color:#1e293b;margin-bottom:14px;}
        .dc-row{display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:12px;}
        .dc-row span{width:100px;color:#64748b;font-weight:700;}
        .dc-bar-wrap{flex:1;height:8px;background:#f1f5f9;border-radius:10px;overflow:hidden;}
        .dc-bar{height:100%;background:#3b82f6;border-radius:10px;transition:width 0.5s;}
        .dc-row strong{width:20px;text-align:right;color:#1e293b;font-weight:800;}
        .toggle-status-btn{padding:14px;border-radius:14px;border:1.5px solid #e2e8f0;background:white;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,0.06);}
        .toggle-status-btn.aktif{border-color:#f59e0b;color:#b45309;background:#fffbeb;}
        .toggle-status-btn.izin{border-color:#10b981;color:#10b981;background:#f0fdf4;}
      `}</style>
    </div>
  );
};

export default HumanResources;
