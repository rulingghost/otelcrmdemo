import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Calendar, CreditCard, FileText, 
  MapPin, Phone, Mail, Clock, 
  ShieldCheck, AlertCircle, Edit3, 
  Printer, Share2, MoreVertical,
  ChevronRight, ArrowRight, DollarSign,
  Briefcase, Star, Info, Search, LogIn, LogOut
} from 'lucide-react';

const ReservationCard = () => {
  const { reservations, guests, folioLines, checkIn, checkOut, makePayment, addNotification } = useHotel();
  const [selectedResId, setSelectedResId] = useState(null);
  const [activeTab, setActiveTab] = useState('genel');
  const [search, setSearch] = useState('');

  const filtered = reservations.filter(r => {
    if (!search) return true;
    const q = search.toLowerCase();
    return r.guest.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || (r.room || '').includes(q);
  });

  const selected = reservations.find(r => r.id === selectedResId);
  const guest = selected ? guests.find(g => g.name === selected.guest) : null;
  const lines = selected ? (folioLines[selected.id] || []) : [];
  const folioTotal = lines.reduce((s, l) => s + l.amount, 0);

  const STATUS_MAP = {
    'check-in':  { label: 'İç Misafir',  color: '#10b981', bg: '#f0fdf4' },
    'check-out': { label: 'Çıkış Yaptı', color: '#64748b', bg: '#f8fafc' },
    'gelecek':   { label: 'Gelecek',      color: '#3b82f6', bg: '#eff6ff' },
  };

  return (
    <div className="rc-page">
      {/* Left: list */}
      <aside className="rc-sidebar">
        <div className="rcs-head">
          <h3>Rezervasyon Kartları</h3>
          <span>{reservations.length} kayıt</span>
        </div>
        <div className="rcs-search">
          <Search size={15} color="#94a3b8"/>
          <input placeholder="Misafir, oda, no..." value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <div className="rcs-list">
          {filtered.map(r => {
            const st = STATUS_MAP[r.status] || STATUS_MAP.gelecek;
            return (
              <button
                key={r.id}
                className={`rcs-item ${selectedResId === r.id ? 'active' : ''}`}
                onClick={() => { setSelectedResId(r.id); setActiveTab('genel'); }}
              >
                <div className="rcs-av">{r.guest[0]}</div>
                <div className="rcs-info">
                  <strong>{r.guest}</strong>
                  <span>{r.id} · Oda {r.room || '—'}</span>
                </div>
                <span className="rcs-status" style={{ background: st.bg, color: st.color }}>{st.label}</span>
              </button>
            );
          })}
          {filtered.length === 0 && <p className="empty-msg">Sonuç bulunamadı.</p>}
        </div>
      </aside>

      {/* Right: detail */}
      <main className="rc-detail">
        {selected ? (
          <div className="rcd-inner">
            {/* Header */}
            <div className="rc-header">
              <div className="rch-left">
                <div className="res-id-tag">#{selected.id}</div>
                <div className="res-status-pill" style={{ background: (STATUS_MAP[selected.status] || STATUS_MAP.gelecek).color }}>
                  {(STATUS_MAP[selected.status] || STATUS_MAP.gelecek).label}
                </div>
              </div>
              <div className="rch-actions">
                <button className="btn-icon"><Edit3 size={16}/></button>
                <button className="btn-icon"><Printer size={16}/></button>
              </div>
            </div>

            {/* Info Strip */}
            <div className="rc-strip">
              <div className="rcs-item-strip">
                <div className="rcsi-icon"><User size={20}/></div>
                <div className="rcsi-content">
                  <strong>{selected.guest}</strong>
                  <span>{guest?.loyalty || 'Misafir'} · {guest?.visits || 1} konaklama</span>
                </div>
              </div>
              <div className="rcs-item-strip">
                <div className="rcsi-icon"><Calendar size={20}/></div>
                <div className="rcsi-content">
                  <strong>{selected.checkIn} → {selected.checkOut}</strong>
                  <span>{selected.nights} Gece · {selected.pax} Kişi</span>
                </div>
              </div>
              <div className="rcs-item-strip">
                <div className="rcsi-icon"><Briefcase size={20}/></div>
                <div className="rcsi-content">
                  <strong>Oda {selected.room || 'Atanmadı'} — {selected.type}</strong>
                  <span>{selected.board} · {selected.channel}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="rc-tabs">
              {[
                { id: 'genel', label: 'Genel Bilgiler', icon: <Info size={15}/> },
                { id: 'folio', label: 'Folio & Ödemeler', icon: <CreditCard size={15}/> },
                { id: 'notlar', label: 'Notlar', icon: <FileText size={15}/> },
              ].map(t => (
                <button
                  key={t.id}
                  className={`rc-tab ${activeTab === t.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="rc-content">
              {activeTab === 'genel' && (
                <div className="rc-grid">
                  <div className="rc-box">
                    <h4>İletişim Bilgileri</h4>
                    <div className="rc-info-list">
                      <div className="ril-i"><Phone size={14}/> {guest?.phone || 'Belirtilmedi'}</div>
                      <div className="ril-i"><Mail size={14}/> {guest?.email || 'Belirtilmedi'}</div>
                      <div className="ril-i"><MapPin size={14}/> {guest?.nationality || 'TR'}</div>
                      {guest?.tcNo && <div className="ril-i"><ShieldCheck size={14}/> TC: {guest.tcNo}</div>}
                      {guest?.passport && <div className="ril-i"><ShieldCheck size={14}/> Pasaport: {guest.passport}</div>}
                    </div>
                  </div>
                  <div className="rc-box">
                    <h4>Fiyatlandırma Özeti</h4>
                    <div className="rc-price-grid">
                      <div className="rpg-i"><span>Toplam Tutar</span><strong>₺{selected.total.toLocaleString()}</strong></div>
                      <div className="rpg-i"><span>Ödenen</span><strong className="green">₺{selected.paid.toLocaleString()}</strong></div>
                      <div className="rpg-i divider">
                        <span>Kalan Borç</span>
                        <strong className={selected.balance > 0 ? 'red' : 'green'}>
                          {selected.balance > 0 ? `₺${selected.balance.toLocaleString()}` : '✓ Kapandı'}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'folio' && (
                <div className="folio-tab">
                  <table className="mini-table">
                    <thead><tr><th>Açıklama</th><th>Tür</th><th>Tarih</th><th className="right">Tutar</th></tr></thead>
                    <tbody>
                      {lines.map(l => (
                        <tr key={l.id}>
                          <td>{l.desc}</td>
                          <td><span className={`type-tag ${l.type}`}>{l.type === 'accommodation' ? 'Konaklama' : 'Ekstra'}</span></td>
                          <td>{l.date}</td>
                          <td className="right">₺{l.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                      {lines.length === 0 && <tr><td colSpan={4} className="empty-msg">Henüz folio kaydı yok.</td></tr>}
                    </tbody>
                  </table>
                  <div className="folio-summary">
                    <div className="fs-row"><span>Folio Toplam</span><strong>₺{folioTotal.toLocaleString()}</strong></div>
                    <div className="fs-row"><span>Ödenen</span><strong className="green">₺{selected.paid.toLocaleString()}</strong></div>
                    <div className="fs-row big"><span>Bakiye</span>
                      <strong className={selected.balance > 0 ? 'red' : 'green'}>
                        {selected.balance > 0 ? `₺${selected.balance.toLocaleString()}` : '✓ Kapandı'}
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notlar' && (
                <div className="notes-tab">
                  <div className="note-box">
                    <h4>Rezervasyon Notu</h4>
                    <p>{selected.notes || 'Bu rezervasyona ait not bulunmuyor.'}</p>
                  </div>
                  {guest && (
                    <div className="note-box">
                      <h4>Misafir Geçmişi</h4>
                      <div className="guest-history">
                        <div><span>Toplam Konaklama</span><strong>{guest.visits}</strong></div>
                        <div><span>Toplam Harcama</span><strong>₺{guest.totalSpent.toLocaleString()}</strong></div>
                        <div><span>Son Ziyaret</span><strong>{guest.lastVisit}</strong></div>
                        <div><span>Sadakat</span><strong>{guest.loyalty}</strong></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="rc-footer">
              {selected.status === 'gelecek' && (
                <button className="btn-action green" onClick={() => { checkIn(selected.id); addNotification({ type:'success', msg:`Check-in: ${selected.guest}` }); }}>
                  <LogIn size={15}/> Check-In Yap
                </button>
              )}
              {selected.status === 'check-in' && (
                <button className="btn-action red" onClick={() => { checkOut(selected.id); addNotification({ type:'info', msg:`Check-out: ${selected.guest}` }); setSelectedResId(null); }}>
                  <LogOut size={15}/> Check-Out Yap
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="rc-empty">
            <FileText size={64} color="#e2e8f0"/>
            <p>Detayları görmek için soldaki listeden bir rezervasyon seçin</p>
          </div>
        )}
      </main>

      <style>{`
        .rc-page { display:flex; height:calc(100vh - 70px); }

        /* Sidebar */
        .rc-sidebar { width:320px; background:white; border-right:1px solid #e2e8f0; display:flex; flex-direction:column; }
        .rcs-head { padding:18px 20px; border-bottom:1px solid #f1f5f9; }
        .rcs-head h3 { font-size:16px; font-weight:800; color:#1e293b; }
        .rcs-head span { font-size:12px; color:#94a3b8; }
        .rcs-search { display:flex; align-items:center; gap:8px; padding:12px 16px; border-bottom:1px solid #f1f5f9; }
        .rcs-search input { border:none; outline:none; font-size:13px; width:100%; background:transparent; }
        .rcs-list { flex:1; overflow-y:auto; padding:8px; }
        .rcs-item { width:100%; display:flex; align-items:center; gap:10px; padding:12px; border-radius:12px; border:none; background:transparent; cursor:pointer; text-align:left; margin-bottom:4px; transition:0.15s; }
        .rcs-item:hover { background:#f8fafc; }
        .rcs-item.active { background:#eff6ff; border:1.5px solid #3b82f6; }
        .rcs-av { width:34px; height:34px; background:#eff6ff; color:#3b82f6; font-weight:900; font-size:14px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .rcs-info { flex:1; min-width:0; }
        .rcs-info strong { display:block; font-size:13px; color:#1e293b; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .rcs-info span { font-size:11px; color:#94a3b8; }
        .rcs-status { font-size:10px; font-weight:800; padding:3px 8px; border-radius:20px; flex-shrink:0; white-space:nowrap; }
        .empty-msg { text-align:center; padding:30px; color:#94a3b8; font-size:13px; }

        /* Detail */
        .rc-detail { flex:1; padding:28px; overflow-y:auto; background:#f8fafc; }
        .rc-empty { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:#94a3b8; font-size:14px; }
        .rcd-inner { display:flex; flex-direction:column; gap:20px; }

        /* Header */
        .rc-header { display:flex; justify-content:space-between; align-items:center; background:white; border-radius:16px; padding:18px 24px; border:1px solid #e2e8f0; }
        .rch-left { display:flex; align-items:center; gap:12px; }
        .res-id-tag { font-family:monospace; font-size:14px; font-weight:800; color:#64748b; }
        .res-status-pill { font-size:11px; font-weight:800; color:white; padding:4px 14px; border-radius:20px; }
        .rch-actions { display:flex; gap:8px; }
        .btn-icon { width:38px; height:38px; border-radius:10px; background:#f8fafc; border:1px solid #e2e8f0; color:#64748b; cursor:pointer; display:flex; align-items:center; justify-content:center; }
        .btn-icon:hover { background:#eff6ff; color:#3b82f6; }

        /* Info Strip */
        .rc-strip { background:white; border-radius:16px; border:1px solid #e2e8f0; padding:20px 24px; display:flex; gap:32px; }
        .rcs-item-strip { display:flex; align-items:center; gap:14px; }
        .rcsi-icon { width:42px; height:42px; background:#eff6ff; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#3b82f6; flex-shrink:0; }
        .rcsi-content strong { display:block; font-size:14px; color:#1e293b; font-weight:700; }
        .rcsi-content span { font-size:12px; color:#94a3b8; font-weight:600; }

        /* Tabs */
        .rc-tabs { display:flex; gap:8px; }
        .rc-tab { padding:10px 18px; border-radius:10px; border:1.5px solid #e2e8f0; background:white; font-size:12px; font-weight:700; color:#64748b; cursor:pointer; display:flex; align-items:center; gap:7px; transition:0.15s; }
        .rc-tab.active { background:#1e293b; color:white; border-color:#1e293b; }

        /* Content */
        .rc-content { background:white; border-radius:16px; border:1px solid #e2e8f0; padding:24px; }
        .rc-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
        .rc-box h4 { font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; margin-bottom:14px; border-bottom:2px solid #f8fafc; padding-bottom:8px; }
        .rc-info-list { display:flex; flex-direction:column; gap:12px; }
        .ril-i { font-size:13px; color:#475569; display:flex; align-items:center; gap:10px; font-weight:600; }
        .rc-price-grid { display:flex; flex-direction:column; gap:10px; }
        .rpg-i { display:flex; justify-content:space-between; font-size:13px; }
        .rpg-i span { color:#94a3b8; }
        .rpg-i strong { color:#1e293b; font-weight:800; }
        .rpg-i strong.green { color:#10b981; }
        .rpg-i strong.red { color:#ef4444; }
        .rpg-i.divider { border-top:1px dashed #e2e8f0; padding-top:10px; margin-top:5px; }

        /* Folio */
        .folio-tab {}
        .mini-table { width:100%; border-collapse:collapse; margin-bottom:16px; }
        .mini-table th { text-align:left; padding:10px 14px; font-size:11px; color:#94a3b8; text-transform:uppercase; border-bottom:2px solid #f1f5f9; font-weight:800; }
        .mini-table th.right { text-align:right; }
        .mini-table td { padding:12px 14px; font-size:13px; color:#475569; border-bottom:1px solid #f8fafc; }
        .mini-table td.right { text-align:right; font-weight:700; color:#1e293b; }
        .type-tag { padding:3px 10px; border-radius:20px; font-size:10px; font-weight:800; }
        .type-tag.accommodation { background:#eff6ff; color:#3b82f6; }
        .type-tag.extra { background:#fff7ed; color:#f59e0b; }
        .folio-summary { background:#f8fafc; border-radius:12px; padding:16px; max-width:300px; margin-left:auto; }
        .fs-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #e2e8f0; font-size:13px; }
        .fs-row:last-child { border-bottom:none; }
        .fs-row span { color:#64748b; }
        .fs-row.big { font-size:16px; font-weight:800; padding-top:12px; }
        .green { color:#10b981 !important; }
        .red { color:#ef4444 !important; }

        /* Notes */
        .note-box { margin-bottom:20px; }
        .note-box h4 { font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; margin-bottom:10px; }
        .note-box p { font-size:13px; color:#475569; line-height:1.6; background:#f8fafc; padding:14px; border-radius:10px; }
        .guest-history { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .guest-history > div { background:#f8fafc; padding:14px; border-radius:10px; }
        .guest-history span { display:block; font-size:11px; color:#94a3b8; font-weight:700; margin-bottom:4px; }
        .guest-history strong { font-size:16px; color:#1e293b; font-weight:800; }

        /* Footer */
        .rc-footer { display:flex; justify-content:flex-end; gap:12px; }
        .btn-action { padding:12px 22px; border-radius:12px; border:none; font-size:13px; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:8px; color:white; }
        .btn-action.green { background:#10b981; }
        .btn-action.red { background:#ef4444; }
      `}</style>
    </div>
  );
};

export default ReservationCard;
