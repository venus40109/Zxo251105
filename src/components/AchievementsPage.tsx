import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [showRulesModal, setShowRulesModal] = React.useState(false);
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
        background: '#EFEFEF',
      }}
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="w-8 h-8 flex items-center justify-center" style={{ color: '#666666' }}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 style={{ color: '#2A2A2A', fontSize: '16px', fontWeight: 'bold' }}>成就等级</h1>
          <button 
            onClick={() => setShowRulesModal(true)}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(0, 184, 148, 0.1)', color: '#00B894' }}
          >
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>?</span>
          </button>
        </div>

        {/* Current Rank Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="rounded-2xl p-6 mb-6"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(42, 42, 42, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
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
            <h2 style={{ color: '#2A2A2A', fontSize: '24px', marginBottom: '4px' }}>
              {currentRank}
            </h2>
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: rankStars }).map((_, i) => (
                <Star key={i} className="w-4 h-4" style={{ color: currentColor }} fill={currentColor} />
              ))}
            </div>
            <div style={{ color: '#666666', fontSize: '13px', marginTop: '8px' }}>
              <span style={{ fontWeight: 'bold' }}>{totalDays}</span> 天 · {RANK_SYSTEM[currentRankIndex]?.period}
            </div>
          </div>

          {nextRank && (
            <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(42, 42, 42, 0.1)' }}>
              <div className="flex items-center justify-between mb-2" style={{ fontSize: '13px' }}>
                <span style={{ color: '#666666' }}>距离 {nextRank.rank}</span>
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
            background: '#FFFFFF',
            border: '1px solid rgba(42, 42, 42, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <h3 style={{ color: '#2A2A2A', marginBottom: '16px' }}>段位进度</h3>
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
                      ? 'rgba(0, 184, 148, 0.05)' 
                      : 'rgba(42, 42, 42, 0.02)',
                    border: isCurrent 
                      ? '2px solid rgba(0, 184, 148, 0.4)' 
                      : `1px solid ${isUnlocked ? 'rgba(0, 184, 148, 0.2)' : 'rgba(42, 42, 42, 0.1)'}`,
                  }}
                >
                  {isCurrent && (
                    <div 
                      className="absolute top-1 right-1 px-1.5 py-0.5 rounded text-xs"
                      style={{ 
                        backgroundColor: '#00B894',
                        color: '#FFFFFF',
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
                        backgroundColor: isUnlocked ? `${color}1a` : 'rgba(42, 42, 42, 0.05)',
                        border: `2px solid ${isUnlocked ? color : 'rgba(42, 42, 42, 0.2)'}`,
                      }}
                    >
                      <Icon 
                        className="w-4 h-4" 
                        style={{ color: isUnlocked ? color : '#999999' }} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ color: isUnlocked ? '#2A2A2A' : '#999999', fontSize: '13px', fontWeight: isUnlocked ? '500' : 'normal' }}>
                        {rank.rank}
                      </div>
                    </div>
                  </div>
                  <div style={{ color: '#666666', fontSize: '11px', lineHeight: '1.3', textAlign: 'center' }}>
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
            background: '#FFFFFF',
            border: '1px solid rgba(42, 42, 42, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <h3 style={{ color: '#2A2A2A', marginBottom: '16px' }}>连续打卡成就</h3>
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
                    : 'rgba(42, 42, 42, 0.03)',
                  border: `1px solid ${badge.achieved ? 'rgba(0, 184, 148, 0.3)' : 'rgba(42, 42, 42, 0.1)'}`,
                }}
              >
                <div 
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                  style={{
                    backgroundColor: badge.achieved ? 'rgba(0, 184, 148, 0.2)' : 'rgba(42, 42, 42, 0.05)',
                    border: `2px solid ${badge.achieved ? '#00B894' : 'rgba(42, 42, 42, 0.2)'}`,
                  }}
                >
                  <Trophy 
                    className="w-6 h-6" 
                    style={{ color: badge.achieved ? '#00B894' : '#999999' }} 
                  />
                </div>
                <div style={{ color: badge.achieved ? '#2A2A2A' : '#999999', fontSize: '13px' }}>
                  {badge.name}
                </div>
                <div style={{ color: '#666666', fontSize: '11px', marginTop: '2px' }}>
                  {badge.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Rules Modal */}
      <AnimatePresence>
        {showRulesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowRulesModal(false)}
          >
            <div 
              className="absolute inset-0 backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ color: '#2A2A2A', fontSize: '18px', fontWeight: 'bold' }}>成就规则说明</h3>
                <button
                  onClick={() => setShowRulesModal(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#F3F4F6', color: '#999999' }}
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 style={{ color: '#00B894', fontSize: '15px', fontWeight: 'bold', marginBottom: '8px' }}>
                    段位晋升规则
                  </h4>
                  <div className="space-y-2 text-sm" style={{ color: '#666666', lineHeight: '1.6' }}>
                    {RANK_SYSTEM.map((rank, index) => (
                      <div key={rank.rank} className="flex items-start gap-2">
                        <Star className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#00B894' }} />
                        <span>
                          <strong style={{ color: '#2A2A2A' }}>{rank.rank}</strong>：
                          累计打卡 <strong style={{ fontWeight: 'bold' }}>{rank.minDays}</strong> 天
                          {rank.stars && <span>（共{rank.stars}星）</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4" style={{ borderColor: '#E5E7EB' }}>
                  <h4 style={{ color: '#00B894', fontSize: '15px', fontWeight: 'bold', marginBottom: '8px' }}>
                    连续打卡成就
                  </h4>
                  <p style={{ color: '#666666', fontSize: '13px', lineHeight: '1.6' }}>
                    坚持连续打卡可获得专属成就徽章，每个成就都是对您毅力的见证。记得每天打卡，保持连续记录！
                  </p>
                </div>

                <div className="border-t pt-4" style={{ borderColor: '#E5E7EB' }}>
                  <h4 style={{ color: '#00B894', fontSize: '15px', fontWeight: 'bold', marginBottom: '8px' }}>
                    补签卡说明
                  </h4>
                  <p style={{ color: '#666666', fontSize: '13px', lineHeight: '1.6' }}>
                    • 每连续打卡<strong style={{ fontWeight: 'bold' }}>7天</strong>可获得<strong style={{ fontWeight: 'bold' }}>1张</strong>补签卡<br />
                    • 新用户初始赠送<strong style={{ fontWeight: 'bold' }}>3张</strong>补签卡<br />
                    • 补签卡可用于补签断签日期，保持连续记录
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
