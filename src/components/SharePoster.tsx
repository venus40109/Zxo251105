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
}

export default function SharePoster({ onBack, userStats }: SharePosterProps) {
  const posterRef = useRef<HTMLDivElement>(null);

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
          <button onClick={onBack} className="p-2 rounded-lg transition-all hover:bg-black/5" style={{ color: '#2A2A2A', backgroundColor: 'rgba(42, 42, 42, 0.08)' }}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 style={{ color: '#2A2A2A', fontSize: '18px' }}>分享海报</h1>
          <div className="w-10" />
        </div>

        {/* Poster Preview */}
        <motion.div
          ref={posterRef}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-2xl overflow-hidden flex-1"
          style={{
            backgroundColor: '#EFEFEF',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.5)',
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

            {/* 右上角功能图标 */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button 
                onClick={handleDownload}
                className="p-2 rounded-lg transition-colors hover:opacity-70"
                style={{ 
                  color: '#2A2A2A',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                }}
              >
                <Download className="w-5 h-5" />
              </button>
              <button 
                onClick={handleShare}
                className="p-2 rounded-lg transition-colors hover:opacity-70"
                style={{ 
                  color: '#2A2A2A',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                }}
              >
                <Share2 className="w-5 h-5" />
              </button>
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

              {/* 7天打卡情况 */}
              <div 
                className="rounded-xl p-4 mb-4"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="flex justify-between">
                  {userStats.last7DaysCheckIn.map((checked, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div style={{ color: '#888888', fontSize: '11px', marginBottom: '6px' }}>
                        {reorderedLabels[index]}
                      </div>
                      <div
                        className="rounded-full flex items-center justify-center"
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: checked ? '#00B894' : '#FFFFFF',
                          border: checked ? 'none' : '1px solid rgba(0, 0, 0, 0.15)',
                        }}
                      >
                        {checked && <Check className="w-4 h-4" style={{ color: '#FFFFFF', strokeWidth: 3 }} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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
