const getDefaultApiBaseUrl = () => {
  if (typeof window === "undefined") {
    return "http://127.0.0.1:8000/api";
  }

  const { protocol, hostname } = window.location;
  const localHosts = ["localhost", "127.0.0.1", "::1"];

  if (localHosts.includes(hostname)) {
    return "http://127.0.0.1:8000/api";
  }

  return `${protocol}//${hostname}:8000/api`;
};

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || getDefaultApiBaseUrl();
