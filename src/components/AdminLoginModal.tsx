import React, { useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { Lock, Eye, EyeOff, X, ShieldAlert, CheckCircle, Database } from 'lucide-react';

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
  panelTitle = 'Administrador de Catálogo & Cloudflare D1',
}) => {
  const { loginAdmin } = useCatalog();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setPassword('');
        onSuccess();
        onClose();
      }, 600);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-carbon-900 border border-jungle-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 text-ivory-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-ivory-400 hover:text-white transition p-1 rounded-lg hover:bg-carbon-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-flame-500/15 border border-flame-500/40 flex items-center justify-center text-flame-400 shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-flame-400 uppercase tracking-widest font-display flex items-center space-x-1">
              <Database className="w-3 h-3 inline" />
              <span>Base de Datos Cloudflare D1</span>
            </span>
            <h3 className="text-xl font-black text-ivory-100 font-display uppercase tracking-tight">
              Acceso Administrador
            </h3>
          </div>
        </div>

        <p className="text-xs text-ivory-300 mb-6 leading-relaxed">
          Ingresa la contraseña de administrador para editar precios, descripciones, itinerarios, fotos y sincronizar directamente con Cloudflare D1 en red.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ivory-300 uppercase tracking-wider mb-2 font-display">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Ingresa contraseña..."
                autoFocus
                className="w-full bg-carbon-950 border border-jungle-700 focus:border-flame-500 rounded-xl px-4 py-3 text-sm text-ivory-100 placeholder-ivory-500 focus:outline-none focus:ring-1 focus:ring-flame-500 transition pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-400 hover:text-ivory-200 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
              <span>Contraseña incorrecta. Por defecto es <strong className="text-red-200">tena2025</strong></span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>¡Acceso autorizado! Abriendo panel de control...</span>
            </div>
          )}

          {/* Helper hint for default password */}
          <div className="text-[11px] text-ivory-400 bg-carbon-850 p-2.5 rounded-lg border border-jungle-800 flex items-center justify-between">
            <span>Clave predeterminada:</span>
            <code className="text-flame-400 font-bold bg-carbon-900 px-2 py-0.5 rounded border border-jungle-700">
              tena2025
            </code>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-3 px-4 rounded-xl border border-jungle-700 bg-carbon-800 hover:bg-carbon-700 text-ivory-300 font-bold text-xs uppercase tracking-wider font-display transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-1/2 py-3 px-4 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs uppercase tracking-wider font-display transition shadow-lg shadow-flame-600/30 cursor-pointer"
            >
              Ingresar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
