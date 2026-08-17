export function getAuthenticatedHomeRoute(
  role: string
): "adminHome" | "userHome" {
  if (role === "ADMIN") {
    return "adminHome";
  }

  return "userHome";
}
