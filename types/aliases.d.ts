// Let TypeScript accept imports that use the '@' alias; runtime resolution is handled by webpack alias.
declare module '@/lib/*';
declare module '@/components/*';
declare module '@/*';
