import { loadLinks, saveLinks } from "./storage";
import { Log } from "../lib/logger";

const randCode = (len = 6) =>
  Array.from({ length: len }, () => "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"
    .charAt(Math.floor(Math.random() * 56))).join("");

const now = () => new Date().toISOString();

export function listLinks() {
  return loadLinks();
}

export function findByCode(code) {
  return loadLinks().find(x => x.code === code);
}

export function registerClick(code, meta = {}) {
  const items = loadLinks();
  const idx = items.findIndex(x => x.code === code);
  if (idx === -1) return;

  const click = {
    at: now(),
    referrer: document.referrer || "direct",
    coarseGeo: Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown",
    ...meta,
  };

  items[idx].clicks.push(click);
  saveLinks(items);
}

export async function createShort({ longUrl, minutes, custom }) {
  const items = loadLinks();

  // Ensure uniqueness of shortcode
  let code = (custom || "").trim();
  if (code) {
    if (items.some(x => x.code.toLowerCase() === code.toLowerCase()))
      throw new Error("Shortcode already exists");
  } else {
    do { code = randCode(6); }
    while (items.some(x => x.code === code));
  }

  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + minutes * 60 * 1000);

  const entry = {
    code,
    longUrl,
    createdAt: createdAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    clicks: [],
  };

  items.push(entry);
  saveLinks(items);

  await Log("frontend", "info", "state", `Created short url ${code} for ${longUrl}`);
  return entry;
}
export async function deleteShort(code) {
  const items = loadLinks();
  const idx = items.findIndex(x => x.code === code);
  if (idx === -1) return;

  items.splice(idx, 1);
  saveLinks(items);

  await Log("frontend", "info", "state", `Deleted short url ${code}`);
  return true;
}
