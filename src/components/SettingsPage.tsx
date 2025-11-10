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
}

export default function SettingsPage({
  onBack,
  nickname,
  avatar,
  setupData,
  onUpdateSetupData,
  currentRank,
  rankStars,
}: SettingsPageProps) {
  const [showAgreement, setShowAgreement] = useState<'privacy' | 'terms' | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1f1f1f 100%)',
      }}
    >
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2"
            style={{ color: '#EFEFEF', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          <div style={{ color: '#EFEFEF' }}>设置</div>
          <div style={{ width: '60px' }}></div>
        </div>

        {/* User Info */}
        <div
          className="rounded-2xl p-6 mb-6 flex items-center gap-4"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            border: '1px solid rgba(189, 189, 189, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Avatar className="w-16 h-16">
            <AvatarImage src={avatar} alt={nickname} />
            <AvatarFallback style={{ backgroundColor: '#00B894', color: '#1a1a1a' }}>
              {nickname.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div style={{ color: '#EFEFEF', fontSize: '18px', marginBottom: '4px' }}>
              {nickname}
            </div>
            <div style={{ color: '#888888', fontSize: '13px' }}>
              {currentRank} {rankStars}星
            </div>
          </div>
        </div>

        {/* Smoking Info */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            border: '1px solid rgba(189, 189, 189, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" style={{ color: '#00B894' }} />
              <div style={{ color: '#EFEFEF' }}>吸烟信息</div>
            </div>
            {!isEditing && setupData && (
              <Button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 rounded-lg text-sm"
                style={{
                  backgroundColor: 'rgba(0, 184, 148, 0.2)',
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
                  <Label style={{ color: '#EFEFEF', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
                    吸烟年数
                  </Label>
                  <Input
                    value={editData.smokingYears}
                    onChange={(e) => setEditData({ ...editData, smokingYears: e.target.value })}
                    placeholder="例如：5"
                    style={{
                      backgroundColor: 'rgba(239, 239, 239, 0.05)',
                      border: '1px solid rgba(189, 189, 189, 0.2)',
                      color: '#EFEFEF',
                    }}
                  />
                </div>

                <div>
                  <Label style={{ color: '#EFEFEF', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
                    每日吸烟量（根）
                  </Label>
                  <Input
                    type="number"
                    value={editData.dailyAmount}
                    onChange={(e) => setEditData({ ...editData, dailyAmount: Number(e.target.value) })}
                    style={{
                      backgroundColor: 'rgba(239, 239, 239, 0.05)',
                      border: '1px solid rgba(189, 189, 189, 0.2)',
                      color: '#EFEFEF',
                    }}
                  />
                </div>

                <div>
                  <Label style={{ color: '#EFEFEF', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
                    每包价格（元）
                  </Label>
                  <Input
                    type="number"
                    value={editData.pricePerPack}
                    onChange={(e) => setEditData({ ...editData, pricePerPack: Number(e.target.value) })}
                    style={{
                      backgroundColor: 'rgba(239, 239, 239, 0.05)',
                      border: '1px solid rgba(189, 189, 189, 0.2)',
                      color: '#EFEFEF',
                    }}
                  />
                </div>

                <div>
                  <Label style={{ color: '#EFEFEF', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
                    每包支数
                  </Label>
                  <Input
                    type="number"
                    value={editData.cigarettesPerPack}
                    onChange={(e) => setEditData({ ...editData, cigarettesPerPack: Number(e.target.value) })}
                    style={{
                      backgroundColor: 'rgba(239, 239, 239, 0.05)',
                      border: '1px solid rgba(189, 189, 189, 0.2)',
                      color: '#EFEFEF',
                    }}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleCancel}
                    className="flex-1 py-2 rounded-lg"
                    style={{
                      backgroundColor: 'rgba(189, 189, 189, 0.1)',
                      border: '1px solid rgba(189, 189, 189, 0.2)',
                      color: '#EFEFEF',
                    }}
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 py-2 rounded-lg"
                    style={{
                      backgroundColor: '#00B894',
                      color: '#1a1a1a',
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
            <div style={{ color: '#888888', fontSize: '14px', textAlign: 'center', padding: '20px 0' }}>
              暂未设置吸烟信息
              <br />
              首次打卡时将引导您填写
            </div>
          )}
        </div>

        {/* Agreements */}
        <div
          className="rounded-2xl p-4 mb-6"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            border: '1px solid rgba(189, 189, 189, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5" style={{ color: '#00B894' }} />
            <div style={{ color: '#EFEFEF' }}>协议与政策</div>
          </div>

          <button
            onClick={() => setShowAgreement('privacy')}
            className="w-full flex items-center justify-between p-3 rounded-lg mb-2 hover:bg-white/5 transition-colors"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: '#888888' }} />
              <span style={{ color: '#EFEFEF', fontSize: '14px' }}>个人信息保护政策</span>
            </div>
            <ChevronRight className="w-4 h-4" style={{ color: '#888888' }} />
          </button>

          <button
            onClick={() => setShowAgreement('terms')}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: '#888888' }} />
              <span style={{ color: '#EFEFEF', fontSize: '14px' }}>用户服务协议</span>
            </div>
            <ChevronRight className="w-4 h-4" style={{ color: '#888888' }} />
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
      <span style={{ color: '#888888', fontSize: '14px' }}>{label}</span>
      <span style={{ color: '#EFEFEF', fontSize: '14px' }}>{value}</span>
    </div>
  );
}
