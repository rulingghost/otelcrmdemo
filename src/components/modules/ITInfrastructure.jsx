import React, { useState, useEffect } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Wifi, Cpu, Database, Shield, X, Plus,
  Activity, Signal, HardDrive, RefreshCw, AlertTriangle, Power, Trash2 
} from 'lucide-react';

const ICONS = { Server: <Server size={20}/>, Shield: <Shield size={20}/>, Wifi: <Wifi size={20}/>, Database: <Database size={20}/>, HardDrive: <HardDrive size={20}/>, Cpu: <Cpu size={20}/> };

const ITInfrastructure = () => {
  const { addNotification } = useHotel();
  const [refreshing, setRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [systems, setSystems] = useState([
    { id:'SYS-001', name: 'Ana Sunucu (ERP)', status: 'online', load: 12, uptime: '142 gün', icon: 'Server' },
    { id:'SYS-002', name: 'Banka Entegrasyon Geçidi', status: 'online', load: 5, uptime: '15 gün', icon: 'Shield' },
    { id:'SYS-003', name: 'Wi-Fi Ağı (Misafir)', status: 'online', load: 68, uptime: '4 gün', icon: 'Wifi' },
    { id:'SYS-004', name: 'Wi-Fi Ağı (Personel)', status: 'online', load: 42, uptime: '4 gün', icon: 'Wifi' },
    { id:'SYS-005', name: 'Veritabanı (Azure)', status: 'warning', load: 85, uptime: '240 gün', icon: 'Database' },
    { id:'SYS-006', name: 'Yedekleme Ünitesi (NAS)', status: 'online', load: 2, uptime: '12 gün', icon: 'HardDrive' },
  ]);

  const [form, setForm] = useState({ name:'', icon:'Server' });
  const idCounter = React.useRef(6);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setSystems(p => p.map(s => ({ ...s, load: Math.max(1, s.load + Math.floor(Math.random() * 10) - 5) })));
      setRefreshing(false);
      addNotification({ type:'info', msg:'Sistem durumları güncellendi' });
    }, 1500);
  };

  const toggleSystem = (id) => {
    setSystems(p => p.map(s => s.id === id ? { ...s, status: s.status === 'online' ? 'offline' : 'online', load: s.status === 'online' ? 0 : Math.floor(Math.random() * 50) } : s));
    const sys = systems.find(s => s.id === id);
    addNotification({ type: sys?.status === 'online' ? 'warn' : 'success', msg: `${sys?.name} ${sys?.status === 'online' ? 'kapatıldı' : 'başlatıldı'}` });
  };

  const restartSystem = (id) => {
    const sys = systems.find(s => s.id === id);
    setSystems(p => p.map(s => s.id === id ? { ...s, status: 'restarting', load: 0 } : s));
    addNotification({ type:'info', msg:`${sys?.name} yeniden başlatılıyor...` });
    setTimeout(() => {
      setSystems(p => p.map(s => s.id === id ? { ...s, status: 'online', load: Math.floor(Math.random() * 30), uptime: '0 gün' } : s));
      addNotification({ type:'success', msg:`${sys?.name} yeniden başlatıldı` });
    }, 2000);
  };

  const addSystem = (e) => {
    e.preventDefault();
    idCounter.current++;
    const id = `SYS-${String(idCounter.current).padStart(3,'0')}`;
    setSystems(p => [...p, { ...form, id, status:'online', load: 0, uptime:'0 gün' }]);
    addNotification({ type:'success', msg:`Yeni sistem eklendi: ${form.name}` });
    setForm({ name:'', icon:'Server' });
    setShowForm(false);
  };

  const deleteSystem = (id) => {
    setSystems(p => p.filter(s => s.id !== id));
  };

  const onlineCount = systems.filter(s => s.status === 'online').length;
  const warningCount = systems.filter(s => s.status === 'warning' || s.load > 80).length;
  const [trafficBars, setTrafficBars] = useState([40, 60, 45, 80, 55, 70, 90, 65, 50, 85]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficBars(p => p.map(() => 20 + Math.floor(Math.random() * 70)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="it-page">
      <div className="it-head">
        <div>
          <h2><Activity size={20}/> IT Altyapı & Sistem İzleme</h2>
          <span>Donanım, ağ ve yazılım servislerinin gerçek zamanlı durumu</span>
        </div>
        <div style={{display:'flex',gap:10}}>
          <button className="btn-add" onClick={()=>setShowForm(true)}><Plus size={14}/> Sistem Ekle</button>
          <button className={`btn-refresh ${refreshing ? 'spin' : ''}`} onClick={handleRefresh}>
            <RefreshCw size={15}/> 
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="it-kpi">
        <div className="kpi-item"><span>Çalışan</span><strong style={{color:'#10b981'}}>{onlineCount}</strong></div>
        <div className="kpi-item"><span>Uyarı</span><strong style={{color:'#ef4444'}}>{warningCount}</strong></div>
        <div className="kpi-item"><span>Toplam</span><strong>{systems.length}</strong></div>
      </div>

      {/* Add System Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowForm(false)}>
            <motion.form className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()} onSubmit={addSystem}>
              <div className="mb-head"><h3>Yeni Sistem Ekle</h3><button type="button" onClick={()=>setShowForm(false)}><X size={18}/></button></div>
              <div className="mf-grid">
                <div className="mf"><label>Sistem Adı *</label><input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} required placeholder="Ör: Redis Cache"/></div>
                <div className="mf"><label>İkon</label><select value={form.icon} onChange={e=>setForm(p=>({...p,icon:e.target.value}))}>{Object.keys(ICONS).map(k=><option key={k}>{k}</option>)}</select></div>
              </div>
              <div className="mf-foot"><button type="submit" className="btn-add">Ekle</button></div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="it-grid">
        <div className="systems-list">
          {systems.map((s, i) => (
            <motion.div 
              key={s.id} 
              className={`system-card ${s.status}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="sc-top">
                <div className="sc-icon">{ICONS[s.icon] || <Server size={20}/>}</div>
                <div className="sc-btns">
                  <button className="sc-btn" onClick={()=>restartSystem(s.id)} title="Yeniden Başlat"><RefreshCw size={12}/></button>
                  <button className="sc-btn" onClick={()=>toggleSystem(s.id)} title={s.status==='online'?'Kapat':'Başlat'}><Power size={12}/></button>
                  <button className="sc-btn del" onClick={()=>deleteSystem(s.id)}><Trash2 size={12}/></button>
                </div>
              </div>
              <div className="sc-info">
                <strong>{s.name}</strong>
                <span>Uptime: {s.uptime}</span>
              </div>
              <div className="sc-meter">
                <div className="m-label">Yük: %{s.load}</div>
                <div className="m-bar-bg"><div className="m-bar" style={{ width: `${s.load}%`, background: s.load > 80 ? '#ef4444' : s.load > 60 ? '#f59e0b' : '#10b981' }}/></div>
              </div>
              <div className={`sc-status ${s.status}`}>
                {s.status === 'online' ? '● Çalışıyor' : s.status === 'warning' ? '⚠ Yüksek Yük' : s.status === 'restarting' ? '↻ Yeniden Başlatılıyor' : '○ Kapalı'}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="it-sidebar">
          <div className="traffic-card">
            <h3>İnternet Trafiği</h3>
            <div className="t-row">
              <div className="t-stat"><span>Download</span><strong>450 Mbps</strong></div>
              <div className="t-stat"><span>Upload</span><strong>120 Mbps</strong></div>
            </div>
            <div className="t-visual">
              {trafficBars.map((h, i) => (
                <motion.div key={i} className="v-bar" animate={{ height: `${h}%` }} transition={{ duration: 0.5 }}/>
              ))}
            </div>
          </div>

          {warningCount > 0 && (
            <div className="alert-box">
              <div className="ab-head"><AlertTriangle size={18} color="#ef4444"/><strong>Kritik Uyarılar</strong></div>
              {systems.filter(s => s.load > 80).map(s => (
                <p key={s.id}><strong>{s.name}</strong> — %{s.load} yük tespit edildi.</p>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .it-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .it-head { display: flex; justify-content: space-between; align-items: center; }
        .it-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .it-head span { font-size: 13px; color: #94a3b8; }
        .btn-refresh { width: 40px; height: 40px; border-radius: 12px; border: 1.5px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .btn-refresh.spin svg { animation: spin 1s linear infinite; }
        .btn-add { padding: 10px 18px; border-radius: 12px; border: none; background: #1e293b; color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        @keyframes spin { from {transform: rotate(0deg)} to {transform: rotate(360deg)} }
        .it-kpi { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .kpi-item { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 16px; text-align: center; }
        .kpi-item span { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 4px; }
        .kpi-item strong { font-size: 24px; font-weight: 900; }
        .it-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        .systems-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .system-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 14px; transition: 0.3s; }
        .system-card:hover { transform: translateY(-2px); border-color: #3b82f6; }
        .system-card.offline { opacity: 0.5; }
        .system-card.restarting { border-color: #f59e0b; }
        .sc-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .sc-icon { width: 40px; height: 40px; background: #f8fafc; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #3b82f6; }
        .sc-btns { display: flex; gap: 4px; }
        .sc-btn { width: 24px; height: 24px; border-radius: 6px; border: 1px solid #e2e8f0; background: white; color: #94a3b8; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .sc-btn:hover { border-color: #3b82f6; color: #3b82f6; }
        .sc-btn.del { color: #ef4444; border-color: #fecaca; }
        .sc-info strong { display: block; font-size: 14px; color: #1e293b; }
        .sc-info span { font-size: 11px; color: #94a3b8; }
        .sc-meter { display: flex; flex-direction: column; gap: 6px; }
        .m-label { font-size: 10px; font-weight: 800; color: #64748b; }
        .m-bar-bg { background: #f1f5f9; height: 6px; border-radius: 10px; overflow: hidden; }
        .m-bar { height: 100%; border-radius: 10px; transition: 0.5s; }
        .sc-status { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-align: center; }
        .sc-status.online { background: #f0fdf4; color: #10b981; }
        .sc-status.warning { background: #fef2f2; color: #ef4444; }
        .sc-status.offline { background: #f1f5f9; color: #94a3b8; }
        .sc-status.restarting { background: #fffbeb; color: #f59e0b; }
        .it-sidebar { display: flex; flex-direction: column; gap: 20px; }
        .traffic-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .traffic-card h3 { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        .t-row { display: flex; gap: 24px; margin-bottom: 24px; }
        .t-stat span { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .t-stat strong { display: block; font-size: 18px; font-weight: 900; color: #1e293b; }
        .t-visual { height: 80px; display: flex; align-items: flex-end; gap: 4px; }
        .v-bar { flex: 1; background: #3b82f6; border-radius: 2px 2px 0 0; opacity: 0.3; }
        .alert-box { background: #fef2f2; border-radius: 20px; padding: 20px; border: 1px solid #fee2e2; }
        .ab-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .ab-head strong { font-size: 14px; color: #ef4444; }
        .alert-box p { font-size: 12px; color: #991b1b; line-height: 1.5; margin: 4px 0; }
        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-box { background: white; border-radius: 20px; width: 400px; padding: 24px; }
        .mb-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .mb-head h3 { font-size: 17px; font-weight: 800; color: #1e293b; }
        .mb-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .mf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .mf { display: flex; flex-direction: column; gap: 6px; }
        .mf label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
        .mf input, .mf select { padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; outline: none; }
        .mf-foot { display: flex; justify-content: flex-end; margin-top: 16px; }
      `}</style>
    </div>
  );
};

export default ITInfrastructure;
