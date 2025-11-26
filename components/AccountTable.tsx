import React from 'react';
import { Account } from '../types';
import { Check, AlertCircle, Play, Pause, Loader2 } from 'lucide-react';

interface AccountTableProps {
  accounts: Account[];
  onToggleSelect: (id: number) => void;
}

const AccountTable: React.FC<AccountTableProps> = ({ accounts, onToggleSelect }) => {
  return (
    <div className="flex-1 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden flex flex-col shadow-xl">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-300">账号监控列表 ({accounts.length})</span>
      </div>
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-800/50 sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              <th className="p-3 text-xs font-medium text-gray-400 border-b border-gray-700 w-12 text-center">#</th>
              <th className="p-3 text-xs font-medium text-gray-400 border-b border-gray-700 w-12 text-center">选</th>
              <th className="p-3 text-xs font-medium text-gray-400 border-b border-gray-700">角色名</th>
              <th className="p-3 text-xs font-medium text-gray-400 border-b border-gray-700">门派</th>
              <th className="p-3 text-xs font-medium text-gray-400 border-b border-gray-700">等级</th>
              <th className="p-3 text-xs font-medium text-gray-400 border-b border-gray-700">金币</th>
              <th className="p-3 text-xs font-medium text-gray-400 border-b border-gray-700">状态</th>
              <th className="p-3 text-xs font-medium text-gray-400 border-b border-gray-700">执行配置</th>
              <th className="p-3 text-xs font-medium text-gray-400 border-b border-gray-700 text-center">预购</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {accounts.map((acc, index) => (
              <tr 
                key={acc.id} 
                className={`hover:bg-gray-800/40 transition-colors cursor-pointer ${acc.selected ? 'bg-brand-900/10' : ''}`}
                onClick={() => onToggleSelect(acc.id)}
              >
                <td className="p-3 text-sm text-gray-500 text-center">{index + 1}</td>
                <td className="p-3 text-center">
                  <input 
                    type="checkbox" 
                    checked={acc.selected} 
                    onChange={() => onToggleSelect(acc.id)}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-brand-600 focus:ring-brand-500 focus:ring-offset-gray-900"
                  />
                </td>
                <td className="p-3 text-sm font-medium text-white">{acc.roleName}</td>
                <td className="p-3 text-sm text-gray-300">{acc.className}</td>
                <td className="p-3 text-sm text-gray-300">Lv.{acc.level}</td>
                <td className="p-3 text-sm text-yellow-500 font-mono">{acc.gold.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    acc.status === 'Running' ? 'bg-green-900/30 text-green-400 border-green-800' :
                    acc.status === 'Error' ? 'bg-red-900/30 text-red-400 border-red-800' :
                    acc.status === 'Paused' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800' :
                    'bg-gray-700 text-gray-400 border-gray-600'
                  }`}>
                    {acc.status === 'Running' && <Loader2 className="w-3 h-3 animate-spin" />}
                    {acc.status === 'Error' && <AlertCircle className="w-3 h-3" />}
                    {acc.status === 'Paused' && <Pause className="w-3 h-3" />}
                    {acc.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-400">{acc.configName}</td>
                <td className="p-3 text-center">
                  {acc.preOrder ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <span className="text-gray-700">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountTable;
