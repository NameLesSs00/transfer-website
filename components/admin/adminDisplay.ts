import { AdminUser } from "@/store/features/admins/adminsModels";

export function getDisplayEmail(admin: AdminUser) {
  if (admin.username?.includes("@")) return admin.username;
  if (admin.email?.includes("@")) return admin.email;
  return admin.username || admin.email || "Unknown";
}

export function getDisplayRole(admin: AdminUser) {
  if (admin.email === "Admin" || admin.email === "SuperAdmin") return admin.email;
  if (admin.role === "Admin" || admin.role === "SuperAdmin") return admin.role;
  return admin.email || admin.role || "Admin";
}

export function getDisplayName(admin: AdminUser) {
  const roleLooksLikeName =
    admin.role &&
    admin.role !== "Admin" &&
    admin.role !== "SuperAdmin" &&
    !admin.role.includes("@");

  if (roleLooksLikeName) return admin.role;
  return getDisplayEmail(admin).split("@")[0] || "Admin";
}

export function formatAdminDate(value: string) {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}
