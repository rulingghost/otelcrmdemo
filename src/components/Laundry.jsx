import React, { useState } from 'react';
import { 
  Waves, Search, Plus, 
  Shirt, Scissors, Clock,
  CheckCircle, MoreVertical, 
  User, DollarSign, Printer,
  Filter, Tag, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const activeOrders = [
  { id: 'L-521', room: '204', type: 'Yıkama + Ütü', items: '3 Gömlek, 2 Pantolon', status: 'processing', time: '12:45' },
  { id: 'L-522', room: '108', type: 'Kuru Temizleme', items: '1 Takım Elbise', status: 'ready', time: '14:20' },
  { id: 'L-523', room: '312', type: 'Sadece Ütü', items: '5 Gömlek', status: 'pending', time: '15:10' },
];

const prices = [
  { name: 'Gömlek', wash: 45, dry: 85, iron: 30 },
  { name: 'Pantolon', wash: 55, dry: 95, iron: 35 },
  { name: 'Ceket', wash: 80, dry: 180, iron: 70 },
];

const Laundry = () => {
  return (
    <div className="laundry-container">
      <div className="header">
         <div className="title-section">
            <Shirt size={32} className="icon-blue"/>
            <div>
               <h2>Çamaşırhane & Kuru Temizleme</h2>
               <span>Misafir yıkama talepleri ve kurumsal tekstil yönetimi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn-laundry primary"><Plus size={18}/> YENİ SİPARİŞ OLUŞTUR</button>
         </div>
      </div>

      <div className="laundry-grid">
         {/* Order List */}
         <section className="card list-section">
            <div className="section-header">
               <h3>AKTİF SİPARİŞLER</h3>
               <div className="search-box">
                  <Search size={16} />
                  <input type="text" placeholder="Oda veya ID Ara..." />
               </div>
            </div>
            <div className="order-grid">
               {activeOrders.map((order, idx) => (
                 <div key={idx} className={`order-card ${order.status}`}>
                    <div className="o-head">
                       <span className="room">ODA {order.room}</span>
                       <span className={`status-tag ${order.status}`}>
                          {order.status === 'processing' ? 'Yıkanıyor' : order.status === 'ready' ? 'Hazır' : 'Bekliyor'}
                       </span>
                    </div>
                    <div className="o-body">
                       <strong>{order.type}</strong>
                       <p>{order.items}</p>
                    </div>
                    <div className="o-footer">
                       <span className="time"><Clock size={12}/> {order.time}</span>
                       <div className="btns">
                          <button className="btn-icon"><CheckCircle size={14}/></button>
                          <button className="btn-icon"><MoreVertical size={14}/></button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </section>

         {/* Price List & Stats */}
         <aside className="laundry-sidebar">
            <section className="card price-card">
               <div className="section-header">
                  <h3>FİYAT LİSTESİ (₺)</h3>
                  <Tag size={16} className="gray"/>
               </div>
               <table className="price-table">
                  <thead>
                     <tr>
                        <th>Ürün</th>
                        <th className="right">Yıkama</th>
                        <th className="right">Kuru T.</th>
                     </tr>
                  </thead>
                  <tbody>
                     {prices.map((p, idx) => (
                       <tr key={idx}>
                          <td>{p.name}</td>
                          <td className="right">{p.wash}</td>
                          <td className="right">{p.dry}</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </section>

            <section className="card mt-20 stats-card">
               <div className="stat-item">
                  <div className="icon purple"><Waves size={20}/></div>
                  <div className="info">
                     <span>Yıkama Kapasitesi</span>
                     <strong>%68</strong>
                  </div>
               </div>
               <div className="stat-item mt-20">
                  <div className="icon green"><CheckCircle size={20}/></div>
                  <div className="info">
                     <span>Teslime Hazır</span>
                     <strong>12 Sipariş</strong>
                  </div>
               </div>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .laundry-container {
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
        .title-section span { color: #64748b; font-size: 14px; }

        .btn-laundry.primary {
           background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer;
        }

        .laundry-grid { display: grid; grid-template-columns: 1fr 320px; gap: 30px; }

        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .section-header h3 { font-size: 15px; font-weight: 800; color: #1e293b; }

        .search-box {
           display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 10px;
        }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 150px; }

        .order-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
        .order-card {
           background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 15px; transition: all 0.2s;
        }
        .order-card:hover { border-color: #3b82f6; transform: translateY(-3px); }
        .order-card.ready { border-left: 4px solid #10b981; }
        .order-card.processing { border-left: 4px solid #3b82f6; }
        .order-card.pending { border-left: 4px solid #f59e0b; }

        .o-head { display: flex; justify-content: space-between; align-items: center; }
        .room { font-size: 11px; font-weight: 900; color: #3b82f6; }
        .status-tag { font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 6px; }
        .status-tag.ready { background: #ecfdf5; color: #10b981; }
        .status-tag.processing { background: #eff6ff; color: #3b82f6; }
        .status-tag.pending { background: #fffbeb; color: #f59e0b; }

        .o-body strong { display: block; font-size: 14px; color: #1e293b; margin-bottom: 5px; }
        .o-body p { font-size: 12px; color: #64748b; line-height: 1.5; }

        .o-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 15px; }
        .time { font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 5px; }
        .btns { display: flex; gap: 8px; }
        .btn-icon { background: white; border: 1px solid #e2e8f0; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #94a3b8; }

        .price-table { width: 100%; border-collapse: collapse; }
        .price-table th { text-align: left; padding: 10px; font-size: 11px; color: #94a3b8; }
        .price-table td { padding: 12px 10px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; }
        .price-table .right { text-align: right; }

        .stat-item { display: flex; align-items: center; gap: 15px; }
        .stat-item .icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .stat-item .icon.purple { background: #f5f3ff; color: #8b5cf6; }
        .stat-item .icon.green { background: #ecfdf5; color: #10b981; }
        .stat-item .info { display: flex; flex-direction: column; }
        .stat-item .info span { font-size: 12px; color: #94a3b8; font-weight: 700; }
        .stat-item .info strong { font-size: 16px; color: #1e293b; }

        .gray { color: #94a3b8; }
      `}</style>
    </div>
  );
};

export default Laundry;
