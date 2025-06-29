// src/lib/validators.ts

import { z } from "zod";

export const AttestationSchema = z.object({
  hostGender: z.enum(["Madame", "Monsieur"], { required_error: "Veuillez cocher une case." }),
  hostFirstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
  hostLastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  // CORRECTION : On utilise z.date() maintenant
  hostBirthDate: z.date({ required_error: "Veuillez entrer une date de naissance."}),
  hostBirthPlace: z.string().min(2, { message: "Veuillez entrer un lieu de naissance valide." }),
  hostAddress: z.string().min(10, { message: "L'adresse doit contenir au moins 10 caractères." }),
  hostAddressLine2: z.string().optional(),
  
  hostedGender: z.enum(["Madame", "Monsieur"], { required_error: "Veuillez cocher une case." }),
  hostedFirstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
  hostedLastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  hostedBirthDate: z.date({ required_error: "Veuillez entrer une date de naissance."}),
  hostedBirthPlace: z.string().min(2, { message: "Veuillez entrer un lieu de naissance valide." }),
  
  hostingStartDate: z.date({ required_error: "Veuillez entrer une date."}),
  
  attestationPlace: z.string().min(2, { message: "Veuillez entrer un lieu valide." }),
  attestationDate: z.date({ required_error: "Veuillez entrer une date."}),

  signatureDataUrl: z.string({ required_error: "Une signature est requise." }).min(1, { message: "Une signature est requise." }),
});

export type TAttestationSchema = z.infer<typeof AttestationSchema>;