import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Download, Share2, Star } from 'lucide-react';
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

  const motto = "每一天的坚持，都是成功的基石";

  return (
    <div 
      className="min-h-screen p-4 flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1f1f1f 100%)',
      }}
    >
      <div className="max-w-md mx-auto w-full flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="p-2" style={{ color: '#EFEFEF' }}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 style={{ color: '#EFEFEF', fontSize: '18px' }}>分享海报</h1>
          <div className="w-10" />
        </div>

        {/* Poster Preview */}
        <motion.div
          ref={posterRef}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-2xl overflow-hidden mb-3 flex-1"
          style={{
            background: '#FFFFFF',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.5)',
            minHeight: 0,
          }}
        >
          <div className="h-full flex flex-col p-6 relative">
            {/* Decorative Lines */}
            <div 
              className="absolute top-0 left-0 w-full h-1"
              style={{ background: 'linear-gradient(90deg, transparent, #00B894, transparent)' }}
            />
            <div 
              className="absolute bottom-0 left-0 w-full h-1"
              style={{ background: 'linear-gradient(90deg, transparent, #00B894, transparent)' }}
            />
            <div 
              className="absolute left-0 top-0 w-1 h-full"
              style={{ background: 'linear-gradient(180deg, transparent, #00B894, transparent)' }}
            />
            <div 
              className="absolute right-0 top-0 w-1 h-full"
              style={{ background: 'linear-gradient(180deg, transparent, #00B894, transparent)' }}
            />

            {/* Decorative Corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: '#00B894' }} />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: '#00B894' }} />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: '#00B894' }} />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: '#00B894' }} />

            {/* Content */}
            <div className="flex-1 flex flex-col">
              {/* User Info */}
              <div className="text-center mb-4 mt-6">
                <Avatar className="w-20 h-20 mx-auto mb-3 ring-4 ring-offset-4" style={{ ringColor: '#00B894' }}>
                  <AvatarImage src={userStats.avatar} />
                  <AvatarFallback style={{ backgroundColor: '#00B894', color: '#141414' }}>
                    {userStats.nickname[0]}
                  </AvatarFallback>
                </Avatar>
                <div style={{ color: '#141414', fontSize: '20px', marginBottom: '6px' }}>
                  {userStats.nickname}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center gap-1 px-3 py-1 rounded" style={{ backgroundColor: 'rgba(0, 184, 148, 0.1)', border: '1px solid rgba(0, 184, 148, 0.3)' }}>
                    <Star className="w-3 h-3" style={{ color: '#00B894' }} fill="#00B894" />
                    <span style={{ color: '#00B894', fontSize: '12px' }}>{userStats.currentRank} <span style={{ fontWeight: 'bold' }}>{userStats.rankStars}</span>星</span>
                  </div>
                </div>
              </div>

              {/* Motto - 移到这里，在段位和统计数据之间 */}
              <div className="text-center mb-4">
                <p style={{ color: '#888888', fontSize: '13px', fontStyle: 'italic', lineHeight: '1.5' }}>
                  "{motto}"
                </p>
              </div>

              {/* Stats */}
              <div 
                className="rounded-xl p-5 mb-6"
                style={{
                  backgroundColor: 'rgba(0, 184, 148, 0.05)',
                  border: '2px solid #00B894',
                }}
              >
                <div className="text-center mb-3">
                  <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>
                    已坚持戒烟
                  </div>
                  <div style={{ color: '#00B894', fontSize: '36px', fontWeight: '900', lineHeight: '1' }}>
                    {userStats.totalDays}
                  </div>
                  <div style={{ color: '#141414', fontSize: '14px', marginTop: '2px' }}>
                    天
                  </div>
                </div>

                <div className="border-t pt-3" style={{ borderColor: 'rgba(0, 184, 148, 0.2)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ color: '#888888', fontSize: '13px' }}>累计节省</span>
                    <span style={{ color: '#00B894', fontSize: '18px', fontWeight: 'bold' }}>{userStats.moneySaved} 元</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#888888', fontSize: '13px' }}>相当于</span>
                    <span style={{ color: '#00B894', fontSize: '15px' }}>
                      {userStats.equivalentItem} <span style={{ fontWeight: 'bold' }}>{userStats.equivalentCount}</span> {userStats.equivalentUnit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer - ZXO品牌、引导文字、二维码 */}
              <div className="mt-auto">
                <div className="flex items-center justify-between gap-3">
                  {/* 左侧：ZXO Logo和文字 */}
                  <div className="flex flex-col items-start flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <img 
                        src={brandIcon} 
                        alt="ZXO Logo" 
                        style={{ width: '32px', height: '32px' }}
                      />
                      <div>
                        <div style={{ color: '#141414', fontSize: '15px', letterSpacing: '1px' }}>
                          ZXO
                        </div>
                        <div style={{ color: '#888888', fontSize: '10px' }}>
                          戒烟打卡
                        </div>
                      </div>
                    </div>
                    <p style={{ color: '#888888', fontSize: '11px', lineHeight: '1.4' }}>
                      扫码加入，一起戒烟，重获新生
                    </p>
                  </div>
                  
                  {/* 右侧：二维码占位 */}
                  <div 
                    className="flex-shrink-0 rounded-lg flex items-center justify-center"
                    style={{
                      width: '75px',
                      height: '75px',
                      backgroundColor: 'rgba(0, 184, 148, 0.08)',
                      border: '2px solid rgba(0, 184, 148, 0.3)',
                    }}
                  >
                    <div style={{ color: '#00B894', fontSize: '10px', textAlign: 'center', padding: '6px' }}>
                      小程序<br />二维码
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 flex-shrink-0">
          <Button
            onClick={handleDownload}
            className="h-12 rounded-xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(189, 189, 189, 0.5)',
              color: '#EFEFEF',
            }}
          >
            <Download className="w-5 h-5 mr-2" />
            保存到相册
          </Button>
          <Button
            onClick={handleShare}
            className="h-12 rounded-xl"
            style={{
              backgroundColor: '#00B894',
              color: '#1a1a1a',
              boxShadow: '0 4px 24px rgba(0, 184, 148, 0.35)',
            }}
          >
            <Share2 className="w-5 h-5 mr-2" />
            分享到微信
          </Button>
        </div>

        <p className="text-center mt-4" style={{ color: '#888888', fontSize: '12px' }}>
          分享你的成就，激励更多人加入戒烟行列
        </p>
      </div>
    </div>
  );
}
