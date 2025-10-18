// Minimal shims so TypeScript can resolve Next modules during build.
// This does not affect runtime; Next provides the actual modules.
declare module 'next/link' {
  import * as React from 'react';
  const Link: React.ComponentType<any>;
  export default Link;
}

declare module 'next/navigation' {
  export const useRouter: any;
  export const useSearchParams: any;
  export const redirect: any;
}

declare module 'next/server' {
  export const NextResponse: any;
  export type NextRequest = any;
}
