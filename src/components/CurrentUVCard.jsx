import React from 'react';

const getUVColor = (uvi) => {
    if (uvi <= 2) return 'bg-emerald-500 shadow-emerald-200';
    if (uvi <= 5) return 'bg-yellow-400 shadow-yellow-200';
    if (uvi <= 7) return 'bg-orange-500 shadow-orange-200';
    if (uvi <= 10) return 'bg-red-500 shadow-red-200';
    return 'bg-purple-600 shadow-purple-200';
};

const getUVDescription = (uvi) => {
    if (uvi <= 2) return 'Bajo';
    if (uvi <= 5) return 'Moderado';
    if (uvi <= 7) return 'Alto';
    if (uvi <= 10) return 'Muy Alto';
    return 'Extremo';
};

const getUVAdvice = (uvi) => {
    if (uvi <= 2) return "¡Disfruta del sol! No se requiere protección específica para la mayoría.";
    if (uvi <= 5) return "Busca sombra cerca del mediodía. Usa sombrero y protector solar SPF 15+.";
    if (uvi <= 7) return "Reduce la exposición entre 10am-4pm. Usa sombrero, gafas y SPF 30+.";
    if (uvi <= 10) return "Minimiza la exposición entre 10am-4pm. Ropa, sombrero y SPF 50+ esenciales.";
    return "Evita el sol entre 10am-4pm. La piel sin protección se quema en minutos.";
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
                <div className="text-xl font-medium opacity-90 mb-2">Índice UV Actual</div>
                <div className="text-9xl font-bold tracking-tighter">{Math.round(uvi)}</div>
                <div className="text-2xl font-medium mt-6 bg-white/20 px-8 py-2 rounded-full backdrop-blur-md">
                    {description}
                </div>
                <div className="text-sm font-medium mt-4 text-center max-w-[80%] opacity-90">
                    {advice}
                </div>
            </div>
        </div>
    );
};

export default CurrentUVCard;
