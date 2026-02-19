
import React, { useState } from 'react';
import { User, Role } from '../types';
import { storage } from '../services/db';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const db = storage.get();
    const user = db.users.find(u => u.email === email);

    if (user && password === (email.split('@')[0] + '123')) {
      storage.logAction(user.id, user.name, 'Login Success', `User ${user.email} logged into the system`, 'auth');
      onLogin(user);
    } else {
      setError('Invalid credentials. Use admin@belcore.com / admin123');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-in fade-in duration-1000">
      <div className="w-full max-w-md bg-gray-900 rounded-[40px] p-10 sm:p-12 shadow-3xl relative overflow-hidden scanline">
        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-2">
             <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-black text-2xl mx-auto shadow-lg shadow-emerald-500/20 mb-6">B</div>
             <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Uplink Access</h2>
             <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">SME Automation Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Identity (Email)</label>
              <input 
                type="email" 
                required
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-emerald-500 transition-all font-bold"
                placeholder="admin@belcore.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Security Key (Password)</label>
              <input 
                type="password" 
                required
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-emerald-500 transition-all font-bold"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-400 text-[10px] font-black uppercase text-center">{error}</p>}

            <button type="submit" className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/10">
              Synchronize Session →
            </button>
          </form>

          <div className="pt-8 border-t border-white/5 grid grid-cols-1 gap-2">
            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest text-center mb-2">Demo Credentials</p>
            <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase px-4">
              <span>Admin: admin@belcore.com</span>
              <span>admin123</span>
            </div>
            <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase px-4">
              <span>Client: client@belcore.com</span>
              <span>client123</span>
            </div>
            <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase px-4">
              <span>Staff: staff@belcore.com</span>
              <span>staff123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
