import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Puzzle, Key, Webhook, Zap, 
  Settings, CheckCircle, XCircle, 
  Globe, Smartphone, CreditCard, Link2
} from 'lucide-react';

const Integrations = () => {
  const integrations = [
    { name: 'Stripe Global', type: 'Ödeme Sistemi', status: 'connected', icon: <CreditCard/> },
    { name: 'DoorLock System (Assa Abloy)', type: 'Kapı Kilit', status: 'connected', icon: <Key/> },
    { name: 'IPTV Connect', type: 'Eğlence', status: 'connected', icon: <Smartphone/> },
    { name: 'WhatsApp Business API', type: 'İletişim', status: 'error', icon: <Globe/> },
    { name: 'Police KBS Service', type: 'Resmi Bildirim', status: 'connected', icon: <Shield/> },
    { name: 'HotelRunner CM', type: 'Kanal Yöneticisi', status: 'connected', icon: <Link2/> },
  ];

  return (
    <div className="int-page">
      <div className="int-head">
        <div>
          <h2><Puzzle size={20}/> Entegrasyon Merkezi</h2>
          <span>Dış servisler, API bağlantıları ve IoT ekosistemi yönetimi</span>
        </div>
        <button className="btn-primary">Yeni Entegrasyon Ekle</button>
      </div>

      <div className="int-grid">
        {integrations.map((int, i) => (
          <motion.div 
            key={int.name} 
            className={`int-card ${int.status}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="int-top">
              <div className="int-icon">{int.icon}</div>
              <div className={`status-pill ${int.status}`}>
                {int.status === 'connected' ? <CheckCircle size={10}/> : <XCircle size={10}/>}
                {int.status === 'connected' ? 'Bağlı' : 'Hata'}
              </div>
            </div>
            <div className="int-main">
              <strong>{int.name}</strong>
              <span>{int.type}</span>
            </div>
            <div className="int-actions">
              <button className="btn-icon"><Settings size={14}/></button>
              <button className="btn-text">API Yapılandır</button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="log-section">
        <h3>Entegrasyon Günlükleri (Webhooks)</h3>
        <div className="log-table">
          {[
            { time: '14:45:12', service: 'DoorLock', event: 'Key Card Created', status: 'Success', room: '205' },
            { time: '14:40:05', service: 'Stripe', event: 'Payment Received', status: 'Success', meta: '₺450.00' },
            { time: '14:38:22', service: 'WhatsApp', event: 'Message Delivery', status: 'Failed', meta: 'API Error 403' },
            { time: '14:35:10', service: 'KBS', event: 'Guest Record Sent', status: 'Success', room: '101' },
          ].map((log, i) => (
            <div key={i} className="log-row">
              <span className="log-time">{log.time}</span>
              <span className="log-svc">{log.service}</span>
              <span className="log-evt">{log.event}</span>
              <span className={`log-st ${log.status.toLowerCase()}`}>{log.status}</span>
              <span className="log-meta">{log.room || log.meta}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .int-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .int-head { display: flex; justify-content: space-between; align-items: center; }
        .int-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .int-head span { font-size: 13px; color: #94a3b8; }
        
        .btn-primary { padding: 12px 20px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-weight: 700; font-size: 13px; cursor: pointer; }

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
        
        .int-actions { display: flex; gap: 10px; align-items: center; padding-top: 10px; border-top: 1px solid #f1f5f9; }
        .btn-icon { width: 32px; height: 32px; border-radius: 8px; border: 1.5px solid #f1f5f9; background: white; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .btn-text { background: transparent; border: none; font-size: 12px; font-weight: 700; color: #3b82f6; cursor: pointer; flex: 1; text-align: left; }

        .log-section { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .log-section h3 { font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        
        .log-table { display: flex; flex-direction: column; }
        .log-row { display: grid; grid-template-columns: 100px 120px 180px 100px 1fr; padding: 12px 16px; border-bottom: 1px solid #f8fafc; font-size: 12px; align-items: center; }
        .log-time { color: #94a3b8; font-family: monospace; }
        .log-svc { font-weight: 800; color: #475569; }
        .log-evt { color: #1e293b; }
        .log-st.success { color: #10b981; font-weight: 800; }
        .log-st.failed { color: #ef4444; font-weight: 800; }
        .log-meta { text-align: right; color: #64748b; font-weight: 700; }
      `}</style>
    </div>
  );
};

const Shield = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

export default Integrations;
