import React from 'react';

const EUProjectSection = () => {
  return (
    <section className="py-6 bg-white border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Co-Funded by the European Union</h2>
          
          <div className="flex flex-wrap justify-center items-center gap-4 mb-5">
            <img 
              src="/api/direct/content/VISUAL WEBSITE/naklejka PROW.pdf (1).png" 
              alt="EU Project Logo" 
              className="h-36"
            />
          </div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-xs text-gray-600 text-center mb-2 text-blue-600 font-semibold">
              „Europejski Fundusz Rolny na rzecz Rozwoju Obszarów Wiejskich: Europa inwestująca w obszary wiejskie".
            </p>
            <p className="text-xs text-gray-600 text-center mb-2">
              Strona internetowa współfinansowana jest ze środków
              Unii Europejskiej w ramach działania Wsparcie dla rozwoju lokalnego
              w ramach inicjatywy LEADER w zakresie poddziałania 19.2
            </p>
            <p className="text-xs italic text-gray-700 text-center mb-2">
              „Wsparcie na wdrażanie operacji w ramach
              strategii rozwoju lokalnego kierowanego przez społeczność"
            </p>
            <p className="text-xs text-gray-600 text-center">
              objętego Programem Rozwoju Obszarów Wiejskich na lata 2014-2020.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EUProjectSection;