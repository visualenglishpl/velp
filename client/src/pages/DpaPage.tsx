import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DpaPage = () => {
  const [language, setLanguage] = useState<"pl" | "en">("pl"); // Default to Polish

  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>
          {language === "pl" ? "Umowa Powierzenia Danych" : "Data Processing Agreement"} | Visual English
        </title>
        <meta 
          name="description" 
          content={language === "pl" 
            ? "Umowa powierzenia przetwarzania danych osobowych zgodnie z RODO"
            : "Data Processing Agreement in accordance with GDPR"
          } 
        />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {language === "pl" ? "Umowa Powierzenia Przetwarzania Danych" : "Data Processing Agreement"}
        </h1>
        
        <div className="mb-6 flex justify-center">
          <Tabs value={language} onValueChange={(val) => setLanguage(val as "pl" | "en")}>
            <TabsList>
              <TabsTrigger value="pl">Polski</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {language === "pl" ? (
          <div className="prose prose-blue max-w-none">
            <p className="text-sm text-gray-500 mb-6 text-center">Ostatnia aktualizacja: 6 maja 2025</p>
            
            <h2>UMOWA POWIERZENIA PRZETWARZANIA DANYCH OSOBOWYCH</h2>
            
            <p>Zawarta pomiędzy:</p>
            <p><strong>EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</strong> z siedzibą przy ul. RYNEK 2, 32-640 ZATOR, wpisaną do rejestru przedsiębiorców prowadzonego przez Sąd Rejonowy, pod numerem KRS 0000806143, NIP 5492456552, REGON 384474200, reprezentowaną przez upoważnionych przedstawicieli, zwaną dalej "Administratorem"</p>
            
            <p>a</p>
            
            <p>Użytkownikiem Serwisu Visual English, zwanym dalej "Przetwarzającym"</p>
            
            <p>zwanymi dalej łącznie "Stronami", a każda z osobna "Stroną".</p>
            
            <h3>§1 PRZEDMIOT UMOWY</h3>
            <ol>
              <li>Na podstawie niniejszej Umowy Administrator powierza Przetwarzającemu przetwarzanie danych osobowych w swoim imieniu.</li>
              <li>Przetwarzanie danych osobowych przez Przetwarzającego może odbywać się wyłącznie w celu i zakresie określonym w niniejszej Umowie oraz zgodnie z obowiązującymi przepisami prawa, w szczególności Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych, dalej "RODO").</li>
            </ol>
            
            <h3>§2 ZAKRES I CEL PRZETWARZANIA DANYCH</h3>
            <ol>
              <li>Administrator powierza Przetwarzającemu przetwarzanie danych osobowych w zakresie niezbędnym do korzystania z usług Serwisu Visual English.</li>
              <li>Przetwarzający zobowiązuje się do przetwarzania danych osobowych wyłącznie w celach związanych z realizacją Umowy i zgodnie z udokumentowanymi poleceniami Administratora.</li>
              <li>Zakres przetwarzania obejmuje następujące kategorie danych osobowych:
                <ul>
                  <li>Dane identyfikacyjne (imię, nazwisko, adres e-mail, telefon)</li>
                  <li>Dane rozliczeniowe (informacje o zakupionych produktach, historia płatności)</li>
                  <li>Dane dotyczące aktywności w serwisie (logi, historia korzystania z materiałów edukacyjnych)</li>
                </ul>
              </li>
            </ol>
            
            <h3>§3 OBOWIĄZKI PRZETWARZAJĄCEGO</h3>
            <ol>
              <li>Przetwarzający zobowiązuje się do:
                <ol type="a">
                  <li>Przetwarzania danych osobowych wyłącznie na udokumentowane polecenie Administratora;</li>
                  <li>Zapewnienia, by osoby upoważnione do przetwarzania danych osobowych zobowiązały się do zachowania tajemnicy;</li>
                  <li>Podjęcia wszelkich środków wymaganych na mocy art. 32 RODO (bezpieczeństwo przetwarzania);</li>
                  <li>Przestrzegania warunków korzystania z usług innego podmiotu przetwarzającego, o których mowa w art. 28 ust. 2 i 4 RODO;</li>
                  <li>Wspomagania Administratora w wywiązywaniu się z obowiązków określonych w art. 32-36 RODO;</li>
                  <li>Po zakończeniu świadczenia usług związanych z przetwarzaniem, zależnie od decyzji Administratora, usunięcia lub zwrotu wszelkich danych osobowych oraz usunięcia wszelkich ich istniejących kopii, chyba że prawo Unii lub prawo państwa członkowskiego nakazują przechowywanie danych osobowych;</li>
                  <li>Udostępnienia Administratorowi wszelkich informacji niezbędnych do wykazania spełnienia obowiązków określonych w niniejszej Umowie oraz umożliwienia Administratorowi lub audytorowi upoważnionemu przez Administratora przeprowadzania audytów, w tym inspekcji, i przyczyniania się do nich.</li>
                </ol>
              </li>
            </ol>
            
            <h3>§4 OBOWIĄZKI ADMINISTRATORA</h3>
            <ol>
              <li>Administrator zobowiązany jest współdziałać z Przetwarzającym w wykonaniu Umowy, udzielać Przetwarzającemu wyjaśnień w przypadku wątpliwości co do legalności poleceń Administratora, jak również wywiązywać się terminowo ze swoich obowiązków.</li>
            </ol>
            
            <h3>§5 BEZPIECZEŃSTWO DANYCH</h3>
            <ol>
              <li>Przetwarzający wdraża i stosuje odpowiednie środki techniczne i organizacyjne, w celu zapewnienia stopnia bezpieczeństwa odpowiedniego do ryzyka naruszenia praw lub wolności osób fizycznych, których dane przetwarza.</li>
              <li>Przetwarzający zobowiązuje się do regularnego testowania, mierzenia i oceniania skuteczności wprowadzonych środków technicznych i organizacyjnych mających zapewnić bezpieczeństwo przetwarzania.</li>
            </ol>
            
            <h3>§6 NARUSZENIE OCHRONY DANYCH OSOBOWYCH</h3>
            <ol>
              <li>Przetwarzający zobowiązuje się do informowania Administratora o wszelkich stwierdzonych naruszeniach ochrony danych osobowych, nie później niż w terminie 24 godzin od stwierdzenia naruszenia.</li>
              <li>Zgłoszenie powinno zawierać informacje wymagane przez art. 33 ust. 3 RODO.</li>
            </ol>
            
            <h3>§7 POSTANOWIENIA KOŃCOWE</h3>
            <ol>
              <li>Umowa została zawarta na czas obowiązywania Umowy głównej.</li>
              <li>Wszelkie zmiany niniejszej Umowy wymagają formy pisemnej pod rygorem nieważności.</li>
              <li>W sprawach nieuregulowanych niniejszą Umową mają zastosowanie przepisy RODO oraz Kodeksu cywilnego.</li>
              <li>Umowa została sporządzona w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze Stron.</li>
            </ol>
            
            <p className="text-center mt-12">Akceptacja Umowy następuje poprzez korzystanie z Serwisu Visual English po uprzednim zapoznaniu się z jej treścią.</p>
          </div>
        ) : (
          <div className="prose prose-blue max-w-none">
            <p className="text-sm text-gray-500 mb-6 text-center">Last updated: May 6, 2025</p>
            
            <h2>DATA PROCESSING AGREEMENT</h2>
            
            <p>Entered into by and between:</p>
            <p><strong>EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</strong> with its registered office at ul. RYNEK 2, 32-640 ZATOR, entered in the Register of Entrepreneurs maintained by the District Court, under KRS number 0000806143, NIP 5492456552, REGON 384474200, represented by authorized representatives, hereinafter referred to as the "Controller"</p>
            
            <p>and</p>
            
            <p>The User of the Visual English Service, hereinafter referred to as the "Processor"</p>
            
            <p>hereinafter collectively referred to as the "Parties" and individually as a "Party".</p>
            
            <h3>§1 SUBJECT MATTER OF THE AGREEMENT</h3>
            <ol>
              <li>Under this Agreement, the Controller entrusts the processing of personal data to the Processor on the Controller's behalf.</li>
              <li>The processing of personal data by the Processor may only take place for the purpose and to the extent specified in this Agreement and in accordance with applicable law, in particular Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC (General Data Protection Regulation, hereinafter "GDPR").</li>
            </ol>
            
            <h3>§2 SCOPE AND PURPOSE OF DATA PROCESSING</h3>
            <ol>
              <li>The Controller entrusts the Processor with the processing of personal data to the extent necessary to use the services of the Visual English Service.</li>
              <li>The Processor undertakes to process personal data solely for purposes related to the performance of the Agreement and in accordance with the Controller's documented instructions.</li>
              <li>The scope of processing includes the following categories of personal data:
                <ul>
                  <li>Identification data (name, surname, email address, phone number)</li>
                  <li>Billing data (information about purchased products, payment history)</li>
                  <li>Data concerning activity in the service (logs, history of using educational materials)</li>
                </ul>
              </li>
            </ol>
            
            <h3>§3 OBLIGATIONS OF THE PROCESSOR</h3>
            <ol>
              <li>The Processor undertakes to:
                <ol type="a">
                  <li>Process personal data only on documented instructions from the Controller;</li>
                  <li>Ensure that persons authorized to process personal data have committed themselves to confidentiality;</li>
                  <li>Take all measures required pursuant to Article 32 of the GDPR (security of processing);</li>
                  <li>Comply with the conditions for engaging another processor referred to in Article 28(2) and (4) of the GDPR;</li>
                  <li>Assist the Controller in ensuring compliance with the obligations pursuant to Articles 32 to 36 of the GDPR;</li>
                  <li>At the choice of the Controller, delete or return all personal data to the Controller after the end of the provision of services relating to processing, and delete existing copies unless Union or Member State law requires storage of the personal data;</li>
                  <li>Make available to the Controller all information necessary to demonstrate compliance with the obligations laid down in this Agreement and allow for and contribute to audits, including inspections, conducted by the Controller or another auditor mandated by the Controller.</li>
                </ol>
              </li>
            </ol>
            
            <h3>§4 OBLIGATIONS OF THE CONTROLLER</h3>
            <ol>
              <li>The Controller is obliged to cooperate with the Processor in the performance of the Agreement, to provide the Processor with explanations in case of doubt as to the legality of the Controller's instructions, as well as to fulfill its obligations in a timely manner.</li>
            </ol>
            
            <h3>§5 DATA SECURITY</h3>
            <ol>
              <li>The Processor implements and applies appropriate technical and organizational measures to ensure a level of security appropriate to the risk of infringement of the rights or freedoms of the natural persons whose data it processes.</li>
              <li>The Processor undertakes to regularly test, assess, and evaluate the effectiveness of technical and organizational measures implemented to ensure the security of processing.</li>
            </ol>
            
            <h3>§6 PERSONAL DATA BREACH</h3>
            <ol>
              <li>The Processor undertakes to inform the Controller of any identified personal data breaches, no later than within 24 hours of identifying the breach.</li>
              <li>The notification should contain information required by Article 33(3) of the GDPR.</li>
            </ol>
            
            <h3>§7 FINAL PROVISIONS</h3>
            <ol>
              <li>The Agreement has been concluded for the duration of the Main Agreement.</li>
              <li>Any changes to this Agreement require written form under pain of nullity.</li>
              <li>In matters not regulated by this Agreement, the provisions of the GDPR and the Civil Code shall apply.</li>
              <li>The Agreement has been drawn up in two identical copies, one for each Party.</li>
            </ol>
            
            <p className="text-center mt-12">Acceptance of the Agreement occurs through the use of the Visual English Service after prior familiarization with its content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DpaPage;