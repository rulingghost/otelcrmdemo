import React, { useState, useEffect } from 'react';
import { 
  Bell, Search, User, 
  DoorOpen, LogIn, LogOut,
  Clock, Calendar, Filter,
  MoreVertical, CheckCircle,
  AlertCircle, Phone, MessageSquare,
  Shield, CreditCard, Scan, FileText,
  UserPlus, Hash, ArrowRight, X,
  ExternalLink, Fingerprint
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const arrivals = [
  { id: '102', guest: 'Mehmet Yılmaz', agency: 'Booking.com', roomType: 'DBL Deluxe', time: '14:00', status: 'expected', loyalty: 'Gold' },
  { id: '205', guest: 'Ayşe Kaya', agency: 'Expedia', roomType: 'SUE', time: '15:30', status: 'expected', loyalty: 'Silver' },
  { id: '301', guest: 'John Smith', agency: 'Direct', roomType: 'DBL Deluxe', time: '12:00', status: 'arrived', loyalty: 'Platinum' },
  { id: '404', guest: 'Hans Müller', agency: 'TUI', roomType: 'SNG', time: '16:45', status: 'expected', loyalty: 'None' },
];

const foStats = [
  { label: 'Bugün Giriş', value: '42', sub: '12 Bekleyen', color: '#3b82f6', icon: <LogIn size={20}/> },
  { label: 'Bugün Çıkış', value: '28', sub: '5 Kalan', color: '#ef4444', icon: <LogOut size={20}/> },
  { label: 'Konaklayan', value: '184', sub: '%82 Doluluk', color: '#10b981', icon: <User size={20}/> },
  { label: 'Arızalı Oda', value: '3', sub: '2 Acil', color: '#f59e0b', icon: <AlertCircle size={20}/> },
];

const FrontOffice = () => {
  const [isOcrOpen, setIsOcrOpen] = useState(false);
  const [ocrStep, setOcrStep] = useState(0); // 0: Idle, 1: Scanning, 2: Done
  const [selectedGuest, setSelectedGuest] = useState(null);

  const startOcr = (guest) => {
    setSelectedGuest(guest);
    setIsOcrOpen(true);
    setOcrStep(1);
    setTimeout(() => setOcrStep(2), 2500);
  };

  return (
    <div className="fo-container">
      <header className="fo-header">
         <div className="title-section">
            <Bell size={32} className="icon-blue"/>
            <div>
               <h2>Ön Büro (Front Office) Paneli</h2>
               <span>Resepsiyon operasyonları, OCR Check-in ve KBS takibi</span>
            </div>
         </div>
         <div className="fo-controls">
            <div className="kbs-status">
               <Shield size={16} className="green"/>
               <span>KBS Entegrasyonu: <strong>Aktif</strong></span>
            </div>
            <button className="btn-fo primary"><UserPlus size={18}/> WALK-IN KAYIT</button>
         </div>
      </header>

      <div className="fo-content-grid">
         {/* Top Stats */}
         <div className="stats-row">
            {foStats.map((s, i) => (
              <motion.div 
                key={i} 
                className="stat-card"
                whileHover={{ y: -5 }}
              >
                 <div className="s-icon" style={{ color: s.color, background: `${s.color}15` }}>{s.icon}</div>
                 <div className="s-info">
                    <span className="label">{s.label}</span>
                    <div className="v-row">
                       <strong>{s.value}</strong>
                       <small>{s.sub}</small>
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>

         {/* Tabs & Main Table */}
         <div className="main-table-section card">
            <div className="table-header">
               <div className="tabs">
                  <button className="active">GELİŞLER (ARRIVAL)</button>
                  <button>GİDİŞLER (DEPARTURE)</button>
                  <button>İÇERİDEKİLER (IN-HOUSE)</button>
                  <button>ODA DURUMLARI</button>
               </div>
               <div className="search-box">
                  <Search size={18} />
                  <input type="text" placeholder="Misafir, Oda veya PNR ara..." />
               </div>
            </div>

            <table className="fo-table">
               <thead>
                  <tr>
                     <th>Oda</th>
                     <th>Misafir / Sadakat</th>
                     <th>Acente / PNR</th>
                     <th>Oda Tipi / Pansiyon</th>
                     <th>Giriş Saati</th>
                     <th>Durum</th>
                     <th>İşlemler</th>
                  </tr>
               </thead>
               <tbody>
                  {arrivals.map((arr, i) => (
                    <tr key={i}>
                       <td><div className="room-badge">{arr.id}</div></td>
                       <td>
                          <div className="guest-cell">
                             <strong>{arr.guest}</strong>
                             <span className={`loyalty ${arr.loyalty.toLowerCase()}`}>{arr.loyalty}</span>
                          </div>
                       </td>
                       <td>
                          <div className="sub-cell">
                             <span>{arr.agency}</span>
                             <small>PNR: 4920{i}</small>
                          </div>
                       </td>
                       <td>
                          <div className="sub-cell">
                             <span>{arr.roomType}</span>
                             <small>Her Şey Dahil (AI)</small>
                          </div>
                       </td>
                       <td>{arr.time}</td>
                       <td>
                          <span className={`status-tag ${arr.status}`}>
                             {arr.status === 'expected' ? 'Bekleniyor' : 'Giriş Yaptı'}
                          </span>
                       </td>
                       <td>
                          <div className="action-row">
                             <button className="btn-s green" onClick={() => startOcr(arr)}>
                                <Scan size={14}/> {arr.status === 'expected' ? 'HLZ. CHECK-IN' : 'KART YENİLE'}
                             </button>
                             <button className="icon-btn"><MoreVertical size={16}/></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Right Sidebar - Operations */}
         <aside className="fo-sidebar">
            <section className="card op-card">
               <h3>HIZLI OPERASYONLAR</h3>
               <div className="op-list">
                  <button className="op-item"><DoorOpen size={18}/> Oda Değişimi (Room Move)</button>
                  <button className="op-item"><CreditCard size={18}/> Ödeme / Tahsilat</button>
                  <button className="op-item"><Fingerprint size={18}/> Kimlik / Pasaport Tara</button>
                  <button className="op-item"><Phone size={18}/> Uyandırma Kaydı</button>
                  <button className="op-item"><MessageSquare size={18}/> Misafir Mesajı Gönder</button>
               </div>
            </section>

            <section className="card alerts-card mt-20">
               <div className="sh-row">
                  <h3>BİLDİRİMLER</h3>
                  <span className="count">4</span>
               </div>
               <div className="alert-feed">
                  <div className="alert warn">
                     <AlertCircle size={16}/>
                     <div>
                        <strong>KBS Bildirimi Bekleyen</strong>
                        <p>5 Misafir kaydı KBS'ye gönderilmeyi bekliyor.</p>
                     </div>
                  </div>
                  <div className="alert info">
                     <CheckCircle size={16}/>
                     <div>
                        <strong>VIP Giriş Hazırlığı</strong>
                        <p>Oda 502 (King Suite) bukletleri hazırlandı.</p>
                     </div>
                  </div>
               </div>
            </section>
         </aside>
      </div>

      {/* OCR Simulator / Check-in Modal */}
      <AnimatePresence>
         {isOcrOpen && (
           <motion.div 
             className="modal-overlay"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
           >
              <motion.div 
                className="ocr-modal"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
              >
                 <header>
                    <div className="title">
                       <Scan className="blue"/>
                       <h3>Akıllı Check-In & OCR Tarama</h3>
                    </div>
                    <button className="close-btn" onClick={() => setIsOcrOpen(false)}><X size={20}/></button>
                 </header>
                 
                 <div className="ocr-body">
                    {ocrStep === 1 ? (
                      <div className="scan-animation">
                         <div className="id-card-preview">
                            <div className="scanning-line"></div>
                         </div>
                         <p>Kimlik/Pasaport verileri analiz ediliyor...</p>
                         <span>OCR (Optik Karakter Tanıma) Aktif</span>
                      </div>
                    ) : (
                      <div className="ocr-results">
                         <div className="res-header">
                            <CheckCircle size={32} className="green"/>
                            <h4>Tarama Başarılı!</h4>
                         </div>
                         <div className="data-preview">
                            <div className="data-field"><label>Ad Soyad</label><strong>{selectedGuest?.guest}</strong></div>
                            <div className="data-field"><label>T.C. No</label><strong>143*******80</strong></div>
                            <div className="data-field"><label>Doğum Tarihi</label><strong>14.05.1988</strong></div>
                            <div className="data-field"><label>Uyruk</label><strong>TÜRKİYE</strong></div>
                         </div>
                         <div className="modal-footer">
                            <button className="btn primary full-w" onClick={() => setIsOcrOpen(false)}>
                               KAYDI TAMAMLA VE KBS'YE GÖNDER <ArrowRight size={18}/>
                            </button>
                         </div>
                      </div>
                    )}
                 </div>
              </motion.div>
           </motion.div>
         )}
      </AnimatePresence>

      <style jsx>{`
        .fo-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .fo-header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-blue { color: #3b82f6; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { font-size: 14px; color: #64748b; }

        .fo-controls { display: flex; align-items: center; gap: 25px; }
        .kbs-status { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #64748b; background: white; padding: 10px 15px; border-radius: 12px; border: 1px solid #e2e8f0; }
        .kbs-status strong { color: #10b981; }

        .fo-content-grid { display: grid; grid-template-columns: 1fr 320px; gap: 30px; }

        .stats-row { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .stat-card { background: white; border-radius: 20px; padding: 20px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 15px; cursor: pointer; }
        .s-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .s-info .label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
        .v-row { display: flex; align-items: baseline; gap: 10px; }
        .v-row strong { font-size: 24px; color: #1e293b; }
        .v-row small { font-size: 11px; font-weight: 700; color: #94a3b8; }

        .card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .main-table-section { grid-column: 1 / 2; }
        .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .tabs { display: flex; gap: 10px; }
        .tabs button { background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 15px; border-radius: 10px; font-size: 13px; font-weight: 700; color: #64748b; cursor: pointer; }
        .tabs button.active { background: #3b82f6; color: white; border-color: #3b82f6; }

        .search-box { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 15px; border-radius: 10px; }
        .search-box input { background: transparent; border: none; outline: none; font-size: 14px; width: 220px; }

        .fo-table { width: 100%; border-collapse: collapse; }
        .fo-table th { text-align: left; padding: 15px; font-size: 11px; color: #94a3b8; text-transform: uppercase; border-bottom: 2px solid #f1f5f9; }
        .fo-table td { padding: 20px 15px; font-size: 14px; color: #475569; border-bottom: 1px solid #f8fafc; }

        .room-badge { width: 48px; height: 32px; background: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #1e293b; border: 1px solid #e2e8f0; }
        .guest-cell strong { display: block; color: #1e293b; }
        .loyalty { font-size: 9px; font-weight: 900; color: white; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }
        .loyalty.gold { background: #f59e0b; }
        .loyalty.platinum { background: #1e293b; }
        .loyalty.silver { background: #94a3b8; }
        .loyalty.none { display: none; }

        .sub-cell span { display: block; font-weight: 700; color: #475569; }
        .sub-cell small { font-size: 11px; color: #94a3b8; }

        .status-tag { padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; }
        .status-tag.expected { background: #eff6ff; color: #3b82f6; }
        .status-tag.arrived { background: #ecfdf5; color: #10b981; }

        .action-row { display: flex; align-items: center; gap: 10px; }
        .btn-s { border: none; padding: 8px 15px; border-radius: 8px; font-size: 11px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .btn-s.green { background: #ecfdf5; color: #10b981; }
        .icon-btn { background: transparent; border: none; color: #94a3b8; cursor: pointer; }

        .op-list { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
        .op-item { display: flex; align-items: center; gap: 12px; padding: 15px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; text-align: left; font-size: 13px; font-weight: 700; color: #475569; cursor: pointer; }
        .op-item:hover { background: #f1f5f9; border-color: #3b82f6; color: #3b82f6; }

        .sh-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .alerts-card .count { background: #ef4444; color: white; font-size: 10px; font-weight: 900; padding: 4px 8px; border-radius: 20px; }
        .alert-feed { display: flex; flex-direction: column; gap: 15px; }
        .alert { display: flex; gap: 12px; padding: 15px; border-radius: 12px; }
        .alert.warn { background: #fffcf0; color: #b45309; border-left: 4px solid #f59e0b; }
        .alert.info { background: #f0fdf4; color: #15803d; border-left: 4px solid #10b981; }
        .alert strong { display: block; font-size: 13px; margin-bottom: 4px; }
        .alert p { font-size: 11px; opacity: 0.8; line-height: 1.4; }

        .btn-fo.primary { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; }

        /* Modal Styles */
        .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .ocr-modal { background: white; width: 480px; border-radius: 30px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
        .ocr-modal header { padding: 25px 30px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
        .ocr-modal .title { display: flex; align-items: center; gap: 15px; }
        .ocr-modal h3 { font-size: 18px; font-weight: 800; color: #1e293b; }
        .ocr-body { padding: 40px; }

        .scan-animation { text-align: center; }
        .id-card-preview { width: 300px; height: 180px; background: #f1f5f9; border-radius: 20px; margin: 0 auto 25px; position: relative; overflow: hidden; border: 2px dashed #3b82f6; }
        .scanning-line { position: absolute; width: 100%; height: 4px; background: #3b82f6; box-shadow: 0 0 15px #3b82f6; animation: scan 2s infinite ease-in-out; }
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
        .scan-animation p { font-weight: 800; color: #1e293b; margin-bottom: 5px; }
        .scan-animation span { font-size: 11px; color: #94a3b8; letter-spacing: 1px; }

        .ocr-results { animation: fadeIn 0.5s; }
        .res-header { text-align: center; margin-bottom: 30px; }
        .res-header h4 { font-size: 20px; color: #10b981; margin-top: 10px; font-weight: 800; }
        .data-preview { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #f8fafc; padding: 25px; border-radius: 20px; margin-bottom: 30px; }
        .data-field label { display: block; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 5px; }
        .data-field strong { font-size: 15px; color: #1e293b; }
        
        .btn.full-w { width: 100%; padding: 18px; border-radius: 15px; font-weight: 800; font-size: 15px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 15px; }
        .btn.primary { background: #3b82f6; color: white; }

        .green { color: #10b981; }
        .blue { color: #3b82f6; }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
};

export default FrontOffice;
