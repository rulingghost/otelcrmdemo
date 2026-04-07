import React, { useState } from 'react';
import { useHotel } from '../../../context/HotelContext';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { SmilePlus, Frown, Meh, ThumbsUp, Star, MessageSquare } from 'lucide-react';

const fakeReviews = [
  { id: 1, guest: 'Ahmet Y.', rating: 5, dept: 'Resepsiyon', text: 'Check-in çok hızlı ve güler yüzlüydü. Harika bir karşılama!', date: '2 saat önce', mood: '😊' },
  { id: 2, guest: 'Hans M.', rating: 4, dept: 'Kat Hizmetleri', text: 'Oda temiz ama minibar kontrolü geç yapıldı.', date: '5 saat önce', mood: '😐' },
  { id: 3, guest: 'Olga P.', rating: 5, dept: 'SPA', text: 'Masaj hizmeti mükemmeldi, Elena çok profesyonel.', date: '1 gün önce', mood: '😍' },
  { id: 4, guest: 'John S.', rating: 3, dept: 'Restoran', text: 'Yemekler iyi ama servis biraz yavaş kaldı.', date: '1 gün önce', mood: '😐' },
  { id: 5, guest: 'Sheikh A.', rating: 5, dept: 'Resepsiyon', text: 'VVIP karşılama beklentilerin üzerindeydi. Tebrikler!', date: '2 gün önce', mood: '😊' },
  { id: 6, guest: 'Pierre D.', rating: 4, dept: 'Kat Hizmetleri', text: 'Balayı süslememiz çok güzeldi, teşekkürler.', date: '2 gün önce', mood: '😊' },
  { id: 7, guest: 'Fatma D.', rating: 2, dept: 'Teknik', text: 'Odada wifi çok yavaştı, sürekli koptu.', date: '3 gün önce', mood: '😡' },
  { id: 8, guest: 'Carlos R.', rating: 4, dept: 'Restoran', text: 'Kahvaltı çeşitleri güzel ama kalabalık.', date: '3 gün önce', mood: '😐' },
];

const AISentiment = () => {
  const { guests, staff } = useHotel();
  const [filter, setFilter] = useState('all');

  const departments = [
    { dept: 'Resepsiyon', score: 92, reviews: 48, icon: '🏨' },
    { dept: 'Kat Hizmetleri', score: 85, reviews: 65, icon: '🛏️' },
    { dept: 'Restoran', score: 78, reviews: 112, icon: '🍽️' },
    { dept: 'SPA', score: 95, reviews: 28, icon: '💆' },
    { dept: 'Teknik', score: 72, reviews: 15, icon: '🔧' },
    { dept: 'Güvenlik', score: 88, reviews: 8, icon: '🛡️' },
  ];

  const radarData = departments.map(d => ({ subject: d.dept, score: d.score, fullMark: 100 }));
  const overallScore = Math.round(departments.reduce((s, d) => s + d.score, 0) / departments.length);

  const moodData = [
    { mood: '😊 Memnun', value: 58, color: '#10b981' },
    { mood: '😐 Nötr', value: 27, color: '#f59e0b' },
    { mood: '😡 Memnuniyetsiz', value: 15, color: '#ef4444' },
  ];

  const filtered = filter === 'all' ? fakeReviews : fakeReviews.filter(r => r.dept === filter);

  const getRatingColor = (r) => r >= 4 ? '#10b981' : r >= 3 ? '#f59e0b' : '#ef4444';

  return (
    <div className="ai-sentiment">
      <div className="sent-top">
        <motion.div className="overall-score" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="score-ring" style={{ background: `conic-gradient(#10b981 ${overallScore * 3.6}deg, #f1f5f9 0deg)` }}>
            <div className="score-inner">
              <strong>{overallScore}</strong>
              <span>/100</span>
            </div>
          </div>
          <h3>Genel Memnuniyet</h3>
          <p>{overallScore >= 85 ? '🌟 Mükemmel' : overallScore >= 70 ? '👍 İyi' : '⚠️ Geliştirilmeli'}</p>
        </motion.div>

        <div className="mood-breakdown">
          <h3><SmilePlus size={16}/> Duygu Dağılımı</h3>
          {moodData.map(m => (
            <div key={m.mood} className="mood-bar-row">
              <span className="mood-label">{m.mood}</span>
              <div className="mood-bar-bg">
                <motion.div className="mood-bar-fill" style={{ background: m.color }} initial={{ width: 0 }} animate={{ width: `${m.value}%` }}/>
              </div>
              <strong>%{m.value}</strong>
            </div>
          ))}
        </div>

        <div className="radar-card">
          <h3>Departman Performansı</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0"/>
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }}/>
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false}/>
              <Radar dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dept-cards">
        {departments.map((d, i) => (
          <motion.div key={d.dept} className="dept-card" onClick={() => setFilter(d.dept === filter ? 'all' : d.dept)} style={{ borderColor: d.dept === filter ? '#3b82f6' : '#e2e8f0' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <span className="dept-icon">{d.icon}</span>
            <strong>{d.dept}</strong>
            <div className="dept-score" style={{ color: getRatingColor(d.score / 20) }}>{d.score}</div>
            <span className="dept-reviews">{d.reviews} yorum</span>
          </motion.div>
        ))}
      </div>

      <div className="reviews-section">
        <div className="rev-head">
          <h3><MessageSquare size={16}/> Son Yorumlar {filter !== 'all' && <span className="filter-tag">{filter} <button onClick={() => setFilter('all')}>✕</button></span>}</h3>
        </div>
        <div className="reviews-list">
          {filtered.map((r, i) => (
            <motion.div key={r.id} className="review-card" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
              <div className="rev-avatar">{r.mood}</div>
              <div className="rev-body">
                <div className="rev-meta"><strong>{r.guest}</strong><span className="rev-dept">{r.dept}</span><span className="rev-date">{r.date}</span></div>
                <p>{r.text}</p>
                <div className="rev-stars">{Array.from({ length: 5 }, (_, j) => <Star key={j} size={12} fill={j < r.rating ? '#f59e0b' : '#e2e8f0'} color={j < r.rating ? '#f59e0b' : '#e2e8f0'}/>)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AISentiment;
