import React, { useState } from 'react';
import { 
  LayoutGrid, Search, Filter, 
  Bed, User, CheckCircle, 
  AlertTriangle, Clock, Hammer,
  Coffee, ShieldCheck, MoreVertical,
  ChevronRight, Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const floors = [
  { floor: 1, rooms: [
    { id: 101, type: 'DBL', status: 'occupied', cleaning: 'clean', guest: 'John Doe' },
    { id: 102, type: 'SNG', status: 'dirty', cleaning: 'dirty', guest: null },
    { id: 103, type: 'DBL', status: 'available', cleaning: 'clean', guest: null },
    { id: 104, type: 'STE', status: 'occupied', cleaning: 'clean', guest: 'Jane Smith' },
    { id: 105, type: 'DBL', status: 'out-of-order', cleaning: 'dirty', guest: null },
    { id: 106, type: 'DBL', status: 'available', cleaning: 'inspect', guest: null },
    { id: 107, type: 'SNG', status: 'occupied', cleaning: 'clean', guest: 'Robert B.' },
    { id: 108, type: 'DBL', status: 'available', cleaning: 'clean', guest: null },
  ]},
  { floor: 2, rooms: [
    { id: 201, type: 'DBL', status: 'available', cleaning: 'clean', guest: null },
    { id: 202, type: 'STE', status: 'occupied', cleaning: 'clean', guest: 'Alice W.' },
    { id: 203, type: 'DBL', status: 'available', cleaning: 'clean', guest: null },
    { id: 204, type: 'DBL', status: 'occupied', cleaning: 'dirty', guest: 'Charlie K.' },
  ]}
];

const statusColors = {
  'available': '#10b981',
  'occupied': '#ef4444',
  'dirty': '#f59e0b',
  'out-of-order': '#64748b',
  'inspect': '#8b5cf6'
};

const RoomRack = () => {
  const [filter, setFilter] = useState('all');

  return (
    <div className="rack-container">
      <header className="rack-header">
         <div className="title-box">
            <LayoutGrid size={32} className="blue"/>
            <div>
               <h2>Room Rack (Oda Planı Haritası)</h2>
               <span>Tüm odaların anlık durum, temizlik ve doluluk görseli</span>
            </div>
         </div>
         <div className="rack-actions">
            <div className="legend">
               <div className="item"><div className="dot green"></div> Boş</div>
               <div className="item"><div className="dot red"></div> Dolu</div>
               <div className="item"><div className="dot orange"></div> Kirli</div>
               <div className="item"><div className="dot gray"></div> Arızalı</div>
            </div>
            <div className="search-bar">
               <Search size={18}/>
               <input type="text" placeholder="Oda no veya misafir ara..." />
            </div>
         </div>
      </header>

      <div className="rack-grid">
         {floors.map((floorData, fIdx) => (
           <div key={fIdx} className="floor-section">
              <div className="floor-label">KAT {floorData.floor}</div>
              <div className="rooms-container">
                 {floorData.rooms.map((room, rIdx) => (
                   <motion.div 
                     key={rIdx} 
                     className={`room-card ${room.status}`}
                     whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                   >
                      <div className="room-top">
                         <span className="room-id">{room.id}</span>
                         <span className="room-type">{room.type}</span>
                      </div>
                      <div className="room-middle">
                         {room.status === 'occupied' ? (
                           <div className="guest-info">
                              <User size={14}/>
                              <span>{room.guest}</span>
                           </div>
                         ) : room.status === 'out-of-order' ? (
                           <Hammer size={24} className="icon-gray"/>
                         ) : (
                           <Bed size={24} className="icon-light"/>
                         )}
                      </div>
                      <div className="room-bottom">
                         <div className={`cleaning-dot ${room.cleaning}`}></div>
                         <div className="btns">
                            <button className="mini-btn"><Info size={12}/></button>
                            <button className="mini-btn"><MoreVertical size={12}/></button>
                         </div>
                      </div>
                   </motion.div>
                 ))}
                 <div className="add-room-stub">
                    <Plus size={20}/>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <style jsx>{`
        .rack-container {
          padding: 30px;
          background: #f1f5f9;
          height: calc(100vh - 70px);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 30px;
        }

        .rack-header { display: flex; justify-content: space-between; align-items: center; }
        .title-box { display: flex; align-items: center; gap: 20px; }
        .title-box h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .title-box span { font-size: 14px; color: #64748b; }

        .rack-actions { display: flex; align-items: center; gap: 30px; }
        .legend { display: flex; gap: 15px; background: white; padding: 10px 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
        .legend .item { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #64748b; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.green { background: #10b981; }
        .dot.red { background: #ef4444; }
        .dot.orange { background: #f59e0b; }
        .dot.gray { background: #64748b; }

        .search-bar { display: flex; align-items: center; gap: 10px; background: white; padding: 10px 15px; border-radius: 12px; border: 1px solid #e2e8f0; }
        .search-bar input { border: none; outline: none; font-size: 14px; width: 220px; }

        .rack-grid { display: flex; flex-direction: column; gap: 40px; }
        .floor-section { display: flex; flex-direction: column; gap: 15px; }
        .floor-label { font-size: 11px; font-weight: 900; color: #94a3b8; letter-spacing: 2px; border-left: 3px solid #3b82f6; padding-left: 10px; }

        .rooms-container { display: flex; flex-wrap: wrap; gap: 15px; }

        .room-card {
           width: 140px; height: 160px; background: white; border-radius: 16px; border: 2px solid transparent; padding: 15px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: all 0.2s;
        }
        .room-card.available { border-top: 5px solid #10b981; }
        .room-card.occupied { border-top: 5px solid #ef4444; }
        .room-card.dirty { border-top: 5px solid #f59e0b; }
        .room-card.out-of-order { border-top: 5px solid #64748b; background: #f8fafc; }

        .room-top { display: flex; justify-content: space-between; align-items: center; }
        .room-id { font-size: 18px; font-weight: 900; color: #1e293b; }
        .room-type { font-size: 11px; font-weight: 800; color: #94a3b8; }

        .room-middle { flex: 1; display: flex; align-items: center; justify-content: center; }
        .guest-info { display: flex; flex-direction: column; align-items: center; gap: 5px; text-align: center; }
        .guest-info span { font-size: 12px; font-weight: 700; color: #475569; }

        .room-bottom { display: flex; justify-content: space-between; align-items: center; }
        .cleaning-dot { width: 10px; height: 10px; border-radius: 50%; }
        .cleaning-dot.clean { background: #10b981; box-shadow: 0 0 10px rgba(16, 185, 129, 0.4); }
        .cleaning-dot.dirty { background: #ef4444; }
        .cleaning-dot.inspect { background: #8b5cf6; }

        .mini-btn { width: 28px; height: 28px; border-radius: 8px; border: 1px solid #f1f5f9; background: #f8fafc; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #94a3b8; }

        .add-room-stub {
           width: 140px; height: 160px; border: 2px dashed #e2e8f0; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #cbd5e1; cursor: pointer;
        }
        .add-room-stub:hover { border-color: #3b82f6; color: #3b82f6; }

        .blue { color: #3b82f6; }
        .icon-gray { color: #94a3b8; }
        .icon-light { color: #e2e8f0; }
      `}</style>
    </div>
  );
};

const Plus = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default RoomRack;
