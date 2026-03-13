import React, { useState } from 'react';
import { 
  Bed, Wrench, Search, Plus, 
  AlertTriangle, CheckCircle, RefreshCcw,
  Box, User, ChevronDown, Filter,
  Clock, LayoutGrid, PieChart as PieIcon,
  Activity, Droplets, Thermometer,
  MoreVertical, Hammer
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from 'recharts';
import { motion } from 'framer-motion';

const rooms = Array.from({ length: 45 }, (_, i) => ({
  id: (101 + i).toString(),
  status: Math.random() > 0.7 ? 'dirty' : (Math.random() > 0.5 ? 'cleaning' : 'clean')
}));

const stockMovements = [
  { item: 'KİRLİ', unit: 'kg', stock: '10 kg', critical: '10 kg', price: '₺ 26 /kg' },
  { item: 'TEMİZ', unit: 'lt', stock: '10 kg', critical: '8 kg', price: '₺ 27 /kg' },
];

const techOrders = [
  { id: '204', room: '104', issue: 'Klima Arızası', person: 'Bekir', time: '2h', priority: 'KRİTİK' },
  { id: 'Lobi', room: 'Lobi', issue: 'Ampul Değişimi', person: 'Kerem', time: '35m', priority: 'NORMAL' },
  { id: '107', room: '107', issue: 'Fiyat Bak', person: 'Volkan', time: '1h', priority: 'NORMAL' },
  { id: '312', room: '312', issue: 'Toilet Çatlaması', person: 'Mehmet', time: '3h', priority: 'KRİTİK' },
];

const pieData = [
  { name: 'Kirli', value: 59, color: '#ef4444' },
  { name: 'İyi', value: 33, color: '#3b82f6' },
  { name: 'Arızalı', value: 8, color: '#f59e0b' },
];

const Housekeeping = () => {
  return (
    <div className="hk-container">
      <header className="header">
         <div className="title-section">
            <Bed size={32} className="icon-blue"/>
            <div>
               <h2>Housekeeping & Maintenance</h2>
               <span>Oda temizlik yönetimi, stok takibi ve teknik servis koordinasyonu</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline">HK GÖREVLİ ATAMA</button>
            <button className="btn outline">AMBAR GİRİŞİ</button>
            <button className="btn primary red"><AlertTriangle size={18}/> ARIZA BİLDİR</button>
         </div>
      </header>

      <div className="hk-grid">
         {/* Left: Stock & Stats */}
         <aside className="left-panel">
            <section className="card depot-card">
               <h3>AMBAR LİSTESİ</h3>
               <div className="d-list">
                  <div className="d-item active">
                     <Box size={16} className="blue"/>
                     <div className="d-info">
                        <strong>Ana Ambar</strong>
                        <span>185 ürün</span>
                     </div>
                     <ChevronDown size={14} className="gray"/>
                  </div>
                  <div className="d-item mt-10">
                     <div className="dot"></div>
                     <div className="d-info">
                        <strong>Mutfak & Bar</strong>
                        <span>226 ürün</span>
                     </div>
                  </div>
               </div>
            </section>

            <section className="card stats-card mt-20">
               <h3>STOK DURUMU</h3>
               <div className="donut-box">
                  <ResponsiveContainer width="100%" height={150}>
                     <PieChart>
                        <Pie
                           data={pieData}
                           innerRadius={45}
                           outerRadius={60}
                           paddingAngle={5}
                           dataKey="value"
                        >
                           {pieData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="d-text">
                     <strong>₺ 97,450</strong>
                     <span>TOPLAM MALİYET</span>
                  </div>
               </div>
               <div className="hk-stats mt-15">
                  <div className="s-item">TOPLAM KİRLİ: <strong>45</strong></div>
                  <div className="s-item">HAZIR ODA: <strong>12</strong></div>
                  <div className="s-item">ARIZALI: <strong>3</strong></div>
               </div>
            </section>
         </aside>

         {/* Center: Room Matrix & Movements */}
         <section className="main-content">
            <div className="card matrix-card">
               <div className="m-head">
                  <h3>ODA TEMİZLİK DURUM MATRİSİ</h3>
                  <div className="m-actions">
                     <button className="icon-btn active"><LayoutGrid size={16}/></button>
                     <button className="icon-btn"><Search size={16}/></button>
                  </div>
               </div>
               <div className="room-dots">
                  {rooms.map((r, i) => (
                    <div key={i} className={`room-dot ${r.status}`} title={r.id}>
                       <span>{r.id.slice(-2)}</span>
                    </div>
                  ))}
               </div>
               <div className="m-footer mt-20">
                  <div className="legend">
                     <div className="l-item"><div className="dot dirty"></div> Kirli</div>
                     <div className="l-item"><div className="dot clean"></div> Temiz</div>
                     <div className="l-item"><div className="dot cleaning"></div> Temizleniyor</div>
                  </div>
               </div>
            </div>

            <div className="card movements-card mt-20">
               <h3>STOK HAREKETLERİ</h3>
               <table className="hk-table">
                  <thead>
                     <tr>
                        <th>Ürün Adı</th>
                        <th>Birim</th>
                        <th>Mevcut Stok</th>
                        <th>Kritik Seviye</th>
                        <th>Son Alış Fiyatı</th>
                     </tr>
                  </thead>
                  <tbody>
                     {stockMovements.map((s, i) => (
                       <tr key={i}>
                          <td><strong>{s.item}</strong></td>
                          <td>{s.unit}</td>
                          <td><span className="stock-badge">{s.stock}</span></td>
                          <td>{s.critical}</td>
                          <td>{s.price}</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </section>

         {/* Right: Technical Orders */}
         <aside className="right-panel">
            <section className="card tech-card">
               <div className="t-head">
                  <h3>TEKNİK SERVİS İŞ EMİRLERİ</h3>
                  <div className="t-filter">
                     <span>Oda Sıralı</span>
                     <ChevronDown size={14}/>
                  </div>
               </div>
               <div className="tech-list mt-15">
                  {techOrders.map((o, i) => (
                    <div key={i} className="tech-item">
                       <div className="ti-head">
                          <strong>{o.room} • {o.issue}</strong>
                          <span className={`p-tag ${o.priority === 'KRİTİK' ? 'red' : 'yellow'}`}>{o.priority}</span>
                       </div>
                       <div className="ti-footer">
                          <span><User size={12}/> {o.person} | {o.time}</span>
                          <span className="time-ago">+{i+1}s</span>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="btn-full mt-20">Tümünü Gör...</button>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .hk-container {
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
        .btn { padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }
        .btn.primary.red { background: #ef4444; color: white; display: flex; align-items: center; gap: 8px; }

        .hk-grid { display: grid; grid-template-columns: 260px 1fr 310px; gap: 30px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; margin-bottom: 25px; letter-spacing: 0.5px; }

        .d-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 10px; transition: 0.2s; cursor: pointer; }
        .d-item.active { background: #eff6ff; }
        .d-info { display: flex; flex-direction: column; }
        .d-info strong { font-size: 13px; color: #1e293b; }
        .d-info span { font-size: 10px; color: #94a3b8; }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: #cbd5e1; }

        .donut-box { position: relative; display: flex; align-items: center; justify-content: center; }
        .d-text { position: absolute; text-align: center; }
        .d-text strong { display: block; font-size: 14px; color: #1e293b; }
        .d-text span { font-size: 8px; color: #94a3b8; font-weight: 800; }

        .hk-stats { display: flex; flex-direction: column; gap: 8px; }
        .s-item { font-size: 11px; font-weight: 800; color: #64748b; display: flex; justify-content: space-between; }
        .s-item strong { color: #1e293b; }

        .room-dots { display: grid; grid-template-columns: repeat(9, 1fr); gap: 6px; }
        .room-dot { aspect-ratio: 1; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 900; color: white; cursor: pointer; }
        .room-dot.dirty { background: #ef4444; }
        .room-dot.clean { background: #3b82f6; }
        .room-dot.cleaning { background: #f59e0b; }

        .legend { display: flex; gap: 15px; }
        .l-item { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #94a3b8; font-weight: 800; }
        .l-item .dot { width: 8px; height: 8px; border-radius: 50%; }
        .l-item .dot.dirty { background: #ef4444; }
        .l-item .dot.clean { background: #3b82f6; }
        .l-item .dot.cleaning { background: #f59e0b; }

        .hk-table { width: 100%; border-collapse: collapse; }
        .hk-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; text-transform: uppercase; }
        .hk-table td { padding: 15px 12px; font-size: 12px; border-bottom: 1px solid #f8fafc; color: #475569; }
        .stock-badge { padding: 2px 8px; background: #eff6ff; color: #3b82f6; border-radius: 4px; font-size: 10px; font-weight: 900; }

        .tech-item { padding: 15px; background: #f8fafc; border-radius: 12px; margin-bottom: 10px; border: 1px solid #e2e8f0; }
        .ti-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
        .ti-head strong { font-size: 12px; color: #1e293b; flex: 1; }
        .p-tag { font-size: 9px; font-weight: 900; padding: 2px 6px; border-radius: 4px; }
        .p-tag.red { background: #ef4444; color: white; }
        .p-tag.yellow { background: #f59e0b; color: white; }
        .ti-footer { display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; font-weight: 800; }

        .btn-full { width: 100%; padding: 12px; background: #f1f5f9; color: #64748b; border-radius: 10px; font-size: 11px; font-weight: 800; cursor: pointer; border: 1px solid #e2e8f0; }

        .blue { color: #3b82f6; }
        .gray { color: #94a3b8; }
        .mt-20 { margin-top: 20px; }
        .mt-15 { margin-top: 15px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default Housekeeping;
