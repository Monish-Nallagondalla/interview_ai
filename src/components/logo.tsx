interface LogoProps {
  size?: number;
}

export function Logo({ size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Yellow background square with rounded corners */}
      <rect width="32" height="32" rx="7" fill="#FFE600" />

      {/* Stylised "I" bar — top */}
      <rect x="8" y="8" width="16" height="3" rx="1.5" fill="#1a1a2e" />

      {/* Stylised "I" bar — bottom */}
      <rect x="8" y="21" width="16" height="3" rx="1.5" fill="#1a1a2e" />

      {/* Stylised "I" stem */}
      <rect x="14.5" y="11" width="3" height="10" rx="1.5" fill="#1a1a2e" />

      {/* AI spark dot — top right accent */}
      <circle cx="24" cy="8" r="2.5" fill="#1a1a2e" />
      <circle cx="24" cy="8" r="1.2" fill="#FFE600" />
    </svg>
  );
}
