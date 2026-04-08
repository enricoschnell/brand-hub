"use client";

import { UserButton, useUser } from "@clerk/nextjs";

/**
 * Custom avatar that shows the user's initials (or profile photo if set).
 * The Clerk UserButton is overlaid invisibly so clicking opens the popup.
 */
export function SidebarAvatar() {
  const { user } = useUser();
  if (!user) return null;

  const initials = [user.firstName, user.lastName]
    .filter(Boolean)
    .map((n) => n![0].toUpperCase())
    .join("") || user.primaryEmailAddress?.emailAddress[0].toUpperCase() || "?";

  const hasPhoto = !!user.imageUrl && !user.imageUrl.includes("gravatar") && !user.imageUrl.includes("img.clerk");

  return (
    <div className="relative w-7 h-7 shrink-0">
      {/* Custom visual — initials or photo */}
      <div className="w-7 h-7 rounded-[8px] overflow-hidden flex items-center justify-center border border-white/10 bg-hub-surface text-hub-t1 text-[11px] font-semibold font-hub select-none pointer-events-none">
        {hasPhoto ? (
          <img src={user.imageUrl} alt={user.fullName ?? ""} className="w-full h-full object-cover" />
        ) : (
          initials
        )}
      </div>

      {/* Invisible Clerk UserButton overlay — handles click + popup */}
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            rootBox: "absolute inset-0 opacity-0 cursor-pointer",
            avatarBox: "w-full h-full",
          },
        }}
      />
    </div>
  );
}
