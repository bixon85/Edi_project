import { useState, useRef, useCallback } from 'react';
import { Upload, RotateCcw, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import earringsImage from '@/assets/earrings-gold.png';
import necklaceImage from '@/assets/necklace-silver.png';
import ringImage from '@/assets/ring-rose-gold.png';

interface PhotoModeProps {
  jewelryType: string;
  material: string;
  gemstone: string;
}

const PhotoMode = ({ jewelryType, material, gemstone }: PhotoModeProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [jewelryPosition, setJewelryPosition] = useState({ x: 50, y: 50 });
  const [jewelryScale, setJewelryScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const jewelryImages = {
    earrings: earringsImage,
    necklace: necklaceImage,
    ring: ringImage,
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setJewelryPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  }, [isDragging]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetPosition = () => {
    setJewelryPosition({ x: 50, y: 50 });
    setJewelryScale(1);
  };

  const currentJewelryImage = jewelryImages[jewelryType as keyof typeof jewelryImages] || earringsImage;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-card rounded-lg p-6 shadow-[var(--shadow-elegant)] border border-border">
          {!uploadedImage ? (
            <div
              className="upload-area rounded-lg p-12 text-center cursor-pointer min-h-[400px] flex flex-col items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-16 w-16 text-luxury-gold-light mb-4" />
              <h3 className="text-xl font-semibold text-luxury-gold mb-2">Upload Your Photo</h3>
              <p className="text-muted-foreground mb-4">
                Upload a photo of yourself to try on jewelry virtually
              </p>
              <Button className="btn-luxury">
                Choose Photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div
              ref={containerRef}
              className="relative overflow-hidden rounded-lg min-h-[400px] cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
              <div
                className="jewelry-overlay absolute pointer-events-none"
                style={{
                  left: `${jewelryPosition.x}%`,
                  top: `${jewelryPosition.y}%`,
                  transform: `translate(-50%, -50%) scale(${jewelryScale})`,
                  filter: `hue-rotate(${material === 'silver' ? '0deg' : material === 'rose-gold' ? '15deg' : '45deg'})`,
                }}
              >
                <img
                  src={currentJewelryImage}
                  alt="Jewelry overlay"
                  className="w-20 h-20 object-contain"
                  onMouseDown={handleMouseDown}
                  style={{ pointerEvents: 'auto', cursor: 'move' }}
                />
              </div>
            </div>
          )}
        </div>

        {uploadedImage && (
          <div className="flex justify-center mt-4 space-x-3">
            <Button
              variant="outline"
              onClick={resetPosition}
              className="btn-elegant"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Position
            </Button>
            <Button
              variant="outline"
              onClick={() => setJewelryScale(prev => Math.min(2, prev + 0.2))}
              className="btn-elegant"
            >
              Larger
            </Button>
            <Button
              variant="outline"
              onClick={() => setJewelryScale(prev => Math.max(0.5, prev - 0.2))}
              className="btn-elegant"
            >
              Smaller
            </Button>
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <div className="bg-card rounded-lg p-6 shadow-[var(--shadow-elegant)] border border-border">
          <h3 className="text-lg font-semibold mb-4 text-luxury-gold">Instructions</h3>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-luxury-gold-light rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
              <p>Upload a clear photo of yourself</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-luxury-gold-light rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
              <p>Drag the jewelry to position it correctly</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-luxury-gold-light rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
              <p>Use the customization panel to change materials</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-luxury-gold-light rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
              <p>Resize the jewelry to fit perfectly</p>
            </div>
          </div>
          
          {uploadedImage && (
            <div className="mt-6 p-4 bg-gradient-to-r from-luxury-gold-light/10 to-luxury-gold/10 rounded-lg border border-luxury-gold-light/30">
              <div className="flex items-center space-x-2 text-luxury-gold mb-2">
                <Move className="h-4 w-4" />
                <span className="font-medium">Drag to Move</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Click and drag the jewelry to position it on your photo
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoMode;