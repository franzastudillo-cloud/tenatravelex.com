-- ========================================================
-- TENA TRAVEL EXPEDITIONS - CLOUDFLARE D1 DATABASE SCHEMA
-- Compatible con Cloudflare D1 (SQLite Engine)
-- ========================================================

-- TABLA 1: PAQUETES TURÍSTICOS MULTIDÍA (TODO INCLUIDO)
CREATE TABLE IF NOT EXISTS paquetes_multidia (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    title_en TEXT NOT NULL,
    badge TEXT DEFAULT 'TODO INCLUIDO',
    badge_en TEXT DEFAULT 'ALL INCLUSIVE',
    duration TEXT NOT NULL,
    duration_en TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    difficulty_en TEXT NOT NULL,
    departure TEXT NOT NULL,
    departure_en TEXT NOT NULL,
    description TEXT NOT NULL,
    description_en TEXT NOT NULL,
    price_from REAL NOT NULL,
    discount_badge TEXT,
    discount_badge_en TEXT,
    category_badge TEXT,
    category_badge_en TEXT,
    image_url TEXT NOT NULL,
    includes_json TEXT NOT NULL, -- JSON array of strings
    includes_en_json TEXT NOT NULL, -- JSON array of strings
    itinerary_json TEXT NOT NULL, -- JSON array of DayItinerary objects
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- TABLA 2: TOURS DIARIOS & CIRCUITOS EN CUADRÓN (1 DÍA)
CREATE TABLE IF NOT EXISTS tours_cuadrones (
    id TEXT PRIMARY KEY,
    circuit_num TEXT NOT NULL,
    category TEXT NOT NULL, -- 'popular' | 'extrema' | 'scenic'
    category_label TEXT NOT NULL,
    category_label_en TEXT NOT NULL,
    badge TEXT NOT NULL,
    badge_en TEXT NOT NULL,
    title TEXT NOT NULL,
    title_en TEXT NOT NULL,
    duration TEXT NOT NULL,
    duration_en TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    difficulty_en TEXT NOT NULL,
    description TEXT NOT NULL,
    description_en TEXT NOT NULL,
    single_price REAL NOT NULL,
    double_price REAL NOT NULL,
    distance TEXT NOT NULL,
    water_crossings TEXT NOT NULL,
    terrain TEXT NOT NULL,
    power TEXT,
    mud_level TEXT,
    traction TEXT,
    elevation TEXT,
    schedule TEXT NOT NULL,
    includes_json TEXT NOT NULL, -- JSON array of strings
    includes_en_json TEXT NOT NULL, -- JSON array of strings
    image_url TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- TABLA 3: CREDENCIALES Y CONFIGURACIÓN DEL ADMINISTRADOR
CREATE TABLE IF NOT EXISTS admin_config (
    config_key TEXT PRIMARY KEY,
    config_value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- INSERTAR CONTRASEÑA DE ADMINISTRADOR POR DEFECTO ('tena2025')
INSERT OR IGNORE INTO admin_config (config_key, config_value) 
VALUES ('admin_password', 'tena2025');

-- ========================================================
-- SEED DATA INICIAL PARA CLOUDFLARE D1
-- ========================================================

-- PAQUETE 1: AMAZONÍA MÁGICA (3D / 2N)
INSERT OR REPLACE INTO paquetes_multidia (
    id, title, title_en, badge, badge_en, duration, duration_en,
    difficulty, difficulty_en, departure, departure_en,
    description, description_en, price_from, discount_badge, discount_badge_en,
    image_url, includes_json, includes_en_json, itinerary_json, is_active
) VALUES (
    'magica',
    'Conoce la Amazonía Mágica',
    'Discover Magical Amazonia',
    'PAQUETE MÁS VENDIDO · TODO INCLUIDO',
    'BESTSELLER PACKAGE · ALL INCLUSIVE',
    '3 Días / 2 Noches',
    '3 Days / 2 Nights',
    'Familias & Parejas',
    'Families & Couples',
    'Salidas diarias',
    'Daily departures',
    'La experiencia insignia de Napo. Combina confort en eco-lodge, cavernas místicas de estalagmitas y ruta en cuadrón por pozas vírgenes de selva.',
    'Napo flagship experience. Combines private eco-lodge comfort, mystical stalagmite caves, and an ATV quad river tour to pristine jungle pools.',
    185.00,
    '-15% para grupos (4+)',
    '-15% for groups (4+)',
    'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
    '["2 Noches en eco-lodge amazónico privado con piscina","Tour en Cuadrones a Cascada Escondida y cañón","Navegación en canoa a motor por el río Napo","Expedición con linterna a Cavernas de Jumandy","Alimentación típica completa (desayunos, almuerzos, cenas)","Guía nativo bilingüe y equipamiento de seguridad"]',
    '["2 Nights at private rainforest eco-lodge with swimming pool","Quad tour to Hidden Waterfall and canyon gorge","Motorized wooden canoe trip down the Napo River","Spelunking expedition with headlamps in Jumandy Caves","Full typical meals (daily breakfasts, lunches, dinners)","Bilingual native guide and complete certified safety gear"]',
    '[{"day":"Día 1","title":"Recepción en Tena & Cavernas Místicas de Jumandy","desc":"Te recibimos en nuestra base en Tena. Check-in en el eco-lodge privado, descanso y almuerzo amazónico de bienvenida. Por la tarde expedición con linternas frontales en las cavernas subterráneas de Jumandy.","activities":["Recepción y briefing","Almuerzo tradicional","Espeleología guiada","Cena en lodge"]},{"day":"Día 2","title":"Expedición en Cuadrones a Cascada Escondida","desc":"Desayuno tropical. Inducción práctica en pista cerrada. Salida en caravana cruzando senderos de selva y 3 vados de río hasta la Cascada Escondida con baño natural.","activities":["Pista de inducción 15 min","Ruta en ríos y selva","Baño en cascada esmeralda","Regreso para cena"]},{"day":"Día 3","title":"Navegación Río Napo, Comunidad Kichwa & Retorno","desc":"Salida en canoa tradicional por el río Napo. Convivencia con sabios Kichwa, taller de chicha viva y chocolate artesanal de fino aroma antes del retorno.","activities":["Paseo fluvial en canoa","Encuentro cultural Kichwa","Taller de chocolate puro","Almuerzo despedida"]}]',
    1
);

-- PAQUETE 2: EXTREME JUNGLE & RAFTING + ATV (2D / 1N)
INSERT OR REPLACE INTO paquetes_multidia (
    id, title, title_en, badge, badge_en, duration, duration_en,
    difficulty, difficulty_en, departure, departure_en,
    description, description_en, price_from, category_badge, category_badge_en,
    image_url, includes_json, includes_en_json, itinerary_json, is_active
) VALUES (
    'extreme',
    'Extreme Jungle & Rafting + ATV',
    'Extreme Jungle & Rafting + ATV',
    'ADRENALINA TOTAL · ACCIÓN PURA',
    'PURE ADRENALINE · FULL ACTION',
    '2 Días / 1 Noche',
    '2 Days / 1 Night',
    'Intermedio / Extremo',
    'Intermediate / Extreme',
    'Fin de semana & diario',
    'Weekends & Daily',
    'Para buscadores de emoción fuerte. Conducción extrema en lodo amazónico, rápidos clase III del río Jatunyacu y noche de asado bajo las estrellas.',
    'For thrill-seekers. Extreme throttle ride across deep Amazonian mud tracks, world-class Jatunyacu river rapids, and evening BBQ by the campfire.',
    140.00,
    'Incluye Rafting + Quad',
    'Includes Rafting + Quad',
    'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1200&q=80',
    '["Ruta extrema en cuadrón por barro y selva primaria (4h)","Rafting de 25 km en Río Jatunyacu (Clase III mundial)","Noche en cabaña rústica de selva o safari glamping","Asado amazónico tradicional nocturno con fogata","Casco integral FOX, chaleco salvavidas y fotos GoPro"]',
    '["Extreme quad route through mud and deep jungle trails (4h)","25 km White Water Rafting on Jatunyacu River (Class III)","1 Night at rustic jungle cabin or safari glamping","Traditional Amazonian BBQ dinner with campfire","Full FOX certified helmet, lifejacket and GoPro photos"]',
    '[{"day":"Día 1","title":"Ruta Extrema de Barro en Cuadrón & Fogata","desc":"Briefing técnico. Travesía en lodo espeso, trepadas pedregosas y cruces técnicos en selva alta. En la noche asado amazónico a la leña con fogata.","activities":["Test drive 4WD","4 horas de barro y ríos","Poza secreta de selva","Asado y fogata"]},{"day":"Día 2","title":"Rafting Épico de 25 km en Río Jatunyacu","desc":"25 kilómetros de pura adrenalina navegando olas gigantes de aguas cristalinas, cañón selvático y almuerzo estilo picnic en playa de arena blanca.","activities":["Charla de seguridad","Descenso Clase III (25 km)","Almuerzo campestre","Fotos GoPro de acción"]}]',
    1
);

-- PAQUETE 3: EXPEDICIÓN PROFUNDA NAPO & ANCESTRAL (4D / 3N)
INSERT OR REPLACE INTO paquetes_multidia (
    id, title, title_en, badge, badge_en, duration, duration_en,
    difficulty, difficulty_en, departure, departure_en,
    description, description_en, price_from, category_badge, category_badge_en,
    image_url, includes_json, includes_en_json, itinerary_json, is_active
) VALUES (
    'napo',
    'Expedición Profunda Napo & Ancestral',
    'Deep Napo & Ancestral Quest',
    'EXPERIENCIA EXCLUSIVA · ECO-LUJO',
    'EXCLUSIVE EXPEDITION · ECO-LUXURY',
    '4 Días / 3 Noches',
    '4 Days / 3 Nights',
    'Cultural & Aventura',
    'Cultural & Adventure',
    'Cupos limitados (Máx. 12 pax)',
    'Limited spots (Max 12 pax)',
    'Inmersión íntima en el corazón de Napo: ceibos sagrados de 500 años, convivencia con sabios Kichwa, miradores elevados al atardecer y cata de chocolate de aroma.',
    'Intimate immersion in the heart of Napo: 500-year-old sacred kapok trees, Kichwa elders wisdom, scenic sunset viewpoints and fine aroma cacao tasting.',
    260.00,
    'Eco-Lodge Premium',
    'Premium Eco-Lodge',
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
    '["3 Noches en lodge ecológico ribereño frente al río Napo","Inmersión con comunidad Kichwa y taller de chicha viva","Senderismo interpretativo a ceibos gigantes de 500 años","Cuadrones hacia miradores panorámicos al ocaso","Cata artesanal y elaboración de chocolate de fino aroma"]',
    '["3 Nights at riverside eco-lodge overlooking the Napo River","Kichwa community immersion and artisan chicha workshop","Interpretative trek to giant millennial Kapok trees","ATV ride up to panoramic golden hour sunset viewpoints","Handcrafted fine aroma chocolate roasting and tasting"]',
    '[{"day":"Día 1","title":"Travesía Fluvial hacia el Eco-Lodge Ribereño","desc":"Traslado fluvial en canoa hacia el lodge frente al río Napo. Bebida de bienvenida con guayusa caliente y caminata nocturna para avistamiento de fauna.","activities":["Transfer en canoa","Cabaña con balcón","Cena de autor","Safari nocturno"]},{"day":"Día 2","title":"Santuario de Ceibos Gigantes & Sabiduría Kichwa","desc":"Caminata botánica hasta el Ceibo sagrado milenario de 45m. Convivencia con líderes Kichwa y preparación de alimentos ancestrales.","activities":["Trek botánico","Ceibo sagrado 500 años","Chicha de yuca","Playa del río"]},{"day":"Día 3","title":"Cuadrones a Miradores de la Hora Dorada","desc":"Ascenso en cuadrón hacia mirador elevado para contemplar las curvas del río Napo teñidas por los dorados del atardecer. Retorno con barras LED.","activities":["Ruta escénica","Mirador 360°","Brindis al atardecer","Caravana nocturna"]},{"day":"Día 4","title":"Taller de Cacao de Fino Aroma & Despedida","desc":"Cosecha de mazorcas de cacao, tostado a la leña y elaboración artesanal de bombones puros antes del traslado de retorno a Tena.","activities":["Chakra de cacao","Cata de chocolate puro","Almuerzo despedida","Transfer a Tena"]}]',
    1
);

-- TOURS DIARIOS EN CUADRÓN
-- TOUR 1: CASCADA ESCONDIDA
INSERT OR REPLACE INTO tours_cuadrones (
    id, circuit_num, category, category_label, category_label_en,
    badge, badge_en, title, title_en, duration, duration_en,
    difficulty, difficulty_en, description, description_en,
    single_price, double_price, distance, water_crossings, terrain,
    schedule, includes_json, includes_en_json, image_url, is_active
) VALUES (
    'cascada-escondida',
    'CIRCUITO 01 • RÍO & CASCADA',
    'popular',
    'Cascadas & Baño Natural',
    'Waterfalls & Natural Pool',
    'MÁS POPULAR · IDEAL PRINCIPIANTES',
    'MOST POPULAR · BEGINNER FRIENDLY',
    'Cascada Escondida & Emerald Pools',
    'Hidden Waterfall & Emerald Pools',
    '3 Horas',
    '3 Hours',
    'Principiante / Intermedio',
    'Beginner / Intermediate',
    'Sendero selvático rodeado de bromelias gigantes, parada para nadar en pozas cristalinas de agua esmeralda y navegación suave entre piedras de río.',
    'Scenic jungle trail lined with giant bromeliads, swim stop in emerald natural pools and smooth navigation across shallow river rocks.',
    55.00,
    80.00,
    '22 KM',
    '3 VADOS',
    'GRAVA / AGUA',
    '09:00 AM & 14:00 PM',
    '["Baño libre en laguna natural de cascada virgen","Caminata corta interpretativa de flora amazónica","Pista de inducción y prueba previa de manejo de 15 min","Casco FOX homologado, gafas y bolsa seca para celular","Guía nativo certificado bilingüe"]',
    '["Free swim in pristine emerald waterfall lagoon","Short interpretative walk through lush Amazon flora","15-min prior test-drive training on closed induction track","FOX certified helmet, goggles & waterproof dry bag","Wilderness-certified bilingual native guide"]',
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    1
);

-- TOUR 2: SELVA VIRGEN & MUD TRAIL
INSERT OR REPLACE INTO tours_cuadrones (
    id, circuit_num, category, category_label, category_label_en,
    badge, badge_en, title, title_en, duration, duration_en,
    difficulty, difficulty_en, description, description_en,
    single_price, double_price, distance, water_crossings, terrain,
    power, mud_level, traction, schedule,
    includes_json, includes_en_json, image_url, is_active
) VALUES (
    'selva-virgen-mud',
    'CIRCUITO 02 • MUD EXPEDITION',
    'extrema',
    'Barro Extremo',
    'Extreme Mud',
    'ADRENALINA PURA · MUCHO LODO',
    'PURE ADRENALINE · HEAVY MUD',
    'Selva Virgen & Deep Mud Trail',
    'Virgin Rainforest Deep Mud Trail',
    '4 Horas',
    '4 Hours',
    'Intermedio / Avanzado',
    'Intermediate / Advanced',
    'Ruta técnica profunda de selva secundaria y primaria. Cruces de torrentes poco profundos, subidas pedregosas, tramos con lodo espeso y adrenalina total.',
    'Technical deep route through primary rainforest. Shallow river crossings, rocky hill climbs, deep mud tracks, and non-stop adventure.',
    70.00,
    100.00,
    '28 KM',
    '5 VADOS',
    'LODO / GREDA',
    '570 CC',
    'EXTREMO',
    '4WD LOCK',
    '09:00 AM & 14:00 PM',
    '["Múltiples vados de ríos y salpicaduras aseguradas","Zonas exclusivas de barro para aceleración extrema","Snack amazónico autóctono a mitad de camino","Botas de caucho impermeables provistas","Lavado con manguera de alta presión y duchas al regreso"]',
    '["Multiple river splashes and muddy drifts guaranteed","Exclusive off-road mud playground for high throttle","Authentic Amazonian fruit snack halfway through","Waterproof rubber boots provided for all riders","High-pressure bike wash and warm showers upon return"]',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
    1
);

-- TOUR 3: MIRADOR AMAZÓNICO & GOLDEN SUNSET
INSERT OR REPLACE INTO tours_cuadrones (
    id, circuit_num, category, category_label, category_label_en,
    badge, badge_en, title, title_en, duration, duration_en,
    difficulty, difficulty_en, description, description_en,
    single_price, double_price, distance, water_crossings, terrain,
    elevation, schedule, includes_json, includes_en_json, image_url, is_active
) VALUES (
    'mirador-ocaso',
    'CIRCUITO 03 • PANORÁMICA & ATARDECER',
    'scenic',
    'Miradores & Ocaso',
    'Lookouts & Sunset',
    'VISTAS 360° · HORA DORADA',
    '360° VIEWS · GOLDEN HOUR',
    'Mirador Amazónico & Golden Sunset',
    'Amazonian Viewpoint & Golden Sunset',
    '2.5 Horas',
    '2.5 Hours',
    'Fácil / Escénica',
    'Easy / Scenic',
    'Ascenso panorámico por colinas selváticas hasta un mirador elevado para contemplar las curvas del río Napo teñidas por los dorados del atardecer.',
    'Scenic quad ascent through green hills to a high cliff lookout to view the winding curves of the Napo River bathed in sunset gold.',
    45.00,
    65.00,
    '34 KM',
    '1 VADO',
    'LASTRE / MONTAÑA',
    '+680 M',
    '14:30 PM (Turno Atardecer)',
    '["Fotografías panorámicas inigualables en hora dorada","Cata de café arábica y chocolate fino de aroma local","Retorno con faros LED de alta potencia al crepúsculo","Casco, gafas y asistencia mecánica permanente"]',
    '["Unmatched panoramic photography stops during golden hour","Artisan high-altitude coffee & dark chocolate tasting","Dusk return with ultra high-power LED lightbars","Helmet, goggles, and permanent mechanical sweep"]',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    1
);
