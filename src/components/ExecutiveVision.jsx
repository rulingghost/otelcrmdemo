import React from 'react';
import { 
  BarChart3, TrendingUp, DollarSign, 
  Globe, Landmark, PieChart as PieIcon,
  Search, Settings, Bell, User,
  ArrowUpRight, ArrowDownRight,
  Filter, Calendar, Map as MapIcon,
  ChevronRight, MoreVertical, LayoutGrid,
  ShieldCheck, Zap
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { motion } from 'framer-motion';

const macroData = [
  { month: 'Jan', current: 75, last: 70 },
  { month: 'Feb', current: 85, last: 75 },
  { month: 'Mar', current: 90, last: 80 },
  { month: 'Apr', current: 110, last: 95 },
  { month: 'May', current: 130, last: 110 },
  { month: 'Jun', current: 150, last: 120 },
  { month: 'Jul', current: 165, last: 135 },
  { month: 'Aug', current: 160, last: 130 },
  { month: 'Sep', current: 175, last: 145 },
  { month: 'Oct', current: 190, last: 160 },
  { month: 'Nov', current: 205, last: 175 },
  { month: 'Dec', current: 215, last: 185 },
];

const expenseData = [
  { name: 'Salary', value: 5.1, color: '#3b82f6' },
  { name: 'Food', value: 2.0, color: '#10b981' },
  { name: 'Energy', value: 1.5, color: '#8b5cf6' },
  { name: 'Marketing', value: 1.1, color: '#f59e0b' },
];

const ExecutiveVision = () => {
  return (
    <div className="vision-container">
      <header className="header">
         <div className="title-section">
            <Landmark size={32} className="icon-blue"/>
            <div>
               <h2>Global Executive Vision Dashboard</h2>
               <span>Zincir bazlı makro finansal veriler ve global operasyonel görünüm</span>
            </div>
         </div>
         <div className="actions">
            <button className="icon-btn"><Search size={18}/></button>
            <button className="icon-btn"><Settings size={18}/></button>
            <div className="user-profile">
               <div className="avatar">Y</div>
            </div>
         </div>
      </header>

      <div className="vision-grid">
         {/* Top KPIs */}
         <section className="kpi-row">
            <div className="card kpi-card">
               <span className="label">REVENUE</span>
               <div className="k-val">
                  <strong>$9,802,515</strong>
                  <span className="pos"><ArrowUpRight size={14}/> 18%</span>
               </div>
            </div>
            <div className="card kpi-card">
               <span className="label">EBITDA YTD</span>
               <div className="k-val">
                  <strong>$2,354,700</strong>
                  <span className="pos"><ArrowUpRight size={14}/> 24%</span>
               </div>
            </div>
            <div className="card kpi-card">
               <span className="label">OCCUPANCY % YTD</span>
               <div className="k-val">
                  <strong>78.4%</strong>
                  <span className="pos"><ArrowUpRight size={14}/> 2.1</span>
               </div>
            </div>
            <div className="card kpi-card">
               <span className="label">ADR</span>
               <div className="k-val">
                  <strong>$268</strong>
                  <span className="pos"><ArrowUpRight size={14}/> 6%</span>
               </div>
            </div>
            <div className="card kpi-card">
               <span className="label">REVPAR</span>
               <div className="k-val">
                  <strong>$268</strong>
                  <span className="pos"><ArrowUpRight size={14}/> 6%</span>
               </div>
            </div>
         </section>

         {/* Main Chart & Side Info */}
         <div className="center-grid mt-20">
            <section className="card chart-card">
               <div className="c-head">
                  <h3>YEARLY REVENUE VS LAST YEAR</h3>
                  <div className="legend">
                     <div className="l-item"><div className="dot blue"></div> Current Year</div>
                     <div className="l-item"><div className="dot gray"></div> Last Year</div>
                  </div>
               </div>
               <div style={{ height: 350 }}>
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={macroData}>
                        <defs>
                           <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                        <Tooltip />
                        <Area type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCurrent)" />
                        <Area type="monotone" dataKey="last" stroke="#cbd5e1" strokeWidth={2} fillOpacity={0} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </section>

            <aside className="side-panel">
               <section className="card expense-card">
                  <h3>EXPENSE DISTRIBUTION</h3>
                  <div className="donut-box">
                     <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                           <Pie
                              data={expenseData}
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                           >
                              {expenseData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                           </Pie>
                        </PieChart>
                     </ResponsiveContainer>
                     <div className="d-text">
                        <strong>$10.7M</strong>
                        <span>TOTAL</span>
                     </div>
                  </div>
                  <div className="exp-list">
                     {expenseData.map((e, i) => (
                       <div key={i} className="exp-item">
                          <div className="e-label">
                             <div className="dot" style={{ background: e.color }}></div>
                             <span>{e.name}</span>
                          </div>
                          <strong>${e.value}M</strong>
                       </div>
                     ))}
                  </div>
               </section>
            </aside>
         </div>

         {/* Bottom: Map & Details */}
         <div className="bottom-grid mt-20">
            <section className="card map-card">
               <h3>WORLD MAP - PROPERTY LOCATIONS</h3>
               <div className="map-placeholder">
                  <div className="pin pin-1">12</div>
                  <div className="pin pin-2">8</div>
                  <div className="pin pin-3">17</div>
                  <div className="pin pin-4">5</div>
                  <div className="pin pin-5">4</div>
               </div>
            </section>

            <section className="card details-card">
               <h3>PROPERTY PERFORMANCE</h3>
               <div className="p-perf-list">
                  {expenseData.map((p, i) => (
                    <div key={i} className="p-perf-item">
                       <div className="p-info">
                          <div className="dot" style={{ background: p.color }}></div>
                          <span>Property {i+1}</span>
                       </div>
                       <div className="p-val">
                          <strong>$5.1M</strong>
                          <span className="pos">47.5%</span>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
         </div>
      </div>

      <style jsx>{`
        .vision-container {
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

        .actions { display: flex; align-items: center; gap: 15px; }
        .icon-btn { width: 40px; height: 40px; background: white; border: 1px solid #e2e8f0; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #64748b; cursor: pointer; }
        .avatar { width: 40px; height: 40px; background: #3b82f6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; }

        .kpi-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        .kpi-card { padding: 25px; border: none; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.02); }
        .kpi-card .label { font-size: 11px; font-weight: 800; color: #94a3b8; letter-spacing: 0.5px; display: block; margin-bottom: 8px; }
        .k-val { display: flex; align-items: center; gap: 10px; }
        .k-val strong { font-size: 24px; color: #1e293b; }
        .pos { color: #10b981; font-weight: 800; font-size: 12px; display: flex; align-items: center; gap: 4px; }

        .center-grid { display: grid; grid-template-columns: 1fr 300px; gap: 20px; }
        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 25px; }
        .card h3 { font-size: 12px; font-weight: 900; color: #1e293b; margin-bottom: 25px; letter-spacing: 0.5px; }

        .c-head { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .legend { display: flex; gap: 20px; }
        .l-item { display: flex; align-items: center; gap: 8px; font-size: 11px; color: #64748b; font-weight: 700; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.blue { background: #3b82f6; }
        .dot.gray { background: #cbd5e1; }

        .donut-box { position: relative; display: flex; align-items: center; justify-content: center; }
        .d-text { position: absolute; text-align: center; }
        .d-text strong { display: block; font-size: 18px; color: #1e293b; }
        .d-text span { font-size: 10px; color: #94a3b8; font-weight: 800; }

        .exp-list { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
        .exp-item { display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
        .e-label { display: flex; align-items: center; gap: 10px; color: #64748b; }

        .map-placeholder { height: 400px; background: #f8fafc; border-radius: 12px; position: relative; background-image: url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg'); background-size: contain; background-repeat: no-repeat; background-position: center; opacity: 0.6; }
        .pin { position: absolute; background: #3b82f6; color: white; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .pin-1 { top: 30%; left: 20%; }
        .pin-2 { top: 35%; left: 45%; }
        .pin-3 { top: 60%; left: 80%; }
        .pin-4 { top: 55%; left: 55%; }
        .pin-5 { top: 70%; left: 30%; }

        .p-perf-list { display: flex; flex-direction: column; gap: 15px; }
        .p-perf-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #f8fafc; border-radius: 12px; }
        .p-info { display: flex; align-items: center; gap: 12px; color: #475569; font-weight: 700; font-size: 13px; }
        .p-val { text-align: right; }
        .p-val strong { display: block; font-size: 14px; color: #1e293b; }

        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
};

export default ExecutiveVision;
