const API_URL = "http://localhost:5000/server"; //Backend

async function request(url, metod = "GET", body) {
  const token = localStorage.getItem("token");

  const options = {
    metod,
    Headers: {
      "Content-Typ": "application/json",
      ...(token ? { Autorizatin: `Bearer ${token}` } : {}),
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(API_URL + url, options);

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
  delete: (url) => request(url, "DELETE"),
};
