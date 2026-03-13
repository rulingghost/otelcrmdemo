import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, CreditCard, CheckCircle, Printer, X, AlertCircle, Receipt } from 'lucide-react';

const Checkout = () => {
  const { reservations, checkOut, makePayment, folioLines, addNotification } = useHotel();
  const [selected, setSelected] = useState(null);
  const [payModal, setPayModal] = useState(false);
  const [method, setMethod] = useState('Kredi Kartı');
  const [payAmt, setPayAmt] = useState(0);
  const [doneId, setDoneId] = useState(null);

  // Show only guests checking out today or in-house with balance
  const departures = reservations.filter(r => r.status === 'check-in');

  const handleSelect = (r) => {
    setSelected(r);
    setPayAmt(r.balance);
    setDoneId(null);
  };

  const handlePay = () => {
    if (payAmt > 0) makePayment(selected.id, Number(payAmt), method);
    setPayModal(false);
  };

  const handleCheckout = (resId) => {
    checkOut(resId);
    setDoneId(resId);
    setSelected(null);
    addNotification({ type:'success', msg:`Hızlı check-out: ${selected.guest}` });
  };

  const lines = selected ? (folioLines[selected.id] || []) : [];
  const total = lines.reduce((s,l)=>s+l.amount, 0);

  return (
    <div className="co-layout">
      {/* Left: departure list */}
      <aside className="co-sidebar">
        <div className="cs-head">
          <h3>Check-Out Bekleyenler</h3>
          <span className="badge">{departures.length}</span>
        </div>
        <div className="co-list">
          {departures.map(r => (
            <button
              key={r.id}
              className={`co-item ${selected?.id===r.id?'active':''} ${doneId===r.id?'done':''}`}
              onClick={() => handleSelect(r)}
            >
              <div className="coi-room">{r.room}</div>
              <div className="coi-info">
                <strong>{r.guest}</strong>
                <span>Çıkış: {r.checkOut}</span>
              </div>
              {r.balance>0 ? <div className="coi-bal">₺{r.balance.toLocaleString()}</div>
                           : <CheckCircle size={16} color="#10b981"/>}
            </button>
          ))}
          {departures.length===0 && <p className="empty-msg">Check-out bekleyen misafir yok.</p>}
        </div>
      </aside>

      {/* Right: detail */}
      <main className="co-detail">
        {selected ? (
          <div className="cod-inner">
            <div className="cod-head">
              <div>
                <h2>{selected.guest}</h2>
                <span>Oda {selected.room} · {selected.board} · {selected.checkIn} — {selected.checkOut}</span>
              </div>
              <div className="cod-actions">
                <button className="btn-sec" onClick={()=>window.print()}><Printer size={15}/> Fatura</button>
                {selected.balance>0 && (
                  <button className="btn-pay" onClick={()=>setPayModal(true)}>
                    <CreditCard size={15}/> Tahsilat Al (₺{selected.balance.toLocaleString()})
                  </button>
                )}
                <button
                  className={`btn-checkout ${selected.balance>0?'warn':''}`}
                  onClick={()=>handleCheckout(selected.id)}
                >
                  <LogOut size={15}/> Check-Out'u Tamamla
                </button>
              </div>
            </div>

            {selected.balance>0 && (
              <div className="balance-warn">
                <AlertCircle size={18}/>
                <span>Bu misafirin <strong>₺{selected.balance.toLocaleString()}</strong> tutarında ödenmemiş borcu bulunuyor.</span>
              </div>
            )}

            {/* Folio summary */}
            <div className="cod-folio">
              <h3><Receipt size={16}/> Hesap Özeti</h3>
              <table className="mini-table">
                <thead><tr><th>Açıklama</th><th>Tür</th><th className="right">Tutar</th></tr></thead>
                <tbody>
                  {lines.map(l=>(
                    <tr key={l.id}>
                      <td>{l.desc}</td>
                      <td><span className={`type-tag ${l.type}`}>{l.type==='accommodation'?'Konaklama':'Ekstra'}</span></td>
                      <td className="right">₺{l.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                  {lines.length===0 && <tr><td colSpan={3} className="empty-msg">Tahakkuk yok.</td></tr>}
                </tbody>
              </table>
              <div className="folio-totals">
                <div className="ft-row"><span>Toplam</span><strong>₺{total.toLocaleString()}</strong></div>
                <div className="ft-row"><span>Ödenen</span><strong className="green">₺{selected.paid.toLocaleString()}</strong></div>
                <div className={`ft-row big ${selected.balance>0?'due':''}`}>
                  <span>{selected.balance>0?'Kalan Borç':'Hesap Durumu'}</span>
                  <strong>{selected.balance>0?`₺${selected.balance.toLocaleString()}`:'✓ Kapandı'}</strong>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="co-empty">
            <LogOut size={64} color="#e2e8f0"/>
            <p>Check-out işlemi için soldaki listeden bir misafir seçin</p>
          </div>
        )}
      </main>

      {/* Payment Modal */}
      <AnimatePresence>
        {payModal && selected && (
          <motion.div className="modal-overlay" onClick={()=>setPayModal(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <motion.div className="pay-modal" onClick={e=>e.stopPropagation()} initial={{scale:.9}} animate={{scale:1}}>
              <div className="modal-head"><h3>Tahsilat Al — {selected.guest}</h3><button onClick={()=>setPayModal(false)}><X size={20}/></button></div>
              <div className="pay-body">
                <label>Tutar (₺)</label>
                <input type="number" value={payAmt} onChange={e=>setPayAmt(e.target.value)} min={1}/>
                <div className="quick-btns">
                  {[selected.balance, Math.ceil(selected.balance/2), 500, 1000].filter((v,i,a)=>v>0&&a.indexOf(v)===i).map(v=>(
                    <button key={v} onClick={()=>setPayAmt(v)}>₺{v.toLocaleString()}</button>
                  ))}
                </div>
                <label>Yöntem</label>
                <div className="method-pills">
                  {['Nakit','Kredi Kartı','EFT/Havale'].map(m=>(
                    <button key={m} className={method===m?'active':''} onClick={()=>setMethod(m)}>{m}</button>
                  ))}
                </div>
              </div>
              <div className="modal-foot">
                <button className="btn-cancel" onClick={()=>setPayModal(false)}>İptal</button>
                <button className="btn-save" onClick={handlePay} disabled={!payAmt||payAmt<=0}>
                  <CreditCard size={15}/> Tahsil Et
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .co-layout { display:flex; height:calc(100vh - 70px); }

        .co-sidebar { width:280px; background:white; border-right:1px solid #e2e8f0; display:flex; flex-direction:column; }
        .cs-head { padding:18px 20px; border-bottom:1px solid #f1f5f9; display:flex; align-items:center; justify-content:space-between; }
        .cs-head h3 { font-size:15px; font-weight:800; color:#1e293b; }
        .badge { background:#ef4444; color:white; font-size:11px; font-weight:800; padding:2px 8px; border-radius:20px; }

        .co-list { flex:1; overflow-y:auto; padding:8px; }
        .co-item { width:100%; display:flex; align-items:center; gap:10px; padding:12px; border-radius:12px; border:none; background:transparent; cursor:pointer; text-align:left; margin-bottom:4px; transition:0.2s; }
        .co-item:hover { background:#f8fafc; }
        .co-item.active { background:#eff6ff; border:1.5px solid #3b82f6; }
        .co-item.done { opacity:.5; }
        .coi-room { width:38px; height:38px; background:#f1f5f9; color:#1e293b; font-weight:900; font-size:13px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .coi-info { flex:1; }
        .coi-info strong { display:block; font-size:13px; color:#1e293b; font-weight:700; }
        .coi-info span { font-size:11px; color:#94a3b8; }
        .coi-bal { font-size:12px; font-weight:800; color:#ef4444; }
        .empty-msg { text-align:center; padding:30px; color:#94a3b8; font-size:13px; }

        .co-detail { flex:1; padding:30px; overflow-y:auto; }
        .co-empty { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:#94a3b8; font-size:14px; font-weight:600; }
        .cod-inner { display:flex; flex-direction:column; gap:20px; }

        .cod-head { display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; }
        .cod-head h2 { font-size:22px; font-weight:800; color:#1e293b; }
        .cod-head span { font-size:13px; color:#94a3b8; }
        .cod-actions { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
        .btn-sec { padding:10px 16px; border-radius:10px; border:1.5px solid #e2e8f0; background:white; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; color:#475569; }
        .btn-pay { padding:10px 16px; border-radius:10px; border:none; background:#3b82f6; color:white; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; }
        .btn-checkout { padding:10px 18px; border-radius:10px; border:none; background:#10b981; color:white; font-size:12px; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:6px; }
        .btn-checkout.warn { background:#f59e0b; }

        .balance-warn { display:flex; align-items:center; gap:10px; background:#fffbeb; color:#b45309; padding:14px 18px; border-radius:12px; border:1px solid #fde68a; font-size:13px; }

        .cod-folio { background:white; border-radius:20px; border:1px solid #e2e8f0; padding:24px; }
        .cod-folio h3 { font-size:15px; font-weight:800; color:#1e293b; margin-bottom:16px; display:flex; align-items:center; gap:8px; }
        .mini-table { width:100%; border-collapse:collapse; margin-bottom:16px; }
        .mini-table th { text-align:left; padding:10px 14px; font-size:11px; color:#94a3b8; text-transform:uppercase; border-bottom:2px solid #f1f5f9; font-weight:800; }
        .mini-table th.right { text-align:right; }
        .mini-table td { padding:12px 14px; font-size:13px; color:#475569; border-bottom:1px solid #f8fafc; }
        .mini-table td.right { text-align:right; font-weight:700; color:#1e293b; }
        .type-tag { padding:3px 10px; border-radius:20px; font-size:10px; font-weight:800; }
        .type-tag.accommodation { background:#eff6ff; color:#3b82f6; }
        .type-tag.extra { background:#fff7ed; color:#f59e0b; }

        .folio-totals { background:#f8fafc; border-radius:12px; padding:16px; display:flex; flex-direction:column; gap:0; max-width:320px; margin-left:auto; }
        .ft-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #e2e8f0; font-size:14px; }
        .ft-row:last-child { border-bottom:none; }
        .ft-row span { color:#64748b; }
        .ft-row.big { font-size:16px; font-weight:800; padding-top:14px; }
        .ft-row.big.due strong { color:#ef4444; }
        .green { color:#10b981 !important; }

        /* Modal */
        .modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,0.75); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; z-index:1000; }
        .pay-modal { background:white; border-radius:24px; overflow:hidden; box-shadow:0 25px 50px rgba(0,0,0,0.4); width:400px; }
        .modal-head { padding:20px 26px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; }
        .modal-head h3 { font-size:17px; font-weight:800; color:#1e293b; }
        .modal-head button { background:transparent; border:none; color:#94a3b8; cursor:pointer; }
        .pay-body { padding:22px 26px; display:flex; flex-direction:column; gap:12px; }
        .pay-body label { font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; margin-bottom:-6px; }
        .pay-body input { padding:12px 16px; border:1.5px solid #e2e8f0; border-radius:12px; font-size:16px; font-weight:700; outline:none; }
        .quick-btns { display:flex; gap:8px; flex-wrap:wrap; }
        .quick-btns button { padding:6px 14px; border-radius:8px; border:1.5px solid #e2e8f0; background:white; font-size:12px; font-weight:700; cursor:pointer; }
        .quick-btns button:hover { background:#eff6ff; border-color:#3b82f6; color:#3b82f6; }
        .method-pills { display:flex; gap:8px; flex-wrap:wrap; }
        .method-pills button { padding:8px 14px; border-radius:10px; border:1.5px solid #e2e8f0; background:white; font-size:12px; font-weight:700; cursor:pointer; }
        .method-pills button.active { background:#1e293b; color:white; border-color:#1e293b; }
        .modal-foot { padding:16px 26px; border-top:1px solid #f1f5f9; display:flex; justify-content:flex-end; gap:10px; }
        .btn-cancel { padding:11px 20px; border-radius:10px; border:1px solid #e2e8f0; background:white; font-weight:700; cursor:pointer; }
        .btn-save { padding:11px 22px; border-radius:10px; border:none; background:#3b82f6; color:white; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:8px; }
        .btn-save:disabled { opacity:.5; cursor:not-allowed; }
      `}</style>
    </div>
  );
};

export default Checkout;
