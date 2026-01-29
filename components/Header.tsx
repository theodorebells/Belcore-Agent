
import React from 'react';
import { AppSection } from '../types';

interface HeaderProps {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: AppSection.HOME, label: 'Home' },
    { id: AppSection.READINESS, label: 'Audit' },
    { id: AppSection.AGENTS, label: 'Agents' },
    { id: AppSection.SERVICES, label: 'Pricing' },
    { id: AppSection.DASHBOARD, label: 'SME View' },
    { id: AppSection.ADMIN, label: 'Admin' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b sticky top-0 z-[100] shadow-sm">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-center py-2 sm:py-4 gap-2 sm:gap-4">
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group self-center sm:self-auto py-1 sm:py-0" 
            onClick={() => onNavigate(AppSection.HOME)}
          >
            <div className="bg-gray-900 text-white font-black w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl transition-all group-hover:bg-emerald-600 shadow-lg shadow-emerald-500/10">B</div>
            <div className="flex flex-col">
              <h1 className="text-xs sm:text-lg font-black tracking-tighter text-gray-900 leading-none">BELCORE <span className="text-emerald-600">SME</span></h1>
              <p className="text-[6px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-[0.15em]">Automation Experts</p>
            </div>
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto no-scrollbar pb-2 sm:pb-0 justify-center sm:justify-end">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[9px] sm:text-[11px] font-black transition-all whitespace-nowrap uppercase tracking-widest ${
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
