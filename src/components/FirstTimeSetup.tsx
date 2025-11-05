import { useState } from 'react';
import { Calendar, Cigarette, DollarSign, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

interface FirstTimeSetupProps {
  onComplete: (data: { smokingYears: string; dailyAmount: number; pricePerPack: number; cigarettesPerPack: number }) => void;
  onClose: () => void;
}

export default function FirstTimeSetup({ onComplete, onClose }: FirstTimeSetupProps) {
  const [smokingYears, setSmokingYears] = useState('');
  const [dailyAmount, setDailyAmount] = useState('');
  const [pricePerPack, setPricePerPack] = useState('');
  const [cigarettesPerPack, setCigarettesPerPack] = useState('20'); // 默认20支

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
      parseFloat(cigarettesPerPack) <= 100
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
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-md mx-4"
        style={{ 
          backgroundColor: '#2d2d2d', 
          border: '1px solid rgba(189, 189, 189, 0.4)',
          maxHeight: '90vh',
          overflowY: 'auto',
          width: 'calc(100% - 48px)',
          maxWidth: '440px'
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: '#EFEFEF', fontSize: '20px' }}>
            完善吸烟信息
          </DialogTitle>
          <DialogDescription style={{ color: '#888888' }}>
            帮助我们更准确地计算您的戒烟成果
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Smoking Years */}
          <div>
            <Label style={{ color: '#EFEFEF', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar className="w-4 h-4" style={{ color: '#00B894' }} />
              烟龄
            </Label>
            <Select value={smokingYears} onValueChange={setSmokingYears}>
              <SelectTrigger 
                className="w-full"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(189, 189, 189, 0.4)',
                  color: '#EFEFEF',
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
            <Label style={{ color: '#EFEFEF', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(189, 189, 189, 0.4)',
                color: '#EFEFEF',
              }}
            />
          </div>

          {/* Price Per Pack */}
          <div>
            <Label style={{ color: '#EFEFEF', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(189, 189, 189, 0.4)',
                color: '#EFEFEF',
              }}
            />
          </div>

          {/* Cigarettes Per Pack */}
          <div>
            <Label style={{ color: '#EFEFEF', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(189, 189, 189, 0.4)',
                color: '#EFEFEF',
              }}
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className="w-full h-12 rounded-xl mt-2"
            style={{
              backgroundColor: isFormValid() ? '#00B894' : 'rgba(136, 136, 136, 0.3)',
              color: isFormValid() ? '#1a1a1a' : '#666666',
              boxShadow: isFormValid() ? '0 4px 24px rgba(0, 184, 148, 0.35)' : 'none',
              cursor: isFormValid() ? 'pointer' : 'not-allowed',
            }}
          >
            确认并打卡
          </Button>

          <p className="text-center" style={{ color: '#888888', fontSize: '12px', marginTop: '12px' }}>
            提交后将立即完成首次打卡
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
