export interface Env {
  DB?: any;
  STATIC_ASSETS?: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Endpoint API: Paquetes Turísticos Multidía
    if (url.pathname.startsWith('/api/packages')) {
      if (request.method === 'GET') {
        if (env.DB) {
          try {
            const { results } = await env.DB.prepare(
              'SELECT * FROM paquetes_multidia WHERE is_active = 1 ORDER BY price_from ASC'
            ).all();

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
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache'
              }
            });
          } catch (e: any) {
            return new Response(JSON.stringify({ error: e.message }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
        return new Response(JSON.stringify([]), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      if (request.method === 'POST') {
        const password = request.headers.get('x-admin-password');
        if (password !== 'tena2025') {
          return new Response(JSON.stringify({ error: 'Contraseña de administrador incorrecta' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        try {
          const body = await request.json() as any;
          if (env.DB) {
            await env.DB.prepare(`
              INSERT OR REPLACE INTO paquetes_multidia (
                id, title, title_en, badge, badge_en, duration, duration_en,
                difficulty, difficulty_en, departure, departure_en,
                description, description_en, price_from, discount_badge, discount_badge_en,
                category_badge, category_badge_en, image_url, includes_json, includes_en_json,
                itinerary_json, is_active
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
            `).bind(
              body.id || `pkg-${Date.now()}`,
              body.title,
              body.titleEn || body.title,
              body.badge || 'TODO INCLUIDO',
              body.badgeEn || 'ALL INCLUSIVE',
              body.duration,
              body.durationEn || body.duration,
              body.difficulty || 'Fácil',
              body.difficultyEn || 'Easy',
              body.departure || 'Salidas diarias',
              body.departureEn || 'Daily departures',
              body.desc,
              body.descEn || body.desc,
              body.priceFrom,
              body.discountBadge || '',
              body.discountBadgeEn || '',
              body.categoryBadge || '',
              body.categoryBadgeEn || '',
              body.image,
              JSON.stringify(body.includes || []),
              JSON.stringify(body.includesEn || body.includes || []),
              JSON.stringify(body.itinerary || [])
            ).run();
          }

          return new Response(JSON.stringify({ success: true, message: 'Paquete guardado correctamente' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (e: any) {
          return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }

    // Endpoint API: Tours Diarios en Cuadrones
    if (url.pathname.startsWith('/api/tours')) {
      if (request.method === 'GET') {
        if (env.DB) {
          try {
            const { results } = await env.DB.prepare(
              'SELECT * FROM tours_cuadrones WHERE is_active = 1 ORDER BY single_price ASC'
            ).all();

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
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache'
              }
            });
          } catch (e: any) {
            return new Response(JSON.stringify({ error: e.message }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
        return new Response(JSON.stringify([]), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      if (request.method === 'POST') {
        const password = request.headers.get('x-admin-password');
        if (password !== 'tena2025') {
          return new Response(JSON.stringify({ error: 'Contraseña de administrador incorrecta' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        try {
          const body = await request.json() as any;
          if (env.DB) {
            await env.DB.prepare(`
              INSERT OR REPLACE INTO tours_cuadrones (
                id, circuit_num, category, category_label, category_label_en,
                badge, badge_en, title, title_en, duration, duration_en,
                difficulty, difficulty_en, description, description_en,
                single_price, double_price, distance, water_crossings, terrain,
                power, mud_level, traction, elevation, schedule,
                includes_json, includes_en_json, image_url, is_active
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
            `).bind(
              body.id || `tour-${Date.now()}`,
              body.circuitNum || 'CIRCUITO 0X',
              body.category || 'popular',
              body.categoryLabel || 'Tour Cuadrón',
              body.categoryLabelEn || 'ATV Quad Tour',
              body.badge || 'TOUR POPULAR',
              body.badgeEn || 'POPULAR TOUR',
              body.title,
              body.titleEn || body.title,
              body.duration,
              body.durationEn || body.duration,
              body.difficulty || 'Intermedio',
              body.difficultyEn || 'Intermediate',
              body.desc,
              body.descEn || body.desc,
              body.singlePrice,
              body.doublePrice,
              body.specs?.distance || '20 KM',
              body.specs?.waterCrossings || '2 Vados',
              body.specs?.terrain || 'Selva / Grava',
              body.specs?.power || '500 CC',
              body.specs?.mudLevel || 'Medio',
              body.specs?.traction || 'Total',
              body.specs?.elevation || '+300 M',
              body.specs?.schedule || '09:00 AM',
              JSON.stringify(body.includes || []),
              JSON.stringify(body.includesEn || body.includes || []),
              body.image
            ).run();
          }

          return new Response(JSON.stringify({ success: true, message: 'Tour guardado correctamente' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (e: any) {
          return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }

    // Servir aplicación SPA y archivos estáticos desde Vite dist/
    if (env.STATIC_ASSETS) {
      return env.STATIC_ASSETS.fetch(request);
    }

    return new Response('Tena Travel Expeditions', {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
};
