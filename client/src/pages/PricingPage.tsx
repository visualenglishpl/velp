import PricingPlans from "@/components/sections/IndividualPlans";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingPage = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>{t('pricing.title')} | Visual English</title>
        <meta name="description" content={t('pricing.description')} />
      </Helmet>
      
      <div className="pt-24 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('pricing.heroTitle')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('pricing.heroSubtitle')}
            </p>
          </div>
        </div>
        
        <PricingPlans />
      </div>
    </>
  );
};

export default PricingPage;