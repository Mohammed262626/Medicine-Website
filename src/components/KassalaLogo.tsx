import React from 'react';

interface KassalaLogoProps {
  className?: string;
  size?: number;
}

export default function KassalaLogo({ className = '', size = 48 }: KassalaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} text-emerald-700`}
      id="kassala-university-logo-svg"
    >
      {/* 1. Main Shield Frame & Outer Outline */}
      <path
        d="M15,10 C35,22 50,22 60,18 C70,22 85,22 105,10 C105,30 106,58 103,75 C97,95 85,102 60,115 C35,102 23,95 17,75 C14,58 15,30 15,10 Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="white"
      />

      {/* Internal partition line above the banner */}
      <path
        d="M18,72 C40,68 80,68 102,72"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* 2. Sun & Sunbeams at the top */}
      <g id="logo-sunburst" opacity="0.9">
        {/* Sun Hub */}
        <path
          d="M48,32 C48,25 72,25 72,32 Z"
          fill="currentColor"
        />
        {/* Beams */}
        <line x1="60" y1="18" x2="60" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="46" y1="20" x2="51" y2="26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="74" y1="20" x2="69" y2="26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="33" y1="25" x2="42" y2="29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="87" y1="25" x2="78" y2="29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="33" x2="35" y2="34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="96" y1="33" x2="85" y2="34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* 3. Taka Mountain (جبل التاكا) in the center */}
      <path
        d="M40,48 C48,30 72,30 80,48 C75,51 68,52 60,51 C52,52 45,51 40,48 Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Mountain internal detail line */}
      <path
        d="M48,46 C54,42 66,42 72,46"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />

      {/* 4. Left side: The agricultural tree (symbolizing orchards of Kassala) */}
      <g id="logo-tree" transform="translate(25, 38)">
        {/* Trunk */}
        <path d="M7,16 L7,24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M4,24 L10,24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Canopy */}
        <path
          d="M7,2 C3,6 2,16 7,17 C12,16 11,6 7,2 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Fruits / leaves dots */}
        <circle cx="5" cy="8" r="1" fill="white" />
        <circle cx="9" cy="11" r="1" fill="white" />
        <circle cx="6" cy="13" r="1" fill="white" />
      </g>

      {/* 5. Right side: Famous landmark of Kassala (Taka monument or tower) */}
      <g id="logo-landmark" transform="translate(80, 36)">
        {/* Tower pedestal */}
        <path d="M2,24 L14,24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M5,24 L5,20 L11,20 L11,24" stroke="currentColor" strokeWidth="1.5" fill="currentColor" />
        {/* Spire/Obelisk shape */}
        <path
          d="M8,2 L5,14 L5,20 L11,20 L11,14 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Details */}
        <line x1="8" y1="6" x2="8" y2="14" stroke="white" strokeWidth="1" />
      </g>

      {/* 6. Center: Crescent / Flame below Mountain */}
      <path
        d="M52,56 C52,62 68,62 68,56 C68,61 52,61 52,56 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="60" cy="57" r="2.5" fill="currentColor" />

      {/* 7. Bottom: Gash River Waves (نهر القاش) */}
      <g id="logo-gash-river" opacity="0.85">
        <path
          d="M26,78 C38,74 46,82 60,78 C74,74 82,82 94,78"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M26,84 C38,80 46,88 60,84 C74,80 82,88 94,84"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* 8. Bottom Scroll Banner & Arabic Text "جامعة كسلا" */}
      <g id="logo-banner">
        {/* Banner Shape */}
        <path
          d="M10,90 Q60,118 110,90 Q95,115 60,112 Q25,115 10,90 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* White Arabic Text path mapped inside the banner */}
        <text
          x="60"
          y="104"
          textAnchor="middle"
          fill="white"
          fontSize="9.5"
          fontWeight="900"
          fontFamily="Cairo, Tajawal, 'Segoe UI', system-ui, sans-serif"
          className="select-none"
        >
          جامعة كسلا
        </text>
      </g>
    </svg>
  );
}
