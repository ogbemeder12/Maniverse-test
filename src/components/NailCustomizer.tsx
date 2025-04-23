
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NailShapePicker } from './NailShapePicker';
import { ColorPicker } from './ColorPicker';
import { NailPreview } from './NailPreview';
import { SelectionSummary } from './SelectionSummary';
import { SavedDesigns } from './SavedDesigns';
import { useToast } from '@/hooks/use-toast';

export interface NailSelection {
  shape: string;
  color: string;
}

const DEFAULT_SELECTION: NailSelection = {
  shape: 'almond',
  color: '#D6BCFA',
};

export const NailCustomizer = () => {
  const [selection, setSelection] = useState<NailSelection>(() => {
    const saved = localStorage.getItem('nailSelection');
    return saved ? JSON.parse(saved) : DEFAULT_SELECTION;
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('nailSelection', JSON.stringify(selection));
  }, [selection]);

  const updateSelection = (update: Partial<NailSelection>) => {
    setIsLoading(true);
    setSelection((prev) => ({ ...prev, ...update }));
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Design updated!",
        description: "Your nail design has been updated.",
      });
    }, 600);
  };

  const handleSave = () => {
    const savedDesigns = localStorage.getItem('savedNailDesigns');
    const designs = savedDesigns ? JSON.parse(savedDesigns) : [];
    const updatedDesigns = [...designs, selection];
    localStorage.setItem('savedNailDesigns', JSON.stringify(updatedDesigns));
    toast({
      title: "Design saved!",
      description: "Your nail design has been saved and can be loaded later.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Nail Designer</h1>
          <p className="text-gray-600">Customize your perfect nail design</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 animate-slide-up">
            <NailShapePicker 
              currentShape={selection.shape}
              onSelectShape={(shape) => updateSelection({ shape })}
            />
            <ColorPicker
              currentColor={selection.color}
              onSelectColor={(color) => updateSelection({ color })}
            />
            <Button 
              onClick={handleSave}
              className="w-full"
              variant="secondary"
            >
              <Save className="mr-2" />
              Save Design
            </Button>
            <SavedDesigns onSelectDesign={updateSelection} />
          </div>
          
          <div className="space-y-6">
            <NailPreview 
              selection={selection}
              isLoading={isLoading}
            />
            <SelectionSummary selection={selection} />
          </div>
        </div>
      </div>
    </div>
  );
};
