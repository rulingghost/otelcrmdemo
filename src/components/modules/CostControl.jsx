import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, Utensils, TrendingDown, AlertTriangle, 
  ArrowRight, PieChart, Info, History, Package, Search
} from 'lucide-react';

const CostControl = () => {
  const recipes = [
    { id: 1, name: 'Klasik Hamburger', cost: 125, price: 450, food_cost: 27.7, status: 'normal' },
    { id: 2, name: 'Margarita Pizza', cost: 85, price: 380, food_cost: 22.3, status: 'low' },
    { id: 3, name: 'Izgara Bonfile', cost: 320, price: 850, food_cost: 37.6, status: 'high' },
    { id: 4, name: 'Sezar Salata', cost: 65, price: 290, food_cost: 22.4, status: 'normal' },
  ];

  return (
    <div className="cc-page">
      <div className="cc-head">
        <div>
          <h2><Calculator size={20}/> Maliyet Kontrol & Reçete Yönetimi</h2>
          <span>F&B maliyetleri, COGS analizi ve stok varyans takibi</span>
        </div>
        <div className="head-stats">
          <div className="hs-i red">Global Food Cost: %29.4</div>
          <button className="btn-primary">Yeni Reçete Oluştur</button>
        </div>
      </div>

      <div className="cc-grid">
        {/* Cost Metrics */}
        <div className="cc-main">
          <div className="cc-card">
            <div className="ccc-head">
              <h3>Reçete Bazlı Maliyet Analizi</h3>
              <div className="search-bar">
                <Search size={14} color="#94a3b8"/>
                <input placeholder="Ürün veya reçete ara..." />
              </div>
            </div>

            <div className="recipe-list">
              <div className="rl-head">
                <span>Ürün Adı</span>
                <span>Maliyet</span>
                <span>Satış</span>
                <span>Marj (%)</span>
                <span>Durum</span>
              </div>
              {recipes.map((r, i) => (
                <motion.div 
                  key={r.id} 
                  className="rl-row"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="rl-name"><strong>{r.name}</strong></div>
                  <div className="rl-cost">₺{r.cost}</div>
                  <div className="rl-price">₺{r.price}</div>
                  <div className="rl-percent">
                    <div className="p-bar-bg"><div className="p-bar" style={{ width: `${r.food_cost}%`, background: r.food_cost > 35 ? '#ef4444' : '#10b981' }}/></div>
                    <span>%{r.food_cost}</span>
                  </div>
                  <div className={`rl-status ${r.status}`}>
                    {r.status === 'high' ? <AlertTriangle size={12}/> : null}
                    {r.status === 'high' ? 'Yüksek' : r.status === 'low' ? 'İdeal' : 'Normal'}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Alerts & COGS */}
        <div className="cc-sidebar">
          <div className="cogs-card">
            <h3>COGS Dağılımı</h3>
            <div className="cogs-stats">
              <div className="cs-i">
                <span>Mutfak</span>
                <strong>%32.1</strong>
                <div className="cs-bar" style={{ width: '32%', background: '#3b82f6' }}/>
              </div>
              <div className="cs-i">
                <span>Bar</span>
                <strong>%18.4</strong>
                <div className="cs-bar" style={{ width: '18%', background: '#10b981' }}/>
              </div>
              <div className="cs-i">
                <span>Minibar</span>
                <strong>%12.5</strong>
                <div className="cs-bar" style={{ width: '12%', background: '#f59e0b' }}/>
              </div>
            </div>
          </div>

          <div className="warning-box">
            <div className="wb-head">
              <TrendingDown size={18} color="#ef4444"/>
              <strong>Fiyat İstisnası</strong>
            </div>
            <p><strong>"Bonfile"</strong> alım fiyatı son 1 haftada %12 arttı. Reçete maliyeti otomatik güncellendi.</p>
            <button className="wb-btn">Reçeteyi İncele <ArrowRight size={12}/></button>
          </div>

          <div className="summary-list">
            <h4>Hızlı İşlemler</h4>
            <button className="sl-btn"><History size={14}/> Zayi Kaydı Gir</button>
            <button className="sl-btn"><Package size={14}/> Sayım Farkı Raporu</button>
            <button className="sl-btn"><PieChart size={14}/> Menü Mühendisliği</button>
          </div>
        </div>
      </div>

      <style>{`
        .cc-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .cc-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .cc-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .cc-head span { font-size: 13px; color: #94a3b8; }
        
        .head-stats { display: flex; align-items: center; gap: 16px; }
        .hs-i { padding: 8px 16px; border-radius: 20px; font-size: 11px; font-weight: 800; }
        .hs-i.red { background: #fef2f2; color: #ef4444; border: 1px solid #fee2e2; }
        .btn-primary { padding: 10px 18px; border-radius: 12px; border: none; background: #1e293b; color: white; font-weight: 700; font-size: 13px; cursor: pointer; }

        .cc-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        
        .cc-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .ccc-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .ccc-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .search-bar { background: #f8fafc; border: 1.5px solid #f1f5f9; border-radius: 10px; padding: 6px 12px; display: flex; align-items: center; gap: 8px; width: 220px; }
        .search-bar input { border: none; background: transparent; outline: none; font-size: 12px; width: 100%; }

        .recipe-list { display: flex; flex-direction: column; }
        .rl-head { display: grid; grid-template-columns: 2fr 100px 100px 1fr 100px; padding: 12px; font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; border-bottom: 1.5px solid #f8fafc; }
        .rl-row { display: grid; grid-template-columns: 2fr 100px 100px 1fr 100px; padding: 16px 12px; align-items: center; border-bottom: 1px solid #f8fafc; }
        .rl-name strong { font-size: 14px; color: #1e293b; }
        .rl-cost, .rl-price { font-size: 13px; font-weight: 700; color: #475569; }
        
        .rl-percent { display: flex; align-items: center; gap: 10px; }
        .p-bar-bg { flex: 1; height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden; }
        .p-bar { height: 100%; border-radius: 10px; }
        .rl-percent span { font-size: 11px; font-weight: 800; color: #1e293b; width: 40px; }

        .rl-status { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; display: flex; align-items: center; gap: 4px; justify-content: center; }
        .rl-status.high { background: #fef2f2; color: #ef4444; }
        .rl-status.low { background: #f0fdf4; color: #10b981; }
        .rl-status.normal { background: #f1f5f9; color: #64748b; }

        .cc-sidebar { display: flex; flex-direction: column; gap: 20px; }
        .cogs-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .cogs-card h3 { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        
        .cogs-stats { display: flex; flex-direction: column; gap: 16px; }
        .cs-i { display: flex; flex-direction: column; gap: 6px; position: relative; }
        .cs-i span { font-size: 11px; font-weight: 700; color: #94a3b8; }
        .cs-i strong { font-size: 16px; font-weight: 900; color: #1e293b; }
        .cs-bar { height: 4px; border-radius: 10px; transition: 1s width; }

        .warning-box { background: #fff5f5; border: 1px solid #ffe3e3; border-radius: 20px; padding: 20px; }
        .wb-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .wb-head strong { font-size: 14px; color: #ef4444; }
        .warning-box p { font-size: 12px; color: #991b1b; line-height: 1.5; margin-bottom: 12px; }
        .wb-btn { background: white; border: 1px solid #fee2e2; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; color: #ef4444; cursor: pointer; display: flex; align-items: center; gap: 6px; }

        .summary-list { display: flex; flex-direction: column; gap: 8px; }
        .summary-list h4 { font-size: 12px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; padding-left: 10px; }
        .sl-btn { background: white; border: 1.5px solid #f1f5f9; border-radius: 14px; padding: 12px 16px; display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 700; color: #475569; cursor: pointer; transition: 0.2s; }
        .sl-btn:hover { border-color: #1e293b; color: #1e293b; background: #f8fafc; }
      `}</style>
    </div>
  );
};

export default CostControl;
