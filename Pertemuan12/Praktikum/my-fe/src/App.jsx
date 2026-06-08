import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPages";
import LoginPage from "./pages/LoginPage";
import MahasiswaDetailPage from "./pages/MahasiswaDetailPage";
import MahasiswaFormPage from "./pages/MahasiswaFormPage";
import MahasiswaListPage from "./pages/MahasiswaListPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mahasiswa" element={<MahasiswaListPage />} />
          <Route path="/mahasiswa/new" element={<MahasiswaFormPage mode="create" />} />
          <Route path="/mahasiswa/:npm" element={<MahasiswaDetailPage />} />
          <Route
            path="/mahasiswa/:npm/edit"
            element={<MahasiswaFormPage mode="edit" />}
          />
        </Route>
      </Route>

      <Route path="*" element={<p>Halaman tidak ditemukan</p>} />
    </Routes>
  );
}