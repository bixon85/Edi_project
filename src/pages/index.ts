import { useState } from 'react';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import PhotoMode from '@/components/PhotoMode';
import ThreeDMode from '@/components/ThreeDMode';
import CustomizationPanel from '@/components/CustomizationPanel';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'photo' | '3d'>('photo');
  const [jewelryType, setJewelryType] = useState('earrings');
  const [material, setMaterial] = useState('gold');
  const [gemstone, setGemstone] = useState('ruby');

  const handleReset = () => {
    setJewelryType('earrings');
    setMaterial('gold');
    setGemstone('ruby');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Header />
      
      <div className="container mx-auto px-6">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="grid lg:grid-cols-4 gap-6 pb-8">
          <div className="lg:col-span-3">
            {activeTab === 'photo' ? (
              <PhotoMode
                jewelryType={jewelryType}
                material={material}
                gemstone={gemstone}
              />
            ) : (
              <ThreeDMode
                jewelryType={jewelryType}
                material={material}
                gemstone={gemstone}
              />
            )}
          </div>
          
          <div className="lg:col-span-1">
            <CustomizationPanel
              jewelryType={jewelryType}
              setJewelryType={setJewelryType}
              material={material}
              setMaterial={setMaterial}
              gemstone={gemstone}
              setGemstone={setGemstone}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
};