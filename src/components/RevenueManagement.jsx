import React, { useState } from 'react';
import { 
  TrendingUp, Search, Plus, 
  Target, BarChart3, PieChart as PieIcon,
  Globe, Zap, Bot, 
  ChevronRight, ArrowUpRight, ArrowDownRight,
  Filter, Calendar, DollarSign
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { motion } from 'framer-motion';

const demandData = [
  { name: 'May', historical: 4000, pickup: 4500, occ: 65 },
  { name: 'Jun', historical: 5000, pickup: 6200, occ: 78 },
  { name: 'Jul', historical: 7000, pickup: 8400, occ: 98 },
  { name: 'Aug', historical: 6500, pickup: 7500, occ: 88 },
  { name: 'Sep', historical: 4500, pickup: 5200, occ: 72 },
];

const compsData = [
  { name: 'Hotel A', price: '$245', trend: '+6' },
  { name: 'Hotel B', price: '$230', trend: '+10' },
  { name: 'Hotel C', price: '$225', trend: '0' },
  { name: 'Hotel D', price: '$210', trend: '+5' },
  { name: 'Hotel E', price: '$195', trend: '-15' },
];

const priceMatrix = [
  { ota: 'Booking.com', std: '$220', lux: '$223', suite: '$222', bar: '$196', total: '$223' },
  { ota: 'Expedia', std: '$235', lux: '$230', suite: '$225', bar: '$233', total: '$218' },
  { ota: 'HotelRunner', std: '$220', lux: '$220', suite: '$222', bar: '$125', total: '$125' },
];

const RevenueManagement = () => {
  return (
    <div className="revenue-container">
      <header className="header">
         <div className="title-section">
            <TrendingUp size={32} className="icon-blue"/>
            <div>
               <h2>Revenue Management & Dynamic Pricing</h2>
               <span>Talep projeksiyonu, rakip analizi ve OTA fiyat yönetimi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline">REVENUE STRATEGY</button>
            <button className="btn outline">MARKET SEGMENTATION</button>
            <button className="btn primary red">GÜN KAPAT</button>
         </div>
      </header>

      <div className="rev-grid">
         {/* Left: Forecast List */}
         <aside className="left-panel">
            <section className="card mini-card">
               <h3>DEMAND FORECAST</h3>
               <div className="m-list">
                  <div className="m-item"><span>Hotel Plan. 65%</span> <CheckCircle size={14} className="green"/></div>
                  <div className="m-item"><strong>Hotel A:</strong> $245 <CheckCircle size={14} className="green"/></div>
                  <div className="m-item"><strong>Hotel B:</strong> $250 <CheckCircle size={14} className="green"/></div>
                  <div className="m-item"><strong>Hotel C:</strong> $225 <CheckCircle size={14} className="green"/></div>
                  <div className="m-item disabled"><strong>Hotel D:</strong> $210</div>
               </div>
            </section>

            <section className="card mt-20 mini-card">
               <h3>COMPSET ANALYSIS</h3>
               <div className="c-list">
                  {compsData.map((c, i) => (
                    <div key={i} className="c-item">
                       <div className="c-name">{c.name}: <strong>{c.price}</strong></div>
                       <span className={c.trend.startsWith('+') ? 'pos' : 'neg'}>{c.trend}</span>
                    </div>
                  ))}
               </div>
               <div className="revenue-summary mt-20">
                  <span>YTD REVENUE: <strong>+12%</strong></span>
                  <span>RGI INDEX: <strong>1.05</strong></span>
               </div>
            </section>
         </aside>

         {/* Center: Main Charts & Matrix */}
         <section className="main-content">
            <div className="card chart-card">
               <div className="c-head">
                  <h3>DEMAND FORECAST</h3>
                  <div className="c-meta">Historical Av: 45.2 days | Pickup: <strong>€18,950</strong></div>
               </div>
               <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={demandData}>
                        <defs>
                           <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                        <YAxis hide />
                        <Tooltip />
                        <Area type="monotone" dataKey="occ" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorOcc)" />
                        <Line type="monotone" dataKey="historical" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="card matrix-card mt-20">
               <div className="c-head">
                  <h3>PRICE MATRIX</h3>
                  <span>Adjust rates across all OTAs simultaneously</span>
               </div>
               <table className="matrix-table">
                  <thead>
                     <tr>
                        <th>OTA</th>
                        <th>Standard</th>
                        <th>Deluxe</th>
                        <th>Suite</th>
                        <th>BAR</th>
                        <th>Total</th>
                     </tr>
                  </thead>
                  <tbody>
                     {priceMatrix.map((p, i) => (
                       <tr key={i}>
                          <td><strong>{p.ota}</strong></td>
                          <td>{p.std} <ArrowUpRight size={10} className="green"/></td>
                          <td>{p.lux} <ArrowUpRight size={10} className="green"/></td>
                          <td>{p.suite} <ArrowDownRight size={10} className="red"/></td>
                          <td>{p.bar} <ArrowDownRight size={10} className="red"/></td>
                          <td><strong>{p.total}</strong></td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </section>

         {/* Right: AI & Summary */}
         <aside className="right-panel">
            <section className="card side-summary">
               <h3>GÜNÜN ÖZETİ</h3>
               <div className="mini-gauge">
                  <div className="g-circle">
                     <span>85%</span>
                     <strong>Normal</strong>
                  </div>
                  <div className="g-info">
                     <strong>DOLULUK:</strong>
                     <span>% 88</span>
                  </div>
               </div>
               <div className="adr-stat mt-20">
                  <span>ADR</span>
                  <strong>$145</strong>
               </div>
            </section>

            <section className="card ai-card mt-20">
               <div className="head"><Bot size={18}/> <h3>AI RECOMMENDATIONS</h3></div>
               <ul className="rec-list">
                  <li>Demand is high for July 15, increase rates by 15%.</li>
                  <li>Suite rooms are booking fast, consider raising prices by 10%.</li>
                  <li>Competitor prices decreased for May 2-3, adjust rates to maintain competitiveness.</li>
               </ul>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .revenue-container {
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
        .btn { padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }
        .btn.primary.red { background: #1e293b; color: white; }

        .rev-grid { display: grid; grid-template-columns: 240px 1fr 280px; gap: 30px; }

        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 12px; font-weight: 900; color: #1e293b; letter-spacing: 0.5px; }

        .m-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f8fafc; font-size: 12px; color: #475569; }
        .m-item.disabled { opacity: 0.5; }

        .c-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; font-size: 12px; }
        .c-item strong { color: #1e293b; }
        .pos { color: #10b981; font-weight: 700; }
        .neg { color: #ef4444; font-weight: 700; }

        .revenue-summary { display: flex; flex-direction: column; gap: 8px; border-top: 1px solid #f1f5f9; padding-top: 15px; }
        .revenue-summary span { font-size: 12px; color: #64748b; font-weight: 700; }
        .revenue-summary strong { color: #1e293b; }

        .c-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .c-meta { font-size: 12px; color: #64748b; }
        .c-meta strong { color: #1e293b; }

        .matrix-table { width: 100%; border-collapse: collapse; }
        .matrix-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; text-transform: uppercase; }
        .matrix-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; }
        .matrix-table td strong { color: #1e293b; }

        .mini-gauge { display: flex; align-items: center; gap: 20px; }
        .g-circle { width: 80px; height: 80px; border: 8px solid #3b82f6; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .g-circle span { font-size: 18px; font-weight: 900; color: #1e293b; }
        .g-circle strong { font-size: 10px; color: #3b82f6; text-transform: uppercase; }
        .g-info strong { font-size: 11px; color: #94a3b8; display: block; }

        .adr-stat span { font-size: 11px; color: #94a3b8; font-weight: 800; display: block; }
        .adr-stat strong { font-size: 24px; color: #1e293b; }

        .ai-card { background: #fffcf0; border-color: #fef3c7; }
        .ai-card .head { display: flex; align-items: center; gap: 10px; color: #f59e0b; margin-bottom: 15px; }
        .rec-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .rec-list li { font-size: 12px; color: #854d0e; line-height: 1.5; padding-left: 15px; position: relative; }
        .rec-list li:before { content: '•'; position: absolute; left: 0; color: #f59e0b; font-weight: 900; }

        .green { color: #10b981; }
        .red { color: #ef4444; }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
};

const CheckCircle = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <path d="m9 11 3 3L22 4"></path>
  </svg>
);

export default RevenueManagement;
