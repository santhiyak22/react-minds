let authToken: string | null = null;
let authRole: string | null = null;

export function setAuthSession(token: string, role: string) {
  authToken = token;
  authRole = role;
}

export function clearAuthSession() {
  authToken = null;
  authRole = null;
}

export function getAuthToken() {
  return authToken;
}

export function getAuthRole() {
  return authRole;
}
