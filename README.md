# 🌿 Tena Travel Expeditions — Portal Oficial & Sistema de Gestión

Aplicación web interactiva para **Tena Travel Expeditions** (Tena, Napo, Ecuador), especializada en paquetes turísticos multidía todo incluido, expediciones de ecoturismo, rafting en el río Jatunyacu y circuitos todoterreno en cuatrimotos 4x4 automáticas.

Incluye panel de control para administradores protegido con contraseña y sincronización con bases de datos en la nube (Cloudflare D1 / SQLite Engine).

---

## 🚀 Opciones de Trabajo

Puedes trabajar con este proyecto de dos formas:

### Opción 1: Directo desde aquí (Google AI Studio / Cloud Run)
La aplicación ya está compilada, configurada y funcionando directamente en la nube.
- Cualquier cambio solicitado en el chat se refleja en tiempo real en la vista previa.
- Los datos modificados por el administrador se guardan inmediatamente en el almacenamiento local del navegador (`localStorage`) y generan sentencias SQL para Cloudflare D1.

### Opción 2: Trabajar con GitHub (`git` / `github`)
Para clonar, editar en tu computadora y subir el repositorio a GitHub:

#### 1. Requisitos Previos
- **Node.js**: versión 18 o superior ([nodejs.org](https://nodejs.org))
- **Git**: instalado en tu sistema ([git-scm.com](https://git-scm.com))

#### 2. Pasos para Subir a GitHub
Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# Inicializar repositorio local
git init

# Agregar todos los archivos (el .gitignore ya protege credenciales y archivos pesados)
git add .

# Crear el primer commit
git commit -m "feat: Tena Travel Expeditions web app con panel admin y Cloudflare D1"

# Renombrar rama a main
git branch -M main

# Vincular con tu repositorio en GitHub (crea un repo vacío en github.com primero)
git remote add origin https://github.com/TU-USUARIO/Tena-Travel-Expeditions.git

# Subir a GitHub
git push -u origin main
```

#### 3. Ejecución Local en tu Computadora
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo en http://localhost:3000
npm run dev

# Compilar para producción (carpeta dist/)
npm run build

# Previsualizar compilación de producción
npm run preview
```

---

## 🔐 Panel de Administración

- **Contraseña predeterminada:** `tena2025`
- **Funcionalidades:**
  - Editar, agregar y eliminar **Paquetes Multidía Todo Incluido**.
  - Editar, agregar y eliminar **Circuitos en Cuatrimoto 4x4** (tarifas individual y biplaza, especificaciones técnicas).
  - Pestaña **Cloudflare D1**: generador de SQL en tiempo real con botón de copiado de un clic y configuración de conexión API en red.
  - Pestaña **Seguridad**: cambio de contraseña de administrador.

---

## ☁️ Base de Datos Cloudflare D1

El esquema SQL compatible con Cloudflare D1 está ubicado en [`src/db/schema.sql`](src/db/schema.sql) y contiene las siguientes tablas:
1. `paquetes_multidia`
2. `tours_cuadrones`
3. `admin_config`

Para aplicar el esquema mediante Cloudflare Wrangler CLI:
```bash
npx wrangler d1 execute tena-travel-d1-prod --file=./src/db/schema.sql
```

---

## 🛠️ Tecnologías Utilizadas

- **React 19** + **TypeScript**
- **Vite 6** (Bundler ultrarrápido con soporte de rutas relativas)
- **Tailwind CSS v4** (Diseño moderno, tipografía Barlow Condensed y paleta Carbon / Jungle / Flame)
- **Lucide Icons**
- **Cloudflare D1 / SQLite Engine** (Gestión de catálogo en red)