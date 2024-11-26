import React from 'react';

const timeline = [
  {
    name: 'Founded company',
    description: 'Our journey began with a simple idea: make domestic worker management easier.',
    date: '2020',
  },
  {
    name: 'International expansion',
    description: 'Expanded our services to multiple countries across Europe.',
    date: '2021',
  },
  {
    name: 'Mobile app launch',
    description: 'Launched our mobile application for easier access and management.',
    date: '2022',
  },
  {
    name: 'AI integration',
    description: 'Introduced AI-powered features for smarter workforce management.',
    date: '2023',
  },
];

const AboutTimeline = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Journey
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From our founding to today, we've been committed to innovation and excellence.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:max-w-4xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {timeline.map((item) => (
              <div
                key={item.name}
                className="relative pl-16"
              >
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <span className="text-white">{item.date}</span>
                  </div>
                  {item.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{item.description}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTimeline;