import React, { useState } from 'react';
import { ScriptConfig, GameClass } from '../types';
import { DEFAULT_SCRIPT_CONFIG, GUILD_SELL_OPTIONS, OTHER_SELL_OPTIONS } from '../constants';
import { Save, Wand2, Sparkles, ScrollText, UserPlus, Coins, Briefcase } from 'lucide-react';
import { generateConfigAdvice } from '../services/geminiService';

const ConfigPage: React.FC = () => {
  const [config, setConfig] = useState<ScriptConfig>(DEFAULT_SCRIPT_CONFIG);
  const [aiAdvice, setAiAdvice] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(false);

  const updateConfig = (key: keyof ScriptConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSmartOptimize = async () => {
      setLoadingAi(true);
      const advice = await generateConfigAdvice(JSON.stringify(config));
      setAiAdvice(advice);
      setLoadingAi(false);
  };

  return (
    <div className="flex h-full gap-6">
        {/* Main Config Form */}
        <div className="flex-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden flex flex-col">
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-brand-500/20 p-2 rounded">
                        <ScrollText className="w-5 h-5 text-brand-500" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">金号脚本配置</h2>
                        <p className="text-xs text-gray-400">当前编辑: Default_Farm.json</p>
                    </div>
                </div>
                <button 
                    onClick={handleSmartOptimize}
                    disabled={loadingAi}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-sm font-medium transition-all"
                >
                    {loadingAi ? <Sparkles className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                    AI 配置优化
                </button>
            </div>

            <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
                {/* Character Creation Section */}
                <section>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">基础设置</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-300 font-medium">无角色自动创建</label>
                            <select 
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2.5 text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
                                value={config.autoCreateClass}
                                onChange={(e) => updateConfig('autoCreateClass', e.target.value)}
                            >
                                {Object.values(GameClass).map(cls => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500">检测到账号下无角色时，将自动创建此职业。</p>
                        </div>
                    </div>
                </section>

                {/* Selling Strategy */}
                <section>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-800 pb-2 flex items-center gap-2">
                        <Coins className="w-4 h-4" /> 摆摊策略
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-300 font-medium">帮会技能物品价格浮动</label>
                            <select 
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2.5 text-white focus:border-brand-500 focus:outline-none"
                                value={config.guildSkillSell}
                                onChange={(e) => updateConfig('guildSkillSell', parseInt(e.target.value))}
                            >
                                {GUILD_SELL_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt > 0 ? `+${opt}%` : `${opt}%`}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-300 font-medium">其他物品价格浮动</label>
                            <select 
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2.5 text-white focus:border-brand-500 focus:outline-none"
                                value={config.otherItemSell}
                                onChange={(e) => updateConfig('otherItemSell', parseInt(e.target.value))}
                            >
                                {OTHER_SELL_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt}%</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Tasks & Behavior */}
                <section>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-800 pb-2 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" /> 任务与行为
                    </h3>
                    <div className="space-y-4">
                        <label className="flex items-center gap-3 p-3 bg-gray-800/50 rounded border border-gray-700/50 cursor-pointer hover:bg-gray-800 transition-colors">
                            <input 
                                type="checkbox" 
                                className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-brand-600 focus:ring-0"
                                checked={config.doTasks1_28}
                                onChange={(e) => updateConfig('doTasks1_28', e.target.checked)}
                            />
                            <div>
                                <span className="text-sm text-gray-200 font-medium block">默认执行 1-28 主线任务</span>
                                <span className="text-xs text-gray-500">新手阶段自动跑主线直到28级卡级。</span>
                            </div>
                        </label>
                        
                        <label className="flex items-center gap-3 p-3 bg-gray-800/50 rounded border border-gray-700/50 cursor-pointer hover:bg-gray-800 transition-colors">
                            <input 
                                type="checkbox" 
                                className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-brand-600 focus:ring-0"
                                checked={config.doCookingAlchemy}
                                onChange={(e) => updateConfig('doCookingAlchemy', e.target.checked)}
                            />
                             <div>
                                <span className="text-sm text-gray-200 font-medium block">执行烹饪或炼药</span>
                                <span className="text-xs text-gray-500">活力自动消耗用于生产。</span>
                            </div>
                        </label>
                    </div>
                </section>

                {/* Social */}
                <section>
                     <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-800 pb-2 flex items-center gap-2">
                        <UserPlus className="w-4 h-4" /> 社交互动
                    </h3>
                    <div className="bg-gray-800/50 rounded border border-gray-700/50 p-4">
                        <label className="flex items-center gap-2 mb-3 cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-brand-600 focus:ring-0"
                                checked={config.addFriend}
                                onChange={(e) => updateConfig('addFriend', e.target.checked)}
                            />
                            <span className="text-sm text-gray-200 font-medium">自动添加好友</span>
                        </label>
                        <div className={`transition-opacity duration-200 ${config.addFriend ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                            <input 
                                type="text" 
                                placeholder="输入好友名称，多个名字用 | 隔开 (例如: 龙傲天|叶良辰)"
                                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm text-white focus:border-brand-500 focus:outline-none"
                                value={config.addFriendNames}
                                onChange={(e) => updateConfig('addFriendNames', e.target.value)}
                            />
                        </div>
                    </div>
                </section>
            </div>
            
            {/* Footer */}
            <div className="bg-gray-800 p-4 border-t border-gray-700 flex justify-end gap-3">
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors">重置默认</button>
                <button className="px-6 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded text-sm font-medium flex items-center gap-2 shadow-lg shadow-brand-900/20 transition-all transform hover:scale-105">
                    <Save className="w-4 h-4" /> 保存配置
                </button>
            </div>
        </div>

        {/* AI Sidebar (Conditional) */}
        {aiAdvice && (
            <div className="w-80 bg-gray-800 border-l border-gray-700 p-6 shadow-2xl animate-in slide-in-from-right duration-300">
                <h3 className="flex items-center gap-2 font-bold text-white mb-4">
                    <Sparkles className="w-5 h-5 text-brand-400" /> AI 建议
                </h3>
                <div className="prose prose-invert prose-sm text-gray-300">
                    <p>{aiAdvice}</p>
                </div>
                <button onClick={() => setAiAdvice("")} className="mt-4 text-xs text-gray-500 hover:text-white underline">关闭建议</button>
            </div>
        )}
    </div>
  );
};

export default ConfigPage;
