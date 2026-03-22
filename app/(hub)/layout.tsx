"use client";

import { useState } from "react";
import { Sidebar, MobileHeader } from "@/components/sidebar";
import { useIsMobile } from "@/lib/hooks";
import { C, ff } from "@/lib/tokens";

export default function HubLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mobile = useIsMobile();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: ff, color: C.t1 }}>
      <Sidebar mobile={mobile} open={drawerOpen} setOpen={setDrawerOpen} />
      <div style={{ flex: 1, marginLeft: mobile ? 0 : 220, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        {mobile && <MobileHeader onMenu={() => setDrawerOpen(true)} />}
        <main style={{ flex: 1, padding: mobile ? "24px 20px 64px" : "40px 48px 96px", maxWidth: 860, width: "100%" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
