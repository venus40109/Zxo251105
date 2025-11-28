import { ChevronLeft, TrendingDown, TrendingUp, Calendar, Activity, Heart } from 'lucide-react';

interface CravingRecord {
  timestamp: number;
  date: string;
  hour: number;
}

interface HealthReportPageProps {
  onBack: () => void;
  cravingRecords: CravingRecord[];
  last7DaysCheckIn: boolean[];
  smokingYears: string;
  dailyAmount: number;
  pricePerPack: number;
  cigarettesPerPack: number;
}

export default function HealthReportPage({
  onBack,
  cravingRecords,
  last7DaysCheckIn,
  smokingYears,
  dailyAmount,
  pricePerPack,
  cigarettesPerPack,
}: HealthReportPageProps) {
  // 计算本周数据
  const weekCheckInCount = last7DaysCheckIn.filter(Boolean).length;
  const weekCheckInRate = Math.round((weekCheckInCount / 7) * 100);
  
  // 计算本周烟瘾次数
  const now = new Date();
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekCravings = cravingRecords.filter(r => new Date(r.timestamp) > weekStart);
  const weekCravingCount = weekCravings.length;
  
  // 计算平均烟瘾时段
  const cravingHours = weekCravings.map(r => r.hour);
  const avgCravingHour = cravingHours.length > 0 
    ? Math.round(cravingHours.reduce((a, b) => a + b, 0) / cravingHours.length)
    : 0;
  
  // 生成建议
  const suggestions = [];
  
  if (weekCheckInRate < 80) {
    suggestions.push({
      icon: Calendar,
      color: '#F59E0B',
      title: '提升打卡率',
      desc: `本周打卡率为${weekCheckInRate}%，建议设置每日提醒，保持连续打卡习惯`,
    });
  } else {
    suggestions.push({
      icon: Calendar,
      color: '#00B894',
      title: '打卡习惯优秀',
      desc: `本周打卡率${weekCheckInRate}%，坚持得很好！继续保持这个节奏`,
    });
  }
  
  if (weekCravingCount > 10) {
    suggestions.push({
      icon: Activity,
      color: '#F59E0B',
      title: '烟瘾较为频繁',
      desc: `本周记录${weekCravingCount}次烟瘾，建议通过运动、深呼吸等方式转移注意力`,
    });
  } else if (weekCravingCount > 0) {
    suggestions.push({
      icon: Activity,
      color: '#00B894',
      title: '烟瘾控制良好',
      desc: `本周仅${weekCravingCount}次烟瘾记录，说明戒烟效果显著`,
    });
  } else {
    suggestions.push({
      icon: Activity,
      color: '#00B894',
      title: '完美控制',
      desc: '本周零烟瘾记录！您已经成功度过最艰难的阶段',
    });
  }
  
  if (avgCravingHour >= 8 && avgCravingHour <= 10) {
    suggestions.push({
      icon: Heart,
      color: '#6366F1',
      title: '早晨烟瘾高发',
      desc: '您的烟瘾多发于早晨，建议起床后喝杯温水、做简单运动来替代',
    });
  } else if (avgCravingHour >= 14 && avgCravingHour <= 16) {
    suggestions.push({
      icon: Heart,
      color: '#6366F1',
      title: '下午烟瘾高发',
      desc: '下午是您的烟瘾高发期，建议通过散步、喝茶来缓解',
    });
  } else if (avgCravingHour >= 20) {
    suggestions.push({
      icon: Heart,
      color: '#6366F1',
      title: '晚间烟瘾高发',
      desc: '晚间烟瘾较多，建议提前放松身心，培养睡前好习惯',
    });
  }

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
          <h1 style={{ color: '#2A2A2A', fontSize: '16px', fontWeight: 'bold' }}>AI健康周报</h1>
          <div className="w-8"></div>
        </div>

        {/* 周期标签 */}
        <div className="text-center mb-6">
          <div style={{ color: '#999999', fontSize: '13px', marginBottom: '4px' }}>
            本周报告
          </div>
          <div style={{ color: '#2A2A2A', fontSize: '15px', fontWeight: 'bold' }}>
            {new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })} - {now.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
          </div>
        </div>

        {/* 核心数据卡片 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div
            className="rounded-2xl p-4"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(42, 42, 42, 0.1)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4" style={{ color: '#00B894' }} />
              <span style={{ color: '#666666', fontSize: '12px' }}>本周打卡</span>
            </div>
            <div style={{ color: '#2A2A2A', fontSize: '24px', fontWeight: 'bold' }}>
              {weekCheckInCount}<span style={{ fontSize: '14px', color: '#999999', fontWeight: 'normal' }}>/7天</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              {weekCheckInRate >= 80 ? (
                <>
                  <TrendingUp className="w-3 h-3" style={{ color: '#00B894' }} />
                  <span style={{ color: '#00B894', fontSize: '11px' }}>表现优秀</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-3 h-3" style={{ color: '#F59E0B' }} />
                  <span style={{ color: '#F59E0B', fontSize: '11px' }}>需要加油</span>
                </>
              )}
            </div>
          </div>

          <div
            className="rounded-2xl p-4"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(42, 42, 42, 0.1)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4" style={{ color: '#6366F1' }} />
              <span style={{ color: '#666666', fontSize: '12px' }}>烟瘾记录</span>
            </div>
            <div style={{ color: '#2A2A2A', fontSize: '24px', fontWeight: 'bold' }}>
              {weekCravingCount}<span style={{ fontSize: '14px', color: '#999999', fontWeight: 'normal' }}>次</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              {weekCravingCount <= 5 ? (
                <>
                  <TrendingDown className="w-3 h-3" style={{ color: '#00B894' }} />
                  <span style={{ color: '#00B894', fontSize: '11px' }}>控制良好</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-3 h-3" style={{ color: '#F59E0B' }} />
                  <span style={{ color: '#F59E0B', fontSize: '11px' }}>需要注意</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 本周打卡日历 */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(42, 42, 42, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <h3 style={{ color: '#2A2A2A', fontSize: '15px', fontWeight: 'bold', marginBottom: '16px' }}>
            本周打卡记录
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {['一', '二', '三', '四', '五', '六', '日'].map((day, index) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <div style={{ color: '#999999', fontSize: '11px' }}>{day}</div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: last7DaysCheckIn[index] ? '#00B894' : 'rgba(0, 0, 0, 0.05)',
                    border: last7DaysCheckIn[index] ? 'none' : '1px dashed rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {last7DaysCheckIn[index] ? (
                    <span style={{ color: '#FFFFFF', fontSize: '16px' }}>✓</span>
                  ) : (
                    <span style={{ color: '#CCCCCC', fontSize: '16px' }}>-</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI健康建议 */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.1)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' }}>
              <span style={{ fontSize: '16px' }}>🤖</span>
            </div>
            <h3 style={{ color: '#2A2A2A', fontSize: '15px', fontWeight: 'bold' }}>
              AI健康建议
            </h3>
          </div>

          <div className="space-y-3">
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <div
                  key={index}
                  className="flex gap-3 p-3 rounded-xl"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${suggestion.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: suggestion.color }} />
                  </div>
                  <div className="flex-1">
                    <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                      {suggestion.title}
                    </div>
                    <div style={{ color: '#666666', fontSize: '12px', lineHeight: '1.5' }}>
                      {suggestion.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 阶段建议 */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(42, 42, 42, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5" style={{ color: '#00B894' }} />
            <h3 style={{ color: '#2A2A2A', fontSize: '15px', fontWeight: 'bold' }}>
              本周阶段建议
            </h3>
          </div>

          <div className="space-y-3">
            <div
              className="p-4 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 184, 148, 0.08) 0%, rgba(0, 184, 148, 0.03) 100%)',
                border: '1px solid rgba(0, 184, 148, 0.2)',
              }}
            >
              <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                🎯 戒断期关键阶段
              </div>
              <div style={{ color: '#666666', fontSize: '13px', lineHeight: '1.6' }}>
                您正处于戒烟的关键期，身体正在适应无尼古丁状态。这个阶段可能会出现焦虑、烦躁等症状，这都是正常的戒断反应。
              </div>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.03) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
              }}
            >
              <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                💡 应对策略
              </div>
              <ul style={{ color: '#666666', fontSize: '13px', lineHeight: '1.8' }}>
                <li>• 每当烟瘾来袭，尝试深呼吸5次</li>
                <li>• 用口香糖或坚果替代香烟</li>
                <li>• 避免去吸烟场所或与吸烟者接触</li>
                <li>• 多喝水，帮助身体排毒</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 下周建议 */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.1)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5" style={{ color: '#6366F1' }} />
            <h3 style={{ color: '#2A2A2A', fontSize: '15px', fontWeight: 'bold' }}>
              下周行动计划
            </h3>
          </div>

          <div className="space-y-3">
            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: '18px' }}>🏃</span>
                <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold' }}>
                  增加运动量
                </div>
              </div>
              <div style={{ color: '#666666', fontSize: '13px', lineHeight: '1.6' }}>
                建议每天进行30分钟有氧运动，如快走、慢跑或游泳，帮助释放压力并促进身体恢复。
              </div>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: '18px' }}>🥗</span>
                <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold' }}>
                  调整饮食结构
                </div>
              </div>
              <div style={{ color: '#666666', fontSize: '13px', lineHeight: '1.6' }}>
                多吃新鲜水果蔬菜，补充维生素C和抗氧化物质，加速肺部修复。避免辛辣刺激食物。
              </div>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: '18px' }}>😴</span>
                <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold' }}>
                  保持规律作息
                </div>
              </div>
              <div style={{ color: '#666666', fontSize: '13px', lineHeight: '1.6' }}>
                每晚保证7-8小时睡眠，帮助身体更好地修复。睡前可进行冥想或听轻音乐放松。
              </div>
            </div>
          </div>
        </div>

        {/* 戒烟效果 */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(42, 42, 42, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <h3 style={{ color: '#2A2A2A', fontSize: '15px', fontWeight: 'bold', marginBottom: '12px' }}>
            戒烟效果提醒
          </h3>
          <div className="space-y-3" style={{ color: '#666666', fontSize: '13px', lineHeight: '1.6' }}>
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#00B894' }} />
              <span>坚持戒烟，您的肺功能正在逐步恢复，呼吸会越来越顺畅</span>
            </div>
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#00B894' }} />
              <span>继续保持，您患心血管疾病的风险正在显著降低</span>
            </div>
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#00B894' }} />
              <span>戒烟让您的味觉和嗅觉逐渐恢复，生活质量持续提升</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
