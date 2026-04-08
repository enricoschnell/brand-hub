"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Image, Palette, Type, Mail, Users, X, Menu,
  FileText, Presentation, Construction, BookOpen,
  Target, Camera,
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Wm } from "@/components/brand/wortmarke";
import { SidebarAvatar } from "@/components/sidebar-avatar";

const nav = [
  { items: [{ id: "/", label: "Startseite", icon: <Home size={15} /> }] },
  {
    label: "Markenelemente",
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
    label: "Werkzeuge",
    items: [
      { id: "/sig", label: "Email Signatur", icon: <Mail size={15} /> },
      { id: "/team", label: "Team", icon: <Users size={15} /> },
    ],
  },
  {
    label: "Marke",
    items: [
      { id: "/strategy", label: "Markenstrategie", icon: <Target size={15} /> },
      { id: "/guidelines", label: "Markenrichtlinien", icon: <BookOpen size={15} /> },
      { id: "/photography", label: "Bildsprache", icon: <Camera size={15} /> },
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
    return pathname === id || pathname.startsWith(id + "/");
  };

  const content = (
    <>
      {/* Header — Wortmarke + BETA badge */}
      <Link
        href="/"
        className="flex flex-col gap-0 no-underline px-5 pt-6 pb-0"
        onClick={() => mobile && setOpen(false)}
      >
        <div className="flex items-center justify-between">
          <Wm fill="var(--foreground)" w={120} />
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-semibold tracking-wider uppercase text-hub-t3 border border-hub-border rounded px-1.5 py-0.5 leading-none">
              Beta
            </span>
            {mobile && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); }}
                aria-label="Menü schließen"
                className="bg-transparent border-none text-hub-t2 cursor-pointer p-1 flex"
              >
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        <span className="text-[11px] text-hub-t3 mt-2">Brand Hub</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-6 overflow-auto">
        {nav.map((s, si) => (
          <div key={si}>
            {s.label && (
              <div className="text-[11px] font-semibold text-hub-t3 uppercase tracking-[0.06em] leading-none px-2 pt-5 pb-2">
                {s.label}
              </div>
            )}
            {s.items.map((n) => {
              const active = isActive(n.id);
              return (
                <Link
                  key={n.id}
                  href={n.id}
                  onClick={() => mobile && setOpen(false)}
                  className={cn(
                    "group/nav flex items-center gap-2 w-full px-2.5 py-[7px] rounded-swatch no-underline",
                    "text-[13px] font-hub cursor-pointer text-left mb-px min-h-[40px] transition-colors",
                    active
                      ? "bg-hub-active text-hub-t1 font-medium"
                      : "bg-transparent text-hub-t2 hover:text-hub-t1 hover:bg-hub-hover"
                  )}
                >
                  <span className={cn("flex transition-opacity", active ? "opacity-90" : "opacity-40 group-hover/nav:opacity-70")}>{n.icon}</span>
                  {n.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-3.5 border-t border-hub-border flex items-center justify-between">
        <span className="text-[11px] text-hub-t3">&copy; CASAGO GmbH</span>
        <SignedIn>
          <SidebarAvatar />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-[11px] text-muted-foreground hover:text-foreground cursor-pointer bg-transparent border-none font-hub transition-colors">
              Anmelden
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </>
  );

  if (mobile) {
    return (
      <>
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
        <aside
          className={cn(
            "fixed left-0 top-0 h-screen w-[280px] bg-sidebar border-r border-border",
            "font-hub flex flex-col z-50 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {content}
        </aside>
      </>
    );
  }

  return (
    <aside className="w-[220px] bg-sidebar fixed left-0 top-0 h-screen flex flex-col font-hub border-r border-border z-10">
      {content}
    </aside>
  );
}

const pageLabels: Record<string, string> = {
  "/": "Startseite",
  "/logo": "Logo",
  "/colors": "Farben",
  "/type": "Typografie",
  "/stationery": "Briefpapier",
  "/templates": "Word & PowerPoint",
  "/signage": "Beschilderung",
  "/sig": "Email Signatur",
  "/team": "Team",
  "/strategy": "Markenstrategie",
  "/guidelines": "Markenrichtlinien",
  "/photography": "Bildsprache",
  "/downloads": "Downloads",
};

export function MobileHeader({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const title = pageLabels[pathname] || "Brand Hub";

  return (
    <div className="sticky top-0 z-20 bg-background border-b border-border px-4 h-[52px] flex items-center gap-3">
      <button
        onClick={onMenu}
        aria-label="Menü öffnen"
        className="bg-transparent border-none text-foreground cursor-pointer p-2 -m-2 flex min-w-[44px] min-h-[44px] items-center justify-center"
      >
        <Menu size={20} aria-hidden="true" />
      </button>
      <div className="text-[13px] font-medium text-foreground">{title}</div>
    </div>
  );
}
