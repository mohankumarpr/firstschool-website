type IconProps = { size?: number; className?: string };

export function FacebookIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.25-1.5 1.55-1.5H16.7V3.3C16.4 3.25 15.4 3.16 14.25 3.16c-2.4 0-4.05 1.47-4.05 4.17v2.47H7.5v3.2h2.7v8h3.3z" />
    </svg>
  );
}

export function InstagramIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TwitterIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.9 3H22l-7.2 8.2L23 21h-6.4l-5-6.5L5.7 21H2.6l7.7-8.8L2 3h6.5l4.5 5.9L18.9 3zm-1.1 16h1.7L7.3 5H5.5l12.3 14z" />
    </svg>
  );
}

export function YoutubeIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 12s0-3.2-.4-4.7c-.24-.87-.94-1.55-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5c-.87.25-1.56.93-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7c.24.87.94 1.55 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.5c.87-.25 1.56-.93 1.8-1.8.4-1.5.4-4.7.4-4.7zM10 15.2V8.8L15.5 12 10 15.2z" />
    </svg>
  );
}
