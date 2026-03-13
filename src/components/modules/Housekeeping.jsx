import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion } from 'framer-motion';
import { Search, Plus, CheckCircle, AlertCircle, Clock, Wrench, Bed, ChevronRight } from 'lucide-react';

const PRIORITY_MAP = {
  high:   { label: 'Acil',   color: '#ef4444', bg: '#fef2f2' },
  normal: { label: 'Normal', color: '#f59e0b', bg: '#fffbeb' },
  low:    { label: 'Düşük',  color: '#64748b', bg: '#f8fafc' },
};

const STATUS_MAP = {
  bekliyor: { label: 'Bekliyor', color: '#f59e0b', icon: <Clock size={14}/> },
  devam:    { label: 'Devam',    color: '#3b82f6', icon: <AlertCircle size={14}/> },
  bitti:    { label: 'Tamamlandı', color: '#10b981', icon: <CheckCircle size={14}/> },
};

const Housekeeping = () => {
  const { tasks, updateTask, addTask, rooms, stats } = useHotel();
  const [filter, setFilter] = useState('tümü');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ room: '', desc: '', priority: 'normal', type: 'housekeeping', assignee: '' , status: 'bekliyor' });

  const displayed = tasks.filter(t =>
    filter === 'tümü' ? true :
    filter === 'housekeeping' ? t.type === 'housekeeping' :
    filter === 'technical' ? t.type === 'technical' :
    t.status === filter
  );

  const submit = (e) => {
    e.preventDefault();
    addTask(form);
    setForm({ room: '', desc: '', priority: 'normal', type: 'housekeeping', assignee: '', status: 'bekliyor' });
    setShowForm(false);
  };

  return (
    <div className="hk-container">
      {/* Header */}
      <div className="hk-header">
        <div>
          <h2>Kat Hizmetleri & Teknik Servis</h2>
          <span>Temizlik görevleri, iş emirleri ve oda durumu takibi</span>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={16}/> Yeni Görev Ekle
        </button>
      </div>

      {/* KPI row */}
      <div className="hk-kpi-row">
        {[
          { label: 'Bekleyen',   count: tasks.filter(t => t.status === 'bekliyor').length,   color: '#f59e0b' },
          { label: 'Devam Eden', count: tasks.filter(t => t.status === 'devam').length,       color: '#3b82f6' },
          { label: 'Tamamlanan',count: tasks.filter(t => t.status === 'bitti').length,        color: '#10b981' },
          { label: 'Kirli Oda', count: stats.dirty,                                           color: '#8b5cf6' },
        ].map((k, i) => (
          <div key={i} className="kpi-card">
            <div className="kpi-num" style={{ color: k.color }}>{k.count}</div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      {/* New Task Form */}
      {showForm && (
        <motion.form
          className="task-form card"
          onSubmit={submit}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>Yeni Görev</h3>
          <div className="form-row">
            <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="housekeeping">Kat Hizmetleri</option>
              <option value="technical">Teknik Servis</option>
            </select>
            <select value={form.room} onChange={e => setForm({...form, room: e.target.value})} required>
              <option value="">Oda Seçin</option>
              {rooms.map(r => <option key={r.id} value={r.id}>{r.id} — {r.type}</option>)}
            </select>
            <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
              <option value="high">Acil</option>
              <option value="normal">Normal</option>
              <option value="low">Düşük</option>
            </select>
          </div>
          <div className="form-row">
            <input
              type="text" placeholder="Görev açıklaması..."
              value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} required
            />
            <input
              type="text" placeholder="Sorumlu personel"
              value={form.assignee} onChange={e => setForm({...form, assignee: e.target.value})}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>İptal</button>
            <button type="submit" className="btn-primary">Görevi Oluştur</button>
          </div>
        </motion.form>
      )}

      {/* Filters */}
      <div className="filter-bar">
        {['tümü', 'housekeeping', 'technical', 'bekliyor', 'devam', 'bitti'].map(f => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'tümü' ? 'Tümü' : f === 'housekeeping' ? 'Kat Hizm.' : f === 'technical' ? 'Teknik' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task Cards */}
      <div className="task-grid">
        {displayed.map((task, i) => {
          const pr = PRIORITY_MAP[task.priority];
          const st = STATUS_MAP[task.status];
          return (
            <motion.div
              key={task.id}
              className="task-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <div className="tc-top">
                <div className="tc-type-icon">
                  {task.type === 'housekeeping' ? <Bed size={18} color="#9b59b6"/> : <Wrench size={18} color="#e67e22"/>}
                </div>
                <span className="priority-pill" style={{ background: pr.bg, color: pr.color }}>{pr.label}</span>
              </div>
              <div className="tc-room">Oda {task.room}</div>
              <p className="tc-desc">{task.desc}</p>
              <div className="tc-meta">
                <span>{task.assignee || 'Atanmadı'}</span>
                <span>{task.created}</span>
              </div>
              <div className="tc-status-bar">
                <div className="st-indicator" style={{ color: st.color }}>
                  {st.icon} {st.label}
                </div>
                <div className="tc-actions">
                  {task.status === 'bekliyor' && (
                    <button className="micro-btn blue" onClick={() => updateTask(task.id, { status: 'devam' })}>Başlat</button>
                  )}
                  {task.status === 'devam' && (
                    <button className="micro-btn green" onClick={() => updateTask(task.id, { status: 'bitti' })}>Tamamla</button>
                  )}
                  {task.status === 'bitti' && (
                    <span className="done-badge">✓ Tamamlandı</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .hk-container { padding: 30px; display: flex; flex-direction: column; gap: 20px; }
        .hk-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .hk-header h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .hk-header span { font-size: 14px; color: #94a3b8; }
        .btn-primary { padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 12px; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .hk-kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .kpi-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; text-align: center; }
        .kpi-num { font-size: 36px; font-weight: 900; }
        .kpi-label { font-size: 13px; color: #94a3b8; font-weight: 700; margin-top: 4px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 24px; }
        .task-form h3 { font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }
        .form-row { display: flex; gap: 12px; margin-bottom: 12px; }
        .form-row select, .form-row input { flex: 1; padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; outline: none; }
        .form-actions { display: flex; gap: 10px; justify-content: flex-end; }
        .btn-cancel { padding: 10px 20px; border: 1px solid #e2e8f0; background: white; border-radius: 10px; font-weight: 700; cursor: pointer; }

        .filter-bar { display: flex; gap: 8px; }
        .filter-btn { padding: 8px 16px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: white; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; }
        .filter-btn.active { background: #1e293b; color: white; border-color: #1e293b; }

        .task-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .task-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
        .tc-top { display: flex; justify-content: space-between; align-items: center; }
        .tc-type-icon { width: 36px; height: 36px; background: #f8fafc; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .priority-pill { font-size: 10px; font-weight: 800; padding: 3px 10px; border-radius: 20px; }
        .tc-room { font-size: 18px; font-weight: 900; color: #1e293b; }
        .tc-desc { font-size: 13px; color: #64748b; line-height: 1.4; flex: 1; }
        .tc-meta { display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; font-weight: 600; }
        .tc-status-bar { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid #f1f5f9; }
        .st-indicator { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; }
        .tc-actions {}
        .micro-btn { padding: 6px 14px; border-radius: 8px; border: none; font-size: 11px; font-weight: 800; cursor: pointer; }
        .micro-btn.blue { background: #eff6ff; color: #3b82f6; }
        .micro-btn.green { background: #ecfdf5; color: #10b981; }
        .done-badge { font-size: 11px; color: #10b981; font-weight: 700; }
      `}</style>
    </div>
  );
};

export default Housekeeping;
