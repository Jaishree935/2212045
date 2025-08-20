const KEY = "links";

export const loadLinks = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
};

export const saveLinks = (arr) => {
  localStorage.setItem(KEY, JSON.stringify(arr));
};
