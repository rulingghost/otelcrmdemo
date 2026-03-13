import React, { useState } from 'react';
import { 
  Shield, Search, Plus, 
  Lock, Key, ShieldCheck,
  Activity, Terminal, Database,
  Cpu, HardDrive, RefreshCw,
  ChevronRight, MoreVertical, LayoutGrid,
  Settings, User, Bell,
  FileText, History, AlertTriangle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { motion } from 'framer-motion';

const auditLogs = [
  { time: '09:41 24.04', user: 'Manager_Elif', module: 'Rooms', log: 'Deluxe rooms \'da $220 USD $220 USD' },
  { time: '09:38 24.04', user: 'Resepsiyonist_Ahmet', module: 'Reservations', log: 'Deleted a reservation for room 302', type: 'delete' },
  { time: '09:01 24.04', user: 'Muhasebe_Yasin', module: 'POS & Satışlar', log: 'Invoiced $940 USD # 4 30.' },
  { time: '08:57 24.04', user: 'Teknik_Kerim', module: 'Enerji Yönetimi', log: 'Changed pool heating gap 33°C to 29°C' },
  { time: '08:32 24.04', user: 'Spa_Sedef_Suat', module: 'Spa & Wellness', log: 'Created a member.' },
  { time: '07:50 24.04', user: 'Marangoz_Selim', module: 'Employees', log: 'Added a new reserve.' },
];

const healthData = [
  { name: 'Server Load', val: 72, status: 'Normal' },
  { name: 'Database Health', val: 96, status: 'Optimal' },
];

const SystemAdmin = () => {
  return (
    <div className="admin-container">
      <header className="header">
         <div className="title-section">
            <Shield size={32} className="icon-blue"/>
            <div>
               <h2>System Administration & Audit Logs</h2>
               <span>Sistem yetkilendirme, işlem günlükleri ve siber güvenlik izleme</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><Plus size={18}/> YENİ KULLANICI TANIMLA</button>
            <button className="btn outline"><Key size={18}/> ŞİFRE SIFIRLA</button>
            <button className="btn primary red">CANLI MODA GEÇ</button>
         </div>
      </header>

      <div className="admin-grid">
         {/* Left: Permission Matrix */}
         <aside className="left-panel">
            <section className="card matrix-card">
               <h3>KULLANICI YETKİ MATRİSİ</h3>
               <div className="p-list">
                  <div className="p-item active">PanelAccess <ShieldCheck size={14} className="green"/></div>
                  <div className="p-item active">Reservations <ShieldCheck size={14} className="green"/></div>
                  <div className="p-item">POS & Satışlar</div>
                  <div className="p-item">Yorumlar & NPS</div>
                  <div className="p-item active">Kanal Yönetimi <ShieldCheck size={14} className="green"/></div>
                  <div className="p-item active">Bina <ShieldCheck size={14} className="green"/></div>
               </div>
               <button className="link-btn mt-20">Veri Yetkilendirme <ChevronRight size={14}/></button>
            </section>
         </aside>

         {/* Center: System Logs */}
         <section className="main-content">
            <div className="card logs-card">
               <div className="l-head">
                  <h3>SİSTEM İŞLEM GÜNLÜĞÜ</h3>
                  <div className="l-actions">
                     <button className="icon-btn"><Search size={14}/></button>
                     <button className="icon-btn"><RefreshCw size={14}/></button>
                  </div>
               </div>
               <table className="logs-table">
                  <thead>
                     <tr>
                        <th>Zaman</th>
                        <th>Kullanıcı</th>
                        <th>Modül</th>
                        <th>İşlem</th>
                     </tr>
                  </thead>
                  <tbody>
                     {auditLogs.map((l, i) => (
                       <tr key={i} className={l.type === 'delete' ? 'warning-row' : ''}>
                          <td>{l.time}</td>
                          <td><strong>{l.user}</strong></td>
                          <td><span className="mod-badge">{l.module}</span></td>
                          <td>{l.log}</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            
            <div className="admin-footer mt-20">
               <span>Aktif Kullanıcı : <strong>42</strong></span>
               <span>Uptime: <strong>99.9%</strong></span>
            </div>
         </section>

         {/* Right: Security Health */}
         <aside className="right-panel">
            <section className="card health-card">
               <h3>GÜVENLİK DURUMU</h3>
               <div className="gauge-list">
                  {healthData.map((h, i) => (
                    <div key={i} className="gauge-item">
                       <div className="g-head">
                          <Activity size={14}/>
                          <span>{h.name}</span>
                       </div>
                       <div className="g-val">
                          <strong>{h.val} %</strong>
                          <span>{h.status}</span>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="backup-status mt-20">
                  <div className="b-head">
                     <ShieldCheck size={14} className="green"/>
                     <span>Backup Status: Success</span>
                  </div>
                  <div className="progress-bar">
                     {Array.from({length: 15}).map((_, i) => (
                       <div key={i} className="bar active"></div>
                     ))}
                  </div>
               </div>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .admin-container {
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

        .actions { display: flex; gap: 10px; }
        .btn { padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; display: flex; align-items: center; gap: 8px; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #1e293b; }
        .btn.primary.red { background: #ef4444; color: white; }

        .admin-grid { display: grid; grid-template-columns: 240px 1fr 280px; gap: 30px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; margin-bottom: 25px; letter-spacing: 0.5px; }

        .p-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; font-size: 13px; font-weight: 700; color: #64748b; border-bottom: 1px solid #f8fafc; cursor: pointer; }
        .p-item:hover { background: #f8fafc; }
        .p-item.active { color: #1e293b; }

        .l-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; cursor: pointer; color: #94a3b8; display: flex; align-items: center; justify-content: center; }

        .logs-table { width: 100%; border-collapse: collapse; }
        .logs-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; text-transform: uppercase; }
        .logs-table td { padding: 15px 12px; font-size: 12px; border-bottom: 1px solid #f8fafc; color: #475569; }
        .mod-badge { font-size: 10px; font-weight: 900; background: #eff6ff; color: #3b82f6; padding: 2px 8px; border-radius: 4px; }
        .warning-row { background: #fffbeb; }

        .gauge-item { margin-bottom: 25px; }
        .g-head { display: flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 800; color: #94a3b8; margin-bottom: 10px; }
        .g-val { display: flex; justify-content: space-between; align-items: flex-end; }
        .g-val strong { font-size: 24px; color: #1e293b; }
        .g-val span { font-size: 11px; color: #10b981; font-weight: 900; }

        .backup-status .b-head { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; margin-bottom: 15px; }
        .progress-bar { display: flex; gap: 4px; }
        .bar { flex: 1; height: 12px; background: #f1f5f9; border-radius: 2px; }
        .bar.active { background: #10b981; }

        .link-btn { border: none; background: transparent; color: #3b82f6; font-size: 12px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 5px; }
        .green { color: #10b981; }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
};

export default SystemAdmin;
