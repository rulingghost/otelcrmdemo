import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Users, Bed,
  ArrowUpRight, ArrowDownRight, Bell,
  CheckCircle, AlertCircle, Clock,
  DollarSign, BarChart3, Activity,
  Calendar, Home
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const revenueData = [
  { day: 'Pzt', gelir: 42000, hedef: 38000 },
  { day: 'Sal', gelir: 51000, hedef: 38000 },
  { day: 'Çar', gelir: 38000, hedef: 38000 },
  { day: 'Per', gelir: 65000, hedef: 38000 },
  { day: 'Cum', gelir: 72000, hedef: 38000 },
  { day: 'Cmt', gelir: 88000, hedef: 38000 },
  { day: 'Paz', gelir: 54000, hedef: 38000 },
];

const channelData = [
  { name: 'Booking.com', value: 38, color: '#003580' },
  { name: 'Direkt',      value: 28, color: '#3b82f6' },
  { name: 'Expedia',     value: 18, color: '#ef4444' },
  { name: 'Diğer',       value: 16, color: '#94a3b8' },
];

const ExecutiveDashboard = () => {
  const { stats, reservations, notifications, rooms } = useHotel();

  const statCards = [
    { label: 'Doluluk Oranı',    value: `%${stats.occupancyRate}`, sub: `${stats.occupied}/${stats.totalRooms} oda`, color: '#3b82f6', icon: <Home size={24}/>,     trend: +3.2 },
    { label: 'Bugün Giriş',      value: stats.todayArrivals,       sub: 'Beklenen misafir',  color: '#10b981', icon: <Users size={24}/>,    trend: +5 },
    { label: 'Bugün Çıkış',      value: stats.todayDepartures,     sub: 'Check-out yapacak', color: '#f59e0b', icon: <Calendar size={24}/>, trend: 0 },
    { label: 'Günlük Ciro',      value: `₺${(stats.todayRevenue/1000).toFixed(0)}K`, sub: 'Toplam konaklama geliri', color: '#8b5cf6', icon: <DollarSign size={24}/>, trend: +12.5 },
    { label: 'İç Misafir',       value: stats.inHouse,             sub: 'Aktif konaklama',   color: '#ec4899', icon: <Bed size={24}/>,      trend: +8 },
    { label: 'Bekleyen Görev',   value: stats.pendingTasks,        sub: 'HK + Teknik',       color: '#ef4444', icon: <Clock size={24}/>,    trend: -2 },
  ];

  const inHouseReservations = reservations.filter(r => r.status === 'check-in').slice(0, 5);

  return (
    <div className="ed-container">
      {/* ── Stat Cards ── */}
      <div className="stat-grid">
        {statCards.map((s, i) => (
          <motion.div
            key={i} className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="sc-top">
              <div className="sc-icon" style={{ background: `${s.color}18`, color: s.color }}>{s.icon}</div>
              <div className={`sc-trend ${s.trend > 0 ? 'up' : s.trend < 0 ? 'down' : 'neutral'}`}>
                {s.trend > 0 ? <ArrowUpRight size={14}/> : s.trend < 0 ? <ArrowDownRight size={14}/> : null}
                {s.trend !== 0 ? `${Math.abs(s.trend)}%` : '—'}
              </div>
            </div>
            <div className="sc-value">{s.value}</div>
            <div className="sc-label">{s.label}</div>
            <div className="sc-sub">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="charts-row">
        {/* Revenue trend */}
        <div className="card chart-card wide">
          <div className="card-head">
            <div>
              <h3>Haftalık Gelir Analizi</h3>
              <span>Fiili vs. Hedef</span>
            </div>
            <div className="total-badge">₺410K Bu Hafta</div>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="gelirGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill:'#94a3b8', fontSize:12 }}/>
                <YAxis axisLine={false} tickLine={false} tick={{ fill:'#94a3b8', fontSize:12 }} tickFormatter={v=>`₺${v/1000}K`}/>
                <Tooltip formatter={v=>[`₺${v.toLocaleString()}`, '']}/>
                <Area type="monotone" dataKey="hedef" stroke="#e2e8f0" strokeDasharray="5 5" fill="none" strokeWidth={2}/>
                <Area type="monotone" dataKey="gelir" stroke="#3b82f6" fill="url(#gelirGrad)" strokeWidth={3}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Mix */}
        <div className="card chart-card narrow">
          <div className="card-head">
            <div>
              <h3>Kanal Dağılımı</h3>
              <span>Bu ay rezervasyonlar</span>
            </div>
          </div>
          <div style={{ height: 160, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={channelData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={4}>
                  {channelData.map((e, i) => <Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip formatter={v=>[`%${v}`, '']}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="legend">
            {channelData.map((c, i) => (
              <div key={i} className="legend-item">
                <span className="dot" style={{ background: c.color }}/>
                <span>{c.name}</span>
                <strong>%{c.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="bottom-row">
        {/* In-House table */}
        <div className="card table-card">
          <div className="card-head">
            <h3>Konaklayan Misafirler</h3>
            <span className="badge blue">{stats.inHouse} Kişi</span>
          </div>
          <table className="mini-table">
            <thead>
              <tr><th>Oda</th><th>Misafir</th><th>Giriş</th><th>Çıkış</th><th>Bakiye</th></tr>
            </thead>
            <tbody>
              {inHouseReservations.map(r => (
                <tr key={r.id}>
                  <td><span className="room-tag">{r.room}</span></td>
                  <td><strong>{r.guest}</strong></td>
                  <td>{r.checkIn}</td>
                  <td>{r.checkOut}</td>
                  <td>
                    <span className={r.balance > 0 ? 'bal-due' : 'bal-ok'}>
                      {r.balance > 0 ? `₺${r.balance.toLocaleString()} Borç` : '✓ Kapandı'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notifications */}
        <div className="card notif-card">
          <div className="card-head">
            <h3>Son Bildirimler</h3>
            <Bell size={18} color="#94a3b8"/>
          </div>
          <div className="notif-list">
            {notifications.slice(0, 6).map(n => (
              <div key={n.id} className={`notif-item ${n.type}`}>
                <div className="notif-icon">
                  {n.type === 'success' && <CheckCircle size={16}/>}
                  {n.type === 'warn'    && <AlertCircle size={16}/>}
                  {n.type === 'info'   && <Activity size={16}/>}
                </div>
                <div className="notif-body">
                  <span>{n.msg}</span>
                  <small>{n.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Status summary */}
        <div className="card room-status-card">
          <div className="card-head"><h3>Oda Durumu</h3></div>
          <div className="room-stats">
            {[
              { label:'Dolu',     count: stats.occupied,     color:'#3b82f6' },
              { label:'Boş',      count: stats.vacant,       color:'#10b981' },
              { label:'Kirli',    count: stats.dirty,        color:'#f59e0b' },
              { label:'Arızalı',  count: stats.outOfOrder,   color:'#ef4444' },
            ].map((rs, i) => (
              <div key={i} className="rs-row">
                <span className="rs-dot" style={{ background: rs.color }}/>
                <span className="rs-label">{rs.label}</span>
                <div className="rs-bar-wrap">
                  <div className="rs-bar" style={{ background: rs.color, width: `${(rs.count/stats.totalRooms)*100}%` }}/>
                </div>
                <strong>{rs.count}</strong>
              </div>
            ))}
          </div>
          <div className="occ-big">
            <span>Doluluk</span>
            <strong style={{ color:'#3b82f6' }}>%{stats.occupancyRate}</strong>
          </div>
        </div>
      </div>

      <style>{`
        .ed-container { padding: 30px; display: flex; flex-direction: column; gap: 25px; min-height: 100%; }

        /* Stat Cards */
        .stat-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
        .stat-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 22px; display: flex; flex-direction: column; gap: 8px; cursor: default; }
        .sc-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .sc-icon { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .sc-trend { font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 2px; }
        .sc-trend.up { color: #10b981; } .sc-trend.down { color: #ef4444; } .sc-trend.neutral { color: #94a3b8; }
        .sc-value { font-size: 28px; font-weight: 900; color: #1e293b; line-height: 1; }
        .sc-label { font-size: 13px; font-weight: 700; color: #475569; }
        .sc-sub { font-size: 11px; color: #94a3b8; }

        /* Cards base */
        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 24px; }
        .card-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
        .card-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
        .card-head > div > span, .card-head > span { font-size: 12px; color: #94a3b8; font-weight: 500; }

        /* Charts */
        .charts-row { display: grid; grid-template-columns: 1fr 320px; gap: 20px; }
        .chart-card.wide {}
        .total-badge { background: #eff6ff; color: #3b82f6; padding: 8px 16px; border-radius: 10px; font-size: 14px; font-weight: 800; }

        /* Legend */
        .legend { display: flex; flex-direction: column; gap: 8px; }
        .legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #64748b; }
        .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .legend-item strong { margin-left: auto; color: #1e293b; font-weight: 800; }

        /* Bottom */
        .bottom-row { display: grid; grid-template-columns: 1fr 280px 260px; gap: 20px; }

        /* Table */
        .mini-table { width: 100%; border-collapse: collapse; }
        .mini-table th { text-align: left; padding: 10px; font-size: 11px; color: #94a3b8; text-transform: uppercase; border-bottom: 2px solid #f1f5f9; }
        .mini-table td { padding: 14px 10px; font-size: 13px; color: #475569; border-bottom: 1px solid #f8fafc; }
        .room-tag { background: #f1f5f9; color: #1e293b; font-weight: 800; padding: 4px 10px; border-radius: 8px; font-size: 13px; }
        .bal-due { color: #ef4444; font-weight: 700; font-size: 12px; }
        .bal-ok { color: #10b981; font-weight: 700; font-size: 12px; }

        /* Notifications */
        .notif-list { display: flex; flex-direction: column; gap: 10px; }
        .notif-item { display: flex; align-items: flex-start; gap: 10px; padding: 12px; border-radius: 12px; }
        .notif-item.success { background: #f0fdf4; }
        .notif-item.warn    { background: #fffbeb; }
        .notif-item.info    { background: #eff6ff; }
        .notif-icon { margin-top: 2px; }
        .notif-item.success .notif-icon { color: #10b981; }
        .notif-item.warn    .notif-icon { color: #f59e0b; }
        .notif-item.info    .notif-icon { color: #3b82f6; }
        .notif-body { display: flex; flex-direction: column; gap: 2px; }
        .notif-body span { font-size: 12px; font-weight: 600; color: #1e293b; }
        .notif-body small { font-size: 10px; color: #94a3b8; }

        .badge.blue { background: #eff6ff; color: #3b82f6; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; }

        /* Room Status */
        .room-stats { display: flex; flex-direction: column; gap: 14px; }
        .rs-row { display: flex; align-items: center; gap: 10px; }
        .rs-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .rs-label { font-size: 12px; font-weight: 700; color: #64748b; width: 55px; }
        .rs-bar-wrap { flex: 1; background: #f1f5f9; border-radius: 10px; height: 8px; overflow: hidden; }
        .rs-bar { height: 100%; border-radius: 10px; transition: width 0.6s ease; }
        .rs-row strong { font-size: 14px; font-weight: 800; color: #1e293b; width: 20px; text-align: right; }
        .occ-big { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; padding-top: 16px; border-top: 1px solid #f1f5f9; }
        .occ-big span { font-size: 13px; font-weight: 700; color: #64748b; }
        .occ-big strong { font-size: 28px; font-weight: 900; }

        @media (max-width: 1400px) { .stat-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px) { .charts-row, .bottom-row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default ExecutiveDashboard;
