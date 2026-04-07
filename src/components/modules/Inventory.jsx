import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Plus, Minus, Search, AlertTriangle,
  ShoppingCart, TrendingDown, Archive, RefreshCw, X
} from 'lucide-react';

const INITIAL_STOCK = [
  { id:'S-001', name:'Şampuan (200ml)',     cat:'Banyo',       unit:'Adet', stock:120, minStock:30, cost:8  },
  { id:'S-002', name:'Sabun (100g)',        cat:'Banyo',       unit:'Adet', stock:85,  minStock:30, cost:5  },
  { id:'S-003', name:'Havlu (Küçük)',       cat:'Çamaşır',     unit:'Adet', stock:45,  minStock:20, cost:35 },
  { id:'S-004', name:'Havlu (Büyük)',       cat:'Çamaşır',     unit:'Adet', stock:38,  minStock:20, cost:65 },
  { id:'S-005', name:'Yatak Çarşafı',      cat:'Çamaşır',     unit:'Adet', stock:60,  minStock:25, cost:55 },
  { id:'S-006', name:'Yastık Kılıfı',      cat:'Çamaşır',     unit:'Adet', stock:72,  minStock:30, cost:18 },
  { id:'S-007', name:'Su (500ml)',          cat:'Minibar',     unit:'Şişe', stock:200, minStock:50, cost:3  },
  { id:'S-008', name:'Kola (330ml)',        cat:'Minibar',     unit:'Şişe', stock:96,  minStock:30, cost:8  },
  { id:'S-009', name:'Çikolata Bar',       cat:'Minibar',     unit:'Adet', stock:48,  minStock:20, cost:12 },
  { id:'S-010', name:'Kahve Kapsülü',      cat:'Oda',         unit:'Adet', stock:180, minStock:60, cost:6  },
  { id:'S-011', name:'Çay Poşeti',         cat:'Oda',         unit:'Adet', stock:250, minStock:80, cost:2  },
  { id:'S-012', name:'Tuvalet Kağıdı',     cat:'Banyo',       unit:'Rulo', stock:15,  minStock:40, cost:4  },
  { id:'S-013', name:'Deterjan (Genel)',   cat:'Temizlik',    unit:'Lt',   stock:22,  minStock:10, cost:45 },
  { id:'S-014', name:'El Dezenfektanı',    cat:'Temizlik',    unit:'Lt',   stock:8,   minStock:10, cost:60 },
];

const Inventory = () => {
  const { addNotification, inventory } = useHotel();
  const [items, setItems]       = useState(inventory && inventory.length > 0 ? inventory : INITIAL_STOCK);
  const [search, setSearch]     = useState('');
  const [catFilter, setCat]     = useState('Tümü');
  const [adjustModal, setAdjustModal] = useState(null);
  const [adjustQty, setAdjustQty]     = useState(0);
  const [adjustType, setAdjustType]   = useState('add');

  const cats = ['Tümü', ...new Set(INITIAL_STOCK.map(i=>i.cat))];

  const filtered = items.filter(i => {
    const q = search.toLowerCase();
    return (catFilter==='Tümü'||i.cat===catFilter) && (!q||i.name.toLowerCase().includes(q));
  });

  const lowStock = items.filter(i=>i.stock < i.minStock);

  const handleAdjust = () => {
    const qty = Number(adjustQty);
    setItems(prev=>prev.map(i=>i.id===adjustModal.id ? {...i, stock: Math.max(0, adjustType==='add'?i.stock+qty:i.stock-qty)} : i));
    addNotification({ type:'info', msg:`Stok güncellendi: ${adjustModal.name} (${adjustType==='add'?'+':'-'}${qty})` });
    setAdjustModal(null);
  };

  const quickOrder = (item) => {
    setItems(prev=>prev.map(i=>i.id===item.id ? {...i, stock:i.stock+50} : i));
    addNotification({ type:'success', msg:`Satın alma emri verildi: ${item.name} (+50 adet)` });
  };

  return (
    <div className="inv-page">
      <div className="inv-head">
        <div><h2>Stok & Envanter Yönetimi</h2><span>Oda malzemeleri, minibar, çamaşırhane ve temizlik stok takibi</span></div>
      </div>

      {/* Alerts */}
      {lowStock.length>0 && (
        <div className="low-alert">
          <AlertTriangle size={18} color="#b45309"/>
          <span><strong>{lowStock.length} ürün</strong> minimum stok seviyesinin altında: {lowStock.map(i=>i.name).join(', ')}</span>
        </div>
      )}

      {/* KPI */}
      <div className="inv-kpi">
        <div className="ik"><TrendingDown size={20} color="#ef4444"/><div><strong>{lowStock.length}</strong><span>Kritik Stok</span></div></div>
        <div className="ik"><Package size={20} color="#3b82f6"/><div><strong>{items.length}</strong><span>Ürün Çeşidi</span></div></div>
        <div className="ik"><Archive size={20} color="#10b981"/><div><strong>{items.reduce((s,i)=>s+i.stock,0)}</strong><span>Toplam Stok</span></div></div>
        <div className="ik"><ShoppingCart size={20} color="#f59e0b"/><div><strong>₺{items.reduce((s,i)=>s+i.stock*i.cost,0).toLocaleString()}</strong><span>Stok Değeri</span></div></div>
      </div>

      {/* Filters */}
      <div className="inv-filters">
        <div className="search-box"><Search size={14}/><input placeholder="Ürün ara..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
        <div className="cat-pills">
          {cats.map(c=><button key={c} className={`cpill ${catFilter===c?'active':''}`} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
      </div>

      {/* Table */}
      <div className="inv-table-wrap">
        <table className="inv-table">
          <thead><tr><th>Ürün Adı</th><th>Kategori</th><th>Birim</th><th>Stok</th><th>Min. Stok</th><th>Birim Maliyet</th><th>Durum</th><th>İşlem</th></tr></thead>
          <tbody>
            {filtered.map((item,i)=>{
              const low = item.stock < item.minStock;
              const critical = item.stock < item.minStock * 0.5;
              return (
                <motion.tr key={item.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.03}}>
                  <td><strong>{item.name}</strong></td>
                  <td><span className="cat-badge">{item.cat}</span></td>
                  <td>{item.unit}</td>
                  <td>
                    <div className="stock-cell">
                      <span className={`stock-num ${critical?'critical':low?'low':''}`}>{item.stock}</span>
                      <div className="stock-bar-wrap">
                        <div className="stock-bar" style={{width:`${Math.min(100,(item.stock/Math.max(item.minStock*2,1))*100)}%`, background:critical?'#ef4444':low?'#f59e0b':'#10b981'}}/>
                      </div>
                    </div>
                  </td>
                  <td>{item.minStock}</td>
                  <td>₺{item.cost}</td>
                  <td>{critical?<span className="tag red">Kritik</span>:low?<span className="tag orange">Düşük</span>:<span className="tag green">Normal</span>}</td>
                  <td>
                    <div className="act-btns">
                      <button className="act-btn blue" onClick={()=>{setAdjustModal(item);setAdjustQty(10);setAdjustType('add');}}>Giriş/Çıkış</button>
                      {low && <button className="act-btn orange" onClick={()=>quickOrder(item)}>Sipariş Ver</button>}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Adjust Modal */}
      <AnimatePresence>
        {adjustModal && (
          <motion.div className="modal-overlay" onClick={()=>setAdjustModal(null)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <motion.div className="adj-modal" onClick={e=>e.stopPropagation()} initial={{scale:.9}} animate={{scale:1}}>
              <div className="modal-head"><h3>Stok Hareketi — {adjustModal.name}</h3><button onClick={()=>setAdjustModal(null)}><X size={18}/></button></div>
              <div className="adj-body">
                <div className="cur-stock">Mevcut Stok: <strong>{adjustModal.stock} {adjustModal.unit}</strong></div>
                <div className="type-toggle">
                  <button className={adjustType==='add'?'active add':''} onClick={()=>setAdjustType('add')}><Plus size={15}/> Giriş (Stok Artır)</button>
                  <button className={adjustType==='sub'?'active sub':''} onClick={()=>setAdjustType('sub')}><Minus size={15}/> Çıkış (Stok Azalt)</button>
                </div>
                <label>Miktar ({adjustModal.unit})</label>
                <input type="number" value={adjustQty} onChange={e=>setAdjustQty(e.target.value)} min={1}/>
                <div className="new-stock">
                  Yeni Stok: <strong style={{color:adjustType==='add'?'#10b981':'#ef4444'}}>
                    {Math.max(0, adjustType==='add' ? adjustModal.stock+Number(adjustQty) : adjustModal.stock-Number(adjustQty))} {adjustModal.unit}
                  </strong>
                </div>
              </div>
              <div className="modal-foot">
                <button className="btn-cancel" onClick={()=>setAdjustModal(null)}>İptal</button>
                <button className="btn-save" onClick={handleAdjust}>Kaydet</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .inv-page{padding:28px;display:flex;flex-direction:column;gap:18px;}
        .inv-head{display:flex;justify-content:space-between;align-items:flex-start;}
        .inv-head h2{font-size:22px;font-weight:800;color:#1e293b;}
        .inv-head span{font-size:13px;color:#94a3b8;}
        .low-alert{display:flex;align-items:center;gap:10px;background:#fffbeb;color:#b45309;padding:12px 18px;border-radius:12px;border:1px solid #fde68a;font-size:13px;}
        .inv-kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .ik{background:white;border-radius:16px;border:1px solid #e2e8f0;padding:18px;display:flex;align-items:center;gap:14px;}
        .ik strong{display:block;font-size:22px;font-weight:900;color:#1e293b;}
        .ik span{font-size:12px;color:#94a3b8;font-weight:700;}
        .inv-filters{display:flex;gap:14px;align-items:center;flex-wrap:wrap;}
        .search-box{display:flex;align-items:center;gap:8px;background:white;border:1.5px solid #e2e8f0;padding:9px 14px;border-radius:10px;min-width:280px;}
        .search-box input{border:none;background:transparent;outline:none;font-size:13px;width:100%;}
        .cat-pills{display:flex;gap:8px;flex-wrap:wrap;}
        .cpill{padding:7px 14px;border-radius:20px;border:1.5px solid #e2e8f0;background:white;font-size:12px;font-weight:700;color:#64748b;cursor:pointer;}
        .cpill.active{background:#1e293b;color:white;border-color:#1e293b;}
        .inv-table-wrap{background:white;border-radius:20px;border:1px solid #e2e8f0;overflow:hidden;}
        .inv-table{width:100%;border-collapse:collapse;}
        .inv-table thead{background:#f8fafc;}
        .inv-table th{text-align:left;padding:12px 16px;font-size:11px;color:#94a3b8;text-transform:uppercase;font-weight:800;}
        .inv-table td{padding:14px 16px;font-size:13px;color:#475569;border-bottom:1px solid #f8fafc;vertical-align:middle;}
        .inv-table tr:last-child td{border-bottom:none;}
        .cat-badge{background:#f1f5f9;color:#64748b;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
        .stock-cell{display:flex;flex-direction:column;gap:4px;}
        .stock-num{font-size:16px;font-weight:900;color:#1e293b;}
        .stock-num.low{color:#f59e0b;}
        .stock-num.critical{color:#ef4444;}
        .stock-bar-wrap{width:80px;height:5px;background:#f1f5f9;border-radius:10px;overflow:hidden;}
        .stock-bar{height:100%;border-radius:10px;transition:width 0.5s;}
        .tag{padding:3px 10px;border-radius:20px;font-size:10px;font-weight:800;}
        .tag.green{background:#f0fdf4;color:#10b981;}
        .tag.orange{background:#fffbeb;color:#f59e0b;}
        .tag.red{background:#fef2f2;color:#ef4444;}
        .act-btns{display:flex;gap:8px;}
        .act-btn{padding:6px 14px;border-radius:8px;border:none;font-size:11px;font-weight:700;cursor:pointer;}
        .act-btn.blue{background:#eff6ff;color:#3b82f6;}
        .act-btn.orange{background:#fffbeb;color:#f59e0b;}
        .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.75);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:1000;}
        .adj-modal{background:white;border-radius:22px;overflow:hidden;box-shadow:0 25px 50px rgba(0,0,0,0.4);width:400px;}
        .modal-head{padding:20px 24px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;}
        .modal-head h3{font-size:16px;font-weight:800;color:#1e293b;}
        .modal-head button{background:transparent;border:none;color:#94a3b8;cursor:pointer;}
        .adj-body{padding:22px 24px;display:flex;flex-direction:column;gap:14px;}
        .cur-stock{font-size:14px;color:#64748b;background:#f8fafc;padding:12px 16px;border-radius:10px;}
        .cur-stock strong{color:#1e293b;}
        .type-toggle{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
        .type-toggle button{padding:12px;border-radius:12px;border:1.5px solid #e2e8f0;background:white;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;color:#64748b;}
        .type-toggle .active.add{background:#ecfdf5;color:#10b981;border-color:#10b981;}
        .type-toggle .active.sub{background:#fef2f2;color:#ef4444;border-color:#ef4444;}
        .adj-body label{font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;}
        .adj-body input{padding:12px 16px;border:1.5px solid #e2e8f0;border-radius:12px;font-size:16px;font-weight:700;outline:none;}
        .new-stock{font-size:13px;color:#64748b;background:#f8fafc;padding:12px 16px;border-radius:10px;}
        .modal-foot{padding:16px 24px;border-top:1px solid #f1f5f9;display:flex;justify-content:flex-end;gap:10px;}
        .btn-cancel{padding:11px 20px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-weight:700;cursor:pointer;}
        .btn-save{padding:11px 22px;border-radius:10px;border:none;background:#3b82f6;color:white;font-weight:800;cursor:pointer;}
      `}</style>
    </div>
  );
};

export default Inventory;
