import React from 'react';
import { View } from '../types';
import { LayoutDashboard, Settings, FileText, Bot, ShieldAlert } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'MAIN', label: '主控台', icon: LayoutDashboard },
    { id: 'CONFIG', label: '脚本配置', icon: Settings },
    { id: 'LOGS', label: '运行日志', icon: FileText },
  ];

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-screen select-none">
      <div className="p-6 flex items-center gap-3 border-b border-gray-800">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
          <Bot className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">逍遥助手 Pro</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentView === item.id
                ? 'bg-brand-600/20 text-brand-500 border border-brand-600/50 shadow-lg shadow-brand-900/20'
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center gap-2 text-yellow-500 mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">安全状态</span>
          </div>
          <p className="text-xs text-gray-400">驱动保护: <span className="text-green-400">已加载</span></p>
          <p className="text-xs text-gray-400">防检测: <span className="text-green-400">运行中</span></p>
        </div>
        <div className="mt-4 text-center text-xs text-gray-600">
          v2.5.0 Build 20231027
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
