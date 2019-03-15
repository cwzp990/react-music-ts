export function getToken(key) {
  if (window.sessionStorage) {
    return JSON.parse(sessionStorage.getItem(key))
  }
}

export function setToken(key, val) {
  if (window.sessionStorage) {
    sessionStorage.setItem(key, JSON.stringify(val))
  }
}

export function removeToken(key) {
  if (window.sessionStorage) {
    sessionStorage.removeItem(key)
  }
}
