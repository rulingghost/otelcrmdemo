import React, { useState, useMemo } from 'react';

import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Handshake, Search, Plus, X,
  FileText, Copy, Zap, 
  ChevronRight, ArrowRight, Filter,
  DollarSign, Calendar, Globe,
  ShieldCheck, LayoutGrid, MoreVertical,
  CheckCircle, ArrowUpRight, AlertCircle, Trash2, Edit2, Eye
} from 'lucide-react';

const ROOM_TYPES = ['Standard Oda','Deluxe Oda','Suite Oda','Family Oda','Penthouse'];

const AgencyContracts = () => {
  const { addNotification, addCashTransaction, reservations } = useHotel();
  const [agencySearch, setAgencySearch] = useState('');
  const [editingAgency, setEditingAgency] = useState(null);
  const [editingRate, setEditingRate] = useState(null);

  const [agencies, setAgencies] = useState([
    { id:'AG-001', name:'ETS TUR', contact:'Mehmet B.', phone:'+90 212 555 1234', email:'info@etstur.com', status:'aktif', commission: 12 },
    { id:'AG-002', name:'Pegast', contact:'Olga P.', phone:'+7 495 123 4567', email:'info@pegast.ru', status:'aktif', commission: 15 },
    { id:'AG-003', name:'Coral', contact:'Anna S.', phone:'+7 495 234 5678', email:'info@coral.ru', status:'aktif', commission: 14 },
    { id:'AG-004', name:'Touristica', contact:'Ali R.', phone:'+90 232 456 7890', email:'info@touristica.com', status:'yeni', commission: 10 },
    { id:'AG-005', name:'TUI', contact:'Hans W.', phone:'+49 151 234 5678', email:'info@tui.de', status:'aktif', commission: 18 },
    { id:'AG-006', name:'Anex Tour', contact:'Sergei K.', phone:'+7 495 345 6789', email:'info@anextour.com', status:'aktif', commission: 13 },
  ]);

  const [selectedAgency, setSelectedAgency] = useState('AG-001');
  const [showAddAgency, setShowAddAgency] = useState(false);
  const [showAddRate, setShowAddRate] = useState(false);
  const [showAddPromo, setShowAddPromo] = useState(false);
  const [agencyDetail, setAgencyDetail] = useState(null);

  const [rates, setRates] = useState([
    { id:'R-001', agencyId:'AG-001', startDate:'2026-06-01', endDate:'2026-06-30', roomType:'Standard Oda', price:95, currency:'EUR', board:'AI' },
    { id:'R-002', agencyId:'AG-001', startDate:'2026-07-01', endDate:'2026-08-31', roomType:'Deluxe Oda', price:145, currency:'EUR', board:'AI' },
    { id:'R-003', agencyId:'AG-001', startDate:'2026-07-01', endDate:'2026-08-31', roomType:'Suite Oda', price:225, currency:'EUR', board:'AI' },
    { id:'R-004', agencyId:'AG-002', startDate:'2026-06-01', endDate:'2026-09-30', roomType:'Standard Oda', price:85, currency:'USD', board:'HB' },
    { id:'R-005', agencyId:'AG-005', startDate:'2026-04-01', endDate:'2026-10-31', roomType:'Standard Oda', price:110, currency:'EUR', board:'AI' },
  ]);

  const [promos, setPromos] = useState([
    { id:'P-001', agencyId:'AG-001', name:'7-6 Stay Pay', desc:'7 gece kal 6 gece öde', status:'aktif', validUntil:'2026-09-30' },
    { id:'P-002', agencyId:'AG-001', name:'EB %20 Discount', desc:'60 gün önceden rezervasyonda %20 indirim', status:'aktif', validUntil:'2026-12-31' },
    { id:'P-003', agencyId:'AG-001', name:'Child Free', desc:'0-6 yaş ücretsiz', status:'aktif', validUntil:'2026-10-31' },
  ]);

  const filteredAgencies = agencies.filter(a => !agencySearch || a.name.toLowerCase().includes(agencySearch.toLowerCase()));
  const selected = agencies.find(a => a.id === selectedAgency);
  const agencyRates = rates.filter(r => r.agencyId === selectedAgency);
  const agencyPromos = promos.filter(p => p.agencyId === selectedAgency);

  // Toplam gelir hesaplama
  const totalCommissionRevenue = useMemo(() => {
    return agencies.reduce((sum, a) => {
      const agRates = rates.filter(r => r.agencyId === a.id);
      return sum + agRates.reduce((s, r) => s + r.price, 0);
    }, 0);
  }, [agencies, rates]);

  const togglePromo = (id) => {
    setPromos(p => p.map(pr => pr.id === id ? { ...pr, status: pr.status === 'aktif' ? 'pasif' : 'aktif' } : pr));
    addNotification({ type: 'info', msg: 'Promosyon durumu güncellendi' });
  };

  const updateAgency = (e) => {
    e.preventDefault();
    setAgencies(p => p.map(a => a.id === editingAgency.id ? { ...editingAgency, commission: Number(editingAgency.commission) } : a));
    addNotification({ type: 'success', msg: `Acenta güncellendi: ${editingAgency.name}` });
    setEditingAgency(null);
  };

  const activateAgency = (id) => {
    setAgencies(p => p.map(a => a.id === id ? { ...a, status: a.status === 'aktif' ? 'pasif' : 'aktif' } : a));
    addNotification({ type: 'info', msg: 'Acenta durumu güncellendi' });
  };

  // Form states
  const [agForm, setAgForm] = useState({ name:'', contact:'', phone:'', email:'', commission:'' });
  const [rateForm, setRateForm] = useState({ startDate:'', endDate:'', roomType:ROOM_TYPES[0], price:'', currency:'EUR', board:'AI' });
  const [promoForm, setPromoForm] = useState({ name:'', desc:'', validUntil:'' });

  const idCounters = React.useRef({ ag:6, rate:5, promo:3 });

  const addAgency = (e) => {
    e.preventDefault();
    idCounters.current.ag++;
    const id = `AG-${String(idCounters.current.ag).padStart(3,'0')}`;
    setAgencies(p => [...p, { ...agForm, id, status:'yeni', commission: Number(agForm.commission) }]);
    addNotification({ type:'success', msg:`Yeni acenta eklendi: ${agForm.name}` });
    setAgForm({ name:'', contact:'', phone:'', email:'', commission:'' });
    setShowAddAgency(false);
  };

  const addRate = (e) => {
    e.preventDefault();
    idCounters.current.rate++;
    const id = `R-${String(idCounters.current.rate).padStart(3,'0')}`;
    setRates(p => [...p, { ...rateForm, id, agencyId: selectedAgency, price: Number(rateForm.price) }]);
    addNotification({ type:'info', msg:`Yeni fiyat tanımlandı: ${selected?.name} — ${rateForm.roomType}` });
    setRateForm({ startDate:'', endDate:'', roomType:ROOM_TYPES[0], price:'', currency:'EUR', board:'AI' });
    setShowAddRate(false);
  };

  const addPromo = (e) => {
    e.preventDefault();
    idCounters.current.promo++;
    const id = `P-${String(idCounters.current.promo).padStart(3,'0')}`;
    setPromos(p => [...p, { ...promoForm, id, agencyId: selectedAgency, status:'aktif' }]);
    addNotification({ type:'success', msg:`Yeni promosyon tanımlandı: ${promoForm.name}` });
    setPromoForm({ name:'', desc:'', validUntil:'' });
    setShowAddPromo(false);
  };

  const deleteRate = (id) => setRates(p => p.filter(r => r.id !== id));
  const deletePromo = (id) => setPromos(p => p.filter(p2 => p2.id !== id));
  const deleteAgency = (id) => {
    if(!confirm('Bu acentayı silmek istediğinize emin misiniz?')) return;
    setAgencies(p => p.filter(a => a.id !== id));
    if(selectedAgency === id) setSelectedAgency(agencies[0]?.id);
    addNotification({ type:'info', msg:'Acenta silindi' });
  };

  return (
    <div className="agency-container">
      <header className="header">
         <div className="title-section">
            <Handshake size={32} className="icon-blue"/>
            <div>
               <h2>Agency Contract & Rate Management</h2>
               <span>Acente sözleşmeleri, sezonluk fiyat tanımları ve promosyon yönetimi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline" onClick={()=>setShowAddRate(true)}>YENİ FİYAT EKLE</button>
            <button className="btn outline" onClick={()=>setShowAddPromo(true)}>PROMOSYON EKLE</button>
            <button className="btn primary green" onClick={()=>setShowAddAgency(true)}>YENİ ACENTA</button>
         </div>
      </header>

      <div className="agency-grid">
         {/* Left: Agency List */}
         <aside className="left-panel">
            <section className="card search-card">
               <div className="search-box">
                  <Search size={16} className="gray"/>
                  <input type="text" placeholder="Acenta ara..." />
               </div>
               <h3>ACENTELER</h3>
               <div className="a-list">
                  {agencies.map(a => (
                    <div key={a.id} className={`a-item ${selectedAgency === a.id ? 'active' : ''}`} onClick={()=>setSelectedAgency(a.id)}>
                      {a.name}
                      {a.status === 'yeni' && <span className="new-tag">YENİ</span>}
                    </div>
                  ))}
               </div>
            </section>
         </aside>

         {/* Center: Rates Table */}
         <section className="main-content">
            <div className="card rates-card">
               <div className="r-head">
                  <h3>SEZONLUK FİYATLAR — {selected?.name || '—'}</h3>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    <span style={{fontSize:11,color:'#94a3b8'}}>Komisyon: <strong style={{color:'#3b82f6'}}>%{selected?.commission}</strong></span>
                    <button className="nav-btn" onClick={()=>setAgencyDetail(selected)}>Detay</button>
                  </div>
               </div>
               <table className="rates-table">
                  <thead>
                     <tr>
                        <th>Başlangıç</th>
                        <th>Bitiş</th>
                        <th>Oda Tipi</th>
                        <th>Fiyat</th>
                        <th>Pansiyon</th>
                        <th>İşlem</th>
                     </tr>
                  </thead>
                  <tbody>
                     {agencyRates.length === 0 && <tr><td colSpan={6} style={{textAlign:'center',color:'#94a3b8',padding:30}}>Bu acentaya ait fiyat tanımı yok</td></tr>}
                     {agencyRates.map(r => (
                       <tr key={r.id}>
                          <td>{r.startDate}</td>
                          <td>{r.endDate}</td>
                          <td>{r.roomType}</td>
                          <td><strong>{r.currency === 'EUR' ? '€' : '$'}{r.price}</strong></td>
                          <td>{r.board}</td>
                          <td><button className="del-btn" onClick={()=>deleteRate(r.id)}><Trash2 size={14}/></button></td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <section className="card mt-20 stats-card">
               <div className="s-row">
                  <span>Toplam Fiyat Tanımı: <strong className="blue">{agencyRates.length}</strong></span>
                  <span style={{marginLeft:20}}>Aktif Promosyon: <strong className="green">{agencyPromos.filter(p=>p.status==='aktif').length}</strong></span>
                  <span style={{marginLeft:20}}>Toplam Acenta: <strong>{agencies.length}</strong></span>
               </div>
            </section>
         </section>

         {/* Right: Promos */}
         <aside className="right-panel">
            <section className="card promo-card">
               <h3>PROMOSYONLAR — {selected?.name}</h3>
               <div className="p-list">
                  {agencyPromos.length === 0 && <div style={{textAlign:'center',color:'#94a3b8',fontSize:12,padding:20}}>Promosyon yok</div>}
                  {agencyPromos.map(p => (
                    <div key={p.id} className="p-item">
                       <div>
                         <span style={{fontWeight:700,fontSize:13}}>{p.name}</span>
                         <div style={{fontSize:11,color:'#94a3b8',marginTop:2}}>{p.desc}</div>
                       </div>
                       <div className="p-actions">
                          <span className="p-status">{p.status.toUpperCase()}</span>
                          <button className="del-btn" onClick={()=>deletePromo(p.id)}><X size={14}/></button>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
            
            {selected && (
              <section className="card mt-20 alert-card">
                 <div className="head">
                    <AlertCircle size={14} className="gold"/>
                    <strong>{selected.name} — İletişim</strong>
                 </div>
                 <p>{selected.contact} · {selected.phone}</p>
                 <p>{selected.email}</p>
              </section>
            )}
         </aside>
      </div>

      {/* Add Agency Modal */}
      <AnimatePresence>
        {showAddAgency && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowAddAgency(false)}>
            <motion.form className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()} onSubmit={addAgency}>
              <div className="mb-head"><h3>Yeni Acenta Ekle</h3><button type="button" onClick={()=>setShowAddAgency(false)}><X size={18}/></button></div>
              <div className="mf-grid">
                <div className="mf"><label>Acenta Adı *</label><input value={agForm.name} onChange={e=>setAgForm(p=>({...p,name:e.target.value}))} required/></div>
                <div className="mf"><label>İletişim Kişisi</label><input value={agForm.contact} onChange={e=>setAgForm(p=>({...p,contact:e.target.value}))}/></div>
                <div className="mf"><label>Telefon</label><input value={agForm.phone} onChange={e=>setAgForm(p=>({...p,phone:e.target.value}))}/></div>
                <div className="mf"><label>E-posta</label><input value={agForm.email} onChange={e=>setAgForm(p=>({...p,email:e.target.value}))}/></div>
                <div className="mf"><label>Komisyon %</label><input type="number" value={agForm.commission} onChange={e=>setAgForm(p=>({...p,commission:e.target.value}))}/></div>
              </div>
              <div className="mf-foot"><button type="button" className="btn outline" onClick={()=>setShowAddAgency(false)}>İptal</button><button type="submit" className="btn primary green">Acenta Ekle</button></div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Rate Modal */}
      <AnimatePresence>
        {showAddRate && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowAddRate(false)}>
            <motion.form className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()} onSubmit={addRate}>
              <div className="mb-head"><h3>Fiyat Tanımla — {selected?.name}</h3><button type="button" onClick={()=>setShowAddRate(false)}><X size={18}/></button></div>
              <div className="mf-grid">
                <div className="mf"><label>Başlangıç *</label><input type="date" value={rateForm.startDate} onChange={e=>setRateForm(p=>({...p,startDate:e.target.value}))} required/></div>
                <div className="mf"><label>Bitiş *</label><input type="date" value={rateForm.endDate} onChange={e=>setRateForm(p=>({...p,endDate:e.target.value}))} required/></div>
                <div className="mf"><label>Oda Tipi</label><select value={rateForm.roomType} onChange={e=>setRateForm(p=>({...p,roomType:e.target.value}))}>{ROOM_TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
                <div className="mf"><label>Fiyat *</label><input type="number" value={rateForm.price} onChange={e=>setRateForm(p=>({...p,price:e.target.value}))} required/></div>
                <div className="mf"><label>Para Birimi</label><select value={rateForm.currency} onChange={e=>setRateForm(p=>({...p,currency:e.target.value}))}><option>EUR</option><option>USD</option><option>TRY</option></select></div>
                <div className="mf"><label>Pansiyon</label><select value={rateForm.board} onChange={e=>setRateForm(p=>({...p,board:e.target.value}))}><option>AI</option><option>HB</option><option>BB</option></select></div>
              </div>
              <div className="mf-foot"><button type="button" className="btn outline" onClick={()=>setShowAddRate(false)}>İptal</button><button type="submit" className="btn primary green">Fiyat Ekle</button></div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Promo Modal */}
      <AnimatePresence>
        {showAddPromo && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowAddPromo(false)}>
            <motion.form className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()} onSubmit={addPromo}>
              <div className="mb-head"><h3>Promosyon Ekle — {selected?.name}</h3><button type="button" onClick={()=>setShowAddPromo(false)}><X size={18}/></button></div>
              <div className="mf-grid">
                <div className="mf"><label>Promosyon Adı *</label><input value={promoForm.name} onChange={e=>setPromoForm(p=>({...p,name:e.target.value}))} required placeholder="Ör: Early Booking %15"/></div>
                <div className="mf"><label>Açıklama</label><input value={promoForm.desc} onChange={e=>setPromoForm(p=>({...p,desc:e.target.value}))} placeholder="Detay..."/></div>
                <div className="mf"><label>Geçerlilik Tarihi</label><input type="date" value={promoForm.validUntil} onChange={e=>setPromoForm(p=>({...p,validUntil:e.target.value}))}/></div>
              </div>
              <div className="mf-foot"><button type="button" className="btn outline" onClick={()=>setShowAddPromo(false)}>İptal</button><button type="submit" className="btn primary green">Promosyon Ekle</button></div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Agency Detail Modal */}
      <AnimatePresence>
        {agencyDetail && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setAgencyDetail(null)}>
            <motion.div className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()}>
              <div className="mb-head"><h3>{agencyDetail.name}</h3><button onClick={()=>setAgencyDetail(null)}><X size={18}/></button></div>
              <div className="mf-grid">
                <div className="mf info-box"><label>İletişim</label><strong>{agencyDetail.contact}</strong></div>
                <div className="mf info-box"><label>Telefon</label><strong>{agencyDetail.phone}</strong></div>
                <div className="mf info-box"><label>E-posta</label><strong>{agencyDetail.email}</strong></div>
                <div className="mf info-box"><label>Komisyon</label><strong>%{agencyDetail.commission}</strong></div>
                <div className="mf info-box"><label>Durum</label><strong style={{color: agencyDetail.status==='aktif'?'#10b981':'#f59e0b'}}>{agencyDetail.status.toUpperCase()}</strong></div>
                <div className="mf info-box"><label>Fiyat Tanımı</label><strong>{rates.filter(r=>r.agencyId===agencyDetail.id).length} adet</strong></div>
              </div>
              <div className="mf-foot">
                <button className="btn outline" style={{color:'#ef4444',borderColor:'#fecaca'}} onClick={()=>{deleteAgency(agencyDetail.id);setAgencyDetail(null);}}>Sil</button>
                <button className="btn outline" onClick={()=>setAgencyDetail(null)}>Kapat</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Agency Modal */}
      <AnimatePresence>
        {editingAgency && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setEditingAgency(null)}>
            <motion.form className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()} onSubmit={updateAgency}>
              <div className="mb-head"><h3>Acenta Düzenle: {editingAgency.name}</h3><button type="button" onClick={()=>setEditingAgency(null)}><X size={18}/></button></div>
              <div className="mf-grid">
                <div className="mf"><label>Acenta Adı *</label><input value={editingAgency.name} onChange={e=>setEditingAgency(p=>({...p,name:e.target.value}))} required/></div>
                <div className="mf"><label>İletişim Kişisi</label><input value={editingAgency.contact} onChange={e=>setEditingAgency(p=>({...p,contact:e.target.value}))}/></div>
                <div className="mf"><label>Telefon</label><input value={editingAgency.phone} onChange={e=>setEditingAgency(p=>({...p,phone:e.target.value}))}/></div>
                <div className="mf"><label>E-posta</label><input value={editingAgency.email} onChange={e=>setEditingAgency(p=>({...p,email:e.target.value}))}/></div>
                <div className="mf"><label>Komisyon %</label><input type="number" value={editingAgency.commission} onChange={e=>setEditingAgency(p=>({...p,commission:e.target.value}))}/></div>
                <div className="mf"><label>Durum</label>
                  <select value={editingAgency.status} onChange={e=>setEditingAgency(p=>({...p,status:e.target.value}))}>
                    <option value="aktif">Aktif</option><option value="yeni">Yeni</option><option value="pasif">Pasif</option>
                  </select>
                </div>
              </div>
              <div className="mf-foot">
                <button type="button" className="btn outline" style={{color:'#ef4444',borderColor:'#fecaca'}} onClick={()=>{deleteAgency(editingAgency.id);setEditingAgency(null);}}>Sil</button>
                <button type="button" className="btn outline" onClick={()=>setEditingAgency(null)}>İptal</button>
                <button type="submit" className="btn primary green">Kaydet</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .agency-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-blue { color: #3b82f6; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { font-size: 14px; color: #64748b; }

        .actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .btn { padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }
        .btn.primary.green { background: #10b981; color: white; }

        .agency-grid { display: grid; grid-template-columns: 240px 1fr 280px; gap: 30px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; margin-bottom: 20px; letter-spacing: 0.5px; }

        .search-box { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 12px; border-radius: 8px; margin-bottom: 20px; }
        .search-box input { border: none; background: transparent; outline: none; font-size: 12px; width: 100%; }

        .a-list { display: flex; flex-direction: column; gap: 5px; }
        .a-item { padding: 10px; border-radius: 8px; font-size: 13px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; display: flex; justify-content: space-between; align-items: center; }
        .a-item:hover { background: #f8fafc; }
        .a-item.active { background: #eff6ff; color: #3b82f6; border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0; }
        .new-tag { font-size: 9px; background: #f59e0b; color: white; padding: 2px 6px; border-radius: 4px; }

        .r-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .nav-btn { padding: 6px 14px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; cursor: pointer; color: #64748b; font-size: 12px; font-weight: 700; }
        .nav-btn:hover { border-color: #3b82f6; color: #3b82f6; }

        .rates-table { width: 100%; border-collapse: collapse; }
        .rates-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; text-transform: uppercase; }
        .rates-table td { padding: 15px 12px; font-size: 13px; border-bottom: 1px solid #f8fafc; color: #475569; }
        .rates-table td strong { color: #1e293b; }

        .del-btn { background: none; border: none; color: #ef4444; cursor: pointer; padding: 4px; opacity: 0.5; }
        .del-btn:hover { opacity: 1; }

        .p-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #f8fafc; gap: 8px; }
        .p-status { font-size: 10px; font-weight: 900; background: #ecfdf5; color: #10b981; padding: 2px 8px; border-radius: 4px; }
        .p-actions { display: flex; align-items: center; gap: 6px; }

        .alert-card { background: #fffbeb; border-color: #fef3c7; }
        .alert-card .head { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
        .alert-card p { font-size: 11px; color: #64748b; padding-left: 22px; margin: 2px 0; }

        .s-row { display: flex; align-items: center; font-size: 13px; color: #64748b; }
        .green { color: #10b981; }
        .blue { color: #3b82f6; }
        .gold { color: #f59e0b; }
        .gray { color: #94a3b8; }
        .mt-20 { margin-top: 20px; }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-box { background: white; border-radius: 20px; width: 500px; max-height: 80vh; overflow-y: auto; padding: 24px; }
        .mb-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .mb-head h3 { font-size: 17px; font-weight: 800; color: #1e293b; }
        .mb-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .mf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .mf { display: flex; flex-direction: column; gap: 6px; }
        .mf label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
        .mf input, .mf select { padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; outline: none; }
        .mf input:focus, .mf select:focus { border-color: #3b82f6; }
        .mf.info-box { padding: 10px; background: #f8fafc; border-radius: 10px; }
        .mf.info-box strong { font-size: 14px; color: #1e293b; }
        .mf-foot { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
      `}</style>
    </div>
  );
};

export default AgencyContracts;
