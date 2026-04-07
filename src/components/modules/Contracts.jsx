import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Plus, Search, Filter, X,
  Download, Eye, Calendar, Clock,
  CheckCircle, AlertCircle, Building2, User, Trash2, Edit2
} from 'lucide-react';

const TYPES = ['OTA','Acenta','Kurumsal','Tedarikçi','Diğer'];
const STATUS_MAP = {
  aktif:          { label:'Aktif', color:'#10b981', bg:'#f0fdf4' },
  incelemede:     { label:'İncelemede', color:'#f59e0b', bg:'#fffbeb' },
  süresi_doluyor: { label:'Süresi Doluyor', color:'#ef4444', bg:'#fef2f2' },
  sona_erdi:      { label:'Sona Erdi', color:'#64748b', bg:'#f1f5f9' },
};

const Contracts = () => {
  const { addNotification } = useHotel();
  const [activeTab, setActiveTab] = useState('tümü');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [detail, setDetail] = useState(null);

  const [contracts, setContracts] = useState([
    { id: 'CNT-001', name: 'Booking.com Global', partner: 'Booking.com', type: 'OTA', startDate: '2024-01-01', endDate: '2026-12-31', status: 'aktif', price: '%15 Komisyon', notes: 'Global anlaşma, yıllık yenileme' },
    { id: 'CNT-002', name: 'Acenta X Tatil Paketi', partner: 'Acenta X', type: 'Acenta', startDate: '2026-03-01', endDate: '2026-08-31', status: 'aktif', price: '₺1.450 Sabit', notes: 'Yaz sezonu özel fiyat' },
    { id: 'CNT-003', name: 'Kurumsal Konaklama - Tech-A', partner: 'Tech-A Corp', type: 'Kurumsal', startDate: '2026-02-01', endDate: '2027-02-01', status: 'incelemede', price: '₺2.100 Sabit', notes: 'Hukuk incelemesi devam ediyor' },
    { id: 'CNT-004', name: 'Gıda Tedarik Sözleşmesi', partner: 'Metro Market', type: 'Tedarikçi', startDate: '2026-01-01', endDate: '2026-04-01', status: 'süresi_doluyor', price: 'Liste -%10', notes: '3 ay içinde yenilenmeli' },
    { id: 'CNT-005', name: 'Expedia Preferred', partner: 'Expedia', type: 'OTA', startDate: '2025-06-01', endDate: '2026-06-01', status: 'aktif', price: '%18 Komisyon', notes: 'Preferred Partner statüsü' },
    { id: 'CNT-006', name: 'TUI Grup Sözleşme', partner: 'TUI', type: 'Acenta', startDate: '2026-04-01', endDate: '2026-10-31', status: 'incelemede', price: '₺1.200/oda', notes: 'Yaz grubu allotment — 20 oda/gün' },
  ]);

  const [form, setForm] = useState({ name:'', partner:'', type:TYPES[0], startDate:'', endDate:'', price:'', notes:'' });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const idCounter = React.useRef(6);

  const submit = (e) => {
    e.preventDefault();
    idCounter.current++;
    const id = `CNT-${String(idCounter.current).padStart(3,'0')}`;
    setContracts(p => [{ ...form, id, status:'incelemede' }, ...p]);
    addNotification({ type:'info', msg:`Yeni sözleşme kaydedildi: ${form.name}` });
    setForm({ name:'', partner:'', type:TYPES[0], startDate:'', endDate:'', price:'', notes:'' });
    setShowForm(false);
  };

  const updateStatus = (id, status) => {
    setContracts(p => p.map(c => c.id === id ? { ...c, status } : c));
    const cnt = contracts.find(c => c.id === id);
    addNotification({ type: status === 'aktif' ? 'success' : 'info', msg: `Sözleşme durumu güncellendi: ${cnt?.name} → ${STATUS_MAP[status]?.label}` });
  };

  const deleteContract = (id) => {
    if(!confirm('Bu sözleşmeyi silmek istediğinize emin misiniz?')) return;
    setContracts(p => p.filter(c => c.id !== id));
    addNotification({ type:'info', msg:'Sözleşme silindi' });
  };

  const filtered = contracts.filter(c => {
    if (activeTab !== 'tümü' && c.status !== activeTab) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.partner.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = [
    { label: 'Aktif Sözleşme', val: contracts.filter(c=>c.status==='aktif').length, color: '#10b981' },
    { label: 'İnceleme Bekleyen', val: contracts.filter(c=>c.status==='incelemede').length, color: '#f59e0b' },
    { label: 'Süresi Dolanlar', val: contracts.filter(c=>c.status==='süresi_doluyor').length, color: '#ef4444' },
    { label: 'Toplam Sözleşme', val: contracts.length, color: '#3b82f6' },
  ];

  return (
    <div className="cnt-page">
      <div className="cnt-head">
        <div>
          <h2><FileText size={20}/> Sözleşme & Kontrat Yönetimi</h2>
          <span>Acenta, kurumsal ve tedarikçi kontratları, PDF arşiv ve fiyat anlaşmaları</span>
        </div>
        <button className="btn-primary" onClick={()=>setShowForm(!showForm)}><Plus size={15}/> Yeni Sözleşme Ekle</button>
      </div>

      <div className="cnt-stats">
        {stats.map(s => (
          <div key={s.label} className="s-box">
            <span className="s-label">{s.label}</span>
            <strong style={{ color: s.color }}>{s.val}</strong>
          </div>
        ))}
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form className="cnt-form" onSubmit={submit} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div className="cf-head"><h3>Yeni Sözleşme Oluştur</h3><button type="button" onClick={()=>setShowForm(false)}><X size={18}/></button></div>
            <div className="cf-grid">
              <div className="cf full"><label>Sözleşme Adı *</label><input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Ör: Booking Premium Anlaşması" required/></div>
              <div className="cf"><label>İş Ortağı *</label><input value={form.partner} onChange={e=>set('partner',e.target.value)} placeholder="Şirket adı" required/></div>
              <div className="cf"><label>Tür</label><select value={form.type} onChange={e=>set('type',e.target.value)}>{TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
              <div className="cf"><label>Başlangıç *</label><input type="date" value={form.startDate} onChange={e=>set('startDate',e.target.value)} required/></div>
              <div className="cf"><label>Bitiş *</label><input type="date" value={form.endDate} onChange={e=>set('endDate',e.target.value)} required/></div>
              <div className="cf"><label>Fiyat/Komisyon</label><input value={form.price} onChange={e=>set('price',e.target.value)} placeholder="Ör: %15 veya ₺2.100 Sabit"/></div>
              <div className="cf full"><label>Notlar</label><input value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Ek bilgiler..."/></div>
            </div>
            <div className="cf-foot"><button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>İptal</button><button type="submit" className="btn-primary">Sözleşme Kaydet</button></div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="cnt-main">
        <div className="filters-row">
          <div className="search-wrap">
            <Search size={16} color="#94a3b8"/>
            <input placeholder="Sözleşme veya iş ortağı ara..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <div className="tabs">
            {['tümü', 'aktif', 'incelemede', 'süresi_doluyor'].map(t => (
              <button key={t} className={`t-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                {t === 'tümü' ? 'Tümü' : STATUS_MAP[t]?.label || t}
              </button>
            ))}
          </div>
        </div>

        <div className="cnt-list">
          {filtered.length === 0 && <div style={{textAlign:'center',padding:40,color:'#94a3b8'}}>Sonuç bulunamadı</div>}
          {filtered.map((cnt, i) => {
            const st = STATUS_MAP[cnt.status] || STATUS_MAP.aktif;
            return (
              <motion.div 
                key={cnt.id} 
                className="cnt-row"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="cnt-icon"><FileText size={20}/></div>
                <div className="cnt-info">
                  <strong>{cnt.name}</strong>
                  <span><Building2 size={12}/> {cnt.partner} · <User size={12}/> {cnt.type}</span>
                </div>
                <div className="cnt-period">
                  <Calendar size={13}/>
                  <span>{cnt.startDate} — {cnt.endDate}</span>
                </div>
                <div className="cnt-price"><strong>{cnt.price}</strong></div>
                <span className="cnt-status" style={{background:st.bg,color:st.color}}>{st.label}</span>
                <div className="cnt-actions">
                  <button className="a-btn" onClick={()=>setDetail(cnt)} title="Detay"><Eye size={16}/></button>
                  {cnt.status === 'incelemede' && <button className="a-btn green" onClick={()=>updateStatus(cnt.id,'aktif')} title="Onayla"><CheckCircle size={16}/></button>}
                  {cnt.status === 'süresi_doluyor' && <button className="a-btn blue" onClick={()=>updateStatus(cnt.id,'aktif')} title="Yenile"><Calendar size={16}/></button>}
                  <button className="a-btn red" onClick={()=>deleteContract(cnt.id)} title="Sil"><Trash2 size={16}/></button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detail && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setDetail(null)}>
            <motion.div className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()}>
              <div className="mb-head"><h3>{detail.name}</h3><button onClick={()=>setDetail(null)}><X size={18}/></button></div>
              <div className="detail-grid">
                <div className="dg"><span>Sözleşme ID</span><strong>{detail.id}</strong></div>
                <div className="dg"><span>İş Ortağı</span><strong>{detail.partner}</strong></div>
                <div className="dg"><span>Tür</span><strong>{detail.type}</strong></div>
                <div className="dg"><span>Fiyat</span><strong>{detail.price}</strong></div>
                <div className="dg"><span>Başlangıç</span><strong>{detail.startDate}</strong></div>
                <div className="dg"><span>Bitiş</span><strong>{detail.endDate}</strong></div>
                <div className="dg full"><span>Durum</span><strong style={{color: STATUS_MAP[detail.status]?.color}}>{STATUS_MAP[detail.status]?.label}</strong></div>
              </div>
              {detail.notes && <div className="detail-notes">📝 {detail.notes}</div>}
              <div className="mb-foot">
                {detail.status === 'incelemede' && <button className="btn-primary" onClick={()=>{updateStatus(detail.id,'aktif');setDetail(null);}}>Onayla & Aktifleştir</button>}
                <button className="btn-cancel" onClick={()=>setDetail(null)}>Kapat</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .cnt-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .cnt-head { display: flex; justify-content: space-between; align-items: center; }
        .cnt-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .cnt-head span { font-size: 13px; color: #94a3b8; }
        
        .btn-primary { padding: 12px 20px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .btn-cancel { padding: 10px 18px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; font-weight: 700; cursor: pointer; font-size: 13px; }

        .cnt-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .s-box { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; text-align: center; }
        .s-label { display: block; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px; }
        .s-box strong { font-size: 24px; font-weight: 900; }

        /* Form */
        .cnt-form { background: white; border-radius: 20px; border: 1.5px solid #e2e8f0; padding: 24px; }
        .cf-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .cf-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .cf-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .cf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .cf { display: flex; flex-direction: column; gap: 6px; }
        .cf.full { grid-column: 1 / -1; }
        .cf label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
        .cf input, .cf select { padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; outline: none; }
        .cf input:focus, .cf select:focus { border-color: #3b82f6; }
        .cf-foot { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }

        .cnt-main { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .filters-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; gap: 20px; flex-wrap: wrap; }
        
        .search-wrap { flex: 1; min-width: 200px; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 10px 16px; display: flex; align-items: center; gap: 12px; }
        .search-wrap input { border: none; background: transparent; outline: none; font-size: 13px; color: #475569; width: 100%; }
        
        .tabs { display: flex; background: #f1f5f9; padding: 4px; border-radius: 10px; gap: 4px; }
        .t-btn { padding: 6px 14px; border-radius: 8px; border: none; font-size: 11px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; white-space: nowrap; }
        .t-btn.active { background: white; color: #1e293b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

        .cnt-list { display: flex; flex-direction: column; gap: 10px; }
        .cnt-row { display: grid; grid-template-columns: 44px 1fr 220px 130px 120px 100px; align-items: center; gap: 16px; padding: 16px; border-radius: 16px; border: 1.5px solid #f8fafc; transition: 0.2s; cursor: pointer; }
        .cnt-row:hover { background: #f8fafc; border-color: #3b82f6; }
        
        .cnt-icon { width: 44px; height: 44px; background: #eff6ff; color: #3b82f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .cnt-info strong { display: block; font-size: 14px; color: #1e293b; }
        .cnt-info span { font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 4px; }
        
        .cnt-period { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #64748b; font-weight: 600; }
        .cnt-price strong { font-size: 13px; color: #1e293b; font-weight: 800; }
        
        .cnt-status { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-align: center; display: inline-block; }
        
        .cnt-actions { display: flex; gap: 6px; }
        .a-btn { width: 32px; height: 32px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .a-btn:hover { border-color: #3b82f6; color: #3b82f6; }
        .a-btn.green { color: #10b981; border-color: #bbf7d0; }
        .a-btn.green:hover { background: #f0fdf4; }
        .a-btn.blue { color: #3b82f6; border-color: #bfdbfe; }
        .a-btn.red { color: #ef4444; border-color: #fecaca; }
        .a-btn.red:hover { background: #fef2f2; }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-box { background: white; border-radius: 24px; width: 520px; max-height: 80vh; overflow-y: auto; padding: 28px; }
        .mb-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .mb-head h3 { font-size: 18px; font-weight: 800; color: #1e293b; }
        .mb-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .dg { padding: 12px; background: #f8fafc; border-radius: 12px; }
        .dg.full { grid-column: 1 / -1; }
        .dg span { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 4px; }
        .dg strong { font-size: 14px; color: #1e293b; }
        .detail-notes { padding: 12px; background: #fffbeb; border-radius: 12px; font-size: 13px; color: #92400e; margin-top: 12px; }
        .mb-foot { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
      `}</style>
    </div>
  );
};

export default Contracts;
