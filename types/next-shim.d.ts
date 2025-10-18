// Minimal shims so TypeScript can resolve Next modules during Vercel build.
// This affects only type-checking, not runtime behavior.

declare module 'next/link' {
  import * as React from 'react';
  const Link: React.ComponentType<any>;
  export default Link;
}

declare module 'next/image' {
  import * as React from 'react';
  const NextImage: React.ComponentType<any>;
  export default NextImage;
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
