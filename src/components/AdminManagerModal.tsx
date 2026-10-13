import React, { useState } from 'react';
import { useCatalog, MASTER_BACKUP_KEYS } from '../context/CatalogContext';
import { MultiDayPackage, DailyQuadTour, DayItinerary, DEFAULT_FALLBACK_IMAGE } from '../data/toursData';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Database,
  Check,
  CheckCheck,
  RefreshCw,
  Lock,
  Compass,
  Zap,
  Save,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';

interface AdminManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'multiday' | 'atv' | 'security';
  initialEditPackageId?: string;
  initialEditTourId?: string;
}

export const AdminManagerModal: React.FC<AdminManagerModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'multiday',
  initialEditPackageId,
  initialEditTourId,
}) => {
  const {
    packages,
    tours,
    adminPassword,
    adminRole,
    dbStatus,
    updatePackage,
    addPackage,
    deletePackage,
    updateTour,
    addTour,
    deleteTour,
    updateAdminPassword,
    resetAdminPassword,
    logoutAdmin,
  } = useCatalog();

  const [activeTab, setActiveTab] = useState<'multiday' | 'atv' | 'security'>(defaultTab);

  // Estados de edición para Paquetes Multidía
  const [editingPackage, setEditingPackage] = useState<MultiDayPackage | null>(() => {
    if (initialEditPackageId) {
      return packages.find((p) => p.id === initialEditPackageId) || null;
    }
    return null;
  });
  const [isCreatingPackage, setIsCreatingPackage] = useState(false);

  // Estados de edición para Tours Diarios en Cuadrones
  const [editingTour, setEditingTour] = useState<DailyQuadTour | null>(() => {
    if (initialEditTourId) {
      return tours.find((t) => t.id === initialEditTourId) || null;
    }
    return null;
  });
  const [isCreatingTour, setIsCreatingTour] = useState(false);

  // Estados para Cambio de Clave
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pwdLoading, setPwdLoading] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Guardar paquete directamente en la base de datos
  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;

    if (isCreatingPackage) {
      await addPackage(editingPackage);
      setSaveSuccessMsg(`¡Paquete "${editingPackage.title}" creado y guardado en la nube!`);
    } else {
      await updatePackage(editingPackage);
      setSaveSuccessMsg(`¡Paquete "${editingPackage.title}" actualizado directamente en la nube!`);
    }

    setIsCreatingPackage(false);
    setEditingPackage(null);

    setTimeout(() => {
      setSaveSuccessMsg(null);
    }, 4000);
  };

  // Guardar tour directamente en la base de datos
  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTour) return;

    if (isCreatingTour) {
      await addTour(editingTour);
      setSaveSuccessMsg(`¡Tour "${editingTour.title}" creado y guardado en la nube!`);
    } else {
      await updateTour(editingTour);
      setSaveSuccessMsg(`¡Tour "${editingTour.title}" actualizado directamente en la nube!`);
    }

    setIsCreatingTour(false);
    setEditingTour(null);

    setTimeout(() => {
      setSaveSuccessMsg(null);
    }, 4000);
  };

  // Cambiar contraseña y persistir en Cloudflare D1
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);

    if (newPassword.length < 4) {
      setPwdMsg({ type: 'error', text: 'La nueva contraseña debe tener al menos 4 caracteres.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwdMsg({ type: 'error', text: 'Las contraseñas no coinciden. Por favor verifícalas.' });
      return;
    }

    setPwdLoading(true);
    try {
      const res = await updateAdminPassword(newPassword);
      if (res.success) {
        setPwdMsg({ type: 'success', text: res.message });
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPwdMsg({ type: 'error', text: res.message });
      }
    } catch {
      setPwdMsg({ type: 'error', text: 'Error de red al actualizar la contraseña.' });
    } finally {
      setPwdLoading(false);
    }
  };

  // Plantilla para nuevo paquete en blanco
  const handleStartCreatePackage = () => {
    const newId = `paquete-${Date.now().toString(36)}`;
    setEditingPackage({
      id: newId,
      title: 'Nuevo Paquete Amazónico',
      titleEn: 'New Amazonian Package',
      badge: 'TODO INCLUIDO',
      badgeEn: 'ALL INCLUSIVE',
      duration: '3 Días / 2 Noches',
      durationEn: '3 Days / 2 Nights',
      difficulty: 'Fácil / Familiar',
      difficultyEn: 'Easy / Family',
      departure: 'Salidas diarias',
      departureEn: 'Daily departures',
      desc: 'Descripción detallada de la aventura por la selva amazónica...',
      descEn: 'Detailed description of the jungle adventure...',
      priceFrom: 160,
      image: DEFAULT_FALLBACK_IMAGE,
      includes: ['Hospedaje en eco-lodge', 'Alimentación completa', 'Guía certificado', 'Equipamiento'],
      includesEn: ['Eco-lodge accommodation', 'Full meals', 'Certified guide', 'Safety gear'],
      itinerary: [
        {
          day: 'Día 1',
          title: 'Recepción & Selva',
          desc: 'Bienvenida en Tena y primer recorrido por la naturaleza.',
          activities: ['Check-in', 'Almuerzo típico', 'Caminata guiada'],
        },
      ],
    });
    setIsCreatingPackage(true);
  };

  // Plantilla para nuevo tour en cuadrón
  const handleStartCreateTour = () => {
    const newId = `tour-${Date.now().toString(36)}`;
    setEditingTour({
      id: newId,
      circuitNum: `CIRCUITO 0${tours.length + 1} • NUEVA RUTA`,
      category: 'popular',
      categoryLabel: 'Aventura en Cuadrón',
      categoryLabelEn: 'ATV Quad Adventure',
      badge: 'TOUR DISPONIBLE',
      badgeEn: 'TOUR AVAILABLE',
      title: 'Nuevo Circuito en Cuadrón',
      titleEn: 'New Quad Circuit Tour',
      duration: '3 Horas',
      durationEn: '3 Hours',
      difficulty: 'Principiante',
      difficultyEn: 'Beginner',
      desc: 'Travesía en cuadrón entre ríos, senderos de selva y pozas cristalinas...',
      descEn: 'ATV route through rivers, jungle paths and pristine pools...',
      singlePrice: 50,
      doublePrice: 75,
      specs: {
        distance: '20 KM',
        waterCrossings: '2 Vados',
        terrain: 'Grava / Selva',
        power: '500 CC',
        mudLevel: 'Medio',
        traction: '4WD',
        elevation: '+200 M',
        schedule: '09:00 AM & 14:00 PM',
      },
      includes: ['Cuadrón automático', 'Casco y gafas', 'Guía nativo', 'Pista de práctica'],
      includesEn: ['Automatic quad bike', 'Helmet and goggles', 'Native guide', 'Practice track'],
      image: DEFAULT_FALLBACK_IMAGE,
    });
    setIsCreatingTour(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-carbon-950 border border-jungle-700/80 rounded-3xl shadow-2xl flex flex-col text-ivory-200 overflow-hidden">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-jungle-800 flex items-center justify-between shrink-0 bg-carbon-900/90">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-flame-500/15 border border-flame-500/30 flex items-center justify-center text-flame-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-flame-400 uppercase tracking-widest font-display">
                  Tena Travel Expeditions
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 ${
                  dbStatus === 'connected' ? 'bg-emerald-950/80 border border-emerald-700/80 text-emerald-400' : 'bg-cyan-950/80 border border-cyan-700/80 text-cyan-300'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${dbStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
                  <span>{dbStatus === 'connected' ? 'Cloudflare D1 Activo' : 'Guardado Directo Activo'}</span>
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-ivory-100 uppercase tracking-tight font-display">
                Administración de Catálogo
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                logoutAdmin();
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl border border-red-800/80 bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-bold font-display uppercase tracking-wider transition cursor-pointer"
            >
              Cerrar Sesión
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-ivory-400 hover:text-white hover:bg-carbon-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Save Success Notification */}
        {saveSuccessMsg && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs flex items-center space-x-2 animate-fadeIn shrink-0">
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
            <span className="font-semibold">{saveSuccessMsg}</span>
          </div>
        )}

        {/* Tab Navigation (Solo 3 pestañas limpias) */}
        <div className="flex border-b border-jungle-800 bg-carbon-900/50 px-6 shrink-0 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('multiday');
              setEditingPackage(null);
              setIsCreatingPackage(false);
            }}
            className={`py-3.5 px-4 font-display text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'multiday'
                ? 'border-flame-500 text-flame-400'
                : 'border-transparent text-ivory-400 hover:text-ivory-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Paquetes Multidía ({packages.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('atv');
              setEditingTour(null);
              setIsCreatingTour(false);
            }}
            className={`py-3.5 px-4 font-display text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'atv'
                ? 'border-flame-500 text-flame-400'
                : 'border-transparent text-ivory-400 hover:text-ivory-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Circuitos en Cuadrones ({tours.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-3.5 px-4 font-display text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-flame-500 text-flame-400'
                : 'border-transparent text-ivory-400 hover:text-ivory-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Seguridad & Acceso</span>
          </button>
        </div>

        {/* Modal Body / Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          
          {/* ======================================================== */}
          {/* TAB 1: PAQUETES MULTIDÍA */}
          {/* ======================================================== */}
          {activeTab === 'multiday' && (
            <div>
              {editingPackage ? (
                /* Formulario de Edición o Creación de Paquete */
                <form onSubmit={handleSavePackage} className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-jungle-800">
                    <h3 className="text-lg font-black text-ivory-100 uppercase font-display">
                      {isCreatingPackage ? 'Nuevo Paquete Multidía' : `Editar: ${editingPackage.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPackage(null);
                        setIsCreatingPackage(false);
                      }}
                      className="text-xs text-ivory-400 hover:text-white uppercase font-bold font-display"
                    >
                      Volver a la lista
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">Título (Español)</label>
                      <input
                        type="text"
                        value={editingPackage.title}
                        onChange={(e) => setEditingPackage({ ...editingPackage, title: e.target.value })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">Título (Inglés)</label>
                      <input
                        type="text"
                        value={editingPackage.titleEn}
                        onChange={(e) => setEditingPackage({ ...editingPackage, titleEn: e.target.value })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">Precio Desde (USD)</label>
                      <input
                        type="number"
                        min="1"
                        value={editingPackage.priceFrom}
                        onChange={(e) => setEditingPackage({ ...editingPackage, priceFrom: Number(e.target.value) })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">Duración (Español)</label>
                      <input
                        type="text"
                        value={editingPackage.duration}
                        onChange={(e) => setEditingPackage({ ...editingPackage, duration: e.target.value })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">Insignia / Badge</label>
                      <input
                        type="text"
                        value={editingPackage.badge}
                        onChange={(e) => setEditingPackage({ ...editingPackage, badge: e.target.value })}
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">URL de Imagen Principal</label>
                    <input
                      type="url"
                      value={editingPackage.image}
                      onChange={(e) => setEditingPackage({ ...editingPackage, image: e.target.value })}
                      required
                      placeholder="https://..."
                      className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100 font-mono"
                    />
                    <div className="mt-2 relative h-36 w-full max-w-sm rounded-xl overflow-hidden border border-jungle-700 bg-carbon-900">
                      <img
                        src={editingPackage.image || DEFAULT_FALLBACK_IMAGE}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = DEFAULT_FALLBACK_IMAGE;
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">Descripción (Español)</label>
                    <textarea
                      rows={3}
                      value={editingPackage.desc}
                      onChange={(e) => setEditingPackage({ ...editingPackage, desc: e.target.value })}
                      required
                      className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-jungle-800">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPackage(null);
                        setIsCreatingPackage(false);
                      }}
                      className="px-5 py-2.5 rounded-xl border border-jungle-700 bg-carbon-800 text-ivory-300 font-bold text-xs uppercase"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs uppercase tracking-wider font-display flex items-center space-x-2 shadow-lg shadow-flame-600/30 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar en la Base de Datos</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Listado de Paquetes con Botón Nuevo */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-ivory-100 uppercase font-display">
                        Catálogo de Paquetes Multidía
                      </h3>
                      <p className="text-xs text-ivory-400">
                        Cualquier cambio se guarda inmediatamente en vivo para todos los visitantes.
                      </p>
                    </div>
                    <button
                      onClick={handleStartCreatePackage}
                      className="px-4 py-2 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs uppercase tracking-wider font-display flex items-center space-x-1.5 shadow-lg shadow-flame-600/30 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nuevo Paquete</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="p-4 rounded-2xl bg-carbon-900 border border-jungle-800 hover:border-flame-500/50 transition flex flex-col justify-between"
                      >
                        <div className="flex space-x-3">
                          <img
                            src={pkg.image || DEFAULT_FALLBACK_IMAGE}
                            alt={pkg.title}
                            className="w-20 h-20 rounded-xl object-cover border border-jungle-700 shrink-0"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = DEFAULT_FALLBACK_IMAGE;
                            }}
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-flame-400 uppercase tracking-widest font-display block">
                              {pkg.duration}
                            </span>
                            <h4 className="text-sm font-black text-ivory-100 truncate font-display">
                              {pkg.title}
                            </h4>
                            <span className="text-xs font-bold text-emerald-400 block mt-1">
                              ${pkg.priceFrom} <span className="text-[10px] text-ivory-400">USD</span>
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-jungle-800 flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setEditingPackage(pkg);
                              setIsCreatingPackage(false);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-carbon-800 hover:bg-carbon-700 text-ivory-200 text-xs font-bold font-display uppercase tracking-wider border border-jungle-700 flex items-center space-x-1 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Editar</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar paquete "${pkg.title}" del catálogo?`)) {
                                deletePackage(pkg.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/80 cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: CIRCUITOS EN CUADRONES */}
          {/* ======================================================== */}
          {activeTab === 'atv' && (
            <div>
              {editingTour ? (
                /* Formulario de Edición o Creación de Tour */
                <form onSubmit={handleSaveTour} className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-jungle-800">
                    <h3 className="text-lg font-black text-ivory-100 uppercase font-display">
                      {isCreatingTour ? 'Nuevo Circuito en Cuadrón' : `Editar: ${editingTour.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTour(null);
                        setIsCreatingTour(false);
                      }}
                      className="text-xs text-ivory-400 hover:text-white uppercase font-bold font-display"
                    >
                      Volver a la lista
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">Título del Tour (Español)</label>
                      <input
                        type="text"
                        value={editingTour.title}
                        onChange={(e) => setEditingTour({ ...editingTour, title: e.target.value })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">Número de Circuito</label>
                      <input
                        type="text"
                        value={editingTour.circuitNum}
                        onChange={(e) => setEditingTour({ ...editingTour, circuitNum: e.target.value })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">Precio Cuadrón Individual ($)</label>
                      <input
                        type="number"
                        min="1"
                        value={editingTour.singlePrice}
                        onChange={(e) => setEditingTour({ ...editingTour, singlePrice: Number(e.target.value) })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">Precio Cuadrón Doble ($)</label>
                      <input
                        type="number"
                        min="1"
                        value={editingTour.doublePrice}
                        onChange={(e) => setEditingTour({ ...editingTour, doublePrice: Number(e.target.value) })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">Duración</label>
                      <input
                        type="text"
                        value={editingTour.duration}
                        onChange={(e) => setEditingTour({ ...editingTour, duration: e.target.value })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">URL de Imagen</label>
                    <input
                      type="url"
                      value={editingTour.image}
                      onChange={(e) => setEditingTour({ ...editingTour, image: e.target.value })}
                      required
                      placeholder="https://..."
                      className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100 font-mono"
                    />
                    <div className="mt-2 relative h-36 w-full max-w-sm rounded-xl overflow-hidden border border-jungle-700 bg-carbon-900">
                      <img
                        src={editingTour.image || DEFAULT_FALLBACK_IMAGE}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = DEFAULT_FALLBACK_IMAGE;
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">Descripción (Español)</label>
                    <textarea
                      rows={3}
                      value={editingTour.desc}
                      onChange={(e) => setEditingTour({ ...editingTour, desc: e.target.value })}
                      required
                      className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-jungle-800">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTour(null);
                        setIsCreatingTour(false);
                      }}
                      className="px-5 py-2.5 rounded-xl border border-jungle-700 bg-carbon-800 text-ivory-300 font-bold text-xs uppercase"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs uppercase tracking-wider font-display flex items-center space-x-2 shadow-lg shadow-flame-600/30 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar Tour en la Base de Datos</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Listado de Tours en Cuadrones con Botón Nuevo */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-ivory-100 uppercase font-display">
                        Catálogo de Tours Diarios en Cuadrones
                      </h3>
                      <p className="text-xs text-ivory-400">
                        Edita tarifas o crea nuevos circuitos de aventura directamente en red.
                      </p>
                    </div>
                    <button
                      onClick={handleStartCreateTour}
                      className="px-4 py-2 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs uppercase tracking-wider font-display flex items-center space-x-1.5 shadow-lg shadow-flame-600/30 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nuevo Tour</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {tours.map((tour) => (
                      <div
                        key={tour.id}
                        className="p-4 rounded-2xl bg-carbon-900 border border-jungle-800 hover:border-flame-500/50 transition flex flex-col justify-between"
                      >
                        <div className="flex space-x-3">
                          <img
                            src={tour.image || DEFAULT_FALLBACK_IMAGE}
                            alt={tour.title}
                            className="w-20 h-20 rounded-xl object-cover border border-jungle-700 shrink-0"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = DEFAULT_FALLBACK_IMAGE;
                            }}
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-flame-400 uppercase tracking-widest font-display block">
                              {tour.circuitNum}
                            </span>
                            <h4 className="text-sm font-black text-ivory-100 truncate font-display">
                              {tour.title}
                            </h4>
                            <span className="text-xs font-bold text-emerald-400 block mt-1">
                              ${tour.singlePrice} / ${tour.doublePrice} <span className="text-[10px] text-ivory-400">USD</span>
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-jungle-800 flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setEditingTour(tour);
                              setIsCreatingTour(false);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-carbon-800 hover:bg-carbon-700 text-ivory-200 text-xs font-bold font-display uppercase tracking-wider border border-jungle-700 flex items-center space-x-1 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Editar</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar circuito "${tour.title}" del catálogo?`)) {
                                deleteTour(tour.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/80 cursor-pointer"
                            title="Eliminar circuito"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: SEGURIDAD & ACCESO A LA BASE DE DATOS */}
          {/* ======================================================== */}
          {activeTab === 'security' && (
            <div className="max-w-2xl mx-auto space-y-6 py-2">
              
              {/* Status Banner */}
              <div className="p-4 rounded-2xl bg-carbon-900 border border-jungle-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-bold text-emerald-400 uppercase font-display tracking-wider">
                        Sincronización Automática Activa
                      </span>
                    </div>
                    <p className="text-xs text-ivory-400 mt-0.5">
                      Tus cambios en tarifas y tours se guardan automáticamente en la nube sin necesidad de pasos técnicos ni comandos SQL.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 1: Clave Editable de Administrador (Cloudflare D1) */}
              <div className="p-6 rounded-2xl bg-carbon-900 border border-jungle-800 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-flame-500/15 border border-flame-500/30 flex items-center justify-center text-flame-400 shrink-0">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ivory-100 uppercase font-display">
                      Clave de Administrador en la Nube
                    </h3>
                    <p className="text-xs text-ivory-400 mt-0.5 leading-relaxed">
                      Esta contraseña se guarda directamente en la base de datos de Cloudflare. Al cambiarla, podrás ingresar a editar la página desde tu celular, tablet o cualquier computador en cualquier parte del mundo.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Mínimo 4 caracteres"
                        className="w-full bg-carbon-950 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Confirmar Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Repite la contraseña"
                        className="w-full bg-carbon-950 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                      />
                    </div>
                  </div>

                  {pwdMsg && (
                    <div
                      className={`p-3.5 rounded-xl text-xs flex items-center space-x-2 animate-fadeIn ${
                        pwdMsg.type === 'error'
                          ? 'bg-red-950/70 border border-red-800 text-red-300'
                          : 'bg-emerald-950/70 border border-emerald-800 text-emerald-300'
                      }`}
                    >
                      {pwdMsg.type === 'error' ? (
                        <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                      ) : (
                        <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                      )}
                      <span>{pwdMsg.text}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={pwdLoading}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs uppercase tracking-wider font-display transition shadow-lg shadow-flame-600/30 cursor-pointer disabled:opacity-50"
                    >
                      {pwdLoading ? 'Guardando en Cloudflare...' : 'Guardar Nueva Clave en la Nube'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        resetAdminPassword();
                        setNewPassword('');
                        setConfirmPassword('');
                        setPwdMsg({ type: 'success', text: 'Contraseña restablecida localmente a "tena2025".' });
                      }}
                      className="text-xs text-ivory-400 hover:text-flame-300 underline cursor-pointer"
                    >
                      Restablecer a inicial (tena2025)
                    </button>
                  </div>
                </form>
              </div>

              {/* Card 2: Clave Maestra de Respaldo Permanente (Solo Propietario) */}
              <div className="p-6 rounded-2xl bg-carbon-900 border border-amber-500/40 space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ivory-100 uppercase font-display flex items-center space-x-2">
                      <span>Clave Maestra de Respaldo Permanente</span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">
                        INMUTABLE
                      </span>
                    </h3>
                    <p className="text-xs text-ivory-300 mt-1 leading-relaxed">
                      Esta clave especial está programada en el núcleo del sistema y <strong>nunca cambia ni se borra</strong>. Si alguna vez olvidas la contraseña principal o alguien la modifica, puedes usar esta clave en cualquier momento para ingresar como Super-Administrador desde cualquier dispositivo.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-carbon-950 border border-jungle-800 flex items-center justify-between">
                  <span className="text-xs text-ivory-400">Tu Clave de Respaldo Oficial:</span>
                  <code className="text-amber-400 font-bold bg-carbon-900 px-3 py-1 rounded-lg border border-jungle-700 font-mono text-sm tracking-wider">
                    TenaRespaldo2025
                  </code>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
