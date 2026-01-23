import React from 'react';
import { getUVStatus } from '../utils/uvHelpers';

const dotColorMap = {
    emerald: 'bg-emerald-500',
    yellow: 'bg-yellow-400',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    purple: 'bg-purple-600',
};

const HourlyForecast = ({ forecast }) => {
    if (!forecast || forecast.length === 0) return null;

    // Filter next 24 hours
    const next24 = forecast.slice(0, 24);

    return (
        <div className="w-full max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 px-6">Próximas 24 Horas</h3>
            <div className="flex overflow-x-auto pb-8 px-6 gap-3 no-scrollbar snap-x">
                {next24.map((item, index) => {
                    const date = new Date(item.time);
                    const hours = date.getHours().toString().padStart(2, '0');
                    const { colorName, label } = getUVStatus(item.uvi);

                    const finalColorClass = dotColorMap[colorName] || 'bg-gray-300';

                    return (
                        <div key={index} className="snap-center flex-shrink-0 flex flex-col items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 min-w-[5.5rem] hover:-translate-y-1 transition-transform duration-300">
                            <span className="text-gray-400 text-xs font-medium mb-1">{hours}:00</span>
                            <span className="text-xl font-bold text-gray-900 mb-1">{Math.round(item.uvi)}</span>
                            <div className={`w-2 h-2 rounded-full ${finalColorClass} mb-2`} />
                            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HourlyForecast;
