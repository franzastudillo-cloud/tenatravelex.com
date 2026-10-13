export interface Env {
  DB?: any;
  STATIC_ASSETS?: {
    fetch: (request: Request) => Promise<Response>;
  };
}

// Claves de respaldo maestras permanentes (inmutables, nunca se pierden)
const MASTER_BACKUP_KEYS = ['TenaRespaldo2025', 'tena2025'];

// Asegurar tablas en Cloudflare D1 automáticamente
async function ensureD1Tables(db: any) {
  if (!db) return;
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS admin_config (
        config_key TEXT PRIMARY KEY,
        config_value TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      INSERT OR IGNORE INTO admin_config (config_key, config_value) VALUES ('admin_password', 'tena2025');

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
        includes_json TEXT NOT NULL,
        includes_en_json TEXT NOT NULL,
        itinerary_json TEXT NOT NULL,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS tours_cuadrones (
        id TEXT PRIMARY KEY,
        circuit_num TEXT NOT NULL,
        category TEXT NOT NULL,
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
        includes_json TEXT NOT NULL,
        includes_en_json TEXT NOT NULL,
        image_url TEXT NOT NULL,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.error('Error al verificar tablas D1:', err);
  }
}

// Helper para validar clave de administrador
async function validateAdminPassword(db: any, inputPass: string): Promise<boolean> {
  const clean = (inputPass || '').trim();
  if (!clean) return false;

  // 1. Validar contra Clave Maestra de Respaldo
  for (const master of MASTER_BACKUP_KEYS) {
    if (clean.toLowerCase() === master.toLowerCase()) {
      return true;
    }
  }

  // 2. Validar contra base de datos D1 (si está conectada)
  if (db) {
    try {
      await ensureD1Tables(db);
      const res = await db.prepare(
        "SELECT config_value FROM admin_config WHERE config_key = 'admin_password'"
      ).first();
      if (res && res.config_value && res.config_value.trim() === clean) {
        return true;
      }
    } catch (e) {
      console.error('Error consultando clave en D1:', e);
    }
  }

  return false;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // ==========================================
    // 1. ENDPOINTS DE AUTENTICACIÓN & SEGURIDAD
    // ==========================================

    // POST /api/admin/login : Validar inicio de sesión
    if (url.pathname === '/api/admin/login' && request.method === 'POST') {
      try {
        const body = await request.json() as { password?: string };
        const pass = (body.password || '').trim();
        const isValid = await validateAdminPassword(env.DB, pass);

        if (isValid) {
          const isMaster = MASTER_BACKUP_KEYS.some(m => m.toLowerCase() === pass.toLowerCase());
          return new Response(JSON.stringify({
            success: true,
            role: isMaster ? 'master' : 'admin',
            message: isMaster
              ? 'Acceso concedido mediante Clave Maestra de Respaldo'
              : 'Acceso concedido mediante Clave de Administrador'
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
          });
        }

        return new Response(JSON.stringify({
          success: false,
          error: 'Contraseña incorrecta. Puedes ingresar con tu Clave de Respaldo de Administrador.'
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      } catch (e: any) {
        return new Response(JSON.stringify({ success: false, error: e.message }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // POST /api/admin/change-password : Cambiar y guardar clave en Cloudflare D1
    if (url.pathname === '/api/admin/change-password' && request.method === 'POST') {
      try {
        const body = await request.json() as { currentPassword?: string; newPassword?: string };
        const current = (body.currentPassword || '').trim();
        const newPass = (body.newPassword || '').trim();

        if (newPass.length < 4) {
          return new Response(JSON.stringify({
            success: false,
            error: 'La nueva contraseña debe tener al menos 4 caracteres.'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const isAuth = await validateAdminPassword(env.DB, current);
        if (!isAuth) {
          return new Response(JSON.stringify({
            success: false,
            error: 'La contraseña actual o de respaldo no es válida.'
          }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        if (env.DB) {
          await ensureD1Tables(env.DB);
          await env.DB.prepare(`
            INSERT OR REPLACE INTO admin_config (config_key, config_value, updated_at)
            VALUES ('admin_password', ?, CURRENT_TIMESTAMP)
          `).bind(newPass).run();
        }

        return new Response(JSON.stringify({
          success: true,
          message: 'Contraseña actualizada y sincronizada en Cloudflare D1 con éxito. Ahora funciona en todos tus dispositivos.'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e: any) {
        return new Response(JSON.stringify({ success: false, error: e.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // GET /api/admin/status : Estado de la base de datos
    if (url.pathname === '/api/admin/status') {
      return new Response(JSON.stringify({
        success: true,
        d1Connected: !!env.DB,
        message: env.DB ? 'Base de datos Cloudflare D1 conectada y activa' : 'Modo local activo (esperando binding D1 en Cloudflare)'
      }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // ==========================================
    // 2. ENDPOINTS: PAQUETES TURÍSTICOS MULTIDÍA
    // ==========================================
    if (url.pathname.startsWith('/api/packages')) {
      if (request.method === 'GET') {
        if (env.DB) {
          try {
            await ensureD1Tables(env.DB);
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
            console.error('Error al listar paquetes en D1:', e);
          }
        }
        return new Response(JSON.stringify([]), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      if (request.method === 'POST') {
        const password = request.headers.get('x-admin-password') || '';
        const isAuth = await validateAdminPassword(env.DB, password);
        if (!isAuth) {
          return new Response(JSON.stringify({ error: 'Contraseña de administrador incorrecta' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        try {
          const body = await request.json() as any;
          if (env.DB) {
            await ensureD1Tables(env.DB);
            await env.DB.prepare(`
              INSERT OR REPLACE INTO paquetes_multidia (
                id, title, title_en, badge, badge_en, duration, duration_en,
                difficulty, difficulty_en, departure, departure_en,
                description, description_en, price_from, discount_badge, discount_badge_en,
                category_badge, category_badge_en, image_url, includes_json, includes_en_json,
                itinerary_json, is_active, updated_at
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
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

          return new Response(JSON.stringify({ success: true, message: 'Paquete guardado directamente en la base de datos' }), {
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

      if (request.method === 'DELETE') {
        const password = request.headers.get('x-admin-password') || '';
        const isAuth = await validateAdminPassword(env.DB, password);
        if (!isAuth) {
          return new Response(JSON.stringify({ error: 'Contraseña no autorizada' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const id = url.searchParams.get('id');
        if (id && env.DB) {
          try {
            await ensureD1Tables(env.DB);
            await env.DB.prepare('DELETE FROM paquetes_multidia WHERE id = ?').bind(id).run();
          } catch (e: any) {
            console.error('Error al eliminar paquete:', e);
          }
        }

        return new Response(JSON.stringify({ success: true, message: 'Paquete eliminado' }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // ==========================================
    // 3. ENDPOINTS: TOURS DIARIOS EN CUADRONES
    // ==========================================
    if (url.pathname.startsWith('/api/tours')) {
      if (request.method === 'GET') {
        if (env.DB) {
          try {
            await ensureD1Tables(env.DB);
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
            console.error('Error al listar tours en D1:', e);
          }
        }
        return new Response(JSON.stringify([]), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      if (request.method === 'POST') {
        const password = request.headers.get('x-admin-password') || '';
        const isAuth = await validateAdminPassword(env.DB, password);
        if (!isAuth) {
          return new Response(JSON.stringify({ error: 'Contraseña de administrador incorrecta' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        try {
          const body = await request.json() as any;
          if (env.DB) {
            await ensureD1Tables(env.DB);
            await env.DB.prepare(`
              INSERT OR REPLACE INTO tours_cuadrones (
                id, circuit_num, category, category_label, category_label_en,
                badge, badge_en, title, title_en, duration, duration_en,
                difficulty, difficulty_en, description, description_en,
                single_price, double_price, distance, water_crossings, terrain,
                power, mud_level, traction, elevation, schedule,
                includes_json, includes_en_json, image_url, is_active, updated_at
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
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

          return new Response(JSON.stringify({ success: true, message: 'Tour guardado directamente en la base de datos' }), {
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

      if (request.method === 'DELETE') {
        const password = request.headers.get('x-admin-password') || '';
        const isAuth = await validateAdminPassword(env.DB, password);
        if (!isAuth) {
          return new Response(JSON.stringify({ error: 'Contraseña no autorizada' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const id = url.searchParams.get('id');
        if (id && env.DB) {
          try {
            await ensureD1Tables(env.DB);
            await env.DB.prepare('DELETE FROM tours_cuadrones WHERE id = ?').bind(id).run();
          } catch (e: any) {
            console.error('Error al eliminar tour:', e);
          }
        }

        return new Response(JSON.stringify({ success: true, message: 'Tour eliminado' }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // ==========================================
    // 4. SERVIR ASSETS ESTÁTICOS DE VITE (SPA)
    // ==========================================
    if (env.STATIC_ASSETS) {
      return env.STATIC_ASSETS.fetch(request);
    }

    return new Response('Tena Travel Expeditions', {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
};
