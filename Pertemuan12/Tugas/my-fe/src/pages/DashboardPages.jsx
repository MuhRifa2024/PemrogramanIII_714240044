const stats = [
  { label: "Total Mahasiswa", value: "17" },
  { label: "Total Pertemuan", value: "7" },
  { label: "Mahasiswa Hadir", value: "16" },
];

const announcements = [
  "Praktikum React dimulai minggu ke-6.",
  "Tugas 6 dikumpulkan paling lambat hari Minggu.",
  "Gunakan API lokal untuk latihan GET data.",
];

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold">Dashboard</h2>

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-lg border bg-slate-50 p-4">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">
          Pengumuman
        </h3>

        <ul className="space-y-2 text-sm text-slate-700">
          {announcements.map((item) => (
            <li key={item} className="rounded-md bg-slate-50 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}