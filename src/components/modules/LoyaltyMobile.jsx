import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Star, Smartphone, Gift, MessageSquare, 
  UserCheck, Trophy, Bell, ExternalLink, ChevronRight
} from 'lucide-react';

const LoyaltyMobile = () => {
  const { guests } = useHotel();
  const [activeTab, setActiveTab] = useState('program');

  const levels = [
    { name: 'Silver', color: '#94a3b8', points: '0 - 1000', perks: ['%5 İndirim', 'Geç Check-out'], count: 142 },
    { name: 'Gold', color: '#f59e0b', points: '1001 - 5000', perks: ['%10 İndirim', 'Oda Upgrade', 'Ücretsiz Kahvaltı'], count: 45 },
    { name: 'Platinum', color: '#3b82f6', points: '5001+', perks: ['%20 İndirim', 'VIP Transfer', 'SPA Kullanımı'], count: 12 },
  ];

  const mobileRequests = [
    { id: 'REQ-1', guest: 'Ahmet Yılmaz', type: 'Room Service', title: 'Ekstra Yastık', status: 'yeni', time: '14:20' },
    { id: 'REQ-2', guest: 'Sarah Johnson', type: 'Housekeeping', title: 'Oda Temizliği', status: 'hazırlanıyor', time: '14:15' },
    { id: 'REQ-3', guest: 'Klaus Weber', type: 'Concierge', title: 'Taksi Çağır', status: 'tamamlandı', time: '13:50' },
  ];

  return (
    <div className="loy-page">
      <div className="loy-head">
        <div>
          <h2><Heart size={20}/> Sadakat & Mobil Uygulama</h2>
          <span>Misafir bağlılığı, puan sistemi ve mobil uygulama talepleri</span>
        </div>
        <div className="tab-switcher">
          <button className={activeTab === 'program' ? 'active' : ''} onClick={() => setActiveTab('program')}>Sadakat Programı</button>
          <button className={activeTab === 'mobile' ? 'active' : ''} onClick={() => setActiveTab('mobile')}>Mobil Talepler</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'program' ? (
          <motion.div key="program" className="loy-content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {/* Seviyeler */}
            <div className="level-grid">
              {levels.map((lvl, i) => (
                <div key={lvl.name} className="level-card">
                  <div className="lc-head">
                    <Trophy size={24} color={lvl.color}/>
                    <div>
                      <h3>{lvl.name} Members</h3>
                      <span>{lvl.points} Puan</span>
                    </div>
                    <div className="count-pill">{lvl.count} Üye</div>
                  </div>
                  <ul className="perk-list">
                    {lvl.perks.map(p => <li key={p}><Star size={10}/> {p}</li>)}
                  </ul>
                  <button className="lc-btn">Üyeleri Listele</button>
                </div>
              ))}
            </div>

            {/* Loyalty Stats */}
            <div className="loy-stats-row">
              <div className="stat-box">
                <div className="sb-label">Toplam Sadakat Puanı</div>
                <div className="sb-value">1,420,500</div>
                <div className="sb-trend up">+12.4%</div>
              </div>
              <div className="stat-box">
                <div className="sb-label">Harcanan Puanlar</div>
                <div className="sb-value">₺125,000</div>
                <div className="sb-trend down">-4.2%</div>
              </div>
              <div className="stat-box">
                <div className="sb-label">Mobil Uygulama İndirme</div>
                <div className="sb-value">842</div>
                <div className="sb-trend up">+8.1%</div>
              </div>
            </div>

            {/* Campaign area */}
            <div className="campaign-section">
              <h3><Gift size={16}/> Aktif Kampanyalar</h3>
              <div className="camp-grid">
                {[
                  { title: 'Yaz Tatili %15 Puan', desc: 'SPA harcamalarında 2 kat puan kazanma fırsatı.', type: 'SPA' },
                  { title: 'Hafta sonu Kaçamağı', desc: '3 gece kal 2 gece öde kampanyası mobil üyelerinize özel.', type: 'Konaklama' },
                ].map(c => (
                  <div key={c.title} className="camp-card">
                    <div className="camp-icon"><Smartphone size={18}/></div>
                    <div className="camp-info">
                      <strong>{c.title}</strong>
                      <p>{c.desc}</p>
                    </div>
                    <button className="edit-btn">Düzenle</button>
                  </div>
                ))}
                <button className="add-camp"><Plus size={14}/> Yeni Kampanya Oluştur</button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="mobile" className="mobile-content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="mobile-main">
              <div className="mobile-requests">
                <div className="mr-head">
                  <h3>Aktif Mobil Talepler</h3>
                  <div className="badge blue">{mobileRequests.filter(r=>r.status!=='tamamlandı').length} Bekleyen</div>
                </div>
                
                <div className="request-list">
                  {mobileRequests.map(req => (
                    <div key={req.id} className={`req-item ${req.status}`}>
                      <div className="req-icon"><Bell size={16}/></div>
                      <div className="req-info">
                        <strong>{req.guest}</strong>
                        <span>{req.type} — {req.title}</span>
                      </div>
                      <div className="req-meta">
                        <div className="req-time">{req.time}</div>
                        <div className={`status-tag ${req.status}`}>{req.status}</div>
                      </div>
                      <button className="req-btn"><ChevronRight size={14}/></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mobile-preview">
                <div className="phone-mockup">
                  <div className="mock-screen">
                    <div className="app-header">Otel Uygulaması</div>
                    <div className="app-body">
                      <div className="app-card guest">Hoş Geldiniz, <strong>Sayın Yılmaz</strong></div>
                      <div className="app-menu">
                        <div className="menu-i">🛎️ Resepsiyon</div>
                        <div className="menu-i">🧹 Oda Temizliği</div>
                        <div className="menu-i">🍽️ Oda Servisi</div>
                        <div className="menu-i">💆 SPA Rezervasyon</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mock-actions">
                  <h4>Uygulama Ayarları</h4>
                  <button className="mbtn"><MessageSquare size={14}/> Push Bildirimi Gönder</button>
                  <button className="mbtn"><ExternalLink size={14}/> Uygulama Linkini Gönder</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .loy-page { padding: 28px; display: flex; flex-direction: column; gap: 20px; }
        .loy-head { display: flex; justify-content: space-between; align-items: center; }
        .loy-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .loy-head span { font-size: 13px; color: #94a3b8; }
        
        .tab-switcher { background: #f1f5f9; padding: 4px; border-radius: 12px; display: flex; gap: 4px; }
        .tab-switcher button { padding: 8px 16px; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; }
        .tab-switcher button.active { background: white; color: #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }

        .loy-content { display: flex; flex-direction: column; gap: 24px; }
        .level-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .level-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 24px; display: flex; flex-direction: column; gap: 20px; position: relative; overflow: hidden; }
        .lc-head { display: flex; align-items: center; gap: 12px; }
        .lc-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .lc-head span { font-size: 12px; color: #94a3b8; font-weight: 600; }
        .count-pill { margin-left: auto; padding: 4px 10px; background: #f1f5f9; border-radius: 20px; font-size: 10px; font-weight: 800; color: #475569; }
        
        .perk-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .perk-list li { font-size: 12px; font-weight: 600; color: #475569; display: flex; align-items: center; gap: 8px; }
        .lc-btn { margin-top: auto; padding: 12px; border: 1.5px solid #f1f5f9; border-radius: 12px; background: transparent; font-weight: 700; font-size: 12px; cursor: pointer; color: #64748b; transition: 0.2s; }
        .lc-btn:hover { border-color: #3b82f6; color: #3b82f6; background: #f8fafc; }

        .loy-stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .stat-box { background: #1e293b; border-radius: 20px; padding: 20px; color: white; position: relative; }
        .sb-label { font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .sb-value { font-size: 24px; font-weight: 900; }
        .sb-trend { position: absolute; top: 20px; right: 20px; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
        .sb-trend.up { background: #f0fdf4; color: #10b981; }
        .sb-trend.down { background: #fef2f2; color: #ef4444; }

        .campaign-section h3 { font-size: 14px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
        .camp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .camp-card { background: white; border-radius: 16px; border: 1.5px solid #f1f5f9; padding: 16px; display: flex; align-items: center; gap: 14px; }
        .camp-icon { width: 40px; height: 40px; background: #eff6ff; color: #3b82f6; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .camp-info strong { display: block; font-size: 14px; color: #1e293b; }
        .camp-info p { font-size: 12px; color: #94a3b8; margin: 2px 0 0; }
        .edit-btn { margin-left: auto; padding: 6px 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 11px; font-weight: 700; cursor: pointer; color: #64748b; background: white; }
        .add-camp { border: 2px dashed #e2e8f0; border-radius: 16px; padding: 16px; background: transparent; color: #94a3b8; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; }

        .mobile-main { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        .mobile-requests { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; }
        .mr-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .mr-head h3 { font-size: 15px; font-weight: 800; color: #1e293b; }
        .badge { padding: 4px 10px; border-radius: 20px; font-size: 10px; font-weight: 800; }
        .badge.blue { background: #eff6ff; color: #3b82f6; }

        .request-list { display: flex; flex-direction: column; gap: 10px; }
        .req-item { display: flex; align-items: center; gap: 14px; padding: 14px; border-radius: 14px; border: 1.5px solid #f1f5f9; transition: 0.2s; }
        .req-item:hover { border-color: #3b82f6; background: #f8fafc; }
        .req-icon { width: 36px; height: 36px; background: #fff7ed; color: #f59e0b; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .req-info strong { display: block; font-size: 13px; color: #1e293b; }
        .req-info span { font-size: 11px; color: #94a3b8; }
        .req-meta { margin-left: auto; text-align: right; }
        .req-time { font-size: 10px; color: #94a3b8; margin-bottom: 2px; }
        .status-tag { font-size: 9px; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 20px; display: inline-block; }
        .status-tag.yeni { background: #f0fdf4; color: #10b981; }
        .status-tag.hazırlanıyor { background: #eff6ff; color: #3b82f6; }
        .status-tag.tamamlandı { background: #f1f5f9; color: #94a3b8; }
        .req-btn { background: transparent; border: none; color: #cbd5e1; cursor: pointer; }

        .phone-mockup { width: 240px; height: 480px; background: #1e293b; border: 8px solid #0f172a; border-radius: 36px; padding: 8px; margin: 0 auto 20px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
        .mock-screen { background: #f8fafc; height: 100%; border-radius: 24px; overflow: hidden; display: flex; flex-direction: column; }
        .app-header { background: #3b82f6; color: white; padding: 20px 10px; text-align: center; font-weight: 800; font-size: 12px; }
        .app-body { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
        .app-card { background: white; padding: 12px; border-radius: 12px; font-size: 11px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .app-card strong { color: #3b82f6; }
        .app-menu { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
        .menu-i { background: white; padding: 12px 6px; border-radius: 10px; font-size: 9px; text-align: center; font-weight: 700; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

        .mock-actions h4 { font-size: 14px; font-weight: 800; color: #1e293b; margin-bottom: 12px; }
        .mbtn { width: 100%; padding: 12px; border-radius: 12px; border: 1.5px solid #e2e8f0; background: white; font-weight: 700; font-size: 12px; color: #475569; display: flex; align-items: center; gap: 10px; margin-bottom: 8px; cursor: pointer; transition: 0.2s; }
        .mbtn:hover { border-color: #3b82f6; color: #3b82f6; background: #f8fafc; }
      `}</style>
    </div>
  );
};

const Plus = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export default LoyaltyMobile;
