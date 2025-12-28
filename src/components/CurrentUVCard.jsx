import React from 'react';

const getUVColor = (uvi) => {
    if (uvi <= 2) return 'bg-emerald-500 shadow-emerald-200';
    if (uvi <= 5) return 'bg-yellow-400 shadow-yellow-200';
    if (uvi <= 7) return 'bg-orange-500 shadow-orange-200';
    if (uvi <= 10) return 'bg-red-500 shadow-red-200';
    return 'bg-purple-600 shadow-purple-200';
};

const getUVDescription = (uvi) => {
    if (uvi <= 2) return 'Low';
    if (uvi <= 5) return 'Moderate';
    if (uvi <= 7) return 'High';
    if (uvi <= 10) return 'Very High';
    return 'Extreme';
};

const getUVAdvice = (uvi) => {
    if (uvi <= 2) return "Enjoy the sun! No specific protection required for most people.";
    if (uvi <= 5) return "Stay in shade near midday. Wear a hat and use SPF 15+ sunscreen.";
    if (uvi <= 7) return "Reduce sun exposure between 10am-4pm. Wear a hat, sunglasses, and SPF 30+.";
    if (uvi <= 10) return "Minimize sun exposure between 10am-4pm. Protective clothing, hat, and SPF 50+ are essential.";
    return "Try to avoid sun exposure between 10am-4pm. Unprotected skin can burn in minutes.";
};

const CurrentUVCard = ({ now }) => {
    if (!now) return null;

    const uvi = now.uvi;
    const colorClass = getUVColor(uvi);
    const description = getUVDescription(uvi);
    const advice = getUVAdvice(uvi);

    return (
        <div className="w-full px-4 mb-4">
            <div className={`w-full max-w-md mx-auto aspect-square rounded-[2.5rem] ${colorClass} text-white flex flex-col items-center justify-center p-8 shadow-xl transition-all duration-500 ring-4 ring-white mb-6 relative overflow-hidden`}>
                <div className="text-xl font-medium opacity-90 mb-2">Current UV Index</div>
                <div className="text-9xl font-bold tracking-tighter">{Math.round(uvi)}</div>
                <div className="text-2xl font-medium mt-6 bg-white/20 px-8 py-2 rounded-full backdrop-blur-md">
                    {description}
                </div>
            </div>

            <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Protection Advice</h3>
                <p className="text-gray-800 text-lg leading-relaxed font-medium">
                    {advice}
                </p>
            </div>
        </div>
    );
};

export default CurrentUVCard;
