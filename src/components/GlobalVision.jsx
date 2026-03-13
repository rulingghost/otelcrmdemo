import React from 'react';
import { 
  TrendingUp, Globe, Target, 
  DollarSign, BarChart3, Users,
  ArrowUpRight, ArrowDownRight,
  MapPin, HelpCircle, Filter, 
  LayoutGrid, Share2, Download, Search
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const revenueData = [
  { name: 'Jan', current: 120, last: 100 },
  { name: 'Feb', current: 150, last: 130 },
  { name: 'Mar', current: 180, last: 160 },
  { name: 'Apr', current: 220, last: 190 },
  { name: 'May', current: 260, last: 210 },
  { name: 'Jun', current: 310, last: 240 },
];

const expenseData = [
  { name: 'Salary', value: 5100000, color: '#3b82f6' },
  { name: 'Food', value: 2000000, color: '#10b981' },
  { name: 'Energy', value: 1500000, color: '#f59e0b' },
  { name: 'Marketing', value: 1100000, color: '#ef4444' },
];

const GlobalVision = () => {
  return (
    <div className="gv-container">
      <div className="gv-header">
         <h2>Global Executive Vision Dashboard</h2>
         <div className="header-actions">
            <button className="btn-gv"><Search size={18}/></button>
            <button className="btn-gv"><Filter size={18}/></button>
            <button className="btn-gv"><Share2 size={18}/></button>
            <button className="btn-gv primary"><Download size={18}/> EXPORT REPORT</button>
         </div>
      </div>

      <div className="gv-grid">
         {/* KPI Row */}
         <div className="kpi-row">
            <div className="card kpi-card">
               <span className="label">REVENUE</span>
               <div className="val-row">
                  <strong>$9,802,515</strong>
                  <span className="trend positive"><ArrowUpRight size={14}/> 18%</span>
               </div>
            </div>
            <div className="card kpi-card">
               <span className="label">EBITDA YTD</span>
               <div className="val-row">
                  <strong>$2,354,700</strong>
                  <span className="trend positive"><ArrowUpRight size={14}/> 24%</span>
               </div>
            </div>
            <div className="card kpi-card">
               <span className="label">OCCUPANCY % YTD</span>
               <div className="val-row">
                  <strong>78.4%</strong>
                  <span className="trend positive"><ArrowUpRight size={14}/> 2.1%</span>
               </div>
            </div>
            <div className="card kpi-card">
               <span className="label">ADR</span>
               <div className="val-row">
                  <strong>$268</strong>
                  <span className="trend positive"><ArrowUpRight size={14}/> 6%</span>
               </div>
            </div>
         </div>

         {/* Main Chart Section */}
         <section className="card main-chart-card">
            <div className="section-header">
               <h3>YEARLY REVENUE VS LAST YEAR</h3>
               <div className="chart-legend">
                  <div className="legend-item"><div className="dot blue"></div> Current Year</div>
                  <div className="legend-item"><div className="dot gray"></div> Last Year</div>
               </div>
            </div>
            <div style={{ height: 350 }}>
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                     <Tooltip />
                     <Line type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={4} dot={{r: 4}} activeDot={{r: 8}} />
                     <Line type="monotone" dataKey="last" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </section>

         {/* Right Sidebar - Pie Chart */}
         <aside className="gv-sidebar">
            <section className="card pie-card">
               <h3>EXPENSE DISTRIBUTION</h3>
               <div style={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={expenseData}
                           cx="50%"
                           cy="50%"
                           innerRadius={60}
                           outerRadius={80}
                           paddingAngle={5}
                           dataKey="value"
                        >
                           {expenseData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="pie-label">
                     <strong>$10.7M</strong>
                     <span>TOTAL EXPENSE</span>
                  </div>
               </div>
               <div className="expense-legend">
                  {expenseData.map((item, idx) => (
                    <div key={idx} className="ex-item">
                       <div className="dot" style={{background: item.color}}></div>
                       <span className="name">{item.name}</span>
                       <span className="val">${(item.value / 1000000).toFixed(1)}M</span>
                    </div>
                  ))}
               </div>
            </section>
         </aside>

         {/* World Map Section (Placeholder like) */}
         <section className="card map-section">
            <div className="section-header">
               <h3>GLOBAL PROPERTY LOCATIONS</h3>
               <LayoutGrid size={18} className="gray"/>
            </div>
            <div className="map-placeholder">
               <Globe size={120} className="globe-icon"/>
               <div className="marker m1">12</div>
               <div className="marker m2">8</div>
               <div className="marker m3">5</div>
               <div className="marker m4">17</div>
               <p>Global portfolio distribution across 4 continents</p>
            </div>
         </section>
      </div>

      <style jsx>{`
        .gv-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .gv-header { display: flex; justify-content: space-between; align-items: center; }
        .gv-header h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .header-actions { display: flex; gap: 10px; }
        .btn-gv {
           width: 44px; height: 44px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #64748b; cursor: pointer;
        }
        .btn-gv.primary { width: auto; padding: 0 20px; background: #3b82f6; color: white; border-color: #3b82f6; font-size: 14px; font-weight: 700; gap: 10px; }

        .gv-grid { display: grid; grid-template-columns: 1fr 340px; gap: 30px; }

        .kpi-row { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .kpi-card { padding: 25px; display: flex; flex-direction: column; gap: 8px; }
        .kpi-card .label { font-size: 11px; font-weight: 800; color: #94a3b8; letter-spacing: 1px; }
        .val-row { display: flex; align-items: baseline; justify-content: space-between; }
        .val-row strong { font-size: 24px; font-weight: 800; color: #1e293b; }
        .trend { font-size: 12px; font-weight: 800; display: flex; align-items: center; gap: 4px; }
        .trend.positive { color: #10b981; }

        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .section-header h3 { font-size: 14px; font-weight: 800; color: #1e293b; }

        .chart-legend { display: flex; gap: 20px; }
        .legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #94a3b8; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.blue { background: #3b82f6; }
        .dot.gray { background: #94a3b8; }

        .pie-card { position: relative; }
        .pie-label {
           position: absolute; top: 56%; left: 50%; transform: translate(-50%, -50%); text-align: center; display: flex; flex-direction: column;
        }
        .pie-label strong { font-size: 20px; font-weight: 800; color: #1e293b; }
        .pie-label span { font-size: 10px; color: #94a3b8; font-weight: 700; }

        .expense-legend { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
        .ex-item { display: flex; align-items: center; gap: 12px; font-size: 13px; }
        .ex-item .name { flex: 1; color: #64748b; font-weight: 600; }
        .ex-item .val { font-weight: 800; color: #1e293b; }

        .map-section { grid-column: 1 / 2; }
        .map-placeholder {
           height: 300px; background: #f8fafc; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; color: #cbd5e1;
        }
        .globe-icon { opacity: 0.1; }
        .marker {
           position: absolute; width: 28px; height: 28px; background: #3b82f6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; border: 3px solid white; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.4);
        }
        .m1 { top: 30%; left: 20%; }
        .m2 { top: 25%; left: 50%; }
        .m3 { bottom: 20%; left: 35%; }
        .m4 { bottom: 25%; right: 15%; }

        .map-placeholder p { position: absolute; bottom: 20px; font-size: 13px; font-weight: 600; color: #94a3b8; }
      `}</style>
    </div>
  );
};

export default GlobalVision;
