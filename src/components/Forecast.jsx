import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Target, 
  DollarSign, Clock, Filter,
  ArrowUpRight, ArrowDownRight,
  TrendingDown, Calendar, Percent,
  ArrowRight, Layers, LayoutGrid
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const forecastData = [
  { month: 'Nis', occ: 45, rev: 1240000 },
  { month: 'May', occ: 58, rev: 1580000 },
  { month: 'Haz', occ: 82, rev: 2840000 },
  { month: 'Tem', occ: 95, rev: 4120000 },
  { month: 'Ağu', occ: 98, rev: 4250000 },
  { month: 'Eyl', occ: 75, rev: 2100000 },
];

const segmentData = [
  { name: 'OTA', value: 45, color: '#3b82f6' },
  { name: 'Direct', value: 25, color: '#10b981' },
  { name: 'Agency', value: 20, color: '#f59e0b' },
  { name: 'Group', value: 10, color: '#8b5cf6' },
];

const Forecast = () => {
  return (
    <div className="forecast-container">
      <header className="header">
         <div className="title-section">
            <TrendingUp size={32} className="icon-blue"/>
            <div>
               <h2>365-Day Revenue & Occupancy Forecast</h2>
               <span>Gelecek projeksiyonları, doluluk tahminleri ve finansal hedefler</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><Filter size={18}/> SEGMENT FİLTRESİ</button>
            <button className="btn primary"><BarChart3 size={18}/> DETAYLI ANALİZ</button>
         </div>
      </header>

      <div className="stats-row">
         <div className="card kpi-card">
            <span>Forecasted ADR</span>
            <strong>$ 242.00</strong>
            <div className="trend pos"><ArrowUpRight size={14}/> 8.2% vs Last Year</div>
         </div>
         <div className="card kpi-card">
            <span>Market Share Index</span>
            <strong>108%</strong>
            <div className="trend pos"><ArrowUpRight size={14}/> 2.1% Growth</div>
         </div>
         <div className="card kpi-card">
            <span>Pickup (MTD)</span>
            <strong>+244 Rms</strong>
            <div className="trend pos"><ArrowUpRight size={14}/> High Velocity</div>
         </div>
      </div>

      <div className="main-grid">
         {/* Main Forecast Chart */}
         <section className="card chart-section">
            <div className="section-head">
               <h3>OCUPANCY & REVENUE FORECAST (6 MONTHS)</h3>
            </div>
            <div style={{ height: 350 }}>
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastData}>
                     <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                     <Tooltip />
                     <Area type="monotone" dataKey="rev" stroke="#3b82f6" fill="url(#colorRev)" strokeWidth={3} />
                     <Area type="monotone" dataKey="occ" stroke="#10b981" fill="transparent" strokeWidth={3} fillOpacity={0} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </section>

         {/* Right sidebar: Breakdown */}
         <aside className="breakdown-column">
            <section className="card pie-card">
               <h3>CHANNEL BREAKDOWN</h3>
               <div className="pie-list">
                  {segmentData.map((s, idx) => (
                    <div key={idx} className="pie-item">
                       <div className="dot" style={{ background: s.color }}></div>
                       <span className="name">{s.name}</span>
                       <div className="val-box">
                          <strong>{s.value}%</strong>
                          <div className="bar"><div className="fill" style={{ width: `${s.value}%`, background: s.color }}></div></div>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            <div className="card budget-nudge mt-20">
               <Layers size={24} className="purple"/>
               <p>Bütçe hedeflerinin gerisindesiniz. <strong>Ağustos</strong> ayı için ek bir kampanya planlanması önerilir.</p>
               <button className="btn-link">Bütçeyi İncele <ArrowRight size={14}/></button>
            </div>
         </aside>
      </div>

      <style jsx>{`
        .forecast-container {
          padding: 30px;
          background: #f8fafc;
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
        .btn { padding: 12px 24px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; border: none; font-size: 14px; }
        .btn.primary { background: #1e293b; color: white; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .kpi-card { padding: 25px; display: flex; flex-direction: column; gap: 8px; }
        .kpi-card span { font-size: 12px; font-weight: 800; color: #94a3b8; }
        .kpi-card strong { font-size: 24px; font-weight: 900; color: #1e293b; }
        .trend { font-size: 11px; font-weight: 800; display: flex; align-items: center; gap: 5px; }
        .trend.pos { color: #10b981; }

        .main-grid { display: grid; grid-template-columns: 1fr 320px; gap: 30px; }

        .card { background: white; border-radius: 20px; padding: 25px; border: 1px solid #e2e8f0; }
        .section-head h3 { font-size: 13px; font-weight: 900; color: #1e293b; margin-bottom: 25px; letter-spacing: 1px; }

        .pie-list { display: flex; flex-direction: column; gap: 20px; }
        .pie-item { display: flex; align-items: center; gap: 15px; }
        .pie-item .dot { width: 10px; height: 10px; border-radius: 50%; }
        .pie-item .name { font-size: 13px; font-weight: 700; color: #64748b; flex: 1; }
        .val-box { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; width: 100px; }
        .val-box strong { font-size: 14px; color: #1e293b; }
        .bar { width: 100%; height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
        .fill { height: 100%; }

        .budget-nudge { background: #fdf4ff; border-color: #f5d0fe; }
        .budget-nudge p { font-size: 13px; color: #701a75; line-height: 1.5; margin: 15px 0; }
        .btn-link { background: transparent; border: none; font-size: 12px; font-weight: 800; color: #d946ef; cursor: pointer; display: flex; align-items: center; gap: 5px; padding: 0; }

        .purple { color: #8b5cf6; }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
};

export default Forecast;
