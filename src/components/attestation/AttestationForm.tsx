'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm, ControllerRenderProps } from 'react-hook-form'; // Ajout de ControllerRenderProps
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from "lucide-react";
import dynamic from 'next/dynamic';

import { AttestationSchema, TAttestationSchema } from '@/lib/validators';
import { cn } from "@/lib/utils";
import { SignatureModal } from './SignatureModal';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const DynamicPdfActions = dynamic(
  () => import('./PdfActions').then((mod) => mod.PdfActions),
  { 
    ssr: false,
    loading: () => <Button className="w-full" size="lg" disabled>Génération du PDF...</Button> 
  }
);

// Correction du type 'any'
const DatePickerField = ({ field, label }: { field: ControllerRenderProps<TAttestationSchema, any>, label: string }) => (
  <FormItem className="flex flex-col">
    <FormLabel>{label}</FormLabel>
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(field.value, "PPP", { locale: fr })
            ) : (
              <span>Choisissez une date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
    <FormMessage />
  </FormItem>
);

export function AttestationForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<TAttestationSchema | null>(null);

  const form = useForm<TAttestationSchema>({
    resolver: zodResolver(AttestationSchema),
    defaultValues: {
      hostGender: undefined,
      hostFirstName: "",
      hostLastName: "",
      hostBirthDate: undefined,
      hostBirthPlace: "",
      hostAddress: "",
      hostAddressLine2: "",
      hostedGender: undefined,
      hostedFirstName: "",
      hostedLastName: "",
      hostedBirthDate: undefined,
      hostedBirthPlace: "",
      hostingStartDate: undefined,
      attestationPlace: "",
      attestationDate: new Date(),
      signatureDataUrl: "",
    },
  });

  function onSubmit(values: TAttestationSchema) {
    setFormData(values);
  }

  const handleSaveSignature = (signature: string) => {
    form.setValue("signatureDataUrl", signature, { shouldValidate: true });
    setIsModalOpen(false);
  };

  const signatureValue = form.watch("signatureDataUrl");

  return (
    <div className="border p-4 sm:p-6 md:p-8 rounded-lg shadow-md bg-white">
      <div className="bg-blue-800 text-white text-center py-4 rounded-t-lg -m-4 sm:-m-6 md:-m-8 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Attestation d'hébergement</h1>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <p className="text-gray-600 mt-6 pt-4">Je soussigné(e),</p>

          <FormField name="hostGender" render={({ field }) => ( <FormItem className="space-y-2"><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Madame" /></FormControl><FormLabel className="font-normal">Madame</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Monsieur" /></FormControl><FormLabel className="font-normal">Monsieur</FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem> )}/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="hostLastName" render={({ field }) => ( <FormItem><FormLabel>Nom :</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
            <FormField name="hostFirstName" render={({ field }) => ( <FormItem><FormLabel>Prénom :</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <FormField control={form.control} name="hostBirthDate" render={({ field }) => <DatePickerField field={field} label="Né(e) le :" />} />
            <FormField name="hostBirthPlace" render={({ field }) => ( <FormItem><FormLabel>à :</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
          </div>

          <FormField name="hostAddress" render={({ field }) => ( <FormItem><FormLabel>Demeurant au</FormLabel><FormControl><Input placeholder="Adresse ligne 1" {...field} /></FormControl><FormMessage /></FormItem> )}/>
          <FormField name="hostAddressLine2" render={({ field }) => ( <FormItem><FormControl><Input placeholder="Adresse ligne 2 (optionnel)" {...field} /></FormControl><FormMessage /></FormItem> )}/>
          
          <p className="pt-4 text-gray-600">Certifie sur l'honneur héberger à mon domicile ci-dessus mentionné :</p>
          
          <FormField name="hostedGender" render={({ field }) => ( <FormItem className="space-y-2"><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Madame" /></FormControl><FormLabel className="font-normal">Madame</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Monsieur" /></FormControl><FormLabel className="font-normal">Monsieur</FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem> )}/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="hostedLastName" render={({ field }) => ( <FormItem><FormLabel>Nom :</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
            <FormField name="hostedFirstName" render={({ field }) => ( <FormItem><FormLabel>Prénom :</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <FormField control={form.control} name="hostedBirthDate" render={({ field }) => <DatePickerField field={field} label="Né(e) le :" />} />
            <FormField name="hostedBirthPlace" render={({ field }) => ( <FormItem><FormLabel>à :</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
          </div>

          <FormField control={form.control} name="hostingStartDate" render={({ field }) => <DatePickerField field={field} label="Depuis le :" />} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pt-6">
             <FormField name="attestationPlace" render={({ field }) => ( <FormItem><FormLabel>Fait à :</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="attestationDate" render={({ field }) => <DatePickerField field={field} label="Le :" />} />
          </div>
          
          <div>
            <FormLabel>Signature de l'hébergeant(e)</FormLabel>
            <div className="mt-2">
              {signatureValue ? ( <div className="border rounded-md p-2 h-24 w-48 relative bg-gray-50"><Image src={signatureValue} alt="Signature de l'hébergeur" layout="fill" objectFit="contain" /></div> ) : null}
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(true)} className="mt-2" >
                {signatureValue ? "Modifier la signature" : "Ajouter une signature"}
              </Button>
            </div>
            <FormField name="signatureDataUrl" render={() => (<FormItem><FormMessage /></FormItem>)} />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mt-8 space-y-2">
            <p className="font-bold text-blue-800">JOINDRE :</p>
            <ul className="list-disc list-inside text-sm">
              <li>Un justificatif d’identité de l'hébergeant(e)</li>
              <li>Un justificatif de domicile de l'hébergeant(e)</li>
            </ul>
          </div>

          <div className="border-t pt-8 mt-8">
            {!formData ? ( <Button type="submit" className="w-full" size="lg">Générer l'aperçu du PDF</Button> ) : ( <DynamicPdfActions formData={formData} /> )}
          </div>
        </form>
      </Form>

      <SignatureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveSignature} />

      <div className="border border-yellow-500 bg-yellow-50 text-xs p-3 rounded-lg mt-8">
        <p className="font-bold">Article 441-1 Code Pénal</p>
        <p>Constitue un faux toute altération frauduleuse de la vérité, de nature à causer un préjudice et accomplie par quelque moyen que ce soit, dans un écrit ou tout autre support d'expression de la pensée, qui a pour objet ou qui peut avoir pour effet d'établir la preuve d'un droit ou d'un fait ayant des conséquences juridiques. Le faux et l'usage de faux sont punis de trois ans d'emprisonnement et de 45000 € d'amende.</p>
      </div>
    </div>
  );
}