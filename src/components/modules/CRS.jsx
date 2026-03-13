import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Search, Building, TrendingUp, 
  MapPin, CheckCircle, ArrowRight,
  Filter, Calendar, Users, Briefcase,
  Share2, Zap, LayoutGrid
} from 'lucide-react';

const CRS = () => {
  const [search, setSearch] = useState('');

  const hotels = [
    { id: 1, name: 'Grand Hotel Istanbul', city: 'Istanbul', occupancy: 92, availability: 12, rate: '₺4,200', type: 'City' },
    { id: 2, name: 'Antalya Resort & Spa', city: 'Antalya', occupancy: 85, availability: 45, rate: '₺3,800', type: 'Resort' },
    { id: 3, name: 'Boutique Hotel Izmir', city: 'Izmir', occupancy: 74, availability: 18, rate: '₺2,900', type: 'Boutique' },
    { id: 4, name: 'Alpine Lodge Erzurum', city: 'Erzurum', occupancy: 98, availability: 2, rate: '₺5,400', type: 'Mountain' },
  ];

  return (
    <div className="crs-page">
      <div className="crs-head">
        <div>
          <h2><Globe size={20}/> Merkezi Rezervasyon Sistemi (CRS)</h2>
          <span>Zincir oteller arası çapraz rezervasyon ve merkezi müsaitlik takibi</span>
        </div>
        <div className="head-actions">
          <button className="btn-secondary"><Share2 size={14}/> Bağlantıları Yönet</button>
          <button className="btn-primary">Hızlı Müsaitlik Sorgula</button>
        </div>
      </div>

      <div className="crs-search-bar">
        <div className="search-box">
          <Search size={18} color="#94a3b8"/>
          <input 
            placeholder="Tüm otellerde misafir adı veya rezervasyon no ara..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="search-filters">
          <div className="sf-item"><Calendar size={14}/> 15 Mar - 20 Mar</div>
          <div className="sf-item"><Users size={14}/> 2 Yetişkin</div>
          <button className="btn-go"><Zap size={14}/> Sorgula</button>
        </div>
      </div>

      <div className="crs-grid">
        {hotels.map((h, i) => (
          <motion.div 
            key={h.id} 
            className="hotel-crs-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={`hcc-type ${h.type.toLowerCase()}`}>{h.type}</div>
            <div className="hcc-head">
              <div className="hcc-icon"><Building size={24}/></div>
              <div className="hcc-info">
                <strong>{h.name}</strong>
                <span><MapPin size={12}/> {h.city}</span>
              </div>
            </div>

            <div className="hcc-stats">
              <div className="hccs">
                <span>Doluluk</span>
                <div className="hccs-val">
                  <strong>%{h.occupancy}</strong>
                  <div className="hccs-bar-bg"><div className="hccs-bar" style={{ width: `${h.occupancy}%`, background: h.occupancy > 90 ? '#ef4444' : '#10b981' }}/></div>
                </div>
              </div>
              <div className="hccs">
                <span>Müsait Oda</span>
                <strong className="hccs-big">{h.availability}</strong>
              </div>
            </div>

            <div className="hcc-bottom">
              <div className="hcc-price">
                <span>Başlayan Fiyat</span>
                <strong>{h.rate}</strong>
              </div>
              <button className="btn-res">Rezervasyon Yap <ArrowRight size={14}/></button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="crs-footer">
        <h3>Son Merkezi İşlemler</h3>
        <div className="crs-log">
          {[
            { id: 'CRS-441', action: 'Rezervasyon Transferi', from: 'Antalya', to: 'Istanbul', guest: 'Ahmet Yılmaz', status: 'success' },
            { id: 'CRS-440', action: 'Grup Blokaj Paylaşımı', from: 'HQ', to: 'All Hotels', guest: 'Tech-A Group', status: 'success' },
            { id: 'CRS-439', action: 'Müsaitlik Senkronizasyonu', from: 'Channel', to: 'CRS Hub', guest: 'System', status: 'success' },
          ].map(log => (
            <div key={log.id} className="log-row">
              <span className="log-id">#{log.id}</span>
              <span className="log-act">{log.action}</span>
              <div className="log-path">{log.from} <ArrowRight size={10}/> {log.to}</div>
              <span className="log-guest">{log.guest}</span>
              <div className="log-status"><CheckCircle size={14} color="#10b981"/> Başarılı</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .crs-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .crs-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .crs-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .crs-head span { font-size: 13px; color: #94a3b8; }
        
        .head-actions { display: flex; gap: 10px; }
        .btn-secondary { padding: 10px 18px; border-radius: 12px; border: 1.5px solid #e2e8f0; background: white; color: #475569; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .btn-primary { padding: 10px 18px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-weight: 700; font-size: 13px; cursor: pointer; }

        .crs-search-bar { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 16px; display: flex; gap: 16px; align-items: center; }
        .search-box { flex: 1; display: flex; align-items: center; gap: 12px; background: #f8fafc; border-radius: 12px; padding: 10px 16px; }
        .search-box input { border: none; background: transparent; outline: none; font-size: 14px; width: 100%; color: #1e293b; }
        
        .search-filters { display: flex; gap: 8px; align-items: center; }
        .sf-item { background: #f1f5f9; padding: 8px 14px; border-radius: 10px; font-size: 12px; font-weight: 700; color: #475569; display: flex; align-items: center; gap: 8px; }
        .btn-go { background: #1e293b; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 800; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .crs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
        .hotel-crs-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; position: relative; overflow: hidden; transition: 0.3s; }
        .hotel-crs-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.05); }
        
        .hcc-type { position: absolute; top: 0; right: 0; background: #f1f5f9; padding: 4px 14px; border-bottom-left-radius: 14px; font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; }
        .hotel-crs-card.city .hcc-type { background: #eff6ff; color: #3b82f6; }
        
        .hcc-head { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
        .hcc-icon { width: 52px; height: 52px; background: #f8fafc; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #3b82f6; border: 1px solid #f1f5f9; }
        .hcc-info strong { display: block; font-size: 16px; color: #1e293b; margin-bottom: 2px; }
        .hcc-info span { font-size: 12px; color: #94a3b8; display: flex; align-items: center; gap: 4px; }

        .hcc-stats { display: flex; gap: 24px; margin-bottom: 24px; padding: 16px; background: #f8fafc; border-radius: 16px; }
        .hccs { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .hccs span { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .hccs-val { display: flex; align-items: center; gap: 8px; }
        .hccs-val strong { font-size: 14px; color: #1e293b; }
        .hccs-bar-bg { flex: 1; height: 5px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
        .hccs-bar { height: 100%; border-radius: 4px; }
        .hccs-big { font-size: 20px; font-weight: 900; color: #1e293b; }

        .hcc-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid #f1f5f9; }
        .hcc-price span { display: block; font-size: 10px; color: #94a3b8; font-weight: 600; }
        .hcc-price strong { font-size: 18px; font-weight: 900; color: #1e293b; }
        .btn-res { background: transparent; border: 1.5px solid #1e293b; color: #1e293b; padding: 8px 14px; border-radius: 10px; font-size: 11px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
        .btn-res:hover { background: #1e293b; color: white; }

        .crs-footer { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .crs-footer h3 { font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        .crs-log { display: flex; flex-direction: column; }
        .log-row { display: grid; grid-template-columns: 80px 180px 150px 1fr 120px; padding: 12px 16px; border-bottom: 1px solid #f8fafc; align-items: center; font-size: 12px; }
        .log-id { font-family: monospace; font-weight: 800; color: #3b82f6; }
        .log-act { font-weight: 700; color: #1e293b; }
        .log-path { font-size: 11px; color: #64748b; font-weight: 600; display: flex; align-items: center; gap: 8px; }
        .log-guest { font-weight: 600; color: #475569; }
        .log-status { display: flex; align-items: center; gap: 6px; font-weight: 800; color: #10b981; }
      `}</style>
    </div>
  );
};

export default CRS;
