import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { Button } from "./Button";

export function AppLayout() {
  const { session, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/items" className="font-bold text-slate-900">React Starter</Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/items" className={({ isActive }) => isActive ? "font-semibold text-indigo-700" : "text-slate-600 hover:text-slate-900"}>
              Elementos
            </NavLink>
            <span className="hidden text-slate-500 sm:inline">{session?.email}</span>
            <Button variant="secondary" onClick={logout}>Salir</Button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
