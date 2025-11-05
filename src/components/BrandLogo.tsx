interface BrandLogoProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function BrandLogo({ size = 24, color = '#00B894', className = '' }: BrandLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 1000 1000" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circle */}
      <circle 
        cx="500" 
        cy="500" 
        r="450" 
        stroke={color} 
        strokeWidth="60" 
        fill="none"
      />
      
      {/* Crossed out cigarette symbol */}
      {/* Top horizontal line */}
      <rect 
        x="300" 
        y="300" 
        width="400" 
        height="80" 
        rx="40"
        fill={color}
      />
      
      {/* Bottom horizontal line */}
      <rect 
        x="300" 
        y="620" 
        width="400" 
        height="80" 
        rx="40"
        fill={color}
      />
      
      {/* Diagonal cross line */}
      <rect 
        x="460" 
        y="200" 
        width="80" 
        height="600" 
        rx="40"
        fill={color}
        transform="rotate(45 500 500)"
      />
    </svg>
  );
}
