import React from 'react';

const Logo = () => {
    return (
        <div className="flex items-center gap-2 select-none">
            <div className="relative flex items-center justify-center bg-gray-900 w-11 h-11 rounded-xl shadow-lg shadow-gray-200">
                <span className="text-white font-bold text-lg tracking-tight">UV</span>
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-500 rounded-full border-2 border-gray-50 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"></div>
                </div>
            </div>
            <span className="text-3xl font-black tracking-tighter text-gray-900">40</span>
        </div>
    );
};

export default Logo;
