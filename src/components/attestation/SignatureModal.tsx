'use client';

import { useRef, useState, ChangeEvent, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signature: string) => void;
}

const fontStyles = [
  { name: 'Dancing Script', class: 'font-dancing-script', family: 'Dancing Script' },
  { name: 'Pacifico', class: 'font-pacifico', family: 'Pacifico' },
  { name: 'Caveat', class: 'font-caveat', family: 'Caveat' },
  { name: 'Great Vibes', class: 'font-great-vibes', family: 'Great Vibes' },
];

export function SignatureModal({ isOpen, onClose, onSave }: SignatureModalProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [typedName, setTypedName] = useState('');
  const [activeTab, setActiveTab] = useState('draw');
  

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };
  
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onSave(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSignatureFromText = (fontFamily: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = "white"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.font = `50px ${fontFamily}`; 
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(typedName || 'Signature', canvas.width / 2, canvas.height / 2);
      onSave(canvas.toDataURL('image/png'));
    }
  };

  const handleSave = () => {
    if (activeTab === 'draw') {
      if (sigCanvas.current?.isEmpty()) {
        alert("Veuillez signer avant de sauvegarder.");
        return;
      }
      const signatureDataUrl = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');
      if (signatureDataUrl) {
        onSave(signatureDataUrl);
      }
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Ajouter une signature</DialogTitle>
          <DialogDescription>
            Choisissez une méthode pour ajouter votre signature.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="draw" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="draw">Dessin</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="type">Saisie</TabsTrigger>
          </TabsList>

          <TabsContent value="draw">
            <div className="w-full h-[200px] bg-gray-100 rounded-md my-4 border">
              <SignatureCanvas ref={sigCanvas} penColor='black' canvasProps={{ className: 'w-full h-full' }} />
            </div>
            <Button variant="link" onClick={clearSignature} className="p-0 h-auto">Effacer</Button>
          </TabsContent>

          <TabsContent value="image">
            <div className="flex items-center justify-center w-full h-[200px] my-4">
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-500">Sélectionnez ou déposez une image</p>
                </div>
                <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleFileUpload} />
              </label>
            </div>
          </TabsContent>
          
          <TabsContent value="type">
            <Input
              placeholder="Tapez votre nom complet"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              className="my-4"
            />
            <div className="grid grid-cols-2 gap-4">
              {fontStyles.map(font => (
                <div key={font.name} onClick={() => generateSignatureFromText(font.family)} className="border rounded-md p-4 text-center cursor-pointer hover:bg-accent transition-colors">
                  <p className={`text-3xl ${font.class}`}>{typedName || 'Signature'}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSave}>Terminé</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}