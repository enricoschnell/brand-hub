"use client";

import { useState, useEffect } from "react";
import { Lock, Users, Plus, Trash, Pencil } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { C, S, T, ff, cardS } from "@/lib/tokens";
import { TEAM, type TeamMember } from "@/lib/brand-data";
import { PageHeader } from "@/components/shared/page-header";

interface FormState {
  name: string;
  role: string;
  initials: string;
  contacts: { label: string; value: string; href: string }[];
  sort_order: number;
}

export default function TeamPage() {
  const mobile = useIsMobile();
  const [team, setTeam] = useState<TeamMember[]>(TEAM);
  const [pw, setPw] = useState(() => (typeof window !== "undefined" ? sessionStorage.getItem("admin_pw") || "" : ""));
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [editing, setEditing] = useState<string | number | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "", role: "", initials: "",
    contacts: [{ label: "M", value: "", href: "" }, { label: "E", value: "", href: "" }],
    sort_order: 0,
  });
  const [saving, setSaving] = useState(false);

  const authHeaders = { "Content-Type": "application/json", "x-admin-password": pw };

  const fetchTeam = () => {
    fetch("/api/employees")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTeam(data.map((d: any) => ({ ...d, ini: d.initials || d.ini })));
        }
      })
      .catch(() => {});
  };

  useEffect(() => { fetchTeam(); }, []);

  const doLogin = async () => {
    try {
      const res = await fetch("/api/auth/check", { method: "POST", headers: { "x-admin-password": pw } });
      if (res.status === 401) { setAuthError(true); return; }
      sessionStorage.setItem("admin_pw", pw);
      setAuthed(true);
      setAuthError(false);
    } catch {
      setAuthError(true);
    }
  };

  const autoHref = (label: string, value: string) => {
    const clean = value.replace(/[\s\-]/g, "");
    if (label === "E") return `mailto:${value.trim()}`;
    return `tel:+${clean.replace(/^\+/, "")}`;
  };

  const startEdit = (emp: TeamMember) => {
    setForm({ name: emp.name, role: emp.role, initials: emp.initials || emp.ini, contacts: emp.contacts.map((c) => ({ ...c })), sort_order: emp.sort_order ?? 0 });
    setEditing(emp.id!);
  };

  const startNew = () => {
    setForm({ name: "", role: "", initials: "", contacts: [{ label: "M", value: "", href: "" }, { label: "E", value: "", href: "" }], sort_order: team.length });
    setEditing("new");
  };

  const save = async () => {
    setSaving(true);
    const body = { ...form, contacts: form.contacts.filter((c) => c.value.trim()).map((c) => ({ ...c, href: autoHref(c.label, c.value) })) };
    const url = editing === "new" ? "/api/employees" : `/api/employees/${editing}`;
    const method = editing === "new" ? "POST" : "PUT";
    await fetch(url, { method, headers: authHeaders, body: JSON.stringify(body) });
    setSaving(false);
    setEditing(null);
    fetchTeam();
  };

  const remove = async (id: number) => {
    if (!confirm("Mitarbeiter wirklich löschen?")) return;
    await fetch(`/api/employees/${id}`, { method: "DELETE", headers: authHeaders });
    fetchTeam();
  };

  const updateContact = (idx: number, key: string, val: string) => {
    const next = form.contacts.map((c, i) => (i === idx ? { ...c, [key]: val } : c));
    setForm({ ...form, contacts: next });
  };

  const addContact = () => setForm({ ...form, contacts: [...form.contacts, { label: "T", value: "", href: "" }] });
  const removeContact = (idx: number) => setForm({ ...form, contacts: form.contacts.filter((_, i) => i !== idx) });

  const inputS: React.CSSProperties = { width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.t1, fontSize: 13, fontFamily: ff, outline: "none", minHeight: 38 };
  const labelS: React.CSSProperties = { ...T.caption, marginBottom: 4, display: "block" };
  const btnS: React.CSSProperties = { padding: "8px 16px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 500, fontFamily: ff, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, minHeight: 36 };

  if (!authed) {
    return (
      <div>
        <PageHeader title="Team" desc="Mitarbeiter verwalten für die Signatur-Generierung." mobile={mobile} />
        <div style={{ ...cardS, padding: S.lg, maxWidth: 360 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: S.md }}>
            <Lock size={14} style={{ color: C.t2 }} />
            <span style={T.bodyStrong}>Admin-Zugang</span>
          </div>
          <div style={{ marginBottom: S.md }}>
            <label style={labelS}>Passwort</label>
            <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); setAuthError(false); }} onKeyDown={(e) => e.key === "Enter" && doLogin()} style={inputS} placeholder="Admin-Passwort eingeben" />
          </div>
          {authError && <p style={{ ...T.caption, color: "#ef4444", margin: `0 0 ${S.md}px` }}>Falsches Passwort.</p>}
          <button onClick={doLogin} style={{ ...btnS, background: C.t1, color: C.bg }}>Anmelden</button>
        </div>
      </div>
    );
  }

  if (editing !== null) {
    return (
      <div>
        <PageHeader title={editing === "new" ? "Neue/r Mitarbeiter/in" : "Mitarbeiter bearbeiten"} desc="Felder ausfüllen und speichern." mobile={mobile} />
        <div style={{ ...cardS, padding: S.lg, maxWidth: 480 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: S.md }}>
            <div>
              <label style={labelS}>Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputS} placeholder="Max Mustermann" />
            </div>
            <div>
              <label style={labelS}>Rolle / Position</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={inputS} placeholder="Geschäftsführer" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: S.sm }}>
              <div>
                <label style={labelS}>Initialen</label>
                <input value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value.toUpperCase().slice(0, 4) })} style={inputS} placeholder="MM" maxLength={4} />
              </div>
              <div>
                <label style={labelS}>Reihenfolge</label>
                <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} style={inputS} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: S.sm }}>
                <label style={{ ...labelS, margin: 0 }}>Kontakte</label>
                <button onClick={addContact} style={{ ...btnS, padding: "4px 10px", background: "transparent", border: `1px solid ${C.border}`, color: C.t2, minHeight: 28, fontSize: 11 }}>
                  <Plus size={11} /> Hinzufügen
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: S.sm }}>
                {form.contacts.map((ct, ci) => (
                  <div key={ci} style={{ display: "flex", gap: S.sm, alignItems: "center" }}>
                    <select value={ct.label} onChange={(e) => updateContact(ci, "label", e.target.value)} style={{ ...inputS, width: 56, padding: "8px 4px", flexShrink: 0 }}>
                      <option value="T">T</option>
                      <option value="M">M</option>
                      <option value="E">E</option>
                    </select>
                    <input value={ct.value} onChange={(e) => updateContact(ci, "value", e.target.value)} style={{ ...inputS, flex: 1 }} placeholder={ct.label === "E" ? "email@casago.de" : "+49 ..."} />
                    {form.contacts.length > 1 && (
                      <button onClick={() => removeContact(ci)} style={{ background: "none", border: "none", color: C.t3, cursor: "pointer", padding: 4, display: "flex" }}>
                        <Trash size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: S.sm, marginTop: S.lg }}>
            <button onClick={save} disabled={saving || !form.name.trim() || !form.role.trim()} style={{ ...btnS, background: C.t1, color: C.bg, opacity: saving || !form.name.trim() ? 0.5 : 1 }}>
              {saving ? "Speichern..." : "Speichern"}
            </button>
            <button onClick={() => setEditing(null)} style={{ ...btnS, background: "transparent", border: `1px solid ${C.border}`, color: C.t2 }}>
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Team" desc="Mitarbeiter verwalten für die Signatur-Generierung." mobile={mobile} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: S.md }}>
        <div style={T.sectionLabel}>{team.length} Mitarbeiter</div>
        <button onClick={startNew} style={{ ...btnS, background: C.t1, color: C.bg }}>
          <Plus size={13} /> Hinzufügen
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: S.sm }}>
        {team.map((emp) => (
          <div key={emp.id || emp.ini} style={{ ...cardS, padding: `${S.md}px ${S.lg}px`, display: "flex", alignItems: "center", gap: S.md }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.active, color: C.t2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
              {emp.initials || emp.ini}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...T.bodyStrong, marginBottom: 2 }}>{emp.name}</div>
              <div style={T.caption}>{emp.role}</div>
              <div style={{ ...T.caption, marginTop: 4 }}>
                {(emp.contacts || []).map((ct, i) => (
                  <span key={i}>{i > 0 && " · "}{ct.label}: {ct.value}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
              <button onClick={() => startEdit(emp)} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, color: C.t2, cursor: "pointer", padding: 8, display: "flex", minWidth: 36, minHeight: 36, alignItems: "center", justifyContent: "center" }}>
                <Pencil size={13} />
              </button>
              <button onClick={() => remove(emp.id!)} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, color: C.t3, cursor: "pointer", padding: 8, display: "flex", minWidth: 36, minHeight: 36, alignItems: "center", justifyContent: "center" }}>
                <Trash size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
