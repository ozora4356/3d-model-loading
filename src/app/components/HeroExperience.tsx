"use client";

import { PerspectiveCamera, Html } from "@react-three/drei";
import { useMemo, useState, useEffect } from "react";
import HeroModel from "./HeroModel";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

const BREAKPOINTS = {
  MOBILE: 768, // モバイル用ブレークポイント
  TABLET: 1024, // タブレット用ブレークポイント
} as const;

const Scene = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // 初期値の設定
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      requestAnimationFrame(() => {
        setScreenWidth(window.innerWidth);
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const modelProps = useMemo(() => {
    const viewportSize =
      screenWidth < BREAKPOINTS.MOBILE
        ? "mobile"
        : screenWidth < BREAKPOINTS.TABLET
        ? "tablet"
        : "desktop";

    switch (viewportSize) {
      case "mobile":
        return {
          scale: 1,
          position: [0, -2.5, 0] as [number, number, number],
        };

      case "tablet":
        return {
          scale: 1.2,
          position: [0, -2, 0] as [number, number, number],
        };

      case "desktop":
      default:
        return {
          scale: 1.3,
          position: [0, -2, 0] as [number, number, number],
        };
    }
  }, [screenWidth]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 11]}
      />
      <HeroModel
        scale={modelProps.scale}
        position={modelProps.position}
        rotation={[0.05, -1.5, 0]}
      />
      <ambientLight intensity={1} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={3}
      />
    </>
  );
};

const HeroExperience = () => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{
        powerPreference: "high-performance",
      }}
    >
      <Suspense
        fallback={
          <Html>
            <div>Loading...</div>
          </Html>
        }
      >
        <Scene />
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
