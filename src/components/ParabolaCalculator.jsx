import React from 'react';
import { useParabola } from '../hooks/useParabola';
import { getParabolaNorm } from '../data/parabolaTable';
import { TrendingUp, Calculator, Info, RotateCcw, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ParabolaCalculator = () => {
    const {
        matchFormat,
        setMatchFormat,
        team1Score, setTeam1Score,
        team1Overs, setTeam1Overs,
        team2Overs, setTeam2Overs,
        team2Balls, setTeam2Balls,
        target,
        norm1,
        norm2,
        reset
    } = useParabola();

    // Get overs range based on format
    const getOversRange = (isTeam1 = false) => {
        if (matchFormat === 50) {
            return Array.from({ length: 31 }, (_, i) => i + 20); // 20-50
        } else if (matchFormat === 30) {
            return Array.from({ length: 21 }, (_, i) => i + 10); // 10-30
        } else if (matchFormat === 20) {
            return Array.from({ length: 16 }, (_, i) => i + 5); // 5-20
        }
        return [];
    };

    // Generate PDF with overs bowled and targets (single page, centered)
    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('Parabola Method - Target Calculator', 105, 15, { align: 'center' });
        
        // Add match format and Team 1 info in compact format
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Match Format: ${matchFormat} Overs | Team 1 Score: ${team1Score} | Overs: ${team1Overs}`, 105, 25, { align: 'center' });
        
        // Generate table data for all possible overs (over by over, no balls)
        const tableData = [];
        const oversRange = getOversRange(false);
        
        oversRange.forEach(overs => {
            const norm2Value = getParabolaNorm(overs, 0, matchFormat);
            if (norm1 > 0) {
                const ratio = norm2Value / norm1;
                const calculatedTarget = Math.ceil(team1Score * ratio);
                tableData.push([overs, calculatedTarget]);
            }
        });
        
        // Add table using autoTable with centered positioning and optimized spacing
        autoTable(doc, {
            startY: 32,
            head: [['Overs Bowled', 'Target']],
            body: tableData,
            theme: 'grid',
            margin: { left: 70, right: 70, bottom: 12 },
            headStyles: { 
                fillColor: [147, 51, 234],
                textColor: 255,
                fontStyle: 'bold',
                halign: 'center',
                fontSize: 11,
                cellPadding: 1.5
            },
            styles: {
                fontSize: 10,
                cellPadding: 1.5,
                halign: 'center',
                minCellHeight: 5
            },
            columnStyles: {
                0: { cellWidth: 35 },
                1: { cellWidth: 35 }
            },
            tableWidth: 70,
            didDrawPage: function(data) {
                // Ensure single page by checking if content exceeds page
                if (data.pageNumber > 1) {
                    console.warn('Content exceeds single page');
                }
            }
        });
        
        // Add footer
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        doc.text(
            `Generated on ${new Date().toLocaleDateString()}`,
            105,
            doc.internal.pageSize.height - 6,
            { align: 'center' }
        );
        
        // Download the PDF
        doc.save(`Parabola_Target_${matchFormat}over_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                    <TrendingUp size={24} />
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Parabola Method</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Target = (Norm2 / Norm1) × Score1</p>
                </div>
                <button
                    onClick={reset}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors"
                    title="Reset to default values"
                >
                    <RotateCcw size={16} />
                    Reset
                </button>
            </div>

            {/* Match Format Selector */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Match Format</label>
                <div className="flex gap-3">
                    <button
                        onClick={() => setMatchFormat(50)}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                            matchFormat === 50
                                ? 'bg-purple-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                    >
                        50 Overs
                    </button>
                    <button
                        onClick={() => setMatchFormat(30)}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                            matchFormat === 30
                                ? 'bg-purple-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                    >
                        30 Overs
                    </button>
                    <button
                        onClick={() => setMatchFormat(20)}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                            matchFormat === 20
                                ? 'bg-purple-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                    >
                        20 Overs
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Team 1 Inputs */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                        Team 1 (Batting 1st)
                    </h3>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Runs Scored</label>
                        <input
                            type="number"
                            placeholder="0"
                            value={team1Score || ''}
                            onChange={(e) => setTeam1Score(parseFloat(e.target.value) || 0)}
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Overs Allotted</label>
                        <select
                            value={team1Overs}
                            onChange={(e) => setTeam1Overs(parseInt(e.target.value))}
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        >
                            {getOversRange(true).map(over => (
                                <option key={over} value={over}>{over} Overs</option>
                            ))}
                        </select>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Norm: {norm1}</p>
                    </div>
                </div>

                {/* Team 2 Inputs */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                        Team 2 (Batting 2nd)
                    </h3>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Overs to be Bowled</label>
                        <div className="flex gap-2">
                            <select
                                value={team2Overs}
                                onChange={(e) => setTeam2Overs(parseInt(e.target.value))}
                                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            >
                                {getOversRange(false).map(over => (
                                    <option key={over} value={over}>{over}</option>
                                ))}
                            </select>
                            <select
                                value={team2Balls}
                                onChange={(e) => setTeam2Balls(parseInt(e.target.value))}
                                className="w-24 px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            >
                                {[0, 1, 2, 3, 4, 5].map(ball => (
                                    <option key={ball} value={ball}>.{ball}</option>
                                ))}
                            </select>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Norm: {norm2}</p>
                    </div>
                </div>
            </div>

            {/* Result */}
            <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800 animate-in fade-in slide-in-from-bottom-4 transition-colors duration-300">
                <div className="text-center">
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">Winning Target</p>
                    <div className="text-5xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                        {target}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Needs {target} runs to win
                    </p>
                </div>

                <div className="mt-6 pt-6 border-t border-purple-100 dark:border-purple-800 grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Team 1 Norm</p>
                        <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">{norm1}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Team 2 Norm</p>
                        <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">{norm2}</p>
                    </div>
                </div>

                <div className="mt-4 flex items-start gap-2 p-3 bg-white/50 dark:bg-slate-800/50 text-purple-800 dark:text-purple-300 text-xs rounded-lg">
                    <Info size={14} className="mt-0.5 shrink-0" />
                    <p>
                        Target calculated using the Parabola Table.
                        Decimals are rounded up to the next whole number.
                        No tied matches allowed.
                    </p>
                </div>
            </div>

            {/* Download PDF Button */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={generatePDF}
                    disabled={team1Score === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                    title={team1Score === 0 ? 'Please enter Team 1 score first' : 'Download Target Table PDF'}
                >
                    <Download size={20} />
                    Download Target Table PDF
                </button>
            </div>
        </div>
    );
};

export default ParabolaCalculator;
