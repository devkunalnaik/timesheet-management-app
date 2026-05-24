import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (email === "admin@tentwenty.test" && password === "password") {
          return { id: "1", name: "Admin", email };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
};

async function handleAuth(request: Request, ctx: { params: Promise<{ nextauth: string[] }> }) {
  const { headers, cookies } = await import("next/headers");
  const nextAuthModule = await import("next-auth/next");

  const nextauth = (await ctx.params)?.nextauth;
  const url = new URL(request.url);
  const query = Object.fromEntries(url.searchParams);

  let body: any;
  if (request.method === "POST") {
    const contentType = request.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      body = await request.json();
    } else if (contentType?.includes("application/x-www-form-urlencoded")) {
      const params = new URLSearchParams(await request.text());
      body = Object.fromEntries(params);
    }
  }

  const cookieStore = await cookies();
  const req = {
    body,
    query,
    cookies: Object.fromEntries(cookieStore.getAll().map((c) => [c.name, c.value])),
    headers: Object.fromEntries(request.headers),
    method: request.method,
    action: nextauth?.[0],
    providerId: nextauth?.[1],
    error: query.error ?? nextauth?.[1],
  };

  const handler = (NextAuth as any)(authOptions);
  const result = await handler(
    req,
    { params: ctx.params }
  );

  if (result instanceof Response) {
    return result;
  }

  const responseBody = result.body;
  const status = result.status ?? 200;
  const responseHeaders: Record<string, string> = {};

  if (result.headers) {
    for (const h of result.headers) {
      responseHeaders[h.key] = h.value;
    }
  }

  if (result.cookies) {
    const setCookies: string[] = [];
    for (const cookie of result.cookies) {
      const serialized = require("cookie").serialize(cookie.name, cookie.value, cookie.options);
      setCookies.push(serialized);
    }
    if (setCookies.length > 0) {
      responseHeaders["Set-Cookie"] = setCookies.join(", ");
    }
  }

  if (result.redirect) {
    return Response.json({ url: result.redirect }, { status: 302, headers: { Location: result.redirect, ...responseHeaders } });
  }

  const contentType = responseHeaders["Content-Type"] ?? responseHeaders["content-type"];
  if (contentType === "application/json") {
    return Response.json(responseBody ?? null, { status, headers: responseHeaders });
  }

  return new Response(responseBody ?? null, { status, headers: responseHeaders });
}

export async function GET(request: Request, ctx: { params: Promise<{ nextauth: string[] }> }) {
  return handleAuth(request, ctx);
}

export async function POST(request: Request, ctx: { params: Promise<{ nextauth: string[] }> }) {
  return handleAuth(request, ctx);
}
