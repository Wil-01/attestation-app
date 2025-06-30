// src/app/page.tsx

import { AttestationForm } from "@/components/attestation/AttestationForm";

export default function HomePage() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
          Générateur d&apos;Attestation d&apos;Hébergement
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Remplissez les champs ci-dessous pour créer votre attestation au format PDF.
        </p>

        <AttestationForm />

      </div>
    </main>
  );
}