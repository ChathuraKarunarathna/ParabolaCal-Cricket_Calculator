import React, { useState, useEffect } from 'react';
import ParabolaCalculator from './components/ParabolaCalculator';
import { Moon, Sun } from 'lucide-react';

function App() {
    const [activeTab, setActiveTab] = useState('parabola');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check for saved dark mode preference or system preference
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            setIsDarkMode(savedMode === 'true');
        } else {
            setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    useEffect(() => {
        // Apply dark mode class to document
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Save preference
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 pb-20 transition-colors duration-300">
            {/* Header */}
            <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 transition-colors duration-300">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-yellow-400">
                            <img src="/cricket-logo.png" alt="Cricket Logo" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ParabolaCal
                        </h1>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
                        Parabola Method Calculator
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
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