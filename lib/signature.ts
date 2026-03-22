import { META, SC, LOGO_SIZES, TEAM, type TeamMember } from "@/lib/brand-data";

export interface SignatureOptions {
  showClaim?: boolean;
  showAddress?: boolean;
  logoSize?: "regular" | "large";
}

/**
 * Build email signature HTML for a team member.
 * Used by both the sig page and the agent's generate_signature tool.
 */
export function buildSignatureHtml(
  person: TeamMember,
  options: SignatureOptions = {}
): string {
  const { showClaim = true, showAddress = true, logoSize = "regular" } = options;
  const c = SC.light;
  const logoW = LOGO_SIZES[logoSize];

  const contactRows = person.contacts
    .map(
      (ct) =>
        `<tr><td style="font-size:14px;line-height:1.4;padding:2px 0;"><span style="display:inline-block;width:18px;color:${c.lbl};font-weight:500;">${ct.label}</span><a href="${ct.href}" style="color:${ct.label === "E" ? c.p : c.s};text-decoration:none;">${ct.value}</a></td></tr>`
    )
    .join("");

  const hasClosing = showAddress || showClaim;

  return [
    `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Helvetica,Arial,sans-serif;color:${c.p};">`,
    `<tr><td style="padding-bottom:20px;"><a href="https://${META.website}" style="text-decoration:none;"><img src="https://brand.casago.de/sig/wortmarke.png" alt="${META.name}" width="${logoW}" style="display:block;border:0;"/></a></td></tr>`,
    `<tr><td style="padding-bottom:16px;"><p style="margin:0;font-size:17px;font-weight:600;color:${c.p};line-height:1.3;">${person.name}</p><p style="margin:4px 0 0;font-size:14px;color:${c.s};line-height:1.4;">${person.role}</p></td></tr>`,
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
}

/**
 * Find a team member by name (fuzzy match).
 */
export function findTeamMember(name: string): TeamMember | undefined {
  const q = name.toLowerCase().trim();
  return TEAM.find(
    (t) =>
      t.name.toLowerCase() === q ||
      t.name.toLowerCase().includes(q) ||
      t.ini.toLowerCase() === q
  );
}
