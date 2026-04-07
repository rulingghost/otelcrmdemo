import React, { useState } from 'react';
import { useHotel } from '../../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, ShieldAlert, TrendingDown, Package, Zap, CheckCircle, XCircle, Eye } from 'lucide-react';

const AIAnomaly = () => {
  const { rooms, reservations, cashTransactions, inventory, tasks, staff, TODAY } = useHotel();
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);

  const todayTx = cashTransactions.filter(t => t.date === TODAY);
  const totalRev = todayTx.filter(t => t.type === 'gelir').reduce((s, t) => s + t.amount, 0);
  const totalExp = todayTx.filter(t => t.type === 'gider').reduce((s, t) => s + t.amount, 0);
  const lowStock = inventory.filter(i => i.stock < i.minStock);
  const outOfOrder = rooms.filter(r => r.status === 'arızalı');
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'bitti');
  const absentStaff = staff.filter(s => s.status === 'izinli');
  const unpaidRes = reservations.filter(r => r.status === 'check-in' && r.balance > 10000);
  const largeTx = todayTx.filter(t => t.amount > 20000);

  const anomalies = [];

  if (lowStock.length > 0) anomalies.push({
    id: 'stock', severity: 'high', category: 'Stok',
    title: `${lowStock.length} ürün kritik stok seviyesinde`,
    desc: lowStock.map(i => `${i.name}: ${i.stock}/${i.minStock}`).join(', '),
    icon: <Package size={18}/>, color: '#ef4444',
    action: 'Acil sipariş oluştur'
  });

  if (outOfOrder.length > 0) anomalies.push({
    id: 'oor', severity: 'high', category: 'Oda',
    title: `${outOfOrder.length} oda arızalı durumda`,
    desc: outOfOrder.map(r => `Oda ${r.id} (${r.type})`).join(', '),
    icon: <Zap size={18}/>, color: '#f59e0b',
    action: 'Teknik servis ata'
  });

  if (highPriorityTasks.length > 2) anomalies.push({
    id: 'tasks', severity: 'medium', category: 'Operasyon',
    title: `${highPriorityTasks.length} yüksek öncelikli görev bekliyor`,
    desc: highPriorityTasks.map(t => `Oda ${t.room}: ${t.desc}`).join('; '),
    icon: <AlertTriangle size={18}/>, color: '#f59e0b',
    action: 'Görev atamalarını kontrol et'
  });

  if (absentStaff.length > 1) anomalies.push({
    id: 'staff', severity: 'medium', category: 'Personel',
    title: `${absentStaff.length} personel izinli/devamsız`,
    desc: absentStaff.map(s => `${s.name} (${s.dept})`).join(', '),
    icon: <ShieldAlert size={18}/>, color: '#8b5cf6',
    action: 'Yedek personel planla'
  });

  if (unpaidRes.length > 0) anomalies.push({
    id: 'unpaid', severity: 'medium', category: 'Finans',
    title: `${unpaidRes.length} yüksek bakiyeli rezervasyon`,
    desc: unpaidRes.map(r => `${r.guest}: ₺${r.balance.toLocaleString()}`).join(', '),
    icon: <TrendingDown size={18}/>, color: '#ef4444',
    action: 'Tahsilat takibi başlat'
  });

  if (largeTx.length > 0) anomalies.push({
    id: 'largetx', severity: 'low', category: 'Finans',
    title: `${largeTx.length} büyük tutarlı işlem tespit edildi`,
    desc: largeTx.map(t => `${t.desc}: ₺${t.amount.toLocaleString()}`).join(', '),
    icon: <Eye size={18}/>, color: '#3b82f6',
    action: 'İşlemleri doğrula'
  });

  const totalScore = Math.max(0, 100 - (anomalies.filter(a => a.severity === 'high').length * 20) - (anomalies.filter(a => a.severity === 'medium').length * 10) - (anomalies.filter(a => a.severity === 'low').length * 3));
  const scoreColor = totalScore >= 80 ? '#10b981' : totalScore >= 50 ? '#f59e0b' : '#ef4444';
  const scoreLabel = totalScore >= 80 ? 'Düşük Risk' : totalScore >= 50 ? 'Orta Risk' : 'Yüksek Risk';

  const severityData = [
    { name: 'Yüksek', count: anomalies.filter(a => a.severity === 'high').length, color: '#ef4444' },
    { name: 'Orta', count: anomalies.filter(a => a.severity === 'medium').length, color: '#f59e0b' },
    { name: 'Düşük', count: anomalies.filter(a => a.severity === 'low').length, color: '#3b82f6' },
  ];

  const categoryData = [...new Set(anomalies.map(a => a.category))].map(cat => ({
    name: cat, count: anomalies.filter(a => a.category === cat).length
  }));

  return (
    <div className="ai-anomaly">
      <div className="anomaly-top">
        <motion.div className="risk-score-card" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="risk-ring" style={{ background: `conic-gradient(${scoreColor} ${totalScore * 3.6}deg, #f1f5f9 0deg)` }}>
            <div className="risk-inner"><strong>{totalScore}</strong><span>/100</span></div>
          </div>
          <h3 style={{ color: scoreColor }}>{scoreLabel}</h3>
          <p>{anomalies.length} anomali tespit edildi</p>
        </motion.div>

        <div className="anomaly-stats">
          {severityData.map(s => (
            <div key={s.name} className="as-item">
              <div className="as-dot" style={{ background: s.color }}/>
              <span>{s.name}</span>
              <strong>{s.count}</strong>
            </div>
          ))}
        </div>

        <div className="anomaly-chart">
          <h4>Kategori Dağılımı</h4>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={categoryData} layout="vertical" barSize={16}>
              <XAxis type="number" hide/>
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} width={70}/>
              <Tooltip/>
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 8, 8, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="anomaly-list">
        <h3><AlertTriangle size={16}/> Tespit Edilen Anomaliler</h3>
        {anomalies.length === 0 ? (
          <div className="no-anomaly"><CheckCircle size={40} color="#10b981"/><p>Tebrikler! Aktif anomali bulunmuyor.</p></div>
        ) : (
          anomalies.map((a, i) => (
            <motion.div key={a.id} className={`anomaly-card ${a.severity}`} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} onClick={() => setSelectedAnomaly(selectedAnomaly === a.id ? null : a.id)}>
              <div className="ac-left">
                <div className="ac-icon" style={{ color: a.color, background: `${a.color}15` }}>{a.icon}</div>
                <div className="ac-body">
                  <div className="ac-meta"><span className={`sev-badge ${a.severity}`}>{a.severity === 'high' ? 'Yüksek' : a.severity === 'medium' ? 'Orta' : 'Düşük'}</span><span className="ac-cat">{a.category}</span></div>
                  <strong>{a.title}</strong>
                  <AnimatePresence>{selectedAnomaly === a.id && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{a.desc}</motion.p>}</AnimatePresence>
                </div>
              </div>
              <button className="ac-action" onClick={e => { e.stopPropagation(); }}>{a.action}</button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AIAnomaly;
