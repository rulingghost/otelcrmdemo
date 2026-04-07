import React, { useState } from 'react';
import { useHotel } from '../../../context/HotelContext';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Lock, Unlock, Loader2, Save } from 'lucide-react';

const AIPricing = () => {
  const { rooms, addNotification } = useHotel();

  const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Penthouse'];
  const baseRates = { Standard: 1500, Deluxe: 2250, Suite: 4000, Penthouse: 7500 };
  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

  const [adjustments, setAdjustments] = useState({ Standard: 0, Deluxe: 0, Suite: 0, Penthouse: 0 });
  const [locked, setLocked] = useState({ Standard: false, Deluxe: false, Suite: false, Penthouse: false });
  const [isApplying, setIsApplying] = useState(false);

  const getTypeStats = (type) => {
    const typeRooms = rooms.filter(r => r.type === type);
    const occ = typeRooms.filter(r => r.status === 'dolu').length;
    const occRate = Math.round((occ / (typeRooms.length || 1)) * 100);
    const base = baseRates[type];
    const adj = adjustments[type];
    const newPrice = Math.round(base * (1 + adj / 100));
    let aiSuggestion = 0;
    if (occRate > 85) aiSuggestion = 15;
    else if (occRate > 70) aiSuggestion = 8;
    else if (occRate < 40) aiSuggestion = -10;
    else if (occRate < 55) aiSuggestion = -5;
    const potentialRevenue = newPrice * occ;
    const baseRevenue = base * occ;
    const diff = potentialRevenue - baseRevenue;
    return { type, total: typeRooms.length, occ, occRate, base, adj, newPrice, aiSuggestion, potentialRevenue, baseRevenue, diff };
  };

  const typeStats = roomTypes.map(getTypeStats);

  const chartData = typeStats.map((s, i) => ({
    name: s.type, mevcut: s.base, onerilen: Math.round(s.base * (1 + s.aiSuggestion / 100)), ayarlanmis: s.newPrice
  }));

  const totalBaseRev = typeStats.reduce((s, t) => s + t.baseRevenue, 0);
  const totalNewRev = typeStats.reduce((s, t) => s + t.potentialRevenue, 0);
  const totalDiff = totalNewRev - totalBaseRev;

  const applyAISuggestion = (type) => {
    const stat = typeStats.find(s => s.type === type);
    if (stat && !locked[type]) setAdjustments(prev => ({ ...prev, [type]: stat.aiSuggestion }));
  };

  const handleApplyAll = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      addNotification({ type: 'success', msg: `Yeni fiyatlandırma stratejisi (${totalDiff > 0 ? '+' : ''}${totalDiff.toLocaleString()}₺ potansiyel fark) tüm kanallara başarıyla uygulandı!` });
      // Reset adjustments after apply as a mock action
      setAdjustments({ Standard: 0, Deluxe: 0, Suite: 0, Penthouse: 0 });
    }, 2000);
  };

  const hasAdjustments = Object.values(adjustments).some(v => v !== 0);

  return (
    <div className="ai-pricing">
      <div className="pricing-top-bar">
        <div className="pricing-summary flex-1">
          <div className="ps-card">
            <DollarSign size={20} color="#3b82f6"/>
            <div><span>Mevcut Gelir (Günlük)</span><strong>₺{totalBaseRev.toLocaleString()}</strong></div>
          </div>
          <div className="ps-card highlight">
            <TrendingUp size={20} color="#10b981"/>
            <div><span>Ayarlanmış Gelir</span><strong>₺{totalNewRev.toLocaleString()}</strong></div>
          </div>
          <div className={`ps-card ${totalDiff >= 0 ? 'up' : 'down'}`}>
            {totalDiff >= 0 ? <ArrowUpRight size={20}/> : <ArrowDownRight size={20}/>}
            <div><span>Fark</span><strong>{totalDiff >= 0 ? '+' : ''}₺{totalDiff.toLocaleString()}</strong></div>
          </div>
        </div>

        <button 
          className="save-all-btn" 
          disabled={!hasAdjustments || isApplying} 
          onClick={handleApplyAll}
        >
          {isApplying ? <><Loader2 size={18} className="spin"/> Sistem Güncelleniyor...</> : <><Save size={18}/> Fiyatları Yayına Al</>}
        </button>
      </div>

      <div className="pricing-grid">
        {typeStats.map((s, i) => (
          <motion.div key={s.type} className={`price-card ${s.adj !== 0 ? 'modified' : ''}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="pc-head">
              <div className="pc-dot" style={{ background: COLORS[i] }}/>
              <h4>{s.type}</h4>
              <button className="lock-btn" onClick={() => setLocked(p => ({ ...p, [s.type]: !p[s.type] }))}>{locked[s.type] ? <Lock size={14} color="#ef4444"/> : <Unlock size={14}/>}</button>
            </div>
            <div className="pc-stats">
              <div><span>Doluluk</span><strong>%{s.occRate}</strong></div>
              <div><span>Oda</span><strong>{s.occ}/{s.total}</strong></div>
              <div><span>Baz Fiyat</span><strong>₺{s.base.toLocaleString()}</strong></div>
            </div>
            <div className={`pc-slider ${locked[s.type] ? 'locked-state' : ''}`}>
              <label>Fiyat Ayarı: <strong style={{ color: s.adj >= 0 ? (s.adj===0 ? '#1e293b' : '#10b981') : '#ef4444' }}>{s.adj > 0 ? '+' : ''}{s.adj}%</strong></label>
              <input type="range" min={-30} max={30} value={s.adj} disabled={locked[s.type]} onChange={e => setAdjustments(p => ({ ...p, [s.type]: parseInt(e.target.value) }))} style={{ accentColor: COLORS[i] }}/>
              <div className="slider-labels"><span>-30%</span><span>0</span><span>+30%</span></div>
            </div>
            <div className="pc-result">
              <div className="new-price">Yeni Fiyat: <strong>₺{s.newPrice.toLocaleString()}</strong></div>
              <div className={`rev-diff ${s.diff >= 0 ? (s.diff===0?'':'up') : 'down'}`}>{s.diff > 0 ? '+' : ''}₺{s.diff.toLocaleString()}/gün</div>
            </div>
            {s.aiSuggestion !== 0 && (
              <button className="ai-suggest-btn" onClick={() => applyAISuggestion(s.type)} disabled={locked[s.type]}>
                🤖 AI Önerisi: {s.aiSuggestion > 0 ? '+' : ''}{s.aiSuggestion}% Uygula
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <div className="pricing-chart-card">
        <h3>Fiyat Karşılaştırması</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} barGap={8}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }}/>
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={v => `₺${(v/1000)}k`}/>
            <Tooltip formatter={v => `₺${v.toLocaleString()}`}/>
            <Bar dataKey="mevcut" fill="#e2e8f0" radius={[6, 6, 0, 0]} name="Mevcut"/>
            <Bar dataKey="onerilen" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="AI Önerisi"/>
            <Bar dataKey="ayarlanmis" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Ayarlanmış"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <style>{`
        .pricing-top-bar { display: flex; gap: 20px; align-items: stretch; margin-bottom: 20px; }
        .flex-1 { flex: 1; }
        .save-all-btn { padding: 0 24px; border-radius: 16px; border: none; background: #1e293b; color: white; font-size: 14px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 14px rgba(30,41,59,0.2); white-space: nowrap; }
        .save-all-btn:hover:not(:disabled) { background: #3b82f6; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(59,130,246,0.3); }
        .save-all-btn:disabled { opacity: 0.6; cursor: not-allowed; box-shadow: none; }
        .price-card.modified { border-color: #3b82f6; box-shadow: 0 4px 20px rgba(59,130,246,0.06); }
        .locked-state { opacity: 0.6; pointer-events: none; filter: grayscale(1); }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default AIPricing;
