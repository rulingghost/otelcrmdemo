import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, LayoutDashboard, MessageSquareText, DollarSign, TrendingUp, SmilePlus, ShieldAlert } from 'lucide-react';
import AIDashboard from './ai/AIDashboard';
import AIChatbot from './ai/AIChatbot';
import AIPricing from './ai/AIPricing';
import AIForecast from './ai/AIForecast';
import AISentiment from './ai/AISentiment';
import AIAnomaly from './ai/AIAnomaly';

const TABS = [
  { id: 'dashboard', label: 'AI Dashboard', icon: <LayoutDashboard size={16}/>, color: '#3b82f6' },
  { id: 'chatbot',   label: 'AI Asistan',   icon: <MessageSquareText size={16}/>, color: '#8b5cf6' },
  { id: 'pricing',   label: 'Fiyatlandırma', icon: <DollarSign size={16}/>, color: '#10b981' },
  { id: 'forecast',  label: 'Talep Tahmini', icon: <TrendingUp size={16}/>, color: '#f59e0b' },
  { id: 'sentiment', label: 'Sentiment',     icon: <SmilePlus size={16}/>, color: '#ec4899' },
  { id: 'anomaly',   label: 'Anomali',       icon: <ShieldAlert size={16}/>, color: '#ef4444' },
];

const TAB_COMPONENTS = {
  dashboard: AIDashboard,
  chatbot: AIChatbot,
  pricing: AIPricing,
  forecast: AIForecast,
  sentiment: AISentiment,
  anomaly: AIAnomaly,
};

const AIStrategy = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="ai-hub">
      {/* Header */}
      <div className="ai-hub-header">
        <div className="ai-hub-title">
          <div className="ai-logo-ring"><BrainCircuit size={22}/></div>
          <div>
            <h2>AI Strategy Hub</h2>
            <span>Makine öğrenmesi tabanlı otel operasyon merkezi</span>
          </div>
        </div>
        <div className="ai-hub-status">
          <span className="status-dot"/>
          <span>AI Motoru Aktif</span>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="ai-tab-bar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`ai-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            style={activeTab === tab.id ? { color: tab.color, borderColor: tab.color } : {}}
          >
            {React.cloneElement(tab.icon, { color: activeTab === tab.id ? tab.color : '#94a3b8' })}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="ai-hub-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        /* ═══════ AI HUB LAYOUT ═══════ */
        .ai-hub { display:flex; flex-direction:column; min-height:100%; }

        .ai-hub-header { display:flex; justify-content:space-between; align-items:center; padding:24px 28px 0; }
        .ai-hub-title { display:flex; align-items:center; gap:14px; }
        .ai-logo-ring { width:44px; height:44px; border-radius:14px; background:linear-gradient(135deg,#8b5cf6,#3b82f6); color:white; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 20px rgba(139,92,246,0.3); }
        .ai-hub-title h2 { font-size:20px; font-weight:900; color:#1e293b; }
        .ai-hub-title span { font-size:12px; color:#94a3b8; font-weight:600; }
        .ai-hub-status { display:flex; align-items:center; gap:8px; padding:8px 16px; border-radius:20px; background:#f0fdf4; border:1px solid #dcfce7; font-size:11px; font-weight:800; color:#10b981; }
        .status-dot { width:8px; height:8px; border-radius:50%; background:#10b981; animation:pulse-dot 2s infinite; }

        /* ═══════ TAB BAR ═══════ */
        .ai-tab-bar { display:flex; gap:4px; padding:16px 28px 0; border-bottom:1.5px solid #e2e8f0; overflow-x:auto; }
        .ai-tab { display:flex; align-items:center; gap:8px; padding:10px 18px; border:none; background:none; font-size:13px; font-weight:700; color:#94a3b8; cursor:pointer; border-bottom:2.5px solid transparent; transition:0.2s; white-space:nowrap; border-radius:10px 10px 0 0; }
        .ai-tab:hover { color:#475569; background:#f8fafc; }
        .ai-tab.active { color:#3b82f6; border-bottom-color:#3b82f6; background:white; }

        /* ═══════ CONTENT ═══════ */
        .ai-hub-content { flex:1; padding:20px 28px 28px; overflow-y:auto; }

        /* ═══════ DASHBOARD TAB ═══════ */
        .ai-dash { display:flex; flex-direction:column; gap:20px; }
        .kpi-row { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .kpi-card { background:white; border:1.5px solid #e2e8f0; border-radius:18px; padding:20px; position:relative; overflow:hidden; }
        .kpi-dot { width:8px; height:8px; border-radius:50%; position:absolute; top:16px; right:16px; }
        .kpi-label { font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px; }
        .kpi-val { font-size:26px; font-weight:900; margin:6px 0 2px; }
        .kpi-sub { font-size:11px; color:#64748b; }
        .kpi-trend { font-size:10px; font-weight:800; display:flex; align-items:center; gap:4px; margin-top:8px; }
        .kpi-trend.up { color:#10b981; }
        .kpi-trend.down { color:#ef4444; }

        .dash-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .dash-chart-card { background:white; border:1.5px solid #e2e8f0; border-radius:20px; padding:20px; }
        .dash-chart-card h3 { font-size:14px; font-weight:800; color:#1e293b; margin-bottom:16px; display:flex; align-items:center; gap:8px; }
        .pie-legend { display:flex; flex-wrap:wrap; gap:10px; margin-top:10px; justify-content:center; }
        .pie-legend span { display:flex; align-items:center; gap:5px; font-size:11px; font-weight:600; color:#64748b; }
        .pie-legend i { width:10px; height:10px; border-radius:3px; display:inline-block; }

        .insights-card { }
        .ins-head { display:flex; align-items:center; gap:8px; margin-bottom:14px; }
        .ins-head h3 { flex:1; font-size:14px; font-weight:800; color:#1e293b; margin-bottom:0; }
        .live-dot { font-size:10px; font-weight:800; color:#10b981; padding:3px 10px; border-radius:12px; background:#f0fdf4; border:1px solid #dcfce7; }
        .ins-list { display:flex; flex-direction:column; gap:10px; max-height:300px; overflow-y:auto; }
        .ins-row { display:flex; align-items:flex-start; gap:12px; padding:12px 14px; border-radius:14px; border:1.5px solid #f1f5f9; }
        .ins-row.success { background:#f0fdf4; border-color:#dcfce7; }
        .ins-row.warn { background:#fffbeb; border-color:#fef3c7; }
        .ins-row.info { background:#eff6ff; border-color:#dbeafe; }
        .ins-icon { flex-shrink:0; margin-top:2px; }
        .ins-body { flex:1; min-width:0; }
        .ins-body strong { font-size:13px; color:#1e293b; display:block; margin-bottom:2px; }
        .ins-body p { font-size:11px; color:#475569; line-height:1.5; margin:0; }
        .ins-impact { font-size:10px; font-weight:800; color:#10b981; white-space:nowrap; flex-shrink:0; margin-top:2px; }

        /* ═══════ CHATBOT TAB ═══════ */
        .ai-chat { display:flex; flex-direction:column; height:calc(100vh - 220px); min-height:500px; }
        .chat-quick { display:flex; align-items:center; gap:10px; padding:12px 0; flex-wrap:nowrap; overflow-x:auto; }
        .chat-quick > span { font-size:12px; font-weight:700; color:#64748b; white-space:nowrap; }
        .quick-pills { display:flex; gap:6px; overflow-x:auto; padding-bottom:2px; }
        .quick-pill { padding:6px 14px; border-radius:20px; border:1.5px solid #e2e8f0; background:white; font-size:11px; font-weight:600; color:#475569; cursor:pointer; white-space:nowrap; transition:0.2s; }
        .quick-pill:hover { border-color:#8b5cf6; color:#8b5cf6; background:#faf5ff; }

        .chat-messages { flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:12px; padding:16px 0; }
        .chat-msg { display:flex; gap:10px; max-width:85%; }
        .chat-msg.user { align-self:flex-end; flex-direction:row-reverse; }
        .msg-avatar { width:32px; height:32px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .chat-msg.ai .msg-avatar { background:linear-gradient(135deg,#8b5cf6,#3b82f6); color:white; }
        .chat-msg.user .msg-avatar { background:#1e293b; color:white; }
        .msg-bubble { padding:12px 16px; border-radius:16px; font-size:13px; line-height:1.6; }
        .chat-msg.ai .msg-bubble { background:white; border:1.5px solid #e2e8f0; color:#1e293b; border-top-left-radius:4px; }
        .chat-msg.user .msg-bubble { background:linear-gradient(135deg,#3b82f6,#1d4ed8); color:white; border-top-right-radius:4px; }
        .msg-bubble p { margin:0 0 4px; }
        .msg-bubble p:last-child { margin-bottom:0; }
        .msg-bubble.typing { display:flex; gap:5px; align-items:center; padding:14px 20px; }
        .msg-bubble.typing span { width:7px; height:7px; border-radius:50%; background:#94a3b8; animation:typingBounce 1.4s infinite; }
        .msg-bubble.typing span:nth-child(2) { animation-delay:0.2s; }
        .msg-bubble.typing span:nth-child(3) { animation-delay:0.4s; }
        @keyframes typingBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }

        .chat-input-bar { display:flex; gap:8px; padding-top:12px; border-top:1.5px solid #e2e8f0; }
        .chat-input-bar input { flex:1; padding:12px 16px; border-radius:14px; border:1.5px solid #e2e8f0; font-size:13px; }
        .chat-send { width:42px; height:42px; border-radius:12px; background:linear-gradient(135deg,#3b82f6,#1d4ed8); color:white; display:flex; align-items:center; justify-content:center; border:none; cursor:pointer; box-shadow:0 4px 12px rgba(59,130,246,0.3); }
        .chat-send:disabled { opacity:0.4; }
        .chat-reset { width:42px; height:42px; border-radius:12px; background:#f1f5f9; color:#64748b; display:flex; align-items:center; justify-content:center; border:none; cursor:pointer; }

        /* ═══════ PRICING TAB ═══════ */
        .ai-pricing { display:flex; flex-direction:column; gap:20px; }
        .pricing-summary { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        .ps-card { background:white; border:1.5px solid #e2e8f0; border-radius:16px; padding:18px 20px; display:flex; align-items:center; gap:14px; }
        .ps-card span { font-size:11px; color:#94a3b8; font-weight:700; display:block; }
        .ps-card strong { font-size:20px; font-weight:900; color:#1e293b; }
        .ps-card.highlight { border-color:#dcfce7; background:#f0fdf4; }
        .ps-card.highlight strong { color:#10b981; }
        .ps-card.up strong { color:#10b981; }
        .ps-card.up { color:#10b981; }
        .ps-card.down strong { color:#ef4444; }
        .ps-card.down { color:#ef4444; }

        .pricing-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .price-card { background:white; border:1.5px solid #e2e8f0; border-radius:20px; padding:20px; display:flex; flex-direction:column; gap:14px; }
        .pc-head { display:flex; align-items:center; gap:10px; }
        .pc-dot { width:10px; height:10px; border-radius:50%; }
        .pc-head h4 { flex:1; font-size:15px; font-weight:800; color:#1e293b; margin:0; }
        .lock-btn { background:none; border:none; color:#94a3b8; cursor:pointer; padding:4px; }

        .pc-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
        .pc-stats > div { text-align:center; }
        .pc-stats span { font-size:10px; color:#94a3b8; font-weight:600; display:block; }
        .pc-stats strong { font-size:14px; font-weight:900; color:#1e293b; }

        .pc-slider label { font-size:12px; color:#64748b; display:block; margin-bottom:6px; }
        .pc-slider input[type=range] { width:100%; height:6px; border:none; padding:0; }
        .slider-labels { display:flex; justify-content:space-between; font-size:9px; color:#94a3b8; margin-top:4px; }

        .pc-result { display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:#f8fafc; border-radius:10px; }
        .new-price { font-size:12px; color:#475569; }
        .new-price strong { color:#1e293b; }
        .rev-diff { font-size:11px; font-weight:800; }
        .rev-diff.up { color:#10b981; }
        .rev-diff.down { color:#ef4444; }

        .ai-suggest-btn { width:100%; padding:10px; border-radius:10px; border:1.5px dashed #8b5cf6; background:#faf5ff; color:#8b5cf6; font-size:12px; font-weight:700; cursor:pointer; transition:0.2s; }
        .ai-suggest-btn:hover { background:#8b5cf6; color:white; border-style:solid; }

        .pricing-chart-card { background:white; border:1.5px solid #e2e8f0; border-radius:20px; padding:20px; }
        .pricing-chart-card h3 { font-size:14px; font-weight:800; color:#1e293b; margin-bottom:16px; }

        /* ═══════ FORECAST TAB ═══════ */
        .ai-forecast { display:flex; flex-direction:column; gap:20px; }
        .fc-kpi-row { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .fc-kpi { background:white; border:1.5px solid #e2e8f0; border-radius:16px; padding:16px 18px; }
        .fc-kpi span { font-size:11px; color:#94a3b8; font-weight:700; display:block; margin-bottom:4px; }
        .fc-kpi strong { font-size:16px; font-weight:900; }
        .fc-chart-card { background:white; border:1.5px solid #e2e8f0; border-radius:20px; padding:20px; }
        .fc-chart-card h3 { font-size:14px; font-weight:800; color:#1e293b; margin-bottom:14px; display:flex; align-items:center; gap:8px; }
        .fc-bottom-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }

        /* ═══════ SENTIMENT TAB ═══════ */
        .ai-sentiment { display:flex; flex-direction:column; gap:20px; }
        .sent-top { display:grid; grid-template-columns:220px 1fr 280px; gap:16px; align-items:start; }
        .overall-score { background:white; border:1.5px solid #e2e8f0; border-radius:20px; padding:24px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:10px; }
        .score-ring { width:120px; height:120px; border-radius:50%; display:flex; align-items:center; justify-content:center; }
        .score-inner { width:94px; height:94px; border-radius:50%; background:white; display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.06); }
        .score-inner strong { font-size:32px; font-weight:900; color:#1e293b; line-height:1; }
        .score-inner span { font-size:12px; color:#94a3b8; }
        .overall-score h3 { font-size:14px; font-weight:800; color:#1e293b; margin:0; }
        .overall-score p { font-size:13px; color:#64748b; margin:0; }

        .mood-breakdown { background:white; border:1.5px solid #e2e8f0; border-radius:20px; padding:20px; }
        .mood-breakdown h3 { font-size:14px; font-weight:800; color:#1e293b; margin-bottom:16px; display:flex; align-items:center; gap:8px; }
        .mood-bar-row { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
        .mood-label { font-size:12px; font-weight:700; color:#475569; width:140px; flex-shrink:0; }
        .mood-bar-bg { flex:1; height:8px; background:#f1f5f9; border-radius:10px; overflow:hidden; }
        .mood-bar-fill { height:100%; border-radius:10px; }
        .mood-bar-row strong { font-size:12px; font-weight:800; color:#1e293b; width:35px; text-align:right; }

        .radar-card { background:white; border:1.5px solid #e2e8f0; border-radius:20px; padding:20px; }
        .radar-card h3 { font-size:14px; font-weight:800; color:#1e293b; margin-bottom:8px; }

        .dept-cards { display:grid; grid-template-columns:repeat(6,1fr); gap:10px; }
        .dept-card { background:white; border:1.5px solid #e2e8f0; border-radius:14px; padding:14px; text-align:center; cursor:pointer; transition:0.2s; }
        .dept-card:hover { border-color:#3b82f6; transform:translateY(-2px); }
        .dept-icon { font-size:22px; display:block; margin-bottom:6px; }
        .dept-card strong { font-size:12px; color:#1e293b; display:block; margin-bottom:4px; }
        .dept-score { font-size:20px; font-weight:900; margin-bottom:2px; }
        .dept-reviews { font-size:10px; color:#94a3b8; font-weight:600; }

        .reviews-section { background:white; border:1.5px solid #e2e8f0; border-radius:20px; padding:20px; }
        .rev-head { display:flex; align-items:center; gap:8px; margin-bottom:14px; }
        .rev-head h3 { font-size:14px; font-weight:800; color:#1e293b; display:flex; align-items:center; gap:8px; flex:1; margin:0; }
        .filter-tag { font-size:11px; background:#eff6ff; color:#3b82f6; padding:3px 10px; border-radius:10px; font-weight:700; }
        .filter-tag button { background:none; border:none; color:#3b82f6; cursor:pointer; margin-left:4px; font-size:12px; }
        .reviews-list { display:flex; flex-direction:column; gap:10px; max-height:320px; overflow-y:auto; }
        .review-card { display:flex; gap:12px; padding:12px 14px; border-radius:14px; border:1.5px solid #f1f5f9; transition:0.2s; }
        .review-card:hover { border-color:#e2e8f0; background:#fafbfc; }
        .rev-avatar { font-size:22px; flex-shrink:0; }
        .rev-body { flex:1; min-width:0; }
        .rev-meta { display:flex; align-items:center; gap:8px; margin-bottom:4px; }
        .rev-meta strong { font-size:13px; color:#1e293b; }
        .rev-dept { font-size:10px; background:#f1f5f9; color:#64748b; padding:2px 8px; border-radius:6px; font-weight:600; }
        .rev-date { font-size:10px; color:#94a3b8; margin-left:auto; }
        .rev-body p { font-size:12px; color:#475569; line-height:1.5; margin:0 0 6px; }
        .rev-stars { display:flex; gap:2px; }

        /* ═══════ ANOMALY TAB ═══════ */
        .ai-anomaly { display:flex; flex-direction:column; gap:20px; }
        .anomaly-top { display:grid; grid-template-columns:200px 1fr 280px; gap:16px; align-items:start; }
        .risk-score-card { background:white; border:1.5px solid #e2e8f0; border-radius:20px; padding:24px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:10px; }
        .risk-ring { width:110px; height:110px; border-radius:50%; display:flex; align-items:center; justify-content:center; }
        .risk-inner { width:86px; height:86px; border-radius:50%; background:white; display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.06); }
        .risk-inner strong { font-size:28px; font-weight:900; color:#1e293b; line-height:1; }
        .risk-inner span { font-size:11px; color:#94a3b8; }
        .risk-score-card h3 { font-size:14px; font-weight:800; margin:0; }
        .risk-score-card p { font-size:12px; color:#64748b; margin:0; }

        .anomaly-stats { background:white; border:1.5px solid #e2e8f0; border-radius:20px; padding:20px; display:flex; flex-direction:column; gap:14px; }
        .as-item { display:flex; align-items:center; gap:10px; }
        .as-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
        .as-item span { flex:1; font-size:13px; font-weight:600; color:#64748b; }
        .as-item strong { font-size:18px; font-weight:900; color:#1e293b; }

        .anomaly-chart { background:white; border:1.5px solid #e2e8f0; border-radius:20px; padding:20px; }
        .anomaly-chart h4 { font-size:13px; font-weight:800; color:#1e293b; margin:0 0 10px; }

        .anomaly-list { background:white; border:1.5px solid #e2e8f0; border-radius:20px; padding:20px; }
        .anomaly-list h3 { font-size:14px; font-weight:800; color:#1e293b; margin-bottom:16px; display:flex; align-items:center; gap:8px; }
        .no-anomaly { text-align:center; padding:40px; }
        .no-anomaly p { font-size:14px; color:#64748b; margin-top:12px; }

        .anomaly-card { display:flex; align-items:center; justify-content:space-between; gap:14px; padding:14px 16px; border-radius:14px; border:1.5px solid #f1f5f9; margin-bottom:10px; cursor:pointer; transition:0.2s; }
        .anomaly-card:hover { border-color:#e2e8f0; background:#fafbfc; }
        .anomaly-card.high { border-left:4px solid #ef4444; }
        .anomaly-card.medium { border-left:4px solid #f59e0b; }
        .anomaly-card.low { border-left:4px solid #3b82f6; }
        .ac-left { display:flex; gap:12px; flex:1; min-width:0; }
        .ac-icon { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .ac-body { flex:1; min-width:0; }
        .ac-meta { display:flex; gap:8px; margin-bottom:4px; }
        .sev-badge { font-size:9px; font-weight:800; padding:2px 8px; border-radius:6px; text-transform:uppercase; }
        .sev-badge.high { background:#fef2f2; color:#ef4444; }
        .sev-badge.medium { background:#fffbeb; color:#f59e0b; }
        .sev-badge.low { background:#eff6ff; color:#3b82f6; }
        .ac-cat { font-size:10px; color:#94a3b8; font-weight:600; }
        .ac-body strong { font-size:13px; color:#1e293b; display:block; }
        .ac-body p { font-size:11px; color:#64748b; line-height:1.4; margin:6px 0 0; }
        .ac-action { padding:8px 14px; border-radius:10px; border:1.5px solid #e2e8f0; background:white; font-size:11px; font-weight:700; color:#475569; cursor:pointer; white-space:nowrap; flex-shrink:0; transition:0.2s; }
        .ac-action:hover { background:#3b82f6; color:white; border-color:#3b82f6; }

        /* ═══════ RESPONSIVE ═══════ */
        @media(max-width:1200px) {
          .kpi-row, .fc-kpi-row { grid-template-columns:repeat(2,1fr); }
          .pricing-grid { grid-template-columns:repeat(2,1fr); }
          .sent-top, .anomaly-top { grid-template-columns:1fr; }
          .dept-cards { grid-template-columns:repeat(3,1fr); }
        }
      `}</style>
    </div>
  );
};

export default AIStrategy;
