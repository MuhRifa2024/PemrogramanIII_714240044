import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/atoms/Button";
import TextInput from "../components/atoms/TextInput";
import SelectInput from "../components/atoms/Selectinput";
import PageTitle from "../components/molecules/PageTitle";
import MahasiswaTable from "../components/organisms/MahasiswaTable";
import { deleteMahasiswa, getMahasiswa } from "../services/api";
import { PRODI_OPTIONS } from "../components/organisms/MahasiswaForm";

export default function MahasiswaListPage() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterProdi, setFilterProdi] = useState("");



  const filteredMahasiswa = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return mahasiswa.filter((mhs) => {
      // Filter by prodi
      const matchProdi = !filterProdi || mhs.prodi === filterProdi;

      // Filter by search keyword
      const matchSearch =
        !keyword ||
        Object.values(mhs).some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(keyword)
        );

      return matchProdi && matchSearch;
    });
  }, [mahasiswa, search, filterProdi]);

  // Check if any filter/search is active
  const hasActiveFilter = search.trim() !== "" || filterProdi !== "";

  const handleReset = () => {
    setSearch("");
    setFilterProdi("");
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      try {
        const data = await getMahasiswa();

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

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError("");
      const data = await getMahasiswa();
      setMahasiswa(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (npm) => {
    const result = await Swal.fire({
      title: "Hapus data mahasiswa?",
      text: "Data yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      setError("");
      await deleteMahasiswa(npm);
      setMahasiswa((prev) => prev.filter((item) => item.npm !== npm));
      await Swal.fire({
        title: "Berhasil",
        text: "Data mahasiswa berhasil dihapus.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      setError(err.message);
      await Swal.fire({
        title: "Gagal",
        text: err.message || "Gagal menghapus data.",
        icon: "error",
        confirmButtonText: "Tutup",
      });
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-4">
      {/* Tombol Kembali ke Dashboard */}
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
        title="Daftar Mahasiswa"
        description="Kelola data mahasiswa, tambahkan, edit, dan lihat detail."
        actions={
          <Link to="/mahasiswa/new">
            <Button type="button">Tambah Mahasiswa</Button>
          </Link>
        }
      />

      <p className="text-sm text-gray-600">
        Total Mahasiswa:{" "}
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-semibold">
          {mahasiswa.length}
        </span>
        {hasActiveFilter && (
          <>
            {" "}— Ditampilkan:{" "}
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md font-semibold">
              {filteredMahasiswa.length}
            </span>
          </>
        )}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
        {/* Search input */}
        <TextInput
          type="text"
          placeholder="Cari semua data mahasiswa..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="sm:max-w-xs"
        />

        {/* Filter Prodi dropdown */}
        <SelectInput
          value={filterProdi}
          onChange={(event) => setFilterProdi(event.target.value)}
          className="sm:max-w-xs"
        >
          <option value="">Semua Prodi</option>
          {PRODI_OPTIONS.map((prodi) => (
            <option key={prodi} value={prodi}>
              {prodi}
            </option>
          ))}
        </SelectInput>

        {/* Tombol Reset */}
        {hasActiveFilter && (
          <Button type="button" variant="ghost" onClick={handleReset}>
            ✕ Reset Filter
          </Button>
        )}

        {/* Refresh button pushed to the right */}
        <div className="sm:ml-auto">
          <Button
            type="button"
            variant="secondary"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">Error: {error}</p>}

      <MahasiswaTable data={filteredMahasiswa} onDelete={handleDelete} />
    </div>
  );
}