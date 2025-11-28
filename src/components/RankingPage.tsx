import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { ChevronLeft, ChevronDown, Globe, ChevronRight, Check, Loader2, X, BookOpen } from 'lucide-react';
import { getRankByDays } from '../utils/rankSystem';

interface RankingUser {
  id: string;
  rank: number;
  nickname: string;
  avatar: string;
  totalDays: number;
  province: string;
  city: string;
  district: string;
  street: string;
  rankLevel: string;
  rankStars: number;
  memberLevel: 'Guest' | 'Member' | 'Plus' | 'Pro' | 'Partner';
}

interface RankingPageProps {
  onBack: () => void;
  currentUserNickname: string;
  currentUserAvatar: string;
  currentUserTotalDays: number;
  onNavigateToShare?: () => void;
  onNavigateToSettings?: () => void;
  isVIP?: boolean;
  memberType?: 'free' | 'vip' | 'ai';
}

// 区域层级类型
type RegionLevel = 'national' | 'province' | 'city' | 'district' | 'street';

interface RegionOption {
  level: RegionLevel;
  name: string;
  emoji: string;
  rank: number;
  isHighlight?: boolean;
}

// 会员等级标签配置
const memberBadgeConfig = {
  Guest: { label: 'L1', color: '#34D399', bg: 'rgba(52, 211, 153, 0.15)' },
  Member: { label: 'L2', color: '#9CA3AF', bg: 'rgba(156, 163, 175, 0.15)' },
  Plus: { label: 'PLUS', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)' },
  Pro: { label: 'PRO', color: '#6366F1', bg: 'rgba(99, 102, 241, 0.15)' },
  Partner: { label: 'VIP', color: '#000000', bg: 'rgba(0, 0, 0, 0.15)' },
};

// 模拟数据生成
const generateMockData = (): RankingUser[] => {
  const nicknames = ['榜一大哥', '清醒一刻', '坚持者', '戒烟勇士', '健康生活'];
  const avatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  ];
  
  const provinces = ['北京市', '上海市', '广东省', '浙江省'];
  const cities = {
    '北京市': ['北京市'],
    '上海市': ['上海市'],
    '广东省': ['广州市', '深圳市'],
    '浙江省': ['杭州市', '宁波市'],
  };
  const districts = {
    '北京市': ['朝阳区', '海淀区', '西城区'],
    '上海市': ['浦东新区', '徐汇区', '静安区'],
    '广州市': ['天河区', '越秀区'],
    '深圳市': ['南山区', '福田区'],
    '杭州市': ['西湖区', '滨江区'],
    '宁波市': ['鄞州区', '海曙区'],
  };
  const streets = {
    '朝阳区': ['望京街道', '三里屯街道', '亚运村街道'],
    '海淀区': ['中关村街道', '上地街道'],
    '西城区': ['金融街街道', '月坛街道'],
    '浦东新区': ['陆家嘴街道', '张江镇'],
    '徐汇区': ['徐家汇街道', '田林街道'],
    '静安区': ['静安寺街道', '南京西路街道'],
    '天河区': ['珠江新城街道', '体育西路街道'],
    '越秀区': ['北京路街道', '东山街道'],
    '南山区': ['南头街道', '科技园街道'],
    '福田区': ['福田街道', '华强北街道'],
    '西湖区': ['西湖街道', '留下街道'],
    '滨江区': ['浦沿街道', '长河街道'],
    '鄞州区': ['钟公庙街道', '首南街道'],
    '海曙区': ['鼓楼街道', '月湖街道'],
  };

  const users: RankingUser[] = [];
  const memberLevels: Array<'Guest' | 'Member' | 'Plus' | 'Pro' | 'Partner'> = ['Guest', 'Member', 'Plus', 'Pro', 'Partner'];
  
  // 生成50个用户
  for (let i = 0; i < 50; i++) {
    const province = provinces[Math.floor(Math.random() * provinces.length)];
    const cityOptions = cities[province as keyof typeof cities];
    const city = cityOptions[Math.floor(Math.random() * cityOptions.length)];
    const districtOptions = districts[city as keyof typeof districts];
    const district = districtOptions[Math.floor(Math.random() * districtOptions.length)];
    const streetOptions = streets[district as keyof typeof streets] || ['未知街道'];
    const street = streetOptions[Math.floor(Math.random() * streetOptions.length)];
    
    const totalDays = Math.floor(Math.random() * 400) + 50;
    const rankInfo = getRankByDays(totalDays);
    
    users.push({
      id: `user-${i}`,
      rank: i + 1,
      nickname: i < 5 ? nicknames[i] : `用户${89757 + i}`,
      avatar: avatars[i % avatars.length],
      totalDays: totalDays,
      province,
      city,
      district,
      street,
      rankLevel: rankInfo.rank,
      rankStars: rankInfo.stars,
      memberLevel: memberLevels[Math.floor(Math.random() * memberLevels.length)],
    });
  }
  
  // 按天数排序
  return users.sort((a, b) => b.totalDays - a.totalDays).map((user, index) => ({
    ...user,
    rank: index + 1,
  }));
};

export default function RankingPage({
  onBack,
  currentUserNickname,
  currentUserAvatar,
  currentUserTotalDays,
  onNavigateToShare,
  onNavigateToSettings,
  isVIP = false,
  memberType = 'free',
}: RankingPageProps) {
  const [users] = useState<RankingUser[]>(generateMockData());
  const [currentLevel, setCurrentLevel] = useState<RegionLevel>('district');
  const [showSheet, setShowSheet] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);

  // 当前用户信息
  const currentUser: RankingUser = {
    id: 'current-user',
    rank: 5,
    nickname: currentUserNickname,
    avatar: currentUserAvatar,
    totalDays: currentUserTotalDays,
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    street: '望京街道',
    rankLevel: getRankByDays(currentUserTotalDays).rank,
    rankStars: getRankByDays(currentUserTotalDays).stars,
    memberLevel: 'Plus',
  };

  // 区域选项
  const regionOptions: RegionOption[] = [
    { level: 'national', name: '全国榜', emoji: '🇨🇳', rank: 1024 },
    { level: 'province', name: `${currentUser.province}榜`, emoji: '🏙️', rank: 158 },
    { level: 'city', name: `${currentUser.city}榜`, emoji: '🌆', rank: 42 },
    { level: 'district', name: `${currentUser.district}榜`, emoji: '🏘️', rank: 5, isHighlight: true },
    { level: 'street', name: `${currentUser.street}榜`, emoji: '🛣️', rank: 1, isHighlight: true },
  ];

  const currentRegion = regionOptions.find(r => r.level === currentLevel);

  return (
    <div 
      className="flex flex-col h-screen overflow-hidden"
      style={{ backgroundColor: '#EFEFEF' }}
    >
      {/* 顶部导航 */}
      <div 
        className="px-4 py-3 flex justify-between items-center shadow-sm z-30 relative"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <button 
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center"
          style={{ color: '#666666' }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setShowSheet(true)}
          className="flex flex-col items-center cursor-pointer transition-all active:scale-95"
        >
          <h1 className="flex items-center" style={{ color: '#2A2A2A', fontSize: '16px', fontWeight: 'bold' }}>
            {currentRegion?.name} <ChevronDown className="w-4 h-4 ml-1" style={{ color: '#999999' }} />
          </h1>
        </button>
        <button 
          onClick={() => setShowRulesModal(true)}
          className="text-xs transition-all hover:opacity-70"
          style={{ color: '#666666', fontWeight: '500' }}
        >
          成就规则
        </button>
      </div>

      {/* 吸顶个人战绩条 */}
      <button 
        onClick={() => onNavigateToShare?.()}
        className="w-full px-4 py-3 z-20 shadow-sm relative transition-all active:scale-[0.98]"
        style={{ 
          backgroundColor: '#FFFFFF', 
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span 
              className="w-6 text-center italic"
              style={{ color: '#00B894', fontSize: '20px', fontWeight: 'bold' }}
            >
              {currentRegion?.rank}
            </span>
            <div className="relative">
              <Avatar className="w-12 h-12" style={{ border: '2px solid #00B894', backgroundColor: '#F9FAFB' }}>
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback style={{ backgroundColor: '#00B894', color: '#FFFFFF' }}>
                  {currentUser.nickname[0]}
                </AvatarFallback>
              </Avatar>
              {memberType !== 'free' && (
                <span 
                  className="absolute -bottom-1 -right-1 text-[8px] px-1.5 rounded-full border border-white"
                  style={{ 
                    backgroundColor: memberType === 'ai' ? '#6366F1' : '#F59E0B',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                  }}
                >
                  {memberType === 'ai' ? 'AI' : 'VIP'}
                </span>
              )}
            </div>
            <div>
              <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold' }}>
                我 ({currentUser.nickname})
              </div>
              <div style={{ color: '#666666', fontSize: '12px' }}>
                {currentUser.rankLevel} · {currentUser.rankStars}星
              </div>
            </div>
          </div>
          <div className="text-right">
            <span 
              className="block font-mono"
              style={{ color: '#2A2A2A', fontSize: '22px', fontWeight: 'bold' }}
            >
              {currentUser.totalDays} <span style={{ fontSize: '12px', color: '#999999', fontWeight: 'normal' }}>天</span>
            </span>
          </div>
        </div>
      </button>

      {/* 列表区域 */}
      <div className="flex-1 overflow-y-auto relative">
        <div className="pt-2 px-6 space-y-2 max-w-md mx-auto">
          
          {/* 前三名卡片 */}
          {users.slice(0, 3).map((user, index) => {
            const borderColors = ['#F59E0B', '#9CA3AF', '#CD7F32'];
            const emojis = ['🥇', '🥈', '🥉'];
            
            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-3 flex items-center justify-between"
                style={{ 
                  borderLeft: `4px solid ${borderColors[index]}`,
                  border: '1px solid rgba(42, 42, 42, 0.08)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 text-center text-2xl">{emojis[index]}</div>
                  <Avatar className="w-10 h-10" style={{ backgroundColor: '#F9FAFB', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold' }}>
                      {user.nickname}
                    </div>
                    <div style={{ color: '#999999', fontSize: '12px' }}>
                      {user.street || user.district}
                    </div>
                  </div>
                </div>
                <div style={{ color: '#2A2A2A', fontSize: '18px', fontWeight: 'bold' }} className="font-mono">
                  {user.totalDays}
                </div>
              </motion.div>
            );
          })}

          {/* 第4名 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 * 0.05 }}
            className="bg-white rounded-xl p-3 flex items-center justify-between"
            style={{
              border: '1px solid rgba(42, 42, 42, 0.08)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-6 text-center"
                style={{ color: '#CCCCCC', fontSize: '18px', fontWeight: 'bold' }}
              >
                4
              </div>
              <Avatar className="w-10 h-10" style={{ backgroundColor: '#F9FAFB', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
                <AvatarImage src={users[3]?.avatar} />
                <AvatarFallback>{users[3]?.nickname[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold' }}>
                  {users[3]?.nickname}
                </div>
                <div style={{ color: '#999999', fontSize: '12px' }}>
                  {users[3]?.district}
                </div>
              </div>
            </div>
            <div style={{ color: '#666666', fontWeight: 'bold' }} className="font-mono">
              {users[3]?.totalDays}
            </div>
          </motion.div>

          {/* 第5名 - 当前用户（高亮） */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 * 0.05 }}
            className="rounded-xl p-3 flex items-center justify-between shadow-md relative"
            style={{ 
              background: 'linear-gradient(135deg, rgba(0, 184, 148, 0.1) 0%, rgba(0, 184, 148, 0.05) 100%)',
              border: '2px solid rgba(0, 184, 148, 0.4)',
            }}
          >
            {/* "我" 标签 */}
            <div 
              className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full shadow-sm"
              style={{ 
                backgroundColor: '#00B894',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 'bold',
              }}
            >
              我
            </div>
            <div className="flex items-center space-x-3">
              <div 
                className="w-6 text-center"
                style={{ color: '#00B894', fontSize: '18px', fontWeight: 'bold' }}
              >
                {currentRegion?.rank}
              </div>
              <div className="relative">
                <Avatar className="w-10 h-10" style={{ border: '2px solid #00B894', backgroundColor: '#F9FAFB' }}>
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback style={{ backgroundColor: '#00B894', color: '#FFFFFF' }}>
                    {currentUser.nickname[0]}
                  </AvatarFallback>
                </Avatar>
                <span 
                  className="absolute -bottom-1 -right-1 text-[8px] px-1.5 rounded-full border border-white"
                  style={{ 
                    backgroundColor: memberBadgeConfig[currentUser.memberLevel].color,
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                  }}
                >
                  {memberBadgeConfig[currentUser.memberLevel].label}
                </span>
              </div>
              <div>
                <div style={{ color: '#00B894', fontSize: '14px', fontWeight: 'bold' }}>
                  {currentUser.nickname}
                </div>
                <div style={{ color: '#00B894', fontSize: '12px', opacity: 0.8 }}>
                  {currentUser.rankLevel} · {currentUser.rankStars}星
                </div>
              </div>
            </div>
            <div style={{ color: '#00B894', fontWeight: 'bold', fontSize: '18px' }} className="font-mono">
              {currentUser.totalDays}
            </div>
          </motion.div>

          {/* 普通列表 6-20 */}
          {users.slice(5, 20).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: (index + 5) * 0.05 }}
              className="bg-white rounded-xl p-3 flex items-center justify-between"
              style={{
                border: '1px solid rgba(42, 42, 42, 0.08)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-6 text-center"
                  style={{ color: '#CCCCCC', fontSize: '18px', fontWeight: 'bold' }}
                >
                  {user.rank}
                </div>
                <Avatar className="w-10 h-10" style={{ backgroundColor: '#F9FAFB', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold' }}>
                    {user.nickname}
                  </div>
                  <div style={{ color: '#999999', fontSize: '12px' }}>
                    {user.district}
                  </div>
                </div>
              </div>
              <div style={{ color: '#666666', fontWeight: 'bold' }} className="font-mono">
                {user.totalDays}
              </div>
            </motion.div>
          ))}
          
          {/* 底部提示 */}
          <div className="text-center py-4" style={{ color: '#999999', fontSize: '12px' }}>
            仅展示前 50 名用户<br/>每日凌晨更新数据
          </div>
        </div>
      </div>

      {/* 切换菜单 (Action Sheet) */}
      <AnimatePresence>
        {showSheet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              onClick={() => setShowSheet(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl z-50 pb-8 shadow-2xl"
            >
              <div 
                className="w-12 h-1.5 rounded-full mx-auto mt-3 mb-6"
                style={{ backgroundColor: '#E5E7EB' }}
              />
              <h3 className="text-center mb-2" style={{ color: '#2A2A2A', fontSize: '16px', fontWeight: 'bold' }}>
                选择查看范围
              </h3>
              <p className="text-center mb-6" style={{ color: '#999999', fontSize: '12px' }}>
                系统已自动为您定位最高排名
              </p>
              
              <div className="px-4 space-y-2">
                {regionOptions.map((option) => {
                  const isActive = option.level === currentLevel;
                  const isBest = option.rank === 1;
                  const isNational = option.level === 'national';
                  const isProvince = option.level === 'province';
                  const isCity = option.level === 'city';
                  const needsVIP = (isNational || isProvince || isCity) && !isVIP;
                  
                  return (
                    <button
                      key={option.level}
                      onClick={() => {
                        if (needsVIP) {
                          setShowSheet(false);
                          onNavigateToSettings?.();
                        } else {
                          setCurrentLevel(option.level);
                          setShowSheet(false);
                        }
                      }}
                      className="w-full p-4 flex justify-between items-center rounded-2xl transition-all active:scale-95"
                      style={{
                        backgroundColor: isActive ? 'rgba(0, 184, 148, 0.1)' : '#F9FAFB',
                        border: isActive ? '1px solid rgba(0, 184, 148, 0.3)' : '1px solid transparent',
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{option.emoji}</span>
                        <div className="text-left">
                          <div style={{ 
                            color: isActive ? '#00B894' : '#2A2A2A',
                            fontSize: '14px',
                            fontWeight: 'bold',
                          }}>
                            {option.name}
                          </div>
                          <div style={{ 
                            color: needsVIP ? '#F59E0B' : isBest ? '#F59E0B' : isActive ? '#00B894' : '#999999',
                            fontSize: '12px',
                            fontWeight: needsVIP || isBest ? 'bold' : 'normal',
                          }}>
                            {needsVIP ? '开通VIP查看更多榜单' : (isBest ? '👑 您是第 1 名！' : `您排名第 ${option.rank} 名`)}
                            {isActive && !needsVIP && ' · 当前显示'}
                          </div>
                        </div>
                      </div>
                      {isActive && !needsVIP && <Check className="w-5 h-5" style={{ color: '#00B894' }} />}
                      {needsVIP && <ChevronRight className="w-5 h-5" style={{ color: '#F59E0B' }} />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 成就规则弹窗 */}
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
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
            >
              <div className="p-6 border-b" style={{ borderColor: '#E5E7EB' }}>
                <div className="flex items-center justify-between">
                  <h3 style={{ color: '#2A2A2A', fontSize: '18px', fontWeight: 'bold' }}>
                    成就规则说明
                  </h3>
                  <button
                    onClick={() => setShowRulesModal(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#F3F4F6', color: '#999999' }}
                  >
                    ×
                  </button>
                </div>
                <p className="mt-2" style={{ color: '#999999', fontSize: '12px' }}>
                  坚持戒烟，解锁更高段位荣耀
                </p>
              </div>
              
              <div className="px-6 py-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
                {/* 段位体系 */}
                <div>
                  <h4 className="flex items-center gap-2 mb-3" style={{ color: '#2A2A2A', fontSize: '15px', fontWeight: 'bold' }}>
                    <span style={{ fontSize: '18px' }}>🏆</span> 段位体系（9个段位）
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(205, 127, 50, 0.1)', border: '1px solid rgba(205, 127, 50, 0.2)' }}>
                      <div style={{ color: '#CD7F32', fontSize: '13px', fontWeight: 'bold' }}>🥉 倔强青铜（1-3星）</div>
                      <div style={{ color: '#666666', fontSize: '12px', marginTop: '4px' }}>第 1-30 天 · 戒烟起始期</div>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(192, 192, 192, 0.1)', border: '1px solid rgba(192, 192, 192, 0.2)' }}>
                      <div style={{ color: '#C0C0C0', fontSize: '13px', fontWeight: 'bold' }}>🥈 秩序白银（1-5星）</div>
                      <div style={{ color: '#666666', fontSize: '12px', marginTop: '4px' }}>第 31-90 天 · 习惯形成期</div>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
                      <div style={{ color: '#FFD700', fontSize: '13px', fontWeight: 'bold' }}>🥇 荣耀黄金（1-5星）</div>
                      <div style={{ color: '#666666', fontSize: '12px', marginTop: '4px' }}>第 91-180 天 · 稳定巩固期</div>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(229, 228, 226, 0.15)', border: '1px solid rgba(229, 228, 226, 0.3)' }}>
                      <div style={{ color: '#999999', fontSize: '13px', fontWeight: 'bold' }}>💎 尊贵铂金（1-5星）</div>
                      <div style={{ color: '#666666', fontSize: '12px', marginTop: '4px' }}>第 181-365 天 · 一年坚守</div>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(185, 242, 255, 0.15)', border: '1px solid rgba(185, 242, 255, 0.3)' }}>
                      <div style={{ color: '#3B82F6', fontSize: '13px', fontWeight: 'bold' }}>💠 永恒钻石（1-5星）</div>
                      <div style={{ color: '#666666', fontSize: '12px', marginTop: '4px' }}>第 366-730 天 · 两年坚持</div>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 107, 157, 0.1)', border: '1px solid rgba(255, 107, 157, 0.2)' }}>
                      <div style={{ color: '#FF6B9D', fontSize: '13px', fontWeight: 'bold' }}>✨ 至尊星耀（1-5星）</div>
                      <div style={{ color: '#666666', fontSize: '12px', marginTop: '4px' }}>第 731-1095 天 · 三年成就</div>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(157, 0, 255, 0.1)', border: '1px solid rgba(157, 0, 255, 0.2)' }}>
                      <div style={{ color: '#9D00FF', fontSize: '13px', fontWeight: 'bold' }}>👑 最强王者（1-3星）</div>
                      <div style={{ color: '#666666', fontSize: '12px', marginTop: '4px' }}>第 1096-1825 天 · 王者之路</div>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 0, 128, 0.1)', border: '1px solid rgba(255, 0, 128, 0.2)' }}>
                      <div style={{ color: '#FF0080', fontSize: '13px', fontWeight: 'bold' }}>🔥 无双王者（1-3星）</div>
                      <div style={{ color: '#666666', fontSize: '12px', marginTop: '4px' }}>第 1826-3650 天 · 十年坚守</div>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(0, 245, 252, 0.1)', border: '1px solid rgba(0, 245, 252, 0.2)' }}>
                      <div style={{ color: '#00F5FC', fontSize: '13px', fontWeight: 'bold' }}>⚡ 传奇王者（无限星级）</div>
                      <div style={{ color: '#666666', fontSize: '12px', marginTop: '4px' }}>第 3651 天起 · 传奇永恒</div>
                    </div>
                  </div>
                </div>

                {/* 升级规则 */}
                <div>
                  <h4 className="flex items-center gap-2 mb-3" style={{ color: '#2A2A2A', fontSize: '15px', fontWeight: 'bold' }}>
                    <span style={{ fontSize: '18px' }}>📈</span> 升级规则
                  </h4>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                    <ul className="space-y-2" style={{ color: '#666666', fontSize: '13px', lineHeight: '1.6' }}>
                      <li>• 每个段位分为多个星级（1-5星或1-3星）</li>
                      <li>• 累计打卡天数自动升级，无需手动操作</li>
                      <li>• 中断打卡不影响段位，但影响连续打卡天数</li>
                      <li>• 使用补签卡可以挽回连续打卡记录</li>
                    </ul>
                  </div>
                </div>

                {/* 连续打卡成就 */}
                <div>
                  <h4 className="flex items-center gap-2 mb-3" style={{ color: '#2A2A2A', fontSize: '15px', fontWeight: 'bold' }}>
                    <span style={{ fontSize: '18px' }}>🎖️</span> 连续打卡成就
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: '初心不改', days: 1, color: '#10B981' },
                      { name: '一周勇士', days: 7, color: '#3B82F6' },
                      { name: '双周坚守', days: 14, color: '#6366F1' },
                      { name: '月度大师', days: 30, color: '#8B5CF6' },
                      { name: '双月传奇', days: 60, color: '#A855F7' },
                      { name: '季度英雄', days: 90, color: '#D946EF' },
                      { name: '半年之星', days: 180, color: '#EC4899' },
                      { name: '年度王者', days: 365, color: '#F59E0B' },
                    ].map((badge) => (
                      <div key={badge.name} className="p-2 rounded-lg" style={{ backgroundColor: `${badge.color}15`, border: `1px solid ${badge.color}30` }}>
                        <div style={{ color: badge.color, fontSize: '12px', fontWeight: 'bold' }}>{badge.name}</div>
                        <div style={{ color: '#999999', fontSize: '11px', marginTop: '2px' }}>连续{badge.days}天</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 补签卡说明 */}
                <div>
                  <h4 className="flex items-center gap-2 mb-3" style={{ color: '#2A2A2A', fontSize: '15px', fontWeight: 'bold' }}>
                    <span style={{ fontSize: '18px' }}>🎫</span> 补签卡机制
                  </h4>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE047' }}>
                    <ul className="space-y-2" style={{ color: '#78350F', fontSize: '13px', lineHeight: '1.6' }}>
                      <li>• 新用户注册即获赠3张补签卡</li>
                      <li>• 可用于补救漏打卡的日期</li>
                      <li>• 每张卡只能补签1天</li>
                      <li>• 补签后连续天数不中断</li>
                      <li>• 补签卡用完后可通过活动获取</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="px-6 mt-6">
                <button 
                  onClick={() => setShowRulesModal(false)}
                  className="w-full py-3 rounded-xl transition-all active:scale-95"
                  style={{ 
                    backgroundColor: '#00B894',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                  }}
                >
                  我知道了
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}