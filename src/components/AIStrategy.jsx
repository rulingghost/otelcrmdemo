import React, { useState } from 'react';
import { 
  Bot, Zap, TrendingUp, 
  Search, Settings, Bell, 
  ChevronRight, MoreVertical, LayoutGrid,
  ShieldCheck, RefreshCw, Activity,
  AlertCircle, CheckCircle, BarChart3,
  Clock, ArrowUpRight, ArrowDownRight,
  Database, User
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line
} from 'recharts';
import { motion } from 'framer-motion';

const heatmapData = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  occ: Math.floor(Math.random() * 40) + 60,
  demand: Math.floor(Math.random() * 100),
}));

const aiLogs = [
  { action: 'Lowered prices for 10 rooms', reason: 'Due to local event cancellation', time: '5 hu ago' },
  { action: 'Ordered 50 extra towels', reason: 'Due high VIP arrival prediction', time: '7 h ago' },
  { action: 'Increased suite pricing by 18%', reason: 'For high demand weekend', time: '1 day ago' },
  { action: 'Activated channel price sync', reason: 'Automated strategy alignment', time: '2 day ago' },
];

const insights = [
  { text: 'Ai adjusted rates for August', type: 'info' },
  { text: 'Occupancy boost detected', type: 'success' },
  { text: 'Conference demand spike predicted for next Friday', type: 'warning' },
  { text: 'Low demand detected for early October', type: 'alert' },
];

const AIStrategy = () => {
  const [strategyOn, setStrategyOn] = useState(true);

  return (
    <div className="ai-container">
      <header className="header">
         <div className="title-section">
            <Bot size={32} className={strategyOn ? 'icon-blue' : 'icon-gray'}/>
            <div>
               <h2>Ai Autonomous Strategy Center</h2>
               <span>Otonom fiyatlandırma, talep tahmini ve operasyonel optimizasyon</span>
            </div>
         </div>
         <div className="actions">
            <div className={`switch-box ${strategyOn ? 'on' : 'off'}`}>
               <span>AI STRATEGY {strategyOn ? 'ON' : 'OFF'}</span>
               <button onClick={() => setStrategyOn(!strategyOn)} className="switch">
                  <div className="s-dot"></div>
               </button>
            </div>
            <button className="icon-btn"><Settings size={18}/></button>
         </div>
      </header>

      <div className="ai-grid">
         {/* Center Top: Heatmap & Forecast */}
         <section className="main-content">
            <div className="card heatmap-card">
               <div className="c-head">
                  <h3>365-DEMAND HEATMAP</h3>
                  <div className="h-meta">
                     <span className="low">Low Demand</span>
                     <div className="gradient-bar"></div>
                     <span className="high">High Demand</span>
                  </div>
               </div>
               <div className="heatmap-grid">
                  {heatmapData.map((d, i) => (
                    <div 
                      key={i} 
                      className="heat-cell" 
                      style={{ 
                         background: `rgba(59, 130, 246, ${d.demand / 100})`,
                         opacity: d.demand < 20 ? 0.3 : 1
                      }}
                      title={`Day ${d.day}: ${d.demand}% Demand`}
                    ></div>
                  ))}
               </div>
            </div>

            <div className="forecast-row mt-20">
               <div className="card forecast-card">
                  <div className="c-head">
                     <h3>AI FORECAST</h3>
                     <div className="legend">
                        <div className="l-item"><div className="dot blue"></div> Predicted Revenue</div>
                        <div className="l-item"><div className="dot green"></div> Actual Revenue</div>
                     </div>
                  </div>
                  <div style={{ height: 250 }}>
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={heatmapData}>
                           <defs>
                              <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                 <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <Area type="monotone" dataKey="occ" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPred)" />
                           <Line type="monotone" dataKey="day" stroke="#10b981" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>
         </section>

         {/* Side Columns */}
         <aside className="left-panel">
            <section className="card insights-card">
               <h3>STRATEGIC INSIGHTS</h3>
               <div className="ins-list">
                  {insights.map((ins, i) => (
                    <div key={i} className={`ins-item ${ins.type}`}>
                       <ShieldCheck size={16}/>
                       <span>{ins.text}</span>
                    </div>
                  ))}
               </div>
            </section>

            <section className="card control-card mt-20">
               <div className="c-head">
                  <h3>PMS TAPE CHART (AI VIEW)</h3>
                  <button className="mini-btn"><LayoutGrid size={12}/> View</button>
               </div>
               <div className="mini-chart-mockup">
                  {/* Visual mockup of a tape chart */}
                  <div className="mock-row"></div>
                  <div className="mock-row active"></div>
                  <div className="mock-row"></div>
               </div>
            </section>
         </aside>

         <aside className="right-panel">
            <section className="card action-log-card">
               <h3>AUTONOMOUS ACTIONS LOG</h3>
               <div className="act-list">
                  {aiLogs.map((log, i) => (
                    <div key={i} className="act-item">
                       <div className="act-info">
                          <RefreshCw size={14} className="blue"/>
                          <div className="act-text">
                             <strong>{log.action}</strong>
                             <span>{log.reason}</span>
                          </div>
                       </div>
                       <span className="act-time">{log.time}</span>
                    </div>
                  ))}
               </div>
            </section>

            <section className="card mt-20 stats-card">
               <div className="head">
                  <h3>GLOBAL YIELD OPTIMIZER</h3>
                  <div className="gib-badge">ON</div>
               </div>
               <div className="yield-stat mt-15">
                  <span>Current Yield Index</span>
                  <strong>1.05</strong>
               </div>
               <button className="btn-full mt-10">REAL TIME DATA SYNC</button>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .ai-container {
          padding: 30px;
          background: #f8fafc;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-blue { color: #3b82f6; }
        .icon-gray { color: #94a3b8; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { font-size: 14px; color: #64748b; }

        .switch-box { display: flex; align-items: center; gap: 15px; background: #f1f5f9; padding: 10px 20px; border-radius: 12px; }
        .switch-box span { font-size: 11px; font-weight: 900; color: #64748b; letter-spacing: 0.5px; }
        .switch { width: 44px; height: 24px; background: #cbd5e1; border-radius: 12px; border: none; position: relative; cursor: pointer; transition: 0.3s; }
        .s-dot { width: 18px; height: 18px; background: white; border-radius: 50%; position: absolute; top: 3px; left: 3px; transition: 0.3s; }
        .switch-box.on .switch { background: #10b981; }
        .switch-box.on .s-dot { left: 23px; }

        .icon-btn { width: 40px; height: 40px; background: white; border: 1px solid #e2e8f0; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #64748b; cursor: pointer; }

        .ai-grid { display: grid; grid-template-columns: 260px 1fr 300px; gap: 30px; }

        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 12px; font-weight: 900; color: #1e293b; margin-bottom: 25px; letter-spacing: 1px; }

        .heatmap-grid { display: grid; grid-template-columns: repeat(15, 1fr); gap: 4px; }
        .heat-cell { width: 100%; height: 32px; border-radius: 4px; cursor: help; transition: 0.2s; }
        .heat-cell:hover { transform: scale(1.1); z-index: 10; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        
        .h-meta { display: flex; align-items: center; gap: 15px; }
        .gradient-bar { width: 150px; height: 8px; background: linear-gradient(90deg, #eff6ff, #3b82f6); border-radius: 4px; }
        .low, .high { font-size: 10px; color: #94a3b8; font-weight: 800; }

        .ins-item { display: flex; align-items: center; gap: 12px; padding: 15px; border-radius: 12px; margin-bottom: 12px; font-size: 12px; font-weight: 700; }
        .ins-item.info { background: #eff6ff; color: #3b82f6; }
        .ins-item.success { background: #ecfdf5; color: #10b981; }
        .ins-item.warning { background: #fffbeb; color: #f59e0b; }
        .ins-item.alert { background: #fff1f2; color: #ef4444; }

        .act-item { display: flex; justify-content: space-between; align-items: flex-start; padding: 15px 0; border-bottom: 1px solid #f8fafc; }
        .act-info { display: flex; align-items: flex-start; gap: 12px; }
        .act-text { display: flex; flex-direction: column; gap: 4px; }
        .act-text strong { font-size: 12px; color: #1e293b; }
        .act-text span { font-size: 11px; color: #64748b; line-height: 1.4; }
        .act-time { font-size: 10px; font-weight: 800; color: #94a3b8; flex-shrink: 0; }

        .yield-stat span { font-size: 11px; color: #94a3b8; font-weight: 800; display: block; margin-bottom: 5px; }
        .yield-stat strong { font-size: 28px; color: #1e293b; }

        .btn-full { width: 100%; padding: 12px; background: #1e293b; color: white; border-radius: 10px; font-size: 11px; font-weight: 800; cursor: pointer; border: none; }

        .mini-btn { border: none; background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 800; display: flex; align-items: center; gap: 5px; cursor: pointer; color: #64748b; }
        .blue { color: #3b82f6; }
        .legend { display: flex; gap: 20px; }
        .l-item { display: flex; align-items: center; gap: 8px; font-size: 10px; color: #94a3b8; font-weight: 800; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.blue { background: #3b82f6; }
        .dot.green { background: #10b981; }

        .mt-20 { margin-top: 20px; }
        .mt-15 { margin-top: 15px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default AIStrategy;
