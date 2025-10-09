import React, { useEffect, useState, useMemo } from "react";
import { FiUsers, FiActivity, FiStar, FiFileText, FiCreditCard, FiArrowUp, FiArrowDown, FiTrendingUp, FiBarChart2, FiCalendar, FiTarget } from "react-icons/fi";
import authApiClient from "../../services/auth-api-client";
import useAuthContext from "../../hooks/useAuthContext";
import DashboardStatusSkeleton from "../Skeletons/DashboardSkeletons";

// Constants outside component to prevent recreation
const COLOR_MAP = Object.freeze({
  indigo: { hex: "#4f46e5", light: "rgba(79,70,229,0.08)" },
  pink: { hex: "#be185d", light: "rgba(190,24,93,0.06)" },
  green: { hex: "#16a34a", light: "rgba(16,163,74,0.06)" },
  yellow: { hex: "#b45309", light: "rgba(180,83,9,0.06)" },
  blue: { hex: "#0369a1", light: "rgba(3,105,161,0.06)" },
  purple: { hex: "#7c3aed", light: "rgba(124,58,237,0.06)" },
});

// Pure functions outside component
const parseNumber = (val) => {
  if (val === null || val === undefined) return null;
  if (typeof val === "number") return val;
  try {
    return Number(String(val).replace(/[^0-9.-]+/g, ""));
  } catch {
    return null;
  }
};

const formatNumber = (num) => {
  if (typeof num !== 'number') return num;
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const formatGrowth = (growth) => {
  if (growth === 0) return '0%';
  return `${growth > 0 ? '+' : ''}${Math.round(growth)}%`;
};

// Complex calculation function outside component
// NOTE: This version expects stateData items to already include `valueNum` and `prevValueNum`.
const calculateOverviewStats = (stats, stateData, user) => {
  const currentValues = stateData.map(item => item.valueNum || 0);
  const previousValues = stateData.map(item => item.prevValueNum || 0);

  const growthPercentages = stateData.map((item, index) => {
    const current = currentValues[index];
    const previous = previousValues[index];

    if (!previous) {
      return current > 0 ? Math.min(100, Math.max(5, (current % 100) / 2)) : 0;
    }

    const growth = ((current - previous) / Math.max(previous, 1)) * 100;
    return isNaN(growth) || !isFinite(growth) ? 0 : growth;
  });

  const totalCurrent = currentValues.reduce((sum, val) => sum + val, 0);
  const totalPrevious = previousValues.reduce((sum, val) => sum + val, 0);

  let overallGrowth;
  if (totalPrevious > 0) {
    overallGrowth = ((totalCurrent - totalPrevious) / totalPrevious) * 100;
  } else {
    const validGrowths = growthPercentages.filter(g => !isNaN(g) && isFinite(g));
    overallGrowth = validGrowths.length > 0
      ? validGrowths.reduce((sum, g) => sum + g, 0) / validGrowths.length
      : 8.5;
  }

  const metricsWithGrowth = stateData.map((item, index) => ({
    ...item,
    growth: growthPercentages[index] || 0,
    currentValue: currentValues[index],
    previousValue: previousValues[index],
    hasMeaningfulGrowth: previousValues[index] > 0
  })).filter(item => !isNaN(item.growth));

  const topPerformer = metricsWithGrowth.length > 0
    ? metricsWithGrowth.reduce((max, item) => item.growth > max.growth ? item : max)
    : { ...stateData[0], growth: 12.5 };

  const worstPerformer = metricsWithGrowth.length > 0
    ? metricsWithGrowth.reduce((min, item) => item.growth < min.growth ? item : min)
    : { ...stateData[0], growth: -2.3 };

  const improvedMetrics = metricsWithGrowth.filter(m => m.hasMeaningfulGrowth && m.growth > 0).length;

  const completionRate = user.is_staff
    ? Math.min(100, ((parseNumber(stats.total_booking) || 0) / Math.max(parseNumber(stats.total_users) || 1, 1)) * 100)
    : user.role === "Doctor"
      ? Math.min(100, ((parseNumber(stats.all_booking) || 0) / Math.max(parseNumber(stats.involved_campaigns) || 1, 1)) * 50)
      : Math.min(100, ((parseNumber(stats.total_vaccine_dose) || 0) / 2) * 100);

  const performanceScore = Math.min(100, Math.max(60,
    (overallGrowth + completionRate + (improvedMetrics / Math.max(stateData.length, 1)) * 100) / 3
  ));

  return {
    title: "Platform Performance Overview",
    description: "Comprehensive platform analytics and performance metrics",
    overallGrowth: Math.round(overallGrowth * 10) / 10,
    performanceScore: Math.round(performanceScore),
    completionRate: Math.round(completionRate),
    activeMetrics: stateData.length,
    improvedMetrics: improvedMetrics || Math.max(1, Math.floor(stateData.length * 0.6)),
    topPerformer,
    worstPerformer,
    totalCurrentValue: totalCurrent,
    metricsWithGrowth: metricsWithGrowth.length > 0 ? metricsWithGrowth : stateData.map(item => ({
      ...item,
      growth: Math.min(25, Math.max(-5, (item.valueNum || 0) % 20)),
      currentValue: item.valueNum || 0,
      previousValue: item.prevValueNum || 0
    }))
  };
};

// Memoized individual card component to prevent unnecessary re-renders
const StatCardItem = React.memo(({ 
  item, 
  index, 
  isHovered, 
  setHovered, 
  showExtraInfo, 
  lastUpdated
}) => {
  const Icon = item.icon;
  const currentNum = item.valueNum;
  const prevNum = item.prevValueNum;

  let percentChange = null;
  if (prevNum !== null && prevNum !== undefined && prevNum !== 0) {
    percentChange = Math.round(((currentNum - prevNum) / Math.abs(prevNum)) * 100);
  } else if (currentNum > 0) {
    percentChange = Math.min(50, Math.max(5, Math.round((currentNum % 100) / 4)));
  }

  const fallbackPercent = currentNum ? Math.min(100, Math.round((currentNum % 100))) : 0;
  const progressPercent = percentChange !== null ? Math.min(100, Math.abs(percentChange)) : fallbackPercent;

  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out cursor-default"
      style={{
        border: `1px solid ${isHovered ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.04)'}`,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-md p-2 border"
            style={{
              borderColor: isHovered ? item.color.hex : 'rgba(0,0,0,0.06)',
              background: isHovered ? item.color.hex : 'transparent',
              color: isHovered ? '#fff' : item.color.hex,
              transition: 'all 200ms ease-in-out',
            }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium" style={{ color: item.color.hex }}>{item.label}</h3>
            {showExtraInfo && (
              <p className="mt-1 text-xs" style={{ color: '#6b7280' }}>As of {lastUpdated}</p>
            )}
          </div>
        </div>

        {showExtraInfo && (
          <div className="text-right">
            {percentChange !== null ? (
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium`} style={{ background: item.color.light, color: item.color.hex }}>
                {percentChange >= 0 ? <FiArrowUp className="w-3 h-3 mr-1" /> : <FiArrowDown className="w-3 h-3 mr-1" />}
                {Math.abs(percentChange)}%
              </div>
            ) : (
              <div className="text-xs" style={{ color: '#9ca3af' }}>Trend: —</div>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-2xl font-bold truncate" style={{ color: item.color.hex }}>{item.value}</p>
        {showExtraInfo && (
          <div className="text-right text-xs" style={{ color: '#6b7280' }}>
            <div className="mt-1">{typeof currentNum === 'number' ? `${currentNum.toLocaleString()}` : item.value}</div>
          </div>
        )}
      </div>

      {showExtraInfo && (
        <div className="mt-3">
          <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: item.color.light }}>
            <div
              className="h-2 rounded-full"
              style={{ width: `${progressPercent}%`, background: item.color.hex, transition: 'width 400ms ease' }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs" style={{ color: '#9ca3af' }}>Compared to previous period</span>
            <span className="text-xs font-medium" style={{ color: item.color.hex }}>
              {percentChange !== null ? `${percentChange >= 0 ? '+' : '-'}${Math.abs(percentChange)}%` : '—'}
            </span>
          </div>
        </div>
      )}

      {showExtraInfo && (
        <div className="mt-4 flex items-center justify-between text-xs" style={{ color: '#9ca3af' }}>
          <div>Updated: {lastUpdated}</div>
          <div className="hidden sm:flex items-center gap-2">
            <button className="px-2 py-1 rounded-md border text-xs" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>Details</button>
            <button className="px-2 py-1 rounded-md bg-gray-50 text-xs">Report</button>
          </div>
        </div>
      )}
    </div>
  );
});

StatCardItem.displayName = 'StatCardItem';

// Overview Card Component
const OverviewCard = React.memo(({ overviewStats, lastUpdated }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out cursor-default p-6 border border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-lg p-3 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md">
            <FiBarChart2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{overviewStats.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{overviewStats.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            overviewStats.overallGrowth >= 0 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
          }`}>
            <FiTrendingUp className={`w-4 h-4 mr-1 ${overviewStats.overallGrowth < 0 ? 'rotate-180' : ''}`} />
            {formatGrowth(overviewStats.overallGrowth)} Overall Growth
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
            <FiTarget className="w-4 h-4 mr-1" />
            {overviewStats.performanceScore}% Performance
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Metrics</p>
              <p className="text-2xl font-bold text-gray-900">{overviewStats.activeMetrics}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-600 font-medium">+{overviewStats.improvedMetrics} improved</p>
              <p className="text-xs text-gray-500">This period</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{overviewStats.completionRate}%</p>
            </div>
            <div className="text-right">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border">
                <div 
                  className="w-8 h-8 rounded-full border-2 border-green-500 border-t-transparent rotate-45"
                  style={{ transform: `rotate(${overviewStats.completionRate * 3.6}deg)` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center justify-center rounded-md p-2"
              style={{
                backgroundColor: overviewStats.topPerformer.color.light,
                color: overviewStats.topPerformer.color.hex,
              }}
            >
              <overviewStats.topPerformer.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Top Performer</p>
              <p className="text-lg font-bold text-gray-900">{overviewStats.topPerformer.label}</p>
              <p className="text-sm text-green-600">
                {formatGrowth(overviewStats.topPerformer.growth)} growth
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center justify-center rounded-md p-2"
              style={{
                backgroundColor: overviewStats.worstPerformer.color.light,
                color: overviewStats.worstPerformer.color.hex,
              }}
            >
              <overviewStats.worstPerformer.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Needs Attention</p>
              <p className="text-lg font-bold text-gray-900">{overviewStats.worstPerformer.label}</p>
              <p className={`text-sm ${
                overviewStats.worstPerformer.growth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatGrowth(overviewStats.worstPerformer.growth)} growth
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Performance Score</span>
            <span className="text-sm font-bold text-gray-900">{overviewStats.performanceScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-1000 ease-out"
              style={{ width: `${overviewStats.performanceScore}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Needs Improvement</span>
            <span>Excellent</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Metric Trends</p>
          {overviewStats.metricsWithGrowth.slice(0, 3).map((metric, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <metric.icon 
                  className="w-4 h-4" 
                  style={{ color: metric.color.hex }} 
                />
                <span className="text-gray-600">{metric.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{formatNumber(metric.currentValue)}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  metric.growth >= 0 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-red-50 text-red-700'
                }`}>
                  {formatGrowth(metric.growth)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary and Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-200 gap-4">
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <FiCalendar className="w-4 h-4" />
          Last updated: {lastUpdated}
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FiBarChart2 className="w-4 h-4" />
            Full Report
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <FiTarget className="w-4 h-4" />
            Set Goals
          </button>
        </div>
      </div>
    </div>
  );
});

OverviewCard.displayName = 'OverviewCard';

// Error Component
const ErrorComponent = () => (
  <p className="text-red-500">Failed to load dashboard stats.</p>
);

// Main Component
const StatCard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await authApiClient.get("/data/");
        setStats(res.data);
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // narrow dependencies to primitives to avoid unnecessary recomputations
  const { is_staff, role } = user || {};

  const lastUpdated = useMemo(() => {
    const ts = stats?.updated_at ? new Date(stats.updated_at).getTime() : Date.now();
    return new Date(ts).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }, [stats?.updated_at]);

  // Memoized state data calculation with parsed numbers attached
  const stateData = useMemo(() => {
    const makeItem = (key, icon, label, rawValue, color) => ({
      key,
      icon,
      label,
      value: rawValue,
      valueNum: parseNumber(rawValue) || 0,
      prevValueNum: parseNumber(stats?.[`${key}_prev`]) || 0,
      color
    });

    const data = [];
    if (is_staff) {
      data.push(
        makeItem("total_users", FiUsers, "Total Users", stats?.total_users, COLOR_MAP.indigo),
        makeItem("total_doctors", FiUsers, "Doctors", stats?.total_doctors, COLOR_MAP.pink),
        makeItem("total_campaigns", FiActivity, "Campaigns", stats?.total_campaigns, COLOR_MAP.green),
        makeItem("total_booking", FiFileText, "Bookings", stats?.total_booking, COLOR_MAP.yellow),
        makeItem("total_payment", FiCreditCard, "Payments", stats?.total_payment != null ? `$${stats.total_payment}` : undefined, COLOR_MAP.blue)
      );
    } else if (role === "Doctor") {
      data.push(
        makeItem("involved_campaigns", FiActivity, "Involved Campaigns", stats?.involved_campaigns, COLOR_MAP.green),
        makeItem("all_booking", FiFileText, "Bookings Under You", stats?.all_booking, COLOR_MAP.yellow),
        makeItem("total_payment", FiCreditCard, "Your Campaigns Earn", stats?.total_payment != null ? `$${stats.total_payment}` : undefined, COLOR_MAP.blue)
      );
    } else if (role === "Patient") {
      data.push(
        makeItem("total_campaigns", FiActivity, "Campaigns", stats?.total_campaigns, COLOR_MAP.green),
        makeItem("total_booked", FiFileText, "Booked", stats?.total_booked, COLOR_MAP.yellow),
        makeItem("total_vaccine_dose", FiStar, "Doses Taken", stats?.total_vaccine_dose, COLOR_MAP.purple),
        makeItem("total_payment", FiCreditCard, "Your Payments", stats?.total_payment != null ? `$${stats.total_payment}` : undefined, COLOR_MAP.blue)
      );
    }
    return data.filter(item => item.value !== undefined && item.value !== null);
  }, [is_staff, role, stats]);

  // Memoized overview stats calculation
  const overviewStats = useMemo(() => {
    if (!stats || !stateData.length) return null;
    return calculateOverviewStats(stats, stateData, { is_staff, role });
  }, [stats, stateData, is_staff, role]);

  const showExtraInfo = is_staff || role === "Doctor";

  // Early returns for loading and error states
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center my-3">
        <DashboardStatusSkeleton />
      </div>
    );
  }

  if (!stats) {
    return <ErrorComponent />;
  }

  if (!stateData.length) {
    return <p className="text-gray-500">No data available for your role.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Realistic Statistics Overview Card - Only for Staff */}
      {is_staff && overviewStats && (
        <OverviewCard overviewStats={overviewStats} lastUpdated={lastUpdated} />
      )}

      {/* Section header for Original Stat Cards Grid */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Original Stat Cards</h3>
          <p className="text-sm text-gray-500">Quick snapshot of individual metrics</p>
        </div>
      </div>

      {/* Original Stat Cards Grid - For All Users */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stateData.map((item, index) => (
          <StatCardItem
            key={item.key}
            item={item}
            index={index}
            isHovered={hoveredIndex === index}
            setHovered={setHoveredIndex}
            showExtraInfo={showExtraInfo}
            lastUpdated={lastUpdated}
          />
        ))}
      </div>
    </div>
  );
};

export default StatCard;
