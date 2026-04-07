import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Puzzle, Key, Webhook, Zap, X, Plus,
  Settings, CheckCircle, XCircle, 
  Globe, Smartphone, CreditCard, Link2, Shield, Trash2, RefreshCw
} from 'lucide-react';

const Integrations = () => {
  const { addNotification } = useHotel();
  const [showForm, setShowForm] = useState(false);
  const [testing, setTesting] = useState(null);

  const [integrations, setIntegrations] = useState([
    { id:'INT-001', name: 'Stripe Global', type: 'Ödeme Sistemi', status: 'connected', icon: 'CreditCard', apiKey:'sk_live_...abc', lastSync:'5 dk önce' },
    { id:'INT-002', name: 'DoorLock System (Assa Abloy)', type: 'Kapı Kilit', status: 'connected', icon: 'Key', apiKey:'dlk_...xyz', lastSync:'2 dk önce' },
    { id:'INT-003', name: 'IPTV Connect', type: 'Eğlence', status: 'connected', icon: 'Smartphone', apiKey:'iptv_...def', lastSync:'8 dk önce' },
    { id:'INT-004', name: 'WhatsApp Business API', type: 'İletişim', status: 'error', icon: 'Globe', apiKey:'wa_...err', lastSync:'1 saat önce' },
    { id:'INT-005', name: 'Police KBS Service', type: 'Resmi Bildirim', status: 'connected', icon: 'Shield', apiKey:'kbs_...gov', lastSync:'10 dk önce' },
    { id:'INT-006', name: 'HotelRunner CM', type: 'Kanal Yöneticisi', status: 'connected', icon: 'Link2', apiKey:'hr_...cm', lastSync:'Anlık' },
  ]);

  const [logs, setLogs] = useState([
    { id:1, time: '14:45:12', service: 'DoorLock', event: 'Key Card Created', status: 'Success', meta: 'Room 205' },
    { id:2, time: '14:40:05', service: 'Stripe', event: 'Payment Received', status: 'Success', meta: '₺450.00' },
    { id:3, time: '14:38:22', service: 'WhatsApp', event: 'Message Delivery', status: 'Failed', meta: 'API Error 403' },
    { id:4, time: '14:35:10', service: 'KBS', event: 'Guest Record Sent', status: 'Success', meta: 'Room 101' },
  ]);

  const [form, setForm] = useState({ name:'', type:'API Servisi', apiKey:'' });
  const idCounter = React.useRef(6);

  const ICONS = { CreditCard: <CreditCard/>, Key: <Key/>, Smartphone: <Smartphone/>, Globe: <Globe/>, Shield: <Shield/>, Link2: <Link2/>, Puzzle: <Puzzle/> };

  const addIntegration = (e) => {
    e.preventDefault();
    idCounter.current++;
    const id = `INT-${String(idCounter.current).padStart(3,'0')}`;
    setIntegrations(p => [...p, { ...form, id, status:'connected', icon:'Puzzle', lastSync:'Şimdi' }]);
    addNotification({ type:'success', msg:`Yeni entegrasyon eklendi: ${form.name}` });
    setForm({ name:'', type:'API Servisi', apiKey:'' });
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setIntegrations(p => p.map(i => i.id === id ? { ...i, status: i.status === 'connected' ? 'error' : 'connected' } : i));
    const int = integrations.find(i => i.id === id);
    addNotification({ type: int?.status === 'connected' ? 'warn' : 'success', msg: `${int?.name} ${int?.status === 'connected' ? 'durduruldu' : 'yeniden bağlandı'}` });
  };

  const testConnection = (id) => {
    setTesting(id);
    setTimeout(() => {
      setTesting(null);
      const int = integrations.find(i => i.id === id);
      addNotification({ type:'success', msg:`${int?.name} — Bağlantı testi başarılı!` });
      setLogs(p => [{ id: p.length+1, time: new Date().toLocaleTimeString('tr-TR'), service: int?.name, event: 'Connection Test', status: 'Success', meta: 'OK' }, ...p]);
    }, 1500);
  };

  const deleteIntegration = (id) => {
    if(!confirm('Bu entegrasyonu kaldırmak istediğinize emin misiniz?')) return;
    setIntegrations(p => p.filter(i => i.id !== id));
    addNotification({ type:'info', msg:'Entegrasyon kaldırıldı' });
  };

  return (
    <div className="int-page">
      <div className="int-head">
        <div>
          <h2><Puzzle size={20}/> Entegrasyon Merkezi</h2>
          <span>Dış servisler, API bağlantıları ve IoT ekosistemi yönetimi</span>
        </div>
        <button className="btn-primary" onClick={()=>setShowForm(true)}><Plus size={14}/> Yeni Entegrasyon Ekle</button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowForm(false)}>
            <motion.form className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()} onSubmit={addIntegration}>
              <div className="mb-head"><h3>Yeni Entegrasyon</h3><button type="button" onClick={()=>setShowForm(false)}><X size={18}/></button></div>
              <div className="mf-grid">
                <div className="mf"><label>Servis Adı *</label><input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Ör: Google Analytics" required/></div>
                <div className="mf"><label>Tür</label><select value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}><option>API Servisi</option><option>Ödeme Sistemi</option><option>İletişim</option><option>IoT</option><option>Kanal Yöneticisi</option></select></div>
                <div className="mf full"><label>API Key</label><input value={form.apiKey} onChange={e=>setForm(p=>({...p,apiKey:e.target.value}))} placeholder="API anahtarı (opsiyonel)"/></div>
              </div>
              <div className="mf-foot"><button type="submit" className="btn-primary">Entegrasyon Ekle</button></div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="int-grid">
        {integrations.map((int, i) => (
          <motion.div 
            key={int.id} 
            className={`int-card ${int.status}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="int-top">
              <div className="int-icon">{ICONS[int.icon] || <Puzzle/>}</div>
              <div className={`status-pill ${int.status}`}>
                {int.status === 'connected' ? <CheckCircle size={10}/> : <XCircle size={10}/>}
                {int.status === 'connected' ? 'Bağlı' : 'Hata'}
              </div>
            </div>
            <div className="int-main">
              <strong>{int.name}</strong>
              <span>{int.type}</span>
              <div className="int-sync">Son: {int.lastSync}</div>
            </div>
            <div className="int-actions">
              <button className={`btn-icon ${testing===int.id?'spin':''}`} onClick={()=>testConnection(int.id)} title="Test Et"><RefreshCw size={14}/></button>
              <button className="btn-icon" onClick={()=>toggleStatus(int.id)} title={int.status==='connected'?'Durdur':'Bağlan'}>{int.status==='connected'?<XCircle size={14}/> : <CheckCircle size={14}/>}</button>
              <button className="btn-text" onClick={()=>testConnection(int.id)}>API Yapılandır</button>
              <button className="btn-icon del" onClick={()=>deleteIntegration(int.id)} title="Kaldır"><Trash2 size={14}/></button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="log-section">
        <h3>Entegrasyon Günlükleri (Webhooks)</h3>
        <div className="log-table">
          {logs.map(log => (
            <div key={log.id} className="log-row">
              <span className="log-time">{log.time}</span>
              <span className="log-svc">{log.service}</span>
              <span className="log-evt">{log.event}</span>
              <span className={`log-st ${log.status.toLowerCase()}`}>{log.status}</span>
              <span className="log-meta">{log.meta}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .int-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .int-head { display: flex; justify-content: space-between; align-items: center; }
        .int-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .int-head span { font-size: 13px; color: #94a3b8; }
        .btn-primary { padding: 12px 20px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .int-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .int-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px; transition: 0.3s; }
        .int-card:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        .int-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .int-icon { width: 44px; height: 44px; background: #f8fafc; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: #64748b; }
        .status-pill { padding: 4px 10px; border-radius: 20px; font-size: 10px; font-weight: 800; display: flex; align-items: center; gap: 6px; }
        .status-pill.connected { background: #f0fdf4; color: #10b981; }
        .status-pill.error { background: #fef2f2; color: #ef4444; }
        .int-main strong { font-size: 15px; color: #1e293b; display: block; margin-bottom: 2px; }
        .int-main span { font-size: 12px; color: #94a3b8; font-weight: 600; }
        .int-sync { font-size: 10px; color: #cbd5e1; margin-top: 4px; }
        .int-actions { display: flex; gap: 8px; align-items: center; padding-top: 10px; border-top: 1px solid #f1f5f9; }
        .btn-icon { width: 32px; height: 32px; border-radius: 8px; border: 1.5px solid #f1f5f9; background: white; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .btn-icon:hover { border-color: #3b82f6; color: #3b82f6; }
        .btn-icon.del { color: #ef4444; border-color: #fecaca; }
        .btn-icon.del:hover { background: #fef2f2; }
        .btn-text { background: transparent; border: none; font-size: 12px; font-weight: 700; color: #3b82f6; cursor: pointer; flex: 1; text-align: left; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .log-section { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .log-section h3 { font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        .log-table { display: flex; flex-direction: column; }
        .log-row { display: grid; grid-template-columns: 100px 140px 180px 80px 1fr; padding: 12px 16px; border-bottom: 1px solid #f8fafc; font-size: 12px; align-items: center; }
        .log-time { color: #94a3b8; font-family: monospace; }
        .log-svc { font-weight: 800; color: #475569; }
        .log-evt { color: #1e293b; }
        .log-st.success { color: #10b981; font-weight: 800; }
        .log-st.failed { color: #ef4444; font-weight: 800; }
        .log-meta { text-align: right; color: #64748b; font-weight: 700; }
        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-box { background: white; border-radius: 20px; width: 460px; padding: 24px; }
        .mb-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .mb-head h3 { font-size: 17px; font-weight: 800; color: #1e293b; }
        .mb-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .mf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .mf { display: flex; flex-direction: column; gap: 6px; }
        .mf.full { grid-column: 1 / -1; }
        .mf label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
        .mf input, .mf select { padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; outline: none; }
        .mf-foot { display: flex; justify-content: flex-end; margin-top: 16px; }
      `}</style>
    </div>
  );
};

export default Integrations;
