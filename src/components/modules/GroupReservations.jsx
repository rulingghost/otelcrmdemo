import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Plus, Search, Calendar, 
  Bed, FileText, ChevronRight, X,
  MoreHorizontal, Download, UserPlus,
  ArrowRight, ShieldCheck, Tag, Trash2, Eye, Edit2, Check
} from 'lucide-react';

const STATUSES = {
  beklemede: { label: 'Teklif / Beklemede', color: '#f59e0b', bg: '#fffbeb' },
  konfirm:   { label: 'Onaylandı', color: '#3b82f6', bg: '#eff6ff' },
  aktif:     { label: 'Check-in Yapıldı', color: '#10b981', bg: '#f0fdf4' },
  tamamlandi:{ label: 'Tamamlandı', color: '#64748b', bg: '#f1f5f9' },
  iptal:     { label: 'İptal', color: '#ef4444', bg: '#fef2f2' },
};

const GroupReservations = () => {
  const { addNotification, rooms } = useHotel();
  const [filter, setFilter] = useState('tümü');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [detail, setDetail] = useState(null);

  const [groups, setGroups] = useState([
    { id: 'GRP-001', name: 'Almanya Tur Grubu', leader: 'Hans Müller', pax: 45, rooms: 22, checkIn: '2026-03-15', checkOut: '2026-03-22', status: 'aktif', total: 145000, paid: 80000, board: 'AI', notes: 'VIP karşılama, özel menü', phone: '+49 151 234 5678' },
    { id: 'GRP-002', name: 'Düğün: Yılmaz & Demir', leader: 'Mehmet Yılmaz', pax: 80, rooms: 40, checkIn: '2026-03-20', checkOut: '2026-03-22', status: 'beklemede', total: 320000, paid: 50000, board: 'AI', notes: 'Salon A — Düğün yemeği dahil', phone: '0532 111 2233' },
    { id: 'GRP-003', name: 'Ziraat Bankası Toplantı', leader: 'Deniz Gök', pax: 15, rooms: 15, checkIn: '2026-03-25', checkOut: '2026-03-27', status: 'konfirm', total: 62500, paid: 62500, board: 'HB', notes: 'Toplantı odası gerekli', phone: '0212 555 4466' },
    { id: 'GRP-004', name: 'Japon Kültür Grubu', leader: 'Yuki Tanaka', pax: 30, rooms: 15, checkIn: '2026-03-28', checkOut: '2026-04-02', status: 'beklemede', total: 187500, paid: 0, board: 'BB', notes: 'Japonce rehber talep edildi', phone: '+81 90 1234 5678' },
  ]);

  const [form, setForm] = useState({ name:'', leader:'', pax:'', rooms:'', checkIn:'', checkOut:'', total:'', board:'HB', notes:'', phone:'' });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const idCounter = React.useRef(4);

  const submit = (e) => {
    e.preventDefault();
    idCounter.current++;
    const id = `GRP-${String(idCounter.current).padStart(3,'0')}`;
    const newGroup = { ...form, id, status:'beklemede', pax:Number(form.pax), rooms:Number(form.rooms), total:Number(form.total), paid:0 };
    setGroups(p => [newGroup, ...p]);
    addNotification({ type:'info', msg:`Yeni grup rezervasyonu: ${form.name} (${form.pax} kişi)` });
    setForm({ name:'', leader:'', pax:'', rooms:'', checkIn:'', checkOut:'', total:'', board:'HB', notes:'', phone:'' });
    setShowForm(false);
  };

  const updateStatus = (id, status) => {
    setGroups(p => p.map(g => g.id === id ? { ...g, status } : g));
    const grp = groups.find(g => g.id === id);
    if (status === 'konfirm') addNotification({ type:'success', msg:`Grup onaylandı: ${grp?.name}` });
    if (status === 'aktif') addNotification({ type:'success', msg:`Grup check-in yapıldı: ${grp?.name}` });
    if (status === 'tamamlandi') addNotification({ type:'info', msg:`Grup tamamlandı: ${grp?.name}` });
    if (status === 'iptal') addNotification({ type:'warn', msg:`Grup iptal edildi: ${grp?.name}` });
  };

  const deleteGroup = (id) => {
    if(!confirm('Bu grup rezervasyonunu silmek istediğinize emin misiniz?')) return;
    setGroups(p => p.filter(g => g.id !== id));
    addNotification({ type:'info', msg:'Grup rezervasyonu silindi' });
  };

  const filtered = groups.filter(g => {
    if (filter !== 'tümü' && g.status !== filter) return false;
    if (search && !g.name.toLowerCase().includes(search.toLowerCase()) && !g.leader.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalRooms = groups.filter(g=>g.status!=='iptal').reduce((s,g)=>s+g.rooms,0);
  const totalRevenue = groups.filter(g=>g.status!=='iptal').reduce((s,g)=>s+g.total,0);
  const activeGroups = groups.filter(g=>g.status==='aktif'||g.status==='konfirm').length;

  return (
    <div className="grp-page">
      <div className="grp-head">
        <div>
          <h2><Users size={20}/> Grup Rezervasyon & Blokaj Yönetimi</h2>
          <span>Grup bazlı konaklama, toplu oda atama ve grup foliosu takibi</span>
        </div>
        <button className="btn-primary" onClick={()=>setShowForm(!showForm)}><Plus size={15}/> Yeni Grup Rezervasyonu</button>
      </div>

      <div className="grp-stats">
        {[
          { label: 'Aktif Gruplar', val: activeGroups, icon: <Users size={18}/> },
          { label: 'Bloke Odalar', val: totalRooms, icon: <Bed size={18}/> },
          { label: 'Toplam Hacim', val: `₺${(totalRevenue/1000).toFixed(0)}K`, icon: <Tag size={18}/> },
        ].map(s => (
          <div key={s.label} className="s-card">
            <div className="sc-icon">{s.icon}</div>
            <div className="sc-info">
              <span>{s.label}</span>
              <strong>{s.val}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Oluşturma Formu */}
      <AnimatePresence>
        {showForm && (
          <motion.form className="grp-form" onSubmit={submit} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div className="gf-head"><h3>Yeni Grup Rezervasyonu</h3><button type="button" onClick={()=>setShowForm(false)}><X size={18}/></button></div>
            <div className="gf-grid">
              <div className="gf full"><label>Grup Adı *</label><input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Ör: Almanya Tur Grubu" required/></div>
              <div className="gf"><label>Grup Lideri *</label><input value={form.leader} onChange={e=>set('leader',e.target.value)} placeholder="Ad Soyad" required/></div>
              <div className="gf"><label>Telefon</label><input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+90 5xx..."/></div>
              <div className="gf"><label>Kişi Sayısı *</label><input type="number" value={form.pax} onChange={e=>set('pax',e.target.value)} placeholder="0" required/></div>
              <div className="gf"><label>Oda Sayısı *</label><input type="number" value={form.rooms} onChange={e=>set('rooms',e.target.value)} placeholder="0" required/></div>
              <div className="gf"><label>Giriş Tarihi *</label><input type="date" value={form.checkIn} onChange={e=>set('checkIn',e.target.value)} required/></div>
              <div className="gf"><label>Çıkış Tarihi *</label><input type="date" value={form.checkOut} onChange={e=>set('checkOut',e.target.value)} required/></div>
              <div className="gf"><label>Toplam Tutar (₺) *</label><input type="number" value={form.total} onChange={e=>set('total',e.target.value)} placeholder="0" required/></div>
              <div className="gf"><label>Pansiyon</label>
                <select value={form.board} onChange={e=>set('board',e.target.value)}>
                  <option value="BB">BB — Oda+Kahvaltı</option>
                  <option value="HB">HB — Yarım Pansiyon</option>
                  <option value="AI">AI — Her Şey Dahil</option>
                </select>
              </div>
              <div className="gf full"><label>Notlar</label><input value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Özel istekler..."/></div>
            </div>
            <div className="gf-foot"><button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>İptal</button><button type="submit" className="btn-primary">Grup Oluştur</button></div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grp-main">
        <div className="filters-bar">
          <div className="search-wrap">
            <Search size={16} color="#94a3b8"/>
            <input placeholder="Grup adı veya lider ara..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <div className="tabs">
            {['tümü', 'aktif', 'beklemede', 'konfirm', 'tamamlandi'].map(t => (
              <button key={t} className={`t-btn ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>
                {t === 'tümü' ? 'Tümü' : STATUSES[t]?.label || t}
              </button>
            ))}
          </div>
        </div>

        <div className="group-list">
          {filtered.length === 0 && <div style={{textAlign:'center',padding:40,color:'#94a3b8',fontSize:14}}>Bu filtrede grup bulunamadı</div>}
          {filtered.map((g, i) => {
            const st = STATUSES[g.status] || STATUSES.beklemede;
            const nights = g.checkIn && g.checkOut ? Math.max(1, Math.round((new Date(g.checkOut) - new Date(g.checkIn)) / 86400000)) : 0;
            return (
              <motion.div 
                key={g.id} 
                className="group-card"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="gc-main">
                  <div className="gc-info">
                    <div className="gc-id">#{g.id}</div>
                    <strong>{g.name}</strong>
                    <span><Calendar size={11}/> {g.checkIn} → {g.checkOut} ({nights} gece)</span>
                  </div>
                  <div className="gc-stats-row">
                    <div className="gcs">
                      <span>Oda/Pax</span>
                      <strong>{g.rooms} R / {g.pax} P</strong>
                    </div>
                    <div className="gcs">
                      <span>Lider</span>
                      <strong>{g.leader}</strong>
                    </div>
                  </div>
                </div>

                {g.notes && <div className="gc-notes">📝 {g.notes}</div>}
                
                <div className="gc-foot">
                  <span className="status-tag" style={{background:st.bg,color:st.color}}>{st.label}</span>
                  <div className="gc-money">
                    <div className="gc-price">₺{g.total.toLocaleString()}</div>
                    {g.paid < g.total && <div className="gc-balance">Kalan: ₺{(g.total - g.paid).toLocaleString()}</div>}
                  </div>
                  <div className="gc-actions">
                    {g.status === 'beklemede' && <button className="a-btn confirm" onClick={()=>updateStatus(g.id,'konfirm')}><Check size={14}/> Onayla</button>}
                    {g.status === 'konfirm' && <button className="a-btn checkin" onClick={()=>updateStatus(g.id,'aktif')}><ArrowRight size={14}/> Check-in</button>}
                    {g.status === 'aktif' && <button className="a-btn complete" onClick={()=>updateStatus(g.id,'tamamlandi')}><ShieldCheck size={14}/> Tamamla</button>}
                    <button className="a-btn" onClick={()=>setDetail(g)}><Eye size={14}/></button>
                    {g.status !== 'tamamlandi' && g.status !== 'iptal' && <button className="a-btn danger" onClick={()=>updateStatus(g.id,'iptal')}><X size={14}/></button>}
                    <button className="a-btn danger" onClick={()=>deleteGroup(g.id)}><Trash2 size={14}/></button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detay Modal */}
      <AnimatePresence>
        {detail && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setDetail(null)}>
            <motion.div className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()}>
              <div className="mb-head"><h3>Grup Detayı — {detail.name}</h3><button onClick={()=>setDetail(null)}><X size={18}/></button></div>
              <div className="mb-body">
                <div className="detail-grid">
                  <div className="dg"><span>Grup ID</span><strong>{detail.id}</strong></div>
                  <div className="dg"><span>Lider</span><strong>{detail.leader}</strong></div>
                  <div className="dg"><span>Telefon</span><strong>{detail.phone || '—'}</strong></div>
                  <div className="dg"><span>Pansiyon</span><strong>{detail.board}</strong></div>
                  <div className="dg"><span>Kişi Sayısı</span><strong>{detail.pax}</strong></div>
                  <div className="dg"><span>Oda Sayısı</span><strong>{detail.rooms}</strong></div>
                  <div className="dg"><span>Giriş</span><strong>{detail.checkIn}</strong></div>
                  <div className="dg"><span>Çıkış</span><strong>{detail.checkOut}</strong></div>
                  <div className="dg"><span>Toplam Tutar</span><strong style={{color:'#10b981'}}>₺{detail.total.toLocaleString()}</strong></div>
                  <div className="dg"><span>Ödenen</span><strong>₺{detail.paid.toLocaleString()}</strong></div>
                  <div className="dg"><span>Kalan Bakiye</span><strong style={{color: detail.total-detail.paid > 0 ? '#ef4444':'#10b981'}}>₺{(detail.total - detail.paid).toLocaleString()}</strong></div>
                  <div className="dg"><span>Durum</span><strong>{STATUSES[detail.status]?.label}</strong></div>
                </div>
                {detail.notes && <div className="detail-notes"><strong>Notlar:</strong> {detail.notes}</div>}
              </div>
              <div className="mb-foot"><button className="btn-cancel" onClick={()=>setDetail(null)}>Kapat</button></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .grp-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .grp-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .grp-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .grp-head span { font-size: 13px; color: #94a3b8; }
        
        .btn-primary { padding: 12px 20px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .btn-cancel { padding: 10px 18px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; font-weight: 700; cursor: pointer; font-size: 13px; }

        .grp-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .s-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; display: flex; align-items: center; gap: 16px; }
        .sc-icon { width: 44px; height: 44px; background: #f8fafc; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #3b82f6; }
        .sc-info span { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .sc-info strong { display: block; font-size: 20px; font-weight: 900; color: #1e293b; }

        /* Form */
        .grp-form { background: white; border-radius: 20px; border: 1.5px solid #e2e8f0; padding: 24px; }
        .gf-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .gf-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .gf-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .gf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .gf { display: flex; flex-direction: column; gap: 6px; }
        .gf.full { grid-column: 1 / -1; }
        .gf label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
        .gf input, .gf select { padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; outline: none; }
        .gf input:focus, .gf select:focus { border-color: #3b82f6; }
        .gf-foot { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }

        .grp-main { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
        .filters-bar { display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; }
        .search-wrap { flex: 1; min-width: 200px; display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1.5px solid #f1f5f9; border-radius: 12px; padding: 10px 16px; }
        .search-wrap input { border: none; background: transparent; outline: none; font-size: 13px; color: #475569; width: 100%; }
        
        .tabs { display: flex; background: #f1f5f9; padding: 4px; border-radius: 10px; gap: 4px; flex-wrap: wrap; }
        .t-btn { padding: 6px 14px; border-radius: 8px; border: none; font-size: 11px; font-weight: 700; color: #64748b; cursor: pointer; white-space: nowrap; }
        .t-btn.active { background: white; color: #1e293b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

        .group-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr)); gap: 16px; }
        .group-card { background: white; border: 1.5px solid #f1f5f9; border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 14px; transition: 0.2s; }
        .group-card:hover { border-color: #3b82f6; background: #fafbff; transform: translateY(-2px); }
        
        .gc-main { display: flex; justify-content: space-between; align-items: flex-start; }
        .gc-info .gc-id { font-size: 10px; font-weight: 800; color: #3b82f6; background: #eff6ff; padding: 2px 8px; border-radius: 6px; width: fit-content; margin-bottom: 6px; }
        .gc-info strong { display: block; font-size: 16px; color: #1e293b; }
        .gc-info span { font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 4px; margin-top: 4px; }
        
        .gc-stats-row { text-align: right; display: flex; flex-direction: column; gap: 8px; }
        .gcs span { display: block; font-size: 10px; color: #94a3b8; }
        .gcs strong { font-size: 13px; color: #475569; }

        .gc-notes { font-size: 12px; color: #64748b; padding: 8px 12px; background: #f8fafc; border-radius: 10px; }

        .gc-foot { border-top: 1px solid #f1f5f9; padding-top: 14px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .status-tag { font-size: 10px; font-weight: 800; padding: 4px 12px; border-radius: 20px; }
        
        .gc-money { flex: 1; text-align: right; }
        .gc-price { font-size: 16px; font-weight: 900; color: #1e293b; }
        .gc-balance { font-size: 11px; color: #ef4444; font-weight: 700; }

        .gc-actions { display: flex; gap: 6px; }
        .a-btn { padding: 6px 10px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; transition: 0.2s; }
        .a-btn:hover { border-color: #3b82f6; color: #3b82f6; }
        .a-btn.confirm { background: #f0fdf4; color: #10b981; border-color: #bbf7d0; }
        .a-btn.checkin { background: #eff6ff; color: #3b82f6; border-color: #bfdbfe; }
        .a-btn.complete { background: #f5f3ff; color: #8b5cf6; border-color: #ddd6fe; }
        .a-btn.danger { color: #ef4444; border-color: #fecaca; }
        .a-btn.danger:hover { background: #fef2f2; }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-box { background: white; border-radius: 24px; width: 560px; max-height: 80vh; overflow-y: auto; padding: 28px; }
        .mb-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .mb-head h3 { font-size: 18px; font-weight: 800; color: #1e293b; }
        .mb-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .mb-body { display: flex; flex-direction: column; gap: 16px; }
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .dg { padding: 12px; background: #f8fafc; border-radius: 12px; }
        .dg span { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 4px; }
        .dg strong { font-size: 14px; color: #1e293b; }
        .detail-notes { padding: 12px; background: #fffbeb; border-radius: 12px; font-size: 13px; color: #92400e; }
        .mb-foot { display: flex; justify-content: flex-end; margin-top: 16px; }
      `}</style>
    </div>
  );
};

export default GroupReservations;
