export interface Env {
  DB?: any;
  ASSETS?: {
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
              'SELECT * FROM packages WHERE active = 1 ORDER BY id ASC'
            ).all();
            return new Response(JSON.stringify(results), {
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
            await env.DB.prepare(
              'INSERT INTO packages (slug, title, duration, price, badge, description, image, itinerary, includes, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)'
            ).bind(
              body.slug,
              body.title,
              body.duration,
              body.price,
              body.badge || '',
              body.description,
              body.image,
              JSON.stringify(body.itinerary || []),
              JSON.stringify(body.includes || [])
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
              'SELECT * FROM tours WHERE active = 1 ORDER BY id ASC'
            ).all();
            return new Response(JSON.stringify(results), {
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
            await env.DB.prepare(
              'INSERT INTO tours (slug, title, duration, difficulty, price, description, image, highlights, includes, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)'
            ).bind(
              body.slug,
              body.title,
              body.duration,
              body.difficulty,
              body.price,
              body.description,
              body.image,
              JSON.stringify(body.highlights || []),
              JSON.stringify(body.includes || [])
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
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Tena Travel Expeditions', {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
};
