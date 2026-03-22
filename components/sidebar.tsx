"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Image, Palette, Type, Mail, Users, X, Menu,
  FileText, Presentation, Construction, BookOpen,
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
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
    return pathname === id || pathname.startsWith(id + "/");
  };

  const content = (
    <>
      {/* Header — Wortmarke + BETA badge */}
      <Link
        href="/"
        className="flex flex-col gap-0 no-underline px-4 pt-5 pb-4"
        onClick={() => mobile && setOpen(false)}
      >
        <div className="flex items-center justify-between">
          <Wm fill="var(--foreground)" w={120} />
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-semibold tracking-wider uppercase text-muted-foreground border border-border rounded px-1.5 py-0.5 leading-none">
              Beta
            </span>
            {mobile && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); }}
                className="bg-transparent border-none text-muted-foreground cursor-pointer p-1 flex"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
        <span className="text-[11px] text-muted-foreground mt-1.5">Brand Hub</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-2 overflow-auto">
        {nav.map((s, si) => (
          <div key={si}>
            {s.label && (
              <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.06em] leading-none px-2 pt-4 pb-1.5">
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
                    "flex items-center gap-2 w-full px-2.5 py-[7px] rounded-[7px] no-underline",
                    "text-[13px] font-hub cursor-pointer text-left mb-px min-h-[40px] transition-colors",
                    active
                      ? "bg-foreground/[0.08] text-foreground font-medium"
                      : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                  )}
                >
                  <span className={cn("flex", active ? "opacity-90" : "opacity-45")}>{n.icon}</span>
                  {n.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3.5 py-3 border-t border-border flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">&copy; CASAGO GmbH</span>
        <SignedIn>
          <UserButton
            appearance={{
              elements: { avatarBox: "w-6 h-6" },
            }}
          />
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
    <div className="sticky top-0 z-20 bg-background border-b border-border px-4 h-[52px] flex items-center gap-3">
      <button
        onClick={onMenu}
        className="bg-transparent border-none text-foreground cursor-pointer p-2 -m-2 flex min-w-[44px] min-h-[44px] items-center justify-center"
      >
        <Menu size={20} />
      </button>
      <div className="text-[13px] font-medium text-foreground">{title}</div>
    </div>
  );
}
