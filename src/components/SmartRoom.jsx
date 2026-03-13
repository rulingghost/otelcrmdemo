import React, { useState } from 'react';
import { 
  Zap, Search, Plus, 
  Wind, Thermometer, Droplets,
  Activity, ShieldAlert, CheckCircle,
  ChevronRight, MoreVertical, LayoutGrid,
  RefreshCw, FileText, Settings,
  ArrowUpRight, ArrowDownRight,
  Battery, Sun, CloudRain
} from 'lucide-react';
import { 
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip,
  AreaChart, Area
} from 'recharts';
import { motion } from 'framer-motion';

const roomHealth = [
  { floor: '3. Kat', temp: '22°C', energy: '1.2kW', status: 'OK' },
  { floor: '4. Kat', temp: '23°C', energy: '0.9kW', status: 'OK' },
  { floor: '5. Kat', temp: '24°C', energy: '1.5kW', status: 'OK' },
];

const energyData = [
  { time: '09:00', val: 120 },
  { time: '10:00', val: 150 },
  { time: '11:00', val: 180 },
  { time: '12:00', val: 210 },
  { time: '13:00', val: 190 },
];

const SmartRoom = () => {
  return (
    <div className="smart-container">
      <header className="header">
         <div className="title-section">
            <Zap size={32} className="icon-blue"/>
            <div>
               <h2>Smart Room & Energy Management</h2>
               <span>Merkezi İklimlendirme, enerji tasarrufu ve kritik arıza takibi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline">MERKEZİ KLİMA KONTROL</button>
            <button className="btn outline">SENARYO YÖNETİMİ</button>
            <button className="btn primary blue">SİSTEM SAĞLIĞI (6 Hata)</button>
         </div>
      </header>

      <div className="smart-grid">
         {/* Left: Device Segments */}
         <aside className="left-panel">
            <section className="card stats-card">
               <div className="s-row">
                  <span>Toplam Aktif Cihaz</span>
                  <strong>1240</strong>
               </div>
               <div className="s-row mt-10">
                  <span>Dış Hava Sıcaklığı</span>
                  <strong>18 °C</strong>
               </div>
            </section>

            <section className="card alert-card mt-20">
               <div className="a-head">
                  <ShieldAlert size={16} className="red"/>
                  <strong>ACİL DURUM ALARMI</strong>
               </div>
               <div className="a-content mt-10">
                  <div className="a-item">
                     <Droplets size={14} className="blue"/>
                     <div className="a-text">
                        <strong>Oda 504:</strong>
                        <span>Su Kaçağı Algılandı</span>
                     </div>
                  </div>
               </div>
            </section>
         </aside>

         {/* Center: Room Matrix */}
         <section className="main-content">
            <div className="card matrix-card">
               <h3>ENVANTER & DURUM MATRİSİ (BMS)</h3>
               <div className="room-matrix">
                  {[3,4,5].map(floor => (
                    <div key={floor} className="floor-row">
                       <div className="floor-num">{floor}. Kat</div>
                       <div className="room-dots">
                          {Array.from({length: 12}).map((_, i) => (
                            <div key={i} className={`room-dot ${i % 4 === 0 ? 'active' : 'idle'}`}>
                               <span className="tooltip">Room {floor}0{i+1} - 22°C</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="stats-grid mt-20">
               <div className="card mini-stat">
                  <span>TASARRUF ORANI</span>
                  <strong>% 18</strong>
               </div>
               <div className="card mini-stat">
                  <span>AKTÜEL TÜKETİM</span>
                  <strong>85 kW</strong>
               </div>
            </div>
         </section>

         {/* Right: Energy Charts */}
         <aside className="right-panel">
            <section className="card energy-card">
               <div className="e-head">
                  <h3>ANLIK ENERJİ TÜKETİMİ</h3>
                  <strong>$8,150</strong>
               </div>
               <div style={{ height: 180 }}>
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={energyData}>
                        <Bar dataKey="val" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
               <div className="e-meta mt-15">
                  <div className="e-row">
                     <Sun size={14} className="gold"/>
                     <span>Güneş Paneli</span>
                     <strong>5.05 kW</strong>
                  </div>
                  <div className="e-row mt-10">
                     <CloudRain size={14} className="blue"/>
                     <span>Su Tüketimi</span>
                     <strong>1.17 m³</strong>
                  </div>
               </div>
            </section>

            <button className="btn-full mt-20">DETAYLI BMS ANALİZİ</button>
         </aside>
      </div>

      <style jsx>{`
        .smart-container {
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
        .btn { padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }
        .btn.primary.blue { background: #ef4444; color: white; }

        .smart-grid { display: grid; grid-template-columns: 240px 1fr 300px; gap: 30px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; margin-bottom: 25px; letter-spacing: 0.5px; }

        .s-row { display: flex; justify-content: space-between; font-size: 13px; color: #64748b; }
        .s-row strong { color: #1e293b; }

        .a-head { display: flex; align-items: center; gap: 10px; color: #ef4444; font-size: 11px; }
        .a-item { display: flex; align-items: center; gap: 10px; padding: 10px; background: #fff1f2; border-radius: 8px; }
        .a-text { display: flex; flex-direction: column; }
        .a-text strong { font-size: 11px; color: #1e293b; }
        .a-text span { font-size: 10px; color: #64748b; }

        .room-matrix { display: flex; flex-direction: column; gap: 20px; }
        .floor-row { display: flex; align-items: center; gap: 20px; }
        .floor-num { width: 60px; font-size: 11px; font-weight: 800; color: #94a3b8; }
        .room-dots { flex: 1; display: flex; gap: 8px; flex-wrap: wrap; }
        .room-dot { width: 24px; height: 24px; border-radius: 6px; background: #f1f5f9; position: relative; cursor: pointer; }
        .room-dot.active { background: #3b82f6; }
        .room-dot.idle { background: #cbd5e1; }
        .room-dot .tooltip { visibility: hidden; position: absolute; bottom: 120%; left: 50%; transform: translateX(-50%); background: #1e293b; color: white; padding: 5px 10px; border-radius: 4px; font-size: 10px; white-space: nowrap; z-index: 10; }
        .room-dot:hover .tooltip { visibility: visible; }

        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .mini-stat { text-align: center; }
        .mini-stat span { font-size: 10px; font-weight: 800; color: #94a3b8; display: block; margin-bottom: 5px; }
        .mini-stat strong { font-size: 20px; color: #1e293b; }

        .e-head { display: flex; justify-content: space-between; margin-bottom: 20px; align-items: center; }
        .e-row { display: flex; justify-content: space-between; font-size: 12px; }
        
        .btn-full { width: 100%; padding: 12px; background: #1e293b; color: white; border-radius: 10px; font-size: 11px; font-weight: 800; cursor: pointer; border: none; }

        .blue { color: #3b82f6; }
        .red { color: #ef4444; }
        .gold { color: #f59e0b; }
        .mt-20 { margin-top: 20px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default SmartRoom;
