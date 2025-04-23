
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NAIL_SHAPES = [
  { id: 'almond', name: 'Almond', emoji: '🥜' },
  { id: 'stiletto', name: 'Stiletto', emoji: '📌' },
  { id: 'square', name: 'Square', emoji: '⬜' },
  { id: 'oval', name: 'Oval', emoji: '⭕' },
];

interface NailShapePickerProps {
  currentShape: string;
  onSelectShape: (shape: string) => void;
}

export const NailShapePicker = ({ currentShape, onSelectShape }: NailShapePickerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Choose Your Shape</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {NAIL_SHAPES.map((shape) => (
            <button
              key={shape.id}
              onClick={() => onSelectShape(shape.id)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                currentShape === shape.id
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl mb-2">{shape.emoji}</div>
              <div className="font-medium">{shape.name}</div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
