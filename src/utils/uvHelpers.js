export const getUVStatus = (uvi) => {
    if (uvi <= 2) {
        return {
            colorName: 'emerald',
            label: 'Bajo',
            advice: "¡Disfruta del sol! No se requiere protección específica para la mayoría."
        };
    }
    if (uvi <= 5) {
        return {
            colorName: 'yellow',
            label: 'Moderado',
            advice: "Busca sombra cerca del mediodía. Usa sombrero y protector solar SPF 15+."
        };
    }
    if (uvi <= 7) {
        return {
            colorName: 'orange',
            label: 'Alto',
            advice: "Reduce la exposición entre 10am-4pm. Usa sombrero, gafas y SPF 30+."
        };
    }
    if (uvi <= 10) {
        return {
            colorName: 'red',
            label: 'Muy Alto',
            advice: "Minimiza la exposición entre 10am-4pm. Ropa, sombrero y SPF 50+ esenciales."
        };
    }
    return {
        colorName: 'purple',
        label: 'Extremo',
        advice: "Evita el sol entre 10am-4pm. La piel sin protección se quema en minutos."
    };
};
