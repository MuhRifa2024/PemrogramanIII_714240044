import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/atoms/Button";
import PageTitle from "../components/molecules/PageTitle";
import { getMahasiswaDetail } from "../services/api";

export default function MahasiswaDetailPage() {
  const { npm } = useParams();
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadDetail = async () => {
      try {
        const data = await getMahasiswaDetail(npm);

        if (isMounted) {
          setMahasiswa(data);
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
  }, [npm]);

  if (loading) return <p className="text-center">Loading...</p>;

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  if (!mahasiswa) {
    return <p className="text-center text-slate-500">Data tidak ditemukan.</p>;
  }

  const initials =
    mahasiswa.nama
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("") || "M";

  return (
    <div className="space-y-4">
      <PageTitle
        title="Detail Mahasiswa"
        description="Informasi lengkap mahasiswa."
      />

      <div className="rounded-2xl border bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              {initials}
            </div>
            <div>
              <p className="text-xs uppercase text-slate-500">NPM</p>
              <p className="text-sm font-semibold text-slate-800">
                {mahasiswa.npm}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                {mahasiswa.nama}
              </h3>
              <span className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {mahasiswa.prodi}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to={`/mahasiswa/${mahasiswa.npm}/edit`}>
              <Button type="button" variant="secondary">
                Edit
              </Button>
            </Link>
            <Link to="/mahasiswa">
              <Button type="button" variant="ghost">
                Kembali
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Email</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">
            {mahasiswa.email}
          </p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Prodi</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">
            {mahasiswa.prodi}
          </p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm sm:col-span-2">
          <p className="text-xs uppercase text-slate-500">Alamat</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">
            {mahasiswa.alamat}
          </p>
        </div>
      </div>
    </div>
  );
}