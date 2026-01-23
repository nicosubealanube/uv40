import React from 'react';
import { getUVStatus } from '../utils/uvHelpers';

const colorMap = {
    emerald: 'bg-emerald-500 shadow-emerald-200',
    yellow: 'bg-yellow-400 shadow-yellow-200',
    orange: 'bg-orange-500 shadow-orange-200',
    red: 'bg-red-500 shadow-red-200',
    purple: 'bg-purple-600 shadow-purple-200',
};

const CurrentUVCard = ({ now }) => {
    if (!now) return null;

    const uvi = now.uvi;
    const { colorName, label, advice } = getUVStatus(uvi);

    // Use the static map to ensure Tailwind picks up the classes
    const colorClass = colorMap[colorName] || 'bg-gray-500';

    return (
        <div className="w-full px-4 mb-4">
            <div className={`w-full max-w-md mx-auto aspect-square rounded-[2.5rem] ${colorClass} text-white flex flex-col items-center justify-center p-8 shadow-xl transition-all duration-500 ring-4 ring-white mb-6 relative overflow-hidden`}>
                <div className="text-xl font-medium opacity-90 mb-2">Índice UV Actual</div>
                <div className="text-9xl font-bold tracking-tighter">{Math.round(uvi)}</div>
                <div className="text-2xl font-medium mt-6 bg-white/20 px-8 py-2 rounded-full backdrop-blur-md">
                    {label}
                </div>
                <div className="text-sm font-medium mt-4 text-center max-w-[80%] opacity-90">
                    {advice}
                </div>
            </div>
        </div>
    );
};

export default CurrentUVCard;
