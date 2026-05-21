export const DigitelleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g fill="currentColor">
      {/* The main D body with hole */}
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M38 20 H65 C81.568 20 95 33.431 95 50 C95 66.569 81.568 80 65 80 H38 C43.5 72 45 62 45 50 C45 38 43.5 28 38 20 Z M60 38 H55 C53 45 53 55 55 62 H60 C66.627 62 72 56.627 72 50 C72 43.373 66.627 38 60 38 Z" 
      />
      
      {/* Pixel clusters on the left */}
      <rect x="24" y="26" width="10" height="10" />
      <rect x="14" y="40" width="12" height="12" />
      <rect x="22" y="55" width="8" height="8" />
      <rect x="10" y="58" width="6" height="6" />
      
      <rect x="35" y="32" width="12" height="12" />
      <rect x="38" y="47" width="14" height="14" />
      <rect x="28" y="45" width="8" height="8" />
      <rect x="30" y="68" width="10" height="10" />
      <rect x="18" y="72" width="6" height="6" />
      
      <rect x="49" y="30" width="14" height="14" />
      
    </g>
  </svg>
);
