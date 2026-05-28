export default function Header({ pageTitle, onToggleSidebar }) {
  return (
    <header className="border-b border-slate-200 bg-white/80 text-slate-800 backdrop-blur">
      <div className="flex w-full items-center justify-between px-4 py-4 md:px-6">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="mr-3 rounded-lg border border-slate-300 bg-white px-2 py-1 text-xl leading-none shadow-sm md:hidden"
          aria-label="Buka menu"
        >
          ☰
        </button>

        <h1 className="text-lg font-semibold md:text-xl">Praktikum React</h1>

        <span className="rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1 text-xs font-medium text-blue-700 md:text-sm">
          {pageTitle}
        </span>
      </div>
    </header>
  );
}