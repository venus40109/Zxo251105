import { useState } from 'react';
import { ChevronLeft, TrendingDown, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CravingRecord {
  timestamp: number;
  date: string;
  hour: number;
}

interface DataReportPageProps {
  onBack: () => void;
  cravingRecords: CravingRecord[];
  totalDays: number;
  cigarettesAvoided: number;
  moneySaved: number;
  equivalentItem: string;
  equivalentCount: number;
}

type ViewMode = 'day' | 'week' | 'month';

export default function DataReportPage({
  onBack,
  cravingRecords,
  totalDays,
  cigarettesAvoided,
  moneySaved,
  equivalentItem,
  equivalentCount,
}: DataReportPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('day');

  // 计算数据
  const { chartData, stats, insights } = processData(cravingRecords, viewMode);

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: '#EFEFEF',
      }}
    >
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center"
            style={{ color: '#666666' }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 style={{ color: '#2A2A2A', fontSize: '16px', fontWeight: 'bold' }}>数据报告</h1>
          <div className="w-8"></div>
        </div>

        {/* 核心指标看板 */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <StatCard
                label="少抽根数"
                value={cigarettesAvoided.toString()}
                unit="根"
              />
              <StatCard
                label="节约金额"
                value={moneySaved.toString()}
                unit="元"
              />
              <StatCard
                label="最长无瘾"
                value={stats.longestStreak}
                unit="小时"
              />
            </div>

            {/* 等价物提示 */}
            <div
              className="rounded-lg p-3 mb-6 text-center"
              style={{
                backgroundColor: 'rgba(0, 184, 148, 0.1)',
                border: '1px solid rgba(0, 184, 148, 0.2)',
              }}
            >
              <span style={{ color: '#2A2A2A', fontSize: '14px' }}>
                累计节约可购买{' '}
                <span style={{ color: '#00B894', fontWeight: 'bold' }}>{equivalentCount}</span>{' '}
                {equivalentItem}
              </span>
            </div>

            {/* 视图切换 */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <ViewModeButton
                label="日"
                active={viewMode === 'day'}
                onClick={() => setViewMode('day')}
              />
              <ViewModeButton
                label="周"
                active={viewMode === 'week'}
                onClick={() => setViewMode('week')}
              />
              <ViewModeButton
                label="月"
                active={viewMode === 'month'}
                onClick={() => setViewMode('month')}
              />
            </div>

            {/* 烟瘾曲线 */}
            <div
              className="rounded-2xl p-4 mb-4"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(42, 42, 42, 0.1)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div style={{ color: '#2A2A2A' }}>烟瘾记录曲线</div>
                {stats.trend !== 0 && (
                  <div className="flex items-center gap-1">
                    {stats.trend > 0 ? (
                      <TrendingUp className="w-4 h-4" style={{ color: '#FF4444' }} />
                    ) : (
                      <TrendingDown className="w-4 h-4" style={{ color: '#00B894' }} />
                    )}
                    <span
                      style={{
                        color: stats.trend > 0 ? '#FF4444' : '#00B894',
                        fontSize: '13px',
                        fontWeight: 'bold',
                      }}
                    >
                      {stats.trend > 0 ? '+' : ''}{stats.trend}%
                    </span>
                  </div>
                )}
              </div>

              {viewMode === 'day' ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(189, 189, 189, 0.1)" />
                    <XAxis
                      dataKey="label"
                      stroke="#888888"
                      tick={{ fill: '#888888', fontSize: 11 }}
                    />
                    <YAxis stroke="#888888" tick={{ fill: '#888888', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(42, 42, 42, 0.2)',
                        borderRadius: '8px',
                        color: '#2A2A2A',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#00B894"
                      strokeWidth={2}
                      dot={{ fill: '#00B894', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(189, 189, 189, 0.1)" />
                    <XAxis
                      dataKey="label"
                      stroke="#888888"
                      tick={{ fill: '#888888', fontSize: 11 }}
                    />
                    <YAxis stroke="#888888" tick={{ fill: '#888888', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(42, 42, 42, 0.2)',
                        borderRadius: '8px',
                        color: '#2A2A2A',
                      }}
                    />
                    <Bar dataKey="count" fill="#00B894" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {/* 高峰时段提示 */}
              {stats.peakTime && (
                <div
                  className="mt-3 text-center"
                  style={{ color: '#888888', fontSize: '12px' }}
                >
                  高峰时段：{stats.peakTime}
                </div>
              )}
            </div>

        {/* 智能数据解读 */}
        <div
          className="rounded-xl p-4"
          style={{
            backgroundColor: 'rgba(0, 184, 148, 0.08)',
            border: '1px solid rgba(0, 184, 148, 0.2)',
          }}
        >
          <div style={{ color: '#00B894', marginBottom: '8px' }}>
            💪 数据解读
          </div>
          <div style={{ color: '#2A2A2A', fontSize: '14px', lineHeight: '1.6' }}>
            {insights}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div
      className="rounded-lg p-3"
      style={{
        backgroundColor: 'rgba(0, 184, 148, 0.08)',
        border: '1px solid rgba(0, 184, 148, 0.2)',
      }}
    >
      <div style={{ color: '#888888', fontSize: '11px', marginBottom: '4px' }}>{label}</div>
      <div style={{ color: '#00B894', fontSize: '18px', fontWeight: 'bold' }}>
        {value} <span style={{ fontSize: '12px', color: '#888888' }}>{unit}</span>
      </div>
    </div>
  );
}

function ViewModeButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 rounded-lg transition-all"
      style={{
        backgroundColor: active ? 'rgba(0, 184, 148, 0.2)' : 'rgba(189, 189, 189, 0.1)',
        border: active ? '1px solid rgba(0, 184, 148, 0.4)' : '1px solid rgba(189, 189, 189, 0.2)',
        color: active ? '#00B894' : '#888888',
        cursor: 'pointer',
        fontSize: '14px',
      }}
    >
      {label}
    </button>
  );
}

// 数据处理函数
function processData(records: CravingRecord[], viewMode: ViewMode) {
  if (records.length === 0) {
    return {
      chartData: [],
      stats: { longestStreak: '0', trend: 0, peakTime: null },
      insights: '首次打卡将完善您的吸烟信息，完成后即可开始记录烟瘾，生成专属数据曲线。',
    };
  }

  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  let chartData: { label: string; count: number }[] = [];
  let previousPeriodCount = 0;
  let currentPeriodCount = 0;

  if (viewMode === 'day') {
    // 日视图：24小时时间轴
    const hourCounts = new Array(24).fill(0);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    records.forEach((record) => {
      if (record.timestamp >= todayStart.getTime()) {
        hourCounts[record.hour]++;
      }
    });

    chartData = hourCounts.map((count, hour) => ({
      label: `${hour}:00`,
      count,
    }));

    currentPeriodCount = hourCounts.reduce((a, b) => a + b, 0);

    // 计算昨天的数据作为对比
    const yesterdayStart = todayStart.getTime() - oneDayMs;
    const yesterdayEnd = todayStart.getTime();
    previousPeriodCount = records.filter(
      (r) => r.timestamp >= yesterdayStart && r.timestamp < yesterdayEnd
    ).length;
  } else if (viewMode === 'week') {
    // 周视图：最近7天
    const dayCounts: { [key: string]: number } = {};
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now - i * oneDayMs);
      const dateStr = date.toISOString().split('T')[0];
      dayCounts[dateStr] = 0;
    }

    records.forEach((record) => {
      const recordDate = new Date(record.timestamp).toISOString().split('T')[0];
      if (recordDate in dayCounts) {
        dayCounts[recordDate]++;
      }
    });

    chartData = Object.entries(dayCounts).map(([date, count]) => {
      const d = new Date(date);
      const dayName = weekDays[d.getDay()];
      return {
        label: `${d.getMonth() + 1}/${d.getDate()}`,
        count,
      };
    });

    currentPeriodCount = Object.values(dayCounts).reduce((a, b) => a + b, 0);

    // 计算上周数据
    const lastWeekStart = now - 14 * oneDayMs;
    const lastWeekEnd = now - 7 * oneDayMs;
    previousPeriodCount = records.filter(
      (r) => r.timestamp >= lastWeekStart && r.timestamp < lastWeekEnd
    ).length;
  } else {
    // 月视图：最近30天
    const dayCounts: { [key: string]: number } = {};

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now - i * oneDayMs);
      const dateStr = date.toISOString().split('T')[0];
      dayCounts[dateStr] = 0;
    }

    records.forEach((record) => {
      const recordDate = new Date(record.timestamp).toISOString().split('T')[0];
      if (recordDate in dayCounts) {
        dayCounts[recordDate]++;
      }
    });

    // 只显示每5天的数据点，避免太密集
    const entries = Object.entries(dayCounts);
    chartData = entries
      .filter((_, index) => index % 5 === 0 || index === entries.length - 1)
      .map(([date, count]) => {
        const d = new Date(date);
        return {
          label: `${d.getMonth() + 1}/${d.getDate()}`,
          count,
        };
      });

    currentPeriodCount = Object.values(dayCounts).reduce((a, b) => a + b, 0);

    // 计算上月数据
    const lastMonthStart = now - 60 * oneDayMs;
    const lastMonthEnd = now - 30 * oneDayMs;
    previousPeriodCount = records.filter(
      (r) => r.timestamp >= lastMonthStart && r.timestamp < lastMonthEnd
    ).length;
  }

  // 计算趋势
  let trend = 0;
  if (previousPeriodCount > 0) {
    trend = Math.round(((currentPeriodCount - previousPeriodCount) / previousPeriodCount) * 100);
  }

  // 计算最长无烟瘾时长
  let longestStreak = 0;
  if (records.length > 1) {
    const sortedRecords = [...records].sort((a, b) => a.timestamp - b.timestamp);
    for (let i = 1; i < sortedRecords.length; i++) {
      const gap = sortedRecords[i].timestamp - sortedRecords[i - 1].timestamp;
      const hours = Math.floor(gap / (60 * 60 * 1000));
      longestStreak = Math.max(longestStreak, hours);
    }
  }

  // 计算高峰时段（日视图）
  let peakTime = null;
  if (viewMode === 'day' && chartData.length > 0) {
    const maxCount = Math.max(...chartData.map((d) => d.count));
    if (maxCount > 0) {
      const peakHours = chartData.filter((d) => d.count === maxCount);
      if (peakHours.length > 0) {
        peakTime = peakHours.map((d) => d.label).join('、');
      }
    }
  }

  // 生成智能数据解读
  let insights = '';
  if (viewMode === 'week') {
    if (trend < 0) {
      insights = `本周烟瘾次数较上周减少${Math.abs(trend)}%，你对烟瘾的控制力正在增强！继续保持，胜利就在眼前。`;
    } else if (trend > 0) {
      insights = `本周烟瘾次数较上周增加${trend}%，可能遇到了一些挑战。别灰心，每一次想抽烟时的犹豫都是进步。`;
    } else {
      insights = `本周烟瘾次数与上周持平，保持稳定也是一种胜利。持续记录，让数据成为你的力量。`;
    }
  } else if (viewMode === 'day') {
    if (currentPeriodCount === 0) {
      insights = '今天还没有烟瘾记录，太棒了！保持这种状态，你正在重新掌控自己的生活。';
    } else {
      insights = `今天共记录${currentPeriodCount}次烟瘾。${
        peakTime ? `高峰时段在${peakTime}，` : ''
      }识别触发点是戒烟的第一步。`;
    }
  } else {
    if (trend < 0) {
      insights = `本月烟瘾次数较上月减少${Math.abs(trend)}%，长期坚持正在显现成效！数据不会说谎，你做得很好。`;
    } else if (trend > 0) {
      insights = `本月烟瘾次数较上月有所增加，但不要气馁。戒烟是一场马拉松，偶尔的波动不代表失败。`;
    } else {
      insights = `本月烟瘾次数与上月持平。稳定的数据背后，是你每一天的坚持与努力。`;
    }
  }

  return {
    chartData,
    stats: {
      longestStreak: longestStreak.toString(),
      trend,
      peakTime,
    },
    insights,
  };
}
