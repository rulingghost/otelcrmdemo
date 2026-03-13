import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Star,
  Search, Plus, Filter,
  CheckCircle, AlertCircle, ChevronRight,
  MoreVertical, FileText, LayoutGrid,
  Bell, User, ThumbsUp, ThumbsDown,
  Activity, MessageSquare, Globe,
  ShieldCheck, ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts';
import { motion } from 'framer-motion';

const trendData = [
  { name: 'Jun', hk: 4.2, fb: 4.0, fo: 3.8 },
  { name: 'Jul', hk: 4.4, fb: 4.1, fo: 4.0 },
  { name: 'Aug', hk: 4.3, fb: 4.3, fo: 4.2 },
  { name: 'Sep', hk: 4.6, fb: 4.5, fo: 4.4 },
  { name: 'Oct', hk: 4.8, fb: 4.6, fo: 4.5 },
];

const reviews = [
  { guest: 'Emma Thompson', room: '215', date: 'Sep 12, 14:30', score: 5, text: 'Exceptional stay! Room was spotless and breakfast amazing.', avatar: 'ET' },
  { guest: 'Liam Rodriguez', room: '402', date: 'Sep 11, 09:15', score: 4, text: 'Good experience, but AC was a bit noisy.', avatar: 'LR' },
  { guest: 'Sophia Nguyen', room: '118', date: 'Sep 10, 18:45', score: 5, text: 'Wonderful spa treatment and friendly staff.', avatar: 'SN' },
  { guest: 'Noah Wilson', room: 'Rest.', date: 'Sep 09, 20:20', score: 4, text: 'Dinner was delicious, service slow.', avatar: 'NW' },
];

const complaints = [
  { type: 'POSITIVE', room: '2011', issue: 'AC not working', time: '3h ago', status: 'neutral' },
  { type: 'NEUTRAL', room: '202', issue: 'TV remote not responding', time: '5h ago', status: 'neutral' },
  { type: 'EaAt', room: '311', issue: 'Dripping faucet', time: '6h ago', status: 'critical' },
  { type: 'NORMAL', room: '311', issue: 'Minibar empty', time: '8h ago', status: 'normal' },
];

const Surveys = () => {
  return (
    <div className="survey-container">
      <header className="header">
         <div className="title-section">
            <BarChart3 size={32} className="icon-blue"/>
            <div>
               <h2>Guest Feedback & Quality Management</h2>
               <span>Misafir memnuniyeti, anket analizleri ve şikayet yönetimi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn primary green"><Plus size={18}/> ANKET OLUŞTUR</button>
            <button className="btn outline">PERFORMANS RAPORU</button>
            <button className="btn primary blue">MİSAFİRE YANIT VER</button>
         </div>
      </header>

      <div className="survey-grid">
         {/* Left: Departmental Scores & Trend */}
         <aside className="left-panel">
            <section className="card score-card">
               <div className="card-head">
                  <h3>DEPARTMENTAL SCORES</h3>
                  <ChevronDown size={14}/>
               </div>
               <div className="total-score-circle">
                  <div className="circle-inner">
                     <span className="big-val">4.7</span>
                     <div className="sub-val">
                        <strong>4.7</strong> / 5.0
                        <span className="trend pos"><ArrowUpRight size={12}/> +0.2</span>
                     </div>
                  </div>
               </div>
               <div className="dept-bars mt-20">
                  <div className="d-bar-item">
                     <div className="db-head"><span>Housekeeping</span> <strong>4.8</strong></div>
                     <div className="db-progress"><div className="fill" style={{ width: '96%', background: '#059669' }}></div></div>
                  </div>
                  <div className="d-bar-item mt-15">
                     <div className="db-head"><span>Food & Beverage</span> <strong>4.6</strong></div>
                     <div className="db-progress"><div className="fill" style={{ width: '92%', background: '#0891b2' }}></div></div>
                  </div>
                  <div className="d-bar-item mt-15">
                     <div className="db-head"><span>Front Office</span> <strong>4.5</strong></div>
                     <div className="db-progress"><div className="fill" style={{ width: '90%', background: '#0d9488' }}></div></div>
                  </div>
                  <div className="d-bar-item mt-15">
                     <div className="db-head"><span>Spa & Wellness</span> <strong>4.9</strong></div>
                     <div className="db-progress"><div className="fill" style={{ width: '98%', background: '#16a34a' }}></div></div>
                  </div>
               </div>
            </section>

            <section className="card trend-card mt-20">
               <h3>TREND ANALİZİ</h3>
               <div style={{ height: 180 }}>
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={trendData}>
                        <defs>
                           <linearGradient id="colorHk" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <Tooltip />
                        <Area type="monotone" dataKey="hk" stroke="#3b82f6" fillOpacity={1} fill="url(#colorHk)" />
                        <Area type="monotone" dataKey="fb" stroke="#10b981" fillOpacity={0} />
                        <Area type="monotone" dataKey="fo" stroke="#f59e0b" fillOpacity={0} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
               <div className="trend-legend mt-10">
                  <div className="tl-item"><span className="dot blue"></span> HK</div>
                  <div className="tl-item"><span className="dot green"></span> F&B</div>
                  <div className="tl-item"><span className="dot yellow"></span> Front Office</div>
               </div>
            </section>
         </aside>

         {/* Center: Guest Reviews */}
         <section className="main-content">
            <div className="card reviews-card">
               <div className="r-head">
                  <h3>RECENT GUEST REVIEWS</h3>
                  <div className="r-filters">
                     <button className="btn-filter active">Tümü</button>
                     <button className="btn-filter">Oda</button>
                     <button className="btn-filter">Restaurant</button>
                     <div className="search-min">
                        <Search size={14}/>
                        <input type="text" placeholder="Misafir ara..." />
                     </div>
                  </div>
               </div>
               <div className="review-list mt-20">
                  {reviews.map((r, i) => (
                    <div key={i} className="review-item">
                       <div className="riv-avatar">{r.avatar}</div>
                       <div className="riv-content">
                          <div className="riv-head">
                             <strong>{r.guest}</strong>
                             <span className="room">Room {r.room} • {r.date}</span>
                             <div className="stars">
                                {Array.from({length: 5}).map((_, si) => <Star key={si} size={14} fill={si < r.score ? '#f59e0b' : 'none'} stroke={si < r.score ? '#f59e0b' : '#cbd5e1'} />)}
                             </div>
                          </div>
                          <p className="riv-text">{r.text}</p>
                       </div>
                       <MoreVertical size={16} className="gray"/>
                    </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Right: Open Complaints */}
         <aside className="right-panel">
            <section className="card complaints-card">
               <div className="c-head">
                  <h3>OPEN COMPLAINTS</h3>
                  <ChevronDown size={14}/>
               </div>
               <div className="c-list mt-20">
                  {complaints.map((c, i) => (
                    <div key={i} className="c-item">
                       <div className="ci-head">
                          <span className={`tag ${c.status}`}>{c.type}</span>
                          <span className="time">{c.time}</span>
                       </div>
                       <div className="ci-body">
                          <strong>{c.issue}</strong>
                          <span>Room {c.room} • Geçen Hafta</span>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .survey-container {
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

        .actions { display: flex; gap: 10px; }
        .btn { padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; display: flex; align-items: center; gap: 8px; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #1e293b; }
        .btn.primary.green { background: #059669; color: white; }
        .btn.primary.blue { background: #1e293b; color: white; }

        .survey-grid { display: grid; grid-template-columns: 320px 1fr 300px; gap: 30px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; letter-spacing: 0.5px; }

        .score-card { text-align: center; }
        .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        
        .total-score-circle { width: 140px; height: 140px; border: 10px solid #f1f5f9; border-top-color: #059669; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; }
        .circle-inner { display: flex; flex-direction: column; align-items: center; }
        .big-val { font-size: 32px; font-weight: 900; color: #1e293b; }
        .sub-val { font-size: 12px; font-weight: 700; color: #64748b; display: flex; align-items: center; gap: 4px; }
        .trend { font-size: 10px; font-weight: 900; }
        .trend.pos { color: #059669; }

        .dept-bars { text-align: left; }
        .db-head { display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; color: #1e293b; margin-bottom: 8px; }
        .db-progress { height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
        .db-progress .fill { height: 100%; border-radius: 3px; }

        .trend-legend { display: flex; gap: 15px; justify-content: center; }
        .tl-item { display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 800; color: #94a3b8; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .blue { background: #3b82f6; }
        .green { background: #059669; }
        .yellow { background: #f59e0b; }

        .r-head { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; }
        .r-filters { display: flex; gap: 10px; align-items: center; }
        .btn-filter { padding: 6px 15px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; font-size: 11px; font-weight: 800; color: #64748b; cursor: pointer; }
        .btn-filter.active { background: #ecfdf5; color: #059669; border-color: #059669; }
        .search-min { display: flex; align-items: center; gap: 8px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 8px; }
        .search-min input { border: none; background: transparent; outline: none; font-size: 11px; width: 100px; }

        .review-item { display: flex; gap: 20px; border-bottom: 1px solid #f8fafc; padding: 20px 0; }
        .riv-avatar { width: 44px; height: 44px; border-radius: 12px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #3b82f6; font-size: 14px; }
        .riv-content { flex: 1; }
        .riv-head { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .riv-head strong { font-size: 14px; color: #1e293b; }
        .riv-head .room { font-size: 11px; color: #94a3b8; font-weight: 700; }
        .stars { display: flex; gap: 2px; }
        .riv-text { font-size: 13px; color: #475569; line-height: 1.5; }

        .c-item { padding: 15px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 15px; }
        .ci-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .tag { font-size: 9px; font-weight: 900; padding: 2px 8px; border-radius: 4px; }
        .tag.neutral { background: #f1f5f9; color: #64748b; }
        .tag.critical { background: #fee2e2; color: #ef4444; }
        .tag.normal { background: #ecfdf5; color: #059669; }
        .ci-body strong { display: block; font-size: 13px; color: #1e293b; margin-bottom: 4px; }
        .ci-body span { font-size: 11px; color: #94a3b8; font-weight: 700; }

        .gray { color: #94a3b8; }
        .mt-20 { margin-top: 20px; }
        .mt-15 { margin-top: 15px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default Surveys;
