import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Lock, FileText, CheckCircle, 
  AlertTriangle, Search, Filter, Trash2, 
  History, Eye, ShieldAlert, Download
} from 'lucide-react';

const KVKK = () => {
  const [search, setSearch] = useState('');

  const logs = [
    { id: 1, guest: 'Ahmet Yılmaz', type: 'Açık Rıza', status: 'onaylı', date: '14 Mart 2026', user: 'resepsiyon_1' },
    { id: 2, guest: 'Sarah Johnson', type: 'Pazarlama İzni', status: 'ret', date: '13 Mart 2026', user: 'resepsiyon_2' },
    { id: 3, guest: 'Klaus Weber', type: 'Açık Rıza', status: 'bekliyor', date: '15 Mart 2026', user: 'admin' },
  ];

  return (
    <div className="kvkk-page">
      <div className="kvkk-head">
        <div>
          <h2><ShieldCheck size={20}/> KVKK & Veri Güvenliği Yönetimi</h2>
          <span>Kişisel verilerin korunması, açık rıza takibi ve yasal uyumluluk</span>
        </div>
        <div className="head-stats">
          <div className="hs-i green">Uyumluluk: %98</div>
          <button className="btn-primary">Yeni Form Oluştur</button>
        </div>
      </div>

      <div className="kvkk-grid">
        {/* Sol: Rıza Listesi */}
        <div className="kvkk-main">
          <div className="kvkk-card">
            <div className="kc-head">
              <h3>Misafir Onay Durumları</h3>
              <div className="search-bar">
                <Search size={14} color="#94a3b8"/>
                <input placeholder="Misafir ara..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>

            <div className="log-list">
              <div className="ll-head">
                <span>Misafir</span>
                <span>İşlem Türü</span>
                <span>Tarih</span>
                <span>Durum</span>
                <span>İşlem</span>
              </div>
              {logs.map((l, i) => (
                <motion.div key={l.id} className="ll-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <div className="ll-guest"><strong>{l.guest}</strong><span>İşleyen: {l.user}</span></div>
                  <div className="ll-type">{l.type}</div>
                  <div className="ll-date">{l.date}</div>
                  <div className={`ll-status ${l.status}`}>{l.status === 'onaylı' ? 'Onaylandı' : l.status === 'ret' ? 'Reddedildi' : 'Bekliyor'}</div>
                  <div className="ll-actions">
                    <button className="a-btn"><Eye size={14}/></button>
                    <button className="a-btn"><Download size={14}/></button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ: Kurallar & Uyarılar */}
        <div className="kvkk-sidebar">
          <div className="policy-box">
            <h3>Veri Saklama Politikası</h3>
            <div className="p-list">
              <div className="p-i">
                <Clock size={16} color="#3b82f6"/>
                <div><strong>Üye Verileri</strong><span>5 Yıl Saklanır</span></div>
              </div>
              <div className="p-i">
                <Clock size={16} color="#3b82f6"/>
                <div><strong>Log Kayıtları</strong><span>2 Yıl Saklanır</span></div>
              </div>
              <div className="p-i warning">
                <Trash2 size={16} color="#ef4444"/>
                <div><strong>Silinme Bekleyen</strong><span className="red">142 Kayıt</span></div>
              </div>
            </div>
            <button className="cleanup-btn">Veri İmhasını Başlat</button>
          </div>

          <div className="compliance-box">
            <div className="cb-head">
              <ShieldAlert size={20} color="#f59e0b"/>
              <strong>Güvenlik Denetimi</strong>
            </div>
            <p>Son 24 saat içinde 12 yeni misafir için açık rıza formu eksik. Resepsiyon uyarılmalı.</p>
          </div>
        </div>
      </div>

      <style>{`
        .kvkk-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .kvkk-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .kvkk-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .kvkk-head span { font-size: 13px; color: #94a3b8; }
        
        .head-stats { display: flex; align-items: center; gap: 16px; }
        .hs-i { padding: 8px 16px; border-radius: 20px; font-size: 11px; font-weight: 800; border: 1px solid #e2e8f0; }
        .hs-i.green { background: #f0fdf4; color: #10b981; border-color: #dcfce7; }
        .btn-primary { padding: 10px 18px; border-radius: 12px; border: none; background: #1e293b; color: white; font-weight: 700; font-size: 13px; cursor: pointer; }

        .kvkk-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        .kvkk-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .kc-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .kc-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        
        .search-bar { background: #f8fafc; border: 1.5px solid #f1f5f9; border-radius: 10px; padding: 6px 12px; display: flex; align-items: center; gap: 8px; width: 220px; }
        .search-bar input { border: none; background: transparent; outline: none; font-size: 12px; width: 100%; }

        .ll-head { display: grid; grid-template-columns: 1.5fr 1fr 100px 120px 80px; padding: 12px; font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; border-bottom: 2px solid #f8fafc; }
        .ll-row { display: grid; grid-template-columns: 1.5fr 1fr 100px 120px 80px; padding: 16px 12px; align-items: center; border-bottom: 1px solid #f8fafc; }
        .ll-guest strong { display: block; font-size: 14px; color: #1e293b; }
        .ll-guest span { font-size: 10px; color: #94a3b8; }
        .ll-type { font-size: 12px; font-weight: 600; color: #475569; }
        .ll-date { font-size: 12px; color: #64748b; }
        .ll-status { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-align: center; }
        .ll-status.onaylı { background: #f0fdf4; color: #10b981; }
        .ll-status.ret { background: #fef2f2; color: #ef4444; }
        .ll-status.bekliyor { background: #fff7ed; color: #f59e0b; }
        .ll-actions { display: flex; gap: 8px; }
        .a-btn { background: transparent; border: none; color: #cbd5e1; cursor: pointer; }

        .kvkk-sidebar { display: flex; flex-direction: column; gap: 20px; }
        .policy-box { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .policy-box h3 { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        .p-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }
        .p-i { display: flex; gap: 12px; align-items: center; }
        .p-i strong { display: block; font-size: 13px; color: #1e293b; }
        .p-i span { font-size: 11px; color: #94a3b8; }
        .p-i .red { color: #ef4444; font-weight: 700; }
        .cleanup-btn { width: 100%; padding: 10px; background: #1e293b; color: white; border: none; border-radius: 12px; font-size: 12px; font-weight: 700; cursor: pointer; }

        .compliance-box { background: #fffbeb; border: 1px solid #fde68a; border-radius: 20px; padding: 20px; }
        .cb-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .cb-head strong { font-size: 14px; color: #92400e; }
        .compliance-box p { font-size: 12px; color: #b45309; line-height: 1.5; margin: 0; }
      `}</style>
    </div>
  );
};

export default KVKK;
