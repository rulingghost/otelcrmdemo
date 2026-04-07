import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion } from 'framer-motion';
import {
  Globe, MapPin, TrendingUp, DollarSign,
  Users, Star, ChevronRight, ArrowUpRight, ArrowDownRight,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const GlobalVision = () => {
  const { rooms, reservations, cashTransactions, stats } = useHotel();
  const [selectedRegion, setSelectedRegion] = useState('Hepsi');

  const totalRevenue = useMemo(() => cashTransactions.filter(t=>t.type==='gelir').reduce((s,t)=>s+t.amount,0), [cashTransactions]);

  const hotels = useMemo(() => [
    { id: 1, name: 'Grand Hotel Istanbul', city: 'Istanbul', region: 'Türkiye',
      occ: stats.occupancyRate, rev: Math.round(totalRevenue * 0.4),
      trend: `+${Math.round(stats.occupancyRate * 0.15)}%`, rating: 4.8,
      pinTop: '35%', pinLeft: '52%' },
    { id: 2, name: 'Antalya Resort & Spa', city: 'Antalya', region: 'Türkiye',
      occ: Math.min(100, stats.occupancyRate + 8), rev: Math.round(totalRevenue * 0.28),
      trend: '+5%', rating: 4.9,
      pinTop: '58%', pinLeft: '48%' },
    { id: 3, name: 'Boutique Hotel Izmir', city: 'Izmir', region: 'Türkiye',
      occ: Math.max(40, stats.occupancyRate - 10), rev: Math.round(totalRevenue * 0.18),
      trend: '-2%', rating: 4.5,
      pinTop: '42%', pinLeft: '35%' },
    { id: 4, name: 'Alpine Lodge Erzurum', city: 'Erzurum', region: 'Türkiye',
      occ: Math.min(100, stats.occupancyRate + 15), rev: Math.round(totalRevenue * 0.14),
      trend: '+24%', rating: 4.7,
      pinTop: '30%', pinLeft: '72%' },
  ], [stats, totalRevenue]);

  const filteredHotels = selectedRegion === 'Hepsi' ? hotels : hotels.filter(h => h.region === selectedRegion);
  const totalRooms = rooms.length * hotels.length;
  const avgOcc = Math.round(filteredHotels.reduce((s,h) => s+h.occ, 0) / filteredHotels.length);
  const totalRev = filteredHotels.reduce((s,h) => s+h.rev, 0);

  const compData = hotels.map(h => ({ name: h.city, doluluk: h.occ, gelir: Math.round(h.rev/1000) }));

  return (
    <div className="gv-page">
      <div className="gv-head">
        <div>
          <h2><Globe size={20}/> Global Vision</h2>
          <span>Grup otelleri performans ve lokasyon analizi — Canlı Veri</span>
        </div>
        <div className="gv-actions">
          <div className="region-pills">
            {['Hepsi', 'Türkiye', 'Avrupa', 'MEA'].map(r => (
              <button key={r} className={`r-pill ${selectedRegion === r ? 'active' : ''}`} onClick={() => setSelectedRegion(r)}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Özet KPIs */}
      <div className="gv-kpis">
        {[
          { label: 'Toplam Otel', val: filteredHotels.length, icon: <Globe size={18}/>, color: '#3b82f6' },
          { label: 'Toplam Oda', val: totalRooms, icon: <MapPin size={18}/>, color: '#8b5cf6' },
          { label: 'Ort. Doluluk', val: `%${avgOcc}`, icon: <BarChart3 size={18}/>, color: avgOcc>75?'#10b981':'#f59e0b' },
          { label: 'Toplam Gelir', val: `₺${(totalRev/1000).toFixed(0)}K`, icon: <DollarSign size={18}/>, color: '#10b981' },
        ].map((k,i) => (
          <div key={i} className="gv-kpi">
            <div className="gk-icon" style={{color:k.color}}>{k.icon}</div>
            <div><strong>{k.val}</strong><span>{k.label}</span></div>
          </div>
        ))}
      </div>

      <div className="gv-layout">
        {/* Map Visualization */}
        <div className="gv-map-box">
          <div className="map-placeholder">
            <Globe size={160} color="#3b82f6" className="map-bg-icon"/>
            <div className="map-overlay">
              {filteredHotels.map(h => (
                <motion.div
                  key={h.id}
                  className="map-pin"
                  whileHover={{ scale: 1.3 }}
                  style={{ top: h.pinTop, left: h.pinLeft }}
                >
                  <div className="pin-dot" />
                  <div className="pin-label">
                    <strong>{h.city}</strong>
                    <span>%{h.occ} doluluk</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="map-stats">
              <div className="ms-i"><strong>{filteredHotels.length}</strong> Otel</div>
              <div className="ms-i"><strong>{totalRooms}</strong> Oda</div>
              <div className="ms-i"><strong>%{avgOcc}</strong> Ort. Doluluk</div>
            </div>
          </div>
        </div>

        {/* performance list */}
        <div className="gv-list-box">
          <div className="list-head">
            <h3>Hotel Performance</h3>
          </div>

          <div className="gv-cards">
            {filteredHotels.map((h, i) => (
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

          {/* Karşılaştırma Grafiği */}
          <div className="compare-chart">
            <h4>Doluluk Karşılaştırması</h4>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={compData} barSize={16}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#94a3b8', fontSize:10}}/>
                <YAxis hide/>
                <Tooltip formatter={(v,n) => n==='doluluk' ? [`%${v}`,'Doluluk'] : [`₺${v}K`,'Gelir']}/>
                <Bar dataKey="doluluk" fill="#3b82f6" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <style>{`
        .gv-page { padding: 28px; display: flex; flex-direction: column; gap: 20px; }
        .gv-head { display: flex; justify-content: space-between; align-items: center; }
        .gv-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .gv-head span { font-size: 13px; color: #94a3b8; }
        .region-pills { display: flex; background: #f1f5f9; padding: 4px; border-radius: 12px; gap: 4px; }
        .r-pill { padding: 8px 16px; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; background:transparent; }
        .r-pill.active { background: white; color: #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .gv-kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .gv-kpi { background:white; border:1.5px solid #e2e8f0; border-radius:16px; padding:16px; display:flex; align-items:center; gap:14px; }
        .gk-icon { width:38px; height:38px; border-radius:10px; background:#f8fafc; display:flex; align-items:center; justify-content:center; }
        .gv-kpi strong { display:block; font-size:20px; font-weight:900; color:#1e293b; }
        .gv-kpi span { font-size:11px; color:#94a3b8; font-weight:700; }
        .gv-layout { display: grid; grid-template-columns: 1fr 400px; gap: 20px; }
        .gv-map-box { background: #1e293b; border-radius: 24px; min-height: 480px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .map-placeholder { width: 100%; height: 100%; position: relative; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at center, #24344d 0%, #1e293b 100%); }
        .map-bg-icon { opacity: 0.05; }
        .map-overlay { position: absolute; inset: 0; }
        .map-pin { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; }
        .pin-dot { width: 14px; height: 14px; background: #3b82f6; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 20px rgba(59,130,246,0.6); }
        .pin-label { background: white; padding: 6px 12px; border-radius: 10px; text-align:center; box-shadow: 0 4px 10px rgba(0,0,0,0.15); }
        .pin-label strong { display:block; font-size: 11px; font-weight: 900; color: #1e293b; }
        .pin-label span { font-size:9px; color:#64748b; }
        .map-stats { position: absolute; bottom: 20px; left: 20px; display: flex; gap: 10px; }
        .ms-i { background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); padding: 10px 16px; border-radius: 12px; color: white; font-size: 11px; font-weight: 600; border: 1px solid rgba(255,255,255,0.1); }
        .ms-i strong { color: #3b82f6; display: block; font-size: 14px; }
        .gv-list-box { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 22px; display: flex; flex-direction: column; gap: 16px; }
        .list-head { display: flex; justify-content: space-between; align-items: center; }
        .list-head h3 { font-size: 15px; font-weight: 800; color: #1e293b; }
        .gv-cards { display: flex; flex-direction: column; gap: 10px; }
        .gv-card { background: #f8fafc; border-radius: 16px; border: 1.5px solid #f1f5f9; padding: 14px; display: flex; flex-direction: column; gap: 14px; cursor: pointer; transition: 0.2s; }
        .gv-card:hover { border-color: #3b82f6; background: white; box-shadow: 0 8px 15px rgba(0,0,0,0.04); }
        .gvc-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .gvc-main h4 { font-size: 13px; font-weight: 800; color: #1e293b; }
        .gvc-main span { font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 4px; margin-top: 2px; }
        .gvc-rating { background: #fffbeb; color: #f59e0b; padding: 3px 8px; border-radius: 20px; font-size: 10px; font-weight: 800; display: flex; align-items: center; gap: 4px; }
        .gvc-metrics { display: grid; grid-template-columns: 1fr 1.2fr; gap: 14px; }
        .gvc-m { display: flex; flex-direction: column; gap: 5px; }
        .m-label { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .m-val-row { display: flex; align-items: center; gap: 8px; }
        .m-val-row strong { font-size: 14px; font-weight: 900; color: #1e293b; }
        .m-bar-bg { flex: 1; height: 5px; background: #e2e8f0; border-radius: 10px; }
        .m-bar { height: 100%; border-radius: 10px; }
        .m-trend { font-size: 10px; font-weight: 800; display: flex; align-items: center; gap: 2px; }
        .m-trend.up { color: #10b981; }
        .m-trend.down { color: #ef4444; }
        .compare-chart { background:#f8fafc; border-radius:16px; padding:14px; border:1px solid #f1f5f9; }
        .compare-chart h4 { font-size:12px; font-weight:800; color:#64748b; margin-bottom:8px; }
      `}</style>
    </div>
  );
};

export default GlobalVision;
