import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the path is exactly the root route
  if (request.nextUrl.pathname === '/') {
    // Redirect to the dashboard route
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}

// Specify which routes this middleware should run on
export const config = {
  matcher: '/',
}