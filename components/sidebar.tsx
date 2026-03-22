"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Image, Palette, Type, Mail, Users, X, Menu,
  FileText, Presentation, Construction, BookOpen,
} from "lucide-react";
import { C, T, ff } from "@/lib/tokens";
import { META } from "@/lib/brand-data";
import { Wm } from "@/components/brand/wortmarke";

const nav = [
  { items: [{ id: "/", label: "Home", icon: <Home size={15} /> }] },
  {
    label: "Assets",
    items: [
      { id: "/logo", label: "Logo", icon: <Image size={15} /> },
      { id: "/colors", label: "Farben", icon: <Palette size={15} /> },
      { id: "/type", label: "Typografie", icon: <Type size={15} /> },
    ],
  },
  {
    label: "Vorlagen",
    items: [
      { id: "/stationery", label: "Briefpapier", icon: <FileText size={15} /> },
      { id: "/templates", label: "Word & PowerPoint", icon: <Presentation size={15} /> },
      { id: "/signage", label: "Beschilderung", icon: <Construction size={15} /> },
    ],
  },
  {
    label: "Tools",
    items: [
      { id: "/sig", label: "Email Signatur", icon: <Mail size={15} /> },
      { id: "/team", label: "Team", icon: <Users size={15} /> },
    ],
  },
  {
    label: "Anwendung",
    items: [
      { id: "/guidelines", label: "Markenrichtlinien", icon: <BookOpen size={15} /> },
    ],
  },
];

interface SidebarProps {
  mobile: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ mobile, open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const isActive = (id: string) => {
    if (id === "/") return pathname === "/";
    // Exact match or sub-path (e.g. /sig/foo) but not prefix overlap (/sig vs /signage)
    return pathname === id || pathname.startsWith(id + "/");
  };

  const content = (
    <>
      <Link
        href="/"
        style={{ padding: "20px 16px 16px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 0, textDecoration: "none" }}
        onClick={() => mobile && setOpen(false)}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Wm fill={C.t1} w={120} />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
              color: C.t3, border: `1px solid ${C.border}`, borderRadius: 4,
              padding: "2px 5px", lineHeight: 1,
            }}>
              Beta
            </span>
            {mobile && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); }}
                style={{ background: "none", border: "none", color: C.t2, cursor: "pointer", padding: 4, display: "flex" }}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
        <div style={{ ...T.caption, marginTop: 6 }}>Brand Hub</div>
      </Link>
      <nav style={{ flex: 1, padding: "4px 8px", overflow: "auto" }}>
        {nav.map((s, si) => (
          <div key={si}>
            {s.label && <div style={{ ...T.sectionLabel, padding: "18px 8px 6px" }}>{s.label}</div>}
            {s.items.map((n) => {
              const active = isActive(n.id);
              return (
                <Link
                  key={n.id}
                  href={n.id}
                  onClick={() => mobile && setOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8, width: "100%",
                    padding: "7px 10px", borderRadius: 7, border: "none",
                    background: active ? C.active : "transparent",
                    color: active ? C.t1 : C.t2,
                    ...T.body, fontWeight: active ? 500 : 400,
                    fontFamily: ff, cursor: "pointer", textAlign: "left",
                    marginBottom: 1, minHeight: 40, textDecoration: "none",
                  }}
                >
                  <span style={{ opacity: active ? 0.9 : 0.45, display: "flex" }}>{n.icon}</span>
                  {n.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div style={{ padding: "12px 14px", borderTop: `1px solid ${C.border}`, ...T.caption }}>
        &copy; CASAGO GmbH
      </div>
    </>
  );

  if (mobile) {
    return (
      <>
        {open && (
          <div
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 40 }}
          />
        )}
        <aside
          style={{
            position: "fixed", left: 0, top: 0, height: "100vh", width: 280,
            background: "#111113", borderRight: `1px solid ${C.border}`,
            fontFamily: ff, display: "flex", flexDirection: "column", zIndex: 50,
            transform: open ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {content}
        </aside>
      </>
    );
  }

  return (
    <aside
      style={{
        width: 220, background: "#111113", position: "fixed", left: 0, top: 0,
        height: "100vh", display: "flex", flexDirection: "column",
        fontFamily: ff, borderRight: `1px solid ${C.border}`, zIndex: 10,
      }}
    >
      {content}
    </aside>
  );
}

const pageLabels: Record<string, string> = {
  "/": "Home",
  "/logo": "Logo",
  "/colors": "Farben",
  "/type": "Typografie",
  "/stationery": "Briefpapier",
  "/templates": "Word & PowerPoint",
  "/signage": "Beschilderung",
  "/sig": "Email Signatur",
  "/team": "Team",
  "/guidelines": "Markenrichtlinien",
  "/downloads": "Downloads",
};

export function MobileHeader({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const title = pageLabels[pathname] || "Brand Hub";

  return (
    <div
      style={{
        position: "sticky", top: 0, zIndex: 20,
        background: C.bg, borderBottom: `1px solid ${C.border}`,
        padding: "0 16px", height: 52, display: "flex", alignItems: "center", gap: 12,
      }}
    >
      <button
        onClick={onMenu}
        style={{
          background: "none", border: "none", color: C.t1, cursor: "pointer",
          padding: 8, margin: -8, display: "flex", minWidth: 44, minHeight: 44,
          alignItems: "center", justifyContent: "center",
        }}
      >
        <Menu size={20} />
      </button>
      <div style={T.bodyStrong}>{title}</div>
    </div>
  );
}
