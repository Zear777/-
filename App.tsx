import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainPage from './components/MainPage';
import ConfigPage from './components/ConfigPage';
import LogsPage from './components/LogsPage';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('MAIN');

  return (
    <div className="flex h-screen w-screen bg-gray-950 text-gray-100 overflow-hidden font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 p-4 h-screen overflow-hidden">
        {currentView === 'MAIN' && <MainPage />}
        {currentView === 'CONFIG' && <ConfigPage />}
        {currentView === 'LOGS' && <LogsPage />}
      </main>
    </div>
  );
};

export default App;
