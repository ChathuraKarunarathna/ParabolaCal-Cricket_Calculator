import React from 'react';
import { useParabola } from '../hooks/useParabola';
import { TrendingUp, Calculator, Info, RotateCcw } from 'lucide-react';

const ParabolaCalculator = () => {
    const {
        team1Score, setTeam1Score,
        team1Overs, setTeam1Overs,
        team2Overs, setTeam2Overs,
        team2Balls, setTeam2Balls,
        target,
        norm1,
        norm2,
        reset
    } = useParabola();

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    <TrendingUp size={24} />
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-800">Parabola Method</h2>
                    <p className="text-sm text-slate-500">Target = (Norm2 / Norm1) × Score1</p>
                </div>
                <button
                    onClick={reset}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                    title="Reset to default values"
                >
                    <RotateCcw size={16} />
                    Reset
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Team 1 Inputs */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                        Team 1 (Batting 1st)
                    </h3>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Runs Scored</label>
                        <input
                            type="number"
                            placeholder="0"
                            value={team1Score || ''}
                            onChange={(e) => setTeam1Score(parseFloat(e.target.value) || 0)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Overs Allotted</label>
                        <select
                            value={team1Overs}
                            onChange={(e) => setTeam1Overs(parseInt(e.target.value))}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        >
                            {Array.from({ length: 31 }, (_, i) => i + 20).map(over => (
                                <option key={over} value={over}>{over} Overs</option>
                            ))}
                        </select>
                        <p className="text-xs text-slate-400 mt-1">Norm: {norm1}</p>
                    </div>
                </div>

                {/* Team 2 Inputs */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                        <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                        Team 2 (Batting 2nd)
                    </h3>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Overs to be Bowled</label>
                        <div className="flex gap-2">
                            <select
                                value={team2Overs}
                                onChange={(e) => setTeam2Overs(parseInt(e.target.value))}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            >
                                {Array.from({ length: 31 }, (_, i) => i + 20).map(over => (
                                    <option key={over} value={over}>{over}</option>
                                ))}
                            </select>
                            <select
                                value={team2Balls}
                                onChange={(e) => setTeam2Balls(parseInt(e.target.value))}
                                className="w-24 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            >
                                {[0, 1, 2, 3, 4, 5].map(ball => (
                                    <option key={ball} value={ball}>.{ball}</option>
                                ))}
                            </select>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Norm: {norm2}</p>
                    </div>
                </div>
            </div>

            {/* Result */}
            <div className="mt-8 p-6 bg-purple-50 rounded-xl border border-purple-100 animate-in fade-in slide-in-from-bottom-4">
                <div className="text-center">
                    <p className="text-sm font-medium text-purple-600 uppercase tracking-wider mb-2">Winning Target</p>
                    <div className="text-5xl font-bold text-slate-800 mb-2">
                        {target}
                    </div>
                    <p className="text-sm text-slate-500">
                        Needs {target} runs to win
                    </p>
                </div>

                <div className="mt-6 pt-6 border-t border-purple-100 grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-xs text-slate-500 uppercase">Team 1 Norm</p>
                        <p className="text-lg font-semibold text-slate-700">{norm1}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase">Team 2 Norm</p>
                        <p className="text-lg font-semibold text-slate-700">{norm2}</p>
                    </div>
                </div>

                <div className="mt-4 flex items-start gap-2 p-3 bg-white/50 text-purple-800 text-xs rounded-lg">
                    <Info size={14} className="mt-0.5 shrink-0" />
                    <p>
                        Target calculated using the Parabola Table.
                        Decimals are rounded up to the next whole number.
                        No tied matches allowed.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ParabolaCalculator;
