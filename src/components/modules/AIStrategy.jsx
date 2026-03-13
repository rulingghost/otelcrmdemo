import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, Sparkles, TrendingUp, AlertCircle, 
  Lightbulb, Target, ArrowRight, RefreshCcw, PieChart,
  Zap
} from 'lucide-react';

const AIStrategy = () => {
  const { addNotification } = useHotel();
  const [analyzing, setAnalyzing] = useState(false);

  const insights = [
    { 
      id: 1, 
      type: 'price', 
      priority: 'high', 
      title: 'Dinamik Fiyatlandırma Önerisi', 
      desc: 'Önümüzdeki hafta sonu bölgedeki etkinlikler nedeniyle talep artışı bekleniyor. Fiyatların %15 artırılması önerilir.', 
      impact: '+₺45,000 Gelir'
    },
    { 
      id: 2, 
      type: 'ops', 
      priority: 'medium', 
      title: 'Personel Optimizasyonu', 
      desc: 'Salı günü beklenen check-out yoğunluğu nedeniyle Kat Hizmetleri ekibine 2 ekstra personel takviyesi önerilir.', 
      impact: '%20 Hız Artışı'
    },
    { 
      id: 3, 
      type: 'mkt', 
      priority: 'low', 
      title: 'Sadakat Programı Teklifi', 
      desc: 'Son 2 aydır konaklamayan "Gold" üyeler için özel bir "Özledik" mail kampanyası başlatılabilir.', 
      impact: '15+ Rezervasyon'
    }
  ];

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      addNotification({ type: 'success', msg: 'Veriler güncel tahminleme modelleri ile yeniden analiz edildi.' });
    }, 3000);
  };

  return (
    <div className="ai-page">
      <div className="ai-head">
        <div>
          <h2><BrainCircuit size={20}/> AI Strategy & Insights</h2>
          <span>Makine öğrenmesi tabanlı operasyonel ve finansal stratejiler</span>
        </div>
        <button 
          className={`btn-ai ${analyzing ? 'loading' : ''}`}
          onClick={handleAnalyze}
          disabled={analyzing}
        >
          {analyzing ? <RefreshCcw size={15} className="spin"/> : <Sparkles size={15}/>}
          {analyzing ? 'Analiz Ediliyor...' : 'Yeniden Analiz Et'}
        </button>
      </div>

      <div className="ai-grid">
        {/* Sol: Insights */}
        <div className="insight-list">
          <div className="il-head">
            <h3>Yapay Zeka Önerileri</h3>
            <div className="ai-badge">Canlı Analiz Aktif</div>
          </div>
          
          <div className="cards">
            {insights.map((ins, i) => (
              <motion.div 
                key={ins.id} 
                className={`ins-card ${ins.priority}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="ins-top">
                  <div className={`prio-dot ${ins.priority}`} />
                  <strong>{ins.title}</strong>
                  <span className="impact-tag">{ins.impact}</span>
                </div>
                <p>{ins.desc}</p>
                <div className="ins-actions">
                  <button className="apply-btn">Stratejiyi Uygula <ArrowRight size={14}/></button>
                  <button className="ignore-btn">Yoksay</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sağ: Veri Özetleri */}
        <div className="ai-stats">
          <div className="ai-stat-card primary">
            <Zap size={24} color="#f59e0b" fill="#f59e0b"/>
            <div className="asc-info">
              <span className="asc-label">Tahmini Ay Sonu Geliri</span>
              <div className="asc-val">₺1,450,000</div>
              <div className="asc-trend up">+%18 Hedef Üstü</div>
            </div>
          </div>

          <div className="stats-box">
            <h3>Talep Projeksiyonu (14 Gün)</h3>
            <div className="progress-list">
              {[
                { label: 'Standart Oda', val: 92, color: '#3b82f6' },
                { label: 'Deluxe Oda', val: 75, color: '#10b981' },
                { label: 'Suite', val: 45, color: '#8b5cf6' },
                { label: 'Aile Odası', val: 88, color: '#f59e0b' },
              ].map(p => (
                <div key={p.label} className="prog-row">
                  <div className="prog-info"><span>{p.label}</span><strong>%{p.val}</strong></div>
                  <div className="prog-bg"><motion.div 
                    className="prog-bar" 
                    initial={{ width: 0 }}
                    animate={{ width: `${p.val}%` }}
                    style={{ background: p.color }}
                  /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="smart-tip">
            <Lightbulb size={24} color="#3b82f6"/>
            <div>
              <strong>Hızlı İpucu</strong>
              <p>Hafta içi kurumsal misafirlerin akşam yemeği harcamaları ortalamanın üzerinde. Akşam yemeği + İçecek paketi oluşturmak ek %8 ciro sağlayabilir.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ai-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .ai-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .ai-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .ai-head span { font-size: 13px; color: #94a3b8; }
        
        .btn-ai { padding: 12px 24px; border-radius: 12px; border: none; background: linear-gradient(135deg, #1e293b, #334155); color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.3s; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
        .btn-ai:hover { transform: translateY(-2px); background: linear-gradient(135deg, #3b82f6, #8b5cf6); }
        .btn-ai.loading { opacity: 0.7; cursor: wait; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from {transform: rotate(0deg)} to {transform: rotate(360deg)} }

        .ai-grid { display: grid; grid-template-columns: 1fr 400px; gap: 24px; }
        
        .insight-list { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .il-head { display: flex; justify-content: space-between; align-items: center; }
        .il-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .ai-badge { padding: 4px 10px; border-radius: 20px; background: #f0fdf4; color: #10b981; font-size: 10px; font-weight: 800; border: 1px solid #dcfce7; }
        
        .cards { display: flex; flex-direction: column; gap: 16px; }
        .ins-card { padding: 20px; border-radius: 20px; border: 1.5px solid #f1f5f9; position: relative; overflow: hidden; }
        .ins-card.high { border-left: 4px solid #ef4444; background: #fffafb; }
        .ins-card.medium { border-left: 4px solid #f59e0b; background: #fffbeb; }
        .ins-card.low { border-left: 4px solid #3b82f6; background: #eff6ff; }
        
        .ins-top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .prio-dot { width: 8px; height: 8px; border-radius: 50%; }
        .prio-dot.high { background: #ef4444; }
        .prio-dot.medium { background: #f59e0b; }
        .prio-dot.low { background: #3b82f6; }
        .ins-top strong { font-size: 14px; color: #1e293b; flex: 1; }
        .impact-tag { font-size: 11px; font-weight: 800; color: #10b981; }
        
        .ins-card p { font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 16px; }
        .ins-actions { display: flex; gap: 12px; }
        .apply-btn { padding: 8px 16px; border-radius: 10px; border: none; background: #1e293b; color: white; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .ignore-btn { background: transparent; border: none; font-size: 12px; font-weight: 700; color: #94a3b8; cursor: pointer; }

        .ai-stats { display: flex; flex-direction: column; gap: 20px; }
        .ai-stat-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; display: flex; align-items: center; gap: 20px; }
        .asc-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .asc-val { font-size: 24px; font-weight: 900; color: #1e293b; margin: 4px 0; }
        .asc-trend { font-size: 11px; font-weight: 800; color: #10b981; }

        .stats-box { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .stats-box h3 { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        .progress-list { display: flex; flex-direction: column; gap: 16px; }
        .prog-row { display: flex; flex-direction: column; gap: 8px; }
        .prog-info { display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; }
        .prog-info span { color: #64748b; }
        .prog-bg { background: #f1f5f9; height: 6px; border-radius: 10px; overflow: hidden; }
        .prog-bar { height: 100%; border-radius: 10px; }

        .smart-tip { background: #eff6ff; border-radius: 24px; padding: 24px; display: flex; gap: 16px; }
        .smart-tip strong { font-size: 14px; color: #1e293b; display: block; margin-bottom: 4px; }
        .smart-tip p { font-size: 12px; color: #475569; line-height: 1.5; margin: 0; }
      `}</style>
    </div>
  );
};

export default AIStrategy;
