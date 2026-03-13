import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart2, Target, Users, Megaphone, 
  Search, Plus, MapPin, Mail, Phone, 
  ChevronRight, Calendar, Tag, Star
} from 'lucide-react';

const SalesMarketing = () => {
  const [filter, setFilter] = useState('aktif');

  const leads = [
    { name: 'Teknoloji A.Ş.', contact: 'Ali Vural', value: '₺85,000', probability: 80, stage: 'teklif', date: '14 Mart 2026' },
    { name: 'Global Turizm', contact: 'Zeynep Gök', value: '₺142,000', probability: 40, stage: 'görüşme', date: '12 Mart 2026' },
    { name: 'Gıda Sanayi Ltd.', contact: 'Mehmet Öz', value: '₺22,500', probability: 95, stage: 'sözleşme', date: '15 Mart 2026' },
    { name: 'Eğitim Koçu', contact: 'Merve Hanım', value: '₺12,000', probability: 10, stage: 'aday', date: '10 Mart 2026' },
  ];

  const STAGES = {
    aday: { label: 'Aday', color: '#94a3b8', bg: '#f1f5f9' },
    görüşme: { label: 'Görüşme', color: '#3b82f6', bg: '#eff6ff' },
    teklif: { label: 'Teklif Verildi', color: '#f59e0b', bg: '#fffbeb' },
    sözleşme: { label: 'Sözleşme', color: '#10b981', bg: '#f0fdf4' },
  };

  return (
    <div className="sm-page">
      <div className="sm-head">
        <div>
          <h2><Megaphone size={20}/> Satış & Pazarlama Yönetimi</h2>
          <span>Kurumsal satış süreçleri, kampanya takibi ve lead yönetimi</span>
        </div>
        <button className="btn-primary"><Plus size={15}/> Yeni Satış Fırsatı</button>
      </div>

      <div className="sm-grid">
        {/* Sol: Sales Pipeline */}
        <div className="pipeline-section">
          <div className="ps-head">
            <h3>Satış Hattı (Pipeline)</h3>
            <div className="ps-stats">
              <div className="ps-i"><strong>12</strong> Fırsat</div>
              <div className="ps-i"><strong>₺450K</strong> Hacim</div>
            </div>
          </div>
          
          <div className="lead-list">
            {leads.map((l, i) => {
              const st = STAGES[l.stage];
              return (
                <motion.div 
                  key={l.name} 
                  className="lead-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="lc-top">
                    <div className="lc-info">
                      <strong>{l.name}</strong>
                      <span><Users size={11}/> {l.contact}</span>
                    </div>
                    <span className="lc-value">{l.value}</span>
                  </div>
                  
                  <div className="lc-mid">
                    <div className="lc-stage" style={{ background: st.bg, color: st.color }}>{st.label}</div>
                    <div className="lc-prob">
                      <span>Olasılık: %{l.probability}</span>
                      <div className="prob-bar-bg"><div className="prob-bar" style={{ width: `${l.probability}%`, background: st.color }}/></div>
                    </div>
                  </div>

                  <div className="lc-foot">
                    <span><Calendar size={11}/> {l.date}</span>
                    <button className="lc-action"><ChevronRight size={14}/></button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sağ: Campaigns & Stats */}
        <div className="sm-sidebar">
          <div className="camp-card-main">
            <h3>Aktif Kampanyalar</h3>
            <div className="cl">
              {[
                { title: 'Bayram Özel %20', target: 'Bireysel', color: '#8b5cf6' },
                { title: 'Şirket İndirimi 2026', target: 'Kurumsal', color: '#3b82f6' },
                { title: 'Erken Rezervasyon', target: 'Global', color: '#10b981' },
              ].map(c => (
                <div key={c.title} className="ci">
                  <div className="ci-dot" style={{ background: c.color }}/>
                  <div className="ci-info">
                    <strong>{c.title}</strong>
                    <span>Hedef: {c.target}</span>
                  </div>
                  <div className="ci-stat">124 Rez.</div>
                </div>
              ))}
            </div>
            <button className="btn-all">Tüm Kampanyalar <ChevronRight size={14}/></button>
          </div>

          <div className="sales-stats-c">
            <div className="ssc-head">Satış Performansı</div>
            <div className="ssc-metrics">
              <div className="sscm">
                <span className="sscm-l">Dönüşüm Oranı</span>
                <div className="sscm-v">%24.2 <ArrowUpRight size={12} color="#10b981"/></div>
              </div>
              <div className="sscm">
                <span className="sscm-l">Ort. Satış Süresi</span>
                <div className="sscm-v">8.2 Gün</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .sm-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .sm-head { display: flex; justify-content: space-between; align-items: center; }
        .sm-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .sm-head span { font-size: 13px; color: #94a3b8; }
        
        .btn-primary { padding: 12px 20px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 10px; }

        .sm-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        
        .pipeline-section { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .ps-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .ps-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .ps-stats { display: flex; gap: 12px; }
        .ps-i { font-size: 11px; font-weight: 800; color: #1e293b; padding: 4px 10px; background: #f1f5f9; border-radius: 20px; }
        .ps-i strong { color: #3b82f6; }

        .lead-list { display: flex; flex-direction: column; gap: 14px; }
        .lead-card { background: #f8fafc; border-radius: 18px; border: 1.5px solid #f1f5f9; padding: 18px; display: flex; flex-direction: column; gap: 14px; cursor: pointer; transition: 0.2s; }
        .lead-card:hover { border-color: #3b82f6; background: white; transform: translateX(2px); }
        
        .lc-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .lc-info strong { display: block; font-size: 14px; color: #1e293b; }
        .lc-info span { font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 4px; margin-top: 2px; }
        .lc-value { font-size: 15px; font-weight: 900; color: #1e293b; }

        .lc-mid { display: grid; grid-template-columns: 100px 1fr; gap: 16px; align-items: center; }
        .lc-stage { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-align: center; }
        .lc-prob { display: flex; flex-direction: column; gap: 4px; }
        .lc-prob span { font-size: 9px; font-weight: 700; color: #94a3b8; }
        .prob-bar-bg { background: #e2e8f0; height: 5px; border-radius: 10px; overflow: hidden; }
        .prob-bar { height: 100%; border-radius: 10px; }

        .lc-foot { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid #f1f5f9; }
        .lc-foot span { font-size: 10px; color: #cbd5e1; display: flex; align-items: center; gap: 4px; }
        .lc-action { background: transparent; border: none; color: #cbd5e1; cursor: pointer; }

        .sm-sidebar { display: flex; flex-direction: column; gap: 20px; }
        .camp-card-main { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .camp-card-main h3 { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        .cl { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
        .ci { display: flex; align-items: center; gap: 12px; }
        .ci-dot { width: 8px; height: 8px; border-radius: 50%; }
        .ci-info { flex: 1; }
        .ci-info strong { display: block; font-size: 13px; color: #1e293b; }
        .ci-info span { font-size: 11px; color: #94a3b8; }
        .ci-stat { font-size: 11px; font-weight: 800; color: #10b981; }
        .btn-all { width: 100%; padding: 10px; border: 1.5px solid #f1f5f9; border-radius: 12px; background: transparent; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }

        .sales-stats-c { background: #1e293b; border-radius: 24px; padding: 24px; color: white; }
        .ssc-head { font-size: 13px; font-weight: 700; color: #94a3b8; margin-bottom: 16px; text-transform: uppercase; }
        .ssc-metrics { display: flex; flex-direction: column; gap: 16px; }
        .sscm-l { font-size: 11px; color: #94a3b8; }
        .sscm-v { font-size: 20px; font-weight: 900; display: flex; align-items: center; gap: 8px; }
      `}</style>
    </div>
  );
};

const ArrowUpRight = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);

export default SalesMarketing;
