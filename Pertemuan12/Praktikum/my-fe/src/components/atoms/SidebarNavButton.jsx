import { NavLink } from "react-router-dom";

export default function SidebarNavButton({ icon, label, description, to, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group block w-full rounded-xl border px-3 py-3 text-left transition ${
          isActive
            ? "border-blue-400/60 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-900/30"
            : "border-white/10 bg-white/5 text-slate-200 hover:border-blue-300/40 hover:bg-white/10"
        }`
      }
    >
      {({ isActive }) => (
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-lg ${
              isActive
                ? "bg-white/25 text-white"
                : "bg-slate-800/70 text-slate-100 group-hover:bg-slate-700"
            }`}
          >
            {icon}
          </span>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{label}</p>
            <p
              className={`truncate text-xs ${
                isActive ? "text-blue-100" : "text-slate-400"
              }`}
            >
              {description}
            </p>
          </div>
        </div>
      )}
    </NavLink>
  );
}