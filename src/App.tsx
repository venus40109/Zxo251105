import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import FirstTimeSetup from './components/FirstTimeSetup';
import HomePage from './components/HomePage';
import AchievementsPage from './components/AchievementsPage';
import CheckInCalendar from './components/CheckInCalendar';
import SharePoster from './components/SharePoster';
import DataReportPage from './components/DataReportPage';
import SettingsPage from './components/SettingsPage';
import RankingPage from './components/RankingPage';
import HealthReportPage from './components/HealthReportPage';
import AIAssistantPage from './components/AIAssistantPage';
import { getRankByDays, getNextRank } from './utils/rankSystem';
import { calculateEquivalentItem } from './utils/equivalentItems';
import { toast, Toaster } from 'sonner@2.0.3';
import { CustomToast } from './components/CustomToast';

interface SetupData {
  smokingYears: string;
  dailyAmount: number;
  pricePerPack: number;
  cigarettesPerPack: number;
}

interface CheckInRecord {
  date: string;
  isMakeup: boolean;
}

interface CravingRecord {
  timestamp: number;
  date: string;
  hour: number;
}

interface UserData {
  nickname: string;
  avatar: string;
  setupData: SetupData | null;
  checkInRecords: CheckInRecord[];
  cravingRecords: CravingRecord[];
  makeupCards: number;
  totalDays: number;
  consecutiveDays: number;
  lastCheckInDate: string | null;
  lastCravingTime: number | null;
  hasAgreedToTerms: boolean;
  memberType: 'free' | 'vip' | 'ai';
  aiExpiryDate?: string | null; // AI权限到期日期
}

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
  last7DaysCheckIn: boolean[];
  regionName?: string;
  regionRank?: number;
}

type Page = 'splash' | 'home' | 'achievements' | 'calendar' | 'share' | 'report' | 'settings' | 'setup' | 'ranking' | 'healthReport' | 'aiChat';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('splash');
  
  // 用户数据 - 新用户从零开始
  const [userData, setUserData] = useState<UserData>({
    nickname: '戒烟勇士',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    setupData: null, // 首次打卡时才设置
    checkInRecords: [], // 空数组，首次打卡后才有记录
    cravingRecords: [], // 烟瘾记录
    makeupCards: 3, // 初始赠送3张补签卡
    totalDays: 0, // 从0开始
    consecutiveDays: 0, // 从0开始
    lastCheckInDate: null,
    lastCravingTime: null, // 上次记录烟瘾的时间
    hasAgreedToTerms: false, // 是否同意协议
    memberType: 'free', // 当前会员类型
    aiExpiryDate: null, // AI权限到期日期
  });

  // 检查今天是否已打卡
  const checkTodayCheckIn = (): boolean => {
    const today = new Date().toISOString().split('T')[0];
    return userData.checkInRecords.some(record => record.date === today && !record.isMakeup);
  };

  // 计算用户统计数据
  const calculateUserStats = (): UserStats => {
    const { totalDays, consecutiveDays, setupData, makeupCards } = userData;
    
    // 获取段位信息
    const rankInfo = getRankByDays(totalDays);
    const nextRankInfo = getNextRank(totalDays);
    
    // 计算少抽根数
    const dailyAmount = setupData?.dailyAmount || 20;
    const cigarettesAvoided = totalDays * dailyAmount;
    
    // 计算节约金额
    const pricePerPack = setupData?.pricePerPack || 20;
    const cigarettesPerPack = setupData?.cigarettesPerPack || 20;
    const moneySaved = (cigarettesAvoided / cigarettesPerPack) * pricePerPack;
    
    // 计算等价物
    const equivalentItem = calculateEquivalentItem(moneySaved);
    
    // 计算多活时间（每根烟约减少11分钟寿命）
    const totalMinutes = cigarettesAvoided * 11;
    const extraLifeDays = Math.floor(totalMinutes / (24 * 60));
    const extraLifeHours = Math.floor((totalMinutes % (24 * 60)) / 60);
    
    // 计算最近7天的打卡情况（今天是最后一天）
    const last7DaysCheckIn: boolean[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const hasChecked = userData.checkInRecords.some(record => record.date === dateStr);
      last7DaysCheckIn.push(hasChecked);
    }
    
    return {
      nickname: userData.nickname,
      avatar: userData.avatar,
      totalDays,
      consecutiveDays,
      cigarettesAvoided,
      moneySaved: Math.round(moneySaved * 100) / 100,
      equivalentItem: equivalentItem.name,
      equivalentCount: equivalentItem.count,
      equivalentUnit: equivalentItem.unit,
      extraLifeDays,
      extraLifeHours,
      currentRank: rankInfo.rank,
      rankStars: rankInfo.stars,
      daysToNextRank: nextRankInfo.daysToNext,
      nextRank: nextRankInfo.nextRank,
      consecutiveTarget: consecutiveDays + 1,
      makeupCards,
      last7DaysCheckIn,
      regionName: '朝阳区',
      regionRank: 5
    };
  };

  const userStats = calculateUserStats();
  const hasCheckedInToday = checkTodayCheckIn();

  // Auto-navigate from splash screen
  useEffect(() => {
    if (currentPage === 'splash') {
      const timer = setTimeout(() => {
        setCurrentPage('home');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  // 检查连续打卡奖励（每7天赠送1张补签卡）
  useEffect(() => {
    if (userData.consecutiveDays > 0 && userData.consecutiveDays % 7 === 0) {
      const lastRewardDay = Math.floor((userData.consecutiveDays - 1) / 7) * 7;
      if (userData.consecutiveDays !== lastRewardDay) {
        // 检查是否已经奖励过
        const today = new Date().toISOString().split('T')[0];
        const hasRewardedToday = localStorage.getItem(`reward_${today}`);
        
        if (!hasRewardedToday) {
          setUserData(prev => ({
            ...prev,
            makeupCards: prev.makeupCards + 1
          }));
          localStorage.setItem(`reward_${today}`, 'true');
          
          // 显示奖励提示
          setTimeout(() => {
            toast.custom((t) => (
              <CustomToast message={`目标达成成功：连续${userData.consecutiveDays}天\n获得1张补签卡！`} />
            ), {
              duration: 3000,
            });
          }, 1000);
        }
      }
    }
  }, [userData.consecutiveDays]);

  // 播放咔嗒音效
  const playClickSound = () => {
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

  const handleSetupComplete = (data: SetupData) => {
    console.log('Setup data:', data);
    setUserData(prev => ({
      ...prev,
      setupData: data,
      hasAgreedToTerms: true, // 完成设置即表示已同意协议
    }));
    
    // 首次设置后自动完成首次打卡
    setTimeout(() => {
      handleCheckIn(true);
    }, 100);
  };

  const handleCheckIn = (isFirstTime: boolean = false) => {
    // 如果没有设置数据，跳转到设置页面（协议在设置页面中一起同意）
    if (!userData.setupData && !isFirstTime) {
      setCurrentPage('setup');
      return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    
    // 检查今天是否已打卡
    if (userData.checkInRecords.some(record => record.date === today)) {
      if (!isFirstTime) {
        toast.error('今天已经打卡过了');
      }
      return;
    }
    
    // 添加打卡记录
    const newRecord: CheckInRecord = {
      date: today,
      isMakeup: false
    };
    
    // 检查是否连续
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    const hasYesterdayRecord = userData.checkInRecords.some(
      record => record.date === yesterdayStr
    );
    
    const newConsecutiveDays = hasYesterdayRecord || userData.consecutiveDays === 0
      ? userData.consecutiveDays + 1
      : 1;
    
    setUserData(prev => ({
      ...prev,
      checkInRecords: [...prev.checkInRecords, newRecord],
      totalDays: prev.totalDays + 1,
      consecutiveDays: newConsecutiveDays,
      lastCheckInDate: today,
      hasCheckedInToday: true
    }));
    
    // 获取新的段位信息
    const newTotalDays = userData.totalDays + 1;
    const newRankInfo = getRankByDays(newTotalDays);
    const oldRankInfo = getRankByDays(userData.totalDays);
    
    // 播放音效
    playClickSound();
    
    // 检查是否晋升
    if (newRankInfo.rank !== oldRankInfo.rank) {
      toast.custom((t) => (
        <CustomToast message={`恭喜晋升至${newRankInfo.rank}！\n${newRankInfo.promotionMessage}`} />
      ), {
        duration: 2500,
      });
      // 晋升后延迟跳转，让用户看到提示
      setTimeout(() => {
        setCurrentPage('share');
      }, 2500);
    } else {
      // 没有晋升，直接跳转到分享页面
      setCurrentPage('share');
    }
  };

  const handleMakeup = (date: string) => {
    // 检查补签卡数量
    if (userData.makeupCards <= 0) {
      toast.error('补签卡不足');
      return false;
    }
    
    // 检查今天是否已经补签过2次
    const today = new Date().toISOString().split('T')[0];
    const todayMakeups = userData.checkInRecords.filter(
      record => record.isMakeup && record.date === today
    ).length;
    
    if (todayMakeups >= 2) {
      toast.error('每日最多补签2天');
      return false;
    }
    
    // 检查该日期是否已经打卡
    if (userData.checkInRecords.some(record => record.date === date)) {
      toast.error('该日期已经打卡');
      return false;
    }
    
    // 添加补签记录
    const newRecord: CheckInRecord = {
      date,
      isMakeup: true
    };
    
    // 重新计算连续天数
    const newRecords = [...userData.checkInRecords, newRecord].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let newConsecutiveDays = 0;
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < newRecords.length; i++) {
      const recordDate = new Date(newRecords[i].date);
      recordDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(todayDate);
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (recordDate.getTime() === expectedDate.getTime()) {
        newConsecutiveDays++;
      } else {
        break;
      }
    }
    
    setUserData(prev => ({
      ...prev,
      checkInRecords: newRecords,
      totalDays: prev.totalDays + 1,
      consecutiveDays: newConsecutiveDays,
      makeupCards: prev.makeupCards - 1
    }));
    
    // 获取新的段位信息
    const newTotalDays = userData.totalDays + 1;
    const newRankInfo = getRankByDays(newTotalDays);
    const oldRankInfo = getRankByDays(userData.totalDays);
    
    // 播放音效
    playClickSound();
    
    // 检查是否晋升
    if (newRankInfo.rank !== oldRankInfo.rank) {
      setTimeout(() => {
        toast.custom((t) => (
          <CustomToast message={`恭喜晋升至${newRankInfo.rank}！\n${newRankInfo.promotionMessage}`} />
        ), {
          duration: 3000,
        });
      }, 500);
    } else {
      toast.custom((t) => (
        <CustomToast message="补签成功！" />
      ), {
        duration: 2000,
      });
    }
    
    return true;
  };

  const handleNavigate = (page: 'achievements' | 'calendar' | 'share' | 'report' | 'settings' | 'ranking') => {
    setCurrentPage(page);
  };

  // 更新吸烟信息
  const handleUpdateSetupData = (data: SetupData) => {
    setUserData(prev => ({
      ...prev,
      setupData: data,
    }));
  };

  // 修改会员类型（通过兑换码）
  const handleChangeMemberType = (type: 'free' | 'vip' | 'ai') => {
    let aiExpiryDate = null;
    if (type === 'vip') {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 4);
      aiExpiryDate = expiryDate.toISOString();
    } else if (type === 'ai') {
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 3);
      aiExpiryDate = expiryDate.toISOString();
    }
    
    setUserData(prev => ({
      ...prev,
      memberType: type,
      aiExpiryDate,
    }));
    
    const messages = {
      free: '已切换为普通用户',
      vip: '已切换为VIP会员（含4天AI体验）',
      ai: '已切换为AI戒烟军师',
    };
    
    toast.custom(() => (
      <CustomToast message={messages[type]} />
    ), { duration: 2000 });
  };

  // 记录烟瘾
  const handleCravingRecord = () => {
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000; // 10分钟

    // 检查距离上次记录是否超过10分钟
    if (userData.lastCravingTime && now - userData.lastCravingTime < tenMinutes) {
      // 10分钟内重复点击，不记录，只播放音效
      return;
    }

    // 记录烟瘾
    const date = new Date();
    const newRecord: CravingRecord = {
      timestamp: now,
      date: date.toISOString().split('T')[0],
      hour: date.getHours(),
    };

    setUserData(prev => ({
      ...prev,
      cravingRecords: [...prev.cravingRecords, newRecord],
      lastCravingTime: now,
    }));

    // 显示提示
    toast.custom((t) => (
      <CustomToast message="本次烟瘾已记录" />
    ), {
      duration: 750,
    });
  };

  const handleBack = () => {
    setCurrentPage('home');
  };

  // Render current page
  return (
    <>
      <Toaster 
        position="top-center"
        offset="50%"
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: 'flex items-center justify-center',
          },
        }}
      />
      {(() => {
        switch (currentPage) {
          case 'splash':
            return <SplashScreen />;
    
    case 'home':
      return (
        <HomePage 
          userStats={userStats} 
          onNavigate={handleNavigate}
          onCheckIn={() => handleCheckIn(false)}
          hasCheckedInToday={hasCheckedInToday}
          onCravingRecord={handleCravingRecord}
          hasAIAccess={userData.memberType === 'ai' || (userData.memberType === 'vip' && userData.aiExpiryDate && new Date(userData.aiExpiryDate) > new Date())}
        />
      );
    
    case 'setup':
      return (
        <FirstTimeSetup 
          onComplete={handleSetupComplete}
          onBack={() => setCurrentPage('home')}
        />
      );
    
    case 'achievements':
      return (
        <AchievementsPage
          onBack={handleBack}
          currentRank={userStats.currentRank}
          rankStars={userStats.rankStars}
          totalDays={userStats.totalDays}
          consecutiveDays={userStats.consecutiveDays}
        />
      );
    
    case 'calendar':
      return (
        <CheckInCalendar
          onBack={handleBack}
          consecutiveDays={userStats.consecutiveDays}
          makeupCards={userStats.makeupCards}
          checkInRecords={userData.checkInRecords}
          onMakeup={handleMakeup}
          currentRank={userStats.currentRank}
        />
      );
    
    case 'share':
      return <SharePoster onBack={handleBack} userStats={userStats} userRanking={userStats.totalDays > 0 ? Math.floor(Math.random() * 500) + 1 : undefined} />;
    
    case 'report':
      return (
        <DataReportPage
          onBack={handleBack}
          cravingRecords={userData.cravingRecords}
          totalDays={userStats.totalDays}
          cigarettesAvoided={userStats.cigarettesAvoided}
          moneySaved={userStats.moneySaved}
          equivalentItem={userStats.equivalentItem}
          equivalentCount={userStats.equivalentCount}
        />
      );
    
    case 'settings':
      return (
        <SettingsPage
          onBack={handleBack}
          nickname={userData.nickname}
          avatar={userData.avatar}
          setupData={userData.setupData}
          onUpdateSetupData={handleUpdateSetupData}
          currentRank={userStats.currentRank}
          rankStars={userStats.rankStars}
          currentMemberType={userData.memberType}
          onChangeMemberType={handleChangeMemberType}
          onViewHealthReport={() => setCurrentPage('healthReport')}
        />
      );
    
    case 'ranking':
      return (
        <RankingPage
          onBack={handleBack}
          currentUserNickname={userData.nickname}
          currentUserAvatar={userData.avatar}
          currentUserTotalDays={userStats.totalDays}
          onNavigateToShare={() => setCurrentPage('share')}
          onNavigateToSettings={() => setCurrentPage('settings')}
          isVIP={userData.memberType === 'vip' || userData.memberType === 'ai'}
          memberType={userData.memberType}
        />
      );
    
    case 'healthReport':
      return (
        <HealthReportPage
          onBack={handleBack}
          cravingRecords={userData.cravingRecords}
          last7DaysCheckIn={userStats.last7DaysCheckIn}
          smokingYears={userData.setupData?.smokingYears || '0'}
          dailyAmount={userData.setupData?.dailyAmount || 0}
          pricePerPack={userData.setupData?.pricePerPack || 0}
          cigarettesPerPack={userData.setupData?.cigarettesPerPack || 20}
        />
      );
    
    case 'aiChat':
      return (
        <AIAssistantPage
          onBack={handleBack}
          hasAIAccess={userData.memberType === 'ai' || (userData.memberType === 'vip' && userData.aiExpiryDate && new Date(userData.aiExpiryDate) > new Date())}
          onNavigateToSettings={() => setCurrentPage('settings')}
        />
      );

    default:
      return (
        <HomePage 
          userStats={userStats} 
          onNavigate={handleNavigate}
          onCheckIn={() => handleCheckIn(false)}
          hasCheckedInToday={hasCheckedInToday}
          onCravingRecord={handleCravingRecord}
        />
      );
        }
      })()}
    </>
  );
}