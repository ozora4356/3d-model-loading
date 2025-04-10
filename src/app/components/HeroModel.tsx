import React, { useEffect, useRef, useState, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group } from "three";
import { GLTF } from "three-stdlib";
import { JSX } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MODEL_PATH = "/models/scene.gltf";
useGLTF.preload(MODEL_PATH, true);

const ROTATION_LIMITS = {
  MIN: -Math.PI / 3,
  MAX: 0,
} as const;

const ROTATION_SPEED = 0.1;

const BREAKPOINTS = {
  MOBILE: 768,
} as const;

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh; // すべてのノードをMeshとして扱う
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

const HeroModel = (props: JSX.IntrinsicElements["group"]) => {
  const group = useRef<Group>(null);
  const rotationRef = useRef(1);
  const [screenWidth, setScreenWidth] = useState(0);

  // Dracoデコーダーを使用してGLTFを読み込む
  const { nodes, materials, animations } = useGLTF(
    MODEL_PATH,
    true
  ) as unknown as GLTFResult;

  // アニメーションの最適化
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    if (actions["Scene"]) {
      // アニメーションの品質とパフォーマンスのバランスを調整
      actions["Scene"].setEffectiveTimeScale(0.8);
      actions["Scene"].play();
    }
  }, [actions]);

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

  useFrame((state, delta) => {
    if (group.current && screenWidth >= BREAKPOINTS.MOBILE) {
      const currentRotation = group.current.rotation.y;

      if (currentRotation >= ROTATION_LIMITS.MAX) {
        rotationRef.current = -1;
      } else if (currentRotation <= ROTATION_LIMITS.MIN) {
        rotationRef.current = 1;
      }

      group.current.rotation.y += delta * ROTATION_SPEED * rotationRef.current;
      group.current.rotation.y = Math.max(
        ROTATION_LIMITS.MIN,
        Math.min(ROTATION_LIMITS.MAX, group.current.rotation.y)
      );
    }
  });

  // メモ化されたモデル
  const memoizedModel = useMemo(
    () => (
      <group
        ref={group}
        {...props}
        dispose={null}
      >
        <group name="Sketchfab_Scene">
          <group
            name="Sketchfab_model"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group
              name="02f5427e3fad42de8949b269bc504a5ffbx"
              rotation={[-Math.PI, 0, 0]}
              scale={0.01}
            >
              <group name="Object_2">
                <group name="RootNode">
                  <group
                    name="dynamic_tools"
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={100}
                  />
                  <group
                    name="Armature_workshop"
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={100}
                  >
                    <group name="Object_6">
                      <group
                        name="Object_7"
                        rotation={[0, 0, -Math.PI / 2]}
                        scale={100}
                      />
                      <group
                        name="main_01"
                        position={[0.332, -0.488, 1.202]}
                        rotation={[Math.PI / 2, 0, 0]}
                      >
                        <primitive object={nodes.rod_02} />
                        <primitive object={nodes.book_03} />
                        <primitive object={nodes.vice_08} />
                        <primitive object={nodes.grind_main_011} />
                        <group
                          name="hammer_helper_00"
                          position={[-1.566, 0.256, -2.756]}
                          rotation={[Math.PI / 2, 0, 0]}
                        >
                          <primitive object={nodes.hammer_small_015} />
                        </group>
                        <primitive object={nodes.horse_shoe_016} />
                        <primitive object={nodes.hammer_017} />
                        <primitive object={nodes.tongs_A_018} />
                        <primitive object={nodes.tongs_B_019} />
                        <primitive object={nodes.poker_020} />
                        <primitive object={nodes.pincers_small_021} />
                        <primitive object={nodes.hammer_large_022} />
                        <primitive object={nodes.shovel_023} />
                      </group>
                    </group>
                  </group>
                  <group
                    name="foliage"
                    position={[115.827, 143.994, 1.282]}
                    rotation={[0.017, -0.071, -1.585]}
                    scale={40.734}
                  >
                    <mesh
                      name="foliage_foliage_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.foliage_foliage_0.geometry}
                      material={materials.foliage}
                    />
                  </group>
                  <group
                    name="tiles"
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={100}
                  >
                    <mesh
                      name="tiles_terrain_f_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.tiles_terrain_f_0.geometry}
                      material={materials.terrain_f}
                    />
                  </group>
                  <group
                    name="workshop"
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={100}
                  >
                    <mesh
                      name="workshop_furnace_f_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.workshop_furnace_f_0.geometry}
                      material={materials.furnace_f}
                    />
                  </group>
                  {/* <group
                  name="candles"
                  position={[163.78, -108.021, -104.002]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={100}
                >
                  <mesh
                    name="candles_flame_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.candles_flame_0.geometry}
                    material={materials.flame}
                  />
                </group> */}
                  <group
                    name="particle000"
                    position={[177.17, 124.264, 144.038]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle000_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle000_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle001"
                    position={[175.609, 125.642, 142.132]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle001_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle001_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle002"
                    position={[181.018, 127.687, 142.941]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle002_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle002_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle003"
                    position={[179.119, 127.092, 145.814]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle003_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle003_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle004"
                    position={[177.687, 128.56, 145.355]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle004_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle004_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle005"
                    position={[180.474, 125.367, 144.443]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle005_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle005_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle006"
                    position={[176.906, 126.344, 145.727]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle006_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle006_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle007"
                    position={[91.465, 182.601, 37.981]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle007_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle007_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle008"
                    position={[340.573, 123.81, 50.141]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle008_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle008_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle009"
                    position={[310.175, -26.983, 23.516]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle009_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle009_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle011"
                    position={[-6.895, 126.391, 26.066]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle011_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle011_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle012"
                    position={[72.774, 126.415, 62.888]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle012_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle012_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle013"
                    position={[202.94, 249.078, 29.529]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle013_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle013_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle014"
                    position={[226.446, 312.4, 3.549]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle014_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle014_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle015"
                    position={[-1.248, 126.094, 31.734]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle015_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle015_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle016"
                    position={[158.991, -31.949, 44.089]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle016_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle016_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle017"
                    position={[167.844, 289.066, 38.272]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle017_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle017_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle018"
                    position={[313.075, 84.585, 41.035]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle018_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle018_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle019"
                    position={[112.967, 17.266, 78.077]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle019_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle019_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle020"
                    position={[135.397, 430.795, -124.953]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle020_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle020_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle025"
                    position={[178.667, 199.323, 83.34]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle025_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle025_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle177"
                    position={[234.889, 107.627, 135.457]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle177_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle177_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle178"
                    position={[304.25, 139.214, 23.262]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle178_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle178_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle179"
                    position={[355.506, 114.067, 32.253]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle179_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle179_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle180"
                    position={[325.068, 120.277, 37.606]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle180_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle180_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle181"
                    position={[167.727, 289.027, 44.78]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle181_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle181_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle182"
                    position={[68.063, 126.674, 64.262]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle182_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle182_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle183"
                    position={[57.246, 204.442, 63.063]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle183_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle183_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle184"
                    position={[28.843, 126.754, 60.95]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle184_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle184_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle185"
                    position={[197.951, -8.607, 67.401]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle185_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle185_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle186"
                    position={[164.276, 242.391, 59.247]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle186_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle186_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle187"
                    position={[195.173, -9.439, 38.024]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle187_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle187_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle188"
                    position={[161.927, 223.738, 50.614]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle188_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle188_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle189"
                    position={[332.417, 128.854, 50.737]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle189_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle189_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle190"
                    position={[243.346, 175.619, 46.28]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle190_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle190_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle191"
                    position={[72.516, 193.005, 36.309]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle191_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle191_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle192"
                    position={[112.686, 54.118, 83.527]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle192_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle192_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle193"
                    position={[393.765, 82.203, 12.432]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle193_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle193_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle194"
                    position={[267.717, 104.05, 10.68]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle194_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle194_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle195"
                    position={[-4.171, 126.528, 25.728]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle195_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle195_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle196"
                    position={[166.355, 266.515, 43.272]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle196_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle196_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle199"
                    position={[99.309, 39.674, 77.761]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle199_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle199_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle372"
                    position={[377.286, 81.08, 10.349]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle372_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle372_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle373"
                    position={[206.009, 34.738, 37.615]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle373_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle373_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle374"
                    position={[97.868, 109.933, 60.219]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle374_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle374_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle375"
                    position={[3.598, 126.391, 38.446]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle375_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle375_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle376"
                    position={[209.735, 250.729, 19.883]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle376_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle376_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle377"
                    position={[79.447, 188.781, 41.316]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle377_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle377_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle378"
                    position={[292.737, 66.786, 40.422]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle378_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle378_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle379"
                    position={[275.997, 96.445, 71.797]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle379_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle379_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle380"
                    position={[32.609, 125.999, 66.868]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle380_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle380_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle382"
                    position={[351.936, 116.351, 36.897]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle382_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle382_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle383"
                    position={[364.728, 71.796, 32.466]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle383_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle383_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle384"
                    position={[196.701, -13.398, 20.033]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle384_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle384_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle385"
                    position={[22.03, 126.965, 35.611]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle385_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle385_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle388"
                    position={[40.638, 126.358, 31.046]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle388_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle388_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle389"
                    position={[48.045, 122.995, 24.183]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle389_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle389_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle390"
                    position={[170.862, 6.159, 40.193]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle390_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle390_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle391"
                    position={[110.082, 31.372, 74.791]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle391_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle391_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle392"
                    position={[330.588, 98.268, 13.963]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle392_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle392_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle394"
                    position={[343.889, 53.608, 9.064]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle394_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle394_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle542"
                    position={[200.148, 367.268, -29.81]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle542_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle542_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle543"
                    position={[47.944, 210.028, 51.768]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle543_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle543_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle544"
                    position={[147.231, 83.714, 85.985]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle544_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle544_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle545"
                    position={[49.833, 208.978, 56.633]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle545_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle545_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle546"
                    position={[279.329, 95.056, 38.211]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle546_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle546_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle547"
                    position={[232.97, 328.135, -95.847]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle547_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle547_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle548"
                    position={[373.646, 95.484, 13.932]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle548_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle548_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle549"
                    position={[197.889, 284.729, 1.334]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle549_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle549_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle550"
                    position={[315.75, 38.72, 23.713]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle550_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle550_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle551"
                    position={[282.785, 93.553, 10.18]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle551_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle551_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle552"
                    position={[362.729, 109.954, 16.624]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle552_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle552_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle553"
                    position={[152.403, -22.751, 38.477]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle553_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle553_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle555"
                    position={[97.631, 18.175, 64.532]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle555_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle555_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle557"
                    position={[145.319, 246.928, 57.487]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle557_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle557_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle558"
                    position={[262.089, 128.644, 114.086]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle558_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle558_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle559"
                    position={[78.542, 126.566, 45.33]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle559_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle559_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle560"
                    position={[343.378, 121.443, 43.742]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle560_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle560_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle561"
                    position={[187.783, 404.736, -296.467]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle561_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle561_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle563"
                    position={[20.32, 215.25, 31.38]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle563_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle563_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                  <group
                    name="particle564"
                    position={[3.294, 127.126, 39.325]}
                    rotation={[0, 0, -Math.PI]}
                    scale={0}
                  >
                    <mesh
                      name="particle564_spark001_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.particle564_spark001_0.geometry}
                      material={materials["spark.001"]}
                    />
                  </group>
                </group>
              </group>
            </group>
            <skinnedMesh
              name="Object_8"
              geometry={(nodes.Object_8 as THREE.SkinnedMesh).geometry}
              material={materials.tools_f}
              skeleton={(nodes.Object_8 as THREE.SkinnedMesh).skeleton}
            />
          </group>
        </group>
      </group>
    ),
    [props]
  );

  return memoizedModel;
};

export default React.memo(HeroModel);