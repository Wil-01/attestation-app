'use client'; 

import { useEffect } from 'react';
import { usePDF } from '@react-pdf/renderer';
import { AttestationDocument } from './AttestationDocument';
import { TAttestationSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';

interface PdfActionsProps {
  formData: TAttestationSchema;
}

export function PdfActions({ formData }: PdfActionsProps) {
  const [instance, updateInstance] = usePDF({ document: <AttestationDocument data={formData} /> });

  useEffect(() => {
    updateInstance(<AttestationDocument data={formData} />);
  }, [formData, updateInstance]);

  const openPdfInNewTab = () => {
    if (instance.url) {
      window.open(instance.url, '_blank');
    }
  };
  
  return (
    <Button
      type="button"
      onClick={openPdfInNewTab}
      className="w-full"
      size="lg"
      disabled={instance.loading || !instance.url}
    >
      {instance.loading ? 'Génération en cours...' : 'Ouvrir le PDF dans un nouvel onglet'}
    </Button>
  );
}