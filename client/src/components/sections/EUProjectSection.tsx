import React from 'react';

const EUProjectSection = () => {
  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Co-Funded by the European Union</h2>
          
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <img 
              src="/api/content/VISUAL%20WEBSITE/naklejka%20PROW.pdf%20(1).png" 
              alt="EU Project Logo" 
              className="h-16"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <img 
              src="/api/content/VISUAL%20WEBSITE/eu-flag-logo.png" 
              alt="EU Flag" 
              className="h-16"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <img 
              src="/api/content/VISUAL%20WEBSITE/leader-logo.png" 
              alt="LEADER Logo" 
              className="h-16"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <img 
              src="/api/content/VISUAL%20WEBSITE/lgd-logo.png" 
              alt="LGD Logo" 
              className="h-16"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          
          <p className="text-sm text-gray-600 max-w-3xl text-center">
            „Europejski Fundusz Rolny na rzecz Rozwoju Obszarów Wiejskich: Europa inwestująca w obszary wiejskie".
            <br />Strona współfinansowana ze środków Unii Europejskiej w ramach działania Wsparcie dla rozwoju lokalnego w ramach inicjatywy LEADER.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EUProjectSection;