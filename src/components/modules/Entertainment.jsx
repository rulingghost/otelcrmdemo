import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, Camera, Users, Star, 
  Calendar, Clock, MapPin, Smile, 
  ChevronRight, Plus, PartyPopper, Heart
} from 'lucide-react';

const Entertainment = () => {
  const [activeDay, setActiveDay] = useState('Bugün');

  const activities = [
    { id: 1, name: 'Sabah Yogası', time: '09:00 - 10:00', loc: 'Sahil Bahçesi', cat: 'Spor', status: 'aktif' },
    { id: 2, name: 'Çocuk Kulübü: Boyama', time: '10:30 - 12:00', loc: 'Kids Club', cat: 'Çocuk', status: 'aktif' },
    { id: 3, name: 'Su Topu Turnuvası', time: '14:30 - 15:30', loc: 'Ana Havuz', cat: 'Eğlence', status: 'aktif' },
    { id: 4, name: 'Voleybol Maçı', time: '16:00 - 17:00', loc: 'Plaj Sahası', cat: 'Spor', status: 'aktif' },
    { id: 5, name: 'Sihirbazlık Gösterisi', time: '21:00 - 22:00', loc: 'Amfi Tiyatro', cat: 'Show', status: 'aktif' },
  ];

  const shows = [
    { title: 'Türk Gecesi', date: 'Yarın', icon: '💃' },
    { title: 'Canlı Müzik (Jazz)', date: 'Cuma', icon: '🎷' },
    { title: 'Açık Hava Sineması', date: 'Cumartesi', icon: '📽️' },
  ];

  return (
    <div className="ent-page">
      <div className="ent-head">
        <div>
          <h2><PartyPopper size={20}/> Eğlence & Aktivite Yönetimi</h2>
          <span>Günlük animasyon programı, özel şovlar ve misafir katılım takibi</span>
        </div>
        <button className="btn-primary"><Plus size={14}/> Yeni Etkinlik Ekle</button>
      </div>

      <div className="ent-grid">
        {/* Sol: Program Listesi */}
        <div className="program-section">
          <div className="ps-head">
            <div className="day-tabs">
              {['Dün', 'Bugün', 'Yarın', 'Haftalık'].map(d => (
                <button key={d} className={`d-tab ${activeDay === d ? 'active' : ''}`} onClick={() => setActiveDay(d)}>{d}</button>
              ))}
            </div>
            <div className="ps-stats">
              <strong>{activities.length}</strong> Aktivite
            </div>
          </div>

          <div className="activity-list">
            {activities.map((a, i) => (
              <motion.div 
                key={a.id} 
                className="act-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="act-time"><Clock size={14}/> {a.time}</div>
                <div className="act-info">
                  <strong>{a.name}</strong>
                  <span><MapPin size={11}/> {a.loc} · <Tag size={11}/> {a.cat}</span>
                </div>
                <div className="act-right">
                  <div className="act-users"><Users size={12}/> 12 Katılımcı</div>
                  <button className="act-btn">Detay <ChevronRight size={14}/></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sağ: Sidebar & Bilgi */}
        <div className="ent-sidebar">
          <div className="featured-shows">
            <h3>Haftalık Özel Şovlar</h3>
            <div className="show-list">
              {shows.map((s, i) => (
                <div key={s.title} className="show-card">
                  <div className="sc-icon">{s.icon}</div>
                  <div className="sc-info">
                    <strong>{s.title}</strong>
                    <span>{s.date} @ 21:00</span>
                  </div>
                  <button className="sc-rsvp">Duyur</button>
                </div>
              ))}
            </div>
          </div>

          <div className="kids-club-box">
            <div className="kc-head">
              <Smile size={24} color="#8b5cf6"/>
              <h3>Kids Club Durumu</h3>
            </div>
            <div className="kc-stats">
              <div className="ks-i"><span>Aktif Çocuk</span><strong>8</strong></div>
              <div className="ks-i"><span>Kapasite</span><strong>%40</strong></div>
            </div>
            <button className="kc-btn">Kayıt Listesi</button>
          </div>

          <div className="staff-box">
            <h4>Ekip Durumu (Animasyon)</h4>
            <div className="st-list">
              {[
                { name: 'Ricardo', role: 'DJ / Teknik' },
                { name: 'Elena', role: 'Yoga Eğitmeni' },
                { name: 'Mert', role: 'Çocuk Şefi' },
              ].map(st => (
                <div key={st.name} className="st-row">
                  <div className="st-av">{st.name[0]}</div>
                  <div className="st-info"><strong>{st.name}</strong><span>{st.role}</span></div>
                  <div className="st-dot" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ent-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .ent-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .ent-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .ent-head span { font-size: 13px; color: #94a3b8; }
        
        .btn-primary { padding: 10px 18px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .ent-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        
        .program-section { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .ps-head { display: flex; justify-content: space-between; align-items: center; }
        .day-tabs { display: flex; background: #f1f5f9; padding: 4px; border-radius: 10px; gap: 4px; }
        .d-tab { padding: 6px 14px; border-radius: 8px; border: none; font-size: 11px; font-weight: 700; color: #64748b; cursor: pointer; }
        .d-tab.active { background: white; color: #1e293b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .ps-stats { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .ps-stats strong { color: #3b82f6; }

        .activity-list { display: flex; flex-direction: column; gap: 12px; }
        .act-card { display: flex; align-items: center; gap: 16px; padding: 16px; background: #f8fafc; border-radius: 18px; border: 1.5px solid #f1f5f9; transition: 0.2s; }
        .act-card:hover { border-color: #3b82f6; background: white; transform: translateX(3px); }
        
        .act-time { width: 100px; font-size: 12px; font-weight: 800; color: #3b82f6; display: flex; align-items: center; gap: 6px; }
        .act-info { flex: 1; }
        .act-info strong { display: block; font-size: 14px; color: #1e293b; }
        .act-info span { font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 4px; margin-top: 2px; }
        
        .act-right { text-align: right; }
        .act-users { font-size: 10px; font-weight: 700; color: #64748b; margin-bottom: 4px; }
        .act-btn { background: transparent; border: none; font-size: 11px; font-weight: 700; color: #3b82f6; cursor: pointer; display: flex; align-items: center; gap: 4px; }

        .ent-sidebar { display: flex; flex-direction: column; gap: 20px; }
        .featured-shows { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; }
        .featured-shows h3 { font-size: 14px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }
        
        .show-list { display: flex; flex-direction: column; gap: 12px; }
        .show-card { display: flex; align-items: center; gap: 12px; padding: 12px; background: #f8fafc; border-radius: 12px; }
        .sc-icon { font-size: 20px; width: 36px; height: 36px; background: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .sc-info strong { display: block; font-size: 12px; color: #1e293b; }
        .sc-info span { font-size: 10px; color: #94a3b8; }
        .sc-rsvp { margin-left: auto; padding: 4px 10px; background: #1e293b; color: white; border-radius: 6px; font-size: 9px; font-weight: 700; border: none; cursor: pointer; }

        .kids-club-box { background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 20px; padding: 20px; }
        .kc-head { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .kc-head h3 { font-size: 14px; font-weight: 800; color: #8b5cf6; }
        .kc-stats { display: flex; gap: 20px; margin-bottom: 12px; }
        .ks-i span { display: block; font-size: 10px; color: #7c3aed; font-weight: 600; }
        .ks-i strong { font-size: 18px; color: #5b21b6; }
        .kc-btn { width: 100%; padding: 8px; background: white; border: 1px solid #ddd6fe; color: #8b5cf6; border-radius: 10px; font-size: 11px; font-weight: 700; cursor: pointer; }

        .staff-box h4 { font-size: 12px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 10px; padding-left: 8px; }
        .st-list { display: flex; flex-direction: column; gap: 8px; }
        .st-row { background: white; padding: 10px; border-radius: 12px; border: 1px solid #f1f5f9; display: flex; align-items: center; gap: 10px; }
        .st-av { width: 32px; height: 32px; background: #f8fafc; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; color: #3b82f6; }
        .st-info { flex: 1; }
        .st-info strong { display: block; font-size: 12px; color: #1e293b; }
        .st-info span { font-size: 10px; color: #94a3b8; }
        .st-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; }
      `}</style>
    </div>
  );
};

const Tag = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
);

export default Entertainment;
