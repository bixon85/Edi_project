import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Mesh } from 'three';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThreeDModeProps {
  jewelryType: 'ring' | 'necklace' | 'earrings';
  material: 'gold' | 'silver' | 'rose-gold';
  gemstone: 'ruby' | 'emerald' | 'sapphire' | 'diamond';
}

interface JewelryModelProps extends ThreeDModeProps {
  position?: [number, number, number];
}

const JewelryModel = ({ jewelryType, material, gemstone, position = [0, 0, 0] }: JewelryModelProps) => {
  const meshRef = useRef<Mesh>(null);
  const leftEarringRef = useRef<Mesh>(null);
  const rightEarringRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.005;
    if (leftEarringRef.current) leftEarringRef.current.rotation.y += 0.005;
    if (rightEarringRef.current) rightEarringRef.current.rotation.y += 0.005;
  });

  const getMaterialColor = () => {
    switch (material) {
      case 'gold': return '#FFD700';
      case 'silver': return '#C0C0C0';
      case 'rose-gold': return '#E8B4A0';
      default: return '#FFD700';
    }
  };

  const getGemstoneColor = () => {
    switch (gemstone) {
      case 'ruby': return '#E0115F';
      case 'emerald': return '#50C878';
      case 'sapphire': return '#0F52BA';
      case 'diamond': return '#F0F8FF';
      default: return '#E0115F';
    }
  };

  if (jewelryType === 'ring') {
    return (
      <group position={position}>
        <mesh ref={meshRef}>
          <torusGeometry args={[1, 0.2, 16, 32]} />
          <meshStandardMaterial color={getMaterialColor()} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={getGemstoneColor()} metalness={0.2} roughness={0.3} />
        </mesh>
      </group>
    );
  }

  if (jewelryType === 'necklace') {
    return (
      <group position={position}>
        <mesh ref={meshRef}>
          <torusGeometry args={[2, 0.05, 16, 64]} />
          <meshStandardMaterial color={getMaterialColor()} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, -1.5, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color={getGemstoneColor()} metalness={0.2} roughness={0.3} />
        </mesh>
      </group>
    );
  }

  // Earrings
  return (
    <group position={position}>
      <mesh ref={leftEarringRef} position={[-1.5, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={getMaterialColor()} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-1.5, -0.5, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={getGemstoneColor()} metalness={0.2} roughness={0.3} />
      </mesh>
      <mesh ref={rightEarringRef} position={[1.5, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={getMaterialColor()} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.5, -0.5, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={getGemstoneColor()} metalness={0.2} roughness={0.3} />
      </mesh>
    </group>
  );
};

const HumanBust = () => (
  <group>
    {/* Bust */}
    <mesh position={[0, 0, 0]}>
      <cylinderGeometry args={[1.2, 1.8, 3, 16]} />
      <meshStandardMaterial color="#FDBCB4" />
    </mesh>
    <mesh position={[0, 2, 0]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#FDBCB4" />
    </mesh>
    {/* Shoulders */}
    <mesh position={[0, -1, 0]}>
      <boxGeometry args={[3, 1, 1.5]} />
      <meshStandardMaterial color="#E6E6FA" />
    </mesh>
  </group>
);

const ThreeDMode = ({ jewelryType, material, gemstone }: ThreeDModeProps) => {
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 2, 8]);

  const resetView = () => setCameraPosition([0, 2, 8]);
  const zoomIn = () => setCameraPosition(prev => [prev[0], prev[1], Math.max(3, prev[2] - 1)]);
  const zoomOut = () => setCameraPosition(prev => [prev[0], prev[1], Math.min(15, prev[2] + 1)]);

  return (
    <div className="space-y-6">
      <div className="viewer-3d rounded-lg overflow-hidden h-[500px] relative">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />

          <Suspense fallback={null}>
            <Environment preset="studio" />

            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <pointLight position={[0, 5, 5]} intensity={0.5} />

            <HumanBust />
            <JewelryModel
              jewelryType={jewelryType}
              material={material}
              gemstone={gemstone}
              position={[0, 1, 0]}
            />

            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={3}
              maxDistance={15}
              target={[0, 1, 0]}
            />
          </Suspense>
        </Canvas>

        {/* Control Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button size="sm" onClick={zoomIn} className="btn-elegant">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={zoomOut} className="btn-elegant">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={resetView} className="btn-elegant">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Instruction Section */}
      <div className="bg-card rounded-lg p-6 shadow-[var(--shadow-elegant)] border border-border">
        <h3 className="text-lg font-semibold mb-4 text-luxury-gold">3D Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="text-center p-3 bg-gradient-to-r from-luxury-gold-light/10 to-luxury-gold/10 rounded-lg border border-luxury-gold-light/30">
            <p className="font-medium text-luxury-gold mb-1">Rotate</p>
            <p>Click and drag to rotate the model</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-luxury-gold-light/10 to-luxury-gold/10 rounded-lg border border-luxury-gold-light/30">
            <p className="font-medium text-luxury-gold mb-1">Zoom</p>
            <p>Scroll wheel or use zoom buttons</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-luxury-gold-light/10 to-luxury-gold/10 rounded-lg border border-luxury-gold-light/30">
            <p className="font-medium text-luxury-gold mb-1">Pan</p>
            <p>Right-click and drag to pan view</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDMode;
