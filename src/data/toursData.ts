export interface DayItinerary {
  day: string;
  title: string;
  desc: string;
  activities: string[];
}

export interface MultiDayPackage {
  id: string;
  title: string;
  titleEn: string;
  badge: string;
  badgeEn: string;
  duration: string;
  durationEn: string;
  difficulty: string;
  difficultyEn: string;
  departure: string;
  departureEn: string;
  desc: string;
  descEn: string;
  priceFrom: number;
  discountBadge?: string;
  discountBadgeEn?: string;
  categoryBadge?: string;
  categoryBadgeEn?: string;
  image: string;
  includes: string[];
  includesEn: string[];
  itinerary: DayItinerary[];
}

export interface DailyQuadTour {
  id: string;
  circuitNum: string;
  category: 'popular' | 'extrema' | 'scenic';
  categoryLabel: string;
  categoryLabelEn: string;
  badge: string;
  badgeEn: string;
  title: string;
  titleEn: string;
  duration: string;
  durationEn: string;
  difficulty: string;
  difficultyEn: string;
  desc: string;
  descEn: string;
  singlePrice: number;
  doublePrice: number;
  specs: {
    distance: string;
    waterCrossings: string;
    terrain: string;
    power?: string;
    mudLevel?: string;
    traction?: string;
    elevation?: string;
    schedule?: string;
  };
  includes: string[];
  includesEn: string[];
  image: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  tour: string;
  tourEn: string;
  rating: number;
  comment: string;
  commentEn: string;
  initials: string;
}

export interface FaqItem {
  id: number;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export const MULTI_DAY_PACKAGES: MultiDayPackage[] = [
  {
    id: 'magica',
    title: 'Conoce la Amazonía Mágica',
    titleEn: 'Discover Magical Amazonia',
    badge: 'PAQUETE MÁS VENDIDO · TODO INCLUIDO',
    badgeEn: 'BESTSELLER PACKAGE · ALL INCLUSIVE',
    duration: '3 Días / 2 Noches',
    durationEn: '3 Days / 2 Nights',
    difficulty: 'Familias & Parejas',
    difficultyEn: 'Families & Couples',
    departure: 'Salidas diarias',
    departureEn: 'Daily departures',
    desc: 'La experiencia insignia de Napo. Combina confort en eco-lodge, cavernas místicas de estalagmitas y ruta en cuadrón 4x4 por pozas vírgenes de selva.',
    descEn: "Napo's flagship experience. Combines private eco-lodge comfort, mystical stalagmite caves, and an ATV quad river tour to pristine jungle pools.",
    priceFrom: 185,
    discountBadge: '-15% para grupos (4+)',
    discountBadgeEn: '-15% for groups (4+)',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1Xi7PswMpkHvM2IXojOzlX49beS1413C_rNmqZoWFZmSctMWnlq2AP3MxTtgQE9cHlgVFfxZsPfqD2-uZ4MO6DHt1UEgLOdyaGnGgaVPUuULgCT8ryvq5lFX_nmX4rI9WkUMPxFGRX9x3XCuhu69IWuyFLbSbDkg5xK_28UG1aeSs5XeePYIj5HNAqgrw8eRcrunLuuWxIAMJ1EqFOJ_SffFpo4G87paTKBPg8oQ1j_r-7xZatMBhQ6yH8',
    includes: [
      '2 Noches en eco-lodge amazónico privado con piscina y hamacas',
      'Tour en Cuadrones 4x4 a Cascada Escondida y cañón de agua turquesa',
      'Navegación en canoa a motor por el majestuoso río Napo',
      'Expedición con linterna frontal a Cavernas de Jumandy',
      'Alimentación típica completa (desayunos, almuerzos campestres, cenas)',
      'Guía nativo bilingüe y equipamiento de seguridad homologado'
    ],
    includesEn: [
      '2 Nights at private rainforest eco-lodge with swimming pool & hammocks',
      '4x4 Quad tour to Hidden Waterfall and turquoise water canyon',
      'Motorized wooden canoe trip down the majestic Napo River',
      'Spelunking expedition with headlamps in Jumandy Caves',
      'Full typical meals (daily breakfasts, river lunches, gourmet dinners)',
      'Bilingual native guide and complete certified safety gear'
    ],
    itinerary: [
      {
        day: 'Día 1',
        title: 'Recepción en Tena & Cavernas Místicas de Jumandy',
        desc: 'Te recibimos en nuestra base oficial en Tena. Check-in en el eco-lodge privado, descanso y almuerzo amazónico de bienvenida (maito de tilapia o menú vegetariano). Por la tarde nos adentramos con linternas frontales y botas en las Cavernas de Jumandy, admirando estalactitas milenarias y pozas subterráneas de agua mineral.',
        activities: ['Recepción y briefing de bienvenida', 'Almuerzo tradicional en lodge', 'Espeleología guiada en Jumandy', 'Cena y fogata de integración']
      },
      {
        day: 'Día 2',
        title: 'Expedición en Cuadrones 4x4 a Cascada Escondida & Cañón',
        desc: 'Desayuno tropical con frutas frescas y café de Napo. Inducción práctica en pista cerrada y entrega de equipamiento DOT. Salida en caravana 4x4 cruzando senderos de selva primaria y 3 vados de río hasta la Cascada Escondida. Tiempo libre para nadar en la laguna esmeralda y snack campestre.',
        activities: ['Pista de prueba y calentamiento 4x4', 'Ruta en cuadrón entre ríos y selva', 'Baño natural en cascada virgen', 'Regreso a lodge para cena gourmet']
      },
      {
        day: 'Día 3',
        title: 'Navegación Río Napo, Comunidad Ancestral & Retorno',
        desc: 'Salida en canoa motorizada tradicional por las corrientes del río Napo. Convivencia con una familia Kichwa, demostración de cerbatana ancestral, cata de chicha viva y taller artesanal de chocolate de fino aroma antes del check-out y despedida en Tena.',
        activities: ['Paseo fluvial en canoa por el río Napo', 'Encuentro cultural Kichwa', 'Taller de chocolate puro artesanal', 'Almuerzo de despedida y traslado']
      }
    ]
  },
  {
    id: 'extreme',
    title: 'Extreme Jungle & Rafting + ATV',
    titleEn: 'Extreme Jungle & Rafting + ATV',
    badge: 'ADRENALINA TOTAL · ACCIÓN PURA',
    badgeEn: 'PURE ADRENALINE · FULL ACTION',
    duration: '2 Días / 1 Noche',
    durationEn: '2 Days / 1 Night',
    difficulty: 'Intermedio / Extremo',
    difficultyEn: 'Intermediate / Extreme',
    departure: 'Fin de semana & diario',
    departureEn: 'Weekends & Daily',
    desc: 'Para buscadores de emoción fuerte. Conducción extrema en lodo amazónico, rápidos clase III del río Jatunyacu y noche de asado bajo las estrellas.',
    descEn: 'For thrill-seekers. Extreme 4x4 throttle ride across deep Amazonian mud tracks, world-class Jatunyacu river rapids, and evening BBQ by the campfire.',
    priceFrom: 140,
    categoryBadge: 'Incluye Rafting + Quad',
    categoryBadgeEn: 'Includes Rafting + Quad',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1U84MIsR6LOHxnBMyMvb96kVFQBfx_CJucc9z9HHL7AYyGAhmAzGXgCxfoxwQQhFXW3ZtcgxCI0cl7UrxUhVa3Oyl1YQxiJZUkIsA3Hfyds131DjsPtXWq3j6dtZ4qUAAxg-1XFeaKFjRVGatiCIhlG49qJrJMqMnRY3vxid-UW8geZrHRq8YYLRK7WunqZyTdOR2xGii-Itv7lGvoH_-kww5PgC1sS0JLxyAwPVIM74Htuw-c-k53nrw',
    includes: [
      'Ruta extrema en cuadrón 4x4 por barro arcilloso y selva alta (4 horas)',
      'Rafting de 25 km en Río Jatunyacu (Rápidos Clase III mundial)',
      'Noche en cabaña rústica de selva o glamping con vista al río',
      'Asado amazónico tradicional nocturno con fogata y bebidas locales',
      'Casco integral FOX, chaleco salvavidas certificado y fotos GoPro'
    ],
    includesEn: [
      'Extreme 4x4 quad route through mud and deep jungle trails (4 hours)',
      '25 km White Water Rafting on Jatunyacu River (Class III world-class)',
      '1 Night at rustic jungle cabin or safari glamping with river view',
      'Traditional Amazonian BBQ dinner with campfire & local drinks',
      'Full FOX certified helmet, lifejacket, and professional GoPro photos'
    ],
    itinerary: [
      {
        day: 'Día 1',
        title: 'Ruta Extrema de Barro en Cuadrón & Fogata Nocturna',
        desc: 'Briefing técnico y calentamiento. Nos lanzamos a la ruta técnica de barro profundo: zanjas de greda, trepadas exigentes de montaña y aceleración en vados de río. En la tarde, duchas calientes y asado amazónico a la leña alrededor de la fogata con relatos de la selva.',
        activities: ['Prueba de tracción 4WD en circuito cerrado', '4 horas de travesía en lodo y selva virgen', 'Baño en poza secreta de río', 'Asado amazónico y noche de fogata']
      },
      {
        day: 'Día 2',
        title: 'Rafting Épico de 25 km en el Río Jatunyacu',
        desc: 'Desayuno energético. Traslado al punto de embarque en el legendario río Jatunyacu. 25 kilómetros de pura adrenalina navegando olas gigantes de aguas cristalinas, cañones de bosque nuboso y almuerzo estilo picnic en playa de arena blanca.',
        activities: ['Charla de seguridad y comandos de remo', 'Descenso de rápidos Clase III (25 km)', 'Almuerzo campestre en playa de río', 'Entrega de fotos GoPro de acción y despedida']
      }
    ]
  },
  {
    id: 'napo',
    title: 'Expedición Profunda Napo & Ancestral',
    titleEn: 'Deep Napo & Ancestral Quest',
    badge: 'EXPERIENCIA EXCLUSIVA · ECO-LUJO',
    badgeEn: 'EXCLUSIVE EXPEDITION · ECO-LUXURY',
    duration: '4 Días / 3 Noches',
    durationEn: '4 Days / 3 Nights',
    difficulty: 'Cultural & Aventura',
    difficultyEn: 'Cultural & Adventure',
    departure: 'Cupos limitados (Máx. 12 pax)',
    departureEn: 'Limited spots (Max 12 pax)',
    desc: 'Inmersión íntima en el corazón de Napo: ceibos sagrados de 500 años, convivencia con sabios Kichwa, miradores elevados al atardecer y cata de chocolate de aroma.',
    descEn: 'Intimate immersion in the heart of Napo: 500-year-old sacred kapok trees, Kichwa elders wisdom, scenic sunset viewpoints and fine aroma cacao tasting.',
    priceFrom: 260,
    categoryBadge: 'Eco-Lodge Premium',
    categoryBadgeEn: 'Premium Eco-Lodge',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1UV0hVUUlJNue0gS7e64DQ3zNMfAHK0ns1q0GBbGn_26WjKXDg8ZnfULC2rO5WYs4YHF5zXQpJ7E35KubrUDyIY3QiWb6zEvFp4oDrK6xYVsYPWShZctIbata5wqqS98_D7RLdf0P6q8aHoetz8B85JjGfqJGamzbc7IgaqfRX_UMLGQVIdwiUfNQmT8KzQs4cJto_dZWLGKomGSqIFMisV6QAj2OyPGSUmcVTZHTlwTwzXzU0G9_31PA',
    includes: [
      '3 Noches en lodge ecológico ribereño frente al río Napo',
      'Inmersión con comunidad Kichwa y taller de chicha viva',
      'Senderismo interpretativo a ceibos gigantes milenarios de 500 años',
      'Cuadrones 4x4 hacia miradores panorámicos al ocaso dorado',
      'Cata artesanal y elaboración guiada de chocolate de fino aroma'
    ],
    includesEn: [
      '3 Nights at riverside eco-lodge overlooking the Napo River',
      'Kichwa community immersion and artisan chicha workshop',
      'Interpretative trek to giant millennial 500-year-old Kapok trees',
      '4x4 ATV ride up to panoramic golden hour sunset viewpoints',
      'Handcrafted fine aroma chocolate roasting and tasting session'
    ],
    itinerary: [
      {
        day: 'Día 1',
        title: 'Travesía Fluvial hacia el Eco-Lodge Ribereño',
        desc: 'Llegada a Tena y traslado fluvial en canoa techada hacia el eco-lodge escondido en la orilla del río Napo. Bebida de bienvenida con guayusa caliente y caminata nocturna para avistamiento de anfibios fosforescentes e insectos gigantes.',
        activities: ['Transfer fluvial por el río Napo', 'Check-in en cabaña premium con balcón', 'Cena amazónica de autor', 'Safari nocturno de vida silvestre']
      },
      {
        day: 'Día 2',
        title: 'Santuario de Ceibos Gigantes & Sabiduría Kichwa',
        desc: 'Caminata botánica por sendero de selva primaria hasta el Ceibo sagrado milenario de más de 45 metros de altura. Convivencia con líderes de la comunidad Kichwa, pintura facial con achiote y preparación de alimentos ancestrales.',
        activities: ['Trek botánico interpretativo', 'Abrazo al Ceibo sagrado de 500 años', 'Taller de chicha de yuca y artesanías', 'Atardecer en la playa del río']
      },
      {
        day: 'Día 3',
        title: 'Expedición en Cuadrones 4x4 a Miradores de la Hora Dorada',
        desc: 'Por la tarde montamos en los cuadrones 4x4 automáticos para ascender colinas selváticas hacia el mirador más alto de la provincia. Vista panorámica 360° de los meandros del Napo bajo los colores dorados del atardecer. Retorno nocturno con barras LED.',
        activities: ['Ruta escénica en cuadrón 4x4', 'Parada fotográfica en mirador panorámico', 'Brindis al atardecer sobre el río Napo', 'Regreso nocturno en caravana iluminada']
      },
      {
        day: 'Día 4',
        title: 'Taller de Cacao de Fino Aroma & Despedida',
        desc: 'Visita a huerto agroforestal tradicional (chakra Kichwa). Cosecha de mazorcas de cacao, tostado a la leña, molienda y elaboración de bombones puros. Almuerzo de clausura y traslado a Tena.',
        activities: ['Taller sensorial de cacao fino', 'Degustación de chocolate 100% puro', 'Almuerzo de despedida', 'Traslado privado a Tena']
      }
    ]
  }
];

export const DAILY_QUAD_TOURS: DailyQuadTour[] = [
  {
    id: 'cascada-escondida',
    circuitNum: 'CIRCUITO 01 • RÍO & CASCADA',
    category: 'popular',
    categoryLabel: 'Cascadas & Baño Natural',
    categoryLabelEn: 'Waterfalls & Natural Pool',
    badge: 'MÁS POPULAR · IDEAL PRINCIPIANTES',
    badgeEn: 'MOST POPULAR · BEGINNER FRIENDLY',
    title: 'Cascada Escondida & Emerald Pools',
    titleEn: 'Hidden Waterfall & Emerald Pools',
    duration: '3 Horas',
    durationEn: '3 Hours',
    difficulty: 'Principiante / Intermedio',
    difficultyEn: 'Beginner / Intermediate',
    desc: 'Sendero selvático rodeado de bromelias gigantes, parada para nadar en pozas cristalinas de agua esmeralda y navegación suave entre piedras de río.',
    descEn: 'Scenic jungle trail lined with giant bromeliads, swim stop in emerald natural pools and smooth navigation across shallow river rocks.',
    singlePrice: 55,
    doublePrice: 80,
    specs: {
      distance: '22 KM',
      waterCrossings: '3 VADOS',
      terrain: 'GRAVA / AGUA',
      schedule: '09:00 AM & 14:00 PM'
    },
    includes: [
      'Baño libre en laguna natural de cascada virgen',
      'Caminata corta interpretativa de flora amazónica',
      'Pista de inducción y prueba previa de manejo de 15 min',
      'Casco FOX homologado, gafas y bolsa seca para celular',
      'Guía nativo certificado bilingüe'
    ],
    includesEn: [
      'Free swim in pristine emerald waterfall lagoon',
      'Short interpretative walk through lush Amazon flora',
      '15-min prior test-drive training on closed induction track',
      'FOX certified helmet, goggles & waterproof dry bag',
      'Wilderness-certified bilingual native guide'
    ],
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1Xi7PswMpkHvM2IXojOzlX49beS1413C_rNmqZoWFZmSctMWnlq2AP3MxTtgQE9cHlgVFfxZsPfqD2-uZ4MO6DHt1UEgLOdyaGnGgaVPUuULgCT8ryvq5lFX_nmX4rI9WkUMPxFGRX9x3XCuhu69IWuyFLbSbDkg5xK_28UG1aeSs5XeePYIj5HNAqgrw8eRcrunLuuWxIAMJ1EqFOJ_SffFpo4G87paTKBPg8oQ1j_r-7xZatMBhQ6yH8'
  },
  {
    id: 'selva-virgen-mud',
    circuitNum: 'CIRCUITO 02 • MUD EXPEDITION',
    category: 'extrema',
    categoryLabel: 'Barro 4x4 Extremo',
    categoryLabelEn: 'Extreme 4x4 Mud',
    badge: 'ADRENALINA PURA · MUCHO LODO',
    badgeEn: 'PURE ADRENALINE · HEAVY MUD',
    title: 'Selva Virgen & Deep Mud Trail',
    titleEn: 'Virgin Rainforest Deep Mud Trail',
    duration: '4 Horas',
    durationEn: '4 Hours',
    difficulty: 'Intermedio / Avanzado',
    difficultyEn: 'Intermediate / Advanced',
    desc: 'Ruta técnica profunda de selva secundaria y primaria. Cruces de torrentes poco profundos, subidas pedregosas, tramos con lodo espeso y adrenalina total.',
    descEn: 'Technical deep route through primary rainforest. Shallow river crossings, rocky hill climbs, deep mud tracks, and non-stop adventure.',
    singlePrice: 70,
    doublePrice: 100,
    specs: {
      distance: '28 KM',
      waterCrossings: '5 VADOS',
      terrain: 'LODO / GREDA',
      power: '570 CC',
      mudLevel: 'EXTREMO',
      traction: '4WD LOCK',
      schedule: '09:00 AM & 14:00 PM'
    },
    includes: [
      'Múltiples vados de ríos y salpicaduras aseguradas',
      'Zonas exclusivas de barro para aceleración extrema',
      'Snack amazónico autóctono a mitad de camino',
      'Botas de caucho impermeables provistas',
      'Lavado con manguera de alta presión y duchas al regreso'
    ],
    includesEn: [
      'Multiple river splashes and muddy drifts guaranteed',
      'Exclusive off-road mud playground for high throttle',
      'Authentic Amazonian fruit snack halfway through',
      'Waterproof rubber boots provided for all riders',
      'High-pressure bike wash and warm showers upon return'
    ],
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1U84MIsR6LOHxnBMyMvb96kVFQBfx_CJucc9z9HHL7AYyGAhmAzGXgCxfoxwQQhFXW3ZtcgxCI0cl7UrxUhVa3Oyl1YQxiJZUkIsA3Hfyds131DjsPtXWq3j6dtZ4qUAAxg-1XFeaKFjRVGatiCIhlG49qJrJMqMnRY3vxid-UW8geZrHRq8YYLRK7WunqZyTdOR2xGii-Itv7lGvoH_-kww5PgC1sS0JLxyAwPVIM74Htuw-c-k53nrw'
  },
  {
    id: 'mirador-ocaso',
    circuitNum: 'CIRCUITO 03 • PANORÁMICA & ATARDECER',
    category: 'scenic',
    categoryLabel: 'Miradores & Ocaso',
    categoryLabelEn: 'Lookouts & Sunset',
    badge: 'VISTAS 360° · HORA DORADA',
    badgeEn: '360° VIEWS · GOLDEN HOUR',
    title: 'Mirador Amazónico & Golden Sunset',
    titleEn: 'Amazonian Viewpoint & Golden Sunset',
    duration: '2.5 Horas',
    durationEn: '2.5 Hours',
    difficulty: 'Fácil / Escénica',
    difficultyEn: 'Easy / Scenic',
    desc: 'Ascenso panorámico por colinas selváticas hasta un mirador elevado para contemplar las curvas del río Napo teñidas por los dorados del atardecer.',
    descEn: 'Scenic quad ascent through green hills to a high cliff lookout to view the winding curves of the Napo River bathed in sunset gold.',
    singlePrice: 45,
    doublePrice: 65,
    specs: {
      distance: '34 KM',
      waterCrossings: '1 VADO',
      terrain: 'LASTRE / MONTAÑA',
      elevation: '+680 M',
      schedule: '14:30 PM (Turno Atardecer)'
    },
    includes: [
      'Fotografías panorámicas inigualables en hora dorada',
      'Cata de café arábica y chocolate fino de aroma local',
      'Retorno con faros LED de alta potencia al crepúsculo',
      'Casco, gafas y asistencia mecánica permanente'
    ],
    includesEn: [
      'Unmatched panoramic photography stops during golden hour',
      'Artisan high-altitude coffee & dark chocolate tasting',
      'Dusk return with ultra high-power LED lightbars',
      'Helmet, goggles, and permanent mechanical sweep'
    ],
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1UV0hVUUlJNue0gS7e64DQ3zNMfAHK0ns1q0GBbGn_26WjKXDg8ZnfULC2rO5WYs4YHF5zXQpJ7E35KubrUDyIY3QiWb6zEvFp4oDrK6xYVsYPWShZctIbata5wqqS98_D7RLdf0P6q8aHoetz8B85JjGfqJGamzbc7IgaqfRX_UMLGQVIdwiUfNQmT8KzQs4cJto_dZWLGKomGSqIFMisV6QAj2OyPGSUmcVTZHTlwTwzXzU0G9_31PA'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Familia Viteri Andrade',
    location: 'Guayaquil, Ecuador',
    tour: 'Amazonía Mágica 3D',
    tourEn: 'Magical Amazon 3D',
    rating: 5,
    comment: 'Tomamos el paquete de 3 días con los cuadrones y las cavernas de Jumandy. Todo impecable: el lodge hermoso con piscina, la comida deliciosa y los guías super atentos con mis hijos.',
    commentEn: 'We took the 3-day package with quads and Jumandy caves. Everything was flawless: gorgeous lodge with pool, delicious food and guides were super attentive with my kids.',
    initials: 'VA'
  },
  {
    id: '2',
    author: 'Lukas & Sophie Van Der Berg',
    location: 'Ámsterdam, Países Bajos',
    tour: 'Extreme Jungle 2D & Mud',
    tourEn: 'Extreme Jungle 2D & Mud',
    rating: 5,
    comment: 'The 2-day extreme tour with Jatunyacu rafting and ATV mud trail was the absolute highlight of our trip through Ecuador! Quads are powerful and guides were top notch.',
    commentEn: 'The 2-day extreme tour with Jatunyacu rafting and ATV mud trail was the absolute highlight of our trip through Ecuador! Quads are powerful and guides were top notch.',
    initials: 'VB'
  },
  {
    id: '3',
    author: 'Ing. Darío Morales',
    location: 'Ambato, Ecuador',
    tour: 'Tour Mirador Ocaso',
    tourEn: 'Sunset Viewpoint Tour',
    rating: 5,
    comment: 'El atardecer en el mirador del río Napo te quita el aliento. Fuimos con mi esposa y rentamos un cuadrón doble; nos sentimos súper seguros con la charla previa.',
    commentEn: 'The sunset at the Napo River lookout takes your breath away. My wife and I rented a double quad; we felt super safe with the thorough preliminary training.',
    initials: 'DM'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 1,
    question: '¿Qué incluye el hospedaje en los paquetes multidía?',
    questionEn: 'What is included in the lodging for multi-day packages?',
    answer: 'Todos nuestros paquetes incluyen eco-lodges y cabañas amazónicas aliadas con baño privado, agua caliente, wifi en áreas sociales, piscina o acceso directo al río y alimentación típica completa (desayunos, almuerzos campestres y cenas gourmet locales).',
    answerEn: 'All our packages include partnered eco-lodges and rainforest cabins with private bathroom, hot water, social Wi-Fi, swimming pool or direct river access, and full typical meals (daily breakfasts, river lunches, and local dinners).'
  },
  {
    id: 2,
    question: '¿Se necesita licencia de conducir o experiencia previa en cuadrones?',
    questionEn: 'Do I need a driver license or previous ATV experience?',
    answer: 'No se requiere experiencia previa ni licencia tipo profesional. Todas nuestras máquinas son 100% automáticas con acelerador de gatillo suave. Antes de partir, realizamos un circuito de práctica obligatorio de 15 minutos en nuestra base hasta que tengas total confianza y control.',
    answerEn: 'No previous experience or commercial driver license required. All our quads are 100% automatic with an easy thumb throttle. Before heading out, we conduct a mandatory 15-minute practice circuit at our base until you feel completely confident.'
  },
  {
    id: 3,
    question: '¿Pueden participar niños o adultos mayores?',
    questionEn: 'Can children or older adults participate?',
    answer: '¡Totalmente! Contamos con cuadrones biplaza confortables con espaldar acolchado para copiloto. Niños desde 6-7 años viajan seguros acompañados de un adulto. Adaptamos el ritmo de la caravana al grupo familiar.',
    answerEn: 'Absolutely! We have comfortable two-seater quads with padded backrests for passengers. Kids aged 6-7+ ride safely with an adult. We adapt caravan speed and trails to family groups.'
  },
  {
    id: 4,
    question: '¿Cuáles son las formas de pago y políticas de reserva?',
    questionEn: 'What are the payment methods and booking policies?',
    answer: 'Aceptamos transferencia bancaria local (Banco Pichincha, Banco Guayaquil, app Deuna), efectivo en nuestra oficina de Tena y pagos con tarjeta de crédito/débito a través de enlace seguro. Reservas confirmadas con un anticipo mínimo del 20-30%.',
    answerEn: 'We accept local bank transfers (Pichincha, Guayaquil, Deuna), cash at our Tena headquarters, and international credit/debit cards via secure payment link. Bookings are confirmed with a 20-30% advance deposit.'
  },
  {
    id: 5,
    question: '¿Qué sucede si llueve el día programado para la expedición?',
    questionEn: 'What happens if it rains on the scheduled day?',
    answer: 'En la Amazonía la lluvia tropical es parte del encanto y multiplica la emoción del barro en los senderos. Las salidas operan normalmente bajo lluvia moderada. En caso de alertas hidrológicas o crecientes extraordinarias en los ríos, reprogramamos el horario o reembolsamos sin penalización.',
    answerEn: 'In the Amazon, tropical showers are part of the thrill and make the mud trails even more exciting! Tours operate normally under moderate rain. In case of extreme river swells, we reschedule flexibly or refund with zero penalty.'
  }
];

export const GOOGLE_MAPS_REVIEWS_URL = 'https://maps.app.goo.gl/kSC953MkUjyeuYeS9';

export const BASE_CAMP_INFO = {
  address: 'Calle Serafín Gutiérrez y Rafaela Segala / Av. Jumandy km 1.5 vía a Misahuallí',
  city: 'Tena, Napo, Amazonía del Ecuador',
  phone: '+593 96 189 3686',
  email: 'tenatravelex@gmail.com',
  hours: 'Lunes a Domingo: 07:00 – 20:00 (Briefing turnos 08:30 y 14:00)',
  mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNTOKAKQLiFSpWutZh95pyB69fEK4pbzjVXGSC3oYgl_-pBgjZYDRrZkdVNs67wODpIZO4Bz5TQlBGwA-GvrV9TO3ZVrK8eJGuyoiKMlpBSeRHao7pYxYsjsWH_XSvT0BZ9geq2N78Q7biP_K8NKooNiJtfNNvLlzU0CaXWBPxdLOep7_M3K8ivF8HlzZlPlghDv1M4SZ6wpaVdMaadGPiDiox35UooDc0tqEYTdfUA7xBdP06dkgx',
  mapUrl: 'https://maps.app.goo.gl/kSC953MkUjyeuYeS9'
};
