import React, { useState } from 'react';
import { useCatalog, MASTER_BACKUP_KEYS } from '../context/CatalogContext';
import { Lock, Eye, EyeOff, X, ShieldAlert, CheckCircle, Database, ShieldCheck, KeyRound } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  panelTitle?: string;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { loginAdmin } = useCatalog();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showBackupTip, setShowBackupTip] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError(false);

    try {
      const ok = await loginAdmin(password.trim());
      if (ok) {
        setError(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setPassword('');
          onSuccess();
          onClose();
        }, 500);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-carbon-900 border border-jungle-700/90 rounded-3xl shadow-2xl p-6 sm:p-8 text-ivory-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-ivory-400 hover:text-white transition p-1.5 rounded-xl hover:bg-carbon-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-flame-500/15 border border-flame-500/40 flex items-center justify-center text-flame-400 shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-flame-400 uppercase tracking-widest font-display flex items-center space-x-1">
              <Database className="w-3 h-3 inline" />
              <span>Base de Datos Segura</span>
            </span>
            <h3 className="text-xl font-black text-ivory-100 font-display uppercase tracking-tight">
              Panel de Administración
            </h3>
          </div>
        </div>

        <p className="text-xs text-ivory-300 mb-6 leading-relaxed">
          Ingresa tu contraseña para editar tarifas, descripciones, itinerarios y fotos. Los cambios se guardan directamente en la nube.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ivory-300 uppercase tracking-wider mb-2 font-display">
              Contraseña de Administrador
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Ingresa tu clave de acceso..."
                autoFocus
                required
                className="w-full bg-carbon-950 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-3 text-sm text-ivory-100 placeholder-ivory-500 focus:outline-none focus:ring-1 focus:ring-flame-500 transition pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-400 hover:text-ivory-200 p-1.5 cursor-pointer rounded-lg hover:bg-carbon-800"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs space-y-1.5 animate-fadeIn">
              <div className="flex items-center space-x-2 font-bold text-red-300">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>Contraseña no válida</span>
              </div>
              <p className="text-[11px] text-red-300/90 leading-snug">
                Si olvidaste la clave que cambiaste recientemente, puedes ingresar con tu <strong>Clave Maestra de Respaldo</strong>.
              </p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs flex items-center space-x-2 animate-fadeIn">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>¡Acceso autorizado! Cargando catálogo en vivo...</span>
            </div>
          )}

          {/* Discreet Help Toggle */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowBackupTip(!showBackupTip)}
              className="text-[11px] text-ivory-400 hover:text-flame-300 transition flex items-center space-x-1 cursor-pointer"
            >
              <KeyRound className="w-3 h-3 text-flame-400" />
              <span>¿No recuerdas la contraseña actual?</span>
            </button>

            {showBackupTip && (
              <div className="mt-2 p-3 rounded-xl bg-carbon-950 border border-jungle-800 text-[11px] text-ivory-300 leading-relaxed animate-fadeIn">
                <span className="text-flame-400 font-bold block mb-0.5">Clave de Respaldo del Propietario:</span>
                Puedes escribir directamente tu clave maestra de respaldo en el campo de arriba para recuperar el control inmediato desde cualquier dispositivo.
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-3 px-4 rounded-xl border border-jungle-700 bg-carbon-800 hover:bg-carbon-700 text-ivory-300 font-bold text-xs uppercase tracking-wider font-display transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 py-3 px-4 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs uppercase tracking-wider font-display transition shadow-lg shadow-flame-600/30 cursor-pointer disabled:opacity-60 flex items-center justify-center space-x-1.5"
            >
              {loading ? (
                <span>Validando...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 inline" />
                  <span>Ingresar</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
