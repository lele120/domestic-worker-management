import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          We couldn't find the page you're looking for.
        </p>
        <Link 
          href="/"
          className="px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
} 