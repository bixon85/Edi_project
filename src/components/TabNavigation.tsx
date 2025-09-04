import { Camera, Box } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'photo' | '3d';
  onTabChange: (tab: 'photo' | '3d') => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex justify-center py-6">
      <div className="flex bg-card rounded-lg p-1 shadow-[var(--shadow-elegant)] border border-border">
        <button
          onClick={() => onTabChange('photo')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-[var(--transition-elegant)] ${
            activeTab === 'photo'
              ? 'bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-white shadow-[var(--shadow-luxury)]'
              : 'text-muted-foreground hover:text-luxury-gold'
          }`}
        >
          <Camera className="h-4 w-4" />
          <span>Photo Mode</span>
        </button>
        <button
          onClick={() => onTabChange('3d')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-[var(--transition-elegant)] ${
            activeTab === '3d'
              ? 'bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-white shadow-[var(--shadow-luxury)]'
              : 'text-muted-foreground hover:text-luxury-gold'
          }`}
        >
          <Box className="h-4 w-4" />
          <span>3D Model Mode</span>
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;