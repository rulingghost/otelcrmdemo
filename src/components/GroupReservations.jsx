import React, { useState } from 'react';
import { 
  Users, Search, Plus, 
  MapPin, Clock, CheckCircle,
  Hash, DollarSign, Calendar,
  MoreVertical, ChevronRight, FileText,
  Briefcase, Globe, Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const groups = [
  { id: 'GRP-702', name: 'Almanya Teknik Heyeti', leader: 'Hans Gruber', rooms: 15, adults: 30, status: 'confirmed', arrival: '18.03.2024', total: '₺ 280,450' },
  { id: 'GRP-705', name: 'Yılmaz Düğün Kafilesi', leader: 'Mehmet Yılmaz', rooms: 45, adults: 90, status: 'pending', arrival: '22.03.2024', total: '₺ 1,120,500' },
  { id: 'GRP-708', name: 'Teknoloji Zirvesi Konuşmacıları', leader: 'Caner Ak', rooms: 8, adults: 8, status: 'in-house', arrival: '12.03.2024', total: '₺ 92,100' },
];

const GroupReservations = () => {
  return (
    <div className="group-container">
      <header className="header">
         <div className="title-section">
            <Users size={32} className="icon-blue"/>
            <div>
               <h2>Grup Rezervasyonları & Operasyon</h2>
               <span>Düğün, kongre ve kafile gibi toplu girişlerin merkezi yönetimi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><FileText size={18}/> TOPLU ROOMING LİSTESİ</button>
            <button className="btn primary"><Plus size={18}/> YENİ GRUP OLUŞTUR</button>
         </div>
      </header>

      <div className="group-grid">
         {/* Group KPIs */}
         <div className="stats-row">
            <div className="card stat-card">
               <span className="label">Aktif Gruplar</span>
               <strong>12</strong>
            </div>
            <div className="card stat-card">
               <span className="label">Toplam Grup Oda Geceleme</span>
               <strong>845</strong>
            </div>
            <div className="card stat-card">
               <span className="label">Grup Gelir Payı</span>
               <strong className="blue">24%</strong>
            </div>
         </div>

         {/* Main Group Table */}
         <section className="card list-section">
            <div className="section-header">
               <h3>GRUP LİSTESİ</h3>
               <div className="search-box">
                  <Search size={16} />
                  <input type="text" placeholder="Grup Adı veya Lider Ara..." />
               </div>
            </div>
            <table className="group-table">
               <thead>
                  <tr>
                     <th>Grup ID</th>
                     <th>Grup Adı</th>
                     <th>Grup Lideri</th>
                     <th>Oda / Pax</th>
                     <th>Geliş Tarihi</th>
                     <th>Toplam Sipariş</th>
                     <th>Durum</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {groups.map((g, idx) => (
                    <tr key={idx}>
                       <td className="id"><strong>{g.id}</strong></td>
                       <td><strong>{g.name}</strong></td>
                       <td><div className="user-info"><UserIcon size={12}/> {g.leader}</div></td>
                       <td>{g.rooms} Oda / {g.adults} Pax</td>
                       <td>{g.arrival}</td>
                       <td className="total">{g.total}</td>
                       <td>
                          <span className={`status-pill ${g.status}`}>
                             {g.status === 'confirmed' ? 'Onaylandı' : g.status === 'pending' ? 'Beklemede' : 'İçeride'}
                          </span>
                       </td>
                       <td><button className="icon-btn"><MoreVertical size={14}/></button></td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </section>

         {/* Right Sidebar: Mass Actions */}
         <aside className="group-sidebar">
            <div className="card action-card">
               <h3>TOPLU İŞLEMLER</h3>
               <button className="btn-full outline mt-15"><CheckCircle size={16}/> Toplu Check-in</button>
               <button className="btn-full outline mt-10"><DollarSign size={16}/> Tekil Folio Kapatma</button>
               <button className="btn-full outline mt-10"><Calendar size={16}/> Tarih Güncelle</button>
            </div>

            <div className="card mt-20 warning-card">
               <Briefcase size={24} className="orange"/>
               <p><strong>Yılmaz Düğün</strong> kafilesi için 12 adet ikiz yataklı oda talebi mevcut. Oda planını kontrol edin.</p>
               <button className="btn-full primary mt-10">ODALARI ATA</button>
            </div>
         </aside>
      </div>

      <style jsx>{`
        .group-container {
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
        .btn { padding: 12px 24px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; border: none; font-size: 13px; }
        .btn.primary { background: #3b82f6; color: white; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .group-grid { display: grid; grid-template-columns: 1fr 300px; gap: 30px; }
        
        .stats-row { grid-column: 1 / 2; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .stat-card { text-align: center; padding: 20px; }
        .stat-card .label { font-size: 12px; color: #94a3b8; display: block; margin-bottom: 5px; font-weight: 700; }
        .stat-card strong { font-size: 24px; font-weight: 800; color: #1e293b; }

        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .section-header h3 { font-size: 14px; font-weight: 900; color: #1e293b; }

        .search-box { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 10px; }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 180px; }

        .group-table { width: 100%; border-collapse: collapse; }
        .group-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; }
        .group-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; }

        .id strong { font-family: monospace; color: #1e293b; }
        .user-info { display: flex; align-items: center; gap: 8px; color: #64748b; }

        .total { font-weight: 800; color: #1e293b; }

        .status-pill { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        .status-pill.confirmed { background: #ecfdf5; color: #10b981; }
        .status-pill.pending { background: #fffcf0; color: #f59e0b; }
        .status-pill.in-house { background: #eff6ff; color: #3b82f6; }

        .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #f1f5f9; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #94a3b8; }

        .action-card h3 { font-size: 13px; font-weight: 900; margin-bottom: 20px; color: #1e293b; }
        .btn-full { width: 100%; padding: 12px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; display: flex; align-items: center; gap: 10px; }
        .btn-full.primary { background: #3b82f6; color: white; }
        .btn-full.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .warning-card { background: #fffbeb; border-color: #fef3c7; }
        .warning-card p { font-size: 12px; color: #92400e; line-height: 1.5; margin: 15px 0; }

        .blue { color: #3b82f6; }
        .orange { color: #f59e0b; }
      `}</style>
    </div>
  );
};

const UserIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default GroupReservations;
