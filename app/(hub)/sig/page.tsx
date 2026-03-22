"use client";

import { useState, useRef, useEffect } from "react";
import {
  Users, Sliders, Sun, Moon, Copy, Code, Check, ChevronRight, Info,
} from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { C, S, T, ff, monoF, cardS } from "@/lib/tokens";
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
      <div style={{ display: mobile ? "block" : "grid", gridTemplateColumns: "280px 1fr", gap: S.lg }}>
        <div style={{ display: "flex", flexDirection: "column", gap: S.sm, marginBottom: mobile ? S.md : 0, minWidth: 0 }}>
          <div style={{ ...cardS, padding: S.md + 4, minWidth: 0 }}>
            <div style={{ ...T.sectionLabel, marginBottom: S.md, display: "flex", alignItems: "center", gap: 5 }}><Users size={11} strokeWidth={2} /> Person</div>
            <div style={{ display: mobile ? "flex" : "block", gap: 6, overflowX: mobile ? "auto" : "visible", paddingBottom: mobile ? 4 : 0, margin: mobile ? "0 -4px" : 0 }}>
              {team.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setPi(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, width: mobile ? "auto" : "100%", flexShrink: 0,
                    padding: "10px 12px", borderRadius: 10,
                    border: pi === i ? `1.5px solid ${C.borderActive}` : `1px solid ${C.border}`,
                    background: pi === i ? C.active : "transparent",
                    cursor: "pointer", fontFamily: ff, textAlign: "left", marginBottom: mobile ? 0 : 6, minHeight: 48,
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: pi === i ? C.t1 : C.active, color: pi === i ? C.bg : C.t3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{t.ini}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ ...T.bodyStrong, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div>
                    <div style={{ ...T.caption, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ ...cardS, padding: S.md + 4 }}>
            <div style={{ ...T.sectionLabel, marginBottom: S.md, display: "flex", alignItems: "center", gap: 5 }}><Sliders size={11} strokeWidth={2} /> Optionen</div>
            <div style={{ marginBottom: S.md + 2 }}>
              <div style={{ ...T.body, marginBottom: S.sm }}>Logo</div>
              <Pill options={[{ value: "regular", label: "Regular" }, { value: "large", label: "Large" }]} value={logoSize} onChange={(v) => setLogoSize(v as "regular" | "large")} />
            </div>
            <div onClick={() => setShowClaim(!showClaim)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", ...T.body, minHeight: 36 }}>
              <div style={{ width: 40, height: 22, borderRadius: 11, padding: 2, background: showClaim ? C.t1 : C.active, transition: "background 0.15s", display: "flex", justifyContent: showClaim ? "flex-end" : "flex-start", alignItems: "center" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: showClaim ? C.bg : C.t3, transition: "all 0.15s" }} />
              </div>
              Claim
            </div>
            <div onClick={() => setShowAddress(!showAddress)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", ...T.body, minHeight: 36, marginTop: 4 }}>
              <div style={{ width: 40, height: 22, borderRadius: 11, padding: 2, background: showAddress ? C.t1 : C.active, transition: "background 0.15s", display: "flex", justifyContent: showAddress ? "flex-end" : "flex-start", alignItems: "center" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: showAddress ? C.bg : C.t3, transition: "all 0.15s" }} />
              </div>
              Adresse
            </div>
          </div>
          {!mobile && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {["Outlook", "Gmail", "Apple Mail", "iOS"].map((c) => (
                <span key={c} style={{ fontSize: 10, padding: "3px 7px", borderRadius: 4, background: C.surface, border: `1px solid ${C.border}`, color: C.t3 }}>{c}</span>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: S.sm, minWidth: 0 }}>
          <Pill options={[{ value: "light", label: "Light", icon: <Sun size={11} /> }, { value: "dark", label: "Dark", icon: <Moon size={11} /> }]} value={mode} onChange={(v) => setMode(v as "light" | "dark")} />
          <div style={{ ...cardS, minWidth: 0 }}>
            {!mobile && (
              <div style={{ borderBottom: `1px solid ${C.border}` }}>
                {[
                  { l: "Von", v: `${p.name} <${email}>` },
                  { l: "An", v: "kunde@beispiel.de" },
                  { l: "Betreff", v: "Projektupdate" },
                ].map((r, i) => (
                  <div key={i} style={{ padding: "7px 18px", fontSize: 12, color: C.t3, borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                    <span style={{ display: "inline-block", width: 50 }}>{r.l}</span>
                    <span style={{ color: r.l === "Betreff" ? C.t1 : C.t2, fontWeight: r.l === "Betreff" ? 500 : 400 }}>{r.v}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ padding: mobile ? S.md : S.lg, background: mode === "light" ? "#fff" : "#1c1c1e", overflow: "hidden" }}>
              {!mobile && (
                <div style={{ fontSize: 14, lineHeight: 1.8, marginBottom: S.lg, color: mode === "light" ? "#555" : "#9a9da4", fontFamily: "Helvetica,Arial,sans-serif" }}>
                  Sehr geehrter Herr M{"ü"}ller,<br /><br />anbei das aktuelle Projektupdate.<br /><br />Mit freundlichen Gr{"ü"}{"ß"}en
                </div>
              )}
              <div style={!mobile ? { borderTop: `1px solid ${mode === "light" ? "#e5e5e5" : "rgba(255,255,255,0.06)"}`, paddingTop: S.lg } : {}}>
                <SigRender m={mode} innerRef={sigRef} />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: S.sm }}>
            <button onClick={() => doCopy("rich")} style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "none", background: C.t1, color: C.bg, ...T.body, fontWeight: 500, fontFamily: ff, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, minHeight: 44 }}>
              {copied === "rich" ? <Check size={14} /> : <Copy size={14} />}{copied === "rich" ? "Kopiert" : mobile ? "Kopieren" : "Formatiert kopieren"}
            </button>
            <button onClick={() => doCopy("html")} style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: "transparent", color: C.t2, ...T.body, fontWeight: 500, fontFamily: ff, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, minHeight: 44 }}>
              {copied === "html" ? <Check size={14} /> : <Code size={14} />}{copied === "html" ? "Kopiert" : "HTML"}
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: S.sm, padding: `${S.sm + 2}px ${S.md}px`, borderRadius: 10, background: C.bg, border: `1px solid ${C.border}` }}>
            <Info size={13} style={{ color: C.t3, marginTop: 1, flexShrink: 0 }} />
            <p style={{ ...T.caption, margin: 0, lineHeight: 1.6 }}>Apple Mail: Deaktiviere „Standardschrift für E-Mails verwenden" in den Mail-Einstellungen, damit die Formatierung erhalten bleibt.</p>
          </div>
          {!mobile && (
            <>
              <button onClick={() => setShowSrc(!showSrc)} style={{ width: "100%", padding: "9px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", fontFamily: ff, fontSize: 12, textAlign: "left", display: "flex", alignItems: "center", gap: 6, color: C.t3, minHeight: 40 }}>
                <span style={{ display: "flex", transform: showSrc ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}><ChevronRight size={12} /></span>HTML Source
              </button>
              {showSrc && (
                <div style={{ ...cardS, padding: S.md + 2, maxHeight: 200, overflow: "auto" }}>
                  <pre style={{ margin: 0, fontSize: 10, color: C.t3, fontFamily: monoF, whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.6 }}>{buildHtml()}</pre>
                </div>
              )}
              <div style={{ display: "flex", gap: 12, fontSize: 11, color: C.t3, flexWrap: "wrap" }}>
                {[["Gaps", "20·16·16"], ["Name", "17/600"], ["Contact", "14/400"], ["Addr", "13/400"], ["Claim", "12/400 UC"], ["Logo", `${logoW}px`]].map(([l, v]) => (
                  <span key={l}>{l} <span style={{ fontFamily: monoF, color: C.t2 }}>{v}</span></span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
