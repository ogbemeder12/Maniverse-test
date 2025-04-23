
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ListCheck, Pencil, Trash2 } from 'lucide-react';
import { NailSelection } from './NailCustomizer';
import { useToast } from '@/hooks/use-toast';

interface SavedDesignsProps {
  onSelectDesign: (design: NailSelection) => void;
}

export const SavedDesigns = ({ onSelectDesign }: SavedDesignsProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [designs, setDesigns] = useState<NailSelection[]>([]);
  
  const getSavedDesigns = (): NailSelection[] => {
    const savedDesigns = localStorage.getItem('savedNailDesigns');
    return savedDesigns ? JSON.parse(savedDesigns) : [];
  };

  // Refresh designs when sheet opens
  useEffect(() => {
    if (isOpen) {
      setDesigns(getSavedDesigns());
    }
  }, [isOpen]);

  const handleDeleteDesign = (index: number) => {
    const newDesigns = designs.filter((_, i) => i !== index);
    localStorage.setItem('savedNailDesigns', JSON.stringify(newDesigns));
    setDesigns(newDesigns);
    toast({
      title: "Design deleted",
      description: "The nail design has been removed from your saved designs."
    });
  };

  const handleEditDesign = (design: NailSelection) => {
    onSelectDesign(design);
    setIsOpen(false); // Close the sheet when editing
    toast({
      title: "Design loaded for editing",
      description: "Make your changes and save to update the design."
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          <ListCheck className="mr-2" />
          View Saved Designs
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Saved Nail Designs</SheetTitle>
        </SheetHeader>
        {designs.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shape</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {designs.map((design, index) => (
                <TableRow key={index}>
                  <TableCell className="capitalize">{design.shape}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-full border" 
                        style={{ backgroundColor: design.color }}
                      />
                      {design.color}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditDesign(design)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteDesign(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="mt-4 text-center text-muted-foreground">
            No saved designs yet.
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
