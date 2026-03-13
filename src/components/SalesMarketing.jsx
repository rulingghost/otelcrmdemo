import React, { useState } from 'react';
import { 
  Users, Search, Plus, 
  Target, TrendingUp, BarChart3,
  Calendar, Globe, ShieldCheck,
  Briefcase, Mail, Phone,
  ChevronRight, ArrowUpRight, Download,
  Percent, Zap, Gift, Tag,
  LayoutDashboard, Activity, CheckCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { motion } from 'framer-motion';

const marketData = [
  { segment: 'Corporate', volume: 450, growth: '+12%', color: '#3b82f6' },
  { segment: 'Leisure', volume: 820, growth: '+5%', color: '#10b981' },
  { segment: 'MICE', volume: 180, growth: '-2%', color: '#f59e0b' },
  { segment: 'Gov / Diplomatic', volume: 120, growth: '0%', color: '#6366f1' },
];

const performanceData = [
  { month: 'Oca', sales: 450, target: 400 },
  { month: 'Şub', sales: 520, target: 480 },
  { month: 'Mar', sales: 610, target: 550 },
  { month: 'Nis', sales: 780, target: 600 },
  { month: 'May', sales: 820, target: 700 },
];

const channelStats = [
  { name: 'Booking.com', ADR: '$142', volume: '34%', status: 'active' },
  { name: 'Expedia', ADR: '$138', volume: '22%', status: 'active' },
  { name: 'Direct Web (B2C)', ADR: '$155', volume: '18%', status: 'high' },
  { name: 'Sedna B2B', ADR: '$128', volume: '26%', status: 'active' },
];

const offers = [
  { id: 1, title: 'Stay 7 Pay 5 (Aksiyon)', type: 'Combo', status: 'Live', code: 'S7P5_SUM24' },
  { id: 2, title: 'Early Bird - Summer 2025', type: 'EB', status: 'Draft', code: 'EB25_RES' },
  { id: 3, title: 'Honeymoon Package Upgrade', type: 'Gift', status: 'Live', code: 'HMON_24' },
];

const SalesMarketing = () => {
  return (
    <div className="sales-container">
      <header className="header">
         <div className="title-section">
            <TrendingUp size={32} className="icon-blue"/>
            <div>
               <h2>Satış, Pazarlama & Kontrat Yönetimi</h2>
               <span>Dinamik fiyat kuralları, aksiyonlar ve pazar analizleri</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><Download size={18}/> BÜTÇE & FORECAST</button>
            <button className="btn primary"><Zap size={18}/> YENİ KONTRAT / AKSİYON</button>
         </div>
      </header>

      <div className="sales-grid">
         {/* Top Metrics Row */}
         <section className="metrics-row">
            <div className="card metric-card">
               <div className="m-icon blue"><Target size={24}/></div>
               <div>
                  <span className="label">YILLIK HEDEF GERÇEKLEŞME</span>
                  <strong>% 84.2</strong>
                  <div className="p-bar"><div className="p-fill blue" style={{ width: '84.2%' }}></div></div>
               </div>
            </div>
            <div className="card metric-card">
               <div className="m-icon green"><Activity size={24}/></div>
               <div>
                  <span className="label">ADR (AVERAGE DAILY RATE)</span>
                  <strong>$ 142.50</strong>
                  <div className="trend pos"><ArrowUpRight size={14}/> 8% artış</div>
               </div>
            </div>
            <div className="card metric-card">
               <div className="m-icon purple"><Globe size={24}/></div>
               <div>
                  <span className="label">KANAL DOLULUK KATKISI</span>
                  <strong>% 92.0</strong>
                  <div className="trend blue">Kanal Entegrasyonu OK</div>
               </div>
            </div>
         </section>

         {/* Sales Performance Chart */}
         <section className="card chart-section">
            <div className="section-header">
               <div className="sh-title">
                  <BarChart3 size={20} className="blue"/>
                  <h3>GELİR ANALİZİ (GERÇEKLEŞEN VS HEDEF)</h3>
               </div>
               <div className="chart-legend">
                  <span className="leg-item"><div className="dot gray"></div> Hedef</span>
                  <span className="leg-item"><div className="dot blue"></div> Gerçekleşen</span>
               </div>
            </div>
            <div style={{ height: 320 }}>
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                     <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                     />
                     <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                     <Area type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </section>

         {/* Offers & Campaigns */}
         <section className="card offers-section">
            <div className="section-header">
               <h3>AKTİF KAMPANYALAR & AKSİYONLAR</h3>
               <button className="icon-btn"><Plus size={16}/></button>
            </div>
            <div className="offers-list">
               {offers.map(offer => (
                 <div key={offer.id} className="offer-item">
                    <div className="o-type"><Tag size={16}/></div>
                    <div className="o-info">
                       <strong>{offer.title}</strong>
                       <div className="o-meta">
                          <code className="code">{offer.code}</code>
                          <span className={`status ${offer.status.toLowerCase()}`}>{offer.status}</span>
                       </div>
                    </div>
                    <ChevronRight size={16} className="gray"/>
                 </div>
               ))}
            </div>
         </section>

         {/* Channel Performance Sidebar */}
         <aside className="sales-sidebar">
            <section className="card channel-card">
               <div className="sh-title">
                  <Globe size={18} className="blue"/>
                  <h3>KANAL PERFORMANSI</h3>
               </div>
               <div className="channel-list mt-20">
                  {channelStats.map((ch, i) => (
                    <div key={i} className="ch-item">
                       <div className="ch-head">
                          <strong>{ch.name}</strong>
                          <span className="ch-vol">{ch.volume}</span>
                       </div>
                       <div className="ch-stats">
                          <span>ADR: {ch.ADR}</span>
                          <div className={`ch-status ${ch.status === 'high' ? 'pulse-green' : ''}`}>
                             <div className="dot"></div> {ch.status.toUpperCase()}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            <section className="card segment-card mt-20">
               <h3>PAZAR SEGMENTLERİ</h3>
               <div className="seg-grid">
                  {marketData.map((m, i) => (
                    <div key={i} className="seg-item-compact">
                       <div className="dot" style={{ background: m.color }}></div>
                       <div className="si-data">
                          <span>{m.segment}</span>
                          <strong>{m.volume} O/G</strong>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .sales-container {
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

        .btn { padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; border: none; font-size: 13px; display: flex; align-items: center; gap: 10px; }
        .btn.primary { background: #3b82f6; color: white; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .sales-grid { display: grid; grid-template-columns: 1fr 320px; gap: 30px; }

        .metrics-row { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .metric-card { display: flex; align-items: center; gap: 20px; padding: 25px; }
        .m-icon { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .m-icon.blue { background: #eff6ff; color: #3b82f6; }
        .m-icon.green { background: #ecfdf5; color: #10b981; }
        .m-icon.purple { background: #f5f3ff; color: #8b5cf6; }
        
        .metric-card .label { font-size: 10px; font-weight: 900; color: #94a3b8; letter-spacing: 1px; }
        .metric-card strong { font-size: 26px; font-weight: 900; color: #1e293b; display: block; margin: 4px 0; }
        .p-bar { width: 150px; height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden; margin-top: 8px; }
        .p-fill { height: 100%; border-radius: 10px; }
        .p-fill.blue { background: #3b82f6; }

        .card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .sh-title { display: flex; align-items: center; gap: 10px; }
        .section-header h3 { font-size: 15px; font-weight: 800; color: #1e293b; }

        .chart-legend { display: flex; gap: 20px; }
        .leg-item { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #64748b; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.blue { background: #3b82f6; }
        .dot.gray { background: #e2e8f0; }

        .offers-list { display: flex; flex-direction: column; gap: 12px; }
        .offer-item { display: flex; align-items: center; gap: 15px; padding: 15px; background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; transition: 0.2s; cursor: pointer; }
        .offer-item:hover { border-color: #3b82f6; background: #f0f9ff; }
        .o-type { width: 36px; height: 36px; background: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #3b82f6; border: 1px solid #e2e8f0; }
        .o-info { flex: 1; }
        .o-info strong { display: block; font-size: 14px; color: #1e293b; margin-bottom: 4px; }
        .o-meta { display: flex; align-items: center; gap: 15px; }
        .code { font-family: monospace; font-size: 11px; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #475569; }
        .status { font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 20px; text-transform: uppercase; }
        .status.live { background: #ecfdf5; color: #10b981; }
        .status.draft { background: #f1f5f9; color: #64748b; }

        .channel-list { display: flex; flex-direction: column; gap: 15px; }
        .ch-item { padding: 15px; background: #f8fafc; border-radius: 15px; }
        .ch-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .ch-head strong { font-size: 14px; color: #1e293b; }
        .ch-vol { background: #eff6ff; color: #3b82f6; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 800; }
        .ch-stats { display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-weight: 700; color: #94a3b8; }
        .ch-status { display: flex; align-items: center; gap: 6px; font-size: 9px; }
        .ch-status .dot { width: 6px; height: 6px; background: #10b981; }
        
        .pulse-green { color: #10b981; font-weight: 900; }
        .pulse-green .dot { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }

        .seg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px; }
        .seg-item-compact { display: flex; align-items: center; gap: 10px; padding: 10px; background: #f8fafc; border-radius: 10px; }
        .si-data span { display: block; font-size: 10px; color: #94a3b8; font-weight: 700; }
        .si-data strong { font-size: 12px; color: #1e293b; }

        .icon-btn { width: 32px; height: 32px; background: #f1f5f9; border: none; border-radius: 8px; color: #64748b; cursor: pointer; }
        .trend { font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; gap: 5px; }
        .trend.pos { color: #10b981; }
        .trend.blue { color: #3b82f6; }
        
        .mt-20 { margin-top: 20px; }
        .mt-15 { margin-top: 15px; }
        .gray { color: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default SalesMarketing;
