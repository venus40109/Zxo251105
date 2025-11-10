import { useState } from 'react';
import { Calendar, Cigarette, DollarSign, Package, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ViewAgreementDialog } from './AgreementDialog';

interface FirstTimeSetupProps {
  onComplete: (data: { smokingYears: string; dailyAmount: number; pricePerPack: number; cigarettesPerPack: number }) => void;
  onBack: () => void;
}

export default function FirstTimeSetup({ onComplete, onBack }: FirstTimeSetupProps) {
  const [smokingYears, setSmokingYears] = useState('');
  const [dailyAmount, setDailyAmount] = useState('');
  const [pricePerPack, setPricePerPack] = useState('');
  const [cigarettesPerPack, setCigarettesPerPack] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [showAgreement, setShowAgreement] = useState<'privacy' | 'terms' | null>(null);

  const isFormValid = () => {
    return (
      smokingYears !== '' &&
      dailyAmount !== '' &&
      pricePerPack !== '' &&
      cigarettesPerPack !== '' &&
      parseFloat(dailyAmount) > 0 &&
      parseFloat(dailyAmount) <= 200 &&
      parseFloat(pricePerPack) >= 0 &&
      parseFloat(pricePerPack) <= 500 &&
      parseFloat(cigarettesPerPack) > 0 &&
      parseFloat(cigarettesPerPack) <= 100 &&
      agreedToTerms
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    onComplete({
      smokingYears,
      dailyAmount: parseFloat(dailyAmount),
      pricePerPack: parseFloat(pricePerPack),
      cigarettesPerPack: parseFloat(cigarettesPerPack),
    });
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
            onClick={onBack}
            className="flex items-center gap-2 p-2 rounded-lg transition-all hover:bg-black/5"
            style={{ color: '#2A2A2A', background: 'rgba(42, 42, 42, 0.08)', border: 'none', cursor: 'pointer' }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          <div style={{ color: '#2A2A2A' }}>完善吸烟信息</div>
          <div style={{ width: '60px' }}></div>
        </div>

        {/* Description */}
        <div className="text-center mb-8">
          <p style={{ color: '#666666', fontSize: '14px' }}>
            帮助我们更准确地计算您的戒烟成果
          </p>
        </div>

        {/* Form */}
        <div className="p-6 mb-6">
          <div className="space-y-5">
            {/* Smoking Years */}
            <div>
              <Label style={{ color: '#2A2A2A', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar className="w-4 h-4" style={{ color: '#00B894' }} />
                烟龄
              </Label>
              <Select value={smokingYears} onValueChange={setSmokingYears}>
                <SelectTrigger 
                  className="w-full"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(42, 42, 42, 0.2)',
                    color: '#2A2A2A',
                  }}
                >
                  <SelectValue placeholder="请选择烟龄" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1年以下">1年以下</SelectItem>
                  <SelectItem value="1-3年">1-3年</SelectItem>
                  <SelectItem value="3-5年">3-5年</SelectItem>
                  <SelectItem value="5-10年">5-10年</SelectItem>
                  <SelectItem value="10年以上">10年以上</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Daily Amount */}
            <div>
              <Label style={{ color: '#2A2A2A', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cigarette className="w-4 h-4" style={{ color: '#00B894' }} />
                每日烟量（支）
              </Label>
              <Input
                type="number"
                placeholder="请输入每天抽烟数量（1-200）"
                value={dailyAmount}
                onChange={(e) => setDailyAmount(e.target.value)}
                className="w-full"
                min="1"
                max="200"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(42, 42, 42, 0.2)',
                  color: '#2A2A2A',
                }}
              />
            </div>

            {/* Price Per Pack */}
            <div>
              <Label style={{ color: '#2A2A2A', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DollarSign className="w-4 h-4" style={{ color: '#00B894' }} />
                香烟单价（元/包）
              </Label>
              <Input
                type="number"
                placeholder="请输入每包香烟价格（0-500）"
                value={pricePerPack}
                onChange={(e) => setPricePerPack(e.target.value)}
                className="w-full"
                min="0"
                max="500"
                step="0.1"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(42, 42, 42, 0.2)',
                  color: '#2A2A2A',
                }}
              />
            </div>

            {/* Cigarettes Per Pack */}
            <div>
              <Label style={{ color: '#2A2A2A', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Package className="w-4 h-4" style={{ color: '#00B894' }} />
                每包数量（支）
              </Label>
              <Input
                type="number"
                placeholder="请输入每包香烟数量（通常为20）"
                value={cigarettesPerPack}
                onChange={(e) => setCigarettesPerPack(e.target.value)}
                className="w-full"
                min="1"
                max="100"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(42, 42, 42, 0.2)',
                  color: '#2A2A2A',
                }}
              />
            </div>

            {/* Agreement Checkbox */}
            <div 
              className="rounded-lg p-4"
              style={{
                backgroundColor: 'rgba(0, 184, 148, 0.08)',
                border: '1px solid rgba(0, 184, 148, 0.2)',
              }}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 flex-shrink-0"
                  style={{ accentColor: '#00B894', width: '16px', height: '16px' }}
                />
                <span style={{ color: '#2A2A2A', fontSize: '13px', lineHeight: '1.6' }}>
                  我已阅读并同意
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAgreement('privacy');
                    }}
                    style={{
                      color: '#00B894',
                      textDecoration: 'underline',
                      background: 'none',
                      border: 'none',
                      padding: '0 2px',
                      cursor: 'pointer',
                    }}
                  >
                    《ZXO个人信息保护政策》
                  </button>
                  及
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAgreement('terms');
                    }}
                    style={{
                      color: '#00B894',
                      textDecoration: 'underline',
                      background: 'none',
                      border: 'none',
                      padding: '0 2px',
                      cursor: 'pointer',
                    }}
                  >
                    《ZXO用户服务协议》
                  </button>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className="w-full h-12 rounded-xl mt-2"
              style={{
                backgroundColor: isFormValid() ? '#00B894' : 'rgba(136, 136, 136, 0.3)',
                color: isFormValid() ? '#FFFFFF' : '#999999',
                boxShadow: isFormValid() ? '0 4px 24px rgba(0, 184, 148, 0.35)' : 'none',
                cursor: isFormValid() ? 'pointer' : 'not-allowed',
              }}
            >
              确认并打卡
            </Button>

            <p className="text-center" style={{ color: '#666666', fontSize: '12px', marginTop: '12px' }}>
              提交后将立即完成首次打卡
            </p>
          </div>
        </div>
      </div>

      {/* Agreement View Dialog */}
      {showAgreement && (
        <ViewAgreementDialog 
          type={showAgreement} 
          onClose={() => setShowAgreement(null)} 
        />
      )}
    </div>
  );
}
