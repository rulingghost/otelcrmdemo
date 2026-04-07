import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, BarChart3, PieChart, TrendingUp, X,
  ArrowUpRight, ArrowDownRight, Edit3, Save, Plus,
  Calendar, CheckCircle2, ChevronRight, DollarSign, AlertCircle, Trash2
} from 'lucide-react';

const BudgetPlanning = () => {
  const { addNotification } = useHotel();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [detail, setDetail] = useState(null);

  const [budgets, setBudgets] = useState([
    { id:'B-001', dept: 'Konaklama', budget: 15000000, actual: 12450000 },
    { id:'B-002', dept: 'Yiyecek & İçecek', budget: 5200000, actual: 4800000 },
    { id:'B-003', dept: 'SPA & Sağlık', budget: 1200000, actual: 850000 },
    { id:'B-004', dept: 'Operasyonel Giderler', budget: 2400000, actual: 2100000 },
    { id:'B-005', dept: 'Pazarlama', budget: 850000, actual: 920000 },
  ]);

  const [form, setForm] = useState({ dept:'', budget:'', actual:'' });
  const [editBudget, setEditBudget] = useState('');
  const idCounter = React.useRef(5);

  const totalBudget = budgets.reduce((s,b) => s + b.budget, 0);
  const totalActual = budgets.reduce((s,b) => s + b.actual, 0);
  const globalProgress = totalBudget > 0 ? ((totalActual / totalBudget) * 100).toFixed(1) : 0;

  const getStatus = (b) => {
    const progress = (b.actual / b.budget) * 100;
    if (progress > 100) return 'over-budget';
    if (progress >= 90) return 'ahead';
    if (progress >= 70) return 'on-track';
    return 'behind';
  };

  const submitBudget = (e) => {
    e.preventDefault();
    idCounter.current++;
    const id = `B-${String(idCounter.current).padStart(3,'0')}`;
    setBudgets(p => [...p, { ...form, id, budget:Number(form.budget), actual:Number(form.actual) }]);
    addNotification({ type:'info', msg:`Yeni bütçe kalemi eklendi: ${form.dept}` });
    setForm({ dept:'', budget:'', actual:'' });
    setShowForm(false);
  };

  const startEdit = (b) => {
    setEditing(b.id);
    setEditBudget(b.budget.toString());
  };

  const saveEdit = (id) => {
    setBudgets(p => p.map(b => b.id === id ? { ...b, budget: Number(editBudget) } : b));
    addNotification({ type:'success', msg:'Bütçe güncellendi' });
    setEditing(null);
  };

  const updateActual = (id, amount) => {
    setBudgets(p => p.map(b => b.id === id ? { ...b, actual: b.actual + amount } : b));
    addNotification({ type:'info', msg:`Gerçekleşen güncellendi: +₺${amount.toLocaleString()}` });
  };

  const deleteBudget = (id) => {
    setBudgets(p => p.filter(b => b.id !== id));
  };

  const overBudgetDepts = budgets.filter(b => (b.actual / b.budget * 100) > 100);

  return (
    <div className="bp-page">
      <div className="bp-head">
        <div>
          <h2><Target size={20}/> Bütçe Planlama & Takibi</h2>
          <span>Departman bazlı yıllık finansal hedefler ve gerçekleşme oranları</span>
        </div>
        <div className="head-actions">
          <button className="btn-primary" onClick={()=>setShowForm(true)}><Plus size={14}/> Yeni Bütçe Kalemi</button>
        </div>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form className="budget-form" onSubmit={submitBudget} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div className="bf-head"><h3>Yeni Bütçe Kalemi</h3><button type="button" onClick={()=>setShowForm(false)}><X size={18}/></button></div>
            <div className="bf-grid">
              <div className="bf"><label>Departman *</label><input value={form.dept} onChange={e=>setForm(p=>({...p,dept:e.target.value}))} placeholder="Ör: Eğlence" required/></div>
              <div className="bf"><label>Yıllık Bütçe (₺) *</label><input type="number" value={form.budget} onChange={e=>setForm(p=>({...p,budget:e.target.value}))} required/></div>
              <div className="bf"><label>Gerçekleşen (₺)</label><input type="number" value={form.actual} onChange={e=>setForm(p=>({...p,actual:e.target.value}))} placeholder="0"/></div>
            </div>
            <div className="bf-foot"><button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>İptal</button><button type="submit" className="btn-primary">Ekle</button></div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Global Progress */}
      <div className="bp-global">
        <div className="bg-left">
          <span className="bg-label">Toplam Bütçe Gerçekleşme Oranı</span>
          <div className="bg-val-row">
            <strong>%{globalProgress}</strong>
            <div className="bg-bar-wrap"><motion.div className="bg-bar" initial={{ width: 0 }} animate={{ width: `${Math.min(globalProgress, 100)}%` }} /></div>
          </div>
        </div>
        <div className="bg-right">
          <div className="bg-stat">
            <span>Hedef</span>
            <strong>₺{(totalBudget/1000000).toFixed(1)}M</strong>
          </div>
          <div className="bg-stat">
            <span>Gerçekleşen</span>
            <strong>₺{(totalActual/1000000).toFixed(1)}M</strong>
          </div>
        </div>
      </div>

      <div className="bp-content">
        <div className="dept-grid">
          {budgets.map((b, i) => {
            const progress = Math.round((b.actual / b.budget) * 100);
            const status = getStatus(b);
            return (
              <motion.div 
                key={b.id} 
                className={`depth-card ${status}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="dc-head">
                  <strong>{b.dept}</strong>
                  <div className={`status-pill ${status}`}>
                    {status === 'ahead' ? 'Hedef Üstü' : status === 'on-track' ? 'Planda' : status === 'behind' ? 'Gecikmede' : 'Aşım'}
                  </div>
                </div>
                
                <div className="dc-metrics">
                  <div className="dcm">
                    <span>Bütçe</span>
                    {editing === b.id ? (
                      <div style={{display:'flex',gap:6,marginTop:4}}>
                        <input type="number" value={editBudget} onChange={e=>setEditBudget(e.target.value)} style={{width:100,padding:'4px 8px',borderRadius:6,border:'1.5px solid #3b82f6',fontSize:12}}/>
                        <button onClick={()=>saveEdit(b.id)} style={{background:'#10b981',color:'white',border:'none',borderRadius:6,padding:'4px 8px',cursor:'pointer',fontSize:11}}><Save size={12}/></button>
                      </div>
                    ) : (
                      <strong>₺{(b.budget/1000000).toFixed(1)}M</strong>
                    )}
                  </div>
                  <div className="dcm">
                    <span>Gerçekleşen</span>
                    <strong>₺{(b.actual/1000000).toFixed(1)}M</strong>
                  </div>
                </div>

                <div className="dc-progress">
                  <div className="dcp-info"><span>İlerleme</span><strong>%{progress}</strong></div>
                  <div className="dcp-bar-bg"><div className="dcp-bar" style={{ width: `${Math.min(progress, 100)}%`, background: progress > 100 ? '#ef4444' : '#3b82f6' }}/></div>
                </div>

                <div className="dc-actions">
                  <button className="dc-btn" onClick={()=>startEdit(b)}><Edit3 size={12}/> Düzenle</button>
                  <button className="dc-btn" onClick={()=>updateActual(b.id, 100000)}>+₺100K</button>
                  <button className="dc-btn del" onClick={()=>deleteBudget(b.id)}><Trash2 size={12}/></button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="bp-sidebar">
          <div className="comparison-card">
            <h3>Yıllık Karşılaştırma</h3>
            <div className="comp-list">
              {[
                { year: '2026 (Tahmin)', val: `₺${(totalBudget/1000000).toFixed(1)}M`, trend: '+12.5%', color: '#3b82f6' },
                { year: '2025 (Gerçek)', val: '₺21.5M', trend: '+8.2%', color: '#10b981' },
                { year: '2024 (Gerçek)', val: '₺19.8M', trend: '+4.1%', color: '#94a3b8' },
              ].map(c => (
                <div key={c.year} className="comp-row">
                  <div className="cr-year" style={{ borderLeft: `3px solid ${c.color}` }}>
                    <span>{c.year}</span>
                    <strong>{c.val}</strong>
                  </div>
                  <div className="cr-trend up"><ArrowUpRight size={12}/> {c.trend}</div>
                </div>
              ))}
            </div>
          </div>

          {overBudgetDepts.length > 0 && (
            <div className="warning-card">
              <div className="wc-head"><AlertCircle size={18} color="#ef4444"/> <strong>Bütçe Alarmı</strong></div>
              {overBudgetDepts.map(d => (
                <p key={d.id}><strong>"{d.dept}"</strong> departmanı bütçesi %{Math.round((d.actual/d.budget-1)*100)} oranında aşıldı.</p>
              ))}
            </div>
          )}

          <div className="dept-summary">
            <h4>Departman Sayıları</h4>
            <div className="ds-row"><span>Toplam</span><strong>{budgets.length}</strong></div>
            <div className="ds-row"><span>Planda</span><strong style={{color:'#3b82f6'}}>{budgets.filter(b=>getStatus(b)==='on-track').length}</strong></div>
            <div className="ds-row"><span>Bütçe Aşımı</span><strong style={{color:'#ef4444'}}>{overBudgetDepts.length}</strong></div>
          </div>
        </div>
      </div>

      <style>{`
        .bp-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .bp-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .bp-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .bp-head span { font-size: 13px; color: #94a3b8; }
        
        .btn-primary { padding: 10px 18px; border-radius: 12px; border: none; background: #1e293b; color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .btn-cancel { padding: 10px 18px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; font-weight: 700; cursor: pointer; font-size: 13px; }

        /* Form */
        .budget-form { background: white; border-radius: 18px; border: 1.5px solid #e2e8f0; padding: 22px; }
        .bf-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .bf-head h3 { font-size: 15px; font-weight: 800; color: #1e293b; }
        .bf-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .bf-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        .bf { display: flex; flex-direction: column; gap: 6px; }
        .bf label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
        .bf input { padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; outline: none; }
        .bf input:focus { border-color: #3b82f6; }
        .bf-foot { display: flex; justify-content: flex-end; gap: 10px; margin-top: 14px; }

        .bp-global { background: #1e293b; border-radius: 24px; padding: 24px 32px; color: white; display: flex; justify-content: space-between; align-items: center; gap: 40px; }
        .bg-left { flex: 1; }
        .bg-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
        .bg-val-row { display: flex; align-items: center; gap: 20px; margin-top: 10px; }
        .bg-val-row strong { font-size: 28px; font-weight: 900; }
        .bg-bar-wrap { flex: 1; height: 10px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
        .bg-bar { height: 100%; background: #3b82f6; border-radius: 10px; }
        .bg-right { display: flex; gap: 32px; }
        .bg-stat span { display: block; font-size: 11px; color: #94a3b8; margin-bottom: 4px; }
        .bg-stat strong { font-size: 20px; font-weight: 800; color: white; }

        .bp-content { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        .dept-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        
        .depth-card { background: white; border-radius: 24px; border: 1.5px solid #e2e8f0; padding: 24px; display: flex; flex-direction: column; gap: 16px; transition: 0.3s; }
        .depth-card:hover { transform: translateY(-3px); border-color: #3b82f6; }
        
        .dc-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .dc-head strong { font-size: 15px; font-weight: 800; color: #1e293b; }
        .status-pill { font-size: 9px; font-weight: 800; padding: 3px 8px; border-radius: 20px; text-transform: uppercase; }
        .status-pill.ahead { background: #f0fdf4; color: #10b981; }
        .status-pill.on-track { background: #eff6ff; color: #3b82f6; }
        .status-pill.behind { background: #fff7ed; color: #f59e0b; }
        .status-pill.over-budget { background: #fef2f2; color: #ef4444; }

        .dc-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .dcm span { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .dcm strong { display: block; font-size: 16px; font-weight: 900; color: #1e293b; margin-top: 4px; }
        
        .dc-progress { display: flex; flex-direction: column; gap: 8px; }
        .dcp-info { display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; color: #64748b; }
        .dcp-bar-bg { height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden; }
        .dcp-bar { height: 100%; border-radius: 10px; transition: 0.5s; }

        .dc-actions { display: flex; gap: 6px; }
        .dc-btn { padding: 6px 10px; border: 1.5px solid #e2e8f0; border-radius: 8px; background: white; font-size: 10px; font-weight: 700; color: #64748b; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: 0.2s; }
        .dc-btn:hover { border-color: #3b82f6; color: #3b82f6; }
        .dc-btn.del { color: #ef4444; border-color: #fecaca; }
        .dc-btn.del:hover { background: #fef2f2; }

        .bp-sidebar { display: flex; flex-direction: column; gap: 20px; }
        .comparison-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .comparison-card h3 { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        .comp-list { display: flex; flex-direction: column; gap: 16px; }
        .comp-row { display: flex; justify-content: space-between; align-items: center; }
        .cr-year { padding-left: 12px; }
        .cr-year span { display: block; font-size: 11px; color: #94a3b8; }
        .cr-year strong { font-size: 14px; font-weight: 800; color: #1e293b; }
        .cr-trend { font-size: 10px; font-weight: 800; display: flex; align-items: center; gap: 2px; }
        .cr-trend.up { color: #10b981; }

        .warning-card { background: #fef2f2; border: 1px solid #fee2e2; border-radius: 20px; padding: 20px; }
        .wc-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .wc-head strong { font-size: 14px; color: #ef4444; }
        .warning-card p { font-size: 12px; color: #991b1b; line-height: 1.5; margin: 4px 0; }

        .dept-summary { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; }
        .dept-summary h4 { font-size: 12px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 12px; }
        .ds-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #64748b; }
        .ds-row strong { font-weight: 800; }
      `}</style>
    </div>
  );
};

export default BudgetPlanning;
