import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/atoms/Button";
import TextInput from "../components/atoms/TextInput";
import PageTitle from "../components/molecules/PageTitle";
import { changePassword } from "../services/api";

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      return Swal.fire({
        title: "Konfirmasi Gagal",
        text: "Password baru dan konfirmasi password tidak cocok!",
        icon: "warning",
        confirmButtonColor: "#3b82f6",
      });
    }

    try {
      setLoading(true);
      await changePassword(formData);
      
      Swal.fire({
        title: "Berhasil!",
        text: "Password Anda telah berhasil diubah.",
        icon: "success",
        confirmButtonColor: "#3b82f6",
      });
      
      setFormData({ old_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      Swal.fire({
        title: "Gagal Menyimpan",
        text: err.message,
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Dashboard
      </Link>

      <PageTitle
        title="Pengaturan Keamanan"
        description="Perbarui password Anda untuk menjaga keamanan akun."
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-slate-50 border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Ubah Password
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Password Lama</label>
            <TextInput
              type="password"
              placeholder="Masukkan password saat ini"
              value={formData.old_password}
              onChange={(e) => setFormData({ ...formData, old_password: e.target.value })}
              required
              className="bg-gray-50 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Password Baru</label>
              <TextInput
                type="password"
                placeholder="Minimal 6 karakter"
                value={formData.new_password}
                onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                required
                className="bg-gray-50 focus:bg-white"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
              <TextInput
                type="password"
                placeholder="Ulangi password baru"
                value={formData.confirm_password}
                onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                required
                className="bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <Button type="submit" disabled={loading} className="px-8 shadow-md hover:shadow-lg transition-all">
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
