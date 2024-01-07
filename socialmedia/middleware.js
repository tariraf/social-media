import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const { pathname } = request.nextUrl;
    const isCookiesExist = request.cookies.get("user_token");
    const isLoginPage = pathname.startsWith('/login');
    const isRegisterPage = pathname.startsWith('/register');
  
    if (isCookiesExist && (isLoginPage || isRegisterPage)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  
    if (!isCookiesExist && !isLoginPage && !isRegisterPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
            '/((?!api|_next/static|_next/image|favicon.ico|bg-purple.png|whisperLogo.png).*)',
            '/register'
           ],
}