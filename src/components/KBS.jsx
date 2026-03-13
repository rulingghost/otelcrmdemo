import React, { useState } from 'react';
import { 
  FileText, Search, Shield, 
  UserCheck, AlertTriangle, Send,
  FileCheck, Clock, Filter,
  MoreVertical, Printer, Download,
  CheckCircle, RefreshCw, Layers,
  ShieldCheck, ExternalLink, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const kbsList = [
  { id: 1, guest: 'Mehmet Yılmaz', tc: '12345678901', birth: '1985', status: 'sent', time: '14:22', nation: 'TR', room: '102' },
  { id: 2, guest: 'Ayşe Kaya', tc: '98765432109', birth: '1992', status: 'pending', time: '-', nation: 'TR', room: '205' },
  { id: 3, guest: 'John Smith', passport: 'A1234567', nation: 'UK', status: 'sent', time: '12:05', birth: '1975', room: '301' },
  { id: 4, guest: 'Hans Müller', passport: 'P772183', nation: 'DE', status: 'pending', time: '-', birth: '1980', room: '404' },
];

const KBS = () => {
  const [isSending, setIsSending] = useState(false);
  const [msg, setMsg] = useState(null);

  const simulateSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setMsg({ type: 'success', text: 'Tüm bekleyen kayıtlar Emniyet Genel Müdürlüğü (KBS) Portalına aktarıldı.' });
    }, 2000);
  };

  return (
    <div className="kbs-container">
      <header className="header">
         <div className="title-section">
            <Shield size={32} className="icon-red"/>
            <div>
               <h2>KBS / AKBS Entegrasyon Merkezi</h2>
               <span>Kimlik Bildirme Sistemi (Emniyet/Jandarma) Yasal Bildirim Paneli</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn-kbs outline"><Printer size={18}/> POLİS DEFTERİ</button>
            <button className="btn-kbs primary" onClick={simulateSend} disabled={isSending}>
               {isSending ? <RefreshCw size={18} className="spin"/> : <Send size={18}/>}
               {isSending ? 'GÖNDERİLİYOR...' : 'TÜMÜNÜ KBS\'YE AKTAR'}
            </button>
         </div>
      </header>

      {msg && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`msg-banner ${msg.type}`}>
           <CheckCircle size={18}/> {msg.text}
        </motion.div>
      )}

      <div className="kbs-grid">
         {/* Live Stats Row */}
         <section className="stats-grid">
            <div className="card stat-box">
               <div className="sb-icon purple"><Activity size={20}/></div>
               <div className="sb-data">
                  <span className="label">BEKLEYEN BİLDİRİM</span>
                  <strong>12</strong>
                  <small className="warn">Son 2 saat uyarısı!</small>
               </div>
            </div>
            <div className="card stat-box">
               <div className="sb-icon green"><ShieldCheck size={20}/></div>
               <div className="sb-data">
                  <span className="label">BAŞARILI GÖNDERİM</span>
                  <strong>45</strong>
                  <small className="green">Aktif Gün</small>
               </div>
            </div>
            <div className="card stat-box">
               <div className="sb-icon blue"><Layers size={20}/></div>
               <div className="sb-data">
                  <span className="label">XML ARŞİVİ</span>
                  <strong>1,420</strong>
                  <small>Bulut Depolama</small>
               </div>
            </div>
         </section>

         {/* Main List */}
         <section className="card table-section">
            <div className="section-header">
               <div className="sh-title">
                  <FileText size={20} className="blue"/>
                  <h3>GÜNLÜK MİSAFİR LİSTESİ</h3>
               </div>
               <div className="search-box">
                  <Search size={16} />
                  <input type="text" placeholder="Misafir adı veya TC..." />
               </div>
            </div>
            <table className="kbs-table">
               <thead>
                  <tr>
                     <th>Oda</th>
                     <th>Misafir Adı</th>
                     <th>Kimlik / Pasaport No</th>
                     <th>Uyruk</th>
                     <th>D. Tarihi</th>
                     <th>Durum</th>
                     <th>Gönderim</th>
                     <th>İşlem</th>
                  </tr>
               </thead>
               <tbody>
                  {kbsList.map((k, idx) => (
                    <tr key={idx}>
                       <td><div className="room-no">{k.room}</div></td>
                       <td><strong>{k.guest}</strong></td>
                       <td>{k.tc || k.passport}</td>
                       <td>{k.nation}</td>
                       <td>{k.birth}</td>
                       <td>
                          <span className={`status-pill ${k.status}`}>
                             {k.status === 'sent' ? 'Aktarıldı' : 'Kuyrukta'}
                          </span>
                       </td>
                       <td>{k.time !== '-' ? <div className="time-tag">{k.time}</div> : '-'}</td>
                       <td>
                          <div className="row-actions">
                             <button className="icon-btn" title="XML önizleme"><ExternalLink size={14}/></button>
                             <button className="icon-btn" title="Detay"><MoreVertical size={14}/></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </section>

         {/* Compliance Sidebar */}
         <aside className="compliance-sidebar">
            <section className="card warning-card">
               <div className="wc-head">
                  <AlertTriangle size={24} className="orange"/>
                  <h3>YASAL UYUMLULUK</h3>
               </div>
               <p>1774 Sayılı Kimlik Bildirme Kanunu uyarınca, tesise gelen her misafirin kimlik bilgileri giriş tarihinden itibaren en geç 2 saat içinde kolluk kuvvetlerine bildirilmelidir.</p>
               <div className="compliance-checklist">
                  <div className="cl-item"><CheckCircle size={14} className="green"/> KVKK Onayı Alındı</div>
                  <div className="cl-item"><CheckCircle size={14} className="green"/> E-İmza Modülü Aktif</div>
                  <div className="cl-item"><CheckCircle size={14} className="green"/> XML Şifreleme (AES-256)</div>
               </div>
            </section>
            
            <div className="action-stack mt-20">
               <button className="btn-full outline"><Download size={16}/> XML OLARAK İNDİR</button>
               <button className="btn-full outline mt-10"><FileCheck size={16}/> SİSTEM DOĞRULAMA</button>
            </div>
         </aside>
      </div>

      <style jsx>{`
        .kbs-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-red { color: #ef4444; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { color: #64748b; font-size: 14px; }

        .btn-kbs { padding: 12px 24px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 13px; }
        .btn-kbs.primary { background: #ef4444; color: white; border: none; }
        .btn-kbs.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }
        .btn-kbs:disabled { opacity: 0.7; cursor: not-allowed; }

        .msg-banner { padding: 15px 25px; border-radius: 12px; display: flex; align-items: center; gap: 15px; font-size: 14px; font-weight: 700; }
        .msg-banner.success { background: #ecfdf5; color: #065f46; border-left: 5px solid #10b981; }

        .kbs-grid { display: grid; grid-template-columns: 1fr 320px; gap: 30px; }

        .stats-grid { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .stat-box { display: flex; align-items: center; gap: 20px; padding: 25px; }
        .sb-icon { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .sb-icon.purple { background: #f5f3ff; color: #8b5cf6; }
        .sb-icon.green { background: #ecfdf5; color: #10b981; }
        .sb-icon.blue { background: #eff6ff; color: #3b82f6; }
        .sb-data .label { font-size: 11px; font-weight: 800; color: #94a3b8; letter-spacing: 0.5px; }
        .sb-data strong { display: block; font-size: 26px; color: #1e293b; margin: 4px 0; }
        .sb-data small { font-size: 11px; font-weight: 700; }
        .sb-data small.warn { color: #ef4444; }

        .card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .sh-title { display: flex; align-items: center; gap: 12px; }
        .section-header h3 { font-size: 15px; font-weight: 800; color: #1e293b; }

        .search-box { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 10px; }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 220px; }

        .kbs-table { width: 100%; border-collapse: collapse; }
        .kbs-table th { text-align: left; padding: 12px; font-size: 11px; color: #94a3b8; border-bottom: 2px solid #f1f5f9; text-transform: uppercase; }
        .kbs-table td { padding: 15px 12px; font-size: 14px; border-bottom: 1px solid #f8fafc; color: #475569; }

        .room-no { background: #f1f5f9; width: 40px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #1e293b; font-size: 13px; border: 1px solid #e2e8f0; }
        .status-pill { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; }
        .status-pill.sent { background: #ecfdf5; color: #10b981; }
        .status-pill.pending { background: #fffcf0; color: #b45309; }
        .time-tag { font-size: 12px; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; font-family: monospace; }
        .row-actions { display: flex; gap: 10px; }
        .icon-btn { background: transparent; border: none; color: #94a3b8; cursor: pointer; }

        .warning-card { background: #fffbeb; border-color: #fef3c7; }
        .wc-head { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
        .wc-head h3 { font-size: 15px; font-weight: 800; color: #92400e; }
        .warning-card p { font-size: 13px; color: #92400e; line-height: 1.6; font-weight: 600; }
        .compliance-checklist { margin-top: 20px; display: flex; flex-direction: column; gap: 10px; }
        .cl-item { display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 700; color: #92400e; opacity: 0.8; }

        .btn-full { width: 100%; padding: 15px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .btn-full.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 2s linear infinite; }
        .green { color: #10b981; }
        .red { color: #ef4444; }
        .orange { color: #f59e0b; }
        .blue { color: #3b82f6; }
        .mt-20 { margin-top: 20px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default KBS;
