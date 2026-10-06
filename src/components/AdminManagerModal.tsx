import React, { useState } from 'react';
import { useCatalog, CloudflareConfig } from '../context/CatalogContext';
import { MultiDayPackage, DailyQuadTour, DayItinerary } from '../data/toursData';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Database,
  Check,
  Copy,
  CheckCheck,
  RefreshCw,
  Lock,
  Compass,
  Zap,
  Save,
  AlertCircle,
  ExternalLink,
  Layers,
} from 'lucide-react';

interface AdminManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'multiday' | 'atv' | 'cloudflare' | 'security';
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
    cloudflareConfig,
    updatePackage,
    addPackage,
    deletePackage,
    updateTour,
    addTour,
    deleteTour,
    updateAdminPassword,
    updateCloudflareConfig,
    resetToDefaults,
    generateSQL,
    syncWithCloudflareD1,
    logoutAdmin,
  } = useCatalog();

  const [activeTab, setActiveTab] = useState<'multiday' | 'atv' | 'cloudflare' | 'security'>(defaultTab);

  // Edit states for MultiDay Packages
  const [editingPackage, setEditingPackage] = useState<MultiDayPackage | null>(() => {
    if (initialEditPackageId) {
      return packages.find((p) => p.id === initialEditPackageId) || null;
    }
    return null;
  });
  const [isCreatingPackage, setIsCreatingPackage] = useState(false);

  // Edit states for ATV Tours
  const [editingTour, setEditingTour] = useState<DailyQuadTour | null>(() => {
    if (initialEditTourId) {
      return tours.find((t) => t.id === initialEditTourId) || null;
    }
    return null;
  });
  const [isCreatingTour, setIsCreatingTour] = useState(false);

  // Cloudflare and Password states
  const [cfForm, setCfForm] = useState<CloudflareConfig>(cloudflareConfig);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // SQL & Sync feedback
  const [copiedSql, setCopiedSql] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ loading: boolean; msg?: string; error?: boolean } | null>(null);

  if (!isOpen) return null;

  // Handler for saving package
  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;
    if (isCreatingPackage) {
      addPackage(editingPackage);
    } else {
      updatePackage(editingPackage);
    }
    setIsCreatingPackage(false);
    setEditingPackage(null);
  };

  // Handler for saving tour
  const handleSaveTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTour) return;
    if (isCreatingTour) {
      addTour(editingTour);
    } else {
      updateTour(editingTour);
    }
    setIsCreatingTour(false);
    setEditingTour(null);
  };

  // Copy SQL
  const handleCopySql = () => {
    const sql = generateSQL();
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  // Sync to Cloudflare D1
  const handleCloudflareSync = async () => {
    updateCloudflareConfig(cfForm);
    setSyncStatus({ loading: true });
    try {
      const res = await syncWithCloudflareD1();
      setSyncStatus({ loading: false, msg: res.message, error: !res.success });
    } catch {
      setSyncStatus({ loading: false, msg: 'Error de conexión con la red de Cloudflare.', error: true });
    }
  };

  // Change password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      setPwdMsg({ type: 'error', text: 'La contraseña debe tener al menos 4 caracteres.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdMsg({ type: 'error', text: 'Las contraseñas no coinciden.' });
      return;
    }
    updateAdminPassword(newPassword);
    setPwdMsg({ type: 'success', text: 'Contraseña actualizada con éxito.' });
    setNewPassword('');
    setConfirmPassword('');
  };

  // Template for blank new package
  const handleStartCreatePackage = () => {
    const newId = `paquete-${Date.now().toString(36)}`;
    setEditingPackage({
      id: newId,
      title: 'Nuevo Paquete Amazónico',
      titleEn: 'New Amazonian Package',
      badge: 'NUEVO PAQUETE · TODO INCLUIDO',
      badgeEn: 'NEW PACKAGE · ALL INCLUSIVE',
      duration: '3 Días / 2 Noches',
      durationEn: '3 Days / 2 Nights',
      difficulty: 'Todo Público',
      difficultyEn: 'All Audiences',
      departure: 'Salidas diarias',
      departureEn: 'Daily departures',
      desc: 'Descripción detallada de la nueva experiencia en Tena...',
      descEn: 'Detailed description of the new experience in Tena...',
      priceFrom: 160,
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      includes: [
        'Hospedaje en eco-lodge seleccionado',
        'Tour en Cuadrones por selva y ríos',
        'Alimentación completa tradicional',
        'Guía nativo certificado bilingüe',
      ],
      includesEn: [
        'Lodging at selected eco-lodge',
        'Quad tour across jungle and rivers',
        'Full typical meals included',
        'Wilderness-certified bilingual guide',
      ],
      itinerary: [
        {
          day: 'Día 1',
          title: 'Llegada y bienvenida en Tena',
          desc: 'Recepción, check-in en lodge y caminata suave de aclimatación.',
          activities: ['Recepción', 'Almuerzo típico', 'Paseo guiado'],
        },
        {
          day: 'Día 2',
          title: 'Ruta a Cascada Escondida',
          desc: 'Expedición en cuadrón por senderos y baño en pozas de agua esmeralda.',
          activities: ['Pista de práctica', 'Caravana en cuadrón', 'Cascada natural'],
        },
      ],
    });
    setIsCreatingPackage(true);
  };

  // Template for blank new tour
  const handleStartCreateTour = () => {
    const newId = `circuito-${Date.now().toString(36)}`;
    setEditingTour({
      id: newId,
      circuitNum: 'CIRCUITO 04 • SELVA & RÍO',
      category: 'popular',
      categoryLabel: 'Ruta Panorámica',
      categoryLabelEn: 'Scenic Route',
      badge: 'NUEVO CIRCUITO',
      badgeEn: 'NEW CIRCUIT',
      title: 'Nuevo Circuito en Cuadrón',
      titleEn: 'New ATV Quad Circuit',
      duration: '2.5 Horas',
      durationEn: '2.5 Hours',
      difficulty: 'Principiante / Intermedio',
      difficultyEn: 'Beginner / Intermediate',
      desc: 'Recorrido todoterreno por senderos de selva virgen con cruce de aguas cristalinas.',
      descEn: 'Off-road quad ride across pristine jungle trails and clear water crossings.',
      singlePrice: 50,
      doublePrice: 75,
      specs: {
        distance: '20 KM',
        waterCrossings: '2 VADOS',
        terrain: 'GRAVA / TIERRA',
        power: '420 CC',
        mudLevel: 'MODERADO',
        traction: 'SELECTIVA',
        elevation: '+450 M',
        schedule: '09:00 AM & 14:00 PM',
      },
      includes: [
        'Cuadrón 100% automático',
        'Casco homologado y gafas',
        'Pista de práctica de 15 minutos previa',
        'Guía nativo permanente',
      ],
      includesEn: [
        '100% automatic ATV quad',
        'Certified helmet and goggles',
        '15-min prior induction test track',
        'Full-time native lead guide',
      ],
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    });
    setIsCreatingTour(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-carbon-950 border border-jungle-700 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto text-ivory-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-jungle-800 bg-carbon-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-flame-500/20 border border-flame-500/40 flex items-center justify-center text-flame-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-flame-400 uppercase tracking-widest font-display">
                  Tena Travel Expeditions
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 border border-emerald-700/60 text-emerald-400 uppercase">
                  D1 Cloudflare Activo
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-ivory-100 uppercase tracking-tight font-display">
                Administración de Catálogo & Base de Datos
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
              className="p-2 rounded-xl text-ivory-400 hover:text-white bg-carbon-800 hover:bg-carbon-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-jungle-800 bg-carbon-900/60 px-4 sm:px-6 overflow-x-auto">
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
            onClick={() => setActiveTab('cloudflare')}
            className={`py-3.5 px-4 font-display text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'cloudflare'
                ? 'border-flame-500 text-flame-400'
                : 'border-transparent text-ivory-400 hover:text-ivory-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Cloudflare D1 & SQL en Red</span>
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
            <span>Seguridad & Clave</span>
          </button>
        </div>

        {/* Modal Body / Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: PAQUETES MULTIDÍA */}
          {activeTab === 'multiday' && (
            <div>
              {editingPackage ? (
                /* Form for Editing or Creating a Package */
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
                      className="text-xs text-ivory-400 hover:text-white px-3 py-1.5 rounded-lg bg-carbon-800 border border-jungle-700 cursor-pointer"
                    >
                      Volver a la lista
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Título en Español
                      </label>
                      <input
                        type="text"
                        value={editingPackage.title}
                        onChange={(e) => setEditingPackage({ ...editingPackage, title: e.target.value })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Título en Inglés
                      </label>
                      <input
                        type="text"
                        value={editingPackage.titleEn}
                        onChange={(e) => setEditingPackage({ ...editingPackage, titleEn: e.target.value })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Precio Desde ($ USD por persona)
                      </label>
                      <input
                        type="number"
                        step="1"
                        min="1"
                        value={editingPackage.priceFrom}
                        onChange={(e) => setEditingPackage({ ...editingPackage, priceFrom: parseFloat(e.target.value) || 0 })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Duración (ej. 3 Días / 2 Noches)
                      </label>
                      <input
                        type="text"
                        value={editingPackage.duration}
                        onChange={(e) => setEditingPackage({ ...editingPackage, duration: e.target.value })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Badge Superior (ej. TODO INCLUIDO)
                      </label>
                      <input
                        type="text"
                        value={editingPackage.badge}
                        onChange={(e) => setEditingPackage({ ...editingPackage, badge: e.target.value })}
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Badge de Descuento (ej. -15% para grupos)
                      </label>
                      <input
                        type="text"
                        value={editingPackage.discountBadge || ''}
                        onChange={(e) => setEditingPackage({ ...editingPackage, discountBadge: e.target.value })}
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        URL de Imagen del Paquete
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={editingPackage.image}
                          onChange={(e) => setEditingPackage({ ...editingPackage, image: e.target.value })}
                          required
                          className="flex-1 bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100"
                        />
                        <div className="w-12 h-10 rounded-lg overflow-hidden border border-jungle-700 bg-carbon-900 shrink-0">
                          <img src={editingPackage.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Descripción en Español
                      </label>
                      <textarea
                        rows={3}
                        value={editingPackage.desc}
                        onChange={(e) => setEditingPackage({ ...editingPackage, desc: e.target.value })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl p-3 text-sm text-ivory-100"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Inclusiones (Separadas por comas o saltos de línea)
                      </label>
                      <textarea
                        rows={3}
                        value={editingPackage.includes.join('\n')}
                        onChange={(e) =>
                          setEditingPackage({
                            ...editingPackage,
                            includes: e.target.value.split('\n').filter((s) => s.trim().length > 0),
                          })
                        }
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl p-3 text-sm text-ivory-100"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-3 pt-2 border-t border-jungle-800">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-flame-400 uppercase tracking-wider font-display">
                          Itinerario Día por Día ({editingPackage.itinerary.length} Días)
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const dayNum = editingPackage.itinerary.length + 1;
                            setEditingPackage({
                              ...editingPackage,
                              itinerary: [
                                ...editingPackage.itinerary,
                                {
                                  day: `Día ${dayNum}`,
                                  title: `Actividades Día ${dayNum}`,
                                  desc: `Descripción del día ${dayNum}...`,
                                  activities: ['Actividad 1', 'Actividad 2'],
                                },
                              ],
                            });
                          }}
                          className="px-2.5 py-1 rounded bg-carbon-800 hover:bg-carbon-700 text-ivory-200 border border-jungle-700 text-[11px] font-bold font-display uppercase tracking-wider cursor-pointer"
                        >
                          + Agregar Día
                        </button>
                      </div>

                      {editingPackage.itinerary.map((dayItem, dIdx) => (
                        <div key={dIdx} className="p-3 bg-carbon-850 border border-jungle-800 rounded-xl space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={dayItem.day}
                              onChange={(e) => {
                                const newItin = [...editingPackage.itinerary];
                                newItin[dIdx] = { ...newItin[dIdx], day: e.target.value };
                                setEditingPackage({ ...editingPackage, itinerary: newItin });
                              }}
                              className="w-24 bg-carbon-900 border border-jungle-700 rounded-lg px-2 py-1 text-xs text-emerald-400 font-bold"
                            />
                            <input
                              type="text"
                              value={dayItem.title}
                              placeholder="Título del día..."
                              onChange={(e) => {
                                const newItin = [...editingPackage.itinerary];
                                newItin[dIdx] = { ...newItin[dIdx], title: e.target.value };
                                setEditingPackage({ ...editingPackage, itinerary: newItin });
                              }}
                              className="flex-1 bg-carbon-900 border border-jungle-700 rounded-lg px-2 py-1 text-xs text-ivory-100 font-bold"
                            />
                            {editingPackage.itinerary.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newItin = editingPackage.itinerary.filter((_, idx) => idx !== dIdx);
                                  setEditingPackage({ ...editingPackage, itinerary: newItin });
                                }}
                                className="p-1 rounded text-red-400 hover:bg-red-950/60 cursor-pointer"
                                title="Eliminar día"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                          <textarea
                            rows={2}
                            value={dayItem.desc}
                            placeholder="Descripción de la jornada..."
                            onChange={(e) => {
                              const newItin = [...editingPackage.itinerary];
                              newItin[dIdx] = { ...newItin[dIdx], desc: e.target.value };
                              setEditingPackage({ ...editingPackage, itinerary: newItin });
                            }}
                            className="w-full bg-carbon-900 border border-jungle-700 rounded-lg p-2 text-xs text-ivory-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-jungle-800 flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPackage(null);
                        setIsCreatingPackage(false);
                      }}
                      className="px-5 py-2.5 rounded-xl border border-jungle-700 bg-carbon-800 text-ivory-300 font-bold text-xs uppercase font-display cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs uppercase tracking-wider font-display flex items-center space-x-2 shadow-lg shadow-flame-600/30 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar Cambios</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* List of Packages */
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-ivory-100 font-display uppercase">
                        Catálogo de Paquetes Multidía (Cloudflare D1)
                      </h3>
                      <p className="text-xs text-ivory-400">
                        Edita tarifas, descripciones o crea nuevas expediciones todo incluido.
                      </p>
                    </div>
                    <button
                      onClick={handleStartCreatePackage}
                      className="px-4 py-2 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs uppercase tracking-wider font-display flex items-center space-x-1.5 shadow-lg shadow-flame-600/25 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nuevo Paquete</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="bg-carbon-900 border border-jungle-800 rounded-2xl p-4 flex flex-col justify-between hover:border-flame-500/50 transition"
                      >
                        <div className="flex space-x-3">
                          <img
                            src={pkg.image}
                            alt={pkg.title}
                            className="w-20 h-20 rounded-xl object-cover border border-jungle-700 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] text-flame-400 font-bold uppercase font-display block truncate">
                              {pkg.duration}
                            </span>
                            <h4 className="text-sm font-bold text-ivory-100 font-display truncate">
                              {pkg.title}
                            </h4>
                            <span className="text-base font-black text-ivory-100 font-display mt-1 block">
                              ${pkg.priceFrom}{' '}
                              <span className="text-[11px] font-normal text-ivory-400">USD</span>
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-jungle-800/80 flex items-center justify-end space-x-2">
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
                            title="Eliminar paquete"
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

          {/* TAB 2: CIRCUITOS EN CUADRÓN */}
          {activeTab === 'atv' && (
            <div>
              {editingTour ? (
                /* Form for Editing or Creating an ATV Tour */
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
                      className="text-xs text-ivory-400 hover:text-white px-3 py-1.5 rounded-lg bg-carbon-800 border border-jungle-700 cursor-pointer"
                    >
                      Volver a la lista
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Título en Español
                      </label>
                      <input
                        type="text"
                        value={editingTour.title}
                        onChange={(e) => setEditingTour({ ...editingTour, title: e.target.value })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Número / Etiqueta de Circuito
                      </label>
                      <input
                        type="text"
                        value={editingTour.circuitNum}
                        onChange={(e) => setEditingTour({ ...editingTour, circuitNum: e.target.value })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Categoría
                      </label>
                      <select
                        value={editingTour.category}
                        onChange={(e) => setEditingTour({ ...editingTour, category: e.target.value as any })}
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100"
                      >
                        <option value="popular">Cascadas & Baño Natural</option>
                        <option value="extrema">Barro Extremo</option>
                        <option value="scenic">Miradores & Ocaso</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Precio Piloto Individual ($ USD)
                      </label>
                      <input
                        type="number"
                        step="1"
                        min="1"
                        value={editingTour.singlePrice}
                        onChange={(e) => setEditingTour({ ...editingTour, singlePrice: parseFloat(e.target.value) || 0 })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Precio Biplaza / 2 Pasajeros ($ USD)
                      </label>
                      <input
                        type="number"
                        step="1"
                        min="1"
                        value={editingTour.doublePrice}
                        onChange={(e) => setEditingTour({ ...editingTour, doublePrice: parseFloat(e.target.value) || 0 })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100 font-bold text-flame-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Duración (ej. 3 Horas)
                      </label>
                      <input
                        type="text"
                        value={editingTour.duration}
                        onChange={(e) => setEditingTour({ ...editingTour, duration: e.target.value })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Distancia (ej. 24 KM)
                      </label>
                      <input
                        type="text"
                        value={editingTour.specs.distance}
                        onChange={(e) =>
                          setEditingTour({
                            ...editingTour,
                            specs: { ...editingTour.specs, distance: e.target.value },
                          })
                        }
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Ríos / Vados (ej. 3 VADOS)
                      </label>
                      <input
                        type="text"
                        value={editingTour.specs.waterCrossings}
                        onChange={(e) =>
                          setEditingTour({
                            ...editingTour,
                            specs: { ...editingTour.specs, waterCrossings: e.target.value },
                          })
                        }
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Terreno (ej. GRAVA / LODO)
                      </label>
                      <input
                        type="text"
                        value={editingTour.specs.terrain}
                        onChange={(e) =>
                          setEditingTour({
                            ...editingTour,
                            specs: { ...editingTour.specs, terrain: e.target.value },
                          })
                        }
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100"
                      />
                    </div>

                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        URL de Imagen del Circuito
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={editingTour.image}
                          onChange={(e) => setEditingTour({ ...editingTour, image: e.target.value })}
                          required
                          className="flex-1 bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-3 py-2 text-sm text-ivory-100"
                        />
                        <div className="w-12 h-10 rounded-lg overflow-hidden border border-jungle-700 bg-carbon-900 shrink-0">
                          <img src={editingTour.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Descripción en Español
                      </label>
                      <textarea
                        rows={2}
                        value={editingTour.desc}
                        onChange={(e) => setEditingTour({ ...editingTour, desc: e.target.value })}
                        required
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl p-3 text-sm text-ivory-100"
                      />
                    </div>

                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="block text-xs font-bold text-ivory-300 uppercase mb-1">
                        Inclusiones del Circuito (Separadas por saltos de línea)
                      </label>
                      <textarea
                        rows={3}
                        value={editingTour.includes.join('\n')}
                        onChange={(e) =>
                          setEditingTour({
                            ...editingTour,
                            includes: e.target.value.split('\n').filter((s) => s.trim().length > 0),
                          })
                        }
                        className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl p-3 text-sm text-ivory-100"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-jungle-800 flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTour(null);
                        setIsCreatingTour(false);
                      }}
                      className="px-5 py-2.5 rounded-xl border border-jungle-700 bg-carbon-800 text-ivory-300 font-bold text-xs uppercase font-display cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs uppercase tracking-wider font-display flex items-center space-x-2 shadow-lg shadow-flame-600/30 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar Circuito</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* List of ATV Tours */
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-ivory-100 font-display uppercase">
                        Catálogo de Circuitos en Cuadrón (Cloudflare D1)
                      </h3>
                      <p className="text-xs text-ivory-400">
                        Edita precios individual/biplaza, kilómetros, vados y especificaciones técnicas.
                      </p>
                    </div>
                    <button
                      onClick={handleStartCreateTour}
                      className="px-4 py-2 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs uppercase tracking-wider font-display flex items-center space-x-1.5 shadow-lg shadow-flame-600/25 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nuevo Circuito</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tours.map((tour) => (
                      <div
                        key={tour.id}
                        className="bg-carbon-900 border border-jungle-800 rounded-2xl p-4 flex flex-col justify-between hover:border-flame-500/50 transition"
                      >
                        <div className="flex space-x-3">
                          <img
                            src={tour.image}
                            alt={tour.title}
                            className="w-20 h-20 rounded-xl object-cover border border-jungle-700 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] text-flame-400 font-bold uppercase font-display block truncate">
                              {tour.circuitNum}
                            </span>
                            <h4 className="text-sm font-bold text-ivory-100 font-display truncate">
                              {tour.title}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm font-black text-ivory-100 font-display">
                                1P: ${tour.singlePrice}
                              </span>
                              <span className="text-sm font-black text-flame-400 font-display">
                                2P: ${tour.doublePrice}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-jungle-800/80 flex items-center justify-end space-x-2">
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

          {/* TAB 3: CLOUDFLARE D1 & BASE DE DATOS EN RED */}
          {activeTab === 'cloudflare' && (
            <div className="space-y-6">
              <div className="p-4 sm:p-5 rounded-2xl bg-carbon-900 border border-jungle-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase text-emerald-400 font-display">
                      Motor Cloudflare D1 (SQLite Cloud)
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-ivory-100 font-display">
                    Tablas en Red: <code className="text-flame-400">paquetes_multidia</code>, <code className="text-flame-400">tours_cuadrones</code>, <code className="text-flame-400">admin_config</code>
                  </h4>
                  <p className="text-xs text-ivory-400 mt-1">
                    Los cambios realizados en los paneles se persisten en tiempo real y generan sentencias SQL ejecutables directamente en la consola de Cloudflare o a través de Cloudflare Workers API.
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={handleCopySql}
                    className="px-4 py-2.5 rounded-xl bg-carbon-800 hover:bg-carbon-700 text-ivory-100 border border-jungle-700 text-xs font-bold uppercase font-display flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    {copiedSql ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedSql ? '¡SQL Copiado!' : 'Copiar SQL para Cloudflare'}</span>
                  </button>
                </div>
              </div>

              {/* Cloudflare Connection Settings */}
              <div className="p-5 rounded-2xl bg-carbon-900 border border-jungle-800 space-y-4">
                <h4 className="text-sm font-bold uppercase text-ivory-100 font-display flex items-center space-x-2">
                  <Database className="w-4 h-4 text-flame-500" />
                  <span>Configuración de Conexión en Red (Cloudflare D1 / Worker)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-ivory-300 uppercase mb-1">
                      Cloudflare Account ID
                    </label>
                    <input
                      type="text"
                      placeholder="ej. a78f849b29e04bc5..."
                      value={cfForm.accountId}
                      onChange={(e) => setCfForm({ ...cfForm, accountId: e.target.value })}
                      className="w-full bg-carbon-950 border border-jungle-700 focus:border-flame-500 rounded-xl p-2.5 text-ivory-100"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-ivory-300 uppercase mb-1">
                      D1 Database ID / Name
                    </label>
                    <input
                      type="text"
                      placeholder="ej. tena-travel-d1-prod"
                      value={cfForm.databaseId}
                      onChange={(e) => setCfForm({ ...cfForm, databaseId: e.target.value })}
                      className="w-full bg-carbon-950 border border-jungle-700 focus:border-flame-500 rounded-xl p-2.5 text-ivory-100 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-ivory-300 uppercase mb-1">
                      Cloudflare API Token
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••••••••••"
                      value={cfForm.apiToken}
                      onChange={(e) => setCfForm({ ...cfForm, apiToken: e.target.value })}
                      className="w-full bg-carbon-950 border border-jungle-700 focus:border-flame-500 rounded-xl p-2.5 text-ivory-100"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-ivory-300 uppercase mb-1">
                      Worker Endpoint URL (Opcional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://tena-travel-d1.workers.dev"
                      value={cfForm.workerUrl}
                      onChange={(e) => setCfForm({ ...cfForm, workerUrl: e.target.value })}
                      className="w-full bg-carbon-950 border border-jungle-700 focus:border-flame-500 rounded-xl p-2.5 text-ivory-100 font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-3">
                  <button
                    onClick={handleCloudflareSync}
                    disabled={syncStatus?.loading}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-flame-600 hover:bg-flame-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider font-display flex items-center justify-center space-x-2 shadow-lg shadow-flame-600/30 cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${syncStatus?.loading ? 'animate-spin' : ''}`} />
                    <span>{syncStatus?.loading ? 'Sincronizando en Red...' : 'Sincronizar Ahora con Cloudflare D1'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('¿Restablecer catálogo a los valores iniciales de fábrica?')) {
                        resetToDefaults();
                        alert('Catálogo restablecido correctamente.');
                      }
                    }}
                    className="text-xs text-ivory-400 hover:text-red-400 underline cursor-pointer"
                  >
                    Restablecer datos originales de fábrica
                  </button>
                </div>

                {syncStatus?.msg && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
                      syncStatus.error
                        ? 'bg-red-950/60 border border-red-800 text-red-300'
                        : 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                    }`}
                  >
                    <Check className="w-4 h-4 shrink-0" />
                    <span>{syncStatus.msg}</span>
                  </div>
                )}
              </div>

              {/* Real-time SQL Viewer */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase text-ivory-300 font-display">
                    Sentencias SQL Generadas en Vivo (Cloudflare D1 Schema & Data)
                  </span>
                  <span className="text-ivory-500 text-[11px]">
                    Listo para ejecutar en Cloudflare Wrangler CLI o D1 Console
                  </span>
                </div>
                <pre className="p-4 rounded-2xl bg-carbon-900 border border-jungle-800 text-xs font-mono text-ivory-300 overflow-x-auto max-h-52 select-all">
                  {generateSQL()}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: SEGURIDAD & CONTRASEÑA */}
          {activeTab === 'security' && (
            <div className="max-w-md mx-auto space-y-6 py-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-flame-500/20 border border-flame-500/40 mx-auto flex items-center justify-center text-flame-400 mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-ivory-100 uppercase font-display">
                  Cambiar Contraseña de Administrador
                </h3>
                <p className="text-xs text-ivory-400 mt-1">
                  Esta clave protege la edición de los dos paneles y la base de datos de Cloudflare.
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
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
                    className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
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
                    className="w-full bg-carbon-900 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-2.5 text-sm text-ivory-100"
                  />
                </div>

                {pwdMsg && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
                      pwdMsg.type === 'error'
                        ? 'bg-red-950/60 border border-red-800 text-red-300'
                        : 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{pwdMsg.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs uppercase tracking-wider font-display transition shadow-lg shadow-flame-600/30 cursor-pointer"
                >
                  Actualizar Contraseña
                </button>
              </form>

              <div className="pt-6 border-t border-jungle-800 text-center">
                <button
                  onClick={() => {
                    logoutAdmin();
                    onClose();
                  }}
                  className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-wider font-display cursor-pointer"
                >
                  Cerrar Sesión de Administrador
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
