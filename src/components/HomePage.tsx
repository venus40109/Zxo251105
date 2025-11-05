import { useState } from 'react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Trophy, Flame, Share2, Star } from 'lucide-react';
import BrandLogo from './BrandLogo';
import EquivalentItemIcon from './EquivalentItemIcon';

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
  onNavigate: (page: 'achievements' | 'calendar' | 'share') => void;
  onCheckIn: () => void;
  hasCheckedInToday: boolean;
}

export default function HomePage({ userStats, onNavigate, onCheckIn, hasCheckedInToday }: HomePageProps) {
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

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1f1f1f 100%)',
      }}
    >
      <div className="w-full max-w-md">
        {/* Header: Avatar + Nickname + Rank + Brand Icon */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-3">
            <Avatar className="w-12 h-12 ring-2 ring-offset-2 ring-offset-transparent" style={{ ringColor: '#00B894' }}>
              <AvatarImage src={userStats.avatar} />
              <AvatarFallback style={{ backgroundColor: '#00B894', color: '#1a1a1a' }}>
                {userStats.nickname[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div style={{ color: '#EFEFEF' }} className="mb-1 truncate">{userStats.nickname}</div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(0, 184, 148, 0.2)', border: '1px solid rgba(0, 184, 148, 0.3)' }}>
                  <Star className="w-3 h-3" style={{ color: '#00B894' }} fill="#00B894" />
                  <span style={{ color: '#00B894', fontSize: '13px' }}>{userStats.currentRank} {userStats.rankStars}星</span>
                </div>
              </div>
            </div>
          </div>
          <ZXOIcon />
        </div>

        {/* Stats Info Card */}
        <div 
          className="rounded-2xl p-6 mb-6"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            border: '1px solid rgba(189, 189, 189, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="space-y-4">
            {/* Days tracking */}
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'rgba(189, 189, 189, 0.15)' }}>
              <div>
                <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>已坚持</div>
                <div style={{ color: '#00B894', fontSize: '24px', fontWeight: 'bold' }}>{userStats.totalDays} <span style={{ fontSize: '14px', color: '#EFEFEF' }}>天</span></div>
              </div>
              <div className="text-right">
                <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>连续打卡</div>
                <div style={{ color: '#00B894', fontSize: '24px', fontWeight: 'bold' }}>{userStats.consecutiveDays} <span style={{ fontSize: '14px', color: '#EFEFEF' }}>天</span></div>
              </div>
            </div>
            
            {/* Cigarettes and Money */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                className="rounded-lg p-3"
                style={{ backgroundColor: 'rgba(0, 184, 148, 0.08)', border: '1px solid rgba(0, 184, 148, 0.2)' }}
              >
                <div style={{ color: '#888888', fontSize: '12px', marginBottom: '6px' }}>少抽</div>
                <div style={{ color: '#EFEFEF', fontSize: '20px', fontWeight: 'bold' }}>
                  {userStats.cigarettesAvoided} <span style={{ fontSize: '13px', color: '#888888' }}>根</span>
                </div>
              </div>
              <div 
                className="rounded-lg p-3"
                style={{ backgroundColor: 'rgba(0, 184, 148, 0.08)', border: '1px solid rgba(0, 184, 148, 0.2)' }}
              >
                <div style={{ color: '#888888', fontSize: '12px', marginBottom: '6px' }}>节约</div>
                <div style={{ color: '#EFEFEF', fontSize: '20px', fontWeight: 'bold' }}>
                  {userStats.moneySaved} <span style={{ fontSize: '13px', color: '#888888' }}>元</span>
                </div>
              </div>
            </div>
            
            {/* Equivalent Item */}
            <div 
              className="rounded-lg p-3 flex items-center justify-between"
              style={{ backgroundColor: 'rgba(189, 189, 189, 0.1)', border: '1px solid rgba(189, 189, 189, 0.2)' }}
            >
              <div className="flex items-center gap-2">
                <span style={{ color: '#EFEFEF', fontSize: '14px' }}>节约 约</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: '#00B894', fontSize: '18px', fontWeight: 'bold' }}>{userStats.equivalentCount}</span>
                <span style={{ fontSize: '13px', color: '#888888' }}>{userStats.equivalentUnit}</span>
                <EquivalentItemIcon itemName={userStats.equivalentItem} size={20} color="#00B894" />
                <span style={{ color: '#EFEFEF', fontSize: '14px' }}>{userStats.equivalentItem}</span>
              </div>
            </div>
            
            {/* Life extension */}
            <div className="pt-2">
              <div style={{ color: '#EFEFEF', marginBottom: '6px' }}>
                您已重获新生 <span style={{ color: '#00B894' }}>{userStats.extraLifeDays}</span> 天 <span style={{ color: '#00B894' }}>{userStats.extraLifeHours}</span> 小时
              </div>
              <div style={{ color: '#888888', fontSize: '12px', lineHeight: '1.6' }}>
                数据基于科学统计，每少抽一根烟，约可延长11分钟寿命
              </div>
            </div>
          </div>
        </div>

        {/* Check-in Button */}
        <div className="mb-6">
          <Button
            onClick={handleCheckIn}
            disabled={hasCheckedInToday}
            className="w-full h-16 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: hasCheckedInToday ? '#E6E7E8' : '#00B894',
              color: hasCheckedInToday ? '#888888' : '#1a1a1a',
              boxShadow: hasCheckedInToday ? 'none' : '0 4px 24px rgba(0, 184, 148, 0.35)',
              border: hasCheckedInToday ? 'none' : '1px solid rgba(0, 184, 148, 0.3)',
            }}
          >
            {hasCheckedInToday ? '今日已打卡' : '立即打卡'}
          </Button>
          
          {/* Status Message */}
          <div className="text-center mt-3" style={{ color: hasError ? '#FF4444' : hasCheckedInToday ? '#00B894' : '#888888', fontSize: '13px' }}>
            {hasError ? (
              '网络异常，请重试'
            ) : hasCheckedInToday ? (
              `已打卡！明日可连续 ${userStats.consecutiveDays + 1} 天，距"${userStats.nextRank}"还需 ${userStats.daysToNextRank} 天`
            ) : (
              '每一次呼吸，都是自由的选择'
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-center gap-2">
          <QuickActionButton label="成就等级" icon={<Trophy className="w-4 h-4" />} onClick={() => onNavigate('achievements')} />
          <div className="h-4 w-px" style={{ backgroundColor: 'rgba(189, 189, 189, 0.3)' }} />
          <QuickActionButton label="连续打卡" icon={<Flame className="w-4 h-4" />} onClick={() => onNavigate('calendar')} />
          <div className="h-4 w-px" style={{ backgroundColor: 'rgba(189, 189, 189, 0.3)' }} />
          <QuickActionButton label="分享海报" icon={<Share2 className="w-4 h-4" />} onClick={() => onNavigate('share')} />
        </div>
      </div>
    </div>
  );
}

function ZXOIcon() {
  const [isPressed, setIsPressed] = useState(false);

  const playSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // 金属木鱼声 (Metal Wooden Fish Sound)
    // 温润舒适的金属敲击音，类似木鱼但是金属材质
    
    // 主敲击声 - 温润的中频金属音
    const impact = audioContext.createOscillator();
    const impactGain = audioContext.createGain();
    impact.type = 'sine';
    impact.frequency.value = 800;
    impact.frequency.exponentialRampToValueAtTime(600, now + 0.05);
    
    impact.connect(impactGain);
    impactGain.connect(audioContext.destination);
    
    impactGain.gain.setValueAtTime(0.3, now);
    impactGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    
    impact.start(now);
    impact.stop(now + 0.08);
    
    // 金属共鸣 - 温暖的余韵
    const resonance = audioContext.createOscillator();
    const resonanceGain = audioContext.createGain();
    resonance.type = 'triangle';
    resonance.frequency.value = 1200;
    resonance.frequency.exponentialRampToValueAtTime(900, now + 0.15);
    
    resonance.connect(resonanceGain);
    resonanceGain.connect(audioContext.destination);
    
    resonanceGain.gain.setValueAtTime(0.08, now + 0.02);
    resonanceGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    resonance.start(now + 0.02);
    resonance.stop(now + 0.15);
    
    // 低频余韵 - 增加饱满感
    const bass = audioContext.createOscillator();
    const bassGain = audioContext.createGain();
    bass.type = 'sine';
    bass.frequency.value = 300;
    
    bass.connect(bassGain);
    bassGain.connect(audioContext.destination);
    
    bassGain.gain.setValueAtTime(0.15, now);
    bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    
    bass.start(now);
    bass.stop(now + 0.12);
    
    // 轻微白噪声 - 模拟敲击质感
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.03, audioContext.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * (1 - i / noiseData.length) * 0.25;
    }
    const noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    const noiseGain = audioContext.createGain();
    
    noiseSource.connect(noiseGain);
    noiseGain.connect(audioContext.destination);
    
    noiseGain.gain.setValueAtTime(0.1, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
    
    noiseSource.start(now);
    noiseSource.stop(now + 0.03);
  };

  const handleClick = () => {
    setIsPressed(true);
    playSound();
    setTimeout(() => setIsPressed(false), 300);
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
      transition={{ duration: 0.2 }}
    >
      <BrandLogo 
        size={28} 
        color={isPressed ? '#00B894' : '#BDBDBD'} 
      />
    </motion.button>
  );
}

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function QuickActionButton({ icon, label, onClick }: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all hover:opacity-80"
      style={{
        color: '#EFEFEF',
      }}
    >
      <div style={{ color: '#00B894' }}>{icon}</div>
      <span style={{ fontSize: '13px' }}>{label}</span>
    </button>
  );
}
