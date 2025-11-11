import React from 'react';

const FAQ = () => {
    return (
        <div className="min-h-screen bg-[#e5ede1] py-12 px-4" style={{ fontFamily: 'Lalezar, cursive' }}>
            {/* header */}
            <div className="max-w-4xl mx-auto mb-8 text-center">
                <h1 className="text-5xl font-normal text-black mb-4">
                    Frequently Asked Questions
                </h1>
                <p className="text-gray-600 text-base">
                    Last updated on Jan 2, 2023
                </p>
            </div>

            {/* FAQ Content */}
            <div className="max-w-4xl mx-auto space-y-6">
                {/* custom and personalized orders */}
                <div className="bg-white rounded-lg shadow-md p-8 border-2 border-[#5B6D50]">
                    <h2 className="text-2xl font-normal text-[#5B6D50] mb-4 flex items-center gap-3">
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                            />
                        </svg>
                        Custom and Personalized Orders
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        I can customize most items but message me first before purchasing so we can discuss the changes and personalizations! If it's a simple customization I will not up charge!
                    </p>
                </div>

                {/* gift wrapping and packaging */}
                <div className="bg-white rounded-lg shadow-md p-8 border-2 border-[#5B6D50]">
                    <h2 className="text-2xl font-normal text-[#5B6D50] mb-4 flex items-center gap-3">
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" 
                            />
                        </svg>
                        Gift Wrapping and Packaging
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        We take great pride in our products, regardless of the items price! We treat all gift items with the same quality. A typically purchase comes with the items and a custom bag. A gift will have a different bag with gift wrapping and a note if the buyer puts one in.
                    </p>
                </div>

                {/* care instructions */}
                <div className="bg-white rounded-lg shadow-md p-8 border-2 border-[#5B6D50]">
                    <h2 className="text-2xl font-normal text-[#5B6D50] mb-4 flex items-center gap-3">
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                            />
                        </svg>
                        Care Instructions
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        We do not recommend to sleep or shower in our jewelry. And you can use any typical jewelry cleaner on our jewelry.
                    </p>
                </div>

                {/* wholesale availability */}
                <div className="bg-white rounded-lg shadow-md p-8 border-2 border-[#5B6D50]">
                    <h2 className="text-2xl font-normal text-[#5B6D50] mb-4 flex items-center gap-3">
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                            />
                        </svg>
                        Wholesale Availability
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        We are open to wholesale but the items in my store are priced at the lowest price possible. If the wholesale is over 25 items I can give a 10% order discount. Message me for wholesale beforehand!
                    </p>
                </div>

                {/* contact Section */}
                <div className="bg-[#5B6D50] rounded-lg shadow-md p-8 text-center">
                    <h2 className="text-2xl font-normal text-white mb-4">
                        Still Have Questions?
                    </h2>
                    <p className="text-white text-lg mb-6">
                        Feel free to reach out to us! We're here to help.
                    </p>
                    <a 
                        href="/about_me" 
                        className="inline-block bg-white text-[#5B6D50] px-8 py-3 rounded font-normal hover:bg-[#e5ede1] transition-colors text-lg"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQ;