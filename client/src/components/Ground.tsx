import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

export default function Ground() {
  const texture = useLoader(TextureLoader, "textures/grasslight-big.jpeg");

  if (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1500, 1500);
    texture.anisotropy = 16;
  }

  return (
    <mesh receiveShadow position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[10000, 10000]} />
      {texture && (
        <meshPhongMaterial
          attach="material"
          map={texture}
          side={THREE.DoubleSide}
        />
      )}
    </mesh>
  );
}
