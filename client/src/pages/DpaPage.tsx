import { Helmet } from "react-helmet";

const DpaPage = () => {
  return (
    <>
      <Helmet>
        <title>Umowa Powierzenia Danych | Visual English</title>
      </Helmet>
      <div className="min-h-screen bg-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Umowa Powierzenia Przetwarzania Danych (DPA)</h1>
          
          <div className="prose prose-blue max-w-none">
            <div className="mb-8">
              <h2>Informacje o Umowie Powierzenia Przetwarzania Danych (Polish)</h2>
              <h3>1. Czym jest Umowa Powierzenia Przetwarzania Danych?</h3>
              <p>
                Umowa Powierzenia Przetwarzania Danych (DPA) to formalna umowa zawierana między administratorem danych (szkołą lub instytucją edukacyjną) a podmiotem przetwarzającym (Visual English), regulująca zasady przetwarzania danych osobowych uczniów i nauczycieli.
              </p>
              
              <h3>2. Kiedy wymagana jest Umowa Powierzenia?</h3>
              <p>
                Umowa Powierzenia jest wymagana zgodnie z art. 28 Rozporządzenia o Ochronie Danych Osobowych (RODO), gdy szkoła lub instytucja edukacyjna korzysta z naszej platformy Visual English do nauczania swoich uczniów, powierzając nam przetwarzanie ich danych osobowych.
              </p>
              
              <h3>3. Co zawiera Umowa Powierzenia?</h3>
              <p>
                Standardowa Umowa Powierzenia Przetwarzania Danych obejmuje następujące elementy:
              </p>
              <ul>
                <li>Przedmiot i czas trwania przetwarzania</li>
                <li>Charakter i cel przetwarzania</li>
                <li>Rodzaj danych osobowych i kategorie osób, których dane dotyczą</li>
                <li>Obowiązki i prawa administratora (szkoły)</li>
                <li>Obowiązki podmiotu przetwarzającego (Visual English)</li>
                <li>Środki bezpieczeństwa danych</li>
                <li>Zasady korzystania z podwykonawców</li>
                <li>Procedury w przypadku naruszenia ochrony danych</li>
              </ul>
              
              <h3>4. Jak uzyskać Umowę Powierzenia?</h3>
              <p>
                Jeśli reprezentujesz szkołę lub instytucję edukacyjną i potrzebujesz Umowy Powierzenia Przetwarzania Danych, skontaktuj się z nami pod adresem dpa@visualenglish.com. Prześlemy Ci standardowy wzór umowy lub przygotujemy dokument dostosowany do Twoich indywidualnych wymagań.
              </p>
              
              <h3>5. Nasze zobowiązania jako Procesor Danych</h3>
              <p>
                Jako podmiot przetwarzający dane osobowe, zobowiązujemy się do:
              </p>
              <ul>
                <li>Przetwarzania danych wyłącznie na udokumentowane polecenie administratora</li>
                <li>Zapewnienia poufności danych</li>
                <li>Wdrożenia odpowiednich środków technicznych i organizacyjnych</li>
                <li>Wspierania administratora w realizacji praw osób, których dane dotyczą</li>
                <li>Usunięcia lub zwrotu danych po zakończeniu świadczenia usług</li>
                <li>Udostępnienia administratorowi wszelkich informacji niezbędnych do wykazania spełnienia obowiązków RODO</li>
              </ul>
              
              <h3>6. Kontakt w sprawach DPA</h3>
              <p>
                W przypadku pytań dotyczących Umowy Powierzenia Przetwarzania Danych, prosimy o kontakt:
              </p>
              <p>
                Email: dpa@visualenglish.com<br />
                Tel: +48 123 456 789
              </p>
            </div>
            
            <div>
              <h2>Data Processing Agreement Information (English)</h2>
              <h3>1. What is a Data Processing Agreement?</h3>
              <p>
                A Data Processing Agreement (DPA) is a formal agreement between the data controller (school or educational institution) and the data processor (Visual English), regulating the processing of personal data of students and teachers.
              </p>
              
              <h3>2. When is a DPA required?</h3>
              <p>
                A DPA is required under Article 28 of the General Data Protection Regulation (GDPR) when a school or educational institution uses our Visual English platform to teach their students, entrusting us with processing their personal data.
              </p>
              
              <h3>3. What does a DPA include?</h3>
              <p>
                A standard Data Processing Agreement includes the following elements:
              </p>
              <ul>
                <li>Subject matter and duration of processing</li>
                <li>Nature and purpose of processing</li>
                <li>Type of personal data and categories of data subjects</li>
                <li>Obligations and rights of the controller (school)</li>
                <li>Obligations of the processor (Visual English)</li>
                <li>Data security measures</li>
                <li>Rules for using subprocessors</li>
                <li>Procedures in case of data breach</li>
              </ul>
              
              <h3>4. How to obtain a DPA?</h3>
              <p>
                If you represent a school or educational institution and need a Data Processing Agreement, please contact us at dpa@visualenglish.com. We will send you a standard template or prepare a document tailored to your specific requirements.
              </p>
              
              <h3>5. Our Commitments as a Data Processor</h3>
              <p>
                As a data processor, we commit to:
              </p>
              <ul>
                <li>Processing data only on documented instructions from the controller</li>
                <li>Ensuring data confidentiality</li>
                <li>Implementing appropriate technical and organizational measures</li>
                <li>Supporting the controller in fulfilling data subject rights</li>
                <li>Deleting or returning data after the end of service provision</li>
                <li>Providing the controller with all information necessary to demonstrate compliance with GDPR obligations</li>
              </ul>
              
              <h3>6. DPA Contact Information</h3>
              <p>
                For questions regarding Data Processing Agreements, please contact:
              </p>
              <p>
                Email: dpa@visualenglish.com<br />
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

export default DpaPage;