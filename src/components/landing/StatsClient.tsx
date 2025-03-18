"use client";

import { useEffect, useRef } from 'react';

interface Metric {
  value: string;
  label: string;
}

interface StatsClientProps {
  metrics: Metric[];
}

export default function StatsClient({ metrics }: StatsClientProps) {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add animation classes when the stats section comes into view
          if (entry.isIntersecting) {
            const statElements = statsRef.current?.querySelectorAll('.stat-card');
            statElements?.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-in');
              }, index * 150); // Stagger the animations
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section ref={statsRef} className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="stat-card flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 opacity-0 transform translate-y-8"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <dt className="text-base font-medium leading-6 text-gray-600">{metric.label}</dt>
              <dd className="order-first text-4xl font-bold tracking-tight text-blue-600 mb-2">{metric.value}</dd>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stat-card {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .stat-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
} 