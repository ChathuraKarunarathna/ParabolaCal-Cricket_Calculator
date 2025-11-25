import React, { useState } from 'react';
import ParabolaCalculator from './components/ParabolaCalculator';
import { Activity } from 'lucide-react';

function App() {
    const [activeTab, setActiveTab] = useState('parabola');

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <Activity size={20} />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            CricketMetrics
                        </h1>
                    </div>
                    <div className="text-sm text-slate-500 hidden sm:block">
                        Parabola Method Calculator
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm inline-flex">
                        <button
                            onClick={() => setActiveTab('parabola')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'parabola'
                                    ? 'bg-purple-50 text-purple-700 shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <Activity size={16} />
                            Parabola Method
                        </button>
                    </div>
                </div>

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