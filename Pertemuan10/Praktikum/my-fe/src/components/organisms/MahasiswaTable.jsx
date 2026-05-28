import { Link } from "react-router-dom";

export default function MahasiswaTable({ data, onDelete }) {
  const baseActionClass =
    "inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold transition hover:shadow-sm";

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-300 border-b text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 border">No</th>
            <th className="px-4 py-3 border">NPM</th>
            <th className="px-4 py-3 border">Nama / Prodi</th>
            <th className="px-4 py-3 border">Email</th>
            <th className="px-4 py-3 border">Alamat</th>
            <th className="px-4 py-3 border">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.length > 0 ? (
            data.map((mhs, index) => (
              <tr key={mhs.npm} className="hover:bg-blue-50">
                <td className="px-4 py-3 border">{index + 1}</td>
                <td className="px-4 py-3 border">{mhs.npm}</td>
                <td className="px-4 py-3 border">
                  <div className="font-medium">{mhs.nama}</div>
                  <div className="text-gray-500 text-xs">{mhs.prodi}</div>
                </td>
                <td className="px-4 py-3 text-gray-600 border">{mhs.email}</td>
                <td className="px-4 py-3 text-gray-500 border">{mhs.alamat}</td>
                <td className="px-4 py-3 border">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/mahasiswa/${mhs.npm}`}
                      className={`${baseActionClass} border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100`}
                    >
                      Detail
                    </Link>
                    <Link
                      to={`/mahasiswa/${mhs.npm}/edit`}
                      className={`${baseActionClass} border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100`}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete?.(mhs.npm)}
                      className={`${baseActionClass} border-red-200 bg-red-50 text-red-700 hover:bg-red-100`}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-4 text-center text-slate-500">
                Data tidak ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}