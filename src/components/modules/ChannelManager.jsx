import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, RefreshCw, AlertCircle, CheckCircle, ExternalLink, Shield, Save, Plus } from 'lucide-react';

const CHANNELS = [
  { id: 'booking', name: 'Booking.com',   status: 'aktif',   sync: '5 dk önce', logo: 'B' },
  { id: 'expedia', name: 'Expedia',       status: 'aktif',   sync: '2 dk önce', logo: 'E' },
  { id: 'hotels',  name: 'Hotels.com',    status: 'aktif',   sync: '8 dk önce', logo: 'H' },
  { id: 'airbnb',  name: 'Airbnb',        status: 'uyarı',   sync: '1 saat önce', logo: 'A' },
  { id: 'website', name: 'Otel Web Sitesi', status: 'aktif',   sync: 'Anlık',     logo: 'W' },
];

const ChannelManager = () => {
  const { addNotification, reservations } = useHotel();
  const [syncing, setSyncing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [rates, setRates] = useState({
    standard: 1850,
    deluxe: 2400,
    suite: 4200,
    family: 3100
  });
  const [stopSale, setStopSale] = useState({ Single: false, Double: false, Triple: false });

  const channelCounts = CHANNELS.map(ch => {
    const count = reservations.filter(r => {
      if(ch.id==='booking') return r.channel==='Booking.com';
      if(ch.id==='expedia') return r.channel==='Expedia';
      if(ch.id==='website') return r.channel==='Direkt';
      return false;
    }).length;
    return { ...ch, resCount: count };
  });

  const handleSyncAll = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      addNotification({ type: 'success', msg: 'Tüm kanallar başarıyla güncellendi!' });
    }, 2000);
  };

  const updateRate = (type, val) => {
    setRates(p => ({ ...p, [type]: parseInt(val) || 0 }));
  };

  return (
    <div className="chan-page">
      <div className="chan-head">
        <div>
          <h2><Layers size={20}/> Kanal Yönetimi (Channel Manager)</h2>
          <span>OTA fiyat, kontenjan ve durdur/satış (Stop Sale) yönetimi</span>
        </div>
        <button 
          className={`btn-primary ${syncing ? 'syncing' : ''}`} 
          onClick={handleSyncAll}
          disabled={syncing}
        >
          <RefreshCw size={15} className={syncing ? 'spin' : ''}/> 
          {syncing ? 'Senkronize Ediliyor...' : 'Tüm Kanalları Güncelle'}
        </button>
      </div>

      <div className="chan-grid">
        {/* Canallar */}
        <div className="chan-list">
          <h3>Bağlı Satış Kanalları</h3>
          {channelCounts.map((ch, i) => (
            <motion.div 
              key={ch.id} 
              className={`chan-card ${ch.status}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="ch-logo">{ch.logo}</div>
              <div className="ch-info">
                <strong>{ch.name}</strong>
                <span>Son Senk: {ch.sync}</span>
                {ch.resCount > 0 && <span className="ch-res-count">{ch.resCount} rez.</span>}
              </div>
              <div className={`ch-status ${ch.status}`}>
                {ch.status === 'aktif' ? <CheckCircle size={14}/> : <AlertCircle size={14}/>}
                {ch.status === 'aktif' ? 'Bağlantı Tamam' : 'Senkronizasyon Hatası'}
              </div>
              <button className="ch-btn"><ExternalLink size={14}/></button>
            </motion.div>
          ))}
          <button className="add-chan"><Plus size={14}/> Yeni Kanal Bağla</button>
        </div>

        {/* Fiyat Yönetimi */}
        <div className="chan-main">
          <div className="rate-card">
            <div className="rc-head">
              <h3>Genel Fiyat Dağıtımı</h3>
              <p>Burada yapılan değişiklikler tüm aktif kanallara anında yansıtılır.</p>
            </div>
            
            <div className="rate-grid">
              {Object.entries(rates).map(([type, price]) => (
                <div key={type} className="rate-item">
                  <label>{type.toUpperCase()} ODA</label>
                  <div className="price-input">
                    <span>₺</span>
                    <input 
                      type="number" 
                      value={price} 
                      onChange={(e) => updateRate(type, e.target.value)}
                    />
                  </div>
                  <div className="rate-meta">
                    <span>Önceki: ₺{(price * 0.95).toFixed(0)}</span>
                    <span className="plus">+%5</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="stop-sale-section">
              <h3><Shield size={16}/> Satış Durdurma (Stop Sale)</h3>
              <div className="stop-grid">
                {['Single', 'Double', 'Triple'].map(t => (
                  <div key={t} className={`stop-item ${stopSale[t]?'stopped':''}`}>
                    <span>{t} Odalar</span>
                    <span className="stop-status">{stopSale[t]?'🛑 Durduruldu':'✅ Satışta'}</span>
                    <div className="toggle">
                      <input type="checkbox" id={`stop-${t}`} checked={stopSale[t]} onChange={()=>setStopSale(p=>({...p,[t]:!p[t]}))} />
                      <label htmlFor={`stop-${t}`}></label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rc-foot">
              <button className={`btn-save ${saved?'saved':''}`} onClick={()=>{setSaved(true);addNotification({type:'success',msg:'Fiyatlar ve stop-sale durumu tüm kanallara gönderildi!'});setTimeout(()=>setSaved(false),2000);}}>
                <Save size={15}/> {saved?'✓ Gönderildi!':'Değişiklikleri Kanallara Gönder'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .chan-page { padding: 28px; display: flex; flex-direction: column; gap: 20px; }
        .chan-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .chan-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .chan-head span { font-size: 13px; color: #94a3b8; }
        
        .btn-primary { padding: 12px 20px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.3s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3); }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from {transform: rotate(0deg)} to {transform: rotate(360deg)} }

        .chan-grid { display: grid; grid-template-columns: 350px 1fr; gap: 24px; }
        
        .chan-list { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
        .chan-list h3 { font-size: 14px; font-weight: 800; color: #64748b; margin-bottom: 8px; text-transform: uppercase; }
        
        .chan-card { padding: 16px; border-radius: 15px; border: 1.5px solid #f1f5f9; display: flex; align-items: center; gap: 14px; transition: 0.2s; }
        .chan-card:hover { border-color: #3b82f6; background: #f8fafc; }
        .ch-logo { width: 40px; height: 40px; background: #1e293b; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 18px; }
        .ch-info { flex: 1; }
        .ch-info strong { display: block; font-size: 14px; color: #1e293b; }
        .ch-info span { font-size: 11px; color: #94a3b8; }
        .ch-status { font-size: 10px; font-weight: 800; display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 20px; }
        .ch-status.aktif { background: #f0fdf4; color: #10b981; }
        .ch-status.uyarı { background: #fef2f2; color: #ef4444; }
        .ch-btn { background: transparent; border: none; color: #cbd5e1; cursor: pointer; padding: 5px; }
        .ch-btn:hover { color: #3b82f6; }
        
        .add-chan { margin-top: 10px; border: 2px dashed #e2e8f0; background: transparent; padding: 12px; border-radius: 12px; color: #94a3b8; font-weight: 700; cursor: pointer; font-size: 12px; transition: 0.2s; }
        .add-chan:hover { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }

        .chan-main { display: flex; flex-direction: column; gap: 20px; }
        .rate-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 24px; }
        .rc-head { margin-bottom: 24px; }
        .rc-head h3 { font-size: 18px; font-weight: 800; color: #1e293b; }
        .rc-head p { font-size: 13px; color: #94a3b8; }
        
        .rate-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 30px; }
        .rate-item { background: #f8fafc; padding: 16px; border-radius: 16px; border: 1px solid #f1f5f9; }
        .rate-item label { display: block; font-size: 10px; font-weight: 800; color: #64748b; margin-bottom: 8px; }
        .price-input { display: flex; align-items: center; gap: 8px; position: relative; }
        .price-input span { font-size: 18px; font-weight: 800; color: #1e293b; }
        .price-input input { background: transparent; border: none; font-size: 24px; font-weight: 900; color: #3b82f6; width: 100%; outline: none; }
        .rate-meta { display: flex; justify-content: space-between; margin-top: 8px; font-size: 11px; font-weight: 700; color: #94a3b8; }
        .rate-meta .plus { color: #10b981; }

        .stop-sale-section { border-top: 1px solid #f1f5f9; padding-top: 24px; margin-bottom: 24px; }
        .stop-sale-section h3 { font-size: 14px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
        .stop-grid { display: flex; gap: 20px; }
        .stop-item { display: flex; align-items: center; gap: 12px; padding: 10px 16px; background: #f8fafc; border-radius: 12px; font-size: 13px; font-weight: 700; color: #64748b; }
        
        .toggle { position: relative; display: inline-block; width: 40px; height: 22px; }
        .toggle input { display: none; }
        .toggle label { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .4s; border-radius: 34px; }
        .toggle label:before { content: ""; position: absolute; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
        .toggle input:checked + label { background-color: #ef4444; }
        .toggle input:checked + label:before { transform: translateX(18px); }

        .btn-save { width: 100%; padding: 16px; border: none; background: #1e293b; color: white; border-radius: 15px; font-weight: 800; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.3s; }
        .btn-save:hover { background: #3b82f6; transform: translateY(-2px); }
      `}</style>
    </div>
  );
};


export default ChannelManager;
