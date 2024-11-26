import React from 'react';

const AboutHero = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20 pt-14">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">About Us</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We&apos;re building the future of domestic worker management, making it easier for employers 
            to manage their workforce while ensuring fair and transparent working conditions for all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;