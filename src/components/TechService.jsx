import React, { useState } from 'react';
import { 
  Wrench, Search, Plus, 
  AlertTriangle, Clock, CheckCircle,
  Hammer, Zap, Droplets, Thermometer,
  MoreVertical, ChevronDown, Filter,
  Phone, Smartphone, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const jobOrders = [
  { id: 'JO-4231', room: '104', type: 'Klima Arızası', priority: 'high', status: 'pending', time: '12:30' },
  { id: 'JO-4235', room: '502', type: 'Ampul Değişimi', priority: 'low', status: 'in-progress', time: '14:20' },
  { id: 'JO-4238', room: '312', type: 'TV Sinyal Yok', priority: 'medium', status: 'pending', time: '15:45' },
];

const maintenanceStats = [
  { label: 'Açık İş Emri', value: '14', color: '#f59e0b' },
  { label: 'Bugün Tamamlanan', value: '8', color: '#10b981' },
  { label: 'Kritik Arıza', value: '3', color: '#ef4444' },
  { label: 'Periyodik Bakım', value: '5', color: '#3b82f6' },
];

const TechService = () => {
  return (
    <div className="ts-container">
      <div className="ts-header-top">
         <div className="ts-tabs">
            <button className="btn-ts active">İŞ EMİRLERİ</button>
            <button className="btn-ts">PERİYODİK BAKIMLAR</button>
            <button className="btn-ts">ENVANTER (YEDEK PARÇA)</button>
            <button className="btn-ts">DIŞ SERVİSLER</button>
         </div>
      </div>

      <div className="ts-grid">
         {/* Stats Row */}
         <div className="ts-stats-row">
            {maintenanceStats.map((stat, idx) => (
              <div key={idx} className="ts-stat-card card">
                 <span className="label">{stat.label}</span>
                 <strong style={{ color: stat.color }}>{stat.value}</strong>
              </div>
            ))}
         </div>

         {/* Main List */}
         <main className="ts-main">
            <section className="card">
               <div className="section-header">
                  <h3>GÜNCEL İŞ EMİRLERİ</h3>
                  <div className="search-box">
                     <Search size={16} />
                     <input type="text" placeholder="İş Emri veya Oda Ara..." />
                  </div>
               </div>
               <table className="ts-table">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Oda</th>
                        <th>Arıza Detayı</th>
                        <th>Öncelik</th>
                        <th>Durum</th>
                        <th>Zaman</th>
                        <th>İşlem</th>
                     </tr>
                  </thead>
                  <tbody>
                     {jobOrders.map((job, idx) => (
                       <tr key={idx}>
                          <td><strong>{job.id}</strong></td>
                          <td>{job.room}</td>
                          <td>{job.type}</td>
                          <td>
                             <span className={`priority-pill ${job.priority}`}>
                                {job.priority === 'high' ? 'Kritik' : job.priority === 'medium' ? 'Orta' : 'Düşük'}
                             </span>
                          </td>
                          <td>
                             <span className={`status-pill ${job.status}`}>
                                {job.status === 'pending' ? 'Beklemede' : 'Devam Ediyor'}
                             </span>
                          </td>
                          <td>{job.time}</td>
                          <td>
                             <button className="btn-start">BAŞLAT</button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </section>
         </main>

         {/* Right Sidebar - Hardware Health */}
         <aside className="ts-sidebar">
            <section className="card">
               <h3>SİSTEM SAĞLIĞI</h3>
               <div className="health-list">
                  <div className="h-item">
                     <div className="h-info">
                        <Zap size={16} className="blue"/>
                        <span>Enerji Sistemi</span>
                     </div>
                     <span className="h-status online">ONLINE</span>
                  </div>
                  <div className="h-item">
                     <div className="h-info">
                        <Droplets size={16} className="blue"/>
                        <span>Su Tesisatı</span>
                     </div>
                     <span className="h-status online">ONLINE</span>
                  </div>
                  <div className="h-item">
                     <div className="h-info">
                        <Activity size={16} className="red"/>
                        <span>IPTV Server</span>
                     </div>
                     <span className="h-status offline">OFFLINE</span>
                  </div>
               </div>
            </section>

            <section className="card mt-20">
               <button className="btn-action primary"><Plus size={18}/> Yeni İş Emri Oluştur</button>
               <button className="btn-action secondary mt-10"><Wrench size={18}/> Periyodik Bakım Çizelgesi</button>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .ts-container {
          padding: 20px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .ts-header-top { display: flex; justify-content: flex-start; }
        .ts-tabs { display: flex; gap: 10px; }
        .btn-ts {
           background: white;
           border: 1px solid #e2e8f0;
           padding: 10px 20px;
           border-radius: 8px;
           font-size: 13px;
           font-weight: 700;
           color: #64748b;
        }
        .btn-ts.active { background: #e67e22; color: white; border-color: #e67e22; }

        .ts-grid {
           display: grid;
           grid-template-columns: 1fr 300px;
           gap: 20px;
        }

        .ts-stats-row {
           grid-column: 1 / -1;
           display: grid;
           grid-template-columns: repeat(4, 1fr);
           gap: 20px;
        }

        .ts-stat-card {
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           padding: 20px;
        }
        .ts-stat-card .label { font-size: 13px; color: #94a3b8; margin-bottom: 5px; }
        .ts-stat-card strong { font-size: 28px; font-weight: 800; }

        .card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          padding: 20px;
        }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .section-header h3 { font-size: 15px; font-weight: 800; color: #1e293b; }

        .search-box {
           display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 8px; width: 300px;
        }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 100%; }

        .ts-table { width: 100%; border-collapse: collapse; }
        .ts-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; }
        .ts-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; }

        .priority-pill { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        .priority-pill.high { background: #fee2e2; color: #ef4444; }
        .priority-pill.medium { background: #fff7ed; color: #f97316; }
        .priority-pill.low { background: #f0fdf4; color: #10b981; }

        .status-pill { padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; background: #f1f5f9; color: #64748b; }
        .status-pill.in-progress { background: #eff6ff; color: #3b82f6; }

        .btn-start {
           background: #e67e22; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer;
        }

        .health-list { display: flex; flex-direction: column; gap: 15px; }
        .h-item { display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #f1f5f9; }
        .h-info { display: flex; align-items: center; gap: 12px; font-size: 13px; color: #475569; font-weight: 600; }
        .h-status { font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px; }
        .h-status.online { background: #ecfdf5; color: #10b981; }
        .h-status.offline { background: #fef2f2; color: #ef4444; }

        .btn-action {
           width: 100%; padding: 12px; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer;
        }
        .btn-action.primary { background: #e67e22; color: white; }
        .btn-action.secondary { background: white; border: 1px solid #e2e8f0; color: #475569; }
      `}</style>
    </div>
  );
};

export default TechService;
