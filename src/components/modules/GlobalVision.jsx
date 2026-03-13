import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, MapPin, TrendingUp, DollarSign, 
  Users, Building, Star, Search, Filter, 
  ChevronRight, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const GlobalVision = () => {
  const [selectedRegion, setSelectedRegion] = useState('Hepsi');

  const hotels = [
    { id: 1, name: 'Grand Hotel Istanbul', city: 'Istanbul', occ: 92, rev: 125000, trend: '+12%', rating: 4.8 },
    { id: 2, name: 'Antalya Resort & Spa', city: 'Antalya', occ: 85, rev: 84000, trend: '+5%', rating: 4.9 },
    { id: 3, name: 'Boutique Hotel Izmir', city: 'Izmir', occ: 74, rev: 42000, trend: '-2%', rating: 4.5 },
    { id: 4, name: 'Alpine Lodge Erzurum', city: 'Erzurum', occ: 98, rev: 68000, trend: '+24%', rating: 4.7 },
  ];

  return (
    <div className="gv-page">
      <div className="gv-head">
        <div>
          <h2><Globe size={20}/> Global Vision</h2>
          <span>Grup otelleri performans ve lokasyon analizi</span>
        </div>
        <div className="gv-actions">
          <div className="region-pills">
            {['Hepsi', 'Türkiye', 'Avrupa', 'MEA'].map(r => (
              <button 
                key={r} 
                className={`r-pill ${selectedRegion === r ? 'active' : ''}`}
                onClick={() => setSelectedRegion(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="gv-layout">
        {/* Map Visualization (CSS Placeholder) */}
        <div className="gv-map-box">
          <div className="map-placeholder">
            <Globe size={180} color="#3b82f6" className="map-bg-icon"/>
            <div className="map-overlay">
              {hotels.map(h => (
                <motion.div 
                  key={h.id} 
                  className="map-pin"
                  whileHover={{ scale: 1.2 }}
                  style={{ 
                    top: `${40 + (Math.random() * 40)}%`, 
                    left: `${30 + (Math.random() * 50)}%` 
                  }}
                >
                  <div className="pin-dot" />
                  <div className="pin-label">{h.city}</div>
                </motion.div>
              ))}
            </div>
            <div className="map-stats">
              <div className="ms-i"><strong>4</strong> Otel</div>
              <div className="ms-i"><strong>842</strong> Oda</div>
              <div className="ms-i"><strong>%87.4</strong> Ort. Doluluk</div>
            </div>
          </div>
        </div>

        {/* performance list */}
        <div className="gv-list-box">
          <div className="list-head">
            <h3>Hotel Performance</h3>
            <button className="view-all">Tüm Raporlar <ChevronRight size={14}/></button>
          </div>
          
          <div className="gv-cards">
            {hotels.map((h, i) => (
              <motion.div 
                key={h.id} 
                className="gv-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="gvc-top">
                  <div className="gvc-main">
                    <h4>{h.name}</h4>
                    <span><MapPin size={10}/> {h.city}</span>
                  </div>
                  <div className="gvc-rating"><Star size={10} fill="#f59e0b" color="#f59e0b"/> {h.rating}</div>
                </div>

                <div className="gvc-metrics">
                  <div className="gvc-m">
                    <span className="m-label">Doluluk</span>
                    <div className="m-val-row">
                      <strong>%{h.occ}</strong>
                      <div className="m-bar-bg"><div className="m-bar" style={{ width: `${h.occ}%`, background: h.occ > 80 ? '#10b981' : '#f59e0b' }}/></div>
                    </div>
                  </div>
                  <div className="gvc-m">
                    <span className="m-label">Günlük Ciro</span>
                    <div className="m-val-row">
                      <strong>₺{(h.rev/1000).toFixed(0)}K</strong>
                      <span className={`m-trend ${h.trend.startsWith('+') ? 'up' : 'down'}`}>
                        {h.trend.startsWith('+') ? <ArrowUpRight size={10}/> : <ArrowDownRight size={10}/>}
                        {h.trend}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .gv-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .gv-head { display: flex; justify-content: space-between; align-items: center; }
        .gv-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .gv-head span { font-size: 13px; color: #94a3b8; }

        .region-pills { display: flex; background: #f1f5f9; padding: 4px; border-radius: 12px; gap: 4px; }
        .r-pill { padding: 8px 16px; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; }
        .r-pill.active { background: white; color: #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }

        .gv-layout { display: grid; grid-template-columns: 1fr 400px; gap: 24px; }

        .gv-map-box { background: #1e293b; border-radius: 24px; min-height: 500px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .map-placeholder { width: 100%; height: 100%; position: relative; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at center, #24344d 0%, #1e293b 100%); }
        .map-bg-icon { opacity: 0.05; }
        
        .map-overlay { position: absolute; inset: 0; }
        .map-pin { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; }
        .pin-dot { width: 12px; height: 12px; background: #3b82f6; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 20px rgba(59,130,246,0.6); }
        .pin-label { background: white; padding: 4px 10px; border-radius: 8px; font-size: 10px; font-weight: 800; color: #1e293b; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        
        .map-stats { position: absolute; bottom: 24px; left: 24px; display: flex; gap: 12px; }
        .ms-i { background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); padding: 10px 16px; border-radius: 12px; color: white; font-size: 11px; font-weight: 600; border: 1px solid rgba(255,255,255,0.1); }
        .ms-i strong { color: #3b82f6; display: block; font-size: 14px; }

        .gv-list-box { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .list-head { display: flex; justify-content: space-between; align-items: center; }
        .list-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .view-all { background: transparent; border: none; font-size: 12px; font-weight: 700; color: #3b82f6; cursor: pointer; display: flex; align-items: center; gap: 4px; }

        .gv-cards { display: flex; flex-direction: column; gap: 12px; }
        .gv-card { background: #f8fafc; border-radius: 20px; border: 1.5px solid #f1f5f9; padding: 16px; display: flex; flex-direction: column; gap: 16px; cursor: pointer; transition: 0.2s; }
        .gv-card:hover { border-color: #3b82f6; background: white; box-shadow: 0 10px 15px rgba(0,0,0,0.05); }

        .gvc-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .gvc-main h4 { font-size: 14px; font-weight: 800; color: #1e293b; }
        .gvc-main span { font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 4px; margin-top: 2px; }
        .gvc-rating { background: #fffbeb; color: #f59e0b; padding: 4px 10px; border-radius: 20px; font-size: 10px; font-weight: 800; display: flex; align-items: center; gap: 4px; }

        .gvc-metrics { display: grid; grid-template-columns: 1fr 1.2fr; gap: 16px; }
        .gvc-m { display: flex; flex-direction: column; gap: 6px; }
        .m-label { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .m-val-row { display: flex; align-items: center; gap: 8px; }
        .m-val-row strong { font-size: 14px; font-weight: 900; color: #1e293b; }
        .m-bar-bg { flex: 1; height: 6px; background: #e2e8f0; border-radius: 10px; }
        .m-bar { height: 100%; border-radius: 10px; }
        .m-trend { font-size: 10px; font-weight: 800; display: flex; align-items: center; gap: 2px; }
        .m-trend.up { color: #10b981; }
        .m-trend.down { color: #ef4444; }
      `}</style>
    </div>
  );
};

export default GlobalVision;
