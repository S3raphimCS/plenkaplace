import { createCsrfProtect, CsrfError } from '@edge-csrf/nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const csrfProtect = createCsrfProtect({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  try {
    await csrfProtect(request, response);
  } catch (err) {
    if (err instanceof CsrfError) {
      return new NextResponse('Invalid csrf token', { status: 403 });
    }
    throw err;
  }
  return response;
}
