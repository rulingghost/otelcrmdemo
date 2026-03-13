import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, Wifi, Cpu, Database, Shield, 
  Activity, Signal, HardDrive, RefreshCw, AlertTriangle 
} from 'lucide-react';

const ITInfrastructure = () => {
  const [refreshing, setRefreshing] = useState(false);

  const systems = [
    { name: 'Ana Sunucu (ERP)', status: 'online', load: 12, uptime: '142 gün', icon: <Server size={20}/> },
    { name: 'Banka Entegrasyon Geçidi', status: 'online', load: 5, uptime: '15 gün', icon: <Shield size={20}/> },
    { name: 'Wi-Fi Ağı (Misafir)', status: 'online', load: 68, uptime: '4 gün', icon: <Wifi size={20}/> },
    { name: 'Wi-Fi Ağı (Personel)', status: 'online', load: 42, uptime: '4 gün', icon: <Wifi size={20}/> },
    { name: 'Veritabanı (Azure)', status: 'warning', load: 85, uptime: '240 gün', icon: <Database size={20}/> },
    { name: 'Yedekleme Ünitesi (NAS)', status: 'online', load: 2, uptime: '12 gün', icon: <HardDrive size={20}/> },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="it-page">
      <div className="it-head">
        <div>
          <h2><Activity size={20}/> IT Altyapı & Sistem İzleme</h2>
          <span>Donanım, ağ ve yazılım servislerinin gerçek zamanlı durumu</span>
        </div>
        <button className={`btn-refresh ${refreshing ? 'spin' : ''}`} onClick={handleRefresh}>
          <RefreshCw size={15}/> 
        </button>
      </div>

      <div className="it-grid">
        {/* Sistem Kartları */}
        <div className="systems-list">
          {systems.map((s, i) => (
            <motion.div 
              key={s.name} 
              className={`system-card ${s.status}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="sc-icon">{s.icon}</div>
              <div className="sc-info">
                <strong>{s.name}</strong>
                <span>Uptime: {s.uptime}</span>
              </div>
              <div className="sc-meter">
                <div className="m-label">Yük: %{s.load}</div>
                <div className="m-bar-bg"><div className="m-bar" style={{ width: `${s.load}%` }}/></div>
              </div>
              <div className={`sc-status ${s.status}`}>
                {s.status === 'online' ? 'Çalışıyor' : 'Yüksek Yük'}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Teknik Detaylar / Grafik */}
        <div className="it-sidebar">
          <div className="traffic-card">
            <h3>İnternet Trafiği</h3>
            <div className="t-row">
              <div className="t-stat">
                <span>Download</span>
                <strong>450 Mbps</strong>
              </div>
              <div className="t-stat">
                <span>Upload</span>
                <strong>120 Mbps</strong>
              </div>
            </div>
            <div className="t-visual">
              {[40, 60, 45, 80, 55, 70, 90, 65, 50, 85].map((h, i) => (
                <motion.div 
                  key={i} 
                  className="v-bar" 
                  initial={{ height: 0 }} 
                  animate={{ height: `${h}%` }} 
                  transition={{ delay: i * 0.05 }}
                />
              ))}
            </div>
          </div>

          <div className="alert-box">
            <div className="ab-head">
              <AlertTriangle size={18} color="#ef4444"/>
              <strong>Kritik Uyarılar</strong>
            </div>
            <p>Database sunucusunda %85 üzerinde bellek kullanımı tespit edildi. Otomatik ölçekleme tetiklendi.</p>
          </div>
        </div>
      </div>

      <style>{`
        .it-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .it-head { display: flex; justify-content: space-between; align-items: center; }
        .it-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .it-head span { font-size: 13px; color: #94a3b8; }
        
        .btn-refresh { width: 40px; height: 40px; border-radius: 12px; border: 1.5px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
        .btn-refresh.spin svg { animation: spin 1s linear infinite; }
        @keyframes spin { from {transform: rotate(0deg)} to {transform: rotate(360deg)} }

        .it-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        
        .systems-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .system-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px; transition: 0.3s; }
        .system-card:hover { transform: translateY(-2px); border-color: #3b82f6; }
        
        .sc-icon { width: 40px; height: 40px; background: #f8fafc; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #3b82f6; }
        .sc-info strong { display: block; font-size: 14px; color: #1e293b; }
        .sc-info span { font-size: 11px; color: #94a3b8; }
        
        .sc-meter { display: flex; flex-direction: column; gap: 6px; }
        .m-label { font-size: 10px; font-weight: 800; color: #64748b; }
        .m-bar-bg { background: #f1f5f9; height: 6px; border-radius: 10px; overflow: hidden; }
        .m-bar { height: 100%; background: #3b82f6; border-radius: 10px; }
        
        .sc-status { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-align: center; }
        .sc-status.online { background: #f0fdf4; color: #10b981; }
        .sc-status.warning { background: #fef2f2; color: #ef4444; }
        .system-card.warning .m-bar { background: #ef4444; }

        .it-sidebar { display: flex; flex-direction: column; gap: 20px; }
        .traffic-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .traffic-card h3 { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        .t-row { display: flex; gap: 24px; margin-bottom: 24px; }
        .t-stat span { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .t-stat strong { display: block; font-size: 18px; font-weight: 900; color: #1e293b; }
        
        .t-visual { height: 80px; display: flex; align-items: flex-end; gap: 4px; }
        .v-bar { flex: 1; background: #3b82f6; border-radius: 2px 2px 0 0; opacity: 0.15; }
        
        .alert-box { background: #fef2f2; border-radius: 20px; padding: 20px; border: 1px solid #fee2e2; }
        .ab-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .ab-head strong { font-size: 14px; color: #ef4444; }
        .alert-box p { font-size: 12px; color: #991b1b; line-height: 1.5; margin: 0; }
      `}</style>
    </div>
  );
};

export default ITInfrastructure;
