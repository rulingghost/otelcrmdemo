import React, { useState } from 'react';
import { 
  Bell, Search, User, Settings, LogOut, 
  Home, BookOpen, Wallet, Bed, Wrench, 
  Box, ShoppingCart, Users, HeartHandshake, 
  FileText, Waves, Utensils, Phone, Key, 
  ShieldCheck, Receipt, Moon, BarChart3, 
  Layers, ClipboardCheck, Globe, Zap, 
  PlusCircle, LayoutDashboard, ChevronRight,
  Calendar as CalendarIcon, Server, TrendingUp,
  Cpu, MessageSquare, Heart, Sparkles,
  Bot, Database, LayoutGrid, Handshake,
  Wine, Shirt, Package, Scissors,
  List, Calculator, TrendingDown,
  Music, ShieldCheck as ShieldIcon,
  Globe as GlobeIcon, Star, 
  MapPin, PieChart as PieIcon, CreditCard, Compass
} from 'lucide-react';
import { motion } from 'framer-motion';

// Import all modules
import ExecutiveDashboard from './ExecutiveDashboard';
import TapeChart from './TapeChart';
import NewReservationWizard from './NewReservationWizard';
import GuestCRM from './GuestCRM';
import Housekeeping from './Housekeeping';
import HumanResources from './HumanResources';
import Procurement from './Procurement';
import Inventory from './Inventory';
import SpaManagement from './SpaManagement';
import ChannelManager from './ChannelManager';
import SmartRoom from './SmartRoom';
import FrontOffice from './FrontOffice';
import Folio from './Folio';
import CashDesk from './CashDesk';
import TechService from './TechService';
import NightAudit from './NightAudit';
import Surveys from './Surveys';
import Contracts from './Contracts';
import RestaurantPOS from './RestaurantPOS';
import Integrations from './Integrations';
import KBS from './KBS';
import Finance from './Finance';
import ITInfrastructure from './ITInfrastructure';
import GlobalVision from './GlobalVision';
import AIStrategy from './AIStrategy';
import BanquetEvents from './BanquetEvents';
import LoyaltyMobile from './LoyaltyMobile';
import RevenueManagement from './RevenueManagement';
import LostAndFound from './LostAndFound';
import Laundry from './Laundry';
import MiniBar from './MiniBar';
import RoomRack from './RoomRack';
import ReservationList from './ReservationList';
import ReservationCard from './ReservationCard';
import GroupReservations from './GroupReservations';
import Forecast from './Forecast';
import BudgetPlanning from './BudgetPlanning';
import Accounting from './Accounting';
import KVKK from './KVKK';
import CRS from './CRS';
import Entertainment from './Entertainment';
import CostControl from './CostControl';
import Checkout from './Checkout';
import SalesMarketing from './SalesMarketing';
import TourManagement from './TourManagement';

const modules = [
  { id: 'dashboard', name: 'Yönetici Paneli', icon: <LayoutDashboard />, count: 0, color: '#3498db', component: <ExecutiveDashboard /> },
  { id: 'global-vision', name: 'Global Vision', icon: <Globe />, count: 0, color: '#2c3e50', component: <GlobalVision /> },
  { id: 'ai-strategy', name: 'AI Strategy Hub', icon: <Bot />, count: 1, color: '#8b5cf6', component: <AIStrategy /> },
  { id: 'revenue', name: 'Gelir Yönetimi', icon: <TrendingUp />, count: 0, color: '#10b981', component: <RevenueManagement /> },
  { id: 'reservations-tape', name: 'Rezervasyon Takvimi', icon: <CalendarIcon />, count: 12, color: '#2ecc71', component: <TapeChart /> },
  { id: 'new-reservation', name: 'Yeni Rezervasyon', icon: <BookOpen />, count: 0, color: '#e53935', component: <NewReservationWizard /> },
  { id: 'front-office', name: 'Ön Büro', icon: <Bell />, count: 5, color: '#f39c12', component: <FrontOffice /> },
  { id: 'folio', name: 'Folio Yönetimi', icon: <FileText />, count: 8, color: '#f1c40f', component: <Folio /> },
  { id: 'cash-desk', name: 'Kasa İşlemleri', icon: <Wallet />, count: 3, color: '#2ecc71', component: <CashDesk /> },
  { id: 'housekeeping', name: 'Kat Hizmetleri (HK)', icon: <Bed />, count: 16, color: '#9b59b6', component: <Housekeeping /> },
  { id: 'crm', name: 'Pazarlama (CRM)', icon: <HeartHandshake />, count: 2, color: '#c0392b', component: <GuestCRM /> },
  { id: 'loyalty', name: 'Sadakat & Mobil', icon: <Heart />, count: 4, color: '#db2777', component: <LoyaltyMobile /> },
  { id: 'banquet', name: 'Ziyafet & Etkinlik', icon: <Users />, count: 3, color: '#8e44ad', component: <BanquetEvents /> },
  { id: 'tech-service', name: 'Teknik Servis', icon: <Wrench />, count: 4, color: '#e67e22', component: <TechService /> },
  { id: 'stock', name: 'Stok & Depo', icon: <Box />, count: 7, color: '#1abc9c', component: <Inventory /> },
  { id: 'purchasing', name: 'Satın Alma', icon: <ShoppingCart />, count: 9, color: '#34495e', component: <Procurement /> },
  { id: 'hr', name: 'Personel (HR)', icon: <Users />, count: 3, color: '#d35400', component: <HumanResources /> },
  { id: 'spa', name: 'SPA & Wellness', icon: <Waves />, count: 2, color: '#16a085', component: <SpaManagement /> },
  { id: 'channel', name: 'Kanal Yönetimi', icon: <Layers />, count: 5, color: '#e67e22', component: <ChannelManager /> },
  { id: 'pos', name: 'Restoran POS', icon: <Utensils />, count: 6, color: '#8e44ad', component: <RestaurantPOS /> },
  { id: 'it-infra', name: 'IT & Veritabanı', icon: <Database />, count: 0, color: '#34495e', component: <ITInfrastructure /> },
  { id: 'integrations', name: 'Entegrasyonlar', icon: <Cpu />, count: 5, color: '#2c3e50', component: <Integrations /> },
  { id: 'kbs', name: 'Polis Listesi (KBS)', icon: <ShieldCheck />, count: 1, color: '#c0392b', component: <KBS /> },
  { id: 'finance', name: 'E-Fatura / Finans', icon: <Receipt />, count: 5, color: '#2980b9', component: <Finance /> },
  { id: 'night-audit', name: 'Gece Raporu', icon: <Moon />, count: 4, color: '#2c3e50', component: <NightAudit /> },
  { id: 'surveys', name: 'Anket Yönetimi', icon: <ClipboardCheck />, count: 6, color: '#c0392b', component: <Surveys /> },
  { id: 'smart-room', name: 'Smart Room & Energy', icon: <Zap />, count: 0, color: '#f1c40f', component: <SmartRoom /> },
  { id: 'contracts', name: 'Acente Kontratları', icon: <Handshake />, count: 7, color: '#27ae60', component: <Contracts /> },
  { id: 'lost-found', name: 'Kayıp & Bulunan', icon: <Package />, count: 2, color: '#f39c12', component: <LostAndFound /> },
  { id: 'laundry', name: 'Çamaşırhane', icon: <Shirt />, count: 3, color: '#3b82f6', component: <Laundry /> },
  { id: 'minibar', name: 'Mini Bar & İkram', icon: <Wine />, count: 5, color: '#8e44ad', component: <MiniBar /> },
  { id: 'room-rack', name: 'Room Rack', icon: <LayoutGrid />, count: 0, color: '#3b82f6', component: <RoomRack /> },
  { id: 'res-list', name: 'Rezervasyon Listesi', icon: <List />, count: 342, color: '#10b981', component: <ReservationList /> },
  { id: 'res-card', name: 'Rezervasyon Kartı', icon: <FileText />, count: 0, color: '#1e293b', component: <ReservationCard /> },
  { id: 'group-res', name: 'Grup Rezervasyonları', icon: <Users />, count: 12, color: '#8b5cf6', component: <GroupReservations /> },
  { id: 'forecast', name: 'Gelecek Tahmini', icon: <TrendingUp />, count: 0, color: '#3b82f6', component: <Forecast /> },
  { id: 'budget', name: 'Bütçe Planlama', icon: <Calculator />, count: 0, color: '#27ae60', component: <BudgetPlanning /> },
  { id: 'accounting', name: 'Genel Muhasebe', icon: <FileText />, count: 0, color: '#2980b9', component: <Accounting /> },
  { id: 'kvkk', name: 'KVKK & Güvenlik', icon: <ShieldIcon />, count: 0, color: '#ef4444', component: <KVKK /> },
  { id: 'crs', name: 'Merkezi Rezervasyon', icon: <GlobeIcon />, count: 0, color: '#34495e', component: <CRS /> },
  { id: 'entertainment', name: 'Entertainment', icon: <Music />, count: 12, color: '#d946ef', component: <Entertainment /> },
  { id: 'cost-control', name: 'Maliyet Kontrol', icon: <TrendingDown />, count: 0, color: '#ef4444', component: <CostControl /> },
  { id: 'checkout', name: 'Hızlı Check-out', icon: <CreditCard />, count: 3, color: '#1e293b', component: <Checkout /> },
  { id: 'sales-marketing', name: 'Satış & Pazarlama', icon: <TrendingUp />, count: 0, color: '#3b82f6', component: <SalesMarketing /> },
  { id: 'tours', name: 'Tur & Acente (Sedna)', icon: <Compass />, count: 3, color: '#f59e0b', component: <TourManagement /> },
];

const MainHub = ({ user, onLogout }) => {
  const [activeModule, setActiveModule] = useState(null);

  const renderContent = () => {
    if (activeModule) {
      const module = modules.find(m => m.id === activeModule);
      return (
        <div className="module-view">
          <header className="module-view-header">
            <button className="back-btn" onClick={() => setActiveModule(null)}>
              <ChevronRight style={{ transform: 'rotate(180deg)' }} /> Hub'a Dön
            </button>
            <div className="module-title-box">
               <div className="icon" style={{ color: module.color }}>{module.icon}</div>
               <h2>{module.name}</h2>
            </div>
            <div className="header-actions">
               <div className="user-pill">
                  <User size={16}/>
                  <span>{user?.username || 'Admin'}</span>
               </div>
            </div>
          </header>
          <div className="module-body">
            {module.component || <div className="placeholder-view">Bu modül yakında eklenecek...</div>}
          </div>
        </div>
      );
    }

    return (
      <section className="hub-content">
        <div className="content-header">
          <div className="title-area">
             <h2>Hotel ERP <span>Premium Hub</span></h2>
             <p>28 Aktif bağlantı, 12 kritik bekleyen işlem</p>
          </div>
          <div className="hub-stats">
             <div className="h-stat">
                <span className="label">OTEL DOLULUK</span>
                <strong>%82</strong>
             </div>
             <div className="h-stat">
                <span className="label">GÜNLÜK CİRO</span>
                <strong>₺142.500</strong>
             </div>
          </div>
        </div>

        <div className="module-grid">
          {modules.map((module, index) => (
            <div 
              key={module.id}
              className="module-card"
              onClick={() => setActiveModule(module.id)}
            >
              <div className="module-icon" style={{ backgroundColor: `${module.color}15`, color: module.color }}>
                {module.icon}
                {module.count > 0 && <span className="module-badge" style={{ backgroundColor: module.color }}>{module.count}</span>}
              </div>
              <div className="module-info">
                <h3>{module.name}</h3>
                <span className="sub">Operasyonel takip</span>
              </div>
              <ChevronRight className="arrow" size={16}/>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="main-hub-wrapper">
      <nav className="side-nav">
         <div className="logo">
            <div className="logo-box">H</div>
            <span>HOTEL ERP</span>
         </div>
         <div className="nav-links">
            <button className={!activeModule ? 'active' : ''} onClick={() => setActiveModule(null)}><LayoutGrid size={20}/> Dashboard</button>
            <button><CalendarIcon size={20}/> Calendar</button>
            <button><Users size={20}/> Guests</button>
            <button><BarChart3 size={20}/> Reports</button>
         </div>
         <div className="nav-footer">
            <button className="settings-btn"><Settings size={20}/> Settings</button>
            <button className="logout-btn" onClick={onLogout}><LogOut size={20}/> Logout</button>
         </div>
      </nav>
      <main className="main-viewport">
        {renderContent()}
      </main>

      <style jsx>{`
        .main-hub-wrapper {
          display: flex;
          height: 100vh;
          background: #f1f5f9;
          overflow: hidden;
        }

        .side-nav {
           width: 260px;
           background: #1e293b;
           color: white;
           display: flex;
           flex-direction: column;
           padding: 30px 20px;
        }

        .logo { display: flex; align-items: center; gap: 15px; margin-bottom: 50px; }
        .logo-box { width: 40px; height: 40px; background: #3b82f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 20px; }
        .logo span { font-weight: 800; letter-spacing: 1px; font-size: 18px; }

        .nav-links { display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .nav-links button {
           display: flex; align-items: center; gap: 15px; padding: 12px 20px; border-radius: 12px; background: transparent; border: none; color: #94a3b8; font-weight: 600; cursor: pointer; transition: all 0.2s; width: 100%; text-align: left;
        }
        .nav-links button:hover, .nav-links button.active { background: rgba(255,255,255,0.05); color: white; }

        .nav-footer { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; display: flex; flex-direction: column; gap: 10px; }
        .settings-btn, .logout-btn {
           display: flex; align-items: center; gap: 15px; padding: 12px 20px; border-radius: 12px; background: transparent; border: none; color: #94a3b8; font-weight: 600; cursor: pointer;
        }

        .main-viewport { flex: 1; overflow: hidden; position: relative; }

        .hub-content {
           padding: 40px;
           height: 100%;
           overflow-y: auto;
           display: flex;
           flex-direction: column;
           gap: 40px;
        }

        .content-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .title-area h2 { font-size: 32px; font-weight: 800; color: #1e293b; margin-bottom: 5px; }
        .title-area h2 span { color: #3b82f6; }
        .title-area p { color: #64748b; font-weight: 600; }

        .hub-stats { display: flex; gap: 30px; }
        .h-stat { text-align: right; }
        .h-stat .label { font-size: 11px; font-weight: 800; color: #94a3b8; letter-spacing: 1px; }
        .h-stat strong { display: block; font-size: 24px; font-weight: 800; color: #1e293b; }

        .module-grid {
           display: grid;
           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
           gap: 20px;
           padding-bottom: 40px;
        }

        .module-card {
           background: white;
           padding: 20px;
           border-radius: 20px;
           border: 1px solid #e2e8f0;
           display: flex;
           align-items: center;
           gap: 20px;
           cursor: pointer;
           position: relative;
           transition: all 0.2s;
        }
        .module-card:hover { border-color: #3b82f6; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }

        .module-icon {
           width: 54px; height: 54px; border-radius: 14px; display: flex; align-items: center; justify-content: center; position: relative;
        }
        .module-badge {
           position: absolute; top: -5px; right: -5px; padding: 3px 6px; border-radius: 8px; color: white; font-size: 10px; font-weight: 800; border: 2px solid white;
        }

        .module-info h3 { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 2px; }
        .module-info .sub { font-size: 11px; color: #94a3b8; font-weight: 600; }

        .module-card .arrow { color: #cbd5e1; opacity: 0; transition: all 0.2s; margin-left: auto; }
        .module-card:hover .arrow { opacity: 1; transform: translateX(5px); }

        /* Module View Styling */
        .module-view { height: 100%; display: flex; flex-direction: column; }
        .module-view-header {
           padding: 20px 40px;
           background: white;
           border-bottom: 1px solid #e2e8f0;
           display: flex;
           align-items: center;
           justify-content: space-between;
        }
        .back-btn {
           display: flex; align-items: center; gap: 10px; background: #f1f5f9; border: none; padding: 10px 15px; border-radius: 10px; color: #64748b; font-weight: 700; cursor: pointer; font-size: 13px;
        }
        .module-title-box { display: flex; align-items: center; gap: 15px; }
        .module-title-box h2 { font-size: 18px; font-weight: 800; color: #1e293b; }
        .user-pill {
           display: flex; align-items: center; gap: 10px; padding: 8px 15px; background: #f8fafc; border-radius: 20px; border: 1px solid #e2e8f0; font-size: 13px; font-weight: 700; color: #475569;
        }

        .module-body { flex: 1; overflow: hidden; }

        .placeholder-view {
           display: flex; align-items: center; justify-content: center; height: 100%; color: #94a3b8; font-size: 18px; font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default MainHub;
