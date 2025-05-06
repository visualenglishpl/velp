import React from 'react';

const EUProjectSection = () => {
  return (
    <section className="py-8 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <img 
            src="/api/content/VISUAL%20WEBSITE/naklejka%20PROW.pdf%20(1).png" 
            alt="EU Project Logo" 
            className="h-12 mb-3"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <p className="text-xs text-gray-500 max-w-3xl text-center">
            „Europejski Fundusz Rolny na rzecz Rozwoju Obszarów Wiejskich: Europa inwestująca w obszary wiejskie".
            Projekt współfinansowany jest ze środków Unii Europejskiej w ramach działania Wsparcie dla rozwoju lokalnego w ramach inicjatywy LEADER.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EUProjectSection;
