import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid, List, Search, Filter,
  Bed, User, Calendar, Clock, Home
} from 'lucide-react';

const STATUS_STYLE = {
  dolu:    { bg:'#3b82f6', label:'Dolu' },
  boş:     { bg:'#10b981', label:'Boş'  },
  arızalı: { bg:'#ef4444', label:'Arızalı' },
};
const CLEAN_STYLE = { temiz: '#10b981', kirli: '#f59e0b' };

const TapeChart = () => {
  const { reservations, rooms, TODAY } = useHotel();
  const today = TODAY;

  // Build 14-day date range starting 2 days before today
  const days = Array.from({length:14},(_,i)=>{
    const d = new Date(today);
    d.setDate(d.getDate()-2+i);
    return d.toISOString().split('T')[0];
  });

  const dayLabels = days.map(d => {
    const dt = new Date(d+'T12:00:00');
    return { date: d, label: dt.toLocaleDateString('tr-TR',{day:'2-digit',month:'short'}), isToday: d===today };
  });

  // For each room, show which days are occupied
  const roomRows = rooms.map(room => {
    const roomRes = reservations.filter(r => r.room === room.id && r.status !== 'iptal');
    return { room, reservations: roomRes };
  });

  const isOccupied = (roomRes, date) => roomRes.find(r => r.checkIn <= date && r.checkOut > date);

  return (
    <div className="tc-container">
      <div className="tc-header">
        <h2>Rezervasyon Takvimi (Tape Chart)</h2>
        <span>14 günlük görünüm — {dayLabels[0].label} / {dayLabels[dayLabels.length-1].label}</span>
      </div>

      <div className="tc-legend">
        <div className="leg"><div className="leg-dot" style={{background:'#3b82f6'}}/> Dolu</div>
        <div className="leg"><div className="leg-dot" style={{background:'#10b981'}}/> Müsait</div>
        <div className="leg"><div className="leg-dot" style={{background:'#ef4444'}}/> OOO</div>
        <div className="leg"><div className="leg-dot today-dot"/><span>Bugün</span></div>
      </div>

      {/* Özet */}
      <div className="tc-summary">
        <div className="tcs-item"><strong>{rooms.length}</strong><span>Toplam Oda</span></div>
        <div className="tcs-item"><strong>{rooms.filter(r=>r.status==='dolu').length}</strong><span>Dolu</span></div>
        <div className="tcs-item"><strong>{rooms.filter(r=>r.status==='boş').length}</strong><span>Boş</span></div>
        <div className="tcs-item"><strong>{rooms.filter(r=>r.status==='arızalı').length}</strong><span>OOO</span></div>
        <div className="tcs-item"><strong>%{Math.round(rooms.filter(r=>r.status==='dolu').length/rooms.length*100)}</strong><span>Doluluk</span></div>
      </div>

      <div className="tape-wrap">
        <div className="tape-grid" style={{gridTemplateColumns:`120px repeat(${days.length}, 1fr)`}}>
          {/* Header row */}
          <div className="hcell room-label-head">Oda</div>
          {dayLabels.map(d=>(
            <div key={d.date} className={`hcell day-head ${d.isToday?'today':''}`}>
              <span>{d.label}</span>
            </div>
          ))}

          {/* Room rows */}
          {roomRows.map(({room, reservations: res}) => (
            <React.Fragment key={room.id}>
              <div className="dcell room-label">
                <div className="rl-num">{room.id}</div>
                <div className="rl-type">{room.type}</div>
              </div>
              {days.map(date => {
                const occ = isOccupied(res, date);
                const isOoo = room.status === 'arızalı';
                return (
                  <div
                    key={date}
                    className={`dcell day-cell ${occ?'occupied':''} ${isOoo&&!occ?'ooo':''} ${date===today?'today-col':''}`}
                    title={occ ? `${occ.guest} (${occ.id})` : ''}
                  >
                    {occ && (
                      <div className="occ-bar" style={{background: '#3b82f6'}}>
                        {occ.checkIn===date && <span className="occ-name">{occ.guest.split(' ')[0]}</span>}
                      </div>
                    )}
                    {isOoo && !occ && <div className="ooo-bar">OOO</div>}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        .tc-container { padding:28px; display:flex; flex-direction:column; gap:18px; }
        .tc-header h2 { font-size:22px; font-weight:800; color:#1e293b; }
        .tc-header span { font-size:13px; color:#94a3b8; }
        .tc-legend { display:flex; gap:20px; }
        .leg { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:#64748b; }
        .leg-dot { width:14px; height:14px; border-radius:4px; }
        .today-dot { width:14px; height:14px; border-radius:4px; background:#fef08a; border:2px solid #eab308; }

        .tape-wrap { background:white; border-radius:20px; border:1px solid #e2e8f0; overflow:auto; }
        .tape-grid { display:grid; min-width:max-content; }

        .hcell { padding:12px 10px; background:#f8fafc; border-bottom:2px solid #e2e8f0; font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; text-align:center; }
        .hcell.room-label-head { text-align:left; padding-left:16px; }
        .hcell.day-head { }
        .hcell.today { background:#fffbeb; color:#b45309; }
        .hcell.today span { font-weight:900; }

        .dcell { padding:6px 4px; border-bottom:1px solid #f1f5f9; border-right:1px solid #f8fafc; min-height:48px; position:relative; }
        .dcell.room-label { display:flex; flex-direction:column; justify-content:center; padding:6px 14px; border-right:2px solid #e2e8f0; background:white; }
        .rl-num { font-size:15px; font-weight:900; color:#1e293b; }
        .rl-type { font-size:10px; color:#94a3b8; font-weight:700; }
        .dcell.day-cell { }
        .dcell.today-col { background:#fffde7; }
        .occ-bar { position:absolute; inset:4px 2px; border-radius:6px; display:flex; align-items:center; overflow:hidden; }
        .occ-name { font-size:10px; color:white; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; padding:0 6px; }
        .ooo-bar { position:absolute; inset:4px 2px; background:#fef2f2; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:800; color:#ef4444; border:1px dashed #fca5a5; }
        .tc-summary { display:flex; gap:16px; }
        .tcs-item { background:white; border:1px solid #e2e8f0; border-radius:14px; padding:14px 22px; text-align:center; }
        .tcs-item strong { display:block; font-size:22px; font-weight:900; color:#1e293b; }
        .tcs-item span { font-size:11px; color:#94a3b8; font-weight:700; }
      `}</style>
    </div>
  );
};

export default TapeChart;
