import type { Context, Next } from "hono";
import type { SessionManager } from "./session.js";
import { loginPage } from "../views/pages.js";

export function requireAuth(sessions: SessionManager) {
  return async (c: Context, next: Next) => {
    const session = sessions.getSession(c);
    if (!session) {
      const acceptsHtml = c.req.header("accept")?.includes("text/html");
      if (acceptsHtml || c.req.path === "/") {
        return c.html(loginPage());
      }
      return c.json({ error: "No autenticado. Inicia sesión en /auth/google" }, 401);
    }
    c.set("userEmail", session.email);
    await next();
  };
}
