// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("laravel_session");

  const { pathname } = request.nextUrl;

  // Permite acesso livre à tela de login
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Se não estiver autenticado e tentar acessar /admin, redireciona
  if (!session && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
