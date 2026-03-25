"use client";

import { useState, useRef, useEffect } from "react";
import { Sidebar, MobileHeader } from "@/components/sidebar";
import { BrandChat } from "@/components/agent/chat";
import { useIsMobile } from "@/lib/hooks";
import { META, WP } from "@/lib/brand-data";

const ANIM_KEY = "casago_anim_played";
const FG = "var(--foreground)";
const FG_HEX = "#eeeff1";
const T2_HEX = "#8b8d94";
const BG_HEX = "#0a0a0b";

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mobile = useIsMobile();

  const [hasPlayed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(ANIM_KEY) === "1";
  });

  const [phase, setPhase] = useState(hasPlayed ? 4 : 0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [lengths, setLengths] = useState<number[] | null>(null);

  useEffect(() => {
    if (hasPlayed) return;
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll("path");
      setLengths(Array.from(paths).map((p) => Math.ceil(p.getTotalLength())));
    }
  }, [hasPlayed]);

  useEffect(() => {
    if (hasPlayed) return;
    const timers = [
      setTimeout(() => setPhase(1), 2150),
      setTimeout(() => setPhase(2), 2600),
      setTimeout(() => setPhase(3), 3200),
      setTimeout(() => {
        setPhase(4);
        sessionStorage.setItem(ANIM_KEY, "1");
      }, 3900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [hasPlayed]);

  const order = [5, 1, 3, 0, 4, 2];
  const ltrPos = [5, 1, 3, 0, 4, 2];
  const staggerDelays = [0, 0.14, 0.26, 0.36, 0.43, 0.48];
  const drawDur = 1.6;
  const logoW = mobile ? 340 : 620;
  const showIntro = !hasPlayed && phase < 4;
  const sidebarW = mobile ? 0 : 220;

  const css = `
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes strokeOut { to { stroke-opacity: 0; } }
    @keyframes fillIn { to { fill-opacity: 1; } }
    @keyframes breathe {
      0% { transform: scale(1); }
      50% { transform: scale(1.006); }
      100% { transform: scale(1); }
    }
  `;

  return (
    <div className="flex h-screen overflow-hidden bg-background font-hub text-foreground">
      <Sidebar mobile={mobile} open={drawerOpen} setOpen={setDrawerOpen} />
      <div
        className="flex flex-1 flex-col min-w-0 h-screen overflow-hidden"
        style={{ marginLeft: sidebarW }}
      >
        {mobile && <MobileHeader onMenu={() => setDrawerOpen(true)} />}

        {/* Intro overlay */}
        {showIntro && (
          <div
            className="fixed top-0 right-0 bottom-0 flex flex-col items-center justify-center text-center z-[5] bg-background"
            style={{
              left: sidebarW,
              padding: mobile ? "40px 20px" : 0,
              opacity: phase >= 3 ? 0 : 1,
              transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: phase >= 3 ? "none" : "auto",
            }}
          >
            <style>{css}</style>
            <div style={{ animation: phase >= 1 ? "breathe 2.4s cubic-bezier(0.37, 0, 0.63, 1) 0.3s 1" : "none" }}>
              <svg
                ref={svgRef}
                viewBox="-2 -2 990.77 178.91"
                width={logoW}
                className="block overflow-visible max-w-full"
                aria-hidden="true"
              >
                {WP.map((d, i) => {
                  const len = lengths ? lengths[i] : 2400;
                  const delay = staggerDelays[order[i]];
                  return (
                    <path key={i} d={d} fill={FG_HEX} stroke={FG_HEX}
                      strokeWidth={mobile ? "2.8" : "1.6"} strokeLinecap="round" strokeLinejoin="round"
                      style={{
                        strokeDasharray: len, strokeDashoffset: lengths ? len : 0,
                        fillOpacity: 0, strokeOpacity: 1,
                        animation: lengths
                          ? [
                              `draw ${drawDur}s cubic-bezier(0.45, 0, 0.15, 1) ${delay}s forwards`,
                              phase >= 1 ? `strokeOut 0.45s cubic-bezier(0.33, 0, 0.67, 1) ${ltrPos[i] * 0.05}s forwards` : "",
                              phase >= 1 ? `fillIn 0.35s cubic-bezier(0.33, 0, 0.67, 1) ${ltrPos[i] * 0.05}s forwards` : "",
                            ].filter(Boolean).join(", ")
                          : "none",
                      }}
                    />
                  );
                })}
              </svg>
            </div>
            <div className={`flex justify-center ${mobile ? "gap-1.5 mt-5" : "gap-2 mt-7"}`}>
              {META.tagline.split(" ").map((word, wi) => (
                <span key={wi} className={`font-normal tracking-[0.04em] ${mobile ? "text-[17px]" : "text-xl"}`} style={{
                  color: T2_HEX,
                  opacity: phase >= 2 ? 1 : 0,
                  transform: phase >= 2 ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${wi * 0.12}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${wi * 0.12}s`,
                }}>
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Chat */}
        <div
          className="flex flex-1 flex-col overflow-hidden"
          style={{
            opacity: phase >= 4 ? 1 : (phase >= 3 ? 1 : 0),
            transition: hasPlayed ? "none" : "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
          }}
        >
          <BrandChat />
        </div>
      </div>
    </div>
  );
}
