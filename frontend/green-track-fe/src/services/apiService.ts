const BASE_URL = "http://localhost:8080/api/auth";

const API_URLS = {
  login: "/login",
};

export async function login(payload: any) {
  console.log("Payload: ", payload);
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(`${BASE_URL}${API_URLS.login}`, {
    body: JSON.stringify(payload),
    method: "POST",
    headers,
  });
  console.log("Response: ", response);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Authentication failed");
  }

  return await response.json();
}
