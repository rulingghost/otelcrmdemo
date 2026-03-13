import React, { useState } from 'react';
import { 
  FileText, Search, Plus, 
  Handshake, Calendar, DollarSign,
  TrendingUp, Globe, Users,
  CheckCircle, MoreVertical, Filter,
  ArrowRight, Download, Edit
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const agencyData = [
  { name: 'Jan', booking: 400, expedia: 240, ets: 180 },
  { name: 'Feb', booking: 300, expedia: 139, ets: 210 },
  { name: 'Mar', booking: 200, expedia: 980, ets: 290 },
  { name: 'Apr', booking: 278, expedia: 390, ets: 320 },
  { name: 'May', booking: 189, expedia: 480, ets: 250 },
  { name: 'Jun', booking: 239, expedia: 380, ets: 410 },
];

const contractList = [
  { id: 1, agency: 'Booking.com', type: 'Komisyonlu', rate: '%15', status: 'active', expiry: '31.12.2024' },
  { id: 2, agency: 'Expedia', type: 'Net Fiyat', rate: '$120', status: 'active', expiry: '31.12.2024' },
  { id: 3, agency: 'ETSTUR', type: 'Kontenjan', rate: '20 Oda', status: 'pending', expiry: '01.06.2024' },
];

const Contracts = () => {
  return (
    <div className="contracts-container">
      <div className="header">
         <div className="title-section">
            <Handshake size={32} className="icon-blue"/>
            <div>
               <h2>Acente Kontrat & Fiyat Yönetimi</h2>
               <span>Sezonluk anlaşmalar, aksiyonlar ve kontenjan takibi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn-contract primary"><Plus size={18}/> YENİ KONTRAT EKLE</button>
            <button className="btn-contract outline"><DollarSign size={18}/> FİYAT KOPYALA</button>
         </div>
      </div>

      <div className="contracts-grid">
         {/* Performance Chart */}
         <section className="card chart-card">
            <div className="section-header">
               <h3>ACENTE PERFORMANS ANALİZİ (YILLIK)</h3>
               <div className="chart-legend">
                  <div className="legend-item"><div className="dot blue"></div> Booking</div>
                  <div className="legend-item"><div className="dot red"></div> Expedia</div>
                  <div className="legend-item"><div className="dot green"></div> ETSTUR</div>
               </div>
            </div>
            <div style={{ height: 300 }}>
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={agencyData}>
                     <defs>
                        <linearGradient id="colorBooking" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                     <Tooltip />
                     <Area type="monotone" dataKey="booking" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBooking)" strokeWidth={3} />
                     <Area type="monotone" dataKey="expedia" stroke="#ef4444" fill="transparent" strokeWidth={3} />
                     <Area type="monotone" dataKey="ets" stroke="#10b981" fill="transparent" strokeWidth={3} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </section>

         {/* Contract Table */}
         <section className="card table-card">
            <div className="section-header">
               <h3>AKTİF ANLAŞMALAR</h3>
               <div className="search-box">
                  <Search size={16} />
                  <input type="text" placeholder="Acente Ara..." />
               </div>
            </div>
            <table className="contract-table">
               <thead>
                  <tr>
                     <th>Acente</th>
                     <th>Anlaşma Tipi</th>
                     <th>Oran/Fiyat</th>
                     <th>Bitiş Tarihi</th>
                     <th>Durum</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {contractList.map((c, idx) => (
                    <tr key={idx}>
                       <td><strong>{c.agency}</strong></td>
                       <td>{c.type}</td>
                       <td>{c.rate}</td>
                       <td>{c.expiry}</td>
                       <td>
                          <span className={`status-pill ${c.status}`}>
                             {c.status === 'active' ? 'Aktif' : 'Beklemede'}
                          </span>
                       </td>
                       <td>
                          <div className="row-actions">
                             <button className="icon-btn"><Edit size={14}/></button>
                             <button className="icon-btn"><Download size={14}/></button>
                             <button className="icon-btn"><MoreVertical size={14}/></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </section>

         {/* Right Sidebar - Promotion Center */}
         <aside className="promotion-sidebar">
            <section className="card promo-card">
               <h3>PROMOSYON & AKSİYONLAR</h3>
               <div className="promo-list">
                  <div className="promo-item">
                     <div className="promo-info">
                        <strong>7-6 Stay Pay</strong>
                        <span>7 gece kal 6 öde</span>
                     </div>
                     <span className="badge active">AKTİF</span>
                  </div>
                  <div className="promo-item">
                     <div className="promo-info">
                        <strong>EB %20 Discount</strong>
                        <span>Erken Rezervasyon</span>
                     </div>
                     <span className="badge active">AKTİF</span>
                  </div>
                  <div className="promo-item">
                     <div className="promo-info">
                        <strong>Child Free</strong>
                        <span>0-12 Yaş Ücretsiz</span>
                     </div>
                     <span className="badge inactive">PASİF</span>
                  </div>
               </div>
               <button className="btn-full primary mt-20">AKSİYON TANIMLA</button>
            </section>
         </aside>
      </div>

      <style jsx>{`
        .contracts-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .header { display: flex; justify-content: space-between; align-items: center; }
        .title-section { display: flex; align-items: center; gap: 20px; }
        .icon-blue { color: #3b82f6; }
        .title-section h2 { font-size: 24px; font-weight: 800; color: #1e293b; margin-bottom: 5px; }
        .title-section span { font-size: 14px; color: #64748b; }

        .actions { display: flex; gap: 15px; }
        .btn-contract {
           padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; border: none; transition: all 0.2s;
        }
        .btn-contract.primary { background: #3b82f6; color: white; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }
        .btn-contract.outline { background: white; border: 1px solid #e2e8f0; color: #475569; }
        .btn-contract:hover { transform: translateY(-2px); }

        .contracts-grid {
           display: grid;
           grid-template-columns: 1fr 320px;
           gap: 30px;
        }

        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .section-header h3 { font-size: 15px; font-weight: 800; color: #1e293b; letter-spacing: 0.5px; }

        .chart-legend { display: flex; gap: 20px; }
        .legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #94a3b8; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.blue { background: #3b82f6; }
        .dot.red { background: #ef4444; }
        .dot.green { background: #10b981; }

        .search-box {
           display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 10px; width: 250px;
        }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; color: #475569; width: 100%; }

        .contract-table { width: 100%; border-collapse: collapse; }
        .contract-table th { text-align: left; padding: 15px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #f1f5f9; }
        .contract-table td { padding: 20px 15px; font-size: 14px; border-bottom: 1px solid #f8fafc; color: #475569; }

        .status-pill { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        .status-pill.active { background: #f0fdf4; color: #10b981; }
        .status-pill.pending { background: #fff7ed; color: #f97316; }

        .row-actions { display: flex; gap: 8px; }
        .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #f1f5f9; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #94a3b8; }
        .icon-btn:hover { background: #f8fafc; color: #3b82f6; }

        .promo-list { display: flex; flex-direction: column; gap: 15px; }
        .promo-item {
           display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9;
        }
        .promo-info strong { display: block; font-size: 14px; color: #1e293b; }
        .promo-info span { font-size: 12px; color: #94a3b8; }
        .badge { font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 6px; }
        .badge.active { background: #ecfdf5; color: #10b981; }
        .badge.inactive { background: #f1f5f9; color: #94a3b8; }

        .btn-full {
           width: 100%; padding: 15px; border: none; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer;
        }
        .btn-full.primary { background: #1e293b; color: white; }
      `}</style>
    </div>
  );
};

export default Contracts;
