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
              "European Agricultural Fund for Rural Development: Europe investing in rural areas".
            </p>
            <p className="text-xs text-gray-600 text-center mb-3 leading-relaxed">
              This website is co-financed by European Union funds as part of the Local Development Support 
              initiative under the LEADER programme within sub-measure 19.2
            </p>
            <p className="text-xs text-gray-700 text-center mb-3 leading-relaxed font-medium">
              "Support for implementing operations under community-led local development strategies"
            </p>
            <p className="text-xs text-gray-600 text-center">
              covered by the Rural Development Programme for 2014-2020.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EUProjectSection;