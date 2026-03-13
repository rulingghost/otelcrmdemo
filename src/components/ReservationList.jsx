import React, { useState } from 'react';
import { 
  List, Search, Filter, 
  Calendar, User, CheckCircle, 
  Clock, AlertCircle, MoreVertical,
  Download, Printer, Plus,
  ArrowRight, ChevronRight, Globe,
  ShieldCheck, Tag
} from 'lucide-react';
import { motion } from 'framer-motion';

const reservations = [
  { id: 'RES-40291', guest: 'Ahmet Yılmaz', checkIn: '14.03.2024', checkOut: '17.03.2024', roomType: 'DBL Deluxe', source: 'Booking.com', status: 'confirmed', amount: '₺ 12.450' },
  { id: 'RES-40292', guest: 'Karen Smith', checkIn: '15.03.2024', checkOut: '20.03.2024', roomType: 'STE Ocean', source: 'Expedia', status: 'pending', amount: '₺ 28.100' },
  { id: 'RES-40293', guest: 'Mert Aksoy', checkIn: '14.03.2024', checkOut: '16.03.2024', roomType: 'SNG Std', source: 'Direct', status: 'in-house', amount: '₺ 4.200' },
  { id: 'RES-40294', guest: 'Elena Rossi', checkIn: '16.03.2024', checkOut: '22.03.2024', roomType: 'DBL Std', source: 'Hotels.com', status: 'cancelled', amount: '₺ 14.800' },
];

const ReservationList = () => {
  return (
    <div className="res-list-container">
      <header className="header">
         <div className="title-section">
            <List size={32} className="green"/>
            <div>
               <h2>Rezervasyon Listesi & Arşivi</h2>
               <span>Tüm satış kanallarından gelen aktif ve geçmiş kayıtlar</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn-res primary"><Plus size={18}/> YENİ EKLE</button>
            <button className="btn-res outline"><Download size={18}/> DIŞA AKTAR</button>
         </div>
      </header>

      <div className="filters-row">
         <div className="filter-pill active">Tümü</div>
         <div className="filter-pill">Gelecek Girişler (42)</div>
         <div className="filter-pill">İçeridekiler (128)</div>
         <div className="filter-pill">Bekleyen Onay (5)</div>
         <div className="filter-pill">İptaller</div>
         <div className="search-box">
            <Search size={18}/>
            <input type="text" placeholder="Misafir adı, PNR veya Oda No..." />
         </div>
      </div>

      <section className="card table-card">
         <table className="res-table">
            <thead>
               <tr>
                  <th>PNR / ID</th>
                  <th>Konaklayacak Misafir</th>
                  <th>Giriş / Çıkış</th>
                  <th>Oda Tipi</th>
                  <th>Kaynak</th>
                  <th>Tutar</th>
                  <th>Durum</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {reservations.map((res, idx) => (
                 <tr key={idx}>
                    <td className="id"><strong>{res.id}</strong></td>
                    <td className="guest">
                       <User size={14} className="gray"/>
                       <strong>{res.guest}</strong>
                    </td>
                    <td className="dates">
                       <div className="d-row">
                          <div className="d-box">
                             <span>IN</span>
                             <strong>{res.checkIn}</strong>
                          </div>
                          <ArrowRight size={14} className="gray"/>
                          <div className="d-box">
                             <span>OUT</span>
                             <strong>{res.checkOut}</strong>
                          </div>
                       </div>
                    </td>
                    <td className="room">{res.roomType}</td>
                    <td className="source">
                       <span className={`source-badge ${res.source.toLowerCase().replace('.', '')}`}>
                          {res.source === 'Direct' ? <User size={10}/> : <Globe size={10}/>}
                          {res.source}
                       </span>
                    </td>
                    <td className="amount">{res.amount}</td>
                    <td>
                       <span className={`status-tag ${res.status}`}>
                          {res.status === 'confirmed' ? 'Onaylandı' : res.status === 'pending' ? 'Beklemede' : res.status === 'in-house' ? 'Konaklıyor' : 'İptal'}
                       </span>
                    </td>
                    <td><button className="btn-more"><MoreVertical size={16}/></button></td>
                 </tr>
               ))}
            </tbody>
         </table>
         <div className="pagination">
            <span>Toplam 342 kayıt gösteriliyor</span>
            <div className="pages">
               <button className="page-btn active">1</button>
               <button className="page-btn">2</button>
               <button className="page-btn">3</button>
               <ChevronRight size={16} className="gray"/>
            </div>
         </div>
      </section>

      <style jsx>{`
        .res-list-container {
          padding: 30px;
          background: #f8fafc;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .green { color: #10b981; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { color: #64748b; font-size: 14px; }

        .btn-res { padding: 12px 24px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; border: none; font-size: 14px; }
        .btn-res.primary { background: #1e293b; color: white; }
        .btn-res.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .filters-row { display: flex; align-items: center; gap: 10px; }
        .filter-pill { padding: 8px 18px; background: white; border: 1px solid #e2e8f0; border-radius: 50px; font-size: 13px; font-weight: 700; color: #64748b; cursor: pointer; transition: all 0.2s; }
        .filter-pill.active { background: #3b82f6; color: white; border-color: #3b82f6; }
        .filter-pill:hover:not(.active) { background: #f1f5f9; }

        .search-box { margin-left: auto; display: flex; align-items: center; gap: 10px; background: white; padding: 10px 15px; border-radius: 12px; border: 1px solid #e2e8f0; }
        .search-box input { border: none; outline: none; font-size: 14px; width: 200px; }

        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .res-table { width: 100%; border-collapse: collapse; }
        .res-table th { text-align: left; padding: 15px 25px; background: #f8fafc; font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; }
        .res-table td { padding: 20px 25px; border-bottom: 1px solid #f8fafc; font-size: 14px; color: #475569; }

        .id strong { color: #1e293b; font-family: monospace; }
        .guest { display: flex; align-items: center; gap: 10px; }
        .guest strong { color: #1e293b; font-weight: 700; }

        .dates .d-row { display: flex; align-items: center; gap: 15px; }
        .d-box { display: flex; flex-direction: column; }
        .d-box span { font-size: 10px; font-weight: 800; color: #94a3b8; }
        .d-box strong { font-size: 13px; color: #1e293b; }

        .source-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; }
        .source-badge.bookingcom { background: #eff6ff; color: #3b82f6; }
        .source-badge.expedia { background: #fffcf0; color: #f59e0b; }
        .source-badge.direct { background: #f0fdf4; color: #10b981; }

        .status-tag { padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; }
        .status-tag.confirmed { background: #ecfdf5; color: #10b981; }
        .status-tag.pending { background: #fffbeb; color: #d97706; }
        .status-tag.in-house { background: #eff6ff; color: #3b82f6; }
        .status-tag.cancelled { background: #fef2f2; color: #ef4444; }

        .amount { font-weight: 800; color: #1e293b; }
        .btn-more { background: transparent; border: none; cursor: pointer; color: #94a3b8; }

        .pagination { padding: 20px 25px; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #94a3b8; }
        .pages { display: flex; align-items: center; gap: 10px; }
        .page-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; cursor: pointer; font-weight: 700; color: #64748b; }
        .page-btn.active { background: #3b82f6; color: white; border-color: #3b82f6; }

        .gray { color: #94a3b8; }
      `}</style>
    </div>
  );
};

export default ReservationList;
