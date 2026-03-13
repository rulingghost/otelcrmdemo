import React, { useState } from 'react';
import { 
  Calendar, Search, Plus, 
  MapPin, Clock, Users,
  Utensils, Music, Laptop,
  CheckCircle, AlertTriangle, ChevronRight,
  MoreVertical, FileText, LayoutGrid,
  Bell, User, DollarSign, ArrowRight,
  Filter, ChevronDown, List as ListIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

const salonStatuses = [
  { name: 'Balo Salonu', count: '1 etkinlik', items: '1 ürün', capacity: '390 kişi', color: '#f1f5f9' },
  { name: 'Toplantı Salonu 1', count: '2 etkinlik', items: '4 ürün', capacity: '160 kişi', color: '#3b82f6' },
  { name: 'Çiçek Salonu', count: '1 etkinlik', items: '3 ürün', capacity: '40 kişi', color: '#f1f5f9' },
  { name: 'Toplantı Salonu 2', count: '2 etkinlik', items: '2 ürün', capacity: '180 kişi', color: '#eab308' },
  { name: 'Lale Salonu', count: '2 etkinlik', items: '2 ürün', capacity: '70 kişi', color: '#e11d48' },
];

const timelineEvents = [
  { salon: 'Balo Salonu', name: 'Yılmaz & Kaya Düğünü 2024', start: 12, end: 18, type: 'wedding' },
  { salon: 'Toplantı Salonu 1', name: 'ABC Yazılım Toplantısı', start: 9, end: 14, type: 'corp' },
  { salon: 'Toplantı Salonu 2', name: 'XYZ Kongresi 2024', start: 10, end: 14, type: 'corp' },
  { salon: 'Lale Salonu', name: 'XYX Kosmetik Lansmanı', start: 11, end: 16, type: 'corp' },
  { salon: 'Menekşe Salonu', name: 'Orman & Çevre Eğitimi', start: 14, end: 19, type: 'event' },
  { salon: 'Menekşe Salonu', name: 'Engin İnşaat Yatırım Toplantısı', start: 8, end: 13, type: 'corp' },
];

const hours = [8, 9, 10, 11, 12, 13, 14, 15, 18, 20];

const BanquetEvents = () => {
  return (
    <div className="banquet-container">
      <header className="header">
         <div className="title-section">
            <Calendar size={32} className="icon-blue"/>
            <div>
               <h2>Banquet & Event Management</h2>
               <span>Salon rezervasyonları, etkinlik planlama ve operasyonel takip</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline">YENİ ETKİNLİK EKLE</button>
            <button className="btn outline">SALON YERLEŞİM PLANI</button>
            <button className="btn primary red">ACİL DEĞİŞİKLİK</button>
         </div>
      </header>

      <div className="banquet-grid">
         {/* Left: Salon Durumları */}
         <aside className="left-panel">
            <section className="card salon-durum-card">
               <h3>SALON DURUMLARI</h3>
               <div className="sd-list mt-20">
                  {salonStatuses.map((s, i) => (
                    <div key={i} className="sd-item">
                       <div className="dot" style={{ backgroundColor: s.color }}></div>
                       <div className="sd-info">
                          <strong>{s.name}</strong>
                          <div className="sd-meta">
                             <span>{s.count}</span>
                             <span>{s.items}</span>
                             <span>{s.capacity}</span>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="sd-footer mt-20">
                  <div className="f-item"><span>%6X Oligiù</span> <strong>995 üon</strong></div>
                  <div className="f-item"><span>Temizleriıyorr</span> <strong>93</strong></div>
                  <button className="link-btn mt-10">Kategori Yönetimi <ChevronRight size={14}/></button>
               </div>
            </section>
         </aside>

         {/* Center: Salon Rezervasyon Planı */}
         <section className="main-content">
            <div className="card timeline-card">
               <div className="t-head">
                  <h3>SALON REZERVASYON PLANI</h3>
                  <div className="t-date-selector">
                     <span>23 Nisan | Perş</span>
                     <ChevronDown size={14}/>
                  </div>
                  <div className="t-actions">
                     <button className="icon-btn"><LayoutGrid size={16}/></button>
                     <button className="icon-btn"><ListIcon size={16}/></button>
                  </div>
               </div>
               
               <div className="timeline-wrapper mt-20">
                  <div className="timeline-header">
                     <div className="salon-name-col">Pürş.24</div>
                     <div className="hours-row">
                        {hours.map(h => (
                          <div key={h} className="hour-tick">{h.toString().padStart(2, '0')}.00</div>
                        ))}
                     </div>
                  </div>
                  <div className="timeline-body">
                     {salonStatuses.map((s, i) => (
                       <div key={i} className="salon-timeline-row">
                          <div className="salon-name-col">{s.name}</div>
                          <div className="p-relative flex-1">
                             <div className="grid-overlay">
                                {hours.map(h => <div key={h} className="grid-cell"></div>)}
                             </div>
                             {timelineEvents.filter(e => e.salon === s.name).map((e, ei) => (
                               <div 
                                 key={ei} 
                                 className={`event-block ${e.type}`}
                                 style={{ 
                                   left: `${(e.start - 8) * (100 / 12)}%`, 
                                   width: `${(e.end - e.start) * (100 / 12)}%` 
                                 }}
                               >
                                  {e.name}
                               </div>
                             ))}
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               
               <div className="timeline-stats mt-20">
                  <div className="stat pulse"><div className="dot green"></div> 100 DOLU</div>
                  <div className="stat"><div className="dot red"></div> %96 DOLU</div>
                  <div className="stat"><div className="dot blue"></div> %338.6K</div>
                  <div className="stat">398 BOŞ</div>
               </div>
            </div>

            <div className="card banquet-footer mt-20">
               <div className="bf-info">BUGÜNKÜ ETKİNLİK: <strong>8</strong></div>
               <div className="bf-info">BEKLENEN GELİR: <strong>₺450K</strong></div>
            </div>
         </section>

         {/* Right: Function Sheet & Approval */}
         <aside className="right-panel">
            <section className="card fs-card">
               <div className="fs-head">
                  <h3>FUNCTION SHEET</h3>
                  <MoreVertical size={14}/>
               </div>
               <div className="fs-content mt-20">
                  <div className="fs-profile">
                     <Users size={16} className="blue"/>
                     <span>Yılmaz & Kaya Düğünü...</span>
                  </div>
                  <div className="fs-details mt-10">
                     <div className="fs-row"><LayoutGrid size={14}/> Misafir Sayısı: <strong>300</strong></div>
                     <div className="fs-row"><Utensils size={14}/> Menü: <strong>Gala Menu 1</strong></div>
                     <div className="fs-row"><Laptop size={14}/> Teknik: <strong>Projeksiyon, Ses Sis.</strong></div>
                  </div>
                  <div className="fs-links mt-10">
                     <button className="btn-link">Programları <ChevronRight size={12}/></button>
                     <button className="btn-link">Göster... <ChevronRight size={12}/></button>
                  </div>
               </div>

               <div className="onay-merkezi mt-30">
                  <div className="om-head"><h3>ONAY MERKEZİ</h3><MoreVertical size={14}/></div>
                  <div className="onay-list mt-15">
                     <div className="onay-item">
                        <div className="oi-info">
                           <span>Satın Alma</span>
                           <small>Sipariş No. 4227</small>
                        </div>
                        <div className="oi-val">
                           <strong>₺ 3,200</strong>
                           <span className="plus">+2.2s</span>
                        </div>
                     </div>
                     <div className="onay-item mt-10">
                        <div className="oi-info">
                           <span>Finans Onayı</span>
                           <small>Sipariş No. 4227</small>
                        </div>
                        <div className="oi-val">
                           <strong>₺ 3,200</strong>
                           <span className="plus">+2.3s</span>
                        </div>
                     </div>
                  </div>
                  <button className="btn-full mt-20">Tümünü Gör...</button>
               </div>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .banquet-container {
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

        .actions { display: flex; gap: 10px; }
        .btn { padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; }
        .btn.outline { background: white; border: 1px solid #e2e8f0; color: #1e293b; }
        .btn.primary.red { background: #ef4444; color: white; }

        .banquet-grid { display: grid; grid-template-columns: 240px 1fr 280px; gap: 30px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size: 11px; font-weight: 900; color: #1e293b; margin-bottom: 25px; letter-spacing: 0.5px; }

        .sd-item { display: flex; align-items: center; gap: 15px; padding: 15px; border-radius: 12px; border: 1px solid #f1f5f9; margin-bottom: 10px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .sd-info strong { display: block; font-size: 13px; color: #1e293b; margin-bottom: 4px; }
        .sd-meta { display: flex; gap: 8px; font-size: 9px; font-weight: 800; color: #94a3b8; }

        .t-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .t-date-selector { display: flex; align-items: center; gap: 10px; background: #f8fafc; padding: 8px 15px; border-radius: 10px; font-size: 13px; font-weight: 700; color: #1e293b; cursor: pointer; }
        .t-actions { display: flex; gap: 10px; }
        .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; cursor: pointer; color: #94a3b8; display: flex; align-items: center; justify-content: center; }

        .timeline-wrapper { border-radius: 12px; border: 1px solid #f1f5f9; overflow: hidden; }
        .timeline-header { display: flex; background: #f8fafc; border-bottom: 1px solid #f1f5f9; }
        .salon-name-col { width: 120px; padding: 12px; font-size: 11px; font-weight: 800; color: #64748b; border-right: 1px solid #f1f5f9; }
        .hours-row { display: flex; flex: 1; }
        .hour-tick { flex: 1; text-align: center; padding: 12px 0; font-size: 10px; font-weight: 800; color: #94a3b8; border-right: 1px solid #f1f5f9; }

        .salon-timeline-row { display: flex; height: 45px; border-bottom: 1px solid #f1f5f9; }
        .grid-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; }
        .grid-cell { flex: 1; border-right: 1px solid #f8fafc; height: 100%; }

        .event-block { position: absolute; height: 30px; top: 7px; border-radius: 6px; display: flex; align-items: center; padding: 0 10px; font-size: 10px; font-weight: 800; color: white; cursor: pointer; z-index: 10; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
        .event-block.wedding { background: #3b82f6; }
        .event-block.corp { background: #6366f1; }
        .event-block.event { background: #8b5cf6; }

        .timeline-stats { display: flex; gap: 20px; }
        .stat { display: flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 900; color: #64748b; }
        .stat .dot { width: 8px; height: 8px; }

        .bf-info { display: inline-block; margin-right: 40px; font-size: 13px; font-weight: 800; color: #64748b; }
        .bf-info strong { color: #1e293b; margin-left: 8px; }

        .fs-profile { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 800; color: #1e293b; }
        .fs-row { display: flex; align-items: center; gap: 10px; font-size: 12px; color: #64748b; margin-bottom: 12px; font-weight: 700; }
        .fs-row :global(svg) { color: #3b82f6; }
        .fs-links { display: flex; gap: 10px; }
        .btn-link { background: #f1f5f9; border: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 800; color: #64748b; cursor: pointer; display: flex; align-items: center; gap: 5px; }

        .onay-item { display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #f1f5f9; }
        .oi-info span { display: block; font-size: 12px; font-weight: 700; color: #1e293b; }
        .oi-info small { font-size: 10px; color: #94a3b8; }
        .oi-val { text-align: right; }
        .oi-val strong { display: block; font-size: 14px; color: #1e293b; }
        .oi-val .plus { font-size: 10px; color: #10b981; font-weight: 800; }

        .btn-full { width: 100%; padding: 12px; background: #f1f5f9; color: #64748b; border-radius: 10px; font-size: 11px; font-weight: 800; cursor: pointer; border: 1px solid #e2e8f0; }

        .link-btn { border: none; background: transparent; color: #3b82f6; font-size: 11px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 5px; }
        .blue { color: #3b82f6; }
        .gray { color: #94a3b8; }
        .green { color: #10b981; }
        .red { color: #ef4444; }
        .mt-20 { margin-top: 20px; }
        .mt-30 { margin-top: 30px; }
        .mt-15 { margin-top: 15px; }
        .mt-10 { margin-top: 10px; }
        .flex-1 { flex: 1; }
        .p-relative { position: relative; }
      `}</style>
    </div>
  );
};

export default BanquetEvents;
