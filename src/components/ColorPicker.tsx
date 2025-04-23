
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';

const COLOR_SWATCHES = [
  { id: 'purple', color: '#D6BCFA' },
  { id: 'pink', color: '#FED7E2' },
  { id: 'peach', color: '#FBD38D' },
  { id: 'mint', color: '#9AE6B4' },
  { id: 'sky', color: '#90CDF4' },
  { id: 'lavender', color: '#9b87f5' },
  { id: 'rose', color: '#FBB6CE' },
  { id: 'coral', color: '#FEB2B2' },
];

interface ColorPickerProps {
  currentColor: string;
  onSelectColor: (color: string) => void;
}

export const ColorPicker = ({ currentColor, onSelectColor }: ColorPickerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Choose Your Color
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {COLOR_SWATCHES.map((swatch) => (
            <button
              key={swatch.id}
              onClick={() => onSelectColor(swatch.color)}
              className={`w-12 h-12 rounded-full transition-all duration-300 ${
                currentColor === swatch.color
                  ? 'ring-4 ring-primary ring-offset-2 scale-110'
                  : 'hover:scale-105'
              }`}
              style={{ backgroundColor: swatch.color }}
              aria-label={`Select ${swatch.id} color`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
