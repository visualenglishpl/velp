import { Helmet } from "react-helmet";
import { Link } from "wouter";

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Regulamin | Visual English</title>
      </Helmet>
      <div className="min-h-screen bg-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Regulamin Świadczenia Usług (Terms of Service)</h1>
          
          <div className="prose prose-blue max-w-none">
            <div className="mb-10">
              <h2>Regulamin (Polish)</h2>
              
              <h3>§1. Postanowienia ogólne</h3>
              <p>
                1.1. Niniejszy Regulamin określa zasady korzystania z platformy edukacyjnej Visual English, prowadzonej przez EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ, z siedzibą przy ul. RYNEK 2, 32-640 ZATOR, MAŁOPOLSKIE, wpisaną do rejestru przedsiębiorców Krajowego Rejestru Sądowego pod numerem KRS 0000806143, NIP: 5492456552, REGON: 384474200.
              </p>
              <p>
                1.2. Platforma Visual English świadczy usługi drogą elektroniczną w rozumieniu ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.
              </p>
              
              <h3>§2. Definicje</h3>
              <p>
                2.1. <strong>Usługodawca</strong> - EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ.
              </p>
              <p>
                2.2. <strong>Usługobiorca/Użytkownik</strong> - osoba fizyczna, prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, korzystająca z usług Platformy.
              </p>
              <p>
                2.3. <strong>Platforma</strong> - serwis internetowy Visual English dostępny pod adresem www.visualenglish.com.
              </p>
              <p>
                2.4. <strong>Konto</strong> - zbiór zasobów i uprawnień przypisanych konkretnemu Użytkownikowi w ramach Platformy.
              </p>
              
              <h3>§3. Rodzaje i zakres usług</h3>
              <p>
                3.1. Usługodawca za pośrednictwem Platformy świadczy następujące usługi:
              </p>
              <ul>
                <li>Dostęp do cyfrowych materiałów edukacyjnych do nauki języka angielskiego</li>
                <li>Możliwość zakupu subskrypcji na pojedyncze lekcje lub całe książki</li>
                <li>Możliwość zakupu książek drukowanych</li>
                <li>Dostęp do interaktywnych ćwiczeń, gier i quizów</li>
                <li>Śledzenie postępów w nauce</li>
              </ul>
              
              <h3>§4. Warunki świadczenia usług</h3>
              <p>
                4.1. Korzystanie z Platformy jest możliwe pod warunkiem spełnienia następujących wymagań technicznych:
              </p>
              <ul>
                <li>Posiadanie urządzenia z dostępem do internetu</li>
                <li>Korzystanie z aktualnej wersji przeglądarki internetowej z włączoną obsługą JavaScript i cookies</li>
                <li>Posiadanie aktywnego adresu e-mail</li>
              </ul>
              <p>
                4.2. Usługodawca zobowiązuje się do świadczenia usług z należytą starannością oraz zgodnie z obowiązującymi przepisami prawa.
              </p>
              
              <h3>§5. Warunki zawierania i rozwiązywania umów</h3>
              <p>
                5.1. Zawarcie umowy o świadczenie usług następuje poprzez rejestrację Konta lub zakup subskrypcji na Platformie.
              </p>
              <p>
                5.2. Użytkownik może w każdej chwili rozwiązać umowę poprzez usunięcie Konta z Platformy.
              </p>
              <p>
                5.3. Usługodawca może rozwiązać umowę w przypadku naruszenia przez Użytkownika postanowień niniejszego Regulaminu.
              </p>
              
              <h3>§6. Warunki płatności</h3>
              <p>
                6.1. Ceny za usługi dostępne na Platformie są wyrażone w euro (€) i zawierają podatek VAT.
              </p>
              <p>
                6.2. Dostępne są następujące opcje cenowe:
              </p>
              <ul>
                <li>Książka drukowana: €20 + koszty dostawy</li>
                <li>Dostęp do pojedynczej lekcji: €5/miesiąc lub €40/rok (33% oszczędności)</li>
                <li>Dostęp do całej książki: €25/miesiąc lub €180/rok (40% oszczędności)</li>
                <li>Darmowy okres próbny: 7 dni (wymagana karta kredytowa)</li>
              </ul>
              <p>
                6.3. Płatności są realizowane za pośrednictwem bezpiecznych metod płatności elektronicznych.
              </p>
              
              <h3>§7. Prawo odstąpienia od umowy</h3>
              <p>
                7.1. Zgodnie z Ustawą z dnia 30 maja 2014 r. o prawach konsumenta, Użytkownik będący konsumentem ma prawo odstąpić od umowy zawartej na odległość bez podania przyczyny w terminie 14 dni od dnia jej zawarcia.
              </p>
              <p>
                7.2. Prawo odstąpienia od umowy nie przysługuje w przypadku dostarczania treści cyfrowych, które nie są zapisane na nośniku materialnym, jeżeli spełnianie świadczenia rozpoczęło się za wyraźną zgodą konsumenta przed upływem terminu do odstąpienia od umowy i po poinformowaniu go przez przedsiębiorcę o utracie prawa odstąpienia od umowy.
              </p>
              <p>
                7.3. Szczegółowe informacje dotyczące prawa odstąpienia dostępne są na stronie <Link href="/withdrawal" className="text-blue-600 underline">Prawo odstąpienia</Link>.
              </p>
              
              <h3>§8. Reklamacje</h3>
              <p>
                8.1. Użytkownik ma prawo składać reklamacje dotyczące świadczonych usług.
              </p>
              <p>
                8.2. Reklamacje należy składać drogą elektroniczną na adres: reklamacje@visualenglish.com lub pisemnie na adres siedziby Usługodawcy.
              </p>
              <p>
                8.3. Reklamacja powinna zawierać dane Użytkownika, opis problemu oraz żądanie Użytkownika.
              </p>
              <p>
                8.4. Usługodawca rozpatrzy reklamację w terminie 14 dni od dnia jej otrzymania.
              </p>
              
              <h3>§9. Ochrona danych osobowych</h3>
              <p>
                9.1. Administratorem danych osobowych Użytkowników jest Usługodawca.
              </p>
              <p>
                9.2. Dane osobowe przetwarzane są zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO).
              </p>
              <p>
                9.3. Szczegółowe informacje dotyczące przetwarzania danych osobowych znajdują się w <Link href="/privacy" className="text-blue-600 underline">Polityce Prywatności</Link>.
              </p>
              <p>
                9.4. Informacje dotyczące plików cookies znajdują się w <Link href="/cookies" className="text-blue-600 underline">Polityce Cookies</Link>.
              </p>
              
              <h3>§10. Własność intelektualna</h3>
              <p>
                10.1. Wszelkie prawa własności intelektualnej do Platformy, w tym do jej elementów graficznych, treści, struktury oraz oprogramowania należą do Usługodawcy lub podmiotów, z którymi Usługodawca zawarł stosowne umowy.
              </p>
              <p>
                10.2. Korzystanie z Platformy nie oznacza nabycia przez Użytkownika jakichkolwiek praw własności intelektualnej do utworów w niej zawartych.
              </p>
              
              <h3>§11. Postanowienia końcowe</h3>
              <p>
                11.1. Regulamin wchodzi w życie z dniem 6 maja 2025 roku.
              </p>
              <p>
                11.2. Usługodawca zastrzega sobie prawo do zmiany Regulaminu. O wszelkich zmianach Użytkownicy będą informowani poprzez publikację nowej wersji Regulaminu na stronie Platformy.
              </p>
              <p>
                11.3. W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego.
              </p>
              <p>
                11.4. Wszelkie spory wynikające z korzystania z Platformy rozstrzygane będą przez sąd właściwy miejscowo dla siedziby Usługodawcy.
              </p>
            </div>
            
            <div>
              <h2>Terms of Service (English)</h2>
              
              <h3>1. General Provisions</h3>
              <p>
                1.1. These Terms of Service define the rules for using the Visual English educational platform, operated by EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ, with its registered office at ul. RYNEK 2, 32-640 ZATOR, MAŁOPOLSKIE, entered into the Register of Entrepreneurs of the National Court Register under KRS number 0000806143, NIP: 5492456552, REGON: 384474200.
              </p>
              <p>
                1.2. The Visual English platform provides services electronically within the meaning of the Act of 18 July 2002 on the provision of electronic services.
              </p>
              
              <h3>2. Definitions</h3>
              <p>
                2.1. <strong>Service Provider</strong> - EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ.
              </p>
              <p>
                2.2. <strong>Service Recipient/User</strong> - a natural person, legal entity, or organizational unit without legal personality using the Platform's services.
              </p>
              <p>
                2.3. <strong>Platform</strong> - the Visual English website available at www.visualenglish.com.
              </p>
              <p>
                2.4. <strong>Account</strong> - a collection of resources and permissions assigned to a specific User within the Platform.
              </p>
              
              <h3>3. Types and Scope of Services</h3>
              <p>
                3.1. The Service Provider offers the following services through the Platform:
              </p>
              <ul>
                <li>Access to digital educational materials for learning English</li>
                <li>Ability to purchase subscriptions for individual lessons or entire books</li>
                <li>Ability to purchase printed books</li>
                <li>Access to interactive exercises, games, and quizzes</li>
                <li>Learning progress tracking</li>
              </ul>
              
              <h3>4. Service Conditions</h3>
              <p>
                4.1. Using the Platform is possible provided the following technical requirements are met:
              </p>
              <ul>
                <li>Having a device with internet access</li>
                <li>Using a current version of a web browser with JavaScript and cookies enabled</li>
                <li>Having an active email address</li>
              </ul>
              <p>
                4.2. The Service Provider commits to providing services with due diligence and in accordance with applicable law.
              </p>
              
              <h3>5. Conditions for Concluding and Terminating Agreements</h3>
              <p>
                5.1. The conclusion of a service agreement occurs by registering an Account or purchasing a subscription on the Platform.
              </p>
              <p>
                5.2. The User may terminate the agreement at any time by deleting their Account from the Platform.
              </p>
              <p>
                5.3. The Service Provider may terminate the agreement if the User violates the provisions of these Terms.
              </p>
              
              <h3>6. Payment Terms</h3>
              <p>
                6.1. Prices for services available on the Platform are expressed in euros (€) and include VAT.
              </p>
              <p>
                6.2. The following pricing options are available:
              </p>
              <ul>
                <li>Printed book: €20 + delivery costs</li>
                <li>Access to a single lesson: €5/month or €40/year (33% savings)</li>
                <li>Access to an entire book: €25/month or €180/year (40% savings)</li>
                <li>Free trial: 7 days (credit card required)</li>
              </ul>
              <p>
                6.3. Payments are processed through secure electronic payment methods.
              </p>
              
              <h3>7. Right of Withdrawal</h3>
              <p>
                7.1. According to the Act of 30 May 2014 on Consumer Rights, a User who is a consumer has the right to withdraw from a distance contract without giving any reason within 14 days from the date of its conclusion.
              </p>
              <p>
                7.2. The right of withdrawal does not apply in the case of supplying digital content that is not supplied on a tangible medium if the performance has begun with the consumer's prior express consent and acknowledgment that they thereby lose their right of withdrawal.
              </p>
              <p>
                7.3. Detailed information regarding the right of withdrawal is available on the <Link href="/withdrawal" className="text-blue-600 underline">Right of Withdrawal</Link> page.
              </p>
              
              <h3>8. Complaints</h3>
              <p>
                8.1. The User has the right to file complaints regarding the services provided.
              </p>
              <p>
                8.2. Complaints should be submitted electronically to: reklamacje@visualenglish.com or in writing to the Service Provider's registered office address.
              </p>
              <p>
                8.3. The complaint should contain the User's data, a description of the problem, and the User's request.
              </p>
              <p>
                8.4. The Service Provider will consider the complaint within 14 days from the date of receipt.
              </p>
              
              <h3>9. Personal Data Protection</h3>
              <p>
                9.1. The controller of Users' personal data is the Service Provider.
              </p>
              <p>
                9.2. Personal data is processed in accordance with Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 (GDPR).
              </p>
              <p>
                9.3. Detailed information regarding the processing of personal data can be found in the <Link href="/privacy" className="text-blue-600 underline">Privacy Policy</Link>.
              </p>
              <p>
                9.4. Information regarding cookies can be found in the <Link href="/cookies" className="text-blue-600 underline">Cookie Policy</Link>.
              </p>
              
              <h3>10. Intellectual Property</h3>
              <p>
                10.1. All intellectual property rights to the Platform, including its graphic elements, content, structure, and software, belong to the Service Provider or entities with which the Service Provider has concluded appropriate agreements.
              </p>
              <p>
                10.2. Using the Platform does not imply the acquisition by the User of any intellectual property rights to the works contained therein.
              </p>
              
              <h3>11. Final Provisions</h3>
              <p>
                11.1. These Terms come into force on May 6, 2025.
              </p>
              <p>
                11.2. The Service Provider reserves the right to change these Terms. Users will be informed of any changes through the publication of a new version of the Terms on the Platform's website.
              </p>
              <p>
                11.3. In matters not regulated by these Terms, the provisions of Polish law shall apply.
              </p>
              <p>
                11.4. Any disputes arising from the use of the Platform will be resolved by the court having jurisdiction over the registered office of the Service Provider.
              </p>
            </div>
            
            <p className="text-right mt-8">Last Updated: May 6, 2025</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;