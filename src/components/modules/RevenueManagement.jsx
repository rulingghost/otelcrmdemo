import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, TrendingDown, BarChart3, DollarSign,
  Target, AlertCircle, Calendar, RefreshCw
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine
} from 'recharts';

const WEEK_DATA = [
  { gun:'Pzt', rev:42000, occ:68, adr:1838, revpar:1250 },
  { gun:'Sal', rev:51000, occ:75, adr:2040, revpar:1530 },
  { gun:'Çar', rev:38000, occ:57, adr:1995, revpar:1137 },
  { gun:'Per', rev:65000, occ:93, adr:2097, revpar:1950 },
  { gun:'Cum', rev:72000, occ:100,adr:2057, revpar:2057 },
  { gun:'Cmt', rev:88000, occ:100,adr:2514, revpar:2514 },
  { gun:'Paz', rev:54000, occ:79, adr:2044, revpar:1614 },
];

const MONTH_DATA = [
  { ay:'Oca', rev:820000, hedef:750000, occ:71 },
  { ay:'Şub', rev:690000, hedef:700000, occ:62 },
  { ay:'Mar', rev:410000, hedef:900000, occ:78 }, // in-progress
  { ay:'Nis', rev:0,      hedef:850000, occ:0  },
  { ay:'May', rev:0,      hedef:980000, occ:0  },
  { ay:'Haz', rev:0,      hedef:1100000,occ:0  },
];

const SEGMENT_DATA = [
  { seg:'Bireysel', rev:180000, pct:44 },
  { seg:'Grup/Tur', rev:95000,  pct:23 },
  { seg:'Kurumsal', rev:72000,  pct:18 },
  { seg:'Online',   rev:62000,  pct:15 },
];

const RevenueManagement = () => {
  const { reservations, rooms, stats } = useHotel();
  const [period, setPeriod] = useState('hafta');

  const totalRev = WEEK_DATA.reduce((s,d)=>s+d.rev,0);
  const avgOcc   = Math.round(WEEK_DATA.reduce((s,d)=>s+d.occ,0)/WEEK_DATA.length);
  const avgADR   = Math.round(WEEK_DATA.reduce((s,d)=>s+d.adr,0)/WEEK_DATA.length);
  const avgRevPAR= Math.round(WEEK_DATA.reduce((s,d)=>s+d.revpar,0)/WEEK_DATA.length);

  const metricCards = [
    { label:'Bu Hafta Gelir', value:`₺${(totalRev/1000).toFixed(0)}K`, diff:'+12.4%', up:true, icon:<TrendingUp size={20}/>, color:'#10b981' },
    { label:'Ortalama Doluluk', value:`%${avgOcc}`, diff:'+5.2%', up:true, icon:<BarChart3 size={20}/>, color:'#3b82f6' },
    { label:'ADR (Ort. Oda Fiyatı)', value:`₺${avgADR.toLocaleString()}`, diff:'+8.1%', up:true, icon:<DollarSign size={20}/>, color:'#8b5cf6' },
    { label:'RevPAR', value:`₺${avgRevPAR.toLocaleString()}`, diff:'+15.3%', up:true, icon:<Target size={20}/>, color:'#f59e0b' },
  ];

  return (
    <div className="rm-page">
      <div className="rm-head">
        <div><h2>Gelir Yönetimi (Revenue Management)</h2><span>ADR, RevPAR, doluluk ve segment analizleri</span></div>
        <div className="period-toggle">
          {['hafta','ay'].map(p=>(
            <button key={p} className={period===p?'active':''} onClick={()=>setPeriod(p)}>
              {p==='hafta'?'Bu Hafta':'Bu Yıl'}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
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

      {/* Charts */}
      <div className="rm-charts">
        <div className="chart-card wide">
          <h3>Gelir & Doluluk Trendi</h3>
          <div style={{height:220}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WEEK_DATA}>
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
              <BarChart data={WEEK_DATA}>
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

      {/* Segment + Aylık */}
      <div className="rm-bot">
        <div className="chart-card">
          <h3>Segment Analizi</h3>
          <div className="seg-list">
            {SEGMENT_DATA.map((s,i)=>(
              <div key={i} className="seg-row">
                <span className="seg-name">{s.seg}</span>
                <div className="seg-bar-wrap"><div className="seg-bar" style={{width:`${s.pct}%`,background:['#3b82f6','#10b981','#8b5cf6','#f59e0b'][i]}}/></div>
                <span className="seg-pct">%{s.pct}</span>
                <strong className="seg-rev">₺{(s.rev/1000).toFixed(0)}K</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-card">
          <h3>Aylık Gelir vs. Hedef</h3>
          <div style={{height:220}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTH_DATA}>
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
        .seg-list{display:flex;flex-direction:column;gap:14px;}
        .seg-row{display:flex;align-items:center;gap:10px;}
        .seg-name{width:70px;font-size:12px;font-weight:700;color:#64748b;}
        .seg-bar-wrap{flex:1;height:10px;background:#f1f5f9;border-radius:10px;overflow:hidden;}
        .seg-bar{height:100%;border-radius:10px;transition:width 0.5s;}
        .seg-pct{font-size:12px;font-weight:800;color:#64748b;width:30px;}
        .seg-rev{font-size:13px;font-weight:900;color:#1e293b;width:40px;text-align:right;}
      `}</style>
    </div>
  );
};

export default RevenueManagement;
