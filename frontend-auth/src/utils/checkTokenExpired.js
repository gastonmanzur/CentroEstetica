import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return true;

    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};
