import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 px-6 text-center bg-hub-bg font-hub">
      <div className="text-[64px] font-medium text-hub-t3 leading-none font-brand">404</div>
      <div>
        <div className="text-[15px] font-medium text-hub-t1 mb-1">Seite nicht gefunden</div>
        <p className="text-[13px] text-hub-t2 m-0">Diese Seite existiert nicht oder wurde verschoben.</p>
      </div>
      <Link
        href="/"
        className="px-4 py-2 rounded-button bg-hub-surface border border-hub-border text-hub-t1 text-[13px] font-medium no-underline hover:border-hub-border-active transition-colors"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
