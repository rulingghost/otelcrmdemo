import React from 'react';
import { 
  Server, Cpu, Database, Activity, 
  ShieldCheck, Cloud, HardDrive, 
  Search, Plus, RefreshCw, 
  ChevronRight, MoreVertical,
  Cpu as CpuIcon, Terminal, AlertTriangle,
  Send, Trash2, Settings, User
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { motion } from 'framer-motion';

const performanceData = [
  { time: '09:00', cpu: 34, ram: 56, disk: 45 },
  { time: '10:00', cpu: 45, ram: 58, disk: 50 },
  { time: '11:00', cpu: 30, ram: 62, disk: 48 },
  { time: '12:00', cpu: 55, ram: 65, disk: 55 },
  { time: '13:00', cpu: 34, ram: 56, disk: 45 },
];

const queries = [
  { pid: 3948, user: 'Ali Yılmaz', type: 'SELECT', table: 'guests', time: '4.02 s', status: 'Running' },
  { pid: 4200, user: 'Elif Demir', type: 'UPDATE', table: 'reservations', time: '3.58 s', status: 'Running' },
  { pid: 5571, user: 'Hasan Kaya', type: 'INSERT', table: 'logs', time: '2.19 s', status: 'Running' },
  { pid: 6055, user: 'Murat Yıldız', type: 'SELECT', table: 'room_rates', time: '1.35 s', status: 'Running' },
  { pid: 6715, user: 'Gülay Can', type: 'SELECT', table: 'bookings', time: '1.04 s', status: 'Running' },
  { pid: 6812, user: 'Fatin Şan', type: 'SELECT', table: 'room_rates', time: '5.00 s', status: 'Running' },
];

const userSessions = [
  { name: 'Night_Auditor', role: 'Front Desk', idle: '8 min 32 sec' },
  { name: 'Beth.Bellman', role: 'MICROS SQL', idle: '3 min 05 sec' },
  { name: 'John Houseman', role: 'Housekeeping', idle: '9 min 39 sec' },
];

const ITInfrastructure = () => {
  return (
    <div className="it-container">
      <header className="header">
         <div className="title-section">
            <Server size={32} className="icon-blue"/>
            <div>
               <h2>IT Infrastructure & Database Health</h2>
               <span>Sunucu performansı, veritabanı sorgu izleme ve sistem sağlığı</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline">DATABASE OPTIMIZE</button>
            <button className="btn outline">SYSTEM REBOOT</button>
            <button className="btn primary blue">EXPORT DB LOGS</button>
         </div>
      </header>

      <div className="it-grid">
         {/* Left: Storage & Backups */}
         <aside className="left-panel">
            <section className="card storage-card">
               <h3>STORAGE & BACKUPS</h3>
               <div className="s-list">
                  <div className="s-item">
                     <Cloud size={16} className="blue"/>
                     <span>Cloud Storage</span>
                     <div className="badge blue">253 GB</div>
                  </div>
                  <div className="s-item mt-10">
                     <HardDrive size={16} className="gray"/>
                     <span>Local Server</span>
                     <div className="badge green">SYNCED</div>
                  </div>
               </div>
               <button className="btn-full mt-20">Yedek Ara...</button>
            </section>
         </aside>

         {/* Center: Server Performance & Quaries */}
         <section className="main-content">
            <div className="perf-grid">
               <div className="card perf-card">
                  <div className="p-head">
                     <div className="h-text">
                        <span>CPU</span>
                        <strong>34%</strong>
                     </div>
                  </div>
                  <div style={{ height: 120 }}>
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                           <defs>
                              <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                 <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <Area type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCpu)" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </div>
               <div className="card perf-card">
                  <div className="p-head">
                     <div className="h-text">
                        <span>RAM</span>
                        <strong>56%</strong>
                     </div>
                  </div>
                  <div style={{ height: 120 }}>
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                           <defs>
                              <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                 <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <Area type="monotone" dataKey="ram" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRam)" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </div>
               <div className="card perf-card">
                  <div className="p-head">
                     <div className="h-text">
                        <span>Disk I/O</span>
                        <strong>178 RE/s</strong>
                     </div>
                  </div>
                  <div style={{ height: 120 }}>
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                           <defs>
                              <linearGradient id="colorDisk" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                                 <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <Area type="monotone" dataKey="disk" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorDisk)" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>

            <div className="card query-card mt-20">
               <h3>DATABASE QUERY MONITOR</h3>
               <table className="query-table">
                  <thead>
                     <tr>
                        <th>PID</th>
                        <th>User</th>
                        <th>Type</th>
                        <th>Table</th>
                        <th>Time</th>
                        <th>Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     {queries.map((q, i) => (
                       <tr key={i}>
                          <td>{q.pid}</td>
                          <td><strong>{q.user}</strong></td>
                          <td><span className="type-badge">{q.type}</span></td>
                          <td>{q.table}</td>
                          <td>{q.time}</td>
                          <td>
                             <div className="status-cell">
                                <CheckCircle size={14} className="green"/>
                                {q.status}
                             </div>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </section>

         {/* Right: User Sessions & Alerts */}
         <aside className="right-panel">
            <section className="card sessions-card">
               <div className="s-head">
                  <h3>ALL USER SESSIONS</h3>
                  <span>UPTIME: 99.99%</span>
               </div>
               <div className="session-list">
                  {userSessions.map((s, i) => (
                    <div key={i} className="session-item">
                       <div className="avatar">{s.name.charAt(0)}</div>
                       <div className="s-info">
                          <strong>{s.name}</strong>
                          <span>{s.role} • Idle: {s.idle}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            <div className="alert-box error mt-20">
               <AlertTriangle size={20}/>
               <div className="a-text">
                  <strong>LATENCY ALERT</strong>
                  <span>+200ms latency Node DB03</span>
               </div>
            </div>
         </aside>
      </div>

      <style jsx>{`
        .it-container {
          padding: 30px;
          background: #f8fafc;
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
        .btn { padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }
        .btn.primary.blue { background: #1e293b; color: white; }

        .it-grid { display: grid; grid-template-columns: 240px 1fr 280px; gap: 30px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; margin-bottom: 20px; letter-spacing: 0.5px; }

        .perf-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .p-head { margin-bottom: 15px; }
        .h-text span { font-size: 10px; color: #94a3b8; font-weight: 800; display: block; }
        .h-text strong { font-size: 20px; color: #1e293b; }

        .query-table { width: 100%; border-collapse: collapse; }
        .query-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; text-transform: uppercase; }
        .query-table td { padding: 15px 12px; font-size: 12px; border-bottom: 1px solid #f8fafc; color: #475569; }
        .type-badge { font-size: 9px; font-weight: 900; background: #eff6ff; color: #3b82f6; padding: 2px 6px; border-radius: 4px; }
        .status-cell { display: flex; align-items: center; gap: 6px; font-weight: 700; color: #10b981; }

        .session-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f8fafc; }
        .avatar { width: 32px; height: 32px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px; border: 2px solid white; }
        .s-info { display: flex; flex-direction: column; }
        .s-info strong { font-size: 12px; color: #1e293b; }
        .s-info span { font-size: 10px; color: #94a3b8; }

        .alert-box.error { background: #ef4444; color: white; padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px; box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.4); }
        .a-text { display: flex; flex-direction: column; }
        .a-text strong { font-size: 13px; font-weight: 900; }
        .a-text span { font-size: 11px; opacity: 0.9; }

        .s-item { display: flex; align-items: center; gap: 10px; font-size: 12px; }
        .badge { font-size: 9px; font-weight: 900; padding: 2px 6px; border-radius: 4px; margin-left: auto; }
        .badge.blue { background: #eff6ff; color: #3b82f6; }
        .badge.green { background: #ecfdf5; color: #10b981; }

        .btn-full { width: 100%; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 11px; font-weight: 700; color: #64748b; cursor: pointer; }

        .blue { color: #3b82f6; }
        .green { color: #10b981; }
        .gray { color: #94a3b8; }
        .mt-20 { margin-top: 20px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default ITInfrastructure;
