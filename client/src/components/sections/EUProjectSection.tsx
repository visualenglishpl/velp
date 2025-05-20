import React from 'react';

const EUProjectSection = () => {
  return (
    <section className="py-10 bg-gray-50 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Co-Funded by the European Union</h2>
          
          <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
            <img 
              src="/api/direct/content/VISUAL WEBSITE/naklejka PROW.pdf (1).png" 
              alt="EU Project Logo" 
              className="h-40 object-contain shadow-sm rounded-lg"
            />
          </div>
          
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-blue-600 text-center mb-3 font-medium">
              „Europejski Fundusz Rolny na rzecz Rozwoju Obszarów Wiejskich: Europa inwestująca w obszary wiejskie".
            </p>
            <p className="text-xs text-gray-600 text-center mb-3 leading-relaxed">
              Strona internetowa współfinansowana jest ze środków
              Unii Europejskiej w ramach działania Wsparcie dla rozwoju lokalnego
              w ramach inicjatywy LEADER w zakresie poddziałania 19.2
            </p>
            <p className="text-xs text-gray-700 text-center mb-3 leading-relaxed font-medium">
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