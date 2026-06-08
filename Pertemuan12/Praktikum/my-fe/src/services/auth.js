import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_BASE_URL = API_BASE_URL?.replace(/\/api\/?$/, "");
const TOKEN_KEY = "token";
const USER_KEY = "user";

if (!AUTH_BASE_URL) {
  throw new Error("VITE_API_BASE_URL belum diatur di file .env");
}

const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
}

export function saveAuthSession({ token, user }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function login({ username, password }) {
  const response = await authApi.post("/login", { username, password });
  return response.data?.data ?? response.data;
}

export async function register({ username, password, role }) {
  const response = await authApi.post("/register", { username, password, role });
  return response.data?.data ?? response.data;
}