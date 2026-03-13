import React, { useState } from 'react';
import { 
  Heart, Star, Smartphone, 
  MapPin, Bell, Coffee,
  Gift, Crown, ShieldCheck,
  Search, Filter, MoreVertical,
  QrCode, UserPlus, Send, MessageSquare,
  CheckCircle, Clock, Utensils, Waves,
  Calendar, Key, ChevronRight, LayoutGrid,
  Zap, Info, List as ListIcon, 
  Smartphone as PhoneIcon, SmartphoneNfc
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const loyaltyGuests = [
  { id: 1, name: 'Selin Aras', level: 'Platinum', points: 12450, stays: 18, lastActive: '2 dk önce', status: 'online' },
  { id: 2, name: 'Burak Yılmaz', level: 'Gold', points: 8100, stays: 9, lastActive: '5 dk önce', status: 'online' },
  { id: 3, name: 'Helga Schmidt', level: 'Silver', points: 3200, stays: 4, lastActive: '1 ay önce', status: 'offline' },
];

const mobileRequests = [
  { room: '302', type: 'Ek Havlu İstendi', dept: 'Housekeeping', time: '14:05', status: 'new', urgency: 'high' },
  { room: '105', type: 'A\'la Carte Rezervasyon', dept: 'Guest Relations', time: '13:58', status: 'processing', urgency: 'normal' },
  { room: '412', type: 'Oda Temizliği Talebi', dept: 'Housekeeping', time: '13:45', status: 'completed', urgency: 'low' },
  { room: '201', type: 'Yastık Menüsü Seçimi', dept: 'Housekeeping', time: '13:10', status: 'new', urgency: 'normal' },
];

const LoyaltyMobile = () => {
  const [activeTab, setActiveTab] = useState('requests');

  return (
    <div className="lm-container">
      <header className="header">
         <div className="title-section">
            <Smartphone size={32} className="icon-blue"/>
            <div>
               <h2>Sedna Mobile & Digital Concierge</h2>
               <span>Online Check-In, dijital anahtar ve misafir sadakat yönetimi</span>
            </div>
         </div>
         <div className="actions">
            <div className="app-stats">
               <SmartphoneNfc size={16} className="green"/>
               <span>Aktif Uygulama Kullanıcısı: <strong>142</strong></span>
            </div>
            <button className="btn-lm primary"><Smartphone size={18}/> PUSH BİLDİRİM GÖNDER</button>
         </div>
      </header>

      <div className="lm-grid">
         {/* Loyalty Tiers Summary */}
         <section className="tiers-row">
            <motion.div whileHover={{ y: -5 }} className="card tier-card platinum">
               <div className="t-icon"><Crown size={28}/></div>
               <div className="t-data">
                  <strong>Platinum</strong>
                  <span>1.240 Üye</span>
               </div>
               <ChevronRight size={18} className="gray"/>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="card tier-card gold">
               <div className="t-icon"><Star size={28}/></div>
               <div className="t-data">
                  <strong>Gold</strong>
                  <span>3.850 Üye</span>
               </div>
               <ChevronRight size={18} className="gray"/>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="card tier-card silver">
               <div className="t-icon"><ShieldCheck size={28}/></div>
               <div className="t-data">
                  <strong>Silver</strong>
                  <span>8.120 Üye</span>
               </div>
               <ChevronRight size={18} className="gray"/>
            </motion.div>
         </section>

         {/* Multi-Tab Operation Center */}
         <section className="card operation-center">
            <div className="tab-header">
               <div className="tabs">
                  <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => setActiveTab('requests')}>
                     MOBİL TALEPLER {mobileRequests.filter(r => r.status === 'new').length > 0 && <span className="dot-red"></span>}
                  </button>
                  <button className={activeTab === 'online-checkin' ? 'active' : ''} onClick={() => setActiveTab('online-checkin')}>
                     ONLINE CHECK-IN
                  </button>
                  <button className={activeTab === 'reservations' ? 'active' : ''} onClick={() => setActiveTab('reservations')}>
                     MOBİL REZERVASYONLAR
                  </button>
               </div>
               <div className="search-box">
                  <Search size={16} />
                  <input type="text" placeholder="Oda veya misafir ara..." />
               </div>
            </div>

            <div className="tab-content">
               {activeTab === 'requests' ? (
                 <div className="req-grid">
                    {mobileRequests.map((req, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        key={idx} 
                        className={`req-item ${req.status}`}
                      >
                         <div className="req-header">
                            <span className="room-id">ODA {req.room}</span>
                            <span className={`urgency-tag ${req.urgency}`}>{req.urgency.toUpperCase()}</span>
                         </div>
                         <h4>{req.type}</h4>
                         <div className="req-footer">
                            <div className="dept-info">
                               <Clock size={12}/>
                               <span>{req.time} • {req.dept}</span>
                            </div>
                            <button className="btn-action">CEVAPLA</button>
                         </div>
                      </motion.div>
                    ))}
                 </div>
               ) : activeTab === 'online-checkin' ? (
                 <div className="checkin-list">
                    <div className="info-banner blue">
                       <Info size={18}/>
                       <span>Bugün 12 misafir uygulama üzerinden evraklarını yükleyerek ön giriş yaptı.</span>
                    </div>
                    {/* Add online check-in items here */}
                 </div>
               ) : (
                 <div className="res-mini-list">
                    {/* Activity tracking */}
                 </div>
               )}
            </div>
         </section>

         {/* Membership Directory Sidebar */}
         <aside className="lm-sidebar">
            <section className="card directory-card">
               <div className="sh">
                  <h3>AKTİF ÜYELER</h3>
                  <div className="live-indicator"><div className="ping"></div> LIVE</div>
               </div>
               <div className="guest-feed">
                  {loyaltyGuests.map((g, idx) => (
                    <div key={idx} className="guest-item">
                       <div className="avatar-box">
                          {g.name[0]}
                          {g.status === 'online' && <div className="online-dot"></div>}
                       </div>
                       <div className="g-info">
                          <strong>{g.name}</strong>
                          <div className="g-meta">
                             <span className={`l-tag ${g.level.toLowerCase()}`}>{g.level}</span>
                             <span>{g.points} Puan</span>
                          </div>
                       </div>
                       <button className="icon-btn"><MoreVertical size={14}/></button>
                    </div>
                  ))}
               </div>
               <button className="btn-full outline mt-20">TÜM ÜYE LİSTESİ</button>
            </section>

            <section className="card marketing-card mt-20">
               <h3>KAMPANYA PERFORMANSI</h3>
               <div className="campaign-stat">
                  <span>Hoş Geldin Kokteyli (Platinum)</span>
                  <div className="progress-mini"><div className="fill pink" style={{ width: '82%' }}></div></div>
                  <small>Etkileşim: %82</small>
               </div>
               <div className="campaign-stat mt-15">
                  <span>SPA'da %20 İndirim (All)</span>
                  <div className="progress-mini"><div className="fill blue" style={{ width: '45%' }}></div></div>
                  <small>Etkileşim: %45</small>
               </div>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .lm-container {
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

        .app-stats { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #64748b; background: white; padding: 10px 15px; border-radius: 12px; border: 1px solid #e2e8f0; }
        .app-stats strong { color: #10b981; }

        .btn-lm.primary { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; }

        .lm-grid { display: grid; grid-template-columns: 280px 1fr 340px; gap: 30px; }

        .tiers-row { display: flex; flex-direction: column; gap: 15px; }
        .tier-card { display: flex; align-items: center; gap: 15px; padding: 20px; cursor: pointer; border: 1px solid #e2e8f0; }
        .t-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .tier-card.platinum .t-icon { background: #f8fafc; color: #64748b; }
        .tier-card.gold .t-icon { background: #fffcf0; color: #f59e0b; }
        .tier-card.silver .t-icon { background: #f0fdf4; color: #10b981; }
        .t-data { flex: 1; }
        .t-data strong { display: block; font-size: 15px; color: #1e293b; }
        .t-data span { font-size: 11px; color: #94a3b8; font-weight: 700; }

        .card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .tab-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 2px solid #f1f5f9; }
        .tabs { display: flex; gap: 30px; }
        .tabs button { background: transparent; border: none; padding-bottom: 15px; font-size: 14px; font-weight: 800; color: #94a3b8; cursor: pointer; position: relative; }
        .tabs button.active { color: #3b82f6; border-bottom: 3px solid #3b82f6; }
        .dot-red { position: absolute; top: -5px; right: -8px; width: 6px; height: 6px; background: #ef4444; border-radius: 50%; }

        .search-box { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 10px; margin-bottom: 15px; }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 200px; }

        .req-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .req-item { padding: 20px; border-radius: 18px; background: #f8fafc; border: 1px solid #f1f5f9; }
        .req-item.new { border-left: 5px solid #ef4444; }
        .req-item.processing { border-left: 5px solid #3b82f6; }
        .req-item.completed { opacity: 0.7; }
        .req-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .room-id { font-size: 11px; font-weight: 900; color: #3b82f6; letter-spacing: 1px; }
        .urgency-tag { font-size: 9px; font-weight: 900; padding: 2px 8px; border-radius: 4px; }
        .urgency-tag.high { background: #fee2e2; color: #dc2626; }
        .urgency-tag.normal { background: #fef3c7; color: #92400e; }
        .urgency-tag.low { background: #f1f5f9; color: #64748b; }
        
        .req-item h4 { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        .req-footer { display: flex; justify-content: space-between; align-items: center; }
        .dept-info { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #94a3b8; font-weight: 700; }
        .btn-action { background: #1e293b; color: white; border: none; padding: 8px 15px; border-radius: 8px; font-size: 11px; font-weight: 800; cursor: pointer; }

        .info-banner { display: flex; align-items: center; gap: 15px; padding: 15px; border-radius: 12px; font-size: 13px; font-weight: 600; }
        .info-banner.blue { background: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd; }

        .sh { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .live-indicator { display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 900; color: #10b981; }
        .ping { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }

        .guest-feed { display: flex; flex-direction: column; gap: 12px; }
        .guest-item { display: flex; align-items: center; gap: 15px; padding: 12px; border-radius: 15px; background: #f8fafc; }
        .avatar-box { width: 40px; height: 40px; background: #e2e8f0; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #475569; position: relative; }
        .online-dot { position: absolute; bottom: -2px; right: -2px; width: 10px; height: 10px; background: #10b981; border-radius: 50%; border: 2px solid white; }
        .g-info strong { display: block; font-size: 14px; color: #1e293b; }
        .g-meta { display: flex; align-items: center; gap: 10px; margin-top: 4px; }
        .l-tag { font-size: 9px; font-weight: 900; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }
        .l-tag.platinum { background: #f1f5f9; color: #64748b; }
        .l-tag.gold { background: #fffcf0; color: #f59e0b; }
        .l-tag.silver { background: #f0fdf4; color: #10b981; }
        .g-meta span:last-child { font-size: 10px; color: #94a3b8; font-weight: 700; }

        .marketing-card h3 { margin-bottom: 20px; }
        .campaign-stat span { display: block; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 8px; }
        .progress-mini { height: 4px; background: #f1f5f9; border-radius: 10px; overflow: hidden; margin-bottom: 5px; }
        .fill { height: 100%; border-radius: 10px; }
        .fill.pink { background: #db2777; }
        .fill.blue { background: #3b82f6; }
        .campaign-stat small { font-size: 10px; color: #94a3b8; font-weight: 800; }

        .btn-full { width: 100%; padding: 12px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; }
        .btn-full.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .blue { color: #3b82f6; }
        .green { color: #10b981; }
        .gray { color: #cbd5e1; }
        .mt-20 { margin-top: 20px; }
        .mt-15 { margin-top: 15px; }
      `}</style>
    </div>
  );
};

export default LoyaltyMobile;
