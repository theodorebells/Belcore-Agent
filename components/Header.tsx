
import React from 'react';
import { AppSection } from '../types';

interface HeaderProps {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: AppSection.HOME, label: 'Overview' },
    { id: AppSection.READINESS, label: 'Audit' },
    { id: AppSection.AGENTS, label: 'Agents' },
    { id: AppSection.ERROR_PROOFING, label: 'Security' },
    { id: AppSection.SERVICES, label: 'Pricing' },
    { id: AppSection.DASHBOARD, label: 'SME View' },
    { id: AppSection.ADMIN, label: 'Admin' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate(AppSection.HOME)}>
            <div className="bg-gray-900 text-white font-black w-10 h-10 flex items-center justify-center rounded-xl transition-all group-hover:bg-emerald-600 shadow-lg shadow-emerald-500/20">B</div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-black tracking-tighter text-gray-900 leading-none">BELCORE <span className="text-emerald-600">SME</span></h1>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Business Automation Solutions</p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-lg text-[9px] sm:text-[10px] font-black transition-all ${
                  activeSection === item.id
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
