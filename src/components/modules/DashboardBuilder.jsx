import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { 
  Layout, Search, Plus, 
  Save, Share, FileJson, 
  Zap, Settings, Palette,
  ChevronRight, MoreVertical, LayoutGrid,
  BarChart3, PieChart as PieIcon, LineChart as LineIcon,
  MousePointer2, Move, Trash2,
  RefreshCw, Clock
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { motion } from 'framer-motion';

const dataSources = [
  { name: 'Doluluk ve Ciro', icon: <BarChart3 size={16}/> },
  { name: 'Anket Sonuçları', icon: <LineIcon size={16}/> },
  { name: 'POS & Satışlar', icon: <PieIcon size={16}/> },
  { name: 'Yorumlar & NPS', icon: <Share size={16}/> },
  { name: 'Kanal Yönetimi', icon: <Zap size={16}/> },
  { name: 'Satın Alma', icon: <Layout size={16}/>, new: true },
  { name: 'Spa & Wellness', icon: <Palette size={16}/> },
];

const ciroData = [
  { name: 'Jan', val: 30000 },
  { name: 'Feb', val: 35000 },
  { name: 'Mar', val: 32000 },
  { name: 'Apr', val: 40000 },
  { name: 'May', val: 45000 },
];

const DashboardBuilder = () => {
  const { stats, cashTransactions, rooms } = useHotel();
  
  const dynamicCiroData = cashTransactions
    .filter(t => t.type === 'gelir')
    .slice(-5)
    .map((t, i) => ({ name: t.date?.slice(5) || `D${i+1}`, val: t.amount }));
  const chartData = dynamicCiroData.length > 2 ? dynamicCiroData : ciroData;

  return (
    <div className="builder-container">
      <header className="header">
         <div className="title-section">
            <Layout size={32} className="icon-blue"/>
            <div>
               <h2>Custom Dashboard Builder</h2>
               <span>Drag-and-drop widget arayüzü, dinamik veri kaynakları ve rapor oluşturma</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><Save size={18}/> KAYDET VE YAYINLA</button>
            <button className="btn outline"><FileJson size={18}/> JSON DIŞA AKTAR</button>
            <button className="btn primary red">CANLI MODA GEÇ</button>
         </div>
      </header>

      <div className="builder-grid">
         {/* Left: Data Sources */}
         <aside className="left-panel">
            <section className="card sources-card">
               <h3>VERİ KAYNAKLARI</h3>
               <div className="source-list">
                  {dataSources.map((s, i) => (
                    <div key={i} className="source-item">
                       {s.icon}
                       <span>{s.name}</span>
                       {s.new && <div className="new-tag">YENİ</div>}
                    </div>
                  ))}
               </div>
            </section>
         </aside>

         {/* Center: Canvas */}
         <section className="canvas-area">
            <div className="canvas-header">
               <div className="search-box">
                  <Search size={16} className="gray"/>
                  <input type="text" placeholder="Widget Ara..." />
               </div>
            </div>
            
            <div className="canvas-grid">
               <div className="widget preview-widget wider">
                  <div className="w-head">
                     <span>Aylık Ciro İstatistikleri</span>
                     <strong>$920, 9%</strong>
                  </div>
                  <div style={{ height: 150 }}>
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                           <Line type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6'}} />
                        </LineChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="drag-handle"><MousePointer2 size={16}/></div>
               </div>

               <div className="widget preview-widget">
                  <div className="w-head">
                     <span>Occupancy Gauge</span>
                  </div>
                  <div className="gauge-placeholder">
                     <div className="gauge-inner">
                        <strong>92%</strong>
                        <span>Bugün</span>
                     </div>
                  </div>
                  <div className="w-footer">
                     <span>▲ 92%</span>
                     <span>◆ 82%</span>
                     <span>0,24</span>
                  </div>
               </div>
            </div>

            <div className="canvas-footer">
               <span>Çalışma Alanı: <strong>Genel Müdür Paneli</strong></span>
               <span>Son Kayıt: 1 dak. Önce</span>
            </div>
         </section>

         {/* Right: Widget Properties */}
         <aside className="right-panel">
            <section className="card props-card">
               <div className="search-box">
                  <Search size={16} className="gray"/>
                  <input type="text" placeholder="Widget Ara..." />
               </div>
               <h3>WIDGET ÖZELLİKLERİ</h3>
               <div className="prop-section">
                  <span className="p-label">Renkler</span>
                  <div className="color-dots">
                     {['#3b82f6', '#84cc16', '#f59e0b', '#ef4444', '#d946ef', '#8b5cf6'].map(c => (
                       <div key={c} className="c-dot" style={{ background: c }}></div>
                     ))}
                  </div>
               </div>

               <div className="prop-section mt-20">
                  <span className="p-label">Veri Zaman Aralığı</span>
                  <select className="p-select">
                     <option>Gerçek Zamanlı</option>
                     <option>Bugün</option>
                     <option>Son 7 Gün</option>
                     <option>Bu Ay</option>
                     <option>Custom</option>
                  </select>
               </div>

               <div className="prop-section mt-20">
                  <span className="p-label">Yenileme Sıklığı</span>
                  <select className="p-select">
                     <option>Her 1 Dakika</option>
                     <option>2 Dakika</option>
                     <option>5 Dakika</option>
                  </select>
               </div>

               <div className="auto-save mt-20">
                  <div className="s-head">
                     <span>Otomatik</span>
                     <div className="dot-group">
                        <div className="dot"></div>
                        <div className="dot active"></div>
                        <div className="dot"></div>
                     </div>
                  </div>
               </div>
            </section>
         </aside>
      </div>

      <style>{`
        .builder-container {
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
        .btn.primary.red { background: #ef4444; color: white; }

        .builder-grid { display: grid; grid-template-columns: 220px 1fr 280px; gap: 30px; flex: 1; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; margin-bottom: 25px; letter-spacing: 1px; }

        .source-list { display: flex; flex-direction: column; gap: 5px; }
        .source-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; }
        .source-item:hover { background: #f8fafc; color: #3b82f6; }
        .new-tag { font-size: 9px; background: #f59e0b; color: white; padding: 2px 6px; border-radius: 4px; margin-left: auto; }

        .canvas-area { background: #fff; border-radius: 20px; border: 2px dashed #e2e8f0; padding: 30px; position: relative; background-image: radial-gradient(#e2e8f0 1px, transparent 1px); background-size: 20px 20px; }
        .canvas-header { margin-bottom: 30px; }
        .search-box { display: flex; align-items: center; gap: 10px; background: white; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 12px; }
        .search-box input { border: none; outline: none; font-size: 13px; width: 100%; }

        .canvas-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .widget { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); position: relative; overflow: hidden; }
        .widget.wider { grid-column: span 1; }
        .w-head { display: flex; flex-direction: column; margin-bottom: 15px; }
        .w-head span { font-size: 11px; font-weight: 800; color: #94a3b8; }
        .w-head strong { font-size: 18px; color: #1e293b; }

        .drag-handle { position: absolute; top: 10px; right: 10px; cursor: move; color: #cbd5e1; }

        .gauge-placeholder { height: 100px; display: flex; align-items: center; justify-content: center; position: relative; }
        .gauge-placeholder::before { content: ''; position: absolute; width: 120px; height: 60px; border: 10px solid #f1f5f9; border-bottom: 0; border-radius: 100px 100px 0 0; }
        .gauge-inner { text-align: center; margin-top: 20px; }
        .gauge-inner strong { display: block; font-size: 20px; color: #1e293b; }
        .gauge-inner span { font-size: 10px; color: #94a3b8; font-weight: 800; }
        .w-footer { display: flex; justify-content: space-between; margin-top: 15px; font-size: 11px; font-weight: 800; color: #64748b; }

        .canvas-footer { position: absolute; bottom: 20px; left: 30px; right: 30px; display: flex; justify-content: space-between; font-size: 12px; color: #94a3b8; font-weight: 700; }

        .p-label { font-size: 11px; font-weight: 800; color: #94a3b8; display: block; margin-bottom: 12px; }
        .color-dots { display: flex; gap: 8px; flex-wrap: wrap; }
        .c-dot { width: 20px; height: 20px; border-radius: 50%; cursor: pointer; border: 2px solid white; box-shadow: 0 0 0 1px #e2e8f0; }

        .p-select { width: 100%; padding: 10px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 13px; color: #1e293b; font-weight: 700; outline: none; }

        .auto-save { background: #f8fafc; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0; }
        .auto-save .s-head { display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-weight: 800; color: #64748b; }
        .dot-group { display: flex; gap: 4px; }
        .dot-group .dot { width: 6px; height: 6px; background: #cbd5e1; border-radius: 50%; }
        .dot-group .dot.active { background: #3b82f6; }

        .gray { color: #94a3b8; }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
};

export default DashboardBuilder;
