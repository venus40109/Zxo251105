import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Download, Share2, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import brandIcon from 'figma:asset/40cd2f47e012cfd7f3053dd617e538f161555e3c.png';

interface SharePosterProps {
  onBack: () => void;
  userStats: {
    nickname: string;
    avatar: string;
    totalDays: number;
    moneySaved: number;
    equivalentItem: string;
    equivalentCount: number;
    equivalentUnit: string;
    currentRank: string;
    rankStars: number;
    last7DaysCheckIn: boolean[]; // 最近7天的打卡情况，true表示已打卡
  };
  userRanking?: number; // 用户在全国的排名
  memberType?: 'free' | 'vip' | 'ai'; // 用户会员类型
  localRanking?: number; // 用户在街道/区的排名
  localRegionName?: string; // 街道/区的名称
}

export default function SharePoster({ onBack, userStats, userRanking, memberType = 'free', localRanking, localRegionName }: SharePosterProps) {
  const posterRef = useRef<HTMLDivElement>(null);

  // 判断是否有VIP权限（VIP或AI会员）
  const hasVIPAccess = memberType === 'vip' || memberType === 'ai';

  const handleDownload = () => {
    // In a real app, use html2canvas or similar to export the poster
    console.log('Download poster');
  };

  const handleShare = () => {
    // In a real app, trigger share to WeChat
    console.log('Share to WeChat');
  };

  // 获取当前日期信息
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekDay = weekDays[today.getDay()];
  const dateString = `${month}月${day}日${weekDay}`;

  // 星期文字（一二三四五六日）
  const dayLabels = ['一', '二', '三', '四', '五', '六', '日'];
  
  // 根据今天是星期几，生成对应的标签
  const todayIndex = today.getDay(); // 0-6
  const reorderedLabels = [];
  for (let i = 0; i < 7; i++) {
    const labelIndex = (todayIndex - 6 + i + 7) % 7;
    reorderedLabels.push(dayLabels[labelIndex]);
  }

  return (
    <div 
      className="min-h-screen p-4 flex flex-col"
      style={{
        backgroundColor: '#EFEFEF',
      }}
    >
      <div className="max-w-md mx-auto w-full flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="w-8 h-8 flex items-center justify-center" style={{ color: '#666666' }}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 style={{ color: '#2A2A2A', fontSize: '16px', fontWeight: 'bold' }}>分享海报</h1>
          <div className="w-8" />
        </div>

        {/* Poster Preview */}
        <motion.div
          ref={posterRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1"
          style={{
            backgroundColor: '#EFEFEF',
            minHeight: 0,
          }}
        >
          <div className="h-full flex flex-col p-6 relative">
            {/* 左上角品牌 */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <img 
                src={brandIcon} 
                alt="ZXO Logo" 
                style={{ width: '32px', height: '32px' }}
              />
              <div>
                <div style={{ color: '#2A2A2A', fontSize: '16px', letterSpacing: '1px' }}>
                  ZXO
                </div>
                <div style={{ color: '#666666', fontSize: '11px' }}>
                  戒烟打卡
                </div>
              </div>
            </div>

            {/* 中间内容 */}
            <div className="flex-1 flex flex-col justify-center mt-12">
              {/* 胜利对号带光芒 */}
              <div className="relative mb-6 flex justify-center">
                {/* 旋转光芒效果 */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        width: '90px',
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent, rgba(0, 184, 148, 0.6), transparent)',
                        transform: `rotate(${i * 30}deg)`,
                        transformOrigin: 'center',
                      }}
                    />
                  ))}
                </motion.div>
                {/* 对号 */}
                <div 
                  className="relative z-10 rounded-full flex items-center justify-center"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #00B894, #00D9A3)',
                    boxShadow: '0 8px 24px rgba(0, 184, 148, 0.4)',
                  }}
                >
                  <Check className="w-12 h-12" style={{ color: '#FFFFFF', strokeWidth: 4 }} />
                </div>
              </div>

              {/* 左右分栏 */}
              <div className="flex gap-4 mb-6">
                {/* 左侧：头像、昵称、段位 */}
                <div className="flex flex-col items-center" style={{ flex: '0 0 130px' }}>
                  <Avatar className="w-20 h-20 mb-2 ring-2" style={{ ringColor: '#00B894' }}>
                    <AvatarImage src={userStats.avatar} />
                    <AvatarFallback style={{ backgroundColor: '#00B894', color: '#FFFFFF' }}>
                      {userStats.nickname[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div style={{ color: '#2A2A2A', fontSize: '16px', marginBottom: '6px' }}>
                    {userStats.nickname}
                  </div>
                  <div 
                    className="flex items-center gap-1 px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: 'rgba(0, 184, 148, 0.15)',
                      border: '1px solid rgba(0, 184, 148, 0.4)',
                    }}
                  >
                    <span style={{ color: '#00B894', fontSize: '11px' }}>
                      {userStats.currentRank} <span style={{ fontWeight: 'bold' }}>{userStats.rankStars}</span>星
                    </span>
                  </div>
                </div>

                {/* 右侧：统计数据 */}
                <div className="flex-1 flex flex-col justify-center gap-2 items-center">
                  {/* 第一行：已坚持戒烟 */}
                  <div style={{ color: '#2A2A2A', fontSize: '14px' }}>
                    已坚持戒烟<span style={{ color: '#00B894', fontWeight: 'bold' }}>{userStats.totalDays}</span>天
                  </div>
                  
                  {/* 第二行：累计节省 */}
                  <div style={{ color: '#2A2A2A', fontSize: '14px' }}>
                    累计节省<span style={{ color: '#00B894', fontWeight: 'bold' }}>{userStats.moneySaved}</span>元
                  </div>
                  
                  {/* 第三行：相当于 */}
                  <div style={{ color: '#2A2A2A', fontSize: '14px' }}>
                    相当于{userStats.equivalentItem}<span style={{ color: '#00B894', fontWeight: 'bold' }}>{userStats.equivalentCount}</span>{userStats.equivalentUnit}
                  </div>
                </div>
              </div>

              {/* 排行榜信息 */}
              {hasVIPAccess ? (
                <div 
                  className="rounded-xl p-3 mb-4 text-center"
                  style={{
                    backgroundColor: 'rgba(0, 184, 148, 0.1)',
                    border: '1px solid rgba(0, 184, 148, 0.3)',
                  }}
                >
                  <div style={{ color: '#2A2A2A', fontSize: '13px' }}>
                    全国排名第 <span style={{ color: '#00B894', fontWeight: 'bold', fontSize: '16px' }}>{userRanking || '--'}</span> 名
                  </div>
                  <div style={{ color: '#666666', fontSize: '11px', marginTop: '4px' }}>
                    已超越 <span style={{ fontWeight: 'bold' }}>{userRanking ? Math.max(0, Math.round((1 - userRanking / 1000) * 100)) : '--'}%</span> 的用户
                  </div>
                </div>
              ) : (
                <div 
                  className="rounded-xl p-3 mb-4 text-center"
                  style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                  }}
                >
                  {localRanking && localRegionName && (
                    <div style={{ color: '#2A2A2A', fontSize: '13px', marginBottom: '6px' }}>
                      {localRegionName}排名第 <span style={{ color: '#F59E0B', fontWeight: 'bold', fontSize: '16px' }}>{localRanking}</span> 名
                    </div>
                  )}
                  <div style={{ color: '#F59E0B', fontSize: '11px', fontWeight: 'bold' }}>
                    🔒 全国排名未开通 · 开通VIP可查看
                  </div>
                </div>
              )}

              {/* Slogan */}
              <div className="text-center mb-3">
                <div style={{ color: '#2A2A2A', fontSize: '18px', letterSpacing: '0.5px' }}>
                  Not Quit,But Upgrade.
                </div>
              </div>

              {/* 鼓励文字 */}
              <div className="text-center mb-3">
                <p style={{ color: '#666666', fontSize: '12px', lineHeight: '1.6' }}>
                  加油！争取成功度过最难熬的头7天。<br />每天不吸烟就是一场胜利。
                </p>
              </div>

              {/* 日期 */}
              <div className="text-center">
                <div style={{ color: '#999999', fontSize: '12px' }}>
                  {dateString}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}