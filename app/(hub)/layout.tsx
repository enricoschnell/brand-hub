"use client";

import { useState } from "react";
import { Sidebar, MobileHeader } from "@/components/sidebar";
import { useIsMobile } from "@/lib/hooks";

export default function HubLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background font-hub text-foreground">
      <Sidebar mobile={mobile} open={drawerOpen} setOpen={setDrawerOpen} />
      <div
        className="flex flex-1 flex-col min-w-0 overflow-hidden"
        style={{ marginLeft: mobile ? 0 : 220 }}
      >
        {mobile && <MobileHeader onMenu={() => setDrawerOpen(true)} />}
        <main className={mobile ? "flex-1 px-5 py-6 pb-16" : "flex-1 px-12 py-10 pb-24"} style={{ maxWidth: 860 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
