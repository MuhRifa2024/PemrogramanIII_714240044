import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import PageTitle from "../components/molecules/PageTitle";
import { getUser, getToken } from "../services/auth";


export default function ProfilePage() {
  const user = getUser();
  if (!user) {
    return <p className="text-center text-gray-500">Data pengguna tidak ditemukan.</p>;
  }

  const handleShowToken = () => {
    const token = getToken(); // Ambil token dari local storage
    
    if (token) {
      Swal.fire({
        title: 'Token JWT Anda',
        text: token,
        icon: 'info',
        confirmButtonText: 'Tutup',
        // Opsional: Membuat teks token bisa disalin dengan mudah
        customClass: {
          htmlContainer: 'break-all text-left text-sm font-mono bg-gray-50 p-3 rounded border mt-2'
        }
      });
    } else {
      Swal.fire('Gagal', 'Token tidak ditemukan di memori browser.', 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Dashboard
      </Link>
      <PageTitle
        title="Profil Pengguna"
        description="Informasi tentang akun Anda saat ini."
      />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-slate-50 border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Detail Akun
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Baris Username */}
          <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-50">
            <span className="text-sm font-medium text-gray-500 sm:w-1/3">Username</span>
            <span className="text-base text-gray-800 font-semibold">{user.username}</span>
          </div>
          {/* Baris Role */}
          <div className="flex flex-col sm:flex-row sm:items-center py-3">
            <span className="text-sm font-medium text-gray-500 sm:w-1/3">Hak Akses (Role)</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
              {user.role}
            </span>
          </div>
          <div className="pt-5 mt-2 border-t border-gray-100 flex">
            <button 
              onClick={handleShowToken}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Lihat Token JWT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}