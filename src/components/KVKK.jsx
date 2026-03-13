import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, Eye, 
  FileText, History, UserCheck,
  AlertCircle, CheckCircle, Info,
  Key, Shield, Settings, Download
} from 'lucide-react';
import { motion } from 'framer-motion';

const accessLogs = [
  { time: '14:20:05', user: 'Admin_Alp', event: 'Guest Data Decrypted', target: 'John Doe (PII)', status: 'Authorized' },
  { time: '14:15:32', user: 'FrontDesk_Elif', event: 'ID Scanning', target: 'Alice W.', status: 'Authorized' },
  { time: '13:58:12', user: 'Unknown_IP', event: 'Failed Login Attempt', target: 'Finance_Module', status: 'Blocked' },
  { time: '12:45:00', user: 'System', event: 'Routine Backup Encryption', target: 'DB_Cloud_01', status: 'Success' },
];

const KVKK = () => {
  return (
    <div className="kvkk-container">
      <header className="header">
         <div className="title-section">
            <ShieldCheck size={32} className="icon-blue"/>
            <div>
               <h2>KVKK & Data Security Management</h2>
               <span>Kişisel verilerin korunması, izinli pazarlama ve erişim logları</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><History size={18}/> ERİŞİM RAPORU</button>
            <button className="btn primary"><Lock size={18}/> GÜVENLİK AYARLARI</button>
         </div>
      </header>

      <div className="kvkk-grid">
         {/* Compliance Status Cards */}
         <section className="status-row">
            <div className="card status-card">
               <div className="s-head">
                  <UserCheck size={24} className="green"/>
                  <h3>Açık Rıza Oranı</h3>
               </div>
               <strong>84.2%</strong>
               <div className="p-bar"><div className="fill" style={{ width: '84.2%' }}></div></div>
            </div>
            <div className="card status-card">
               <div className="s-head">
                  <Shield size={24} className="blue"/>
                  <h3>Veri Maskeleme</h3>
               </div>
               <strong>AKTİF</strong>
               <p>Kredi kartı ve TCKN maskeleniyor.</p>
            </div>
            <div className="card status-card">
               <div className="s-head">
                  <Lock size={24} className="purple"/>
                  <h3>Şifreleme Standartı</h3>
               </div>
               <strong>AES-256</strong>
               <p>Tüm misafir verisi uçtan uca şifreli.</p>
            </div>
         </section>

         {/* Access Logs Table */}
         <section className="card list-section">
            <div className="section-header">
               <h3>KRİTİK VERİ ERİŞİM LOGLARI (CANLI)</h3>
               <div className="badge pulse">Live Monitoring</div>
            </div>
            <table className="kvkk-table">
               <thead>
                  <tr>
                     <th>Zaman Damgası</th>
                     <th>Kullanıcı</th>
                     <th>İşlem Tipi</th>
                     <th>Hedef / Nesne</th>
                     <th>Durum</th>
                  </tr>
               </thead>
               <tbody>
                  {accessLogs.map((log, idx) => (
                    <tr key={idx}>
                       <td className="time">{log.time}</td>
                       <td><strong>{log.user}</strong></td>
                       <td>{log.event}</td>
                       <td><span className="target-pill">{log.target}</span></td>
                       <td>
                          <span className={`status-pill ${log.status.toLowerCase()}`}>
                             {log.status === 'Authorized' ? <CheckCircle size={12}/> : log.status === 'Blocked' ? <AlertCircle size={12}/> : <Info size={12}/>}
                             {log.status}
                          </span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </section>

         {/* KVKK Sidebar */}
         <aside className="kvkk-sidebar">
            <div className="card consent-card">
               <h3>PAZARLAMA İZİNLERİ</h3>
               <div className="c-item">
                  <span>E-Posta İzni</span>
                  <strong>6.420</strong>
               </div>
               <div className="c-item">
                  <span>SMS İzni</span>
                  <strong>4.180</strong>
               </div>
               <div className="c-item">
                  <span>Arama İzni</span>
                  <strong>1.250</strong>
               </div>
               <button className="btn-full primary mt-20">İZİN MODALİ OLUŞTUR</button>
            </div>

            <div className="alert-box mt-20">
               <AlertCircle size={20} className="red"/>
               <div>
                  <strong>KRİTİK UYARI</strong>
                  <p>12 misafirin açık rıza formu eksik. Manuel check-in yasak.</p>
               </div>
            </div>
         </aside>
      </div>

      <style jsx>{`
        .kvkk-container {
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
        .btn { padding: 12px 24px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; border: none; font-size: 14px; }
        .btn.primary { background: #1e293b; color: white; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .kvkk-grid { display: grid; grid-template-columns: 1fr 300px; gap: 30px; }

        .status-row { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .status-card { padding: 25px; border-radius: 20px; border: 1px solid #e2e8f0; }
        .s-head { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; }
        .s-head h3 { font-size: 14px; font-weight: 800; color: #64748b; }
        .status-card strong { font-size: 28px; font-weight: 900; color: #1e293b; display: block; margin-bottom: 10px; }
        .status-card p { font-size: 12px; color: #94a3b8; font-weight: 600; }
        
        .p-bar { width: 100%; height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
        .p-bar .fill { height: 100%; background: #10b981; }

        .card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .section-header h3 { font-size: 14px; font-weight: 900; color: #1e293b; }
        
        .badge { background: #fef2f2; color: #ef4444; font-size: 10px; font-weight: 900; padding: 4px 10px; border-radius: 20px; }
        .pulse { animation: pulse 1.5s infinite; }

        .kvkk-table { width: 100%; border-collapse: collapse; }
        .kvkk-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; }
        .kvkk-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; }
        
        .time { font-family: monospace; color: #94a3b8; font-weight: 700; }
        .target-pill { background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; }

        .status-pill { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 800; }
        .status-pill.authorized { color: #10b981; }
        .status-pill.blocked { color: #ef4444; }

        .c-item { display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #f8fafc; padding-bottom: 10px; }
        .c-item span { font-size: 13px; color: #64748b; font-weight: 600; }
        .c-item strong { font-size: 14px; color: #1e293b; font-weight: 900; }

        .btn-full { width: 100%; padding: 12px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; }
        .btn-full.primary { background: #3b82f6; color: white; }

        .alert-box { background: #fef2f2; border: 1px solid #fee2e2; border-radius: 16px; padding: 15px; display: flex; gap: 15px; }
        .alert-box strong { font-size: 13px; color: #ef4444; display: block; margin-bottom: 5px; }
        .alert-box p { font-size: 12px; color: #ef4444; line-height: 1.4; }

        .green { color: #10b981; }
        .blue { color: #3b82f6; }
        .purple { color: #8b5cf6; }
        .red { color: #ef4444; }

        @keyframes pulse {
           0% { opacity: 1; }
           50% { opacity: 0.5; }
           100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default KVKK;
