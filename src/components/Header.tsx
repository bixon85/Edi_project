import { Gem } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border shadow-[var(--shadow-elegant)] sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-luxury-gold to-luxury-gold-dark rounded-lg shadow-[var(--shadow-luxury)]">
              <Gem className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-luxury-gold to-luxury-gold-dark bg-clip-text text-transparent">
                Virtual JewelFit 3D
              </h1>
              <p className="text-sm text-muted-foreground font-medium">Demo</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;