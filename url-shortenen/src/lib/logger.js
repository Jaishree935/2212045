
export async function Log(stack, level, packageName, message) {
  const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
  const allowedPkgs  = ["api", "component", "hook", "page", "state", "style"];

  if (stack !== "frontend") throw new Error("stack must be 'frontend'");
  if (!allowedLevels.includes(level)) throw new Error("invalid level");
  if (!allowedPkgs.includes(packageName)) throw new Error("invalid package");

  const body = { stack, level, package: packageName, message: String(message) };

  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || res.statusText);
    return data; 
  } catch (err) {
    console.error("[Logger]", err?.message || err);
    return null;
  }
}
