import React, { useState } from 'react';
import { 
  Calendar, Search, Plus, 
  ChevronRight, ChevronLeft, Filter,
  Maximize2, Grid, List as ListIcon,
  HelpCircle, MoreVertical,
  Clock, CheckCircle, AlertTriangle,
  User, ArrowRight, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const days = Array.from({ length: 31 }, (_, i) => ({
  num: i + 1,
  day: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][i % 7]
}));

const floors = [
  { name: 'FLOOR 1', rooms: [
    { id: '101', type: 'DBL', guest: 'Ahmad Turan - Booking.com', status: 'stay', length: 5, start: 2 },
    { id: '102', type: 'DBL (OCEAN)', guest: 'Ferhat Kaya - Agency', status: 'stay', length: 4, start: 4 },
    { id: '103', type: 'SNG (CITY)', guest: 'Kylie Collins - Expedia', status: 'confirmed', length: 3, start: 12 },
  ]},
  { name: 'FLOOR 2', rooms: [
    { id: '201', type: 'SUE', guest: 'Burak Karatay - Agency', status: 'stay', length: 6, start: 2 },
    { id: '104', type: 'SUE (Suite)', guest: 'David Pearl - Booking.com', status: 'confirmed', length: 4, start: 4 },
    { id: '105', type: 'SUE (Suite)', guest: 'Saadet Avci - Agency', status: 'confirmed', length: 3, start: 12 },
  ]},
  { name: 'FLOOR 3', rooms: [
    { id: '301', type: 'DBL', guest: 'Ezgi Yilmaz - Booking.com', status: 'stay', length: 5, start: 2 },
    { id: '302', type: 'DBL (OCEAN)', guest: 'Ferhat Kaya - Agency', status: 'stay', length: 4, start: 4 },
    { id: '303', type: 'DBL (SUITE)', guest: 'Kaya Demir - Agency', status: 'confirmed', length: 3, start: 12 },
    { id: '110', type: 'DBL (SUITE)', guest: 'Arızalı - 17 Nis Çıkış', status: 'oorder', length: 4, start: 4 }
  ]}
];

const TapeChart = () => {
  return (
    <div className="tape-container">
      <header className="header">
         <div className="title-section">
            <Calendar size={32} className="icon-blue"/>
            <div>
               <h2>Hotel Tape Chart</h2>
               <span>31 günlük oda doluluk ve rezervasyon zaman çizelgesi</span>
            </div>
         </div>
         <div className="header-tabs">
            <button className="h-tab active"><Globe size={16}/> KONAKLAYAN MİSAFİR</button>
            <button className="h-tab"><CheckCircle size={16}/> GELECEK MİSAFİR</button>
            <button className="h-tab"><AlertCircle size={16}/> OPSİYONLU KAYAH</button>
         </div>
         <div className="actions">
            <button className="btn primary red"><Plus size={18}/> YENİ REZERVASYON</button>
            <button className="btn outline">GRUP GİRİŞ</button>
            <button className="btn outline">HIZLI ARA</button>
         </div>
      </header>

      <div className="chart-view card">
         <div className="chart-header">
            <div className="room-col-head">
               <Grid size={16}/> <span>Odalar</span>
            </div>
            <div className="days-timeline">
               {days.map(d => (
                 <div key={d.num} className={`day-head ${d.num === 19 ? 'today' : ''}`}>
                    <span className="d-num">{d.num}</span>
                    <span className="d-name">{d.day}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="chart-body">
            {floors.map((floor, fi) => (
              <div key={fi} className="floor-row">
                 <div className="floor-label">{floor.name}</div>
                 {floor.rooms.map((room, ri) => (
                   <div key={ri} className="room-row">
                      <div className="room-info">
                         <strong>{room.id}</strong>
                         <span>{room.type}</span>
                      </div>
                      <div className="timeline-row">
                         {Array.from({length: 31}).map((_, i) => (
                           <div key={i} className="time-slot"></div>
                         ))}
                         
                         <motion.div 
                           className={`res-block ${room.status}`}
                           style={{ 
                             left: `${(room.start * (100 / 31))}%`,
                             width: `${(room.length * (100 / 31))}%`
                           }}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                         >
                           <span className="guest-name">{room.guest}</span>
                           <span className="res-details">+ 3 MI</span>
                         </motion.div>
                      </div>
                   </div>
                 ))}
              </div>
            ))}
         </div>
      </div>

      <footer className="tape-footer card">
         <div className="f-stat"><span>DOLULUK:</span> <strong className="green">%84</strong></div>
         <div className="f-stat"><span>GİRİŞ:</span> <strong>12</strong></div>
         <div className="f-stat"><span>ÇIKIŞ:</span> <strong className="orange">15</strong></div>
         <div className="time-info">24.04.2026 | 09:42</div>
      </footer>

      <style jsx>{`
        .tape-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow: hidden;
          display: flex; flex-direction: column; gap: 20px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-blue { color: #3b82f6; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { font-size: 14px; color: #64748b; }

        .header-tabs { display: flex; gap: 10px; background: white; padding: 5px; border-radius: 12px; border: 1px solid #e2e8f0; }
        .h-tab { padding: 8px 15px; border-radius: 8px; border: none; background: transparent; font-size: 11px; font-weight: 800; color: #94a3b8; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .h-tab.active { background: #f1f5f9; color: #1e293b; }

        .actions { display: flex; gap: 10px; }
        .btn { padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }
        .btn.primary.red { background: #ef4444; color: white; display: flex; align-items: center; gap: 8px; }

        .chart-view { flex: 1; background: white; overflow: hidden; display: flex; flex-direction: column; }
        
        .chart-header { display: flex; border-bottom: 1px solid #f1f5f9; }
        .room-col-head { width: 120px; border-right: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 11px; font-weight: 800; color: #94a3b8; }
        .days-timeline { flex: 1; display: flex; }
        .day-head { flex: 1; min-width: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 8px 0; border-right: 1px solid #f8fafc; }
        .day-head.today { background: #eff6ff; border-left: 2px solid #3b82f6; border-right: 2px solid #3b82f6; }
        .d-num { font-size: 12px; font-weight: 900; color: #1e293b; }
        .d-name { font-size: 9px; color: #94a3b8; font-weight: 800; }

        .chart-body { flex: 1; overflow-y: auto; }
        .floor-label { background: #f8fafc; padding: 5px 15px; font-size: 10px; font-weight: 900; color: #94a3b8; border-bottom: 1px solid #f1f5f9; }
        
        .room-row { display: flex; border-bottom: 1px solid #f8fafc; height: 50px; }
        .room-info { width: 120px; border-right: 1px solid #f1f5f9; padding: 8px 15px; display: flex; flex-direction: column; justify-content: center; }
        .room-info strong { font-size: 13px; color: #1e293b; }
        .room-info span { font-size: 10px; color: #94a3b8; font-weight: 700; }

        .timeline-row { flex: 1; display: flex; position: relative; }
        .time-slot { flex: 1; min-width: 40px; border-right: 1px solid #f8fafc; }
        
        .res-block { position: absolute; height: 34px; top: 8px; border-radius: 6px; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; border: 1px solid rgba(0,0,0,0.1); cursor: pointer; z-index: 10; }
        .res-block.stay { background: #3b82f6; color: white; }
        .res-block.confirmed { background: #f59e0b; color: white; }
        .res-block.oorder { background: #475569; color: white; border-bottom: 4px solid #ef4444; }
        .guest-name { font-size: 11px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .res-details { font-size: 9px; opacity: 0.8; font-weight: 900; }

        .tape-footer { display: flex; gap: 30px; padding: 15px 30px; align-items: center; }
        .f-stat { font-size: 12px; font-weight: 800; color: #94a3b8; }
        .f-stat strong { font-size: 18px; color: #1e293b; margin-left: 8px; }
        .time-info { margin-left: auto; font-size: 12px; font-weight: 800; color: #94a3b8; }

        .green { color: #10b981; }
        .orange { color: #f59e0b; }
        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
      `}</style>
    </div>
  );
};

export default TapeChart;
