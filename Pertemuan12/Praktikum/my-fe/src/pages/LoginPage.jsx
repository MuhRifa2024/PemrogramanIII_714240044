import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/atoms/Button";
import TextInput from "../components/atoms/TextInput";
import FormField from "../components/molecules/FormField";
import { getToken, login, saveAuthSession } from "../services/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getToken()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const data = await login(form);
      saveAuthSession(data);
      await Swal.fire({
        title: "Berhasil",
        text: "Login berhasil.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      await Swal.fire({
        title: "Gagal",
        text: error.response?.data?.message || "Username atau password salah.",
        icon: "error",
        confirmButtonText: "Tutup",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase text-blue-600">
            Praktikum 11
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Login JWT</h1>
          <p className="mt-2 text-sm text-slate-600">
            Masuk untuk mengakses dashboard dan CRUD mahasiswa.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Username" htmlFor="username">
            <TextInput
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="username"
              autoComplete="username"
              required
            />
          </FormField>

          <FormField label="Password" htmlFor="password">
            <TextInput
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="password"
              autoComplete="current-password"
              required
            />
          </FormField>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Memproses..." : "Login"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Belum punya akun?{" "}
          <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}