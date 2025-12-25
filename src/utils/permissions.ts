export const hasPermission = (
  userPermissions: string[] | "ALL",
  requiredPermission: string
): boolean => {
  if (userPermissions === "ALL") return true;
  return userPermissions.includes(requiredPermission);
};

export const hasAnyPermission = (
  userPermissions: string[] | "ALL",
  requiredPermissions: string[]
): boolean => {
  if (userPermissions === "ALL") return true;
  return requiredPermissions.some(p => userPermissions.includes(p));
};

export const hasAllPermissions = (
  userPermissions: string[] | "ALL",
  requiredPermissions: string[]
): boolean => {
  if (userPermissions === "ALL") return true;
  return requiredPermissions.every(p => userPermissions.includes(p));
};
