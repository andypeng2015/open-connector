export const workdayOAuthScopes: string[] = [
  "workday.worker_profile.read",
  "workday.staffing.read",
  "workday.recruiting.read",
];

export const workdayProviderPermissions = {
  workerProfile: "Worker Profile",
  staffing: "Staffing",
  recruiting: "Recruiting",
} as const;
