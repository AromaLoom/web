const products = [
    {
        id: "1",
        name: "Vela 'Golden Calm'",
        price: 48.90,
        category: "Velas",
        image: "assets/golden_calm.png",
        description: "Una vela diseñada para la calma absoluta. Notas de vainilla y sándalo.",
        notes: "Vainilla, Sándalo, Ámbar",
        featured: true
    },
    {
        id: "2",
        name: "Vela 'Forest Whisper'",
        price: 59.50,
        category: "Velas",
        image: "assets/forest_whisper.png",
        description: "El aroma del bosque en tu hogar. Frescura de pino y tierra húmeda.",
        notes: "Pino, Musgo, Cedro",
        featured: true
    },
    {
        id: "3",
        name: "Difusor 'Citrus Rise'",
        price: 72.00,
        category: "Difusores",
        image: "assets/citrus_rise.png",
        description: "Energía cítrica para despertar tus sentidos cada mañana.",
        notes: "Naranja, Limón, Bergamota",
        featured: true
    },
    {
        id: "4",
        name: "Set 'Soul Moments Box'",
        price: 129.00,
        category: "Sets de regalo",
        image: "assets/soul_moments.png",
        description: "Un regalo inolvidable. Incluye nuestra vela más vendida y un difusor exclusivo.",
        notes: "Variado",
        featured: true,
        special: true
    },
    {
        id: "5",
        name: "Vela 'Lavender Dreams'",
        price: 52.00,
        category: "Velas",
        image: "assets/lavender_dreams.png",
        description: "Relajación profunda con lavanda francesa.",
        notes: "Lavanda, Manzanilla",
        featured: false
    },
    {
        id: "6",
        name: "Difusor 'Ocean Breeze'",
        price: 68.00,
        category: "Difusores",
        image: "assets/ocean_breeze.png",
        description: "Frescura marina para tus espacios.",
        notes: "Sal marina, Lirio, Madera flotante",
        featured: false
    },
    {
        id: "7",
        name: "Vela 'Spiced Pumpkin'",
        price: 55.00,
        category: "Colección temporada",
        image: "assets/golden_calm.png", // Reusing warm image
        description: "Edición limitada de otoño. Cálida y especiada.",
        notes: "Calabaza, Canela, Clavo",
        featured: false
    },
    // New Products
    {
        id: "8",
        name: "Set 'Home Harmony'",
        price: 145.00,
        category: "Sets de regalo",
        image: "assets/soul_moments.png", // Reusing set image
        description: "El set perfecto para armonizar tu hogar. Incluye dos velas y un spray de ambiente.",
        notes: "Lavanda, Eucalipto, Menta",
        featured: false
    },
    {
        id: "9",
        name: "Aromatizador 'Lino Fresco'",
        price: 35.00,
        category: "Difusores",
        image: "assets/ocean_breeze.png", // Reusing fresh image
        description: "Spray para textiles con aroma a ropa recién lavada y secada al sol.",
        notes: "Algodón, Lirio, Almizcle blanco",
        featured: false
    },
    {
        id: "10",
        name: "Vela 'Midnight Jasmine'",
        price: 62.00,
        category: "Velas",
        image: "assets/lavender_dreams.png", // Reusing floral image
        description: "Un aroma floral intenso y seductor para tus noches.",
        notes: "Jazmín, Nardo, Ylang Ylang",
        featured: false
    },
    {
        id: "11",
        name: "Difusor 'Bambú Zen'",
        price: 75.00,
        category: "Difusores",
        image: "assets/forest_whisper.png", // Reusing green image
        description: "Equilibrio y frescura verde para tu espacio de trabajo o meditación.",
        notes: "Bambú, Té Verde, Pepino",
        featured: false
    },
    {
        id: "12",
        name: "Set 'Mini Essentials'",
        price: 89.00,
        category: "Sets de regalo",
        image: "assets/soul_moments.png", // Reusing set image
        description: "Trío de nuestras velas más vendidas en versión mini.",
        notes: "Vainilla, Pino, Cítricos",
        featured: false
    }
];

const testimonials = [
    {
        text: "Las velas de AromaLoom me han ayudado muchísimo a relajarme después del trabajo. Son increíbles.",
        author: "María P.",
        rating: 5
    },
    {
        text: "El aroma dura muchísimo y el diseño es hermoso. Se nota la calidad.",
        author: "Daniela R.",
        rating: 5
    },
    {
        text: "El set de regalo fue perfecto para un cumpleaños, quedó encantada.",
        author: "Paolo V.",
        rating: 4
    },
    {
        text: "Nunca había probado un difusor tan efectivo. El olor es sutil pero persistente.",
        author: "Lucía M.",
        rating: 5
    },
    {
        text: "Excelente atención al cliente y el empaque es precioso.",
        author: "Carlos D.",
        rating: 5
    }
];
