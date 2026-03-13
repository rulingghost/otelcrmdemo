import React, { useState } from 'react';
import { 
  TrendingDown, Search, Plus, 
  Utensils, Coffee, Wine,
  BarChart3, PieChart as PieIcon,
  DollarSign, FileText, AlertTriangle,
  ArrowRight, Settings, Download
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell
} from 'recharts';

const costData = [
  { name: 'Kırmızı Et', actual: 420, target: 380 },
  { name: 'Deniz Ürünleri', actual: 310, target: 330 },
  { name: 'İçecek (Alkollü)', actual: 550, target: 500 },
  { name: 'Meyve & Sebze', actual: 180, target: 200 },
];

const recipes = [
  { id: 101, name: 'Dana Antrikot (250g)', category: 'Ana Yemek', cost: '₺ 280.50', price: '₺ 850.00', ratio: '33%' },
  { id: 102, name: 'Levrek Izgara', category: 'Balık', cost: '₺ 145.20', price: '₺ 520.00', ratio: '27.9%' },
  { id: 103, name: 'Margherita Pizza', category: 'Pizza', cost: '₺ 42.10', price: '₺ 340.00', ratio: '12.3%' },
];

const CostControl = () => {
  return (
    <div className="cost-container">
      <header className="header">
         <div className="title-section">
            <TrendingDown size={32} className="icon-red"/>
            <div>
               <h2>Maliyet Kontrol (Cost Control) & Reçete</h2>
               <span>Birim maliyet analizleri, tabak maliyetleri ve fire takibi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><FileText size={18}/> SAYIM GİRİŞİ</button>
            <button className="btn primary"><Plus size={18}/> YENİ REÇETE</button>
         </div>
      </header>

      <div className="cost-grid">
         {/* KPI Summary */}
         <div className="summary-row">
            <div className="card stat-card">
               <span className="label">Toplam Food Cost (%)</span>
               <strong className="red">31.4%</strong>
               <div className="trend neg"><AlertTriangle size={14}/> Hedefin 2.4% Üzerinde</div>
            </div>
            <div className="card stat-card">
               <span className="label">Toplam Beverage Cost (%)</span>
               <strong className="blue">18.2%</strong>
               <div className="trend pos">İdeal Sınırlar İçinde</div>
            </div>
         </div>

         {/* Recipe Table */}
         <section className="card list-section">
            <div className="section-header">
               <h3>AKTİF REÇETELER & KARLILIK</h3>
               <div className="search-box">
                  <Search size={16} />
                  <input type="text" placeholder="Yemek veya Kategori Ara..." />
               </div>
            </div>
            <table className="cost-table">
               <thead>
                  <tr>
                     <th>Ürün Adı</th>
                     <th>Kategori</th>
                     <th>Birim Maliyet</th>
                     <th>Satış Fiyatı</th>
                     <th>Cost Oranı</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {recipes.map((r, idx) => (
                    <tr key={idx}>
                       <td><strong>{r.name}</strong></td>
                       <td><span className="cat-pill">{r.category}</span></td>
                       <td><strong>{r.cost}</strong></td>
                       <td>{r.price}</td>
                       <td>
                          <div className="ratio-box">
                             <span className={parseFloat(r.ratio) > 30 ? 'high' : 'low'}>{r.ratio}</span>
                             <div className="mini-bar"><div className="fill" style={{ width: r.ratio, background: parseFloat(r.ratio) > 30 ? '#ef4444' : '#10b981' }}></div></div>
                          </div>
                       </td>
                       <td><button className="icon-btn"><ArrowRight size={16}/></button></td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </section>

         {/* Sidebar: Variance Chart */}
         <aside className="cost-sidebar">
            <section className="card chart-card">
               <h3>KATEGORİ VARYANS (HEDEF VS GERÇEK)</h3>
               <div style={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={costData}>
                        <XAxis dataKey="name" hide />
                        <Tooltip />
                        <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="actual" fill="#ef4444" radius={[4, 4, 0, 0]} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
               <div className="legend mt-10">
                  <div className="item"><div className="dot gray"></div> Hedef</div>
                  <div className="item"><div className="dot red"></div> Gerçekleşen</div>
               </div>
            </section>

            <div className="card mt-20 warning-card">
               <AlertTriangle size={24} className="red"/>
               <p><strong>Kırmızı Et</strong> maliyetleri tedarikçi fiyat artışı nedeniyle %14 yükseldi. Menü fiyatlarını güncelleyin.</p>
               <button className="btn-full primary mt-10">FİYAT REVİZYONU</button>
            </div>
         </aside>
      </div>

      <style jsx>{`
        .cost-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-red { color: #ef4444; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { font-size: 14px; color: #64748b; }

        .actions { display: flex; gap: 10px; }
        .btn { padding: 12px 24px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; border: none; font-size: 13px; }
        .btn.primary { background: #1e293b; color: white; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .cost-grid { display: grid; grid-template-columns: 1fr 320px; gap: 30px; }
        
        .summary-row { grid-column: 1 / 2; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .stat-card { padding: 25px; border-radius: 20px; }
        .stat-card .label { font-size: 11px; font-weight: 800; color: #94a3b8; display: block; margin-bottom: 5px; }
        .stat-card strong { font-size: 28px; font-weight: 900; }
        .stat-card .red { color: #ef4444; }
        .stat-card .blue { color: #3b82f6; }
        .trend { font-size: 11px; font-weight: 800; margin-top: 5px; display: flex; align-items: center; gap: 5px; color: #ef4444; }
        .trend.pos { color: #10b981; }

        .card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .section-header h3 { font-size: 14px; font-weight: 900; color: #1e293b; }

        .search-box { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 10px; }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 180px; }

        .cost-table { width: 100%; border-collapse: collapse; }
        .cost-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; }
        .cost-table td { padding: 15px 12px; font-size: 14px; border-bottom: 1px solid #f8fafc; color: #475569; }

        .cat-pill { background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; color: #64748b; }
        
        .ratio-box { display: flex; flex-direction: column; gap: 4px; width: 100px; }
        .ratio-box span { font-size: 12px; font-weight: 900; }
        .ratio-box span.high { color: #ef4444; }
        .ratio-box span.low { color: #10b981; }
        .mini-bar { width: 100%; height: 4px; background: #f1f5f9; border-radius: 2px; overflow: hidden; }
        .fill { height: 100%; }

        .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #f1f5f9; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #3b82f6; }

        .chart-card h3 { font-size: 12px; font-weight: 900; margin-bottom: 20px; color: #1e293b; letter-spacing: 0.5px; }
        .legend { display: flex; gap: 15px; }
        .legend .item { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: #64748b; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.gray { background: #e2e8f0; }
        .dot.red { background: #ef4444; }

        .warning-card { background: #fef2f2; border-color: #fee2e2; }
        .warning-card p { font-size: 12px; color: #991b1b; line-height: 1.5; margin: 15px 0; }
        
        .btn-full { width: 100%; padding: 12px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; }
        .btn-full.primary { background: #ef4444; color: white; }

        .blue { color: #3b82f6; }
        .red { color: #ef4444; }
        .mt-20 { margin-top: 20px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default CostControl;
