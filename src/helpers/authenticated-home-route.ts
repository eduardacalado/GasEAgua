export function getAuthenticatedHomeRoute(
  role: string
): "adminHome" | "userHome" {
  if (role === "ADMIN") {
    return "adminHome";
  }

  return "userHome";
}

export function getAuthenticatedHomeTabRoute(
  role: string
): "AdminHome" | "DeliveryHome" | "UserHome" {
  if (role === "ADMIN") {
    return "AdminHome";
  }

  if (role === "DELIVERY_MAN") {
    return "DeliveryHome";
  }

  return "UserHome";
}
