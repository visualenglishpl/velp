import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CookiesPage = () => {
  const [language, setLanguage] = useState<"pl" | "en">("pl"); // Default to Polish

  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Polityka Cookies | Visual English</title>
        <meta name="description" content="Polityka Cookies serwisu Visual English" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Polityka Cookies</h1>
        
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
            <h2>Polityka dotycząca plików cookies</h2>
            <p>Ostatnia aktualizacja: 6 maja 2025 r.</p>
            
            <h3>1. Wprowadzenie</h3>
            <p>
              Nasza strona internetowa, Visual English („Strona"), wykorzystuje pliki cookies i podobne technologie, aby odróżnić Cię od innych użytkowników naszej Strony. Pomaga nam to zapewnić Ci pozytywne doświadczenia podczas przeglądania naszej Strony, a także pozwala nam ją ulepszać.
            </p>
            <p>
              Polityka ta dostarcza informacji na temat rodzajów plików cookies, które stosujemy, oraz sposobów, w jakie możesz kontrolować ich używanie. Korzystając z naszej Strony, wyrażasz zgodę na używanie plików cookies zgodnie z niniejszą Polityką.
            </p>
            
            <h3>2. Czym są pliki cookies?</h3>
            <p>
              Pliki cookies są małymi plikami tekstowymi zawierającymi litery i cyfry, które są przechowywane na Twoim urządzeniu (komputerze, tablecie, smartfonie) podczas odwiedzania stron internetowych. Są one powszechnie wykorzystywane do usprawnienia działania stron internetowych lub zwiększenia ich wydajności, a także do dostarczania informacji właścicielom stron.
            </p>
            
            <h3>3. Jak używamy plików cookies</h3>
            <p>
              Używamy następujących typów plików cookies:
            </p>
            <ul>
              <li>
                <strong>Niezbędne pliki cookies:</strong> Są to pliki cookies, które są niezbędne do prawidłowego funkcjonowania naszej Strony. Pozwalają na korzystanie z funkcji takich jak logowanie i dostęp do bezpiecznych obszarów Strony. Nie można ich wyłączyć w naszych systemach.
              </li>
              <li>
                <strong>Funkcjonalne pliki cookies:</strong> Umożliwiają one zapamiętanie wyborów, których dokonujesz (takich jak Twój język lub region) i dostarczenie ulepszonych, bardziej spersonalizowanych funkcji.
              </li>
              <li>
                <strong>Analityczne/wydajnościowe pliki cookies:</strong> Pozwalają nam rozpoznać i policzyć liczbę odwiedzających oraz zobaczyć, jak użytkownicy poruszają się po naszej Stronie. Pomaga nam to poprawić działanie naszej Strony, np. poprzez zapewnienie łatwego znajdowania szukanych informacji.
              </li>
              <li>
                <strong>Marketingowe pliki cookies:</strong> Są one używane do śledzenia odwiedzających na różnych stronach internetowych. Celem jest wyświetlanie reklam, które są odpowiednie i interesujące dla indywidualnego użytkownika, a tym samym bardziej wartościowe dla wydawców i reklamodawców zewnętrznych.
              </li>
            </ul>
            
            <h3>4. Jak zarządzać plikami cookies</h3>
            <p>
              Większość przeglądarek internetowych jest domyślnie ustawiona na akceptowanie plików cookies. Jednakże, możesz zmienić ustawienia swojej przeglądarki, aby usunąć lub zapobiec akceptowaniu plików cookies lub określonych typów plików cookies lub aby otrzymywać powiadomienie, gdy strona internetowa chce zapisać plik cookie.
            </p>
            <p>
              Prosimy zapoznać się z instrukcją obsługi lub funkcją pomocy przeglądarki internetowej, aby dowiedzieć się, jak dostosować lub zmienić ustawienia przeglądarki.
            </p>
            <p>
              Ponadto, oferujemy panel ustawień plików cookies, który pozwala na kontrolowanie kategorii plików cookies, które akceptujesz. Możesz uzyskać dostęp do tego panelu w dowolnym momencie, klikając link "Ustawienia plików cookies" w stopce naszej Strony.
            </p>
            
            <h3>5. Konsekwencje wyłączenia plików cookies</h3>
            <p>
              Jeśli zdecydujesz się wyłączyć lub zablokować pliki cookies, nadal będziesz mógł korzystać z naszej Strony, ale niektóre funkcje i obszary naszej Strony mogą nie działać prawidłowo.
            </p>
            
            <h3>6. Zmiany w polityce cookies</h3>
            <p>
              Możemy aktualizować naszą Politykę dotyczącą plików cookies od czasu do czasu. Wszelkie zmiany w tej Polityce zostaną opublikowane na tej stronie.
            </p>
            
            <h3>7. Kontakt</h3>
            <p>
              Jeśli masz jakiekolwiek pytania dotyczące naszej Polityki dotyczącej plików cookies, prosimy o kontakt pod adresem: contact@visualenglish.edu.pl
            </p>
          </div>
        ) : (
          <div className="prose prose-blue max-w-none">
            <h2>Cookie Policy</h2>
            <p>Last updated: May 6, 2025</p>
            
            <h3>1. Introduction</h3>
            <p>
              Our website, Visual English ("Site"), uses cookies and similar technologies to distinguish you from other users of our Site. This helps us provide you with a good experience when you browse our Site and also allows us to improve it.
            </p>
            <p>
              This policy provides you with information about the types of cookies we use and the purposes for using them. By using our Site, you consent to our use of cookies in accordance with this policy.
            </p>
            
            <h3>2. What are cookies?</h3>
            <p>
              Cookies are small text files containing letters and numbers that are stored on your device (computer, tablet, smartphone) when you visit websites. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
            </p>
            
            <h3>3. How we use cookies</h3>
            <p>
              We use the following types of cookies:
            </p>
            <ul>
              <li>
                <strong>Necessary cookies:</strong> These are cookies that are essential for the operation of our Site. They enable core functionality such as security, network management, and account access. You cannot disable these cookies in our systems.
              </li>
              <li>
                <strong>Functional cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
              </li>
              <li>
                <strong>Analytical/performance cookies:</strong> These cookies allow us to recognize and count the number of visitors and to see how visitors move around our Site when they are using it. This helps us to improve the way our Site works, for example, by ensuring that users find what they are looking for easily.
              </li>
              <li>
                <strong>Marketing cookies:</strong> These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.
              </li>
            </ul>
            
            <h3>4. How to manage cookies</h3>
            <p>
              Most internet browsers are initially set up to automatically accept cookies. However, you can change the settings of your browser to remove or prevent your browser from accepting cookies, or to alert you when a website is trying to place a cookie on your computer.
            </p>
            <p>
              Please refer to your browser's manual or help function to learn how to adjust or modify your browser settings.
            </p>
            <p>
              Additionally, we offer a cookie settings panel which allows you to control which categories of cookies you accept. You can access this panel at any time by clicking on the "Cookie settings" link in the footer of our Site.
            </p>
            
            <h3>5. Consequences of disabling cookies</h3>
            <p>
              If you choose to disable or block cookies, you will still be able to use our Site, but some features and areas of our Site may not function properly.
            </p>
            
            <h3>6. Changes to the cookie policy</h3>
            <p>
              We may update our Cookie Policy from time to time. Any changes we make to our Cookie Policy will be posted on this page.
            </p>
            
            <h3>7. Contact us</h3>
            <p>
              If you have any questions about our Cookie Policy, please contact us at: contact@visualenglish.edu.pl
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookiesPage;