import React, { useState } from 'react';
import ParabolaCalculator from './components/ParabolaCalculator';

function App() {
    const [activeTab, setActiveTab] = useState('parabola');

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-yellow-400">
                            <img src="/cricket-logo.png" alt="Cricket Logo" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ParabolaCal
                        </h1>
                    </div>
                    <div className="text-sm text-slate-500 hidden sm:block">
                        Parabola Method Calculator
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
                {/* Tabs */}
                {/* Tab Content */}
                <div className="transition-all duration-300 ease-in-out">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ParabolaCalculator />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;