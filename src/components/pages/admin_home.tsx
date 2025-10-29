"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/home.css';

interface EngagementStats {
  totalPageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  bounceRate: number;
  topProducts: Array<{
    product_name: string;
    views: number;
  }>;
}

interface SalesStats {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  conversionRate: number;
  topSellingProducts: Array<{
    product_name: string;
    quantity_sold: number;
    revenue: number;
  }>;
}

export default function AdminHome() {
  const router = useRouter();
  
  // State for statistics
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [engagementStats, setEngagementStats] = useState<EngagementStats | null>(null);
  const [salesStats, setSalesStats] = useState<SalesStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // Fetch detailed statistics based on timeframe
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        
        const [engRes, salesRes] = await Promise.all([
          fetch(`/api/admin/statistics/engagement?timeframe=${timeframe}`),
          fetch(`/api/admin/statistics/sales?timeframe=${timeframe}`)
        ]);
        
        if (engRes.ok) {
          const engData = await engRes.json();
          setEngagementStats(engData);
        }
        
        if (salesRes.ok) {
          const salesData = await salesRes.json();
          setSalesStats(salesData);
        }
      } catch (error) {
        console.error('Failed to fetch detailed stats:', error);
      } finally {
        setStatsLoading(false);
      }
    };
    
    fetchStats();
  }, [timeframe]);

  const handleEngagement = () => {
    router.push('/admin/engagement');
  };

  const handleCatalogue = () => {
    router.push('/admin/catalogue');
  };

  const handleOrders = () => {
    router.push('/admin/orders');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <main className="p-8">
      {/* ---------- Page Header ---------- */}
      <div className="relative mb-8">
        <h1 className="text-4xl font-bold text-center">Admin Dashboard</h1>
        <button 
          onClick={handleBackToHome}
          className="absolute right-0 top-0 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Back to Website Home
        </button>
      </div>

      {/* ---------- Navigation Buttons ---------- */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <button 
          onClick={handleEngagement}
          className="bg-[#5B6D50] text-white px-6 py-4 rounded-lg hover:bg-[#4a5a40] transition font-semibold text-lg shadow-md"
        >
          Engagement
        </button>
        <button 
          onClick={handleCatalogue}
          className="bg-[#5B6D50] text-white px-6 py-4 rounded-lg hover:bg-[#4a5a40] transition font-semibold text-lg shadow-md"
        >
          Catalogue
        </button>
        <button 
          onClick={handleOrders}
          className="bg-[#5B6D50] text-white px-6 py-4 rounded-lg hover:bg-[#4a5a40] transition font-semibold text-lg shadow-md"
        >
          Orders
        </button>
      </div>

      {/* ---------- Statistics Section ---------- */}
      <div className="mt-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Statistics Overview</h2>
          
          {/* Timeframe Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                timeframe === 'weekly'
                  ? 'bg-[#5B6D50] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                timeframe === 'monthly'
                  ? 'bg-[#5B6D50] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeframe('yearly')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                timeframe === 'yearly'
                  ? 'bg-[#5B6D50] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {statsLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <p className="text-lg text-gray-600">Loading statistics...</p>
          </div>
        ) : (
          <>
            {/* Engagement Statistics */}
            {engagementStats && (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  Engagement Metrics
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <StatCard
                    title="Total Page Views"
                    value={engagementStats.totalPageViews.toLocaleString()}
                    color="green"
                  />
                  <StatCard
                    title="Unique Visitors"
                    value={engagementStats.uniqueVisitors.toLocaleString()}
                    color="green"
                  />
                  <StatCard
                    title="Avg Session Duration"
                    value={`${Math.round((engagementStats.avgSessionDuration || 0) / 60)}m`}
                    color="green"
                  />
                  <StatCard
                    title="Bounce Rate"
                    value={`${(engagementStats.bounceRate || 0).toFixed(1)}%`}
                    color="green"
                  />
                </div>

                {/* Top Viewed Products */}
                {engagementStats.topProducts?.length > 0 && (
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Top Viewed Products</h4>
                    <div className="space-y-2">
                      {engagementStats.topProducts.slice(0, 5).map((product, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                          <span className="font-medium">{i + 1}. {product.product_name}</span>
                          <span className="font-bold text-blue-600">{product.views} views</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sales Statistics */}
            {salesStats && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  Sales Metrics
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <StatCard
                    title="Total Revenue"
                    value={`$${(salesStats.totalRevenue || 0).toFixed(2)}`}
                    color="green"
                  />
                  <StatCard
                    title="Total Orders"
                    value={(salesStats.totalOrders || 0).toLocaleString()}
                    color="green"
                  />
                  <StatCard
                    title="Avg Order Value"
                    value={`$${(salesStats.avgOrderValue || 0).toFixed(2)}`}
                    color="green"
                  />
                  <StatCard
                    title="Conversion Rate"
                    value={`${(salesStats.conversionRate || 0).toFixed(2)}%`}
                    color="green"
                  />
                </div>

                {/* Top Selling Products */}
                {salesStats.topSellingProducts?.length > 0 && (
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Top Selling Products</h4>
                    <div className="space-y-2">
                      {salesStats.topSellingProducts.slice(0, 5).map((product, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                          <span className="font-medium">{i + 1}. {product.product_name}</span>
                          <div className="text-right">
                            <span className="font-bold text-green-600">${(product.revenue || 0).toFixed(2)}</span>
                            <span className="text-sm text-gray-600 ml-2">({product.quantity_sold || 0} sold)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* ---------- Quick Actions ---------- */}
      <div className="mt-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3">Recent Activity</h3>
            <p className="text-gray-600">View recent orders, reviews, and customer interactions</p>
            <button 
              onClick={handleEngagement}
              className="mt-4 bg-[#5B6D50] text-white px-4 py-2 rounded-lg hover:bg-[#4a5a40] transition"
            >
              View Activity
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3">Manage Products</h3>
            <p className="text-gray-600">Add, edit, or remove products from your catalogue</p>
            <button 
              onClick={handleCatalogue}
              className="mt-4 bg-[#5B6D50] text-white px-4 py-2 rounded-lg hover:bg-[#4a5a40] transition"
            >
              Manage Catalogue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// StatCard Component
interface StatCardProps {
  title: string;
  value: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

function StatCard({ title, value, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-[#5B6D50] border-[#4a5a40]',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200',
  };

  const textColorClasses = {
    blue: 'text-blue-600',
    green: 'text-white',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
  };

  const titleColorClasses = {
    blue: 'text-gray-600',
    green: 'text-white',
    purple: 'text-gray-600',
    orange: 'text-gray-600',
  };

  return (
    <div className={`${colorClasses[color]} border-2 rounded-lg p-6 transition hover:shadow-md`}>
      <h4 className={`text-sm font-semibold ${titleColorClasses[color]} mb-2`}>{title}</h4>
      <p className={`text-3xl font-bold ${textColorClasses[color]}`}>{value}</p>
    </div>
  );
}
