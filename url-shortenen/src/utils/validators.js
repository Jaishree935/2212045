export const isValidUrl = (s) => {
  try {
    const u = new URL(s);
    return !!u.protocol && !!u.host;
  } catch {
    return false;
  }
};

export const isAlphaNum = (s) => /^[A-Za-z0-9]+$/.test(s);

export const parseValidityMins = (val) => {
  if (val === "" || val === null || val === undefined) return 30; // default 30 mins
  const n = Number(val);
  return Number.isInteger(n) && n > 0 ? n : NaN;
};
export const isValidValidityMins = (val) => {
  const n = parseValidityMins(val);
  return !Number.isNaN(n) && n > 0;
};
