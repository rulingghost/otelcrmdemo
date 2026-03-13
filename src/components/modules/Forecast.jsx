import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area, 
  BarChart, Bar, Legend 
} from 'recharts';
import { 
  TrendingUp, Calendar, Target, ArrowUpRight, 
  Info, Filter, Download, Zap 
} from 'lucide-react';

const Forecast = () => {
  const [range, setRange] = useState('30gün');

  const data = [
    { date: '15 Mar', occ: 65, rev: 12500, b_occ: 70 },
    { date: '16 Mar', occ: 68, rev: 13200, b_occ: 70 },
    { date: '17 Mar', occ: 72, rev: 14500, b_occ: 70 },
    { date: '18 Mar', occ: 85, rev: 18000, b_occ: 75 },
    { date: '19 Mar', occ: 92, rev: 22500, b_occ: 80 },
    { date: '20 Mar', occ: 95, rev: 24000, b_occ: 85 },
    { date: '21 Mar', occ: 90, rev: 21000, b_occ: 80 },
    { date: '22 Mar', occ: 75, rev: 15500, b_occ: 70 },
  ];

  return (
    <div className="frc-page">
      <div className="frc-head">
        <div>
          <h2><TrendingUp size={20}/> İleriye Dönük Tahminleme (Forecast)</h2>
          <span>Gelecek 30-90 günlük doluluk ve gelir projeksiyonları</span>
        </div>
        <div className="head-filters">
          <div className="range-pills">
            {['14gün', '30gün', '90gün'].map(r => (
              <button 
                key={r} 
                className={`r-pill ${range === r ? 'active' : ''}`}
                onClick={() => setRange(r)}
              >
                {r.replace('gün', ' Gün')}
              </button>
            ))}
          </div>
          <button className="btn-secondary"><Download size={14}/> Rapor Al</button>
        </div>
      </div>

      <div className="frc-grid">
        {/* Ana Grafik */}
        <div className="main-chart-box">
          <div className="mcb-head">
            <h3>Doluluk & Bütçe Karşılaştırması</h3>
            <div className="legend">
              <div className="l-i"><span style={{background:'#3b82f6'}}/> Tahmin</div>
              <div className="l-i"><span style={{background:'#e2e8f0'}}/> Bütçe Hedefi</div>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize:11, fill:'#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize:11, fill:'#94a3b8'}} unit="%" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 800, color: '#1e293b' }}
                />
                <Area type="monotone" dataKey="b_occ" stroke="#e2e8f0" fill="transparent" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="occ" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorOcc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Yan KPI'lar */}
        <div className="forecast-stats">
          <div className="fs-card">
            <div className="fs-head-row">
              <span className="fs-label">Tahmini ADR</span>
              <Info size={14} color="#cbd5e1"/>
            </div>
            <div className="fs-main-row">
              <strong>₺2,150</strong>
              <span className="fs-trend up"><ArrowUpRight size={12}/> +%5.2</span>
            </div>
          </div>

          <div className="fs-card">
            <div className="fs-head-row">
              <span className="fs-label">RevPAR Hedefi</span>
              <Target size={14} color="#cbd5e1"/>
            </div>
            <div className="fs-main-row">
              <strong>₺1,840</strong>
              <span className="fs-trend top">Hedefte</span>
            </div>
          </div>

          <div className="smart-forecast">
            <div className="sf-icon"><Zap size={20} color="#f59e0b" fill="#f59e0b"/></div>
            <h4>Veri Analizi</h4>
            <p>20-25 Mart tarihleri arasında kongre turizmi nedeniyle doluluğun bütçenin %12 üzerine çıkması bekleniyor.</p>
          </div>
        </div>

        {/* Alt Tablo */}
        <div className="forecast-details">
          <h3>Günlük Detay Tahminleme</h3>
          <div className="fd-table-wrap">
            <table className="fd-table">
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Beklenen Doluluk</th>
                  <th>Tahmini Gelir</th>
                  <th>Pazar Segmenti</th>
                  <th>Fiyat Aksiyonu</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i}>
                    <td><strong>{d.date}</strong></td>
                    <td>
                      <div className="occ-cell">
                        <span>%{d.occ}</span>
                        <div className="occ-bar"><div className="bar" style={{width:`${d.occ}%`, background: d.occ > 85 ? '#ef4444' : '#3b82f6'}}/></div>
                      </div>
                    </td>
                    <td>₺{d.rev.toLocaleString()}</td>
                    <td><span className="tag">{i % 2 === 0 ? 'Corporate' : 'Leisure'}</span></td>
                    <td>
                      <span className={`action-tag ${d.occ > 85 ? 'inc' : 'keep'}`}>
                        {d.occ > 85 ? 'Fiyat Artır' : 'Fiyatı Koru'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .frc-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .frc-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .frc-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .frc-head span { font-size: 13px; color: #94a3b8; }
        
        .head-filters { display: flex; gap: 12px; }
        .range-pills { display: flex; background: #f1f5f9; padding: 4px; border-radius: 12px; gap: 4px; }
        .r-pill { padding: 8px 16px; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; }
        .r-pill.active { background: white; color: #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .btn-secondary { padding: 10px 18px; border-radius: 12px; border: 1.5px solid #e2e8f0; background: white; color: #475569; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .frc-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        
        .main-chart-box { grid-column: 1; background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .mcb-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .mcb-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .legend { display: flex; gap: 16px; }
        .l-i { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: #64748b; }
        .l-i span { width: 12px; height: 3px; border-radius: 4px; }
        
        .forecast-stats { grid-column: 2; display: flex; flex-direction: column; gap: 16px; }
        .fs-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; }
        .fs-head-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .fs-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .fs-main-row { display: flex; align-items: baseline; gap: 10px; }
        .fs-main-row strong { font-size: 24px; font-weight: 900; color: #1e293b; }
        .fs-trend { font-size: 11px; font-weight: 800; display: flex; align-items: center; gap: 2px; }
        .fs-trend.up { color: #10b981; }
        .fs-trend.top { background: #eff6ff; color: #3b82f6; padding: 2px 8px; border-radius: 20px; }

        .smart-forecast { background: #fffbeb; border-radius: 20px; padding: 24px; border: 1px solid #fde68a; }
        .sf-icon { margin-bottom: 12px; }
        .smart-forecast h4 { font-size: 14px; font-weight: 800; color: #92400e; margin-bottom: 6px; }
        .smart-forecast p { font-size: 12px; color: #b45309; line-height: 1.5; margin: 0; }

        .forecast-details { grid-column: 1 / -1; background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .forecast-details h3 { font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        .fd-table-wrap { overflow-x: auto; }
        .fd-table { width: 100%; border-collapse: collapse; }
        .fd-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; }
        .fd-table td { padding: 14px 12px; font-size: 13px; color: #475569; border-bottom: 1px solid #f8fafc; }
        
        .occ-cell { display: flex; align-items: center; gap: 10px; width: 150px; }
        .occ-bar { flex: 1; height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden; }
        .occ-bar .bar { height: 100%; border-radius: 10px; }
        
        .tag { font-size: 11px; font-weight: 700; background: #f8fafc; border: 1px solid #e2e8f0; padding: 4px 10px; border-radius: 20px; color: #64748b; }
        .action-tag { font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; }
        .action-tag.inc { background: #fef2f2; color: #ef4444; }
        .action-tag.keep { background: #f0fdf4; color: #10b981; }
      `}</style>
    </div>
  );
};

export default Forecast;
