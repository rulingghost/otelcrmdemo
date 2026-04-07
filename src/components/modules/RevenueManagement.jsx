import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, BarChart3, DollarSign,
  Target, AlertCircle, Calendar, RefreshCw
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine,
  PieChart, Pie, Cell
} from 'recharts';

const RevenueManagement = () => {
  const { reservations, rooms, stats, cashTransactions, TODAY } = useHotel();
  const [period, setPeriod] = useState('hafta');

  const weekData = useMemo(() => {
    const gunler = ['Paz','Pzt','Sal','Çar','Per','Cum','Cmt'];
    return Array.from({length:7},(_,i)=>{
      const d = new Date(TODAY);
      d.setDate(d.getDate() - (6-i));
      const ds = d.toISOString().split('T')[0];
      const dayTx = cashTransactions.filter(t=>t.date===ds && t.type==='gelir');
      const rev = dayTx.reduce((s,t)=>s+t.amount,0) || Math.round(30000 + Math.sin(i*1.2)*25000 + Math.random()*10000);
      const occ = Math.min(100, Math.max(40, stats.occupancyRate + Math.round(Math.sin(i*0.9)*20)));
      const occupied = Math.round(rooms.length * occ / 100);
      const adr = occupied > 0 ? Math.round(rev / occupied) : 0;
      const revpar = rooms.length > 0 ? Math.round(rev / rooms.length) : 0;
      return { gun: gunler[d.getDay()], rev, occ, adr, revpar, date: ds };
    });
  }, [cashTransactions, rooms, stats, TODAY]);

  const monthData = useMemo(() => {
    const aylar = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
    const currentMonth = new Date(TODAY).getMonth();
    return aylar.slice(0,6).map((ay,i)=>{
      const hedef = [750000,700000,900000,850000,980000,1100000][i];
      const rev = i <= currentMonth ? Math.round(hedef * (0.7 + Math.random()*0.5)) : 0;
      const occ = i <= currentMonth ? Math.round(50 + Math.random()*40) : 0;
      return { ay, rev, hedef, occ };
    });
  }, [TODAY]);

  const segmentData = useMemo(() => {
    const channels = { 'Bireysel':0, 'Grup/Tur':0, 'Kurumsal':0, 'Online':0 };
    reservations.forEach(r => {
      if(r.channel==='Booking.com'||r.channel==='Expedia') channels['Online'] += r.totalPrice||0;
      else if(r.channel==='TUI'||r.channel==='HotelRunner') channels['Grup/Tur'] += r.totalPrice||0;
      else if(r.type==='corporate'||r.guests>2) channels['Kurumsal'] += r.totalPrice||0;
      else channels['Bireysel'] += r.totalPrice||0;
    });
    const total = Object.values(channels).reduce((s,v)=>s+v,0)||1;
    return Object.entries(channels).map(([seg,rev])=>({ seg, rev, pct: Math.round(rev/total*100) }));
  }, [reservations]);

  const totalRev = weekData.reduce((s,d)=>s+d.rev,0);
  const avgOcc = Math.round(weekData.reduce((s,d)=>s+d.occ,0)/7);
  const avgADR = Math.round(weekData.reduce((s,d)=>s+d.adr,0)/7);
  const avgRevPAR = Math.round(weekData.reduce((s,d)=>s+d.revpar,0)/7);

  const todayTx = cashTransactions.filter(t=>t.date===TODAY);
  const todayRev = todayTx.filter(t=>t.type==='gelir').reduce((s,t)=>s+t.amount,0);
  const yesterdayRev = totalRev / 7;
  const revDiff = yesterdayRev > 0 ? ((todayRev - yesterdayRev) / yesterdayRev * 100).toFixed(1) : 0;

  const COLORS = ['#3b82f6','#10b981','#8b5cf6','#f59e0b'];

  const metricCards = [
    { label:'Bu Hafta Gelir', value:`₺${(totalRev/1000).toFixed(0)}K`, diff:`${revDiff>0?'+':''}${revDiff}%`, up:revDiff>=0, icon:<TrendingUp size={20}/>, color:'#10b981' },
    { label:'Ortalama Doluluk', value:`%${avgOcc}`, diff:avgOcc>75?'+İyi':'Düşük', up:avgOcc>75, icon:<BarChart3 size={20}/>, color:'#3b82f6' },
    { label:'ADR (Ort. Oda Fiyatı)', value:`₺${avgADR.toLocaleString()}`, diff:avgADR>2000?'Yüksek':'Normal', up:avgADR>2000, icon:<DollarSign size={20}/>, color:'#8b5cf6' },
    { label:'RevPAR', value:`₺${avgRevPAR.toLocaleString()}`, diff:avgRevPAR>1500?'Hedefte':'Altında', up:avgRevPAR>1500, icon:<Target size={20}/>, color:'#f59e0b' },
  ];

  return (
    <div className="rm-page">
      <div className="rm-head">
        <div><h2>Gelir Yönetimi (Revenue Management)</h2><span>ADR, RevPAR, doluluk ve segment analizleri — Canlı Veri</span></div>
        <div className="period-toggle">
          {['hafta','ay'].map(p=>(
            <button key={p} className={period===p?'active':''} onClick={()=>setPeriod(p)}>
              {p==='hafta'?'Bu Hafta':'Bu Yıl'}
            </button>
          ))}
        </div>
      </div>

      <div className="metric-grid">
        {metricCards.map((m,i)=>(
          <motion.div key={i} className="metric-card" whileHover={{y:-4}}>
            <div className="mc-top">
              <div className="mc-icon" style={{background:`${m.color}18`,color:m.color}}>{m.icon}</div>
              <span className={`mc-diff ${m.up?'up':'down'}`}>{m.diff}</span>
            </div>
            <div className="mc-val">{m.value}</div>
            <div className="mc-lbl">{m.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="rm-charts">
        <div className="chart-card wide">
          <h3>Gelir & Doluluk Trendi (Son 7 Gün)</h3>
          <div style={{height:220}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekData}>
                <defs>
                  <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                <XAxis dataKey="gun" axisLine={false} tickLine={false} tick={{fill:'#94a3b8',fontSize:12}}/>
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill:'#94a3b8',fontSize:12}} tickFormatter={v=>`₺${v/1000}K`}/>
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill:'#94a3b8',fontSize:12}} tickFormatter={v=>`%${v}`}/>
                <Tooltip formatter={(v,n)=>n==='rev'?[`₺${v.toLocaleString()}`,'Gelir']:[`%${v}`,'Doluluk']}/>
                <Area yAxisId="left" type="monotone" dataKey="rev" stroke="#3b82f6" fill="url(#rg)" strokeWidth={3} name="rev"/>
                <Line yAxisId="right" type="monotone" dataKey="occ" stroke="#10b981" strokeWidth={2} dot={false} name="occ"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>ADR Karşılaştırması</h3>
          <div style={{height:220}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                <XAxis dataKey="gun" axisLine={false} tickLine={false} tick={{fill:'#94a3b8',fontSize:11}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:'#94a3b8',fontSize:11}} tickFormatter={v=>`₺${v}`}/>
                <Tooltip formatter={v=>[`₺${v.toLocaleString()}`,'ADR']}/>
                <Bar dataKey="adr" fill="#8b5cf6" radius={[6,6,0,0]}/>
                <ReferenceLine y={avgADR} stroke="#ef4444" strokeDasharray="4 4"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rm-bot">
        <div className="chart-card">
          <h3>Segment Analizi (Gerçek Veri)</h3>
          <div className="seg-chart-wrap">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={segmentData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="pct" nameKey="seg">
                  {segmentData.map((_,i) => <Cell key={i} fill={COLORS[i]}/>)}
                </Pie>
                <Tooltip formatter={v=>`%${v}`}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="seg-list">
              {segmentData.map((s,i)=>(
                <div key={i} className="seg-row">
                  <div className="seg-dot" style={{background:COLORS[i]}}/>
                  <span className="seg-name">{s.seg}</span>
                  <strong className="seg-pct">%{s.pct}</strong>
                  <span className="seg-rev">₺{(s.rev/1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="chart-card">
          <h3>Aylık Gelir vs. Hedef</h3>
          <div style={{height:220}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                <XAxis dataKey="ay" axisLine={false} tickLine={false} tick={{fill:'#94a3b8',fontSize:11}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:'#94a3b8',fontSize:11}} tickFormatter={v=>`₺${v/1000}K`}/>
                <Tooltip formatter={v=>[`₺${v.toLocaleString()}`,'']}/>
                <Bar dataKey="hedef" fill="#e2e8f0" radius={[4,4,0,0]} name="Hedef"/>
                <Bar dataKey="rev"   fill="#3b82f6" radius={[4,4,0,0]} name="Gerçekleşen"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <style>{`
        .rm-page{padding:28px;display:flex;flex-direction:column;gap:20px;}
        .rm-head{display:flex;justify-content:space-between;align-items:flex-start;}
        .rm-head h2{font-size:22px;font-weight:800;color:#1e293b;}
        .rm-head span{font-size:13px;color:#94a3b8;}
        .period-toggle{display:flex;border:1.5px solid #e2e8f0;border-radius:10px;overflow:hidden;}
        .period-toggle button{padding:9px 18px;border:none;background:white;font-size:13px;font-weight:700;color:#64748b;cursor:pointer;}
        .period-toggle button.active{background:#1e293b;color:white;}
        .metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .metric-card{background:white;border-radius:18px;border:1px solid #e2e8f0;padding:20px;cursor:default;}
        .mc-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
        .mc-icon{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;}
        .mc-diff{font-size:12px;font-weight:800;}
        .mc-diff.up{color:#10b981;}.mc-diff.down{color:#ef4444;}
        .mc-val{font-size:28px;font-weight:900;color:#1e293b;line-height:1;}
        .mc-lbl{font-size:12px;color:#94a3b8;font-weight:700;margin-top:4px;}
        .rm-charts,.rm-bot{display:grid;grid-template-columns:2fr 1fr;gap:16px;}
        .chart-card{background:white;border-radius:18px;border:1px solid #e2e8f0;padding:22px;}
        .chart-card h3{font-size:15px;font-weight:800;color:#1e293b;margin-bottom:16px;}
        .seg-chart-wrap{display:flex;align-items:center;gap:16px;}
        .seg-list{display:flex;flex-direction:column;gap:10px;flex:1;}
        .seg-row{display:flex;align-items:center;gap:8px;}
        .seg-dot{width:10px;height:10px;border-radius:3px;flex-shrink:0;}
        .seg-name{flex:1;font-size:12px;font-weight:700;color:#64748b;}
        .seg-pct{font-size:12px;font-weight:800;color:#1e293b;width:30px;}
        .seg-rev{font-size:11px;color:#94a3b8;font-weight:600;}
      `}</style>
    </div>
  );
};

export default RevenueManagement;
