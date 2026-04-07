import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion } from 'framer-motion';
import { 
  Zap, Thermometer, Lightbulb, Lock, Unlock, 
  Wind, Power, PowerOff, Battery, 
  Search, Settings, MoreHorizontal, BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SmartRoom = () => {
  const { rooms, addNotification } = useHotel();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('tümü');

  const [roomControls, setRoomControls] = useState(() => {
    const controls = {};
    rooms.forEach(r => {
      controls[r.id] = {
        temp: 22 + (parseInt(r.id) % 5),
        power: r.status === 'dolu' || Math.random() > 0.4,
        light: r.status === 'dolu',
        lock: true,
        ac: r.status === 'dolu'
      };
    });
    return controls;
  });

  const toggleControl = (roomId, controlType) => {
    setRoomControls(prev => ({
      ...prev,
      [roomId]: { ...prev[roomId], [controlType]: !prev[roomId][controlType] }
    }));
    addNotification({ type:'info', msg:`Oda ${roomId}: ${controlType} durumu değiştirildi` });
  };

  const setTemp = (roomId, newTemp) => {
    setRoomControls(prev => ({
      ...prev,
      [roomId]: { ...prev[roomId], temp: Math.min(30, Math.max(16, newTemp)) }
    }));
  };

  const smartStatus = useMemo(() => rooms.map(r => ({
    ...r,
    controls: roomControls[r.id] || { temp:22, power:false, light:false, lock:true, ac:false }
  })), [rooms, roomControls]);

  const filtered = smartStatus.filter(r => {
    const matchesSearch = r.id.toString().includes(search);
    if (filter === 'dolu') return matchesSearch && r.status === 'dolu';
    if (filter === 'boş') return matchesSearch && r.status === 'boş';
    if (filter === 'açık') return matchesSearch && r.controls.power;
    if (filter === 'kapalı') return matchesSearch && !r.controls.power;
    return matchesSearch;
  });

  const totalPower = smartStatus.filter(r => r.controls.power).length;
  const emptyPower = smartStatus.filter(r => r.status !== 'dolu' && r.controls.power).length;
  const savings = emptyPower > 0 ? Math.round((emptyPower / totalPower) * 100) : 0;
  const avgTemp = Math.round(smartStatus.reduce((s,r) => s + r.controls.temp, 0) / smartStatus.length);

  const energyData = [
    { name: 'Dolu+Açık', value: smartStatus.filter(r=>r.status==='dolu'&&r.controls.power).length },
    { name: 'Boş+Açık', value: emptyPower },
    { name: 'Kapalı', value: smartStatus.filter(r=>!r.controls.power).length },
  ];

  const shutdownEmpty = () => {
    const updates = {};
    smartStatus.forEach(r => {
      if(r.status !== 'dolu' && r.controls.power) {
        updates[r.id] = { ...r.controls, power: false, light: false, ac: false };
      }
    });
    if(Object.keys(updates).length > 0) {
      setRoomControls(prev => ({ ...prev, ...updates }));
      addNotification({ type:'success', msg:`${Object.keys(updates).length} boş odanın enerjisi kapatıldı` });
    }
  };

  return (
    <div className="smart-page">
      <div className="smart-head">
        <div>
          <h2><Zap size={20}/> Akıllı Oda & Enerji Yönetimi</h2>
          <span>IoT entegrasyonu, enerji tasarrufu ve merkezi kontrol</span>
        </div>
        <div className="head-stats">
          <div className="hs-i"><Power size={14}/> <strong>{totalPower}</strong> Oda Açık</div>
          <div className="hs-i"><Battery size={14}/> <strong>{avgTemp}°C</strong> Ort. Sıcaklık</div>
          <button className="hs-btn" onClick={shutdownEmpty}><PowerOff size={14}/> Boş Odaları Kapat ({emptyPower})</button>
        </div>
      </div>

      <div className="energy-overview">
        <div className="eo-chart">
          <h4>Enerji Dağılımı</h4>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={energyData} layout="vertical" barSize={14}>
              <XAxis type="number" hide/>
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#64748b',fontSize:11}} width={70}/>
              <Tooltip/>
              <Bar dataKey="value" fill="#3b82f6" radius={[0,6,6,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {savings > 0 && (
          <div className="eo-warn">
            <Zap size={16} color="#f59e0b"/>
            <span><strong>{emptyPower} boş oda</strong>da enerji harcıyorsunuz. "Boş Odaları Kapat" ile %{savings} tasarruf sağlayabilirsiniz.</span>
          </div>
        )}
      </div>

      <div className="smart-controls">
        <div className="search-bar">
          <Search size={16} color="#94a3b8"/>
          <input placeholder="Oda no ara..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className="filters">
          {['tümü', 'dolu', 'boş', 'açık', 'kapalı'].map(f => (
            <button key={f} className={`f-pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)} ({f==='tümü'?smartStatus.length:filtered.length})
            </button>
          ))}
        </div>
      </div>

      <div className="room-grid">
        {filtered.map((r, i) => (
          <motion.div 
            key={r.id} 
            className={`s-room-card ${r.controls.power?'on':'off'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
          >
            <div className="src-top">
              <div className="src-id">Oda {r.id}</div>
              <div className={`src-occ ${r.status==='dolu'?'occupied':'empty'}`}>
                {r.status === 'dolu' ? '🟢 İçeride' : r.status === 'arızalı' ? '🔴 Arızalı' : '⬜ Boş'}
              </div>
            </div>

            <div className="src-main">
              <div className="src-temp">
                <Thermometer size={16} color="#ef4444"/>
                <button onClick={() => setTemp(r.id, r.controls.temp-1)}>−</button>
                <strong>{r.controls.temp}°C</strong>
                <button onClick={() => setTemp(r.id, r.controls.temp+1)}>+</button>
              </div>
              <div className="src-actions">
                <button className={`src-a-btn ${r.controls.light ? 'active' : ''}`} title="Aydınlatma" onClick={() => toggleControl(r.id, 'light')}>
                  <Lightbulb size={16}/>
                </button>
                <button className={`src-a-btn ${r.controls.lock ? 'active' : ''}`} title="Kilit" onClick={() => toggleControl(r.id, 'lock')}>
                  {r.controls.lock ? <Lock size={16}/> : <Unlock size={16}/>}
                </button>
                <button className={`src-a-btn ${r.controls.ac ? 'active' : ''}`} title="Klima" onClick={() => toggleControl(r.id, 'ac')}>
                  <Wind size={16}/>
                </button>
              </div>
            </div>

            <div className="src-foot">
              <button className={`power-toggle ${r.controls.power?'on':''}`} onClick={() => toggleControl(r.id, 'power')}>
                {r.controls.power ? <Power size={14}/> : <PowerOff size={14}/>}
                <span>{r.controls.power ? 'Aktif' : 'Kapalı'}</span>
              </button>
              <span className="room-type-tag">{r.type}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .smart-page { padding: 28px; display: flex; flex-direction: column; gap: 20px; }
        .smart-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .smart-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .smart-head span { font-size: 13px; color: #94a3b8; }
        .head-stats { display: flex; gap: 10px; align-items:center; }
        .hs-i { background: #1e293b; color: white; padding: 8px 16px; border-radius: 12px; font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
        .hs-i strong { color: #f1c40f; }
        .hs-btn { padding:8px 16px; border-radius:12px; border:1.5px solid #ef4444; background:#fef2f2; color:#ef4444; font-size:11px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; }
        .hs-btn:hover { background:#ef4444; color:white; }

        .energy-overview { display:flex; gap:16px; align-items:center; }
        .eo-chart { background:white; border:1px solid #e2e8f0; border-radius:16px; padding:16px; flex:1; }
        .eo-chart h4 { font-size:12px; font-weight:800; color:#64748b; margin-bottom:8px; }
        .eo-warn { background:#fffbeb; border:1px solid #fde68a; border-radius:14px; padding:14px 18px; display:flex; align-items:center; gap:10px; font-size:12px; color:#92400e; flex:1; }

        .smart-controls { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
        .search-bar { flex: 1; max-width: 400px; display: flex; align-items: center; gap: 10px; background: white; border: 1.5px solid #e2e8f0; padding: 10px 16px; border-radius: 12px; }
        .search-bar input { border: none; background: transparent; outline: none; font-size: 13px; color: #475569; width: 100%; }
        .filters { display: flex; gap: 6px; align-items: center; }
        .f-pill { padding: 7px 14px; border-radius: 20px; border: 1.5px solid #e2e8f0; background: white; font-size: 11px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; }
        .f-pill.active { background: #1e293b; color: white; border-color: #1e293b; }

        .room-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 14px; }
        .s-room-card { background: white; border-radius: 18px; border: 1.5px solid #e2e8f0; padding: 16px; display: flex; flex-direction: column; gap: 14px; transition: 0.3s; }
        .s-room-card.off { opacity: 0.5; border-style:dashed; }
        .s-room-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.05); }

        .src-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .src-id { font-size: 15px; font-weight: 900; color: #1e293b; }
        .src-occ { font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 6px; }
        .src-occ.occupied { background: #fef2f2; color: #ef4444; }
        .src-occ.empty { background: #f0fdf4; color: #10b981; }

        .src-main { display: flex; align-items: center; justify-content: space-between; }
        .src-temp { display: flex; align-items: center; gap: 6px; }
        .src-temp strong { font-size: 18px; font-weight: 900; color: #1e293b; }
        .src-temp button { width:24px; height:24px; border-radius:6px; border:1px solid #e2e8f0; background:white; cursor:pointer; font-weight:800; color:#64748b; }
        .src-actions { display: flex; gap: 5px; }
        .src-a-btn { width: 32px; height: 32px; border-radius: 8px; border: 1.5px solid #f1f5f9; background: white; color: #cbd5e1; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .src-a-btn.active { color: #3b82f6; border-color: #3b82f6; background: #eff6ff; }
        
        .src-foot { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid #f1f5f9; }
        .power-toggle { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: #94a3b8; background:none; border:none; cursor:pointer; }
        .power-toggle.on { color: #10b981; }
        .room-type-tag { font-size:9px; font-weight:800; color:#94a3b8; background:#f1f5f9; padding:2px 8px; border-radius:6px; }
      `}</style>
    </div>
  );
};

export default SmartRoom;
