import React, { useState } from 'react';
import { 
  Coffee, Search, Plus, 
  Wine, Trash2, Clock,
  CheckCircle, MoreVertical, 
  User, DollarSign, Printer,
  Filter, Tag, Package, ShoppingCart
} from 'lucide-react';

const minibarStock = [
  { id: 1, name: 'Coca Cola 330ml', price: 65, stock: 142, category: 'Beverage' },
  { id: 2, name: 'Efes Pilsen 33cl', price: 120, stock: 85, category: 'Alcohol' },
  { id: 3, name: 'Classic Pringles', price: 95, stock: 42, category: 'Snack' },
  { id: 4, name: 'Still Water 500ml', price: 30, stock: 210, category: 'Beverage' },
];

const refillRequests = [
  { room: '204', status: 'pending', items: '2 Coke, 1 Beer', time: '14:30' },
  { room: '105', status: 'completed', items: '1 Water, 2 Pringles', time: '12:15' },
];

const MiniBar = () => {
  return (
    <div className="mb-container">
      <div className="header">
         <div className="title-section">
            <Wine size={32} className="icon-purple"/>
            <div>
               <h2>Mini Bar & Oda İkram Yönetimi</h2>
               <span>Oda içi stok takibi, dolum talepleri ve adisyon entegrasyonu</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn-mb primary"><Plus size={18}/> YENİ DOLUM KAYDI</button>
         </div>
      </div>

      <div className="mb-grid">
         {/* Inventory Section */}
         <section className="card stock-section">
            <div className="section-header">
               <h3>MİNİBAR ENVANTERİ</h3>
               <div className="search-box">
                  <Search size={16} />
                  <input type="text" placeholder="Ürün Ara..." />
               </div>
            </div>
            <table className="mb-table">
               <thead>
                  <tr>
                     <th>Ürün Adı</th>
                     <th>Kategori</th>
                     <th>Fiyat</th>
                     <th>Kalan Stok</th>
                     <th>Durum</th>
                     <th>İşlem</th>
                  </tr>
               </thead>
               <tbody>
                  {minibarStock.map((item, idx) => (
                    <tr key={idx}>
                       <td><strong>{item.name}</strong></td>
                       <td><span className="cat-tag">{item.category}</span></td>
                       <td>₺{item.price}</td>
                       <td>{item.stock} Adet</td>
                       <td>
                          <div className="stock-bar">
                             <div className="fill" style={{ width: `${(item.stock / 250) * 100}%`, background: item.stock < 50 ? '#ef4444' : '#10b981' }}></div>
                          </div>
                       </td>
                       <td>
                          <div className="row-actions">
                             <button className="icon-btn"><Plus size={14}/></button>
                             <button className="icon-btn"><Trash2 size={14}/></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </section>

         {/* Refill Requests sidebar */}
         <aside className="mb-sidebar">
            <section className="card req-card">
               <div className="section-header">
                  <h3>BEKLEYEN DOLUMLAR</h3>
                  <ShoppingCart size={16} className="gray"/>
               </div>
               <div className="req-list">
                  {refillRequests.map((req, idx) => (
                    <div key={idx} className={`req-item ${req.status}`}>
                       <div className="r-head">
                          <span className="room">ODA {req.room}</span>
                          <span className="time">{req.time}</span>
                       </div>
                       <p className="items">{req.items}</p>
                       <button className="btn-done">TAMAMLANDI</button>
                    </div>
                  ))}
               </div>
            </section>

            <section className="card mt-20 stats-card">
               <div className="m-stat">
                  <span>Günlük Mini Bar Cirosu</span>
                  <strong>₺ 4,250</strong>
               </div>
               <div className="m-stat mt-15">
                  <span>En Çok Tüketilen Ürün</span>
                  <strong className="blue">Su (Still Water)</strong>
               </div>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .mb-container {
          padding: 30px;
          background: #f8fafc;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-purple { color: #8b5cf6; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { color: #64748b; font-size: 14px; }

        .btn-mb.primary {
           background: #8b5cf6; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer;
        }

        .mb-grid { display: grid; grid-template-columns: 1fr 320px; gap: 30px; }

        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .section-header h3 { font-size: 15px; font-weight: 800; color: #1e293b; }

        .search-box {
           display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 10px;
        }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 180px; }

        .mb-table { width: 100%; border-collapse: collapse; }
        .mb-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; }
        .mb-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; }

        .cat-tag { background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; color: #64748b; }

        .stock-bar { width: 80px; height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
        .stock-bar .fill { height: 100%; }

        .row-actions { display: flex; gap: 8px; }
        .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #f1f5f9; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #94a3b8; }

        .req-list { display: flex; flex-direction: column; gap: 15px; }
        .req-item { padding: 15px; border-radius: 16px; background: #f8fafc; border: 1px solid #f1f5f9; }
        .req-item.pending { border-left: 4px solid #f59e0b; }
        .r-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .room { font-size: 11px; font-weight: 900; color: #8b5cf6; }
        .time { font-size: 11px; color: #94a3b8; }
        .items { font-size: 13px; color: #1e293b; font-weight: 600; margin-bottom: 15px; }
        .btn-done { width: 100%; padding: 8px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 11px; font-weight: 700; color: #64748b; cursor: pointer; }

        .m-stat { display: flex; flex-direction: column; gap: 4px; }
        .m-stat span { font-size: 12px; color: #94a3b8; font-weight: 700; }
        .m-stat strong { font-size: 18px; color: #1e293b; }

        .blue { color: #3b82f6; }
        .gray { color: #94a3b8; }
      `}</style>
    </div>
  );
};

export default MiniBar;
