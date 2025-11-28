import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Shield, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ViewAgreementDialog } from './AgreementDialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface SetupData {
  smokingYears: string;
  dailyAmount: number;
  pricePerPack: number;
  cigarettesPerPack: number;
}

interface SettingsPageProps {
  onBack: () => void;
  nickname: string;
  avatar: string;
  setupData: SetupData | null;
  onUpdateSetupData: (data: SetupData) => void;
  currentRank: string;
  rankStars: number;
  currentMemberType: 'free' | 'vip' | 'ai';
  onChangeMemberType?: (type: 'free' | 'vip' | 'ai') => void;
  onViewHealthReport?: () => void;
}

export default function SettingsPage({
  onBack,
  nickname,
  avatar,
  setupData,
  onUpdateSetupData,
  currentRank,
  rankStars,
  currentMemberType,
  onChangeMemberType,
  onViewHealthReport,
}: SettingsPageProps) {
  const [showAgreement, setShowAgreement] = useState<'privacy' | 'terms' | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [redeemCode, setRedeemCode] = useState('');

  // 编辑表单状态
  const [editData, setEditData] = useState<SetupData>(
    setupData || {
      smokingYears: '5',
      dailyAmount: 20,
      pricePerPack: 20,
      cigarettesPerPack: 20,
    }
  );

  const handleSave = () => {
    onUpdateSetupData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(
      setupData || {
        smokingYears: '5',
        dailyAmount: 20,
        pricePerPack: 20,
        cigarettesPerPack: 20,
      }
    );
    setIsEditing(false);
  };

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
            onClick={isEditing ? handleCancel : onBack}
            className="w-8 h-8 flex items-center justify-center"
            style={{ color: '#666666' }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 style={{ color: '#2A2A2A', fontSize: '16px', fontWeight: 'bold' }}>
            {isEditing ? '修改吸烟信息' : '个人中心'}
          </h1>
          <div className="w-8"></div>
        </div>

        {/* User Info */}
        <div
          className="rounded-2xl p-6 mb-6 flex items-center gap-4"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(42, 42, 42, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Avatar className="w-16 h-16">
            <AvatarImage src={avatar} alt={nickname} />
            <AvatarFallback style={{ backgroundColor: '#00B894', color: '#FFFFFF' }}>
              {nickname.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div style={{ color: '#2A2A2A', fontSize: '18px', marginBottom: '4px' }}>
              {nickname}
            </div>
            <div style={{ color: '#666666', fontSize: '13px' }}>
              {currentRank} {rankStars}星
            </div>
          </div>
        </div>

        {/* Member Benefits */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{
            background: currentMemberType === 'ai' 
              ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)'
              : currentMemberType === 'vip'
              ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(0, 184, 148, 0.1) 0%, rgba(0, 184, 148, 0.05) 100%)',
            border: currentMemberType === 'ai'
              ? '1px solid rgba(99, 102, 241, 0.2)'
              : currentMemberType === 'vip'
              ? '1px solid rgba(245, 158, 11, 0.2)'
              : '1px solid rgba(0, 184, 148, 0.2)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="text-xl">
                {currentMemberType === 'ai' ? '🤖' : currentMemberType === 'vip' ? '👑' : '🌟'}
              </div>
              <div>
                <div style={{ 
                  color: currentMemberType === 'ai' ? '#6366F1' : currentMemberType === 'vip' ? '#F59E0B' : '#00B894',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  {currentMemberType === 'ai' ? 'AI戒烟军师' : currentMemberType === 'vip' ? 'VIP会员' : '普通用户'}
                </div>
                <div style={{ color: '#666666', fontSize: '12px' }}>
                  {currentMemberType === 'ai' ? '尊享AI对话功能' : currentMemberType === 'vip' ? '畅享全部权益' : '基础功能'}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div className="space-y-3">
            {/* 基础打卡功能 */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(0, 184, 148, 0.2)' }}>
                <span style={{ color: '#00B894', fontSize: '12px' }}>✓</span>
              </div>
              <div>
                <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold' }}>基础打卡功能</div>
                <div style={{ color: '#666666', fontSize: '12px' }}>每日打卡、烟瘾记录、成就系统</div>
              </div>
            </div>

            {/* 基础榜单 */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(0, 184, 148, 0.2)' }}>
                <span style={{ color: '#00B894', fontSize: '12px' }}>✓</span>
              </div>
              <div>
                <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold' }}>基础榜单</div>
                <div style={{ color: '#666666', fontSize: '12px' }}>查看区、街道排名</div>
              </div>
            </div>

            {/* 健康周报 */}
            <div className="flex items-start gap-3">
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" 
                style={{ 
                  backgroundColor: currentMemberType === 'vip' || currentMemberType === 'ai' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                  border: currentMemberType === 'vip' || currentMemberType === 'ai' ? 'none' : '1px dashed rgba(0, 0, 0, 0.2)'
                }}
              >
                <span style={{ color: currentMemberType === 'vip' || currentMemberType === 'ai' ? '#F59E0B' : '#CCCCCC', fontSize: '12px' }}>
                  {currentMemberType === 'vip' || currentMemberType === 'ai' ? '✓' : '✕'}
                </span>
              </div>
              <div>
                <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold' }}>
                  健康周报 {!(currentMemberType === 'vip' || currentMemberType === 'ai') && <span style={{ color: '#F59E0B', fontSize: '11px' }}>VIP</span>}
                </div>
                <div style={{ color: '#666666', fontSize: '12px' }}>每周健康数据分析报告</div>
              </div>
            </div>

            {/* 高级榜单 */}
            <div className="flex items-start gap-3">
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" 
                style={{ 
                  backgroundColor: currentMemberType === 'vip' || currentMemberType === 'ai' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                  border: currentMemberType === 'vip' || currentMemberType === 'ai' ? 'none' : '1px dashed rgba(0, 0, 0, 0.2)'
                }}
              >
                <span style={{ color: currentMemberType === 'vip' || currentMemberType === 'ai' ? '#F59E0B' : '#CCCCCC', fontSize: '12px' }}>
                  {currentMemberType === 'vip' || currentMemberType === 'ai' ? '✓' : '✕'}
                </span>
              </div>
              <div>
                <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold' }}>
                  高级榜单 {!(currentMemberType === 'vip' || currentMemberType === 'ai') && <span style={{ color: '#F59E0B', fontSize: '11px' }}>VIP</span>}
                </div>
                <div style={{ color: '#666666', fontSize: '12px' }}>查看市、省、全国排名</div>
              </div>
            </div>

            {/* AI对话功能 */}
            <div className="flex items-start gap-3">
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" 
                style={{ 
                  backgroundColor: currentMemberType === 'ai' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                  border: currentMemberType === 'ai' ? 'none' : '1px dashed rgba(0, 0, 0, 0.2)'
                }}
              >
                <span style={{ color: currentMemberType === 'ai' ? '#6366F1' : '#CCCCCC', fontSize: '12px' }}>
                  {currentMemberType === 'ai' ? '✓' : '✕'}
                </span>
              </div>
              <div>
                <div style={{ color: '#2A2A2A', fontSize: '14px', fontWeight: 'bold' }}>
                  AI对话功能 {currentMemberType !== 'ai' && <span style={{ color: '#6366F1', fontSize: '11px' }}>AI军师</span>}
                </div>
                <div style={{ color: '#666666', fontSize: '12px' }}>24小时智能戒烟陪伴</div>
              </div>
            </div>
          </div>

          {/* 查看健康周报按钮 (VIP/AI用户可见) */}
          {(currentMemberType === 'vip' || currentMemberType === 'ai') && (
            <Button
              onClick={onViewHealthReport}
              className="w-full mt-4 py-3 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #00B894 0%, #00A67E 100%)',
                color: '#FFFFFF',
                fontWeight: 'bold',
                border: 'none',
              }}
            >
              📊 查看健康周报
            </Button>
          )}
        </div>

        {/* Smoking Info */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(42, 42, 42, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" style={{ color: '#00B894' }} />
              <div style={{ color: '#2A2A2A' }}>吸烟信息</div>
            </div>
            {!isEditing && setupData && (
              <Button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 rounded-lg text-sm"
                style={{
                  backgroundColor: 'rgba(0, 184, 148, 0.15)',
                  border: '1px solid rgba(0, 184, 148, 0.3)',
                  color: '#00B894',
                }}
              >
                编辑
              </Button>
            )}
          </div>

          {setupData ? (
            isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label style={{ color: '#2A2A2A', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
                    吸烟年数
                  </Label>
                  <Input
                    value={editData.smokingYears}
                    onChange={(e) => setEditData({ ...editData, smokingYears: e.target.value })}
                    placeholder="例如：5"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(42, 42, 42, 0.2)',
                      color: '#2A2A2A',
                    }}
                  />
                </div>

                <div>
                  <Label style={{ color: '#2A2A2A', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
                    每日吸烟量（根）
                  </Label>
                  <Input
                    type="number"
                    value={editData.dailyAmount}
                    onChange={(e) => setEditData({ ...editData, dailyAmount: Number(e.target.value) })}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(42, 42, 42, 0.2)',
                      color: '#2A2A2A',
                    }}
                  />
                </div>

                <div>
                  <Label style={{ color: '#2A2A2A', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
                    每包价格（元）
                  </Label>
                  <Input
                    type="number"
                    value={editData.pricePerPack}
                    onChange={(e) => setEditData({ ...editData, pricePerPack: Number(e.target.value) })}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(42, 42, 42, 0.2)',
                      color: '#2A2A2A',
                    }}
                  />
                </div>

                <div>
                  <Label style={{ color: '#2A2A2A', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
                    每包支数
                  </Label>
                  <Input
                    type="number"
                    value={editData.cigarettesPerPack}
                    onChange={(e) => setEditData({ ...editData, cigarettesPerPack: Number(e.target.value) })}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(42, 42, 42, 0.2)',
                      color: '#2A2A2A',
                    }}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleCancel}
                    className="flex-1 py-2 rounded-lg"
                    style={{
                      backgroundColor: 'rgba(42, 42, 42, 0.08)',
                      border: '1px solid rgba(42, 42, 42, 0.2)',
                      color: '#2A2A2A',
                    }}
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 py-2 rounded-lg"
                    style={{
                      backgroundColor: '#00B894',
                      color: '#FFFFFF',
                      border: 'none',
                    }}
                  >
                    保存
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <InfoRow label="吸烟年数" value={`${setupData.smokingYears}年`} />
                <InfoRow label="每日吸烟量" value={`${setupData.dailyAmount}根`} />
                <InfoRow label="每包价格" value={`${setupData.pricePerPack}元`} />
                <InfoRow label="每包支数" value={`${setupData.cigarettesPerPack}支`} />
              </div>
            )
          ) : (
            <div className="text-center py-6">
              <div style={{ color: '#999999', fontSize: '13px', marginBottom: '16px' }}>
                暂未设置吸烟信息
              </div>
              <Button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 rounded-lg"
                style={{
                  backgroundColor: '#00B894',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                }}
              >
                完善吸烟信息
              </Button>
            </div>
          )}
        </div>

        {/* Redeem Code */}
        <div
          className="rounded-2xl p-4 mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.1)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="text-base">🎁</div>
            <div style={{ color: '#6366F1', fontWeight: 'bold' }}>兑换码</div>
          </div>
          <p style={{ color: '#666666', fontSize: '12px', marginBottom: '12px' }}>
            输入兑换码解锁会员权益
          </p>
          
          <div className="flex gap-2">
            <Input
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
              placeholder="请输入兑换码"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: '#2A2A2A',
              }}
            />
            <Button
              onClick={() => {
                if (redeemCode === 'VIP') {
                  onChangeMemberType?.('vip');
                  setRedeemCode('');
                  alert('恭喜！已开通VIP会员');
                } else if (redeemCode === 'SVIP') {
                  onChangeMemberType?.('ai');
                  setRedeemCode('');
                  alert('恭喜！已开通AI戒烟军师');
                } else if (redeemCode === 'ZXO') {
                  onChangeMemberType?.('free');
                  setRedeemCode('');
                  alert('已切换为普通用户');
                } else {
                  alert('兑换码无效');
                }
              }}
              className="px-4 rounded-lg whitespace-nowrap"
              style={{
                backgroundColor: '#6366F1',
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}
            >
              兑换
            </Button>
          </div>
        </div>

        {/* Agreements */}
        <div
          className="rounded-2xl p-4 mb-6"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(42, 42, 42, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5" style={{ color: '#00B894' }} />
            <div style={{ color: '#2A2A2A' }}>协议与政策</div>
          </div>

          <button
            onClick={() => setShowAgreement('privacy')}
            className="w-full flex items-center justify-between p-3 rounded-lg mb-2 hover:bg-black/5 transition-colors"
            style={{
              backgroundColor: 'rgba(42, 42, 42, 0.03)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: '#666666' }} />
              <span style={{ color: '#2A2A2A', fontSize: '14px' }}>个人信息保护政策</span>
            </div>
            <ChevronRight className="w-4 h-4" style={{ color: '#666666' }} />
          </button>

          <button
            onClick={() => setShowAgreement('terms')}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-black/5 transition-colors"
            style={{
              backgroundColor: 'rgba(42, 42, 42, 0.03)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: '#666666' }} />
              <span style={{ color: '#2A2A2A', fontSize: '14px' }}>用户服务协议</span>
            </div>
            <ChevronRight className="w-4 h-4" style={{ color: '#666666' }} />
          </button>
        </div>
      </div>

      {/* Agreement Dialog */}
      {showAgreement && (
        <ViewAgreementDialog type={showAgreement} onClose={() => setShowAgreement(null)} />
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span style={{ color: '#666666', fontSize: '14px' }}>{label}</span>
      <span style={{ color: '#2A2A2A', fontSize: '14px' }}>{value}</span>
    </div>
  );
}
