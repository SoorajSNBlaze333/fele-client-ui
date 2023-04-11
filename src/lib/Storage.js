export const getItem = (key) => {
  if (window !== undefined && window.localStorage !== undefined) {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
}

export const setItem = (key, value) => {
  if (window !== undefined && window.localStorage !== undefined) {
    const item = JSON.stringify(value);
    window.localStorage.setItem(key, item);
  }
}

export const removeItem = (key) => {
  if (window !== undefined && window.localStorage !== undefined) {
    window.localStorage.removeItem(key);
  }
}