import { useState } from 'react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Star } from 'lucide-react';
import BrandLogo from './BrandLogo';
import EquivalentItemIcon from './EquivalentItemIcon';
import { toast } from 'sonner@2.0.3';

interface UserStats {
  nickname: string;
  avatar: string;
  totalDays: number;
  consecutiveDays: number;
  cigarettesAvoided: number;
  moneySaved: number;
  equivalentItem: string;
  equivalentCount: number;
  equivalentUnit: string;
  extraLifeDays: number;
  extraLifeHours: number;
  currentRank: string;
  rankStars: number;
  daysToNextRank: number;
  nextRank: string;
  consecutiveTarget: number;
  makeupCards: number;
}

interface HomePageProps {
  userStats: UserStats;
  onNavigate: (page: 'achievements' | 'calendar' | 'share' | 'report' | 'settings') => void;
  onCheckIn: () => void;
  hasCheckedInToday: boolean;
  onCravingRecord: () => void;
}

function ZXOIcon({ onCravingRecord, hasCheckedInToday, onNavigateToReport }: { onCravingRecord: () => void; hasCheckedInToday: boolean; onNavigateToReport: () => void }) {
  const [isPressed, setIsPressed] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);

  const playSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioContext.currentTime;
      
      // 咔嗒声 (Click/Clack Sound)
      const click1 = audioContext.createOscillator();
      const clickGain1 = audioContext.createGain();
      click1.type = 'square';
      click1.frequency.value = 2000;
      
      click1.connect(clickGain1);
      clickGain1.connect(audioContext.destination);
      
      clickGain1.gain.setValueAtTime(0.15, now);
      clickGain1.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
      
      click1.start(now);
      click1.stop(now + 0.03);
      
      const click2 = audioContext.createOscillator();
      const clickGain2 = audioContext.createGain();
      click2.type = 'triangle';
      click2.frequency.value = 800;
      
      click2.connect(clickGain2);
      clickGain2.connect(audioContext.destination);
      
      clickGain2.gain.setValueAtTime(0.12, now + 0.04);
      clickGain2.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      
      click2.start(now + 0.04);
      click2.stop(now + 0.08);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const handleClick = () => {
    setIsPressed(true);
    playSound();
    setTimeout(() => setIsPressed(false), 300);

    // 处理三次点击逻辑
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    // 清除之前的计时器
    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    // 如果点击三次，跳转到数据报告
    if (newClickCount === 3) {
      setClickCount(0);
      setClickTimer(null);
      onNavigateToReport();
      return;
    }

    // 设置10秒后重置计数器
    const timer = setTimeout(() => {
      setClickCount(0);
      setClickTimer(null);
    }, 10000);
    setClickTimer(timer);

    // 记录烟瘾（如果已打卡）
    if (hasCheckedInToday) {
      onCravingRecord();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="relative flex items-center justify-center rounded-lg"
      style={{
        width: '48px',
        height: '48px',
        background: 'linear-gradient(145deg, rgba(189, 189, 189, 0.15) 0%, rgba(189, 189, 189, 0.05) 100%)',
        border: '2px solid rgba(189, 189, 189, 0.3)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      }}
      whileTap={{ scale: 0.85, rotate: 15 }}
      animate={isPressed ? {
        boxShadow: '0 0 20px rgba(189, 189, 189, 0.6), inset 0 0 15px rgba(0, 184, 148, 0.3)',
        borderColor: 'rgba(0, 184, 148, 0.8)',
      } : {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(189, 189, 189, 0.3)',
      }}
    >
      <BrandLogo size={28} color={isPressed ? '#00B894' : '#BDBDBD'} />
    </motion.button>
  );
}

export default function HomePage({ userStats, onNavigate, onCheckIn, hasCheckedInToday, onCravingRecord }: HomePageProps) {
  const [hasError, setHasError] = useState(false);

  const handleCheckIn = () => {
    // Simulate API call
    if (Math.random() > 0.95) {
      setHasError(true);
      setTimeout(() => setHasError(false), 3000);
    } else {
      onCheckIn();
    }
  };

  const handleButtonClick = () => {
    if (hasCheckedInToday) {
      onNavigate('share');
    } else {
      handleCheckIn();
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: '#EFEFEF',
      }}
    >
      <div className="w-full max-w-md">
        {/* Header: Avatar + Nickname + Rank + Brand Icon */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-3">
            <button onClick={() => onNavigate('settings')} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
              <Avatar className="w-12 h-12 ring-2 ring-offset-2 ring-offset-transparent" style={{ ringColor: '#00B894' }}>
                <AvatarImage src={userStats.avatar} />
                <AvatarFallback style={{ backgroundColor: '#00B894', color: '#EFEFEF' }}>
                  {userStats.nickname[0]}
                </AvatarFallback>
              </Avatar>
            </button>
            <div className="flex-1">
              <div style={{ color: '#2A2A2A' }} className="mb-1 truncate">{userStats.nickname}</div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onNavigate('achievements')}
                  className="flex items-center gap-1 px-2 py-0.5 rounded transition-all hover:opacity-80" 
                  style={{ backgroundColor: 'rgba(0, 184, 148, 0.2)', border: '1px solid rgba(0, 184, 148, 0.3)', cursor: 'pointer' }}
                >
                  <Star className="w-3 h-3" style={{ color: '#00B894' }} fill="#00B894" />
                  <span style={{ color: '#00B894', fontSize: '13px' }}>{userStats.currentRank} <span style={{ fontWeight: 'bold' }}>{userStats.rankStars}</span>星</span>
                </button>
              </div>
            </div>
          </div>
          <ZXOIcon onCravingRecord={onCravingRecord} hasCheckedInToday={hasCheckedInToday} onNavigateToReport={() => onNavigate('report')} />
        </div>

        {/* Stats Info Card */}
        <div 
          className="rounded-2xl p-6 mb-6"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(42, 42, 42, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="space-y-4">
            {/* Days tracking */}
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'rgba(42, 42, 42, 0.1)' }}>
              <div>
                <div style={{ color: '#666666', fontSize: '12px', marginBottom: '4px' }}>已坚持</div>
                <div style={{ color: '#00B894', fontSize: '24px', fontWeight: 'bold' }}>{userStats.totalDays} <span style={{ fontSize: '14px', color: '#2A2A2A' }}>天</span></div>
              </div>
              <button 
                onClick={() => onNavigate('calendar')}
                className="text-right transition-all hover:opacity-80"
                style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
              >
                <div style={{ color: '#666666', fontSize: '12px', marginBottom: '4px' }}>连续打卡</div>
                <div style={{ color: '#00B894', fontSize: '24px', fontWeight: 'bold' }}>{userStats.consecutiveDays} <span style={{ fontSize: '14px', color: '#2A2A2A' }}>天</span></div>
              </button>
            </div>
            
            {/* Cigarettes and Money */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                className="rounded-lg p-3"
                style={{ backgroundColor: 'rgba(0, 184, 148, 0.08)', border: '1px solid rgba(0, 184, 148, 0.2)' }}
              >
                <div style={{ color: '#666666', fontSize: '12px', marginBottom: '6px' }}>少抽</div>
                <div style={{ color: '#2A2A2A', fontSize: '20px', fontWeight: 'bold' }}>
                  {userStats.cigarettesAvoided} <span style={{ fontSize: '13px', color: '#666666' }}>根</span>
                </div>
              </div>
              <div 
                className="rounded-lg p-3"
                style={{ backgroundColor: 'rgba(0, 184, 148, 0.08)', border: '1px solid rgba(0, 184, 148, 0.2)' }}
              >
                <div style={{ color: '#666666', fontSize: '12px', marginBottom: '6px' }}>节约</div>
                <div style={{ color: '#2A2A2A', fontSize: '20px', fontWeight: 'bold' }}>
                  {userStats.moneySaved} <span style={{ fontSize: '13px', color: '#666666' }}>元</span>
                </div>
              </div>
            </div>
            
            {/* Equivalent Item */}
            <div 
              className="rounded-lg p-3 flex items-center justify-between"
              style={{ backgroundColor: 'rgba(42, 42, 42, 0.03)', border: '1px solid rgba(42, 42, 42, 0.08)' }}
            >
              <div className="flex items-center gap-2">
                <span style={{ color: '#2A2A2A', fontSize: '14px' }}>节约约</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: '#00B894', fontSize: '18px', fontWeight: 'bold' }}>{userStats.equivalentCount}</span>
                <span style={{ fontSize: '13px', color: '#666666' }}>{userStats.equivalentUnit}</span>
                <EquivalentItemIcon itemName={userStats.equivalentItem} size={20} color="#00B894" />
                <span style={{ color: '#2A2A2A', fontSize: '14px' }}>{userStats.equivalentItem}</span>
              </div>
            </div>
            
            {/* Life extension */}
            <div className="pt-2">
              <div style={{ color: '#2A2A2A', marginBottom: '6px' }}>
                您已重获新生 <span style={{ color: '#00B894', fontWeight: 'bold' }}>{userStats.extraLifeDays}</span> 天 <span style={{ color: '#00B894', fontWeight: 'bold' }}>{userStats.extraLifeHours}</span> 小时
              </div>
              <div style={{ color: '#666666', fontSize: '12px', lineHeight: '1.6' }}>
                数据基于科学统计，每少抽一根烟，约可延长11分钟寿命
              </div>
            </div>
          </div>
        </div>

        {/* Check-in / Share Button */}
        <div className="mb-6">
          <Button
            onClick={handleButtonClick}
            className="w-full h-14 rounded-xl"
            style={{
              backgroundColor: hasCheckedInToday ? '#00B894' : '#00B894',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0, 184, 148, 0.4)',
              cursor: 'pointer',
            }}
          >
            {hasCheckedInToday ? '分享' : '今日打卡'}
          </Button>
          
          {/* Status Message */}
          <div className="text-center mt-3" style={{ color: hasError ? '#FF4444' : hasCheckedInToday ? '#666666' : '#666666', fontSize: '13px', lineHeight: '1.6' }}>
            {hasError ? (
              '网络异常，请重试'
            ) : hasCheckedInToday ? (
              <>
                已打卡，连续打卡{userStats.consecutiveDays}天！
                <br />
                明日打卡后，距晋级"{userStats.nextRank}"还需打卡{userStats.daysToNextRank}天
              </>
            ) : (
              '每一次呼吸，都是自由的选择'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


