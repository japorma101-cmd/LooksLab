export type ProfileAccess = {
  subscription_status?: string | null;
  one_time_scan_used?: boolean | null;
};

export function canUseFullScan(profile: ProfileAccess | null | undefined) {
  if (!profile) return false;
  if (profile.subscription_status === "active") return true;
  if (profile.one_time_scan_used === false) return true;
  return false;
}

export function hasLearnAccess(profile: ProfileAccess | null | undefined) {
  return profile?.subscription_status === "active";
}