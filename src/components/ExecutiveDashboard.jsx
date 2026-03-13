import React, { useState } from 'react';
import { 
  LayoutDashboard, Search, Bell, 
  TrendingUp, BarChart3, PieChart as PieIcon,
  Globe, Zap, Bot, User, 
  ArrowUpRight, ArrowDownRight,
  Filter, Calendar, Smartphone,
  Target, ShieldCheck, Mail, Phone,
  ChevronRight, MoreVertical, AlertCircle
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area
} from 'recharts';
import { motion } from 'framer-motion';

const growthData = [
  { month: 'Jan', value: 240 }, { month: 'Feb', value: 310 },
  { month: 'Mar', value: 380 }, { month: 'Apr', value: 420 },
  { month: 'May', value: 480 }, { month: 'Jun', value: 520 },
  { month: 'Jul', value: 610 }, { month: 'Aug', value: 580 },
  { month: 'Sep', value: 640 }, { month: 'Oct', value: 710 },
  { month: 'Nov', value: 780 }, { month: 'Dec', value: 840 },
];

const acenteler = [
  { name: 'ETS TUR', active: true },
  { name: 'Pegast' },
  { name: 'Coral' },
  { name: 'Touristica', isNew: true },
  { name: 'TUI' },
  { name: 'Anex Tour' },
  { name: 'Odamax' },
  { name: 'Hotelbeds' },
];

const ExecutiveDashboard = () => {
  return (
    <div className="exec-container">
      <header className="header">
         <div className="title-section">
            <LayoutDashboard size={32} className="icon-blue"/>
            <div>
               <h2>CEO Executive Dashboard</h2>
               <span>Makro veriler, yıllık büyüme ve mobil operasyon takibi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><Search size={18}/> ACENTELER ARA...</button>
            <div className="user-profile">
               <div className="u-text"><strong>Yönetici</strong></div>
               <div className="avatar">Y</div>
            </div>
         </div>
      </header>

      <div className="exec-grid">
         {/* Left: Agency List */}
         <aside className="left-panel">
            <section className="card agency-card">
               <h3>ACENTELER</h3>
               <div className="a-list">
                  {acenteler.map((a, i) => (
                    <div key={i} className={`a-item ${a.active ? 'active' : ''}`}>
                       <div className="icon-box"><Globe size={16}/> {a.name}</div>
                       {a.isNew && <span className="new-tag">YENİ</span>}
                    </div>
                  ))}
               </div>
            </section>
         </aside>

         {/* Center: Main KPIs & Charts */}
         <section className="main-content">
            <div className="kpi-row">
               <div className="card kpi-card">
                  <span className="label">Today's Occupancy</span>
                  <div className="k-val">
                     <strong>% 86</strong>
                     <span className="pos"><ArrowUpRight size={14}/> 5%</span>
                  </div>
               </div>
               <div className="card kpi-card">
                  <span className="label">ADR</span>
                  <div className="k-val">
                     <strong>$152</strong>
                     <span className="pos"><ArrowUpRight size={14}/> 8%</span>
                  </div>
               </div>
               <div className="card kpi-card">
                  <span className="label">RevPAR</span>
                  <div className="k-val">
                     <strong>$130.7</strong>
                     <span className="pos"><ArrowUpRight size={14}/> 12%</span>
                  </div>
               </div>
               <div className="card kpi-card">
                  <span className="label">Monthly Revenue</span>
                  <div className="k-val">
                     <strong>$4.1M</strong>
                     <span className="pos"><ArrowUpRight size={14}/> 15%</span>
                  </div>
               </div>
            </div>

            <section className="card charts-card mt-20">
               <h3>YEARLY GROWTH</h3>
               <div style={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={growthData}>
                        <defs>
                           <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </section>

            <section className="card charts-card mt-20">
               <div style={{ height: 180 }}>
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={growthData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" hide />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={true} />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
            </section>
         </section>

         {/* Right: Mobile Mockup */}
         <aside className="right-panel">
            <div className="mobile-mockup">
               <div className="m-screen">
                  <header className="m-header">
                     <div className="m-title">CEO DASHBOARD</div>
                     <div className="m-user">Y</div>
                  </header>
                  <div className="m-content">
                     <div className="m-stat-row">
                        <TrendingUp size={16} className="green"/>
                        <span>Today's Occupancy: <strong>%86</strong></span>
                     </div>
                     <div className="m-stat-row">
                        <DollarSignIcon size={16} className="green"/>
                        <span>ADR: <strong>$152</strong></span>
                     </div>
                     <div className="m-stat-row">
                        <BarChart3 size={16} className="green"/>
                        <span>RevPAR: <strong>$130.7</strong></span>
                     </div>
                     
                     <div className="m-revenue">
                        <span>Monthly Revenue</span>
                        <strong>$4.1M</strong>
                     </div>

                     <button className="m-btn red">STOP SALE (ALL CHANNELS)</button>
                     <button className="m-btn blue">SEND EMERGENCY NOTIFICATION</button>
                     <button className="m-btn outline">VIP ARRIVAL LIST</button>
                  </div>
               </div>
            </div>
         </aside>
      </div>

      <style jsx>{`
        .exec-container {
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

        .user-profile { display: flex; align-items: center; gap: 15px; }
        .u-text strong { font-size: 14px; color: #1e293b; }
        .avatar { width: 40px; height: 40px; background: #eff6ff; border: 2px solid #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #3b82f6; }

        .exec-grid { display: grid; grid-template-columns: 240px 1fr 340px; gap: 30px; }

        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 12px; font-weight: 900; color: #1e293b; margin-bottom: 20px; letter-spacing: 0.5px; }

        .a-item { display: flex; align-items: center; justify-content: space-between; padding: 12px; border-radius: 10px; font-size: 13px; font-weight: 700; color: #64748b; cursor: pointer; border: 2px solid transparent; }
        .a-item.active { border-color: #3b82f6; background: #eff6ff; color: #3b82f6; }
        .icon-box { display: flex; align-items: center; gap: 10px; }
        .new-tag { font-size: 9px; background: #f59e0b; color: white; padding: 2px 6px; border-radius: 4px; }

        .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .kpi-card { padding: 20px; }
        .kpi-card .label { font-size: 11px; font-weight: 800; color: #94a3b8; display: block; margin-bottom: 5px; }
        .k-val { display: flex; align-items: center; gap: 10px; }
        .k-val strong { font-size: 22px; color: #1e293b; }
        .k-val .pos { font-size: 11px; color: #10b981; font-weight: 800; display: flex; align-items: center; }

        .mobile-mockup { width: 100%; height: 650px; background: #1e293b; border-radius: 40px; padding: 12px; border: 8px solid #334155; position: relative; box-shadow: 20px 20px 40px rgba(0,0,0,0.1); }
        .m-screen { width: 100%; height: 100%; background: white; border-radius: 30px; overflow: hidden; display: flex; flex-direction: column; }
        .m-header { background: #f8fafc; padding: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; }
        .m-title { font-size: 12px; font-weight: 900; color: #1e293b; }
        .m-user { width: 28px; height: 28px; background: #3b82f6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900; }
        
        .m-content { padding: 20px; display: flex; flex-direction: column; gap: 15px; }
        .m-stat-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #475569; }
        .m-stat-row strong { color: #1e293b; }
        
        .m-revenue { background: #f0f9ff; padding: 15px; border-radius: 12px; text-align: center; }
        .m-revenue span { font-size: 11px; color: #3b82f6; font-weight: 800; }
        .m-revenue strong { display: block; font-size: 24px; color: #1e40af; }

        .m-btn { width: 100%; padding: 12px; border-radius: 10px; font-size: 11px; font-weight: 900; border: none; cursor: pointer; }
        .m-btn.red { background: #ef4444; color: white; }
        .m-btn.blue { background: #3b82f6; color: white; }
        .m-btn.outline { background: white; border: 1.5px solid #e2e8f0; color: #64748b; }

        .btn { padding: 10px 20px; border-radius: 10px; font-size: 12px; font-weight: 700; cursor: pointer; border: none; }
        .btn.outline { background: #f8fafc; border: 1px solid #e2e8f0; color: #64748b; }

        .green { color: #10b981; }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
};

const DollarSignIcon = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

export default ExecutiveDashboard;
