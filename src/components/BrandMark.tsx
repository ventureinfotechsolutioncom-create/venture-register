import React from 'react';

interface BrandMarkProps {
  className?: string;
}

/**
 * Vector recreation of the uploaded 3D folded lime-and-emerald ribbon "S" emblem.
 */
export const BrandMark: React.FC<BrandMarkProps> = ({ className = 'w-12 h-12' }) => {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Venture Infotech Ribbon Emblem"
    >
      <defs>
        {/* Top Ribbon Inner Dark Emerald Gradient */}
        <linearGradient id="topEmerald" x1="145" y1="20" x2="72" y2="122" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#84CC16" />
          <stop offset="45%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#14532D" />
        </linearGradient>

        {/* Top Ribbon Outer Lime Fold Gradient */}
        <linearGradient id="topLimeFold" x1="50" y1="75" x2="128" y2="165" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ECFCCB" />
          <stop offset="30%" stopColor="#BEF264" />
          <stop offset="75%" stopColor="#84CC16" />
          <stop offset="100%" stopColor="#4D7C0F" />
        </linearGradient>

        {/* Bottom Ribbon Inner Dark Emerald Gradient */}
        <linearGradient id="bottomEmerald" x1="168" y1="118" x2="95" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#14532D" />
          <stop offset="55%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#84CC16" />
        </linearGradient>

        {/* Bottom Ribbon Outer Lime Fold Gradient */}
        <linearGradient id="bottomLimeFold" x1="112" y1="75" x2="190" y2="165" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#65A30D" />
          <stop offset="35%" stopColor="#A3E635" />
          <stop offset="75%" stopColor="#D9F99D" />
          <stop offset="100%" stopColor="#84CC16" />
        </linearGradient>
      </defs>

      {/* Upper Ribbon Back Descending Sweep */}
      <path
        d="M126 18 C142 28, 150 52, 138 72 L92 118 C76 134, 58 118, 60 92 C62 76, 72 64, 84 52 L126 18 Z"
        fill="url(#topEmerald)"
      />

      {/* Upper Ribbon Front Lime Folded Turn */}
      <path
        d="M64 74 C52 94, 52 126, 68 144 L96 166 C106 174, 120 166, 126 154 L132 142 C136 134, 132 124, 122 116 L84 86 C72 76, 68 66, 64 74 Z"
        fill="url(#topLimeFold)"
      />

      {/* Lower Ribbon Back Ascending Sweep */}
      <path
        d="M114 222 C98 212, 90 188, 102 168 L148 122 C164 106, 182 122, 180 148 C178 164, 168 176, 156 188 L114 222 Z"
        fill="url(#bottomEmerald)"
      />

      {/* Lower Ribbon Front Lime Folded Turn */}
      <path
        d="M176 166 C188 146, 188 114, 172 96 L144 74 C134 66, 120 74, 114 86 L108 98 C104 106, 108 116, 118 124 L156 154 C168 164, 172 174, 176 166 Z"
        fill="url(#bottomLimeFold)"
      />
    </svg>
  );
};
