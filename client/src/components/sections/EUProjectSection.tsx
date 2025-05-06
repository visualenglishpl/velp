import React from 'react';

const EUProjectSection = () => {
  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Co-Funded by the European Union</h2>
          
          <div className="flex flex-wrap justify-center items-center gap-10 mb-8">
            <img 
              src="/api/direct/content/VISUAL WEBSITE/eu-flag-logo.png" 
              alt="EU Flag" 
              className="h-16"
            />
            <img 
              src="/api/direct/content/VISUAL WEBSITE/naklejka PROW.pdf (1).png" 
              alt="EU Project Logo" 
              className="h-16"
            />
          </div>
          
          <p className="text-sm text-gray-600 max-w-3xl text-center mb-4 text-blue-600 font-semibold">
            „Europejski Fundusz Rolny na rzecz Rozwoju Obszarów Wiejskich: Europa inwestująca w obszary wiejskie".
          </p>
          <p className="text-sm text-gray-600 max-w-3xl text-center mb-3">
            Strona internetowa współfinansowana jest ze środków
            Unii Europejskiej w ramach działania Wsparcie dla rozwoju lokalnego
            w ramach inicjatywy LEADER w zakresie poddziałania 19.2
          </p>
          <p className="text-sm italic text-gray-700 max-w-3xl text-center mb-3">
            „Wsparcie na wdrażanie operacji w ramach
            strategii rozwoju lokalnego kierowanego przez społeczność"
          </p>
          <p className="text-sm text-gray-600 max-w-3xl text-center">
            objętego Programem Rozwoju Obszarów Wiejskich na lata 2014-2020.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EUProjectSection;