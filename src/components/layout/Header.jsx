import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Bell, LogOut, Search, X, CheckCircle, AlertCircle, Activity, LayoutGrid, Users, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { modulesConfig } from '../../data/moduleList';
import Fuse from 'fuse.js';

const Header = ({ user, activeModuleName, onLogout, onBack, onSelectModule }) => {
  const { notifications, stats, guests, reservations } = useHotel();
  const [showNotifs, setShowNotifs] = useState(false);
  const [search, setSearch] = useState('');

  const unread = notifications.filter(n => n.type === 'warn').length;

  // AI Intent Haritalaması (Doğal Dil İşleme Moku)
  const AI_INTENTS = useMemo(() => [
    { id: '1', intent: "giriş yapmak istiyorum, yeni check-in, misafir geldi, odaya alma", route: "front-office", label: "Ön Büro" },
    { id: '2', intent: "çıkış yapmak istiyorum, check-out, hesabı kapatmak, fatura kesme, ayrılış", route: "checkout", label: "Hızlı Check-out" },
    { id: '3', intent: "yeni rezervasyon aç, telefonla kayıt, fiyat sorma, müşteri aradı, oda ayır", route: "new-reservation", label: "Yeni Rezervasyon" },
    { id: '4', intent: "oda temizliği, temizlik durumu, kirli odalar, çarşaf değişimi, housekeeping, oda pis", route: "housekeeping", label: "Kat Hizmetleri" },
    { id: '5', intent: "bozuk, arızalı, klima çalışmıyor, tv bozuk, tamir, bakım, teknik servis çağır", route: "tech-service", label: "Teknik Servis" },
    { id: '6', intent: "gelir durumu, ciro, ne kadar kazandık, kar, gün sonu raporu, özet tablo, finansal durum", route: "dashboard", label: "Yönetici Paneli" },
    { id: '7', intent: "kimlik bildirimi, jandarma bildirimi, polis kaydı, kbs gönder, misafir kaydı devlete", route: "kbs", label: "Polis Listesi (KBS)" },
    { id: '8', intent: "adisyon, yemek siparişi, restoran ödemesi, içecek sipariş, pos sistemi", route: "pos", label: "Restoran POS" },
    { id: '9', intent: "personel maaşı, çalışan izinleri, işçi kayıt, izin kullanma", route: "hr", label: "Personel (HR)" },
    { id: '10', intent: "stok bitti, depo sayım, ürün sipariş, malzeme kalmadı", route: "stock", label: "Stok & Depo" },
  ], []);

  // Arama mantığı - Fuse.js ile Bulanık (Fuzzy) Arama
  const searchResults = useMemo(() => {
    if (!search || search.length < 2) return null;

    // AI Intent Araması
    const intentFuse = new Fuse(AI_INTENTS, { keys: ['intent'], threshold: 0.3 });
    const foundIntents = intentFuse.search(search).map(r => r.item);

    // Modüller için bulanık arama
    const modulesFuse = new Fuse(modulesConfig, { keys: ['name', 'id'], threshold: 0.4 });
    const foundModules = modulesFuse.search(search).map(r => r.item);

    // Misafirler için bulanık arama
    const allGuests = guests || []; 
    const guestsFuse = new Fuse(allGuests, { keys: ['name', 'phone', 'email'], threshold: 0.4 });
    const foundGuests = guestsFuse.search(search).map(r => r.item);

    return { intents: foundIntents, modules: foundModules, guests: foundGuests };
  }, [search, guests, reservations]);

  const handleSelectModule = (id) => {
    if (onSelectModule) onSelectModule(id);
    setSearch('');
  };

  const handleSelectGuest = (guestId) => {
    // Misafiri seçince CRM veya Front Office'e yönlendirebiliriz.
    // Şimdilik CRM'e yönlendiriyoruz
    if (onSelectModule) onSelectModule('crm');
    setSearch('');
  };

  return (
    <header className="hub-header">
      <div className="header-left">
        {onBack && (
          <button className="back-btn" onClick={onBack}>
            ← <span>Hub</span>
          </button>
        )}
        <div className="app-branding">
          <h2>{activeModuleName || 'Hotel ERP — Operasyon Merkezi'}</h2>
          {!activeModuleName && <span>Tüm modüller erişilebilir</span>}
        </div>
      </div>

      <div className="header-right">
        {!activeModuleName && (
          <div className="quick-stats">
            <div className="qs-pill blue">%{stats.occupancyRate} Doluluk</div>
            <div className="qs-pill green">{stats.inHouse} İç Misafir</div>
            {stats.totalBalance > 0 && <div className="qs-pill red">₺{(stats.totalBalance/1000).toFixed(1)}K Bakiye</div>}
          </div>
        )}

        {/* Global Search */}
        <div className="search-wrapper">
          <div className={`search-bar ai-mode ${search ? 'focused' : ''}`}>
            <Sparkles size={16} color="#8b5cf6" className="ai-icon-pulse"/>
            <input
              type="text"
              placeholder="Ne yapmak istiyorsunuz? (Örn: 'giriş yap', 'klima bozuk')..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button onClick={() => setSearch('')}><X size={14}/></button>}
          </div>

          <AnimatePresence>
            {searchResults && (searchResults.intents.length > 0 || searchResults.modules.length > 0 || searchResults.guests.length > 0) && (
              <motion.div className="search-dropdown" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}}>
                
                {searchResults.intents.length > 0 && (
                  <div className="sd-section">
                    <h4 style={{ color: '#8b5cf6' }}>🤖 AI İşlem Yönlendirmesi</h4>
                    {searchResults.intents.map(intent => (
                        <button key={intent.id} className="sd-item ai-suggest" onClick={() => handleSelectModule(intent.route)}>
                          <div className="sd-icon" style={{background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', color: 'white'}}><Sparkles size={14}/></div>
                          <div>
                            <span>{intent.label} modülüne git</span>
                            <small>"{search}" niyetinizle eşleşti</small>
                          </div>
                        </button>
                    ))}
                  </div>
                )}

                {searchResults.modules.length > 0 && (
                  <div className="sd-section">
                    <h4>Modüller</h4>
                    {searchResults.modules.map(mod => (
                       <button key={mod.id} className="sd-item" onClick={() => handleSelectModule(mod.id)}>
                         <div className="sd-icon" style={{color: mod.color}}><LayoutGrid size={14}/></div>
                         <span>{mod.name}</span>
                       </button>
                    ))}
                  </div>
                )}
                {searchResults.guests.length > 0 && (
                  <div className="sd-section">
                    <h4>Misafirler</h4>
                    {searchResults.guests.map(guest => (
                      <button key={guest.id} className="sd-item" onClick={() => handleSelectGuest(guest.id)}>
                        <div className="sd-icon" style={{color: '#8b5cf6'}}><Users size={14}/></div>
                        <div>
                          <span>{guest.name}</span>
                          <small>{guest.phone || guest.nationality}</small>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifs */}
        <div className="notif-wrapper">
          <button className="icon-btn" onClick={() => setShowNotifs(!showNotifs)}>
            <Bell size={20}/>
            {unread > 0 && <span className="badge">{unread}</span>}
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                className="notif-panel"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
              >
                <div className="np-head">
                  <strong>Bildirimler</strong>
                  <button onClick={() => setShowNotifs(false)}><X size={16}/></button>
                </div>
                <div className="np-list">
                  {notifications.slice(0, 12).map(n => (
                    <div key={n.id} className={`np-item ${n.type}`}>
                      <div className="np-icon">
                        {n.type === 'success' && <CheckCircle size={14}/>}
                        {n.type === 'warn'    && <AlertCircle size={14}/>}
                        {n.type === 'info'    && <Activity size={14}/>}
                      </div>
                      <div className="np-body">
                        <span>{n.msg}</span>
                        <small>{n.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User */}
        <div className="user-profile">
          <div className="user-info">
            <strong>{user?.username || 'Admin'}</strong>
            <span>Süper Yönetici</span>
          </div>
          <div className="avatar">{(user?.username || 'A')[0].toUpperCase()}</div>
          <button className="logout-btn" onClick={onLogout} title="Çıkış Yap">
            <LogOut size={16}/>
          </button>
        </div>
      </div>

      <style>{`
        .hub-header { height: 66px; background: white; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; position: sticky; top: 0; z-index: 100; gap: 16px; }
        .header-left { display: flex; align-items: center; gap: 16px; min-width: 0; }
        .back-btn { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: white; font-size: 13px; font-weight: 700; color: #475569; cursor: pointer; white-space: nowrap; }
        .back-btn:hover { background: #f1f5f9; }
        .app-branding h2 { font-size: 17px; font-weight: 800; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .app-branding span { font-size: 11px; color: #94a3b8; font-weight: 600; }
        .header-right { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
        .quick-stats { display: flex; gap: 8px; }
        .qs-pill { padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 800; }
        .qs-pill.blue  { background: #eff6ff; color: #3b82f6; }
        .qs-pill.green { background: #f0fdf4; color: #10b981; }
        .qs-pill.red   { background: #fef2f2; color: #ef4444; }

        .search-wrapper { position: relative; }
        .search-bar { display: flex; align-items: center; gap: 8px; background: #f8fafc; border: 1.5px solid #e2e8f0; padding: 9px 14px; border-radius: 12px; transition: 0.2s; width: 340px; }
        .search-bar.ai-mode { border-color: rgba(139, 92, 246, 0.3); background: rgba(139, 92, 246, 0.03); }
        .search-bar.ai-mode.focused { border-color: #8b5cf6; background: white; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.15); }
        .search-bar input { border: none; background: transparent; outline: none; font-size: 13px; color: #475569; width: 100%; }
        .search-bar input::placeholder { color: #94a3b8; }
        .search-bar button { background: transparent; border: none; color: #94a3b8; cursor: pointer; display: flex; }
        .ai-icon-pulse { animation: pulseAI 2s infinite; }
        @keyframes pulseAI { 0% { opacity: 0.6; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1.05); } 100% { opacity: 0.6; transform: scale(0.95); } }

        .search-dropdown { position: absolute; top: calc(100% + 10px); left: 0; right: 0; background: white; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); padding: 12px; max-height: 400px; overflow-y: auto; z-index: 300; }
        .sd-section { margin-bottom: 16px; }
        .sd-section:last-child { margin-bottom: 0; }
        .sd-section h4 { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px; padding-left: 8px; }
        .sd-item { width: 100%; display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: none; background: transparent; border-radius: 10px; cursor: pointer; text-align: left; transition: 0.2s; }
        .sd-item:hover { background: #f8fafc; }
        .sd-icon { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 8px; background: #f1f5f9; }
        .sd-item span { font-size: 13px; font-weight: 600; color: #1e293b; display: block; }
        .sd-item small { font-size: 11px; color: #64748b; margin-top: 2px; display: block; }

        .notif-wrapper { position: relative; }
        .icon-btn { position: relative; background: #f8fafc; border: 1.5px solid #e2e8f0; color: #64748b; cursor: pointer; width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .icon-btn:hover { background: #f1f5f9; }
        .badge { position: absolute; top: -5px; right: -5px; background: #ef4444; color: white; font-size: 10px; font-weight: 900; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; }
        .notif-panel { position: absolute; top: 50px; right: 0; width: 340px; background: white; border-radius: 20px; border: 1px solid #e2e8f0; box-shadow: 0 20px 40px rgba(0,0,0,0.15); z-index: 200; overflow: hidden; }
        .np-head { padding: 16px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
        .np-head strong { font-size: 15px; font-weight: 800; color: #1e293b; }
        .np-head button { background: transparent; border: none; color: #94a3b8; cursor: pointer; }
        .np-list { max-height: 360px; overflow-y: auto; padding: 8px; }
        .np-item { display: flex; align-items: flex-start; gap: 10px; padding: 11px 12px; border-radius: 12px; margin-bottom: 4px; }
        .np-item.success { background: #f0fdf4; }
        .np-item.warn { background: #fffbeb; }
        .np-item.info { background: #eff6ff; }
        .np-icon { margin-top: 2px; flex-shrink: 0; }
        .np-item.success .np-icon { color: #10b981; }
        .np-item.warn .np-icon { color: #f59e0b; }
        .np-item.info .np-icon { color: #3b82f6; }
        .np-body span { font-size: 12px; font-weight: 600; color: #1e293b; display: block; }
        .np-body small { font-size: 10px; color: #94a3b8; }

        .user-profile { display: flex; align-items: center; gap: 10px; }
        .user-info { text-align: right; }
        .user-info strong { display: block; font-size: 13px; font-weight: 700; color: #1e293b; }
        .user-info span { font-size: 11px; color: #94a3b8; }
        .avatar { width: 36px; height: 36px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 15px; }
        .logout-btn { background: #fef2f2; border: none; color: #ef4444; cursor: pointer; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .logout-btn:hover { background: #fee2e2; }
      `}</style>
    </header>
  );
};

export default Header;
