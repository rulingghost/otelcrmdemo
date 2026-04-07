import React, { useState, useRef, useEffect } from 'react';
import { useHotel } from '../../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';

const QUICK_QUESTIONS = [
  '📊 Bugün doluluk oranı kaç?',
  '💰 Bugünkü gelir ne kadar?',
  '🏨 Boş oda var mı?',
  '⚠️ Kritik stok durumu?',
  '👤 VIP misafirler kimler?',
  '📋 Bekleyen görevler?',
  '🧹 Oda 101 temizlenecek',
  '🔧 Oda 205 teknik arıza var',
  '💳 Açık bakiyeler?',
];

const AIChatbot = () => {
  const { rooms, reservations, guests, tasks, inventory, cashTransactions, staff, TODAY, addTask, addNotification } = useHotel();
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Merhaba! 🏨 Ben otel yapay zeka asistanınızım. Size operasyonel konularda bilgi verebilir, sizin için görev ataması yapabilirim. Ne sormak istersiniz veya hangi işlemi yapmamı istersiniz?' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const processResponseAndActions = (q) => {
    const query = q.toLowerCase();
    
    // ACTION DETECTION
    const roomMatch = query.match(/oda (\d{3})/i);
    const roomNo = roomMatch ? roomMatch[1] : null;

    if (roomNo && (query.includes('temizle') || query.includes('temizlik') || query.includes('kirli'))) {
      addTask({ type: 'housekeeping', room: roomNo, desc: `AI Talebi: Anlık Temizlik (${roomNo})`, priority: 'high', assignee: '', status: 'bekliyor' });
      addNotification({ type: 'success', msg: `Housekeeping Görevi Oluşturuldu: Oda ${roomNo}` });
      return `✅ **Görev Oluşturuldu!** Oda ${roomNo} için öncelikli temizlik talebi Housekeeping listesine eklendi. Başka bir işlem var mı?`;
    }

    if (roomNo && (query.includes('arıza') || query.includes('teknik') || query.includes('bozuk'))) {
      addTask({ type: 'technical', room: roomNo, desc: `AI Talebi: Teknik Arıza Kontrolü (${roomNo})`, priority: 'high', assignee: '', status: 'bekliyor' });
      addNotification({ type: 'warn', msg: `Teknik Görev Oluşturuldu: Oda ${roomNo}` });
      return `✅ **Teknik Servis Çağrıldı!** Oda ${roomNo} için teknik müdahale talebi oluşturuldu ve öncelik atandı.`;
    }

    // INFORMATION RETRIEVAL
    const occupied = rooms.filter(r => r.status === 'dolu').length;
    const vacant = rooms.filter(r => r.status === 'boş').length;
    const occRate = Math.round((occupied / rooms.length) * 100);
    const todayRev = cashTransactions.filter(t => t.type === 'gelir' && t.date === TODAY).reduce((s, t) => s + t.amount, 0);
    const todayExp = cashTransactions.filter(t => t.type === 'gider' && t.date === TODAY).reduce((s, t) => s + t.amount, 0);
    const lowStock = inventory.filter(i => i.stock < i.minStock);
    const vips = guests.filter(g => g.loyalty === 'Platinum' || g.loyalty === 'Gold');
    const pending = tasks.filter(t => t.status !== 'bitti');
    const techTasks = tasks.filter(t => t.type === 'technical' && t.status !== 'bitti');
    const openBal = reservations.filter(r => r.status === 'check-in' && r.balance > 0);

    if (query.includes('doluluk')) return `📊 **Anlık Doluluk:** %${occRate}\n\n- Dolu: ${occupied} oda\n- Boş: ${vacant} oda\n- Arızalı: ${rooms.filter(r => r.status === 'arızalı').length} oda\n\n${occRate > 80 ? '✅ Doluluk yüksek! Fiyat optimizasyonu yapılabilir.' : '⚠️ Doluluk düşük, kampanya önerilir.'}`;
    if (query.includes('gelir') || query.includes('ciro')) return `💰 **Bugünkü Finansal Özet:**\n\n- Toplam Gelir: ₺${todayRev.toLocaleString()}\n- Toplam Gider: ₺${todayExp.toLocaleString()}\n- Net Kar: ₺${(todayRev - todayExp).toLocaleString()}\n- İşlem Sayısı: ${cashTransactions.filter(t => t.date === TODAY).length}\n\n📈 Kar marjı: %${Math.round(((todayRev - todayExp) / (todayRev || 1)) * 100)}`;
    if (query.includes('boş') || query.includes('müsait')) { const vacantRooms = rooms.filter(r => r.status === 'boş'); return `🏨 **Müsait Odalar (${vacantRooms.length}):**\n\n${vacantRooms.map(r => `- Oda ${r.id} (${r.type}) — ₺${r.rate.toLocaleString()}/gece ${r.clean === 'kirli' ? '⚠️ Temizlik gerekli' : '✅ Hazır'}`).join('\n')}\n\n${vacantRooms.filter(r => r.clean === 'temiz').length} oda hemen satışa hazır.`; }
    if (query.includes('stok') || query.includes('kritik')) { return lowStock.length > 0 ? `⚠️ **Kritik Stok (${lowStock.length} ürün):**\n\n${lowStock.map(i => `- **${i.name}**: ${i.stock} adet (min: ${i.minStock})`).join('\n')}\n\n🔔 Sipariş oluşturmamı ister misiniz? (Örn: "Stok sipariş ver" yazın)` : '✅ Tüm stok seviyeleri normal aralıkta.'; }
    
    if (query.includes('sipariş') && query.includes('stok')) {
      addNotification({ type: 'success', msg: `Kritik stok kalemleri için otomatik otel siparişi oluşturuldu!` });
      return `✅ **Sipariş Listesi İşlendi!** Kritik seviyede olan ${lowStock.length} ürün için satınalma departmanına otomatik talep listesi gönderilmiştir.`;
    }

    if (query.includes('vip') || query.includes('misafir')) return `👤 **VIP Misafirler (${vips.length}):**\n\n${vips.map(g => `- **${g.name}** (${g.loyalty}) — ${g.visits} ziyaret, ₺${g.totalSpent.toLocaleString()} toplam harcama`).join('\n')}`;
    if (query.includes('görev') || query.includes('bekleyen')) return `📋 **Bekleyen Görevler (${pending.length}):**\n\n${pending.slice(0, 6).map(t => `- [${t.priority === 'high' ? '🔴' : t.priority === 'normal' ? '🟡' : '🟢'}] Oda ${t.room || '-'}: ${t.desc} — ${t.assignee || 'Atanmamış'}`).join('\n')}\n\n🔴 Yüksek öncelikli: ${pending.filter(t => t.priority === 'high').length}`;
    if (query.includes('arıza') || query.includes('teknik')) return techTasks.length > 0 ? `🔧 **Aktif Teknik Arızalar (${techTasks.length}):**\n\n${techTasks.map(t => `- Oda ${t.room}: ${t.desc} — ${t.status === 'devam' ? '🟡 Devam Ediyor' : '🔴 Bekliyor'}`).join('\n')}` : '✅ Aktif teknik arıza bulunmuyor.';
    if (query.includes('bakiye') || query.includes('ödenmemiş')) return `💳 **Açık Bakiyeler (${openBal.length} res.):**\n\n${openBal.map(r => `- **${r.guest}** (Oda ${r.room}): ₺${r.balance.toLocaleString()}`).join('\n')}\n\nToplam: ₺${openBal.reduce((s, r) => s + r.balance, 0).toLocaleString()}`;
    if (query.includes('personel') || query.includes('staff')) return `👥 **Personel Durumu:**\n\n- Aktif: ${staff.filter(s => s.status === 'aktif').length}\n- İzinli: ${staff.filter(s => s.status === 'izinli').length}\n\n**Departman Dağılımı:**\n${[...new Set(staff.map(s => s.dept))].map(d => `- ${d}: ${staff.filter(s => s.dept === d).length} kişi`).join('\n')}`;
    
    return `🤔 Sorunuzu tam anlayamadım. Şunları yapabilirim:\n\n- Bilgi veririm (Doluluk, gelir, boş odalar, stok)\n- Görev oluştururum ("Oda 102 temizlenecek" veya "Oda 205 klima bozuk")\n- Sipariş otomatize edebilirim ("Kritik stok sipariş ver")`;
  };

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: processResponseAndActions(msg) }]);
      setTyping(false);
    }, 800 + Math.random() * 800);
  };

  return (
    <div className="ai-chat">
      <div className="chat-quick">
        <Sparkles size={14} color="#8b5cf6"/>
        <span>Akıllı Komutlar:</span>
        <div className="quick-pills">
          {QUICK_QUESTIONS.map(q => (
            <button key={q} className="quick-pill" onClick={() => sendMessage(q)}>{q}</button>
          ))}
        </div>
      </div>

      <div className="chat-messages">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div key={i} className={`chat-msg ${m.role}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="msg-avatar">{m.role === 'ai' ? <Bot size={16}/> : <User size={16}/>}</div>
              <div className="msg-bubble">
                {m.text.split('\n').map((line, j) => <p key={j}>{line.replace(/\*\*(.*?)\*\*/g, (_, t) => <strong>{t}</strong>)}</p>)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <motion.div className="chat-msg ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="msg-avatar"><Bot size={16}/></div>
            <div className="msg-bubble typing"><span/><span/><span/></div>
          </motion.div>
        )}
        <div ref={bottomRef}/>
      </div>

      <div className="chat-input-bar">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Bilgi alın veya komut verin (Örn: Oda 102 temizlensin)..." />
        <button className="chat-send" onClick={() => sendMessage()} disabled={!input.trim() || typing}><Send size={16}/></button>
        <button className="chat-reset" title="Sohbeti Sıfırla" onClick={() => setMessages([{ role: 'ai', text: 'Sohbet sıfırlandı. Size nasıl yardımcı olabilirim?' }])}><RotateCcw size={14}/></button>
      </div>
    </div>
  );
};

export default AIChatbot;
