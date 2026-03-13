import React, { useState, useEffect } from 'react';
import { 
  Utensils, Search, Plus, 
  Table as TableIcon, CreditCard, Banknote,
  Clock, CheckCircle, ChevronRight,
  Printer, Trash2, Edit2, ShoppingBag,
  User, DollarSign, Filter,
  LayoutGrid, Grid, Layers, X,
  AlertTriangle, Smartphone, Monitor,
  History, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const tables = [
  { id: 'A-01', status: 'occupied', seats: 4, amount: '₺ 1,240', time: '45 dk' },
  { id: 'A-02', status: 'available', seats: 2, amount: '-', time: '-' },
  { id: 'A-03', status: 'reserved', seats: 6, amount: '-', time: '19:00' },
  { id: 'B-01', status: 'occupied', seats: 4, amount: '₺ 850', time: '12 dk' },
  { id: 'B-02', status: 'dirty', seats: 4, amount: '-', time: '-' },
  { id: 'B-03', status: 'occupied', seats: 2, amount: '₺ 420', time: '60 dk' },
  { id: 'C-01', status: 'available', seats: 8, amount: '-', time: '-' },
  { id: 'C-02', status: 'available', seats: 4, amount: '-', time: '-' },
];

const menuItems = [
  { id: 1, name: 'Izgara Köfte', price: 340, category: 'Ana Yemek', img: '🥩', recipe: 'OK' },
  { id: 2, name: 'Mercimek Çorbası', price: 120, category: 'Başlangıç', img: '🥣', recipe: 'OK' },
  { id: 3, name: 'Sezar Salata', price: 210, category: 'Salatalar', img: '🥗', recipe: 'Warn' },
  { id: 4, name: 'Tiramisu', price: 180, category: 'Tatlılar', img: '🍰', recipe: 'OK' },
  { id: 5, name: 'Coca Cola', price: 65, category: 'İçecekler', img: '🥤', recipe: 'OK' },
  { id: 6, name: 'Kuzu Pirzola', price: 480, category: 'Ana Yemek', img: '🍖', recipe: 'OK' },
];

const RestaurantPOS = () => {
  const [view, setView] = useState('tables'); // 'tables' or 'order'
  const [selectedTable, setSelectedTable] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const total = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

  return (
    <div className="pos-container">
      <header className="pos-header">
         <div className="title-section">
            <Utensils size={32} className="icon-blue"/>
            <div>
               <h2>A'la Carte & POS Terminali</h2>
               <span>Masa yönetimi, adisyon ve oda kredilendirme merkezi</span>
            </div>
         </div>
         <div className="header-actions">
            <div className="pos-mode">
               <button className={view === 'tables' ? 'active' : ''} onClick={() => setView('tables')}><LayoutGrid size={18}/> MASA PLANI</button>
               <button className={view === 'order' ? 'active' : ''} onClick={() => setView('order')}><History size={18}/> ADİSYON (KDS)</button>
            </div>
            <button className="btn-pos primary"><Printer size={18}/> RAPOR AL</button>
         </div>
      </header>

      {view === 'tables' ? (
        <div className="tables-grid">
           {tables.map(table => (
             <motion.div 
               key={table.id} 
               className={`table-card ${table.status}`}
               whileHover={{ scale: 1.02 }}
               onClick={() => { setSelectedTable(table); setView('order'); }}
             >
                <div className="t-head">
                   <strong>{table.id}</strong>
                   <span className="seats">{table.seats} Kişilik</span>
                </div>
                <div className="t-body">
                   {table.status === 'occupied' ? (
                     <>
                        <div className="t-amount">{table.amount}</div>
                        <div className="t-time"><Clock size={12}/> {table.time}</div>
                     </>
                   ) : table.status === 'reserved' ? (
                     <div className="t-reserved">REZERVE: {table.time}</div>
                   ) : (
                     <div className="t-status">{table.status.toUpperCase()}</div>
                   )}
                </div>
                {table.status === 'occupied' && <div className="t-indicator"></div>}
             </motion.div>
           ))}
        </div>
      ) : (
        <div className="order-grid">
           {/* Left - Menu Selection */}
           <main className="menu-section">
              <div className="menu-header">
                 <div className="table-tag">
                    <TableIcon size={16}/> MASA: <strong>{selectedTable?.id || 'Hızlı-Satış'}</strong>
                 </div>
                 <div className="search-box">
                    <Search size={18}/>
                    <input type="text" placeholder="Ürün veya kategori ara..." />
                 </div>
              </div>
              
              <div className="menu-items">
                 {menuItems.map(item => (
                   <motion.div 
                     key={item.id} 
                     className="menu-card"
                     whileTap={{ scale: 0.95 }}
                     onClick={() => addToCart(item)}
                   >
                      <div className="item-img">{item.img}</div>
                      <div className="item-info">
                         <span className="name">{item.name}</span>
                         <span className="price">₺{item.price}</span>
                      </div>
                      {item.recipe === 'Warn' && <div className="recipe-warn" title="Kritik Stok!"><AlertTriangle size={12}/></div>}
                   </motion.div>
                 ))}
              </div>
           </main>

           {/* Right - Live Bill / Adisyon */}
           <aside className="bill-section card">
              <div className="bill-header">
                 <h3>ADİSYON DETAYI</h3>
                 <span className="guest-info">Misafir: <strong>Oda 302</strong></span>
              </div>
              
              <div className="bill-items">
                 <AnimatePresence>
                    {cart.map(item => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        key={item.id} className="bill-item"
                      >
                         <div className="qty">{item.qty}x</div>
                         <div className="details">
                            <strong>{item.name}</strong>
                            <span>Adet: ₺{item.price}</span>
                         </div>
                         <div className="amount">₺{item.price * item.qty}</div>
                         <button className="del-btn" onClick={() => setCart(cart.filter(c => c.id !== item.id))}><X size={14}/></button>
                      </motion.div>
                    ))}
                 </AnimatePresence>
                 {cart.length === 0 && (
                   <div className="empty-bill">
                      <Utensils size={48} className="gray"/>
                      <p>Sipariş bekleniyor...</p>
                   </div>
                 )}
              </div>

              <div className="bill-footer">
                 <div className="total-lines">
                    <div className="line"><span>Ara Toplam</span><strong>₺{total}</strong></div>
                    <div className="line"><span>KDV (%10)</span><strong>₺{Math.round(total * 0.1)}</strong></div>
                    <div className="line total"><span>GENEL TOPLAM</span><strong>₺{Math.round(total * 1.1)}</strong></div>
                 </div>
                 
                 <div className="pay-options">
                    <button className="btn-pay room"><User size={18}/> ODAYA YAZ</button>
                    <button className="btn-pay cash"><Banknote size={18}/> NAKİT / KK</button>
                 </div>
                 <div className="quick-actions">
                    <button className="qa-btn"><Layers size={16}/> Hesap Böl</button>
                    <button className="qa-btn"><Printer size={16}/> İkram</button>
                 </div>
              </div>
           </aside>
        </div>
      )}

      <style jsx>{`
        .pos-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .pos-header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-blue { color: #3b82f6; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { font-size: 14px; color: #64748b; }

        .header-actions { display: flex; gap: 20px; }
        .pos-mode { display: flex; background: white; padding: 6px; border-radius: 14px; border: 1px solid #e2e8f0; }
        .pos-mode button { border: none; background: transparent; padding: 10px 15px; border-radius: 10px; font-size: 13px; font-weight: 800; color: #64748b; cursor: pointer; display: flex; align-items: center; gap: 10px; }
        .pos-mode button.active { background: #3b82f6; color: white; }

        .btn-pos.primary { background: #1e293b; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; }

        /* Table Grid */
        .tables-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 25px; }
        .table-card { background: white; border-radius: 20px; padding: 25px; border: 1px solid #e2e8f0; cursor: pointer; position: relative; transition: 0.2s; }
        .table-card.occupied { border-color: #3b82f6; border-left: 6px solid #3b82f6; }
        .table-card.available { border-color: #10b981; opacity: 0.8; }
        .table-card.reserved { background: #fffcf0; border-color: #f59e0b; }
        .table-card.dirty { background: #fef2f2; border-color: #ef4444; border-style: dashed; }
        
        .t-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .t-head strong { font-size: 18px; color: #1e293b; }
        .seats { font-size: 11px; font-weight: 800; color: #94a3b8; }
        .t-amount { font-size: 20px; font-weight: 900; color: #3b82f6; margin-bottom: 5px; }
        .t-time { font-size: 12px; font-weight: 700; color: #94a3b8; display: flex; align-items: center; gap: 6px; }
        .t-indicator { position: absolute; top: 12px; right: 12px; width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; box-shadow: 0 0 10px #3b82f6; animation: blink 2s infinite; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }

        /* Order View */
        .order-grid { display: grid; grid-template-columns: 1fr 400px; gap: 30px; }
        .menu-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .table-tag { background: #1e293b; color: white; padding: 10px 20px; border-radius: 12px; font-size: 14px; display: flex; align-items: center; gap: 10px; }
        .search-box { background: white; border: 1px solid #e2e8f0; padding: 10px 20px; border-radius: 12px; display: flex; align-items: center; gap: 12px; width: 300px; }
        .search-box input { border: none; outline: none; width: 100%; font-size: 14px; }

        .menu-items { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 15px; }
        .menu-card { background: white; border-radius: 18px; border: 1px solid #e2e8f0; padding: 20px; text-align: center; cursor: pointer; position: relative; }
        .item-img { font-size: 32px; margin-bottom: 12px; }
        .item-info .name { display: block; font-size: 13px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
        .item-info .price { font-size: 15px; font-weight: 900; color: #3b82f6; }
        .recipe-warn { position: absolute; top: 10px; right: 10px; color: #f59e0b; }

        .bill-section { display: flex; flex-direction: column; background: white; height: 100%; }
        .bill-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 2px dashed #f1f5f9; padding-bottom: 15px; }
        .bill-header h3 { font-size: 14px; font-weight: 900; }
        .guest-info { font-size: 12px; color: #64748b; }

        .bill-items { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; }
        .bill-item { display: flex; align-items: center; gap: 12px; padding: 10px; background: #f8fafc; border-radius: 10px; position: relative; }
        .qty { font-weight: 900; color: #3b82f6; width: 30px; }
        .details { flex: 1; }
        .details strong { display: block; font-size: 13px; color: #1e293b; }
        .details span { font-size: 11px; color: #94a3b8; }
        .amount { font-weight: 800; color: #1e293b; }
        .del-btn { background: transparent; border: none; color: #cbd5e1; cursor: pointer; }

        .bill-footer { padding-top: 20px; border-top: 2px dashed #f1f5f9; margin-top: 20px; }
        .line { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; color: #64748b; }
        .line.total { border-top: 1px solid #f1f5f9; padding-top: 12px; font-size: 18px; color: #10b981; font-weight: 900; }
        
        .pay-options { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
        .btn-pay { border: none; padding: 15px; border-radius: 12px; color: white; font-weight: 800; font-size: 12px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .btn-pay.room { background: #f59e0b; }
        .btn-pay.cash { background: #10b981; }

        .quick-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px; }
        .qa-btn { background: #f1f5f9; border: none; padding: 10px; border-radius: 8px; font-size: 11px; font-weight: 700; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }

        .gray { color: #cbd5e1; }
        .card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 30px; }
        .empty-bill { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; opacity: 0.5; }
      `}</style>
    </div>
  );
};

export default RestaurantPOS;
