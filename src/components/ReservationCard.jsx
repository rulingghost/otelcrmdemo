import React, { useState } from 'react';
import { 
  User, Calendar, CreditCard, 
  MapPin, Phone, Mail, 
  FileText, Plus, Save,
  X, ChevronRight, Hash,
  Users, Globe, Star, AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';

const ReservationCard = () => {
  return (
    <div className="card-container">
      <header className="header">
         <div className="title-section">
            <div className="pnr-badge">RES-40291</div>
            <div>
               <h2>Misafir Rezervasyon Kartı</h2>
               <span>Konaklama detayları, fiyatlandırma ve misafir tercihleri</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><X size={18}/> VAZGEÇ</button>
            <button className="btn primary"><Save size={18}/> KARTI KAYDET</button>
         </div>
      </header>

      <div className="main-content">
         {/* Left Column: Form */}
         <div className="form-column">
            <section className="card-section">
               <div className="section-head"><User size={20}/> <h3>MİSAFİR BİLGİLERİ</h3></div>
               <div className="form-grid">
                  <div className="input-group">
                     <label>Adı Soyadı</label>
                     <input type="text" defaultValue="Ahmet Yılmaz" />
                  </div>
                  <div className="input-group">
                     <label>Uyruk</label>
                     <select><option>Türkiye</option><option>Almanya</option></select>
                  </div>
                  <div className="input-group">
                     <label>E-Posta</label>
                     <div className="with-icon"><Mail size={16}/><input type="text" defaultValue="ahmet@example.com" /></div>
                  </div>
                  <div className="input-group">
                     <label>Telefon</label>
                     <div className="with-icon"><Phone size={16}/><input type="text" defaultValue="+90 532 ..." /></div>
                  </div>
               </div>
            </section>

            <section className="card-section mt-30">
               <div className="section-head"><Calendar size={20}/> <h3>KONAKLAMA DETAYLARI</h3></div>
               <div className="form-grid">
                  <div className="input-group">
                     <label>Giriş Tarihi</label>
                     <input type="date" defaultValue="2024-03-14" />
                  </div>
                  <div className="input-group">
                     <label>Çıkış Tarihi</label>
                     <input type="date" defaultValue="2024-03-17" />
                  </div>
                  <div className="input-group">
                     <label>Oda Tipi</label>
                     <select><option>DBL Deluxe Sea View</option><option>Suite</option></select>
                  </div>
                  <div className="input-group">
                     <label>Kişi (Yetişkin / Çocuk)</label>
                     <div className="dual-input">
                        <input type="number" defaultValue="2" />
                        <input type="number" defaultValue="0" />
                     </div>
                  </div>
               </div>
            </section>

            <section className="card-section mt-30">
               <div className="section-head"><CreditCard size={20}/> <h3>FİYATLANDIRMA & ÖDEME</h3></div>
               <div className="form-grid">
                  <div className="input-group">
                     <label>Pansiyon Tipi</label>
                     <select><option>Oda Kahvaltı (BB)</option><option>Herşey Dahil (AI)</option></select>
                  </div>
                  <div className="input-group">
                     <label>Günlük Birim Fiyat</label>
                     <div className="with-icon"><span className="unit">₺</span><input type="text" defaultValue="4,150.00" /></div>
                  </div>
                  <div className="input-group full">
                     <label>Toplam Konaklama Tutarı</label>
                     <div className="total-display">₺ 12,450.00</div>
                  </div>
               </div>
            </section>
         </div>

         {/* Right Column: Sidebar info */}
         <aside className="summary-column">
            <div className="side-card profile-card">
               <div className="avatar">AY</div>
               <h4>Ahmet Yılmaz</h4>
               <span className="badge-loyal">Silver Member</span>
               <div className="stats-mini">
                  <div className="sm"><span>Stays</span><strong>12</strong></div>
                  <div className="sm"><span>Revenue</span><strong>₺ 84K</strong></div>
               </div>
            </div>

            <div className="side-card alert-card mt-20">
               <div className="head"><AlertTriangle size={18}/> <span>HIZLI NOTLAR</span></div>
               <textarea placeholder="Misafir isteği, tercihleri..." defaultValue="Yüksek kat, deniz manzaralı oda önceliği. Alerji: Domates."></textarea>
            </div>

            <div className="side-card summary-box mt-20">
               <h3>REZERVASYON ÖZETİ</h3>
               <div className="s-row"><span>Giriş</span><strong>14.03.2024</strong></div>
               <div className="s-row"><span>Geceleme</span><strong>3 Gece</strong></div>
               <div className="s-row"><span>Kaynak</span><strong>Booking.com</strong></div>
               <div className="s-row total"><span>GENEL TOPLAM</span><strong>₺ 12,450</strong></div>
            </div>
         </aside>
      </div>

      <style jsx>{`
        .card-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .pnr-badge { background: #1e293b; color: white; padding: 10px 15px; border-radius: 10px; font-weight: 900; font-family: monospace; font-size: 16px; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { font-size: 14px; color: #64748b; }

        .actions { display: flex; gap: 10px; }
        .btn { padding: 12px 24px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; border: none; font-size: 14px; }
        .btn.primary { background: #3b82f6; color: white; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }

        .main-content { display: grid; grid-template-columns: 1fr 340px; gap: 30px; }

        .card-section { background: white; border-radius: 20px; padding: 30px; border: 1px solid #e2e8f0; }
        .section-head { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; color: #3b82f6; }
        .section-head h3 { font-size: 14px; font-weight: 900; letter-spacing: 1px; color: #1e293b; }

        .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-group.full { grid-column: 1 / -1; }
        .input-group label { font-size: 12px; font-weight: 800; color: #94a3b8; }
        .input-group input, .input-group select { padding: 12px 15px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 14px; outline: none; transition: border-color 0.2s; }
        .input-group input:focus { border-color: #3b82f6; }

        .with-icon { position: relative; display: flex; align-items: center; }
        .with-icon :global(svg) { position: absolute; left: 15px; color: #94a3b8; }
        .with-icon .unit { position: absolute; left: 15px; font-weight: 800; color: #94a3b8; }
        .with-icon input { padding-left: 45px; width: 100%; }

        .dual-input { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        .total-display { background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 20px; font-size: 28px; font-weight: 900; color: #1e40af; text-align: center; }

        .side-card { background: white; border-radius: 24px; padding: 25px; border: 1px solid #e2e8f0; }
        .profile-card { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .avatar { width: 70px; height: 70px; background: #eff6ff; color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 900; border: 4px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .profile-card h4 { font-size: 18px; font-weight: 800; color: #1e293b; }
        .badge-loyal { background: #f1f5f9; color: #64748b; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; }
        .stats-mini { display: flex; gap: 30px; margin-top: 20px; }
        .sm span { display: block; font-size: 10px; color: #94a3b8; font-weight: 800; }
        .sm strong { font-size: 16px; color: #1e293b; }

        .alert-card .head { display: flex; align-items: center; gap: 10px; color: #f59e0b; margin-bottom: 15px; font-size: 13px; font-weight: 800; }
        .alert-card textarea { width: 100%; height: 100px; padding: 15px; border-radius: 12px; border: 1px solid #fef3c7; background: #fffbeb; font-size: 13px; color: #92400e; outline: none; line-height: 1.6; }

        .summary-box h3 { font-size: 13px; font-weight: 900; margin-bottom: 20px; letter-spacing: 1px; color: #1e293b; }
        .s-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px; }
        .s-row span { color: #94a3b8; font-weight: 700; }
        .s-row strong { color: #1e293b; font-weight: 800; }
        .s-row.total { margin-top: 15px; padding-top: 15px; border-top: 2px dashed #f1f5f9; }
        .s-row.total strong { font-size: 20px; color: #3b82f6; }

        .mt-30 { margin-top: 30px; }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
};

export default ReservationCard;
