import React, { useState, useEffect } from 'react';
import { User, Lock, Calendar, Building2, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [rates, setRates] = useState({ usd: 32.167, eur: 34.525, usdChange: '+0,0140', eurChange: '+0,0164' });
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    year: '2026',
    branch: ''
  });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Using a public API for live rates (TRY based)
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await res.json();
        if (data && data.rates && data.rates.TRY) {
          const usdTry = data.rates.TRY;
          const eurTry = usdTry / data.rates.EUR; // Calculate EUR/TRY via cross rate
          
          setRates(prev => ({
            ...prev,
            usd: usdTry.toFixed(3).replace('.', ','),
            eur: eurTry.toFixed(3).replace('.', ',')
          }));
        }
      } catch (err) {
        console.error('Cant fetch rates:', err);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="login-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-main card"
      >
        <div className="login-header">
          <div className="logo-section">
            <Building2 size={48} className="logo-icon" />
            <h1>HOTEL ERP</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label><User size={18} /> Kullanıcı Adı</label>
            <input 
              type="text" 
              placeholder="Kullanıcı adınızı girin..." 
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>

          <div className="input-group">
            <label><Lock size={18} /> Şifre</label>
            <input 
              type="password" 
              placeholder="Şifre" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="input-group">
            <label><Calendar size={18} /> Çalışma Yılı</label>
            <select 
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
            >
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>

          <div className="input-group">
            <label><Building2 size={18} /> Şube/Otel Seçiniz</label>
            <select 
              value={formData.branch}
              onChange={(e) => setFormData({...formData, branch: e.target.value})}
              required
            >
              <option value="">Seçiniz...</option>
              <option value="grand-resort">Grand Resort Hotel</option>
              <option value="spa-city">City Spa & Wellness</option>
              <option value="beach-club">Beach Club Suites</option>
            </select>
          </div>

          <button type="submit" className="premium-button login-btn">
            Sisteme Giriş
          </button>
        </form>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="exchange-rates card"
      >
        <h3>Döviz Kurları</h3>
        <div className="rate-item">
          <div className="rate-info">
            <span className="currency">USD / TRY</span>
            <span className="value">{rates.usd}</span>
          </div>
          <span className="change up"><TrendingUp size={14} /> {rates.usdChange}</span>
        </div>
        <div className="divider"></div>
        <div className="rate-item">
          <div className="rate-info">
            <span className="currency">EUR / TRY</span>
            <span className="value">{rates.eur}</span>
          </div>
          <span className="change up"><TrendingUp size={14} /> {rates.eurChange}</span>
        </div>
      </motion.div>

      <footer className="login-footer">
        <div className="footer-left">
          <span>Grand-X ERP v2.0.26</span>
          <span className="status"><span className="status-dot"></span> Sunucu: Aktif</span>
          <span>Kullanıcı IP: 192.168.1.1</span>
        </div>
        <div className="footer-right">
          <span>v.8.4.2 Enterprise</span>
          <span className="uptime">System Online 100%</span>
          <span>09:42</span>
        </div>
      </footer>

      <style jsx>{`
        .login-container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          position: relative;
          padding: 20px;
        }

        .login-main {
          width: 100%;
          max-width: 480px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 30px;
          z-index: 10;
        }

        .login-header {
          text-align: center;
        }

        .logo-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          color: #7f8c8d;
        }

        .logo-section h1 {
          font-size: 24px;
          letter-spacing: 4px;
          color: #34495e;
          font-weight: 500;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #7f8c8d;
        }

        .login-btn {
          margin-top: 10px;
          height: 48px;
          font-size: 16px;
        }

        .exchange-rates {
          width: 240px;
          padding: 20px;
          align-self: flex-start;
          margin-top: 100px;
        }

        .exchange-rates h3 {
          font-size: 14px;
          color: #7f8c8d;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .rate-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .rate-info {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .currency {
          font-size: 14px;
          color: #34495e;
        }

        .value {
          font-size: 20px;
          font-weight: 700;
          color: #2c3e50;
        }

        .change {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .change.up { color: #27ae60; }
        .change.down { color: #e74c3c; }

        .divider {
          height: 1px;
          background: var(--border-color);
          margin: 15px 0;
        }

        .login-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 15px 30px;
          display: flex;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(5px);
          font-size: 13px;
          color: #95a5a6;
          border-top: 1px solid var(--border-color);
        }

        .footer-left, .footer-right {
          display: flex;
          gap: 25px;
          align-items: center;
        }

        .status {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #2ecc71;
          border-radius: 50%;
        }

        .uptime {
          color: #27ae60;
          font-weight: 500;
        }

        @media (max-width: 800px) {
          .login-container {
            flex-direction: column;
            padding-top: 60px;
          }
          .exchange-rates {
            width: 100%;
            max-width: 480px;
            margin-top: 0;
          }
          .login-footer {
            flex-direction: column;
            gap: 10px;
            height: auto;
            text-align: center;
          }
          .footer-left, .footer-right {
            justify-content: center;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
