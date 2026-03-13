import React, { useState } from 'react';
import { 
  Search, Plus, Package, 
  MapPin, Clock, CheckCircle,
  AlertCircle, Trash2, Edit2,
  Phone, User, Filter, 
  Printer, Download, Box
} from 'lucide-react';

const lostItems = [
  { id: 'LF-102', item: 'iPhone 13 Pro', location: 'Lobi / Koltuklar', date: '12.03.2024', status: 'lost', guest: 'Mehmet A.' },
  { id: 'LF-105', item: 'Siyah Deri Cüzdan', location: 'Oda 305', date: '10.03.2024', status: 'found', guest: 'Helga S.' },
  { id: 'LF-108', item: 'Güneş Gözlüğü (Ray-Ban)', location: 'Havuz Başı', date: '08.03.2024', status: 'delivered', guest: 'Canan Y.' },
];

const LostAndFound = () => {
  return (
    <div className="lf-container">
      <div className="header">
         <div className="title-section">
            <Package size={32} className="icon-orange"/>
            <div>
               <h2>Kayıp & Bulunan Eşya Takibi</h2>
               <span>Misafir eşyaları saklama ve teslimat yönetimi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn-lf primary"><Plus size={18}/> YENİ KAYIT EKLE</button>
         </div>
      </div>

      <div className="lf-grid">
         {/* Summary Row */}
         <div className="lf-stats">
            <div className="card stat-card">
               <span className="label">Bekleyen (Lost)</span>
               <strong className="red">8</strong>
            </div>
            <div className="card stat-card">
               <span className="label">Bulunan (Found)</span>
               <strong className="blue">14</strong>
            </div>
            <div className="card stat-card">
               <span className="label">Teslim Edilen</span>
               <strong className="green">142</strong>
            </div>
         </div>

         {/* Main Table */}
         <section className="card table-section">
            <div className="section-header">
               <h3>EŞYA LİSTESİ</h3>
               <div className="filter-group">
                  <div className="search-box">
                     <Search size={16} />
                     <input type="text" placeholder="Eşya veya Yer Ara..." />
                  </div>
               </div>
            </div>
            <table className="lf-table">
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>Eşya Tanımı</th>
                     <th>Bulunduğu Yer</th>
                     <th>Tarih</th>
                     <th>İlgili Misafir</th>
                     <th>Durum</th>
                     <th>İşlem</th>
                  </tr>
               </thead>
               <tbody>
                  {lostItems.map((item, idx) => (
                    <tr key={idx}>
                       <td><strong>{item.id}</strong></td>
                       <td>{item.item}</td>
                       <td>
                          <div className="loc">
                             <MapPin size={12}/> {item.location}
                          </div>
                       </td>
                       <td>{item.date}</td>
                       <td>{item.guest}</td>
                       <td>
                          <span className={`status-pill ${item.status}`}>
                             {item.status === 'lost' ? 'Kayıp' : item.status === 'found' ? 'Bulundu' : 'Teslim Edildi'}
                          </span>
                       </td>
                       <td>
                          <div className="row-actions">
                             <button className="icon-btn"><Printer size={14}/></button>
                             <button className="icon-btn"><Edit2 size={14}/></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </section>

         {/* Right Sidebar - Custody Info */}
         <aside className="lf-sidebar">
            <section className="card custody-card">
               <Box size={32} className="blue"/>
               <h3>EMANET DOLABI</h3>
               <p>Şu an emanet deposunda 22 adet eşya kayıtlıdır. Doluluk oranı: %45.</p>
               <div className="storage-meter">
                  <div className="bar"><div className="fill" style={{width: '45%'}}></div></div>
                  <span>45 / 100 Kapasite</span>
               </div>
            </section>

            <button className="btn-full outline mt-20"><Download size={16}/> Aylık Rapor Al</button>
            <button className="btn-full outline mt-10"><Phone size={16}/> Misafire Bildir</button>
         </aside>
      </div>

      <style jsx>{`
        .lf-container {
          padding: 30px;
          background: #f8fafc;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-orange { color: #f59e0b; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { color: #64748b; font-size: 14px; }

        .btn-lf.primary {
           background: #f59e0b; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer;
        }

        .lf-grid { display: grid; grid-template-columns: 1fr 300px; gap: 30px; }
        
        .lf-stats { grid-column: 1 / 2; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .stat-card { text-align: center; padding: 20px; }
        .stat-card .label { font-size: 12px; color: #94a3b8; display: block; margin-bottom: 5px; }
        .stat-card strong { font-size: 24px; font-weight: 800; }

        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .section-header h3 { font-size: 15px; font-weight: 800; color: #1e293b; }

        .search-box {
           display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 10px;
        }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 200px; }

        .lf-table { width: 100%; border-collapse: collapse; }
        .lf-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; }
        .lf-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; }

        .loc { display: flex; align-items: center; gap: 6px; color: #64748b; font-size: 12px; }

        .status-pill { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        .status-pill.lost { background: #fef2f2; color: #ef4444; }
        .status-pill.found { background: #eff6ff; color: #3b82f6; }
        .status-pill.delivered { background: #ecfdf5; color: #10b981; }

        .row-actions { display: flex; gap: 8px; }
        .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #f1f5f9; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #94a3b8; }

        .custody-card { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 15px; }
        .custody-card h3 { font-size: 16px; font-weight: 800; }
        .custody-card p { font-size: 13px; color: #64748b; line-height: 1.5; }

        .storage-meter { width: 100%; }
        .bar { height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden; margin-bottom: 8px; }
        .fill { height: 100%; background: #3b82f6; }
        .storage-meter span { font-size: 11px; color: #94a3b8; font-weight: 700; }

        .btn-full { width: 100%; padding: 12px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .btn-full.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .red { color: #ef4444; }
        .blue { color: #3b82f6; }
        .green { color: #10b981; }
      `}</style>
    </div>
  );
};

export default LostAndFound;
