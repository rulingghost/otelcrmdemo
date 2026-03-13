import React, { useState } from 'react';
import { 
  Zap, Search, Plus, 
  Settings, Database, Smartphone,
  ShieldCheck, Lock, Phone,
  Tv, Cpu, Activity,
  CheckCircle, AlertCircle, ChevronRight,
  MoreVertical, RefreshCw, FileText,
  Key, Radio, Wifi, CreditCard,
  CloudLightning, HardDrive, Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const hardwareHealth = [
  { name: 'VingCard Driver', status: 'ONLINE', icon: <Lock size={16}/>, latency: '12ms' },
  { name: 'Salto Node 4', status: 'ONLINE', icon: <ShieldCheck size={16}/>, latency: '45ms' },
  { name: 'Cisco PBX Core', status: 'ONLINE', icon: <Phone size={16}/>, latency: '8ms' },
  { name: 'Samsung IPTV Server', status: 'ONLINE', icon: <Tv size={16}/>, latency: '120ms' },
  { name: 'Hotspot Gateway', status: 'ONLINE', icon: <Wifi size={16}/>, latency: '22ms' },
];

const integrationLogs = [
  { time: '14:41', system: 'Door Locks', module: 'Room 302', log: 'Dijital Anahtar (Digital Key) Gönderildi', status: 'success' },
  { time: '14:38', system: 'PBX', module: 'Extension 105', log: 'Dış Hat Araması Kaydedildi: +90 532...', status: 'success' },
  { time: '14:22', system: 'Hotspot', module: 'Guest WiFi', log: 'Auth: Mehmet Yılmaz (Room 102)', status: 'success' },
  { time: '13:58', system: 'IPTV', module: 'MiniBar Sync', log: 'POS Charge: 2x Water, 1x Coke (Room 205)', status: 'success' },
  { time: '13:45', system: 'Door Locks', module: 'Master Key', log: 'Kat Hizmetleri Girişi (Room 404)', status: 'info' },
  { time: '13:10', system: 'PBX', module: 'System', log: 'Uyandırma Servisi Başarılı (Room 120)', status: 'success' },
  { time: '12:45', system: 'Middleware', module: 'API Proxy', log: 'CRITICAL: Channel Sync Timeout (Expedia)', status: 'error' },
];

const Integrations = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  const startSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 3000);
  };

  return (
    <div className="int-container">
      <header className="header">
         <div className="title-section">
            <Cpu size={32} className="icon-blue"/>
            <div>
               <h2>Sistem Altyapısı & Donanım Entegrasyonları</h2>
               <span>Kapı kilitleri, santral (PBX), IPTV ve Hotspot haberleşme merkezi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><FileText size={18}/> API DOKÜMANTASYONU</button>
            <button className="btn primary blue" onClick={startSync} disabled={isSyncing}>
               <RefreshCw size={18} className={isSyncing ? 'spin' : ''}/>
               {isSyncing ? 'SENKRONİZE EDİLİYOR...' : 'SİSTEMLERİ YENİLE'}
            </button>
         </div>
      </header>

      <div className="int-grid">
         {/* System Drivers Categories */}
         <aside className="left-panel">
            <section className="card categories-card">
               <div className="search-box">
                  <Search size={16}/>
                  <input type="text" placeholder="Driver / Sürücü ara..." />
               </div>
               <h3>DONANIM DRIVERS</h3>
               <div className="cat-list">
                  <div className="cat-item active"><Lock size={14}/> Kapı Kilit (Doorlock)</div>
                  <div className="cat-item"><Phone size={14}/> Santral (PBX / TCP-IP)</div>
                  <div className="cat-item"><Tv size={14}/> IPTV / İnfo Sistemi</div>
                  <div className="cat-item"><Wifi size={14}/> İnternet (Hotspot)</div>
                  <div className="cat-item"><Radio size={14}/> Akıllı Oda (LUTRON)</div>
                  <div className="cat-item"><Database size={14}/> SQL Middleware</div>
               </div>
            </section>

            <section className="card resources-card mt-20">
               <h3>KAYNAK KULLANIMI</h3>
               <div className="res-item">
                  <div className="res-head"><span>CPU</span><strong>12%</strong></div>
                  <div className="p-bar"><div className="p-fill blue" style={{ width: '12%' }}></div></div>
               </div>
               <div className="res-item mt-15">
                  <div className="res-head"><span>RAM</span><strong>4.2 GB</strong></div>
                  <div className="p-bar"><div className="p-fill purple" style={{ width: '45%' }}></div></div>
               </div>
            </section>
         </aside>

         {/* Integration Log Center */}
         <section className="main-content">
            <div className="card log-card">
               <div className="l-header">
                  <div className="lh-title">
                     <Activity size={20} className="blue"/>
                     <h3>ANLIK HABERLEŞME LOGLARI</h3>
                  </div>
                  <div className="filters">
                     <span className="pill active">Tümü</span>
                     <span className="pill">Hatalar</span>
                     <span className="pill">Kilit</span>
                  </div>
               </div>
               <table className="log-table">
                  <thead>
                     <tr>
                        <th>Zaman</th>
                        <th>Sistem</th>
                        <th>Modül / Oda</th>
                        <th>Haberleşme Detayı</th>
                        <th>Durum</th>
                     </tr>
                  </thead>
                  <tbody>
                     {integrationLogs.map((l, i) => (
                       <tr key={i} className={l.status === 'error' ? 'error-row' : ''}>
                          <td><div className="t-badge">{l.time}</div></td>
                          <td><strong>{l.system}</strong></td>
                          <td>{l.module}</td>
                          <td className="log-text">{l.log}</td>
                          <td>
                             <span className={`status-pill ${l.status}`}>
                                {l.status === 'success' ? 'BAŞARILI' : l.status === 'error' ? 'FAILED' : 'INFO'}
                             </span>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="infra-grid mt-20">
               <div className="card mini-infra">
                  <CloudLightning size={24} className="orange"/>
                  <div className="mi-data">
                     <strong>Cloud Sync</strong>
                     <span>SQL Azure - Active</span>
                  </div>
               </div>
               <div className="card mini-infra">
                  <Server size={24} className="blue"/>
                  <div className="mi-data">
                     <strong>Lokal Proxy</strong>
                     <span>Edge Node 1 - OK</span>
                  </div>
               </div>
            </div>
         </section>

         {/* Health & Device Control */}
         <aside className="right-panel">
            <section className="card health-card">
               <div className="sh">
                  <h3>CİHAZ DURUMLARI</h3>
                  <div className="live-tag">LIVE</div>
               </div>
               <div className="h-list">
                  {hardwareHealth.map((h, i) => (
                    <div key={i} className="h-item">
                       <div className="h-main">
                          <div className="h-icon">{h.icon}</div>
                          <div className="h-info">
                             <strong>{h.name}</strong>
                             <span>Gecikme: {h.latency}</span>
                          </div>
                       </div>
                       <div className="h-status">
                          <div className="stat-dot green"></div>
                          <ChevronRight size={14} className="gray"/>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            <section className="card rapid-card mt-20">
               <h3>KAPI KİLİT KONTRÖLÜ</h3>
               <p>Seçili odaya anlık kapı kartı kodlama emri gönderin.</p>
               <div className="room-input mt-15">
                  <Lock size={16}/>
                  <input type="text" placeholder="Oda No (302...)" />
               </div>
               <button className="btn-full primary blue mt-15">
                  <Key size={18}/> KART KODLA / GÖNDER
               </button>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .int-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-blue { color: #3b82f6; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { font-size: 14px; color: #64748b; }

        .btn { padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; border: none; font-size: 13px; display: flex; align-items: center; gap: 10px; }
        .btn.primary.blue { background: #3b82f6; color: white; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .int-grid { display: grid; grid-template-columns: 280px 1fr 340px; gap: 30px; }

        .card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; letter-spacing: 1px; }

        .search-box { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 15px; border-radius: 10px; margin-bottom: 20px; }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 100%; }

        .cat-list { display: flex; flex-direction: column; gap: 5px; }
        .cat-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 10px; font-size: 13px; font-weight: 700; color: #64748b; cursor: pointer; }
        .cat-item.active { background: #eff6ff; color: #3b82f6; }

        .res-item .res-head { display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; margin-bottom: 8px; }
        .p-bar { height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden; }
        .p-fill { height: 100%; border-radius: 10px; }
        .p-fill.blue { background: #3b82f6; }
        .p-fill.purple { background: #8b5cf6; }

        .l-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .lh-title { display: flex; align-items: center; gap: 12px; }
        .filters { display: flex; gap: 10px; }
        .pill { font-size: 11px; font-weight: 800; padding: 6px 12px; border-radius: 20px; background: #f1f5f9; color: #64748b; cursor: pointer; }
        .pill.active { background: #3b82f6; color: white; }

        .log-table { width: 100%; border-collapse: collapse; }
        .log-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 2px solid #f1f5f9; text-transform: uppercase; }
        .log-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; }
        .error-row { background: #fff1f2; }
        .t-badge { background: #f1f5f9; font-family: monospace; font-size: 11px; padding: 4px 8px; border-radius: 6px; }
        .status-pill { font-size: 9px; font-weight: 900; padding: 2px 8px; border-radius: 4px; }
        .status-pill.success { background: #ecfdf5; color: #10b981; }
        .status-pill.error { background: #fee2e2; color: #dc2626; }
        .status-pill.info { background: #eff6ff; color: #3b82f6; }

        .infra-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .mini-infra { display: flex; align-items: center; gap: 15px; padding: 20px; }
        .mi-data strong { display: block; font-size: 14px; color: #1e293b; }
        .mi-data span { font-size: 11px; font-weight: 700; color: #94a3b8; }

        .sh { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .live-tag { font-size: 10px; font-weight: 900; color: #10b981; background: #ecfdf5; padding: 2px 8px; border-radius: 4px; }
        .h-item { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #f8fafc; }
        .h-main { display: flex; align-items: center; gap: 15px; }
        .h-icon { width: 36px; height: 36px; background: #f8fafc; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #3b82f6; }
        .h-info strong { display: block; font-size: 13px; color: #1e293b; }
        .h-info span { font-size: 10px; color: #94a3b8; font-weight: 700; }
        .stat-dot { width: 8px; height: 8px; border-radius: 50%; }
        .stat-dot.green { background: #10b981; box-shadow: 0 0 10px #10b981; }

        .rapid-card p { font-size: 13px; color: #64748b; line-height: 1.5; }
        .room-input { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 15px; border-radius: 12px; }
        .room-input input { background: transparent; border: none; outline: none; font-size: 15px; width: 100%; font-weight: 700; }
        .btn-full { width: 100%; padding: 15px; border-radius: 12px; font-weight: 800; font-size: 14px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .btn-full.primary.blue { background: #1e293b; color: white; }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 2s linear infinite; }
        .blue { color: #3b82f6; }
        .orange { color: #f59e0b; }
        .gray { color: #cbd5e1; }
        .mt-20 { margin-top: 20px; }
        .mt-15 { margin-top: 15px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default Integrations;
