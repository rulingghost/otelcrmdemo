import React, { useState, useEffect } from 'react';
import { 
  Moon, Search, Plus, 
  CheckCircle, AlertCircle, 
  ChevronRight, Circle, 
  BarChart3, Settings, 
  LayoutDashboard, ClipboardList,
  Mail, Printer, MoreVertical,
  Zap, Database, Bell,
  RefreshCw, Rocket, FileText,
  Clock, Shield, ArrowRight, X,
  FileCheck, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const auditSteps = [
  { id: 1, name: 'Folio Posting', desc: 'Misafir odalarına konaklama ücretleri basılıyor...', status: 'waiting' },
  { id: 2, name: 'Kasa Mutabakatı', desc: 'Günlük nakit ve POS işlemleri kontrol ediliyor...', status: 'waiting' },
  { id: 3, name: 'Emniyet (KBS) Kontrol', desc: 'Kimlik bildirim sistemi verileri doğrulanıyor...', status: 'waiting' },
  { id: 4, name: 'Rapor Oluşturma', desc: 'ADR, RevPAR ve Doluluk raporları hazırlanıyor...', status: 'waiting' },
  { id: 5, name: 'Tarih Değişimi', desc: 'Sistem tarihi bir sonraki güne atlatılıyor...', status: 'waiting' },
];

const auditLogs = [
  { time: '01:41 24.04', user: 'System_Auto', module: 'Rooms', desc: 'Night rates applied for 184 rooms.' },
  { time: '01:38 24.04', user: 'Audit_Manager', module: 'Billing', desc: 'Settled daily POS revenue to accounting.' },
  { time: '01:05 24.04', user: 'System_Auto', module: 'Integration', desc: 'GIB E-Invoice batch 402 processed.' },
  { time: '00:57 24.04', user: 'Night_Shift', module: 'Maintenance', desc: 'Resolved pending laundry requests.' },
];

const NightAudit = () => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const startAudit = () => {
    setIsAuditing(true);
    setCurrentStep(1);
    setIsDone(false);
  };

  useEffect(() => {
    if (isAuditing && currentStep > 0 && currentStep <= auditSteps.length) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            if (currentStep < auditSteps.length) {
              setCurrentStep(currentStep + 1);
              return 0;
            } else {
              setIsAuditing(false);
              setIsDone(true);
              return 100;
            }
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isAuditing, currentStep]);

  return (
    <div className="audit-container">
      <header className="header">
         <div className="title-section">
            <Moon size={32} className="icon-blue"/>
            <div>
               <h2>Night Audit & Gün Kapatma</h2>
               <span>Konaklama basımı, gelir muhasebeleştirme ve gün sonu işlemleri</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><Printer size={18}/> ÖN İZLEME RAPORU</button>
            <button className="btn primary purple" onClick={startAudit} disabled={isAuditing}>
               <Rocket size={18}/> {isAuditing ? 'İŞLENİYOR...' : ' audit SÜRECİNİ BAŞLAT'}
            </button>
         </div>
      </header>

      <div className="audit-grid">
         {/* Left: Auto-check Checklist */}
         <aside className="left-panel">
            <section className="card steps-card">
               <div className="sh">
                  <h3>AUDIT ADIMLARI</h3>
                  {isAuditing && <RefreshCw size={16} className="spin blue"/>}
               </div>
               <div className="steps-list">
                  {auditSteps.map((step, i) => (
                    <div key={i} className={`step-item ${currentStep === step.id ? 'active' : currentStep > step.id || isDone ? 'completed' : ''}`}>
                       <div className="s-icon">
                          {currentStep > step.id || isDone ? <CheckCircle size={14}/> : <Circle size={14}/>}
                       </div>
                       <div className="s-info">
                          <strong>{step.name}</strong>
                          <p>{step.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
         </aside>

         {/* Center: Live Processing / Logs */}
         <section className="main-content">
            <div className="card processing-card">
               {isAuditing ? (
                 <div className="audit-progress-view">
                    <div className="big-loader">
                       <svg width="200" height="200">
                          <circle cx="100" cy="100" r="90" fill="transparent" stroke="#f1f5f9" strokeWidth="15" />
                          <circle cx="100" cy="100" r="90" fill="transparent" stroke="#8b5cf6" strokeWidth="15" 
                                  strokeDasharray="565" strokeDashoffset={565 - (565 * progress / 100)} 
                                  style={{ transition: 'stroke-dashoffset 0.1s linear' }} />
                       </svg>
                       <div className="loader-text">
                          <strong>%{progress}</strong>
                          <span>Adım {currentStep}/5</span>
                       </div>
                    </div>
                    <div className="status-text">
                       <h3>{auditSteps[currentStep - 1]?.name}</h3>
                       <p>Lütfen sistemi kapatmayın ve müdahale etmeyin.</p>
                    </div>
                 </div>
               ) : isDone ? (
                 <div className="audit-success-view">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                       <ShieldCheck size={80} className="green"/>
                    </motion.div>
                    <h2>Gün Kapama Başarılı!</h2>
                    <p>Sistem tarihi <strong>25.04.2024</strong> olarak güncellendi.</p>
                    <div className="success-actions">
                       <button className="btn outline"><FileText size={16}/> Günlük Mizan</button>
                       <button className="btn outline"><FileText size={16}/> F&B Cost Raporu</button>
                    </div>
                 </div>
               ) : (
                 <>
                    <div className="section-header">
                       <h3>SİSTEM AUDİT LOGLARI</h3>
                       <div className="filters">Tüm Kayıtlar <ChevronRight size={14}/></div>
                    </div>
                    <table className="log-table">
                       <thead>
                          <tr>
                             <th>Zaman</th>
                             <th>Modül</th>
                             <th>Kullanıcı</th>
                             <th>İşlem Detayı</th>
                          </tr>
                       </thead>
                       <tbody>
                          {auditLogs.map((log, i) => (
                            <tr key={i}>
                               <td><div className="t-badge">{log.time}</div></td>
                               <td><span className="m-badge">{log.module}</span></td>
                               <td><strong>{log.user}</strong></td>
                               <td>{log.desc}</td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                    <div className="alert-box warn mt-20">
                       <AlertCircle size={20}/>
                       <div>
                          <strong>Dikkat:</strong> Gün sonu öncesi 12 departman mizanının eşleştiğinden emin olun.
                       </div>
                    </div>
                 </>
               )}
            </div>
         </section>

         {/* Right: Snapshot Summary */}
         <aside className="right-panel">
            <section className="card snap-card">
               <h3>SNAPSHOT (ANLIK ÖZET)</h3>
               <div className="metrics mt-20">
                  <div className="metric">
                     <div className="m-head"><span>BEKLENEN GELİR</span><strong>₺ 142,500</strong></div>
                     <div className="p-bar"><div className="p-fill blue" style={{ width: '82%' }}></div></div>
                  </div>
                  <div className="metric mt-20">
                     <div className="m-head"><span>TAHSİL EDİLEN</span><strong>₺ 118,200</strong></div>
                     <div className="p-bar"><div className="p-fill green" style={{ width: '64%' }}></div></div>
                  </div>
                  <div className="metric mt-20">
                     <div className="m-head"><span>CITY LEDGER</span><strong>₺ 24,300</strong></div>
                     <div className="p-bar"><div className="p-fill orange" style={{ width: '25%' }}></div></div>
                  </div>
               </div>
               
               <div className="audit-stats mt-30">
                  <div className="as-row"><span>Konaklayan Oda</span><strong>184</strong></div>
                  <div className="as-row"><span>Gelen Misafir</span><strong>42</strong></div>
                  <div className="as-row"><span>Kapanmayan Folio</span><strong>2</strong></div>
               </div>
            </section>

            <section className="card reports-card mt-20">
               <h3>OTOMATİK RAPORLAR</h3>
               <div className="rep-list">
                  <div className="rep-item"><Mail size={14}/> Yönetici Özeti (Daily)</div>
                  <div className="rep-item"><Mail size={14}/> Muhasebe Entegrasyon</div>
                  <div className="rep-item"><Mail size={14}/> Emniyet Listesi (XML)</div>
               </div>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .audit-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-blue { color: #8b5cf6; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { font-size: 14px; color: #64748b; }

        .btn { padding: 12px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; border: none; font-size: 13px; display: flex; align-items: center; gap: 10px; }
        .btn.primary.purple { background: #8b5cf6; color: white; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .audit-grid { display: grid; grid-template-columns: 280px 1fr 280px; gap: 30px; }

        .card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; letter-spacing: 1px; }

        .sh { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .steps-list { display: flex; flex-direction: column; gap: 15px; }
        .step-item { display: flex; gap: 15px; padding: 15px; border-radius: 15px; background: #f8fafc; transition: all 0.3s; }
        .step-item.active { background: #f5f3ff; border-left: 4px solid #8b5cf6; }
        .step-item.completed { background: #f0fdf4; }
        .step-item.completed .s-icon { color: #10b981; }
        .step-item.active .s-icon { color: #8b5cf6; }
        .s-info strong { display: block; font-size: 13px; color: #1e293b; }
        .s-info p { font-size: 11px; color: #94a3b8; margin-top: 4px; line-height: 1.4; }

        .log-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .log-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 2px solid #f1f5f9; }
        .log-table td { padding: 15px 12px; font-size: 13px; color: #475569; border-bottom: 1px solid #f8fafc; }
        .t-badge { background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-family: monospace; font-size: 11px; }
        .m-badge { background: #eff6ff; color: #3b82f6; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 4px; }

        .audit-progress-view { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 400px; text-align: center; }
        .big-loader { position: relative; width: 200px; height: 200px; margin-bottom: 30px; }
        .loader-text { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .loader-text strong { font-size: 32px; color: #1e293b; }
        .loader-text span { font-size: 12px; color: #94a3b8; font-weight: 700; }

        .audit-success-view { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 400px; text-align: center; animation: fadeIn 0.5s; }
        .audit-success-view h2 { margin-top: 20px; font-size: 24px; font-weight: 800; color: #1e293b; }
        .audit-success-view p { color: #64748b; margin-top: 10px; }
        .success-actions { display: flex; gap: 15px; margin-top: 30px; }

        .metrics .metric { display: flex; flex-direction: column; gap: 8px; }
        .m-head { display: flex; justify-content: space-between; font-size: 11px; font-weight: 800; }
        .m-head span { color: #94a3b8; }
        .m-head strong { color: #1e293b; }
        .p-bar { height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden; }
        .p-fill { height: 100%; border-radius: 10px; transition: width 0.5s; }
        .p-fill.blue { background: #3b82f6; }
        .p-fill.green { background: #10b981; }
        .p-fill.orange { background: #f59e0b; }

        .audit-stats { display: flex; flex-direction: column; gap: 12px; }
        .as-row { display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; color: #64748b; }
        .as-row strong { color: #1e293b; }

        .rep-list { display: flex; flex-direction: column; gap: 10px; margin-top: 15px; }
        .rep-item { display: flex; align-items: center; gap: 10px; padding: 12px; background: #f8fafc; border-radius: 10px; font-size: 12px; font-weight: 700; color: #475569; cursor: pointer; }
        .rep-item:hover { color: #3b82f6; border: 1px solid #3b82f615; }

        .alert-box { display: flex; align-items: center; gap: 15px; padding: 15px; border-radius: 12px; font-size: 13px; }
        .alert-box.warn { background: #fffbeb; color: #92400e; border: 1px solid #fef3c7; }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 2s linear infinite; }
        .blue { color: #3b82f6; }
        .green { color: #10b981; }
        .purple { color: #8b5cf6; }
        .orange { color: #f59e0b; }
        .mt-20 { margin-top: 20px; }
        .mt-30 { margin-top: 30px; }
        .mt-15 { margin-top: 15px; }
      `}</style>
    </div>
  );
};

export default NightAudit;
