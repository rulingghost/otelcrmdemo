import React, { useState } from 'react';
import { 
  Calculator, Target, BarChart3, 
  DollarSign, TrendingUp, TrendingDown,
  PieChart as PieIcon, ArrowRight,
  Plus, Settings, Save, Download
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';

const budgetData = [
  { category: 'Pazarlama', budget: 150000, actual: 124000 },
  { category: 'Enerji', budget: 280000, actual: 310000 },
  { category: 'Personel', budget: 1200000, actual: 1180000 },
  { category: 'Gıda & İçecek', budget: 450000, actual: 485000 },
  { category: 'Bakım Onarım', budget: 120000, actual: 95000 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const BudgetPlanning = () => {
  return (
    <div className="budget-container">
      <header className="header">
         <div className="title-section">
            <Calculator size={32} className="icon-blue"/>
            <div>
               <h2>Yıllık Bütçe Planlama & Takibi</h2>
               <span>Departman hedefleri, gider kontolü ve varyans analizi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><Settings size={18}/> HEDEFLERİ DÜZENLE</button>
            <button className="btn primary"><Save size={18}/> BÜTÇEYİ KAYDET</button>
         </div>
      </header>

      <div className="budget-grid">
         {/* Overall Summary Row */}
         <div className="summary-row">
            <div className="card stat-card">
               <span className="label">TOPLAM BÜTÇE (YTD)</span>
               <strong className="val">₺ 12,450,000</strong>
               <div className="sub-val">2024 Mali Yılı</div>
            </div>
            <div className="card stat-card">
               <span className="label">GERÇEKLEŞEN (YTD)</span>
               <strong className="val">₺ 11,820,000</strong>
               <div className="variance pos">
                  <TrendingDown size={14}/> 5.1% Altında (Tasarruf)
               </div>
            </div>
            <div className="card stat-card">
               <span className="label">KALAN BAKİYE</span>
               <strong className="val">₺ 630,000</strong>
               <div className="sub-val">Gelecek Dönem İçin</div>
            </div>
         </div>

         {/* Chart Section */}
         <section className="card chart-section">
            <div className="section-head">
               <h3>DEPARTMAN BAZLI BÜTÇE VS GERÇEKLEŞEN</h3>
            </div>
            <div style={{ height: 350 }}>
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetData} layout="vertical">
                     <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                     <XAxis type="number" hide />
                     <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={120} />
                     <Tooltip />
                     <Bar dataKey="budget" fill="#e2e8f0" radius={[0, 4, 4, 0]} />
                     <Bar dataKey="actual" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </section>

         {/* Right Sidebar: Distribution */}
         <aside className="budget-sidebar">
            <section className="card distribution-card">
               <h3>GİDER DAĞILIMI</h3>
               <div style={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={budgetData}
                           cx="50%"
                           cy="50%"
                           innerRadius={60}
                           outerRadius={80}
                           paddingAngle={5}
                           dataKey="actual"
                        >
                           {budgetData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                           ))}
                        </Pie>
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="legend">
                  {budgetData.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="l-item">
                       <span className="dot" style={{ background: COLORS[idx] }}></span>
                       <span className="name">{item.category}</span>
                       <span className="perc">%{(item.actual / 118200).toFixed(1)}</span>
                    </div>
                  ))}
               </div>
            </section>

            <div className="card mt-20 warning-card">
               <Target size={24} className="red"/>
               <p><strong>Enerji Gideri</strong> bütçeyi %12 aştı. Lütfen Smart Room tasarruf protokollerini inceleyin.</p>
               <button className="btn-full outline mt-10">ANALİZİ AÇ</button>
            </div>
         </aside>
      </div>

      <style jsx>{`
        .budget-container {
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
        .btn { padding: 12px 24px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; border: none; font-size: 14px; }
        .btn.primary { background: #1e293b; color: white; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .budget-grid { display: grid; grid-template-columns: 1fr 320px; gap: 30px; }

        .summary-row { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .stat-card { padding: 25px; border-radius: 20px; text-align: center; }
        .stat-card .label { font-size: 12px; font-weight: 800; color: #94a3b8; letter-spacing: 1px; }
        .stat-card .val { display: block; font-size: 24px; font-weight: 900; color: #1e293b; margin: 10px 0; }
        .stat-card .sub-val { font-size: 12px; color: #64748b; font-weight: 600; }
        .variance { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px; }
        .variance.pos { background: #ecfdf5; color: #10b981; }

        .card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .section-head h3 { font-size: 14px; font-weight: 900; color: #1e293b; margin-bottom: 25px; }

        .distribution-card { display: flex; flex-direction: column; align-items: center; }
        .legend { width: 100%; display: flex; flex-direction: column; gap: 10px; margin-top: 15px; }
        .l-item { display: flex; align-items: center; gap: 10px; font-size: 12px; }
        .l-item .dot { width: 8px; height: 8px; border-radius: 50%; }
        .l-item .name { flex: 1; color: #64748b; font-weight: 600; }
        .l-item .perc { font-weight: 800; color: #1e293b; }

        .warning-card { background: #fef2f2; border-color: #fecaca; }
        .warning-card p { font-size: 13px; color: #991b1b; line-height: 1.5; margin: 15px 0; }
        .btn-full { width: 100%; padding: 10px; border-radius: 10px; font-size: 12px; font-weight: 700; cursor: pointer; border: 1px solid #fecaca; background: white; color: #991b1b; }

        .red { color: #ef4444; }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
};

export default BudgetPlanning;
