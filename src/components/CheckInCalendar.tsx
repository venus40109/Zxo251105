import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Flame, Check, Ticket } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { RANK_SYSTEM } from '../utils/rankSystem';

interface CheckInRecord {
  date: string;
  isMakeup: boolean;
}

interface CheckInCalendarProps {
  onBack: () => void;
  consecutiveDays: number;
  makeupCards: number;
  checkInRecords: CheckInRecord[];
  onMakeup: (date: string) => boolean;
  currentRank: string;
}

export default function CheckInCalendar({ 
  onBack, 
  consecutiveDays, 
  makeupCards, 
  checkInRecords,
  onMakeup,
  currentRank
}: CheckInCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showMakeupDialog, setShowMakeupDialog] = useState(false);
  const [showChallengeDialog, setShowChallengeDialog] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [activeChallenges, setActiveChallenges] = useState<number[]>([]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const isCheckedIn = (day: number): boolean => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return checkInRecords.some(record => record.date === dateStr);
  };

  const isMakeup = (day: number): boolean => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const record = checkInRecords.find(r => r.date === dateStr);
    return record?.isMakeup || false;
  };

  const isFutureDate = (day: number): boolean => {
    const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateToCheck > today;
  };

  const handleDateClick = (day: number) => {
    if (isFutureDate(day) || isCheckedIn(day)) {
      return;
    }
    
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(new Date(dateStr));
    setShowMakeupDialog(true);
  };

  const handleMakeup = () => {
    if (!selectedDate) return;
    
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    const success = onMakeup(dateStr);
    
    if (success) {
      setShowMakeupDialog(false);
      setSelectedDate(null);
    }
  };

  const challengeTargets = [
    { days: 7, achieved: consecutiveDays >= 7 },
    { days: 14, achieved: consecutiveDays >= 14 },
    { days: 30, achieved: consecutiveDays >= 30 },
    { days: 60, achieved: consecutiveDays >= 60 },
    { days: 90, achieved: consecutiveDays >= 90 },
    { days: 180, achieved: consecutiveDays >= 180 },
  ];

  const handleChallengeClick = (days: number, achieved: boolean) => {
    if (!achieved) {
      setSelectedChallenge(days);
      setShowChallengeDialog(true);
    }
  };

  const handleConfirmChallenge = () => {
    if (selectedChallenge) {
      setActiveChallenges([...activeChallenges, selectedChallenge]);
    }
    setShowChallengeDialog(false);
  };

  // 获取当前段位的打卡提示语
  const rankInfo = RANK_SYSTEM.find(r => r.rank === currentRank) || RANK_SYSTEM[0];
  const checkInMessage = rankInfo.checkInMessage;

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: '#EFEFEF',
      }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-lg transition-all hover:bg-black/5"
            style={{ color: '#2A2A2A', backgroundColor: 'rgba(42, 42, 42, 0.08)' }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center flex-1">
            <div style={{ color: '#2A2A2A', fontSize: '18px', marginBottom: '4px' }}>连续打卡</div>
            <div style={{ color: '#888888', fontSize: '13px' }}>{checkInMessage}</div>
          </div>
          <div className="w-6" />
        </div>

        {/* Streak Counter */}
        <motion.div
          className="rounded-2xl p-6 mb-6 text-center"
          style={{
            background: 'linear-gradient(145deg, rgba(0, 184, 148, 0.15) 0%, rgba(0, 184, 148, 0.05) 100%)',
            border: '1px solid rgba(0, 184, 148, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 184, 148, 0.2)',
          }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Flame className="w-12 h-12 mx-auto mb-3" style={{ color: '#00B894' }} />
          <div style={{ color: '#00B894', fontSize: '48px', fontWeight: '900', lineHeight: 1 }}>
            {consecutiveDays}
          </div>
          <div style={{ color: '#2A2A2A', marginTop: '8px' }}>连续打卡天数</div>
          
          {/* Makeup Cards */}
          <div 
            className="mt-4 pt-4"
            style={{ borderTop: '1px solid rgba(0, 184, 148, 0.2)' }}
          >
            <div className="flex items-center justify-center gap-2">
              <Ticket className="w-5 h-5" style={{ color: '#00B894' }} />
              <span style={{ color: '#2A2A2A' }}>补签卡</span>
              <span style={{ color: '#00B894', fontSize: '20px', fontWeight: '900' }}>
                {makeupCards}
              </span>
            </div>
            <div style={{ color: '#888888', fontSize: '12px', marginTop: '4px' }}>
              连续打卡满7天奖励1张 · 每日最多使用2张补签卡
            </div>
          </div>
        </motion.div>

        {/* Calendar */}
        <div 
          className="rounded-2xl p-4 mb-6"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(42, 42, 42, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={() => {
                const newMonth = new Date(currentMonth);
                newMonth.setMonth(newMonth.getMonth() - 1);
                setCurrentMonth(newMonth);
              }}
              variant="ghost"
              className="p-2 h-auto"
              style={{ color: '#2A2A2A' }}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div style={{ color: '#2A2A2A' }}>
              {currentMonth.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}
            </div>
            <Button
              onClick={() => {
                const newMonth = new Date(currentMonth);
                newMonth.setMonth(newMonth.getMonth() + 1);
                setCurrentMonth(newMonth);
              }}
              variant="ghost"
              className="p-2 h-auto"
              style={{ color: '#2A2A2A' }}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
              <div
                key={day}
                className="text-center py-2"
                style={{ color: '#888888', fontSize: '12px' }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const checkedIn = isCheckedIn(day);
              const isMadeUp = isMakeup(day);
              const isFuture = isFutureDate(day);
              const canMakeup = !checkedIn && !isFuture && makeupCards > 0;

              return (
                <motion.button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className="aspect-square rounded-lg flex items-center justify-center relative"
                  style={{
                    backgroundColor: checkedIn 
                      ? 'rgba(0, 184, 148, 0.2)' 
                      : canMakeup 
                      ? 'rgba(189, 189, 189, 0.1)' 
                      : 'transparent',
                    border: checkedIn 
                      ? '1px solid rgba(0, 184, 148, 0.4)' 
                      : '1px solid rgba(189, 189, 189, 0.1)',
                    color: isFuture ? '#CCCCCC' : checkedIn ? '#00B894' : '#2A2A2A',
                    cursor: canMakeup ? 'pointer' : 'default',
                  }}
                  whileHover={canMakeup ? { scale: 1.1 } : {}}
                  whileTap={canMakeup ? { scale: 0.95 } : {}}
                  disabled={isFuture || checkedIn}
                >
                  {checkedIn ? (
                    <Check className="w-4 h-4" style={{ color: '#00B894' }} />
                  ) : (
                    <span style={{ fontSize: '14px' }}>{day}</span>
                  )}
                  {isMadeUp && (
                    <div 
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                      style={{ backgroundColor: '#00B894' }}
                    >
                      <Ticket className="w-2 h-2" style={{ color: '#1a1a1a' }} />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Challenge Progress */}
        <div 
          className="rounded-2xl p-4"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(42, 42, 42, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div style={{ color: '#2A2A2A', marginBottom: '12px' }}>挑战目标</div>
          <div className="space-y-2">
            {challengeTargets.map((target) => (
              <div
                key={target.days}
                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:opacity-80"
                style={{
                  backgroundColor: target.achieved 
                    ? 'rgba(0, 184, 148, 0.1)' 
                    : 'rgba(189, 189, 189, 0.05)',
                  border: `1px solid ${target.achieved ? 'rgba(0, 184, 148, 0.3)' : 'rgba(189, 189, 189, 0.1)'}`,
                }}
                onClick={() => handleChallengeClick(target.days, target.achieved)}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: target.achieved ? '#00B894' : 'transparent',
                    border: `2px solid ${target.achieved ? '#00B894' : 'rgba(189, 189, 189, 0.3)'}`,
                  }}
                >
                  {target.achieved && <Check className="w-4 h-4" style={{ color: '#1a1a1a' }} />}
                </div>
                <span style={{ color: target.achieved ? '#00B894' : '#888888', flex: 1 }}>
                  连续打卡 {target.days} 天
                </span>
                {target.achieved ? (
                  <Check className="w-4 h-4" style={{ color: '#00B894' }} />
                ) : activeChallenges.includes(target.days) ? (
                  <span style={{ color: '#00B894', fontSize: '12px' }}>已设置</span>
                ) : (
                  <span style={{ color: '#888888', fontSize: '12px' }}>设置目标</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Challenge Dialog */}
        <Dialog open={showChallengeDialog} onOpenChange={setShowChallengeDialog}>
          <DialogContent 
            className="max-w-sm mx-4"
            style={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid rgba(42, 42, 42, 0.1)',
              width: 'calc(100% - 48px)',
              maxWidth: '360px'
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: '#2A2A2A', textAlign: 'center' }}>设置目标</DialogTitle>
              <DialogDescription style={{ color: '#888888', textAlign: 'center', paddingTop: '8px' }}>
                您确定要挑战连续{selectedChallenge}天打卡？
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-row gap-3 sm:gap-3">
              <Button
                variant="outline"
                onClick={() => setShowChallengeDialog(false)}
                className="flex-1"
                style={{ 
                  backgroundColor: 'rgba(42, 42, 42, 0.08)',
                  borderColor: 'rgba(42, 42, 42, 0.2)', 
                  color: '#2A2A2A',
                  border: '1px solid rgba(42, 42, 42, 0.2)'
                }}
              >
                取消
              </Button>
              <Button
                onClick={handleConfirmChallenge}
                className="flex-1"
                style={{ backgroundColor: '#00B894', color: '#FFFFFF' }}
              >
                确定
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Makeup Dialog */}
        <Dialog open={showMakeupDialog} onOpenChange={setShowMakeupDialog}>
          <DialogContent 
            className="max-w-sm mx-4"
            style={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid rgba(42, 42, 42, 0.1)',
              width: 'calc(100% - 48px)',
              maxWidth: '360px'
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: '#2A2A2A', textAlign: 'center' }}>补签确认</DialogTitle>
              <DialogDescription style={{ color: '#888888', textAlign: 'center', paddingTop: '8px' }}>
                确定要为 {selectedDate?.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')} 使用补签卡吗？
              </DialogDescription>
            </DialogHeader>
            <div className="py-3">
              <div className="text-center" style={{ color: '#888888', fontSize: '13px' }}>
                使用后剩余 <span style={{ color: '#00B894', fontWeight: '900' }}>{makeupCards - 1}</span> 张补签卡
              </div>
            </div>
            <DialogFooter className="flex-row gap-3 sm:gap-3">
              <Button
                variant="outline"
                onClick={() => setShowMakeupDialog(false)}
                className="flex-1"
                style={{ 
                  backgroundColor: 'rgba(42, 42, 42, 0.08)',
                  borderColor: 'rgba(42, 42, 42, 0.2)', 
                  color: '#2A2A2A',
                  border: '1px solid rgba(42, 42, 42, 0.2)'
                }}
              >
                取消
              </Button>
              <Button
                onClick={handleMakeup}
                className="flex-1"
                style={{ backgroundColor: '#00B894', color: '#FFFFFF' }}
                disabled={makeupCards <= 0}
              >
                确定
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
