import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { Loader } from '@react-three/drei';
import { GestureManager } from './components/GestureManager';

const App: React.FC = () => {
  const [isTree, setIsTree] = useState(true);
  const [handPosition, setHandPosition] = useState<[number, number]>([0, 0]);

  // Use callback to prevent excessive re-renders if passing down props directly
  const handleGestureChange = useCallback((isFist: boolean) => {
    // If fist -> Tree (true), If Open -> Scatter (false)
    setIsTree(isFist);
  }, []);

  const handlePositionChange = useCallback((x: number, y: number) => {
    setHandPosition([x, y]);
  }, []);

  return (
    <div className="w-full h-screen relative bg-black font-sans selection:bg-yellow-500/30">
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 30], fov: 45 }}
        dpr={[1, 2]} // Support high DPI screens for crisp rendering
        gl={{ antialias: false, toneMappingExposure: 1.5 }} // Handled by post-processing mostly
      >
        <Scene isTree={isTree} handPosition={handPosition} />
      </Canvas>
      <Loader />

      {/* Gesture Controller */}
      <GestureManager 
        onGestureChange={handleGestureChange} 
        onPositionChange={handlePositionChange} 
      />

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-8 flex flex-col items-center pointer-events-none z-10">
        <h1 className="text-4xl md:text-6xl font-extralight text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 tracking-[0.2em] uppercase drop-shadow-lg mb-4 text-center">
          Luxe Noël
        </h1>
        <p className="text-yellow-100/60 text-sm md:text-base tracking-widest uppercase mb-8">
          Interactive Gesture Experience
        </p>
      </div>

      {/* Instruction Text */}
      <div className="absolute bottom-12 left-0 w-full flex flex-col items-center pointer-events-none z-10 space-y-2">
         <div className="text-yellow-100/80 text-sm font-light tracking-widest uppercase bg-black/40 backdrop-blur px-4 py-2 rounded-full border border-yellow-500/20">
            🖐 Open Hand to Scatter • ✊ Fist to Summon
         </div>
         <div className="text-yellow-100/50 text-xs tracking-wider">
            Move hand to guide the stars
         </div>
      </div>

      {/* Manual Override Button (Optional, but kept for non-camera users) */}
      <div className="absolute bottom-12 right-12 hidden md:block pointer-events-auto z-10">
        <button
          onClick={() => setIsTree(!isTree)}
          className="group relative px-6 py-2 bg-black/40 backdrop-blur-md border border-yellow-500/30 rounded-full overflow-hidden transition-all duration-500 hover:border-yellow-400"
        >
          <span className="relative text-yellow-100/50 font-light tracking-widest uppercase text-xs">
            Manual Toggle
          </span>
        </button>
      </div>

      <div className="absolute bottom-4 left-6 text-white/20 text-xs">
        POWERED BY AI VISION
      </div>

    </div>
  );
};

export default App;