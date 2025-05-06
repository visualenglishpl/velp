import { Helmet } from "react-helmet";

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Visual English</title>
      </Helmet>
      <div className="min-h-screen bg-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Terms of Service</h1>
          
          <div className="prose prose-blue max-w-none">
            <h2>1. Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement between you and EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ 
              governing your access to and use of the Visual English platform and services.
            </p>
            
            <h2>2. Description of Service</h2>
            <p>
              Visual English is an educational platform designed to provide English language learning through visual methods, interactive content, and 
              structured lessons. Our service includes various subscription options for digital and printed educational materials.
            </p>
            
            <h2>3. User Registration</h2>
            <p>
              To access certain features of our platform, you must register for an account. You agree to provide accurate, current, and complete 
              information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            
            <h2>4. Subscription and Payment</h2>
            <p>
              Visual English offers various subscription plans. By selecting a subscription plan and providing payment information, you agree to pay 
              the subscription fees indicated for that service. Payments are processed securely through our payment processor.
            </p>
            <p>
              Subscription periods begin from the date of payment and continue for the length of the selected term. Subscription fees are non-refundable 
              except as required by applicable consumer protection law.
            </p>
            
            <h2>5. User Content</h2>
            <p>
              Our platform may allow you to upload, submit, store, send, or receive content. You retain ownership of any intellectual property rights 
              that you hold in that content. By uploading content, you grant Visual English a worldwide license to use, host, store, reproduce, and 
              display your content solely for the purpose of providing and improving our services.
            </p>
            
            <h2>6. Intellectual Property</h2>
            <p>
              The Visual English platform, including all content, features, and functionality, is owned by EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ 
              and is protected by copyright, trademark, and other intellectual property laws. Our materials may not be reproduced, distributed, or used for 
              commercial purposes without our express written permission.
            </p>
            
            <h2>7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Visual English shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages, or any loss of profits or revenue, whether incurred directly or indirectly, or any loss of data, use, goodwill, or 
              other intangible losses, resulting from your access to or use of or inability to access or use the service.
            </p>
            
            <h2>8. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of Poland, without regard to its conflict of law provisions. Any legal action or proceeding 
              arising out of these Terms shall be brought exclusively in the courts located in Poland.
            </p>
            
            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. If we make changes, we will provide notice of such changes by updating the 
              "Last Updated" date. Your continued use of our platform following the posting of revised Terms means that you accept and agree to the changes.
            </p>
            
            <h2>10. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ<br />
              ul. RYNEK 2<br />
              32-640 ZATOR<br />
              MAŁOPOLSKIE<br />
              Email: contact@visualenglish.com<br />
              Phone: +48 123 456 789
            </p>
            
            <p className="text-right mt-8">Last Updated: May 6, 2025</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;