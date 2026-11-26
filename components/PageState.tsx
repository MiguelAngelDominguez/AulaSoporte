import { Button } from "./Button";

interface PageStateProps {
  loading: boolean;
  error: string;
  empty: boolean;
  emptyMessage?: string;
  onRetry?: () => void;
}

export function PageState({
  loading,
  error,
  empty,
  emptyMessage = "No hay datos para mostrar.",
  onRetry,
}: PageStateProps) {
  if (loading) {
    return <div className="rounded-xl bg-white p-8 text-center text-slate-500">Cargando…</div>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="mb-4 text-red-700">{error}</p>
        {onRetry && <Button variant="secondary" onClick={onRetry}>Reintentar</Button>}
      </div>
    );
  }

  if (empty) {
    return <div className="rounded-xl bg-white p-8 text-center text-slate-500">{emptyMessage}</div>;
  }

  return null;
}
