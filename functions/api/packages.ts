// Cloudflare Pages Function: /api/packages
// Conecta directamente con la base de datos Cloudflare D1 en red (binding: DB)

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB
      .prepare('SELECT * FROM paquetes_multidia WHERE is_active = 1 ORDER BY price_from ASC')
      .all();

    // Parse JSON fields
    const parsed = results.map((row: any) => ({
      id: row.id,
      title: row.title,
      titleEn: row.title_en,
      badge: row.badge,
      badgeEn: row.badge_en,
      duration: row.duration,
      durationEn: row.duration_en,
      difficulty: row.difficulty,
      difficultyEn: row.difficulty_en,
      departure: row.departure,
      departureEn: row.departure_en,
      desc: row.description,
      descEn: row.description_en,
      priceFrom: Number(row.price_from),
      discountBadge: row.discount_badge,
      discountBadgeEn: row.discount_badge_en,
      categoryBadge: row.category_badge,
      categoryBadgeEn: row.category_badge_en,
      image: row.image_url,
      includes: JSON.parse(row.includes_json || '[]'),
      includesEn: JSON.parse(row.includes_en_json || '[]'),
      itinerary: JSON.parse(row.itinerary_json || '[]'),
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
    // Verify admin password against DB
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

    const pkg: any = await context.request.json();
    if (!pkg.id || !pkg.title) {
      return new Response(JSON.stringify({ error: 'Datos incompletos.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await context.env.DB.prepare(`
      INSERT OR REPLACE INTO paquetes_multidia (
        id, title, title_en, badge, badge_en, duration, duration_en,
        difficulty, difficulty_en, departure, departure_en,
        description, description_en, price_from, discount_badge, discount_badge_en,
        category_badge, category_badge_en, image_url, includes_json, includes_en_json, itinerary_json, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `).bind(
      pkg.id,
      pkg.title,
      pkg.titleEn || pkg.title,
      pkg.badge || 'TODO INCLUIDO',
      pkg.badgeEn || 'ALL INCLUSIVE',
      pkg.duration || '3 Días / 2 Noches',
      pkg.durationEn || '3 Days / 2 Nights',
      pkg.difficulty || 'Familiar',
      pkg.difficultyEn || 'Family',
      pkg.departure || 'Salidas diarias',
      pkg.departureEn || 'Daily departures',
      pkg.desc,
      pkg.descEn || pkg.desc,
      pkg.priceFrom || 0,
      pkg.discountBadge || null,
      pkg.discountBadgeEn || null,
      pkg.categoryBadge || null,
      pkg.categoryBadgeEn || null,
      pkg.image,
      JSON.stringify(pkg.includes || []),
      JSON.stringify(pkg.includesEn || []),
      JSON.stringify(pkg.itinerary || [])
    ).run();

    return new Response(JSON.stringify({ success: true, id: pkg.id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
