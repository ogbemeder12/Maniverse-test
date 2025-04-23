
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { NailSelection } from './NailCustomizer';

interface SelectionSummaryProps {
  selection: NailSelection;
}

export const SelectionSummary = ({ selection }: SelectionSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Selection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Shape</span>
          <span className="font-medium capitalize">{selection.shape}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Color</span>
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: selection.color }}
            />
            <span className="font-medium">{selection.color.toUpperCase()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
