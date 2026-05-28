import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPages";
import MahasiswaDetailPage from "./pages/MahasiswaDetailPage";
import MahasiswaFormPage from "./pages/MahasiswaFormPage";
import MahasiswaListPage from "./pages/MahasiswaListPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/mahasiswa" element={<MahasiswaListPage />} />
        <Route path="/mahasiswa/add" element={<MahasiswaFormPage mode="create" />} />
        <Route path="/mahasiswa/:npm" element={<MahasiswaDetailPage />} />
        <Route
          path="/mahasiswa/:npm/edit"
          element={<MahasiswaFormPage mode="edit" />}
        />
      </Route>
      <Route path="*" element={<p>Halaman tidak ditemukan</p>} />
    </Routes>
  );
}