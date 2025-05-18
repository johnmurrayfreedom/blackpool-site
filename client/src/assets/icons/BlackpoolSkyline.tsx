import React from 'react';

interface BlackpoolSkylineProps {
  className?: string;
  color?: string;
}

const BlackpoolSkyline: React.FC<BlackpoolSkylineProps> = ({ 
  className = "", 
  color = "#0B2D6B" 
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <title>Blackpool Skyline</title>
      <desc>A silhouette skyline of Blackpool featuring the iconic Blackpool Tower and other landmarks</desc>

      {/* Skyline silhouette */}
      <path
        fill={color}
        d="M0,180 
           L10,180 L10,160 L20,160 L20,150 L30,150 L30,160 L40,160 L40,140 L50,140 L50,150 L60,150 L60,130 L70,130 L70,150 L80,150 L80,140
           L90,140 L90,150 L100,150 L100,140 L110,140 L110,130 L120,130 L120,150 L130,150 L130,120 L140,120 L140,130 L150,130 L150,110
           
           L160,110 L160,120 L170,120 L170,100 L180,100 L180,90 L190,90 L190,70 
           
           /* Blackpool Tower */
           L200,70 L200,90 L210,60 L220,50 L230,40 L240,30 L250,20 L260,20 L270,30 L280,40 L290,50 L300,60 L310,90 L310,70
           
           L320,70 L320,90 L330,90 L330,100 L340,100 L340,120 L350,120 L350,110 L360,110 L360,130 L370,130 L370,140 L380,140 L380,120 L390,120 L390,150
           L400,150 L400,140 L410,140 L410,120 L420,120 L420,130 L430,130 L430,110 L440,110 L440,130 L450,130 L450,110 L460,110 L460,120 L470,120 L470,140
           
           /* Big Wheel */
           L480,140 L490,130 L500,110 L510,100 L520,95 L530,95 L540,100 L550,110 L560,130 L570,140
           
           L580,140 L580,130 L590,130 L590,150 L600,150 L600,130 L610,130 L610,140 L620,140 L620,120 L630,120 L630,140 L640,140 L640,130 L650,130 L650,150
           L660,150 L660,140 L670,140 L670,160 L680,160 L680,150 L690,150 L690,140 L700,140 L700,160 L710,160 L710,170 L720,170 L720,150 L730,150 L730,160
           L740,160 L740,170 L750,170 L750,150 L760,150 L760,160 L770,160 L770,170 L780,170 L780,160 L790,160 L790,180 L800,180
           
           L800,200 L0,200 Z"
      />

      {/* Water reflection - subtle wavy lines */}
      <path
        fill={color}
        opacity="0.1"
        d="M0,190 Q200,185 400,190 Q600,195 800,190 L800,200 L0,200 Z"
      />
      <path
        fill={color}
        opacity="0.05"
        d="M0,195 Q200,200 400,195 Q600,190 800,195 L800,200 L0,200 Z"
      />
    </svg>
  );
};

export default BlackpoolSkyline;
