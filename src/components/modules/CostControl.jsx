import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Utensils, TrendingDown, AlertTriangle, X,
  ArrowRight, PieChart, Info, History, Package, Search, Plus, Trash2, Edit2
} from 'lucide-react';

const CostControl = () => {
  const { addNotification } = useHotel();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [showWaste, setShowWaste] = useState(false);

  const [recipes, setRecipes] = useState([
    { id: 'RC-001', name: 'Klasik Hamburger', cost: 125, price: 450, ingredients: 'Et 150g, Ekmek, Soğan, Salata, Sos' },
    { id: 'RC-002', name: 'Margarita Pizza', cost: 85, price: 380, ingredients: 'Hamur, Mozzarella, Domates Sos, Fesleğen' },
    { id: 'RC-003', name: 'Izgara Bonfile', cost: 320, price: 850, ingredients: 'Dana bonfile 250g, Tereyağ, Garnitür' },
    { id: 'RC-004', name: 'Sezar Salata', cost: 65, price: 290, ingredients: 'Marul, Parmesan, Kruton, Sezar Sos, Tavuk' },
    { id: 'RC-005', name: 'Deniz Mahkemesi', cost: 280, price: 680, ingredients: 'Karides, Kalamar, Midye, Pirinç, Sebze' },
    { id: 'RC-006', name: 'Club Sandwich', cost: 95, price: 220, ingredients: 'Tost Ekmek, Tavuk, Jambon, Yumurta, Salata' },
  ]);

  const [wastes, setWastes] = useState([
    { id:'W-001', item:'Domates (5 kg)', reason:'Son kullanma', amount: 120, date:'2026-03-14' },
    { id:'W-002', item:'Süt (10 Lt)', reason:'Bozulma', amount: 85, date:'2026-03-13' },
  ]);

  const [form, setForm] = useState({ name:'', cost:'', price:'', ingredients:'' });
  const [wasteForm, setWasteForm] = useState({ item:'', reason:'Son kullanma', amount:'' });
  const idCounters = React.useRef({ recipe:6, waste:2 });

  const submitRecipe = (e) => {
    e.preventDefault();
    idCounters.current.recipe++;
    const id = `RC-${String(idCounters.current.recipe).padStart(3,'0')}`;
    setRecipes(p => [...p, { ...form, id, cost:Number(form.cost), price:Number(form.price) }]);
    addNotification({ type:'info', msg:`Yeni reçete oluşturuldu: ${form.name}` });
    setForm({ name:'', cost:'', price:'', ingredients:'' });
    setShowForm(false);
  };

  const submitWaste = (e) => {
    e.preventDefault();
    idCounters.current.waste++;
    const id = `W-${String(idCounters.current.waste).padStart(3,'0')}`;
    setWastes(p => [...p, { ...wasteForm, id, amount:Number(wasteForm.amount), date: new Date().toISOString().slice(0,10) }]);
    addNotification({ type:'warn', msg:`Zayi kaydı: ${wasteForm.item} — ₺${wasteForm.amount}` });
    setWasteForm({ item:'', reason:'Son kullanma', amount:'' });
    setShowWaste(false);
  };

  const deleteRecipe = (id) => { setRecipes(p => p.filter(r => r.id !== id)); };

  const filtered = recipes.filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()));
  const avgFoodCost = recipes.length > 0 ? (recipes.reduce((s,r) => s + (r.cost/r.price*100), 0) / recipes.length).toFixed(1) : 0;
  const totalWaste = wastes.reduce((s,w) => s + w.amount, 0);

  return (
    <div className="cc-page">
      <div className="cc-head">
        <div>
          <h2><Calculator size={20}/> Maliyet Kontrol & Reçete Yönetimi</h2>
          <span>F&B maliyetleri, COGS analizi ve stok varyans takibi</span>
        </div>
        <div className="head-stats">
          <div className={`hs-i ${Number(avgFoodCost)>30?'red':'green'}`}>Global Food Cost: %{avgFoodCost}</div>
          <button className="btn-primary" onClick={()=>setShowForm(true)}><Plus size={14}/> Yeni Reçete Oluştur</button>
        </div>
      </div>

      {/* Recipe Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form className="recipe-form" onSubmit={submitRecipe} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div className="rf-head"><h3>Yeni Reçete</h3><button type="button" onClick={()=>setShowForm(false)}><X size={18}/></button></div>
            <div className="rf-grid">
              <div className="rf"><label>Ürün Adı *</label><input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Ör: Izgara Tavuk" required/></div>
              <div className="rf"><label>Maliyet (₺) *</label><input type="number" value={form.cost} onChange={e=>setForm(p=>({...p,cost:e.target.value}))} required/></div>
              <div className="rf"><label>Satış Fiyatı (₺) *</label><input type="number" value={form.price} onChange={e=>setForm(p=>({...p,price:e.target.value}))} required/></div>
              <div className="rf full"><label>İçindekiler</label><input value={form.ingredients} onChange={e=>setForm(p=>({...p,ingredients:e.target.value}))} placeholder="Et, Ekmek, Soğan..."/></div>
            </div>
            <div className="rf-foot"><button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>İptal</button><button type="submit" className="btn-primary">Reçete Kaydet</button></div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="cc-grid">
        <div className="cc-main">
          <div className="cc-card">
            <div className="ccc-head">
              <h3>Reçete Bazlı Maliyet Analizi</h3>
              <div className="search-bar">
                <Search size={14} color="#94a3b8"/>
                <input placeholder="Ürün veya reçete ara..." value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
            </div>

            <div className="recipe-list">
              <div className="rl-head">
                <span>Ürün Adı</span>
                <span>Maliyet</span>
                <span>Satış</span>
                <span>Marj (%)</span>
                <span>Durum</span>
                <span></span>
              </div>
              {filtered.map((r, i) => {
                const foodCost = ((r.cost / r.price) * 100).toFixed(1);
                const status = foodCost > 35 ? 'high' : foodCost < 25 ? 'low' : 'normal';
                return (
                  <motion.div 
                    key={r.id} 
                    className="rl-row"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="rl-name"><strong>{r.name}</strong><div className="rl-ingr">{r.ingredients}</div></div>
                    <div className="rl-cost">₺{r.cost}</div>
                    <div className="rl-price">₺{r.price}</div>
                    <div className="rl-percent">
                      <div className="p-bar-bg"><div className="p-bar" style={{ width: `${foodCost}%`, background: foodCost > 35 ? '#ef4444' : '#10b981' }}/></div>
                      <span>%{foodCost}</span>
                    </div>
                    <div className={`rl-status ${status}`}>
                      {status === 'high' ? <><AlertTriangle size={12}/> Yüksek</> : status === 'low' ? 'İdeal' : 'Normal'}
                    </div>
                    <button className="rl-del" onClick={()=>deleteRecipe(r.id)}><Trash2 size={14}/></button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="cc-sidebar">
          <div className="cogs-card">
            <h3>COGS Dağılımı</h3>
            <div className="cogs-stats">
              {[
                { label:'Mutfak', pct: 32.1, color:'#3b82f6' },
                { label:'Bar', pct: 18.4, color:'#10b981' },
                { label:'Minibar', pct: 12.5, color:'#f59e0b' },
              ].map(c => (
                <div key={c.label} className="cs-i">
                  <span>{c.label}</span>
                  <strong>%{c.pct}</strong>
                  <div className="cs-bar" style={{ width: `${c.pct}%`, background: c.color }}/>
                </div>
              ))}
            </div>
          </div>

          <div className="warning-box">
            <div className="wb-head">
              <TrendingDown size={18} color="#ef4444"/>
              <strong>Zayi & Fire Takibi</strong>
            </div>
            <div className="waste-list">
              {wastes.map(w => (
                <div key={w.id} className="waste-row">
                  <span>{w.item}</span>
                  <span className="waste-reason">{w.reason}</span>
                  <strong>₺{w.amount}</strong>
                </div>
              ))}
              <div className="waste-total">Toplam Fire: ₺{totalWaste}</div>
            </div>
            <button className="wb-btn" onClick={()=>setShowWaste(true)}><History size={12}/> Zayi Kaydı Gir</button>
          </div>

          {/* Waste Form Modal */}
          <AnimatePresence>
            {showWaste && (
              <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowWaste(false)}>
                <motion.form className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()} onSubmit={submitWaste}>
                  <div className="mb-head"><h3>Zayi Kaydı</h3><button type="button" onClick={()=>setShowWaste(false)}><X size={18}/></button></div>
                  <div className="rf-grid">
                    <div className="rf"><label>Ürün *</label><input value={wasteForm.item} onChange={e=>setWasteForm(p=>({...p,item:e.target.value}))} placeholder="Ör: Domates 5kg" required/></div>
                    <div className="rf"><label>Tutar (₺) *</label><input type="number" value={wasteForm.amount} onChange={e=>setWasteForm(p=>({...p,amount:e.target.value}))} required/></div>
                    <div className="rf"><label>Neden</label><select value={wasteForm.reason} onChange={e=>setWasteForm(p=>({...p,reason:e.target.value}))}><option>Son kullanma</option><option>Bozulma</option><option>Depolama hatası</option><option>Üretim firesi</option></select></div>
                  </div>
                  <div className="rf-foot"><button type="submit" className="btn-primary">Kaydı Gir</button></div>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="summary-list">
            <h4>Hızlı İşlemler</h4>
            <button className="sl-btn" onClick={()=>setShowWaste(true)}><History size={14}/> Zayi Kaydı Gir</button>
            <button className="sl-btn" onClick={()=>addNotification({type:'info',msg:'Sayım farkı raporu oluşturuluyor...'})}><Package size={14}/> Sayım Farkı Raporu</button>
            <button className="sl-btn" onClick={()=>addNotification({type:'info',msg:'Menü mühendisliği analizi başlatıldı'})}><PieChart size={14}/> Menü Mühendisliği</button>
          </div>
        </div>
      </div>

      <style>{`
        .cc-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .cc-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .cc-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .cc-head span { font-size: 13px; color: #94a3b8; }
        
        .head-stats { display: flex; align-items: center; gap: 16px; }
        .hs-i { padding: 8px 16px; border-radius: 20px; font-size: 11px; font-weight: 800; }
        .hs-i.red { background: #fef2f2; color: #ef4444; border: 1px solid #fee2e2; }
        .hs-i.green { background: #f0fdf4; color: #10b981; border: 1px solid #bbf7d0; }
        .btn-primary { padding: 10px 18px; border-radius: 12px; border: none; background: #1e293b; color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .btn-cancel { padding: 10px 18px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; font-weight: 700; cursor: pointer; font-size: 13px; }

        /* Recipe Form */
        .recipe-form { background: white; border-radius: 18px; border: 1.5px solid #e2e8f0; padding: 22px; }
        .rf-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .rf-head h3 { font-size: 15px; font-weight: 800; color: #1e293b; }
        .rf-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .rf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .rf { display: flex; flex-direction: column; gap: 6px; }
        .rf.full { grid-column: 1 / -1; }
        .rf label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
        .rf input, .rf select { padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; outline: none; }
        .rf input:focus { border-color: #3b82f6; }
        .rf-foot { display: flex; justify-content: flex-end; gap: 10px; margin-top: 14px; }

        .cc-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        
        .cc-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .ccc-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .ccc-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .search-bar { background: #f8fafc; border: 1.5px solid #f1f5f9; border-radius: 10px; padding: 6px 12px; display: flex; align-items: center; gap: 8px; width: 220px; }
        .search-bar input { border: none; background: transparent; outline: none; font-size: 12px; width: 100%; }

        .recipe-list { display: flex; flex-direction: column; }
        .rl-head { display: grid; grid-template-columns: 2fr 80px 80px 1fr 90px 40px; padding: 12px; font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; border-bottom: 1.5px solid #f8fafc; }
        .rl-row { display: grid; grid-template-columns: 2fr 80px 80px 1fr 90px 40px; padding: 14px 12px; align-items: center; border-bottom: 1px solid #f8fafc; transition: 0.2s; }
        .rl-row:hover { background: #f8fafc; }
        .rl-name strong { font-size: 14px; color: #1e293b; display: block; }
        .rl-ingr { font-size: 10px; color: #94a3b8; margin-top: 2px; }
        .rl-cost, .rl-price { font-size: 13px; font-weight: 700; color: #475569; }
        
        .rl-percent { display: flex; align-items: center; gap: 10px; }
        .p-bar-bg { flex: 1; height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden; }
        .p-bar { height: 100%; border-radius: 10px; }
        .rl-percent span { font-size: 11px; font-weight: 800; color: #1e293b; width: 40px; }

        .rl-status { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; display: flex; align-items: center; gap: 4px; justify-content: center; }
        .rl-status.high { background: #fef2f2; color: #ef4444; }
        .rl-status.low { background: #f0fdf4; color: #10b981; }
        .rl-status.normal { background: #f1f5f9; color: #64748b; }
        .rl-del { background: none; border: none; color: #cbd5e1; cursor: pointer; }
        .rl-del:hover { color: #ef4444; }

        .cc-sidebar { display: flex; flex-direction: column; gap: 20px; }
        .cogs-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .cogs-card h3 { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        .cogs-stats { display: flex; flex-direction: column; gap: 16px; }
        .cs-i { display: flex; flex-direction: column; gap: 6px; }
        .cs-i span { font-size: 11px; font-weight: 700; color: #94a3b8; }
        .cs-i strong { font-size: 16px; font-weight: 900; color: #1e293b; }
        .cs-bar { height: 4px; border-radius: 10px; }

        .warning-box { background: #fff5f5; border: 1px solid #ffe3e3; border-radius: 20px; padding: 20px; }
        .wb-head { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .wb-head strong { font-size: 14px; color: #ef4444; }
        .waste-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
        .waste-row { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #64748b; padding: 6px 0; border-bottom: 1px solid #fee2e2; }
        .waste-row strong { color: #ef4444; }
        .waste-reason { font-size: 10px; color: #94a3b8; }
        .waste-total { font-size: 13px; font-weight: 800; color: #ef4444; padding-top: 6px; }
        .wb-btn { background: white; border: 1px solid #fee2e2; padding: 8px 14px; border-radius: 8px; font-size: 11px; font-weight: 700; color: #ef4444; cursor: pointer; display: flex; align-items: center; gap: 6px; width: 100%; justify-content: center; }

        .summary-list { display: flex; flex-direction: column; gap: 8px; }
        .summary-list h4 { font-size: 12px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; padding-left: 10px; }
        .sl-btn { background: white; border: 1.5px solid #f1f5f9; border-radius: 14px; padding: 12px 16px; display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 700; color: #475569; cursor: pointer; transition: 0.2s; }
        .sl-btn:hover { border-color: #1e293b; color: #1e293b; background: #f8fafc; }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-box { background: white; border-radius: 20px; width: 420px; padding: 24px; }
        .mb-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .mb-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .mb-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default CostControl;
