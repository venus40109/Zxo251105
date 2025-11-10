import { X } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { useState } from 'react';

interface AgreementDialogProps {
  onAgree: () => void;
  onCancel: () => void;
}

export default function AgreementDialog({ onAgree, onCancel }: AgreementDialogProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const canAgree = agreedPrivacy && agreedTerms;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(42, 42, 42, 0.1)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div style={{ color: '#2A2A2A' }}>用户协议</div>
          <button
            onClick={onCancel}
            className="p-1 rounded-lg hover:bg-black/5 transition-colors"
            style={{ color: '#666666' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('privacy')}
            className="flex-1 py-2 px-4 rounded-lg transition-all"
            style={{
              backgroundColor: activeTab === 'privacy' ? 'rgba(0, 184, 148, 0.15)' : 'rgba(42, 42, 42, 0.05)',
              border: activeTab === 'privacy' ? '1px solid rgba(0, 184, 148, 0.4)' : '1px solid rgba(42, 42, 42, 0.1)',
              color: activeTab === 'privacy' ? '#00B894' : '#666666',
              fontSize: '14px',
            }}
          >
            隐私政策
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className="flex-1 py-2 px-4 rounded-lg transition-all"
            style={{
              backgroundColor: activeTab === 'terms' ? 'rgba(0, 184, 148, 0.15)' : 'rgba(42, 42, 42, 0.05)',
              border: activeTab === 'terms' ? '1px solid rgba(0, 184, 148, 0.4)' : '1px solid rgba(42, 42, 42, 0.1)',
              color: activeTab === 'terms' ? '#00B894' : '#666666',
              fontSize: '14px',
            }}
          >
            服务协议
          </button>
        </div>

        {/* Content - 确保可滚动 */}
        <div 
          className="flex-1 overflow-y-auto mb-4"
          style={{ 
            maxHeight: 'calc(85vh - 280px)',
            overflowY: 'auto',
          }}
        >
          <div style={{ color: '#2A2A2A', fontSize: '13px', lineHeight: '1.8', paddingRight: '8px' }}>
            {activeTab === 'privacy' ? <PrivacyPolicy /> : <TermsOfService />}
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-2 mb-4">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedPrivacy}
              onChange={(e) => setAgreedPrivacy(e.target.checked)}
              className="mt-1"
              style={{ accentColor: '#00B894' }}
            />
            <span style={{ color: '#2A2A2A', fontSize: '13px' }}>
              我已阅读并同意《ZXO个人信息保护政策》
            </span>
          </label>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-1"
              style={{ accentColor: '#00B894' }}
            />
            <span style={{ color: '#2A2A2A', fontSize: '13px' }}>
              我已阅读并同意《ZXO用户服务协议》
            </span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onCancel}
            className="flex-1 py-3 rounded-lg"
            style={{
              backgroundColor: 'rgba(42, 42, 42, 0.08)',
              border: '1px solid rgba(42, 42, 42, 0.2)',
              color: '#2A2A2A',
            }}
          >
            取消
          </Button>
          <Button
            onClick={onAgree}
            disabled={!canAgree}
            className="flex-1 py-3 rounded-lg"
            style={{
              backgroundColor: canAgree ? '#00B894' : 'rgba(42, 42, 42, 0.2)',
              color: canAgree ? '#FFFFFF' : '#999999',
              border: 'none',
              cursor: canAgree ? 'pointer' : 'not-allowed',
              opacity: canAgree ? 1 : 0.5,
            }}
          >
            同意并继续
          </Button>
        </div>
      </div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div>
      <h3 style={{ color: '#00B894', marginBottom: '16px', fontSize: '16px' }}>ZXO个人信息保护政策</h3>
      <p style={{ marginBottom: '12px', color: '#888888' }}>
        最后更新日期：2025年11月5日
      </p>
      
      <p style={{ marginBottom: '16px' }}>
        欢迎您使用"ZXO自由呼吸"小程序！
      </p>

      <p style={{ marginBottom: '16px' }}>
        深圳一三万物科技有限公司（以下简称"我们"或"公司"）深知个人信息对您的重要性，我们将严格遵守相关法律法规，并参照行业最佳实践，为您的个人信息安全提供充分保障。为此，我们制定本《个人信息保护政策》（以下简称"本政策"），以帮助您了解在您使用"ZXO自由呼吸"小程序（以下简称"本小程序"）的产品/服务过程中，我们如何收集、使用、存储、共享、保护以及您如何管理您的个人信息。
      </p>

      <p style={{ marginBottom: '16px' }}>
        请您在使用本小程序前，仔细阅读并理解本政策。当您点击"同意"本政策或以任何方式开始使用本小程序的服务（包括未经注册直接使用），即表示您已充分理解并同意我们按照本政策处理您的相关信息。
      </p>

      <h4 style={{ color: '#00B894', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>目录</h4>
      <ul style={{ paddingLeft: '20px', marginBottom: '16px', listStyleType: 'decimal' }}>
        <li style={{ marginBottom: '6px' }}>适用范围</li>
        <li style={{ marginBottom: '6px' }}>信息收集</li>
        <li style={{ marginBottom: '6px' }}>信息使用</li>
        <li style={{ marginBottom: '6px' }}>信息共享、委托处理与披露</li>
        <li style={{ marginBottom: '6px' }}>信息存储</li>
        <li style={{ marginBottom: '6px' }}>信息安全</li>
        <li style={{ marginBottom: '6px' }}>第三方服务</li>
        <li style={{ marginBottom: '6px' }}>您的个人信息权利</li>
        <li style={{ marginBottom: '6px' }}>本政策的更新</li>
        <li style={{ marginBottom: '6px' }}>其他</li>
        <li style={{ marginBottom: '6px' }}>与我们联系</li>
      </ul>

      <h4 style={{ color: '#2A2A2A', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>一、适用范围</h4>
      <p style={{ marginBottom: '16px' }}>
        本政策适用于您通过"ZXO自由呼吸"小程序使用我们提供的各项服务。如我们关联公司的产品或服务中使用了"ZXO自由呼吸"小程序提供的服务但未设独立个人信息保护政策的，则本政策同样适用于该部分服务。
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>二、信息收集</h4>
      <p style={{ marginBottom: '12px' }}>
        为了向您提供更好的服务，我们会收集以下信息：
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
        <li style={{ marginBottom: '8px' }}>基本信息：昵称、头像等</li>
        <li style={{ marginBottom: '8px' }}>吸烟数据：烟龄、每日烟量、香烟单价、每包数量等</li>
        <li style={{ marginBottom: '8px' }}>打卡记录：每日打卡数据、烟瘾记录等</li>
      </ul>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>三、信息使用</h4>
      <p style={{ marginBottom: '16px' }}>
        我们收集的信息将用于：计算戒烟成果、生成数据报告、提供个性化服务、改进产品功能。
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>四、信息共享、委托处理与披露</h4>
      <p style={{ marginBottom: '16px' }}>
        您的所有数据均存储在本地浏览器中，我们不会将您的个人信息上传至服务器或与第三方共享。
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>五、信息存储</h4>
      <p style={{ marginBottom: '12px' }}>
        您的数据存储在您的设备本地，这意味着：
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
        <li style={{ marginBottom: '8px' }}>您的数据完全由您掌控</li>
        <li style={{ marginBottom: '8px' }}>清除浏览器数据会导致数据丢失</li>
        <li style={{ marginBottom: '8px' }}>我们无法在不同设备间同步您的数据</li>
      </ul>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>六、信息安全</h4>
      <p style={{ marginBottom: '16px' }}>
        我们非常重视您的信息安全，采用了符合业界标准的安全防护措施。
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>七、第三方服务</h4>
      <p style={{ marginBottom: '16px' }}>
        本应用不使用任何第三方服务，所有功能均在本地运行。
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>八、您的个人信息权利</h4>
      <p style={{ marginBottom: '16px' }}>
        您可以随时通过设置页面修改或删除您的个人信息。
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>九、本政策的更新</h4>
      <p style={{ marginBottom: '16px' }}>
        我们可能适时修订本政策，修订后的政策将在应用内公布。
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>十、其他</h4>
      <p style={{ marginBottom: '16px' }}>
        本政策的解释、效力及纠纷的解决适用中华人民共和国大陆地区法律。
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>十一、与我们联系</h4>
      <p style={{ marginBottom: '16px' }}>
        如您对本政策有任何疑问、意见或建议，请通过以下方式联系我们：<br />
        邮箱：support@zxo.app
      </p>
    </div>
  );
}

function TermsOfService() {
  return (
    <div>
      <h3 style={{ color: '#00B894', marginBottom: '16px', fontSize: '16px' }}>ZXO用户服务协议</h3>
      <p style={{ marginBottom: '12px', color: '#888888' }}>
        最后更新日期：2025年11月5日
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>引言</h4>
      <p style={{ marginBottom: '16px' }}>
        欢迎您使用ZXO自由呼吸小程序（以下简称"本小程序"）！本小程序由深圳一三万物科技有限公司（以下简称"我们"）运营，旨在为用户提供戒烟计划跟踪、健康数据记录、社区支持及相关资讯等服务（以下简称"我们的服务"）。《ZXO自由呼吸小程序用户服务协议》（以下简称"本协议"）是您（以下简称"用户"或"您"）与我们之间就使用本小程序所订立的协议。
      </p>

      <p style={{ marginBottom: '16px' }}>
        在您点击"同意"或开始使用我们的服务之前，请务必仔细阅读并充分理解本协议全部内容，特别是以加粗形式提示您注意的免除或限制责任、法律适用和争议管辖等条款。您的使用行为即视为您已阅读并同意接受本协议的约束。如您不同意本协议，请立即停止使用本小程序。
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>一、账号注册与使用</h4>
      <p style={{ marginBottom: '12px' }}>
        1.1 您可能需要注册账号才能使用本小程序的完整功能。您承诺注册时提供的信息（如昵称、联系方式等）真实、准确、完整。
      </p>
      <p style={{ marginBottom: '12px' }}>
        1.2 您的账号仅供您个人使用，不得以任何方式转让、出借或分享给他人，否则由此产生的一切责任由您自行承担。
      </p>
      <p style={{ marginBottom: '16px' }}>
        1.3 您应妥善保管账号及密码安全，并对您账号下的一切行为承担法律责任。
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>二、服务内容与规范</h4>
      <p style={{ marginBottom: '12px' }}>
        2.1 我们为您提供的服务可能包括：定制个性化戒烟计划、记录戒烟天数和相关健康数据（如吸烟 cravings 强度）、提供戒烟知识文章、接入社区交流功能等。
      </p>
      <p style={{ marginBottom: '16px' }}>
        2.2 您理解并同意，本小程序提供的所有信息（包括健康建议）仅供参考，不构成任何医疗建议或诊断。如您有健康问题，请咨询专业医疗机构。
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>三、用户行为规范</h4>
      <p style={{ marginBottom: '12px' }}>
        使用本小程序时，您应：
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
        <li style={{ marginBottom: '8px' }}>遵守中华人民共和国相关法律法规</li>
        <li style={{ marginBottom: '8px' }}>不得利用本应用从事违法违规活动</li>
        <li style={{ marginBottom: '8px' }}>诚实记录打卡数据，不弄虚作假</li>
        <li style={{ marginBottom: '8px' }}>尊重他人，不传播不良信息</li>
      </ul>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>四、免责声明</h4>
      <p style={{ marginBottom: '12px' }}>
        4.1 本应用提供的数据仅供参考，实际戒烟效果因人而异。
      </p>
      <p style={{ marginBottom: '12px' }}>
        4.2 因不可抗力、系统故障等原因导致的数据丢失，我们不承担责任。
      </p>
      <p style={{ marginBottom: '16px' }}>
        4.3 用户自行清除浏览器数据导致的信息丢失，我们无法恢复。
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>五、知识产权</h4>
      <p style={{ marginBottom: '16px' }}>
        本应用的所有内容，包括但不限于文字、图片、logo、图标、界面设计等，均受知识产权法律法规保护。未经许可，不得擅自使用。
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>六、协议变更</h4>
      <p style={{ marginBottom: '16px' }}>
        我们有权根据需要修改本协议。修改后的协议将在应用内公布，继续使用本应用即表示您接受修改后的协议。
      </p>

      <h4 style={{ color: '#EFEFEF', marginTop: '20px', marginBottom: '12px', fontSize: '14px' }}>七、联系方式</h4>
      <p style={{ marginBottom: '16px' }}>
        如您对本协议有任何疑问，请联系：<br />
        邮箱：support@zxo.app
      </p>
    </div>
  );
}

// 独立查看协议的组件
export function ViewAgreementDialog({ 
  type, 
  onClose 
}: { 
  type: 'privacy' | 'terms'; 
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(42, 42, 42, 0.1)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div style={{ color: '#2A2A2A' }}>
            {type === 'privacy' ? 'ZXO个人信息保护政策' : 'ZXO用户服务协议'}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-black/5 transition-colors"
            style={{ color: '#666666' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - 确保可滚动 */}
        <div 
          className="flex-1 overflow-y-auto mb-4"
          style={{ 
            maxHeight: 'calc(85vh - 150px)',
            overflowY: 'auto',
          }}
        >
          <div style={{ color: '#2A2A2A', fontSize: '13px', lineHeight: '1.8', paddingRight: '8px' }}>
            {type === 'privacy' ? <PrivacyPolicy /> : <TermsOfService />}
          </div>
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}
          className="w-full py-3 rounded-lg"
          style={{
            backgroundColor: '#00B894',
            color: '#FFFFFF',
            border: 'none',
          }}
        >
          关闭
        </Button>
      </div>
    </div>
  );
}
