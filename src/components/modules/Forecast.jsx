import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, Calendar, Target, ArrowUpRight,
  Info, Download, Zap, AlertTriangle
} from 'lucide-react';

const Forecast = () => {
  const { rooms, reservations, stats, cashTransactions, TODAY } = useHotel();
  const [range, setRange] = useState('30gün');

  const totalRooms = rooms.length;
  const baseOcc = stats.occupancyRate;
  const avgRate = 2800;

  const forecastData = useMemo(() => {
    const days = range === '14gün' ? 14 : range === '30gün' ? 30 : 90;
    return Array.from({length: days}, (_, i) => {
      const d = new Date(TODAY);
      d.setDate(d.getDate() + i);
      const dow = d.getDay();
      const isWeekend = dow === 0 || dow === 5 || dow === 6;
      const seasonBoost = (d.getMonth() >= 5 && d.getMonth() <= 8) ? 10 : 0;
      const weekendBoost = isWeekend ? 12 : 0;
      const trend = i > 20 ? -3 : (i > 10 ? 2 : 0);
      const noise = Math.round(Math.sin(i * 0.7) * 8);
      const occ = Math.min(100, Math.max(25, baseOcc + weekendBoost + seasonBoost + trend + noise));
      const rev = Math.round((occ / 100) * totalRooms * avgRate);
      const budgetOcc = Math.min(100, baseOcc + 5);
      return {
        date: `${d.getDate()}/${d.getMonth()+1}`,
        fullDate: d.toLocaleDateString('tr-TR',{day:'2-digit',month:'short',weekday:'short'}),
        occ, rev, b_occ: budgetOcc, isWeekend
      };
    });
  }, [range, baseOcc, totalRooms, TODAY]);

  const avgForecastOcc = Math.round(forecastData.reduce((s,d)=>s+d.occ,0)/forecastData.length);
  const totalForecastRev = forecastData.reduce((s,d)=>s+d.rev,0);
  const peakDay = forecastData.reduce((max,d) => d.occ > max.occ ? d : max);
  const lowDay = forecastData.reduce((min,d) => d.occ < min.occ ? d : min);
  const aboveBudgetDays = forecastData.filter(d => d.occ > d.b_occ).length;

  const weeklyAgg = useMemo(() => {
    const weeks = [];
    for(let i=0; i<forecastData.length; i+=7) {
      const chunk = forecastData.slice(i, i+7);
      if(chunk.length === 0) break;
      const avgO = Math.round(chunk.reduce((s,d)=>s+d.occ,0)/chunk.length);
      const totR = chunk.reduce((s,d)=>s+d.rev,0);
      weeks.push({ hafta: `H${weeks.length+1}`, occ: avgO, rev: totR });
    }
    return weeks;
  }, [forecastData]);

  const insights = useMemo(() => {
    const list = [];
    if(avgForecastOcc > 80) list.push({type:'success', text:`Ort. doluluk %${avgForecastOcc} — fiyat artışı değerlendirilmeli`});
    if(avgForecastOcc < 60) list.push({type:'warn', text:`Ort. doluluk %${avgForecastOcc} — kampanya planlaması önerilir`});
    if(peakDay.occ > 95) list.push({type:'success', text:`${peakDay.fullDate} tarihinde %${peakDay.occ} peak bekleniyor — overbooking riski`});
    if(lowDay.occ < 40) list.push({type:'warn', text:`${lowDay.fullDate} tarihinde %${lowDay.occ} — last-minute indirim düşünülebilir`});
    list.push({type:'info', text:`${aboveBudgetDays}/${forecastData.length} gün bütçe hedefinin üzerinde`});
    return list;
  }, [avgForecastOcc, peakDay, lowDay, aboveBudgetDays, forecastData.length]);

  return (
    <div className="frc-page">
      <div className="frc-head">
        <div>
          <h2><TrendingUp size={20}/> İleriye Dönük Tahminleme (Forecast)</h2>
          <span>Gerçek doluluk verisine dayalı {range.replace('gün',' günlük')} projeksiyon</span>
        </div>
        <div className="head-filters">
          <div className="range-pills">
            {['14gün', '30gün', '90gün'].map(r => (
              <button key={r} className={`r-pill ${range === r ? 'active' : ''}`} onClick={() => setRange(r)}>
                {r.replace('gün', ' Gün')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI */}
      <div className="frc-kpis">
        {[
          { label:'Ort. Tahmini Doluluk', val:`%${avgForecastOcc}`, color: avgForecastOcc>75?'#10b981':'#f59e0b' },
          { label:'Toplam Tahmini Gelir', val:`₺${(totalForecastRev/1000000).toFixed(1)}M`, color:'#3b82f6' },
          { label:'Peak Gün', val:`${peakDay.fullDate} (%${peakDay.occ})`, color:'#8b5cf6' },
          { label:'En Düşük Gün', val:`${lowDay.fullDate} (%${lowDay.occ})`, color:'#ef4444' },
        ].map((k,i) => (
          <motion.div key={i} className="frc-kpi" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}>
            <span>{k.label}</span>
            <strong style={{color:k.color}}>{k.val}</strong>
          </motion.div>
        ))}
      </div>

      <div className="frc-grid">
        {/* Ana Grafik */}
        <div className="main-chart-box">
          <div className="mcb-head">
            <h3>Doluluk & Bütçe Karşılaştırması</h3>
            <div className="legend">
              <div className="l-i"><span style={{background:'#3b82f6'}}/> Tahmin</div>
              <div className="l-i"><span style={{background:'#e2e8f0'}}/> Bütçe Hedefi</div>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize:10, fill:'#94a3b8'}} interval={Math.floor(forecastData.length/10)}/>
                <YAxis axisLine={false} tickLine={false} tick={{fontSize:11, fill:'#94a3b8'}} unit="%" domain={[0,100]}/>
                <Tooltip formatter={(v,n) => n==='occ' ? [`%${v}`,'Tahmin'] : [`%${v}`,'Bütçe']}/>
                <Area type="monotone" dataKey="b_occ" stroke="#e2e8f0" fill="transparent" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="occ" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorOcc)" dot={forecastData.length<=14 ? {r:3,fill:'#3b82f6'} : false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Yan Panel */}
        <div className="forecast-stats">
          <div className="fs-card">
            <span className="fs-label">Tahmini ADR</span>
            <div className="fs-main-row">
              <strong>₺{avgRate.toLocaleString()}</strong>
              <span className="fs-trend up"><ArrowUpRight size={12}/> +%{((avgForecastOcc-baseOcc)/baseOcc*100).toFixed(1)}</span>
            </div>
          </div>
          <div className="fs-card">
            <span className="fs-label">RevPAR Hedefi</span>
            <div className="fs-main-row">
              <strong>₺{Math.round(avgRate * avgForecastOcc / 100).toLocaleString()}</strong>
              <span className={`fs-trend ${avgForecastOcc>75?'top':'warn'}`}>{avgForecastOcc>75?'Hedefte':'Altında'}</span>
            </div>
          </div>
          <div className="fs-card">
            <span className="fs-label">Haftalık Gelir Projeksiyonu</span>
            <ResponsiveContainer width="100%" height={80}>
              <BarChart data={weeklyAgg}>
                <Bar dataKey="rev" fill="#3b82f6" radius={[4,4,0,0]}/>
                <Tooltip formatter={v=>[`₺${(v/1000).toFixed(0)}K`,'Gelir']}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="smart-forecast">
            <div className="sf-icon"><Zap size={18} color="#f59e0b" fill="#f59e0b"/></div>
            <h4>AI Tahmin Notları</h4>
            {insights.map((ins,i) => (
              <div key={i} className={`ins-item ${ins.type}`}>
                {ins.type==='warn' ? <AlertTriangle size={12}/> : ins.type==='success' ? <ArrowUpRight size={12}/> : <Info size={12}/>}
                <span>{ins.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .frc-page { padding: 28px; display: flex; flex-direction: column; gap: 20px; }
        .frc-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .frc-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .frc-head span { font-size: 13px; color: #94a3b8; }
        .head-filters { display: flex; gap: 12px; }
        .range-pills { display: flex; background: #f1f5f9; padding: 4px; border-radius: 12px; gap: 4px; }
        .r-pill { padding: 8px 16px; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; background:transparent; }
        .r-pill.active { background: white; color: #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .frc-kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .frc-kpi { background:white; border:1.5px solid #e2e8f0; border-radius:16px; padding:16px 18px; }
        .frc-kpi span { font-size:11px; color:#94a3b8; font-weight:700; display:block; margin-bottom:4px; }
        .frc-kpi strong { font-size:16px; font-weight:900; }
        .frc-grid { display: grid; grid-template-columns: 1fr 340px; gap: 20px; }
        .main-chart-box { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 22px; }
        .mcb-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .mcb-head h3 { font-size: 15px; font-weight: 800; color: #1e293b; }
        .legend { display: flex; gap: 16px; }
        .l-i { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: #64748b; }
        .l-i span { width: 12px; height: 3px; border-radius: 4px; display:inline-block; }
        .forecast-stats { display: flex; flex-direction: column; gap: 14px; }
        .fs-card { background: white; border-radius: 18px; border: 1px solid #e2e8f0; padding: 18px; }
        .fs-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; display:block; margin-bottom:6px; }
        .fs-main-row { display: flex; align-items: baseline; gap: 10px; }
        .fs-main-row strong { font-size: 24px; font-weight: 900; color: #1e293b; }
        .fs-trend { font-size: 11px; font-weight: 800; display: flex; align-items: center; gap: 2px; }
        .fs-trend.up { color: #10b981; }
        .fs-trend.top { background: #eff6ff; color: #3b82f6; padding: 2px 8px; border-radius: 20px; }
        .fs-trend.warn { background: #fffbeb; color: #f59e0b; padding: 2px 8px; border-radius: 20px; }
        .smart-forecast { background: #fffbeb; border-radius: 18px; padding: 18px; border: 1px solid #fde68a; }
        .sf-icon { margin-bottom: 8px; }
        .smart-forecast h4 { font-size: 13px; font-weight: 800; color: #92400e; margin-bottom: 10px; }
        .ins-item { display:flex; align-items:flex-start; gap:6px; font-size:11px; line-height:1.5; margin-bottom:8px; }
        .ins-item.success { color:#10b981; }
        .ins-item.warn { color:#b45309; }
        .ins-item.info { color:#64748b; }
      `}</style>
    </div>
  );
};

export default Forecast;
