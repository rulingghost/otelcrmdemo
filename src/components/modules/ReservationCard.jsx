import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Calendar, CreditCard, FileText, 
  MapPin, Phone, Mail, Clock, 
  ShieldCheck, AlertCircle, Edit3, 
  Printer, Share2, MoreVertical,
  ChevronRight, ArrowRight, DollarSign,
  Briefcase, Star, Info
} from 'lucide-react';

const ReservationCard = ({ reservationId = "RES-9942", onClose }) => {
  const [activeTab, setActiveTab] = useState('genel');

  const guestInfo = {
    name: 'Sarah Johnson',
    type: 'VIP - Gold',
    phone: '+44 7700 900077',
    mail: 'sarah.j@example.com',
    country: 'United Kingdom',
    company: 'TechFlow Global',
    totalStays: 12,
    preferences: ['Yüksek Kat', 'Ekstra Yastık', 'Deniz Manzarası'],
  };

  const stayInfo = {
    dates: '15 Mar - 20 Mar 2026',
    nights: 5,
    room: '102 - Deluxe Sea View',
    pax: '2 Yetişkin, 0 Çocuk',
    pension: 'Her Şey Dahil',
    source: 'Booking.com',
    status: 'Gelecek',
  };

  const financial = {
    total: '₺18,450.00',
    paid: '₺5,000.00',
    balance: '₺13,450.00',
    currency: 'TRY',
  };

  return (
    <div className="res-card-overlay">
      <motion.div 
        className="res-card-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
      >
        {/* Header */}
        <div className="rc-header">
          <div className="rch-left">
            <div className="res-id">#{reservationId}</div>
            <div className="res-status-pill">Konfirme Edildi</div>
          </div>
          <div className="rch-actions">
            <button className="btn-icon"><Edit3 size={16}/></button>
            <button className="btn-icon"><Printer size={16}/></button>
            <button className="btn-icon"><Share2 size={16}/></button>
            <button className="btn-close" onClick={onClose}>×</button>
          </div>
        </div>

        <div className="rc-body">
          {/* Main Info Strip */}
          <div className="rc-strip">
            <div className="rcs-item">
              <div className="rcsi-icon"><User size={20}/></div>
              <div className="rcsi-content">
                <strong>{guestInfo.name}</strong>
                <span><Star size={10} fill="#f59e0b" color="#f59e0b"/> {guestInfo.type}</span>
              </div>
            </div>
            <div className="rcs-item">
              <div className="rcsi-icon"><Calendar size={20}/></div>
              <div className="rcsi-content">
                <strong>{stayInfo.dates}</strong>
                <span>{stayInfo.nights} Gece · {stayInfo.pax}</span>
              </div>
            </div>
            <div className="rcs-item">
              <div className="rcsi-icon"><Briefcase size={20}/></div>
              <div className="rcsi-content">
                <strong>Oda {stayInfo.room}</strong>
                <span>{stayInfo.pension}</span>
              </div>
            </div>
          </div>

          <div className="rc-layout">
            {/* Sidebar List */}
            <div className="rc-nav">
              {[
                { id: 'genel', label: 'Genel Bilgiler', icon: <Info size={16}/> },
                { id: 'folio', label: 'Folio & Ödemeler', icon: <CreditCard size={16}/> },
                { id: 'notlar', label: 'Özel Notlar', icon: <FileText size={16}/> },
                { id: 'logs', label: 'İşlem Geçmişi', icon: <Clock size={16}/> },
              ].map(t => (
                <button 
                  key={t.id} 
                  className={`rc-nav-btn ${activeTab === t.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.icon}
                  <span>{t.label}</span>
                  {activeTab === t.id && <motion.div layoutId="rc-nav-bg" className="rc-nav-active-bg" />}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="rc-main-content">
              <AnimatePresence mode="wait">
                {activeTab === 'genel' && (
                  <motion.div 
                    key="genel" 
                    initial={{ opacity: 0, x: 10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -10 }}
                    className="rc-tab-panel"
                  >
                    <div className="rc-grid">
                      <div className="rc-box">
                        <h4>İletişim Bilgileri</h4>
                        <div className="rc-info-list">
                          <div className="ril-i"><Phone size={14}/> {guestInfo.phone}</div>
                          <div className="ril-i"><Mail size={14}/> {guestInfo.mail}</div>
                          <div className="ril-i"><MapPin size={14}/> {guestInfo.country}</div>
                        </div>
                      </div>
                      <div className="rc-box">
                        <h4>Fiyatlandırma Özeti</h4>
                        <div className="rc-price-grid">
                          <div className="rpg-i"><span>Toplam Tutar</span><strong>{financial.total}</strong></div>
                          <div className="rpg-i"><span>Ödenen</span><strong className="green">{financial.paid}</strong></div>
                          <div className="rpg-i divider"><span>Kalan Borç</span><strong className="red">{financial.balance}</strong></div>
                        </div>
                      </div>
                    </div>

                    <div className="rc-full-box">
                      <h4>Misafir Tercihleri</h4>
                      <div className="pref-tags">
                        {guestInfo.preferences.map(p => <span key={p} className="p-tag">#{p}</span>)}
                      </div>
                    </div>

                    <div className="rc-actions-footer">
                      <button className="btn-secondary">Check-In Başlat</button>
                      <button className="btn-primary">Folio'ya Git <ArrowRight size={14}/></button>
                    </div>
                  </motion.div>
                )}
                {/* Diğer tablar dummy olarak UI'da yer alır */}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .res-card-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px; }
        .res-card-modal { background: white; width: 100%; max-width: 900px; border-radius: 32px; overflow: hidden; box-shadow: 0 40px 60px -12px rgba(0,0,0,0.25); display: flex; flex-direction: column; max-height: 90vh; }
        
        .rc-header { padding: 24px 32px; background: #1e293b; color: white; display: flex; justify-content: space-between; align-items: center; }
        .res-id { font-family: monospace; font-size: 14px; font-weight: 800; opacity: 0.6; }
        .res-status-pill { font-size: 11px; font-weight: 800; background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; margin-top: 4px; }
        .rch-actions { display: flex; gap: 8px; align-items: center; }
        .btn-icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(255,255,255,0.1); border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .btn-icon:hover { background: rgba(255,255,255,0.2); }
        .btn-close { font-size: 24px; color: white; background: transparent; border: none; cursor: pointer; margin-left: 10px; opacity: 0.6; transition: 0.2s; }
        .btn-close:hover { opacity: 1; }

        .rc-body { flex: 1; overflow-y: auto; padding: 0 32px 32px; }
        
        .rc-strip { background: #f8fafc; margin: 0 -32px; padding: 24px 32px; border-bottom: 1px solid #f1f5f9; display: flex; gap: 40px; }
        .rcs-item { display: flex; align-items: center; gap: 16px; }
        .rcsi-icon { width: 44px; height: 44px; background: white; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: #3b82f6; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .rcsi-content strong { display: block; font-size: 16px; color: #1e293b; }
        .rcsi-content span { font-size: 12px; color: #94a3b8; font-weight: 600; display: flex; align-items: center; gap: 4px; }

        .rc-layout { display: flex; gap: 32px; margin-top: 24px; }
        .rc-nav { width: 200px; display: flex; flex-direction: column; gap: 4px; position: relative; }
        .rc-nav-btn { padding: 12px 16px; border-radius: 12px; border: none; background: transparent; color: #64748b; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 12px; text-align: left; transition: 0.2s; position: relative; }
        .rc-nav-btn.active { color: #3b82f6; }
        .rc-nav-active-bg { position: absolute; inset: 0; background: #eff6ff; border-radius: 12px; z-index: -1; }

        .rc-main-content { flex: 1; display: flex; flex-direction: column; }
        .rc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
        .rc-box h4 { font-size: 12px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 16px; border-bottom: 2px solid #f8fafc; padding-bottom: 8px; }
        .rc-info-list { display: flex; flex-direction: column; gap: 12px; }
        .ril-i { font-size: 13px; color: #475569; display: flex; align-items: center; gap: 10px; font-weight: 600; }
        
        .rc-price-grid { display: flex; flex-direction: column; gap: 10px; }
        .rpg-i { display: flex; justify-content: space-between; font-size: 13px; }
        .rpg-i span { color: #94a3b8; }
        .rpg-i strong { color: #1e293b; font-weight: 800; }
        .rpg-i strong.green { color: #10b981; }
        .rpg-i strong.red { color: #ef4444; }
        .rpg-i.divider { border-top: 1px dashed #e2e8f0; padding-top: 10px; margin-top: 5px; }

        .rc-full-box { margin-bottom: 32px; }
        .rc-full-box h4 { font-size: 12px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 12px; }
        .pref-tags { display: flex; gap: 8px; flex-wrap: wrap; }
        .p-tag { background: #f1f5f9; padding: 6px 14px; border-radius: 10px; font-size: 12px; font-weight: 700; color: #475569; }

        .rc-actions-footer { display: flex; justify-content: flex-end; gap: 12px; padding-top: 24px; border-top: 1px solid #f1f5f9; }
        .btn-secondary { padding: 12px 24px; border: 1.5px solid #e2e8f0; background: white; color: #475569; font-weight: 800; font-size: 13px; border-radius: 14px; cursor: pointer; }
        .btn-primary { padding: 12px 24px; background: #1e293b; color: white; border: none; font-weight: 800; font-size: 13px; border-radius: 14px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
        .btn-primary:hover { background: #334155; transform: translateY(-2px); }
      `}</style>
    </div>
  );
};

export default ReservationCard;
