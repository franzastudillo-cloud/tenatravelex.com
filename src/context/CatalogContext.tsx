import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MultiDayPackage,
  DailyQuadTour,
  MULTI_DAY_PACKAGES as INITIAL_PACKAGES,
  DAILY_QUAD_TOURS as INITIAL_TOURS,
  DEFAULT_FALLBACK_IMAGE,
} from '../data/toursData';

// Claves de respaldo maestras permanentes (inmutables)
export const MASTER_BACKUP_KEYS = ['TenaRespaldo2025', 'tena2025'];

interface CatalogContextType {
  packages: MultiDayPackage[];
  tours: DailyQuadTour[];
  isAdmin: boolean;
  adminPassword: string;
  adminRole: 'master' | 'admin' | null;
  dbStatus: 'connected' | 'local' | 'checking';
  loginAdmin: (password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  updatePackage: (pkg: MultiDayPackage) => Promise<void>;
  addPackage: (pkg: MultiDayPackage) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
  updateTour: (tour: DailyQuadTour) => Promise<void>;
  addTour: (tour: DailyQuadTour) => Promise<void>;
  deleteTour: (id: string) => Promise<void>;
  updateAdminPassword: (newPass: string) => Promise<{ success: boolean; message: string }>;
  resetAdminPassword: () => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY_PACKAGES = 'tena_packages_v2';
const STORAGE_KEY_TOURS = 'tena_tours_v2';
const STORAGE_KEY_ADMIN_AUTH = 'tena_admin_auth_v2';
const STORAGE_KEY_ADMIN_ROLE = 'tena_admin_role_v2';
const STORAGE_KEY_ADMIN_PWD = 'tena_admin_pwd_v2';

// Sanitizadores para asegurar que ninguna imagen rota antigua quede en pantalla
function sanitizePackage(pkg: MultiDayPackage, index: number): MultiDayPackage {
  const fallback = INITIAL_PACKAGES[index]?.image || DEFAULT_FALLBACK_IMAGE;
  const isBroken =
    !pkg.image ||
    pkg.image.includes('googleusercontent') ||
    pkg.image.includes('aida') ||
    pkg.image.includes('photo-1518457607834') || // Antigua foto de volcán/lava
    pkg.image.includes('photo-1516026672322');   // Antigua foto de sabana seca

  return {
    ...pkg,
    image: isBroken ? fallback : pkg.image,
  };
}

function sanitizeTour(tour: DailyQuadTour, index: number): DailyQuadTour {
  const fallback = INITIAL_TOURS[index]?.image || DEFAULT_FALLBACK_IMAGE;
  const isBroken =
    !tour.image ||
    tour.image.includes('googleusercontent') ||
    tour.image.includes('aida') ||
    tour.image.includes('photo-1516426122078') || // Antigua foto de safari
    tour.image.includes('photo-1558981403');      // Antigua moto de pista

  return {
    ...tour,
    image: isBroken ? fallback : tour.image,
  };
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Cargar paquetes iniciales con sanitización
  const [packages, setPackages] = useState<MultiDayPackage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PACKAGES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p, i) => sanitizePackage(p, i));
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_PACKAGES;
  });

  // 2. Cargar tours iniciales con sanitización
  const [tours, setTours] = useState<DailyQuadTour[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TOURS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((t, i) => sanitizeTour(t, i));
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_TOURS;
  });

  // 3. Estado de autenticación
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [adminRole, setAdminRole] = useState<'master' | 'admin' | null>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY_ADMIN_ROLE) as 'master' | 'admin') || null;
    } catch {
      return null;
    }
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_ADMIN_PWD) || 'tena2025';
    } catch {
      return 'tena2025';
    }
  });

  const [dbStatus, setDbStatus] = useState<'connected' | 'local' | 'checking'>('checking');

  // Guardar en almacenamiento local ante cualquier cambio (caché offline)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PACKAGES, JSON.stringify(packages));
    } catch {
      // Ignore
    }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TOURS, JSON.stringify(tours));
    } catch {
      // Ignore
    }
  }, [tours]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, isAdmin ? 'true' : 'false');
      if (adminRole) {
        localStorage.setItem(STORAGE_KEY_ADMIN_ROLE, adminRole);
      } else {
        localStorage.removeItem(STORAGE_KEY_ADMIN_ROLE);
      }
    } catch {
      // Ignore
    }
  }, [isAdmin, adminRole]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_PWD, adminPassword);
    } catch {
      // Ignore
    }
  }, [adminPassword]);

  // Cargar automáticamente datos frescos desde la Base de Datos Cloudflare en red
  useEffect(() => {
    async function loadCloudData() {
      try {
        const [pkgRes, tourRes, statusRes] = await Promise.allSettled([
          fetch('/api/packages'),
          fetch('/api/tours'),
          fetch('/api/admin/status'),
        ]);

        if (statusRes.status === 'fulfilled' && statusRes.value.ok) {
          const statusData = await statusRes.value.json();
          setDbStatus(statusData.d1Connected ? 'connected' : 'local');
        } else {
          setDbStatus('local');
        }

        if (pkgRes.status === 'fulfilled' && pkgRes.value.ok) {
          const cloudPkgs = await pkgRes.value.json();
          if (Array.isArray(cloudPkgs) && cloudPkgs.length > 0) {
            setPackages(cloudPkgs.map((p, i) => sanitizePackage(p, i)));
          }
        }

        if (tourRes.status === 'fulfilled' && tourRes.value.ok) {
          const cloudTours = await tourRes.value.json();
          if (Array.isArray(cloudTours) && cloudTours.length > 0) {
            setTours(cloudTours.map((t, i) => sanitizeTour(t, i)));
          }
        }
      } catch (err) {
        console.warn('Ejecutando en modo local (caché activa):', err);
        setDbStatus('local');
      }
    }

    loadCloudData();
  }, []);

  // Función de inicio de sesión con clave de respaldo y base de datos Cloudflare
  const loginAdmin = async (password: string): Promise<boolean> => {
    const clean = (password || '').trim();
    if (!clean) return false;

    // 1. Clave Maestra de Respaldo permanente (siempre funciona, offline u online)
    for (const master of MASTER_BACKUP_KEYS) {
      if (clean.toLowerCase() === master.toLowerCase()) {
        setIsAdmin(true);
        setAdminRole('master');
        return true;
      }
    }

    // 2. Consulta en la Base de Datos de Cloudflare D1
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: clean }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsAdmin(true);
          setAdminRole(data.role || 'admin');
          setAdminPassword(clean);
          return true;
        }
      }
    } catch {
      // Si no hay red, valida con la clave local guardada
    }

    // 3. Fallback con clave local
    if (clean === adminPassword.trim()) {
      setIsAdmin(true);
      setAdminRole('admin');
      return true;
    }

    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminRole(null);
  };

  // Guardado directo en la base de datos: Paquetes
  const updatePackage = async (pkg: MultiDayPackage) => {
    const sanitized = sanitizePackage(pkg, 0);
    setPackages((prev) => prev.map((p) => (p.id === sanitized.id ? sanitized : p)));

    try {
      await fetch('/api/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify(sanitized),
      });
    } catch (e) {
      console.warn('Paquete actualizado en caché local (offline):', e);
    }
  };

  const addPackage = async (pkg: MultiDayPackage) => {
    const sanitized = sanitizePackage(pkg, 0);
    setPackages((prev) => [...prev, sanitized]);

    try {
      await fetch('/api/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify(sanitized),
      });
    } catch (e) {
      console.warn('Paquete agregado en caché local (offline):', e);
    }
  };

  const deletePackage = async (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));

    try {
      await fetch(`/api/packages?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': adminPassword },
      });
    } catch (e) {
      console.warn('Paquete eliminado en caché local:', e);
    }
  };

  // Guardado directo en la base de datos: Tours
  const updateTour = async (tour: DailyQuadTour) => {
    const sanitized = sanitizeTour(tour, 0);
    setTours((prev) => prev.map((t) => (t.id === sanitized.id ? sanitized : t)));

    try {
      await fetch('/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify(sanitized),
      });
    } catch (e) {
      console.warn('Tour actualizado en caché local (offline):', e);
    }
  };

  const addTour = async (tour: DailyQuadTour) => {
    const sanitized = sanitizeTour(tour, 0);
    setTours((prev) => [...prev, sanitized]);

    try {
      await fetch('/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify(sanitized),
      });
    } catch (e) {
      console.warn('Tour agregado en caché local (offline):', e);
    }
  };

  const deleteTour = async (id: string) => {
    setTours((prev) => prev.filter((t) => t.id !== id));

    try {
      await fetch(`/api/tours?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': adminPassword },
      });
    } catch (e) {
      console.warn('Tour eliminado en caché local:', e);
    }
  };

  // Cambio de clave con sincronización en Cloudflare D1
  const updateAdminPassword = async (newPass: string): Promise<{ success: boolean; message: string }> => {
    const clean = (newPass || '').trim();
    if (clean.length < 4) {
      return { success: false, message: 'La contraseña debe tener al menos 4 caracteres.' };
    }

    setAdminPassword(clean);

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: adminPassword,
          newPassword: clean,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        return {
          success: true,
          message: '¡Contraseña actualizada en la base de datos de Cloudflare con éxito! Ahora puedes ingresar con esta clave desde cualquier dispositivo o navegador.',
        };
      }
    } catch {
      // Fallback
    }

    return {
      success: true,
      message: 'Contraseña actualizada en tu sesión local y lista para sincronizarse.',
    };
  };

  const resetAdminPassword = () => {
    setAdminPassword('tena2025');
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_PWD, 'tena2025');
    } catch {
      // Ignore
    }
  };

  const resetToDefaults = () => {
    setPackages(INITIAL_PACKAGES);
    setTours(INITIAL_TOURS);
    setAdminPassword('tena2025');
  };

  return (
    <CatalogContext.Provider
      value={{
        packages,
        tours,
        isAdmin,
        adminPassword,
        adminRole,
        dbStatus,
        loginAdmin,
        logoutAdmin,
        updatePackage,
        addPackage,
        deletePackage,
        updateTour,
        addTour,
        deleteTour,
        updateAdminPassword,
        resetAdminPassword,
        resetToDefaults,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
