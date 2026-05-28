export default function SidebarBrandCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 text-lg font-bold text-white">
          P3
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Pemrograman III - Web Service</p>
          <p className="text-xs text-slate-300">Praktikum React</p>
        </div>
      </div>
    </div>
  );
}