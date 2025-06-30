// src/components/attestation/AttestationDocument.tsx

import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { TAttestationSchema } from '@/lib/validators';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

Font.register({
  family: 'Helvetica-Bold',
  src: 'https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN_s8-V1dl_r_-_g.ttf',
});
Font.register({
  family: 'Helvetica',
  src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf',
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
    paddingHorizontal: 40,
    paddingBottom: 60,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 20,
  },
  text: {
    marginBottom: 2,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  signatureSection: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  signatureLeft: {
    width: '50%',
  },
  signatureRight: {
    width: '40%',
    textAlign: 'center',
  },
  signatureImage: {
    width: 120,
    height: 60,
    alignSelf: 'center',
    marginTop: 5
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 7,
    color: 'grey',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#c0c0c0',
    paddingTop: 5,
  },
});

interface AttestationDocumentProps {
  data: TAttestationSchema;
}

export const AttestationDocument = ({ data }: AttestationDocumentProps) => (
  <Document
    title={`Attestation_Hebergement_${data.hostedLastName}`}
    author={`${data.hostFirstName} ${data.hostLastName}`}
  >
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>ATTESTATION D&apos;HÉBERGEMENT</Text>

      <View style={styles.section}>
        <Text style={styles.text}>Je soussigné(e),</Text>
        <Text style={styles.text}><Text style={styles.bold}>{data.hostGender} {data.hostLastName.toUpperCase()} {data.hostFirstName}</Text></Text>
        <Text style={styles.text}>Né(e) le {format(data.hostBirthDate, 'dd MMMM yyyy', { locale: fr })} à {data.hostBirthPlace}</Text>
        <Text style={styles.text}>Demeurant : {data.hostAddress} {data.hostAddressLine2}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>
          Certifie sur l&apos;honneur héberger à mon domicile ci-dessus mentionné, depuis le {format(data.hostingStartDate, 'dd MMMM yyyy', { locale: fr })}, la personne suivante :
        </Text>
        <Text style={styles.text}><Text style={styles.bold}>{data.hostedGender} {data.hostedLastName.toUpperCase()} {data.hostedFirstName}</Text></Text>
        <Text style={styles.text}>Né(e) le {format(data.hostedBirthDate, 'dd MMMM yyyy', { locale: fr })} à {data.hostedBirthPlace}</Text>
      </View>
      
      <View style={styles.signatureSection}>
        <View style={styles.signatureLeft}>
        </View>
        <View style={styles.signatureRight}>
          <Text style={styles.text}>Fait à {data.attestationPlace},</Text>
          <Text style={styles.text}>Le {format(data.attestationDate, 'dd MMMM yyyy', { locale: fr })}.</Text>
          <Text style={[styles.text, { marginTop: 10 }]}>Signature de l&apos;hébergeant(e) :</Text>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={styles.signatureImage} src={data.signatureDataUrl} />
        </View>
      </View>

      <Text style={styles.footer}>
        Article 441-1 du Code Pénal : Constitue un faux toute altération frauduleuse de la vérité, de nature à causer un préjudice et accomplie par quelque moyen que ce soit, dans un écrit ou tout autre support d&apos;expression de la pensée, qui a pour objet ou qui peut avoir pour effet d&apos;établir la preuve d&apos;un droit ou d&apos;un fait ayant des conséquences juridiques. Le faux et l&apos;usage de faux sont punis de trois ans d&apos;emprisonnement et de 45000 € d&apos;amende.
      </Text>
    </Page>
  </Document>
);