"use client";

import { useState, useEffect } from "react";
import { Lock, Users, Plus, Trash, Pencil } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";
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

  if (!authed) {
    return (
      <div>
        <PageHeader title="Team" desc="Mitarbeiter verwalten für die Signatur-Generierung." mobile={mobile} />
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6 max-w-[360px]">
          <div className="flex items-center gap-[7px] mb-4">
            <Lock size={14} className="text-muted-foreground" />
            <span className="text-[13px] font-medium text-foreground">Admin-Zugang</span>
          </div>
          <div className="mb-4">
            <label className="text-[11px] text-hub-t3 mb-1 block">Passwort</label>
            <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); setAuthError(false); }} onKeyDown={(e) => e.key === "Enter" && doLogin()} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-[13px] font-hub outline-none min-h-[38px]" placeholder="Admin-Passwort eingeben" />
          </div>
          {authError && <p className="text-[11px] text-red-500 mb-4">Falsches Passwort.</p>}
          <button onClick={doLogin} className="px-4 py-2 rounded-lg border-none text-xs font-medium font-hub cursor-pointer flex items-center gap-1.5 min-h-[44px] bg-foreground text-background">Anmelden</button>
        </div>
      </div>
    );
  }

  if (editing !== null) {
    return (
      <div>
        <PageHeader title={editing === "new" ? "Neue/r Mitarbeiter/in" : "Mitarbeiter bearbeiten"} desc="Felder ausfüllen und speichern." mobile={mobile} />
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6 max-w-[480px]">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[11px] text-hub-t3 mb-1 block">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-[13px] font-hub outline-none min-h-[38px]" placeholder="Max Mustermann" />
            </div>
            <div>
              <label className="text-[11px] text-hub-t3 mb-1 block">Rolle / Position</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-[13px] font-hub outline-none min-h-[38px]" placeholder="Geschäftsführer" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-hub-t3 mb-1 block">Initialen</label>
                <input value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value.toUpperCase().slice(0, 4) })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-[13px] font-hub outline-none min-h-[38px]" placeholder="MM" maxLength={4} />
              </div>
              <div>
                <label className="text-[11px] text-hub-t3 mb-1 block">Reihenfolge</label>
                <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-[13px] font-hub outline-none min-h-[38px]" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] text-hub-t3 block">Kontakte</label>
                <button onClick={addContact} className="px-2.5 py-1 rounded-lg border border-border text-muted-foreground text-[11px] font-medium font-hub cursor-pointer flex items-center gap-1.5 min-h-[28px] bg-transparent">
                  <Plus size={11} /> Hinzufügen
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {form.contacts.map((ct, ci) => (
                  <div key={ci} className="flex gap-2 items-center">
                    <select value={ct.label} onChange={(e) => updateContact(ci, "label", e.target.value)} className="w-14 px-1 py-2 rounded-lg border border-border bg-background text-foreground text-[13px] font-hub outline-none min-h-[38px] shrink-0">
                      <option value="T">T</option>
                      <option value="M">M</option>
                      <option value="E">E</option>
                    </select>
                    <input value={ct.value} onChange={(e) => updateContact(ci, "value", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-[13px] font-hub outline-none min-h-[38px] flex-1" placeholder={ct.label === "E" ? "email@casago.de" : "+49 ..."} />
                    {form.contacts.length > 1 && (
                      <button onClick={() => removeContact(ci)} className="bg-transparent border-none text-hub-t3 cursor-pointer p-1 flex">
                        <Trash size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <button onClick={save} disabled={saving || !form.name.trim() || !form.role.trim()} className={cn("px-4 py-2 rounded-lg border-none text-xs font-medium font-hub cursor-pointer flex items-center gap-1.5 min-h-[44px] bg-foreground text-background", (saving || !form.name.trim()) && "opacity-50")}>
              {saving ? "Speichern..." : "Speichern"}
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-border text-xs font-medium font-hub cursor-pointer flex items-center gap-1.5 min-h-[44px] bg-transparent text-muted-foreground">
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
      <div className="flex justify-between items-center mb-4">
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.06em] leading-none">{team.length} Mitarbeiter</div>
        <button onClick={startNew} className="px-4 py-2 rounded-lg border-none text-xs font-medium font-hub cursor-pointer flex items-center gap-1.5 min-h-[44px] bg-foreground text-background">
          <Plus size={13} /> Hinzufügen
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {team.map((emp) => (
          <div key={emp.id || emp.ini} className="rounded-xl border border-border bg-card overflow-hidden py-4 px-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-hub-active text-muted-foreground flex items-center justify-center text-[13px] font-bold shrink-0">
              {emp.initials || emp.ini}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-foreground mb-0.5">{emp.name}</div>
              <div className="text-[11px] text-hub-t3">{emp.role}</div>
              <div className="text-[11px] text-hub-t3 mt-1">
                {(emp.contacts || []).map((ct, i) => (
                  <span key={i}>{i > 0 && " · "}{ct.label}: {ct.value}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => startEdit(emp)} className="bg-transparent border border-border rounded-lg text-muted-foreground cursor-pointer p-2 flex min-w-[44px] min-h-[44px] items-center justify-center">
                <Pencil size={13} />
              </button>
              <button onClick={() => remove(emp.id!)} className="bg-transparent border border-border rounded-lg text-muted-foreground cursor-pointer p-2 flex min-w-[44px] min-h-[44px] items-center justify-center">
                <Trash size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
