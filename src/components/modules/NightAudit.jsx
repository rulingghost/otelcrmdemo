import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion } from 'framer-motion';
import {
  Moon, CheckCircle, AlertCircle, TrendingUp,
  Bed, DollarSign, BarChart3, ArrowRight, Loader
} from 'lucide-react';

const AUDIT_STEPS = [
  { id:1, name:'Açık Folio Kontrolü',     desc:'Tüm açık hesaplar kontrol ediliyor...' },
  { id:2, name:'Gece Sayacı',              desc:'Geceler bir ileri alınıyor...' },
  { id:3, name:'Oda Durumu Raporu',        desc:'Tüm oda durumları raporlanıyor...' },
  { id:4, name:'Gelir Kaydı',              desc:'Günlük gelir muhasebe sistemine işleniyor...' },
  { id:5, name:'KBS Bildirim Kontrolü',    desc:'Polis listesi son kez kontrol ediliyor...' },
  { id:6, name:'Yedekleme',                desc:'Veriler yedekleniyor...' },
];

const NightAudit = () => {
  const { reservations, rooms, stats, cashTransactions, addNotification } = useHotel();
  const [running, setRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [done, setDone] = useState(false);

  const today = '2026-03-14';
  const todayTx = cashTransactions.filter(t=>t.date===today);
  const totalGelir = todayTx.filter(t=>t.type==='gelir').reduce((s,t)=>s+t.amount,0);
  const totalGider = todayTx.filter(t=>t.type==='gider').reduce((s,t)=>s+t.amount,0);
  const openFolios = reservations.filter(r=>r.status==='check-in'&&r.balance>0);

  const runAudit = async () => {
    setRunning(true);
    setCompletedSteps([]);
    setDone(false);
    for (let i=0; i<AUDIT_STEPS.length; i++) {
      await new Promise(r=>setTimeout(r,900));
      setCompletedSteps(p=>[...p, AUDIT_STEPS[i].id]);
    }
    setRunning(false);
    setDone(true);
    addNotification({ type:'success', msg:'Gece Raporu başarıyla tamamlandı!' });
  };

  const currentStep = running ? AUDIT_STEPS.find(s=>!completedSteps.includes(s.id)) : null;

  return (
    <div className="na-container">
      <div className="na-header">
        <div>
          <h2><Moon size={22}/> Gece Raporu (Night Audit)</h2>
          <span>{today} tarihli gece sonu kapanış işlemi</span>
        </div>
        {!running && !done && (
          <button className="btn-start" onClick={runAudit}>
            <Moon size={16}/> Gece Raporunu Başlat
          </button>
        )}
        {done && (
          <button className="btn-start green" onClick={()=>{setDone(false);setCompletedSteps([]); }}>
            ✓ Tamamlandı — Yeni Rapor
          </button>
        )}
      </div>

      {/* Pre-audit summary */}
      <div className="na-summary">
        <div className="ns-card">
          <DollarSign size={20} color="#10b981"/>
          <div><strong>₺{totalGelir.toLocaleString()}</strong><span>Günlük Gelir</span></div>
        </div>
        <div className="ns-card">
          <TrendingUp size={20} color="#3b82f6"/>
          <div><strong>%{stats.occupancyRate}</strong><span>Doluluk Oranı</span></div>
        </div>
        <div className="ns-card">
          <Bed size={20} color="#8b5cf6"/>
          <div><strong>{stats.inHouse}</strong><span>İç Misafir</span></div>
        </div>
        <div className="ns-card">
          <AlertCircle size={20} color={openFolios.length>0?'#ef4444':'#10b981'}/>
          <div>
            <strong style={{color:openFolios.length>0?'#ef4444':'#10b981'}}>{openFolios.length}</strong>
            <span>Açık Folio</span>
          </div>
        </div>
      </div>

      {openFolios.length>0 && (
        <div className="open-folio-warn">
          <AlertCircle size={18}/>
          <span>Gece raporunu başlatmadan önce {openFolios.length} açık folio kapatılmalıdır (Folio modülünde tahsilat alın).</span>
        </div>
      )}

      {/* Steps */}
      <div className="na-steps">
        <h3>İşlem Adımları</h3>
        <div className="steps-list">
          {AUDIT_STEPS.map(s => {
            const isComplete = completedSteps.includes(s.id);
            const isCurrent  = currentStep?.id === s.id;
            return (
              <motion.div key={s.id} className={`audit-step ${isComplete?'done':''} ${isCurrent?'running':''}`}>
                <div className="as-icon">
                  {isComplete ? <CheckCircle size={20} color="#10b981"/> :
                   isCurrent  ? <Loader size={20} color="#3b82f6" className="spin"/> :
                   <div className="as-num">{s.id}</div>}
                </div>
                <div className="as-info">
                  <strong>{s.name}</strong>
                  {isCurrent && <span>{s.desc}</span>}
                  {isComplete && <span className="done-label">Tamamlandı ✓</span>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {done && (
        <motion.div className="na-done" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
          <CheckCircle size={48} color="#10b981"/>
          <div>
            <h3>Gece Raporu Başarıyla Tamamlandı!</h3>
            <p>{today} tarihli kapanış kaydedildi. Sistem yeni güne hazır.</p>
          </div>
        </motion.div>
      )}

      <style>{`
        .na-container { padding:28px; display:flex; flex-direction:column; gap:22px; max-width:900px; }
        .na-header { display:flex; justify-content:space-between; align-items:flex-start; }
        .na-header h2 { font-size:22px; font-weight:800; color:#1e293b; display:flex; align-items:center; gap:10px; }
        .na-header span { font-size:13px; color:#94a3b8; }
        .btn-start { padding:12px 22px; border-radius:12px; border:none; background:#1e293b; color:white; font-size:14px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; }
        .btn-start.green { background:#10b981; }

        .na-summary { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .ns-card { background:white; border-radius:16px; border:1px solid #e2e8f0; padding:18px; display:flex; align-items:center; gap:14px; }
        .ns-card strong { display:block; font-size:22px; font-weight:900; color:#1e293b; }
        .ns-card span { font-size:12px; color:#94a3b8; font-weight:700; }

        .open-folio-warn { display:flex; align-items:center; gap:10px; background:#fffbeb; color:#b45309; padding:14px 18px; border-radius:12px; border:1px solid #fde68a; font-size:13px; font-weight:600; }

        .na-steps { background:white; border-radius:20px; border:1px solid #e2e8f0; padding:24px; }
        .na-steps h3 { font-size:16px; font-weight:800; color:#1e293b; margin-bottom:16px; }
        .steps-list { display:flex; flex-direction:column; gap:10px; }

        .audit-step { display:flex; align-items:center; gap:16px; padding:14px 18px; border-radius:14px; background:#f8fafc; border:1.5px solid transparent; transition:0.3s; }
        .audit-step.done { background:#f0fdf4; border-color:#bbf7d0; }
        .audit-step.running { background:#eff6ff; border-color:#93c5fd; }

        .as-icon { flex-shrink:0; }
        .as-num { width:28px; height:28px; background:#e2e8f0; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:900; color:#94a3b8; }
        .as-info strong { display:block; font-size:14px; font-weight:700; color:#1e293b; }
        .as-info span { font-size:12px; color:#64748b; }
        .done-label { color:#10b981 !important; font-weight:700; }

        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        .na-done { display:flex; align-items:center; gap:20px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:16px; padding:24px 28px; }
        .na-done h3 { font-size:18px; font-weight:800; color:#10b981; margin-bottom:4px; }
        .na-done p { font-size:13px; color:#64748b; }
      `}</style>
    </div>
  );
};

export default NightAudit;
