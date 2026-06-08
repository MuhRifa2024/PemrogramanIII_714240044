import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/atoms/Button";
import SelectInput from "../components/atoms/SelectInput";
import TextInput from "../components/atoms/TextInput";
import FormField from "../components/molecules/FormField";
import { register } from "../services/auth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "admin",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await register(form);
      await Swal.fire({
        title: "Berhasil",
        text: "Register berhasil. Silakan login.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/login");
    } catch (error) {
      await Swal.fire({
        title: "Gagal",
        text: error.response?.data?.message || "Register gagal.",
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
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Register User</h1>
          <p className="mt-2 text-sm text-slate-600">
            Buat akun untuk mencoba autentikasi JWT dan role.
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
              autoComplete="new-password"
              required
            />
          </FormField>

          <FormField label="Role" htmlFor="role">
            <SelectInput id="role" name="role" value={form.role} onChange={handleChange}>
              <option value="admin">admin</option>
              <option value="user">user</option>
            </SelectInput>
          </FormField>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Menyimpan..." : "Register"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}