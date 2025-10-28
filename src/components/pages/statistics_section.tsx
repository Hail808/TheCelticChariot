"use client"

import React, { useState, useEffect } from 'react';

interface EngagementStats {
  totalPageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  bounceRate: number;
  topProducts: Array<{
    product_name: string;
    views: number;
  }>;
  chartData: Array<{
    date: string;
    views: number;
    visitors: number;
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
  chartData: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
}

type Timeframe = 'weekly' | 'monthly' | 'yearly';

const StatisticsSection: React.FC = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>('weekly');
  const [engagementStats, setEngagementStats] = useState<EngagementStats | null>(null);
  const [salesStats, setSalesStats] = useState<SalesStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch statistics data
  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const [engagementResponse, salesResponse] = await Promise.all([
        fetch(`/api/admin/statistics/engagement?timeframe=${timeframe}`),
        fetch(`/api/admin/statistics/sales?timeframe=${timeframe}`)
      ]);

      if (!engagementResponse.ok || !salesResponse.ok) {
        throw new Error('Failed to fetch statistics');
      }

      const engagementData = await engagementResponse.json();
      const salesData = await salesResponse.json();

      setEngagementStats(engagementData);
      setSalesStats(salesData);
      setError(null);
    } catch (err) {
      console.error('Error fetching statistics:', err);
      setError('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and timeframe change
  useEffect(() => {
    fetchStatistics();
  }, [timeframe]);

  // Auto-refresh every 30 seconds if enabled
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchStatistics();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, timeframe]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat('en-US').format(num);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading && !engagementStats && !salesStats) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-xl text-gray-600">Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h2>
          
          <div className="flex gap-4 items-center">
            {/* Auto-refresh toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Auto-refresh (30s)</span>
            </label>

            {/* Timeframe selector */}
            <div className="flex gap-2">
              <button
                onClick={() => setTimeframe('weekly')}
                className={`px-4 py-2 rounded font-semibold transition ${
                  timeframe === 'weekly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeframe('monthly')}
                className={`px-4 py-2 rounded font-semibold transition ${
                  timeframe === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimeframe('yearly')}
                className={`px-4 py-2 rounded font-semibold transition ${
                  timeframe === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Yearly
              </button>
            </div>

            {/* Manual refresh button */}
            <button
              onClick={fetchStatistics}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? '↻ Refreshing...' : '↻ Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Engagement Statistics Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span>👥</span> Engagement Statistics
        </h3>
        
        {engagementStats ? (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Page Views"
                value={formatNumber(engagementStats.totalPageViews)}
                icon="👁️"
                color="blue"
              />
              <StatCard
                title="Unique Visitors"
                value={formatNumber(engagementStats.uniqueVisitors)}
                icon="👤"
                color="green"
              />
              <StatCard
                title="Avg Session Duration"
                value={formatDuration(engagementStats.avgSessionDuration)}
                icon="⏱️"
                color="purple"
              />
              <StatCard
                title="Bounce Rate"
                value={`${engagementStats.bounceRate.toFixed(1)}%`}
                icon="📊"
                color="orange"
              />
            </div>

            {/* Top Products Table */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Top Viewed Products</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rank</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {engagementStats.topProducts.map((product, index) => (
                      <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-gray-800 font-medium">{product.product_name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-right">{formatNumber(product.views)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Engagement Chart */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Engagement Trends</h4>
              <SimpleLineChart data={engagementStats.chartData} type="engagement" />
            </div>
          </>
        ) : (
          <p className="text-gray-500">No engagement data available</p>
        )}
      </div>

      {/* Sales Statistics Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span>💰</span> Sales Statistics
        </h3>
        
        {salesStats ? (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Revenue"
                value={formatCurrency(salesStats.totalRevenue)}
                icon="💵"
                color="green"
              />
              <StatCard
                title="Total Orders"
                value={formatNumber(salesStats.totalOrders)}
                icon="🛒"
                color="blue"
              />
              <StatCard
                title="Avg Order Value"
                value={formatCurrency(salesStats.avgOrderValue)}
                icon="💳"
                color="purple"
              />
              <StatCard
                title="Conversion Rate"
                value={`${salesStats.conversionRate.toFixed(2)}%`}
                icon="📈"
                color="orange"
              />
            </div>

            {/* Top Selling Products Table */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Top Selling Products</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rank</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Qty Sold</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesStats.topSellingProducts.map((product, index) => (
                      <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-gray-800 font-medium">{product.product_name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-right">{formatNumber(product.quantity_sold)}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-right">{formatCurrency(product.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sales Chart */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Sales Trends</h4>
              <SimpleLineChart data={salesStats.chartData} type="sales" />
            </div>
          </>
        ) : (
          <p className="text-gray-500">No sales data available</p>
        )}
      </div>
    </div>
  );
};

// StatCard Component
interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
  };

  return (
    <div className={`${colorClasses[color]} border-2 rounded-lg p-6 transition hover:shadow-lg`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{icon}</span>
      </div>
      <h4 className="text-sm font-semibold text-gray-600 mb-1">{title}</h4>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

// Simple Line Chart Component
interface ChartData {
  date: string;
  [key: string]: string | number;
}

interface SimpleLineChartProps {
  data: ChartData[];
  type: 'engagement' | 'sales';
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ data, type }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center py-8">No chart data available</p>;
  }

  const maxValue = Math.max(
    ...data.map(d => type === 'engagement' ? Number(d.views) : Number(d.revenue))
  );

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="grid grid-cols-7 gap-2">
        {data.map((item, index) => {
          const value = type === 'engagement' ? Number(item.views) : Number(item.revenue);
          const height = (value / maxValue) * 200;
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full bg-blue-200 rounded-t flex items-end justify-center" style={{ height: '200px' }}>
                <div
                  className="w-full bg-blue-600 rounded-t flex items-end justify-center text-white text-xs font-semibold pb-1"
                  style={{ height: `${height}px`, minHeight: '20px' }}
                >
                  {type === 'engagement' ? value : `$${Math.round(value)}`}
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">{item.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatisticsSection;
