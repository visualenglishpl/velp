import { Helmet } from "react-helmet";

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Visual English</title>
      </Helmet>
      <div className="min-h-screen bg-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Privacy Policy</h1>
          
          <div className="prose prose-blue max-w-none">
            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy describes how EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ ("we", "our", or "us") collects, uses, 
              and shares your personal information when you use our Visual English learning platform and services.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>We collect several types of information from and about users of our platform, including:</p>
            <ul>
              <li>Personal identifiers such as your name, email address, and login credentials</li>
              <li>Educational data including progress, assessment results, and activity logs</li>
              <li>Device and usage information including IP address, browser type, and access times</li>
              <li>Payment and transaction data when you make purchases through our platform</li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Personalize your experience and deliver content relevant to your interests</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            </ul>
            
            <h2>4. Data Retention</h2>
            <p>
              We store your personal data for as long as necessary to provide our services, comply with legal obligations, 
              resolve disputes, and enforce our agreements. You can request deletion of your data by contacting us directly.
            </p>
            
            <h2>5. Your Rights Under GDPR</h2>
            <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights, including:</p>
            <ul>
              <li>The right to access, update or delete the information we have on you</li>
              <li>The right of rectification - to have your information corrected if it is inaccurate or incomplete</li>
              <li>The right to object to our processing of your personal data</li>
              <li>The right of restriction - to request that we restrict the processing of your personal information</li>
              <li>The right to data portability - to receive a copy of your data in a structured, machine-readable format</li>
              <li>The right to withdraw consent at any time where we relied on your consent to process your personal information</li>
            </ul>
            
            <h2>6. Contact Information</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ<br />
              ul. RYNEK 2<br />
              32-640 ZATOR<br />
              MAŁOPOLSKIE<br />
              Email: contact@visualenglish.com<br />
              Phone: +48 123 456 789
            </p>
            
            <h2>7. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
              and updating the "Last Updated" date.
            </p>
            
            <p className="text-right mt-8">Last Updated: May 6, 2025</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;