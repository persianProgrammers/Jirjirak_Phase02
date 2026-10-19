import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';

export type DayFxType = 'paper-planes' | 'spinning-seeds' | 'glass-bubbles' | 'linear-clouds' | 'dandelions' | 'none';

interface DayFloatingFxProps {
  type: DayFxType;
  enabled: boolean;
}

export const DayFloatingFx: React.FC<DayFloatingFxProps> = ({ type, enabled }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  if (!enabled || type === 'none') {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {type === 'paper-planes' && <PaperPlanesFx />}
      {type === 'spinning-seeds' && <SpinningSeedsFx />}
      {type === 'glass-bubbles' && <GlassBubblesFx />}
      {type === 'linear-clouds' && <LinearCloudsFx />}
      {type === 'dandelions' && <InteractiveDandelionsFx />}
    </div>
  );
};

/* =========================================================================
   1. PAPER PLANES FX (هواپیماهای کاغذی اوریگامی و معمارانه)
   ========================================================================= */
const PaperPlanesFx: React.FC = () => {
  const count = 7;
  const planes = useMemo(() => Array.from({ length: count }), []);
  const planesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      planesRef.current.forEach((plane, i) => {
        if (!plane) return;

        const isSmall = i % 3 === 2;
        const scale = isSmall ? gsap.utils.random(0.5, 0.7) : gsap.utils.random(0.85, 1.2);
        const baseOpacity = isSmall ? gsap.utils.random(0.4, 0.55) : gsap.utils.random(0.7, 0.95);

        // Initial scattered setup
        gsap.set(plane, {
          x: () => gsap.utils.random(-50, window.innerWidth - 100),
          y: () => gsap.utils.random(40, window.innerHeight * 0.85),
          scale,
          opacity: baseOpacity,
          rotation: () => gsap.utils.random(-15, 10),
        });

        const fly = () => {
          // Flight path: gliding diagonally forward and subtly banking
          const deltaX = gsap.utils.random(180, 420);
          const deltaY = gsap.utils.random(-80, 60);
          const duration = gsap.utils.random(12, 22);
          const bankAngle = deltaY < 0 ? gsap.utils.random(-18, -4) : gsap.utils.random(2, 16);

          gsap.to(plane, {
            x: `+=${deltaX}`,
            y: `+=${deltaY}`,
            rotation: bankAngle,
            duration,
            ease: 'sine.inOut',
            onComplete: () => {
              const curX = gsap.getProperty(plane, 'x') as number;
              const curY = gsap.getProperty(plane, 'y') as number;

              // Reset when flying out of screen
              if (curX > window.innerWidth + 80 || curY < -60 || curY > window.innerHeight + 80) {
                gsap.set(plane, {
                  x: gsap.utils.random(-120, -40),
                  y: gsap.utils.random(60, window.innerHeight * 0.75),
                  rotation: gsap.utils.random(-10, 8),
                });
              }
              fly();
            },
          });
        };

        fly();
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes planeSway {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }
        .plane-glider {
          animation: planeSway 5s ease-in-out infinite;
        }
      `}</style>
      {planes.map((_, i) => (
        <div
          key={`plane-${i}`}
          ref={(el) => { planesRef.current[i] = el; }}
          className="absolute top-0 left-0 pointer-events-none will-change-transform"
        >
          <div 
            className="plane-glider relative flex items-center justify-center text-brand-dark"
            style={{ animationDelay: `${(i * 0.7) % 5}s` }}
          >
            {/* Origami Paper Airplane SVG with 3D Fold Shading */}
            <svg 
              width="46" 
              height="28" 
              viewBox="0 0 46 28" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.08)]"
            >
              {/* Upper Main Wing (Lighter) */}
              <polygon points="2,14 44,4 24,14" fill="currentColor" fillOpacity="0.85" />
              {/* Lower Wing (Midtone) */}
              <polygon points="2,14 44,24 24,14" fill="currentColor" fillOpacity="0.65" />
              {/* Center Keel / Fuselage Fold (Darkest) */}
              <polygon points="2,14 44,14 24,18" fill="currentColor" fillOpacity="0.95" />
              {/* Top Accent Fold Crease */}
              <polygon points="12,14 44,4 32,14" fill="#fff083" fillOpacity="0.35" />
              {/* Precision Structure Line */}
              <line x1="2" y1="14" x2="44" y2="14" stroke="currentColor" strokeWidth="0.75" opacity="0.9" />
            </svg>
          </div>
        </div>
      ))}
    </>
  );
};

/* =========================================================================
   2. SPINNING SAMARA SEEDS FX (دانه‌های چرخنده هلیکوپتری)
   ========================================================================= */
const SpinningSeedsFx: React.FC = () => {
  const count = 14;
  const seeds = useMemo(() => Array.from({ length: count }), []);
  const seedsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      seedsRef.current.forEach((seed, i) => {
        if (!seed) return;

        const isSmall = i % 2 === 1;
        const scale = isSmall ? gsap.utils.random(0.55, 0.75) : gsap.utils.random(0.85, 1.15);
        const opacity = isSmall ? gsap.utils.random(0.35, 0.55) : gsap.utils.random(0.65, 0.9);

        // Initial positions scattered across viewport
        gsap.set(seed, {
          x: () => gsap.utils.random(-20, window.innerWidth + 20),
          y: () => gsap.utils.random(-80, window.innerHeight * 0.9),
          scale,
          opacity,
        });

        const fall = () => {
          // Gentle diagonal drift downward like helicopter seeds
          const deltaX = gsap.utils.random(-60, 140);
          const deltaY = gsap.utils.random(90, 200);
          const duration = gsap.utils.random(7, 14);

          gsap.to(seed, {
            x: `+=${deltaX}`,
            y: `+=${deltaY}`,
            duration,
            ease: 'linear',
            onComplete: () => {
              const curY = gsap.getProperty(seed, 'y') as number;
              const curX = gsap.getProperty(seed, 'x') as number;

              if (curY > window.innerHeight + 60 || curX > window.innerWidth + 60 || curX < -80) {
                gsap.set(seed, {
                  x: gsap.utils.random(0, window.innerWidth),
                  y: gsap.utils.random(-90, -30),
                });
              }
              fall();
            },
          });
        };

        fall();
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes samaraSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .samara-spinner {
          transform-origin: 30% 75%;
          animation: samaraSpin 1.8s linear infinite;
        }
      `}</style>
      {seeds.map((_, i) => (
        <div
          key={`samara-${i}`}
          ref={(el) => { seedsRef.current[i] = el; }}
          className="absolute top-0 left-0 pointer-events-none will-change-transform"
        >
          <div 
            className="samara-spinner relative flex items-center justify-center text-brand-dark"
            style={{ animationDuration: `${1.4 + (i % 5) * 0.3}s` }}
          >
            {/* Winged Samara Seed SVG with Aerodynamic Wing Membrane */}
            <svg 
              width="26" 
              height="44" 
              viewBox="0 0 26 44" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
            >
              {/* Translucent Blade Wing */}
              <path 
                d="M8 32 C4 24 3 12 11 2 C18 6 23 18 16 32 Z" 
                fill="currentColor" 
                fillOpacity="0.45"
                stroke="currentColor"
                strokeWidth="0.6"
              />
              {/* Internal Wing Veins (آوندهای باله) */}
              <path d="M10 28 C9 20 8 10 12 4" stroke="currentColor" strokeWidth="0.65" opacity="0.6" />
              <path d="M10 24 C12 21 17 18 19 14" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <path d="M9 18 C11 15 16 13 18 9" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              {/* Seed Kernel Pod at the base (دانه باریک سنگین انتهایی) */}
              <ellipse cx="8.5" cy="35" rx="3.2" ry="5.5" fill="currentColor" fillOpacity="0.9" />
            </svg>
          </div>
        </div>
      ))}
    </>
  );
};

/* =========================================================================
   3. GLASS BUBBLES FX (حباب‌های شیشه‌ای شفاف و منشوری)
   ========================================================================= */
const GlassBubblesFx: React.FC = () => {
  const count = 16;
  const bubbles = useMemo(() => Array.from({ length: count }), []);
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      bubblesRef.current.forEach((bubble, i) => {
        if (!bubble) return;

        const isSmall = i % 3 === 2;
        const scale = isSmall ? gsap.utils.random(0.45, 0.65) : gsap.utils.random(0.8, 1.25);
        const opacity = isSmall ? gsap.utils.random(0.35, 0.5) : gsap.utils.random(0.65, 0.88);

        gsap.set(bubble, {
          x: () => gsap.utils.random(20, window.innerWidth - 40),
          y: () => gsap.utils.random(40, window.innerHeight),
          scale,
          opacity,
        });

        const floatUp = () => {
          // Buoyant floating upward with slight sine drift
          const deltaX = gsap.utils.random(-50, 60);
          const deltaY = gsap.utils.random(-120, -220);
          const duration = gsap.utils.random(9, 16);

          gsap.to(bubble, {
            x: `+=${deltaX}`,
            y: `+=${deltaY}`,
            duration,
            ease: 'sine.inOut',
            onComplete: () => {
              const curY = gsap.getProperty(bubble, 'y') as number;
              if (curY < -70) {
                gsap.set(bubble, {
                  x: gsap.utils.random(30, window.innerWidth - 30),
                  y: window.innerHeight + gsap.utils.random(30, 80),
                });
              }
              floatUp();
            },
          });
        };

        floatUp();
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes bubbleWobble {
          0%, 100% { transform: scale(1, 1) rotate(0deg); }
          33% { transform: scale(1.05, 0.95) rotate(-3deg); }
          66% { transform: scale(0.95, 1.05) rotate(3deg); }
        }
        .bubble-wobble {
          animation: bubbleWobble 6s ease-in-out infinite;
        }
      `}</style>
      {bubbles.map((_, i) => (
        <div
          key={`bubble-${i}`}
          ref={(el) => { bubblesRef.current[i] = el; }}
          className="absolute top-0 left-0 pointer-events-none will-change-transform"
        >
          <div 
            className="bubble-wobble relative flex items-center justify-center text-brand-dark"
            style={{ animationDelay: `${(i * 0.4) % 6}s` }}
          >
            {/* Prismatic Soap / Glass Bubble SVG */}
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 36 36" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.04)]"
            >
              {/* Outer Shell Rim */}
              <circle cx="18" cy="18" r="16.5" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.45" />
              {/* Inner Soft Iridescent Reflection */}
              <circle cx="18" cy="18" r="15" stroke="#fff083" strokeWidth="0.5" strokeOpacity="0.4" />
              {/* Specular Crescent Highlight (Top-Left) */}
              <path 
                d="M10 9 A 12 12 0 0 1 23 7" 
                stroke="currentColor" 
                strokeWidth="1.2" 
                strokeLinecap="round" 
                strokeOpacity="0.75" 
              />
              {/* Tiny Specular Dot */}
              <circle cx="9" cy="13" r="0.9" fill="currentColor" fillOpacity="0.7" />
              {/* Bottom Subtle Rim Glow */}
              <path 
                d="M23 27 A 12 12 0 0 1 13 28" 
                stroke="currentColor" 
                strokeWidth="0.65" 
                strokeLinecap="round" 
                strokeOpacity="0.35" 
              />
            </svg>
          </div>
        </div>
      ))}
    </>
  );
};

/* =========================================================================
   4. LINEAR CIRRUS CLOUDS FX (ابرهای باریک معمارانه و لایه‌ای)
   ========================================================================= */
const LinearCloudsFx: React.FC = () => {
  const count = 6;
  const clouds = useMemo(() => Array.from({ length: count }), []);
  const cloudsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cloudsRef.current.forEach((cloud, i) => {
        if (!cloud) return;

        const scale = gsap.utils.random(0.8, 1.3);
        const opacity = gsap.utils.random(0.3, 0.55);

        // Position across upper sky zone
        gsap.set(cloud, {
          x: () => gsap.utils.random(-100, window.innerWidth),
          y: () => gsap.utils.random(30, window.innerHeight * 0.45),
          scale,
          opacity,
        });

        const drift = () => {
          // Calm horizontal glide
          const deltaX = gsap.utils.random(250, 480);
          const duration = gsap.utils.random(25, 45);

          gsap.to(cloud, {
            x: `+=${deltaX}`,
            duration,
            ease: 'linear',
            onComplete: () => {
              const curX = gsap.getProperty(cloud, 'x') as number;
              if (curX > window.innerWidth + 120) {
                gsap.set(cloud, {
                  x: -280,
                  y: gsap.utils.random(30, window.innerHeight * 0.45),
                });
              }
              drift();
            },
          });
        };

        drift();
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {clouds.map((_, i) => (
        <div
          key={`cloud-${i}`}
          ref={(el) => { cloudsRef.current[i] = el; }}
          className="absolute top-0 left-0 pointer-events-none will-change-transform"
        >
          {/* Architectural Minimalist Cloud Ribbon SVG */}
          <svg 
            width={i % 2 === 0 ? "180" : "240"} 
            height="32" 
            viewBox="0 0 240 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-brand-dark"
          >
            {/* Streamline Cirrus Layer 1 */}
            <path 
              d="M10 16 Q50 6 90 14 T170 12 T230 16" 
              stroke="currentColor" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
              strokeOpacity="0.75" 
            />
            {/* Streamline Cirrus Layer 2 */}
            <path 
              d="M35 22 Q75 16 115 20 T195 18 T215 22" 
              stroke="currentColor" 
              strokeWidth="0.8" 
              strokeLinecap="round" 
              strokeOpacity="0.5" 
            />
            {/* Streamline Accent Dash */}
            <path 
              d="M70 10 Q110 4 145 8" 
              stroke="currentColor" 
              strokeWidth="0.65" 
              strokeLinecap="round" 
              strokeOpacity="0.35" 
            />
          </svg>
        </div>
      ))}
    </>
  );
};

/* =========================================================================
   5. INTERACTIVE DANDELIONS FX (قاصدک‌های تعاملی با ماوس)
   ========================================================================= */
const InteractiveDandelionsFx: React.FC = () => {
  const count = 18;
  const dandelions = useMemo(() => Array.from({ length: count }), []);
  const dandelionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    // Mouse listener to create gentle breeze repulsion
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      dandelionsRef.current.forEach((seed) => {
        if (!seed) return;
        const rect = seed.getBoundingClientRect();
        const seedCenterX = rect.left + rect.width / 2;
        const seedCenterY = rect.top + rect.height / 2;

        const distX = seedCenterX - e.clientX;
        const distY = seedCenterY - e.clientY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        // Within 140px, gently push seed away
        if (distance < 140 && distance > 0) {
          const force = (140 - distance) / 140;
          const pushX = (distX / distance) * force * 35;
          const pushY = (distY / distance) * force * 35;

          gsap.to(seed, {
            x: `+=${pushX}`,
            y: `+=${pushY}`,
            rotation: `+=${pushX * 0.4}`,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const ctx = gsap.context(() => {
      dandelionsRef.current.forEach((seed, i) => {
        if (!seed) return;

        const isDeep = i % 3 === 2;
        const scale = isDeep ? gsap.utils.random(0.45, 0.65) : gsap.utils.random(0.75, 1.15);
        const opacity = isDeep ? gsap.utils.random(0.3, 0.48) : gsap.utils.random(0.6, 0.88);

        gsap.set(seed, {
          x: () => gsap.utils.random(-30, window.innerWidth + 30),
          y: () => gsap.utils.random(-60, window.innerHeight),
          scale,
          opacity,
          rotation: () => gsap.utils.random(-25, 25),
        });

        const floatSeed = () => {
          const deltaX = gsap.utils.random(-90, 160);
          const deltaY = gsap.utils.random(-60, 80);
          const rot = gsap.utils.random(-20, 20);
          const duration = gsap.utils.random(8, 15);

          gsap.to(seed, {
            x: `+=${deltaX}`,
            y: `+=${deltaY}`,
            rotation: `+=${rot}`,
            duration,
            ease: 'sine.inOut',
            onComplete: () => {
              const curY = gsap.getProperty(seed, 'y') as number;
              const curX = gsap.getProperty(seed, 'x') as number;

              if (curY > window.innerHeight + 60 || curY < -70 || curX > window.innerWidth + 70 || curX < -70) {
                gsap.set(seed, {
                  x: gsap.utils.random(0, window.innerWidth),
                  y: curY > window.innerHeight + 60 ? -50 : gsap.utils.random(-40, window.innerHeight * 0.7),
                  rotation: gsap.utils.random(-15, 15),
                });
              }
              floatSeed();
            },
          });
        };

        floatSeed();
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes dandelionSway {
          0% { transform: rotate(-8deg) translateY(0px); }
          50% { transform: rotate(7deg) translateY(-4px); }
          100% { transform: rotate(-8deg) translateY(0px); }
        }
        .dandelion-sway {
          animation: dandelionSway 4.5s ease-in-out infinite;
        }
      `}</style>
      {dandelions.map((_, i) => {
        const variant = i % 3;
        return (
          <div
            key={`dandelion-${i}`}
            ref={(el) => { dandelionsRef.current[i] = el; }}
            className="absolute top-0 left-0 pointer-events-none will-change-transform"
          >
            <div 
              className="dandelion-sway relative flex items-center justify-center text-brand-dark"
              style={{ animationDelay: `${(i * 0.45) % 4}s` }}
            >
              {variant === 0 && (
                <svg width="34" height="40" viewBox="0 0 34 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <g stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" opacity="0.85">
                    <line x1="17" y1="13" x2="17" y2="31" strokeWidth="0.9" />
                    <path d="M17 13 L17 2 M17 13 L11 4 M17 13 L23 4 M17 13 L6 7 M17 13 L28 7 M17 13 L3 12 M17 13 L31 12 M17 13 L8 15 M17 13 L26 15" />
                    <path d="M9 5 L13 3 M21 3 L25 5 M4 8 L8 6 M26 6 L30 8 M2 13 L6 11 M28 11 L32 13" strokeWidth="0.5" opacity="0.6" />
                  </g>
                  <path d="M17 31 C15.8 32.5 15.5 35 17 37.5 C18.5 35 18.2 32.5 17 31 Z" fill="currentColor" opacity="0.9" />
                </svg>
              )}

              {variant === 1 && (
                <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <g stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.82">
                    <path d="M15 11 Q16 20 18 29" strokeWidth="0.85" />
                    <path d="M15 11 L18 2 M15 11 L12 3 M15 11 L23 4 M15 11 L7 6 M15 11 L27 7 M15 11 L4 11 M15 11 L28 13 M15 11 L9 15 M15 11 L24 16" />
                    <path d="M10 4 L14 2 M21 3 L25 5 M5 7 L9 5 M25 7 L29 10" strokeWidth="0.5" opacity="0.55" />
                  </g>
                  <path d="M18 29 C17 30.5 16.8 33 18.2 34.8 C19.4 32.8 19.2 30.5 18 29 Z" fill="currentColor" opacity="0.85" />
                </svg>
              )}

              {variant === 2 && (
                <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <g stroke="currentColor" strokeWidth="0.65" strokeLinecap="round" opacity="0.78">
                    <line x1="12" y1="9" x2="12" y2="24" strokeWidth="0.75" />
                    <path d="M12 9 L12 2 M12 9 L7 3 M12 9 L17 3 M12 9 L3 7 M12 9 L21 7 M12 9 L2 11 M12 9 L22 11" />
                  </g>
                  <ellipse cx="12" cy="25.5" rx="1.1" ry="2" fill="currentColor" opacity="0.8" />
                </svg>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
