import React, { useState } from 'react';
import { 
  CreditCard, Search, Plus, 
  ArrowRight, Download, Printer,
  Layers, Package, Trash2, 
  CheckCircle, AlertCircle, Clock,
  DollarSign, FileText, ShoppingCart
} from 'lucide-react';
import { motion } from 'framer-motion';

const checkoutRooms = [
  { id: '204', guest: 'John Doe', balance: '₺ 1,250.00', status: 'ready', type: 'individual' },
  { id: '105', guest: 'Family Smith', balance: '₺ 4,800.00', status: 'pending', type: 'group' },
  { id: '312', guest: 'Alice Wonderland', balance: '₺ 840.50', status: 'ready', type: 'individual' },
];

const Checkout = () => {
  return (
    <div className="checkout-container">
      <header className="header">
         <div className="title-section">
            <CreditCard size={32} className="icon-blue"/>
            <div>
               <h2>Hızlı Check-out & Ödeme Terminali</h2>
               <span>Hesap kapatma, tahsilat ve fatura kesme merkezi</span>
            </div>
         </div>
         <div className="actions">
            <button className="btn outline"><Printer size={18}/> TOPLU FATURA</button>
         </div>
      </header>

      <div className="checkout-grid">
         {/* Active Checkout List */}
         <section className="card list-section">
            <div className="section-header">
               <h3>BUGÜN ÇIKACAK ODALAR</h3>
               <div className="search-box">
                  <Search size={16} />
                  <input type="text" placeholder="Oda veya Misafir..." />
               </div>
            </div>
            <div className="checkout-items">
               {checkoutRooms.map((room, idx) => (
                 <div key={idx} className="checkout-item">
                    <div className="room-info">
                       <span className="room-no">ODA {room.id}</span>
                       <strong>{room.guest}</strong>
                    </div>
                    <div className="balance-info">
                       <span>Kalan Bakiye</span>
                       <strong className="red">{room.balance}</strong>
                    </div>
                    <div className="actions">
                       <button className="btn-pay">ÖDEME AL / KAPAT <ArrowRight size={14}/></button>
                    </div>
                 </div>
               ))}
            </div>
         </section>

         {/* Payment Panel */}
         <aside className="payment-panel">
            <div className="card pay-card">
               <h3>TAHSİLAT İŞLEMİ</h3>
               <div className="total-to-pay">
                  <span>Tahsil Edilecek Tutar</span>
                  <strong>₺ 1,250.00</strong>
               </div>
               
               <div className="pay-methods">
                  <button className="method active"><CreditCard size={18}/> Kredi Kartı</button>
                  <button className="method"><DollarSign size={18}/> Nakit</button>
                  <button className="method"><Layers size={18}/> Havale</button>
               </div>

               <div className="invoice-options">
                  <label className="checkbox">
                     <input type="checkbox" defaultChecked />
                     <span>E-Fatura Oluştur (GİB Entegre)</span>
                  </label>
               </div>

               <button className="btn-full primary mt-20">ÖDEMEYİ ONAYLA</button>
            </div>

            <div className="card status-guide mt-20">
               <h3>SİSTEM DURUMU</h3>
               <div className="s-row"><CheckCircle size={14} className="green"/> <span>GİB Entegrasyonu Aktif</span></div>
               <div className="s-row"><CheckCircle size={14} className="green"/> <span>Banka Pos Bağlantısı OK</span></div>
            </div>
         </aside>
      </div>

      <style jsx>{`
        .checkout-container {
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

        .checkout-grid { display: grid; grid-template-columns: 1fr 340px; gap: 30px; }

        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .section-header h3 { font-size: 14px; font-weight: 900; color: #1e293b; }

        .search-box { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 10px; }
        .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 180px; }

        .checkout-items { display: flex; flex-direction: column; gap: 15px; }
        .checkout-item { 
           display: flex; align-items: center; justify-content: space-between; padding: 20px; background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px;
        }
        
        .room-info { display: flex; flex-direction: column; gap: 4px; }
        .room-no { font-size: 11px; font-weight: 900; color: #3b82f6; letter-spacing: 1px; }
        .room-info strong { font-size: 16px; color: #1e293b; }

        .balance-info { text-align: right; }
        .balance-info span { display: block; font-size: 11px; color: #94a3b8; font-weight: 700; }
        .balance-info strong.red { color: #ef4444; font-size: 18px; font-weight: 800; }

        .btn-pay { 
           background: #1e293b; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer;
        }

        .pay-card { text-align: center; }
        .total-to-pay { background: #f0f9ff; padding: 20px; border-radius: 12px; border: 2px solid #3b82f6; margin: 20px 0; }
        .total-to-pay span { font-size: 12px; color: #3b82f6; font-weight: 700; }
        .total-to-pay strong { display: block; font-size: 28px; font-weight: 900; color: #1e40af; }

        .pay-methods { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
        .method { padding: 10px; border: 1px solid #e2e8f0; border-radius: 10px; background: white; cursor: pointer; font-size: 11px; font-weight: 700; color: #64748b; display: flex; flex-direction: column; align-items: center; gap: 5px; }
        .method.active { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }

        .checkbox { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #64748b; cursor: pointer; }

        .btn-full { width: 100%; padding: 15px; border-radius: 12px; border: none; font-size: 14px; font-weight: 800; cursor: pointer; }
        .btn-full.primary { background: #3b82f6; color: white; }

        .s-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-size: 12px; color: #64748b; font-weight: 600; }
        .green { color: #10b981; }

        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
};

export default Checkout;
