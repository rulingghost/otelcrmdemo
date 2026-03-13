import React, { createContext, useContext, useState, useCallback } from 'react';

// ─── Initial demo data ────────────────────────────────────────────
const initialRooms = [
  { id: '101', type: 'Standard', floor: 1, status: 'dolu',    clean: 'temiz',   guest: 'Ahmet Yılmaz',  checkIn: '2026-03-13', checkOut: '2026-03-16', pax: 2 },
  { id: '102', type: 'Standard', floor: 1, status: 'boş',     clean: 'temiz',   guest: null,            checkIn: null,         checkOut: null,         pax: 0 },
  { id: '103', type: 'Deluxe',   floor: 1, status: 'dolu',    clean: 'kirli',   guest: 'Hans Müller',   checkIn: '2026-03-12', checkOut: '2026-03-15', pax: 1 },
  { id: '104', type: 'Deluxe',   floor: 1, status: 'arızalı', clean: 'kirli',   guest: null,            checkIn: null,         checkOut: null,         pax: 0 },
  { id: '201', type: 'Suite',    floor: 2, status: 'boş',     clean: 'temiz',   guest: null,            checkIn: null,         checkOut: null,         pax: 0 },
  { id: '202', type: 'Standard', floor: 2, status: 'dolu',    clean: 'temiz',   guest: 'Fatma Demir',   checkIn: '2026-03-13', checkOut: '2026-03-17', pax: 2 },
  { id: '203', type: 'Deluxe',   floor: 2, status: 'dolu',    clean: 'kirli',   guest: 'John Smith',    checkIn: '2026-03-11', checkOut: '2026-03-14', pax: 3 },
  { id: '204', type: 'Suite',    floor: 2, status: 'boş',     clean: 'temiz',   guest: null,            checkIn: null,         checkOut: null,         pax: 0 },
  { id: '301', type: 'Standard', floor: 3, status: 'dolu',    clean: 'temiz',   guest: 'Maria Lopez',   checkIn: '2026-03-13', checkOut: '2026-03-15', pax: 2 },
  { id: '302', type: 'Penthouse',floor: 3, status: 'boş',     clean: 'temiz',   guest: null,            checkIn: null,         checkOut: null,         pax: 0 },
];

const initialReservations = [
  { id: 'RES-001', guest: 'Ahmet Yılmaz',  room: '101', type: 'Standard', channel: 'Booking.com', checkIn: '2026-03-13', checkOut: '2026-03-16', nights: 3, pax: 2, status: 'check-in',  total: 4500,  paid: 4500,  balance: 0    },
  { id: 'RES-002', guest: 'Hans Müller',    room: '103', type: 'Deluxe',   channel: 'Expedia',     checkIn: '2026-03-12', checkOut: '2026-03-15', nights: 3, pax: 1, status: 'check-in',  total: 6750,  paid: 3000,  balance: 3750 },
  { id: 'RES-003', guest: 'Fatma Demir',   room: '202', type: 'Standard', channel: 'Direkt',      checkIn: '2026-03-13', checkOut: '2026-03-17', nights: 4, pax: 2, status: 'check-in',  total: 6000,  paid: 6000,  balance: 0    },
  { id: 'RES-004', guest: 'John Smith',    room: '203', type: 'Deluxe',   channel: 'Booking.com', checkIn: '2026-03-11', checkOut: '2026-03-14', nights: 3, pax: 3, status: 'check-out', total: 9000,  paid: 9000,  balance: 0    },
  { id: 'RES-005', guest: 'Maria Lopez',   room: '301', type: 'Standard', channel: 'HotelRunner', checkIn: '2026-03-13', checkOut: '2026-03-15', nights: 2, pax: 2, status: 'check-in',  total: 3000,  paid: 1500,  balance: 1500 },
  { id: 'RES-006', guest: 'Selin Kaya',    room: null,  type: 'Suite',    channel: 'Direkt',      checkIn: '2026-03-15', checkOut: '2026-03-18', nights: 3, pax: 2, status: 'gelecek',   total: 12000, paid: 3000,  balance: 9000 },
  { id: 'RES-007', guest: 'David Wilson',  room: null,  type: 'Deluxe',   channel: 'TUI',         checkIn: '2026-03-16', checkOut: '2026-03-20', nights: 4, pax: 2, status: 'gelecek',   total: 9000,  paid: 0,     balance: 9000 },
];

const initialGuests = [
  { id: 'G-001', name: 'Ahmet Yılmaz',  nationality: 'TR', phone: '+90 532 111 22 33', email: 'ahmet@example.com', loyalty: 'Gold',     visits: 12, totalSpent: 48000, lastVisit: '2026-03-13' },
  { id: 'G-002', name: 'Hans Müller',    nationality: 'DE', phone: '+49 151 234 5678', email: 'hans@example.com',  loyalty: 'Platinum', visits: 25, totalSpent: 120000, lastVisit: '2026-03-12' },
  { id: 'G-003', name: 'Fatma Demir',   nationality: 'TR', phone: '+90 542 333 44 55', email: 'fatma@example.com', loyalty: 'Silver',   visits: 5,  totalSpent: 18000, lastVisit: '2026-03-13' },
  { id: 'G-004', name: 'John Smith',    nationality: 'US', phone: '+1 555 678 9012',   email: 'john@example.com',  loyalty: 'None',     visits: 1,  totalSpent: 9000,  lastVisit: '2026-03-11' },
  { id: 'G-005', name: 'Maria Lopez',   nationality: 'ES', phone: '+34 600 123 456',   email: 'maria@example.com', loyalty: 'Silver',   visits: 3,  totalSpent: 12000, lastVisit: '2026-03-13' },
];

const initialTasks = [
  { id: 'T-001', type: 'housekeeping', room: '103', desc: 'Oda temizliği (check-out hazırlığı)', priority: 'high',   status: 'bekliyor', assignee: 'Ayşe H.',  created: '09:00' },
  { id: 'T-002', type: 'housekeeping', room: '203', desc: 'Havlu değişimi ve minibar kontrolü',  priority: 'normal', status: 'devam',    assignee: 'Fatih H.', created: '09:15' },
  { id: 'T-003', type: 'technical',    room: '104', desc: 'Klima arızası — çalışmıyor',          priority: 'high',   status: 'bekliyor', assignee: 'Murat T.', created: '08:30' },
  { id: 'T-004', type: 'technical',    room: '201', desc: 'TV uzaktan kumanda değişimi',         priority: 'low',    status: 'bitti',    assignee: 'Murat T.', created: '07:45' },
];

// ─── Context ──────────────────────────────────────────────────────
const HotelContext = createContext(null);

export const HotelProvider = ({ children }) => {
  const [rooms, setRooms]               = useState(initialRooms);
  const [reservations, setReservations] = useState(initialReservations);
  const [guests, setGuests]             = useState(initialGuests);
  const [tasks, setTasks]               = useState(initialTasks);
  const [notifications, setNotifications] = useState([
    { id: 'N-001', type: 'warn',    msg: 'KBS: 3 misafir bildirimi bekliyor', time: '09:05' },
    { id: 'N-002', type: 'info',    msg: 'Oda 104 arıza kaydı açıldı',         time: '08:31' },
    { id: 'N-003', type: 'success', msg: 'RES-004 başarıyla check-out yapıldı', time: '08:00' },
  ]);

  // ── Room actions ─────────────────────────────────────────────
  const updateRoomStatus = useCallback((roomId, patch) => {
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, ...patch } : r));
  }, []);

  // ── Reservation actions ───────────────────────────────────────
  const addReservation = useCallback((res) => {
    const newRes = { ...res, id: `RES-${String(reservations.length + 1).padStart(3,'0')}` };
    setReservations(prev => [newRes, ...prev]);
    addNotification({ type: 'success', msg: `Yeni rezervasyon: ${res.guest}` });
  }, [reservations.length]);

  const updateReservation = useCallback((id, patch) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r));
  }, []);

  const checkIn = useCallback((resId) => {
    setReservations(prev => prev.map(r => r.id === resId ? { ...r, status: 'check-in' } : r));
    const res = reservations.find(r => r.id === resId);
    if (res?.room) updateRoomStatus(res.room, { status: 'dolu', guest: res.guest });
    addNotification({ type: 'success', msg: `Check-in: ${res?.guest} — Oda ${res?.room}` });
  }, [reservations, updateRoomStatus]);

  const checkOut = useCallback((resId) => {
    setReservations(prev => prev.map(r => r.id === resId ? { ...r, status: 'check-out' } : r));
    const res = reservations.find(r => r.id === resId);
    if (res?.room) updateRoomStatus(res.room, { status: 'boş', clean: 'kirli', guest: null });
    addNotification({ type: 'info', msg: `Check-out: ${res?.guest} — Oda ${res?.room}` });
  }, [reservations, updateRoomStatus]);

  // ── Task actions ──────────────────────────────────────────────
  const addTask = useCallback((task) => {
    const newTask = { ...task, id: `T-${String(tasks.length + 1).padStart(3,'0')}`, created: new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'}) };
    setTasks(prev => [newTask, ...prev]);
  }, [tasks.length]);

  const updateTask = useCallback((id, patch) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
  }, []);

  // ── Notification helper ───────────────────────────────────────
  const addNotification = useCallback((n) => {
    const note = { ...n, id: `N-${Date.now()}`, time: new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'}) };
    setNotifications(prev => [note, ...prev.slice(0, 19)]);
  }, []);

  // ── Computed stats ────────────────────────────────────────────
  const stats = {
    totalRooms:    rooms.length,
    occupied:      rooms.filter(r => r.status === 'dolu').length,
    vacant:        rooms.filter(r => r.status === 'boş').length,
    outOfOrder:    rooms.filter(r => r.status === 'arızalı').length,
    dirty:         rooms.filter(r => r.clean === 'kirli').length,
    todayArrivals: reservations.filter(r => r.checkIn === '2026-03-13' && r.status === 'gelecek').length,
    todayDepartures: reservations.filter(r => r.checkOut === '2026-03-13' && r.status === 'check-in').length,
    inHouse:       reservations.filter(r => r.status === 'check-in').length,
    pendingTasks:  tasks.filter(t => t.status !== 'bitti').length,
    occupancyRate: Math.round((rooms.filter(r => r.status === 'dolu').length / rooms.length) * 100),
    todayRevenue:  reservations.filter(r => r.status === 'check-in').reduce((s, r) => s + r.total, 0),
  };

  return (
    <HotelContext.Provider value={{
      rooms, reservations, guests, tasks, notifications, stats,
      updateRoomStatus, addReservation, updateReservation, checkIn, checkOut,
      addTask, updateTask, addNotification,
    }}>
      {children}
    </HotelContext.Provider>
  );
};

// ── Custom hook ────────────────────────────────────────────────────
export const useHotel = () => {
  const ctx = useContext(HotelContext);
  if (!ctx) throw new Error('useHotel must be used within HotelProvider');
  return ctx;
};

export default HotelContext;
