
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { NailSelection } from './NailCustomizer';

interface NailPreviewProps {
  selection: NailSelection;
  isLoading: boolean;
}

export const NailPreview = ({ selection, isLoading }: NailPreviewProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div 
          className={`aspect-square max-w-sm mx-auto relative transition-opacity duration-300 ${
            isLoading ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {/* Simple nail visualization */}
          <div className="flex justify-center items-end h-full space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-12 h-16 transition-all duration-300 ${
                  selection.shape === 'almond' ? 'rounded-t-full' :
                  selection.shape === 'stiletto' ? 'clip-path-triangle' :
                  selection.shape === 'square' ? 'rounded-sm' : 'rounded-full'
                }`}
                style={{
                  backgroundColor: selection.color,
                  transform: `scale(${1 + (i === 2 ? 0.2 : i === 1 || i === 3 ? 0.1 : 0)})`,
                }}
              />
            ))}
          </div>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
