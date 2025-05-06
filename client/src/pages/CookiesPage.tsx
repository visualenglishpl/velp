import { Helmet } from "react-helmet";

const CookiesPage = () => {
  return (
    <>
      <Helmet>
        <title>Polityka Cookies | Visual English</title>
      </Helmet>
      <div className="min-h-screen bg-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Polityka Cookies (Cookie Policy)</h1>
          
          <div className="prose prose-blue max-w-none">
            <div className="mb-8">
              <h2>Polityka Cookies (Polish)</h2>
              <h3>1. Wprowadzenie</h3>
              <p>
                Niniejsza Polityka Cookies określa zasady przechowywania i dostępu do informacji na urządzeniach Użytkownika za pomocą plików Cookies, służących realizacji usług świadczonych drogą elektroniczną przez EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ ("Visual English").
              </p>
              
              <h3>2. Czym są pliki Cookies?</h3>
              <p>
                Cookies to małe pliki tekstowe, które są zapisywane na urządzeniu końcowym Użytkownika podczas korzystania z naszej platformy. Pliki te pozwalają rozpoznać urządzenie Użytkownika podczas kolejnych wizyt na naszej stronie.
              </p>
              
              <h3>3. Rodzaje wykorzystywanych Cookies</h3>
              <p>Na naszej platformie wykorzystujemy następujące rodzaje plików Cookies:</p>
              <ul>
                <li><strong>Niezbędne</strong> - są konieczne do prawidłowego funkcjonowania strony (np. uwierzytelnianie, zapamiętywanie sesji)</li>
                <li><strong>Analityczne</strong> - pomagają zrozumieć, w jaki sposób Użytkownicy korzystają z naszej platformy (np. Google Analytics)</li>
                <li><strong>Marketingowe</strong> - umożliwiają wyświetlanie spersonalizowanych reklam</li>
                <li><strong>Preferencji</strong> - zapamiętują preferencje i ustawienia Użytkownika</li>
              </ul>
              
              <h3>4. Zarządzanie plikami Cookies</h3>
              <p>
                Użytkownik może w każdej chwili zmienić ustawienia dotyczące plików Cookies za pomocą ustawień swojej przeglądarki internetowej lub używając naszego banera zgody na pliki cookies. Szczegółowe informacje o możliwości i sposobach obsługi plików Cookies dostępne są w ustawieniach oprogramowania (przeglądarki internetowej).
              </p>
              
              <h3>5. Konsekwencje wyłączenia Cookies</h3>
              <p>
                Ograniczenie stosowania plików Cookies może wpłynąć na niektóre funkcjonalności dostępne na stronie. Wyłączenie niezbędnych plików Cookies może uniemożliwić korzystanie z niektórych usług w ramach naszej platformy.
              </p>
              
              <h3>6. Zmiany w Polityce Cookies</h3>
              <p>
                Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Cookies. O wszelkich zmianach będziemy informować poprzez zamieszczenie odpowiedniej informacji na naszej stronie internetowej.
              </p>
              
              <h3>7. Kontakt</h3>
              <p>
                W przypadku pytań dotyczących naszej Polityki Cookies, prosimy o kontakt:
              </p>
              <p>
                EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ<br />
                ul. RYNEK 2<br />
                32-640 ZATOR<br />
                MAŁOPOLSKIE<br />
                Email: contact@visualenglish.com<br />
                Tel: +48 123 456 789
              </p>
            </div>
            
            <div>
              <h2>Cookie Policy (English)</h2>
              <h3>1. Introduction</h3>
              <p>
                This Cookie Policy defines the rules for storing and accessing information on User devices through Cookies, used to provide services by electronic means by EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ ("Visual English").
              </p>
              
              <h3>2. What are Cookies?</h3>
              <p>
                Cookies are small text files that are stored on the User's end device when using our platform. These files allow us to recognize the User's device during subsequent visits to our website.
              </p>
              
              <h3>3. Types of Cookies we use</h3>
              <p>On our platform, we use the following types of Cookies:</p>
              <ul>
                <li><strong>Necessary</strong> - required for the proper functioning of the website (e.g., authentication, session remembering)</li>
                <li><strong>Analytical</strong> - help understand how Users interact with our platform (e.g., Google Analytics)</li>
                <li><strong>Marketing</strong> - enable the display of personalized advertisements</li>
                <li><strong>Preferences</strong> - remember User preferences and settings</li>
              </ul>
              
              <h3>4. Managing Cookies</h3>
              <p>
                Users can change their Cookie settings at any time using their web browser settings or our cookie consent banner. Detailed information about the possibility and methods of handling Cookies is available in the software settings (web browser).
              </p>
              
              <h3>5. Consequences of disabling Cookies</h3>
              <p>
                Limiting the use of Cookies may affect some of the functionalities available on the website. Disabling necessary cookies may prevent the use of certain services within our platform.
              </p>
              
              <h3>6. Changes to the Cookie Policy</h3>
              <p>
                We reserve the right to make changes to this Cookie Policy. We will inform about any changes by posting appropriate information on our website.
              </p>
              
              <h3>7. Contact</h3>
              <p>
                If you have any questions regarding our Cookie Policy, please contact us:
              </p>
              <p>
                EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ<br />
                ul. RYNEK 2<br />
                32-640 ZATOR<br />
                MAŁOPOLSKIE<br />
                Email: contact@visualenglish.com<br />
                Phone: +48 123 456 789
              </p>
            </div>
            
            <p className="text-right mt-8">Last Updated: May 6, 2025</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiesPage;