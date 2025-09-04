import { useState } from 'react';
import { ChevronDown, Palette, Gem, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CustomizationPanelProps {
  jewelryType: string;
  setJewelryType: (type: string) => void;
  material: string;
  setMaterial: (material: string) => void;
  gemstone: string;
  setGemstone: (gemstone: string) => void;
  onReset: () => void;
}

const CustomizationPanel = ({
  jewelryType,
  setJewelryType,
  material,
  setMaterial,
  gemstone,
  setGemstone,
  onReset,
}: CustomizationPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const jewelryTypes = [
    { value: 'earrings', label: 'Earrings' },
    { value: 'necklace', label: 'Necklace' },
    { value: 'ring', label: 'Ring' },
  ];

  const materials = [
    { value: 'gold', label: 'Gold', color: 'bg-luxury-gold' },
    { value: 'silver', label: 'Silver', color: 'bg-luxury-silver' },
    { value: 'rose-gold', label: 'Rose Gold', color: 'bg-luxury-rose-gold' },
  ];

  const gemstones = [
    { value: 'ruby', label: 'Ruby', color: 'bg-gemstone-ruby' },
    { value: 'emerald', label: 'Emerald', color: 'bg-gemstone-emerald' },
    { value: 'sapphire', label: 'Sapphire', color: 'bg-gemstone-sapphire' },
    { value: 'diamond', label: 'Diamond', color: 'bg-gemstone-diamond' },
  ];

  return (
    <div className="customization-panel min-h-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-luxury-gold">Customize</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-muted-foreground hover:text-luxury-gold"
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Jewelry Type Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Gem className="h-5 w-5 text-luxury-gold" />
                <span>Jewelry Type</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={jewelryType} onValueChange={setJewelryType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select jewelry type" />
                </SelectTrigger>
                <SelectContent>
                  {jewelryTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Material Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Palette className="h-5 w-5 text-luxury-gold" />
                <span>Material</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {materials.map((mat) => (
                  <button
                    key={mat.value}
                    onClick={() => setMaterial(mat.value)}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-[var(--transition-elegant)] ${
                      material === mat.value
                        ? 'border-luxury-gold bg-gradient-to-r from-luxury-gold-light/10 to-luxury-gold/10 shadow-[var(--shadow-elegant)]'
                        : 'border-border hover:border-luxury-gold-light'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${mat.color} shadow-sm`} />
                    <span className="font-medium">{mat.label}</span>
                    {material === mat.value && (
                      <div className="ml-auto w-2 h-2 bg-luxury-gold rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gemstone Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Gem className="h-5 w-5 text-luxury-gold" />
                <span>Gemstone</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {gemstones.map((gem) => (
                  <button
                    key={gem.value}
                    onClick={() => setGemstone(gem.value)}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-[var(--transition-elegant)] ${
                      gemstone === gem.value
                        ? 'border-luxury-gold bg-gradient-to-r from-luxury-gold-light/10 to-luxury-gold/10 shadow-[var(--shadow-elegant)]'
                        : 'border-border hover:border-luxury-gold-light'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${gem.color} shadow-sm`} />
                    <span className="font-medium">{gem.label}</span>
                    {gemstone === gem.value && (
                      <div className="ml-auto w-2 h-2 bg-luxury-gold rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reset Button */}
          <Button
            onClick={onReset}
            variant="outline"
            className="w-full btn-elegant"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset All
          </Button>

          {/* Current Selection Summary */}
          <Card className="bg-gradient-to-r from-luxury-gold-light/10 to-luxury-gold/10 border border-luxury-gold-light/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-luxury-gold">Current Selection</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium capitalize">{jewelryType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Material:</span>
                <span className="font-medium capitalize">{material.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gemstone:</span>
                <span className="font-medium capitalize">{gemstone}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CustomizationPanel;