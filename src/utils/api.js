const BASE_URL = "http://localhost:5000";

async function request(url, method = "GET", body) {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      ...(body instanceof FormData
        ? {} // FormData сам ставит boundary
        : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  if (body) {
    options.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  const response = await fetch(BASE_URL + url, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "API Error");
  }

  return response.json().catch(() => ({}));
}

export const api = {
  get: (url) => request(url, "GET"),
  post: (url, body) => request(url, "POST", body),
  put: (url, body) => request(url, "PUT", body),
  patch: (url, body) => request(url, "PATCH", body),
  delete: (url) => request(url, "DELETE"),
};
