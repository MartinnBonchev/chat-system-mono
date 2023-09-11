import Cookies from 'js-cookie';

const JWT_TOKEN_KEY = import.meta.env.VITE_JWT_TOKEN_KEY;
// 20 minutes
const JWT_TOKEN_MAX_AGE = 20;

export function getJWT() {
  return Cookies.get(JWT_TOKEN_KEY);
}

export function setJWT(token: string) {
  return Cookies.set(JWT_TOKEN_KEY, token, {
    expires: new Date().setMinutes(JWT_TOKEN_MAX_AGE),
  });
}

export function clearJWT() {
  return Cookies.remove(JWT_TOKEN_KEY);
}

export function hasJWT() {
  return Boolean(Cookies.get(JWT_TOKEN_KEY));
}
