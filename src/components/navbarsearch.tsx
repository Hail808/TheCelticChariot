"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search } from 'lucide-react';

interface NavbarSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavbarSearch({ isOpen, onClose }: NavbarSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to catalogue with search query
      router.push(`/catalogue?search=${encodeURIComponent(query.trim())}`);
      onClose();
      setQuery(''); // Clear search after navigation
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#333]">Search Products</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for necklaces, earrings, keychains..."
                className="w-full px-4 py-4 pr-12 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#5B6D50] transition"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#5B6D50] text-white rounded-md hover:bg-[#4a5a40] transition"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Helper Text */}
            <p className="mt-3 text-sm text-gray-500">
              Press Enter or click the search button to view results in catalogue
            </p>
          </form>

          {/* Quick Links */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Popular Categories:</p>
            <div className="flex flex-wrap gap-2">
              {['Necklace', 'Earrings', 'DIY Bead Sets', 'Keychains', 'Beaded Belt'].map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setQuery(category);
                    router.push(`/catalogue?search=${encodeURIComponent(category)}`);
                    onClose();
                  }}
                  className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-full hover:bg-[#5B6D50] hover:text-white hover:border-[#5B6D50] transition"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}