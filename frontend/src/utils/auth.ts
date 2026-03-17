export const getToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}
// src/utils/auth.ts
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token")
}

export const getUser = () => {
  const token = getToken()

  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload
  } catch (error) {
    console.log("Invalid token")
    return null
  }
}