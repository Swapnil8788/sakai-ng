export const getTokenExpiry = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.exp ? payload.exp * 1000 : null;
  } catch (e) {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const expiry = getTokenExpiry(token);
  return expiry ? Date.now() > expiry : true;
};