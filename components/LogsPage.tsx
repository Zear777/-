import React, { useState } from 'react';
import { analyzeGameLog } from '../services/geminiService';
import { FileSearch, Eraser, Loader2 } from 'lucide-react';

const MOCK_LOGS = `[10:23:45] [System] Initializing game client...
[10:23:46] [Auth] Login successful. Role: User_123
[10:23:50] [Script] Started "Daily_Routine_v1"
[10:24:15] [Task] Accepted task: School Patrol (1/10)
[10:25:30] [Combat] Battle started. Enemy count: 3
[10:26:05] [Combat] Battle ended. Victory. Exp +1200
[10:28:00] [Error] Connection unstable. Ping: 450ms
[10:28:05] [System] Reconnecting...`;

const LogsPage: React.FC = () => {
    const [logs, setLogs] = useState(MOCK_LOGS);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);

    const handleAnalyze = async () => {
        setAnalyzing(true);
        const result = await analyzeGameLog(logs);
        setAnalysis(result);
        setAnalyzing(false);
    };

    return (
        <div className="flex flex-col h-full bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-800 p-3 border-b border-gray-700 flex justify-between items-center">
                <span className="font-mono text-sm text-gray-300">Console Output</span>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setLogs("")}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-white"
                    >
                        <Eraser className="w-3 h-3" /> 清空
                    </button>
                    <button 
                        onClick={handleAnalyze}
                        disabled={analyzing}
                        className="flex items-center gap-1 px-3 py-1 bg-brand-600 hover:bg-brand-500 rounded text-xs text-white"
                    >
                        {analyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : <FileSearch className="w-3 h-3" />}
                        AI 智能分析
                    </button>
                </div>
            </div>
            <div className="flex-1 p-4 font-mono text-xs text-gray-400 overflow-auto bg-black/30">
                <pre className="whitespace-pre-wrap">{logs}</pre>
            </div>
            
            {analysis && (
                <div className="h-48 border-t border-gray-700 bg-gray-800/80 p-4 overflow-auto">
                    <h4 className="text-brand-400 font-bold mb-2 text-sm">AI Analysis Report:</h4>
                    <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">{analysis}</p>
                </div>
            )}
        </div>
    );
};

export default LogsPage;
