"use client";

import type React from "react";
import { useMemo, useId } from "react";
import { motion } from "motion/react";

interface CenterLockProps {
  centerX: number;
  centerY: number;
  scale?: number;
  rotation?: number;
}

const CenterLock: React.FC<CenterLockProps> = ({
  centerX,
  centerY,
  scale = 1.5,
  rotation = 0,
}) => {
  const id = useId();

  const ids = useMemo(
    () => ({
      shadow: `lockShadow-${id}`,
      arm1: `lockArm1-${id}`,
      cap1: `lockCap1-${id}`,
      arm2: `lockArm2-${id}`,
      cap2: `lockCap2-${id}`,
      arm3: `lockArm3-${id}`,
      cap3: `lockCap3-${id}`,
      arm4: `lockArm4-${id}`,
      cap4: `lockCap4-${id}`,
      center: `lockCenter-${id}`,
    }),
    [id]
  );

  return (
    <g
      transform={`translate(${centerX}, ${centerY}) scale(${scale}) translate(-115.15, -121.74)`}
    >
      <defs>
        <filter
          id={ids.shadow}
          x="-10"
          y="10"
          width="236.3"
          height="243.479"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-10" dy="10" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id={ids.arm1}
          x1="165.139"
          y1="91.6631"
          x2="165.139"
          y2="102.681"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0F1221" />
          <stop offset="0.489583" stopColor="#2C3353" />
          <stop offset="1" stopColor="#0F1221" />
        </linearGradient>
        <radialGradient
          id={ids.cap1}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(195.282 21.0186) rotate(90) scale(14.0524)"
        >
          <stop stopColor="#36406A" />
          <stop offset="1" stopColor="#0F1221" />
        </radialGradient>
        <linearGradient
          id={ids.arm2}
          x1="47.6151"
          y1="0"
          x2="47.6151"
          y2="11.0184"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0F1221" />
          <stop offset="0.489583" stopColor="#2C3353" />
          <stop offset="1" stopColor="#0F1221" />
        </linearGradient>
        <radialGradient
          id={ids.cap2}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(11.0184 11.0184) rotate(90) scale(14.0524)"
        >
          <stop stopColor="#36406A" />
          <stop offset="1" stopColor="#0F1221" />
        </radialGradient>
        <linearGradient
          id={ids.arm3}
          x1="166.391"
          y1="111.815"
          x2="166.391"
          y2="122.834"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0F1221" />
          <stop offset="0.489583" stopColor="#2C3353" />
          <stop offset="1" stopColor="#0F1221" />
        </linearGradient>
        <radialGradient
          id={ids.cap3}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(41.0183 182.46) rotate(90) scale(14.0524)"
        >
          <stop stopColor="#36406A" />
          <stop offset="1" stopColor="#0F1221" />
        </radialGradient>
        <linearGradient
          id={ids.arm4}
          x1="47.6151"
          y1="0"
          x2="47.6151"
          y2="11.0184"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0F1221" />
          <stop offset="0.489583" stopColor="#2C3353" />
          <stop offset="1" stopColor="#0F1221" />
        </linearGradient>
        <radialGradient
          id={ids.cap4}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(11.0184 11.0184) rotate(90) scale(14.0524)"
        >
          <stop stopColor="#36406A" />
          <stop offset="1" stopColor="#0F1221" />
        </radialGradient>
        <radialGradient
          id={ids.center}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(117.31 101.924) rotate(90) scale(34.6291)"
        >
          <stop stopColor="#36406A" />
          <stop offset="1" stopColor="#0F1221" />
        </radialGradient>
      </defs>

      <motion.g
        filter={`url(#${ids.shadow})`}
        animate={{ rotate: rotation }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <rect
          x="117.523"
          y="91.6631"
          width="95.2301"
          height="11.0184"
          transform="rotate(-45 117.523 91.6631)"
          fill={`url(#${ids.arm1})`}
        />
        <circle
          cx="195.282"
          cy="21.0186"
          r="11.0184"
          transform="rotate(-45 195.282 21.0186)"
          fill={`url(#${ids.cap1})`}
        />
        <rect
          width="95.2301"
          height="11.0184"
          transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 118.776 91.6631)"
          fill={`url(#${ids.arm2})`}
        />
        <circle
          cx="11.0184"
          cy="11.0184"
          r="11.0184"
          transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 56.6006 21.0186)"
          fill={`url(#${ids.cap2})`}
        />
        <rect
          x="118.776"
          y="111.815"
          width="95.2301"
          height="11.0184"
          transform="rotate(135 118.776 111.815)"
          fill={`url(#${ids.arm3})`}
        />
        <circle
          cx="41.0183"
          cy="182.46"
          r="11.0184"
          transform="rotate(135 41.0183 182.46)"
          fill={`url(#${ids.cap3})`}
        />
        <rect
          width="95.2301"
          height="11.0184"
          transform="matrix(0.707107 0.707107 0.707107 -0.707107 117.521 111.815)"
          fill={`url(#${ids.arm4})`}
        />
        <circle
          cx="11.0184"
          cy="11.0184"
          r="11.0184"
          transform="matrix(0.707107 0.707107 0.707107 -0.707107 179.695 182.46)"
          fill={`url(#${ids.cap4})`}
        />
        <ellipse
          cx="117.31"
          cy="101.924"
          rx="27.1524"
          ry="27.1524"
          fill={`url(#${ids.center})`}
        />
      </motion.g>
    </g>
  );
};

export default CenterLock;
