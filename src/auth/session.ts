import { createHmac, timingSafeEqual } from "node:crypto";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import type { Context } from "hono";

const COOKIE_NAME = "gmail_inbox_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export interface SessionData {
  email: string;
  exp: number;
}

export class SessionManager {
  constructor(private readonly secret: string) {}

  sign(data: SessionData): string {
    const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
    const signature = createHmac("sha256", this.secret)
      .update(payload)
      .digest("base64url");
    return `${payload}.${signature}`;
  }

  verify(token: string): SessionData | null {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;

    const expected = createHmac("sha256", this.secret)
      .update(payload)
      .digest("base64url");

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    try {
      const data = JSON.parse(
        Buffer.from(payload, "base64url").toString("utf8"),
      ) as SessionData;
      if (!data.email || !data.exp || Date.now() > data.exp) return null;
      return data;
    } catch {
      return null;
    }
  }

  setSession(c: Context, email: string): void {
    const data: SessionData = {
      email,
      exp: Date.now() + MAX_AGE_SECONDS * 1000,
    };
    setCookie(c, COOKIE_NAME, this.sign(data), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
      maxAge: MAX_AGE_SECONDS,
    });
  }

  clearSession(c: Context): void {
    deleteCookie(c, COOKIE_NAME, { path: "/" });
  }

  getSession(c: Context): SessionData | null {
    const token = getCookie(c, COOKIE_NAME);
    if (!token) return null;
    return this.verify(token);
  }
}
