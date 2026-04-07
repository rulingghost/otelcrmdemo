import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Search, Building, TrendingUp, X, Plus, Trash2,
  MapPin, CheckCircle, ArrowRight, Activity,
  Filter, Calendar, Users, Briefcase, RefreshCw,
  Share2, Zap, LayoutGrid
} from 'lucide-react';

const HOTELS_DATA = [
  { id: 'HTL-01', name: 'Grand Hotel Istanbul', city: 'Istanbul', type: 'City', capacity: 320 },
  { id: 'HTL-02', name: 'Antalya Resort & Spa', city: 'Antalya', type: 'Resort', capacity: 550 },
  { id: 'HTL-03', name: 'Boutique Hotel Izmir', city: 'Izmir', type: 'Boutique', capacity: 60 },
  { id: 'HTL-04', name: 'Alpine Lodge Erzurum', city: 'Erzurum', type: 'Mountain', capacity: 120 },
  { id: 'HTL-05', name: 'Bodrum Premium Sands', city: 'Muğla', type: 'Resort', capacity: 420 },
];

const CRS = () => {
  const { addNotification } = useHotel();
  const [search, setSearch] = useState('');
  const [showLogForm, setShowLogForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [hotels, setHotels] = useState(
    HOTELS_DATA.map(h => ({
      ...h,
      occupancy: 60 + Math.floor(Math.random() * 35),
      availability: Math.floor(Math.random() * 40),
      rate: 2000 + Math.floor(Math.random() * 4000)
    }))
  );

  const [logs, setLogs] = useState([
    { id: 'CRS-441', action: 'Rezervasyon Transferi', from: 'Antalya', to: 'Istanbul', guest: 'Ahmet Yılmaz', status: 'success' },
    { id: 'CRS-440', action: 'Grup Blokaj Paylaşımı', from: 'HQ', to: 'All Hotels', guest: 'Tech-A Group', status: 'success' },
    { id: 'CRS-439', action: 'Müsaitlik Senkronizasyonu', from: 'Channel', to: 'CRS Hub', guest: 'Sistem', status: 'success' },
  ]);

  const [logForm, setLogForm] = useState({ action:'Müsaitlik Senkronizasyonu', from:'Channel', to:'CRS Hub', guest:'Sistem' });
  const idCounter = React.useRef(441);

  const addLog = (e) => {
    e.preventDefault();
    idCounter.current++;
    const id = `CRS-${idCounter.current}`;
    setLogs(p => [{ ...logForm, id, status:'success' }, ...p]);
    addNotification({ type:'success', msg:'Yeni işlem kaydı eklendi' });
    setLogForm({ action:'Müsaitlik Senkronizasyonu', from:'Channel', to:'CRS Hub', guest:'Sistem' });
    setShowLogForm(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setHotels(p => p.map(h => ({
        ...h,
        occupancy: 60 + Math.floor(Math.random() * 35),
        availability: Math.floor(Math.random() * 40)
      })));
      setRefreshing(false);
      addNotification({ type:'info', msg:'Tüm otel müsaitlikleri senkronize edildi' });
      idCounter.current++;
      setLogs(p => [{ id: `CRS-${idCounter.current}`, action: 'Manuel Senkronizasyon', from: 'Admin', to: 'All Hotels', guest: 'Sistem', status: 'success' }, ...p]);
    }, 1500);
  };

  const makeReservation = (hotelName) => {
    addNotification({ type:'success', msg:`${hotelName} üzerinden çapraz rezervasyon ekranına yönlendiriliyorsunuz...` });
  };

  const deleteLog = (id) => {
    setLogs(p => p.filter(l => l.id !== id));
  };

  const filteredHotels = hotels.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.city.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="crs-page">
      <div className="crs-head">
        <div>
          <h2><Globe size={20}/> Merkezi Rezervasyon Sistemi (CRS)</h2>
          <span>Zincir oteller arası çapraz rezervasyon ve merkezi müsaitlik takibi</span>
        </div>
        <div className="head-actions">
          <button className="btn-secondary" onClick={()=>setShowLogForm(true)}><Plus size={14}/> Manuel İşlem Ekle</button>
          <button className={`btn-primary ${refreshing?'spin':''}`} onClick={handleRefresh}>
            <RefreshCw size={14}/> {refreshing ? 'Güncelleniyor...' : 'Hızlı Müsaitlik Sorgula'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showLogForm && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowLogForm(false)}>
            <motion.form className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()} onSubmit={addLog}>
              <div className="mb-head"><h3>Manuel CRS İşlemi</h3><button type="button" onClick={()=>setShowLogForm(false)}><X size={18}/></button></div>
              <div className="mf-grid">
                <div className="mf"><label>İşlem Türü</label><input value={logForm.action} onChange={e=>setLogForm(p=>({...p,action:e.target.value}))} required/></div>
                <div className="mf"><label>Misafir / Kaynak</label><input value={logForm.guest} onChange={e=>setLogForm(p=>({...p,guest:e.target.value}))} required/></div>
                <div className="mf"><label>Nereden</label><input value={logForm.from} onChange={e=>setLogForm(p=>({...p,from:e.target.value}))} required/></div>
                <div className="mf"><label>Nereye</label><input value={logForm.to} onChange={e=>setLogForm(p=>({...p,to:e.target.value}))} required/></div>
              </div>
              <div className="mf-foot"><button type="submit" className="btn-primary">İşlemi Kaydet</button></div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="crs-search-bar">
        <div className="search-box">
          <Search size={18} color="#94a3b8"/>
          <input 
            placeholder="Otel adı veya şehir ara..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="search-filters">
          <div className="sf-item"><Calendar size={14}/> 15 Mar - 20 Mar</div>
          <div className="sf-item"><Users size={14}/> 2 Yetişkin</div>
          <button className="btn-go" onClick={handleRefresh}><Zap size={14}/> Sorgula</button>
        </div>
      </div>

      <div className="crs-grid">
        {filteredHotels.map((h, i) => (
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
                <span><MapPin size={12}/> {h.city} · Kp: {h.capacity}</span>
              </div>
            </div>

            <div className="hcc-stats">
              <div className="hccs">
                <span>Doluluk</span>
                <div className="hccs-val">
                  <strong>%{h.occupancy}</strong>
                  <div className="hccs-bar-bg"><div className="hccs-bar" style={{ width: `${h.occupancy}%`, background: h.occupancy > 90 ? '#ef4444' : h.occupancy > 70 ? '#f59e0b' : '#10b981' }}/></div>
                </div>
              </div>
              <div className="hccs">
                <span>Müsait Oda</span>
                <strong className={`hccs-big ${h.availability < 5 ? 'critical' : ''}`}>{h.availability}</strong>
              </div>
            </div>

            <div className="hcc-bottom">
              <div className="hcc-price">
                <span>Başlayan Fiyat</span>
                <strong>₺{h.rate.toLocaleString()}</strong>
              </div>
              <button className="btn-res" onClick={()=>makeReservation(h.name)}>Rezervasyon Yap <ArrowRight size={14}/></button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="crs-footer">
        <h3>Son Merkezi İşlemler</h3>
        <div className="crs-log">
          {logs.map(log => (
            <div key={log.id} className="log-row">
              <span className="log-id">#{log.id}</span>
              <span className="log-act">{log.action}</span>
              <div className="log-path">{log.from} <ArrowRight size={10}/> {log.to}</div>
              <span className="log-guest">{log.guest}</span>
              <div className="log-status"><CheckCircle size={14} color="#10b981"/> Başarılı</div>
              <button className="log-del" onClick={()=>deleteLog(log.id)}><Trash2 size={12}/></button>
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
        .btn-secondary { padding: 10px 18px; border-radius: 12px; border: 1.5px solid #e2e8f0; background: white; color: #475569; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
        .btn-secondary:hover { background: #f8fafc; border-color: #cbd5e1; }
        .btn-primary { padding: 10px 18px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .spin svg { animation: spin 1s linear infinite; }
        @keyframes spin { from {transform: rotate(0deg)} to {transform: rotate(360deg)} }

        .crs-search-bar { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 16px; display: flex; gap: 16px; align-items: center; }
        .search-box { flex: 1; display: flex; align-items: center; gap: 12px; background: #f8fafc; border-radius: 12px; padding: 10px 16px; }
        .search-box input { border: none; background: transparent; outline: none; font-size: 14px; width: 100%; color: #1e293b; }
        
        .search-filters { display: flex; gap: 8px; align-items: center; }
        .sf-item { background: #f1f5f9; padding: 8px 14px; border-radius: 10px; font-size: 12px; font-weight: 700; color: #475569; display: flex; align-items: center; gap: 8px; }
        .btn-go { background: #1e293b; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 800; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .crs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
        .hotel-crs-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; position: relative; overflow: hidden; transition: 0.3s; }
        .hotel-crs-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.05); border-color: #3b82f6; }
        
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
        .hccs-val strong { font-size: 14px; color: #1e293b; width: 40px; }
        .hccs-bar-bg { flex: 1; height: 5px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
        .hccs-bar { height: 100%; border-radius: 4px; transition: 0.5s; }
        .hccs-big { font-size: 20px; font-weight: 900; color: #1e293b; }
        .hccs-big.critical { color: #ef4444; }

        .hcc-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid #f1f5f9; }
        .hcc-price span { display: block; font-size: 10px; color: #94a3b8; font-weight: 600; }
        .hcc-price strong { font-size: 18px; font-weight: 900; color: #1e293b; }
        .btn-res { background: transparent; border: 1.5px solid #1e293b; color: #1e293b; padding: 8px 14px; border-radius: 10px; font-size: 11px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
        .btn-res:hover { background: #1e293b; color: white; }

        .crs-footer { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .crs-footer h3 { font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        .crs-log { display: flex; flex-direction: column; }
        .log-row { display: grid; grid-template-columns: 80px 180px 180px 1fr 100px 30px; padding: 12px 16px; border-bottom: 1px solid #f8fafc; align-items: center; font-size: 12px; }
        .log-id { font-family: monospace; font-weight: 800; color: #3b82f6; }
        .log-act { font-weight: 700; color: #1e293b; }
        .log-path { font-size: 11px; color: #64748b; font-weight: 600; display: flex; align-items: center; gap: 8px; }
        .log-guest { font-weight: 600; color: #475569; }
        .log-status { display: flex; align-items: center; gap: 6px; font-weight: 800; color: #10b981; }
        .log-del { background: transparent; border: none; color: #cbd5e1; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .log-del:hover { color: #ef4444; }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-box { background: white; border-radius: 20px; width: 440px; padding: 24px; }
        .mb-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .mb-head h3 { font-size: 17px; font-weight: 800; color: #1e293b; }
        .mb-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .mf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .mf { display: flex; flex-direction: column; gap: 6px; }
        .mf label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
        .mf input { padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; outline: none; }
        .mf-foot { display: flex; justify-content: flex-end; margin-top: 16px; }
      `}</style>
    </div>
  );
};

export default CRS;
