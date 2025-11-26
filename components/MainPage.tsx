import React, { useState } from 'react';
import { Account, GlobalSettings } from '../types';
import { MOCK_ACCOUNTS, DEFAULT_GLOBAL_SETTINGS } from '../constants';
import AccountTable from './AccountTable';
import { 
  Play, Square, Pause, Save, RotateCcw, 
  Trash2, ShoppingCart, List, Terminal, 
  Cpu, Activity, Box, Monitor, Zap,
  Settings, FileText
} from 'lucide-react';

const MainPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS);
  const [settings, setSettings] = useState<GlobalSettings>(DEFAULT_GLOBAL_SETTINGS);

  const toggleAccountSelection = (id: number) => {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, selected: !a.selected } : a));
  };

  const handleSettingChange = (key: keyof GlobalSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Mock function for Gemini interaction placeholder in UI
  const handleAIAnalyze = () => {
      alert("AI Assistant: Collecting logs for analysis...");
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Top Status Bar */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-center gap-4">
            <div className="p-3 bg-brand-500/10 rounded-full">
                <Activity className="w-6 h-6 text-brand-500" />
            </div>
            <div>
                <p className="text-xs text-gray-400">总运行账号</p>
                <p className="text-xl font-bold text-white">12 <span className="text-xs font-normal text-gray-500">/ 20</span></p>
            </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-center gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-full">
                <Box className="w-6 h-6 text-yellow-500" />
            </div>
             <div>
                <p className="text-xs text-gray-400">今日金币收益</p>
                <p className="text-xl font-bold text-white">4,285,000</p>
            </div>
        </div>
         <div className="col-span-2 bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-center justify-between">
            <div className="flex gap-6 items-center">
                 <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-300">游戏优化</span>
                    <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="toggle" 
                            checked={settings.optimization1}
                            onChange={(e) => handleSettingChange('optimization1', e.target.checked)}
                        />
                        <span className={`px-2 py-1 rounded ${settings.optimization1 ? 'bg-green-900 text-green-400' : 'bg-gray-700'}`}>CPU优化</span>
                    </label>
                     <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="toggle" 
                            checked={settings.optimization2}
                            onChange={(e) => handleSettingChange('optimization2', e.target.checked)}
                        />
                        <span className={`px-2 py-1 rounded ${settings.optimization2 ? 'bg-green-900 text-green-400' : 'bg-gray-700'}`}>渲染优化</span>
                    </label>
                </div>
            </div>
            <button 
                className="flex items-center gap-2 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded text-xs font-medium transition-colors"
                onClick={handleAIAnalyze}
            >
                <Zap className="w-3 h-3" /> AI 智能诊断
            </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 min-h-0">
        
        {/* Left: Account Table */}
        <AccountTable accounts={accounts} onToggleSelect={toggleAccountSelection} />

        {/* Right: Control Panel */}
        <div className="w-80 flex flex-col gap-4 overflow-y-auto pr-1">
            
            {/* Function Switches / Settings */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Settings className="w-3 h-3" /> 全局设置
                </h3>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                        { k: 'autoSwitch', l: '自动换号 (重连)' },
                        { k: 'scheduledStart', l: '定时启动' },
                        { k: 'loopAccounts', l: '账号循环' },
                        { k: 'loginNoSelect', l: '上号不选角色' },
                        { k: 'loginNoExec', l: '登录不执行' },
                        { k: 'lowSpecMode', l: '洋垃圾模式' },
                    ].map((opt) => (
                        <label key={opt.k} className="flex items-center gap-2 cursor-pointer hover:bg-gray-700/50 p-1 rounded">
                            <input 
                                type="checkbox"
                                checked={settings[opt.k as keyof GlobalSettings] as boolean}
                                onChange={(e) => handleSettingChange(opt.k as keyof GlobalSettings, e.target.checked)} 
                                className="rounded border-gray-600 bg-gray-700 text-brand-600 focus:ring-0 w-3.5 h-3.5"
                            />
                            <span className="text-gray-300">{opt.l}</span>
                        </label>
                    ))}
                </div>

                <div className="pt-2 border-t border-gray-700">
                    <label className="text-xs text-gray-400 block mb-1">多开数量限制</label>
                    <div className="relative">
                        <Monitor className="absolute left-2 top-2 w-4 h-4 text-gray-500" />
                        <select 
                            className="w-full bg-gray-900 border border-gray-600 text-gray-200 text-sm rounded pl-8 pr-2 py-1.5 focus:border-brand-500 focus:outline-none appearance-none"
                            value={settings.instanceCount}
                            onChange={(e) => handleSettingChange('instanceCount', parseInt(e.target.value))}
                        >
                            {Array.from({length: 20}).map((_, i) => (
                                <option key={i} value={i+1}>{i+1} 窗口</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="pt-2 border-t border-gray-700">
                     <label className="text-xs text-gray-400 block mb-1">当前配置方案</label>
                     <div className="flex gap-2">
                        <select 
                            className="flex-1 bg-gray-900 border border-gray-600 text-gray-200 text-xs rounded px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                            value={settings.activeConfigProfile}
                            onChange={(e) => handleSettingChange('activeConfigProfile', e.target.value)}
                        >
                            <option value="Daily_Routine_v1">日常_全任务_v1</option>
                            <option value="Gold_Farm_Pro">极限打金_Pro</option>
                            <option value="Weekend_Event">周末活动专用</option>
                        </select>
                        <button className="bg-gray-700 hover:bg-gray-600 p-1.5 rounded border border-gray-600 text-gray-300" title="查看配置">
                            <List className="w-4 h-4" />
                        </button>
                     </div>
                </div>
            </div>

            {/* Actions Grid */}
             <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-3">
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Terminal className="w-3 h-3" /> 操作指令
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    <button className="btn-secondary"><RotateCcw className="w-3 h-3"/> 组队初始化</button>
                    <button className="btn-secondary"><Trash2 className="w-3 h-3"/> 清除角色日志</button>
                    <button className="btn-secondary"><Cpu className="w-3 h-3"/> 获取游戏</button>
                    <button className="btn-secondary"><Save className="w-3 h-3"/> 选中保存配置</button>
                    <button className="btn-primary"><Play className="w-3 h-3"/> 选中名字启动</button>
                    <button className="btn-secondary"><ShoppingCart className="w-3 h-3"/> 选中名字预购</button>
                    <button className="btn-secondary col-span-1"><FileText className="w-3 h-3"/> 打开日志</button>
                    <button className="btn-secondary col-span-1"><Trash2 className="w-3 h-3"/> 清空日志</button>
                </div>
             </div>

             {/* Execution Control */}
             <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-3 flex-1 flex flex-col justify-end">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    运行控制
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    <button className="bg-yellow-900/40 border border-yellow-800 hover:bg-yellow-900/60 text-yellow-500 text-xs py-2 px-3 rounded flex items-center justify-center gap-2 font-medium">
                        <Pause className="w-3 h-3" /> 选中暂停
                    </button>
                    <button className="bg-green-900/40 border border-green-800 hover:bg-green-900/60 text-green-500 text-xs py-2 px-3 rounded flex items-center justify-center gap-2 font-medium">
                        <Play className="w-3 h-3" /> 选中继续
                    </button>
                    <button className="bg-red-900/40 border border-red-800 hover:bg-red-900/60 text-red-500 text-xs py-2 px-3 rounded flex items-center justify-center gap-2 font-medium">
                        <Square className="w-3 h-3 fill-current" /> 停止选中
                    </button>
                     <button className="bg-red-600 border border-red-500 hover:bg-red-500 text-white text-xs py-2 px-3 rounded flex items-center justify-center gap-2 font-bold shadow-lg shadow-red-900/20">
                        <Square className="w-3 h-3 fill-current" /> 停止所有
                    </button>
                </div>
             </div>
        </div>
      </div>
      <style>{`
        .btn-secondary {
            @apply flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs py-2 rounded border border-gray-600 transition-colors;
        }
        .btn-primary {
            @apply flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white text-xs py-2 rounded border border-brand-500 transition-colors shadow-lg shadow-brand-900/20 font-medium;
        }
      `}</style>
    </div>
  );
};

export default MainPage;