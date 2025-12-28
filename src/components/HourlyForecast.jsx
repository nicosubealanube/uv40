import React from 'react';

const getUVColorSmall = (uvi) => {
    if (uvi <= 2) return 'bg-emerald-500';
    if (uvi <= 5) return 'bg-yellow-400';
    if (uvi <= 7) return 'bg-orange-500';
    if (uvi <= 10) return 'bg-red-500';
    return 'bg-purple-600';
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
                    const color = getUVColorSmall(item.uvi);

                    return (
                        <div key={index} className="snap-center flex-shrink-0 flex flex-col items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 min-w-[4.5rem] hover:-translate-y-1 transition-transform duration-300">
                            <span className="text-gray-400 text-xs font-medium mb-2">{hours}:00</span>
                            <span className="text-xl font-bold text-gray-900 mb-2">{Math.round(item.uvi)}</span>
                            <div className={`w-2 h-2 rounded-full ${color}`} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HourlyForecast;
