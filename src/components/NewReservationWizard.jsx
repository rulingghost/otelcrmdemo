import React, { useState } from 'react';
import { 
  FileText, Search, Plus, 
  Calendar, User, Globe,
  CreditCard, CheckCircle, AlertCircle,
  ChevronRight, MoreVertical, LayoutGrid,
  MapPin, Phone, Mail, HelpCircle,
  Tag, Info, ArrowRight, DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NewReservationWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tc: '14326598780',
    name: 'Yılmaz & Kaya Düğünü 2024',
    phone: '+90 555 123 4567',
    email: '',
    nationality: 'Türkiye',
    checkIn: '24 Nis 2024',
    checkOut: '26 Nis 2024',
    pax: '2 Yetişkin',
    roomType: 'DBL (SUPERIOR)',
    boardType: 'Oda + Kahvaltı'
  });

  return (
    <div className="wizard-container">
      <header className="header">
         <div className="title-section">
            <Plus size={32} className="icon-blue"/>
            <div>
               <h2>Yeni Rezervasyon Sihirbazı</h2>
               <span>Adım adım rezervasyon oluşturma ve dinamik fiyat hesaplama</span>
            </div>
         </div>
         <div className="actions">
            <div className="search-box">
               <Search size={16} className="gray"/>
               <input type="text" placeholder="Hızlı Ara..." />
            </div>
            <div className="user-profile">
               <div className="avatar">Y</div>
            </div>
         </div>
      </header>

      <div className="wizard-grid">
         {/* Main Form Area */}
         <section className="main-form">
            <div className="card form-card">
               <div className="section-title">
                  <h3>MİSAFİR BİLGİLERİ</h3>
               </div>
               <div className="form-row">
                  <div className="f-group">
                     <label>TC / Pasaport No</label>
                     <div className="input-with-btn">
                        <input type="text" value={formData.tc} onChange={(e) => setFormData({...formData, tc: e.target.value})} />
                        <button className="btn primary blue">SORGULA</button>
                     </div>
                  </div>
                  <div className="f-group">
                     <label>Adı Soyadı</label>
                     <div className="input-with-icon">
                        <User size={16} className="gray"/>
                        <input type="text" placeholder="Ad Soyad giriniz..." />
                     </div>
                  </div>
               </div>
               <div className="form-row mt-15">
                  <div className="f-group">
                     <label>Telefon</label>
                     <div className="phone-input">
                        <select className="prefix"><option>+90</option></select>
                        <input type="text" value={formData.phone} />
                     </div>
                  </div>
                  <div className="f-group">
                     <label>E-Posta</label>
                     <input type="text" placeholder="E-Posta..." />
                  </div>
               </div>
               <div className="form-row mt-15">
                  <div className="f-group">
                     <label>Uyruk</label>
                     <div className="input-with-icon">
                        <Globe size={16} className="gray"/>
                        <select className="full"><option>Türkiye</option></select>
                     </div>
                  </div>
               </div>

               <div className="section-title mt-30">
                  <h3>KONAKLAMA DETAYLARI</h3>
               </div>
               <div className="form-row">
                  <div className="f-group">
                     <label>Giriş Tarihi</label>
                     <div className="input-with-icon">
                        <Calendar size={16} className="gray"/>
                        <input type="text" value={formData.checkIn} />
                     </div>
                  </div>
                  <div className="f-group">
                     <label>Çıkış Tarihi</label>
                     <div className="input-with-icon">
                        <Calendar size={16} className="gray"/>
                        <input type="text" value={formData.checkOut} />
                     </div>
                  </div>
               </div>
               <div className="form-row mt-15">
                  <div className="f-group">
                     <label>Gece Sayısı</label>
                     <input type="text" value="2 gece" readOnly className="readonly" />
                  </div>
                  <div className="f-group">
                     <label>Oda Tipi</label>
                     <div className="room-selector">
                        <strong>DBL (SUPERIOR)</strong>
                        <span className="stock-tag">● 8 oda müsait</span>
                        <span className="desc">Yoğun Talep / Yarı Süit / Max. 3 Kişi</span>
                     </div>
                  </div>
               </div>
               <div className="form-row mt-15">
                  <div className="f-group">
                     <label>Pansiyon Tipi</label>
                     <select className="full"><option>Oda + Kahvaltı</option></select>
                  </div>
                  <div className="f-group">
                     <label>Yetişkin / Çocuk Sayısı</label>
                     <div className="pax-selector">
                        <select className="prefix"><option>2 Yetişkin</option></select>
                        <select className="prefix"><option>Çocuk Yok</option></select>
                     </div>
                  </div>
               </div>
            </div>

            <div className="action-row mt-30">
               <button className="btn outline">FİYATI SABİTLE</button>
               <button className="btn primary green">KONFİRME REZERVASYON</button>
               <button className="btn primary orange">OPSİYONLU REZERVASYON</button>
               <button className="btn primary red">İPTAL</button>
            </div>
         </section>

         {/* Sidebar: Calculation */}
         <aside className="calculation-panel">
            <div className="card calc-card">
               <h3>FİYAT HESAPLAMA</h3>
               <div className="c-item">
                  <label>Acente</label>
                  <select className="full"><option>SÖZLEŞMELİ FİYAT</option></select>
               </div>
               <div className="price-details mt-20">
                  <div className="p-row">
                     <span>24-26 Nis 2024 (2 Gece)</span>
                     <strong>2x ₺14.500</strong>
                  </div>
                  <div className="p-row">
                     <span>Oda Fiyatı</span>
                     <strong>₺14.500</strong>
                  </div>
                  <div className="p-row total">
                     <span>Toplam Tutar</span>
                     <strong>₺13.775</strong>
                  </div>
                  <div className="p-row discount">
                     <span>+ 725 Sezon İndirimi</span>
                     <strong>₺14.500</strong>
                  </div>
               </div>

               <div className="prepayment mt-30">
                  <div className="p-head">
                     <span>Ön Ödeme Tutarı (40%)</span>
                     <strong>₺5.510</strong>
                  </div>
                  <div className="p-status">
                     <div className="ps-item"><AlertCircle size={14} className="red"/> Şu Ana Kadar Tahsil Edilen: ₺ 0</div>
                     <div className="ps-item"><HelpCircle size={14} className="gray"/> Ödeme Durumu: Kısmi Tahsilat</div>
                  </div>
               </div>

               <div className="grand-total mt-30">
                  <span>Toplam Tutar</span>
                  <strong>₺13.775</strong>
               </div>
            </div>

            <div className="wizard-stats card mt-20">
               <div className="w-stat"><span>DOLULUK:</span> <strong className="green">%84</strong></div>
               <div className="w-stat"><span>GİRİŞ:</span> <strong>12</strong></div>
            </div>
         </aside>
      </div>

      <div className="wizard-footer-bar">
         <span>Kullanıcı: <strong>Admin</strong></span>
         <span>Süre: 01:25</span>
         <span>Rezervasyon No: <strong>12245</strong></span>
      </div>

      <style jsx>{`
        .wizard-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-blue { color: #3b82f6; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-section span { font-size: 14px; color: #64748b; }

        .search-box { display: flex; align-items: center; gap: 10px; background: white; border: 1px solid #e2e8f0; padding: 10px 15px; border-radius: 12px; }
        .search-box input { border: none; outline: none; font-size: 13px; width: 200px; }
        .avatar { width: 40px; height: 40px; background: #3b82f6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; }

        .wizard-grid { display: grid; grid-template-columns: 1fr 340px; gap: 30px; flex: 1; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 13px; font-weight: 900; color: #1e293b; margin-bottom: 25px; letter-spacing: 0.5px; }

        .section-title { border-left: 4px solid #3b82f6; padding-left: 15px; margin-bottom: 25px; }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .f-group { display: flex; flex-direction: column; gap: 8px; }
        .f-group label { font-size: 11px; font-weight: 800; color: #94a3b8; }
        .f-group input, .f-group select { padding: 12px 15px; border-radius: 10px; border: 1px solid #e2e8f0; background: #f8fafc; font-size: 13px; color: #1e293b; font-weight: 700; outline: none; }
        .f-group input.readonly { background: #f1f5f9; color: #64748b; }

        .input-with-btn { display: flex; gap: 10px; }
        .input-with-btn input { flex: 1; }
        .input-with-icon { position: relative; display: flex; align-items: center; }
        .input-with-icon input, .input-with-icon select { padding-left: 45px; }
        .input-with-icon :global(svg) { position: absolute; left: 15px; }

        .phone-input { display: flex; gap: 5px; }
        .phone-input .prefix { width: 80px; }
        .phone-input input { flex: 1; }

        .room-selector { border: 2px solid #3b82f6; background: #eff6ff; padding: 15px; border-radius: 12px; display: flex; flex-direction: column; gap: 4px; }
        .room-selector strong { font-size: 14px; color: #1e293b; }
        .stock-tag { font-size: 10px; color: #10b981; font-weight: 900; }
        .room-selector .desc { font-size: 11px; color: #64748b; font-weight: 700; }

        .action-row { display: flex; gap: 15px; }
        .btn { padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; flex: 1; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #64748b; border: 1px dashed #cbd5e1; }
        .btn.primary.blue { background: #3b82f6; color: white; }
        .btn.primary.green { background: #10b981; color: white; }
        .btn.primary.orange { background: #f59e0b; color: white; }
        .btn.primary.red { background: #ef4444; color: white; }

        .price-details { border-bottom: 2px dashed #f1f5f9; padding-bottom: 20px; }
        .p-row { display: flex; justify-content: space-between; font-size: 14px; color: #475569; padding: 5px 0; }
        .p-row.total { color: #1e293b; font-weight: 900; font-size: 18px; margin-top: 10px; }
        .p-row.discount { color: #10b981; font-size: 12px; font-weight: 800; }

        .prepayment { background: #f8fafc; padding: 20px; border-radius: 12px; }
        .p-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .p-head strong { font-size: 20px; color: #1e293b; }
        .ps-item { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; color: #64748b; margin-top: 5px; }

        .grand-total { border-top: 2px solid #1e293b; padding-top: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
        .grand-total span { font-size: 12px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
        .grand-total strong { font-size: 32px; color: #1e293b; }

        .wizard-stats { display: flex; justify-content: space-around; padding: 20px; }
        .w-stat { font-size: 12px; font-weight: 800; color: #94a3b8; }
        .w-stat strong { font-size: 18px; color: #1e293b; margin-left: 5px; }

        .wizard-footer-bar { padding: 15px 30px; background: #fff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 12px; color: #94a3b8; font-weight: 700; }
        
        .green { color: #10b981; }
        .red { color: #ef4444; }
        .gray { color: #94a3b8; }
        .mt-30 { margin-top: 30px; }
        .mt-20 { margin-top: 20px; }
        .mt-15 { margin-top: 15px; }
        .mt-10 { margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default NewReservationWizard;
