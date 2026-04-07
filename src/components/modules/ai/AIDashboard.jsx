import React, { useState, useMemo } from 'react';
import { useHotel } from '../../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Zap, Users, Bed, DollarSign, AlertTriangle, CheckCircle, ArrowRight, Lightbulb, Loader2 } from 'lucide-react';

const AIDashboard = () => {
  const { rooms, reservations, guests, cashTransactions, stats, tasks, inventory, staff, TODAY, addNotification } = useHotel();
  const [actingOn, setActingOn] = useState(null);
  const [completedActions, setCompletedActions] = useState([]);

  const occupied = rooms.filter(r => r.status === 'dolu').length;
  const total = rooms.length;
  const occRate = Math.round((occupied / total) * 100);
  const todayRev = cashTransactions.filter(t => t.type === 'gelir' && t.date === TODAY).reduce((s, t) => s + t.amount, 0);
  const todayExp = cashTransactions.filter(t => t.type === 'gider' && t.date === TODAY).reduce((s, t) => s + t.amount, 0);
  const avgRate = Math.round(rooms.filter(r => r.status === 'dolu').reduce((s, r) => s + r.rate, 0) / (occupied || 1));
  const revPAR = Math.round((todayRev / total));
  const openBalance = reservations.filter(r => r.status === 'check-in').reduce((s, r) => s + r.balance, 0);
  const lowStockItems = inventory.filter(i => i.stock < i.minStock);
  const pendingTasks = tasks.filter(t => t.status !== 'bitti');
  const goldGuests = guests.filter(g => g.loyalty === 'Platinum' || g.loyalty === 'Gold');

  const channelData = ['Booking.com', 'Expedia', 'Direkt', 'HotelRunner', 'TUI'].map(ch => ({
    name: ch, value: reservations.filter(r => r.channel === ch).length
  })).filter(d => d.value > 0);

  const roomTypeData = ['Standard', 'Deluxe', 'Suite', 'Penthouse'].map(t => {
    const typeRooms = rooms.filter(r => r.type === t);
    const occ = typeRooms.filter(r => r.status === 'dolu').length;
    return { name: t, doluluk: Math.round((occ / (typeRooms.length || 1)) * 100), toplam: typeRooms.length, dolu: occ };
  });

  const revenueData = [
    { gun: 'Pzt', gelir: 95000, gider: 22000 },
    { gun: 'Sal', gelir: 110000, gider: 18000 },
    { gun: 'Çar', gelir: 88000, gider: 25000 },
    { gun: 'Per', gelir: 125000, gider: 20000 },
    { gun: 'Cum', gelir: 145000, gider: 30000 },
    { gun: 'Cmt', gelir: 180000, gider: 28000 },
    { gun: 'Paz', gelir: todayRev || 130000, gider: todayExp || 15000 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  const insights = useMemo(() => {
    const rawInsights = [];
    if (occRate > 80) rawInsights.push({ id:'occHigh', type: 'success', icon: <TrendingUp size={16}/>, title: 'Yüksek Doluluk Fırsatı', desc: `Doluluk oranı %${occRate} — fiyatların %10 artırılması önerilir.`, impact: `+₺${Math.round(avgRate * 0.1 * occupied).toLocaleString()}`, action: 'Fiyatları %10 Artır' });
    if (occRate < 60) rawInsights.push({ id:'occLow', type: 'warn', icon: <TrendingDown size={16}/>, title: 'Düşük Doluluk Uyarısı', desc: `%${occRate} doluluk — OTA'lara kampanya aktivasyonu önerilir.`, impact: 'Kampanya Uygula', action: 'Kanal İndirimi Başlat' });
    if (lowStockItems.length > 0) rawInsights.push({ id:'stock', type: 'warn', icon: <AlertTriangle size={16}/>, title: 'Kritik Stok Uyarıları', desc: `${lowStockItems.map(i => i.name).join(', ')} minimum seviyenin altında.`, impact: `${lowStockItems.length} Stok Riski`, action: 'Otomatik Sipariş Ver' });
    if (openBalance > 0) rawInsights.push({ id:'balance', type: 'info', icon: <DollarSign size={16}/>, title: 'Ödenmemiş Bakiyeler', desc: `Toplam ₺${openBalance.toLocaleString()} açık hesap tespit edildi.`, impact: `₺${openBalance.toLocaleString()}`, action: 'Hatırlatma E-Postası At' });
    if (pendingTasks.length > 3) rawInsights.push({ id:'tasks', type: 'warn', icon: <Zap size={16}/>, title: 'Görev Yığılması', desc: `${pendingTasks.length} adet bekleyen görev var, personel yükü optimize edilebilir.`, impact: `${pendingTasks.length} Bekleyen`, action: 'Rota Optimizasyonu Yap' });
    if (goldGuests.length > 0) rawInsights.push({ id:'vip', type: 'success', icon: <Users size={16}/>, title: 'VIP Misafir Fırsatı', desc: `${goldGuests.length} üst düzey misafir için özel teklif gönder.`, impact: `${goldGuests.length} VIP`, action: 'Teklif Maili Gönder' });
    
    return rawInsights.filter(ins => !completedActions.includes(ins.id));
  }, [occRate, lowStockItems, openBalance, pendingTasks, goldGuests, completedActions]);

  const kpiCards = [
    { label: 'Doluluk Oranı', val: `%${occRate}`, sub: `${occupied}/${total} oda`, color: '#3b82f6', trend: occRate > 75 ? 'up' : 'down' },
    { label: 'Günlük Gelir', val: `₺${todayRev.toLocaleString()}`, sub: `Gider: ₺${todayExp.toLocaleString()}`, color: '#10b981', trend: 'up' },
    { label: 'RevPAR', val: `₺${revPAR.toLocaleString()}`, sub: 'Oda başı gelir', color: '#8b5cf6', trend: 'up' },
    { label: 'ADR (Ort. Fiyat)', val: `₺${avgRate.toLocaleString()}`, sub: 'Dolu oda ort.', color: '#f59e0b', trend: 'up' },
  ];

  const handleActionClick = (insight) => {
    setActingOn(insight.id);
    setTimeout(() => {
      setActingOn(null);
      setCompletedActions(p => [...p, insight.id]);
      addNotification({ type: 'success', msg: `AI İşlemi Tamamlandı: ${insight.action}` });
    }, 1500);
  };

  return (
    <div className="ai-dash">
      <div className="kpi-row">
        {kpiCards.map((k, i) => (
          <motion.div key={k.label} className="kpi-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="kpi-dot" style={{ background: k.color }} />
            <span className="kpi-label">{k.label}</span>
            <div className="kpi-val" style={{ color: k.color }}>{k.val}</div>
            <span className="kpi-sub">{k.sub}</span>
            <div className={`kpi-trend ${k.trend}`}>{k.trend === 'up' ? <TrendingUp size={12}/> : <TrendingDown size={12}/>} {k.trend === 'up' ? 'Artış' : 'Düşüş'}</div>
          </motion.div>
        ))}
      </div>

      <div className="dash-grid">
        <div className="dash-chart-card">
          <h3>Haftalık Gelir & Gider</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="gGelir" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                <linearGradient id="gGider" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ef4444" stopOpacity={0.2}/><stop offset="100%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
              </defs>
              <XAxis dataKey="gun" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={v => `${(v/1000)}k`} />
              <Tooltip formatter={(v) => `₺${v.toLocaleString()}`} />
              <Area type="monotone" dataKey="gelir" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gGelir)" />
              <Area type="monotone" dataKey="gider" stroke="#ef4444" strokeWidth={2} fill="url(#gGider)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="dash-chart-card">
          <h3>Kanal Dağılımı</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={channelData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                {channelData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-legend">{channelData.map((d, i) => <span key={d.name}><i style={{ background: COLORS[i % COLORS.length] }}/>{d.name} ({d.value})</span>)}</div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-chart-card">
          <h3>Oda Tipi Doluluk</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={roomTypeData} barSize={32}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip formatter={(v) => `%${v}`} />
              <Bar dataKey="doluluk" radius={[8, 8, 0, 0]}>
                {roomTypeData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dash-chart-card insights-card">
          <div className="ins-head"><Lightbulb size={18} color="#f59e0b"/><h3>AI Aksiyon Önerileri</h3><span className="live-dot">Canlı</span></div>
          <div className="ins-list">
            <AnimatePresence>
              {insights.length === 0 && (
                <motion.div className="ins-empty" initial={{opacity:0}} animate={{opacity:1}}>
                  <CheckCircle size={32} color="#10b981" />
                  <p>Tüm öneriler uygulandı, sistem optimize.</p>
                </motion.div>
              )}
              {insights.map((ins, i) => (
                <motion.div key={ins.id} className={`ins-row ${ins.type}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <div className="ins-icon">{ins.icon}</div>
                  <div className="ins-body">
                    <strong>{ins.title}</strong>
                    <p>{ins.desc}</p>
                    <div className="ins-bot-row">
                      <span className="ins-impact">{ins.impact}</span>
                      <button className="ins-action-btn" onClick={() => handleActionClick(ins)} disabled={actingOn === ins.id}>
                        {actingOn === ins.id ? <><Loader2 size={12} className="spin"/> İşleniyor...</> : <>{ins.action} <ArrowRight size={12}/></>}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <style>{`
        .ins-bot-row { display:flex; justify-content:space-between; align-items:center; margin-top:8px; }
        .ins-action-btn { background: #1e293b; color: white; border: none; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: 0.2s; }
        .ins-action-btn:hover { background: #3b82f6; }
        .ins-action-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .ins-empty { text-align:center; padding:30px 20px; color:#64748b; font-size:13px; font-weight:600; display:flex; flex-direction:column; align-items:center; gap:10px; }
      `}</style>
    </div>
  );
};

export default AIDashboard;
