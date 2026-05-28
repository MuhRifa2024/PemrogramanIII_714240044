import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PageTitle from "../components/molecules/PageTitle";
import MahasiswaForm from "../components/organisms/MahasiswaForm";
import {
  createMahasiswa,
  getMahasiswaDetail,
  updateMahasiswa,
} from "../services/api";

const EMPTY_FORM = {
  npm: "",
  nama: "",
  prodi: "",
  email: "",
  alamat: "",
};

export default function MahasiswaFormPage({ mode }) {
  const isEdit = mode === "edit";
  const { npm } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadDetail = async () => {
      if (!isEdit) {
        setLoading(false);
        return;
      }

      try {
        const data = await getMahasiswaDetail(npm);

        if (isMounted) {
          setForm({
            npm: data?.npm ? String(data.npm) : "",
            nama: data?.nama ?? "",
            prodi: data?.prodi ?? "",
            email: data?.email ?? "",
            alamat: data?.alamat ?? "",
          });
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDetail();

    return () => {
      isMounted = false;
    };
  }, [isEdit, npm]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!form.npm.trim()) nextErrors.npm = "NPM wajib diisi";
    if (form.npm && !/^\d+$/.test(form.npm)) {
      nextErrors.npm = "NPM harus berupa angka";
    }
    if (!form.nama.trim()) nextErrors.nama = "Nama wajib diisi";
    if (!form.prodi.trim()) nextErrors.prodi = "Prodi wajib diisi";
    if (!form.email.trim()) nextErrors.email = "Email wajib diisi";
    if (!form.alamat.trim()) nextErrors.alamat = "Alamat wajib diisi";
    if (form.email && !emailPattern.test(form.email)) {
      nextErrors.email = "Email tidak valid";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      setSaving(true);
      setError("");
      const payload = {
        ...form,
        npm: Number(form.npm),
      };

      if (isEdit) {
        await updateMahasiswa(npm, payload);
      } else {
        await createMahasiswa(payload);
      }

      await Swal.fire({
        title: "Berhasil",
        text: isEdit
          ? "Data mahasiswa berhasil diperbarui."
          : "Data mahasiswa berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/mahasiswa");
    } catch (err) {
      setError(err.message);
      await Swal.fire({
        title: "Gagal",
        text: err.message || "Terjadi kesalahan.",
        icon: "error",
        confirmButtonText: "Tutup",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-4">
      <PageTitle
        title={isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
        description="Lengkapi form berikut untuk menyimpan data."
      />

      {error && <p className="text-sm text-red-500">Error: {error}</p>}

      <MahasiswaForm
        form={form}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        submitLabel={isEdit ? "Simpan Perubahan" : "Tambah Mahasiswa"}
        disableNpm={isEdit}
        isSubmitting={saving}
      />
    </div>
  );
}