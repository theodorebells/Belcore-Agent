
import React from 'react';
import { AppSection, User } from '../types';

interface HeaderProps {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate, user, onLogout }) => {
  const getNavItems = () => {
    const items = [];
    
    // 1. HOME
    items.push({ id: AppSection.HOME, label: 'Home' });
    
    // 2. AUDIT
    items.push({ id: AppSection.READINESS, label: user ? 'New Audit' : 'Audit' });

    // 3. AGENTS (Newly Added per request)
    items.push({ id: AppSection.AGENTS, label: 'Agents' });
    
    // 4. LOGIN / DASHBOARD / ADMIN
    if (!user) {
      items.push({ id: AppSection.LOGIN, label: 'Login' });
    } else {
      if (user.role === 'ADMIN') {
        items.push({ id: AppSection.ADMIN, label: 'Admin Hub' });
      }
      if (user.role === 'CLIENT' || user.role === 'ADMIN' || user.role === 'STAFF') {
        const dashboardLabel = user.role === 'CLIENT' ? 'My Business' : (user.role === 'STAFF' ? 'Sales Ops' : 'Dashboard');
        items.push({ id: AppSection.DASHBOARD, label: dashboardLabel });
      }
    }
    
    // 5. 2028 (Roadmap)
    items.push({ id: AppSection.ROADMAP, label: '2028' });

    return items;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-2xl border-b fixed top-0 left-0 right-0 z-[1000] shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-center py-2 sm:py-3 gap-2 sm:gap-4">
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group self-center sm:self-auto py-1 sm:py-0" 
            onClick={() => onNavigate(AppSection.HOME)}
          >
            <div className="bg-gray-900 text-white font-black w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg sm:rounded-xl transition-all group-hover:bg-emerald-600 shadow-lg">B</div>
            <div className="flex flex-col">
              <h1 className="text-[11px] sm:text-[15px] font-black tracking-tighter text-gray-900 leading-none">BELCORE <span className="text-emerald-600">SME</span></h1>
              <p className="text-[6px] sm:text-[8px] font-bold text-gray-400 uppercase tracking-[0.15em]">Automation Experts</p>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1.5 sm:pb-0 justify-center sm:justify-end px-1 sm:px-0">
            {getNavItems().map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-widest ${
                  activeSection === item.id
                    ? 'bg-gray-900 text-white shadow-lg scale-105'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            {user && (
              <button 
                onClick={onLogout}
                className="ml-1 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-black text-white bg-red-600 hover:bg-red-700 uppercase tracking-widest shadow-md transition-all active:scale-95 border border-red-500/20"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
