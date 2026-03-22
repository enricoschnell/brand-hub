"use client";

import { useState, useRef, useEffect } from "react";
import {
  Users, Sliders, Sun, Moon, Copy, Code, Check, ChevronRight, Info,
} from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { C } from "@/lib/tokens";
import { META, TEAM, SC, LOGO_SIZES, type TeamMember } from "@/lib/brand-data";
import { PageHeader } from "@/components/shared/page-header";
import { Pill } from "@/components/shared/pill";
import { Wm } from "@/components/brand/wortmarke";

export default function SigPage() {
  const mobile = useIsMobile();
  const [team, setTeam] = useState<TeamMember[]>(TEAM);
  const [pi, setPi] = useState(0);
  const [showClaim, setShowClaim] = useState(true);
  const [showAddress, setShowAddress] = useState(true);
  const [logoSize, setLogoSize] = useState<"regular" | "large">("regular");
  const [copied, setCopied] = useState<string | null>(null);
  const [showSrc, setShowSrc] = useState(false);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const sigRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/employees")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTeam(data.map((d: any) => ({ ...d, ini: d.initials || d.ini })));
        }
      })
      .catch(() => {});
  }, []);

  const p = team[pi] || team[0];
  const logoW = LOGO_SIZES[logoSize];

  const buildHtml = () => {
    const c = SC.light;
    const contactRows = p.contacts
      .map(
        (ct) =>
          `<tr><td style="font-size:14px;line-height:1.4;padding:2px 0;"><span style="display:inline-block;width:18px;color:${c.lbl};font-weight:500;">${ct.label}</span><a href="${ct.href}" style="color:${ct.label === "E" ? c.p : c.s};text-decoration:none;">${ct.value}</a></td></tr>`
      )
      .join("");
    const hasClosing = showAddress || showClaim;
    return [
      `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Helvetica,Arial,sans-serif;color:${c.p};">`,
      `<tr><td style="padding-bottom:20px;"><a href="https://${META.website}" style="text-decoration:none;"><img src="https://brand.casago.de/sig/wortmarke.png" alt="${META.name}" width="${logoW}" style="display:block;border:0;"/></a></td></tr>`,
      `<tr><td style="padding-bottom:16px;"><p style="margin:0;font-size:17px;font-weight:600;color:${c.p};line-height:1.3;">${p.name}</p><p style="margin:4px 0 0;font-size:14px;color:${c.s};line-height:1.4;">${p.role}</p></td></tr>`,
      `<tr><td><table cellpadding="0" cellspacing="0" border="0">${contactRows}</table></td></tr>`,
      hasClosing
        ? `<tr><td style="padding-top:16px;border-top:1px solid #e5e5e5;">` +
          (showAddress
            ? `<p style="margin:0 0 ${showClaim ? "12" : "0"}px;font-size:13px;color:${c.s};line-height:1.5;"><a href="${META.mapsUrl}" style="color:${c.s};text-decoration:none;">${META.legal}<br/>${META.address.replace(/\n/g, "<br/>")}</a></p>`
            : "") +
          (showClaim
            ? `<p style="margin:0;font-size:12px;font-weight:400;color:${c.q};letter-spacing:1.2px;text-transform:uppercase;line-height:1;">${META.claim}</p>`
            : "") +
          `</td></tr>`
        : "",
      `</table>`,
    ].join("");
  };

  const doCopy = (type: string) => {
    const html = buildHtml();
    if (type === "html") {
      navigator.clipboard.writeText(html);
    } else {
      const el = document.createElement("div");
      el.innerHTML = html;
      el.style.cssText = "position:fixed;left:-9999px;top:0;background:#fff;color:#000;font-family:Helvetica,Arial,sans-serif;";
      document.body.appendChild(el);
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      document.execCommand("copy");
      sel?.removeAllRanges();
      document.body.removeChild(el);
    }
    setCopied(type);
    setTimeout(() => setCopied(null), 2200);
  };

  const SigRender = ({ m, innerRef }: { m: "light" | "dark"; innerRef?: React.Ref<HTMLDivElement> }) => {
    const c = SC[m];
    return (
      <div ref={innerRef} style={{ fontFamily: "Helvetica,Arial,sans-serif", color: c.p, maxWidth: "100%", overflowWrap: "break-word", wordBreak: "break-word" }}>
        <div style={{ marginBottom: 20 }}>
          <Wm fill={c.p} w={Math.min(logoW, 160)} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 17, fontWeight: 600, color: c.p, lineHeight: 1.3 }}>{p.name}</div>
          <div style={{ fontSize: 14, color: c.s, marginTop: 4, lineHeight: 1.4 }}>{p.role}</div>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          {p.contacts.map((ct, i) => (
            <div key={i} style={{ display: "flex" }}>
              <span style={{ width: 18, flexShrink: 0, color: c.lbl, fontWeight: 500 }}>{ct.label}</span>
              <a href={ct.href} style={{ color: ct.label === "E" ? c.p : c.s, textDecoration: "none", wordBreak: "break-all" }}>{ct.value}</a>
            </div>
          ))}
        </div>
        {(showAddress || showClaim) && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${m === "light" ? "#e5e5e5" : "rgba(255,255,255,0.06)"}` }}>
            {showAddress && (
              <div style={{ fontSize: 13, lineHeight: 1.5, color: c.s, marginBottom: showClaim ? 12 : 0 }}>
                <a href={META.mapsUrl} style={{ color: c.s, textDecoration: "none" }}>
                  {META.legal}<br />
                  {META.address.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}
                </a>
              </div>
            )}
            {showClaim && (
              <div style={{ fontSize: 12, fontWeight: 400, color: c.q, letterSpacing: "1.2px", textTransform: "uppercase", lineHeight: 1 }}>
                {META.claim}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const email = p.contacts.find((c) => c.label === "E")?.value || "";

  return (
    <div>
      <PageHeader title="Email Signatur" desc="On-brand Signaturen für das Team." mobile={mobile} />
      <div className={cn(
        mobile ? "block" : "grid grid-cols-[280px_1fr]",
        "gap-6"
      )}>
        {/* Left column — person picker & options */}
        <div className={cn("flex flex-col gap-2 min-w-0", mobile && "mb-4")}>
          <div className="rounded-xl border border-border bg-card overflow-hidden p-5 min-w-0">
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.06em] leading-none mb-4 flex items-center gap-[5px]">
              <Users size={11} strokeWidth={2} /> Person
            </div>
            <div className={cn(
              mobile ? "flex gap-1.5 overflow-x-auto pb-1 -mx-1" : "block"
            )}>
              {team.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setPi(i)}
                  className={cn(
                    "flex items-center gap-2.5 font-hub text-left min-h-[48px] rounded-[10px] cursor-pointer",
                    mobile ? "w-auto shrink-0 px-3 py-2.5" : "w-full px-3 py-2.5 mb-1.5",
                    pi === i
                      ? "border-[1.5px] border-hub-border-active bg-hub-active"
                      : "border border-border bg-transparent"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0",
                    pi === i
                      ? "bg-hub-t1 text-hub-bg"
                      : "bg-hub-active text-hub-t3"
                  )}>
                    {t.ini}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{t.name}</div>
                    <div className="text-[11px] text-hub-t3 whitespace-nowrap overflow-hidden text-ellipsis">{t.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden p-5">
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.06em] leading-none mb-4 flex items-center gap-[5px]">
              <Sliders size={11} strokeWidth={2} /> Optionen
            </div>
            <div className="mb-[18px]">
              <div className="text-[13px] text-muted-foreground mb-2">Logo</div>
              <Pill options={[{ value: "regular", label: "Regular" }, { value: "large", label: "Large" }]} value={logoSize} onChange={(v) => setLogoSize(v as "regular" | "large")} />
            </div>
            <div
              onClick={() => setShowClaim(!showClaim)}
              className="flex items-center gap-2.5 cursor-pointer text-[13px] text-muted-foreground min-h-[36px]"
            >
              <div
                className="flex items-center rounded-full p-0.5 transition-colors duration-150"
                style={{
                  width: 40, height: 22,
                  background: showClaim ? C.t1 : C.active,
                  justifyContent: showClaim ? "flex-end" : "flex-start",
                  display: "flex",
                }}
              >
                <div
                  className="rounded-full transition-all duration-150"
                  style={{ width: 18, height: 18, background: showClaim ? C.bg : C.t3 }}
                />
              </div>
              Claim
            </div>
            <div
              onClick={() => setShowAddress(!showAddress)}
              className="flex items-center gap-2.5 cursor-pointer text-[13px] text-muted-foreground min-h-[36px] mt-1"
            >
              <div
                className="flex items-center rounded-full p-0.5 transition-colors duration-150"
                style={{
                  width: 40, height: 22,
                  background: showAddress ? C.t1 : C.active,
                  justifyContent: showAddress ? "flex-end" : "flex-start",
                  display: "flex",
                }}
              >
                <div
                  className="rounded-full transition-all duration-150"
                  style={{ width: 18, height: 18, background: showAddress ? C.bg : C.t3 }}
                />
              </div>
              Adresse
            </div>
          </div>

          {!mobile && (
            <div className="flex flex-wrap gap-[3px]">
              {["Outlook", "Gmail", "Apple Mail", "iOS"].map((c) => (
                <span key={c} className="text-[10px] px-[7px] py-[3px] rounded-[4px] bg-hub-surface border border-border text-hub-t3">{c}</span>
              ))}
            </div>
          )}
        </div>

        {/* Right column — preview & actions */}
        <div className="flex flex-col gap-2 min-w-0">
          <Pill options={[{ value: "light", label: "Light", icon: <Sun size={11} /> }, { value: "dark", label: "Dark", icon: <Moon size={11} /> }]} value={mode} onChange={(v) => setMode(v as "light" | "dark")} />

          <div className="rounded-xl border border-border bg-card overflow-hidden min-w-0">
            {!mobile && (
              <div className="border-b border-border">
                {[
                  { l: "Von", v: `${p.name} <${email}>` },
                  { l: "An", v: "kunde@beispiel.de" },
                  { l: "Betreff", v: "Projektupdate" },
                ].map((r, i) => (
                  <div key={i} className={cn(
                    "px-[18px] py-[7px] text-xs text-hub-t3",
                    i < 2 && "border-b border-border"
                  )}>
                    <span className="inline-block w-[50px]">{r.l}</span>
                    <span className={cn(
                      r.l === "Betreff" ? "text-hub-t1 font-medium" : "text-hub-t2 font-normal"
                    )}>{r.v}</span>
                  </div>
                ))}
              </div>
            )}
            <div
              className={cn("overflow-hidden", mobile ? "p-4" : "p-6")}
              style={{ background: mode === "light" ? "#fff" : "#1c1c1e" }}
            >
              {!mobile && (
                <div className="text-sm leading-[1.8] mb-6" style={{ color: mode === "light" ? "#555" : "#9a9da4", fontFamily: "Helvetica,Arial,sans-serif" }}>
                  Sehr geehrter Herr M{"ü"}ller,<br /><br />anbei das aktuelle Projektupdate.<br /><br />Mit freundlichen Gr{"ü"}{"ß"}en
                </div>
              )}
              <div className={cn(!mobile && "pt-6")} style={!mobile ? { borderTop: `1px solid ${mode === "light" ? "#e5e5e5" : "rgba(255,255,255,0.06)"}` } : {}}>
                <SigRender m={mode} innerRef={sigRef} />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => doCopy("rich")}
              className="flex-1 py-2.5 px-3.5 rounded-[10px] border-none bg-hub-t1 text-hub-bg text-[13px] font-medium font-hub cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              {copied === "rich" ? <Check size={14} /> : <Copy size={14} />}{copied === "rich" ? "Kopiert" : mobile ? "Kopieren" : "Formatiert kopieren"}
            </button>
            <button
              onClick={() => doCopy("html")}
              className="flex-1 py-2.5 px-3.5 rounded-[10px] border border-border bg-transparent text-hub-t2 text-[13px] font-medium font-hub cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              {copied === "html" ? <Check size={14} /> : <Code size={14} />}{copied === "html" ? "Kopiert" : "HTML"}
            </button>
          </div>

          <div className="flex items-start gap-2 py-[10px] px-4 rounded-[10px] bg-background border border-border">
            <Info size={13} className="text-hub-t3 mt-px shrink-0" />
            <p className="text-[11px] text-hub-t3 m-0 leading-[1.6]">Apple Mail: Deaktiviere &bdquo;Standardschrift f&uuml;r E-Mails verwenden&ldquo; in den Mail-Einstellungen, damit die Formatierung erhalten bleibt.</p>
          </div>

          {!mobile && (
            <>
              <button
                onClick={() => setShowSrc(!showSrc)}
                className="w-full py-[9px] px-3.5 rounded-[10px] border border-border bg-transparent cursor-pointer font-hub text-xs text-left flex items-center gap-1.5 text-hub-t3 min-h-[40px]"
              >
                <span className={cn(
                  "flex transition-transform duration-150",
                  showSrc && "rotate-90"
                )}>
                  <ChevronRight size={12} />
                </span>
                HTML Source
              </button>
              {showSrc && (
                <div className="rounded-xl border border-border bg-card overflow-hidden p-[18px] max-h-[200px] overflow-auto">
                  <pre className="m-0 text-[10px] text-hub-t3 font-mono whitespace-pre-wrap break-all leading-[1.6]">{buildHtml()}</pre>
                </div>
              )}
              <div className="flex gap-3 text-[11px] text-hub-t3 flex-wrap">
                {[["Gaps", "20·16·16"], ["Name", "17/600"], ["Contact", "14/400"], ["Addr", "13/400"], ["Claim", "12/400 UC"], ["Logo", `${logoW}px`]].map(([l, v]) => (
                  <span key={l}>{l} <span className="font-mono text-hub-t2">{v}</span></span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
