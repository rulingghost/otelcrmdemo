import React, { useState } from 'react';
import { 
  User, Search, Plus, 
  History, Star, MessageSquare,
  ShieldAlert, CheckCircle, Globe,
  Briefcase, Mail, Phone, MoreVertical,
  ChevronDown, Filter, LayoutGrid,
  Bell, CreditCard, PieChart as PieIcon,
  Zap, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

const history = [
  { agency: 'Booking.com', checkIn: '13 Mar', checkOut: '15 Mar 2024', room: '104 DBL', board: 'Half-Board', total: '₺ 7,350', score: '-' },
  { agency: 'Expedia', checkIn: '19 Haz', checkOut: '22 Haz 2023', room: '209 SUE', board: 'Half-Board', total: '₺ 10,950', score: '5' },
  { agency: 'Agency', checkIn: '01 Ağu', checkOut: '04 Ağu 2022', room: '305 DLP', board: 'Room + Braccarr', total: '₺ 7,850', score: '4.5' },
];

const preferences = [
  { date: '24 Mart 1987', note: 'Kahvesini latte unsütlü tercih eder. Yumuşak yastık ister', age: '(50 yaşında)' },
];

const logs = [
  { date: '14 Mar', type: 'critical', text: 'Oda temizliğinden memnun kalmadı.', time: '14:20' },
  { date: '22 Nov', type: 'normal', text: 'Kahvesini latte unsütlü tercih etti.', time: '09:35' },
  { date: '01 Apr', type: 'positive', text: 'Bir gezden süper!', time: '10:45' },
];

const pieData = [{ name: 'Konaklamalar', value: 3, plan: 8, total: '₺ 26,150' }];

const GuestCRM = () => {
  return (
    <div className="crm-container">
      <header className="header">
         <div className="title-section">
            <User size={32} className="icon-blue"/>
            <div>
               <h2>Misafir 360 & CRM</h2>
               <span>Kişiselleştirilmiş misafir deneyimi, sadakat yönetimi ve geri bildirim takibi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline">ANKET GÖNDER</button>
            <button className="btn primary green">ÖZEL TEKLİF YAP</button>
            <button className="btn primary orange">VİP STATÜ YAP</button>
            <button className="btn primary dark-red">KARA LİSTEYE AL</button>
         </div>
      </header>

      <div className="crm-grid">
         {/* Main Content Area */}
         <section className="main-content">
            <div className="card profile-card">
               <div className="p-header">
                  <div className="p-avatar">
                     <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Guest" />
                     <div className="p-badges">
                        <span className="badge vip">VIP</span>
                        <span className="badge blacklist">BLACKLIST</span>
                     </div>
                  </div>
                  <div className="p-main-info">
                     <div className="pm-top">
                        <h2>Canberk Arslan</h2>
                        <span className="loyalty gold">GOLD SADAKAT</span>
                     </div>
                     <div className="pm-grid">
                        <div className="pm-field">
                           <label>Misafir Adı Soyadı</label>
                           <strong>Canberk Arslan</strong>
                        </div>
                        <div className="pm-field">
                           <label>TC / Pasaport No</label>
                           <div className="input-row">
                              <strong>143265598780</strong>
                              <button className="btn-s blue">SORGULA</button>
                           </div>
                        </div>
                        <div className="pm-field">
                           <label>Uyruk</label>
                           <div className="input-row">
                              <Globe size={14} className="blue"/>
                              <strong>Türkiye</strong>
                           </div>
                        </div>
                        <div className="pm-field">
                           <label>Puan</label>
                           <strong>₺ 12,450 Puan</strong>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="section-title mt-30">
                  <h3>KONAKLAMA GEÇMİŞİ</h3>
               </div>
               <table className="crm-table">
                  <thead>
                     <tr>
                        <th>Acente</th>
                        <th>Giriş Tarihi</th>
                        <th>Çıkış Tarihi</th>
                        <th>Oda</th>
                        <th>Pansiyon</th>
                        <th>Har: Toplam Tutar</th>
                        <th>Anket Puanı</th>
                     </tr>
                  </thead>
                  <tbody>
                     {history.map((h, i) => (
                       <tr key={i} className={i === 0 ? 'active' : ''}>
                          <td>{h.agency}</td>
                          <td><strong>{h.checkIn}</strong></td>
                          <td>{h.checkOut}</td>
                          <td>{h.room}</td>
                          <td>{h.board}</td>
                          <td>{h.total}</td>
                          <td><span className="score-tag">{h.score}</span></td>
                       </tr>
                     ))}
                  </tbody>
               </table>

               <div className="stats-row mt-30">
                  <div className="graph-box">
                     <div className="donut-box">
                         <div className="donut-center">
                            <strong>3</strong>
                            <span>Konaklamalar</span>
                         </div>
                         <svg width="120" height="120">
                            <circle cx="60" cy="60" r="50" fill="transparent" stroke="#f1f5f9" strokeWidth="10" />
                            <circle cx="60" cy="60" r="50" fill="transparent" stroke="#3b82f6" strokeWidth="10" strokeDasharray="157 157" strokeDashoffset="0" />
                         </svg>
                     </div>
                     <div className="graph-info">
                        <strong>₺ 26,150</strong>
                        <div className="stars">
                           {Array.from({length: 5}).map((_, i) => <Star key={i} size={14} fill={i < 4 ? '#f59e0b' : 'none'} stroke={i < 4 ? '#f59e0b' : '#cbd5e1'} />)}
                        </div>
                     </div>
                  </div>
                  <div className="data-box">
                     <div className="db-row"><span>Konaklamalar:</span> <strong>3</strong></div>
                     <div className="db-row"><span>Giriş Tarihi:</span> <strong>₺ 7,350</strong></div>
                     <div className="db-row"><span>Çıkış Tarihi:</span> <strong>₺ 26,150</strong></div>
                  </div>
                  <div className="data-box">
                     <div className="db-row"><span>Racena:</span> <strong>87.2%</strong></div>
                     <div className="db-row"><span>Tahsim</span> <strong>★★★★☆</strong></div>
                     <div className="db-row"><span>Anket Ortalaması:</span> <strong className="blue">4.8</strong></div>
                  </div>
               </div>
            </div>
         </section>

         {/* Sidebar: Details & Preferences */}
         <aside className="right-panel">
            <section className="card contact-card">
               <h3>CRM & İLETİŞİM</h3>
               <div className="contact-list mt-20">
                  <div className="c-row">
                     <Mail size={16} className="gray"/>
                     <div className="c-info"><span>E-Posta</span><strong>Harekat@oda</strong></div>
                  </div>
                  <div className="c-row mt-15">
                     <Phone size={16} className="gray"/>
                     <div className="c-info"><span>Telefon</span><strong>+90 532 555 9670</strong></div>
                  </div>
                  <button className="btn-full mt-20"><Mail size={16}/> Yeni E-Posta Gönder</button>
               </div>
            </section>

            <section className="card preferences-card mt-20">
               <h3>ÖZEL NOTLAR</h3>
               <div className="p-content mt-15">
                  <div className="p-head">{preferences[0].date} <small>{preferences[0].age}</small></div>
                  <p className="p-text mt-10">{preferences[0].note}</p>
               </div>
            </section>

            <section className="card log-card mt-20">
               <h3>ŞİKAYET/MEMNUNİYET GÜNLÜĞÜ</h3>
               <div className="log-list mt-20">
                  {logs.map((l, i) => (
                    <div key={i} className="log-item">
                       <div className="l-icon">
                          {l.type === 'critical' && <ShieldAlert size={14} className="red"/>}
                          {l.type === 'positive' && <ThumbsUp size={14} className="green"/>}
                          {l.type === 'normal' && <Zap size={14} className="yellow"/>}
                       </div>
                       <div className="l-info">
                          <div className="l-head">
                             <strong>{l.date}</strong>
                             <span>{l.time}</span>
                          </div>
                          <p>{l.text}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
         </aside>
      </div>

      <footer className="crm-footer">
         <span>DOLULUK: <strong className="green">%84</strong></span>
         <span>GİRİŞ: <strong className="blue">12</strong></span>
         <div className="footer-meta">
            <span>Kullanıcı: <strong>CRM_Manager</strong></span>
            <span>Süre: 02:10</span>
            <span>Son İşlem: 15 Mar 10:30</span>
         </div>
         <span className="time-now">09:42</span>
      </footer>

      <style jsx>{`
        .crm-container {
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
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #1e293b; }
        .btn.primary.green { background: #059669; color: white; }
        .btn.primary.orange { background: #f59e0b; color: white; }
        .btn.primary.dark-red { background: #991b1b; color: white; }

        .crm-grid { display: grid; grid-template-columns: 1fr 320px; gap: 30px; flex: 1; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; letter-spacing: 0.5px; }

        .p-header { display: flex; gap: 30px; }
        .p-avatar { position: relative; width: 140px; }
        .p-avatar img { width: 140px; height: 140px; border-radius: 12px; object-fit: cover; }
        .p-badges { position: absolute; bottom: -10px; left: 0; right: 0; display: flex; flex-direction: column; gap: 5px; }
        .badge { font-size: 9px; font-weight: 900; padding: 4px; border-radius: 4px; text-align: center; color: white; }
        .badge.vip { background: #059669; }
        .badge.blacklist { background: #1e293b; }

        .p-main-info { flex: 1; }
        .pm-top { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
        .pm-top h2 { font-size: 28px; font-weight: 800; color: #1e293b; }
        .loyalty { font-size: 11px; font-weight: 900; padding: 4px 12px; border-radius: 20px; }
        .loyalty.gold { background: #fefce8; color: #854d0e; border: 1px solid #fef08a; }

        .pm-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .pm-field label { display: block; font-size: 11px; color: #94a3b8; font-weight: 800; margin-bottom: 6px; }
        .pm-field strong { font-size: 14px; color: #1e293b; }
        .input-row { display: flex; align-items: center; gap: 10px; }
        .btn-s { padding: 4px 10px; border-radius: 6px; border: none; font-size: 11px; font-weight: 800; cursor: pointer; }
        .btn-s.blue { background: #3b82f6; color: white; }

        .section-title { border-bottom: 2px solid #f1f5f9; padding-bottom: 15px; margin-bottom: 20px; }
        .crm-table { width: 100%; border-collapse: collapse; }
        .crm-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; }
        .crm-table td { padding: 15px 12px; font-size: 13px; color: #475569; border-bottom: 1px solid #f8fafc; }
        .crm-table tr.active td { background: #eff6ff; border-top: 1px solid #3b82f6; border-bottom: 1px solid #3b82f6; }
        .score-tag { padding: 2px 8px; background: #f1f5f9; border-radius: 4px; font-size: 11px; font-weight: 900; }

        .stats-row { display: flex; gap: 30px; align-items: center; justify-content: space-between; background: #f8fafc; padding: 30px; border-radius: 16px; }
        .graph-box { display: flex; align-items: center; gap: 20px; }
        .donut-box { position: relative; width: 120px; height: 120px; }
        .donut-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .donut-center strong { font-size: 24px; color: #1e293b; }
        .donut-center span { font-size: 9px; color: #94a3b8; font-weight: 800; }
        .graph-info strong { display: block; font-size: 24px; color: #1e293b; margin-bottom: 5px; }

        .data-box { display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .db-row { display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; color: #64748b; }
        .db-row strong { color: #1e293b; }

        .c-row { display: flex; align-items: center; gap: 15px; }
        .c-info span { display: block; font-size: 11px; color: #94a3b8; font-weight: 800; }
        .c-info strong { font-size: 14px; color: #1e293b; }
        .btn-full { width: 100%; padding: 12px; background: white; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 13px; font-weight: 700; color: #1e293b; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; }

        .p-text { font-size: 14px; color: #475569; line-height: 1.6; font-style: italic; }
        .log-list { display: flex; flex-direction: column; gap: 20px; }
        .log-item { display: flex; gap: 15px; }
        .l-icon { padding-top: 4px; }
        .l-head { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .l-head strong { font-size: 13px; color: #1e293b; }
        .l-head span { font-size: 11px; color: #94a3b8; font-weight: 800; }
        .log-item p { font-size: 12px; color: #64748b; font-weight: 700; }

        .crm-footer { padding: 20px 30px; background: white; border-top: 1px solid #e2e8f0; display: flex; gap: 30px; align-items: center; font-size: 12px; font-weight: 800; color: #94a3b8; }
        .footer-meta { display: flex; gap: 20px; align-items: center; flex: 1; justify-content: center; }
        .footer-meta strong { color: #1e293b; }
        .time-now { font-size: 16px; color: #1e293b; font-weight: 900; }

        .blue { color: #3b82f6; }
        .green { color: #10b981; }
        .orange { color: #f59e0b; }
        .red { color: #ef4444; }
        .gray { color: #cbd5e1; }
        .mt-30 { margin-top: 30px; }
        .mt-20 { margin-top: 20px; }
        .mt-15 { margin-top: 15px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default GuestCRM;
