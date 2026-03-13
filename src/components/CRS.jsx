import React, { useState } from 'react';
import { 
  Globe, Search, Plus, 
  Layers, Package, MapPin,
  CheckCircle, MoreVertical, 
  ArrowRight, ShieldCheck, 
  DollarSign, TrendingUp, Filter,
  BookOpen, Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const properties = [
  { id: 1, name: 'Palace Resort & Spa', city: 'Antalya', availability: '82%', inventory: 42, color: '#3b82f6' },
  { id: 2, name: 'Grand City Hotel', city: 'İstanbul', availability: '64%', inventory: 15, color: '#10b981' },
  { id: 3, name: 'Blue Bay Hotel', city: 'Muğla', availability: '95%', inventory: 8, color: '#f59e0b' },
  { id: 4, name: 'Ski Mountain Lodge', city: 'Erzurum', availability: '24%', inventory: 112, color: '#8b5cf6' },
];

const CRS = () => {
  return (
    <div className="crs-container">
      <header className="header">
         <div className="title-section">
            <Globe size={32} className="icon-blue"/>
            <div>
               <h2>Central Reservation System (CRS)</h2>
               <span>Zincir otel yönetimi ve merkezi satış havuzu</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><Search size={18}/> GLOBAL ARA</button>
            <button className="btn primary"><Plus size={18}/> MERKEZİ KAYIT</button>
         </div>
      </header>

      <div className="crs-grid">
         {/* Group Performance Summary */}
         <section className="stats-grid">
            <div className="card stat-card">
               <span className="label">Toplam Müsaitlik (Grup)</span>
               <strong className="val">1,245 Oda</strong>
               <div className="trend pos"><TrendingUp size={14}/> 12 Yeni Rezervasyon (Son 1saat)</div>
            </div>
            <div className="card stat-card">
               <span className="label">Ortalama Grup ADR</span>
               <strong className="val">$ 188.50</strong>
               <div className="trend pos"><TrendingUp size={14}/> 5.2% vs Dün</div>
            </div>
         </section>

         {/* Property List Table */}
         <section className="card list-section">
            <div className="section-header">
               <h3>ZİNCİR OTEL ENVANTERİ</h3>
               <div className="search-box">
                  <Search size={16} />
                  <input type="text" placeholder="Şube veya Şehir Ara..." />
               </div>
            </div>
            <table className="crs-table">
               <thead>
                  <tr>
                     <th>Otel Adı</th>
                     <th>Lokasyon</th>
                     <th>Müsaitlik</th>
                     <th>Açık Envanter</th>
                     <th>Global Satış</th>
                     <th>Aksiyon</th>
                  </tr>
               </thead>
               <tbody>
                  {properties.map((p, idx) => (
                    <tr key={idx}>
                       <td><strong>{p.name}</strong></td>
                       <td>
                          <div className="loc">
                             <MapPin size={12} className="gray"/> {p.city}
                          </div>
                       </td>
                       <td>
                          <div className="avail-box">
                             <div className="p-bar"><div className="fill" style={{ width: p.availability, background: p.color }}></div></div>
                             <span>{p.availability}</span>
                          </div>
                       </td>
                       <td><span className="inv-badge">{p.inventory} Kategoride Boş</span></td>
                       <td><span className="status-badge live">CANLI</span></td>
                       <td><button className="icon-btn"><ArrowRight size={16}/></button></td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </section>

         {/* Right Sidebar: CRS Controls */}
         <aside className="crs-sidebar">
            <section className="card global-card">
               <Layers size={24} className="blue"/>
               <h3>Global Stop-Sell</h3>
               <p>Tüm şubelerde seçili tarihler için satışı kapatın.</p>
               <button className="btn-full outline mt-15">TARİHLERİ SEÇ</button>
            </section>

            <section className="card promo-card mt-20">
               <Star size={24} className="gold"/>
               <h3>Global Promosyon</h3>
               <p>Zincir geneli "Early Booking" kampanyası tanımla.</p>
               <button className="btn-full primary mt-15">KAMPANYA BAŞLAT</button>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .crs-container {
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

        .crs-grid { display: grid; grid-template-columns: 1fr 300px; gap: 30px; }
        
        .stats-grid { grid-column: 1 / 2; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .stat-card { padding: 25px; display: flex; flex-direction: column; gap: 8px; }
        .stat-card .label { font-size: 11px; font-weight: 800; color: #94a3b8; letter-spacing: 1px; }
        .stat-card .val { font-size: 24px; font-weight: 900; color: #1e293b; }
        .trend { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 800; }
        .trend.pos { color: #10b981; }

        .card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .section-header h3 { font-size: 13px; font-weight: 900; color: #1e293b; }

        .search-box { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 10px; }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 180px; }

        .crs-table { width: 100%; border-collapse: collapse; }
        .crs-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; }
        .crs-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; }

        .loc { display: flex; align-items: center; gap: 6px; color: #64748b; font-size: 12px; font-weight: 700; }

        .avail-box { display: flex; align-items: center; gap: 10px; width: 150px; }
        .p-bar { flex: 1; height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
        .fill { height: 100%; }
        .avail-box span { font-size: 11px; font-weight: 800; color: #1e293b; }

        .inv-badge { background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; color: #64748b; }
        .status-badge { font-size: 10px; font-weight: 900; padding: 4px 10px; border-radius: 20px; }
        .status-badge.live { background: #ecfdf5; color: #10b981; display: flex; align-items: center; gap: 5px; }
        .status-badge.live::before { content: ''; width: 4px; height: 4px; background: #10b981; border-radius: 50%; }

        .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #3b82f6; }

        .btn-full { width: 100%; padding: 12px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; }
        .btn-full.primary { background: #3b82f6; color: white; }
        .btn-full.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .blue { color: #3b82f6; }
        .gray { color: #94a3b8; }
        .gold { color: #f59e0b; }

        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
};

export default CRS;
