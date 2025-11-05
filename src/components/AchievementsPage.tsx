import { motion } from 'motion/react';
import { ChevronLeft, Award, Trophy, Medal, Crown, Star, Sparkles, Flame, Zap, Diamond } from 'lucide-react';
import { Progress } from './ui/progress';
import { RANK_SYSTEM } from '../utils/rankSystem';

interface AchievementsPageProps {
  onBack: () => void;
  currentRank: string;
  rankStars: number;
  totalDays: number;
  consecutiveDays: number;
}

export default function AchievementsPage({ 
  onBack, 
  currentRank, 
  rankStars,
  totalDays,
  consecutiveDays 
}: AchievementsPageProps) {
  // 段位徽章图标映射
  const rankIconMap: Record<string, any> = {
    '倔强青铜': Award,
    '秩序白银': Medal,
    '荣耀黄金': Trophy,
    '尊贵铂金': Crown,
    '永恒钻石': Diamond,
    '至尊星耀': Sparkles,
    '最强王者': Crown,
    '无双王者': Zap,
    '传奇王者': Flame,
  };

  // 段位颜色映射
  const rankColorMap: Record<string, string> = {
    '倔强青铜': '#CD7F32',
    '秩序白银': '#C0C0C0',
    '荣耀黄金': '#FFD700',
    '尊贵铂金': '#E5E4E2',
    '永恒钻石': '#B9F2FF',
    '至尊星耀': '#FF6B9D',
    '最强王者': '#9D00FF',
    '无双王者': '#FF0080',
    '传奇王者': '#00F5FC',
  };

  const consecutiveBadges = [
    { name: '初心不改', desc: '完成第一次打卡', required: 1, achieved: consecutiveDays >= 1 },
    { name: '一周勇士', desc: '连续打卡7天', required: 7, achieved: consecutiveDays >= 7 },
    { name: '双周坚守', desc: '连续打卡14天', required: 14, achieved: consecutiveDays >= 14 },
    { name: '月度大师', desc: '连续打卡30天', required: 30, achieved: consecutiveDays >= 30 },
    { name: '双月传奇', desc: '连续打卡60天', required: 60, achieved: consecutiveDays >= 60 },
    { name: '季度英雄', desc: '连续打卡90天', required: 90, achieved: consecutiveDays >= 90 },
    { name: '半年之星', desc: '连续打卡180天', required: 180, achieved: consecutiveDays >= 180 },
    { name: '年度王者', desc: '连续打卡365天', required: 365, achieved: consecutiveDays >= 365 },
  ];

  const currentRankIndex = RANK_SYSTEM.findIndex(r => r.rank === currentRank);
  const nextRank = RANK_SYSTEM[currentRankIndex + 1];
  const progress = nextRank ? (totalDays / nextRank.minDays) * 100 : 100;

  const CurrentIcon = rankIconMap[currentRank] || Award;
  const currentColor = rankColorMap[currentRank] || '#00B894';

  return (
    <div 
      className="min-h-screen p-6"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1f1f1f 100%)',
      }}
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2" style={{ color: '#EFEFEF' }}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 style={{ color: '#EFEFEF', fontSize: '18px' }}>成就等级</h1>
          <div className="w-10" />
        </div>

        {/* Current Rank Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="rounded-2xl p-6 mb-6"
          style={{
            background: 'linear-gradient(145deg, rgba(0, 184, 148, 0.15) 0%, rgba(0, 184, 148, 0.05) 100%)',
            border: '1px solid rgba(0, 184, 148, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 184, 148, 0.2)',
          }}
        >
          <div className="text-center mb-4">
            <div 
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-3"
              style={{
                background: `linear-gradient(145deg, ${currentColor}33 0%, ${currentColor}1a 100%)`,
                border: `2px solid ${currentColor}`,
              }}
            >
              <CurrentIcon className="w-10 h-10" style={{ color: currentColor }} />
            </div>
            <h2 style={{ color: '#EFEFEF', fontSize: '24px', marginBottom: '4px' }}>
              {currentRank}
            </h2>
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: rankStars }).map((_, i) => (
                <Star key={i} className="w-4 h-4" style={{ color: currentColor }} fill={currentColor} />
              ))}
            </div>
            <div style={{ color: '#888888', fontSize: '13px', marginTop: '8px' }}>
              <span style={{ fontWeight: 'bold' }}>{totalDays}</span> 天 · {RANK_SYSTEM[currentRankIndex]?.period}
            </div>
          </div>

          {nextRank && (
            <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(189, 189, 189, 0.2)' }}>
              <div className="flex items-center justify-between mb-2" style={{ fontSize: '13px' }}>
                <span style={{ color: '#888888' }}>距离 {nextRank.rank}</span>
                <span style={{ color: '#00B894', fontWeight: 'bold' }}>{nextRank.minDays - totalDays} 天</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </motion.div>

        {/* Rank Badges */}
        <div 
          className="rounded-2xl p-4 mb-6"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            border: '1px solid rgba(189, 189, 189, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <h3 style={{ color: '#EFEFEF', marginBottom: '16px' }}>段位进度</h3>
          <div className="grid grid-cols-2 gap-3">
            {RANK_SYSTEM.map((rank, index) => {
              const Icon = rankIconMap[rank.rank] || Award;
              const color = rankColorMap[rank.rank] || '#888888';
              const isUnlocked = totalDays >= rank.minDays;
              const isCurrent = rank.rank === currentRank;

              return (
                <motion.div
                  key={rank.rank}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative flex flex-col gap-2 p-3 rounded-lg"
                  style={{
                    backgroundColor: isUnlocked 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(189, 189, 189, 0.02)',
                    border: isCurrent 
                      ? '2px solid rgba(0, 184, 148, 0.4)' 
                      : `1px solid ${isUnlocked ? 'rgba(189, 189, 189, 0.2)' : 'rgba(189, 189, 189, 0.1)'}`,
                  }}
                >
                  {isCurrent && (
                    <div 
                      className="absolute top-1 right-1 px-1.5 py-0.5 rounded text-xs"
                      style={{ 
                        backgroundColor: 'rgba(0, 184, 148, 0.9)',
                        color: '#141414',
                        fontSize: '10px',
                        fontWeight: 'bold'
                      }}
                    >
                      当前
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: isUnlocked ? `${color}1a` : 'rgba(189, 189, 189, 0.1)',
                        border: `2px solid ${isUnlocked ? color : 'rgba(189, 189, 189, 0.2)'}`,
                      }}
                    >
                      <Icon 
                        className="w-4 h-4" 
                        style={{ color: isUnlocked ? color : '#444444' }} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ color: isUnlocked ? '#EFEFEF' : '#888888', fontSize: '13px', fontWeight: isUnlocked ? '500' : 'normal' }}>
                        {rank.rank}
                      </div>
                    </div>
                  </div>
                  <div style={{ color: '#888888', fontSize: '11px', lineHeight: '1.3', textAlign: 'center' }}>
                    第<span style={{ fontWeight: 'bold' }}>{rank.minDays}</span>-<span style={{ fontWeight: 'bold' }}>{rank.maxDays}</span> 天<br />
                    {rank.period}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Consecutive Achievements */}
        <div 
          className="rounded-2xl p-4"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            border: '1px solid rgba(189, 189, 189, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <h3 style={{ color: '#EFEFEF', marginBottom: '16px' }}>连续打卡成就</h3>
          <div className="grid grid-cols-2 gap-3">
            {consecutiveBadges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-3 rounded-lg text-center"
                style={{
                  backgroundColor: badge.achieved 
                    ? 'rgba(0, 184, 148, 0.1)' 
                    : 'rgba(189, 189, 189, 0.05)',
                  border: `1px solid ${badge.achieved ? 'rgba(0, 184, 148, 0.3)' : 'rgba(189, 189, 189, 0.1)'}`,
                }}
              >
                <div 
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                  style={{
                    backgroundColor: badge.achieved ? 'rgba(0, 184, 148, 0.2)' : 'rgba(189, 189, 189, 0.1)',
                    border: `2px solid ${badge.achieved ? '#00B894' : 'rgba(189, 189, 189, 0.2)'}`,
                  }}
                >
                  <Trophy 
                    className="w-6 h-6" 
                    style={{ color: badge.achieved ? '#00B894' : '#444444' }} 
                  />
                </div>
                <div style={{ color: badge.achieved ? '#EFEFEF' : '#888888', fontSize: '13px' }}>
                  {badge.name}
                </div>
                <div style={{ color: '#888888', fontSize: '11px', marginTop: '2px' }}>
                  {badge.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
