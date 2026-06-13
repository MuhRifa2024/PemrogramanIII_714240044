import { useEffect, useState } from "react";
import { getMahasiswa } from "../services/api";

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const filteredMahasiswa = mahasiswa.filter((mhs) => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return true;

    return Object.values(mhs).some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(keyword)
    );
  });

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      try {
        if (isMounted) {
          setError("");
        }

        const data = await getMahasiswa();

        if (isMounted) {
          setMahasiswa(data);
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

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Daftar Mahasiswa</h2>

      <p className="text-sm text-gray-600">
        Total Mahasiswa:{" "}
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-semibold">
          {mahasiswa.length}
        </span>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Cari semua data mahasiswa..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 sm:max-w-sm"
        />

        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      {error && <p className="text-sm text-red-500">Error: {error}</p>}

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-300 border-b text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border">No</th>
              <th className="px-4 py-3 border">NPM</th>
              <th className="px-4 py-3 border">Nama / Prodi</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Alamat</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredMahasiswa.length > 0 ? (
              filteredMahasiswa.map((mhs, index) => (
                <tr key={mhs.npm} className="hover:bg-blue-50">
                  <td className="px-4 py-3 border">{index + 1}</td>
                  <td className="px-4 py-3 border">{mhs.npm}</td>
                  <td className="px-4 py-3 border">
                    <div className="font-medium">{mhs.nama}</div>
                    <div className="text-gray-500 text-xs">{mhs.prodi}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 border">{mhs.email}</td>
                  <td className="px-4 py-3 text-gray-500 border">{mhs.alamat}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-slate-500">
                  Data tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}