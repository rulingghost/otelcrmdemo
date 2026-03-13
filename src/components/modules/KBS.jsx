import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle, AlertCircle, FileText, Download, Eye, Lock, User, X, Clock } from 'lucide-react';

const KBS = () => {
  const { reservations, guests, addNotification } = useHotel();
  const [sentList, setSentList] = useState(['RES-001','RES-003','RES-008']);
  const [selected, setSelected] = useState(null);
  const [sending, setSending] = useState(null);

  const arrivals = reservations.filter(r => r.status === 'check-in');
  const pending  = arrivals.filter(r => !sentList.includes(r.id));

  const sendKBS = async (resId) => {
    setSending(resId);
    await new Promise(r=>setTimeout(r,1500));
    setSentList(prev=>[...prev,resId]);
    setSending(null);
    const res = reservations.find(r=>r.id===resId);
    addNotification({ type:'success', msg:`KBS gönderildi: ${res?.guest}` });
  };

  const sendAll = async () => {
    for (const r of pending) { await sendKBS(r.id); }
  };

  return (
    <div className="kbs-page">
      <div className="kbs-head">
        <div>
          <h2><Shield size={20}/> KBS — Kimlik Bildirim Sistemi</h2>
          <span>Polis/Jandarma Kimlik Bildirim Sistemi entegrasyonu</span>
        </div>
        <div className="kbs-actions">
          <div className="kbs-status"><div className="status-dot"/><span>Bağlantı: Aktif</span></div>
          {pending.length>0 && (
            <button className="btn-primary" onClick={sendAll}>
              <Shield size={15}/> Tümünü Gönder ({pending.length})
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="kbs-stats">
        <div className="ks"><CheckCircle size={20} color="#10b981"/><div><strong>{sentList.length}</strong><span>Gönderildi</span></div></div>
        <div className="ks"><AlertCircle size={20} color="#f59e0b"/><div><strong style={{color:pending.length>0?'#ef4444':'#10b981'}}>{pending.length}</strong><span>Bekliyor</span></div></div>
        <div className="ks"><User size={20} color="#3b82f6"/><div><strong>{arrivals.length}</strong><span>İç Misafir</span></div></div>
      </div>

      {pending.length > 0 && (
        <div className="warn-band"><AlertCircle size={16}/><span>{pending.length} misafir için KBS bildirimi gönderilmemiş!</span></div>
      )}

      <div className="kbs-table-wrap">
        <table className="kbs-table">
          <thead><tr><th>Rezervasyon</th><th>Misafir</th><th>Oda</th><th>Giriş</th><th>Uyruk</th><th>Belge No</th><th>KBS Durumu</th><th>İşlem</th></tr></thead>
          <tbody>
            {arrivals.map((r,i)=>{
              const g = guests.find(g=>g.name===r.guest)||{};
              const sent = sentList.includes(r.id);
              const isSending = sending===r.id;
              return (
                <motion.tr key={r.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.05}}>
                  <td><span className="rid">{r.id}</span></td>
                  <td><div className="g-cell"><div className="g-av">{r.guest[0]}</div><strong>{r.guest}</strong></div></td>
                  <td><span className="room-tag">{r.room}</span></td>
                  <td>{r.checkIn}</td>
                  <td><span className="nat-tag">{g.nationality||'TR'}</span></td>
                  <td><span className="doc">{g.tcNo||g.passport||'—'}</span></td>
                  <td>
                    {isSending
                      ? <span className="kbs-pending">⏳ Gönderiliyor...</span>
                      : sent
                      ? <span className="kbs-sent"><CheckCircle size={14}/> Gönderildi</span>
                      : <span className="kbs-wait"><AlertCircle size={14}/> Bekliyor</span>}
                  </td>
                  <td>
                    <div className="act-row">
                      {!sent && !isSending && (
                        <button className="act-btn blue" onClick={()=>sendKBS(r.id)}>
                          <Shield size={13}/> KBS Gönder
                        </button>
                      )}
                      <button className="act-btn grey" onClick={()=>setSelected(r)}><Eye size={13}/> Görüntüle</button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div className="modal-overlay" onClick={()=>setSelected(null)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <motion.div className="kbs-modal" onClick={e=>e.stopPropagation()} initial={{scale:.9}} animate={{scale:1}}>
              <div className="modal-head"><h3>KBS Kayıt Detayı — {selected.guest}</h3><button onClick={()=>setSelected(null)}><X size={18}/></button></div>
              <div className="kbs-detail">
                {[
                  ['Rezervasyon No', selected.id],
                  ['Ad Soyad', selected.guest],
                  ['Oda', selected.room],
                  ['Giriş Tarihi', selected.checkIn],
                  ['Çıkış Tarihi', selected.checkOut],
                  ['Kişi Sayısı', selected.pax],
                  ['KBS Durumu', sentList.includes(selected.id) ? '✓ Gönderildi' : '⏳ Bekliyor'],
                ].map(([k,v])=>(
                  <div key={k} className="kd-row"><span>{k}</span><strong>{v}</strong></div>
                ))}
              </div>
              <div className="modal-foot">
                <button className="btn-cancel" onClick={()=>setSelected(null)}>Kapat</button>
                {!sentList.includes(selected.id) && (
                  <button className="btn-primary" onClick={()=>{sendKBS(selected.id);setSelected(null);}}>
                    <Shield size={15}/> KBS'ye Gönder
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .kbs-page{padding:28px;display:flex;flex-direction:column;gap:18px;}
        .kbs-head{display:flex;justify-content:space-between;align-items:flex-start;}
        .kbs-head h2{font-size:22px;font-weight:800;color:#1e293b;display:flex;align-items:center;gap:10px;}
        .kbs-head span{font-size:13px;color:#94a3b8;}
        .kbs-actions{display:flex;align-items:center;gap:14px;}
        .kbs-status{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:#64748b;background:white;padding:9px 16px;border-radius:10px;border:1px solid #e2e8f0;}
        .status-dot{width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 0 3px #dcfce7;}
        .btn-primary{padding:10px 18px;border-radius:12px;border:none;background:#3b82f6;color:white;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .kbs-stats{display:flex;gap:16px;}
        .ks{background:white;border-radius:14px;border:1px solid #e2e8f0;padding:18px 24px;display:flex;align-items:center;gap:14px;}
        .ks strong{display:block;font-size:24px;font-weight:900;color:#1e293b;}
        .ks span{font-size:12px;color:#94a3b8;font-weight:700;}
        .warn-band{display:flex;align-items:center;gap:10px;background:#fffbeb;color:#b45309;padding:12px 18px;border-radius:10px;border:1px solid #fde68a;font-size:13px;font-weight:600;}
        .kbs-table-wrap{background:white;border-radius:18px;border:1px solid #e2e8f0;overflow:hidden;}
        .kbs-table{width:100%;border-collapse:collapse;}
        .kbs-table thead{background:#f8fafc;}
        .kbs-table th{text-align:left;padding:12px 14px;font-size:11px;color:#94a3b8;text-transform:uppercase;font-weight:800;}
        .kbs-table td{padding:14px;font-size:13px;color:#475569;border-bottom:1px solid #f8fafc;}
        .kbs-table tr:last-child td{border-bottom:none;}
        .rid{font-family:monospace;font-size:11px;background:#f1f5f9;padding:3px 8px;border-radius:6px;color:#64748b;font-weight:700;}
        .g-cell{display:flex;align-items:center;gap:8px;}
        .g-av{width:30px;height:30px;background:#eff6ff;color:#3b82f6;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:12px;flex-shrink:0;}
        .g-cell strong{font-size:13px;color:#1e293b;}
        .room-tag{background:#f1f5f9;color:#1e293b;font-weight:800;padding:3px 10px;border-radius:8px;font-size:12px;}
        .nat-tag{background:#f1f5f9;color:#64748b;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
        .doc{font-family:monospace;font-size:12px;color:#64748b;}
        .kbs-sent{display:flex;align-items:center;gap:5px;color:#10b981;font-weight:700;font-size:12px;}
        .kbs-wait{display:flex;align-items:center;gap:5px;color:#f59e0b;font-weight:700;font-size:12px;}
        .kbs-pending{color:#3b82f6;font-weight:700;font-size:12px;}
        .act-row{display:flex;gap:8px;}
        .act-btn{padding:6px 12px;border-radius:8px;border:none;font-size:11px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:4px;}
        .act-btn.blue{background:#eff6ff;color:#3b82f6;}
        .act-btn.grey{background:#f8fafc;color:#64748b;border:1px solid #e2e8f0;}
        .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.75);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:1000;}
        .kbs-modal{background:white;border-radius:22px;overflow:hidden;box-shadow:0 25px 50px rgba(0,0,0,0.4);width:440px;}
        .modal-head{padding:20px 24px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;}
        .modal-head h3{font-size:16px;font-weight:800;color:#1e293b;}
        .modal-head button{background:transparent;border:none;color:#94a3b8;cursor:pointer;}
        .kbs-detail{padding:20px 24px;display:flex;flex-direction:column;gap:0;}
        .kd-row{display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #f8fafc;font-size:13px;}
        .kd-row span{color:#64748b;}
        .kd-row strong{color:#1e293b;}
        .kd-row:last-child{border-bottom:none;}
        .modal-foot{padding:16px 24px;border-top:1px solid #f1f5f9;display:flex;justify-content:flex-end;gap:10px;}
        .btn-cancel{padding:10px 18px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-weight:700;cursor:pointer;}
      `}</style>
    </div>
  );
};

export default KBS;
