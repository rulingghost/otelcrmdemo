import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, BarChart3, PieChart, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Edit3, Save, 
  Calendar, CheckCircle2, ChevronRight, DollarSign
} from 'lucide-react';

const BudgetPlanning = () => {
  const [selectedDept, setSelectedDept] = useState('Tümü');

  const budgets = [
    { dept: 'Konaklama', budget: 15000000, actual: 12450000, progress: 83, status: 'on-track' },
    { dept: 'Yiyecek & İçecek', budget: 5200000, actual: 4800000, progress: 92, status: 'ahead' },
    { dept: 'SPA & Sağlık', budget: 1200000, actual: 850000, progress: 70, status: 'behind' },
    { dept: 'Operasyonel Giderler', budget: 2400000, actual: 2100000, progress: 87, status: 'on-track' },
    { dept: 'Pazarlama', budget: 850000, actual: 920000, progress: 108, status: 'over-budget' },
  ];

  return (
    <div className="bp-page">
      <div className="bp-head">
        <div>
          <h2><Target size={20}/> Bütçe Planlama & Takibi</h2>
          <span>Departman bazlı yıllık finansal hedefler ve gerçekleşme oranları</span>
        </div>
        <div className="head-actions">
          <button className="btn-secondary"><Edit3 size={14}/> Bütçeyi Düzenle</button>
          <button className="btn-primary">Yeni Yıl Bütçesi Oluştur</button>
        </div>
      </div>

      {/* Global Progress */}
      <div className="bp-global">
        <div className="bg-left">
          <span className="bg-label">Toplam Bütçe Gerçekleşme Oranı</span>
          <div className="bg-val-row">
            <strong>%84.2</strong>
            <div className="bg-bar-wrap"><motion.div className="bg-bar" initial={{ width: 0 }} animate={{ width: '84.2%' }} /></div>
          </div>
        </div>
        <div className="bg-right">
          <div className="bg-stat">
            <span>Hedef</span>
            <strong>₺24.7M</strong>
          </div>
          <div className="bg-stat">
            <span>Gerçekleşen</span>
            <strong>₺21.0M</strong>
          </div>
        </div>
      </div>

      <div className="bp-content">
        <div className="dept-grid">
          {budgets.map((b, i) => (
            <motion.div 
              key={b.dept} 
              className={`depth-card ${b.status}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="dc-head">
                <strong>{b.dept}</strong>
                <div className={`status-pill ${b.status}`}>
                  {b.status === 'ahead' ? 'Hedef Üstü' : b.status === 'on-track' ? 'Planda' : b.status === 'behind' ? 'Gecikmede' : 'Aşım'}
                </div>
              </div>
              
              <div className="dc-metrics">
                <div className="dcm">
                  <span>Bütçe</span>
                  <strong>₺{(b.budget/1000000).toFixed(1)}M</strong>
                </div>
                <div className="dcm">
                  <span>Gerçekleşen</span>
                  <strong>₺{(b.actual/1000000).toFixed(1)}M</strong>
                </div>
              </div>

              <div className="dc-progress">
                <div className="dcp-info"><span>İlerleme</span><strong>%{b.progress}</strong></div>
                <div className="dcp-bar-bg"><div className="dcp-bar" style={{ width: `${Math.min(b.progress, 100)}%` }}/></div>
              </div>

              <button className="dc-action">Detaylı Analiz <ChevronRight size={14}/></button>
            </motion.div>
          ))}
        </div>

        <div className="bp-sidebar">
          <div className="comparison-card">
            <h3>Yıllık Karşılaştırma</h3>
            <div className="comp-list">
              {[
                { year: '2026 (Tahmin)', val: '₺24.2M', trend: '+12.5%', color: '#3b82f6' },
                { year: '2025 (Gerçek)', val: '₺21.5M', trend: '+8.2%', color: '#10b981' },
                { year: '2024 (Gerçek)', val: '₺19.8M', trend: '+4.1%', color: '#94a3b8' },
              ].map(c => (
                <div key={c.year} className="comp-row">
                  <div className="cr-year" style={{ borderLeft: `3px solid ${c.color}` }}>
                    <span>{c.year}</span>
                    <strong>{c.val}</strong>
                  </div>
                  <div className="cr-trend up"><ArrowUpRight size={12}/> {c.trend}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="warning-card">
            <div className="wc-head"><AlertCircle size={18} color="#ef4444"/> <strong>Bütçe Alarmı</strong></div>
            <p><strong>"Pazarlama"</strong> departmanı bütçesi %8 oranında aşıldı. Reklam harcamaları kontrol edilmelidir.</p>
          </div>
        </div>
      </div>

      <style>{`
        .bp-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .bp-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .bp-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .bp-head span { font-size: 13px; color: #94a3b8; }
        
        .btn-secondary { padding: 10px 18px; border-radius: 12px; border: 1.5px solid #e2e8f0; background: white; color: #475569; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .btn-primary { padding: 10px 18px; border-radius: 12px; border: none; background: #1e293b; color: white; font-weight: 700; font-size: 13px; cursor: pointer; }

        .bp-global { background: #1e293b; border-radius: 24px; padding: 24px 32px; color: white; display: flex; justify-content: space-between; align-items: center; gap: 40px; }
        .bg-left { flex: 1; }
        .bg-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
        .bg-val-row { display: flex; align-items: center; gap: 20px; margin-top: 10px; }
        .bg-val-row strong { font-size: 28px; font-weight: 900; }
        .bg-bar-wrap { flex: 1; height: 10px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
        .bg-bar { height: 100%; background: #3b82f6; border-radius: 10px; }
        .bg-right { display: flex; gap: 32px; }
        .bg-stat span { display: block; font-size: 11px; color: #94a3b8; margin-bottom: 4px; }
        .bg-stat strong { font-size: 20px; font-weight: 800; color: white; }

        .bp-content { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        .dept-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        
        .depth-card { background: white; border-radius: 24px; border: 1.5px solid #e2e8f0; padding: 24px; display: flex; flex-direction: column; gap: 20px; transition: 0.3s; }
        .depth-card:hover { transform: translateY(-3px); border-color: #3b82f6; }
        
        .dc-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .dc-head strong { font-size: 15px; font-weight: 800; color: #1e293b; }
        .status-pill { font-size: 9px; font-weight: 800; padding: 3px 8px; border-radius: 20px; text-transform: uppercase; }
        .status-pill.ahead { background: #f0fdf4; color: #10b981; }
        .status-pill.on-track { background: #eff6ff; color: #3b82f6; }
        .status-pill.behind { background: #fff7ed; color: #f59e0b; }
        .status-pill.over-budget { background: #fef2f2; color: #ef4444; }

        .dc-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .dcm span { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .dcm strong { display: block; font-size: 16px; font-weight: 900; color: #1e293b; margin-top: 4px; }
        
        .dc-progress { display: flex; flex-direction: column; gap: 8px; }
        .dcp-info { display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; color: #64748b; }
        .dcp-bar-bg { height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden; }
        .dcp-bar { height: 100%; background: #3b82f6; border-radius: 10px; }

        .dc-action { width: 100%; padding: 10px; border: none; background: #f8fafc; color: #475569; font-weight: 700; font-size: 11px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; }

        .bp-sidebar { display: flex; flex-direction: column; gap: 20px; }
        .comparison-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .comparison-card h3 { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        
        .comp-list { display: flex; flex-direction: column; gap: 16px; }
        .comp-row { display: flex; justify-content: space-between; align-items: center; }
        .cr-year { padding-left: 12px; }
        .cr-year span { display: block; font-size: 11px; color: #94a3b8; }
        .cr-year strong { font-size: 14px; font-weight: 800; color: #1e293b; }
        .cr-trend { font-size: 10px; font-weight: 800; display: flex; align-items: center; gap: 2px; }
        .cr-trend.up { color: #10b981; }

        .warning-card { background: #fef2f2; border: 1px solid #fee2e2; border-radius: 20px; padding: 20px; }
        .wc-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .wc-head strong { font-size: 14px; color: #ef4444; }
        .warning-card p { font-size: 12px; color: #991b1b; line-height: 1.5; margin: 0; }
      `}</style>
    </div>
  );
};

const AlertCircle = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);

export default BudgetPlanning;
