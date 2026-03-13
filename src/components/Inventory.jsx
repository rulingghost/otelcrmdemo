import React, { useState } from 'react';
import { 
  Box, Search, Plus, 
  ShoppingCart, RefreshCw, BarChart,
  ChevronDown, Filter, MoreVertical,
  CheckCircle, AlertTriangle, Package,
  ArrowRight, DollarSign, Utensils,
  History, Settings, PieChart as PieIcon,
  ChefHat, Tag, Info, Layers,
  TrendingUp, TrendingDown, ClipboardList
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { motion } from 'framer-motion';

const inventoryItems = [
  { id: 1, name: 'Dana Antrikot', unit: 'kg', stock: 45, critical: 50, price: '₺ 680', status: 'critical', method: 'FIFO' },
  { id: 2, name: 'Domates (Salkım)', unit: 'kg', stock: 120, critical: 80, price: '₺ 35', status: 'normal', method: 'FIFO' },
  { id: 3, name: 'Zeytinyağı (Sızma)', unit: 'Lt', stock: 15, critical: 20, price: '₺ 420', status: 'critical', method: 'LIFO' },
  { id: 4, name: 'Coca-Cola 330ml', unit: 'Case', stock: 85, critical: 30, price: '₺ 540', status: 'normal', method: 'FIFO' },
  { id: 5, name: 'Efes Malt 50cl', unit: 'Case', stock: 12, critical: 25, price: '₺ 820', status: 'critical', method: 'FIFO' },
  { id: 6, name: 'Temizlik Kiti A1', unit: 'Set', stock: 240, critical: 100, price: '₺ 125', status: 'normal', method: 'FIFO' },
];

const dailyCostData = [
  { day: 'Pzt', cost: 12400 },
  { day: 'Sal', cost: 15600 },
  { day: 'Çar', cost: 11200 },
  { day: 'Per', cost: 18900 },
  { day: 'Cum', cost: 22400 },
  { day: 'Cmt', cost: 28600 },
  { day: 'Paz', cost: 14200 },
];

const pieData = [
  { name: 'Mutfak (F&B)', value: 55, color: '#ef4444' },
  { name: 'İçecek (Bev)', value: 25, color: '#3b82f6' },
  { name: 'Genel Gider', value: 20, color: '#f59e0b' },
];

const Inventory = () => {
  const [activeDepot, setActiveDepot] = useState('main');

  return (
    <div className="inv-container">
      <header className="header">
         <div className="title-section">
            <Box size={32} className="icon-blue"/>
            <div>
               <h2>Ambar, Stok & Maliyet Kontrol (Cost Control)</h2>
               <span>Dinamik reçetelendirme, FIFO/LIFO takibi ve zayi yönetimi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><ClipboardList size={18}/> SAYIM TUTANAĞI</button>
            <button className="btn primary orange"><ShoppingCart size={18}/> SATIN ALMA TALEBİ AÇ</button>
         </div>
      </header>

      <div className="inv-grid">
         {/* Left Side: Depot Selection & Metrics */}
         <aside className="left-panel">
            <section className="card depot-card">
               <h3>AMBARLAR / REYONLAR</h3>
               <div className="d-list mt-15">
                  <div className={`d-item ${activeDepot === 'main' ? 'active' : ''}`} onClick={() => setActiveDepot('main')}>
                     <Package size={18}/> <div><strong>Ana Depo</strong><span>842 Kalem</span></div>
                  </div>
                  <div className={`d-item ${activeDepot === 'fnb' ? 'active' : ''}`} onClick={() => setActiveDepot('fnb')}>
                     <Utensils size={18}/> <div><strong>Mutfak Ambarı</strong><span>215 Kalem</span></div>
                  </div>
                  <div className={`d-item ${activeDepot === 'hk' ? 'active' : ''}`} onClick={() => setActiveDepot('hk')}>
                     <Layers size={18}/> <div><strong>HK Deposu</strong><span>112 Kalem</span></div>
                  </div>
               </div>
            </section>

            <section className="card stats-card mt-20">
               <h3>MALİYET DAĞILIMI</h3>
               <div className="donut-box">
                  <ResponsiveContainer width="100%" height={160}>
                     <PieChart>
                        <Pie data={pieData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                           {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="d-center"><strong>₺ 242K</strong><span>STOK BEDELİ</span></div>
               </div>
               <div className="leg-list mt-15">
                  {pieData.map((item, i) => (
                    <div key={i} className="leg-item">
                       <div className="dot" style={{ background: item.color }}></div>
                       <span>{item.name}</span>
                       <strong>{item.value}%</strong>
                    </div>
                  ))}
               </div>
            </section>
         </aside>

         {/* Center: Inventory List & Movements */}
         <section className="main-content">
            <div className="card list-card">
               <div className="l-header">
                  <div className="sh-title">
                     <TrendingUp size={20} className="green"/>
                     <h3>KRİTİK STOK VE HAREKETLER</h3>
                  </div>
                  <div className="search-box">
                     <Search size={16}/>
                     <input type="text" placeholder="Ürün adı, barkod veya kategori..." />
                  </div>
               </div>
               <table className="inv-table">
                  <thead>
                     <tr>
                        <th>Ürün / Yöntem</th>
                        <th>Birim</th>
                        <th>Stok</th>
                        <th>Kritik</th>
                        <th>Birim Maliyet</th>
                        <th>Durum</th>
                        <th>İşlem</th>
                     </tr>
                  </thead>
                  <tbody>
                     {inventoryItems.map((item, i) => (
                       <tr key={i}>
                          <td>
                             <div className="name-cell">
                                <strong>{item.name}</strong>
                                <span className="method">{item.method}</span>
                             </div>
                          </td>
                          <td>{item.unit}</td>
                          <td><strong className={item.status === 'critical' ? 'red' : 'blue'}>{item.stock}</strong></td>
                          <td>{item.critical}</td>
                          <td>{item.price}</td>
                          <td>
                             <span className={`status-pill ${item.status}`}>
                                {item.status === 'critical' ? 'Kritik Seviye' : 'Normal'}
                             </span>
                          </td>
                          <td><button className="icon-btn"><MoreVertical size={16}/></button></td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="cost-analysis-row mt-20">
               <div className="card cost-chart">
                  <h3>GÜNLÜK TÜKETİM MALİYETİ (DAILY FOOD COST)</h3>
                  <div style={{ height: 180, marginTop: 20 }}>
                     <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart data={dailyCostData}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                           <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                           <YAxis axisLine={false} tickLine={false} hide />
                           <Tooltip cursor={{fill: '#f8fafc'}} />
                           <Bar dataKey="cost" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </ReBarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>
         </section>

         {/* Right Sidebar: Recipes & Approvals */}
         <aside className="right-panel">
            <section className="card recipe-card">
               <div className="rh">
                  <ChefHat size={18} className="orange"/>
                  <h3>REÇETE ANALİZİ</h3>
               </div>
               <div className="recipe-hero mt-15">
                  <img src="https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=300" alt="Pizza" />
                  <div className="overlay">
                     <strong>Margherita Pizza</strong>
                     <span>Reçete Maliyeti: <strong>₺ 84.50</strong></span>
                  </div>
               </div>
               <div className="recipe-stats mt-20">
                  <div className="rs-line"><span>Maliyet Oranı</span><strong className="red">% 28.4</strong></div>
                  <div className="rs-line mt-10"><span>Satış Fiyatı</span><strong>₺ 340.00</strong></div>
               </div>
               <button className="btn-full outline mt-15">REÇETE DETAYINI AÇ</button>
            </section>

            <section className="card task-card mt-20">
               <h3>MALİYET UYARILARI</h3>
               <div className="task-feed">
                  <div className="task-item warn">
                    <AlertTriangle size={14}/>
                    <div>
                       <strong>Fiyat Artışı Saptandı</strong>
                       <p>Domates birim fiyatı %15 arttı.</p>
                    </div>
                  </div>
                  <div className="task-item info">
                    <CheckCircle size={14}/>
                    <div>
                       <strong>Sayım Onaylandı</strong>
                       <p>Bar ambar sayımı Şef tarafından onaylandı.</p>
                    </div>
                  </div>
               </div>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .inv-container {
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

        .btn { padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; border: none; font-size: 13px; display: flex; align-items: center; gap: 10px; }
        .btn.primary.orange { background: #f59e0b; color: white; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .inv-grid { display: grid; grid-template-columns: 280px 1fr 320px; gap: 30px; }

        .card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; letter-spacing: 1px; }

        .d-list { display: flex; flex-direction: column; gap: 8px; }
        .d-item { display: flex; align-items: center; gap: 15px; padding: 12px; border-radius: 12px; cursor: pointer; color: #64748b; transition: 0.2s; }
        .d-item.active { background: #3b82f6; color: white; }
        .d-item strong { display: block; font-size: 14px; }
        .d-item span { font-size: 10px; font-weight: 700; opacity: 0.8; }

        .donut-box { position: relative; display: flex; justify-content: center; align-items: center; margin-top: 20px; }
        .d-center { position: absolute; text-align: center; }
        .d-center strong { display: block; font-size: 18px; color: #1e293b; }
        .d-center span { font-size: 8px; font-weight: 900; color: #94a3b8; }

        .leg-list { display: flex; flex-direction: column; gap: 8px; }
        .leg-item { display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 700; color: #64748b; }
        .leg-item strong { margin-left: auto; color: #1e293b; }
        .dot { width: 8px; height: 8px; border-radius: 2px; }

        .l-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .sh-title { display: flex; align-items: center; gap: 10px; }
        .search-box { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 10px; }
        .search-box input { border: none; background: transparent; outline: none; font-size: 13px; width: 200px; }

        .inv-table { width: 100%; border-collapse: collapse; }
        .inv-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 2px solid #f1f5f9; text-transform: uppercase; }
        .inv-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; }
        .name-cell .method { font-size: 9px; font-weight: 900; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; margin-left: 8px; color: #64748b; }
        
        .status-pill { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; }
        .status-pill.critical { background: #fee2e2; color: #dc2626; }
        .status-pill.normal { background: #ecfdf5; color: #10b981; }

        .recipe-hero { position: relative; border-radius: 16px; overflow: hidden; height: 140px; }
        .recipe-hero img { width: 100%; height: 100%; object-fit: cover; }
        .recipe-hero .overlay { position: absolute; inset: 0; background: linear-gradient(transparent, rgba(0,0,0,0.8)); padding: 20px; color: white; display: flex; flex-direction: column; justify-content: flex-end; }
        .recipe-hero .overlay strong { font-size: 16px; }
        .recipe-hero .overlay span { font-size: 11px; opacity: 0.9; }

        .rs-line { display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; color: #64748b; }
        .rs-line strong { color: #1e293b; }

        .task-feed { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
        .task-item { display: flex; gap: 12px; padding: 12px; border-radius: 12px; font-size: 12px; }
        .task-item.warn { background: #fffbeb; color: #92400e; }
        .task-item.info { background: #f0fdf4; color: #15803d; }
        .task-item strong { display: block; margin-bottom: 2px; }
        .task-item p { font-size: 11px; opacity: 0.8; }

        .btn-full { width: 100%; padding: 12px; border-radius: 12px; font-weight: 800; cursor: pointer; font-size: 12px; }
        .btn-full.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .blue { color: #3b82f6; }
        .red { color: #ef4444; }
        .green { color: #10b981; }
        .orange { color: #f59e0b; }
        .mt-20 { margin-top: 20px; }
        .mt-15 { margin-top: 15px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default Inventory;
