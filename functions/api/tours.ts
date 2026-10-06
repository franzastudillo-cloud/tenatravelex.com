// Cloudflare Pages Function: /api/tours
// Conecta directamente con la base de datos Cloudflare D1 en red (binding: DB)

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB
      .prepare('SELECT * FROM tours_cuadrones WHERE is_active = 1 ORDER BY single_price ASC')
      .all();

    const parsed = results.map((row: any) => ({
      id: row.id,
      circuitNum: row.circuit_num,
      category: row.category,
      categoryLabel: row.category_label,
      categoryLabelEn: row.category_label_en,
      badge: row.badge,
      badgeEn: row.badge_en,
      title: row.title,
      titleEn: row.title_en,
      duration: row.duration,
      durationEn: row.duration_en,
      difficulty: row.difficulty,
      difficultyEn: row.difficulty_en,
      desc: row.description,
      descEn: row.description_en,
      singlePrice: Number(row.single_price),
      doublePrice: Number(row.double_price),
      specs: {
        distance: row.distance,
        waterCrossings: row.water_crossings,
        terrain: row.terrain,
        power: row.power,
        mudLevel: row.mud_level,
        traction: row.traction,
        elevation: row.elevation,
        schedule: row.schedule,
      },
      includes: JSON.parse(row.includes_json || '[]'),
      includesEn: JSON.parse(row.includes_en_json || '[]'),
      image: row.image_url,
    }));

    return new Response(JSON.stringify(parsed), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const authHeader = context.request.headers.get('x-admin-password');
    const adminConfig = await context.env.DB
      .prepare("SELECT config_value FROM admin_config WHERE config_key = 'admin_password'")
      .first<{ config_value: string }>();

    const expectedPwd = adminConfig?.config_value || 'tena2025';
    if (!authHeader || authHeader !== expectedPwd) {
      return new Response(JSON.stringify({ error: 'No autorizado. Contraseña incorrecta.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const tour: any = await context.request.json();
    if (!tour.id || !tour.title) {
      return new Response(JSON.stringify({ error: 'Datos incompletos.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await context.env.DB.prepare(`
      INSERT OR REPLACE INTO tours_cuadrones (
        id, circuit_num, category, category_label, category_label_en,
        badge, badge_en, title, title_en, duration, duration_en,
        difficulty, difficulty_en, description, description_en,
        single_price, double_price, distance, water_crossings, terrain,
        power, mud_level, traction, elevation, schedule,
        includes_json, includes_en_json, image_url, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `).bind(
      tour.id,
      tour.circuitNum || 'CIRCUITO',
      tour.category || 'popular',
      tour.categoryLabel || 'Ruta Selva',
      tour.categoryLabelEn || 'Jungle Route',
      tour.badge || 'CUADRÓN',
      tour.badgeEn || 'ATV QUAD',
      tour.title,
      tour.titleEn || tour.title,
      tour.duration || '3 Horas',
      tour.durationEn || '3 Hours',
      tour.difficulty || 'Intermedio',
      tour.difficultyEn || 'Intermediate',
      tour.desc,
      tour.descEn || tour.desc,
      tour.singlePrice || 0,
      tour.doublePrice || 0,
      tour.specs?.distance || '20 KM',
      tour.specs?.waterCrossings || '3 VADOS',
      tour.specs?.terrain || 'GRAVA',
      tour.specs?.power || '570 CC',
      tour.specs?.mudLevel || 'EXTREMO',
      tour.specs?.traction || '4WD LOCK',
      tour.specs?.elevation || '+500 M',
      tour.specs?.schedule || '09:00 & 14:00',
      JSON.stringify(tour.includes || []),
      JSON.stringify(tour.includesEn || []),
      tour.image
    ).run();

    return new Response(JSON.stringify({ success: true, id: tour.id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
