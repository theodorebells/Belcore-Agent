
import React from 'react';

const AutomationVisualizer: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">How Belcore Automation Works</h2>
        <p className="text-gray-500">A visual example of a customer lead automation flow.</p>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-gray-100">
        <div className="flex flex-col items-center space-y-6">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center group w-full max-w-md">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-bold text-gray-900">Step 1: Digital Intake</h4>
              <p className="text-sm text-gray-500">Customer fills a 30-second form on their mobile phone instead of writing in a notebook.</p>
            </div>
            <div className="h-10 w-1 bg-gray-200 my-2"></div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center group w-full max-w-md">
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-bold text-gray-900">Step 2: Instant Data Capture</h4>
              <p className="text-sm text-gray-500">Data is automatically saved to a secure cloud database (Airtable/Google Sheets). No manual entry needed.</p>
            </div>
            <div className="h-10 w-1 bg-gray-200 my-2"></div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center group w-full max-w-md">
            <div className="w-16 h-16 bg-purple-500 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-bold text-gray-900">Step 3: Trigger Workflow</h4>
              <p className="text-sm text-gray-500">System sends a "Thank You" WhatsApp message to the customer and notifies the business owner instantly.</p>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-2xl">
        <h4 className="font-bold mb-2">Real-world Impact</h4>
        <ul className="text-sm space-y-2 opacity-80">
          <li>• 0% chance of losing customer phone numbers.</li>
          <li>• Business owners save 2 hours daily on manual messaging.</li>
          <li>• Professionalism of the SME increases, leading to higher trust and sales.</li>
        </ul>
      </div>
    </div>
  );
};

export default AutomationVisualizer;
