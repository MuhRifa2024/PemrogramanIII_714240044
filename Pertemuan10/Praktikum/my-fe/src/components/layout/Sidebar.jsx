import SidebarNavButton from "../atoms/SidebarNavButton";
import SidebarBrandCard from "../molecules/SidebarBrandCard";
import SidebarInfoCard from "../molecules/SidebarInfoCard";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Ringkasan data kelas",
    icon: "🏠",
    to: "/dashboard",
  },
  {
    id: "mahasiswa",
    label: "Mahasiswa",
    description: "Daftar data mahasiswa",
    icon: "🎓",
    to: "/mahasiswa",
  },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full w-72 flex-col border-r border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 p-4 shadow-2xl transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">
            Main Navigation
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-white/10 px-2 py-1 text-xs text-slate-200 md:hidden"
          >
            Tutup
          </button>
        </div>

        <SidebarBrandCard />

        <ul className="mt-5 space-y-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <SidebarNavButton
                icon={item.icon}
                label={item.label}
                description={item.description}
                to={item.to}
                onClick={onClose}
              />
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <SidebarInfoCard />
        </div>
      </aside>
    </>
  );
}